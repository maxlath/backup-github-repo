const { execSync } = require('child_process')
const cmd = "git remote -v | grep origin | grep fetch | awk '{printf $2}' | sed 's/.*://' | sed 's/.git//'"

module.exports = () => execSync(cmd).toString()
