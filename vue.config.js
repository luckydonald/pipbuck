module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  /* ... other config ... */
  transpileDependencies: ['vuex-persist'],
};
