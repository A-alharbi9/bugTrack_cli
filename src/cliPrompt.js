const inquire = require('inquirer');

const cliPrompt = async () => {
  const answer = await inquire.prompt([
    {
      name: 'firstQ',
      type: 'input',
      message: 'how many issues/pull request per page?',
      default: 30,
    },
    {
      name: 'secondQ',
      type: 'input',
      message: 'which page do you want to display?',
      default: 1,
    },
  ]);

  return answer;
};

module.exports = cliPrompt;
