import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, Calendar, CheckCircle,History, CalendarDays, TrendingUp, BarChart3, FileText } from "lucide-react";
import { motion } from "framer-motion";

const HistoryTab = ({
    handleGenerateReport,
    historyFilter,
    historyData,
    setHistoryFilter
}) => {
  return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <History className="text-[#20B2AA]" size={28} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Histórico de Medicamentos</h2>
                    <p className="text-gray-600">Acompanhe sua adesão ao tratamento</p>
                  </div>
                </div>
                <button
                  onClick={handleGenerateReport}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  <FileText size={18} />
                  <span>Gerar Relatório</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => setHistoryFilter("day")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    historyFilter === "day"
                      ? "bg-[#20B2AA] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <CalendarDays size={18} />
                  <span>Diário</span>
                </button>
                <button
                  onClick={() => setHistoryFilter("month")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    historyFilter === "month"
                      ? "bg-[#20B2AA] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Calendar size={18} />
                  <span>Mensal</span>
                </button>
                <button
                  onClick={() => setHistoryFilter("year")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    historyFilter === "year"
                      ? "bg-[#20B2AA] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <BarChart3 size={18} />
                  <span>Anual</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="text-blue-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Adesão Atual</p>
                      <h3 className="text-2xl font-bold text-gray-800">[%]</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Média dos últimos 30 dias</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="text-green-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Tomados</p>
                      <h3 className="text-2xl font-bold text-gray-800">[Número]</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Total em [Ano]</p>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="text-amber-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Pularam</p>
                      <h3 className="text-2xl font-bold text-gray-800">[Número]</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Total em [Ano]</p>
                </div>
              </div>
            </div>

            {historyFilter === "day" && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Histórico Diário</h3>
                <div className="space-y-4">
                  {historyData.daily.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhum histórico disponível</p>
                  ) : (
                    historyData.daily.map((item) => (
                      <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.medicine}</h4>
                            <p className="text-sm text-gray-600">{item.dosage} • {item.date} às {item.time}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === "Tomado"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {historyFilter === "month" && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Histórico Mensal</h3>
                <div className="space-y-6">
                  {historyData.monthly.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhum histórico mensal disponível</p>
                  ) : (
                    historyData.monthly.map((item, index) => (
                      <div key={index} className="p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">{item.month}</h4>
                            <p className="text-gray-600">Resumo do mês</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              item.adherence >= 90 ? "text-green-600" : 
                              item.adherence >= 80 ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {item.adherence}%
                            </div>
                            <p className="text-sm text-gray-600">Adesão</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Medicamentos</p>
                            <p className="text-lg font-semibold text-gray-800">{item.totalMedicines}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-600">Tomados</p>
                            <p className="text-lg font-semibold text-green-800">{item.taken}</p>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <p className="text-sm text-yellow-600">Pendentes</p>
                            <p className="text-lg font-semibold text-yellow-800">{item.missed}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-600">Taxa de Sucesso</p>
                            <p className="text-lg font-semibold text-blue-800">
                              {Math.round((item.taken / item.totalMedicines) * 100)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {historyFilter === "year" && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Histórico Anual</h3>
                <div className="space-y-6">
                  {historyData.yearly.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhum histórico anual disponível</p>
                  ) : (
                    historyData.yearly.map((item, index) => (
                      <div key={index} className="p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">Ano {item.year}</h4>
                            <p className="text-gray-600">Resumo anual</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              item.adherence >= 90 ? "text-green-600" : 
                              item.adherence >= 80 ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {item.adherence}%
                            </div>
                            <p className="text-sm text-gray-600">Adesão anual</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">Total de Medicamentos</span>
                            <span className="font-semibold text-gray-800">{item.totalMedicines}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-green-700">Tomados com Sucesso</span>
                            <span className="font-semibold text-green-800">{item.taken}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                            <span className="text-yellow-700">Não Tomados</span>
                            <span className="font-semibold text-yellow-800">{item.missed}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-blue-700">Taxa de Cumprimento</span>
                            <span className="font-semibold text-blue-800">{item.adherence}%</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>
        );
}

export default HistoryTab