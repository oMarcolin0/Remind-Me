// Telegram front-end utility library
// NOTE: BOT_TOKEN is intentionally NOT here. It must only live on the server (telegram-bot.js).

const BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

/**
 * Gera um código aleatório de 6 caracteres alfanuméricos maiúsculos para verificação.
 */
export const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * Cria um Deep Link para abrir o Telegram com o bot e o código de verificação.
 */
export const createTelegramDeepLink = (verificationCode: string): string => {
  return `https://t.me/${BOT_USERNAME}?start=${verificationCode}`;
};

/**
 * Abre o chat com o bot no Telegram em uma nova aba.
 */
export const openTelegramChat = (verificationCode: string): void => {
  const link = createTelegramDeepLink(verificationCode);
  window.open(link, '_blank');
};

/**
 * Valida se um código possui o formato correto (6 caracteres alfanuméricos maiúsculos).
 */
export const isValidVerificationCode = (code: string): boolean => {
  return Boolean(code && code.length === 6 && /^[A-Z0-9]+$/.test(code));
};
