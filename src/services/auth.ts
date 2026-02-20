import { APIClient } from "../helpers/api_helper";
import { parseApiError } from "../utils/api_error";

import * as url from "../helpers/auth_url_helper";
import { post, get } from "../helpers/axios";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
// export const postJwtLogin = (data: any) => api.create(url.POST_LOGIN, data);
export const postJwtLogin = async (data: any) => {
  try {
    const response = await post(url.POST_LOGIN, data);
    localStorage.setItem("authUser", JSON.stringify(response));
    return response;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

export const postJwtLogout = () => api.create(url.POST_LOGOUT, {});

// Validate Branch

export const ValidateBranch = async ({ bcode }: { bcode: number }) => {
  try {
    const response = await get(url.AUTH_BRANCH, { params: { bcode } });
    // if (response.status >= 200 && response.status <= 299) return response.data;
    const [expired, tills, modules] = await Promise.all([
      expiredStocks({ bcode }),
      availableTIlls({ bcode }),
      GetClientModules({ bcode }),
    ]);
    console.log("VALID", response);
    localStorage.setItem("cloudModules", JSON.stringify(modules));
    return {
      expiredStocks: expired,
      availableTills: tills,
    };
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

export const expiredStocks = async ({ bcode }: { bcode: number }) => {
  try {
    const data = await get(url.EXPIRED_STOCKS, { params: { bcode } });
    // if (response.status >= 200 && response.status <= 299) return response.data;
    // throw response.data;
    return data;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};
// AVAILABLE TILLS
export const availableTIlls = async ({ bcode }: { bcode: number }) => {
  try {
    const data = await get(url.AVAILABLE_TILLS, { params: { bcode } });
    // if (response.status >= 200 && response.status <= 299) return response.data;
    // throw response.data;
    return data;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};
// Get Client Modules
export const GetClientModules = async ({ bcode }: { bcode: number }) => {
  try {
    const data = await get(url.GET_CLIENT_MODULES, { params: { bcode } });
    localStorage.setItem("cloudModules", JSON.stringify(data));
    return data;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};
// AVAILABLE TILLS
export const sysdefaults = async () => {
  try {
    const data = await get(url.SYSDEFAULTS);
    // if (response.status >= 200 && response.status <= 299) return response.data;
    // throw response.data;
    return data;
  } catch (error) {
    const message = parseApiError(error as any);
    throw message;
  }
};

// Validate branch and initialize dependent data (expired stocks, available tills, client modules)
// export const validateBranchAndInit = async ({ bcode }: { bcode: number }) => {
//   try {
//     const validation = await ValidateBranch({ bcode });
//     // In parallel fetch the dependent data
//     const [expired, tills, modules] = await Promise.all([
//       expiredStocks({ bcode }),
//       availableTIlls({ bcode }),
//       GetClientModules({ bcode }),
//     ]);

//     return {
//       validation,
//       expiredStocks: expired,
//       availableTills: tills,
//       clientModules: modules,
//     };
//   } catch (error) {
//     const message = parseApiError(error as any);
//     console.log(error);
//     throw message;
//   }
// };
