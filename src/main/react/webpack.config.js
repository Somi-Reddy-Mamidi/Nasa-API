const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // Where files should be sent once they are bundled
 // entry: './src/index.js',
 entry: './src/index.js',
 mode: 'development',
 output: {
  path: __dirname,
  filename: '../resources/static/built/bundle.js'
},
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
    static: path.resolve(__dirname, 'src'),
    port: 3000,
    open: true,
    hot: true,
    proxy: [{
      context: ['/apod'],
      target: 'http://localhost:9090',
    }],
   
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: [MiniCssExtractPlugin.loader, 'css-loader']
     }
   ]
 },
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }),new MiniCssExtractPlugin()],
}