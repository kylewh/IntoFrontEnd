// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('merge', function() {
  it('should return new hash with combined key pair values from arg1 hash and arg2 hash', function() {
    var arg1 = {1:1, 2:2, 3:3};
    var arg2 = {4:4, 5:5};
    var exp = {1:1, 2:2, 3:3, 4:4, 5:5};
    expect(R.merge(arg1,arg2)).toEqual(exp);
  });

  it('should return new hash with values of arg1 hash overwritten by values of corresponding keys in arg2 hash', function() {
    var arg1 = {1:1, 2:2, 3:3};
    var arg2 = {2:'something', 3:'different', 4:4};
    var exp = {1:1, 2:'something', 3:'different', 4:4};
    expect(R.merge(arg1,arg2)).toEqual(exp);
  });

});
