module.exports = {
  props: async obj => {
    const keys = []
    const values = []
    for (const key in obj) {
      const value = obj[key]
      keys.push(key)
      values.push(value)
    }

    const res = await Promise.all(values)
    const resultObj = {}
    res.forEach((valRes, index) => {
      const key = keys[index]
      resultObj[key] = valRes
    })
    return resultObj
  },

  wait: ms => new Promise(resolve => setTimeout(resolve, ms))
}
