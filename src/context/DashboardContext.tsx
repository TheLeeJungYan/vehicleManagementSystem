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
} from "@/types/AllVehicle.type";
import { fetchVehicle } from "@/api/services/Dashboard.service";

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
  const [tableParams, setTableParams] = useState<AllVehicleFilterParams>({
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
  });

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(tableParams);
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
    tableParams.license_plate,
    tableParams.mtime_from,
    tableParams.mtime_to,
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
