export interface AllVehicleResponse {
    data: AllVehicleProps|null;
    error_code:number;
    message:string;
}

export interface AllVehiclePaginationInfoProps{
    limit:number;
    page:number;
    total_records:number;
}

export interface AllVehicleResultTripProps{
    from:string;
    to:string;
}

export interface AllVehicleResultProps{
    approval_status:string; //! change
    contact_number:string;
    country_code:string;
    ctime:number;
    driver:string;
    id:string;
    license_plate:string;
    mtime:number;
    passenger_capacity:number;
    trips:AllVehicleResultTripProps[] | [];
    vehicle_owner:string;
    vehicle_status:string; //! change
    vehicle_type:string; //! change
    
}
export interface AllVehicleProps {
    pagination_info:AllVehiclePaginationInfoProps;
    result:AllVehicleResultProps[];
}
