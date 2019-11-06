const program = require('commander');
const { fetchNow, addToList, printList, _getBooks, _writeLineToFile } = require('./lib/commands');

program.version('0.0.1').description('Command line Book finder and reading list')

program
  .command("find <queries>")
  .alias('f')
  .description('look up a book by title and author')
  .action(queries => fetchNow(queries));

program
  .command("add <queries>")
  .alias('a')
  .description('add selected book to reading list')
  .action(queries => addToList(queries)); 

program 
  .command("list")
  .alias('l')
  .description('view current reading list')
  .action(() => printList());

program.parse(process.argv);

