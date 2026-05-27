import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { generateVerificationCode } from '../lib/telegram';
import type { TelegramIntegrationReturn } from '../types';

/**
 * Hook para gerenciar integração Telegram do usuário.
 */
export const useTelegramIntegration = (): TelegramIntegrationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [telegramChatId, setTelegramChatId] = useState<string | null>(null);
  const [isLinked, setIsLinked] = useState(false);

  /** Busca o status de vinculação do Telegram do usuário */
  const fetchTelegramStatus = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Usuário não autenticado');
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('telegram_chat_id')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        console.error('Erro ao buscar status Telegram:', fetchError);
        return;
      }

      if (data?.telegram_chat_id) {
        setTelegramChatId(data.telegram_chat_id as string);
        setIsLinked(true);
      } else {
        setTelegramChatId(null);
        setIsLinked(false);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro ao buscar status Telegram:', message);
      setError(message);
    }
  }, []);

  /** Cria um código de verificação e salva no profile do usuário (expira em 5 minutos) */
  const createVerificationCode = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const code = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ telegram_verification_code: code, telegram_code_expires_at: expiresAt })
        .eq('id', user.id);

      if (updateError) throw updateError;

      return { code, expiresAt };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro ao criar código de verificação:', message);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Salva o chat_id do Telegram para o usuário */
  const saveTelegramChatId = useCallback(async (chatId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ telegram_chat_id: chatId })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setTelegramChatId(chatId);
      setIsLinked(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro ao salvar chat_id do Telegram:', message);
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Remove a vinculação do Telegram */
  const unlinkTelegram = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ telegram_chat_id: null })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setTelegramChatId(null);
      setIsLinked(false);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro ao desvincular Telegram:', message);
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    telegramChatId,
    isLinked,
    fetchTelegramStatus,
    saveTelegramChatId,
    unlinkTelegram,
    createVerificationCode,
  };
};
