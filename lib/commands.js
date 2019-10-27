require('dotenv').config();
const fetch = require("node-fetch");
const KEY = process.env.BOOKS_KEY;
const fs = require('fs');

module.exports = {

  fetchNow: async (terms) => {
    const query = terms.split(' ');

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query[0]}&inauthor:${query[1]}&maxResults=5&key=${KEY}`);
    const data = await response.json();
    var bookList = [
      `1. ${data.items[0].volumeInfo.title} by ${data.items[0].volumeInfo.authors.join(', ')}, published by ${data.items[0].volumeInfo.publisher}`, 
      `2. ${data.items[1].volumeInfo.title} by ${data.items[1].volumeInfo.authors.join(', ')}, published by ${data.items[1].volumeInfo.publisher}`, 
      `3. ${data.items[2].volumeInfo.title} by ${data.items[2].volumeInfo.authors.join(', ')}, published by ${data.items[2].volumeInfo.publisher}`, 
      `4. ${data.items[3].volumeInfo.title} by ${data.items[3].volumeInfo.authors.join(', ')}, published by ${data.items[3].volumeInfo.publisher}`, 
      `5. ${data.items[4].volumeInfo.title} by ${data.items[4].volumeInfo.authors.join(', ')}, published by ${data.items[4].volumeInfo.publisher}`];

    console.log(bookList.join(`\n`));
  },

  addToList: async (query) => {
    const queries = query.split(' ');
    const index = parseInt(queries[2]) - 1;

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queries[0]}&inauthor:${queries[1]}&maxResults=5&key=${KEY}`);

    const data = await response.json();
    const chosenBook = `${data.items[index].volumeInfo.title} by ${data.items[index].volumeInfo.authors.join(', ')}, published by ${data.items[index].volumeInfo.pubisher}\n`;

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