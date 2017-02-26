// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('clone', function() {
  it('should return cloned hash when arg is hash', function() {
    var arg = {awesome: true};
    var exp = {awesome: true};
    expect(R.clone(arg)).toEqual(exp);
  });

  it('should return cloned array when arg is array', function() {
    var arg = [1,2,3];
    var exp = [1,2,3];
    expect(R.clone(arg)).toEqual(exp);
  });

});
