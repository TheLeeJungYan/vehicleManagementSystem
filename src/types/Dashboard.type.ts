import { AllVehicleProps, AllVehicleFilterParams } from "./AllVehicle.type";

export type SelectedCardType =
  | "draft"
  | "pending information"
  | "rejected"
  | null;
export interface DashboardContextProps {
  selectedCard: SelectedCardType;
  setSelectedCard: React.Dispatch<React.SetStateAction<SelectedCardType>>;
  data: AllVehicleProps[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  tableParams: AllVehicleFilterParams;
  setTableParams: React.Dispatch<React.SetStateAction<AllVehicleFilterParams>>;
}
