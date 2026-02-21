import axios, { AxiosRequestConfig } from "axios";
// import config from "../config";

// const { api } = config;

// default
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
// const authUser: any = localStorage.getItem("authUser");
// const token = JSON.parse(authUser) ? JSON.parse(authUser).token : null;
// if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// const raw = localStorage.getItem("authUser");
// let token: string | null = null;

// try {
//   const parsed = raw ? JSON.parse(raw) : null;
//   token = parsed?.token ?? null;
// } catch {
//   token = null;
// }

// if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// const authUser: any = localStorage.getItem("authUser");

// // Add a request interceptor to inject default params
// axios.interceptors.request.use((config) => {
//   // Add your default parameter(s) to every request
//   config.params = {
//     ...config.params,
//     dataBaseName: JSON.parse(localStorage.getItem("authUser") || "{}")
//       ?.clientCode,
//   };

//   return config;
// });

// axios.interceptors.request.use(
//   function (config) {
//     const token = JSON.parse(authUser).token || null;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

axios.interceptors.request.use(
  (config) => {
    // Always read fresh user data
    const raw = localStorage.getItem("authUser");
    const user = raw ? JSON.parse(raw) : null;

    const token: string | undefined = user?.token;
    const clientCode: string | undefined = user["user"]?.clientCode;

    // 1) Auth header
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2) Default query param (merge, don’t replace)
    if (clientCode) {
      config.params = {
        ...(config.params ?? {}),
        dataBaseName: clientCode,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// axios.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => Promise.reject(error),
// );

// Add a response interceptor
// axios.interceptors.response.use(
//   function onFulfilled(response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   },
//   function onRejected(error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log(error);
//     return Promise.reject(error);
//   },
// );
// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log(error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  },
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export async function get(url: string, config = {}) {
  return await axios.get(url, { ...config }); // interceptor returns data already;
}

export async function post(
  url: string,
  data: any,
  config: AxiosRequestConfig = {},
) {
  return axios.post(url, { ...data }, { ...config }); // interceptor returns data already;
}

export async function put(
  url: string,
  data: any,
  config: AxiosRequestConfig = {},
) {
  return axios.put(url, { ...data }, { ...config }); // interceptor returns data already;
}

export async function del(url: string, config: AxiosRequestConfig = {}) {
  return await axios.delete(url, { ...config }); // interceptor returns data already;
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { setAuthorization, getLoggedinUser };
