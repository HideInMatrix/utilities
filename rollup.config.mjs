import { defineConfig } from "rollup"; // 从 rollup 导入 defineConfig 函数，用于定义配置
import ts from "rollup-plugin-typescript2"; // 导入 TypeScript 插件，用于编译 TypeScript 文件
import commonjs from "@rollup/plugin-commonjs"; // 导入 CommonJS 插件，将 CommonJS 模块转换为 ES6
import babelPlugin from "@rollup/plugin-babel"; // 导入 Babel 插件，用于转译代码
import resolve from "@rollup/plugin-node-resolve"; // 导入 Node.js 解析插件，用于解析模块
import globals from "rollup-plugin-node-globals"; // 导入插件以处理 Node.js 全局变量
import builtins from "rollup-plugin-node-builtins"; // 导入插件以处理 Node.js 内置模块
import terser from "@rollup/plugin-terser"; // 导入 Terser 插件，用于压缩 JavaScript 代码
import json from "@rollup/plugin-json"; // 导入 JSON 插件，用于导入 JSON 文件
import dts from "rollup-plugin-dts"; // 导入 DTS 插件，用于生成 TypeScript 声明文件
import { importExportPlugin } from "rollup-plugin-import-export"; // 导入自定义插件，用于处理导入和导出

// 定义 Rollup 配置
const config = defineConfig([
  {
    input: ["src/index.ts"], // 输入文件为 src/index.ts
    output: [
      {
        dir: "dist/esm", // 输出目录为 dist/esm
        format: "esm", // 输出格式为 ES Module
        preserveModules: true, // 保持模块结构
      },
      {
        dir: "dist/cjs", // 输出目录为 dist/cjs
        format: "cjs", // 输出格式为 CommonJS
        preserveModules: true, // 保持模块结构
      },
    ],
    plugins: [
      importExportPlugin(), // 使用自定义导入导出插件
      ts(), // 添加 TypeScript 插件
      babelPlugin({ exclude: "**/node_modules/**" }), // 添加 Babel 插件，排除 node_modules
      json(), // 添加 JSON 插件
      commonjs(), // 添加 CommonJS 插件
    ],
  },
  {
    input: "src/index.ts", // 再次使用 src/index.ts 作为输入
    output: [
      {
        file: "dist/umd/index.js", // 输出文件为 dist/umd/index.js
        format: "umd", // 输出格式为 UMD
        name: "utils", // UMD 格式时的全局变量名
      },
    ],
    plugins: [
      importExportPlugin(), // 使用自定义导入导出插件
      ts(), // 添加 TypeScript 插件
      babelPlugin({ exclude: "**/node_modules/**" }), // 添加 Babel 插件，排除 node_modules
      json(), // 添加 JSON 插件
      commonjs(), // 添加 CommonJS 插件
      resolve({ preferBuiltins: true, mainFields: ["browser"] }), // 添加解析插件，优先使用内置模块
      globals(), // 添加全局变量插件
      builtins(), // 添加内置模块插件
      terser(), // 添加压缩插件
    ],
  },
  {
    input: "src/index.ts", // 输入文件为 src/index.ts
    output: {
      dir: "dist/types", // 输出目录为 dist/types
      format: "esm", // 输出格式为 ES Module
      preserveModules: true, // 保持模块结构
    },
    plugins: [importExportPlugin(), dts()], // 使用自定义插件和 DTS 插件生成声明文件
  },
]);

export default config; // 导出配置
