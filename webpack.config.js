const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, { mode }) => {
  const isProduction = mode === 'production'
  return {  
    mode: mode,
    entry: './src/main.js',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'MyLibrary',
      libraryTarget: isProduction ? 'umd' : 'var',
      globalObject: 'this',
      umdNamedDefine: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      ...(isProduction ? [new CleanWebpackPlugin()] : []),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: ['file-loader'],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 8080,
    },
  }
}
