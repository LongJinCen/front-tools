# @ad/platform_request
将请求能力统一封装，方便后续统一维护与扩展
## Install
`axios` 被当做外部依赖，版本兼容性为 `^0.21.4`
```javascript
npm i @ad/platform_request axios --save
```
## UseAge
总共暴露了三个变量，底层都是使用的 `axios.create()` 创建的实例，并且都应用了 `src/interceptors` 下的拦截器，可根据情况自行选用

```javascript
import { request, requestPlus, axios } from '@ad/platform_request'

interface Reponse {}

const response = await request<Reponse>(config)
const response1 = await requestPlus<Reponse>(config)

const response2 = await axios(config)
```

> `request、requestPlus` 支持通过泛型设置返回值，`axios` 则不支持。

`axios` 在未经过处理的情况下，返回值的格式如下：

```typescript
export interface AxiosResponse<T = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
```

`request` 返回 `AxiosResponse.data`，`requestPlus` 返回整个 `AxiosResponse`。通常情况下使用这两个方法就够了。如果你想调用 `axios` 上的其他方法，使用暴露出来的 `axios` 变量即可


