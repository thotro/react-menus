module.exports = {
  watchPoll: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  entry: [
    './index.js'
  ],
  output: {
    publicPath: '/assets/'
  },
  module: {
    loaders: require('./loaders.config')
  },
  externals: {
    faker: 'faker'
  },
  devServer: {
    publicPath: '/assets/',
    port: 9191,
    host: '0.0.0.0',
    historyApiFallback: true
  }
}
