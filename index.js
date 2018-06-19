var request = require('request');
var cheerio = require('cheerio');
var queryString = require('querystring');

var baseURL = 'http://images.google.com/search?';

function gis(opts, done) {
  var searchTerm;
  var queryStringAddition;
  var filterOutDomains;

  if (typeof opts === 'string') {
    searchTerm = opts;
  }
  else {
    searchTerm = opts.searchTerm;
    queryStringAddition = opts.queryStringAddition;
    filterOutDomains = opts.filterOutDomains;
  }

  var url = baseURL + queryString.stringify({
      tbm: 'isch',
      q: searchTerm
  });

  if (filterOutDomains) {
    url += encodeURIComponent(' ' + filterOutDomains.map(addSiteExcludePrefix).join(' '));
  }

  if (queryStringAddition) {
    url += queryStringAddition;
  }
  var reqOpts = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
  };

  // console.log(reqOpts.url);
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
          if (domainIsOK(result.url)) {
            gisURLs.push(result);
          }
        }
        // Elements without metadata.ou are subcategory headings in the results page.
      }
    }
  }

  function domainIsOK(url) {
    if (!filterOutDomains) {
      return true;
    }
    else {
      return filterOutDomains.every(skipDomainIsNotInURL);
    }

    function skipDomainIsNotInURL(skipDomain) {
      return url.indexOf(skipDomain) === -1;
    }
  }
}

function addSiteExcludePrefix(s) {
  return '-site:' + s;
}

module.exports = gis;
