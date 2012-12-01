
var ruler = require('..');

describe('.ruler(arr)', function(){
  describe('when initialized with key/val rules', function(){
    it('should build the stack', function(){
      var rules = [
        { cmp: 'is', path: 'name.first', value: 'john' },
        { cmp: 'is', path: 'name.last', value: 'doe' }
      ];

      var obj = {
        name: { first: 'john', last: 'doe' }
      };

      var engine = ruler(rules);
      var result = engine.test(obj);

      engine.stack.should.have.length(2);
      result.should.equal(true);
    });
  });
});

describe('.ruler()', function(){
  describe('when chaining with the API', function(){
    it('should build up the filters', function(){
      var engine = ruler()
        .is('name.first', 'john')
        .is('name.last', 'doe')
        .contains('email', 'gmail');

      var result = engine.test({
        name: { first: 'john', last: 'doe' },
        email: 'john+doe@gmail.com'
      });

      engine.stack.should.have.length(3);
      result.should.equal(true);
    });
  });
});