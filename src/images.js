// images.js
// Converts images to Base64 data URIs

import * as cheerio from "cheerio";
import * as fs from "node:fs";
import path from "node:path";

export function replaceImages(inputPath, html, options) {

  const $ = cheerio.load(html);
  const images = $("img[src]");

  images.each((_, el) => {
    ////console.log($(el).attr().src);
  });

  return $.html();

}