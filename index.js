var request = require('request');
var cheerio = require('cheerio');

var baseURL = 'http://images.google.com/search?tbm=isch&q=';

function gis(searchTerm, done) {
  var opts = {
    url: baseURL + searchTerm,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    }
  };

  request(opts, parseGISResponse);

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
          gisURLs.push(metadata.ou);
        }
        // Elements without metadata.ou are subcategory headings in the results page.
      }
    }
  }
}

module.exports = gis;
