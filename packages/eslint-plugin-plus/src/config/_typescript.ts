export = {
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-base",
    "airbnb-typescript/base",
  ],
  env: {
    jest: true,
    es2021: true,
  },
  globals: {
    flushPromises: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    extraFileExtensions: [".vue"],
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // 不允许不安全的可选料。例如 a?.b()
    "no-unsafe-optional-chaining": ["error"],
    // 不能使用 any
    "@typescript-eslint/no-explicit-any": ["error"],
    // 不允许使用 ts-ignore
    "@typescript-eslint/ban-ts-comment": "error",
    // interface、type、enum 命名规则
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        prefix: ["I"],
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
        prefix: ["T"],
      },
      {
        selector: "enum",
        format: ["PascalCase"],
        suffix: ["Enum"],
      },
    ],
    // 复写 airbnb-base 插件内的该配置。不允许给函数的 params 重新赋值，但可以修改其属性
    "no-param-reassign": ["error", { props: false }],
    // 复写 airbnb-base 插件内的该配置。
    "import/prefer-default-export": "off",
    // 复写 airbnb-typescript/base 插件内的该配置。允许使用使用短路逻辑进行有效的函数执行。A && B()、A || B()
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: false,
      },
    ],
    // 复写 airbnb-base 插件内的该配置。可以在三元运算符内嵌套三元运算符
    "no-nested-ternary": "off",
    // 复写 airbnb-base 插件内的该配置。可以使用 _ 进行命名
    "no-underscore-dangle": "off",
    // 复写 @typescript-eslint/recommended-requiring-type-checking 中的该规则。该规则要求必须对 promise 的返回值进行处理，通过 void Promise 可以标识不进行处理
    "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
    // 复写 airbnb-base 插件内的该配置
    "no-void": ["error", { allowAsStatement: true }],
    // 复写 airbnb-base 插件内的该配置。关闭要求函数必须有返回值的规则
    "consistent-return": "off",
    // 复写 airbnb-typescript/base 中该规则。去掉不能使用 for of 的限制
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
};
