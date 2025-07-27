import axios from "axios";
const API_PREFIX = process.env.REACT_APP_API_PREFIX;
export const events = async ({token}) => {
  return await axios
    .get(`${API_PREFIX}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data));
};

export const categories = async ({token}) => {
  return await axios
    .get(`${API_PREFIX}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((error) => Promise.reject(error?.response?.data));
};

export const addEvent = async ({ token, data }) => {
  return await axios.post(`${API_PREFIX}/events`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateEvent = async ({ id, token, data }) => {
  return await axios.put(`${API_PREFIX}/events/`+ id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteEvent = async ( token, id) => {
  return await axios.delete(`${API_PREFIX}/events/`+ id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};