#!/usr/bin/env node
const { writeFile } = require('fs').promises
const path = require('path')

const { green, blue, grey } = require('chalk')
const folderPath = path.join(process.cwd(), `./repo-backup`)
const dataPath = path.join(process.cwd(), `./repo-backup/data.json`)
console.log(grey(`data path: ${dataPath}`))

const getRepoData = require('../lib/get_repo_data')
const format = require('../lib/format')

const save = data =>  writeFile(dataPath, JSON.stringify(data, null, 2))

const getLocalDataOrFetch = async () => {
  try {
    data = require(dataPath)
    entriesCount = Object.keys(data).length
    console.log(green(`${entriesCount} issues and pull requests found at ${dataPath}`))
    console.log(blue(`delete ${folderPath} and re-run this command to update`))
    return data
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') throw err
    return getRepoData()
    .then(format)
    .then(save)
  }
}

getLocalDataOrFetch()
.then(() => console.log(green(`Done downloading JSON`)))
.catch(err => {
  console.error(`[download_json] failed to getLocalDataOrFetch`, err)
  process.exit(1)
})
