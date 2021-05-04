const get = require('./get')
const { wait } = require('./promises')
const log = process.stdout.write.bind(process.stdout)

module.exports = repo => {

  var nextPage = 1
  const data = []
  const urlBase = `https://api.github.com/repos/${repo}/issues?per_page=100&state=all`

  const getPagesSequentially = async () => {
    const batch = await get(`${urlBase}&page=${nextPage}`)
    if (!(batch instanceof Array)) throw new Error(`invalid batch: ${JSON.stringify(batch)}`)
    if (batch.length === 0) return data
    data.push(...batch)
    const lineStart = data.length === 1 ? '' : '\r'
    log(`${lineStart}entries: ${data.length}    `)
    nextPage += 1
    await wait(100)
    return getPagesSequentially()
  }

  return getPagesSequentially()
}
