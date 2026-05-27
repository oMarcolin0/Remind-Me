# 🚀 Quick Start - RemindMed Telegram Integration

Tudo está pronto! Aqui está o caminho mais rápido para testar.

---

## ℹ️ Sobre Segurança

✅ **O token do Telegram agora é lido do `.env`** (não hardcoded no código)
- `.env` está no `.gitignore` - nunca será commitado
- Token está seguro e não exposto no repositório
- Use a mesma variável `VITE_TELEGRAM_BOT_TOKEN` do frontend

---

## ⚡ 3 Passos Rápidos

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Rodar o Bot Telegram (Terminal 1)
```bash
npm run bot

# Você verá:
# 🤖 RemindMed Bot iniciado na porta 3001
# ✅ Bot pronto para receber mensagens do Telegram!
```

Se der erro de token, verifique se o `.env` tem:
```
VITE_TELEGRAM_BOT_TOKEN=8562420127:AAGyrKtiF_1_eT8t997nHzhuXek7suqhveM
```

### 3️⃣ Rodar App + Backend (Terminal 2)
```bash
npm run dev
# Frontend: http://localhost:5173

# (Em outro terminal se quiser)
supabase start
# Backend: http://localhost:54321
```

---

## 🎯 Teste Completo (5 min)

### 1. No App RemindMed
```
http://localhost:5173
Dashboard → Perfil → Vincular Telegram
Copiar código (ex: ABC123)
```

### 2. No Telegram
```
Procure: @Rem1ndeM3Bot
Envie: /start ABC123

Bot responde com Chat ID
```

### 3. De volta no App
```
Colar Chat ID no modal
Clique: Confirmar
```

### 4. Criar Medicamento
```
Nome: Dipirona
Dosagem: 500mg
Horário: 14:30 (próxima hora)
```

### 5. Testar
```bash
curl -X POST http://localhost:54321/functions/v1/enviar-lembretes \
  -H "Content-Type: application/json" \
  -d '{}'
```

✅ Você receberá no Telegram! 🎉

---

## 📚 Mais Detalhes

- `QUICKSTART.md` ← Você está aqui
- `BOT_SETUP.md` - Produção e debug
- `FIXES_SUMMARY.md` - Detalhes técnicos
