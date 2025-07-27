import axios from "axios";
const API_PREFIX = process.env.REACT_APP_API_PREFIX;
export const login = async (payload) => {
  return await axios
    .post(`${API_PREFIX}/login`, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => Promise.reject(error?.response.data));
};

export const refreshToken = async (payload) => {
  return await axios
    .post(`${API_PREFIX}/auth/refresh-token`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => Promise.reject(error?.response.data));
};

export const logout = async () => {
  return await axios
    .post(`${API_PREFIX}/logout`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => Promise.reject(error?.response.data));
};
