#!/usr/bin/env bash
set -eu

[ -e ".git" ] || {
  echo "this isn't a git repo" && exit 1
}

mkdir -p repo-backup/html/assets
mkdir -p repo-backup/html

# Executables declared in package.json
backup-github-repo_init_config
download-github-repo-json
download-github-repo-html
