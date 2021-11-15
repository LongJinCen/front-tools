import { AxiosInstance } from "axios";
import { forEach } from "lodash-es";
import {
  TInterceptorsRequestConfig,
  TInterceptorsResponseConfig,
} from "./types/interceptors";

/**
 * 添加请求拦截器
 * @param instanse
 * @param intercept
 */
export const addRequestIntercept = (
  instance: AxiosInstance,
  intercept: Record<string, TInterceptorsRequestConfig>
): void => {
  forEach(intercept, (value) => {
    if (value.reject) {
      instance.interceptors.request.use(value.fufilled, value.reject);
    } else {
      instance.interceptors.request.use(value.fufilled);
    }
  });
};

/**
 * 添加响应拦截器
 * @param instanse
 * @param intercept
 */
export const addResponseIntercept = (
  instance: AxiosInstance,
  intercept: Record<string, TInterceptorsResponseConfig>
): void => {
  forEach(intercept, (value) => {
    if (value.reject) {
      instance.interceptors.response.use(value.fufilled, value.reject);
    } else {
      instance.interceptors.response.use(value.fufilled);
    }
  });
};
