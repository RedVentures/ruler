
var ruler = require('..');

describe('Ruler', function(){

  describe('when initialized with key/val rules', function(){
    it('should build the rules', function(){
      var rules = [
        { comparator: 'eq', path: 'name.first', value: 'john' },
        { comparator: 'eq', path: 'name.last', value: 'doe' }
      ];

      var obj = {
        name: { first: 'john', last: 'doe' }
      };

      var engine = ruler(rules);
      var result = engine.test(obj);

      engine.rules.should.have.length(2);
      result.should.equal(true);
    });
  });

  describe('when chaining new rules', function(){
    it('should build up rule stack', function(){
      var engine = ruler();

      engine
        .rule('name.first')
          .eq('john')
        .rule('name.last')
          .eq('doe')
        .rule('email')
          .contains('gmail');

      var result = engine.test({
        name: { first: 'john', last: 'doe' },
        email: 'john+doe@gmail.com'
      });

      engine.rules.should.have.length(3);
      result.should.equal(true);
    });
  });
  
});