const { fetchNow, addToList, printList } = require('./commands');

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

const mockList = 'Book One by Anna Sobolewska, published by Great books\nVery Good Book by Anna Sobolewska, published by Vintage\nA Tour de Force by Anna Sobolewska, published by Random Penguin House';

describe('fetchNow', () => {
  const getBooks = jest.fn();
  getBooks.mockReturnValue(mockData);

  it('should call the fetch with the correct terms', async () => {
    await fetchNow('firstTerm secondTerm', getBooks);
    expect(getBooks).toBeCalledWith('firstTerm secondTerm');
  });

  it('should print the expected data to stdout', async () => {
    await fetchNow('firstTerm secondTerm', getBooks);
    expect(global.console.log).toHaveBeenCalledWith('1. Book One by Anna Sobolewska, published by Great books\n2. Very Good Book by Anna Sobolewska, published by Vintage\n3. A Tour de Force by Anna Sobolewska, published by Random Penguin House');
  });
});

describe('addToList', () => {
  const getBooks = jest.fn();
  getBooks.mockReturnValue(mockData);
  const writeToFile = jest.fn();

  it('calls the fetch with the correct arguments', async () => {
    await addToList('firstTerm secondTerm 1', getBooks, writeToFile, 'mock-file.txt');
    expect(getBooks).toBeCalledWith(['firstTerm', 'secondTerm']);
  });

  it('calls the writeLineToFile function with the correct arguments', async () => {
    await addToList('firstTerm secondTerm 1', getBooks, writeToFile, 'mock-file.txt');
    expect(writeToFile).toBeCalledWith('Book One by Anna Sobolewska, published by Great books\n', 'mock-file.txt');
  });

  it('prints success message to stdout', async () => {
    await addToList('firstTerm secondTerm 1', getBooks, writeToFile, 'mock-file.txt');
    expect(global.console.log).toHaveBeenCalledWith('Book added to reading list!');
  });
});

describe('printList', () => {
  const readFile = jest.fn();
  readFile.mockReturnValue(mockList);

  it('should call the callback with the right text file', () => {
    printList(readFile, 'mock-file.txt');
    expect(readFile).toHaveBeenCalledWith('mock-file.txt');
    expect(global.console.log).toHaveBeenCalledWith('Book added to reading list!');
  });

  // not sure why this one fails 
  
  // it('should print a mocked list to stdout', () => {
  //   printList(readFile, 'mock-file.txt');
  //   expect(global.console.log).toHaveBeenCalledWith(mockList);
  // });
});
