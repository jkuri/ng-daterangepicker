const path = require('path');
const root = path.resolve(__dirname, '../');
const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
  resolve: { extensions: ['.ts', '.js'] },
  entry: path.join(root, 'ng-daterangepicker.ts'),
  output: {
    path: path.join(root, 'bundles'),
    publicPath: '/',
    filename: 'ng-daterangepicker.umd.js',
    libraryTarget: 'umd',
    library: 'ng-daterangepicker'
  },
  externals: [/^\@angular\//, /^rxjs\//, /^date-fns/],
  module: {
    rules: [
      { test: /\.ts$/, use: [ { loader: 'awesome-typescript-loader', options: { configFileName: 'config/tsconfig.dev.json' } }, { loader: 'angular2-template-loader' } ], exclude: [/\.aot\.ts$/] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: [path.resolve(__dirname, '../src/app')] },
      { test: /\.css$/, use: ['to-string-loader', 'css-loader'], exclude: [path.resolve(__dirname, '../src/styles')] },
      { test: /\.scss$|\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'], include: [path.resolve(__dirname, '../src/styles') ] },
      { test: /\.scss$|\.sass$/, use: ['to-string-loader', 'css-loader', 'sass-loader'], exclude: [path.resolve(__dirname, '../src/styles')] },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, path.join(root, 'src'))
  ]
};
