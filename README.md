# backup-github-repo

Backup all the issues and pull requests of a Github repo, including the comments, events, and labels, as JSON and as HTML.

**Features**
* generate a JSON file with all the issues and pull requests, including comments ([demo](https://github.com/maxlath/backup-github-repo/blob/master/demo/data.json))
* generate one HTML file per issue or pull request ([demo](https://github.com/maxlath/backup-github-repo/tree/master/demo/html))
* download CSS files and images locally to allow offline browsing ([demo](https://github.com/maxlath/backup-github-repo/tree/master/demo/html/assets))

**Known limitations**
* **Private repos**: while JSON download works, the tool will fail to download HTML versions (see [issue](https://github.com/maxlath/backup-github-repo/issues/2))

## Dependencies
* curl
* [jq](https://stedolan.github.io/jq/)

## Install
```sh
git clone https://github.com/maxlath/backup-github-repo
cd backup-github-repo
npm install
# Make backup-github-repo available globally
npm link
```

## Run

```sh
cd /path/to/my/repo/to/backup
# First run will give you instructions to set a Github API token
backup-github-repo
```

## License
MIT
