const path = require("path");
const glob = require("glob");
const Webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// PWA with workbox
// Uncomment if needed!

// const WorkboxPlugin = require("workbox-webpack-plugin");

// For dev server
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
  "react", "react-dom"
];

module.exports = (env, options) => {
  const devMode = options.mode !== "production";

  return {
    devtool: devMode ? "source-map" : undefined,
    optimization: {
      // This reduce bundle size!
      // https://github.com/webpack/webpack/issues/6357
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /react|react-dom/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          }
        }
      },
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        new OptimizeCSSAssetsPlugin({}),
      ]
    },
    mode: devMode,
    entry: {
      bundle: "./src/index.js",
      vendor: VENDOR_LIBS.concat(glob.sync("./vendor/**/*.js")),
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        // Load javascript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        // Load stylesheet
        {
          test: /\.[s]?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        // Load images
        {
          test: /\.(png|svg|jpe?g|gif)(\?.*$|$)/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                // Relative to output public_path
                outputPath: "./images/"
              }
            }
          ]
        },
        // Load fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                // Relative to output public_path
                outputPath: "./fonts/"
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        inject: "body",
      }),
      new MiniCssExtractPlugin({ filename: "./css/app.css" }),
      new Webpack.HotModuleReplacementPlugin(),
      new ManifestPlugin(),
      // Obsolete 5.1.1 syntax
      // new CopyWebpackPlugin([{ from: "static/", to: "./" }]),
      // New 6.0.1 syntax
      // https://webpack.js.org/plugins/copy-webpack-plugin/
      new CopyWebpackPlugin({
        patterns: [{ from: "./static", to: "./" }]
      }),
      // new WorkboxPlugin.GenerateSW({
      //   // swDest: 'service-worker.js',
      //   clientsClaim: true,
      //   skipWaiting: true,
      // }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      historyApiFallback: true,
      compress: true,
      open: true,
      hot: true,
      overlay: true,
      // port: 8080,
    }
  }
};
