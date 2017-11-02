#!/usr/bin/env node

const program = require('commander');
const Scraper = require('../lib/simpleParser');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('[options] <url>')
  .option('-v, --verbose', 'Print debug logs')
  .parse(process.argv);

if (program.args.length === 0) {
  console.log('Missing url');
  process.exit(1)
}

for(let url of program.args) {
  Scraper.parse(url);
}
