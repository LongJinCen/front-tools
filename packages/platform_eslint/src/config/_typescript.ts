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
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    // 复写 airbnb-base 插件内的该配置，不允许给函数的 params 重新复制，但可以修改其属性
    "no-param-reassign": ["error", { props: false }],
    // 复写 airbnb-base 插件内的该配置
    "import/prefer-default-export": "off",
    // 复写 airbnb-typescript/base 插件内的该配置
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: false,
      },
    ],
    // 复写 airbnb-base 插件内的该配置
    "no-nested-ternary": "off",
    // 复写 airbnb-base 插件内的该配置
    "no-underscore-dangle": "off",
    // 复写 @typescript-eslint/recommended-requiring-type-checking 中的该规则
    "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
    // 复写 airbnb-base 插件内的该配置
    "no-void": ["error", { allowAsStatement: true }],
  },
};
