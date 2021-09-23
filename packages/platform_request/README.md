# @ad/platform_request
将请求能力统一封装，方便后续统一维护与扩展
## Install
`axios、@okee-uikit/vue3` 被当做外部依赖，版本兼容性为 `^0.21.4、^0.2.2`
```javascript
npm i @ad/platform_request axios @okee-uikit/vue3 --save
```
## Feature
- 为 url 自动添加 `aadvid`
- 添加 `token`
- 添加风控人机识别参数 `_signature`
- `request、response` 泛型支持
- `response` 常见错误处理
## UseAge
总共暴露了两个个变量，底层都是使用的 `axios.create()` 创建的实例，并且都应用了 `src/interceptors` 下的拦截器，可根据情况自行选用。

```javascript
import { request, requestPlus } from '@ad/platform_request'

interface IReponse {}
interface IRequest {}
// service.ts
const func1 = request<IRequest, IReponse>(AxiosRequestConfig)
const func2 = requestPlus<IRequest, IReponse>(AxiosRequestConfig)
// index.ts
import { func1, func2 } from './service.ts'

const result1 = await func1(data)
const result2 = await func2(data)

```

在极少数情况下，请求可能需要缓存，可以使用 `useCache` 方法来包裹一层，`useCache` 会根据请求的 `param、body` 作为 `key`，如果 key 没变，返回上次的请求结果，否则重新请求。
```javascript
import { request, requestPlus, useCache } from '@ad/platform_request'

interface IReponse {}
interface IRequest {}
// service.ts
const func1 = useCache(request<IRequest, IReponse>(AxiosRequestConfig))
const func2 = useCache(requestPlus<IRequest, IReponse>(AxiosRequestConfig))
// index.ts
import { func1, func2 } from './service.ts'

const result1 = await func1(data)
const result2 = await func2(data)

```

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

`request` 返回 `AxiosResponse.data.data`，`requestPlus` 返回整个 `AxiosResponse`。

## handle Error
当接口发生错误时会自动提示 message，外部不需要处理，否则会重复，错误会被抛出，因此在调用时，应该加上 `try、catch`