const config = require('../lib/config')
const { red, grey } = require('chalk')
const path = require('path')
const { execSync } = require('child_process')

if (typeof config.token !== 'string') {
  const localConfigPath = path.join(__dirname, '../config/local.js')
  execSync(`echo "module.exports = { token: null }" > ${localConfigPath}`)
  console.log(red('A token should be set in', localConfigPath))
  console.log('Get a new token at https://github.com/settings/tokens')
  console.log('Public repo: no special permission required.')
  console.log('Private repo: require authorization: [repo: Full control of private repositories]')
  console.log(grey('Using a token increases the number of API requests we can make, see https://developer.github.com/v3/#rate-limiting '))
  process.exit(1)
}

module.exports = config.token
