import { build } from "esbuild";
import { readFileSync } from "node:fs";

const id = "dsh-liang-rheostat-skin";
const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

await build({
  entryPoints: ["src/client/index.jsx"],
  outfile: "lib/client.js",
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: "es2022",
  jsx: "automatic",
  sourcemap: false,
  external: ["react", "react/jsx-runtime"],
  define: {
    "process.env.NODE_ENV": '"production"',
    "__LIANG_RHEOSTAT_VERSION__": JSON.stringify(manifest.version),
  },
  banner: {
    js: `window.__ModuleLoader__.load({id:${JSON.stringify(id)},factory:(require)=>{var module={exports:{}};var exports=module.exports;`,
  },
  footer: {
    js: "exports.name=name;exports.inject=inject;exports.apply=apply;return module.exports;}});",
  },
});

console.log("built lib/client.js as", id);
