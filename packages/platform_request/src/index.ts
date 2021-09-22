import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as requestInterceptors from './interceptors/request'
import * as responseInterceptors from './interceptors/response'
import { forEach } from 'lodash-es'

const instance = axios.create()

// post请求默认设置 Content-Type 为 json，这里会影响风控人机识别参数的获取，axios拦截器获取到的 config 不是最终的配置
instance.defaults.headers.post['Content-Type'] = 'application/json';

forEach(requestInterceptors, (value ,key) => {
  instance.interceptors.request.use(value[0], value[1]);
})

forEach(responseInterceptors, (value ,key) => {
  instance.interceptors.response.use(value[0], value[1]);
})

export const request = async <T = any> (config: AxiosRequestConfig): Promise<{ data: T }> => {
  let result
  try {
    result = await instance(config)
  } catch (error) {
    result = { data: {} }
    return Promise.reject(error)
  }
  return result.data
}

export const requestPlus = async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<{ data: T }>> => {
  return instance(config)
}

export { 
  instance as axios
}
