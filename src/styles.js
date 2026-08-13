// styles.js
// Inlines any external or imported CSS stylesheets

import * as cheerio from "cheerio";
import * as fs from "node:fs";
import path from "node:path";

export function replaceStyles(inputPath, html, options) {

  const $ = cheerio.load(html);
  const links = $('link[rel="stylesheet"]')
  
  links.each((_, el) => {

    const attributes = $(el).attr();
    if (!attributes.href.includes("https://")) {
      const css = fs.readFileSync(path.resolve(inputPath, attributes.href));
      const style = $("<style>").text("\n" + css + "\n");
      if (attributes.type && (attributes.type.trim().toLowerCase() != "text/css")) {
        throw new Error("Invalid stylesheet type '" + attributes.type + "'");
      }
      if (attributes.media) {
        style.attr("media", attributes.media)
      }
      $(el).replaceWith(style);
    }

  });

  return $.html();

}