import Cookies from "js-cookie"
import { interceptorsRequestConfig } from "Src/types/interceptors"
import { addSignature } from "../request-signature"
import { isSameHostname } from "../tool"

export const baseInterceptor: interceptorsRequestConfig = [function (config) {
  // axios 没有做config的合并，判断优先级：baseURL > url
  const needToken = isSameHostname(config.baseURL || config.url)
  if (needToken) {
    config.headers['X-CSRFToken'] = Cookies.get('csrftoken')
    config.headers['X-SessionId'] = window.sessionId || ''
  }
  if (!Object.prototype.hasOwnProperty.call(config, 'withCredentials')) {
    config.withCredentials = true
  }
  config.url = addSignature(config) // 添加风控人机识别参数

  return config;
}, function (error) {
  return Promise.reject(error);
}]
