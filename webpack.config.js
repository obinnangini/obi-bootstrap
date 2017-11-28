const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const configMethod = (minify) => {
  let outputFileBase = 'css/obi-bootstrap';
  let cssLoaderOptions = {};
  if (minify) {
    outputFileBase += '.min';
    cssLoaderOptions = { minimize: true };
  }

  const outputFile = `${outputFileBase}.css`;
  const configObj = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: { loader: 'css-loader', options: cssLoaderOptions },
          }),
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: cssLoaderOptions },
              { loader: 'resolve-url-loader' },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin(outputFile),
    ],
  };
  return configObj;
};

const commonConfig = {
  entry: './scss/obi-bootstrap.scss',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dummy.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new StyleLintPlugin(),
    new CopyWebpackPlugin([
      { from: './scss', to: 'scss' },
      { from: './node_modules/bootstrap/dist/js/bootstrap.js', to: 'js' },
      { from: './package.json', to: 'package.json' },
    ]),
  ],
};

module.exports = [merge(commonConfig, configMethod()), merge(commonConfig, configMethod(true))];