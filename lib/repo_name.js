const { execSync } = require('child_process')

// Support the following remote URL format
// - git@github.com:owner/repo-name.git
// - https://github.com/owner/repo-name
// - https://github.com/owner/repo-name.git

const getName = remoteCmd => {
  const cmd = `${remoteCmd} | awk '{printf $2}' | sed 's|^.*:||' | sed 's|//github.com/||' | sed 's|\.git$||'`
  return execSync(cmd).toString().trim()
}

module.exports = ({ url }) => {
  if (url) {
    const { pathname } = new URL(url)
    return pathname.split('/').slice(1, 3).join('/')
  } else {
    const githubOriginRemote = getName('git remote -v | grep -E "^origin\\s" | grep github.com')
    const firstGithubRemote = getName('git remote -v | grep github.com | head -n 1')
    return githubOriginRemote.match(/.+\/.+/) != null ? githubOriginRemote : firstGithubRemote
  }
}
