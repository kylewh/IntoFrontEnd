// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('all', function() {
  it('should return true when arg is array where each indice does not equal false, undefined or null', function() {
    var arg = [1,true,'',{},[]];
    expect(R.all(arg)).toBe(true);
  });

  it('should return false when arg is array where each indice does not equal false, undefined or null', function() {
    var arg = [1,true,'',{},[],false];
    expect(R.all(arg)).toBe(false);
  });

});
