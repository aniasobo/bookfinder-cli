require('dotenv').config();
const fetch = require("node-fetch");
const KEY = process.env.BOOKS_KEY;
const fs = require('fs');

module.exports = {

  fetchNow: async (terms) => {
    const query = terms.split(' ');

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query[0]}+${query[1]}&maxResults=5&key=${KEY}`);
    const data = await response.json();

    var bookList = []
    for (var i = 0; i < data.items.length; i++) {
      bookList.push(`${i + 1}. ${data.items[i].volumeInfo.title} by ${data.items[i].volumeInfo.authors.join(', ') || ''}, published by ${data.items[i].volumeInfo.publisher}`)
    }

    console.log(bookList.join(`\n`));
  },

  addToList: async (query) => {
    const queries = query.split(' ');
    const index = parseInt(queries[2]) - 1;

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queries[0]}+${queries[1]}&maxResults=5&key=${KEY}`);

    const data = await response.json();
    const chosenBook = `${data.items[index].volumeInfo.title} by ${data.items[index].volumeInfo.authors.join(', ')}, published by ${data.items[index].volumeInfo.publisher}\n`;

    fs.appendFile('reading-list.txt', chosenBook, (err) => {
      if (err) throw err;
      console.log("Book added to reading list!");     
    }); 
  },

  printList: () => {
    fs.readFile('reading-list.txt', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  }
}