import apiClient from "@/api/apiClient";
import { HighlightResponse } from "@/types/Highlight.type";
import { AllVehicleResponse } from "@/types/AllVehicle.type";
import { fetchInitialDataResponse } from "@/types/Response.type";
import { AxiosError, AxiosResponse } from "axios";
export const fetchInitialData:() => Promise<fetchInitialDataResponse> = async () => {
    try{
        const allVehicleResponseBody = {
            "pagination_info":{
                "page":1,
                "limit":50
            }
        };
        const [highlightResponse,allVehicleResponse]:[AxiosResponse<HighlightResponse>, AxiosResponse<AllVehicleResponse>]  = await Promise.all([
            apiClient.post('/get_highlights'),
            apiClient.post('/get_all_vehicles',allVehicleResponseBody)
        ])
        return {
            highlightResponse: highlightResponse.data,
            allVehicleResponse: allVehicleResponse.data,
            message:'success',
            success:true
        };
    }catch(error){
        let message = "Unexpected error!";

        if (error instanceof AxiosError) {
            message = error.message;
        } else if (error instanceof Error) {
            message = error.message;
        } else {
            message = JSON.stringify(error); 
        }

        return {
            highlightResponse: null,
            allVehicleResponse: null,
            message:message,
            success:false
        };
    }
}

