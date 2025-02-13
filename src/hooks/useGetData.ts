import { useState, useEffect } from "react";
import { fetchInitialData } from "@/api/services/Dashboard.service";
import { fetchInitialDataResponse } from "@/types/Response.type";
import { HighlightDataProps } from "@/types/Highlight.type";
import {
  AllVehicleDataProps,
  AllVehiclePaginationInfoProps,
  AllVehicleResultProps,
  AllVehicleProps,
} from "@/types/AllVehicle.type";
export const useGetData = () => {
  const [totalRejected, setTotalRejected] = useState<number>(0);
  const [totalPending, setTotalPending] = useState<number>(0);
  const [totalDraft, setTotalDraft] = useState<number>(0);
  const [paginationInfo, setPaginationInfo] =
    useState<AllVehiclePaginationInfoProps | null>(null);
  const [allVechicles, setAllVehicles] = useState<AllVehicleProps[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response: fetchInitialDataResponse = await fetchInitialData();
      if (
        !response.success ||
        response.highlightResponse == null ||
        response.allVehicleResponse == null ||
        response.highlightResponse.data == null ||
        response.allVehicleResponse.data == null
      )
        return;

      const highlightData: HighlightDataProps = response.highlightResponse.data;
      setTotalRejected(highlightData.total_rejected);
      setTotalPending(highlightData.total_pending);
      setTotalDraft(highlightData.total_draft);

      const allVehicleData: AllVehicleDataProps =
        response.allVehicleResponse.data;
      setPaginationInfo(allVehicleData.pagination_info);
      const vehicleResult: AllVehicleProps[] = allVehicleData.result.map(
        ({ country_code, ctime, driver, id, ...rest }) => rest
      );
      setAllVehicles(vehicleResult);
    };
    fetchData();
  }, []);

  return {
    totalRejected,
    totalPending,
    totalDraft,
    allVechicles,
    paginationInfo,
  };
};
