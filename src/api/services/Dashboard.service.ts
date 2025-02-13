import apiClient from "@/api/apiClient";
import { HighlightResponse } from "@/types/Highlight.type";
import { AllVehicleResponse, AllVehiceFilterParams } from "@/types/AllVehicle.type";
import { AxiosError, AxiosResponse } from "axios";
// export const fetchInitialData: () => Promise<fetchInitialDataResponse> =
//   async () => {
//     try {
//       const allVehicleResponseBody = {
//         pagination_info: {
//           page: 1,
//           limit: 300,
//         },
//         sort_by:[
//           {
//             field:"mtime",
//             order_type:1
//           }
//         ]
//       };
//       const [highlightResponse, allVehicleResponse]: [
//         AxiosResponse<HighlightResponse>,
//         AxiosResponse<AllVehicleResponse>
//       ] = await Promise.all([
//         apiClient.post("/get_highlights"),
//         apiClient.post("/get_all_vehicles", allVehicleResponseBody),
//       ]);
//       return {
//         highlightResponse: highlightResponse.data,
//         allVehicleResponse: allVehicleResponse.data,
//         message: "success",
//         success: true,
//       };
//     } catch (error) {
//       let message = "Unexpected error!";

//       if (error instanceof AxiosError) {
//         message = error.message;
//       } else if (error instanceof Error) {
//         message = error.message;
//       } else {
//         message = JSON.stringify(error);
//       }

//       return {
//         highlightResponse: null,
//         allVehicleResponse: null,
//         message: message,
//         success: false,
//       };
//     }
//   };

export const fetchHighlight:() => Promise<HighlightResponse> = async () => {
  try{
    const response:AxiosResponse<HighlightResponse> = await apiClient.post('/get_highlights');
    return response.data;
  }catch(error){
    let message:string = "Unexpected Error ! Please refresh and try again";
    let errorCode:number = 500;
    if (error instanceof AxiosError) {
      message = error.message;
      errorCode = error.response?.status ?? 500;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = JSON.stringify(error);
    }

    const response:HighlightResponse = {
        data:null,
        error_code:errorCode,
        message:message
    }
    return response;
  }
}


export const fetchVehicle:(params:AllVehiceFilterParams) => Promise<AllVehicleResponse> = async (params)=>{
  try{
    const allVehicleResponseBody = {
      pagination_info: {
        page: params.pagination.current,
        limit: params.pagination.pageSize,
      },
      sort_by:[
        {
          field:"mtime",
          order_type:1
        }
      ]
    };
    const vehicleResponse:AxiosResponse<AllVehicleResponse> = await apiClient.post("/get_all_vehicles", allVehicleResponseBody);
    return vehicleResponse.data;
  }catch(error){
    let message:string = "Unexpected Error ! Please refresh and try again";
    let errorCode:number = 500;
    if (error instanceof AxiosError) {
      message = error.message;
      errorCode = error.response?.status ?? 500;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = JSON.stringify(error);
    }

    const response:AllVehicleResponse = {
        data:null,
        error_code:errorCode,
        message:message
    }
    return response;
  }
  
}
