# @ad/eslint-plugin-ad

所有的 ts [rule](https://code.byted.org/ad/platform_eslint/blob/feature/lint/src/rules/_typescript-all.ts)，vue 的待更新

# Table of content

- **Table of content**
- **motivation**
- **Design**
- **UseAge**
  - **Install**
  - **Config**
  - **Build**
  - **CI**
  - **Give it a try**
  - **History Code**
- **Implementation details**
  - **What rules should we apply**
  - **Prettier**
  - **Compatibility with our own projects**

## motivation

1. eslint 规则不全约束不够、不生效
2. 编写代码的同时还需要关注格式问题，需要额外的开发时间用来格式化代码
3. 一些编写规范通常是口口相传

因此，为了统一各个项目之间的代码编写规范，提高代码质量、美观度、维护性，同时降低新项目接入 eslint 成本，将相关规则统一收敛到该插件中，并提供打包、CI 的接入流程规范

## Design

为了保证规则的可复用性，考虑到不同项目未来可能会有一些定制化的规则，所以针对 `ts`、`vue3` 会有一套公共的规则集，同时针对不同的项目需要新建不同的 `config` 并继承这一套公共的配置。

目前，提供了针对三个项目的规则集：

- node_core
- platform_component：
- platform_future：

另外还特地接入了 `Prettier`，它能在我们编写代码时，无需关注代码格式统一问题，自动识别当前的文件类型，保存后自动格式化当前文件的代码（也能通过 cli 对整个项目进行一次格式化），且无需像 eslint 一样配置各种规则，且支持各种语言，在代码格式化方面，它比 eslint 更专业，能为我们省不少时间。

所以开发者仅需关注的是 eslint 的 error、warning 信息，也无需了解所有的规则，只要有不符合规范的，会提示具体报错的规则，点击链接跳转到对应的规则想详情页即可查看。

## UseAge

### Install

```shell
# 安装该插件
npm i @ad/eslint-plugin-ad --save-dev
# 安装 prettier 模块
npm i prettier --save-dev --save-exact
```

安装 **prettier vscode** 对应的插件，然后打开 VsCode 的 setting.json 文件在尾部添加如下配置，并重启 VsCode

```json
// 将默认的 formatter 设置为 prettier
    "editor.defaultFormatter": "esbenp.prettier-vscode",
// 设置保存时自动 format
    "editor.formatOnSave": true
```

安装 **eslint vscode** 插件，这样编辑器能给我们错误提示

### Config

接下来该进行配置

```shell
# 新建 .prettierrc 文件
echo {}> .prettierrc
echo {}> .prettierignore
# 新建 .eslintrc 文件
echo {}> .eslintrc
echo {}> .eslintignore
```

`.prettierrc` 保持为空即可，因为 `prettier` 为了统一规范，提供的配置很少，个人认为使用其默认的配置即可，这里仅仅是用于告诉编辑器，需要使用 `Prettier`

`Prettier` 默认忽略 node_modules，会格式化所有[其支持的语言的格式](https://prettier.io/docs/en/index.html)，需要把不需要格式化的文件放到 .prettierignore 当中即可。通常需要包含如下：

```bash
# 构建生成的文件
dist
# 单元测试生成的文件
coverage
# 自动生成的文件

# 其他不需要 prettier 格式化的文件
*.md
```

在 `.eslintrc` 中使用该插件即可，根据不同的项目选用不同的配置：

```json
{
  "extends": [
    "plugin:@ad/eslint-plugin-ad/(platformComponent|nodeCore|platformFuture)"
  ],
  "plugins": ["@ad/eslint-plugin-ad"]
}
```

Eslint 默认忽略 node_modules、.xxx 文件，`.eslintignore` 通常是所有你不需要校验的文件

```json
# 自动生成文件

# 所有 js 文件
*.js
```

另外，还必须在 `tsconfig.json` 中明确通过 `include` 属性指定 ts 校验要包含的文件有哪些，且 ts 校验的文件范围需要跟 eslint 保持一致，例如 ts 的 include 属性为 `["src/**/*"]`，那么 `.eslintignore` 需要把 `src` 之外的 `.js、.ts、.d.ts` 这些文件都排除掉。

### Build

如果你使用 webapck 作为模块打包器，安装 `eslint-webpack-plugin`，如果使用 webpack4，安装 2.x 版本即可

```javascript
plugins: [
  new ESLintPlugin({
    //   因为默认 eslint 只检查 js 文件，其他文件类型需要手动指定
    extensions: ["ts", "vue", "tsx"],
  }),
];
```

### CI

利用 husky + lint-staged，在提交时，对修改的代码做检查

```bash
npm install husky --save-dev
npx husky install
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npx lint-staged"

npm i lint-staged --save-dev
```

然后再 package.json 中添加如下配置:

```json
"lint-staged": {
    "src/**/*.{ts,tsx,vue}": "eslint"
}
```

### Give it a try

现在试着去编辑某一个文件，保存后会自动格式化当前文件的代码，整个项目中会有严格的 eslint 检查，并且在 build、commit 的过程中都会使用 eslint 进行检查，如果未通过，会报错。

### History Code

针对历史代码，首先使用 `npx prettier --write 文件或目录` 进行格式化，然后针对 eslint 的报错，需要手动进行解决

## Implementation details

该插件仅适用于 ts、ts + vue（不包含 ts、js 混合的项目）。

### What rules should we apply

针对 js，eslint 自身提供了一系列规则，可以通过 `eslint:recommended`、`eslint:all` 来分别使用这两套 config。

针对 typescript，官方也提供了 `@typescript-eslint` 插件，并提供了 `@typescript-eslint/recommended`、`@typescript-eslint/recommended-requiring-type-checking` 两套规则集，由于 ts 是 js 的超集，在某些规则上会存在一些冲突，该插件内部会关闭 eslint 提供的规则中与自身产生冲突的部分。

针对 vue2/3，官方提供了 `eslint-plugin-vue` ，提供了 `vue/vue3-recommended` 或 `vue/vue-recommended` 等规则集，以前端 Vue 项目为例，通常大家的配置规则如下：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended"
  ]
}
```

上面这套规则存在一些不足：

- `eslint` 提供了非常多的规则，`eslint:recommended` 只提供了一半都不到的规则。
- `@typescript-eslint/recommended` 底层是不依赖 typescript 提供的类型信息的，也就是说它不会对 ts 的类型做检查

因此还需要对规则集进行一些补充：

- 通过使用 `@typescript-eslint/recommended-requiring-type-checking`，eslint 会利用 ts 编译器提供的类型信息强化类型相关的检查。
- [airbnb/javascript](https://github.com/airbnb/javascript#iterators-and-generators)：是 **Airbnb** 公司针对 js 的一套实践，内部仍然使用的是 eslint 提供的规则，但是比 `eslint:recommended` 更全，且更个性化
- [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript): 针对 ts，内部仍然使用的是 `@typescript-eslint` 提供的规则，是对 `@typescript-eslint/recommended` 规则集的一些更加个性化的配置覆盖

以 vue3 为例，最终形成的规则是下面这一套：

```json
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:vue/vue3-recommended"
  ]
}
```

### Prettier

eslint 有两种类型的规则：

1. Formatting rules: 比如 max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style…
2. Code-quality rules: 比如 no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors…

Prettier 专注于第一点格式，因此 eslint 与 Prettier 的确有重叠的部分，但是官方提供了 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)，用来关闭所有与 Prettier 有冲突的部分。

因此 Prettier 是不改变代码的运行逻辑的，只是改变格式，另外它也很快，所以可以放心使用。

### Compatibility with our own projects

外部提供的规则集合不一定适用于咱们自身的项目，因此会有一些规则存在一些差异，在 `platform_component` 的接入过程中，已经积累了一些跟外部规则的配置冲突的 case，并对其做了覆写，因此大部分情况下该插件的是适用的，如果在项目中遇到了其他不适用的规则，**请反馈给我进行更新**，而不是在项目中自己手动覆盖，这样背离了统一收敛咱们的 eslint 规范的原则，希望通过不断的积累，最终沉淀出更加适合咱们团队的一套规范
