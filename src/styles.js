// styles.js
// Inlines any external or imported CSS stylesheets

import * as cheerio from "cheerio";

export function replaceStyles(path, html, options) {

  let result = html;

  const $ = cheerio.load(html);
  const links = $('link[rel="stylesheet"]')
  
  links.each((_, el) => {
    const attributes = $(el).attr();
    ////console.log(attributes);
  });

  return result;

}