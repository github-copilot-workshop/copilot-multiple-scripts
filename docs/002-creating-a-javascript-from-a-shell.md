## Creating a JavaScript application from a Shell Script

In the previous exervice you have created a shell script that gets the list of repositories of an organization and sort them by number of stars.

The script looks like this: _(we use the simplest version)_

```bash
#!/bin/bash

# Fetch the list of repositories for the Apache organization
repos=$(curl -s "https://api.github.com/orgs/apache/repos")

# Parse the JSON response and sort the repositories by the number of stars in descending order
sorted_repos=$(echo "${repos}" | jq -r '.[] | "\(.stargazers_count) \(.name)"' | sort -rn)

# Print the sorted list of repositories
echo "${sorted_repos}"
```

If you have not done the previous exercise, you can copy the script above.


## 001 - Converting the script to JavaScript

Using Copilot convert the script to JavaScript.

<details>
<summary>Possible Flow</summary>

1. Open GitHub Copilot Chat
2. Select the code of the script
2. Ask the following question: `Using Selected codeCan you convert the following code into JavaScript using pure Node.js API and using JSON ?`he code in the question, but you can simply

> Note: you may have to ask multiple question to tune the result and get the script that looks good to you. Remember you are the one that decide what to do with the suggestions, this is why it is called GitHub **Copilot** _(and not GitHub Autopilot)_.

The code looks like this:

```javascript
const https = require('https');

function fetchRepos() {
    const options = {
        hostname: 'api.github.com',
        path: '/orgs/apache/repos',
        method: 'GET',
        headers: {
            'User-Agent': 'Node.js'
        }
    };

    const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const repos = JSON.parse(data);
            const sortedRepos = repos
                .map(repo => ({ stars: repo.stargazers_count, name: repo.name }))
                .sort((a, b) => b.stars - a.stars);

            for (const repo of sortedRepos) {
                console.log(`${repo.stars} ${repo.name}`);
            }
        });
    });

    req.on('error', error => console.error(error));
    req.end();
}

fetchRepos();
```



</details>