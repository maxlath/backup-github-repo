const fetch = require('node-fetch')

// Register OAuth application to increase quotas
// https://developer.github.com/v3/#rate-limiting
// https://github.com/settings/tokens
const token = require('../lib/token')

const headers = {
  'User-Agent': 'backup-github-repo',
  Authorization: `token ${token}`
}

module.exports = url => fetch(url, { headers }).then(res => res.json())
