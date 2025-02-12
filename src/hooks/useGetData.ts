import { useState, useEffect } from "react";
import { fetchInitialData } from "@/api/services/Dashboard.service";
import { fetchInitialDataResponse } from "@/types/Response.type";
import { HighlightProps } from "@/types/Highlight.type";
import { AllVehicleProps,AllVehiclePaginationInfoProps,AllVehicleResultProps } from "@/types/AllVehicle.type";
export const useGetData = () => {
    const [totalRejected,setTotalRejected] = useState<number>(0);
    const [totalPending,setTotalPending] = useState<number>(0);
    const [totalDraft,setTotalDraft] = useState<number>(0);
    const [paginationInfo,setPaginationInfo] = useState<AllVehiclePaginationInfoProps|null>(null);
    const [allVechicles,setAllVehicles] = useState<AllVehicleResultProps[]|[]>([]);
    useEffect(()=>{
        const fetchData = async() => {
           
            const response:fetchInitialDataResponse = await fetchInitialData();
            if(!response.success || response.highlightResponse == null || response.allVehicleResponse == null || response.highlightResponse.data ==null || response.allVehicleResponse.data == null) return;
         
            const highlightData:HighlightProps = response.highlightResponse.data;
            setTotalRejected(highlightData.total_rejected);
            setTotalPending(highlightData.total_pending);
            setTotalDraft(highlightData.total_draft);

            const AllVehicleData:AllVehicleProps = response.allVehicleResponse.data;
            console.log(AllVehicleData);
            setPaginationInfo(AllVehicleData.pagination_info);
            setAllVehicles(AllVehicleData.result);
        }
        fetchData();
    },[])

    return {totalRejected,totalPending,totalDraft};
}