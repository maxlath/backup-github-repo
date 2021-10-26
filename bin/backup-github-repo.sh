#!/usr/bin/env bash
set -e

url=$1

[ -e ".git" ] || [ "$url" != "" ] || {
  echo "this isn't a git repository and no repository URL was passed" && exit 1
}

if [ "$url" != "" ] ; then
  folder_name=$(backup-github-repo_get_repository_name "$url" | sed 's|/|_|g')
else
  folder_name="repo-backup"
fi

mkdir -p "${folder_name}/html/assets"
mkdir -p "${folder_name}/html"

# Executables declared in package.json
backup-github-repo_init_config
download-github-repo-json "$folder_name" "$url"
download-github-repo-html "$folder_name" "$url"
