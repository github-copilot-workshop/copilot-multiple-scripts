# Solving Problem Quickly

In this section you will see how you can use GitHub Copilot to quickly solve problems, without leaving your IDE.

## 001 - Creating a shell script to call a REST API

As you probably know GitHub as a public API that you can use to get information about repositories, users, etc. 

Let's use Copilot to get the information about a users and its repositories.

For this we will use `curl` and `jq` tools, so create a script that get all the repository of the Apache organization and sort them by number of stars

<details>
<summary>Possible Flow</summary>

1. Open GitHub Copilot Chat
2. Ask the following question: "create a shell script with curl and jq to get the list of repositories of the apache org sorted by number of stars desending"

The script looks like this:

```bash
#!/bin/bash

# Fetch the list of repositories for the Apache organization
repos=$(curl -s "https://api.github.com/orgs/apache/repos")

# Parse the JSON response and sort the repositories by the number of stars in descending order
sorted_repos=$(echo "${repos}" | jq -r '.[] | "\(.stargazers_count) \(.name)"' | sort -rn)

# Print the sorted list of repositories
echo "${sorted_repos}"
```
</details>

## 002 - Getting All the Repositories of an Organization

If you look at the orginazation https://github.com/apache you can see that it contains a lot more repositories than the ones returned by the API.

Use Copilot Chat to understand why, and how you can get the full list of repositories.

<details>
<summary>Possible Flow</summary>

1. Open GitHub Copilot Chat
2. Ask the following question: "why this script is returning only few repos when apache organization has more then 2600 repos?"


The modified script looks like this:

```bash
#!/bin/bash

page=1
repos=()

while true; do
    response=$(curl -s "https://api.github.com/orgs/apache/repos?page=$page&per_page=100")
    if [ "$response" == "[]" ]; then
        break
    fi
    repos+=("$response")
    ((page++))
done

sorted_repos=$(echo "${repos[@]}" | jq -s 'add | .[] | "\(.stargazers_count) \(.name)"' | sort -rn)

echo "${sorted_repos}"
```

To avoid running into rate limits, you can use a personal access token to authenticate with the GitHub API. You can create a personal access token by following the instructions [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

So for now we will not use this script and limit it to 500 repos.

1. Open GitHub Copilot Chat
2. Ask the following question: "Can you limit the script to 500 repos, and create an object with number of stars, name of repo and url,. then print the list sorted by number of start and print the number of stars, the name and url?"

> Note : as you can see we are asking Copilot to make sure that it uses different JSON fields and sort by the stars count as number and not as string.

The modified script looks like this:

```bash
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
```