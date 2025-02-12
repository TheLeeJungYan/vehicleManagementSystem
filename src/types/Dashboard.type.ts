
export type SelectedCardType = "draft" | "pending information" | "rejected" | null;
export interface DashboardContextProps{
    selectedCard: SelectedCardType;
    setSelectedCard: React.Dispatch<React.SetStateAction<SelectedCardType>>
}