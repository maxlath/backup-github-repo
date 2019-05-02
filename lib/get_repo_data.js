const repo = require('./get_repo')()
const { grey } = require('chalk')

const getPagesSequentially = require('./get_pages_sequentially')
const addEntryDataSequentially = require('./add_entry_data_sequentially')

module.exports = () => {
  console.log(grey(`repo: ${repo}`))

  return getPagesSequentially(repo)
  .then(addEntryDataSequentially)
}