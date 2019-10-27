# 📚🧐 Bookfinder 

Bookfinder is a command-line only app in JavaScript and Node that lets you search for books and add them to a reading list.

**NOTE:** to successfully run this app you need to use your own Google Books API key. Simply replace the KEY variable on top of the `commands.js` file before performing queries. Make sure your API key is a string, unless you're using a `dotenv`/environment variable.

### Download or clone this repo. 

Navigate into the project directory and run `$ npm install`.

**Run tests with `$ npm test`**
   
### Search for books

To find a book by keyword and author use `$ node index.js find '<title> <author>'`, like so:

```
$ node index.js find 'meridian mccarthy'
```

**NOTE:** current constraint is that both title and author must be single-word queries.

You should see the following results:

```
1. Blood Meridian by Cormac McCarthy, published by Vintage
2. Blood Meridian, Or, The Evening Redness in the West by Cormac McCarthy, published by Vintage
3. Blood Meridian ; Or, The Evening Redness in the West by Cormac McCarthy, published by undefined
4. Blood Meridian, Or, The Evening Redness in the West by Cormac McCarthy, published by Modern Library (Hardcover)
5. I Meant to Kill Ye by Stephanie Reents, published by undefined
```

### Choose a book to add to your reading list

Use the `add` command followed by the search queries you'd used and your chosen book's list position:

```
$ node index.js add 'meridian mccarthy 1'
```

### View your reading list

* view it in the command line with `$ node index.js list` 
* you can also open `reading-list.txt` file found in the project directory in your favourite text editor.

## Demo

![bookfinder demo screenshot](bookfinder-demo.png)
---

## Approach

My original plan was to use classic model-controller design with a separate UI class that would print commands available to the user to stdout.

However, I really wanted to try the `commander` module for this, as it seemed like a useful tool for a simple Node CLI. In retrospect, my original design would've been better in terms of ease of testing and state management. I'm also not entirely happy with the usability - the commands are quite long and clunky to type, and it's easy to make a mistake.

Due to the complexity of API fetch and `fs` module mocking I haven't completed all my unit testing as I'd ran out of time, but I have a good idea for how to do this with Jest mocks.