#!/usr/bin/env node
const { config } = require('../lib/config/get_config')()
console.log(config.token)
