const yargs = require('yargs')(process.argv.slice(2));

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
    },
    () => {
      console.log('test');
    }
  )
  .check((argv) => {
    if (argv.owner == '' || argv.repo == '') {
      throw new Error('Owner and repo are required!');
    } else {
      return argv;
    }
  })
  .example(
    'node index.js track --ow ownerName --repo repoName',
    'track project issues'
  )
  .alias('h', 'help')
  .help('h').argv;
