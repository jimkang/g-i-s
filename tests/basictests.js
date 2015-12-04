var test = require('tape');
var gis = require('../index');

test('Basic test', function basicTest(t) {
  gis('cats', checkResults);

  function checkResults(error, results) {
    t.ok(!error, 'No error.');
    t.ok(results.length > 0, 'There is at least one result.');
    results.forEach(checkResult);
    t.end();
  }

  function checkResult(result) {
    t.equal(typeof result, 'string', 'Result is a string.');
    t.ok(
      result.indexOf('http://') !== -1 ||
      result.indexOf('https://') !== -1,
      'Result looks like a URL.'
    );
  }
});
