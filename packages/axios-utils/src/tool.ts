import { AxiosInstance } from "axios";
import { forEach } from "lodash-es";
import {
  interceptorsRequestConfig,
  interceptorsResponseConfig,
} from "./types/interceptors";

/**
 * 判断URL和当前页面的请求是否是相同host
 * @param {string} url 需要判断的url
 * @returns {boolean}
 */
export const isSameHostname = function (url?: string): boolean {
  const { hostname } = parseUrl(url);
  const curHostname = window.location.hostname;
  return hostname === curHostname;
};

export const parseUrl = function (url?: string): URL {
  url = url || window.location.href;
  if (window.URL) {
    try {
      return new window.URL(url);
    } catch (e) {
      // 解析失败
    }
  }

  const a = document.createElement("a");
  a.href = url;
  return {
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    href: a.href,
    origin: a.origin,
    port: a.port || "80",
    search: a.search,
    searchParams: queryToJson(a.href),
    hash: a.hash,
    pathname: a.pathname,
    password: a.password,
    username: a.username,
  } as URL;
};

/**
 * 将url参数部分解析成key/value形式
 * @param {string} query 格式key=value&key=value
 * @returns {object} json 对象{key:value,key:value}
 */
export const queryToJson = function (query?: string): any {
  query = query || window.location.href;

  const reg = /(?:\?(.*?=[^#]*))+/g;
  let regObj: any = {};
  const paramsArray = [];

  while (regObj) {
    regObj = reg.exec(query);
    if (regObj) {
      paramsArray.push(regObj[1]);
    }
  }
  const params = paramsArray.join("&");

  const obj: any = {};
  params.split("&").forEach((item) => {
    const row = item.split("=");
    if (row.length === 2) {
      obj[row[0]] = decodeURIComponent(row[1]);
    }
  });
  return obj;
};

/**
 * 给定URL增加|更新query参数
 * @param {string} url 给定URL
 * @param {object} queryObj 要增加或者修改的 query参数
 * @returns {string|object} URL string或者对象
 */
export const addOrReplaceParam = function (
  href: string,
  queryObj: object = {},
  res = false
): string {
  let pos;
  let hash = "";
  let query = "";
  // extract fragment
  pos = href.indexOf("#");
  if (pos > -1) {
    hash = href.substring(pos) || "";
    href = href.substring(0, pos);
  }
  // extract query
  pos = href.indexOf("?");
  if (pos > -1) {
    query = href.substring(pos);
    href = href.substring(0, pos);
  }
  const originQueryObj = query ? queryToJson(query) : {}; // 注意这里 query 不可传空
  const finalQuery = jsonToQuery({ ...originQueryObj, ...queryObj });
  const finalHref = href + (finalQuery ? "?" + finalQuery : "") + hash;
  return finalHref;
};

/**
 * json转换为url
 * @param {object} json json数据
 * @returns {string} url
 */
export const jsonToQuery = function (
  json: Record<string, string | number | boolean>
): string {
  if (!json) {
    return "";
  }
  const arr = [];
  let key;
  for (key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      arr.push(key + "=" + encodeURIComponent(json[key]));
    }
  }
  return arr.join("&");
};

/**
 * 添加请求拦截器
 * @param instanse
 * @param intercept
 */
export const addRequestIntercept = function (
  instance: AxiosInstance,
  intercept: Record<string, interceptorsRequestConfig>
) {
  forEach(intercept, (value, key) => {
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
export const addResponseIntercept = function (
  instance: AxiosInstance,
  intercept: Record<string, interceptorsResponseConfig>
) {
  forEach(intercept, (value, key) => {
    if (value.reject) {
      instance.interceptors.response.use(value.fufilled, value.reject);
    } else {
      instance.interceptors.response.use(value.fufilled);
    }
  });
};
