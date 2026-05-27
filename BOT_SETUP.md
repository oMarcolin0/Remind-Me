# 🤖 Como Rodar o Telegram Bot Localmente

## Problema Identificado

O bot não estava respondendo porque **não havia um servidor do bot rodando**. A Edge Function `enviar-lembretes` envia mensagens pelo Telegram, mas precisa de um bot para:

1. Responder aos comandos `/start CÓDIGO`
2. Retornar o Chat ID para o usuário
3. Validar a vinculação

---

## 📋 Pré-requisitos

```bash
# Você já tem Node.js instalado (confira)
node --version
npm --version
```

---

## 🚀 Instalação e Execução

### 1. Instalar dependências

```bash
cd reminder-men
npm install axios express
```

### 2. Rodar o bot localmente

```bash
# Terminal 1 - Bot (porta 3001)
node telegram-bot.js

# Você verá:
# 🤖 RemindMed Bot iniciado na porta 3001
# 📍 Webhook URL: http://localhost:3001/telegram-webhook
# ✅ Bot pronto para receber mensagens do Telegram!
```

### 3. Em outro terminal, testar localmente

```bash
# Terminal 2 - Testar a API do bot
curl http://localhost:3001/health

# Deve retornar:
# {"status":"ok","bot":"RemindMed running"}
```

---

## ✅ Usar o Bot no Telegram

### Passo 1: Abrir o Telegram
- Procure por **@Rem1ndeM3Bot** (seu bot)
- Ou clique no link: `https://t.me/Rem1ndeM3Bot`

### Passo 2: Obter seu Chat ID
```
/id
```
O bot responderá com seu Chat ID (ex: 1234567890)

### Passo 3: Testar no App RemindMed
1. Ir para Dashboard → Perfil
2. Clicar em "Vincular Telegram"
3. Copiar o código gerado
4. No Telegram, enviar ao bot:
   ```
   /start CÓDIGO
   ```
   (substitua CÓDIGO pelo código do app)

5. O bot responderá com seu Chat ID
6. Copiar e colar no modal do app

---

## 🧪 Recursos de Debug

### Ver contas vinculadas
```bash
curl http://localhost:3001/debug/linked-accounts

# Resposta:
# {
#   "total": 1,
#   "accounts": [
#     {
#       "code": "ABC123",
#       "chatId": 1234567890,
#       "name": "Pedro",
#       "linkedAt": "2025-02-24..."
#     }
#   ]
# }
```

### Ver info do bot
```bash
curl http://localhost:3001/info

# Resposta:
# {
#   "bot": "RemindMed Telegram Bot",
#   "version": "1.0.0",
#   "linkedAccounts": 1
# }
```

---

## 🌐 Em Produção (Depois)

Para produção, você precisa:

### Opção 1: Deploy com Railway/Render
```bash
# Railway CLI
railway link
railway up

# Copiar a URL pública gerada
# Exemplo: https://reminder-men-telegram.railway.app

# Configurar webhook no Telegram
curl -X POST https://api.telegram.org/bot8562420127:AAGyrKtiF_1_eT8t997nHzhuXek7suqhveM/setWebhook \
  -d url=https://seu-dominio.com/telegram-webhook
```

### Opção 2: Ngrok (para testar localmente com Telegram)
```bash
# Instalar ngrok
choco install ngrok  # Windows
# ou
brew install ngrok   # Mac

# Rodar ngrok
ngrok http 3001

# Copiar URL pública (ex: https://abc123def.ngrok.io)
# Usar como webhook: https://abc123def.ngrok.io/telegram-webhook
```

---

## 🛠️ Estrutura do Bot

```
telegram-bot.js
├── POST /telegram-webhook         # Recebe mensagens do Telegram
├── GET /health                    # Health check
├── GET /info                      # Info do bot
└── GET /debug/linked-accounts     # Ver vinculações (debug)

Comandos do Bot:
├── /start [CÓDIGO]               # Vincular conta
├── /id                            # Ver Chat ID
└── /help                          # Ver comandos
```

---

## ❌ Troubleshooting

### Bot não responde no Telegram
- [ ] Verificar se `node telegram-bot.js` está rodando
- [ ] Verificar se a porta 3001 não está sendo usada
- [ ] Confirmar token do bot está correto

### Webhook error
- [ ] Se usar ngrok, ngrok precisa estar rodando
- [ ] Certificar que URL do webhook está correta
- [ ] Ngrok URL expira em 8h - precisa regenerar

### Chat ID não funciona no app
- [ ] Garantir que o Chat ID foi copiado corretamente
- [ ] Verificar se o usuário tem `telegram_chat_id` no banco:
  ```sql
  SELECT id, telegram_chat_id FROM profiles;
  ```

---

## 📝 Próximos Passos

1. ✅ Rodar bot localmente
2. ✅ Testar vinculação no Telegram
3. ✅ Verificar Chat ID no banco
4. ✅ Criar medicamento com horário
5. ✅ Chamar Edge Function pra testar notificações
6. ⏭️ Configurar cron job (se quiser automático)
7. ⏭️ Deploy em produção

Agora tudo deve funcionar! 🎉
