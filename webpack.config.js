const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const configMethod = (minify) => {
  let outputFileBase = 'css/obi-bootstrap';
  let cssLoaderOptions = {};
  if (minify) {
    outputFileBase += '.min';
    cssLoaderOptions = { minimize: true };
  }

  const outputFile = `${outputFileBase}.css`;

  return {
    entry: './scss/obi-bootstrap.scss',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'dummy.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: cssLoaderOptions },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: cssLoaderOptions },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
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
      new MiniCssExtractPlugin({
        filename: outputFile,
      }),
      new CopyWebpackPlugin([
        { from: './scss', to: 'scss' },
        { from: './node_modules/bootstrap/dist/js/bootstrap.js', to: 'js' },
        { from: './package.json', to: 'package.json' },
      ]),
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  };
};

module.exports = [configMethod(), configMethod(true)];
