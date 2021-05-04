const { homedir } = require('os')
const path = require('path')
const configName = `.backup-github-repo`
const configPaths = [
  path.join(process.cwd(), configName),
  path.join(homedir(), configName),
]
const { readFileSync } = require('fs')

let resolvedConfig

module.exports = () => {
  if (resolvedConfig) return resolvedConfig

  for (const configPath of configPaths) {
    try {
      const config = readFileSync(configPath).toString()
      if (config) {
        resolvedConfig = { config: JSON.parse(config), configPath }
        return resolvedConfig
      }
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
    }
  }
  return { config: {} }
}
