import { approvalStatusesValueType, vehicleStatusValueType } from "./Option.type";

export interface AllVehicleResponse {
  data: AllVehicleDataProps | null;
  error_code: number;
  message: string;
}

export interface AllVehiclePaginationInfoProps {
  limit: number;
  page: number;
  total_records?: number;
}

export interface AllVehicleResultTripProps {
  from: string;
  to: string;
}

export type vehicle_status = "Active" | "Inactive" | "Decommissioned";

export type vehicle_type = "Truck" | "Taxi" | "Van" | "Bus";

export type approval_status = "Draft" | "Pending" | "Rejected" | "Approved";
export interface AllVehicleProps {
  license_plate: string;
  vehicle_owner: string;
  vehicle_type: vehicle_type;
  vehicle_status: vehicle_status;
  approval_status: approval_status;
  trips: AllVehicleResultTripProps[] | [];
  contact_number: string;
  passenger_capacity: number;
  mtime: number;
}
export interface AllVehicleResultProps extends AllVehicleProps {
  country_code: string;
  ctime: number;
  driver: string;
  id: string;
}
export interface AllVehicleDataProps {
  pagination_info: AllVehiclePaginationInfoProps;
  result: AllVehicleResultProps[];
}

export interface AllVehicleFilterParams {
  vehicle_type?: vehicle_type;
  passenger_capacity_min?: number;
  passenger_capacity_max?: number;
  approval_status?: approvalStatusesValueType;
  vehicle_status?: vehicleStatusValueType;
  mtime_from?: number;
  mtime_to?: number;
  license_plate?: string;
  pagination: AllVehicleFilterParamsPagination;
  sort_by: AllVehicleFilterParamsSortBy[] | [];
}

export interface AllVehicleFilterParamsPagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface AllVehicleFilterParamsSortBy {
  field: string;
  order_type: number;
}
