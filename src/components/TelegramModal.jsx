import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Smartphone, Check, ExternalLink } from "lucide-react";

// Componente Portal
const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) return null;
  return createPortal(children, document.body);
};

export const TelegramModal = ({ 
  isOpen, 
  onClose, 
  onLink, 
  isLinked = false,
  currentUsername = ""
}) => {
  const [username, setUsername] = useState(currentUsername);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Resetar o estado quando o modal abrir
  React.useEffect(() => {
    if (isOpen) {
      setUsername(currentUsername);
      setSuccessMessage("");
    }
  }, [isOpen, currentUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert("Por favor, informe seu username do Telegram");
      return;
    }

    // Validar formato do username
    const cleanUsername = username.replace('@', '').trim();
    if (cleanUsername.length < 5) {
      alert("Username do Telegram deve ter pelo menos 5 caracteres");
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      // Simular uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Chamar a função de vinculação do Dashboard
      if (onLink) {
        onLink(cleanUsername);
      }
      
      setSuccessMessage(`Conta @${cleanUsername} vinculada com sucesso!`);
      
      // Fechar o modal após 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      alert("Erro ao vincular conta. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlink = () => {
    if (window.confirm("Deseja realmente desvincular sua conta do Telegram?")) {
      alert("Conta do Telegram desvinculada com sucesso!");
      onClose();
      // Aqui você pode chamar uma função para desvincular
    }
  };

  const openTelegramGuide = () => {
    window.open("https://telegram.org/", "_blank");
  };

  const openUsernameGuide = () => {
    window.open("https://telegram.org/faq#usernames-and-t-me", "_blank");
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 z-[10001] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden backdrop-blur-sm"
              >
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MessageCircle size={28} />
                      <div>
                        <h2 className="text-2xl font-bold">
                          {isLinked ? "Gerenciar Telegram" : "Vincular Telegram"}
                        </h2>
                        <p className="text-blue-100 text-sm">
                          {isLinked 
                            ? "Conta vinculada - Receba lembretes automáticos" 
                            : "Receba lembretes no seu Telegram"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  {/* Status atual */}
                  {isLinked && (
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

                  {/* Mensagem de sucesso */}
                  {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Check size={20} className="text-green-600" />
                        <p className="text-green-700 font-medium">{successMessage}</p>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
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
                    
                    <p className="text-gray-600 text-center mb-6">
                      {isLinked 
                        ? "Sua conta do Telegram está vinculada e você receberá lembretes automáticos dos seus medicamentos."
                        : "Vincule sua conta do Telegram para receber lembretes dos seus medicamentos diretamente no seu celular."}
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seu username do Telegram
                          <button
                            type="button"
                            onClick={openUsernameGuide}
                            className="ml-2 text-blue-500 hover:text-blue-600 text-xs inline-flex items-center gap-1"
                          >
                            (como encontrar?)
                            <ExternalLink size={12} />
                          </button>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            @
                          </div>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLinked || isLoading}
                            className={`w-full pl-8 pr-4 py-3 border-2 ${isLinked ? 'bg-gray-100' : 'bg-white'} border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                            placeholder="seuusuario"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Digite sem o @. Exemplo: <span className="font-mono">seuusuario</span>
                        </p>
                      </div>

                      {/* Benefícios */}
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                          <Check size={16} />
                          Benefícios da vinculação:
                        </h4>
                        <ul className="space-y-2 text-sm text-blue-700">
                          <li className="flex items-start gap-2">
                            <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Lembretes instantâneos no horário correto</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Confirmação de uso dos medicamentos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Notificações de consultas agendadas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Acesso rápido ao seu histórico</span>
                          </li>
                        </ul>
                      </div>

                      {/* Aviso se não tiver Telegram */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800">
                          <strong>Não tem Telegram?</strong>{" "}
                          <button
                            type="button"
                            onClick={openTelegramGuide}
                            className="text-blue-600 hover:text-blue-800 font-medium underline inline-flex items-center gap-1"
                          >
                            Baixe o app gratuitamente
                            <ExternalLink size={14} />
                          </button>
                        </p>
                      </div>

                      {/* Botões de ação */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                          disabled={isLoading}
                        >
                          Cancelar
                        </button>
                        
                        {isLinked ? (
                          <button
                            type="button"
                            onClick={handleUnlink}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                          >
                            <span>Desvincular</span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isLoading || !username.trim()}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                              username.trim() && !isLoading
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {isLoading ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Vinculando...</span>
                              </>
                            ) : (
                              <>
                                <MessageCircle size={18} />
                                <span>Vincular Conta</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                {/* Rodapé */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <p className="text-center text-xs text-gray-500">
                    Suas informações estão seguras. Usamos apenas para enviar notificações.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};