export = {
  plugins: [
    'vue'
  ],
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  env: {
    browser: true,
    jest: true,
    es2021: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    hljs: 'readonly',
    flushPromises: 'readonly'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    project: ['./tsconfig.json'],
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': [2, {
      singleline: 20,
      'multiline': {
        max: 1,
        allowFirstLine: false
      }
    }]
  }
}