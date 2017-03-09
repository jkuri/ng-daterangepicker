const path = require('path');

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
      require('karma-spec-reporter'),
      require('karma-coverage-istanbul-reporter')
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
    reporters: ['spec', 'coverage-istanbul'],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.resolve(__dirname, '../coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['ChromeDesktop', 'ChromeTablet', 'ChromeMobile'],
    customLaunchers: {
      ChromeMobile: {
        base: 'Chrome',
        flags: ['--window-size=400,600', '--no-sandbox']
      },
      ChromeTablet: {
        base: 'Chrome',
        flags: ['--window-size=850,768', '--no-sandbox']
      },
      ChromeDesktop: {
        base: 'Chrome',
        flags: ['--window-size=1050,800', '--no-sandbox']
      }
    },
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    singleRun: true,
    concurrency: 1,
    browserNoActivityTimeout: 10000,
  };

  config.set(configuration);
};

