count=0
repos=()

while ((count < 500)); do
    response=$(curl -s "https://api.github.com/orgs/apache/repos?page=$page&per_page=100")
    if [ "$response" == "[]" ]; then
        break
    fi
    repos+=("$response")
    ((page++))
    count=$(($count + $(echo "$response" | jq '. | length')))
done

sorted_repos=$(echo "${repos[@]}" | jq -s 'add | .[] | select(.stargazers_count != null) | {stars: .stargazers_count, name: .name, url: .html_url}' | jq -s 'sort_by(.stars) | reverse')

for row in $(echo "${sorted_repos}" | jq -r '.[] | @base64'); do
        _jq() {
         echo ${row} | base64 --decode | jq -r ${1}
        }

     echo Stars: $(_jq '.stars'), Name: $(_jq '.name'), URL: $(_jq '.url')
done