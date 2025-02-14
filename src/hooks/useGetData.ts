import { useState, useEffect } from "react";
import { fetchHighlight } from "@/api/services/Dashboard.service";
import { HighlightDataProps, HighlightResponse } from "@/types/Highlight.type";
export const useGetData = () => {
  const [totalRejected, setTotalRejected] = useState<number>(0);
  const [totalPending, setTotalPending] = useState<number>(0);
  const [totalDraft, setTotalDraft] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const response: HighlightResponse = await fetchHighlight();
      if (!response.data || response.message != "success") return;

      const highlightData: HighlightDataProps = response.data;
      setTotalRejected(highlightData.total_rejected);
      setTotalPending(highlightData.total_pending);
      setTotalDraft(highlightData.total_draft);

      // const allVehicleData: AllVehicleDataProps =
      //   response.allVehicleResponse.data;
      // setPaginationInfo(allVehicleData.pagination_info);
      // const vehicleResult: AllVehicleProps[] = allVehicleData.result.map(
      //   ({ country_code, ctime, id,  ...rest }) => ({key:id,...rest})
      // );
      // setAllVehicles(vehicleResult);
    };
    fetchData();
  }, []);

  return {
    totalRejected,
    totalPending,
    totalDraft,
  };
};
