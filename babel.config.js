module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env', {
      forceAllTransforms: true,
      useBuiltIns: 'usage',
    }],
  ],
};
