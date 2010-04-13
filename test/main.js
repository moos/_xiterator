// _xiterator main test suite

(window.addEventListener || window.attachEvent)(window.attachEvent?'onload':'load',function(){

	var aNumbers = [1,2,3,4],
		aStrings = ['a','b','c','d'],
		aMixed = [1,'a',2,'b'],
		aArray = [[1,2],[3,4]],
		aHash = [{a:1, b:2}, {c:3, d:4}];

	var oNumbers = {a:1,b:2,c:3,d:4},
		oStrings = {a:'a',b:'b',c:'c',d:'d'},
		oMixed = {a:1,b:'a',c:2,d:'b'},
		oArray = {a:[1,2],b:[3,4]},
		oHash = {a:{a:1, b:2}, b:{c:3, d:4}};

	
	if (0) {
	module("Sandbox!!!!");	// ----------------------
	test("sandbox", function() {

		var tests = [
		    {a: aNumbers	,pass: '== 1'},
		    {a: aNumbers	,pass: '/\\d+/'},
		    {a: aNumbers	,pass: /\d+/},
		    {a: aMixed		,pass: /[A-Z]+/i},
		    {a: ['a ','b']	,pass: /\s/},
		];
		runTests('_.detect', tests);

		equals(_(aNumbers).detect('isEven'), 2,'deteted isEven');

		same(_(aNumbers).map('isEven'), [false, true, false, true],'map isEven');
		same(_(aNumbers).map('isEven'), [false, true, false, true],'map isEven');
		same(_(aNumbers).map('> 2 && isEven'), [false, false, false, true],'map > 2 && isEven');
		same(_(aNumbers).map('__value * 2'), [2,4,6,8],'map * 2');

	});
	return;
	}

	
	 
	module("Expressions");	// ----------------------

	test("relational operators on array", function() {
		var tests = [
		    {a: aNumbers	,pass: '== 1'},
		    {a: aNumbers	,pass: '=== 1'},
		    {a: aNumbers	,pass: '!= 1'},
		    {a: aNumbers	,pass: '!== 1'},
		    {a: aNumbers	,pass: '< 2'},
		    {a: aNumbers	,pass: '<= 2'},
		    {a: aNumbers	,pass: '> 3'},
		    {a: aNumbers	,pass: '>= 3'},
		];
		runTests('_.any', tests);
	});

	test("relational operators on object", function() {
		var tests = [
		    {a: oNumbers	,pass: '== 1'},
		    {a: oNumbers	,pass: '=== 1'},
		    {a: oNumbers	,pass: '!= 1'},
		    {a: oNumbers	,pass: '!== 1'},
		    {a: oNumbers	,pass: '< 2'},
		    {a: oNumbers	,pass: '<= 2'},
		    {a: oNumbers	,pass: '> 3'},
		    {a: oNumbers	,pass: '>= 3'},
		];
		runTests('_.any', tests);
	});
		 
	test("relational operators: misc", function() {
		var tests = [
		    {a: aMixed		,pass: '== 1 || == "a"'},
		    {a: aArray		,fail: '== [1,2]', m:'can\'t compare arrays '},
		    {a: aStrings	,pass: '!= "z"'},
		    {a: aStrings	,pass: 'isString'},
		    {a: aStrings	,fail: '! isString'},
		    {a: aStrings	,pass: '! ! isString'},
		];
		runTests('_.any', tests);
	});
		 
		 
	test("logical operators", function() {
		var tests = [
		    {a: aNumbers	,pass: '>0 && < 10'},
		    {a: aNumbers	,fail: '<0 || > 50'},
		    {a: aNumbers	,pass: '>0 && < 10 && !isString'},
		    {a: aNumbers	,pass: '<0 || > 50 || isNumber'},
		];
		runTests('_.all', tests);
	});

	test("Underscore native isXXX", function() {
		var tests = [
		    {a: aNumbers	,pass: 'isNumber'},
		    {a: aStrings	,pass: 'isString'},
		    {a: aArray		,pass: 'isArray'},
		    {a: [true,false],pass: 'isBoolean'},
		    {a: [new Date()],pass: 'isDate', m:'arg is [new Date()]'},
		    {a: [NaN]		,pass: 'isNaN'},
		    {a: [document.body]		,pass: 'isElement'},
		    {a: [[],{}]		,pass: 'isEmpty'},
		    {a: [].push(arguments)	,pass: 'isArguments', m:'arg is [].push(arguments)'},
		    {a: [F,G]		,pass: 'isFunction', m:'F & G are global functions'},
		    {a: [/abc/]		,pass: 'isRegExp'},
		    {a: [null]		,pass: 'isNull'},
		    {a: [undefined]	,pass: 'isUndefined'},
		    {a: [[1,2]]		,fail: 'isEqual [1,2]',m:'can\'t use isEqual because it takes 2 args'},
		];
		runTests('_.all', tests);
	});

	test("Add-on isXXX", function() {
		var tests = [
		    {a: [1,3,5]		,pass: 'isOdd'},
		    {a: [2,4,6]		,pass: 'isEven'},
		    {a: ['',' ','\t']	,pass: 'isBlank'},
		];
		runTests('_.all', tests);
	});

	test("custom functions & methods", function() {
		var tests = [
			{a: aNumbers	,pass: 'isNumber && my_isPositive(__value)' },
			{a: [1,2,3,-4]	,fail: 'isNumber && my_isPositive(__value)' },
			{a: aNumbers	,fail: 'my_isPositive()' , m:'must pass __value argument to custom functions'},
			{a: aStrings	,pass: 'isString && Validator.beginsWith(__value,"[a-z]") ', m:'method invocation'},
			{a: aStrings	,pass: 'isString && Validator["beginsWith"](__value,"[a-z]") ', m:'property invocation' },
			{a: [[1,2]]		,pass: 'my_isEqual(__value,[1,2])', m:'custom isEqual'},
			{a: [{a:1,b:2}]	,pass: 'my_isEqual(__value,{a:1,b:2})', m:'custom isEqual'},
		];
		runTests('_.all', tests);
	});

	test("parenthesis", function() {
		var tests = [
			{a: aMixed		,pass: '(isNumber && < 10 ) || (isString && !isEmpty)'},
			{a: aMixed		,fail: '! ((isNumber && < 10 ) || (isString && !isEmpty))'},
		];
		runTests('_.all', tests);
	});	

	test("regular expressions: stand-alone", function() {
		var tests = [
 			{a: aNumbers	,pass: '/\\d+/', m:'as string'},
 			{a: aNumbers	,pass: ' /\\d+/i '},
 			{a: aNumbers	,pass: /\d+/i, m:'RegExp object'},
 			{a: aMixed		,pass: 'isString || /wrong/', m:'WRONG!! - need explicit .test(__value)'},
		];
		runTests('_.all', tests);
	});	

	test("regular expressions: composite", function() {
		var tests = [
 			{a: aNumbers	,pass: '/\\d+/.test(__value)'},
 			{a: aMixed		,pass: 'isString || /\\d+/.test(__value)'},
 			{a: aMixed		,pass: 'isNumber || /[a-z]/.test(__value)'},
		];
		runTests('_.all', tests);
	});	

	test("comments", function() {
		var tests = [
			{a: aMixed		,pass: '1 /* ignore me */ && true'},
			{a: aMixed		,fail: '1 /* ignore me */ && false'},
			{a: aMixed		,pass: 'true // ignore rest || false'},
			{a: aMixed		,fail: 'false // ignore rest || true'},
		];
		runTests('_.all', tests);
	});	


	test("miscelleneous:", function() {
		var tests = [
			{a: [1,2]		,pass: 'isNumber && > -10', m:'negative numbers' },
			{a: [-1,-20]	,fail: '> 0' },
			{a: aNumbers	,pass: '++ >= 0', m:'++ __value >= 0 (increment)' },
			{a: aNumbers	,pass: '-- >= 0', m:'-- __value >= 0 (decrement)' },
			{a: aNumbers	,pass: '+ > 0', m:'+ __value > 0 (unary plus)' },
			{a: aNumbers	,pass: '- < 0', m:'- __value < 0 (unary minus)' },
			{a: aStrings	,pass: '[1,4].length && !isEmpty', m:'object scoping' },
			{a: aMixed		,pass: '(isNumber && < - 1+60 * 4 ) || (isString && !isEmpty)' , m:'arithmatic'},
			];
		runTests('_.all', tests);
	});	


	module("any / some");	// ----------------------

	test("misc", function() {
		var tests = [
			{a: aNumbers	,pass: '>= 0 && < 70' },
			{a: aNumbers	,fail: '< 0' },
			{a: aNumbers	,fail: '< 0 || > 100' },
			{a: oNumbers	,pass: '>0 && <10' },
			{a: oStrings	,pass: '/[a-z]/' },
		];
		runTests('_.any', tests);
		runTests('_.some', tests);
	});

	test("non-string iterator (base behavior)", function() {
		var tests = [
			{a: aNumbers	,pass: function(n){return n >= 0 && n < 70;} },
			{a: aNumbers	,fail: function(n){return false;} },
			{a: aNumbers	,pass: false },
			{a: aNumbers	,pass: null },
			{a: aNumbers	,pass: undefined },
		];
		runTests('_.any', tests);
		// expect exceptions!
		withException('_.any', [{a: aNumbers	,fail: 1, m: 'number' }]);
		withException('_.any', [{a: aNumbers	,fail: true, m: 'boolean true' }]);
		withException('_.any', [{a: aNumbers	,fail: {}, m:'object' }]);
		withException('_.any', [{a: aNumbers	,fail: [], m:'empty array' }]);
	});
	
		
	module("all / every"); // ----------------------

	test("misc", function() {
		var tests = [
			{a: aNumbers	,pass: 'isNumber && >= 0 && < 70' },
			{a: aMixed		,pass: 'isNumber || !isBlank' },
			{a: aNumbers	,fail: 'isNumber && isString' },
			{a: {a:2,b:'c'}		,pass: 'isNumber || isString && !isEmpty' },
			{a: {a:2,b:'c'}		,pass: '(isNumber && >0) || isString && !isEmpty' },
			{a: {a:2,b:''}		,fail: 'isNumber || isString && !isEmpty' },
			{a: _({a:2,b:'c'}).keys()	,pass: '!isNumber && !isEmpty' },
		];
		runTests('_.all', tests);
		runTests('_.every', tests);
	});

	test("non-string iterator (base behavior)", function() {
		var tests = [
			{a: aNumbers	,pass: function(n){return n >= 0 && n < 70;} },
			{a: aNumbers	,fail: function(n){return false;} },
			{a: aNumbers	,pass: false },
			{a: aNumbers	,pass: null },
			{a: aNumbers	,pass: undefined },
		];
		runTests('_.all', tests);
		// expect exceptions!
		withException('_.all', [{a: aNumbers	,fail: 1, m: 'number' }]);
		withException('_.all', [{a: aNumbers	,fail: true, m: 'boolean true' }]);
		withException('_.all', [{a: aNumbers	,fail: {}, m:'object' }]);
		withException('_.all', [{a: aNumbers	,fail: [], m:'empty array' }]);
	});
	

	module('access base methods');  // ----------------------
	
	test("_.any()", function() {
		var tests = [
		     {a: aNumbers	,pass:  trueIterator},
		   ];
		runTests('_.any()', tests);
		withException('_.any()', [{a: aNumbers	,fail: 'boo', m:'string iterator on base method' }]);
	});
	
	test("_.some()", function() {
		var tests = [
		     {a: aNumbers	,pass:  trueIterator},
		   ];
		runTests('_.some()', tests);
		withException('_.some()', [{a: aNumbers	,fail: 'boo', m:'string iterator on base method' }]);
	});
	
	test("_.all()", function() {
		var tests = [
		     {a: aNumbers	,pass:  trueIterator},
		   ];
		runTests('_.all()', tests);
		withException('_.all()', [{a: aNumbers	,fail: 'boo', m:'string iterator on base method' }]);
	});
	
	test("_.every()", function() {
		var tests = [
		     {a: aNumbers	,pass:  trueIterator},
		   ];
		runTests('_.every()', tests);
		withException('_.every()', [{a: aNumbers	,fail: 'boo', m:'string iterator on base method' }]);
	});

	
	module('misc');  // ----------------------
	
	test("_.noConfilct()", function() {

		_.noConflict();
		ok(underscore.isUndefined(_), '_ is undefined');
		var tests = [
				     {a: aNumbers	,pass:  trueIterator},
				     {a: aNumbers	,pass:  'isNumber'},
				   ];
		runTests('underscore.all', tests);

	    answers = [];
	    underscore.each([1, 2, 3], 'answers.push(__value * this.multiplier)', {multiplier : 5});
	    equals(answers.join(', '), '5, 10, 15', 'with context, context._ implicitly defined after noConflict');

	    try{
		    answers = [];
		    underscore.each([1, 2, 3], 'isNumber && answers.push(__value * this.multiplier)', {multiplier : 5, _ : 'boo'});
		    ok(false, 'with context, context._ is preserved'); 
	    } catch(e) {
	    	ok(true, 'bad context._ should throw exception. ' + e);
	    }

	    answers = [];
	    underscore.each([1, 2, 3], 'answers.push(__value * this.multiplier)', {multiplier : 5, _ : underscore});
	    equals(answers.join(', '), '5, 10, 15', 'defined explicit context._ after noConflict');

		_ = underscore.noConflict();
	});

	test("expressions are evaluated in global context", function() {
		function F_local(){ return true;};
		var var_local = '10';
		withException('_.all', [{a: aNumbers	,fail:  'F_local(__value)', m:'local function'}]);
		withException('_.all', [{a: aNumbers	,fail:  '< var_local', m:'local variable'}]);
	});
	
}, false);

