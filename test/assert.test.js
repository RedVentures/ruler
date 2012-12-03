var ruler = require('..')
  , assert = require('assert');

describe('.ruler().assert(path)', function(){
  describe('on first assert chain', function(){
    var engine = ruler();
    engine.assert('name');

    it('should have an assertStack of length 1', function() {
      engine.assertStack.should.have.length(1);
    });

    it('should have the first element of type ruler', function() {
      engine.assertStack[0].should.be.an.instanceof(ruler);
    });

    it('should have the path of "name" on the first stack element', function() {
      engine.assertStack[0].path.should.equal('name');
    });
  });

  describe('on second assert chain', function(){
    var engine = ruler();
    engine
      .assert('name')
      .assert('age');

    it('should have an assertStack with 2 rulers', function(){
      engine.assertStack.should.have.length(2);
    });

    it('should have a path of "name" on the first stack element', function() {
      engine.assertStack[0].should.be.an.instanceof(ruler);
      engine.assertStack[0].path.should.equal('name');
    });

    it('should have a path of "age" on the second stack element', function() {
      engine.assertStack[1].should.be.an.instanceof(ruler);
      engine.assertStack[1].path.should.equal('age');
    });
  });

  describe('when initialized', function() {
    var engine = ruler();
    assert.equal(null, engine.parent);

    it('should have its parent set to ruler', function() {
      engine.assert('name');
      engine.assertStack[0].parent.should.equal(engine);
    });
  });

  describe('when chained with 2 simple passing tests', function() {
    var engine = ruler();
    engine
      .assert('name').is('jane')
      .assert('age').gt(10);

    var result = engine.test({
      name: 'jane'
      , age: 21
      , sex: 'yes please'
    });

    it('shoud return true', function() {
      result.should.equal(true);
    });
  });

  describe('single assert with chained gt and lt test', function() {
    var engine = ruler()
      .assert('age').gt(20).lt(30);

    describe('passing test', function() {
      var result = engine.test({
        age: 25
      });

      it('should be true', function() {
        result.should.equal(true);
      });
    });

    describe('failing test', function() {
      var result = engine.test({
        age: 45
      });

      it('should be false', function() {
        result.should.equal(false);
      });
    });
  });
});

describe('.ruler().assert(path).is()', function(){
  describe('when called', function(){
    var engine = ruler();
    engine.assert('name').is('bob');

    it('should attach to rulers first assertStack.stack', function() {
      engine.assertStack[0].stack.should.have.length(1);
      engine.assertStack[0].stack[0].should.be.a('function');
    });
  });
});

describe('.ruler().flattenStacks', function() {
  describe('when called with a single assert', function() {
    var engine = ruler();
    engine.assert('name').is('bob');

    it('properly attached the action to the child', function() {
      engine.stack.should.have.length(0);
      engine.assertStack[0].stack.should.have.length(1);

      engine.flattenStacks();
    });

    it('maintained the stack on the child', function() {
      engine.assertStack[0].stack.should.have.length(1);
      engine.assertStack[0].stack[0].should.be.a('function');
      engine.stack.should.have.length(1);
    });

    it('copied the function to the main stack', function() {
      engine.stack[0].should.be.a('function');
      engine.stack[0].should.equal(engine.assertStack[0].stack[0]);
    });

  });
});

describe('.ruler().assert(path).is(value)', function() {
  describe('when called with passing test', function() {
    var engine = ruler();
    engine.assert('name').is('bob');

    var result = engine.test({
      name: "bob"
    });

    it('will return true', function() {
      result.should.equal(true);
    });

    it('will still have the stack on all assert objects', function() {
      engine.assertStack[0].stack[0].should.be.a('function');
    });
  });
});

