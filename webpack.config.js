const path = require("path");
// const ExtractTextPlugin = require("extract-text-webpack-plugin"); //depricated
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

require("dotenv").config({ path: ".env.development" });

module.exports = (env) => {
  const isProduction = env === "production";
  const CSSExtract = new MiniCssExtractPlugin({
    filename: "styles.css",
  });

  return {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
            // "css-loader",
            // "sass-loader",
            // "style-loader"
          ],
        },
      ],
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        ),
        "process.env.FIREBASE_APP_ID": JSON.stringify(
          process.env.FIREBASE_APP_ID
        ),
      }),
    ],
    // devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    // to see the original source on dev tools
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/",
    },
  };
};
