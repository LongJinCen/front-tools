export = {
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  env: {
    jest: true,
    es2021: true
  },
  globals: {
    flushPromises: 'readonly'
  },
  parser:  '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 12,
    sourceType: 'module'
  },
  ignorePatterns: ['*.js', '*.md'],
  rules: {
    'no-unsafe-optional-chaining': ['error'],
    // 不能使用 any
    '@typescript-eslint/no-explicit-any': ['error'],
    // 不允许使用 ts-ignore
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I']
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        prefix: ['T']
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        suffix: ['Enum']
      }
    ],
    'vue/max-attributes-per-line': [2, {
      singleline: 20,
      'multiline': {
        max: 1,
        allowFirstLine: false
      }
    }]
  }
}