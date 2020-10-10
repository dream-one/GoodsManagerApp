module.exports = {
  runtimeCompiler: true,
  publicPath: '/Content/app',
  devServer: {
    disableHostCheck: true
  }, css: {
    extract: false,
    sourceMap: true //是否把样式的所在位置显示出来，影响性能
  },

}