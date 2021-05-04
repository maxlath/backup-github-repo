const { homedir } = require('os')
const path = require('path')
const configName = `.backup-github-repo`
const configPaths = [
  path.join(process.cwd(), configName),
  path.join(homedir(), configName),
]
const { readFileSync } = require('fs')

module.exports = () => {
  for (const configPath of configPaths) {
    try {
      const config = readFileSync(configPath).toString()
      if (config) return { config: JSON.parse(config), configPath }
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
    }
  }
  return {}
}
