import React, { useState } from "react";
import  Pill  from "lucide-react";
import   motion from "framer-motion";

const ListMedicinesTab = ({ medicines }) => {
  return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Remédios</h2>
            <div className="space-y-4">
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
                  <div key={medicine.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">{medicine.name}</h4>
                        <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.type}</p>
                        <div className="flex gap-2 mt-2">
                          {medicine.times?.map((time, index) => (
                            <span key={index} className="px-2 py-1 bg-[#20B2AA]/10 text-[#20B2AA] rounded-full text-sm">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          medicine.completed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {medicine.completed ? "Tomado" : "Pendente"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        );
}

export default ListMedicinesTab