import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as requestInterceptors from './interceptors/request'
import * as responseInterceptors from './interceptors/response'
import { forEach } from 'lodash-es'

const instance = axios.create()

// post请求默认设置 Content-Type 为 json，这里会影响风控人机识别参数的获取，axios拦截器获取到的 config 不是最终的配置
instance.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
forEach(requestInterceptors, (value, key) => {
  if (value.reject) {
    instance.interceptors.request.use(value.fufilled, value.reject);
  } else {
    instance.interceptors.request.use(value.fufilled);
  }
})

// 响应拦截器
forEach(responseInterceptors, (value ,key) => {
  if (value.reject) {
    instance.interceptors.response.use(value.fufilled, value.reject);
  } else {
    instance.interceptors.response.use(value.fufilled)
  }
})

/**
 * @description
 *  - 常规方法，直接返回最终的 data
 * @param config 
 * @returns {Promise<R>}
 */
const request = <T = any, R = any>(config: AxiosRequestConfig) => async (value: T): Promise<R> => {
  if (['GET', 'get'].includes(config.method as string)) {
    config.params = value
  } else {
    config.data = value
  }

  let result
  try {
    result = await instance(config)
  } catch (error) {
    result = { data: { data: {} } }
    return Promise.reject(error)
  }
  return result.data.data
}

/**
 * @description
 *  - 需要拿 code、msg 等外层信息时，使用该方法
 * @param config
 * @returns {AxiosResponse<{ data: R }>}
 */
 const requestPlus = <T = any, R = any>(config: AxiosRequestConfig) => async (value: T): Promise<AxiosResponse<{ data: R }>> => {
  if (['GET', 'get'].includes(config.method as string)) {
    config.params = value
  } else {
    config.data = value
  }
  return instance(config)
}

/**
 * @description
 *  - 当需要对某一个函数做缓存时，用该函数包裹一层
 *  - 如果请求体没变，返回上次的请求结果，否则重新请求
 * @param func
 * @returns {function}
 */
const useCache = <
  F extends (value: any) => Promise<any>,
  T = F extends (value: infer K) => Promise<any> ? K : any,
  R = F extends (value: any) => Promise<infer K> ? K : any
>(func: F) => async (value: T): Promise<R> => {
  const cacheResult = new Map<string, R>()
  const cachePromise = new Map<string, Promise<R>>()

  const cachekey = JSON.stringify(value)
  // 如果命中缓存直接返回
  if (cacheResult.has(cachekey)) {
    return cacheResult.get(cachekey) as R
  }
  // 如果有其他正在请求中,直接返回请求中promise
  if (cachePromise.has(cachekey)) {
    return cachePromise.get(cachekey) as Promise<R>
  }

  const promise = func(value).then(res => {
    cacheResult.set(cachekey, res as R)
    return res
  }).finally(() => cachePromise.delete(cachekey))

  cachePromise.set(cachekey, promise as Promise<R>)
  return promise as Promise<R>
}

export {
  request,
  requestPlus,
  useCache
}
