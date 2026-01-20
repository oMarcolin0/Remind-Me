import {  useState } from "react";
import React from 'react'

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pill, Trash2, Edit3 } from "lucide-react";

const Portal = ({children})=>{
    const [mounted, setMounted] = useState(false);

    React.useEffect(()=>{
        setMounted(true);
        return ()=> setMounted(false);
        
    },[])

    if(!mounted) return null ;

    return createPortal(children,document.body);

};


export const MedicineModal = ({isOpen,onClose,medicine,onRemove,onEdit}) => {



  return (
    <Portal>
      <AnimatePresence>
        {isOpen  && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/90 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#20B2AA] to-[#28c4ba] p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Pill size={24} />
                      <h2 className="text-xl font-bold">{medicine.name}</h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-white/30 rounded-full text-sm">
                      {medicine.dosage}
                    </div>
                    <div className="px-3 py-1 bg-white/30 rounded-full text-sm">
                      {medicine.type}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Descrição</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {medicine.description}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Horários</h3>
                    <div className="flex flex-wrap gap-2">
                      {medicine.times.map((time, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-[#20B2AA]/10 text-[#20B2AA] rounded-full font-medium"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Status</h3>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      medicine.completed 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        medicine.completed ? "bg-green-600" : "bg-yellow-600"
                      }`} />
                      <span className="font-medium">
                        {medicine.completed ? "Tomado hoje" : "Pendente"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => onRemove(medicine.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
                    >
                      <Trash2 size={18} />
                      <span>Remover</span>
                    </button>
                    
                    <button
                      onClick={() => onEdit(medicine.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#20B2AA] text-white hover:bg-[#28c4ba] rounded-lg font-medium transition-colors"
                    >
                      <Edit3 size={18} />
                      <span>Editar</span>
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <p className="text-center text-sm text-gray-500">
                    Clique fora do modal ou no X para fechar
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
