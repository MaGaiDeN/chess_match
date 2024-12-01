export type PracticeType = 'meditation' | 'selfInquiry' | 'contemplation' | string;
export type PracticeDuration = 30 | 60 | 90;

export type HabitCategory = 'health' | 'work' | 'learning' | 'social' | 'personal' | 'other';

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  customDays?: number[];
  completedDates: string[];
  progress: number;
  currentStreak: number;
  longestStreak: number;
}

export interface Practice {
  id: string;
  type: PracticeType;
  name: string;
  description?: string;
  color: string;
  progress: number;
  completedDates: string[];
  currentStreak: number;
  longestStreak: number;
  duration: PracticeDuration;
  startDate: string; // Added startDate field
}

export interface PracticeStatus {
  completed: boolean;
  date: string;
}

export interface NewPracticeForm {
  name: string;
  description: string;
  type: string;
  duration: PracticeDuration;
}