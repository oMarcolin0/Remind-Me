import {  React, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  User,
  Pill,
  BarChart3,
  Download
} from "lucide-react";
import { createPortal } from "react-dom";

const Portal = ({ children }) =>
  createPortal(children, document.body);

const ReportModal = ({
  isReportModalOpen,
  closeReportModal,
  handleExportReport,
  medicines = [] // 🔥 garante que nunca seja undefined
}) =>{
            
        useEffect(() => {
        document.body.style.overflow = isReportModalOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
        }, [isReportModalOpen]);

    return (        
            <Portal>
                <AnimatePresence>
                {isReportModalOpen && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeReportModal}
                    className="fixed inset-0 bg-black/70 z-[10001] flex items-center justify-center p-4"
                    >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden backdrop-blur-sm max-h-[90vh] overflow-y-auto"
                    >
                        {/* HEADER */}
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                            <FileText size={28} />
                            <div>
                                <h2 className="text-2xl font-bold">
                                Relatório de Medicamentos
                                </h2>
                                <p className="text-white/80 text-sm">
                                Resumo completo do seu tratamento
                                </p>
                            </div>
                            </div>
                            <button
                            onClick={closeReportModal}
                            className="p-2 hover:bg-white/20 rounded-full transition"
                            >
                            <X size={20} />
                            </button>
                        </div>
                        </div>

                        {/* CONTEÚDO */}
                        <div className="p-6 space-y-6">
                        {/* USUÁRIO */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <h3 className="flex items-center gap-2 font-semibold text-emerald-800 mb-3">
                            <User size={20} />
                            Informações do Usuário
                            </h3>
                            <p className="text-sm text-gray-600">
                            (dados fictícios por enquanto)
                            </p>
                        </div>

                        {/* MEDICAMENTOS */}
                        <div>
                            <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-4">
                            <Pill size={20} />
                            Medicamentos em Uso
                            </h3>

                            {medicines.length === 0 ? (
                            <p className="text-center text-gray-500">
                                Nenhum medicamento cadastrado
                            </p>
                            ) : (
                            <div className="space-y-4">
                                {medicines.map((medicine, index) => (
                                <div
                                    key={medicine.id}
                                    className="border rounded-lg p-4 hover:bg-gray-50 transition"
                                >
                                    <div className="flex justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold">
                                        {index + 1}. {medicine.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                        {medicine.dosage} • {medicine.type}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                        medicine.completed
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {medicine.completed
                                        ? "Tomado hoje"
                                        : "Pendente"}
                                    </span>
                                    </div>
                                    <p className="text-sm">
                                    <strong>Horários:</strong>{" "}
                                    {medicine.times?.join(", ")}
                                    </p>
                                </div>
                                ))}
                            </div>
                            )}
                        </div>

                        {/* ESTATÍSTICAS */}
                        <div>
                            <h3 className="flex items-center gap-2 font-semibold mb-4">
                            <BarChart3 size={20} />
                            Estatísticas
                            </h3>

                            <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm">Total</p>
                                <p className="text-2xl font-bold">
                                {medicines.length}
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm">Tomados</p>
                                <p className="text-2xl font-bold">
                                {medicines.filter(m => m.completed).length}
                                </p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg">
                                <p className="text-sm">Pendentes</p>
                                <p className="text-2xl font-bold">
                                {medicines.filter(m => !m.completed).length}
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* FOOTER */}
                        <div className="border-t p-6 bg-gray-50 flex gap-3">
                        <button
                            onClick={closeReportModal}
                            className="flex-1 bg-gray-200 py-3 rounded-lg"
                        >
                            Fechar
                        </button>
                        <button
                            onClick={handleExportReport}
                            className="flex-1 bg-emerald-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Exportar
                        </button>
                        </div>
                    </motion.div>
                    </motion.div>
                )}
                </AnimatePresence>
            </Portal>
        )
};

export default ReportModal;
