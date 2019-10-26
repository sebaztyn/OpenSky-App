const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const WebpackMd5Hash = require("webpack-md5-hash")
const isProd = process.env.NODE_ENV==="production";

module.exports = {
  entry: {main: "./src/index.js"},
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 4000,
    stats: { children: false, maxModules: 0 },
    hotOnly: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              'css-hot-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: { modules: true }
              },
              "sass-loader"
            ]
          },
          {
            use: ['css-hot-loader', MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "epicmail.css"
    }),
    new HtmlWebpackPlugin(
    { template: 'index.html' }
  ),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
  new WebpackMd5Hash()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};
