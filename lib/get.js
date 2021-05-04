const fetch = require('node-fetch')
const { wait } = require('./promises')
const oneMinute = 60 * 1000

// Register OAuth application to increase quotas
// https://developer.github.com/v3/#rate-limiting
// https://github.com/settings/tokens
const token = require('../lib/token')

const headers = {
  'User-Agent': 'backup-github-repo',
  Authorization: `token ${token}`
}

const get = module.exports = async (url, delay) => {
  try {
    if (delay) await wait(delay)
    return await fetch(url, { headers }).then(res => res.json())
  } catch (err) {
    delay = delay || 5000
    delay = Math.min(delay * 2, 20 * oneMinute)
    console.error(`[get request error: will retry in ${delay / 1000}s]`, err.message)
    return get(url, delay)
  }
}
