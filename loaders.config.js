module.exports = [
    {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    },
    {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
    }
]