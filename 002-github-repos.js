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