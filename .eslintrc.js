module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ['assets/css', 'old'],
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  globals: {
    Stats: 'writable',
    PIXI: 'writable',
    Spine: 'writable',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'linebreak-style': 0,
    'arrow-body-style': 2,
    'no-confusing-arrow': 2,
    'max-len': [
      'error',
      {
        code: 140,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-console': 'off',
    'unicorn/number-literal-case': 'off',
    'no-param-reassign': ['error', { props: false }],
    'vue/no-v-html': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    camelcase: 0,
  },
}
