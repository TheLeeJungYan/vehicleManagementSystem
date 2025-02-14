import React, { useState, createContext, useEffect, useRef } from "react";
import {
  DashboardContextProps,
  SelectedCardType,
} from "@/types/Dashboard.type";
import {
  AllVehicleFilterParams,
  AllVehicleProps,
  AllVehicleResponse,
  AllVehicleDataProps,
  vehicle_type,
  AllVehicleFilterParamsSortBy,
} from "@/types/AllVehicle.type";
import { fetchVehicle } from "@/api/services/Dashboard.service";
import { approvalStatusesValueType, vehicleStatusValueType } from "@/types/Option.type";

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);
const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [selectedCard, setSelectedCard] = useState<SelectedCardType | null>(
    null
  );
  const [data, setData] = useState<AllVehicleProps[]>([]);
  const initialFilter:AllVehicleFilterParams = {
    pagination: {
      current: 1,
      pageSize: 10,
      total: undefined,
    },
    sort_by: [
      {
        field: "mtime",
        order_type: 1,
      },
    ],
  }
  const [sortInfo,setSortInfo] = useState<AllVehicleFilterParamsSortBy[]>(initialFilter.sort_by);
  const [tableParams, setTableParams] = useState<AllVehicleFilterParams>(initialFilter);
  const [loading, setLoading] = useState<boolean>(false);
  const [approvalStatus,setApprovalStatus] = useState<approvalStatusesValueType|null>(null);
  const [minPassenger,setMinPassenger] = useState<number|null>(null);
  const [maxPassenger,setMaxPassenger] = useState<number|null>(null);
  const [vehicleType,setVehicleType] = useState<vehicle_type|null>(null);
  const [vehicleStatus,setVehicleStatus] = useState<vehicleStatusValueType|null>(null);
  const [totalCase,setTotalCase] = useState<number|undefined>(undefined);
  const fromFilter = useRef<boolean>(false);
  const getFilterParams:() => {
    approval_status:approvalStatusesValueType | undefined, vehicle_status:vehicleStatusValueType | undefined
  } = () => {
    let approval_status:approvalStatusesValueType | undefined = undefined;
    let vehicle_status:vehicleStatusValueType | undefined = undefined;
    switch (selectedCard?.toLowerCase()){
      case "draft":
        approval_status = 0;
        break;
      case "pending information":
        approval_status = 2;
        vehicle_status = 0;
        break
      case "rejected":
        approval_status = 3;
        vehicle_status = 0;
        break
      default:
        break;
    }
    return {
      approval_status,vehicle_status
    }
  }
  useEffect(()=>{
    if(fromFilter.current){
      fromFilter.current = false;
      return;
    }

    const { approval_status, vehicle_status } = getFilterParams();
    if(approval_status != approvalStatus && approval_status != undefined){
      setApprovalStatus(approval_status);
    }

    if(vehicle_status!= vehicleStatus && vehicle_status != undefined){
      setVehicleStatus(vehicle_status);
    }

    setTableParams((prev)=>({
      ...prev,
      approval_status,
      vehicle_status,
    }))
  },[selectedCard]);

  useEffect(() => {
    setSortInfo(
      tableParams.sort_by
    );
    const fetchData = async () => {
      setLoading(true);
      const response: AllVehicleResponse = await fetchVehicle(tableParams);
      if (!response.data || response.message != "success") return;
      const allVehicleData: AllVehicleDataProps = response.data;
      let vehicleResult: AllVehicleProps[] = [];
      if (allVehicleData.result) {
        vehicleResult = allVehicleData.result.map(
          ({ country_code, ctime, id, ...rest }) => ({ key: id, ...rest })
        );
      }
      if(!totalCase ){
        setTotalCase(allVehicleData.pagination_info.total_records);
      }
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: allVehicleData.pagination_info.total_records,
        },
      }));
      setData(vehicleResult);
      setLoading(false);
    };
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sort_by,
    tableParams?.license_plate,
    tableParams?.mtime_from,
    tableParams?.mtime_to,
    tableParams?.vehicle_type,
    tableParams?.passenger_capacity_min,
    tableParams?.passenger_capacity_max,
    tableParams?.approval_status,
    tableParams?.vehicle_status,
  ]);

  const filter:()=>void = () => {
    const { approval_status, vehicle_status } = getFilterParams();
    console.log(fromFilter.current);
    
    if(approval_status !=approval_status || vehicleStatus !=vehicle_status){
      fromFilter.current = true;
      setSelectedCard(null);
    }

    setTableParams((prev)=>({
      ...prev,
      vehicle_type:vehicleType??undefined,
      passenger_capacity_min:minPassenger??undefined,
      passenger_capacity_max:maxPassenger??undefined,
      approval_status:approvalStatus??undefined,
      vehicle_status:vehicleStatus??undefined
    }));
  }

  const clearFilter:()=> void = () => {
    
    setTableParams({
      ...initialFilter,
      sort_by:[]
    });
    setSortInfo([]);
    setSelectedCard(null);
  }

  

  return (
    <DashboardContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        data,
        loading,
        setLoading,
        tableParams,
        setTableParams,
        approvalStatus,
        setApprovalStatus,
        minPassenger,
        setMinPassenger,
        maxPassenger,
        setMaxPassenger,
        vehicleType,
        setVehicleType,
        vehicleStatus,
        setVehicleStatus,
        filter,
        clearFilter,
        sortInfo,
        totalCase
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
