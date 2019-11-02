import { write } from 'fs';

require('dotenv').config();
const fetch = require('node-fetch');
const KEY = process.env.BOOKS_KEY;
const fs = require('fs');

async function getBooks(terms) {
  const queries = terms.split(' ');
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query[0]}+${query[1]}&maxResults=5&key=${KEY}`);
  const data = await response.json();
  return data;
}

export function writeToFile(line, file) {
  fs.appendFile(file, line, (err) => {
    if (err) throw err;
  }); 
}

export function readFromFile(file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

module.exports = {

  fetchNow: async (terms) => {
    const data = await getBooks(terms);

    var bookList = []
    for (var i = 0; i < data.items.length; i++) {
      bookList.push(`${i + 1}. ${data.items[i].volumeInfo.title} by ${data.items[i].volumeInfo.authors.join(', ')}, published by ${data.items[i].volumeInfo.publisher}`)
    }

    console.log(bookList.join(`\n`));
  },

  addToList: async (query) => {
    const queries = query.split(' ');
    const index = queries.map(query => parseInt(query)).filter(query => isNaN(query) === false)[0];

    const data = await getBooks(query);
    const chosenBook = `${data.items[index].volumeInfo.title} by ${data.items[index].volumeInfo.authors.join(', ')}, published by ${data.items[index].volumeInfo.publisher}\n`;

    writeToFile(chosenBook, 'reading-list.txt');
    console.log('Book added to reading list!');     
  },

  printList: () => {
    readFromFile('reading-list.txt'); 
  }
}