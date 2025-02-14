import { vehicle_type,vehicle_status,approval_status } from "./AllVehicle.type";
export type approvalStatusesValueType = 0 | 1 | 2 | 3;
export type vehicleStatusValueType = 0 | 1 | 2 ;
export interface vehicleTypesProp {
    value:vehicle_type;
    label:vehicle_type;
}

export interface approvalStatusesProp {
    value:approvalStatusesValueType;
    label:approval_status;
}

export interface vehicleStatusProp {
    value:vehicleStatusValueType;
    label:vehicle_status;
}