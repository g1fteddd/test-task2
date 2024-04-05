const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    port: 7070,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        TOKEN: JSON.stringify(process.env.TOKEN),
      },
    }),
  ],
}
