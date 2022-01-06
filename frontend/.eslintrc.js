module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'vue-global-api',
  ],
  globals: {
    MYCONF: true,
    MYCONST: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'max-len': 'off',
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'vue/comment-directive': 'off',
  },

};
