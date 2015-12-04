var request = require('request');
var cheerio = require('cheerio');

var gisPrefixRegex = /\/url\?q=/;

var baseURL = 'http://images.google.com/search?tbm=isch&q=';

function gis(searchTerm, done) {
  request(baseURL + searchTerm, parseGISResponse);

  function parseGISResponse(error, response, body) {
    if (error) {
      done(error);
    }
    else {
      var $ = cheerio.load(body);
      var imageLinks = $('.images_table a');
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
  return gisURL.replace(gisPrefixRegex, '');
}

module.exports = gis;
