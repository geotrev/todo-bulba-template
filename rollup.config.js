import path from "path"
import { terser } from "rollup-plugin-terser"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import server from "rollup-plugin-dev"
import commonjs from "@rollup/plugin-commonjs"
import scss from "rollup-plugin-scss"
import sass from "sass"
import postcss from "postcss"
import autoprefixer from "autoprefixer"
import gzipPlugin from "rollup-plugin-gzip"

const PUBLIC_PATH = path.resolve(__dirname, "public")
const SOURCE_PATH = path.resolve(__dirname, "src/index.js")
const OUTPUT_PATH = path.resolve(__dirname, "public/bundle.js")

const terserPlugin = terser({
  output: {
    comments: function (node, comment) {
      var text = comment.value
      var type = comment.type
      if (type == "comment2") {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(text)
      }
    },
  },
})

const scssOptions = {
  processor: () => postcss([autoprefixer]),
  sass,
  output: false,
}

const plugins =
  process.env.BUILD_ENV === "build"
    ? [terserPlugin, gzipPlugin()]
    : [server({ dirs: [PUBLIC_PATH], port: 3000 })]

export default {
  input: SOURCE_PATH,
  output: {
    file: OUTPUT_PATH,
    format: "iife",
  },
  plugins: [nodeResolve(), commonjs(), scss(scssOptions), ...plugins],
}
