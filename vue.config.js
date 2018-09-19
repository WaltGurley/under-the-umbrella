module.exports = {
  chainWebpack: config => {
    // CSV loader
    config.module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
        .loader('csv-loader')
        .options ({
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
        })

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader');
  },

  // Set the github repo name for the root url
  baseUrl: process.env.VUE_APP_GHPAGES || '/',
  
  outputDir: process.env.VUE_APP_GH_DIST || 'dist'
}