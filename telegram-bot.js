import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.TELEGRAM_BOT_PORT || 3001;

// ─── Validate env vars ────────────────────────────────────────────────────────

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET; // optional but recommended

if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN não configurado no .env');
  process.exit(1);
}

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// ─── Supabase ─────────────────────────────────────────────────────────────────

let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  console.log('✅ Supabase conectado');
} else {
  console.warn('⚠️  Supabase service key/URL não configurados. Vinculação automática não funcionará.');
}

// In-memory fallback (dev/debug only)
const verificationCodes = new Map();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(express.json());

// Rate limiting — 30 requests/minute per IP on all routes
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
});
app.use(limiter);

// ─── Webhook secret guard ────────────────────────────────────────────────────

const requireWebhookSecret = (req, res, next) => {
  if (!WEBHOOK_SECRET) return next(); // skip if not configured
  const token = req.headers['x-telegram-bot-api-secret-token'];
  if (token !== WEBHOOK_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  return next();
};

// ─── Webhook endpoint ─────────────────────────────────────────────────────────

app.post('/telegram-webhook', requireWebhookSecret, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) return res.sendStatus(200);

    const chatId = message.chat?.id;
    const text = message.text;
    const userId = message.from?.id;

    if (!chatId) return res.sendStatus(200);

    // ── /start [code] ────────────────────────────────────────────────────────
    if (text?.startsWith('/start')) {
      const code = text.split(' ')[1];

      if (!code) {
        await sendMessage(
          chatId,
          '👋 Bem-vindo ao RemindMed!\n\nEste é um bot para receber lembretes de medicamentos.\n\n' +
          'Para vincular sua conta, abra o app e clique em "Vincular Telegram".',
        );
        return res.sendStatus(200);
      }

      if (code.length !== 6 || !/^[A-Z0-9]+$/.test(code)) {
        await sendMessage(chatId, '❌ Código inválido. Deve ter 6 caracteres alfanuméricos.');
        return res.sendStatus(200);
      }

      if (!supabase) {
        // Fallback: store in memory and tell user their Chat ID
        verificationCodes.set(code, { chatId, userId, firstName: message.from?.first_name, timestamp: new Date() });
        await sendMessage(
          chatId,
          `✅ Código recebido.\n\nSeu Chat ID: <code>${chatId}</code>\n\nCopie este número e cole no app RemindMed para completar a vinculação.`,
        );
        return res.sendStatus(200);
      }

      // Try automatic linking via Supabase
      try {
        const nowIso = new Date().toISOString();
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, telegram_verification_code, telegram_code_expires_at')
          .eq('telegram_verification_code', code)
          .gt('telegram_code_expires_at', nowIso)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Erro ao buscar profile por código:', error.message);
          await sendMessage(chatId, '❌ Erro interno ao verificar código. Tente novamente mais tarde.');
          return res.sendStatus(200);
        }

        if (!profile) {
          await sendMessage(
            chatId,
            `Código não encontrado ou expirado.\n\nSeu Chat ID: <code>${chatId}</code>\n\nCopie este número e cole no app RemindMed para completar a vinculação.`,
          );
          return res.sendStatus(200);
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            telegram_chat_id: String(chatId),
            telegram_verification_code: null,
            telegram_code_expires_at: null,
          })
          .eq('id', profile.id);

        if (updateError) {
          console.error('Erro ao atualizar profile:', updateError.message);
          await sendMessage(chatId, '❌ Erro ao vincular conta. Tente novamente mais tarde.');
          return res.sendStatus(200);
        }

        console.log(`✅ Código ${code} vinculado ao chat ${chatId} (profile ${profile.id})`);

        await sendMessage(
          chatId,
          `✅ Conta vinculada com sucesso!\n\nSeu Chat ID: <code>${chatId}</code>\n\nAgora você receberá lembretes de medicamentos no horário certo! 💊`,
        );
      } catch (err) {
        console.error('Erro ao processar /start com supabase:', err.message);
        await sendMessage(chatId, '❌ Erro interno ao processar o código.');
      }

      return res.sendStatus(200);
    }

    // ── /help ────────────────────────────────────────────────────────────────
    if (text === '/help') {
      await sendMessage(
        chatId,
        '🤖 <b>RemindMed Bot</b>\n\n' +
        'Comandos disponíveis:\n' +
        '/start [CÓDIGO] - Vincular sua conta\n' +
        '/id - Ver seu Chat ID\n' +
        '/help - Mostrar esta mensagem\n\n' +
        'Você receberá lembretes automáticos no horário dos seus medicamentos!',
      );
      return res.sendStatus(200);
    }

    // ── /id ──────────────────────────────────────────────────────────────────
    if (text === '/id') {
      await sendMessage(chatId, `🆔 Seu Chat ID:\n<code>${chatId}</code>\n\nUse este ID para vincular no app RemindMed.`);
      return res.sendStatus(200);
    }

    // ── Default ───────────────────────────────────────────────────────────────
    await sendMessage(
      chatId,
      'Olá! 👋\n\nPara vincular sua conta, abra o app RemindMed e clique em "Vincular Telegram".\n\nDigite /help para ver os comandos.',
    );

    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error.message);
    res.sendStatus(500);
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function sendMessage(chatId, text, parseMode = 'HTML') {
  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: parseMode,
    });
    console.log(`📤 Mensagem enviada para ${chatId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Erro ao enviar mensagem: ${error.response?.data?.description || error.message}`);
    throw error;
  }
}

async function setWebhook(webhookUrl) {
  const params = { url: webhookUrl, allowed_updates: ['message'] };
  if (WEBHOOK_SECRET) params.secret_token = WEBHOOK_SECRET;
  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/setWebhook`, params);
    console.log('✅ Webhook configurado:', response.data);
  } catch (error) {
    console.error('❌ Erro ao configurar webhook:', error.response?.data || error.message);
  }
}

async function deleteWebhook() {
  try {
    await axios.post(`${TELEGRAM_API_URL}/deleteWebhook`);
    console.log('✅ Webhook removido');
  } catch (error) {
    console.error('❌ Erro ao remover webhook:', error.message);
  }
}

// ─── Public endpoints ─────────────────────────────────────────────────────────

app.get('/health', (_req, res) => res.json({ status: 'ok', bot: 'RemindMed running' }));
app.get('/telegram-webhook', (_req, res) => res.send('Webhook ativo!'));

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, async () => {
  console.log(`\n🤖 RemindMed Bot iniciado na porta ${PORT}`);
  console.log(`📍 Webhook URL: http://localhost:${PORT}/telegram-webhook`);
  console.log(`\n⚠️  Para produção, defina uma URL pública (ngrok, Railway, etc.) e configure o webhook:`);
  console.log(`   npx ngrok http ${PORT}  → copie a URL HTTPS`);
  console.log(`   GET ${TELEGRAM_API_URL}/setWebhook?url=<SUA_URL>/telegram-webhook\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Encerrando bot...');
  await deleteWebhook();
  process.exit(0);
});
