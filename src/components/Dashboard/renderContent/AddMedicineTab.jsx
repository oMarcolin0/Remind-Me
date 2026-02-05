import React from "react";

import { motion } from "framer-motion";

const AddMedicineTab = ({}) => {
  return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Remédio</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Remédio
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                  placeholder="Ex: Paracetamol"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dosagem
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                    placeholder="Ex: 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent">
                    <option>Analgésico</option>
                    <option>Antibiótico</option>
                    <option>Anti-hipertensivo</option>
                    <option>Hipoglicemiante</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horários (separados por vírgula)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                  placeholder="Ex: 08:00, 14:00, 20:00"
                />
              </div>
              <button
                type="button"
                className="w-full py-3 bg-[#20B2AA] text-white font-semibold rounded-lg hover:bg-[#28c4ba] transition-colors"
              >
                Cadastrar Remédio
              </button>
            </form>
          </motion.div>
        );
}

export default AddMedicineTab