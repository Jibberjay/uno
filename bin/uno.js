#!/usr/bin/env node

import { build } from "../src/build.js";

const args = process.argv.slice(2);
const inputDir = args[0] || ".";
const devMode = args.includes("--dev");

build({ inputDir, devMode }).catch(err => {
  console.error("Uno build failed:");
  console.error(err);
  process.exit(1);
});