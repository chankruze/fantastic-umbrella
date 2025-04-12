import { NEWS_API_KEY, NEWS_API_URL } from "constants";

import axios from "axios";
import { Toastr } from "neetoui";
import convertKeysToCamelCase from "utils/convertKeysToCamelCase";

const handleErrorResponse = error => {
  if (error.response && error.response.data) {
    const { status, code, message } = error.response.data;

    if (status === "error" && code === "parameterInvalid") {
      Toastr.error(message, { autoClose: 3000 });
    } else {
      Toastr.error("An unexpected error occurred.", { autoClose: 3000 });
    }
  } else {
    Toastr.error("A network error occurred. Please try again.", {
      autoClose: 3000,
    });
  }
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = convertKeysToCamelCase(response.data);
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => (transformResponseKeysToCamelCase(response), response.data),
    error => (handleErrorResponse(error), Promise.reject(error))
  );
};

const initializeAxios = () => {
  axios.defaults.baseURL = NEWS_API_URL;
  axios.defaults.params = { apikey: NEWS_API_KEY };
  setHttpHeaders();
  responseInterceptors();
};

export default initializeAxios;
