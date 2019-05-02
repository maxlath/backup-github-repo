const { execSync } = require('child_process')
// Support the following remote URL format
// - git@github.com:owner/repo-name.git
// - https://github.com/owner/repo-name
const cmd = "git remote -v | grep origin | grep fetch | awk '{printf $2}' | sed 's|^.*:||' | sed 's|//github.com/||' | sed 's|\.git$||'"

module.exports = () => execSync(cmd).toString()
