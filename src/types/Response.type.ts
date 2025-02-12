import { HighlightResponse } from "@/types/Highlight.type";
import { AllVehicleResponse } from "@/types/AllVehicle.type";
export interface fetchInitialDataResponse{
    highlightResponse: HighlightResponse| null;
    allVehicleResponse: AllVehicleResponse | null;
    message:string;
    success:boolean;
}