// Jest only reports 1 test passing per file, see: https://github.com/facebook/jest/issues/4
jest.dontMock('../r.js');
var R = require('../r.js');

describe('blank', function() {
  it('should return false when arg is populated hash', function() {
    var arg = {awesome: true};
    expect(R.blank(arg)).toBe(false);
  });

  it('should return true when arg is empty hash', function() {
    var arg = {};
    expect(R.blank(arg)).toBe(true);
  });

  it('should return false when arg is populated array', function() {
    var arg = [1,2,3];
    expect(R.blank(arg)).toBe(false);
  });

  it('should return true when arg is empty array', function() {
    var arg = [];
    expect(R.blank(arg)).toBe(true);
  });

  it('should return false when arg is populated string', function() {
    var arg = 'awesome';
    expect(R.blank(arg)).toBe(false);
  });

  it('should return true when arg is empty string', function() {
    var arg = '';
    expect(R.blank(arg)).toBe(true);
  });

  it('should return true when arg is string with only spaces', function() {
    var arg = '    ';
    expect(R.blank(arg)).toBe(true);
  });

  it('should return true when arg is undefined', function() {
    var arg;
    expect(R.blank(arg)).toBe(true);
  });

  it('should return true when arg is null', function() {
    var arg = null;
    expect(R.blank(arg)).toBe(true);
  });

  it('should return false when arg is number', function() {
    var arg = 123;
    expect(R.blank(arg)).toBe(false);
  });

});
