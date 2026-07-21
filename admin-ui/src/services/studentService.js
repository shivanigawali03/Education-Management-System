import axios from "axios";

const BASE_URL = "http://localhost:8080/students";

export const getStudents = () => {
    return axios.get(BASE_URL);
};

export const addStudent = (student) => {
    return axios.post(BASE_URL, student);
};