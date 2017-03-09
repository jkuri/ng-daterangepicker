const sass = require('node-sass');
const path = require('path');
const chalk = require('chalk');

function formattedSASSMessage(error, file) {
  const filePath = !error || !error.file || error.file === 'stdin' ? file.path : error.file;
  const relativePath = path.relative(process.cwd(), filePath);

  return `${chalk.underline(relativePath)}\n`
    + chalk.gray(` ${error.line}:${error.column} `)
    + error.message
      .replace(/: "([^"]*)"\.$/, ': $1')
      .replace(/: (.*)/, `: ${chalk.yellow('$1')}`);
}

function createSASSPreprocessor(args, config = {}, logger, helper) {
  const log = logger.create('preprocessor.sass');

  const options = helper.merge({
    sourceMap: false,
    transformPath(filepath) {
      return filepath.replace(/\.sass$/, '.css');
    },
  }, args.options || {}, config.options || {});

  return function processFile(content, file, done) {
    let result = null;

    log.debug('Processing "%s".', file.originalPath);

    file.path = file.originalPath.replace(/\.sass$/, '.css');

    opts = {};

    opts.includePaths = [path.dirname(file.originalPath)].concat(opts.includePaths || []);

    if (opts.sourceMap) {
      opts.sourceMap = file.path;
      opts.omitSourceMapUrl = true;
    }

    try {
      opts.file = file.originalPath;
      result = sass.renderSync(opts);
    } catch (error) {
      const message = formattedSassMessage(error, file);
      log.error('%s\n  at %s:%d', message, file.originalPath, error.line);
      error.message = chalk.stripColor(message);
      return done(error, null);
    }

    done(null, result.css || result);
    return undefined;
  };
}

createSASSPreprocessor.$inject = ['args', 'config.sassPreprocessor', 'logger', 'helper'];

module.exports = {
  'preprocessor:sass': ['factory', createSASSPreprocessor]
};
