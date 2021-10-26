#!/usr/bin/env bash
set -e

url=$1

[ -e ".git" ] || [ "$url" != "" ] || {
  echo "this isn't a git repository and no repository URL was passed" && exit 1
}

mkdir -p repo-backup/html/assets
mkdir -p repo-backup/html

# Executables declared in package.json
backup-github-repo_init_config
download-github-repo-json "$url"
download-github-repo-html "$url"
