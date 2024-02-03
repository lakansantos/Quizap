import axios, {AxiosRequestConfig, Method} from "axios";
import {QueryKey, useQuery} from "@tanstack/react-query";

export const fetcher = (
  method: Method,
  url?: string,
  params?: object,
  options?: AxiosRequestConfig
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    ...options,
  };

  if (method.toUpperCase() === "GET") {
    config.params = params;
  } else {
    config.data = params;
  }

  return axios.request(config).then((res) => res.data);
};

/**
 * Use to get the returns of fetches through get method
 * @param key
 * @param url
 * @param params
 * @param options
 * @returns data, isLoading, error
 */

export const useGetFetch = (
  key: QueryKey,
  url: string,
  params?: object,
  options?: AxiosRequestConfig
) => {
  const fetcherGet = (url: string) => fetcher("GET", url, params, options);

  const res = useQuery({queryKey: key, queryFn: () => fetcherGet(url)});

  const {data, isLoading, error, refetch} = res;

  return {data, isLoading, error, refetch};
};
