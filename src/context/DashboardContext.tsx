import React, { useState, createContext } from "react";
import { DashboardContextProps,SelectedCardType } from "@/types/Dashboard.type";

export const DashboardContext = createContext<DashboardContextProps | undefined>(
    undefined
  );
const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCard, setSelectedCard] = useState<SelectedCardType | null>(null); 
    return (
        <DashboardContext.Provider value={{selectedCard,setSelectedCard}}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;