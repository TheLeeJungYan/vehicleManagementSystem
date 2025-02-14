import apiClient from "@/api/apiClient";
import { HighlightResponse } from "@/types/Highlight.type";
import {
  AllVehicleResponse,
  AllVehicleFilterParams,
} from "@/types/AllVehicle.type";
import { AxiosError, AxiosResponse } from "axios";

export const fetchHighlight: () => Promise<HighlightResponse> = async () => {
  try {
    const response: AxiosResponse<HighlightResponse> = await apiClient.post(
      "/get_highlights"
    );
    return response.data;
  } catch (error) {
    let message: string = "Unexpected Error ! Please refresh and try again";
    let errorCode: number = 500;
    if (error instanceof AxiosError) {
      message = error.message;
      errorCode = error.response?.status ?? 500;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = JSON.stringify(error);
    }

    const response: HighlightResponse = {
      data: null,
      error_code: errorCode,
      message: message,
    };
    return response;
  }
};

export const fetchVehicle: (
  params: AllVehicleFilterParams
) => Promise<AllVehicleResponse> = async (params) => {
  try {
    const allVehicleResponseBody = {
      ...params,
      pagination_info: {
        page: params.pagination.current,
        limit: params.pagination.pageSize,
      },
      sort_by: params.sort_by,
    };
    console.log(allVehicleResponseBody);
    const vehicleResponse: AxiosResponse<AllVehicleResponse> =
      await apiClient.post("/get_all_vehicles", allVehicleResponseBody);
    return vehicleResponse.data;
  } catch (error) {
    let message: string = "Unexpected Error ! Please refresh and try again";
    let errorCode: number = 500;
    if (error instanceof AxiosError) {
      message = error.message;
      errorCode = error.response?.status ?? 500;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = JSON.stringify(error);
    }

    const response: AllVehicleResponse = {
      data: null,
      error_code: errorCode,
      message: message,
    };
    return response;
  }
};
