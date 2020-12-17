const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'app.js'),
    multi: path.resolve(__dirname, 'src', 'multi.js')

  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8081,
    open: true,
    stats: 'errors-only'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: [
      '.js'
    ]
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/g
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        include: [/img/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    new HtmlWebpackPlugin({
      title: 'home',
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['app'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'multi',
      template: path.resolve(__dirname, 'src', 'multi.html'),
      chunks: ['multi'],
      filename: 'multi'
    })
  ],
  devtool: 'source-map'
}
