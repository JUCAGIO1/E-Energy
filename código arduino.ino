#include <WiFi.h>
#include <WebServer.h>

// 🔧 Coloque os dados da sua rede Wi-Fi
const char* ssid = "popcorn";         // Nome da rede Wi-Fi
const char* password = "jm12344321";  // Senha da rede

WebServer server(80);

const int relePin = 23; // Pino onde o módulo relé está conectado

void setup() {
  Serial.begin(115200);
  pinMode(relePin, OUTPUT);
  digitalWrite(relePin, LOW); // Relé começa desligado

  // Conectar ao Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Conectando ao Wi-Fi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("✅ Conectado ao Wi-Fi!");

  // Mostra o IP do ESP32 no Serial Monitor
  Serial.print("🌐 Endereço IP do ESP32: ");
  Serial.println(WiFi.localIP());

  // Rota para ligar o relé
  server.on("/ligar", []() {
    digitalWrite(relePin, HIGH);
    server.send(200, "text/plain", "Relé ligado ✅");
  });

  // Rota para desligar o relé
  server.on("/desligar", []() {
    digitalWrite(relePin, LOW);
    server.send(200, "text/plain", "Relé desligado ❌");
  });

  // Inicia o servidor
  server.begin();
  Serial.println("Servidor HTTP iniciado!");
}

void loop() {
  server.handleClient();
}
