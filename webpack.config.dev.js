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
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  mode:'development',
  entry: {
    main: [
      'babel-polyfill', 
      './public/src/main.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    /* publicPath -> add path to url prefix*/
    //publicPath: '../public/dist/',
    filename: '[name].js',
    publicPath: 'http://localhost:3001/dist/'
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
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          use: 
          [
            {loader: "css-loader"}, 
            {loader:'resolve-url-loader'},
            {
              loader: "sass-loader",
              options:{
                sourceMap:true,
              }
            }
          ],
        })               
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
      'vue': 'vue/dist/vue.js',  // developement mode
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Tether: 'tether'
    }),
    new ExtractTextPlugin({
      publicPath: './public/dist/',
      filename: 'main.css' 
      }), 
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin()
  ]
}