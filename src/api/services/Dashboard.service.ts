import apiClient from "@/api/apiClient";
import { HighlightResponse } from "@/types/Highlight.type";
import { AxiosError, AxiosResponse } from "axios";
export const fetchHighlight = async() => {
    try{
        const response:AxiosResponse<HighlightResponse> = await apiClient.post('/get_highlights');
        return response.data;
    }catch(error){
        let message:string = "Unexpected Error ! Please refresh and try again";
        let errorCode:number = 500;
        if(error instanceof AxiosError){
            message = error.message;
            errorCode = error.response?.status ?? 500;
        } else if (error instanceof Error){
            message = error.message;
        }

        const response:HighlightResponse = {
            data:null,
            error_code:errorCode,
            message:message
        }
        
        return response;
    }
}

export const fetchAllVehicles = async() => {
    try{
        const response = await apiClient.post('/get_all_vehicles');
        console.log(response);
    }catch(error){
        console.error(error);
    }
}