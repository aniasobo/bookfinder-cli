const { fetchNow, addToList, printList } = require('./commands');
jest.mock('node-fetch')
const fetch = require('node-fetch')
const { Response } = jest.requireActual('node-fetch')

global.console = {
  log: jest.fn()
}

const mockData = {
  items: [
    {
      volumeInfo: {
        title: 'Book One',
        authors: [
          'Anna Sobolewska'
        ],
        publisher: 'Great books'
      }
    },
    {
      volumeInfo: {
        title: 'Very Good Book',
        authors: [
          'Anna Sobolewska'
        ],
        publisher: 'Vintage'
      }
    },
    {
      volumeInfo: {
        title: 'A Tour de Force',
        authors: [
          'Anna Sobolewska'
        ],
        publisher: 'Random Penguin House'
      }
    }
  ]
}

describe('fetchNow', () => {
  it('should return the expected data and print it to stdout', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockData))));
    await fetchNow('firstTerm secondTerm');

    expect(global.console.log).toHaveBeenCalledWith('1. Book One by Anna Sobolewska, published by Great books\n2. Very Good Book by Anna Sobolewska, published by Vintage\n3. A Tour de Force by Anna Sobolewska, published by Random Penguin House');
  });
});

// TODO: find out how to mock the correct response to make this pass
// this test currently writes to file - find out how to mock the file and/or clear it on teardown
describe('addToList', () => {
  it('should print success message to stdout', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockData))));
    await addToList('firstTerm secondTerm 2');

    expect(global.console.log).toHaveBeenCalledWith('Book added to reading list!');
  });
});

// TODO:
describe('printList', () => {
  // it('should print a list out of a mocked file to stdout')
})
// find out how to use a mock file or clear the reading-list.txt on teardown 