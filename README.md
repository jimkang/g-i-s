g-i-s
=====

Another Google Image Search Node module. The nature of these things is that they eventually break as GIS changes. This one works as of 12/2/2015.

Installation
------------

    npm install g-i-s

Usage
-----

    var gis = require('g-i-s');
    gis('cats', checkResults);

    function logResults(error, results) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(results);
      }
    }

Output:

    [
      'http://animalia-life.com/cat.html&sa=U&ved=0ahUKEwiojKvqnsHJAhWMOz4KHZx3B2QQwW4IFjAA&usg=AFQjCNEL_cjEBxfZJiRwun330eTN_WMl_g',
      'https://www.youtube.com/watch%3Fv%3DtntOCGkgt98&sa=U&ved=0ahUKEwiojKvqnsHJAhWMOz4KHZx3B2QQwW4IGDAB&usg=AFQjCNFG-vK79EhZStQ6lHol6q2QnOYp0A',
      'https://twitter.com/cats&sa=U&ved=0ahUKEwiojKvqnsHJAhWMOz4KHZx3B2QQwW4IGjAC&usg=AFQjCNHnLXmWvZmIInflKlQZP8-BKd6fPQ',
      'https://en.wikipedia.org/wiki/Cat&sa=U&ved=0ahUKEwiojKvqnsHJAhWMOz4KHZx3B2QQwW4IHDAD&usg=AFQjCNG-AgFLAwkkhtFVBBd0kBGutEZNrw',
      ...
    ]

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
