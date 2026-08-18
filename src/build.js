import * as cheerio from "cheerio";
import chalk from "chalk";
import * as fs from "node:fs";
import path from "node:path";

export async function build(inputDir, outputDir, options) {

  // Create useful folder and file paths
  const inputPath = path.resolve(inputDir);
  const inputFile = path.join(inputPath, "index.html");
  const outputPath = path.resolve(outputDir);

  // Warn the user if the input folder or file doesn't exist
  if (!fs.existsSync(inputPath) || !fs.existsSync(inputFile)) {
    throw new Error("Could not locate directory '" + inputDir + "'");
  }

  // Read the input file
  let html = fs.readFileSync(inputFile, "utf8");
  let $ = cheerio.load(html);

  // Internalize CSS
  // TODO: recursive search to find linked stylesheets
  let links = $('link[rel="stylesheet"]');
  links.each((_, el) => {
    const href = $(el).attr().href;
    if (!href.includes("https://")) {
      let cssPath = path.resolve(inputPath, href);
      if (!fs.existsSync(cssPath)) throw new Error("Could not locate file at '" + cssPath + "'");
      let css = fs.readFileSync(cssPath);
      $(el).attr("href", "data:text/css," + encodeURIComponent(css));
    }
  });

  // Internalize JS
  // ! Test this, I have no idea if it works
  let scripts = $('script[src]');
  scripts.each((_, el) => {
    const src = $(el).attr().src;
    if (!src.includes("https://")) {
      let jsPath = path.resolve(inputPath, src);
      if (!fs.existsSync(jsPath)) throw new Error("Could not locate file at '" + jsPath + "'");
      let js = fs.readFileSync(jsPath);
      $(el).attr("src", "data:text/js," + encodeURIComponent(js));
    }
  });

  // Serialize changes
  html = $.html();

  // Create a new output directory if it doesn't exist yet, and write the file
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  fs.writeFileSync(path.join(outputPath, "index.html"), html);

}

function log(msg, mod) {
  if (options.debug) console.log(color ? chalk[mod](msg) : msg);
}