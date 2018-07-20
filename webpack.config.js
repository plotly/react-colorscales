const webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './docs/index.js'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: [
              'react-hot-loader/babel',
            ],
          },
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.(css|scss)?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    contentBase: './docs',
  },
  devtool: 'eval-source-map',
};
