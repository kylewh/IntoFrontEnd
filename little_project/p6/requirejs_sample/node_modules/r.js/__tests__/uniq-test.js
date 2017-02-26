// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('uniq', function() {
  it('should remove duplicates from array with duplicate indices', function() {
    var arg = [1,1,1,1,1,2,2,2,3,3,3,4];
    var exp = [1,2,3,4];
    expect(R.uniq(arg)).toEqual(exp);
  });

  it('should return same array when array has no duplicates', function() {
    var arg = [1,2,3];
    var exp = [1,2,3];
    expect(R.uniq(arg)).toEqual(exp);
  });

});
