var Rule = require('..').Rule;

describe('Rule', function(){

  describe('when defining comparators', function(){
    describe('eq', function(){
      it('should strictly equal', function(){
        var rule = new Rule('name').eq('hai');
        var result = rule.test({ name: 'hai' });
        result.should.equal(true);
      });
    });

    describe('neq', function(){
      it('should not equal', function(){
        var rule = new Rule('name').neq('hai');
        var result = rule.test({ name: 'thx' });
        result.should.equal(true);
      });
    });

    describe('contains', function(){
      it('should contain', function(){
        var rule = new Rule('name').contains('hai');
        var result = rule.test({ name: 'haiiiii' });
        result.should.equal(true);
      });
    });

    describe('ncontains', function(){
      it('should not contain', function(){
        var rule = new Rule('world').ncontains('up');
        var result = rule.test({ world: 'stuff' });
        result.should.equal(true);
      });
    });

    describe('gte', function(){
      it('should be greater than or equal to', function(){
        var rule = new Rule('number').gte(100);
        rule.test({ number: 100 }).should.equal(true);
        rule.test({ number: 120 }).should.equal(true);
      });
    });

    describe('lte', function(){
      it('should be lesser than or equal to', function(){
        var rule = new Rule('number').lte(100);
        rule.test({ number: 100 }).should.equal(true);
        rule.test({ number: 90 }).should.equal(true);
      });
    });

    describe('gt', function(){
      it('should be greater than', function(){
        var rule = new Rule('number').gt(100);
        var result = rule.test({ number: 150 });
        result.should.equal(true);
      });
    });

    describe('lt', function(){
      it('should be less than', function(){
        var rule = new Rule('number').lt(100);
        var result = rule.test({ number: 99 });
        result.should.equal(true);
      });
    });

    describe('matches', function(){
      it('should match by regex', function(){
        var rule = new Rule('hello');
        rule.matches(/^wor.+/);
        rule.test({ hello: 'world' }).should.equal(true);
      });

      it('should match regex strings', function(){
        var rule = new Rule('hello');
        rule.matches('^wor.+');
        rule.test({ hello: 'world' }).should.equal(true);
      });
    });

    describe('exists', function(){
      it('should exsist', function(){
        var rule = new Rule('visited');
        rule.exists();
        rule.test({ visited: 'apple' }).should.equal(true);
      });
    });

    describe('nexists', function(){
      it('should not exist', function(){
        var rule = new Rule('visited');
        rule.nexists();
        rule.test({}).should.equal(true);
      });
    });

    describe('is', function(){
      it('should test equality strictly', function(){
        var rule = new Rule('something');
        rule.is(undefined);
        rule.test({ something: null }).should.equal(false);
      });
    });

    describe('not', function(){
      it('should test equality strictly (negated)', function(){
        var rule = new Rule('something');
        rule.not(undefined);
        rule.test({ something: null }).should.equal(true);
      });
    });

  });

  describe('when chaining multiple comparators', function(){
    it('should create multiple rules', function(){
      var rule = new Rule('number');
      rule.gte(1);
      rule.lte(100);
      rule.test({ number: 50 }).should.equal(true);
      rule.test({ number: 133 }).should.equal(false);
    });
  });

  describe('undefined contexts', function(){
    it('should not throw an exception', function(){
      var rule = new Rule('name');
      rule.eq('hai');
      rule.test().should.equal(false);
    });
  });

});