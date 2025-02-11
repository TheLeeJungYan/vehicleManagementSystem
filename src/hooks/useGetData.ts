import { useState, useEffect } from "react";
import { fetchHighlight } from "@/api/services/Dashboard.service";
import { HighlightProps,HighlightResponse } from "@/types/Highlight.type";
export const useGetData = () => {
    const [totalRejected,setTotalRejected] = useState(0);
    const [totalPending,setTotalPending] = useState(0);
    const [totalDraft,setTotalDraft] = useState(0);
    
    useEffect(()=>{
        const fetchData = async()=>{
            const response:HighlightResponse = await fetchHighlight();
            if(response.error_code!=0 || response.data == null){
                return;
            }
            
            const data:HighlightProps = response.data;
            setTotalRejected(data.total_rejected);
            setTotalPending(data.total_pending);
            setTotalDraft(data.total_draft);
        }
        fetchData()
    },[])

    return {totalRejected,totalPending,totalDraft};
}