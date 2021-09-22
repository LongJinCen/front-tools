import axios from 'axios'
import * as requestInterceptors from './interceptors/request'
import * as responseInterceptors from './interceptors/response'
import { forEach } from 'lodash-es'

const request = axios.create()

// post请求默认设置 Content-Type 为 json，这里会影响风控人机识别参数的获取，axios拦截器获取到的 config 不是最终的配置
request.defaults.headers.post['Content-Type'] = 'application/json';

forEach(requestInterceptors, (value ,key) => {
  request.interceptors.request.use(value[0], value[1]);
})

forEach(responseInterceptors, (value ,key) => {
  request.interceptors.response.use(value[0], value[1]);
})

export default request
