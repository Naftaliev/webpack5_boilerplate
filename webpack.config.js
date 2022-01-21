const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
  mode: mode, 
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
  //loaders
  module: {
    rules: [
      //css
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //images
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
      //js for babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
    },
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      // title: 'Fresh start',
      // filename: 'index.html',
      // template: path.resolve(__dirname, 'src/temp.html'),
    }),
  ],
};
