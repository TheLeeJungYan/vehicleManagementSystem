import { ReactNode } from "react";
import { SelectedCardType } from "@/types/Dashboard.type";
export interface CardProps {
  title: SelectedCardType;
  value: number;
  main: boolean;
  icon: ReactNode;
}
