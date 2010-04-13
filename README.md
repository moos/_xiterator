# _xiterator.js

_xiterator is an extension to the [Underscore](http://documentcloud.github.com/underscore/) Javascript "utility-belt" that allows 
"expression iterators" in place of a function iterator.

Any of the Underscore methods that accept an iterator as the second argument can be used with an expression iterator, including:
 
	_.each() _.forEach() _.map() _.detect() _.select() 	_.filter() _.reject()
	_.all() _.every() _.any() _.some() _.max() _.min() _.sortBy() _.times()
 
Run [Test suite](http://moos.github.com/_xiterator) and see [Blog post](http://blog.42at.com/_xiterator).
 
## Usage

	<script type="text/javascript" src="underscore.js"></script>
	<script type="text/javascript" src="_xiterator.js"></script>

Tested on IE8, FF3, Safari 4, Chrome 4.
 
## Basic expressions

In place of a function iterator,
	
		_.any([1,2,3], function(num){return num > 0;})	// function iterator
		
just pass a string expression:
		 	
		_.any([1,2,3], ">0")	// expression iterator

The expression is evaluated for every iteration of the input object.

Works on objects too:	

		_.any({a:1, b:2, c:3}, ">0")	// => true
	 
Or using the OO calling convention:

		_([1,2,3]).any(">0")	// => true

All the standar Javascript relational operators are suppported: <= < >= > == === != !==	 

### Composite operations

Logical operators:

		_any([1,2,3], ">0 && <10")

		_all([1,2,3], "== -1 || >0")

Parenthetical expressions:

		_any([1,2,3], "(isNumber && >0) || (isString && != '')")
			
			
###  _.isXXX() type-checking

Any of the _.isXXX() type-checking methods* may be used as:

		_any([1,2,3], "isNumber")
		
...is equivalent to
	 
		_any([1,2,3], function(num){return _.isNumber(num);});

Or in combination:

		_any([1,2,3], "isNumber || isString")

		_any([1,2,3], "isNumber && >0")

In addition three new methods have been added: **`_.isEven()`**, **`_.isOdd()`**, and **`_.isBlank()`**

		_any([1,2,3], "isEven") // => true

		_all([1,2,3], "isOdd") // => false

		_all(['','  ','\t'], "isBlank") // => true (all whitespace)

(* Except _.isEqual() which takes two arguments)

### Negation

Use `!` for negation:

		_any([1,2,3], "!isString")	// => true

		_all([1,2,3], "!isString && !isDate ")	// => true
		

### Regular expressions

Stand-alone regular expressions can be used as is:

		_any([1,2,3], /[a-z]/i)		

or in a string:

		_any([1,2,3], "/\\d+/")		// note escaped \
		
In a composite operation, the regular expression **must explicity include** the .test(__value) part:

		_all([1,2,3], "!isUndefined && /\\d+/.test(__value)")
		
`__value` is a placeholder for the iterator variable. 		


## Iterator variables

The expression can access the three standard arguments of the iterator via the variables `__value`, `__key`, and `__list` 
(see Underscore docs).  Eg:

		_.map([1,2,3], ' __value * 2')	// => [2,4,6] 
		
		_.each([1,2,3], '_.include(__list, __value)')
  
`__key` is the numeric index for arrays and the actual key for objects.


## Global Scope

The function generated to evaluate the expression is run in the global scope.  So reference to local variables or functions should be avoided.  Eg:

		function test(){
			var x = 10;
			_any([1,2,3], "< x") // => throws an exception, x is undefined
		} 

If `x` is defined globally, its value will be used:  **GOTCHA WARNING!!** 

		x = 0;
		function test(){
			var x = 10;
			_any([1,2,3], "< x") // => false (x=0 is used)
		} 

## Original methods

Any of the original methods can be accessed by calling the method
with no arguments, eg:

		var oMap = _.map();	
		oMap([1,2,3],function(){...}) 
		
or:

		_.any()([1,2,3], function(){...})
		
		_([1,2,3]).any()(function(){...})

Experssions cannot be used with original methods:
		
		oMap([1,2,3],"__value * 2") // => Exception: iterator is not a function
		
		
## Performance

Being this is an expression parser and string manipulation is involved,
there will be performance hit.  Although effort has been made to optimize performance,
for large-scale operations, use the original methods per above.

## Limitations

As part of the expression evaluation, the relational operators (<, <=, ==, etc.)
are preceded by the `__value` variable and returned as part of newly formed iterator function:

		"<0"   ==>  return __value <0;
		
This effectively limits their use. Hence

		"x <0"	==>  return x __value <0;   // invalid expression
		
A semicolon cannot be used in the expression, but a comma operator can:

		"x=10; <0"	// invalid
		
		"x=10, <0"	// valid		

Complicated expressions are best kept as iterator functions.		 


## License

Released under MIT license.  Free to use.
