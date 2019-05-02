const get = require('./get')
const log = process.stdout.write.bind(process.stdout)
const logBase = 'adding comments, events, and labels'

module.exports = section => data => {

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

    return addData(section, nextEntry)
    .delay(100)
    .then(addEntryDataSequentially)
  }

  return addEntryDataSequentially()
}

const dataPerSection = {
  issues: [ 'labels', 'comments', 'events' ],
  pulls: [ 'commits', 'comments', 'review_comments', 'statuses' ]
}

const addData = (section, entry) => {
  const dataTypes = dataPerSection[section]
  return Promise.props(dataTypes.reduce(getData(entry), {}))
}

const getData = entry => (requests, dataType) => {
  var url = entry[`${dataType}_url`]
  if (dataType === 'labels') url = url.replace(/{.*/, '')
  requests[dataType] = get(url)
  return requests
}
