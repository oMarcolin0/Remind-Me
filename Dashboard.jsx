import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, X, User, Pill, List, Home, 
  Settings, LogOut, ChevronRight, PlusCircle,
  Clock, Calendar, Bell, CheckCircle, Edit3, Trash2,
  History, CalendarDays, TrendingUp, BarChart3,
  MessageCircle, Smartphone, Check, Download, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { UserControlModal } from '../components/UserControlModal';

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

export const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyFilter, setHistoryFilter] = useState("month"); // month, day, year
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState("");
  const [isTelegramLinked, setIsTelegramLinked] = useState(false);
  const [isUserControlModalOpen, setIsUserControlModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  // Medicamentos cadastrados com horários
  const [medicines, setMedicines] = useState([
    { 
      id: 1, 
      name: "Ácido Acetilsalicílico", 
      dosage: "100mg", 
      times: ["08:00", "20:00"], 
      type: "Anticoagulante",
      completed: false,
      description: "Medicamento antiagregante plaquetário utilizado para prevenir tromboses e eventos cardiovasculares."
    },
    { 
      id: 2, 
      name: "Metformina", 
      dosage: "850mg", 
      times: ["07:30", "19:30"], 
      type: "Hipoglicemiante",
      completed: false,
      description: "Medicamento para diabetes tipo 2 que ajuda a controlar os níveis de açúcar no sangue."
    },
    { 
      id: 3, 
      name: "Insulina NPH", 
      dosage: "20 UI", 
      times: ["07:00", "21:00"], 
      type: "Insulina",
      completed: true,
      description: "Insulina de ação intermediária utilizada para controle glicêmico em pacientes diabéticos."
    },
    { 
      id: 4, 
      name: "Losartana", 
      dosage: "50mg", 
      times: ["09:00"], 
      type: "Anti-hipertensivo",
      completed: false,
      description: "Medicamento para controle da pressão arterial, pertencente à classe dos antagonistas da angiotensina II."
    },
    { 
      id: 5, 
      name: "Atorvastatina", 
      dosage: "20mg", 
      times: ["22:00"], 
      type: "Hipolipemiante",
      completed: true,
      description: "Medicamento para redução do colesterol, pertencente à classe das estatinas."
    },
  ]);

  // Dados simulados para o histórico
  const [historyData] = useState({
    daily: [
      { id: 1, date: "02/12/2024", medicine: "Ácido Acetilsalicílico", time: "08:00", status: "Tomado", dosage: "100mg" },
      { id: 2, date: "02/12/2024", medicine: "Metformina", time: "07:30", status: "Tomado", dosage: "850mg" },
      { id: 3, date: "02/12/2024", medicine: "Insulina NPH", time: "07:00", status: "Tomado", dosage: "20 UI" },
      { id: 4, date: "02/12/2024", medicine: "Losartana", time: "09:00", status: "Pendente", dosage: "50mg" },
      { id: 5, date: "02/12/2024", medicine: "Atorvastatina", time: "22:00", status: "Pendente", dosage: "20mg" },
      { id: 6, date: "01/12/2024", medicine: "Ácido Acetilsalicílico", time: "20:00", status: "Tomado", dosage: "100mg" },
      { id: 7, date: "01/12/2024", medicine: "Metformina", time: "19:30", status: "Tomado", dosage: "850mg" },
      { id: 8, date: "01/12/2024", medicine: "Insulina NPH", time: "21:00", status: "Tomado", dosage: "20 UI" },
    ],
    monthly: [
      { month: "Dezembro 2024", adherence: 92, totalMedicines: 40, taken: 37, missed: 3 },
      { month: "Novembro 2024", adherence: 88, totalMedicines: 45, taken: 40, missed: 5 },
      { month: "Outubro 2024", adherence: 95, totalMedicines: 42, taken: 40, missed: 2 },
      { month: "Setembro 2024", adherence: 90, totalMedicines: 38, taken: 34, missed: 4 },
    ],
    yearly: [
      { year: "2024", adherence: 91, totalMedicines: 165, taken: 151, missed: 14 },
      { year: "2023", adherence: 85, totalMedicines: 120, taken: 102, missed: 18 },
    ]
  });

  // Função para abrir o modal
  const openMedicineModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeMedicineModal = () => {
    setSelectedMedicine(null);
    setIsModalOpen(false);
  };

  // Função para abrir o modal do Telegram
  const openTelegramModal = () => {
    setIsTelegramModalOpen(true);
  };

  // Função para fechar o modal do Telegram
  const closeTelegramModal = () => {
    setIsTelegramModalOpen(false);
    setTelegramUsername("");
  };

  // Função para vincular conta do Telegram
  const handleLinkTelegram = () => {
    if (telegramUsername.trim()) {
      // Aqui você normalmente faria uma chamada API para vincular o Telegram
      console.log(`Vinculando Telegram: @${telegramUsername}`);
      setIsTelegramLinked(true);
      
      // Simular uma resposta de sucesso
      setTimeout(() => {
        alert(`Conta do Telegram @${telegramUsername} vinculada com sucesso!`);
        closeTelegramModal();
      }, 1000);
    } else {
      alert("Por favor, informe seu username do Telegram");
    }
  };

  // Função para remover medicamento
  const handleRemoveMedicine = (id) => {
    if (window.confirm("Tem certeza que deseja remover este medicamento?")) {
      setMedicines(medicines.filter(medicine => medicine.id !== id));
      closeMedicineModal();
    }
  };

  // Função para editar medicamento
  const handleEditMedicine = (id) => {
    alert(`Editar medicamento com ID: ${id}`);
    closeMedicineModal();
  };

  const handleToggleComplete = (id) => {
    setMedicines(
      medicines.map((medicine) =>
        medicine.id === id
          ? { ...medicine, completed: !medicine.completed }
          : medicine
      )
    );
  };
  
  // Função para abrir o modal de controle da conta
  const openUserControlModal = () => {
    setIsUserControlModalOpen(true);
  };

  // Função para fechar o modal de controle da conta
  const closeUserControlModal = () => {
    setIsUserControlModalOpen(false);
  };

  // Função para gerar relatório
  const handleGenerateReport = () => {
    setIsReportModalOpen(true);
  };

  // Função para fechar modal de relatório
  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  // Função para exportar relatório como PDF
  const handleExportReport = () => {
    // Aqui você implementaria a lógica para exportar como PDF
    // Por enquanto, vamos simular o download
    const reportContent = `
      RELATÓRIO DE MEDICAMENTOS
      Data: ${new Date().toLocaleDateString('pt-BR')}
      
      PACIENTE: Pedro Marcolino
      Idade: 32 anos | Tipo Sanguíneo: O+ | Alergias: Penicilina
      
      MEDICAMENTOS EM USO:
      ${medicines.map((med, index) => `
      ${index + 1}. ${med.name}
         - Dosagem: ${med.dosage}
         - Tipo: ${med.type}
         - Horários: ${med.times.join(', ')}
         - Status: ${med.completed ? 'Tomado hoje' : 'Pendente'}
      `).join('')}
      
      ESTATÍSTICAS:
      - Total de medicamentos: ${medicines.length}
      - Tomados hoje: ${medicines.filter(m => m.completed).length}
      - Pendentes: ${medicines.filter(m => !m.completed).length}
      
      ADESÃO AO TRATAMENTO:
      - Último mês: 92%
      - Último ano: 91%
      
      Este relatório foi gerado automaticamente pelo Sistema de Gestão de Medicamentos.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-medicamentos-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Relatório exportado com sucesso!');
    closeReportModal();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  const getNextMedicineTime = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    let nextTime = null;
    let nextMedicine = null;
    
    medicines.forEach(medicine => {
      medicine.times.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        
        if (timeInMinutes > currentTime) {
          if (!nextTime || timeInMinutes < nextTime) {
            nextTime = timeInMinutes;
            nextMedicine = medicine;
          }
        }
      });
    });
    
    return nextMedicine ? {
      medicine: nextMedicine,
      time: `${Math.floor(nextTime / 60)}:${(nextTime % 60).toString().padStart(2, '0')}`
    } : null;
  };

  const nextMedicine = getNextMedicineTime();
  const pendingCount = medicines.filter(m => !m.completed).length;
  const takenToday = medicines.filter(m => m.completed).length;

  const menuItems = [
    { id: "home", label: "Início", icon: <Home size={20} /> },
    { id: "profile", label: "Perfil", icon: <User size={20} /> },
    { id: "add-medicine", label: "Cadastrar Remédios", icon: <Pill size={20} /> },
    { id: "list-medicines", label: "Listar Remédios", icon: <List size={20} /> },
    { id: "history", label: "Histórico", icon: <History size={20} /> },
    { id: "settings", label: "Configurações", icon: <Settings size={20} /> },
  ];

  // Componente do Modal de Medicamento usando Portal
  const MedicineModal = () => (
    <Portal>
      <AnimatePresence>
        {isModalOpen && selectedMedicine && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMedicineModal}
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
                      <h2 className="text-xl font-bold">{selectedMedicine.name}</h2>
                    </div>
                    <button
                      onClick={closeMedicineModal}
                      className="p-2 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-white/30 rounded-full text-sm">
                      {selectedMedicine.dosage}
                    </div>
                    <div className="px-3 py-1 bg-white/30 rounded-full text-sm">
                      {selectedMedicine.type}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Descrição</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedMedicine.description}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Horários</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedicine.times.map((time, index) => (
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
                      selectedMedicine.completed 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        selectedMedicine.completed ? "bg-green-600" : "bg-yellow-600"
                      }`} />
                      <span className="font-medium">
                        {selectedMedicine.completed ? "Tomado hoje" : "Pendente"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleRemoveMedicine(selectedMedicine.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
                    >
                      <Trash2 size={18} />
                      <span>Remover</span>
                    </button>
                    
                    <button
                      onClick={() => handleEditMedicine(selectedMedicine.id)}
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

  // Componente do Modal de Vinculação do Telegram
  const TelegramModal = () => (
    <Portal>
      <AnimatePresence>
        {isTelegramModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTelegramModal}
              className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4"
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
                        <h2 className="text-2xl font-bold">Vincular Telegram</h2>
                        <p className="text-blue-100 text-sm">Receba lembretes no seu Telegram</p>
                      </div>
                    </div>
                    <button
                      onClick={closeTelegramModal}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                          <MessageCircle size={32} className="text-blue-500" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                          <Smartphone size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-center mb-6">
                      Vincule sua conta do Telegram para receber lembretes dos seus medicamentos diretamente no seu celular.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seu username do Telegram
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            @
                          </div>
                          <input
                            type="text"
                            value={telegramUsername}
                            onChange={(e) => setTelegramUsername(e.target.value)}
                            className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="username"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Exemplo: @seuusuario
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                          <Check size={16} />
                          Benefícios da vinculação:
                        </h4>
                        <ul className="space-y-1 text-sm text-blue-700">
                          <li>✓ Lembretes instantâneos no horário correto</li>
                          <li>✓ Confirmação de uso dos medicamentos</li>
                          <li>✓ Notificações de consultas agendadas</li>
                          <li>✓ Acesso rápido ao seu histórico</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-3">
                    <button
                      onClick={closeTelegramModal}
                      className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleLinkTelegram}
                      disabled={!telegramUsername.trim()}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        telegramUsername.trim()
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <MessageCircle size={18} />
                      <span>Vincular Conta</span>
                    </button>
                  </div>
                </div>

                {/* Rodapé */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <p className="text-center text-xs text-gray-500">
                    Se não tiver uma conta no Telegram, baixe o app no 
                    <a 
                      href="https://telegram.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 ml-1 font-medium"
                    >
                      site oficial
                    </a>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );

  // Componente do Modal de Relatório
  const ReportModal = () => (
    <Portal>
      <AnimatePresence>
        {isReportModalOpen && (
          <>
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
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText size={28} />
                      <div>
                        <h2 className="text-2xl font-bold">Relatório de Medicamentos</h2>
                        <p className="text-white/80 text-sm">Resumo completo do seu tratamento</p>
                      </div>
                    </div>
                    <button
                      onClick={closeReportModal}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Conteúdo do Relatório */}
                <div className="p-6">
                  <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <User size={20} />
                      Informações do Paciente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-emerald-700">Nome Completo</p>
                        <p className="font-medium text-gray-800">Pedro Marcolino</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700">Idade</p>
                        <p className="font-medium text-gray-800">32 anos</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700">Tipo Sanguíneo</p>
                        <p className="font-medium text-gray-800">O+</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700">Alergias Conhecidas</p>
                        <p className="font-medium text-gray-800">Penicilina</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Pill size={20} />
                      Medicamentos em Uso
                    </h3>
                    <div className="space-y-4">
                      {medicines.map((medicine, index) => (
                        <div key={medicine.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                {index + 1}. {medicine.name}
                              </h4>
                              <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.type}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              medicine.completed 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {medicine.completed ? "Tomado hoje" : "Pendente"}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700">
                            <p className="mb-1"><strong>Horários:</strong> {medicine.times.join(', ')}</p>
                            <p><strong>Descrição:</strong> {medicine.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <BarChart3 size={20} />
                      Estatísticas do Tratamento
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-700">Total de Medicamentos</p>
                        <p className="text-2xl font-bold text-blue-800">{medicines.length}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-700">Tomados Hoje</p>
                        <p className="text-2xl font-bold text-green-800">{takenToday}</p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <p className="text-sm text-amber-700">Pendentes</p>
                        <p className="text-2xl font-bold text-amber-800">{pendingCount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <TrendingUp size={20} />
                      Adesão ao Tratamento
                    </h3>
                    <div className="space-y-3">
                      {historyData.monthly.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{item.month}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  item.adherence >= 90 ? "bg-green-500" : 
                                  item.adherence >= 80 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                                style={{ width: `${item.adherence}%` }}
                              />
                            </div>
                            <span className={`font-semibold ${
                              item.adherence >= 90 ? "text-green-600" : 
                              item.adherence >= 80 ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {item.adherence}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Observações</h4>
                    <p className="text-sm text-gray-600">
                      Este relatório foi gerado automaticamente em {new Date().toLocaleDateString('pt-BR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}. 
                      Mantenha este documento para consultas médicas e acompanhamento do tratamento.
                    </p>
                  </div>
                </div>

                {/* Rodapé com Botões */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={closeReportModal}
                      className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                      Visualizar Apenas
                    </button>
                    <button
                      onClick={handleExportReport}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      <span>Exportar Relatório</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {nextMedicine && (
              <div className="bg-gradient-to-r from-[#20B2AA] to-[#28c4ba] rounded-lg p-6 shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Bell size={24} className="text-white" />
                    <h2 className="text-xl font-semibold">Próximo Medicamento</h2>
                  </div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {nextMedicine.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{nextMedicine.medicine.name}</h3>
                    <p className="text-white/80">{nextMedicine.medicine.dosage} • {nextMedicine.medicine.type}</p>
                  </div>
                  <button
                    onClick={() => handleToggleComplete(nextMedicine.medicine.id)}
                    className="px-4 py-2 bg-white text-[#20B2AA] font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Marcar como Tomado
                  </button>
                </div>
              </div>
            )}

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
                    <h3 className="text-2xl font-bold text-gray-800">{takenToday}</h3>
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
                    <h3 className="text-2xl font-bold text-gray-800">{pendingCount}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Para tomar hoje</p>
              </div>
            </div>

            {/* Botão para vincular Telegram na página inicial */}
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
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#20B2AA] text-white hover:bg-[#28c4ba] rounded-lg font-medium transition-colors"
                >
                  <PlusCircle size={18} />
                  <span>Adicionar Medicamento</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {medicines.map((medicine) => (
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
                          {medicine.times.map((time, index) => (
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
                        <button
                          onClick={() => openMedicineModal(medicine)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Mais opções"
                        >
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 shadow-md border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-blue-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Consulta Agendada</h3>
                </div>
                <p className="text-gray-700 mb-2">Cardiologista - Dr. Silva</p>
                <p className="text-sm text-gray-600">15 de Dezembro, 14:30</p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-6 shadow-md border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="text-emerald-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Recadastrar</h3>
                </div>
                <p className="text-gray-700 mb-2">Receita vence em 30 dias</p>
                <p className="text-sm text-gray-600">Ácido Acetilsalicílico</p>
              </div>
            </div>
          </motion.div>
        );

      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h2>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
                P
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Pedro Marcolino</h3>
                <p className="text-gray-600">pedromathiasdasilvamarcolino14@email.com</p>
                <p className="text-gray-500">Membro desde Jan 2024</p>
              </div>
            </div>
            
            {/* Seção de Integrações */}
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
                <p className="text-gray-600">Idade: 32 anos</p>
                <p className="text-gray-600">Tipo Sanguíneo: O+</p>
                <p className="text-gray-600">Alergias: Penicilina</p>

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
                <p className="text-gray-600">Adesão ao tratamento: 92%</p>
                <p className="text-gray-600">Última consulta: 15/11/2024</p>
              </div>
            </div>
          </motion.div>
        );

      case "add-medicine":
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

      case "list-medicines":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Remédios</h2>
            <div className="space-y-4">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{medicine.name}</h4>
                      <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.type}</p>
                      <div className="flex gap-2 mt-2">
                        {medicine.times.map((time, index) => (
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
                      <button
                        onClick={() => openMedicineModal(medicine)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Mais opções"
                      >
                        <ChevronRight size={18} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "history":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Cabeçalho do Histórico */}
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

              {/* Filtros de período */}
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

              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="text-blue-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Adesão Atual</p>
                      <h3 className="text-2xl font-bold text-gray-800">92%</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Média dos últimos 30 dias</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="text-green-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Tomados</p>
                      <h3 className="text-2xl font-bold text-gray-800">151</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Total em 2024</p>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="text-amber-500" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Pularam</p>
                      <h3 className="text-2xl font-bold text-gray-800">14</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Total em 2024</p>
                </div>
              </div>
            </div>

            {/* Conteúdo do Histórico baseado no filtro */}
            {historyFilter === "day" && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Histórico Diário</h3>
                <div className="space-y-4">
                  {historyData.daily.map((item) => (
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
                  ))}
                </div>
              </div>
            )}

            {historyFilter === "month" && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Histórico Mensal</h3>
                <div className="space-y-6">
                  {historyData.monthly.map((item, index) => (
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
                  ))}
                </div>
              </div>
            )}

            {historyFilter === "year" && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Histórico Anual</h3>
                <div className="space-y-6">
                  {historyData.yearly.map((item, index) => (
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
                  ))}
                </div>
              </div>
            )}

            {/* Gráfico de progresso (simulado) */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Evolução da Adesão</h3>
              <div className="space-y-3">
                {historyData.monthly.slice(0, 4).map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{item.month}</span>
                      <span>{item.adherence}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.adherence >= 90 ? "bg-green-500" : 
                          item.adherence >= 80 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${item.adherence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800">Conteúdo em desenvolvimento</h2>
          </motion.div>
        );
    }
  };

  return (
    <>
      <MedicineModal />
      <TelegramModal />
      <ReportModal />
      <UserControlModal 
        isOpen={isUserControlModalOpen}
        onClose={closeUserControlModal}
        onLogout={handleLogout}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray/90 flex flex-col relative"
      >
        <header className="bg-[#20B2AA] text-white shadow-lg z-50 sticky top-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Pedro Marcolino</h1>
                  <p className="text-sm text-white/80">
                    {pendingCount > 0 
                      ? `${pendingCount} medicamento${pendingCount > 1 ? 's' : ''} pendente${pendingCount > 1 ? 's' : ''} `
                      : 'Todos medicamentos tomados!'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Botão para abrir modal do Telegram */}
              <button
                onClick={openTelegramModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
              >
                <MessageCircle size={18} />
                <span>{isTelegramLinked ? "Telegram Vinculado" : "Vincular Telegram"}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
                
                <motion.aside
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}  
                  transition={{ type: "spring", damping: 25 }}
                  className="fixed top-24 h-[calc(95vh-4rem)] w-64 bg-[#20B2AA] text-white z-30 shadow-2xl rounded-r-2xl overflow-hidden"
                >
                  <div className="p-6 border-b border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Menu</h2>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#20B2AA] font-bold text-lg">
                        P
                      </div>
                      <div>
                        <h3 className="font-semibold">Pedro Marcolino</h3>
                        <p className="text-sm text-white/80">pedromathiasdasilvamarcolino14@Gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <nav className="p-4">
                    <ul className="space-y-2">
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setActiveTab(item.id);
                              setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                              activeTab === item.id
                                ? "bg-white/20 text-white border-l-4 border-white"
                                : "hover:bg-white/10"
                            }`}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="absolute bottom-0 w-full p-6 border-t border-white/20">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                    >
                      <LogOut size={18} />
                      <span>Sair da Conta</span>
                    </button>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-[#20B2AA] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-110 transition-transform"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
      </motion.div>
    </>
  );
};