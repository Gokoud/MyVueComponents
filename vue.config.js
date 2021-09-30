module.exports = {
    lintOnSave: false,
    // 简单 webpack 配置
    configureWebpack: {
      resolve: {
        alias: {
          // 别名
          vue$: "vue/dist/vue.esm.js", //加上这一句
        }
      }
    },
}