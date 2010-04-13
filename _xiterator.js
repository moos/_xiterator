/*!
* _xiterator.js
* 
* 	"expression iterator" extension for Underscore javascript library
* 
* Copyright (c) 2010 
* http://github.com/moos/_xiterator
* Released under MIT license
* 
* Version 0.1 - Last updated: 2010.04.12
*/

/**
 * <p>
 * _xiterator.js is an extension of Underscore that allows string expression iterators.
 * Any of the Underscore methods that take a function iterator as the 2nd argument, will
 * now be able to accept a string expression.  
 *
 * Methods updated: each forEach map detect select filter reject all every any some max min sortBy times 
 *
 * Usage:
 *    <script type="text/javascript" src="underscore.js"></script>
 *    <script type="text/javascript" src="_xiterator.js"></script>
 *
 *  <script type="text/javascript" >
 *  _.any([1,2],"isNumber"); // true
 *  _.any([1,2],"!isNumber"); // false
 *  _.any([1,'as'],'isEmpty'); // false
 *  _.any([1,'   '],'isBlank'); // true
 *  _.any([1,3],'>= 4'); // false
 *  _.any([1,3,'boo'],'< 4 && !isEmpty'); // true
 *  _.any([0,-1,3],'!isEmpty && > 0'); // true
 *  _.all([0,'',false],'false'); // true
 *  </script>
 *
 * without the string argument, these methods take a function iterator and work as before.
 * The variables '__value', '__key', and '__list' are available in the expression and refer to 
 * the formal arguments of the iterator.
 *
 * Tested on IE8, FF3, Safari 4, Chrome 4.
 *
 * </p>
 */

;(function(_){

	var root = this;
	
	// these underscore methods take iterator as 2nd argument
	var iteratorMethods = "each forEach map detect select filter reject all every any some max min sortBy times"; 

	// TODO: as 3rd arg: reduce inject foldl reduceRight foldr sortedIndex
	
	var base_map = _.map;
	
	function override(base, obj, iterator, context){
		
		// alias base method if needed, ie, _.any()
		if (arguments.length === 1)
			return base;
		
		// revert to base if not a string or RegExp
		var re = false;
		if (!_.isString(iterator) && !(re = _.isRegExp(iterator)) ) {
			var args = _.rest(arguments);	// drop 1st arg
			return base.apply(obj, args);
		}
		
		// expression iterator is run in global scope, make sure we 
		// can find _ in case _.noConflict() was called
		this._ = _;	// local reference 
		var global_ = '((_ && _.isFunction && _) || (this._))';
		if (context && context._ && !context._.isFunction)
			throw 'TypeError: context._ doesn\'t appear to be proper Underscore object'; 
				
		if (context && !('_' in context))
			context._ = _;

		var ops = [];
	
		// check for stand-alone regexp
		re = re || /^\/.*\/[a-z]*$/i.test(iterator = trim(iterator));
		if (re) {
			ops.push(iterator + ".test(__value)");
		} else {
			// process tokens to operations
			var relOps = new RegExp('<=|<|>=|>|==|===|!=|!==');
			var tokens = iterator.split(/(\s+|\b)/);
			base_map(tokens, function(e,i){
				if (e === '') return;
				var ee; 
				if ((ee = trim(e)) === '') 
					return ops.push(e);
				
				e = ee;
				var negate = e[0] === '!' && e[1] !== '=';
				if (negate){
					e = e.substr(1);
					ops.push('!');
				}
				// _.isXXX() ?
				if ( e.substr(0,2) === 'is' 
						&& e in _ 
						&& typeof _[e] === 'function'
					){
					ops.push(global_ + '["' + e +'"](__value)');
				}
				// relational operators ?
				else if (relOps.test(e)) {
					ops.push(' __value ' + e);	// inject virtual operand
				}
				else {
					ops.push(e);
				}
			});
		}
		//console.log(ops);
		
		// define iterator to process operations -- NOTE: evaluated in global scope!
		var newIterator;
		newIterator = new Function('__value', '__key', '__list', 'return ' + ops.join(''));

		newIterator = _.bind(newIterator, context || this);
		
		// return base method with new iterator
		return base(obj, newIterator, context);
	}
	
	
	function override_curry(base){
		return _.bind(override, {}, base);
	}
	
	function trim(str){
		if (String.prototype.trim) return str.trim();
	    // http://yesudeep.wordpress.com/2009/07/31/even-faster-string-prototype-trim-implementation-in-javascript/
		var str = str.replace(/^\s\s*/, ''),
	        ws = /\s/,
	        i = str.length;
	    while (ws.test(str.charAt(--i)));
	    return str.slice(0, i + 1);
	}
	
	var exports = {};
	_.each(iteratorMethods.split(/\s+/), function(method){
		exports[method] = override_curry(_[method]);
	});
	
	_.extend(exports,{
	
		/**
		 * _.isBlank
		 * check for blank string
		 */
		isBlank : function(obj){
			return (obj === null || trim(''+obj) === '');		  
		},
		  
		/**
		 * _.isOdd
		 * is a number odd
		 */
		isOdd : function(obj){
			return (obj !== null && (Number(obj) % 2) === 1);
		},
			
		/**
		 * _.isEvent
		 * is a number even
		 */
		isEven : function(obj){
			return (obj !== null && (Number(obj) % 2) === 0);
		},
		
	});
	

	// add to _
	_.mixin(exports);


})(_)
