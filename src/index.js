const yargs = require('yargs')(process.argv.slice(2));
const { Octokit } = require('@octokit/core');
const inquire = require('inquirer');
const { githubRequest } = require('./githubRequest');

const octokit = new Octokit();

const getData = async (owner, repo, type) => {
  try {
    const res = await githubRequest(owner, repo, type);

    res.data.map((issue) => {
      console.log(issue.title);
    });
  } catch (error) {
    console.error(error.status);
    console.error(error.message);
  }
};

const args = yargs
  .command(
    'track',
    'Track project repo',
    {
      owner: {
        describe: 'Project owner',
        demandOption: true,
        type: 'string',
      },
      repo: {
        describe: 'Project repo',
        demandOption: true,
        type: 'string',
      },
      type: {
        describe: 'issues or pull requests',
        type: 'string',
        default: 'issues',
      },
    },
    () => {
      const { owner, repo, type } = yargs.argv;

      getData(owner, repo, type);
    }
  )
  .check((argv) => {
    if (argv.owner == '' || argv.repo == '') {
      throw new Error('Owner and repo are required!');
    } else {
      return argv;
    }
  })
  .alias('ow', 'owner')
  .alias('re', 'repo')
  .example(
    'node index.js track --ow ownerName --repo repoName',
    'track project issues'
  )
  .alias('h', 'help')
  .help('h').argv;
