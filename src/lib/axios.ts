import { BASE_URL } from "@/config/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
