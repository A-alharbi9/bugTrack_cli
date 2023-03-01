const { Octokit } = require('@octokit/core');
const cliPrompt = require('./cliPrompt');
const chalk = require('chalk');
const ora = require('ora');

const loader = new ora('Loading data');

const githubRequest = async (owner, repo, type, status) => {
  try {
    const octokit = new Octokit();

    const data = await cliPrompt();

    loader.start();

    const res = await octokit.request(`GET /repos/${owner}/${repo}/${type}`, {
      state: status,
      per_page: data.firstQ,
      page: data.secondQ,
    });
    if (res.status === 200) {
      loader.succeed(chalk.green('Data fetched successfully'));
      return res;
    }
  } catch (error) {
    if (error.status == 404) {
      loader.fail(chalk.red('Repo not found!'));
    } else {
      loader.fail(chalk.red('Could not get data'));
    }
  }
};

module.exports = { githubRequest };
