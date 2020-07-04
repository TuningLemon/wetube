/* eslint-disable prettier/prettier */
// import { resolve, join } from "path";
const path = require("path"); // 이 파일은 모던 js 파일이 아니라서, import를 쓸 수가 없음.
// __dirname : 현재 프로젝트 디렉토리 이름
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            // main.js 파일에서 최신 자바스크립트 문법> 이전 문법으로 변환
            loader: "babel-loader",
          },
        ],
      },
      {
        // css
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // module을 발견하면 rule을 따르라
      {
        // sass
        // test: /\.(scss)$/i,
        test: /\.s[ac]ss$/i,
        use: ExtractCSS.extract([
          // Creates `style` nodes from JS strings
          // "style-loader",  << 이것을 설치하니, 계속 오류남.
          // Translates CSS into CommonJS
          // { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [
                  autoprefixer({
                    browserlist: ["cover 99.5%", "last 2 versions"],
                  }),
                  // autoprefixer({ overrideBrowserslist: ["last 2 versions"] }),
                ];
                // return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
            // options: { parser: "sugarss", exec: true },
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css_styles.css",
    }),
    new ExtractCSS({
      filename: "styles.css",
    }),
  ],
};
module.exports = config;
