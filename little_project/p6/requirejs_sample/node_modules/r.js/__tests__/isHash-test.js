// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('isHash', function() {
  it('should return true when arg is {}', function() {
    var arg = {};
    expect(R.isHash(arg)).toBe(true);
  });

  it('should return false when arg is string', function() {
    var arg = '';
    expect(R.isHash(arg)).toBe(false);
  });

  it('should return false when arg is undefined', function() {
    var arg;
    expect(R.isHash(arg)).toBe(false);
  });

  it('should return false when arg is null', function() {
    var arg = null;
    expect(R.isHash(arg)).toBe(false);
  });
});
