const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // 环境
  mode: 'development',

  // 打包的入口
  entry: './src/app.js',

  // 打包的出口配置
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './dev')
  },

  // 配置webserver
  devServer: {
    contentBase: path.join(__dirname, './dev'),
    compress: true,
    host: '10.9.65.154',
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },

  // 配置loader
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
            }
          },
        ],
      },
      {
        test: /\.(scss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'string-loader'
        }
      },
      {
        test: /\.hbs$/i,
        use: {
          loader: 'handlebars-loader'
        }
      }
    ],
  },

  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 目标文件名
      template: './index.html' // 源文件路径
    }),
    new CopyPlugin([
      { from: './src/public', to: './public' }
    ])
  ]
}