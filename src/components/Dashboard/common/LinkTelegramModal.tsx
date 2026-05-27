import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Smartphone, Check, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { generateVerificationCode, openTelegramChat } from '../../../lib/telegram';
import { useTelegramIntegration } from '../../../hooks/useTelegramIntegration';

// ─── Portal ───────────────────────────────────────────────────────────────────

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface LinkTelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => Promise<void> | void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const LinkTelegramModal = ({ isOpen, onClose, onSuccess }: LinkTelegramModalProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'initial' | 'waiting' | 'confirmed'>('initial');
  const [copied, setCopied] = useState(false);
  const [manualChatId, setManualChatId] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const {
    isLoading,
    saveTelegramChatId,
    unlinkTelegram,
    isLinked,
    error,
    createVerificationCode,
    fetchTelegramStatus,
  } = useTelegramIntegration();

  // Generate code when modal opens
  useEffect(() => {
    if (isOpen && step === 'initial') {
      const setupCode = async () => {
        try {
          const result = await createVerificationCode();
          setVerificationCode(result?.code ?? generateVerificationCode());
        } catch {
          setVerificationCode(generateVerificationCode());
        }
      };

      setupCode();
      setManualChatId('');
      setShowManualEntry(false);
    }
  }, [isOpen, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenTelegram = () => {
    if (verificationCode) {
      openTelegramChat(verificationCode);
      setStep('waiting');
    }
  };

  const handleCopyCode = () => {
    if (verificationCode) {
      navigator.clipboard.writeText(verificationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirmConnection = async () => {
    if (!manualChatId.trim()) {
      alert('Por favor, insira seu Chat ID do Telegram');
      return;
    }

    setIsValidating(true);

    try {
      const success = await saveTelegramChatId(manualChatId.trim());

      if (success) {
        // Refresh linked status in parent Dashboard
        await fetchTelegramStatus();
        setStep('confirmed');
        setTimeout(async () => {
          handleClose();
          await onSuccess?.();
        }, 1500);
      } else {
        alert('Erro ao salvar. Verifique o Chat ID e tente novamente.');
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleUnlink = async () => {
    if (window.confirm('Tem certeza que deseja desvincular sua conta do Telegram?')) {
      const success = await unlinkTelegram();
      if (success) {
        setStep('initial');
        await fetchTelegramStatus();
        alert('Conta desvinculada com sucesso!');
      }
    }
  };

  const handleClose = () => {
    setStep('initial');
    setManualChatId('');
    setShowManualEntry(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-[10001] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden backdrop-blur-sm"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={28} />
                    <div>
                      <h2 className="text-2xl font-bold">
                        {isLinked ? 'Gerenciar Telegram' : 'Vincular Telegram'}
                      </h2>
                      <p className="text-blue-100 text-sm">Receba lembretes de medicamentos</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Already linked */}
                {isLinked && step === 'initial' && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Check size={20} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-800">Telegram vinculado</h4>
                          <p className="text-sm text-green-600">Recebendo notificações</p>
                        </div>
                      </div>
                      <button
                        onClick={handleUnlink}
                        className="px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        Desvincular
                      </button>
                    </div>
                  </div>
                )}

                {/* Success message */}
                {step === 'confirmed' && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-green-600" />
                      <p className="text-green-700 font-medium">Telegram vinculado com sucesso!</p>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                      <MessageCircle size={40} className="text-blue-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <Smartphone size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Step: Initial (not linked) */}
                {step === 'initial' && !isLinked && (
                  <div className="space-y-4">
                    <p className="text-gray-600 text-center mb-6">
                      Vamos vincular sua conta do Telegram para receber lembretes automáticos.
                    </p>

                    {/* Verification Code */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-3">Código de verificação:</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white border-2 border-blue-300 rounded-lg p-3 font-mono text-xl font-bold text-center text-blue-600">
                          {verificationCode || '...'}
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className={`p-3 rounded-lg transition-all ${
                            copied ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                          title="Copiar código"
                        >
                          {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Copie este código — você precisará enviá-lo ao bot. Expira em 5 minutos.
                      </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-gray-800">Como fazer:</h4>
                      <ol className="space-y-2 text-sm text-gray-700">
                        {[
                          'Clique em "Abrir Telegram" abaixo',
                          'O bot receberá seu código automaticamente',
                          'Se não funcionar, envie o código manualmente ao bot',
                          'O bot responderá com seu Chat ID',
                          'Cole o Chat ID aqui e confirme',
                        ].map((step, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <button
                      onClick={handleOpenTelegram}
                      disabled={!verificationCode}
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <MessageCircle size={18} />
                      Abrir Telegram
                      <ExternalLink size={16} />
                    </button>

                    <button
                      onClick={() => setShowManualEntry(!showManualEntry)}
                      className="w-full py-2 px-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {showManualEntry ? '← Voltar' : 'Ou insira o Chat ID manualmente'}
                    </button>
                  </div>
                )}

                {/* Step: Waiting / Manual Entry */}
                {(step === 'waiting' || showManualEntry) && !isLinked && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Aguardando confirmação...</strong>
                        <br />
                        Depois que o bot confirmar, copie seu Chat ID e cole abaixo.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chat ID do Telegram
                      </label>
                      <input
                        type="text"
                        value={manualChatId}
                        onChange={(e) => setManualChatId(e.target.value)}
                        placeholder="Ex: 1234567890"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Você encontrará este ID na mensagem do bot
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setStep('initial');
                          setManualChatId('');
                          setShowManualEntry(false);
                        }}
                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        disabled={isValidating || isLoading}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleConfirmConnection}
                        disabled={!manualChatId.trim() || isValidating || isLoading}
                        className="flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isValidating || isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Conectando...
                          </>
                        ) : (
                          <>
                            <Check size={18} />
                            Confirmar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Linked — close button */}
                {step === 'initial' && isLinked && (
                  <div className="space-y-4">
                    <p className="text-gray-600 text-center">
                      Sua conta do Telegram está vinculada e você está recebendo lembretes automaticamente.
                    </p>
                    <button
                      onClick={handleClose}
                      className="w-full py-3 px-4 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-medium transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <p className="text-center text-xs text-gray-500">
                  Seus dados estão seguros. Usamos apenas para enviar lembretes.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default LinkTelegramModal;
