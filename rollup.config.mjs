import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import yargs from "yargs";

const { argv } = yargs(process.argv);

const format = argv.format || argv.f || "iife";
const compress = argv.environment === "production";

const fileName = "index";
const outputRoot = "lib";
const hasMinFile = compress ? ".min" : "";

const file = {
  amd: `${outputRoot}/amd/${fileName}.${hasMinFile}.js`,
  umd: `${outputRoot}/umd/${fileName}.${hasMinFile}.js`,
  iife: `${outputRoot}/iife/${fileName}.${hasMinFile}.js`,
  cjs: `${outputRoot}/commonjs/${fileName}.${hasMinFile}.js`,
  es: `${outputRoot}/es/${fileName}.${hasMinFile}.js`,
}[format];

export default {
  input: "./src/index.ts",
  output: {
    name: "disable-devtool",
    file,
    format,
    compact: true,
    sourcemap: true,
    extend: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    compress && terser(),
  ],
};
