module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }], // https://stackoverflow.com/a/47996411
    'no-multi-spaces': ["error", { ignoreEOLComments: true }],
    'no-unused-vars':  ["error", { varsIgnorePattern: "^(ignored)$", argsIgnorePattern: "^(ignored|event)$" }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
