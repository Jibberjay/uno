import fs from "fs";
import path from "path";
import { minify as minifyHTML } from "html-minifier-terser";
import { minify as minifyJS } from "terser";
import { minify as minifyCSS } from "csso";

export async function build({ inputDir, devMode }) {
  const indexPath = path.join(inputDir, "index.html");

  let html = fs.readFileSync(indexPath, "utf8");

  // TODO: inline assets here

  if (!devMode) {
    html = await minifyHTML(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: css => minifyCSS(css).css,
      minifyJS: js => minifyJS(js).then(r => r.code)
    });
  }

  const outPath = path.join(inputDir, "index.uno.html");
  fs.writeFileSync(outPath, html);

  console.log(`Uno complete → ${outPath}`);
}