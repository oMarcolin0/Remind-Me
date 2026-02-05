import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { 
  Pill,PlusCircle,
  Clock, CheckCircle,
  MessageCircle
} from "lucide-react";

const Portal = ({ children }) =>
  createPortal(children, document.body);


const ListMedicinesTab = ({ 
  activeTab,
  medicines,
  openTelegramModal,
  historyFilter,
  setHistoryFilter,
  historyData,
  setActiveTab,
  handleGenerateReport

 }) => {
  return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#20B2AA]/10 rounded-lg">
                    <Pill size={20} className="text-[#20B2AA]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Medicamentos</p>
                    <h3 className="text-2xl font-bold text-gray-800">{medicines.length}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Total cadastrados</p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tomados Hoje</p>
                    <h3 className="text-2xl font-bold text-gray-800">{medicines.filter(m => m.completed).length}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">De {medicines.length} medicamentos</p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pendentes</p>
                    <h3 className="text-2xl font-bold text-gray-800">{medicines.filter(m => !m.completed).length}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Para tomar hoje</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 shadow-md border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Receba lembretes no Telegram</h3>
                    <p className="text-gray-600">Vincule sua conta e receba notificações dos seus medicamentos</p>
                  </div>
                </div>
                <button
                  onClick={openTelegramModal}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Vincular Agora
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Medicamentos de Hoje</h2>
                  <p className="text-gray-600">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <button
                  onClick={() => setActiveTab("add-medicine")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#20B2AA] text-white hover:bg-[#28c4ba] rounded-lg font-medium transition-colors"
                >
                  <PlusCircle size={18} />
                  <span>Adicionar Medicamento</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {medicines.length === 0 ? (
                  <div className="text-center py-8">
                    <Pill size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Nenhum medicamento cadastrado</p>
                    <button
                      onClick={() => setActiveTab("add-medicine")}
                      className="mt-3 text-[#20B2AA] hover:text-[#28c4ba] font-medium"
                    >
                      Cadastre seu primeiro medicamento
                    </button>
                  </div>
                ) : (
                  medicines.map((medicine) => (
                    <motion.div
                      key={medicine.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                        medicine.completed 
                          ? "bg-green-50 border-green-200" 
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleComplete(medicine.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              medicine.completed 
                                ? "bg-green-500 border-green-500" 
                                : "border-[#20B2AA]"
                            }`}
                          >
                            {medicine.completed && (
                              <CheckCircle size={14} className="text-white" />
                            )}
                          </button>
                          <div>
                            <h3 className={`font-semibold ${
                              medicine.completed ? "text-gray-500 line-through" : "text-gray-800"
                            }`}>
                              {medicine.name}
                            </h3>
                            <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.type}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {medicine.times?.map((time, index) => (
                              <span 
                                key={index}
                                className={`px-2 py-1 rounded text-sm font-medium ${
                                  medicine.completed
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-[#20B2AA]/10 text-[#20B2AA]"
                                }`}
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        );
}

export default ListMedicinesTab