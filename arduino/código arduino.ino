#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>

// 🔧 Dados da sua rede Wi-Fi
const char* ssid = "popcorn";
const char* password = "jm12344321";

// 🌐 URL do seu Backend (Altere para o IP do seu computador na rede local ou URL do Render)
// Exemplo local: "http://192.168.0.100:3000/api/leituras"
const char* backendUrl = "https://e-energy-api.onrender.com/api/leituras";

WebServer server(80);

// Pinos do Hardware
const int relePin = 23;      // Pino do Módulo Relé
const int sensorPin = 34;    // Pino analógico do Sensor de Corrente (SCT-013 ou ACS712)

// Parâmetros de Calibração do Sensor
const float tensaoRede = 127.0;    // Tensão da rede elétrica (127V ou 220V)
const float fatorCalibracao = 30.0; // Fator de calibração para o SCT-013 (30A/1V)

unsigned long ultimoEnvio = 0;
const unsigned long intervaloEnvio = 5000; // Envia a cada 5 segundos

// Função para calcular a Corrente RMS (Root Mean Square)
float calcularCorrenteRMS() {
  unsigned long tempoInicial = millis();
  int totalAmostras = 0;
  double somaQuadrados = 0;

  // Coleta amostras da onda senoidal por 100ms (aprox 6 ciclos de 60Hz)
  while (millis() - tempoInicial < 100) {
    int leituraBruta = analogRead(sensorPin);
    // Remove o offset de DC (centro em 2048 para ADC de 12 bits do ESP32)
    float tensaoSensor = (leituraBruta - 2048.0) * (3.3 / 4095.0);
    somaQuadrados += tensaoSensor * tensaoSensor;
    totalAmostras++;
  }

  float valorRMS = sqrt(somaQuadrados / totalAmostras);
  float correnteAmperes = valorRMS * fatorCalibracao;

  // Filtro de ruído para correntes muito pequenas
  if (correnteAmperes < 0.10) {
    correnteAmperes = 0.0;
  }

  return correnteAmperes;
}

// Função para enviar os dados via HTTP POST para o Backend/MongoDB
void enviarDadosBackend(float corrente, float potencia) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(backendUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-ESP32-Secret", "eenergy_esp32_secret_2026");

    // Monta o JSON
    String jsonPayload = "{";
    jsonPayload += "\"comodo_id\":\"sala\",";
    jsonPayload += "\"corrente\":" + String(corrente, 2) + ",";
    jsonPayload += "\"potencia\":" + String(potencia, 2) + ",";
    jsonPayload += "\"tensao\":" + String(tensaoRede, 1);
    jsonPayload += "}";

    int httpCode = http.POST(jsonPayload);
    
    if (httpCode > 0) {
      Serial.println("📡 Dados enviados ao Backend! Código HTTP: " + String(httpCode));
    } else {
      Serial.println("❌ Erro ao enviar HTTP: " + http.errorToString(httpCode));
    }

    http.end();
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(relePin, OUTPUT);
  digitalWrite(relePin, LOW); // Relé começa desligado
  analogReadResolution(12);

  // Conectar ao Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Conectando ao Wi-Fi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\n✅ Conectado ao Wi-Fi!");
  Serial.print("🌐 Endereço IP do ESP32: ");
  Serial.println(WiFi.localIP());

  // Rotas HTTP do ESP32 para controle direto se necessário
  server.on("/ligar", []() {
    digitalWrite(relePin, HIGH);
    server.send(200, "text/plain", "Relé ligado ✅");
  });

  server.on("/desligar", []() {
    digitalWrite(relePin, LOW);
    server.send(200, "text/plain", "Relé desligado ❌");
  });

  server.on("/status", []() {
    float i = calcularCorrenteRMS();
    float p = i * tensaoRede;
    String resposta = "Corrente: " + String(i, 2) + " A | Potência: " + String(p, 2) + " W";
    server.send(200, "text/plain", resposta);
  });

  server.begin();
  Serial.println("Servidor HTTP iniciado no ESP32!");
}

void loop() {
  server.handleClient();

  // Envia medições periodicamente para a API
  if (millis() - ultimoEnvio >= intervaloEnvio) {
    ultimoEnvio = millis();

    float corrente = calcularCorrenteRMS();
    float potencia = corrente * tensaoRede;

    Serial.print("⚡ Corrente: ");
    Serial.print(corrente);
    Serial.print(" A | 💡 Potência: ");
    Serial.print(potencia);
    Serial.println(" W");

    enviarDadosBackend(corrente, potencia);
  }
}
