# 🛡️ E-Energy: Arquitetura de Segurança & Produto Comercial

Este documento estabelece as diretrizes de **Segurança de Informação**, **Criptografia**, **Topologia de Hardware** e **Estratégia de Negócio** para transformar o projeto E-Energy em uma solução comercializável (Startup / Produto B2C e B2B).

---

## 1. 🔒 Segurança contra Hacks e Proteção do Backend

Para vender o E-Energy com nível industrial de segurança, a comunicação entre o aplicativo, o hardware (quadro de disjuntores) e a nuvem segue o padrão **Zero Trust (Confiança Zero)**.

### A. Autenticação Dispositivo-Servidor (HMAC-SHA256 & eFuse)
- **Segredo do Dispositivo**: Cada ESP32/HUB produzido possui uma chave secreta de 256 bits gravada na memória **eFuse** do chip (impossível de ser lida externamente via software).
- **Assinatura de Requisições**: As medições enviadas não usam apenas senhas simples. Cada pacote contém uma assinatura digital `HMAC-SHA256(timestamp + payload, chave_secreta)`. A API rejeita qualquer pacote adulterado.

### B. Proteção da API (Ocultação de Endereços)
- **API Gateway + Reverse Proxy (Cloudflare / NGINX)**: O endereço IP real do banco de dados e do backend nunca é exposto ao mundo exterior.
- **HTTPS Mandatório (TLS 1.3)**: Todo o tráfego de dados é criptografado em trânsito.
- **Rate Limiting & Anti-DDoS**: Limita o número de requisições por segundo por IP/Dispositivo para impedir ataques de negação de serviço.

---

## 2. ⚡ Topologia de Hardware: Quadro de Disjuntores + Tomadas Inteligentes

### A. HUB Central (Caixa de Disjuntores)
- **Localização**: Trilho DIN do Quadro de Distribuição de Luz.
- **Função**: Medir a corrente geral da casa e circuitos de alta potência (Chuveiro, Ar Condicionado).
- **Protocolo de Comunicação**: Atua como um **Gateway Central**.

### B. Módulos de Tomada (Smart Sockets)
- **Chip de Medição de Energia**: Cobre o uso de chips de baixíssimo custo de medição elétrica dedicada, como **HLW8012**, **BL0937** ou **PZEM-004T**.
- **Comunicação Sem Fio Sem Roteador (ESP-NOW)**:
  - Os módulos das tomadas **não precisam da senha do Wi-Fi da casa**.
  - Eles conversam diretamente com o Gateway da caixa de disjuntores via **ESP-NOW** (protocolo proprietário da Espressif, operando em 2.4GHz com criptografia AES-128 nativa de baixíssima latência e consumo mínimo).

---

## 3. 🏡 Modo "Local-First" e Privacidade Total do Cliente

Para que a responsabilidade de segurança e privacidade pertença ao proprietário da residência:

1. **Funcionamento 100% Offline (Sem Internet)**:
   - Se a internet da operadora cair ou o cliente não quiser enviar dados para a nuvem, o aplicativo se conecta diretamente ao Gateway local via protocolo **mDNS / WebSockets locais**.
   - Os dados históricos ficam armazenados na memória flash do Gateway ou em um cartão microSD local.

2. **Criptografia Fim-a-Fim no App**:
   - Apenas o usuário que possui a chave de emparelhamento (código QR impresso no dispositivo) consegue visualizar os dados de consumo.

---

## 4. 📈 Modelo de Negócio Comercial (Monetização)

1. **Venda de Hardware (Kits)**:
   - *Kit Starter*: 1 Gateway Central para Caixa de Disjuntores + 2 Tomadas Inteligentes.
   - *Kit Premium*: 1 Gateway Central + Medidores para 4 Circuitos de Disjuntores + 5 Tomadas Inteligentes.

2. **Assinatura de Software (SaaS / Premium App)**:
   - *Gratuito*: Dashboard local, alertas em tempo real e controle de relé.
   - *Plano Premium (R$ 9,90/mês)*: Inteligência Artificial no backend para prever valor da conta de luz no final do mês, detecção automática de aparelhos com defeito e backup na nuvem.
