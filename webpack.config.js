module.exports = {
  entry: './public/js/client.js',

  output: {
    filename: './public/build/bundle.js',
    publicPath: '',
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
    ],
  },
};
