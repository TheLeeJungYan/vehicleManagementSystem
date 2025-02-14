import { AllVehicleProps, AllVehicleFilterParams,vehicle_type } from "./AllVehicle.type";
import { approvalStatusesValueType, vehicleStatusValueType } from "./Option.type";
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
  approvalStatus: approvalStatusesValueType | null;
  setApprovalStatus:React.Dispatch<React.SetStateAction<approvalStatusesValueType | null>>;
  minPassenger:number|null;
  setMinPassenger:React.Dispatch<React.SetStateAction<number|null>>;
  maxPassenger:number|null;
  setMaxPassenger:React.Dispatch<React.SetStateAction<number|null>>;
  vehicleType:vehicle_type|null;
  setVehicleType:React.Dispatch<React.SetStateAction<vehicle_type | null>>;
  vehicleStatus:vehicleStatusValueType|null;
  setVehicleStatus:React.Dispatch<React.SetStateAction<vehicleStatusValueType | null>>;
  filter:()=>void;
  clearFilter:()=> void = ();
}
