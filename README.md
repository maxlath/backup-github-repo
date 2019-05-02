# backup-github-issues

Backup all the issues of a github repo, including the comments, events, and labels, as JSON and as HTML.

**Features**
* generate a JSON file with all the issues
* generate one HTML file per issue
* download images locally to allow offline browsing

## Install
```sh
git clone https://github.com/maxlath/backup-github-issues
cd backup-github-issues
# Make backup-github-issues available globally
npm link
```

## Run

```sh
cd /path/to/my/repo/to/backup
# First run will give you instructions to set a Github API token
backup-github-issues
```

## License
MIT
