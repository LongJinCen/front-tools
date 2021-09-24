import { interceptorsResponseConfig } from "Src/types/interceptors"
import { RESPONSE_CODE, RESPONSE_TEXT, STATUS_CODE, STATUS_TEXT } from "../const"
import { Message } from '@okee-uikit/vue3'
import axios from 'axios'

export const baseInterceptors: interceptorsResponseConfig = {
  fufilled: function (response) {
    const { data, config, status } = response
    const code = data.code as number
    // 如果user-adv鉴权未通过
    if(code === 40102){
      const errorMsg = data.msg || RESPONSE_TEXT[code]
      Message.danger(errorMsg)
      return Promise.reject(response)
    }
    if (code !== 0 && ![200, 'success', 'SUCCESS'].includes(data.status)) {
      // 如果接口返回未登录
      if (code === 40001) {
        const redirectUrl = data.extra && data.extra.redirect_url || '/pages/login/index.html'
        window.location.href = redirectUrl
      } else {
        console.log(config.url, 'Error Code', status, 'Error Msg', data.msg || RESPONSE_TEXT[code as RESPONSE_CODE])
      }
      return Promise.reject(response)
    }
    return response
  },
  reject: function (error) {
    if (axios.isCancel(error)) {
      console.log('request canceled: ', error)
      return Promise.reject(error)
    }
    const status = error?.response?.status || ''
    const errorMsg = STATUS_TEXT[status as STATUS_CODE] ? STATUS_TEXT[status as STATUS_CODE] : '网络异常，请刷新重试~'
    Message.danger(errorMsg)
    return Promise.reject(error.response);
  }
}
