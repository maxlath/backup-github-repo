module.exports = sectionData => {
  console.log('indexing issue by number')
  return sectionData.reduce((index, nextEntry) => {
    index[nextEntry.number] = nextEntry
    return index
  }, {})
}
