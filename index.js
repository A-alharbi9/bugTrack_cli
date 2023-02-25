const yargs = require('yargs')(process.argv.slice(2));

const args = yargs
  .command(
    'start',
    '',
    () => {},
    () => {
      console.log('Welcome');
    }
  )
  .example('node index.js start', 'start cli')
  .alias('h', 'help')
  .help('h').argv;
