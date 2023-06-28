const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const sharp = require("sharp");
module.exports = {
  mode: "none",
  entry: {
    index: ["@babel/polyfill", "./src/app/scripts/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|bin|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      {
        test: /\.(ttf|woff)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/"),
        use: ["html-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 100,
              },
              webp: {
                lossless: true,
              },
              avif: {
                lossless: true,
              },
              png: {
                quality: 70,
              },
              gif: {},
            },
          },
        },
        generator: [
          {
            type: "asset",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"],
            },
          },
        ],
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.svgoMinify,
          options: {
            encodeOptions: {
              // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
              multipass: true,
              plugins: [
                "preset-default",
              ],
            },
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/app.bundle.css",
    }),
    new HTMLWebpackPlugin({
      hash: true,
      template: "./src/app/index.html",
      filename: "index.html",
      chunks: ["index"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};
