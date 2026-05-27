# 🧪 Teste da Integração Telegram

Parabéns! Implementamos toda a integração Telegram. Aqui está o passo a passo para testar tudo funcionando.

## ✅ Checklist de Testes

### 1. **Frontend - Vincular Telegram**

```
[ ] Ir para Dashboard → Perfil
[ ] Clicar em "Vincular" na seção Telegram
[ ] Modal abre com código de verificação
[ ] Copiar código (button de copy)
[ ] Clicar "Abrir Telegram"
[ ] Enviar código ao bot da Rem1ndeM3Bot (@Rem1ndeM3Bot no Telegram)
    - Se o bot não responder ainda, copiar o seu Chat ID manualmente
    - Pode ser obtido via @userinfobot no Telegram
[ ] Colar Chat ID no modal
[ ] Clicar "Confirmar"
[ ] ✅ Mensagem de sucesso deve aparecer
```

### 2. **Banco de Dados - Verificar Armazenamento**

```sql
-- Conectar ao Supabase local/cloud
SELECT id, telegram_chat_id FROM profiles WHERE id = 'seu-user-id';

-- Resultado esperado:
-- id                  | telegram_chat_id
-- abc123def456       | 1234567890
```

### 3. **Edge Function - Testar Manualmente**

```bash
# Terminal - Chamar a edge function
curl -X POST http://localhost:54321/functions/v1/enviar-lembretes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sua-anon-key" \
  -d '{}'

# Resposta esperada:
# {
#   "success": true,
#   "message": "Processo de notificações concluído",
#   "currentTime": "14:30",
#   "sent": 1,
#   "failed": 0,
#   "sentNotifications": ["med-id-123"],
#   "failedNotifications": []
# }
```

### 4. **Criar Medicamento com Horário**

```
[ ] Dashboard → Adicionar Medicamento
[ ] Preencher:
    - Nome: "Dipirona"
    - Dosagem: "500mg"
    - Horários: "14:30" (mesmo horário da hora atual, para teste rápido)
[ ] Salvar
[ ] Verificar no banco se foi criado
```

### 5. **Testar Notificação**

**Opção A - Manual (imediato):**
```bash
# Chamar novamente a edge function quando chegar o horário configurado
curl -X POST http://localhost:54321/functions/v1/enviar-lembretes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sua-anon-key" \
  -d '{}'
```

**Opção B - Automático (via cron):**
1. Seguir instruções em `TELEGRAM_SETUP.md`
2. Configurar cron job
3. Aguardar o horário do medicamento
4. Verificar Telegram se recebeu mensagem

### 6. **Validar Mensagem Telegram**

```
[ ] Abrir Telegram
[ ] Procurar conversa com RemindMed_Bot
[ ] Mensagem esperada:
    💊 Hora de tomar seu medicamento!

    Medicamento: Dipirona
    Dosagem: 500mg

    ⏰ Não esqueça!
[ ] ✅ Mensagem recebida = Sucesso!
```

---

## 🔍 Debugging

### Logs da Edge Function

```bash
# Ver logs em tempo real
docker logs -f supabase_edge-runtime

# Procurar por:
# - "Notificação enviada" = sucesso
# - "Erro ao enviar notificação" = erro
```

### Verificar Status

```sql
-- Medicamentos que devem enviar notificação agora
SELECT id, name, dosage, times FROM medicines
WHERE times ? CURRENT_TIME::text;

-- Usuários com Telegram vinculado
SELECT email, telegram_chat_id FROM profiles;

-- Contagem de medicamentos por vez
SELECT times, COUNT(*) FROM medicines GROUP BY times;
```

---

## 🚀 Próximas Funcionalidades (Futuro)

- [ ] Bot responder com teclado (botões "Tomei" / "Pular")
- [ ] Histórico de confirmação de medicamentos
- [ ] Lembretes com 15min de antecedência
- [ ] Notificações customizáveis (som, vibração)
- [ ] Telemetria (quantas notificações foram enviadas)

---

## 📞 Dúvidas?

Se algo não funcionar:
1. Verificar logs (`docker logs supabase_edge-runtime`)
2. Confirmar token do Telegram em `.env` e `supabase/.env.local`
3. Garantir que usuário tem `telegram_chat_id` no banco
4. Verificar que medicamento tem `times` preenchido

**Boa sorte!** 🎉
