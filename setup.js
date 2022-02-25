#!/usr/bin/env node

console.log("this is a setup.js")

const fs = require('fs');
const fse = require("fs-extra");

const srcDir = `./components`;
var destDir = `./components`;
if (process.argv[2]){
    destDir = process.argv[2];
}

// To copy a folder or file
fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});
