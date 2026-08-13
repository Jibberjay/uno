// build.js
// The core of Uno- takes the input directory and converts it to a single file

import { replaceStyles } from "./styles.js";
import { replaceImages } from "./images.js";

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

  // Read and inline the input file
  let html = fs.readFileSync(inputFile, "utf8");
  html = replaceStyles(inputPath, html, options);
  html = replaceImages(inputPath, html, options);

  // Create a new output directory if it doesn't exist yet, and write the file
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  fs.writeFileSync(path.join(outputPath, "index.html"), html);

}