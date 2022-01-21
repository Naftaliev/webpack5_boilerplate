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
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][ext]",
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src/'),
      Img: path.resolve(__dirname, 'src/img'),
    },
  },
  //loaders
  module: {
    rules: [
      //html
      {
        test: /\.html$/i,
        loader: "html-loader",
        },
      //css
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //sass/scss
      {
        test: /\.(sa|sc)ss$/,
        loader: "sass-loader",
      },
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
        // loader: 'pug-html-loader',
        // options: {
        //   exports: false
        // },
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.pug",
    }),
  ],
};
