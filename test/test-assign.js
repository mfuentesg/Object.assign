/* globals describe, it */

var chai = require('chai');
var assign = require('../assign');

describe('Assign', function() {
  describe('#assign()', function() {
    it('should returns TypeError', function() {
      chai.expect(assign.assign).to.throw(TypeError, 'Cannot convert undefined or null to object');
      chai.expect(assign.assign.bind(null, [])).to.throw(TypeError, 'Cannot convert array to object');
      chai.expect(assign.assign.bind(null, 'hi', [])).to.throw(TypeError, 'Cannot convert string to object');
      chai.expect(assign.assign.bind(null, 123)).to.throw(TypeError, 'Cannot convert number to object');
      chai.expect(assign.assign.bind(null, false)).to.throw(TypeError, 'Cannot convert boolean to object');
      chai.expect(assign.assign.bind(null, {}, 1234)).to.throw(TypeError, 'Cannot convert number to object');
      chai.expect(assign.assign.bind(null, 'abc', {})).to.throw(TypeError, 'Cannot convert string to object');
    });

    it('should return the same parameter', function() {
      chai.expect(assign.assign({})).to.deep.equal({});
      chai.expect(assign.assign({a: 1})).to.deep.equal({a: 1});
      chai.expect(assign.assign({a: 1})).to.deep.equal({a: 1});
      chai.expect(assign.assign({a: 1, other: 'key'})).to.deep.equal({a: 1, other: 'key'});
      chai.expect(assign.assign({a: 1, b: 2})).to.deep.equal({a: 1, b: 2});
    });

    it('should return the expected value', function() {
      var testCases = [
        {
          parameters: [{a: 1}, {b: 2}],
          expected: {a: 1, b: 2}
        },
        {
          parameters: [{a: 1}, {b: 2}, {c: 3}],
          expected: {a: 1, b: 2, c: 3}
        },
        {
          parameters: [{}, {b: 2}, {a: 1}],
          expected: {a: 1, b: 2}
        },
        {
          parameters: [{a: 1}, {b: 2}],
          expected: {a: 1, b: 2}
        },
        {
          parameters: [{a: 1}, {}, {}, {b: 2}],
          expected: {a: 1, b: 2}
        },
        {
          parameters: [{a: 1}, {b: 2}, {c: 3}, {b: 5}],
          expected: {a: 1, b: 5, c: 3}
        },
        {
          parameters: [{a: 1}, {b: 2}, {a: 5, b: 5}],
          expected: {a: 5, b: 5}
        },
        {
          parameters: [{a: 1}, {b: 2}, {}],
          expected: {a: 1, b: 2}
        },
        {
          parameters: [{
            fn: function() {
              return 'hello world';
            },
            cases: 1234
          }, {cases: 5}, {fn: null}, {b: undefined}],
          expected: {fn: null, cases: 5, b: undefined}
        },
        {
          parameters: [{}, {}, {}],
          expected: {}
        }
      ];

      testCases.forEach(function(testCase) {
        chai.expect(assign.assign.apply(null, testCase.parameters)).to.deep.equal(testCase.expected);
      });
    });
  });
});
