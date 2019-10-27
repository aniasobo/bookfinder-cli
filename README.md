# Bookfinder 

Bookfinder is a command-line only app in JavaScript and Node that lets you search for books and add them to a reading list.

NOTE: to successfully run this app you need to use your own Google Books API key. Simply replace the KEY variable on top of the `commands.js` file before performing queries.

Download or clone this repo. Navigate into the project directory and run `$ npm install`.

To search for books with this app use `$ node index.js find '<title> <author>'`, like so:

```
$ node index.js find 'meridian mccarthy'
```

NOTE: current constraint is that both title and author must be single-word queries.

You should see the following results:

```
1. Blood Meridian by Cormac McCarthy, published by Vintage
2. Blood Meridian, Or, The Evening Redness in the West by Cormac McCarthy, published by Vintage
3. Blood Meridian ; Or, The Evening Redness in the West by Cormac McCarthy, published by undefined
4. Blood Meridian, Or, The Evening Redness in the West by Cormac McCarthy, published by Modern Library (Hardcover)
5. I Meant to Kill Ye by Stephanie Reents, published by undefined
```

To add one of those to your reading list, use the `add` command followed by the search queries you'd used and your chosen book's list position:

```
$ node index.js add 'meridian mccarthy 1'
```

You can view your reading list in the `reading-list.txt` file found in the project directory.