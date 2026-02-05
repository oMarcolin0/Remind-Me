import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { createPortal } from "react-dom";

// Portal local do modal
const Portal = ({ children }) =>
  createPortal(children, document.body);

const LinkTelegramModal = ({
  isOpen,
  onClose,
  telegramUsername,
  setTelegramUsername,
  onLinkTelegram
}) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
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
              className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={24} />
                    <div>
                      <h2 className="text-xl font-bold">Vincular Telegram</h2>
                      <p className="text-white/80 text-sm">
                        Receba lembretes no Telegram
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username do Telegram
                  </label>
                  <div className="flex">
                    <span className="px-3 flex items-center bg-gray-100 border border-r-0 rounded-l-lg">
                      @
                    </span>
                    <input
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-r-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="seuusuario"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 bg-gray-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={onLinkTelegram}
                    className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg"
                  >
                    Vincular Conta
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default LinkTelegramModal;
