export interface AllVehicleResponse {
  data: AllVehicleDataProps | null;
  error_code: number;
  message: string;
}

export interface AllVehiclePaginationInfoProps {
  limit: number;
  page: number;
  total_records: number;
}

export interface AllVehicleResultTripProps {
  from: string;
  to: string;
}
export interface AllVehicleProps {
  license_plate: string;
  vehicle_owner: string;
  vehicle_type: string; //! change
  vehicle_status: string; // ! change
  approval_status: string; // ! change
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
