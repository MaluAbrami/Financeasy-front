import type { JSX } from "react";

export type FinancialEntryViewModel = {
  id: string;
  amount: number;
  categoryName: string;
  description: string;
  date: string;      // formatada
  type: string;      // traduzida
  isFixed: string;   // traduzido
  actions: JSX.Element;
};