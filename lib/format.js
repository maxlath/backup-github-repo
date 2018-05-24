module.exports = issues => {
  console.log('indexing issue by number')
  return issues.reduce((index, nextIssue) => {
    index[nextIssue.number] = nextIssue
    return index
  }, {})
}
