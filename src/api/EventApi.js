import axios from "axios";
const API_PREFIX = process.env.REACT_APP_API_PREFIX;

export const events = async ({
  token,
  page = 1,
  perPage = 10,
  search = '',
  categoryId = null,
  startDate = null,
  endDate = null,
  onSuccess,
  onError
}) => {
  try {
    const params = {
      page,
      per_page: perPage,
      search,
    };

    if (categoryId) params.category_id = categoryId;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    const response = await axios.get('/events', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });

    onSuccess?.(response.data); // callback if defined
  } catch (error) {
    console.error("Error fetching events:", error);
    onError?.(error);
  }
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
  data.append('_method', 'PUT'); // method spoofing
  return await axios.post(`${API_PREFIX}/events/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
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