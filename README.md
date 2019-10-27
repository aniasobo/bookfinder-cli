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
1. Meridian by Alice Walker, published by Hachette UK
2. Blood Meridian by Cormac McCarthy, published by Vintage
3. Tables for azimuths, great circle sailing and reduction to the meridian by H. S. Blackburne, published by BoD – Books on Demand
4. Meridian Exercise for Self-Healing Book 2 by Ilchi Lee, published by Healing Society
5. Meridian Exercise For Self-Healing by Ilchi Lee, published by SCB Distributors
```

To add one of those to your reading list, use the `add` command followed by the search queries you'd used and your chosen book's list position:

```
$ node index.js add 'meridian mccarthy 2'
```

You can view your reading list in the `reading-list.txt` file found in the project directory.