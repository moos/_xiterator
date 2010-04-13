// original underscore speed test suite adapted for _xiterator  
// @see: http://github.com/documentcloud/underscore/tree/master/test/

var timesTwo = [];

(function() {

  var numbers = [];
  for (var i=0; i<   10   ; i++) numbers.push(i);
  //var objects = _.map(numbers, function(n){ return {num : n}; });
  //var randomized = _.sortBy(numbers, function(){ return Math.random(); });

  var oEach = _.each(), oAll = _.all();
  
  
  JSLitmus.test('_.all() isNumber', function() {
	  _.all(numbers, 'isNumber'); 
  });
  
  JSLitmus.test('_.all() isNumber - function', function() {
	  _.all(numbers, _.isNumber);
  });
  
  JSLitmus.test('_.all() isNumber - original', function() {
	  oAll(numbers, _.isNumber);
  });
  
  
  
  JSLitmus.test('_.all()', function() {
	  _.all(numbers, 'isNumber && >=0'); 
  });
  
  JSLitmus.test('_.all() - function', function() {
	  _.all(numbers, function(num){ return _.isNumber(num) && num >= 0; });
  });
  
  JSLitmus.test('_.all() - original', function() {
	  oAll(numbers, function(num){ return _.isNumber(num) && num >= 0; });
  });
  
  
  JSLitmus.test('_.all() 2', function() {
	  _.all(numbers, '(isNumber && >=0) && (!isString && < 10000)'); 
  });
  
  JSLitmus.test('_.all() 2 - function', function() {
	  _.all(numbers, function(num){ return (_.isNumber(num) && num >= 0) && (!_.isString(num) && num < 10000); });
  });
  
  JSLitmus.test('_.all() 2 - original', function() {
	  oAll(numbers, function(num){ return (_.isNumber(num) && num >= 0) && (!_.isString(num) && num < 10000); });
  });

  return;

  
  JSLitmus.test('_.each()', function() {
    //var timesTwo = [];
    _.each(numbers, 'timesTwo.push(__value * 2);'); 
    		//function(num){ timesTwo.push(num * 2); });
    return timesTwo;
  });

  JSLitmus.test('_.each() - original', function() {
	  //var timesTwo = [];
	  _.each(numbers, function(num){ timesTwo.push(num * 2); });
	  return timesTwo;
  });
  
  if (0)
  JSLitmus.test('_(list).each()', function() {
    var timesTwo = [];
    _(numbers).each(function(num){ timesTwo.push(num * 2); });
    return timesTwo;
  });

  if (0)
  JSLitmus.test('jQuery.each()', function() {
    var timesTwo = [];
    jQuery.each(numbers, function(){ timesTwo.push(this * 2); });
    return timesTwo;
  });

  JSLitmus.test('_.map()', function() {
    return _.map(objects, '__value.num'); 
    		//function(obj){ return obj.num; });
  });
  
  JSLitmus.test('_.map() - original', function() {
	  return _.map(objects, function(obj){ return obj.num; });
  });

  if (0)
  JSLitmus.test('jQuery.map()', function() {
    return jQuery.map(objects, function(obj){ return obj.num; });
  });

/*
  JSLitmus.test('_.pluck()', function() {
    return _.pluck(objects, 'num');
  });

  JSLitmus.test('_.uniq()', function() {
    return _.uniq(randomized);
  });

  JSLitmus.test('_.uniq() (sorted)', function() {
    return _.uniq(numbers, true);
  });
*/
  
  JSLitmus.test('_.sortBy()', function() {
    return _.sortBy(numbers, '- __value'); 
    		//function(num){ return -num; });
  });

  JSLitmus.test('_.sortBy() - original ', function() {
	  return _.sortBy(numbers, function(num){ return -num; });
  });

  /*
  JSLitmus.test('_.isEqual()', function() {
    return _.isEqual(numbers, randomized);
  });

  JSLitmus.test('_.keys()', function() {
    return _.keys(objects);
  });

  JSLitmus.test('_.values()', function() {
    return _.values(objects);
  });

  JSLitmus.test('_.intersect()', function() {
    return _.intersect(numbers, randomized);
  });

  JSLitmus.test('_.range()', function() {
    return _.range(1000);
  });
*/
  
})();