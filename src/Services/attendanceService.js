import axios from "axios";

const API = "https://backend-anz2.onrender.com";

export const getAttendance = () => axios.get(API);

export const addAttendance = (data) => axios.post(API, data);

export const updateAttendance = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteAttendance = (id) =>
  axios.delete(`${API}/${id}`);
