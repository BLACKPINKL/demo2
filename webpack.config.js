const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
let config = {
  entry: {
    index: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: WEBPACK_ENV === 'dev' ? '/dist/' :
                '/QQTimi/',
    filename: WEBPACK_ENV === 'dev' ? 'js/[name].js' :
              'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(html)$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
            {
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  name: 'resource/[name].[hash:7].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                  bypassOnDebug: true
              }
            }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: 'resource/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
   runtimeChunk: false,
   splitChunks: {
     cacheGroups: {
       common: {
         name: "common",
         chunks: "all",
         minChunks: 2
       }
     }
   }
 },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true
        }
    }),
    new MiniCssExtractPlugin({
          filename: WEBPACK_ENV === 'dev' ? 'css/[name].css' :
                    'css/[name].[contenthash:8].css',
          chunkFilename: WEBPACK_ENV === 'dev' ? '[id].css' :
                          '[id].[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
          cssProcessorOptions: {
           safe: true, discardComments: { removeAll: true }
          },
          canPrint: true
    })

  ],
  devServer: {
    port: 3000,
    inline:true,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist/')
  }
}
module.exports = config
