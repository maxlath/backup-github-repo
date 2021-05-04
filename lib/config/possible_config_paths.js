const { homedir } = require('os')
const path = require('path')
const configName = `.backup-github-repo`

module.exports = [
  path.join(process.cwd(), configName),
  path.join(homedir(), configName),
]
