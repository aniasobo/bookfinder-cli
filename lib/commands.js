require('dotenv').config();
const fetch = require('node-fetch');
const KEY = process.env.BOOKS_KEY;
const fs = require('fs');

async function _getBooks(terms) {
  const queries = terms.split(' ');
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queries.join('+')}&maxResults=5&key=${KEY}`);
    const data = await response.json();
    return data;
  }
  catch(err) {
    console.log("Nice error message", err);
  }
}

exports._writeLineToFile = (line, file) => {
  fs.appendFile(file, line, (err) => {
    if (err) throw err;
  }); 
}

exports._readFromFile = (file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

module.exports = {

  fetchNow: async (terms) => {
    const data = await _getBooks(terms);

    var bookList = []
    for (var i = 0; i < data.items.length; i++) {
      bookList.push(`${i + 1}. ${data.items[i].volumeInfo.title} by ${data.items[i].volumeInfo.authors.join(', ')}, published by ${data.items[i].volumeInfo.publisher}`)
    }

    console.log(bookList.join(`\n`));
  },

  addToList: async (query) => {
    const queries = query.split(' ');
    const index = queries.map(query => parseInt(query)).filter(query => isNaN(query) === false)[0];
    const searchQueries = queries.filter(query => query != index);

    const data = await _getBooks(searchQueries);
    const chosenBook = `${data.items[index].volumeInfo.title} by ${data.items[index].volumeInfo.authors.join(', ')}, published by ${data.items[index].volumeInfo.publisher}\n`;

    _writeLineToFile(chosenBook, 'reading-list.txt');
    console.log('Book added to reading list!');     
  },

  printList: () => {
    _readFromFile('reading-list.txt'); 
  }
}

module.exports._getBooks = _getBooks;