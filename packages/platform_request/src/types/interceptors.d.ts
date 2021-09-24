import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

type RequestCallback = (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
type RequestErrorCallback = (value: any) => any

type ResponseCallback = (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
type ResponseErrorCallback = (value: AxiosError) => AxiosResponse | Promise<AxiosResponse> | undefined

export type interceptorsRequestConfig = {
  fufilled: RequestCallback,
  reject?: RequestErrorCallback
}

export type interceptorsResponseConfig = {
  fufilled: ResponseCallback,
  reject?: ResponseErrorCallback
}
