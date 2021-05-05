# backup-github-repo

Backup all the issues and pull requests of a Github repo, including the comments, events, and labels, as JSON and as HTML.

[![NPM](https://nodei.co/npm/backup-github-repo.png?stars&downloads&downloadRank)](https://npmjs.com/package/backup-github-repo/)

**Features**
* generate a JSON file with all the issues and pull requests, including comments ([demo](https://github.com/maxlath/backup-github-repo/blob/master/demo/data.json))
* generate one HTML file per issue or pull request ([demo](https://github.com/maxlath/backup-github-repo/tree/master/demo/html))
* download CSS files and images locally to allow offline browsing ([demo](https://github.com/maxlath/backup-github-repo/tree/master/demo/html/assets))

**Known limitations**
* **Private repos**: while JSON download works, the tool will fail to download HTML versions (see [issue](https://github.com/maxlath/backup-github-repo/issues/2))

## Dependencies
* [NodeJS](https://nodejs.org) >= 7.6
* [curl](https://curl.se/)
* [jq](https://stedolan.github.io/jq/)

## Install
```sh
npm install -g backup-github-repo
```

## Run

```sh
cd /path/to/my/repo/to/backup
# First run will give you instructions to set a Github API token
backup-github-repo
```

## License
MIT
