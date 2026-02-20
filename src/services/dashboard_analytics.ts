import { parseApiError } from "../utils/api_error";
import * as url from "../helpers/dashboard_url";
import { get } from "../helpers/axios";

export const salesAnalysis = async (parameters: {
  startDate: string;
  endDate: string;
  bcodes: string;
}) => {
  try {
    const response = await get(url.GET_SALES_ANALYSIS, {
      params: {
        startDate: parameters.startDate,
        endDate: parameters.endDate,
        bcodes: parameters.bcodes,
      },
    });
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};
