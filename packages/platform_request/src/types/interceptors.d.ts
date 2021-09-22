import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

type RequestCallback = (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
type RequestErrorCallback = (value: any) => any

type ResponseCallback = (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
type ResponseErrorCallback = (value: AxiosError) => AxiosResponse | Promise<AxiosResponse>

export type interceptorsRequestConfig = [RequestCallback, RequestErrorCallback]

export type interceptorsResponseConfig = [ResponseCallback, ResponseErrorCallback]
