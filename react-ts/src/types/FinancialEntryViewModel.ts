import type { JSX } from "react";

export type FinancialEntryViewModel = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;      // formatada
  type: string;      // traduzida
  isFixed: string;   // traduzido
  actions: JSX.Element;
};