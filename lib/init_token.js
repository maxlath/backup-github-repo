const { yellow, grey } = require('chalk')
const path = require('path')
const { execSync } = require('child_process')

module.exports = () => {
  const localConfigPath = path.join(__dirname, '../config/local.js')
  execSync(`echo "module.exports = { token: null }" > ${localConfigPath}`)
  console.log(yellow('a token should be set in', localConfigPath))
  console.log('Get a new token at https://github.com/settings/tokens')
  console.log('No special permission required')
  console.log(grey('using a token increases the number of API requests we can make, see https://developer.github.com/v3/#rate-limiting '))
}
