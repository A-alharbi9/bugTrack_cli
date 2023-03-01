const Table = require('cli-table');
const chalk = require('chalk');

const createTable = (res) => {
  if (typeof res.data != 'object') {
    throw new Error(chalk.red('Invalid data!'));
  }

  const dataTable = new Table({
    head: ['By', 'title', 'status'],
    colWidths: [25, 100, 10],
  });

  res.data.map((item) =>
    dataTable.push([item.user.login, item.title, item.state])
  );

  return dataTable.toString();
};

module.exports = createTable;
