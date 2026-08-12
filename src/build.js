// build.js

import * as fs from "node:fs";
import path from 'node:path';

export async function build(inputDir, outputDir, options) {

  // Create useful folder and file paths
  const inputPath = path.resolve(inputDir);
  const inputFile = path.join(inputPath, "index.html");
  const outputPath = path.resolve(outputDir);

  // Warn the user if the input folder or file doesn't exist
  if (!fs.existsSync(inputPath) || !fs.existsSync(inputFile)) {
    let suggestion = "";
    if ((inputDir.substring(0, 1) == "/") && fs.existsSync(path.resolve("." + inputDir))) {
      suggestion = ", did you mean '." + inputDir + "'?"
    }
    throw new Error("Could not locate directory '" + inputDir + "'" + suggestion);
  }

  // TODO: do useful
  let index = fs.readFileSync(inputFile, "utf8");

  // Create a new output directory if it doesn't exist yet, and write the file
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  fs.writeFileSync(path.join(outputPath, "index.html"), index);

}