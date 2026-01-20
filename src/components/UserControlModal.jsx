import React, { useState } from 'react';
import { X, User, Settings, Trash2, Check, Edit3, Smartphone, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// Componente Portal para renderizar fora da hierarquia
const Portal = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) return null;
  
  return createPortal(children, document.body);
};

export const UserControlModal = ({ 
  isOpen, 
  onClose, 
  onLogout 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Pedro Marcolino",
    email: "pedromathiasdasilvamarcolino14@email.com",
    age: "32",
    bloodType: "O+",
    allergies: "Penicilina",
    phone: "",
    emergencyContact: "",
    memberSince: "Jan 2024"
  });
  const [tempData, setTempData] = useState({});

  const handleEditClick = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...tempData });
    setIsEditing(false);
    // Aqui você normalmente faria uma chamada API para salvar os dados
    alert("Dados atualizados com sucesso!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("Tem certeza que deseja desativar sua conta? Esta ação pode ser revertida entrando em contato com o suporte.")) {
      // Aqui você faria a chamada API para desativar a conta
      alert("Conta desativada com sucesso. Entre em contato com o suporte para reativar.");
      onClose();
      // Redirecionar para logout após desativação
      setTimeout(() => {
        onLogout();
      }, 2000);
    }
  };

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
                className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden backdrop-blur-sm max-h-[90vh] overflow-y-auto"
              >
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-[#20B2AA] to-[#28c4ba] p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <User size={28} />
                      <div>
                        <h2 className="text-2xl font-bold">Controle da Conta</h2>
                        <p className="text-white/80 text-sm">Gerencie seus dados e configurações</p>
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
                  {/* Avatar e Informações Básicas */}
                  <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white text-4xl font-bold mx-auto">
                        {userData.name ? userData.name[0].toUpperCase() : 'U'}
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-2">Avatar</p>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      {isEditing ? (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nome Completo
                            </label>
                            <input
                              type="text"
                              value={tempData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={tempData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{userData.name}</h3>
                            <p className="text-gray-600">{userData.email}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {userData.age} anos
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                              {userData.bloodType}
                            </span>
                            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                              Membro desde {userData.memberSince}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Informações de Saúde */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Pill size={20} />
                      Informações de Saúde
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {isEditing ? (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Idade
                            </label>
                            <input
                              type="text"
                              value={tempData.age}
                              onChange={(e) => handleInputChange('age', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tipo Sanguíneo
                            </label>
                            <select
                              value={tempData.bloodType}
                              onChange={(e) => handleInputChange('bloodType', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                            >
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Alergias
                            </label>
                            <input
                              type="text"
                              value={tempData.allergies}
                              onChange={(e) => handleInputChange('allergies', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                              placeholder="Separe por vírgula"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Idade</p>
                            <p className="font-medium text-gray-800">{userData.age} anos</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Tipo Sanguíneo</p>
                            <p className="font-medium text-gray-800">{userData.bloodType}</p>
                          </div>
                          <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Alergias</p>
                            <p className="font-medium text-gray-800">{userData.allergies}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Informações de Contato */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Smartphone size={20} />
                      Informações de Contato
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {isEditing ? (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Telefone
                            </label>
                            <input
                              type="tel"
                              value={tempData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                              placeholder="(11) 99999-9999"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Contato de Emergência
                            </label>
                            <input
                              type="text"
                              value={tempData.emergencyContact}
                              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
                              placeholder="Nome e telefone"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Telefone</p>
                            <p className="font-medium text-gray-800">
                              {userData.phone || "Não cadastrado"}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Contato de Emergência</p>
                            <p className="font-medium text-gray-800">
                              {userData.emergencyContact || "Não cadastrado"}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Seção de Desativação da Conta */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                        <Settings size={18} />
                        Área de Risco
                      </h4>
                      <p className="text-sm text-red-600 mb-4">
                        Esta seção contém ações que afetam permanentemente sua conta.
                      </p>
                      <button
                        onClick={handleDeactivateAccount}
                        className="w-full py-3 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={18} />
                        <span>Desativar Minha Conta</span>
                      </button>
                      <p className="text-xs text-red-500 mt-2 text-center">
                        Esta ação pode ser revertida entrando em contato com o suporte.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rodapé com Botões */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex-1 py-3 px-4 bg-[#20B2AA] text-white hover:bg-[#28c4ba] rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Check size={18} />
                          <span>Salvar Alterações</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleEditClick}
                          className="flex-1 py-3 px-4 bg-[#20B2AA] text-white hover:bg-[#28c4ba] rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Edit3 size={18} />
                          <span>Editar Dados</span>
                        </button>
                        <button
                          onClick={onClose}
                          className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        >
                          Voltar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};