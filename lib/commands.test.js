const {fetchNow, addToList, printList } = require('./commands');

test('fetches books', () => {
  return fetchNow('meridian mccarthy').then(data => {
    expect(data).not.toBeUndefined;
  });
});

// THE FOLLOWING SHOULD BE TESTED:

// use fetch.mockResponse(() => fetchNow().then(res => ({body: res})) to mock API calls
// find out how to test printing to stdout
// find out how to use a mock file or clear the reading-list.txt on teardown 