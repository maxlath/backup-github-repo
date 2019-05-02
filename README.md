# backup-github-issues

Backup all the issues of a Github repo, including the comments, events, and labels, as JSON and as HTML.

**Features**
* generate a JSON file with all the issues ([demo](https://github.com/maxlath/backup-github-issues/blob/master/demo/data.json))
* generate one HTML file per issue ([demo](https://github.com/maxlath/backup-github-issues/tree/master/demo/html))
* download CSS files and images locally to allow offline browsing ([demo](https://github.com/maxlath/backup-github-issues/tree/master/demo/html/assets))

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
