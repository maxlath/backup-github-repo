const path = require('path')
const breq = require('bluereq')
const repo = require('./get_repo')()
const { green, grey } = require('chalk')
console.log(grey(`repo: ${repo}`))

// Register OAuth application to increase quotas
// https://developer.github.com/v3/#rate-limiting
// https://github.com/settings/tokens
const { token } = require('../lib/config')

const headers = {
  'User-Agent': 'backup-issues',
  Authorization: `token ${token}`
}

const get = url => breq.get({ url, headers }).get('body')

var nextPage = 1
const issues = []
const urlBase = `https://api.github.com/repos/${repo}/issues?per_page=100&state=all`
var firstPage = true
var firstIssue = true
const log = process.stdout.write.bind(process.stdout)

const getPagesSequentially = () => {
  return get(`${urlBase}&page=${nextPage}`)
  .then(issuesBatch => {
    if (issuesBatch.length === 0) return
    issues.push(...issuesBatch)
    const lineStart = firstPage ? '' : '\r'
    log(`${lineStart}issues: ${issues.length}    `)
    firstPage = false
    nextPage += 1
    return Promise.resolve()
    .delay(100)
    .then(getPagesSequentially)
  })
}

const addData = issue => {
  var { labels_url, comments_url, events_url } = issue
  labels_url = labels_url.replace(/{.*/, '')
  return Promise.all([ get(labels_url), get(comments_url), get(events_url) ])
  .spread((labels, comments, events) => {
    return Object.assign(issue, { labels, comments, events })
  })
}

var nextIssueIndex = 0
const logBase = 'adding comments, events, and labels'
const addIssueDataSequentially = () => {
  const nextIssue = issues[nextIssueIndex]
  if (!nextIssue) {
    log('\ndone                                                    \n')
    return
  }
  nextIssueIndex += 1
  const lineStart = firstIssue ? '\n' : '\r'
  const count = `${nextIssueIndex}/${issues.length}`
  log(`${lineStart}${logBase}: ${count}   `)
  firstIssue = false

  return addData(nextIssue)
  .delay(100)
  .then(addIssueDataSequentially)
}

module.exports = () => {
  return getPagesSequentially()
  .then(addIssueDataSequentially)
  .then(() => issues)
}
