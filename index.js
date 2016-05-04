var request = require('request');
var cheerio = require('cheerio');

var baseURL = 'http://images.google.com/search?tbm=isch&q=';

function gis(opts, done) {
  var searchTerm;
  var queryStringAddition;

  if (typeof opts === 'string') {
    searchTerm = opts;
  }
  else {
    searchTerm = opts.searchTerm;
    queryStringAddition = opts.queryStringAddition;
  }

  var url = baseURL + searchTerm;
  if (queryStringAddition) {
    url += queryStringAddition;
  }
  var reqOpts = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    }
  };

  request(reqOpts, parseGISResponse);

  function parseGISResponse(error, response, body) {
    if (error) {
      done(error);
    }
    else {
      var $ = cheerio.load(body);
      var metaLinks = $('.rg_meta');
      var gisURLs = [];
      metaLinks.each(collectHref);
      done(error, gisURLs);
    }

    function collectHref(i, element) {
      if (element.children.length > 0 && 'data' in element.children[0]) {
        var metadata = JSON.parse(element.children[0].data);
        if (metadata.ou) {
          var result = {
            url: metadata.ou,
            width: metadata.ow,
            height: metadata.oh
          };
          gisURLs.push(result);
        }
        // Elements without metadata.ou are subcategory headings in the results page.
      }
    }
  }
}

module.exports = gis;
