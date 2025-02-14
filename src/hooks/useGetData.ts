import { useState, useEffect } from "react";
import { fetchHighlight } from "@/api/services/Dashboard.service";
import { HighlightDataProps, HighlightResponse } from "@/types/Highlight.type";
export const useGetData:()=>{
  totalRejected:number;
  totalPending:number;
  totalDraft:number;
} = () => {
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
    };
    fetchData();
  }, []);

  return {
    totalRejected,
    totalPending,
    totalDraft,
  };
};
