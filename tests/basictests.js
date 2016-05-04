var test = require('tape');
var gis = require('../index');

var searchTopics = [
  'cats',
  'oh no',
  {
    searchTerm: 'sleep',
    queryStringAddition: '&tbs=ic:trans'
  }
];

searchTopics.forEach(runTest);

function runTest(topic) {
  test('Basic test', function basicTest(t) {
    gis(topic, checkResults);

    function checkResults(error, results) {
      t.ok(!error, 'No error.');
      t.ok(results.length > 0, 'There is at least one result.');
      results.forEach(checkResult);
      // console.log(JSON.stringify(results, null, '  '));
      t.end();
    }

    function checkResult(result) {
      t.equal(typeof result, 'object', 'Result is an object.');
      t.equal(typeof result.url, 'string', 'Result url is a string.');
      t.ok(
        result.url.indexOf('http://') !== -1 ||
        result.url.indexOf('https://') !== -1,
        'Result url looks like a URL.'
      );
      t.ok(
        result.url.indexOf('imgrefurl') === -1,
        'Result url does not have imgrefurl in it.'
      );
      t.ok(!isNaN(result.width), 'Result has a width.');
      t.ok(!isNaN(result.height), 'Result has a height.');
    }
  });
}
