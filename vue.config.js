const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        title: 'Teste Picplace',
        meta: {
          description: 'My beautiful website'
        }
      })
    ]
  }
}
