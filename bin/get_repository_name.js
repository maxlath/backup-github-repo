#!/usr/bin/env node
const [ url ] = process.argv.slice(2)
console.log(require('../lib/repo_name')({ url }))
