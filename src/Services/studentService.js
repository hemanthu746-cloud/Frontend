import API from "./api";

export const getStudents = () =>
  API.get("/students");

export const addStudent = (student) =>
  API.post("/students", student);

export const updateStudent = (id, student) =>
  API.put(`/students/${id}`, student);

export const deleteStudent = (id) =>
  API.delete(`/students/${id}`);