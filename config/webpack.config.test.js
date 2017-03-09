const path = require('path');
const root = path.resolve(__dirname, '..');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function (options) {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'node_modules']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            path.join(root, 'node_modules/rxjs'),
            path.join(root, 'node_modules/@angular')
          ]
        },
        { test: /\.ts$/, use: [ { loader: 'awesome-typescript-loader', options: { configFileName: 'config/tsconfig.dev.json' } }, { loader: 'angular2-template-loader' } ], exclude: [/\.aot\.ts$/] },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [path.join(root, 'src/index.html')]
        },
        {
          test: /\.css$/,
          loader: ['to-string-loader', 'css-loader'],
          exclude: [path.join(root, 'src/index.html')]
        },
        {
            test: /\.scss$|\.sass$/,
            loader: ['raw-loader', 'sass-loader'],
            exclude: [path.join(root, 'src/index.html')]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [path.join(root, 'src/index.html')]
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': false,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false,
        }
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.join(root, 'src'),
        {
          // your Angular Async Route paths relative to this root directory
        }
      ),
      new LoaderOptionsPlugin({
        debug: false,
        options: {
          // legacy options go here
        }
      }),
    ],
    performance: {
      hints: false
    },
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
}
