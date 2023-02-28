const cliPrompt = require('./cliPrompt');

const { Octokit } = require('@octokit/core');

const githubRequest = async (owner, repo, type) => {
  try {
    const octokit = new Octokit();

    const data = await cliPrompt();

    const res = await octokit.request(`GET /repos/${owner}/${repo}/${type}`, {
      state: 'open',
      per_page: data.firstQ,
      page: data.secondQ,
    });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    if (error.status == 404) {
      console.log('Repo not found!');
    } else {
      console.log('Error: ', error.message);
    }
  }
};

module.exports = { githubRequest };
