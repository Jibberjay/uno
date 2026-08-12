#!/usr/bin/env node

import { build } from "../src/build.js";

import { program } from "commander";
import chalk from "chalk";

program
  .name("uno")
  .description("Turn websites into executables")
  .version("1.0.0", "-v, --version", "output the version number")

  .argument("<input-dir>")
  .argument("[output-dir]")

  .option("-d, --dev", "bypass code minification")
  .option("-b, --debug", "log every uno operation")

  .action(async (inputDir, outputDir, options) => {
    outputDir = outputDir || "output";
    build(inputDir, outputDir, options).then(() => {
      console.log(chalk.green("Reading from " + inputDir + ", writing to " + outputDir));
    }).catch(err => {
      console.error(chalk.red.bold("Uno build failed:"));
      console.error(chalk.red(err || "An unknown error occurred"));
      process.exit(1);
    });
  });

program.parse(process.argv);