import { ReactNode } from "react";

export interface CardProps {
  title: string;
  value: number;
  main: boolean;
  icon: ReactNode;
}
