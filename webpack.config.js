const webpack = require("webpack");
const path = require("path");

const config = {
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "app/"),
  output: {
    path: path.resolve(__dirname, "public/js/"),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: [
        path.resolve(__dirname, "node_modules"),
        // path.resolve(__dirname, "app/constants"),
      ],
      loader: "babel-loader",
      query: {
        presets: ["env", "react", "es2015", "stage-0"]
      }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    compress: true,
  },
  node: {
    fs: 'empty'
  }
};

if (process.env.NODE_ENV === "production") {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") }
    })
  ];
}

module.exports = config;