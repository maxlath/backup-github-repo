#!/usr/bin/env bash
set -e

include_html=true
include_json=true

while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --help)
            echo "USAGE: backup-github-repo [--no-html|--no-json] [URL]"
            exit 1
            ;;

        --no-json)
            include_json=false
            url="${2}"
            ;;

        --no-html)
            include_html=false
            url="${2}"
            ;;

        *)
            url="${1}"
            ;;
    esac
    shift
done

if [ ! -e ".git" ] && [ "$url" == "" ]; then
  echo "This isn't a git repository and no repository URL was passed" && exit 1
fi

if [ "$url" != "" ] ; then
  folder_name=$(backup-github-repo_get_repository_name "$url" | sed 's|/|_|g')
else
  folder_name="repo-backup"
fi

if [ "$folder_name" = "" ]; then
  exit 1
fi

mkdir -p "${folder_name}/html/assets"
mkdir -p "${folder_name}/html"

# Executables declared in package.json
backup-github-repo_init_config
if ${include_json}; then
    download-github-repo-json "$folder_name" "$url"
fi
if ${include_html}; then
    download-github-repo-html "$folder_name" "$url"
fi
