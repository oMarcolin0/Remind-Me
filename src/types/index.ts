import type { User } from '@supabase/supabase-js';

// ─── Medicine ────────────────────────────────────────────────────────────────

export type MedicineType =
  | 'Analgésico'
  | 'Antibiótico'
  | 'Anti-hipertensivo'
  | 'Hipoglicemiante'
  | 'Outro';

export interface Medicine {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  type: MedicineType;
  time: string;          // comma-separated times string stored in DB
  times?: string[];      // parsed array (derived on read)
  completed: boolean;
  created_at: string;
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  full_name: string | null;
  telegram_chat_id: string | null;
  telegram_verification_code: string | null;
  telegram_code_expires_at: string | null;
  created_at: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// ─── History ─────────────────────────────────────────────────────────────────

export type HistoryFilter = 'day' | 'month' | 'year';

export interface DailyHistoryItem {
  id: string;
  medicine: string;
  dosage: string;
  date: string;
  time: string;
  status: 'Tomado' | 'Pendente';
}

export interface MonthlyHistoryItem {
  month: string;
  adherence: number;
  totalMedicines: number;
  taken: number;
  missed: number;
}

export interface YearlyHistoryItem {
  year: number;
  adherence: number;
  totalMedicines: number;
  taken: number;
  missed: number;
}

export interface HistoryData {
  daily: DailyHistoryItem[];
  monthly: MonthlyHistoryItem[];
  yearly: YearlyHistoryItem[];
}

// ─── Telegram ────────────────────────────────────────────────────────────────

export interface TelegramIntegrationReturn {
  isLoading: boolean;
  error: string | null;
  telegramChatId: string | null;
  isLinked: boolean;
  fetchTelegramStatus: () => Promise<void>;
  saveTelegramChatId: (chatId: string) => Promise<boolean>;
  unlinkTelegram: () => Promise<boolean>;
  createVerificationCode: () => Promise<{ code: string; expiresAt: string } | null>;
}
