const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: argv.mode,
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "main.js" : "main.js",
      library: "MyLibrary",
      libraryTarget: "umd",
      globalObject: "this",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: ["file-loader"],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: 8080,
    },
  };
};
