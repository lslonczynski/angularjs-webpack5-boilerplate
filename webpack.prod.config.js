const { LoaderOptionsPlugin, NoEmitOnErrorsPlugin } = require("webpack");
const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app/app.js",
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name].[fullhash].js",
    chunkFilename: "[name].[fullhash].js",
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: "file-loader",
      },
      {
        test: /\.html$/,
        loader: "raw-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: __dirname + "/src/public", to: "/dist" },
      ],
    }),
  ],
};
