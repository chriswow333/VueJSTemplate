/*
Use webpack -p to compress output.js
*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  mode:'production',
  entry: {
    main: [
      'babel-polyfill', 
      './public/src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    /* publicPath -> add path to url prefix*/
    //publicPath: '../public/dist/',
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'stylus-loader'
          ]
        },
        {
            test: /\.styl$/,
            loader:'stylus-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',  
            'css-loader'
          ]
        },
      {
          test: /\.(jpe?g|gif|png|svg)$/,
          loader: 'file-loader',
          options:{
            emitFile:false,
            name:"[path][name].[ext]"
          }
        }
    
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      //'vue': 'vue/dist/vue.js'  // developement mode
      'vue': 'vue/dist/vue.common.js', // production mode
      // if use npm install jquery
      //'jquery': 'jquery'
      // webpack use jQuery，If download jquery by self
      //'jquery': path.resolve(__dirname, 'public/assets/plugins/jquery/jquery.min.js'),
      //'bootstrap': path.resolve(__dirname, 'public/assets/plugins/bootstrap/js/bootstrap.min.js'),
      //'parallax': path.resolve(__dirname, './public/assets/plugins/parallax/parallax.min.js')
      //'assets': path.resolve(__dirname,'../public/assets/img/')
    }
  },
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(['public/dist']),
    new HtmlWebpackPlugin({ 
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['main'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin({
      publicPath: 'public/dist/',
      filename: "css/main.[hash:8].css",
    }),
    new VueLoaderPlugin()
  ]
}