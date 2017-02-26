// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('any', function() {
  it('should return false when arg is array where each indice equals false, undefined or null', function() {
    var undef;
    var arg = [undef,null,false];
    expect(R.any(arg)).toBe(false);
  });

  it('should return true when arg is array with at least one indice that does not equal false, undefined or null', function() {
    var undef;
    var arg = [undef,null,false,true];
    expect(R.any(arg)).toBe(true);
  });

});
