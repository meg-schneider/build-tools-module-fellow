const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    src: './client/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/, // ignore files in node_modules
        loader: 'babel-loader',
        options: {
          // for babel-loader 8.x | babel 7.x
          presets: ['@babel/preset-env', '@babel/preset-react']
          // vs. ['env', 'react'] for babel-loader 7.x | babel 6.x
        }
      },
      {
        test: /\.s?css/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    }),
  ],
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build')
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
