/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': [ 'error', 'unix'],
    quotes: [ 'error', 'single'],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-newline': ['error', { multiline: true, minItems: 2 }],
    'array-element-newline': ['error', { multiline: true, minItems: 2 }],
    'no-unused-vars':
      process.env.NODE_ENV === 'production'
        ? ['error', { vars: 'local', args: 'none', argsIgnorePattern: '^_' }]
        : ['warn', { args: 'none', argsIgnorePattern: '^_' }],
  }
}
