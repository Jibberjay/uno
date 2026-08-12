#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";

program
  .name("uno")
  .description("Turn websites into executables")
  .version("1.0.0", "-v", "--version", "output the version number")

  .argument("<input-dir>")
  .argument("[output-dir]")

  .option("-d, --dev", "bypass code minification")

  .action(async (inputDir, outputDir, options) => {
    outputDir = outputDir || "/output";
    console.log(chalk.green("Reading from " + inputDir + ", writing to " + outputDir));
  });

program.parse(process.argv);