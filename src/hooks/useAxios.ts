"use client";

import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";

const useAxios = () => {
  const { accessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (err?.response.status === 401) {
          clearAuth();
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, clearAuth]);

  return { axiosInstance };
};

export default useAxios;
