/* eslint-disable prettier/prettier */
// import { resolve, join } from "path";
const path = require("path"); // 이 파일은 모던 js 파일이 아니라서, import를 쓸 수가 없음.
// __dirname : 현재 프로젝트 디렉토리 이름
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      // module을 발견하면 rule을 따르라
      {
        // css
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // sass
        test: /\.s[ac]ss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
            // options: { parser: "sugarss", exec: true },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        // postcss
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
            // options: { parser: "sugarss", exec: true },
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
};
module.exports = config;
