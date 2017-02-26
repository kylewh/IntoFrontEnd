// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('slice', function() {
  it('should return new hash with key value pairs from arg1 hash that correspond to keys in arg2 array', function() {
    var arg1 = {1:1, 2:2, 3:3, 4:4, 5:5};
    var arg2 = [2,4];
    var exp = {2:2, 4:4};
    expect(R.slice(arg1,arg2)).toEqual(exp);
  });

});
