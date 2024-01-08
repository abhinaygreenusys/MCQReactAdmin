import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const updateToken = async () => {
  // const refreshToken = localStorage.getItem("JordanTokenRefresh");
  // const { role } = jwtDecode(localStorage.getItem("mcq-token"));
  // try {
  //   const { data } = await axios.post(
  //     `${process.env.REACT_APP_BASE_API_URL}/${role}/refreshToken`, {}, {
  //       headers: {
  //         refreshToken: refreshToken,
  //       },
  //     }
  //   );
  //   localStorage.setItem("mcq-token", data.token);
  // } catch (e) {
  //   console.log(e);
    localStorage.removeItem("mcq-token");
    window.location.href = "/auth/login";
    // localStorage.removeItem("JordanTokenRefresh");
  // }
};

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    if (!localStorage.getItem("mcq-token")) return config;
    const { exp } = jwtDecode(localStorage.getItem("mcq-token"));
    if (Date.now() >= exp * 1000) {
      await updateToken();
    }
    Object.assign(config.headers, {
      Authorization: "Bearer " + localStorage.getItem("mcq-token"),
    });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

export default api;
