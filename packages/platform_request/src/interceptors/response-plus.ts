import { interceptorsResponseConfig } from "Src/types/interceptors"
import { RESPONSE_TEXT, STATUS_CODE, STATUS_TEXT } from "../const"
import { Message } from '@okee-uikit/vue3'
import axios from 'axios'

export const baseInterceptors: interceptorsResponseConfig = {
  fufilled: function (response) {
    let { data } = response
    const code = data.code as number
    // 如果user-adv鉴权未通过
    if(code === 40102){
      const errorMsg = data.msg || RESPONSE_TEXT[code]
      Message.danger(errorMsg)
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
