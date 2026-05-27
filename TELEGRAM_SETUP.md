# Blueprint de Configuração do Cron Job - Telegram Notificações

## 📋 Resumo

Este documento descreve como configurar o agendamento (cron job) para enviar notificações de medicamentos via Telegram.

## 🔧 Para Supabase Local (Docker)

### 1. Acessar o PostgreSQL Local

```bash
# Via Docker
docker exec -it supabase_db psql -U postgres -d postgres

# Ou via conexão direta (ajuste a porta conforme configurado)
psql -h localhost -p 54322 -U postgres -d postgres
```

### 2. Habilitar a Extensão pg_cron

```sql
-- Ativar extensão pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Ativar extensão http (para chamadas HTTP)
CREATE EXTENSION IF NOT EXISTS pgsql_http;
```

### 3. Configurar o Cron Job

```sql
-- Agendar job para rodar a cada minuto
SELECT cron.schedule(
  'send-medicine-reminders',
  '* * * * *',
  $$
  SELECT
    http_post(
      'http://127.0.0.1:54321/functions/v1/enviar-lembretes',
      '{}',
      'application/json'
    );
  $$
);

-- Listar jobs agendados
SELECT * FROM cron.job;

-- Remover job se necessário
SELECT cron.unschedule('send-medicine-reminders');
```

## 🌐 Para Supabase Cloud (Produção)

No Supabase Cloud, `pg_cron` já está habilitado. Use o Dashboard ou:

```sql
-- O código SQL acima funciona igual
-- Apenas garantir que o token do Telegram está configurado nos secrets
```

## 📊 Frequências de Agendamento

- `'* * * * *'` → A cada minuto ⏱️
- `'*/5 * * * *'` → A cada 5 minutos
- `'0 * * * *'` → A cada hora (início)
- `'0 */6 * * *'` → A cada 6 horas
- `'0 9 * * *'` → Todos os dias às 09:00
- `'0 9 * * 1'` → Todas as segundas às 09:00

## 🧪 Testando

### 1. Chamar Edge Function Manualmente

```bash
# Via curl
curl -X POST http://localhost:54321/functions/v1/enviar-lembretes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-anon-key>" \
  -d '{}'
```

### 2. Verificar Logs

```bash
# Se usando Docker Compose
docker logs supabase_edge-runtime
```

### 3. Validar Mensagens Telegram

- Abra o Telegram
- Procure por mensagens de notyificação do seu bot
- Confirme que as notificações estão chegando

## 🔐 Variáveis de Ambiente

Certifique-se que `TELEGRAM_BOT_TOKEN` está configurado:

**Local (.env.local):**
```
TELEGRAM_BOT_TOKEN=8562420127:AAGyrKtiF_1_eT8t997nHzhuXek7suqhveM
```

**Cloud (Dashboard Supabase):**
- Vá em Settings → Functions
- Configure a secret `TELEGRAM_BOT_TOKEN`

## 💡 Troubleshooting

### Cron não está rodando
- [ ] Verificar se pg_cron está habilitado: `SELECT * FROM pg_extension WHERE extname = 'pg_cron';`
- [ ] Verificar se a função está habilitada
- [ ] Consultar logs: `SELECT * FROM cron.job_run_details ORDER BY end_time DESC LIMIT 10;`

### Mensagens não chegando
- [ ] Verificar se usuário tem `telegram_chat_id` no banco
- [ ] Verificar se medicamentos têm `times` configurado corretamente
- [ ] Validar token do Telegram
- [ ] Consultar logs da Edge Function

### Erro de autenticação
- [ ] Verificar se o token está correto no `.env.local`
- [ ] Reiniciar containers: `docker compose down && docker compose up`

## 📝 Próximas Etapas

- [ ] Implementar sistema de confirmação (user confirma que tomou)
- [ ] Adicionar histórico de notificações
- [ ] Suporte a múltiplos horários por medicamento
- [ ] Notificações com teclado (botões) no Telegram
