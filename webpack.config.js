const glob = require('glob')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  watch: true,
  entry: glob
    .sync('./ui/bootstrap/**/*.js')
    .reduce(
      (entries, entry) => Object.assign(entries, { [entry.replace('./ui/bootstrap/', '').replace('.js', '')]: entry }),
      {}
    ),
  output: {
    path: path.join(__dirname, '/ui/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'commons.js',
      name: 'commons'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'babel-loader'
      }
    ]
  }
}
