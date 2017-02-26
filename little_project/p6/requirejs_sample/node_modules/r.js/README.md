# r.js

[![npm version](https://badge.fury.io/js/r.js.svg)](http://badge.fury.io/js/r.js)
[![Build Status](https://travis-ci.org/step1profit/r.js.svg)](https://travis-ci.org/step1profit/r.js)
[![Code Climate](https://codeclimate.com/github/step1profit/r.js/badges/gpa.svg)](https://codeclimate.com/github/step1profit/r.js)
[![Test Coverage](https://codeclimate.com/github/step1profit/r.js/badges/coverage.svg)](https://codeclimate.com/github/step1profit/r.js)

* https://www.npmjs.com/package/r.js
* https://github.com/step1profit/r.js

## DESCRIPTION

Ruby core methods written as javascript functions

## FEATURES

* Runs as frontend lib or node module

## INSTALLATION

Frontend Lib
```html
<script src="/public/dir/r.js"></script>
```

Node.js
```
$ npm install r.js
```

## SYNOPSIS

```javascript
// Object Functions

R.isHash(x); // returns true if x is a {}

R.clone(x); // returns clone of x

R.blank(x); // returns true if x is blank


// Array Functions

R.uniq(array); // removes duplicates from array


// Array or Hash Functions

R.any(x); // returns true if at least one indice in x is not null/false/undefined

R.all(x); // returns true if all indices in x are not null or null/false/undefined


// Hash Functions

R.slice(hash1, keys_array); // returns new hash with key value pairs from hash1 with corresponding keys from keys_array

R.except(hash1, keys_array); // returns new hash with key value pairs from hash1 without corresponding keys from keys_array

R.merge(hash1, hash2); // returns new hash of combined key value pairs hash1 with hash2, where hash2 keys overwrite corresponding keys in hash1
```

## REQUIREMENTS

...

## LICENSE

The MIT License (MIT)

Copyright (c) 2015 Step1Profit

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
