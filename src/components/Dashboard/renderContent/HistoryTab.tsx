import { motion } from 'framer-motion';
import {
  Clock, Calendar, CheckCircle, History, CalendarDays,
  TrendingUp, BarChart3, FileText,
} from 'lucide-react';
import type { Medicine, HistoryFilter } from '../../../types';

interface HistoryTabProps {
  handleGenerateReport: () => void;
  historyFilter: HistoryFilter;
  setHistoryFilter: (filter: HistoryFilter) => void;
  medicines: Medicine[];
}

const HistoryTab = ({
  handleGenerateReport,
  historyFilter,
  setHistoryFilter,
  medicines,
}: HistoryTabProps) => {
  const taken = medicines.filter((m) => m.completed).length;
  const total = medicines.length;
  const adherencePercent = total > 0 ? Math.round((taken / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 rounded-lg font-medium transition-all shadow-md"
          >
            <FileText size={18} />
            <span>Gerar Relatório</span>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {([['day', 'Diário', CalendarDays], ['month', 'Mensal', Calendar], ['year', 'Anual', BarChart3]] as const).map(
            ([value, label, Icon]) => (
              <button
                key={value}
                onClick={() => setHistoryFilter(value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  historyFilter === value ? 'bg-[#20B2AA] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ),
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Adesão Atual</p>
                <h3 className="text-2xl font-bold text-gray-800">{adherencePercent}%</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600">Baseado em medicamentos de hoje</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Tomados</p>
                <h3 className="text-2xl font-bold text-gray-800">{taken}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600">Total de {total} medicamentos</p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="text-amber-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <h3 className="text-2xl font-bold text-gray-800">{total - taken}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600">Para tomar hoje</p>
          </div>
        </div>

        {/* History Info Placeholder */}
        <div className="text-center py-6 text-gray-400">
          <Calendar size={40} className="mx-auto mb-3" />
          <p className="text-sm">Histórico detalhado por período disponível em breve.</p>
          <p className="text-xs mt-1">As estatísticas gerais já refletem os dados reais acima.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryTab;
