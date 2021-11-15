import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type TRequestCallback = (
  value: AxiosRequestConfig
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
type TRequestErrorCallback = (value: any) => any;

type TResponseCallback = (
  value: AxiosResponse
) => AxiosResponse | Promise<AxiosResponse>;
type TResponseErrorCallback = (
  value: AxiosError
) => AxiosResponse | Promise<AxiosResponse>;

export type TInterceptorsRequestConfig = {
  fufilled: RequestCallback;
  reject?: RequestErrorCallback;
};

export type TInterceptorsResponseConfig = {
  fufilled: ResponseCallback;
  reject?: ResponseErrorCallback;
};
