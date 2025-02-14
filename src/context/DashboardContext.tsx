import React, { useState, createContext, useEffect } from "react";
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
      pageSize: 50,
      total: undefined,
    },
    sort_by: [
      {
        field: "mtime",
        order_type: 1,
      },
    ],
  }

  const [tableParams, setTableParams] = useState<AllVehicleFilterParams>(initialFilter);
  const [loading, setLoading] = useState<boolean>(false);
  const [approvalStatus,setApprovalStatus] = useState<approvalStatusesValueType|null>(null);
  const [minPassenger,setMinPassenger] = useState<number|null>(null);
  const [maxPassenger,setMaxPassenger] = useState<number|null>(null);
  const [vehicleType,setVehicleType] = useState<vehicle_type|null>(null);
  const [vehicleStatus,setVehicleStatus] = useState<vehicleStatusValueType|null>(null);

  const filter:()=>void = () => {
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
    setTableParams(initialFilter);
  }
  useEffect(() => {
    console.log(tableParams.mtime_to);
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
        clearFilter
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
