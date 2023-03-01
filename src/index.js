const yargs = require('yargs')(process.argv.slice(2));
const { choices } = require('yargs');
const createTable = require('./createTable');
const { githubRequest } = require('./githubRequest');

const getData = async (owner, repo, type) => {
  try {
    const res = await githubRequest(owner, repo, type);

    if (res) {
      console.log(createTable(res));
    }
  } catch (error) {
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
        describe: 'issue or pull request',
        type: 'string',
        default: 'issues',
      },
      status: {
        describe: 'issue or pull request status',
        type: 'string',
        default: 'open',
      },
    },
    () => {
      const { owner, repo, type, status } = yargs.argv;

      getData(owner, repo, type, status);
    }
  )
  .check((argv) => {
    if (argv.owner == '' || argv.repo == '') {
      throw new Error('Owner and repo are required!');
    } else {
      return argv;
    }
  })
  .choices('type', ['issues', 'pulls'])
  .choices('status', ['open', 'closed'])
  .example(
    'node index.js track --ow ownerName --repo repoName --type type --status status',
    'track project issues'
  )
  .alias('ow', 'owner')
  .alias('re', 'repo')
  .alias('t', 'type')
  .alias('st', 'status')
  .alias('h', 'help')
  .help('h').argv;
