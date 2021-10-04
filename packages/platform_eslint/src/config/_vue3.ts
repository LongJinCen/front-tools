export = {
  plugins: ["vue"],
  extends: ["plugin:vue/vue3-recommended"],
  env: {
    browser: true,
    jest: true,
    es2021: true,
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    hljs: "readonly",
    flushPromises: "readonly",
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    //
    extraFileExtensions: [".vue"],
    // 传递 project 传递 @typescript-eslint 提供的额外的依赖类型的检查。缺点是会导致 eslint 整体检查过程会比较慢
    project: ["./tsconfig.json"],
    ecmaVersion: 12,
    sourceType: "module",
  },
  // 复写 airbnb-typescript/base 插件内的该配置，缺少对 .vue 文件的配置
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "import/no-unresolved": "off",
      },
    },
  ],
  rules: {
    // Vue.component.name 遵循 kebab-case 命名规则
    "vue/component-definition-name-casing": ["error", "kebab-case"],
    // 复写 airbnb-base 插件内的该配置。该规则强制使用解构，但 vue3 解构会失去响应式，所以禁用
    "prefer-destructuring": ["off"],
  },
};
