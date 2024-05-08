import axios from "axios";

export const api = axios.create({
  baseURL: process.env.HERMYS_API_URL,
  withCredentials: true,
});
