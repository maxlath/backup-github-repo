const breq = require('bluereq')

// Register OAuth application to increase quotas
// https://developer.github.com/v3/#rate-limiting
// https://github.com/settings/tokens
const { token } = require('../lib/config')

const headers = {
  'User-Agent': 'backup-github-repo',
  Authorization: `token ${token}`
}

module.exports = url => breq.get({ url, headers }).get('body')
