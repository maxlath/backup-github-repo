#!/usr/bin/env bash
set -eu

# Executables declared in package.json
repo=$(backup-github-repo_get_repository_name)
token=$(backup-github-repo_get_github_token)

authorized_curl(){
  curl -H 'User-Agent: backup-github-repo' -H "Authorization: token ${token}" $@
}

echo "repo: $repo"
last_id=$(cat "./repo-backup/data.json" | jq '[ keys[] | tonumber ] | max')
echo "entries: $last_id"

cd "./repo-backup/html"

if [[ "$last_id" == "1" ]] ; then
  echo "Download single issue or pull request"
  authorized_curl -sL "https://github.com/${repo}/issues/1" > "1.html"
else
  echo "Download issues and pull requests HTML sequentially"
  # See curl(1) and https://www.chronicle.com/blogs/profhacker/download-a-sequential-range-of-urls-with-curl/41055
  authorized_curl -L "https://github.com/${repo}/issues/[1-${last_id}]" -o "#1.html" 2>&1 | grep -E '^\['
  echo "Done downloading issues and pull requests HTML sequentially"
fi

echo "Padding filenames with zeros"
for i in $(seq 1 "$last_id")
do
  padded_id=$(printf %04d $i)
  mv "${i}.html" "${padded_id}.html"
done

# Replace internal Github links by absolute links
sed -i 's|href="/|href="https://github.com/|g' *.html

replace_url_by_asset_hash(){
  url="$1"
  extension="${2:-}"
  hash=$(echo $url | sha1sum | awk '{printf $1}')
  filename="assets/${hash}${extension}"
  [ -e "assets/${hash}" ] || {
    authorized_curl -sL "$url" > "$filename" || { echo "couldn't fetch $url and put it into $filename" && exit 1 ; }
    sed -i "s|${url}|${filename}\" data-original-url=\"${url}|g" *.html
  }
}

echo "Download stylesheets"
# cf https://stackoverflow.com/a/16318005/3324977
cat 0001.html | grep '<link' | grep 'rel="stylesheet"' | sed 's/.*href="//' | sed 's/".*//' | while read -r line ;
  do replace_url_by_asset_hash "$line" '.css' ;
done ;

# Preventing resources to be blocked by integrity checks
sed -i 's/ integrity=/ data-integrity=/' *.html

# Hidding some divs
sed -i 's/ class="signup-prompt-bg/ style="display: none;" class="hidden signup-prompt-bg/' *.html
sed -i 's/ class="signup-prompt/ style="display: none;" class="hidden signup-prompt-bg/' *.html
sed -i 's/ class="flash flash-warn/ style="display: none;" class="hidden flash flash-warn/' *.html

urls=$(cat *.html | grep '<img' | grep -v data-original-url | sed 's/.*src="//' | sed 's/".*//' | grep -e '\w' | uniq)
urls_count=$(echo "$urls" | wc -l)

echo "Download images"
counter=0
echo "$urls" | while read -r line ; do
  replace_url_by_asset_hash "$line"
  counter=$((counter+1))
  printf "\rReplaced images: ${counter}/${urls_count}    "
done;

echo -e "\e[0;32m
Done downloading HTML\e[0;0m"
