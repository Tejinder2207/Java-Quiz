import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchResults = async () => {
  const res = await axios.get(`${API_URL}/results`);
  return res.data;
};
