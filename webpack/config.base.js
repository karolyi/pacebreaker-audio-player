const path = require('path')

module.exports = {
  context: __dirname,

  entry: {
    default: [
      // entry point of our app. assets/js/index.js should require other
      // js modules and dependencies it needs
      '../src/index',
      '../src/base.scss',
    ],
  },

  output: {
    path: path.resolve(path.join(__dirname, '..', 'dist', 'assets')),
    publicPath: '/assets/',
    filename: '[name]-[hash].js',
  },

  // configure your plugins at the separate mode level files

  module: {
    loaders: [
      {
        // Transpile ES6 to ES5
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      to transform JSX into JS
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, '../node_modules'),
    ],
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'bower_components',
    ],
    extensions: ['', '.js', '.jsx'],
  },
}
