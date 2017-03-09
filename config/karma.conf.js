module.exports = function (config) {
  let testWebpackConfig = require('./webpack.config.test.js')({ env: 'test' });

  let configuration = {
    basePath: '../',
    frameworks: ['jasmine'],
    exclude: [],
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false },
      { pattern: './public/**/*', watched: false, included: false, served: true, nocache: false },
      './src/styles/app.sass'
    ],
    proxies: {
      '/images/': '/base/public/images/',
      '/i18n/': '/base/public/i18n/',
      '/assets/': '/base/src/assets/'
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('./karma-sass-preprocessor'),
      require('karma-spec-reporter')
    ],
    preprocessors: { './config/spec-bundle.js': ['webpack'], './src/styles/app.sass': ['sass'] },
    webpack: testWebpackConfig,
    coverageReporter: {
      type: 'in-memory'
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['Chrome'],
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    singleRun: true,
    concurrency: 1,
    browserNoActivityTimeout: 10000,
  };

  config.set(configuration);
};

