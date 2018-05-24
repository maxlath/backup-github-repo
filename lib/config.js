const path = require('path')
// Prevent the cwd config folder to be used
// See https://github.com/lorenwest/node-config/wiki/Configuration-Files
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, '../config/')

module.exports = require('config')
