const get = require('./get')
const log = process.stdout.write.bind(process.stdout)
const logBase = 'adding comments, events, and labels'

module.exports = data => {

  var nextEntryIndex = 0

  const addEntryDataSequentially = () => {
    const nextEntry = data[nextEntryIndex]
    if (!nextEntry) {
      log('\ndone                                                    \n')
      return data
    }
    nextEntryIndex += 1
    const lineStart = nextEntryIndex === 1 ? '\n' : '\r'
    const count = `${nextEntryIndex}/${data.length}`
    log(`${lineStart}${logBase}: ${count}   `)

    return addEntryData(nextEntry)
    .delay(100)
    .then(addEntryDataSequentially)
  }

  return addEntryDataSequentially()
}

const dataTypes = [
  // issues
  'labels', 'comments', 'events',
  // pulls
  'commits',  'review_comments', 'statuses',
  // common
  'comments'
]

const addEntryData = entry => {
  return Promise.props(dataTypes.reduce(getData(entry), {}))
  .then(data => Object.assign(entry, data))
}

const getData = entry => (requests, dataType) => {
  var url = entry[`${dataType}_url`]
  if (url) {
    if (dataType === 'labels') url = url.replace(/{.*/, '')
    requests[dataType] = get(url)
  }
  return requests
}
