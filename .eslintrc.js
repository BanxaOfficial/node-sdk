module.exports = {
  globals: {
    _: true,
    axios: true,
    axiosWithLoader: true,
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    "plugin:prettier/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    indent: ['error', 4],
  },
};
