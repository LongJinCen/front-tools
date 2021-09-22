// 请求接入风控，人机识别，在 url 中拼接一个签名
import { sign } from '@byted/acrawler'
import { parseUrl, addOrReplaceParam } from './tool'
import qs from 'qs'
import { AxiosRequestConfig } from 'axios'

const host = window.location.host
const httpMethodValid = ['GET', 'POST']
const contentTypeHandled = ['application/json', 'application/x-www-form-urlencoded']

interface Nonce {
  url: string;
  bodyVal2str?: boolean; // 是否是 formdata 格式
  body?: any; // 请求体
}

export function addSignature (config: AxiosRequestConfig) {
  const url = config.url || ''
  const methodUpperCase = (config.method || '').toUpperCase()
  const methodLowerCase = methodUpperCase.toLowerCase()
  let contentType = ''
  if (config.headers['Content-Type']) {
    contentType = config.headers['Content-Type']
  } else if (config.headers?.[methodLowerCase]?.['Content-Type']) {
    contentType = config.headers[methodLowerCase]['Content-Type']
  }
  const isPost = methodUpperCase === 'POST'
  const parsedUrl = parseUrl(url)
  if (parsedUrl.host !== host ||
    httpMethodValid.indexOf(methodUpperCase) <= -1 ||
    (isPost && contentTypeHandled.every(k => contentType.indexOf(k) <= -1))
  ) {
    return url
  }

  const nonce: Nonce = {
    url: parsedUrl.href
  }
  if (isPost) {
    const isFormData = contentType.indexOf('application/x-www-form-urlencoded') > -1
    nonce.bodyVal2str = isFormData
    nonce.body = {}
    if (isFormData) {
      nonce.body = qs.parse(config.data || '')
    } else {
      const body = config.data || '{}'
      try {
        nonce.body = JSON.parse(body)
      } catch (e) {
        // 解析失败
      }
    }
  }
  const signature = sign(nonce)
  return addOrReplaceParam(url, {
    _signature: signature
  })
}
