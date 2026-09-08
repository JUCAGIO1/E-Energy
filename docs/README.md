# ⚡ E-Energy | Gestão Inteligente de Energia Residencial com IoT

> **Programação Web III - AMS (Articulação da Formação Profissional Média e Superior)**  
> Atividade: Identidade Visual e Landing Page do Projeto  
> **Landing Page Publicada:** [https://jucagio1.github.io/E-Energy/](https://jucagio1.github.io/E-Energy/)  
> **Repositório do Projeto:** [https://github.com/JUCAGIO1/E-Energy](https://github.com/JUCAGIO1/E-Energy)  
> **Instagram Oficial:** [@_e__energy](https://www.instagram.com/_e__energy)

---

## 1. 📌 Nome do Projeto & Descrição Resumida

* **Nome do Projeto:** **E-Energy**
* **Slogan:** *Gestão Inteligente e Monitoramento de Energia Residencial com IoT*
* **Descrição Resumida:**  
  O **E-Energy** é uma solução de engenharia e tecnologia desenvolvida para monitorar, auditar e controlar o consumo elétrico residencial e comercial em tempo real. Através de sensores amperimétricos não-invasivos conectados a microcontroladores ESP32 na caixa de disjuntores, os dados elétricos são processados (True RMS) e transmitidos com segurança para uma API na nuvem e exibidos diretamente em um aplicativo mobile intuitivo. A plataforma calcula custos baseados na tarifa média de São Paulo (ANEEL), emite alertas de picos e sobrecargas e gera laudos auditáveis em PDF.

---

## 2. 🎯 Problema e Solução

### 🔴 O Problema
No Brasil, o modelo de fornecimento de energia elétrica mantém o consumidor em uma "caixa-preta":
* **Incerteza e Surpresa na Fatura:** A conta de luz é retroativa — o consumidor só sabe o valor total semanas após o uso, sem compreender onde a energia foi gasta.
* **Apagão de Métricas Individuais:** Não há visibilidade sobre quanto cada aparelho (chuveiro elétrico, ar-condicionado, geladeira) consome isoladamente.
* **Risco Elétrico e Sobrecargas:** Instalações sobrecarregadas e fugas de corrente operam sem avisos térmicos, aumentando riscos de curtos-circuitos e incêndios.
* **Impacto Econômico:** Bandeiras tarifárias (amarela e vermelha) encarecem drasticamente o orçamento de famílias e corroem a rentabilidade de pequenos comércios.

### 🟢 A Solução E-Energy
* **Amostragem em Tempo Real:** O hardware ESP32 amostra as ondas senoidais a 60Hz e calcula a corrente eficaz (True RMS) e a potência ativa (Watts) a cada 5 segundos.
* **Conversão Direta em Reais (R$):** Aplicação dinâmica dos valores da ANEEL/SP (tarifa média residencial de R$ 0,85/kWh com impostos).
* **Prevenção Ativa de Acidentes:** Alertas push imediatos no smartphone ao detectar corrente acima do limite do circuito, com capacidade de desarme e acionamento remoto de relés.
* **Relatórios Técnicos Auditáveis:** Exportação instantânea em PDF com consumo setorizado por cômodos e histórico para acompanhamento contínuo.

---

## 3. 👥 Público-Alvo

A plataforma foi arquitetada para atender 4 perfis prioritários:

1. **Famílias & Residências:** Proprietários e inquilinos que buscam reduzir em até 30% a conta de luz, combater o desperdício de aparelhos em stand-by e educar o consumo doméstico.
2. **Pequenos Comércios & Negócios:** Padarias, oficinas mecânicas, restaurantes e consultórios com maquinário contínuo que necessitam de previsibilidade em seus custos fixos operacionais.
3. **Condomínios & Síndicos:** Auditoria justa de áreas comuns (bombas d'água de recalque, portões automáticos, elevadores e iluminação de garagens).
4. **Entusiastas de Automação & Smart Homes:** Usuários adeptos da cultura Maker, domótica, IoT e sustentabilidade energética.

---

## 4. 🛠️ Tecnologias Utilizadas

```
                  ┌────────────────────────────────────────┐
                  │             E-ENERGY ECOSYSTEM         │
                  └────────────────────────────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
  [ 🔌 HARDWARE & IOT ]      [ ☁️ BACKEND & NUVEM ]      [ 📱 MOBILE & WEB ]
  • ESP32 32-bit Dual Core    • Node.js & Express 5        • React Native (Expo 54)
  • Sensor SCT-013 (Amperes)  • MongoDB Atlas & Mongoose   • HTML5 Semântico & CSS3
  • Módulo Relé 5V            • HMAC-SHA256 & Rate Limiter • JavaScript Vanilla
  • Framework C++ / Arduino   • Helmet & Mongo-Sanitize    • GitHub Pages & Actions
```

* **Hardware & IoT:**
  * Microcontrolador ESP32 (Wi-Fi, Bluetooth e protocolo de baixa latência ESP-NOW)
  * Sensor Amperimétrico SCT-013-000 (Medição não invasiva por indução eletromagnética)
  * Módulo Relé 5V para corte e proteção de circuitos
  * Firmware otimizado em C++ com filtragem de ruídos e cálculo senoidal True RMS
* **Backend & Banco de Dados:**
  * Node.js com Express 5
  * MongoDB Atlas e Mongoose (Modelagem de séries temporais elétricas e usuários)
  * Criptografia e Autenticação de Hardware (Chave secreta eFuse + assinatura HMAC-SHA256)
  * Proteção Anti-DDoS (`express-rate-limit`), Sanitização NoSQL (`express-mongo-sanitize`) e `helmet`
* **Frontend Mobile (App):**
  * React Native & Expo SDK 54
  * React Navigation (Navegação por Abas - Bottom Tabs)
  * `react-native-gifted-charts` para gráficos interativos de potência
  * `expo-print` e `expo-sharing` para emissão e download de relatórios em PDF
* **Landing Page & Documentação:**
  * HTML5 Semântico, CSS3 com variáveis e Design System, JavaScript puro (acessível e responsivo)
  * GitHub Pages para hospedagem rápida e segura

---

## 5. 👨‍💻 Equipe e Responsabilidades

| Integrante | Função / Cargo | Responsabilidades no Projeto |
| :--- | :--- | :--- |
| **Giovanni Correa Amadio** | Líder do Projeto & Desenvolvedor Full Stack / IoT | • Concepção e arquitetura do ecossistema E-Energy<br>• Desenvolvimento do firmware C++ e calibração True RMS no ESP32<br>• Criação da API REST Express e integração MongoDB Atlas<br>• Desenvolvimento do aplicativo mobile React Native/Expo<br>• Implementação da segurança Zero Trust (HMAC, eFuse, RateLimit)<br>• Desenvolvimento da Landing Page e identidade visual |

* **Instituição de Ensino:** ETEC / Centro Paula Souza  
* **Curso / Disciplina:** Programação Web III - AMS (Articulação da Formação Profissional Média e Superior)

---

## 6. 🎨 Identidade Visual do Projeto

A identidade visual do **E-Energy** foi construída sobre os pilares da eletricidade, inovação tecnológica, confiabilidade e clareza de dados.

### 🖼️ Logotipo Oficial
* **Arquivo:** Armazenado no repositório em [`docs/img/logo.png`](docs/img/logo.png) e vetor [`docs/img/logo.svg`](docs/img/logo.svg).
* **Conceito:** Um badge com plugue elétrico estilizado e raio condutor, acompanhado da tipografia robusta `E-ENERGY` sublinhada por uma barra de energia e um raio dourado cintilante.

### 🎨 Paleta de Cores

| Nome da Cor | Código Hexadecimal | Amostra | Função / Aplicação |
| :--- | :---: | :---: | :--- |
| **Amarelo Ouro Elétrico** | `#FFD700` | 🟡 | Cor Primária / Destaque de botões, energia e métricas principais |
| **Ciano Tecnológico** | `#00E5FF` | 🔵 | Cor Secundária / Accent de IoT, firmware e conectividade |
| **Verde Eficiência** | `#10B981` | 🟢 | Cor de Sucesso / Economia de energia e status de conexão ativo |
| **Vermelho Alerta** | `#FF4D4D` | 🔴 | Cor de Destaque / Picos de corrente e sobrecargas |
| **Preto Ultramarino** | `#0B0E14` | ⚫ | Fundo Principal da Landing Page e App (Dark Mode Premium) |
| **Cinza Superfície** | `#141824` | ⬛ | Fundo de Seções Alternadas e Barra de Navegação |
| **Cinza Card** | `#1A202E` | 🔳 | Fundo de Cards e Contêineres de Conteúdo |
| **Branco Puro** | `#F8FAFC` | ⚪ | Texto Primário de Alta Legibilidade |
| **Cinza Neutro** | `#94A3B8` | 🔘 | Texto Secundário e Legendas |

### 🔤 Tipografia

* **Fonte para Títulos:** [`Outfit`](https://fonts.google.com/specimen/Outfit) (Google Fonts) — Pesos 700, 800 e 900. Transmite modernidade, firmeza e inovação tecnológica.
* **Fonte para Textos e Leituras:** [`Inter`](https://fonts.google.com/specimen/Inter) (Google Fonts) — Pesos 300, 400, 500 e 600. Excelente legibilidade em telas de qualquer densidade de pixels.

---

## 7. 🚀 Estrutura de Arquivos da Landing Page

Seguindo as recomendações da Seção 6.2 do documento da atividade:

```
E-Energy/
├── docs/                       # Diretório publicado no GitHub Pages
│   ├── index.html              # Estrutura semântica da Landing Page (Todas as 9 seções)
│   ├── css/
│   │   └── style.css           # Folha de estilos, variáveis CSS, grid e responsividade
│   ├── js/
│   │   └── script.js           # Menu mobile acessível, scrollspy e calculadora ANEEL
│   ├── img/
│   │   ├── logo.png            # Logotipo oficial em alta resolução
│   │   ├── logo_banner.png     # Logotipo para banners e cabeçalhos
│   │   ├── logo.svg            # Logotipo vetorial nítido
│   │   └── favicon.png         # Ícone de aba do navegador
│   └── README.md               # Cópia da documentação
├── backend/                    # API Node.js / Express 5 / MongoDB Atlas
├── frontend/                   # Aplicativo Mobile React Native / Expo SDK 54
├── arduino/                    # Firmware C++ ESP32 com amostragem True RMS
├── arquitetura_seguranca_eenergy.md # Diretrizes de Segurança Zero Trust
└── README.md                   # Documentação completa do projeto
```

---

## 8. 🌐 Links de Publicação e Entrega

1. **Repositório GitHub:** [https://github.com/JUCAGIO1/E-Energy](https://github.com/JUCAGIO1/E-Energy)
2. **Landing Page GitHub Pages:** [https://jucagio1.github.io/E-Energy/](https://jucagio1.github.io/E-Energy/)
3. **Instagram Oficial:** [https://www.instagram.com/_e__energy](https://www.instagram.com/_e__energy)
