import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import type { Medicine, MedicineType } from '../../../types';

interface AddMedicineTabProps {
  setMedicines: React.Dispatch<React.SetStateAction<Medicine[]>>;
}

const MEDICINE_TYPES: MedicineType[] = [
  'Analgésico',
  'Antibiótico',
  'Anti-hipertensivo',
  'Hipoglicemiante',
  'Outro',
];

export default function AddMedicineTab({ setMedicines }: AddMedicineTabProps) {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [type, setType] = useState<MedicineType>('Analgésico');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddMedicine = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !dosage || !time) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from('medicines')
      .insert([{ name, dosage, type, time, user_id: user!.id }])
      .select();

    if (error) {
      console.error('Erro ao cadastrar medicamento:', error);
      alert('Erro ao cadastrar medicamento. Tente novamente.');
    } else {
      setMedicines((prev) => [data[0] as Medicine, ...prev]);
      setName('');
      setDosage('');
      setType('Analgésico');
      setTime('');
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Medicamento</h2>
      <form onSubmit={handleAddMedicine} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Remédio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
            placeholder="Ex: Paracetamol"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dosagem <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
              placeholder="Ex: 500mg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MedicineType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
            >
              {MEDICINE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horários <span className="text-red-500">*</span>
            <span className="text-gray-400 font-normal ml-1">(separados por vírgula)</span>
          </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
            placeholder="Ex: 08:00, 14:00, 20:00"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#20B2AA] text-white font-semibold rounded-lg hover:bg-[#28c4ba] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Cadastrar Remédio'}
        </button>
      </form>
    </motion.div>
  );
}
