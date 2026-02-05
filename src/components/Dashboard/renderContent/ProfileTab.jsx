import React from "react";
import { Settings,MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
const Portal = ({ children }) =>
  createPortal(children, document.body);


const ProfileTab = ({
    isTelegramLinked,
    openTelegramModal,
    openUserControlModal,
    medicines

}) => {
  return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h2>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
                U
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">[Nome do Usuário]</h3>
                <p className="text-gray-600">[email@exemplo.com]</p>
                <p className="text-gray-500">Membro desde [Mês Ano]</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Integrações</h3>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Telegram</h4>
                      <p className="text-sm text-gray-600">
                        {isTelegramLinked ? "Conta vinculada" : "Não vinculado"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={openTelegramModal}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isTelegramLinked
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                    }`}
                  >
                    {isTelegramLinked ? "Alterar" : "Vincular"}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700">Informações Pessoais</h4>
                <p className="text-gray-600">Idade: [Idade]</p>
                <p className="text-gray-600">Tipo Sanguíneo: [Tipo Sanguíneo]</p>
                <p className="text-gray-600">Alergias: [Alergias]</p>

                <button
                  onClick={openUserControlModal}
                  className="mt-4 w-full py-2 bg-[#20B2AA] text-white hover:bg-[#28c4ba] rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Settings size={16} />
                  <span>Gerenciar Minha Conta</span>
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700">Estatísticas de Saúde</h4>
                <p className="text-gray-600">Medicamentos ativos: {medicines.length}</p>
                <p className="text-gray-600">Adesão ao tratamento: [%]</p>
                <p className="text-gray-600">Última consulta: [Data]</p>
              </div>
            </div>
          </motion.div>
        );
}

export default ProfileTab