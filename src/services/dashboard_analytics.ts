import { parseApiError } from "../utils/api_error";
import * as url from "../helpers/dashboard_url";
import { get } from "../helpers/axios";

let { bcode = 0 } = JSON.parse(localStorage.getItem("activeBranch") ?? `{}`);

export const salesAnalysisApi = async (parameters: {
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

export const profitPictureApi = async (parameters: {
  startDate: string;
  endDate: string;
  // bcodes: string;
}) => {
  try {
    const response = await get(url.GET_PROFIT_PICTURE, {
      params: {
        startDate: parameters.startDate,
        endDate: parameters.endDate,
      },
    });
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

export const stockAnalysisApi = async (parameters: {
  startDate: string;
  endDate: string;
  // bcodes: string;
}) => {
  try {
    const response = await get(url.GET_STOCK_ANALYSIS, {
      params: {
        startDate: parameters.startDate,
        endDate: parameters.endDate,
      },
    });
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

export const branchAnalysisApi = async (parameters: {
  startDate: string;
  endDate: string;
  // bcodes: string;
}) => {
  try {
    const response = await get(url.GET_BRANCH_ANALYSIS, {
      params: {
        startDate: parameters.startDate,
        endDate: parameters.endDate,
      },
    });
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

export const cashierAnalysisApi = async (parameters: {
  startDate: string;
  endDate: string;
  // bcodes: string;
}) => {
  try {
    const response = await get(url.GET_TILL_ANALYSIS, {
      params: {
        startDate: parameters.startDate,
        endDate: parameters.endDate,
      },
    });
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

export const dailyReconciliationApi = async (parameters: {
  startDate: string;
  endDate: string;
  // bcodes: string;
}) => {
  try {
    const response = await get(url.DAILY_RECONCILIATION, {
      params: {
        bcode: Number(bcode),
        startDate: parameters.startDate,
        endDate: parameters.endDate,
      },
    });
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};
