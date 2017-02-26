// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('except', function() {
  it('should remove key value pairs from arg1 hash that correspond to keys in arg2 array', function() {
    var arg1 = {1:1, 2:2, 3:3, 4:4, 5:5};
    var arg2 = [2,4];
    var exp = {1:1, 3:3, 5:5};
    expect(R.except(arg1,arg2)).toEqual(exp);
  });

});
