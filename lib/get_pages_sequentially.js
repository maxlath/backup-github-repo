const get = require('./get')
const log = process.stdout.write.bind(process.stdout)

module.exports = (repo, section) => {

  var nextPage = 1
  const data = []
  const urlBase = `https://api.github.com/repos/${repo}/${section}?per_page=100&state=all`

  const getPagesSequentially = () => {
    return get(`${urlBase}&page=${nextPage}`)
    .then(batch => {
      if (batch.length === 0) return data
      data.push(...batch)
      const lineStart = data.length === 1 ? '' : '\r'
      log(`${lineStart}${section}: ${data.length}    `)
      nextPage += 1
      return Promise.resolve()
      .delay(100)
      .then(getPagesSequentially)
    })
  }

  return getPagesSequentially()
}
