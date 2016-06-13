module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader!autoprefixer-loader'
  },
  {
    test: /\.png$/,
    loader: 'url?mimetype=image/png'
  }
]
