process.traceDeprecation = true;
const path = require('path');
// подключаем path к конфигу вебпак

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Подключили к проекту плагин
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
// создаем переменную для development-сборки

module.exports = {
  entry: { main: './src/index.js', articles: './src/articles/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[chunkhash].js',
  },
  /*  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },*/
  /*  devServer: {
    disableHostCheck: true,
  },*/

  /*  devtool: isDev ? 'source-map' : '',*/
  module: {
    rules: [
      { // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use:
          {
            loader: 'babel-loader',
          },
        // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/, // исключает папку node_modules
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[path][name].[ext]',
              esModule: false,
            },
          },
          // 'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          (isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }),
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        },
      /*               loader: 'file-loader?name=./vendor/[name].[ext]'*/
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }), // подключите плагин после MiniCssExtractPlugin
    new HtmlWebpackPlugin({ // настроили плагин
      inject: false, // стили НЕ нужно прописывать внутри тегов
      // hash: true, // для страницы нужно считать хеш
      minify: {
        collapseWhitespace: isProd,
      },
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: './index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new HtmlWebpackPlugin({ // настроили плагин
      inject: false, // стили НЕ нужно прописывать внутри тегов
      // hash: true, // для страницы нужно считать хеш
      minify: {
        collapseWhitespace: isProd,
      },
      template: './src/articles/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: './articles/index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
  ],
};
