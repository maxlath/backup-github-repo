module.exports = data => {
  console.log('indexing issue by number')
  return data.reduce((index, nextEntry) => {
    index[nextEntry.number] = nextEntry
    return index
  }, {})
}
