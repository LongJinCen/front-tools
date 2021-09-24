# @ad/platform_request
将请求能力统一封装，方便后续统一维护与扩展
## Install
`axios、@okee-uikit/vue3` 被当做`peerDependencies`，版本兼容性为 `^0.21.4、^0.2.2`
```javascript
npm i @ad/platform_request axios @okee-uikit/vue3 --save
```
## Feature
- 为 url 自动添加 `aadvid`
- 添加 `X-CSRFToken`
- 添加风控人机识别参数 `_signature`
- `request、response` 泛型支持
- `response` 错误处理，message 提示
- 请求可缓存，可防抖
## UseAge
### request、requestPlus
```typescript
import { request } from '@ad/platform_request'

// service.ts
interface IRequest {}
interface IResponse {}

const getDetail = request<IRequest, IResponse>({ url: '', method: '' })

// xxx.ts
import { getDetail } from './service.ts'

const data = {}

try {
  const result = await getDetail(data)
} catch (error) {
  console.log(error)
}

```

对于咱们这边后端返回的通常格式来说，`axios` 返回的内容如下
```typescript
export interface AxiosResponse<T = any>  {
  data: {
    msg: '',
    data: {},
    code: 0,
    extra: {}
  };
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
```
`request、requestPlus` 的区别是，前者返回 `AxiosResponse.data.data`，后者返回 `AxiosResponse`
### useCache
可以用该方法对 `request、requestPlus` 进行包装，使接口具有缓存功能，缓存的策略为，将请求的 `data` 或者 `params` 作为 key，发生改变后重新请求，否则利用缓存。

运用场景例如：
- 分页加载的数据缓存

```typescript
import { request, useCache } from '@ad/platform_request'

// service.ts
interface IRequest {}
interface IResponse {}

const getDetail = useCache(request<IRequest, IResponse>({ url: '', method: '' }))

// xxx.ts
import { getDetail } from './service.ts'

const data = {}

try {
  const result = await getDetail(data)
} catch (error) {
  console.log(error)
}

```
### useDebounce
同一个请求多次被发送，返回的顺序可能会错乱，例如：
1. 推广管理在不同的页面之间进行切换时，从 1 -> 2 -> 3 页，到第三页的时候显示的数据可能是第一页的。
2. 不同 A、B tab 之间进行切换，从 A -> B -> A，显示的数据可能是 B 的

可以使用 `useDebounce` 做一个针对请求的防抖，需要将 `cancleable` 设置为 `true`。针对同一个 `url`，同事发 3 次，如果第 1、2 次请求未返回，则会将其中断

```typescript
import { request, useDebounce } from '@ad/platform_request'

// service.ts
interface IRequest {}
interface IResponse {}

const getDetail = useDebounce(request<IRequest, IResponse>({ url: '', method: '', cancleable: true }))

// xxx.ts
import { getDetail } from './service.ts'

const data = {}

try {
  const result = await getDetail(data)
} catch (error) {
  console.log(error)
}

`useDebounce` 是针对已发送的请求的防抖，会对已发送的请求进行取消，与平时常见的防抖不一样

```
### abort
当发送了某一个请求后，可以取消。不能使用 `async、await`
```typescript
import { request, useDebounce, abort } from '@ad/platform_request'

// service.ts
interface IRequest {}
interface IResponse {}

const getDetail = useDebounce(request<IRequest, IResponse>({ url: '', method: '', cancleable: true }))

// xxx.ts
import { getDetail } from './service.ts'

const data = {}

const promise = getDetail(data).then(res => {
  console.log(res)
}).catch(error => {
  console.log(res)
})
// 取消
abort(promise)
```
当一个请求被取消时，为了防止 `.then` 注册的回调执行，会触向外抛出异常触发 `.catch` 的执行
## handle Error
当接口发生错误时会自动提示 message，外部不需要处理，否则会重复，另外错误会被抛出，因此在调用时，必须加上 `try、catch`