var request = require('request');
var cheerio = require('cheerio');

var gisPrefixRegex = /.*imgurl=/;
var gisSuffixRegex = /&imgrefurl.*/;

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
      var imageLinks = $('#rg_s a');
      var gisURLs = [];
      imageLinks.each(collectHref);
      done(error, gisURLs.map(getImageURLFromGISURL));
    }

    function collectHref(i, element) {
      gisURLs.push(element.attribs.href);
    }
  }
}

function getImageURLFromGISURL(gisURL) {
  var imageURL = gisURL.replace(gisPrefixRegex, '');
  return imageURL.replace(gisSuffixRegex, '');
}

module.exports = gis;
