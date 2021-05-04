#!/usr/bin/env node

const { promisify } = require('util')
const read = promisify(require('read'))
const { yellow, green } = require('chalk')
const getConfig = require('../lib/config/get_config.js')
const possibleConfigPaths =  require('../lib/config/possible_config_paths')
const { writeFile } = require('fs').promises
const { name } = require('../package.json')

const prompt = async message => {
  const res = await read({ prompt: message })
  return res.trim()
}

const chooseConfigPlace = async () => {
  const message = `
Where should the config file be stored?
1 - ${possibleConfigPaths[0]} (local, default)
2 - ${possibleConfigPaths[1]} (global)
:
`
  const res = await prompt(message)
  if (res === '2') return possibleConfigPaths[1]
  else return possibleConfigPaths[0]
}

const tokenPattern = /^[0-9a-f]{40}$/
const requestToken = async () => {
  const token = await prompt(`

Enter token:`)
  if (tokenPattern.test(token)) return token
  console.error(yellow(`invalid token: expected the token to match the pattern ${tokenPattern}`))
  return requestToken()
}

const init = async () => {
  const { config, configPath } = getConfig()
  if (config && config.token) {
    console.log(green(`[${name}] config and token found:`), configPath)
    return
  }

  console.log(yellow(`[${name}] config not found or empty`))
  const message = `

We recommand setting a configuration file to store a Github API token.

Using a token increases the number of API requests we can make, see https://developer.github.com/v3/#rate-limiting
Get a new token at https://github.com/settings/tokens
Public repo: no special permission required.
Private repo: require authorization: [repo: Full control of private repositories]

Create a configuration file? [Y/n]
:
`
  const res = await prompt(message)
  if (res === 'n') return

  const chosenConfigPath = await chooseConfigPlace()
  const token = await requestToken()

  await writeFile(chosenConfigPath, JSON.stringify({ token }, null, 2))
  console.log(green(`Config saved in ${chosenConfigPath}`))
}

init()
.catch(err => {
  if (err.message !== 'canceled') console.error(err)
  process.exit(1)
})
