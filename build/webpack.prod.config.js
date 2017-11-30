const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');
let clientConfig,
  serverConfig;

function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
          externals[filename] = `commonjs ${filename}`;

          return externals;
        }, {});
}

clientConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: './client',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'superagent',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'chunk.[name].[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime', 'add-module-exports'],
          cacheDirectory: true,
        },
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }, {
        test: /\.(jpg|png|gif|webp)$/,
        loader: 'url-loader?limit=8000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.html$/,
        loader: 'html-loader?minimize=false',
      }],
  },
  resolve: {extensions: ['.js', '.json', '.scss','.ts', '.tsx']},
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].[chunkhash:8].js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      comments: false,
    }),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new HtmlWebpackPlugin({
      filename: '../../views/prod/index.html',
      template: './views/tpl/index.tpl.html',
      chunksSortMode: 'none',
    }),
    new ExtractTextPlugin('[name].[contenthash:8].css', {allChunks: true}),
  ],
};

serverConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {server: './server/server.prod'},
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
      {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports'],
        cacheDirectory: true,
      },
    }, {
      test: /\.scss$/,
      loaders: [
        'css-loader/locals?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]',
        'sass-loader',
      ],
    }, {
      test: /\.(jpg|png|gif|webp)$/,
      loader: 'url-loader?limit=8000',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  externals: getExternals(),
  resolve: {extensions: ['.js', '.json', '.scss', '.tsx', '.ts']},
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      comments: false,
    }),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
  ],
};

module.exports = [clientConfig, serverConfig];
