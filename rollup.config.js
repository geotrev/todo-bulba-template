import path from "path"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import commonjs from "@rollup/plugin-commonjs"
import scss from "rollup-plugin-scss"
import sass from "sass"
import postcss from "postcss"
import autoprefixer from "autoprefixer"

const APP_PATH = path.resolve(__dirname, "app")
const INDEX_PATH = APP_PATH + "/public"
const SOURCE_PATH = APP_PATH + "/src/index.js"
const OUTPUT_PATH = APP_PATH + "/public/bundle.js"

const scssOptions = {
  processor: () => postcss([autoprefixer]),
  sass,
  output: false,
}

export default {
  input: SOURCE_PATH,
  output: {
    file: OUTPUT_PATH,
    format: "iife",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    livereload({ watch: INDEX_PATH }),
    serve({
      open: true,
      contentBase: INDEX_PATH,
      historyApiFallback: true,
      host: "localhost",
      port: 3000,
    }),
    scss(scssOptions),
  ],
}
