import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import * as requestInterceptors from './interceptors/request'
import * as responseInterceptors from './interceptors/response'
import * as responseInterceptorsPlus from '././interceptors/response-plus'
import { addRequestIntercept, addResponseIntercept } from './tool'
const CancelToken = axios.CancelToken

const instance = axios.create()
const instancePlus = axios.create()

// post请求默认设置 Content-Type 为 json
instance.defaults.headers.post['Content-Type'] = 'application/json';
instancePlus.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
addRequestIntercept(instance, requestInterceptors)
addRequestIntercept(instancePlus, requestInterceptors)

// 响应拦截器
addResponseIntercept(instance, responseInterceptors)
addResponseIntercept(instancePlus, responseInterceptorsPlus)

const cancleMap = new Map<Promise<any>, CancelTokenSource>()

interface ICancleable {
  cancleable?: boolean
}

/**
 * @description
 *  - 常规方法，直接返回最终的 data
 * @param config 
 * @returns {Promise<R>}
 */
const request = <T = any, R = any>(config: AxiosRequestConfig & ICancleable) => (value: T): Promise<R> => {
  if (['GET', 'get'].includes(config.method as string)) {
    config.params = value
  } else {
    config.data = value
  }
  let source
  if (config.cancleable) {
    source = CancelToken.source()
    config.cancelToken = source.token
  }
  let result = instance(config).then(res => res.data.data)
  if (config.cancleable) {
    cancleMap.set(result, source as CancelTokenSource)
  }
  return result
}

/**
 * @description
 *  - 需要拿 code、msg 等外层信息时，使用该方法
 * @param config
 * @returns {AxiosResponse<{ data: R }>}
 */
 const requestPlus = <T = any, R = any>(config: AxiosRequestConfig & ICancleable) => (value: T): Promise<AxiosResponse<{ data: R }>> => {
  if (['GET', 'get'].includes(config.method as string)) {
    config.params = value
  } else {
    config.data = value
  }
  let source
  if (config.cancleable) {
    source = CancelToken.source()
    config.cancelToken = source.token
  }
  let result = instancePlus(config)
  if (config.cancleable) {
    cancleMap.set(result, source as CancelTokenSource)
  }
  return result
}

/**
 * @description
 *  - 取消某一个请求
 * @param promise 
 */
const abort = (promise: Promise<any>) => {
  const source = cancleMap.get(promise)
  if (source) {
    source.cancel('请求被取消')
    cancleMap.delete(promise)
  }
}

/**
 * @description
 *  - 当需要对某一个请求做缓存时，用该函数包裹一层
 *  - 如果请求体没变，返回上次的请求结果，否则重新请求
 * @param func
 * @returns {function}
 */
const useCache = <
  F extends (value: any) => Promise<any>,
  T = F extends (value: infer K) => Promise<any> ? K : any,
  R = F extends (value: any) => Promise<infer K> ? K : any
>(func: F) => {

  const cacheResult = new Map<string, R>()
  const cachePromise = new Map<string, Promise<R>>()

  return async (value: T): Promise<R> => {
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
}

/**
 * @description
 *  - 当需要对某一个请求做防抖，用该函数包一层
 * @param func
 * @returns {function}
 */
const useDebounce = <
  F extends (value: any) => Promise<any>,
  T = F extends (value: infer K) => Promise<any> ? K : any,
  R = F extends (value: any) => Promise<infer K> ? K : any
  >(func: F) => {
  const cachePromise: Promise<any>[] = []

  return (value: T): Promise<R> => {
    cachePromise.forEach(promise => abort(promise))
    cachePromise.length = 0
    const promise = func(value)
    cachePromise.push(promise)
    return promise
  }
}

export {
  request,
  requestPlus,
  abort,
  useCache,
  useDebounce
}
