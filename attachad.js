/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//static.prototypes.ru/boxdigital/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _index = __webpack_require__(2);

	__webpack_require__(92).polyfill();


	var Imp = new _index.Impostor();

	(function (win, doc) {

		var isMobile = {
			Android: function Android() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function BlackBerry() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function iOS() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function Opera() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function Windows() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			Linux: function Linux() {
				return navigator.userAgent.match(/Linux/i);
			},
			any: function any() {
				return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
			}
		};

		//TODO:: пока не показываем рекламу на ios
		if (isMobile.iOS()) return;

		function addScript(url, type, callback) {
			var script = null;
			if (type == 'js') {
				script = doc.createElement('script');
				script.type = "text/javascript";
				script.src = url;
				script.charset = "utf-8";
				script.async = false;
			} else if (type == 'css') {
				//css файлов пока нет, но вдруг пригодится 
				script = doc.createElement('link');
				script.type = "text/css";
				script.href = url;
				script.rel = "stylesheet";
			}

			if (callback && typeof callback == "function") script.onload = callback;

			doc.head.appendChild(script);
		};

		var domain = win.location.hostname.replace('www.', '');

		//Добавляем конфиг площадки
		// addScript('//ad-plugin-configs.qa.prototypes.ru/config/'+domain+'.js', 'js')
		// addScript('//configs-static.prototypes.ru/'+domain+'.js', 'js');

		//Проверяем наличие adBlock
		var adPromise = new Promise(function (resolve, reject) {

			var img = doc.createElement('img');
			img.id = "addetect";
			img.style.display = 'none';
			// img.src = "//static.prototypes.ru/boxdigital/img/ad.gif";
			img.src = "//static.prototypes.ru/boxdigital/img/ad.gif"; //FIXME: Нужно заменить домен на боевой при выкладке
			doc.body.appendChild(img);
			resolve();
		}).then(function () {

			setTimeout(function () {
				var pict = doc.getElementById('addetect');
				if (!pict) {
					return; //Замечен адблок, прерываем выполнение
				}

				// Всё ок, запускаем подмену функционала
				Imp.run(win, doc);
			}, 1000);
		});
	})(window, document);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * https://github.com/es-shims/es5-shim
	 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
	 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
	 */

	// vim: ts=4 sts=4 sw=4 expandtab

	// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
	;

	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
	(function (root, factory) {
	    'use strict';

	    /* global define, exports, module */
	    if (false) {
	        // AMD. Register as an anonymous module.
	        define(factory);
	    } else if (true) {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.returnExports = factory();
	    }
	}(this, function () {
	    /**
	     * Brings an environment as close to ECMAScript 5 compliance
	     * as is possible with the facilities of erstwhile engines.
	     *
	     * Annotated ES5: http://es5.github.com/ (specific links below)
	     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
	     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
	     */

	    // Shortcut to an often accessed properties, in order to avoid multiple
	    // dereference that costs universally. This also holds a reference to known-good
	    // functions.
	    var $Array = Array;
	    var ArrayPrototype = $Array.prototype;
	    var $Object = Object;
	    var ObjectPrototype = $Object.prototype;
	    var $Function = Function;
	    var FunctionPrototype = $Function.prototype;
	    var $String = String;
	    var StringPrototype = $String.prototype;
	    var $Number = Number;
	    var NumberPrototype = $Number.prototype;
	    var array_slice = ArrayPrototype.slice;
	    var array_splice = ArrayPrototype.splice;
	    var array_push = ArrayPrototype.push;
	    var array_unshift = ArrayPrototype.unshift;
	    var array_concat = ArrayPrototype.concat;
	    var array_join = ArrayPrototype.join;
	    var call = FunctionPrototype.call;
	    var apply = FunctionPrototype.apply;
	    var max = Math.max;
	    var min = Math.min;

	    // Having a toString local variable name breaks in Opera so use to_string.
	    var to_string = ObjectPrototype.toString;

	    /* global Symbol */
	    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
	    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };

	    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
	    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
	    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

	    /* inlined from http://npmjs.com/define-properties */
	    var supportsDescriptors = $Object.defineProperty && (function () {
	        try {
	            var obj = {};
	            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
	                return false;
	            }
	            return obj.x === obj;
	        } catch (e) { /* this is ES3 */
	            return false;
	        }
	    }());
	    var defineProperties = (function (has) {
	        // Define configurable, writable, and non-enumerable props
	        // if they don't exist.
	        var defineProperty;
	        if (supportsDescriptors) {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                $Object.defineProperty(object, name, {
	                    configurable: true,
	                    enumerable: false,
	                    writable: true,
	                    value: method
	                });
	            };
	        } else {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                object[name] = method;
	            };
	        }
	        return function defineProperties(object, map, forceAssign) {
	            for (var name in map) {
	                if (has.call(map, name)) {
	                    defineProperty(object, name, map[name], forceAssign);
	                }
	            }
	        };
	    }(ObjectPrototype.hasOwnProperty));

	    //
	    // Util
	    // ======
	    //

	    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
	    var isPrimitive = function isPrimitive(input) {
	        var type = typeof input;
	        return input === null || (type !== 'object' && type !== 'function');
	    };

	    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
	        return x !== x;
	    };

	    var ES = {
	        // ES5 9.4
	        // http://es5.github.com/#x9.4
	        // http://jsperf.com/to-integer
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
	        ToInteger: function ToInteger(num) {
	            var n = +num;
	            if (isActualNaN(n)) {
	                n = 0;
	            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	                n = (n > 0 || -1) * Math.floor(Math.abs(n));
	            }
	            return n;
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
	        ToPrimitive: function ToPrimitive(input) {
	            var val, valueOf, toStr;
	            if (isPrimitive(input)) {
	                return input;
	            }
	            valueOf = input.valueOf;
	            if (isCallable(valueOf)) {
	                val = valueOf.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            toStr = input.toString;
	            if (isCallable(toStr)) {
	                val = toStr.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            throw new TypeError();
	        },

	        // ES5 9.9
	        // http://es5.github.com/#x9.9
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
	        ToObject: function (o) {
	            if (o == null) { // this matches both null and undefined
	                throw new TypeError("can't convert " + o + ' to object');
	            }
	            return $Object(o);
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
	        ToUint32: function ToUint32(x) {
	            return x >>> 0;
	        }
	    };

	    //
	    // Function
	    // ========
	    //

	    // ES-5 15.3.4.5
	    // http://es5.github.com/#x15.3.4.5

	    var Empty = function Empty() {};

	    defineProperties(FunctionPrototype, {
	        bind: function bind(that) { // .length is 1
	            // 1. Let Target be the this value.
	            var target = this;
	            // 2. If IsCallable(Target) is false, throw a TypeError exception.
	            if (!isCallable(target)) {
	                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	            }
	            // 3. Let A be a new (possibly empty) internal list of all of the
	            //   argument values provided after thisArg (arg1, arg2 etc), in order.
	            // XXX slicedArgs will stand in for "A" if used
	            var args = array_slice.call(arguments, 1); // for normal call
	            // 4. Let F be a new native ECMAScript object.
	            // 11. Set the [[Prototype]] internal property of F to the standard
	            //   built-in Function prototype object as specified in 15.3.3.1.
	            // 12. Set the [[Call]] internal property of F as described in
	            //   15.3.4.5.1.
	            // 13. Set the [[Construct]] internal property of F as described in
	            //   15.3.4.5.2.
	            // 14. Set the [[HasInstance]] internal property of F as described in
	            //   15.3.4.5.3.
	            var bound;
	            var binder = function () {

	                if (this instanceof bound) {
	                    // 15.3.4.5.2 [[Construct]]
	                    // When the [[Construct]] internal method of a function object,
	                    // F that was created using the bind function is called with a
	                    // list of arguments ExtraArgs, the following steps are taken:
	                    // 1. Let target be the value of F's [[TargetFunction]]
	                    //   internal property.
	                    // 2. If target has no [[Construct]] internal method, a
	                    //   TypeError exception is thrown.
	                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Construct]] internal
	                    //   method of target providing args as the arguments.

	                    var result = apply.call(
	                        target,
	                        this,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );
	                    if ($Object(result) === result) {
	                        return result;
	                    }
	                    return this;

	                } else {
	                    // 15.3.4.5.1 [[Call]]
	                    // When the [[Call]] internal method of a function object, F,
	                    // which was created using the bind function is called with a
	                    // this value and a list of arguments ExtraArgs, the following
	                    // steps are taken:
	                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                    //   property.
	                    // 3. Let target be the value of F's [[TargetFunction]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Call]] internal method
	                    //   of target providing boundThis as the this value and
	                    //   providing args as the arguments.

	                    // equiv: target.call(this, ...boundArgs, ...args)
	                    return apply.call(
	                        target,
	                        that,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );

	                }

	            };

	            // 15. If the [[Class]] internal property of Target is "Function", then
	            //     a. Let L be the length property of Target minus the length of A.
	            //     b. Set the length own property of F to either 0 or L, whichever is
	            //       larger.
	            // 16. Else set the length own property of F to 0.

	            var boundLength = max(0, target.length - args.length);

	            // 17. Set the attributes of the length own property of F to the values
	            //   specified in 15.3.5.1.
	            var boundArgs = [];
	            for (var i = 0; i < boundLength; i++) {
	                array_push.call(boundArgs, '$' + i);
	            }

	            // XXX Build a dynamic function with desired amount of arguments is the only
	            // way to set the length property of a function.
	            // In environments where Content Security Policies enabled (Chrome extensions,
	            // for ex.) all use of eval or Function costructor throws an exception.
	            // However in all of these environments Function.prototype.bind exists
	            // and so this code will never be executed.
	            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

	            if (target.prototype) {
	                Empty.prototype = target.prototype;
	                bound.prototype = new Empty();
	                // Clean up dangling references.
	                Empty.prototype = null;
	            }

	            // TODO
	            // 18. Set the [[Extensible]] internal property of F to true.

	            // TODO
	            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	            // 20. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	            //   false.
	            // 21. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	            //   and false.

	            // TODO
	            // NOTE Function objects created using Function.prototype.bind do not
	            // have a prototype property or the [[Code]], [[FormalParameters]], and
	            // [[Scope]] internal properties.
	            // XXX can't delete prototype in pure-js.

	            // 22. Return F.
	            return bound;
	        }
	    });

	    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
	    // use it in defining shortcuts.
	    var owns = call.bind(ObjectPrototype.hasOwnProperty);
	    var toStr = call.bind(ObjectPrototype.toString);
	    var arraySlice = call.bind(array_slice);
	    var arraySliceApply = apply.bind(array_slice);
	    /* globals document */
	    if (typeof document === 'object' && document && document.documentElement) {
	        try {
	            arraySlice(document.documentElement.childNodes);
	        } catch (e) {
	            var origArraySlice = arraySlice;
	            var origArraySliceApply = arraySliceApply;
	            arraySlice = function arraySliceIE(arr) {
	                var r = [];
	                var i = arr.length;
	                while (i-- > 0) {
	                    r[i] = arr[i];
	                }
	                return origArraySliceApply(r, origArraySlice(arguments, 1));
	            };
	            arraySliceApply = function arraySliceApplyIE(arr, args) {
	                return origArraySliceApply(arraySlice(arr), args);
	            };
	        }
	    }
	    var strSlice = call.bind(StringPrototype.slice);
	    var strSplit = call.bind(StringPrototype.split);
	    var strIndexOf = call.bind(StringPrototype.indexOf);
	    var pushCall = call.bind(array_push);
	    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
	    var arraySort = call.bind(ArrayPrototype.sort);

	    //
	    // Array
	    // =====
	    //

	    var isArray = $Array.isArray || function isArray(obj) {
	        return toStr(obj) === '[object Array]';
	    };

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.13
	    // Return len+argCount.
	    // [bugfix, ielt8]
	    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
	    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
	    defineProperties(ArrayPrototype, {
	        unshift: function () {
	            array_unshift.apply(this, arguments);
	            return this.length;
	        }
	    }, hasUnshiftReturnValueBug);

	    // ES5 15.4.3.2
	    // http://es5.github.com/#x15.4.3.2
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	    defineProperties($Array, { isArray: isArray });

	    // The IsCallable() check in the Array functions
	    // has been replaced with a strict check on the
	    // internal class of the object to trap cases where
	    // the provided function was actually a regular
	    // expression literal, which in V8 and
	    // JavaScriptCore is a typeof "function".  Only in
	    // V8 are regular expression literals permitted as
	    // reduce parameters, so it is desirable in the
	    // general case for the shim to match the more
	    // strict and common behavior of rejecting regular
	    // expressions.

	    // ES5 15.4.4.18
	    // http://es5.github.com/#x15.4.4.18
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

	    // Check failure of by-index access of string characters (IE < 9)
	    // and failure of `0 in boxedString` (Rhino)
	    var boxedString = $Object('a');
	    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

	    var properlyBoxesContext = function properlyBoxed(method) {
	        // Check node 0.6.21 bug where third parameter is not boxed
	        var properlyBoxesNonStrict = true;
	        var properlyBoxesStrict = true;
	        var threwException = false;
	        if (method) {
	            try {
	                method.call('foo', function (_, __, context) {
	                    if (typeof context !== 'object') {
	                        properlyBoxesNonStrict = false;
	                    }
	                });

	                method.call([1], function () {
	                    'use strict';

	                    properlyBoxesStrict = typeof this === 'string';
	                }, 'x');
	            } catch (e) {
	                threwException = true;
	            }
	        }
	        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
	    };

	    defineProperties(ArrayPrototype, {
	        forEach: function forEach(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var i = -1;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.forEach callback must be a function');
	            }

	            while (++i < length) {
	                if (i in self) {
	                    // Invoke the callback function with call, passing arguments:
	                    // context, property value, property key, thisArg object
	                    if (typeof T === 'undefined') {
	                        callbackfn(self[i], i, object);
	                    } else {
	                        callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	        }
	    }, !properlyBoxesContext(ArrayPrototype.forEach));

	    // ES5 15.4.4.19
	    // http://es5.github.com/#x15.4.4.19
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
	    defineProperties(ArrayPrototype, {
	        map: function map(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = $Array(length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.map callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    if (typeof T === 'undefined') {
	                        result[i] = callbackfn(self[i], i, object);
	                    } else {
	                        result[i] = callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.map));

	    // ES5 15.4.4.20
	    // http://es5.github.com/#x15.4.4.20
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
	    defineProperties(ArrayPrototype, {
	        filter: function filter(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = [];
	            var value;
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.filter callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    value = self[i];
	                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
	                        pushCall(result, value);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.filter));

	    // ES5 15.4.4.16
	    // http://es5.github.com/#x15.4.4.16
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	    defineProperties(ArrayPrototype, {
	        every: function every(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.every callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.every));

	    // ES5 15.4.4.17
	    // http://es5.github.com/#x15.4.4.17
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	    defineProperties(ArrayPrototype, {
	        some: function some(callbackfn/*, thisArg */) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.some callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.some));

	    // ES5 15.4.4.21
	    // http://es5.github.com/#x15.4.4.21
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
	    var reduceCoercesToObject = false;
	    if (ArrayPrototype.reduce) {
	        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduce: function reduce(callbackfn/*, initialValue*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduce callback must be a function');
	            }

	            // no value to return if no initial value and an empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduce of empty array with no initial value');
	            }

	            var i = 0;
	            var result;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i++];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (++i >= length) {
	                        throw new TypeError('reduce of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            for (; i < length; i++) {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            }

	            return result;
	        }
	    }, !reduceCoercesToObject);

	    // ES5 15.4.4.22
	    // http://es5.github.com/#x15.4.4.22
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
	    var reduceRightCoercesToObject = false;
	    if (ArrayPrototype.reduceRight) {
	        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduceRight: function reduceRight(callbackfn/*, initial*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduceRight callback must be a function');
	            }

	            // no value to return if no initial value, empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduceRight of empty array with no initial value');
	            }

	            var result;
	            var i = length - 1;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i--];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (--i < 0) {
	                        throw new TypeError('reduceRight of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            if (i < 0) {
	                return result;
	            }

	            do {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            } while (i--);

	            return result;
	        }
	    }, !reduceRightCoercesToObject);

	    // ES5 15.4.4.14
	    // http://es5.github.com/#x15.4.4.14
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	    defineProperties(ArrayPrototype, {
	        indexOf: function indexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }

	            var i = 0;
	            if (arguments.length > 1) {
	                i = ES.ToInteger(arguments[1]);
	            }

	            // handle negative indices
	            i = i >= 0 ? i : max(0, length + i);
	            for (; i < length; i++) {
	                if (i in self && self[i] === searchElement) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2IndexOfBug);

	    // ES5 15.4.4.15
	    // http://es5.github.com/#x15.4.4.15
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
	    defineProperties(ArrayPrototype, {
	        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }
	            var i = length - 1;
	            if (arguments.length > 1) {
	                i = min(i, ES.ToInteger(arguments[1]));
	            }
	            // handle negative indices
	            i = i >= 0 ? i : length - Math.abs(i);
	            for (; i >= 0; i--) {
	                if (i in self && searchElement === self[i]) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2LastIndexOfBug);

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.12
	    var spliceNoopReturnsEmptyArray = (function () {
	        var a = [1, 2];
	        var result = a.splice();
	        return a.length === 2 && isArray(result) && result.length === 0;
	    }());
	    defineProperties(ArrayPrototype, {
	        // Safari 5.0 bug where .splice() returns undefined
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            } else {
	                return array_splice.apply(this, arguments);
	            }
	        }
	    }, !spliceNoopReturnsEmptyArray);

	    var spliceWorksWithEmptyObject = (function () {
	        var obj = {};
	        ArrayPrototype.splice.call(obj, 0, 0, 1);
	        return obj.length === 1;
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            }
	            var args = arguments;
	            this.length = max(ES.ToInteger(this.length), 0);
	            if (arguments.length > 0 && typeof deleteCount !== 'number') {
	                args = arraySlice(arguments);
	                if (args.length < 2) {
	                    pushCall(args, this.length - start);
	                } else {
	                    args[1] = ES.ToInteger(deleteCount);
	                }
	            }
	            return array_splice.apply(this, args);
	        }
	    }, !spliceWorksWithEmptyObject);
	    var spliceWorksWithLargeSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
	        var arr = new $Array(1e5);
	        // note: the index MUST be 8 or larger or the test will false pass
	        arr[8] = 'x';
	        arr.splice(1, 1);
	        // note: this test must be defined *after* the indexOf shim
	        // per https://github.com/es-shims/es5-shim/issues/313
	        return arr.indexOf('x') === 7;
	    }());
	    var spliceWorksWithSmallSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Opera 12.15 breaks on this, no idea why.
	        var n = 256;
	        var arr = [];
	        arr[n] = 'a';
	        arr.splice(n + 1, 0, 'b');
	        return arr[n] === 'a';
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            var O = ES.ToObject(this);
	            var A = [];
	            var len = ES.ToUint32(O.length);
	            var relativeStart = ES.ToInteger(start);
	            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
	            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

	            var k = 0;
	            var from;
	            while (k < actualDeleteCount) {
	                from = $String(actualStart + k);
	                if (owns(O, from)) {
	                    A[k] = O[from];
	                }
	                k += 1;
	            }

	            var items = arraySlice(arguments, 2);
	            var itemCount = items.length;
	            var to;
	            if (itemCount < actualDeleteCount) {
	                k = actualStart;
	                var maxK = len - actualDeleteCount;
	                while (k < maxK) {
	                    from = $String(k + actualDeleteCount);
	                    to = $String(k + itemCount);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k += 1;
	                }
	                k = len;
	                var minK = len - actualDeleteCount + itemCount;
	                while (k > minK) {
	                    delete O[k - 1];
	                    k -= 1;
	                }
	            } else if (itemCount > actualDeleteCount) {
	                k = len - actualDeleteCount;
	                while (k > actualStart) {
	                    from = $String(k + actualDeleteCount - 1);
	                    to = $String(k + itemCount - 1);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k -= 1;
	                }
	            }
	            k = actualStart;
	            for (var i = 0; i < items.length; ++i) {
	                O[k] = items[i];
	                k += 1;
	            }
	            O.length = len - actualDeleteCount + itemCount;

	            return A;
	        }
	    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);

	    var originalJoin = ArrayPrototype.join;
	    var hasStringJoinBug;
	    try {
	        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
	    } catch (e) {
	        hasStringJoinBug = true;
	    }
	    if (hasStringJoinBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
	            }
	        }, hasStringJoinBug);
	    }

	    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
	    if (hasJoinUndefinedBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(this, sep);
	            }
	        }, hasJoinUndefinedBug);
	    }

	    var pushShim = function push(item) {
	        var O = ES.ToObject(this);
	        var n = ES.ToUint32(O.length);
	        var i = 0;
	        while (i < arguments.length) {
	            O[n + i] = arguments[i];
	            i += 1;
	        }
	        O.length = n + i;
	        return n + i;
	    };

	    var pushIsNotGeneric = (function () {
	        var obj = {};
	        var result = Array.prototype.push.call(obj, undefined);
	        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
	    }());
	    defineProperties(ArrayPrototype, {
	        push: function push(item) {
	            if (isArray(this)) {
	                return array_push.apply(this, arguments);
	            }
	            return pushShim.apply(this, arguments);
	        }
	    }, pushIsNotGeneric);

	    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
	    var pushUndefinedIsWeird = (function () {
	        var arr = [];
	        var result = arr.push(undefined);
	        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
	    }());
	    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

	    // ES5 15.2.3.14
	    // http://es5.github.io/#x15.4.4.10
	    // Fix boxed string bug
	    defineProperties(ArrayPrototype, {
	        slice: function (start, end) {
	            var arr = isString(this) ? strSplit(this, '') : this;
	            return arraySliceApply(arr, arguments);
	        }
	    }, splitString);

	    var sortIgnoresNonFunctions = (function () {
	        try {
	            [1, 2].sort(null);
	        } catch (e) {
	            try {
	                [1, 2].sort({});
	            } catch (e2) {
	                return false;
	            }
	        }
	        return true;
	    }());
	    var sortThrowsOnRegex = (function () {
	        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
	        try {
	            [1, 2].sort(/a/);
	            return false;
	        } catch (e) {}
	        return true;
	    }());
	    var sortIgnoresUndefined = (function () {
	        // applies in IE 8, for one.
	        try {
	            [1, 2].sort(undefined);
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    defineProperties(ArrayPrototype, {
	        sort: function sort(compareFn) {
	            if (typeof compareFn === 'undefined') {
	                return arraySort(this);
	            }
	            if (!isCallable(compareFn)) {
	                throw new TypeError('Array.prototype.sort callback must be a function');
	            }
	            return arraySort(this, compareFn);
	        }
	    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

	    //
	    // Object
	    // ======
	    //

	    // ES5 15.2.3.14
	    // http://es5.github.com/#x15.2.3.14

	    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString'); // jscs:ignore disallowQuotedKeysInObjects
	    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
	    var hasStringEnumBug = !owns('x', '0');
	    var equalsConstructorPrototype = function (o) {
	        var ctor = o.constructor;
	        return ctor && ctor.prototype === o;
	    };
	    var excludedKeys = {
	        $applicationCache: true,
	        $console: true,
	        $external: true,
	        $frame: true,
	        $frameElement: true,
	        $frames: true,
	        $innerHeight: true,
	        $innerWidth: true,
	        $onmozfullscreenchange: true,
	        $onmozfullscreenerror: true,
	        $outerHeight: true,
	        $outerWidth: true,
	        $pageXOffset: true,
	        $pageYOffset: true,
	        $parent: true,
	        $scrollLeft: true,
	        $scrollTop: true,
	        $scrollX: true,
	        $scrollY: true,
	        $self: true,
	        $webkitIndexedDB: true,
	        $webkitStorageInfo: true,
	        $window: true,

	        $width: true,
	        $height: true,
	        $top: true,
	        $localStorage: true
	    };
	    var hasAutomationEqualityBug = (function () {
	        /* globals window */
	        if (typeof window === 'undefined') {
	            return false;
	        }
	        for (var k in window) {
	            try {
	                if (!excludedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
	                    equalsConstructorPrototype(window[k]);
	                }
	            } catch (e) {
	                return true;
	            }
	        }
	        return false;
	    }());
	    var equalsConstructorPrototypeIfNotBuggy = function (object) {
	        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
	            return equalsConstructorPrototype(object);
	        }
	        try {
	            return equalsConstructorPrototype(object);
	        } catch (e) {
	            return false;
	        }
	    };
	    var dontEnums = [
	        'toString',
	        'toLocaleString',
	        'valueOf',
	        'hasOwnProperty',
	        'isPrototypeOf',
	        'propertyIsEnumerable',
	        'constructor'
	    ];
	    var dontEnumsLength = dontEnums.length;

	    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
	    // can be replaced with require('is-arguments') if we ever use a build process instead
	    var isStandardArguments = function isArguments(value) {
	        return toStr(value) === '[object Arguments]';
	    };
	    var isLegacyArguments = function isArguments(value) {
	        return value !== null
	            && typeof value === 'object'
	            && typeof value.length === 'number'
	            && value.length >= 0
	            && !isArray(value)
	            && isCallable(value.callee);
	    };
	    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

	    defineProperties($Object, {
	        keys: function keys(object) {
	            var isFn = isCallable(object);
	            var isArgs = isArguments(object);
	            var isObject = object !== null && typeof object === 'object';
	            var isStr = isObject && isString(object);

	            if (!isObject && !isFn && !isArgs) {
	                throw new TypeError('Object.keys called on a non-object');
	            }

	            var theKeys = [];
	            var skipProto = hasProtoEnumBug && isFn;
	            if ((isStr && hasStringEnumBug) || isArgs) {
	                for (var i = 0; i < object.length; ++i) {
	                    pushCall(theKeys, $String(i));
	                }
	            }

	            if (!isArgs) {
	                for (var name in object) {
	                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
	                        pushCall(theKeys, $String(name));
	                    }
	                }
	            }

	            if (hasDontEnumBug) {
	                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	                for (var j = 0; j < dontEnumsLength; j++) {
	                    var dontEnum = dontEnums[j];
	                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
	                        pushCall(theKeys, dontEnum);
	                    }
	                }
	            }
	            return theKeys;
	        }
	    });

	    var keysWorksWithArguments = $Object.keys && (function () {
	        // Safari 5.0 bug
	        return $Object.keys(arguments).length === 2;
	    }(1, 2));
	    var keysHasArgumentsLengthBug = $Object.keys && (function () {
	        var argKeys = $Object.keys(arguments);
	        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
	    }(1));
	    var originalKeys = $Object.keys;
	    defineProperties($Object, {
	        keys: function keys(object) {
	            if (isArguments(object)) {
	                return originalKeys(arraySlice(object));
	            } else {
	                return originalKeys(object);
	            }
	        }
	    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

	    //
	    // Date
	    // ====
	    //

	    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
	    var aNegativeTestDate = new Date(-1509842289600292);
	    var aPositiveTestDate = new Date(1449662400000);
	    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
	    var hasToDateStringFormatBug;
	    var hasToStringFormatBug;
	    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
	    if (timeZoneOffset < -720) {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
	        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/).test(String(aPositiveTestDate));
	    } else {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
	        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/).test(String(aPositiveTestDate));
	    }

	    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
	    var originalGetMonth = call.bind(Date.prototype.getMonth);
	    var originalGetDate = call.bind(Date.prototype.getDate);
	    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
	    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
	    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
	    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
	    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
	    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
	    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
	    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
	    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	    var daysInMonth = function daysInMonth(month, year) {
	        return originalGetDate(new Date(year, month, 0));
	    };

	    defineProperties(Date.prototype, {
	        getFullYear: function getFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            if (year < 0 && originalGetMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getMonth: function getMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getDate: function getDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            var date = originalGetDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        },
	        getUTCFullYear: function getUTCFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            if (year < 0 && originalGetUTCMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getUTCMonth: function getUTCMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getUTCDate: function getUTCDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            var date = originalGetUTCDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        }
	    }, hasNegativeMonthYearBug);

	    defineProperties(Date.prototype, {
	        toUTCString: function toUTCString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = originalGetUTCDay(this);
	            var date = originalGetUTCDate(this);
	            var month = originalGetUTCMonth(this);
	            var year = originalGetUTCFullYear(this);
	            var hour = originalGetUTCHours(this);
	            var minute = originalGetUTCMinutes(this);
	            var second = originalGetUTCSeconds(this);
	            return dayName[day] + ', '
	                + (date < 10 ? '0' + date : date) + ' '
	                + monthName[month] + ' '
	                + year + ' '
	                + (hour < 10 ? '0' + hour : hour) + ':'
	                + (minute < 10 ? '0' + minute : minute) + ':'
	                + (second < 10 ? '0' + second : second) + ' GMT';
	        }
	    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

	    // Opera 12 has `,`
	    defineProperties(Date.prototype, {
	        toDateString: function toDateString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            return dayName[day] + ' '
	                + monthName[month] + ' '
	                + (date < 10 ? '0' + date : date) + ' '
	                + year;
	        }
	    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

	    // can't use defineProperties here because of toString enumeration issue in IE <= 8
	    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
	        Date.prototype.toString = function toString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            var hour = this.getHours();
	            var minute = this.getMinutes();
	            var second = this.getSeconds();
	            var timezoneOffset = this.getTimezoneOffset();
	            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
	            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
	            return dayName[day] + ' '
	                + monthName[month] + ' '
	                + (date < 10 ? '0' + date : date) + ' '
	                + year + ' '
	                + (hour < 10 ? '0' + hour : hour) + ':'
	                + (minute < 10 ? '0' + minute : minute) + ':'
	                + (second < 10 ? '0' + second : second) + ' GMT'
	                + (timezoneOffset > 0 ? '-' : '+')
	                + (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset)
	                + (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
	        };
	        if (supportsDescriptors) {
	            $Object.defineProperty(Date.prototype, 'toString', {
	                configurable: true,
	                enumerable: false,
	                writable: true
	            });
	        }
	    }

	    // ES5 15.9.5.43
	    // http://es5.github.com/#x15.9.5.43
	    // This function returns a String value represent the instance in time
	    // represented by this Date object. The format of the String is the Date Time
	    // string format defined in 15.9.1.15. All fields are present in the String.
	    // The time zone is always UTC, denoted by the suffix Z. If the time value of
	    // this object is not a finite Number a RangeError exception is thrown.
	    var negativeDate = -62198755200000;
	    var negativeYearString = '-000001';
	    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1; // eslint-disable-line max-len
	    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

	    var getTime = call.bind(Date.prototype.getTime);

	    defineProperties(Date.prototype, {
	        toISOString: function toISOString() {
	            if (!isFinite(this) || !isFinite(getTime(this))) {
	                // Adope Photoshop requires the second check.
	                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
	            }

	            var year = originalGetUTCFullYear(this);

	            var month = originalGetUTCMonth(this);
	            // see https://github.com/es-shims/es5-shim/issues/111
	            year += Math.floor(month / 12);
	            month = ((month % 12) + 12) % 12;

	            // the date time string format is specified in 15.9.1.15.
	            var result = [
	                month + 1,
	                originalGetUTCDate(this),
	                originalGetUTCHours(this),
	                originalGetUTCMinutes(this),
	                originalGetUTCSeconds(this)
	            ];
	            year = (
	                (year < 0 ? '-' : (year > 9999 ? '+' : ''))
	                + strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
	            );

	            for (var i = 0; i < result.length; ++i) {
	                // pad months, days, hours, minutes, and seconds to have two digits.
	                result[i] = strSlice('00' + result[i], -2);
	            }
	            // pad milliseconds to have three digits.
	            return (
	                year + '-' + arraySlice(result, 0, 2).join('-')
	                + 'T' + arraySlice(result, 2).join(':') + '.'
	                + strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
	            );
	        }
	    }, hasNegativeDateBug || hasSafari51DateBug);

	    // ES5 15.9.5.44
	    // http://es5.github.com/#x15.9.5.44
	    // This function provides a String representation of a Date object for use by
	    // JSON.stringify (15.12.3).
	    var dateToJSONIsSupported = (function () {
	        try {
	            return Date.prototype.toJSON
	                && new Date(NaN).toJSON() === null
	                && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1
	                && Date.prototype.toJSON.call({ // generic
	                    toISOString: function () { return true; }
	                });
	        } catch (e) {
	            return false;
	        }
	    }());
	    if (!dateToJSONIsSupported) {
	        Date.prototype.toJSON = function toJSON(key) {
	            // When the toJSON method is called with argument key, the following
	            // steps are taken:

	            // 1.  Let O be the result of calling ToObject, giving it the this
	            // value as its argument.
	            // 2. Let tv be ES.ToPrimitive(O, hint Number).
	            var O = $Object(this);
	            var tv = ES.ToPrimitive(O);
	            // 3. If tv is a Number and is not finite, return null.
	            if (typeof tv === 'number' && !isFinite(tv)) {
	                return null;
	            }
	            // 4. Let toISO be the result of calling the [[Get]] internal method of
	            // O with argument "toISOString".
	            var toISO = O.toISOString;
	            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
	            if (!isCallable(toISO)) {
	                throw new TypeError('toISOString property is not callable');
	            }
	            // 6. Return the result of calling the [[Call]] internal method of
	            //  toISO with O as the this value and an empty argument list.
	            return toISO.call(O);

	            // NOTE 1 The argument is ignored.

	            // NOTE 2 The toJSON function is intentionally generic; it does not
	            // require that its this value be a Date object. Therefore, it can be
	            // transferred to other kinds of objects for use as a method. However,
	            // it does require that any such object have a toISOString method. An
	            // object is free to use the argument key to filter its
	            // stringification.
	        };
	    }

	    // ES5 15.9.4.2
	    // http://es5.github.com/#x15.9.4.2
	    // based on work shared by Daniel Friesen (dantman)
	    // http://gist.github.com/303249
	    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
	    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
	    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
	    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
	        // XXX global assignment won't work in embeddings that use
	        // an alternate object for the context.
	        /* global Date: true */
	        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
	        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
	        // eslint-disable-next-line no-implicit-globals, no-global-assign
	        Date = (function (NativeDate) {
	            // Date.length === 7
	            var DateShim = function Date(Y, M, D, h, m, s, ms) {
	                var length = arguments.length;
	                var date;
	                if (this instanceof NativeDate) {
	                    var seconds = s;
	                    var millis = ms;
	                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
	                        // work around a Safari 8/9 bug where it treats the seconds as signed
	                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                        var sToShift = Math.floor(msToShift / 1e3);
	                        seconds += sToShift;
	                        millis -= sToShift * 1e3;
	                    }
	                    date = length === 1 && $String(Y) === Y // isString(Y)
	                        // We explicitly pass it through parse:
	                        ? new NativeDate(DateShim.parse(Y))
	                        // We have to manually make calls depending on argument
	                        // length here
	                        : length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis)
	                            : length >= 6 ? new NativeDate(Y, M, D, h, m, seconds)
	                                : length >= 5 ? new NativeDate(Y, M, D, h, m)
	                                    : length >= 4 ? new NativeDate(Y, M, D, h)
	                                        : length >= 3 ? new NativeDate(Y, M, D)
	                                            : length >= 2 ? new NativeDate(Y, M)
	                                                : length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y)
	                                                    : new NativeDate();
	                } else {
	                    date = NativeDate.apply(this, arguments);
	                }
	                if (!isPrimitive(date)) {
	                    // Prevent mixups with unfixed Date object
	                    defineProperties(date, { constructor: DateShim }, true);
	                }
	                return date;
	            };

	            // 15.9.1.15 Date Time String Format.
	            var isoDateExpression = new RegExp('^'
	                + '(\\d{4}|[+-]\\d{6})' // four-digit year capture or sign + 6-digit extended year
	                + '(?:-(\\d{2})' // optional month capture
	                + '(?:-(\\d{2})' // optional day capture
	                + '(?:' // capture hours:minutes:seconds.milliseconds
	                    + 'T(\\d{2})' // hours capture
	                    + ':(\\d{2})' // minutes capture
	                    + '(?:' // optional :seconds.milliseconds
	                        + ':(\\d{2})' // seconds capture
	                        + '(?:(\\.\\d{1,}))?' // milliseconds capture
	                    + ')?'
	                + '(' // capture UTC offset component
	                    + 'Z|' // UTC capture
	                    + '(?:' // offset specifier +/-hours:minutes
	                        + '([-+])' // sign capture
	                        + '(\\d{2})' // hours offset capture
	                        + ':(\\d{2})' // minutes offset capture
	                    + ')'
	                + ')?)?)?)?'
	            + '$');

	            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

	            var dayFromMonth = function dayFromMonth(year, month) {
	                var t = month > 1 ? 1 : 0;
	                return (
	                    months[month]
	                    + Math.floor((year - 1969 + t) / 4)
	                    - Math.floor((year - 1901 + t) / 100)
	                    + Math.floor((year - 1601 + t) / 400)
	                    + (365 * (year - 1970))
	                );
	            };

	            var toUTC = function toUTC(t) {
	                var s = 0;
	                var ms = t;
	                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
	                    // work around a Safari 8/9 bug where it treats the seconds as signed
	                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                    var sToShift = Math.floor(msToShift / 1e3);
	                    s += sToShift;
	                    ms -= sToShift * 1e3;
	                }
	                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
	            };

	            // Copy any custom methods a 3rd party library may have added
	            for (var key in NativeDate) {
	                if (owns(NativeDate, key)) {
	                    DateShim[key] = NativeDate[key];
	                }
	            }

	            // Copy "native" methods explicitly; they may be non-enumerable
	            defineProperties(DateShim, {
	                now: NativeDate.now,
	                UTC: NativeDate.UTC
	            }, true);
	            DateShim.prototype = NativeDate.prototype;
	            defineProperties(DateShim.prototype, { constructor: DateShim }, true);

	            // Upgrade Date.parse to handle simplified ISO 8601 strings
	            var parseShim = function parse(string) {
	                var match = isoDateExpression.exec(string);
	                if (match) {
	                    // parse months, days, hours, minutes, seconds, and milliseconds
	                    // provide default values if necessary
	                    // parse the UTC offset component
	                    var year = $Number(match[1]),
	                        month = $Number(match[2] || 1) - 1,
	                        day = $Number(match[3] || 1) - 1,
	                        hour = $Number(match[4] || 0),
	                        minute = $Number(match[5] || 0),
	                        second = $Number(match[6] || 0),
	                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
	                        // When time zone is missed, local offset should be used
	                        // (ES 5.1 bug)
	                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
	                        isLocalTime = Boolean(match[4] && !match[8]),
	                        signOffset = match[9] === '-' ? 1 : -1,
	                        hourOffset = $Number(match[10] || 0),
	                        minuteOffset = $Number(match[11] || 0),
	                        result;
	                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
	                    if (
	                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25)
	                        && minute < 60 && second < 60 && millisecond < 1000
	                        && month > -1 && month < 12 && hourOffset < 24
	                        && minuteOffset < 60 // detect invalid offsets
	                        && day > -1
	                        && day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
	                    ) {
	                        result = (
	                            ((dayFromMonth(year, month) + day) * 24)
	                            + hour
	                            + (hourOffset * signOffset)
	                        ) * 60;
	                        result = ((
	                            ((result + minute + (minuteOffset * signOffset)) * 60)
	                            + second
	                        ) * 1000) + millisecond;
	                        if (isLocalTime) {
	                            result = toUTC(result);
	                        }
	                        if (-8.64e15 <= result && result <= 8.64e15) {
	                            return result;
	                        }
	                    }
	                    return NaN;
	                }
	                return NativeDate.parse.apply(this, arguments);
	            };
	            defineProperties(DateShim, { parse: parseShim });

	            return DateShim;
	        }(Date));
	        /* global Date: false */
	    }

	    // ES5 15.9.4.4
	    // http://es5.github.com/#x15.9.4.4
	    if (!Date.now) {
	        Date.now = function now() {
	            return new Date().getTime();
	        };
	    }

	    //
	    // Number
	    // ======
	    //

	    // ES5.1 15.7.4.5
	    // http://es5.github.com/#x15.7.4.5
	    var hasToFixedBugs = NumberPrototype.toFixed && (
	        (0.00008).toFixed(3) !== '0.000'
	        || (0.9).toFixed(0) !== '1'
	        || (1.255).toFixed(2) !== '1.25'
	        || (1000000000000000128).toFixed(0) !== '1000000000000000128'
	    );

	    var toFixedHelpers = {
	        base: 1e7,
	        size: 6,
	        data: [0, 0, 0, 0, 0, 0],
	        multiply: function multiply(n, c) {
	            var i = -1;
	            var c2 = c;
	            while (++i < toFixedHelpers.size) {
	                c2 += n * toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
	                c2 = Math.floor(c2 / toFixedHelpers.base);
	            }
	        },
	        divide: function divide(n) {
	            var i = toFixedHelpers.size;
	            var c = 0;
	            while (--i >= 0) {
	                c += toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = Math.floor(c / n);
	                c = (c % n) * toFixedHelpers.base;
	            }
	        },
	        numToString: function numToString() {
	            var i = toFixedHelpers.size;
	            var s = '';
	            while (--i >= 0) {
	                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
	                    var t = $String(toFixedHelpers.data[i]);
	                    if (s === '') {
	                        s = t;
	                    } else {
	                        s += strSlice('0000000', 0, 7 - t.length) + t;
	                    }
	                }
	            }
	            return s;
	        },
	        pow: function pow(x, n, acc) {
	            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
	        },
	        log: function log(x) {
	            var n = 0;
	            var x2 = x;
	            while (x2 >= 4096) {
	                n += 12;
	                x2 /= 4096;
	            }
	            while (x2 >= 2) {
	                n += 1;
	                x2 /= 2;
	            }
	            return n;
	        }
	    };

	    var toFixedShim = function toFixed(fractionDigits) {
	        var f, x, s, m, e, z, j, k;

	        // Test for NaN and round fractionDigits down
	        f = $Number(fractionDigits);
	        f = isActualNaN(f) ? 0 : Math.floor(f);

	        if (f < 0 || f > 20) {
	            throw new RangeError('Number.toFixed called with invalid number of decimals');
	        }

	        x = $Number(this);

	        if (isActualNaN(x)) {
	            return 'NaN';
	        }

	        // If it is too big or small, return the string value of the number
	        if (x <= -1e21 || x >= 1e21) {
	            return $String(x);
	        }

	        s = '';

	        if (x < 0) {
	            s = '-';
	            x = -x;
	        }

	        m = '0';

	        if (x > 1e-21) {
	            // 1e-21 < x < 1e21
	            // -70 < log2(x) < 70
	            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
	            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
	            z *= 0x10000000000000; // Math.pow(2, 52);
	            e = 52 - e;

	            // -18 < e < 122
	            // x = z / 2 ^ e
	            if (e > 0) {
	                toFixedHelpers.multiply(0, z);
	                j = f;

	                while (j >= 7) {
	                    toFixedHelpers.multiply(1e7, 0);
	                    j -= 7;
	                }

	                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
	                j = e - 1;

	                while (j >= 23) {
	                    toFixedHelpers.divide(1 << 23);
	                    j -= 23;
	                }

	                toFixedHelpers.divide(1 << j);
	                toFixedHelpers.multiply(1, 1);
	                toFixedHelpers.divide(2);
	                m = toFixedHelpers.numToString();
	            } else {
	                toFixedHelpers.multiply(0, z);
	                toFixedHelpers.multiply(1 << (-e), 0);
	                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
	            }
	        }

	        if (f > 0) {
	            k = m.length;

	            if (k <= f) {
	                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
	            } else {
	                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
	            }
	        } else {
	            m = s + m;
	        }

	        return m;
	    };
	    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

	    var hasToPrecisionUndefinedBug = (function () {
	        try {
	            return 1.0.toPrecision(undefined) === '1';
	        } catch (e) {
	            return true;
	        }
	    }());
	    var originalToPrecision = NumberPrototype.toPrecision;
	    defineProperties(NumberPrototype, {
	        toPrecision: function toPrecision(precision) {
	            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
	        }
	    }, hasToPrecisionUndefinedBug);

	    //
	    // String
	    // ======
	    //

	    // ES5 15.5.4.14
	    // http://es5.github.com/#x15.5.4.14

	    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	    // Many browsers do not split properly with regular expressions or they
	    // do not perform the split correctly under obscure conditions.
	    // See http://blog.stevenlevithan.com/archives/cross-browser-split
	    // I've tested in many browsers and this seems to cover the deviant ones:
	    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	    //       [undefined, "t", undefined, "e", ...]
	    //    ''.split(/.?/) should be [], not [""]
	    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

	    if (
	        'ab'.split(/(?:ab)*/).length !== 2
	        || '.'.split(/(.?)(.?)/).length !== 4
	        || 'tesst'.split(/(s)*/)[1] === 't'
	        || 'test'.split(/(?:)/, -1).length !== 4
	        || ''.split(/.?/).length
	        || '.'.split(/()()/).length > 1
	    ) {
	        (function () {
	            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
	            var maxSafe32BitInt = Math.pow(2, 32) - 1;

	            StringPrototype.split = function (separator, limit) {
	                var string = String(this);
	                if (typeof separator === 'undefined' && limit === 0) {
	                    return [];
	                }

	                // If `separator` is not a regex, use native split
	                if (!isRegex(separator)) {
	                    return strSplit(this, separator, limit);
	                }

	                var output = [];
	                var flags = (separator.ignoreCase ? 'i' : '')
	                            + (separator.multiline ? 'm' : '')
	                            + (separator.unicode ? 'u' : '') // in ES6
	                            + (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
	                    lastLastIndex = 0,
	                    // Make `global` and avoid `lastIndex` issues by working with a copy
	                    separator2, match, lastIndex, lastLength;
	                var separatorCopy = new RegExp(separator.source, flags + 'g');
	                if (!compliantExecNpcg) {
	                    // Doesn't need flags gy, but they don't hurt
	                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	                }
	                /* Values for `limit`, per the spec:
	                 * If undefined: 4294967295 // maxSafe32BitInt
	                 * If 0, Infinity, or NaN: 0
	                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	                 * If other: Type-convert, then use the above rules
	                 */
	                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
	                match = separatorCopy.exec(string);
	                while (match) {
	                    // `separatorCopy.lastIndex` is not reliable cross-browser
	                    lastIndex = match.index + match[0].length;
	                    if (lastIndex > lastLastIndex) {
	                        pushCall(output, strSlice(string, lastLastIndex, match.index));
	                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                        // nonparticipating capturing groups
	                        if (!compliantExecNpcg && match.length > 1) {
	                            /* eslint-disable no-loop-func */
	                            match[0].replace(separator2, function () {
	                                for (var i = 1; i < arguments.length - 2; i++) {
	                                    if (typeof arguments[i] === 'undefined') {
	                                        match[i] = void 0;
	                                    }
	                                }
	                            });
	                            /* eslint-enable no-loop-func */
	                        }
	                        if (match.length > 1 && match.index < string.length) {
	                            array_push.apply(output, arraySlice(match, 1));
	                        }
	                        lastLength = match[0].length;
	                        lastLastIndex = lastIndex;
	                        if (output.length >= splitLimit) {
	                            break;
	                        }
	                    }
	                    if (separatorCopy.lastIndex === match.index) {
	                        separatorCopy.lastIndex++; // Avoid an infinite loop
	                    }
	                    match = separatorCopy.exec(string);
	                }
	                if (lastLastIndex === string.length) {
	                    if (lastLength || !separatorCopy.test('')) {
	                        pushCall(output, '');
	                    }
	                } else {
	                    pushCall(output, strSlice(string, lastLastIndex));
	                }
	                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
	            };
	        }());

	    // [bugfix, chrome]
	    // If separator is undefined, then the result array contains just one String,
	    // which is the this value (converted to a String). If limit is not undefined,
	    // then the output array is truncated so that it contains no more than limit
	    // elements.
	    // "0".split(undefined, 0) -> []
	    } else if ('0'.split(void 0, 0).length) {
	        StringPrototype.split = function split(separator, limit) {
	            if (typeof separator === 'undefined' && limit === 0) {
	                return [];
	            }
	            return strSplit(this, separator, limit);
	        };
	    }

	    var str_replace = StringPrototype.replace;
	    var replaceReportsGroupsCorrectly = (function () {
	        var groups = [];
	        'x'.replace(/x(.)?/g, function (match, group) {
	            pushCall(groups, group);
	        });
	        return groups.length === 1 && typeof groups[0] === 'undefined';
	    }());

	    if (!replaceReportsGroupsCorrectly) {
	        StringPrototype.replace = function replace(searchValue, replaceValue) {
	            var isFn = isCallable(replaceValue);
	            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
	            if (!isFn || !hasCapturingGroups) {
	                return str_replace.call(this, searchValue, replaceValue);
	            } else {
	                var wrappedReplaceValue = function (match) {
	                    var length = arguments.length;
	                    var originalLastIndex = searchValue.lastIndex;
	                    searchValue.lastIndex = 0;
	                    var args = searchValue.exec(match) || [];
	                    searchValue.lastIndex = originalLastIndex;
	                    pushCall(args, arguments[length - 2], arguments[length - 1]);
	                    return replaceValue.apply(this, args);
	                };
	                return str_replace.call(this, searchValue, wrappedReplaceValue);
	            }
	        };
	    }

	    // ECMA-262, 3rd B.2.3
	    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	    // non-normative section suggesting uniform semantics and it should be
	    // normalized across all browsers
	    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	    var string_substr = StringPrototype.substr;
	    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	    defineProperties(StringPrototype, {
	        substr: function substr(start, length) {
	            var normalizedStart = start;
	            if (start < 0) {
	                normalizedStart = max(this.length + start, 0);
	            }
	            return string_substr.call(this, normalizedStart, length);
	        }
	    }, hasNegativeSubstrBug);

	    // ES5 15.5.4.20
	    // whitespace from: http://es5.github.io/#x15.5.4.20
	    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003'
	        + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028'
	        + '\u2029\uFEFF';
	    var zeroWidth = '\u200b';
	    var wsRegexChars = '[' + ws + ']';
	    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	    defineProperties(StringPrototype, {
	        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	        // http://perfectionkills.com/whitespace-deviations/
	        trim: function trim() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	        }
	    }, hasTrimWhitespaceBug);
	    var trim = call.bind(String.prototype.trim);

	    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var S = $String(this);
	            var searchStr = $String(searchString);
	            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
	            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
	            var start = min(max(pos, 0), S.length);
	            var searchLen = searchStr.length;
	            var k = start + searchLen;
	            while (k > 0) {
	                k = max(0, k - searchLen);
	                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
	                if (index !== -1) {
	                    return k + index;
	                }
	            }
	            return -1;
	        }
	    }, hasLastIndexBug);

	    var originalLastIndexOf = StringPrototype.lastIndexOf;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            return originalLastIndexOf.apply(this, arguments);
	        }
	    }, StringPrototype.lastIndexOf.length !== 1);

	    // ES-5 15.1.2.2
	    // eslint-disable-next-line radix
	    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
	        /* global parseInt: true */
	        parseInt = (function (origParseInt) {
	            var hexRegex = /^[-+]?0[xX]/;
	            return function parseInt(str, radix) {
	                if (typeof str === 'symbol') {
	                    // handle Symbols in node 8.3/8.4
	                    // eslint-disable-next-line no-implicit-coercion, no-unused-expressions
	                    '' + str; // jscs:ignore disallowImplicitTypeConversion
	                }

	                var string = trim(String(str));
	                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
	                return origParseInt(string, defaultedRadix);
	            };
	        }(parseInt));
	    }

	    // https://es5.github.io/#x15.1.2.3
	    if (1 / parseFloat('-0') !== -Infinity) {
	        /* global parseFloat: true */
	        parseFloat = (function (origParseFloat) {
	            return function parseFloat(string) {
	                var inputString = trim(String(string));
	                var result = origParseFloat(inputString);
	                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
	            };
	        }(parseFloat));
	    }

	    if (String(new RangeError('test')) !== 'RangeError: test') {
	        var errorToStringShim = function toString() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var name = this.name;
	            if (typeof name === 'undefined') {
	                name = 'Error';
	            } else if (typeof name !== 'string') {
	                name = $String(name);
	            }
	            var msg = this.message;
	            if (typeof msg === 'undefined') {
	                msg = '';
	            } else if (typeof msg !== 'string') {
	                msg = $String(msg);
	            }
	            if (!name) {
	                return msg;
	            }
	            if (!msg) {
	                return name;
	            }
	            return name + ': ' + msg;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        Error.prototype.toString = errorToStringShim;
	    }

	    if (supportsDescriptors) {
	        var ensureNonEnumerable = function (obj, prop) {
	            if (isEnum(obj, prop)) {
	                var desc = Object.getOwnPropertyDescriptor(obj, prop);
	                if (desc.configurable) {
	                    desc.enumerable = false;
	                    Object.defineProperty(obj, prop, desc);
	                }
	            }
	        };
	        ensureNonEnumerable(Error.prototype, 'message');
	        if (Error.prototype.message !== '') {
	            Error.prototype.message = '';
	        }
	        ensureNonEnumerable(Error.prototype, 'name');
	    }

	    if (String(/a/mig) !== '/a/gim') {
	        var regexToString = function toString() {
	            var str = '/' + this.source + '/';
	            if (this.global) {
	                str += 'g';
	            }
	            if (this.ignoreCase) {
	                str += 'i';
	            }
	            if (this.multiline) {
	                str += 'm';
	            }
	            return str;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        RegExp.prototype.toString = regexToString;
	    }
	}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Impostor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(1);

	var _admodule = __webpack_require__(3);

	var _adpanel = __webpack_require__(89);

	var _adplayer = __webpack_require__(91);

	var _hostsData = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	window['prototypes.ru debug']=!0;
	document.body.appendChild(document.createElement('script')).src="//galexey.prototypes.ru/boxdigital/attachad.js";
	['boxdigital_ru_last_starting','boxdigital_ru_last_playing'].forEach(function(v){localStorage.removeItem(v)});
	*/
	/*
	window['prototypes.ru debug']=!0;
	(n=>n.parentNode.insertBefore(document.createElement('script'),n).src="//galexey.prototypes.ru/boxdigital/attachad.js")(document.scripts[0])
	*/
	//const VASTURL = 'http://ads.adfox.ru/230620/getCode?pp=g&ps=cegk&p2=fcmk&pfc=a&pfb=a&plp=a&pli=a&pop=a&puid1=&puid2=&puid3=&puid4=';
	/*
	window['prototypes.ru debug']=!0;
	(n=>n.parentNode.insertBefore(document.createElement('script'),n).src="//static.sukhanov.dev.prototypes.ru/boxdigital/attachad.js")(document.scripts[0])
	 */

	var Impostor = exports.Impostor = function () {
	    function Impostor() {
	        _classCallCheck(this, Impostor);
	    }

	    _createClass(Impostor, [{
	        key: 'run',
	        value: function run(win, doc) {
	            var domain = location.hostname.indexOf('www.') === 0 ? location.hostname.replace('www.', '') : location.hostname;
	            var platform_conf = (0, _hostsData.hostsData)(domain);
	            var adPlayer = new _adplayer.AdPlayer();
	            var adModule = new _admodule.AdModule(adPlayer);
	            var adPanel = new _adpanel.AdPanel(adPlayer, platform_conf);

	            new Image().src = "//cs.digitalbox.ru/rm";

	            var lastSrc = '',
	                keyName = 'boxdigital_ru_last_playing',
	                keyLastStarting = 'boxdigital_ru_last_starting',
	                adPlayingObj = null;

	            var protoPixel = {
	                send: function send(act, track) {
	                    // var d = platform_conf;

	                    if (platform_conf.getTrackname != undefined) {
	                        var track = track ? track : platform_conf.getTrackname();

	                        if (track != undefined) {
	                            var xmlUrl = platform_conf.splitUrl;
	                            var splitted = xmlUrl.split('puid1='),
	                                pos = splitted[1].search('&'),
	                                plid = splitted[1].substring(0, pos);
	                            new Image().src = "http://cs.prototypes.ru/r?plid=" + plid + "&a=" + act + "&t=" + track;
	                        }
	                    }
	                },

	                parseTrack: function parseTrack(src) {
	                    var separated = src.split('/'),
	                        track = separated[separated.length - 1].length > 0 ? separated[separated.length - 1] : separated[separated.length - 2];
	                    return track;
	                }
	            };

	            var onResize = function onResize() {};
	            var onResizeTimer;
	            var skipPlayAdCounter = 0;
	            var _initAd = function initAd() {
	                var $coverAd = jQuery(adPanel._container),
	                    $shieldAd = jQuery('<div id="__adplugshield__">');

	                $shieldAd.css({ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000 });

	                adModule.handleAdError = function (e) {
	                    //console.log('handleAdError', e);
	                    adPlayingObj && adPlayingObj.onEndAd && adPlayingObj.onEndAd();
	                    if (win['cantPlayDigitalBoxAd']) {
	                        win['cantPlayDigitalBoxAd']();
	                    } else if (adPlayingObj) {
	                        adPlayingObj.resume();
	                    }
	                    adPlayingObj = null;
	                };
	                adModule.handleAdEnded = function (e) {
	                    // console.log('handleAdEnded', e);
	                    if (adPlayingObj) {
	                        adPlayingObj.resume();
	                        adPanel.hide();
	                    }
	                    adPlayingObj = null;
	                };
	                adModule.handleAdStop = function (e) {
	                    // console.log('handleAdStop', e);
	                    if (adPlayingObj) {
	                        adPlayingObj.resume();
	                        adPanel.hide();
	                        $shieldAd.detach();
	                    }
	                    adPlayingObj = null;
	                };
	                adModule.handleAdPlay = function (vastTracker, mediaFile) {

	                    var $container,
	                        oDim,
	                        d = platform_conf;
	                    if (!adPlayingObj) return;
	                    storage.setItem(keyName, '' + (new Date() - 0));
	                    lastSrc = adPlayingObj.url;

	                    $container = adPlayingObj.$container || jQuery(d.getContainer && d.getContainer(adPlayingObj));

	                    adPanel.show(vastTracker, $container[0], adModule.bannerParams);

	                    onResize = function onResize() {

	                        var pos = $container.css('position');
	                        var top, bottom, left;
	                        var css = d.css ? jQuery.isFunction(d.css) ? d.css($container) : d.css : {};

	                        // left = 'left' in css ? css.left : $container.position().left;
	                        left = css.left;

	                        // $coverAd.css( jQuery.extend(
	                        //     pos === 'fixed' ? {'position': pos} : {},
	                        //     {
	                        //         'height': Math.min(
	                        //             d.height || $container.outerHeight(),
	                        //             jQuery(window).height()
	                        //         ),
	                        //         'width': Math.min(
	                        //             d.width || $container.outerWidth(),
	                        //             jQuery(window).width()
	                        //         )
	                        //     },
	                        //     css
	                        // ) );
	                    };
	                    onResize();

	                    if (d.shieldPage) {
	                        jQuery('body').append($shieldAd);
	                    }

	                    if ($coverAd[0].scrollIntoViewIfNeeded) {
	                        $coverAd[0].scrollIntoViewIfNeeded(true);
	                    } else if ($coverAd[0].scrollIntoView) {
	                        $coverAd[0].scrollIntoView();
	                    }
	                };
	                // кастомный пиксель на % проигрывания
	                adModule.handleAdCustomPixel = function (progress) {
	                    var points = adModule.customPixelBreakpoints;
	                    if (points && points[progress]) {
	                        // console.log('triggering pixel ' + progress);
	                        new Image().src = points[progress];
	                    }
	                };
	                // adModule.customPixelBreakpoints = platform_conf.customPixels;
	                adModule.customVolume = typeof platform_conf.customVolume == 'function' ? platform_conf.customVolume() : platform_conf.customVolume;
	                _initAd = function initAd() {};
	            };
	            var waitBeforePlayAd;
	            function runAd(sUrl) {
	                var d = platform_conf;
	                var res = d && lastSrc != sUrl;

	                if (res) {
	                    if (d.splitUrl && jQuery.isFunction(d.splitUrl)) {
	                        d.splitUrl = d.splitUrl();
	                    }
	                    if (jQuery.isFunction(d.startPlayingMode)) {
	                        d.startPlayingMode = d.startPlayingMode(adPlayingObj);
	                    }
	                    switch (d.startPlayingMode) {
	                        case '1/4':
	                            if (++skipPlayAdCounter !== 4) {
	                                res = false;
	                            }
	                            skipPlayAdCounter %= 4;
	                        case '1':
	                            break;
	                        case 'after2min':
	                            lastSrc = sUrl;
	                            res = res && new Date() - waitBeforePlayAd > 2 * 60 * 1000;
	                        case 'immediately':
	                            var delay = 20 * 60 * 1000;
	                            if ('frequency' in d) {
	                                delay = d.frequency * 60 * 1000;
	                            }

	                            res = res && storage.getItem(keyName) - 0 < new Date() - delay;
	                            break;
	                    }
	                }

	                if (res || win['prototypes.ru debug']) {
	                    _initAd();
	                    new Image().src = '//rs.mail.ru/d20802152.gif';
	                    adModule.noSetTime = true;
	                    adModule.setDeviceInfo = true;

	                    res = adModule.loadPromise(location.protocol + d.splitUrl
	                    // location.protocol + '//static.kshirokiy.dev.prototypes.ru/boxdigital/vast.xml?puid1=180&puid2=&puid3=1&puid4=1&puid5=&eid1=interakt&dl='
	                    // location.protocol + '//sbutov.prototypes.ru/boxdigital/test-adv.xml?puid1=186&puid2=&puid3=1&puid4=1&puid5=&eid1=interakt&eid2=&dl='
	                    // location.protocol + '//localhost:3000/vast.xml?puid1=180&puid2=&puid3=1&puid4=1&puid5=&eid1=interakt&dl='
	                    // location.protocol + '//orbry.prototypes.ru/adplugin/vast.xml?puid1=180&puid2=&puid3=1&puid4=1&puid5=&eid1=interakt&dl='
	                    ).then(adModule.play, adModule.error);
	                } else {
	                    adPlayingObj = null;
	                    window.adPlayingObj = null; // специально для musicday.me
	                }
	                return res;
	            }
	            function init() {
	                var i, o;
	                if (!win.jQuery) return;
	                jQuery(window).bind('resize mouseout scroll', function () {
	                    clearTimeout(onResizeTimer);
	                    onResizeTimer = setTimeout(function () {
	                        adPlayingObj && onResize();
	                    }, 30);
	                });
	                waitBeforePlayAd = storage.getItem(keyLastStarting);
	                if (!waitBeforePlayAd || new Date() - waitBeforePlayAd > 60 * 60 * 1000) {
	                    waitBeforePlayAd = '' + (new Date() - 0);
	                    storage.setItem(keyLastStarting, waitBeforePlayAd);
	                }

	                if (domain != 'radiorecord.ru') {
	                    if (win.threeSixtyPlayer) {
	                        (function (o) {
	                            var storedHandleClick = o.handleClick,
	                                timer;
	                            o.handleClick = function (e) {
	                                var trg = o.getTheDamnLink(e);
	                                if (adPlayingObj) return;
	                                storedHandleClick.apply(o, arguments);
	                                if (o.lastSound.paused || !jQuery.contains(o.lastSound._360data.oUI360, trg)) return;
	                                var sUrl = o.lastSound.url;
	                                adPlayingObj = {
	                                    //$container: jQuery(o.lastSound._360data.oUI360).closest('.news'),
	                                    url: sUrl,
	                                    resume: function resume() {
	                                        o.lastSound.resume();
	                                    }
	                                };
	                                var playPromise = runAd(adPlayingObj.url);
	                                if (playPromise && adPlayingObj) {
	                                    playPromise.then(function () {
	                                        clearTimeout(timer);
	                                        timer = setTimeout(function () {
	                                            o.lastSound.pause();
	                                        }, 1);
	                                    }, function () {});
	                                }
	                            };
	                        })(threeSixtyPlayer);
	                    } else if (win.soundManager) {
	                        var soundManagerReplacePlay = function soundManagerReplacePlay(id) {
	                            var o = soundManager.getSoundById(id),
	                                storedPlay = o.play;
	                            o.play = function () {
	                                var res;
	                                res = storedPlay.apply(o, arguments);
	                                if (adPlayingObj) {
	                                    adPlayingObj.resume = function () {

	                                        console.log('TRY RESUME - RES - ', res);

	                                        soundManager.getSoundById(res.id).resume();
	                                    };
	                                    // soundManager.getSoundById(res.id).pause();
	                                } else {
	                                    adPlayingObj = {
	                                        url: o.url,
	                                        soundManagerId: id,
	                                        resume: function resume() {
	                                            console.log('TRY RESUME - id - ', id);

	                                            soundManager.getSoundById(id).resume();
	                                        }
	                                    };

	                                    var playPromise = runAd(adPlayingObj.url);
	                                    if (playPromise && adPlayingObj) {
	                                        playPromise.then(function () {
	                                            adPlayingObj && soundManager.getSoundById(id).pause();
	                                        }, function () {});
	                                    }
	                                }
	                                return res;
	                            };
	                        };

	                        jQuery.each(soundManager.soundIDs, function (i, v) {
	                            soundManagerReplacePlay(v);
	                        });
	                        (function (o, m) {
	                            var stored = o[m];

	                            o[m] = function () {
	                                var res,
	                                    b = arguments[0].autoLoad,
	                                    a = arguments[0].autoPlay;
	                                arguments[0].autoLoad = false;
	                                arguments[0].autoPlay = false;
	                                res = stored.apply(o, arguments);
	                                soundManagerReplacePlay(res.id);
	                                a && res.play();
	                                if (adPlayingObj) {
	                                    res.playState != 1 || res.pause();
	                                } else {
	                                    b && res.playState != 1 && res.play();
	                                }

	                                return res;
	                            };
	                        })(soundManager, 'createSound');
	                    }
	                }

	                (function () {
	                    function attach() {
	                        if (!jQuery.jPlayer) return false;
	                        // console.log('this is jPlayer');

	                        var lastUrl,
	                            isPlayAfterAd = false;
	                        jQuery(document).delegate('#jquery_jplayer', 'jPlayer.setFile', function (e, url) {
	                            lastUrl = url;
	                        });
	                        var p = jQuery.jPlayer.prototype,
	                            mediaIsClear = false,
	                            isPaused = false;
	                        p.clearMedia = function (lastClearMedia) {
	                            return function () {
	                                mediaIsClear = true;
	                                return lastClearMedia.apply(this, arguments);
	                            };
	                        }(p.clearMedia);

	                        //.jp-jplayer #jplayer_N удалил
	                        var jElement = jQuery('[id^="jquery_jplayer"], #pesniplayer, #audio-player, #main-player, #top-container > #player');

	                        if (jElement.on !== undefined) {
	                            jElement.on('jPlayer.play jPlayer_play', function (e) {
	                                if (!isPlayAfterAd) {
	                                    var $jp = jQuery(e.target),
	                                        t,
	                                        playPromise;
	                                    e.type == 'jPlayer_play' && (t = e.jPlayer) && (t = t.status) && (t = t.src);
	                                    if (t) {
	                                        lastUrl = t;
	                                    }
	                                    if (adPlayingObj) {
	                                        adPlayingObj.resume = function () {
	                                            isPlayAfterAd = true;
	                                            if (isPaused) {
	                                                if (mediaIsClear) {
	                                                    $jp.jPlayer("setMedia", e.jPlayer.status.media);
	                                                }
	                                                $jp.jPlayer("play");
	                                            }
	                                        };
	                                        $jp.jPlayer("pause");
	                                    } else {
	                                        mediaIsClear = false;
	                                        adPlayingObj = {
	                                            url: lastUrl,
	                                            resume: function resume() {
	                                                isPlayAfterAd = true;
	                                                if (isPaused) {
	                                                    if (mediaIsClear) {
	                                                        $jp.jPlayer("setMedia", e.jPlayer.status.media);
	                                                    }
	                                                    $jp.jPlayer("play");
	                                                }
	                                            }
	                                        };
	                                        playPromise = runAd(adPlayingObj.url);
	                                        if (playPromise && adPlayingObj) {
	                                            playPromise.then(function () {
	                                                isPaused = true;
	                                                $jp.jPlayer("pause");

	                                                // statistic pixels
	                                                jElement.on(jQuery.jPlayer.event.play, function (e) {
	                                                    if (platform_conf.getTrackname != undefined) {
	                                                        var trackName = platform_conf.getTrackname();
	                                                    }

	                                                    protoPixel.send('start', trackName);
	                                                    jElement.on(jQuery.jPlayer.event.pause, function (e) {
	                                                        protoPixel.send('pause', trackName);
	                                                    });

	                                                    jElement.on(jQuery.jPlayer.event.ended, function (e) {
	                                                        protoPixel.send('end', trackName);
	                                                    });
	                                                });
	                                            }, function () {
	                                                mediaIsClear = false;
	                                                isPaused = false;
	                                            });
	                                        }
	                                    }
	                                    isPlayAfterAd = false;
	                                } else {
	                                    mediaIsClear = false;
	                                }
	                                isPlayAfterAd = isPlayAfterAd && adPlayingObj;
	                            });
	                            return true;
	                        }
	                    }

	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();
	                (function () {
	                    var lastHandlePlay = window.handlePlay;

	                    window.handlePlay = function () {
	                        var $Player = jQuery('#topFlash[data$="pleer.swf"]'),
	                            isPlayAfterAd = false;

	                        if ($Player.closest('#topFlashContainer').length > 0) {
	                            // console.log('this is Flash player');
	                            window.handlePlay = function () {
	                                lastHandlePlay && lastHandlePlay.apply(window, arguments);
	                                if (!adPlayingObj && !isPlayAfterAd) {
	                                    adPlayingObj = {
	                                        url: $Player.find('[name="flashvars"]').attr('value'),
	                                        resume: function resume() {
	                                            isPlayAfterAd = true;
	                                            $Player[0].start();
	                                        }
	                                    };
	                                    var playPromise = runAd(adPlayingObj.url);
	                                    if (playPromise && adPlayingObj) {
	                                        playPromise.then(function () {
	                                            $Player[0].stop();
	                                        }, function () {});
	                                    }
	                                }
	                                isPlayAfterAd = false;
	                            };
	                            window.handlePlay.apply(window, arguments);
	                        } else {
	                            lastHandlePlay && lastHandlePlay.apply(window, arguments);
	                        }
	                    };
	                })();
	                (function () {
	                    // kibergrad side player
	                    function attachSidePlayer() {
	                        var res = false;
	                        window.require && window.require.specified('views/player') && function () {
	                            res = true;
	                            window.require(['views/player'], function (Player) {
	                                var play_original = Player.prototype.play,

	                                // кнопки play напротив песен + кнопки в плеере
	                                btns = jQuery('.icon.icon-list-play-pause.play-btn, .icon.icon-play-pause.play-btn, .icon.icon-prev, .icon.icon-next');

	                                Player.prototype.play = function () {
	                                    var _this = this;

	                                    play_original.apply(this, arguments);

	                                    if (adPlayingObj) return;
	                                    var track_id = this.model.get('id'),
	                                        playPromise;
	                                    adPlayingObj = {
	                                        url: track_id,
	                                        resume: function resume() {
	                                            btns.css({ display: 'inline-block' });
	                                            play_original.call(_this);
	                                        }
	                                    };

	                                    playPromise = runAd(adPlayingObj.url);
	                                    if (playPromise && adPlayingObj) {
	                                        playPromise.then(function () {
	                                            btns.css({ display: 'none' });
	                                            Player.prototype.pause.call(_this);
	                                        }, function () {});
	                                    }
	                                };
	                            });
	                        }();
	                        return res;
	                    }
	                    // kibergrad central player
	                    function attachCentralPlayer() {
	                        var res = false;
	                        window.require && window.require.specified('views/song/player') && function () {
	                            res = true;
	                            window.require(['views/song/player'], function (Player) {
	                                var play_original = Player.prototype.play;

	                                Player.prototype.play = function () {
	                                    var _this2 = this,
	                                        _arguments = arguments;

	                                    play_original.apply(this, arguments);

	                                    if (adPlayingObj) return;
	                                    var track_id = +window.location.pathname.match(/^\/(\d+)/)[1],
	                                        playPromise;
	                                    adPlayingObj = {
	                                        url: track_id,
	                                        resume: function resume() {
	                                            play_original.apply(_this2, _arguments);
	                                        }
	                                    };
	                                    playPromise = runAd(adPlayingObj.url);
	                                    if (playPromise && adPlayingObj) {
	                                        playPromise.then(function () {
	                                            Player.prototype.pause.apply(_this2, _arguments);
	                                        }, function () {});
	                                    }
	                                };
	                            });
	                        }();
	                        return res;
	                    }
	                    var count = 150;
	                    function dolbim() {
	                        --count && !(attachSidePlayer() || attachCentralPlayer()) && setTimeout(dolbim, 100);
	                    }
	                    dolbim();
	                })();
	                (function () {
	                    // clean <audio> w/o scripts
	                    var audioEls = jQuery('#allEntries .eTitle audio, #aplayerobj, .loveradio #player, .playlist__action audio, .audio_for_inline_player, .mdtc-clnplra-jplayer audio,' + ' .listen_radio audio, .audioplayer audio, .listen audio, .cp-jplayer audio, #audioPlayer, .audioplayer audio, #player, .player #audio, ' + ' #pleer audio, #UF_audio, #jqjp_audio_0, .cover audio'); //#jp_audio_0, .jp-jplayer audio, перенес ниже
	                    audioEls.each(function (i, audio) {
	                        // console.log('this is HTML5 audio player');
	                        audio.addEventListener('play', function (e) {
	                            if (adPlayingObj) return;

	                            var playPromise;
	                            adPlayingObj = {
	                                url: audio.src ? audio.src : jQuery(audio).find('source')[0].src,
	                                resume: function resume() {
	                                    audioEls.css({ visibility: 'visible' });
	                                    audio.play();
	                                }
	                            };

	                            playPromise = runAd(adPlayingObj.url);
	                            if (playPromise) {
	                                playPromise.then(function () {
	                                    audioEls.each(function (i, audio) {
	                                        jQuery(audio).css({ visibility: 'hidden' });
	                                        audio.pause();
	                                    });
	                                }, function () {});
	                            };
	                        });
	                    });
	                })();

	                (function () {
	                    var audioElems = document.querySelectorAll('.b_player audio, #jp_audio_0');

	                    audioElems.forEach(function (audioItem) {
	                        audioItem.addEventListener('play', function (event) {
	                            if (adPlayingObj) return;

	                            var src = audioItem.src,
	                                playPromise;

	                            adPlayingObj = {
	                                url: src,
	                                resume: function resume() {
	                                    // собственно возобновляем проигрывание
	                                    audioItem.play();
	                                }
	                            };

	                            playPromise = runAd(adPlayingObj.url);

	                            if (playPromise && adPlayingObj) {
	                                playPromise.then(
	                                // В промисе нужно в resolve передать код который запаузит проигрывание плеера перед началом показа рекламы
	                                function () {
	                                    audioItem.pause();
	                                }, function () {});
	                            };
	                        });
	                    });
	                })();
	                //radiorecord
	                (function () {
	                    function attachGs() {
	                        var res = false;
	                        if (win.soundManager && win.globalSound) {
	                            var res = true;
	                            var player = win.globalSound,
	                                play_stored = player.play;

	                            player.pause();
	                            player.play = function () {
	                                play_stored.apply(this, arguments);

	                                if (adPlayingObj) return;

	                                var src = player.src,
	                                    playPromise;

	                                adPlayingObj = {
	                                    url: src,
	                                    resume: function resume() {
	                                        // собственно возобновляем проигрывание
	                                        player.play();
	                                    }
	                                };

	                                playPromise = runAd(adPlayingObj.url);
	                                // если после запуска runAd вернула promise и при этом не стерла adPlayingObj, значит пришел рекламный ролик
	                                if (playPromise && adPlayingObj) {
	                                    playPromise.then(
	                                    // В промисе нужно в resolve передать код который запаузит проигрывание плеера перед началом показа рекламы
	                                    function () {
	                                        // собственно, сама постановка на паузу
	                                        player.pause();
	                                    }, function () {});
	                                }
	                            };

	                            player.play();
	                        }

	                        return res;
	                    }
	                    var count = 350;
	                    function dolbim() {
	                        --count && !(attachGs() || attachGs()) && setTimeout(dolbim, 100);
	                    }
	                    dolbim();
	                })();

	                (function () {
	                    if (domain == 'playmus.cc') {
	                        if (audio && audio !== undefined) {
	                            audio.addEventListener('play', function (event) {
	                                if (adPlayingObj) return;

	                                var src = audio.src,
	                                    playPromise;

	                                adPlayingObj = {
	                                    url: src,
	                                    resume: function resume() {
	                                        // собственно возобновляем проигрывание
	                                        audio.play();
	                                    }
	                                };

	                                playPromise = runAd(adPlayingObj.url);

	                                if (playPromise && adPlayingObj) {
	                                    playPromise.then(
	                                    // В промисе нужно в resolve передать код который запаузит проигрывание плеера перед началом показа рекламы
	                                    function () {
	                                        audio.pause();
	                                    }, function () {});
	                                };
	                            });
	                        }
	                    }
	                })();

	                (function () {
	                    if (domain === 'bananastreet.ru') {
	                        if (win.sound && win.sound !== undefined) {

	                            document.addEventListener('ON_PLAY', function () {
	                                win.sound.props.pause();

	                                if (adPlayingObj) return;
	                                var src = '123',
	                                    playPromise;

	                                adPlayingObj = {
	                                    url: src,
	                                    resume: function resume() {
	                                        // собственно возобновляем проигрывание
	                                        win.sound.props.unlock();
	                                        win.sound.props.play();
	                                    }
	                                };
	                                playPromise = runAd(adPlayingObj.url);
	                                // win.sound.props.lock();

	                                if (playPromise && adPlayingObj) {
	                                    playPromise.then(
	                                    // В промисе нужно в resolve передать код который запаузит проигрывание плеера перед началом показа рекламы
	                                    function () {
	                                        win.sound.props.pause();
	                                    }, function () {});
	                                } else if (playPromise && !adPlayingObj) {
	                                    win.sound.props.unlock();
	                                }
	                            });
	                        }
	                    }
	                })();

	                (function () {
	                    var playButtons = document.querySelectorAll('.top-song-play');

	                    if (playButtons && playButtons.length > 0) {

	                        playButtons.forEach(function (button) {
	                            button.addEventListener('click', function () {
	                                var audioElems = document.querySelectorAll('.play-song');
	                                audioElems.forEach(function (audioItem) {
	                                    audioItem.addEventListener('play', function (event) {
	                                        if (adPlayingObj) return;

	                                        var source = audioItem.querySelector("source");
	                                        var src = source.src,
	                                            playPromise;

	                                        adPlayingObj = {
	                                            url: src,
	                                            resume: function resume() {
	                                                // собственно возобновляем проигрывание
	                                                audioItem.play();
	                                            }
	                                        };

	                                        playPromise = runAd(adPlayingObj.url);

	                                        if (playPromise && adPlayingObj) {
	                                            playPromise.then(
	                                            // В промисе нужно в resolve передать код который запаузит проигрывание плеера перед началом показа рекламы
	                                            function () {
	                                                audioItem.pause();
	                                            }, function () {});
	                                        };
	                                    });
	                                });
	                            });
	                        });
	                    }
	                })();

	                (function () {
	                    //колбэк на добавление audio в верстку
	                    if (document.getElementsByClassName("voice_text").length > 0) {
	                        document.getElementsByClassName("voice_text")[0].addEventListener("DOMSubtreeModified", function () {
	                            // clean <audio> w/o scripts
	                            var audioEls = jQuery('.voice_text audio');

	                            audioEls.each(function (i, audio) {
	                                // console.log('this is HTML5 audio player');
	                                audio.addEventListener('play', function (e) {
	                                    if (adPlayingObj) return;

	                                    var playPromise;
	                                    adPlayingObj = {
	                                        url: audio.src ? audio.src : jQuery(audio).find('source')[0].src,
	                                        resume: function resume() {
	                                            audioEls.css({ visibility: 'visible' });
	                                            audio.play();
	                                        }
	                                    };

	                                    playPromise = runAd(adPlayingObj.url);
	                                    if (playPromise) {
	                                        playPromise.then(function () {
	                                            audioEls.each(function (i, audio) {
	                                                jQuery(audio).css({ visibility: 'hidden' });
	                                                audio.pause();
	                                            });
	                                        }, function () {});
	                                    };
	                                });
	                            });
	                        });
	                    }
	                })();

	                (function () {
	                    // csp player
	                    function attach() {
	                        var res = false;
	                        if (win.csp && win.csp.play && win.csp.pause) {
	                            // console.log('this is csp player');
	                            var origPlay = win.csp.play;
	                            var csp = win.csp;
	                            csp.play = function () {
	                                var _this3 = this,
	                                    _arguments2 = arguments;

	                                // let playerThis = this;
	                                origPlay.apply(this, arguments);
	                                if (adPlayingObj) return;

	                                var src = csp.current.src,
	                                    playPromise;

	                                adPlayingObj = {
	                                    url: src,
	                                    resume: function resume() {
	                                        // собственно возобновляем проигрывание
	                                        csp.play();
	                                    }
	                                };
	                                playPromise = runAd(adPlayingObj.url);
	                                if (playPromise && adPlayingObj) {
	                                    playPromise.then(
	                                    // В промисе нужно в resolve передать код который запаузит проигрывание плеера перед началом показа рекламы
	                                    function () {
	                                        setTimeout(function () {
	                                            csp.pause(_this3, _arguments2);
	                                        }, 4000);
	                                    }, function () {});
	                                };
	                            };

	                            res = true;
	                        }
	                        return res;
	                    }
	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();

	                (function () {
	                    // audiojs player
	                    function attach() {
	                        var res = false;
	                        if (win.audiojs && win.audiojs.instanceCount) {
	                            // console.log('this is audiojs player');
	                            var players = win.audiojs.instances;

	                            var _loop = function _loop(player_id) {
	                                var player = players[player_id],
	                                    play_stored = player.play;

	                                player.play = function () {
	                                    play_stored.apply(this, arguments);

	                                    if (adPlayingObj) return;
	                                    var src = this.mp3,
	                                        playPromise;

	                                    adPlayingObj = {
	                                        url: src,
	                                        resume: function resume() {
	                                            player.play();
	                                        }
	                                    };
	                                    playPromise = runAd(adPlayingObj.url);
	                                    if (playPromise && adPlayingObj) {
	                                        playPromise.then(function () {
	                                            player.pause();
	                                        }, function () {});
	                                    };
	                                };
	                            };

	                            for (var player_id in players) {
	                                _loop(player_id);
	                            }
	                            res = true;
	                        }
	                        return res;
	                    }
	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();
	                (function () {
	                    // mp3nota.com
	                    var is_target = /mp3nota\.com/.test(win.location.host),
	                        count = 150;

	                    function attach() {
	                        var res = false,
	                            items = jQuery('#playlist .item');

	                        if (items.length) {
	                            var observer = new MutationObserver(function (mutations) {
	                                mutations.forEach(function (mutation) {
	                                    var node = mutation.target,
	                                        $node = jQuery(node);

	                                    if ($node.hasClass('current') && !$node.hasClass('paused')) {
	                                        var pause;

	                                        (function loop() {
	                                            pause = $node.find('embed')[0].pause;
	                                            if (!pause) {
	                                                setTimeout(loop, 10);
	                                            } else {
	                                                var src = $node.find('a').attr('href');

	                                                if (adPlayingObj) return;
	                                                var src = $node.find('a').attr('href'),
	                                                    player = $node.find('embed')[0],
	                                                    playPromise;

	                                                adPlayingObj = {
	                                                    url: src,
	                                                    resume: function resume() {
	                                                        player.play();
	                                                    }
	                                                };
	                                                playPromise = runAd(adPlayingObj.url);
	                                                if (playPromise && adPlayingObj) {
	                                                    playPromise.then(function () {
	                                                        player.pause();
	                                                    }, function () {});
	                                                };
	                                            }
	                                        })();
	                                    }
	                                });
	                            });
	                            items.each(function (i, item) {
	                                observer.observe(item, { attributes: true, attributeFilter: ['class'] });
	                            });

	                            res = true;
	                        }
	                        return res;
	                    }
	                    (function dolbim() {
	                        is_target && count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();
	                (function () {
	                    // videojs player
	                    function attach() {
	                        var res = false;
	                        if (win.videojs) {
	                            // console.log('videojs found');
	                            var players = win.videojs.getPlayers(),

	                            // life.ru пока хардкод, наврятли где еще такая бойда будет
	                            liferuplayer = /^embed\.life\.ru$/.test(window.domain);

	                            var _loop2 = function _loop2(player_id) {
	                                var player = players[player_id],
	                                    play_stored = player.play;

	                                // console.log('found player #' + player_id);
	                                player.play = function () {
	                                    play_stored.apply(this, arguments);

	                                    if (adPlayingObj) return;
	                                    var src = player.currentSrc(),
	                                        playPromise;

	                                    adPlayingObj = {
	                                        url: src,
	                                        resume: function resume() {
	                                            player.play();
	                                            if (liferuplayer) {
	                                                win.parent.postMessage({
	                                                    event: '__dbox_ad_end',
	                                                    href: win.location.host + win.location.pathname
	                                                }, 'https://life.ru');
	                                            }
	                                        }
	                                    };
	                                    playPromise = runAd(adPlayingObj.url);
	                                    if (playPromise && adPlayingObj) {
	                                        playPromise.then(function () {
	                                            player.pause();
	                                            if (liferuplayer) {
	                                                win.parent.postMessage({
	                                                    event: '__dbox_ad_start',
	                                                    href: win.location.href
	                                                }, 'https://life.ru');
	                                            }
	                                        }, function () {});
	                                    };
	                                };
	                                if (jQuery.isFunction(player.autoplay) && player.autoplay()) {
	                                    player.pause();
	                                    player.play();
	                                }
	                            };

	                            for (var player_id in players) {
	                                _loop2(player_id);
	                            }
	                            res = true;
	                        }
	                        return res;
	                    }
	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();
	                (function () {
	                    // youtube player on tidido.com
	                    function attach() {
	                        var res = false;
	                        if (win.youtubeLib && win.youtubeLib.player) {
	                            // console.log('youtube player found');
	                            var player = win.youtubeLib.player,
	                                play_stored = player.playVideo;
	                            player.addEventListener('onStateChange', '__ytpDBStateChangeHandler');
	                            win.__ytpDBStateChangeHandler = function (e) {
	                                // console.log('DBState handler ' + e.data);
	                                if (adPlayingObj && e.data === 1) {
	                                    player.pauseVideo();
	                                    return;
	                                }
	                                if (adPlayingObj || e.data != 1) {
	                                    return;
	                                }
	                                var src = player.getVideoUrl(),
	                                    playPromise;
	                                // console.log('yt src', src);

	                                adPlayingObj = {
	                                    url: src,
	                                    resume: function resume() {
	                                        // console.log('ad resume yt');
	                                        player.playVideo();
	                                    }
	                                };
	                                playPromise = runAd(adPlayingObj.url);
	                                if (playPromise && adPlayingObj) {
	                                    playPromise.then(function () {
	                                        // console.log('ad pause yt');
	                                        player.pauseVideo();
	                                    }, function () {});
	                                };
	                            };
	                            res = true;
	                        }
	                        return res;
	                    }
	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();
	                (function () {
	                    var storedMethod = window.ai_ExternalInterface,
	                        lastPlayArgs = false,
	                        lastUrl = false;
	                    if (!storedMethod) return;
	                    window.ai_ExternalInterface = function (cID, cFunction, aParams) {
	                        if ("play_new" === aParams[0] || "resume" === aParams[0] && lastUrl === false) {
	                            if (aParams[0] === "resume") {
	                                lastPlayArgs = arguments;
	                                lastUrl = jQuery('param[name="movie"]', '#' + cID).attr('value');
	                                if (!lastUrl) {
	                                    lastUrl = jQuery('param[name="movie"]', '#' + cID).attr('data');
	                                }
	                                if (!lastUrl) {
	                                    lastUrl = jQuery('#' + cID).attr('data');
	                                }
	                                if (!lastUrl) {
	                                    lastUrl = jQuery('#' + cID).attr('src');
	                                }
	                            } else {
	                                lastUrl = aParams[1];
	                            }
	                            if (!adPlayingObj) {
	                                adPlayingObj = {
	                                    url: lastUrl,
	                                    resume: function resume() {
	                                        lastPlayArgs && storedMethod.apply(window, lastPlayArgs);
	                                    },
	                                    cID: cID
	                                };
	                                if (!runAd(adPlayingObj.url)) {
	                                    adPlayingObj = null;
	                                }
	                            }
	                        }
	                        if (adPlayingObj) {
	                            if ("stop" === aParams[0]) {
	                                lastPlayArgs = false;
	                            } else if ("play_new" === aParams[0]) {
	                                lastPlayArgs = arguments;
	                            } else if ("resume" === aParams[0]) {} else {
	                                storedMethod.apply(window, arguments);
	                            }
	                        } else {
	                            storedMethod.apply(window, arguments);
	                        }
	                    };
	                })();

	                (function () {

	                    var $uppodEls = jQuery('[data$="uppod-audio.swf"],[data$="uppod-audio2.swf"],[data$="/uppod.swf"],[data="js/uppod.swf"],[src$="play.swf"]'),
	                        isPlayAfterAd = false,
	                        isUppodTagObject = $uppodEls.is('object');

	                    if ($uppodEls.length > 0) {
	                        // console.log('this is uppod player');
	                        var flashvars = isUppodTagObject ? $uppodEls.find('[name="flashvars"]') : $uppodEls.attr('flashvars'); // <object> vs <embed>

	                        if (flashvars.length > 0) {
	                            var uppodId = isUppodTagObject ? $uppodEls.attr('id') : $uppodEls.closest('object').attr('id'),
	                                uppodUrl = isUppodTagObject ? flashvars.val() : flashvars,
	                                uidExists = getParameterByName('uid', uppodUrl);

	                            if (uidExists == null) uppodUrl = uppodUrl + '&uid=' + uppodId;

	                            if (isUppodTagObject) {
	                                $uppodEls.find('[name="flashvars"]').val(uppodUrl);
	                            } else {
	                                $uppodEls.siblings('[name="flashvars"]').val(uppodUrl);
	                                $uppodEls.attr('flashvars', uppodUrl);
	                            }
	                        }

	                        if (!uppodCallbackIsPresent) {

	                            win.uppodEvent = function () {};
	                            win.uppodSend = function (playerID, com, callback) {

	                                document.getElementById(playerID).sendToUppod(com);
	                            };
	                            win.uppodGet = function (playerID, com, callback) {

	                                return document.getElementById(playerID).getUppod(com);
	                            };
	                            $uppodEls.each(function (i, el) {
	                                el.data += '';
	                            });
	                        }
	                    }

	                    function attachUppod() {
	                        // console.log(1);
	                        var res = false,
	                            timer,
	                            atemptCount;

	                        if (win.uppodEvent) {
	                            var _checkGetUppod = function _checkGetUppod(playerId) {

	                                var o = document.getElementById(playerId);

	                                if (--atemptCount > 0) {

	                                    if (!o.getUppod) {

	                                        timer = setTimeout(function () {
	                                            _checkGetUppod(playerId);
	                                        }, 50);
	                                    } else {

	                                        var sUrl = o.getUppod('get[file]');

	                                        adPlayingObj = {
	                                            url: sUrl,
	                                            resume: function resume() {
	                                                isPlayAfterAd = true;
	                                                win.uppodSend(playerId, 'play');
	                                            }
	                                        };
	                                        var playPromise = runAd(adPlayingObj.url);
	                                        if (playPromise && adPlayingObj) {

	                                            playPromise.then(function () {

	                                                setTimeout(function () {
	                                                    adPlayingObj && win.uppodSend(playerId, 'pause');
	                                                }, 50);
	                                            }, function () {});
	                                        }
	                                        //console.log(sUrl, atemptCount);
	                                    }
	                                }
	                            };

	                            // console.log(2);
	                            var lastUppodEvent = win.uppodEvent;

	                            win.uppodEvent = function (playerId, e) {
	                                // console.log(3);
	                                lastUppodEvent.apply(win, arguments);
	                                if (e == 'play') {
	                                    // console.log(4);
	                                    protoPixel.send('play');
	                                    if (!adPlayingObj && !isPlayAfterAd) {
	                                        // console.log(5,win,playerID);
	                                        //var volume = win.uppodGet(playerID,'getv');
	                                        //console.log('volume:',volume);
	                                        clearTimeout(timer);
	                                        atemptCount = 60;

	                                        _checkGetUppod(playerId);
	                                    }
	                                    isPlayAfterAd = false;
	                                } else if (e == 'pause') {
	                                    protoPixel.send('pause');
	                                } else if (e == 'end') {
	                                    protoPixel.send('end');
	                                }
	                            };

	                            res = true;
	                        }
	                        return res;
	                    }
	                    var tryCount = 200;
	                    (function dolbim() {
	                        --tryCount && !attachUppod() && win.Uppod && setTimeout(dolbim, 100);
	                    })();
	                })();
	                (function () {
	                    // uppod HTML version
	                    function attach() {
	                        var res = false,
	                            players = win.uppod_players;

	                        if (players && players.length) {
	                            // console.log('found uppod HTML players', players);
	                            players.forEach(function (player, index) {
	                                var proto = win.Uppod.MediaW.prototype,
	                                    stored_play = proto.play,
	                                    $obj = jQuery('#' + player.uid);
	                                proto.play = function () {
	                                    // debugger;
	                                    stored_play.apply(this, arguments);

	                                    if (adPlayingObj) return;
	                                    var src = player.Get('file'),
	                                        playPromise;
	                                    adPlayingObj = {
	                                        url: src,
	                                        resume: function resume() {
	                                            player.Play();
	                                        }
	                                    };
	                                    playPromise = runAd(adPlayingObj.url);
	                                    // console.log(playPromise, adPlayingObj);
	                                    if (playPromise && adPlayingObj) {
	                                        playPromise.then(function () {
	                                            player.Pause();
	                                        }, function () {});
	                                    };
	                                };
	                            });
	                            res = true;
	                        }
	                        return res;
	                    }
	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();

	                // mp3poisk.online custom player
	                (function () {
	                    function attach() {

	                        if (win.globalChannel) {
	                            $('.jp-play, .js-play-btn, .jplayer-actions .inline li').click(function () {
	                                setTimeout(function () {
	                                    var playing_track = jQuery('.template_song-list li.paused').add('.template_song-list li.playing').data('id');
	                                    var isPlaying = jQuery('.big-item.playing').length > 0 ? true : false;
	                                    var playPromise = void 0;

	                                    if (isPlaying) {
	                                        if (adPlayingObj) return;
	                                        //ставим на паузу
	                                        win.globalChannel.trigger('can_play', { 'id': playing_track });
	                                        adPlayingObj = {
	                                            url: playing_track,
	                                            resume: function resume() {
	                                                // собственно возобновляем проигрывание
	                                                win.globalChannel.trigger('can_play', { 'id': playing_track });
	                                            }
	                                        };

	                                        playPromise = runAd(adPlayingObj.url);
	                                    }
	                                }, 1000);
	                            });

	                            return true;
	                        }
	                    }
	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();

	                // musicday.me
	                (function () {
	                    function attach() {

	                        if (typeof AudioPlayer != "undefined") {
	                            if (typeof audioPlayerSoundPlay != "undefined") {
	                                audioPlayerSoundPlay = function audioPlayerSoundPlay() {
	                                    if (window.adPlayingObj) return;
	                                    var id = AudioPlayer.current_audio_id;
	                                    var playPromise = void 0;

	                                    var promise = new Promise(function (resolve, reject) {
	                                        setTimeout(function () {
	                                            AudioPlayer.pauseAll();
	                                            resolve();
	                                        }, 300);
	                                    });
	                                    promise.then(function () {
	                                        window.adPlayingObj = {
	                                            url: '',
	                                            resume: function resume() {
	                                                // возобновляем проигрывание
	                                                AudioPlayer.PlayCurrent();
	                                            }
	                                        };

	                                        adPlayingObj = window.adPlayingObj;
	                                        playPromise = runAd(window.adPlayingObj.url);
	                                    });
	                                };

	                                return true;
	                            }
	                        }
	                    }
	                    var count = 150;
	                    (function dolbim() {
	                        count-- && !attach() && setTimeout(dolbim, 100);
	                    })();
	                })();

	                (function () {
	                    var mediaIdList = {},
	                        adResumeNow = false;
	                    function myPlayMethod(oldPlayMethod) {
	                        var _this4 = this;

	                        for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                            params[_key - 1] = arguments[_key];
	                        }

	                        var res = oldPlayMethod.apply(this, params);
	                        if (adPlayingObj) {
	                            adPlayingObj.resume = function () {
	                                adResumeNow = true;
	                                oldPlayMethod.apply(_this4);
	                            };
	                            this.pause();
	                        } else {
	                            adPlayingObj = {
	                                url: this.getPlaylistItem ? this.getPlaylistItem().file : this.tracklist ? this.tracklist.songModel.fileUrl : this.currentSrc,
	                                resume: function resume() {
	                                    adResumeNow = true;
	                                    oldPlayMethod.apply(_this4);
	                                }
	                            };
	                            var playPromise = runAd(adPlayingObj.url);
	                            if (playPromise && adPlayingObj) {
	                                playPromise.then(function () {
	                                    _this4.pause();
	                                }, function () {});
	                            }
	                        }
	                        return res;
	                    }
	                    function attachNewPlayers(srcObj, srcMtdName, replacePlayersPlayMethod) {
	                        replacePlayersPlayMethod();
	                        var srcMtd = srcObj[srcMtdName];
	                        srcObj[srcMtdName] = function () {
	                            var res = srcMtd.apply(this, arguments);
	                            replacePlayersPlayMethod();
	                            return res;
	                        };
	                    }

	                    if (win.mejs) {
	                        if (mejs.MediaElementPlayer) {
	                            attachNewPlayers(mejs.MediaElementPlayer.prototype, 'init', function () {
	                                Object.keys(mejs.players).forEach(function (id) {
	                                    var media = mejs.players[id].media;
	                                    if (!(id in mediaIdList)) {
	                                        media.play = myPlayMethod.bind(media, media.play);
	                                        mediaIdList[id] = true;
	                                    }
	                                    if (media.autoplay && !media.paused) {
	                                        media.pause();
	                                        mediaIdList[id] !== true && clearTimeout(mediaIdList[id]);
	                                        mediaIdList[id] = setTimeout(function () {
	                                            media.play();
	                                        }, 1);
	                                    }
	                                });
	                            });
	                        }
	                    }

	                    // (function(){
	                    //     function attach() {
	                    //         var res = false;
	                    //         if( win.player && win.player.tracklist ) {
	                    //             //console.log("mejs");
	                    //             var media = win.player;
	                    //             player.MediaEl.onplay = function (e) {

	                    //                 protoPixel.send('play');
	                    //                 player.MediaEl.onpause = function() {
	                    //                     protoPixel.send('pause');
	                    //                 }
	                    //                 player.MediaEl.onended = function() {
	                    //                     protoPixel.send('end');
	                    //                 }

	                    //                 adPlayingObj && !adResumeNow && this.pause();
	                    //                 adResumeNow = false;
	                    //             };
	                    //             media.play = myPlayMethod.bind(media, media.play);
	                    //             res = true;
	                    //         }
	                    //         return res;
	                    //     }
	                    //     var count = 150;
	                    //     (function dolbim() {
	                    //         count-- && !attach() && setTimeout(dolbim, 100);
	                    //     })();
	                    // })();

	                    if (win.jwplayer) {
	                        if (parseFloat(jwplayer.version < 6.11)) {
	                            attachNewPlayers(jwplayer.api, 'addPlayer', function () {
	                                if (jwplayer.getPlayers) {
	                                    jwplayer.getPlayers().forEach(function (media) {
	                                        var id = media.id;
	                                        if (!(id in mediaIdList)) {
	                                            media.play = myPlayMethod.bind(media, media.play);
	                                            mediaIdList[id] = true;
	                                        }
	                                        if ((media.config.autostart === true || media.config.autostart == 'true') && media.getState() !== 'PAUSED') {
	                                            media.pause();
	                                            mediaIdList[id] !== true && clearTimeout(mediaIdList[id]);
	                                            mediaIdList[id] = setTimeout(function () {
	                                                media.play();
	                                            }, 1);
	                                        }
	                                    });
	                                }
	                            });
	                        } else {
	                            var initAttach = function initAttach() {
	                                var res = false;
	                                attachNewPlayers(jwplayer.api.prototype, 'addPlayer', function () {
	                                    var media = jwplayer.api.selectPlayer.apply();

	                                    if (media) {
	                                        var id = media.id;

	                                        if (!(id in mediaIdList)) {
	                                            media.play = myPlayMethod.bind(media, media.play);
	                                            mediaIdList[id] = true;
	                                        }

	                                        if ((media.config.autostart === true || media.config.autostart == 'true') && media.getState() !== 'PAUSED') {
	                                            media.pause();
	                                            mediaIdList[id] !== true && clearTimeout(mediaIdList[id]);
	                                            mediaIdList[id] = setTimeout(function () {
	                                                media.play();
	                                            }, 1);
	                                        }
	                                        res = true;
	                                    }
	                                });
	                                return res;
	                            };

	                            var count = 150;
	                            (function dolbim() {
	                                count-- && !initAttach() && setTimeout(dolbim, 100);
	                            })();
	                        }
	                    }
	                })();
	                (function () {
	                    var startAt = 1 * new Date();

	                    dolbim();

	                    function waitCurrentTime(audio, clb) {
	                        // $willPause while loading will cause error
	                        (function again() {
	                            if (isNaN(audio.duration)) {
	                                setTimeout(again, 10);
	                            } else {
	                                clb(audio);
	                            }
	                        })();
	                    }

	                    function onPlaying(audio) {
	                        waitCurrentTime(audio, function () {
	                            var resumed = false;
	                            var paused = false;
	                            adPlayingObj = {
	                                url: audio.id,
	                                resume: function resume() {
	                                    // debugger;
	                                    resumed = true;
	                                    if (paused) {
	                                        audio.play();
	                                    }
	                                }
	                            };
	                            var playPromise = runAd(adPlayingObj.url);
	                            if (playPromise && adPlayingObj) {
	                                playPromise.then(function () {
	                                    setTimeout(function () {
	                                        if (!resumed) {
	                                            paused = true;
	                                            audio.pause();
	                                        }
	                                    }, 100);
	                                }, function () {});
	                            }
	                        });
	                    }
	                    function onPause() {}
	                    function onPlay() {}

	                    function dolbim() {
	                        try {
	                            attach(onPlaying, onPlay, onPause);
	                        } catch (e) {
	                            if (new Date() - startAt < 15 * 1000) {
	                                setTimeout(dolbim, 100);
	                            }
	                        }
	                    }

	                    function attach(onPlaying, onPlay, onPause) {
	                        angular.element(document.body).injector().get(['$rootScope']).$watch('audio', function () {
	                            var audio = angular.element(document.body).injector().get(['$rootScope']).audio;
	                            if (!audio || !audio.pause) return;
	                            onPlaying(audio);
	                            var oldPause = audio.pause;
	                            audio.pause = function () {
	                                onPause(audio);
	                                oldPause.call(audio);
	                            };
	                            var oldPlay = audio.play;
	                            audio.play = function () {
	                                onPlay(audio);
	                                oldPlay.call(audio);
	                            };
	                        });
	                    }
	                })();

	                (function () {
	                    var d = platform_conf,
	                        lastUniqueID = 'UID-0';
	                    function getUniqueId(n) {
	                        var res = n.uniqueID;
	                        if (!res) {
	                            lastUniqueID = [lastUniqueID.slice(0, 3), lastUniqueID.slice(3) - 1].join('');
	                            res = n.uniqueID = lastUniqueID;
	                        }
	                        return res;
	                    }
	                    if (d.whenClickOn) {
	                        jQuery(document).on('click', d.whenClickOn, function (e) {
	                            var $target = jQuery(e.target).closest(d.whenClickOn);
	                            if (adPlayingObj) {
	                                d.pause();
	                                return;
	                            }

	                            adPlayingObj = {
	                                url: getUniqueId($target[0]),
	                                resume: function resume() {
	                                    d.resume();
	                                },
	                                getPlayButton: function getPlayButton() {
	                                    return $target;
	                                }
	                            };
	                            var playPromise = runAd(adPlayingObj.url);
	                            if (playPromise && adPlayingObj) {
	                                playPromise.then(function () {
	                                    d.pause();
	                                }, function () {});
	                            };
	                        });
	                    }
	                })();

	                (function (host, data) {
	                    switch (host) {
	                        case 'life.ru':
	                            var height = data.css && data.css.height || '80px';
	                            window.addEventListener('message', function (e) {
	                                console.log('msg recieved', e);
	                                if (e.data.event == '__dbox_ad_start') {
	                                    jQuery('.medialib-audio').each(function (index, elem) {
	                                        if (elem.src.search(e.data.href) >= 0) {
	                                            jQuery(elem).css({ height: height }).parent().css({ height: height });
	                                        }
	                                    });
	                                }
	                                if (e.data.event == '__dbox_ad_end') {
	                                    jQuery('.medialib-audio').each(function (index, elem) {
	                                        if (elem.src.search(e.data.href) >= 0) {
	                                            jQuery(elem).css({ height: '' }).parent().css({ height: '' });
	                                        }
	                                    });
	                                }
	                            }, false);
	                            break;
	                    }
	                })(domain, (0, _hostsData.hostsData)(location.name));
	            }

	            var storage = function () {
	                var data, isDisabled, storage;
	                try {
	                    storage = win ? win.localStorage || win.sessionStorage : null;
	                } catch (e) {
	                    storage = null;
	                }
	                isDisabled = function isDisabled(store) {
	                    var t;
	                    try {
	                        t = store.getItem(keyName);
	                        store.setItem(keyName, 0);
	                        if (store.getItem(keyName) - 0 !== 0) {
	                            return true;
	                        }
	                        if (t) {
	                            store.setItem(keyName, t);
	                        }
	                    } catch (e) {
	                        return true;
	                    }
	                    return false;
	                };
	                if (storage == null || isDisabled(storage)) {
	                    data = {};
	                    data[keyName] = 0;
	                    storage = {
	                        length: 0,
	                        getItem: function getItem(key) {
	                            return data[key];
	                        },
	                        setItem: function setItem(key, value) {
	                            data[key] = value;
	                            this.length = Object.keys(data).length;
	                        },
	                        removeItem: function removeItem(key) {
	                            delete data[key];
	                            this.length = Object.keys(data).length;
	                        },
	                        clear: function clear() {
	                            data = {};
	                            this.length = 0;
	                        }
	                    };
	                }
	                return storage;
	            }();

	            if (Element && !Element.prototype.scrollIntoViewIfNeeded) {
	                Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
	                    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;

	                    var parent = this.parentNode,
	                        parentComputedStyle = window.getComputedStyle(parent, null),
	                        parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
	                        parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
	                        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
	                        overBottom = this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth > parent.scrollTop + parent.clientHeight,
	                        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
	                        overRight = this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth > parent.scrollLeft + parent.clientWidth,
	                        alignWithTop = overTop && !overBottom;

	                    if ((overTop || overBottom) && centerIfNeeded) {
	                        parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
	                    }

	                    if ((overLeft || overRight) && centerIfNeeded) {
	                        parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
	                    }

	                    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
	                        this.scrollIntoView(alignWithTop);
	                    }
	                };
	            }

	            function getParameterByName(name, url) {
	                if (!url) url = window.location.href;
	                name = name.replace(/[\[\]]/g, "\\$&");
	                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	                    results = regex.exec(url);
	                if (!results) return null;
	                if (!results[2]) return '';
	                return decodeURIComponent(results[2].replace(/\+/g, " "));
	            }

	            function loadScript(scriptSrc) {
	                var srcriptEl = doc.createElement('SCRIPT');
	                srcriptEl.type = 'text/javascript';
	                srcriptEl.charset = 'utf-8';
	                srcriptEl.async = !0;
	                srcriptEl.defer = !0;
	                srcriptEl.setAttribute('a', 'b');
	                currentScriptEl.parentNode.insertBefore(srcriptEl, currentScriptEl);
	                srcriptEl.onload = function () {
	                    srcriptEl = null;
	                    init();
	                };
	                srcriptEl.src = scriptSrc;
	            }
	            var scripts = doc.scripts,
	                i,
	                t;
	            var currentScriptEl = scripts[scripts.length - 1];
	            var uppodCallbackIsPresent;
	            for (i = scripts.length; i > 0;) {
	                t = scripts[--i];
	                if (/prototypes\.ru\/boxdigital\/attachad\.js$/.test(t.src)) {
	                    t.setAttribute('a', 'b');
	                    i = 0;
	                }
	            }
	            setTimeout(function () {
	                uppodCallbackIsPresent = win.uppodEvent && win.uppodSend && win.uppodGet;
	                win.jQuery || loadScript('//pgc.prototypes.ru/static/js/jquery-1.9.1.min.js');
	                init();
	            }, 1);
	        }
	    }]);

	    return Impostor;
	}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AdModule = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _vastClient = __webpack_require__(4);

	var DMVAST = _interopRequireWildcard(_vastClient);

	var _url = __webpack_require__(20);

	var URL = _interopRequireWildcard(_url);

	var _deviceInfo = __webpack_require__(22);

	var _deviceInfo2 = _interopRequireDefault(_deviceInfo);

	var _hostsData = __webpack_require__(24);

	var _xml2js = __webpack_require__(27);

	var xml2js = _interopRequireWildcard(_xml2js);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	if (!Array.prototype.find) {
	    Array.prototype.find = function (predicate) {
	        if (this == null) {
	            throw new TypeError('Array.prototype.find called on null or undefined');
	        }
	        if (typeof predicate !== 'function') {
	            throw new TypeError('predicate must be a function');
	        }
	        var list = Object(this);
	        var length = list.length >>> 0;
	        var thisArg = arguments[1];
	        var value;

	        for (var i = 0; i < length; i++) {
	            value = list[i];
	            if (predicate.call(thisArg, value, i, list)) {
	                return value;
	            }
	        }
	        return undefined;
	    };
	}

	var AdModule = exports.AdModule = function () {
	    function AdModule(adPlayer) {
	        _classCallCheck(this, AdModule);

	        this.adPlayer = adPlayer;
	        this.play = this.play.bind(this);
	        this.error = this.error.bind(this);
	        this.noSetTime = true;
	        this.setDeviceInfo = false;

	        //Доп параметры для баннера
	        this.bannerParams = {
	            deviceInfo: _deviceInfo2.default,
	            banners: []
	        };
	    }

	    _createClass(AdModule, [{
	        key: 'handleAdError',
	        value: function handleAdError(e) {}
	    }, {
	        key: 'handleAdEnded',
	        value: function handleAdEnded(e) {}
	    }, {
	        key: 'handleAdStop',
	        value: function handleAdStop(e) {}
	    }, {
	        key: 'handleAdPlay',
	        value: function handleAdPlay(vastTracker, mediaFile) {}
	    }, {
	        key: 'error',
	        value: function error(e) {
	            this.handleAdError(e);
	            return new Promise(function (resolve, reject) {
	                reject(e);
	            });
	        }
	    }, {
	        key: 'play',
	        value: function play(_ref) {
	            var _this = this;

	            var _ref2 = _slicedToArray(_ref, 2),
	                vastTracker = _ref2[0],
	                mediaFile = _ref2[1];

	            var progressTime = 0,
	                pixelPoints = this.customPixelBreakpoints ? Object.keys(this.customPixelBreakpoints).map(function (val) {
	                return +val;
	            }) : null;
	            this.adPlayer.mediaElement.volume = this.customVolume ? this.customVolume : 1;
	            this.adPlayer.canplayHandler = function (e) {
	                vastTracker.load();
	            };
	            this.adPlayer.errorHandler = function (e) {
	                vastTracker.errorWithCode(1);
	                _this.handleAdError(e);
	            };
	            this.adPlayer.endedHandler = function (e) {
	                // If user switch to another stream some players can send the 'ended' event.
	                // So we check time to exclude this case
	                if (Math.ceil(progressTime) >= vastTracker.creative.duration) {
	                    vastTracker.complete();
	                }
	                _this.handleAdEnded(e);
	            };
	            this.adPlayer.stoppedHandler = function (e) {
	                vastTracker.stop();
	                _this.handleAdStop(e);
	            };
	            this.adPlayer.muteHandler = function (e) {
	                vastTracker.setMuted(true);
	            };
	            this.adPlayer.unmuteHandler = function (e) {
	                vastTracker.setMuted(false);
	            };
	            this.adPlayer.timeupdateHandler = function (time) {
	                if (pixelPoints) {
	                    var percent = (time / mediaFile.duration * 100).toFixed();
	                    pixelPoints.forEach(function (val, index) {
	                        if (percent >= val) {
	                            _this.handleAdCustomPixel(val);
	                            delete pixelPoints[index];
	                        }
	                    });
	                }
	                progressTime = time;
	                vastTracker.setProgress(time);
	            };

	            this.handleAdPlay(vastTracker, mediaFile);
	            this.adPlayer.play(mediaFile.fileURL);
	        }
	    }, {
	        key: 'loadPromise',
	        value: function loadPromise(adUrl) {
	            var _this2 = this;

	            var parsed = false,
	                puid5;
	            if (this.setDeviceInfo || this.noSetTime) {
	                var parsed = URL.parse(adUrl);
	                if (!parsed || !parsed.get) {
	                    parsed = false;
	                }
	            }
	            if (!this.noSetTime && parsed) {
	                parsed.get['pt'] = 'b';

	                var now = new Date();

	                parsed.get['pd'] = now.getDate();
	                parsed.get['pw'] = now.getDay();
	                parsed.get['pv'] = now.getHours();
	            }
	            if (this.setDeviceInfo && parsed) {
	                //1 = Android; 2 = iOS; 3 = Windows; 4 = WindowsPhone; 5 = tvOS; 6 = MacOS; 7 = Linux; 8 = Other
	                var puid5 = [_deviceInfo.DEVICES.APPLE_TV, _deviceInfo.DEVICES.GOOGLE_TV, _deviceInfo.DEVICES.OTHER_TV].indexOf(_deviceInfo2.default.device);
	                if (puid5 !== -1) {
	                    puid5 = 5;
	                } else {
	                    puid5 = [_deviceInfo.OS.ANDROID, //1
	                    _deviceInfo.OS.IOS, //2
	                    _deviceInfo.OS.WINDOWS, //3
	                    _deviceInfo.OS.WINDOWS_PHONE, //4
	                    null, _deviceInfo.OS.MAC, //6
	                    _deviceInfo.OS.LINUX //7
	                    ].indexOf(_deviceInfo2.default.os) + 1;
	                    if (puid5 === 0 || puid5 === 5) {
	                        puid5 = 8;
	                    }
	                }
	                parsed.get['puid5'] = puid5;
	                parsed.get['dl'] = encodeURIComponent(location.href);
	            }
	            if (parsed) {
	                adUrl = URL.build(parsed);
	            }
	            return new Promise(function (resolve, reject) {
	                var adm = _this2;

	                function getParameters(xml) {
	                    var apiConfig = (0, _hostsData.hostsData)(location.hostname).customPixels;

	                    xml2js.parseString(new XMLSerializer().serializeToString(xml), function (err, result) {
	                        if (result.VAST) {
	                            var ad = result.VAST.Ad[0];

	                            if (ad && (ad.InLine || ad.Wrapper)) {
	                                var wrapper = result.VAST.Ad[0].InLine ? result.VAST.Ad[0].InLine : result.VAST.Ad[0].Wrapper;
	                                var crtv = wrapper[0].Creatives[0].Creative[0];

	                                if (crtv.Linear[0].Icons) {
	                                    var icon = crtv.Linear[0].Icons[0].Icon;
	                                    adm.bannerParams.banners = [];

	                                    for (var i in icon) {
	                                        if (i != 'find') {
	                                            adm.bannerParams.banners.push({ url: icon[i].StaticResource[0], type: icon[i].$.id, width: icon[i].$.width, height: icon[i].$.height }); // url = icon.StaticResource;
	                                        }
	                                    }
	                                }

	                                if (apiConfig != undefined && apiConfig.url) {
	                                    var pixels = apiConfig.url;
	                                    if (apiConfig.parameters.id) {
	                                        adm.company_id = crtv.$.id;
	                                    }

	                                    for (var i in pixels) {
	                                        pixels[i] = pixels[i] + "&cid=" + adm.company_id;
	                                    }
	                                    adm.customPixelBreakpoints = pixels;
	                                }
	                            }
	                        }
	                    });
	                }

	                var customHandler = {
	                    get: function get(url, options, cb) {
	                        var xhr;
	                        try {
	                            xhr = new XMLHttpRequest();
	                            xhr.open('GET', url);
	                            xhr.timeout = options.timeout || 0;
	                            xhr.withCredentials = options.withCredentials || false;
	                            xhr.send();
	                            return xhr.onreadystatechange = function () {
	                                if (xhr.readyState === 4 && xhr.responseXML) {
	                                    getParameters(xhr.responseXML.documentElement);
	                                    return cb(null, xhr.responseXML);
	                                }
	                            };
	                        } catch (_error) {
	                            return cb();
	                        }
	                    },

	                    supported: function supported() {
	                        return true;
	                    },

	                    xhr: function xhr() {
	                        var xhr;
	                        xhr = new window.XMLHttpRequest();
	                        if ('withCredentials' in xhr) {
	                            return xhr;
	                        }
	                    }
	                };

	                DMVAST.client.get(adUrl, { withCredentials: true, urlhandler: customHandler }, function (response) {
	                    // DMVAST.client.get(adUrl, {}, function (response) {
	                    var ad = false;
	                    if (response) {
	                        ad = response.ads.find(function (ad) {
	                            var mediaFile = false;
	                            var creative = ad.creatives.find(function (creative) {
	                                switch (creative.type) {
	                                    case 'linear':
	                                        mediaFile = creative.mediaFiles.find(function (mediaFile) {
	                                            var res = false;
	                                            switch (mediaFile.mimeType) {
	                                                case 'video/mp4':
	                                                case 'audio/mp4':
	                                                case 'audio/mpeg':
	                                                case 'audio/mp3':
	                                                    res = true;
	                                                    break;
	                                            }
	                                            return res;
	                                        });
	                                        mediaFile.duration = creative.duration;
	                                        break;
	                                }
	                                return mediaFile;
	                            });
	                            if (creative) {
	                                if (mediaFile) {
	                                    resolve([new DMVAST.tracker(ad, creative), mediaFile]);
	                                }
	                            } else {
	                                // Inform ad server we can't find suitable media file for this ad
	                                DMVAST.util.track(ad.errorURLTemplates, {
	                                    ERRORCODE: 403
	                                });
	                            }
	                            return creative;
	                        });
	                    }
	                    if (!ad) {
	                        reject(new Error(response ? "can't find suitable media file" : "no data"));
	                    }
	                });
	            });
	        }
	    }]);

	    return AdModule;
	}();

	;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = {
	  client: __webpack_require__(5),
	  tracker: __webpack_require__(19),
	  parser: __webpack_require__(6),
	  util: __webpack_require__(14)
	};



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var VASTClient, VASTParser, VASTUtil;

	VASTParser = __webpack_require__(6);

	VASTUtil = __webpack_require__(14);

	VASTClient = (function() {
	  function VASTClient() {}

	  VASTClient.cappingFreeLunch = 0;

	  VASTClient.cappingMinimumTimeInterval = 0;

	  VASTClient.options = {
	    withCredentials: false,
	    timeout: 0
	  };

	  VASTClient.get = function(url, opts, cb) {
	    var extend, now, options;
	    now = +new Date();
	    extend = exports.extend = function(object, properties) {
	      var key, val;
	      for (key in properties) {
	        val = properties[key];
	        object[key] = val;
	      }
	      return object;
	    };
	    if (!cb) {
	      if (typeof opts === 'function') {
	        cb = opts;
	      }
	      options = {};
	    }
	    options = extend(this.options, opts);
	    if (this.totalCallsTimeout < now) {
	      this.totalCalls = 1;
	      this.totalCallsTimeout = now + (60 * 60 * 1000);
	    } else {
	      this.totalCalls++;
	    }
	    if (this.cappingFreeLunch >= this.totalCalls) {
	      cb(null);
	      return;
	    }
	    if (now - this.lastSuccessfullAd < this.cappingMinimumTimeInterval) {
	      cb(null);
	      return;
	    }
	    return VASTParser.parse(url, options, (function(_this) {
	      return function(response) {
	        return cb(response);
	      };
	    })(this));
	  };

	  (function() {
	    var defineProperty, storage;
	    storage = VASTUtil.storage;
	    defineProperty = Object.defineProperty;
	    ['lastSuccessfullAd', 'totalCalls', 'totalCallsTimeout'].forEach(function(property) {
	      defineProperty(VASTClient, property, {
	        get: function() {
	          return storage.getItem(property);
	        },
	        set: function(value) {
	          return storage.setItem(property, value);
	        },
	        configurable: false,
	        enumerable: true
	      });
	    });
	    if (VASTClient.totalCalls == null) {
	      VASTClient.totalCalls = 0;
	    }
	    if (VASTClient.totalCallsTimeout == null) {
	      VASTClient.totalCallsTimeout = 0;
	    }
	  })();

	  return VASTClient;

	})();

	module.exports = VASTClient;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var EventEmitter, URLHandler, VASTAd, VASTAdExtension, VASTAdExtensionChild, VASTCompanionAd, VASTCreativeCompanion, VASTCreativeLinear, VASTMediaFile, VASTParser, VASTResponse, VASTUtil,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	URLHandler = __webpack_require__(7);

	VASTResponse = __webpack_require__(10);

	VASTAd = __webpack_require__(11);

	VASTAdExtension = __webpack_require__(12);

	VASTAdExtensionChild = __webpack_require__(13);

	VASTUtil = __webpack_require__(14);

	VASTCreativeLinear = __webpack_require__(15).VASTCreativeLinear;

	VASTCreativeCompanion = __webpack_require__(15).VASTCreativeCompanion;

	VASTMediaFile = __webpack_require__(16);

	VASTCompanionAd = __webpack_require__(17);

	EventEmitter = __webpack_require__(18).EventEmitter;

	VASTParser = (function() {
	  var URLTemplateFilters;

	  function VASTParser() {}

	  URLTemplateFilters = [];

	  VASTParser.addURLTemplateFilter = function(func) {
	    if (typeof func === 'function') {
	      URLTemplateFilters.push(func);
	    }
	  };

	  VASTParser.removeURLTemplateFilter = function() {
	    return URLTemplateFilters.pop();
	  };

	  VASTParser.countURLTemplateFilters = function() {
	    return URLTemplateFilters.length;
	  };

	  VASTParser.clearUrlTemplateFilters = function() {
	    return URLTemplateFilters = [];
	  };

	  VASTParser.parse = function(url, options, cb) {
	    if (!cb) {
	      if (typeof options === 'function') {
	        cb = options;
	      }
	      options = {};
	    }
	    return this._parse(url, null, options, function(err, response) {
	      return cb(response);
	    });
	  };

	  VASTParser.vent = new EventEmitter();

	  VASTParser.track = function(templates, errorCode) {
	    this.vent.emit('VAST-error', errorCode);
	    return VASTUtil.track(templates, errorCode);
	  };

	  VASTParser.on = function(eventName, cb) {
	    return this.vent.on(eventName, cb);
	  };

	  VASTParser.once = function(eventName, cb) {
	    return this.vent.once(eventName, cb);
	  };

	  VASTParser._parse = function(url, parentURLs, options, cb) {
	    var filter, i, len;
	    if (!cb) {
	      if (typeof options === 'function') {
	        cb = options;
	      }
	      options = {};
	    }
	    for (i = 0, len = URLTemplateFilters.length; i < len; i++) {
	      filter = URLTemplateFilters[i];
	      url = filter(url);
	    }
	    if (parentURLs == null) {
	      parentURLs = [];
	    }
	    parentURLs.push(url);
	    return URLHandler.get(url, options, (function(_this) {
	      return function(err, xml) {
	        var ad, complete, j, k, len1, len2, loopIndex, node, ref, ref1, response;
	        if (err != null) {
	          return cb(err);
	        }
	        response = new VASTResponse();
	        if (!(((xml != null ? xml.documentElement : void 0) != null) && xml.documentElement.nodeName === "VAST")) {
	          return cb();
	        }
	        ref = xml.documentElement.childNodes;
	        for (j = 0, len1 = ref.length; j < len1; j++) {
	          node = ref[j];
	          if (node.nodeName === 'Error') {
	            response.errorURLTemplates.push(_this.parseNodeText(node));
	          }
	        }
	        ref1 = xml.documentElement.childNodes;
	        for (k = 0, len2 = ref1.length; k < len2; k++) {
	          node = ref1[k];
	          if (node.nodeName === 'Ad') {
	            ad = _this.parseAdElement(node);
	            if (ad != null) {
	              response.ads.push(ad);
	            } else {
	              _this.track(response.errorURLTemplates, {
	                ERRORCODE: 101
	              });
	            }
	          }
	        }
	        complete = function(errorAlreadyRaised) {
	          var l, len3, ref2;
	          if (errorAlreadyRaised == null) {
	            errorAlreadyRaised = false;
	          }
	          if (!response) {
	            return;
	          }
	          ref2 = response.ads;
	          for (l = 0, len3 = ref2.length; l < len3; l++) {
	            ad = ref2[l];
	            if (ad.nextWrapperURL != null) {
	              return;
	            }
	          }
	          if (response.ads.length === 0) {
	            if (!errorAlreadyRaised) {
	              _this.track(response.errorURLTemplates, {
	                ERRORCODE: 303
	              });
	            }
	            response = null;
	          }
	          return cb(null, response);
	        };
	        loopIndex = response.ads.length;
	        while (loopIndex--) {
	          ad = response.ads[loopIndex];
	          if (ad.nextWrapperURL == null) {
	            continue;
	          }
	          (function(ad) {
	            var baseURL, protocol, ref2;
	            if (parentURLs.length >= 10 || (ref2 = ad.nextWrapperURL, indexOf.call(parentURLs, ref2) >= 0)) {
	              _this.track(ad.errorURLTemplates, {
	                ERRORCODE: 302
	              });
	              response.ads.splice(response.ads.indexOf(ad), 1);
	              complete();
	              return;
	            }
	            if (ad.nextWrapperURL.indexOf('//') === 0) {
	              protocol = location.protocol;
	              ad.nextWrapperURL = "" + protocol + ad.nextWrapperURL;
	            } else if (ad.nextWrapperURL.indexOf('://') === -1) {
	              baseURL = url.slice(0, url.lastIndexOf('/'));
	              ad.nextWrapperURL = baseURL + "/" + ad.nextWrapperURL;
	            }
	            return _this._parse(ad.nextWrapperURL, parentURLs, options, function(err, wrappedResponse) {
	              var base, creative, errorAlreadyRaised, eventName, index, l, len3, len4, len5, len6, m, n, o, ref3, ref4, ref5, ref6, wrappedAd;
	              errorAlreadyRaised = false;
	              if (err != null) {
	                _this.track(ad.errorURLTemplates, {
	                  ERRORCODE: 301
	                });
	                response.ads.splice(response.ads.indexOf(ad), 1);
	                errorAlreadyRaised = true;
	              } else if (wrappedResponse == null) {
	                _this.track(ad.errorURLTemplates, {
	                  ERRORCODE: 303
	                });
	                response.ads.splice(response.ads.indexOf(ad), 1);
	                errorAlreadyRaised = true;
	              } else {
	                response.errorURLTemplates = response.errorURLTemplates.concat(wrappedResponse.errorURLTemplates);
	                index = response.ads.indexOf(ad);
	                response.ads.splice(index, 1);
	                ref3 = wrappedResponse.ads;
	                for (l = 0, len3 = ref3.length; l < len3; l++) {
	                  wrappedAd = ref3[l];
	                  wrappedAd.errorURLTemplates = ad.errorURLTemplates.concat(wrappedAd.errorURLTemplates);
	                  wrappedAd.impressionURLTemplates = ad.impressionURLTemplates.concat(wrappedAd.impressionURLTemplates);
	                  if (ad.trackingEvents != null) {
	                    ref4 = wrappedAd.creatives;
	                    for (m = 0, len4 = ref4.length; m < len4; m++) {
	                      creative = ref4[m];
	                      if (creative.type === 'linear') {
	                        ref5 = Object.keys(ad.trackingEvents);
	                        for (n = 0, len5 = ref5.length; n < len5; n++) {
	                          eventName = ref5[n];
	                          (base = creative.trackingEvents)[eventName] || (base[eventName] = []);
	                          creative.trackingEvents[eventName] = creative.trackingEvents[eventName].concat(ad.trackingEvents[eventName]);
	                        }
	                      }
	                    }
	                  }
	                  if (ad.videoClickTrackingURLTemplates != null) {
	                    ref6 = wrappedAd.creatives;
	                    for (o = 0, len6 = ref6.length; o < len6; o++) {
	                      creative = ref6[o];
	                      if (creative.type === 'linear') {
	                        creative.videoClickTrackingURLTemplates = creative.videoClickTrackingURLTemplates.concat(ad.videoClickTrackingURLTemplates);
	                      }
	                    }
	                  }
	                  response.ads.splice(index, 0, wrappedAd);
	                }
	              }
	              delete ad.nextWrapperURL;
	              return complete(errorAlreadyRaised);
	            });
	          })(ad);
	        }
	        return complete();
	      };
	    })(this));
	  };

	  VASTParser.childByName = function(node, name) {
	    var child, i, len, ref;
	    ref = node.childNodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      child = ref[i];
	      if (child.nodeName === name) {
	        return child;
	      }
	    }
	  };

	  VASTParser.childsByName = function(node, name) {
	    var child, childs, i, len, ref;
	    childs = [];
	    ref = node.childNodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      child = ref[i];
	      if (child.nodeName === name) {
	        childs.push(child);
	      }
	    }
	    return childs;
	  };

	  VASTParser.parseAdElement = function(adElement) {
	    var adTypeElement, i, len, ref;
	    ref = adElement.childNodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      adTypeElement = ref[i];
	      adTypeElement.id = adElement.getAttribute("id");
	      if (adTypeElement.nodeName === "Wrapper") {
	        return this.parseWrapperElement(adTypeElement);
	      } else if (adTypeElement.nodeName === "InLine") {
	        return this.parseInLineElement(adTypeElement);
	      }
	    }
	  };

	  VASTParser.parseWrapperElement = function(wrapperElement) {
	    var ad, creative, i, len, ref, wrapperCreativeElement, wrapperURLElement;
	    ad = this.parseInLineElement(wrapperElement);
	    wrapperURLElement = this.childByName(wrapperElement, "VASTAdTagURI");
	    if (wrapperURLElement != null) {
	      ad.nextWrapperURL = this.parseNodeText(wrapperURLElement);
	    } else {
	      wrapperURLElement = this.childByName(wrapperElement, "VASTAdTagURL");
	      if (wrapperURLElement != null) {
	        ad.nextWrapperURL = this.parseNodeText(this.childByName(wrapperURLElement, "URL"));
	      }
	    }
	    wrapperCreativeElement = null;
	    ref = ad.creatives;
	    for (i = 0, len = ref.length; i < len; i++) {
	      creative = ref[i];
	      if (creative.type === 'linear') {
	        wrapperCreativeElement = creative;
	        break;
	      }
	    }
	    if (wrapperCreativeElement != null) {
	      if (wrapperCreativeElement.trackingEvents != null) {
	        ad.trackingEvents = wrapperCreativeElement.trackingEvents;
	      }
	      if (wrapperCreativeElement.videoClickTrackingURLTemplates != null) {
	        ad.videoClickTrackingURLTemplates = wrapperCreativeElement.videoClickTrackingURLTemplates;
	      }
	    }
	    if (ad.nextWrapperURL != null) {
	      return ad;
	    }
	  };

	  VASTParser.parseInLineElement = function(inLineElement) {
	    var ad, creative, creativeElement, creativeTypeElement, i, j, k, len, len1, len2, node, ref, ref1, ref2;
	    ad = new VASTAd();
	    ad.id = inLineElement.id;
	    ref = inLineElement.childNodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      switch (node.nodeName) {
	        case "Error":
	          ad.errorURLTemplates.push(this.parseNodeText(node));
	          break;
	        case "Impression":
	          ad.impressionURLTemplates.push(this.parseNodeText(node));
	          break;
	        case "Creatives":
	          ref1 = this.childsByName(node, "Creative");
	          for (j = 0, len1 = ref1.length; j < len1; j++) {
	            creativeElement = ref1[j];
	            ref2 = creativeElement.childNodes;
	            for (k = 0, len2 = ref2.length; k < len2; k++) {
	              creativeTypeElement = ref2[k];
	              switch (creativeTypeElement.nodeName) {
	                case "Linear":
	                  creative = this.parseCreativeLinearElement(creativeTypeElement);
	                  if (creative) {
	                    ad.creatives.push(creative);
	                  }
	                  break;
	                case "CompanionAds":
	                  creative = this.parseCompanionAd(creativeTypeElement);
	                  if (creative) {
	                    ad.creatives.push(creative);
	                  }
	              }
	            }
	          }
	          break;
	        case "Extensions":
	          this.parseExtension(ad.extensions, this.childsByName(node, "Extension"));
	      }
	    }
	    return ad;
	  };

	  VASTParser.parseExtension = function(collection, extensions) {
	    var childNode, ext, extChild, extChildNodeAttr, extNode, extNodeAttr, i, j, k, l, len, len1, len2, len3, ref, ref1, ref2, results;
	    results = [];
	    for (i = 0, len = extensions.length; i < len; i++) {
	      extNode = extensions[i];
	      ext = new VASTAdExtension();
	      if (extNode.attributes) {
	        ref = extNode.attributes;
	        for (j = 0, len1 = ref.length; j < len1; j++) {
	          extNodeAttr = ref[j];
	          ext.attributes[extNodeAttr.nodeName] = extNodeAttr.nodeValue;
	        }
	      }
	      ref1 = extNode.childNodes;
	      for (k = 0, len2 = ref1.length; k < len2; k++) {
	        childNode = ref1[k];
	        extChild = new VASTAdExtensionChild();
	        extChild.name = childNode.nodeName;
	        extChild.value = childNode && (childNode.textContent || childNode.text || '');
	        if (childNode.attributes) {
	          ref2 = childNode.attributes;
	          for (l = 0, len3 = ref2.length; l < len3; l++) {
	            extChildNodeAttr = ref2[l];
	            extChild.attributes[extChildNodeAttr.nodeName] = extChildNodeAttr.nodeValue;
	          }
	        }
	        ext.children.push(extChild);
	      }
	      results.push(collection.push(ext));
	    }
	    return results;
	  };

	  VASTParser.parseCreativeLinearElement = function(creativeElement) {
	    var adParamsElement, base, clickTrackingElement, creative, customClickElement, eventName, i, j, k, l, len, len1, len2, len3, len4, len5, m, maintainAspectRatio, mediaFile, mediaFileElement, mediaFilesElement, n, offset, percent, ref, ref1, ref2, ref3, ref4, ref5, scalable, skipOffset, trackingElement, trackingEventsElement, trackingURLTemplate, videoClicksElement;
	    creative = new VASTCreativeLinear();
	    creative.duration = this.parseDuration(this.parseNodeText(this.childByName(creativeElement, "Duration")));
	    if (creative.duration === -1 && creativeElement.parentNode.parentNode.parentNode.nodeName !== 'Wrapper') {
	      return null;
	    }
	    skipOffset = creativeElement.getAttribute("skipoffset");
	    if (skipOffset == null) {
	      creative.skipDelay = null;
	    } else if (skipOffset.charAt(skipOffset.length - 1) === "%") {
	      percent = parseInt(skipOffset, 10);
	      creative.skipDelay = creative.duration * (percent / 100);
	    } else {
	      creative.skipDelay = this.parseDuration(skipOffset);
	    }
	    videoClicksElement = this.childByName(creativeElement, "VideoClicks");
	    if (videoClicksElement != null) {
	      creative.videoClickThroughURLTemplate = this.parseNodeText(this.childByName(videoClicksElement, "ClickThrough"));
	      ref = this.childsByName(videoClicksElement, "ClickTracking");
	      for (i = 0, len = ref.length; i < len; i++) {
	        clickTrackingElement = ref[i];
	        creative.videoClickTrackingURLTemplates.push(this.parseNodeText(clickTrackingElement));
	      }
	      ref1 = this.childsByName(videoClicksElement, "CustomClick");
	      for (j = 0, len1 = ref1.length; j < len1; j++) {
	        customClickElement = ref1[j];
	        creative.videoCustomClickURLTemplates.push(this.parseNodeText(customClickElement));
	      }
	    }
	    adParamsElement = this.childByName(creativeElement, "AdParameters");
	    if (adParamsElement != null) {
	      creative.adParameters = this.parseNodeText(adParamsElement);
	    }
	    ref2 = this.childsByName(creativeElement, "TrackingEvents");
	    for (k = 0, len2 = ref2.length; k < len2; k++) {
	      trackingEventsElement = ref2[k];
	      ref3 = this.childsByName(trackingEventsElement, "Tracking");
	      for (l = 0, len3 = ref3.length; l < len3; l++) {
	        trackingElement = ref3[l];
	        eventName = trackingElement.getAttribute("event");
	        trackingURLTemplate = this.parseNodeText(trackingElement);
	        if ((eventName != null) && (trackingURLTemplate != null)) {
	          if (eventName === "progress") {
	            offset = trackingElement.getAttribute("offset");
	            if (!offset) {
	              continue;
	            }
	            if (offset.charAt(offset.length - 1) === '%') {
	              eventName = "progress-" + offset;
	            } else {
	              eventName = "progress-" + (Math.round(this.parseDuration(offset)));
	            }
	          }
	          if ((base = creative.trackingEvents)[eventName] == null) {
	            base[eventName] = [];
	          }
	          creative.trackingEvents[eventName].push(trackingURLTemplate);
	        }
	      }
	    }
	    ref4 = this.childsByName(creativeElement, "MediaFiles");
	    for (m = 0, len4 = ref4.length; m < len4; m++) {
	      mediaFilesElement = ref4[m];
	      ref5 = this.childsByName(mediaFilesElement, "MediaFile");
	      for (n = 0, len5 = ref5.length; n < len5; n++) {
	        mediaFileElement = ref5[n];
	        mediaFile = new VASTMediaFile();
	        mediaFile.id = mediaFileElement.getAttribute("id");
	        mediaFile.fileURL = this.parseNodeText(mediaFileElement);
	        mediaFile.deliveryType = mediaFileElement.getAttribute("delivery");
	        mediaFile.codec = mediaFileElement.getAttribute("codec");
	        mediaFile.mimeType = mediaFileElement.getAttribute("type");
	        mediaFile.apiFramework = mediaFileElement.getAttribute("apiFramework");
	        mediaFile.bitrate = parseInt(mediaFileElement.getAttribute("bitrate") || 0);
	        mediaFile.minBitrate = parseInt(mediaFileElement.getAttribute("minBitrate") || 0);
	        mediaFile.maxBitrate = parseInt(mediaFileElement.getAttribute("maxBitrate") || 0);
	        mediaFile.width = parseInt(mediaFileElement.getAttribute("width") || 0);
	        mediaFile.height = parseInt(mediaFileElement.getAttribute("height") || 0);
	        scalable = mediaFileElement.getAttribute("scalable");
	        if (scalable && typeof scalable === "string") {
	          scalable = scalable.toLowerCase();
	          if (scalable === "true") {
	            mediaFile.scalable = true;
	          } else if (scalable === "false") {
	            mediaFile.scalable = false;
	          }
	        }
	        maintainAspectRatio = mediaFileElement.getAttribute("maintainAspectRatio");
	        if (maintainAspectRatio && typeof maintainAspectRatio === "string") {
	          maintainAspectRatio = maintainAspectRatio.toLowerCase();
	          if (maintainAspectRatio === "true") {
	            mediaFile.maintainAspectRatio = true;
	          } else if (maintainAspectRatio === "false") {
	            mediaFile.maintainAspectRatio = false;
	          }
	        }
	        creative.mediaFiles.push(mediaFile);
	      }
	    }
	    return creative;
	  };

	  VASTParser.parseCompanionAd = function(creativeElement) {
	    var base, companionAd, companionResource, creative, eventName, htmlElement, i, iframeElement, j, k, l, len, len1, len2, len3, len4, len5, m, n, ref, ref1, ref2, ref3, ref4, ref5, staticElement, trackingElement, trackingEventsElement, trackingURLTemplate;
	    creative = new VASTCreativeCompanion();
	    ref = this.childsByName(creativeElement, "Companion");
	    for (i = 0, len = ref.length; i < len; i++) {
	      companionResource = ref[i];
	      companionAd = new VASTCompanionAd();
	      companionAd.id = companionResource.getAttribute("id") || null;
	      companionAd.width = companionResource.getAttribute("width");
	      companionAd.height = companionResource.getAttribute("height");
	      ref1 = this.childsByName(companionResource, "HTMLResource");
	      for (j = 0, len1 = ref1.length; j < len1; j++) {
	        htmlElement = ref1[j];
	        companionAd.type = htmlElement.getAttribute("creativeType") || 'text/html';
	        companionAd.htmlResource = this.parseNodeText(htmlElement);
	      }
	      ref2 = this.childsByName(companionResource, "IFrameResource");
	      for (k = 0, len2 = ref2.length; k < len2; k++) {
	        iframeElement = ref2[k];
	        companionAd.type = iframeElement.getAttribute("creativeType") || 0;
	        companionAd.iframeResource = this.parseNodeText(iframeElement);
	      }
	      ref3 = this.childsByName(companionResource, "StaticResource");
	      for (l = 0, len3 = ref3.length; l < len3; l++) {
	        staticElement = ref3[l];
	        companionAd.type = staticElement.getAttribute("creativeType") || 0;
	        companionAd.staticResource = this.parseNodeText(staticElement);
	      }
	      ref4 = this.childsByName(companionResource, "TrackingEvents");
	      for (m = 0, len4 = ref4.length; m < len4; m++) {
	        trackingEventsElement = ref4[m];
	        ref5 = this.childsByName(trackingEventsElement, "Tracking");
	        for (n = 0, len5 = ref5.length; n < len5; n++) {
	          trackingElement = ref5[n];
	          eventName = trackingElement.getAttribute("event");
	          trackingURLTemplate = this.parseNodeText(trackingElement);
	          if ((eventName != null) && (trackingURLTemplate != null)) {
	            if ((base = companionAd.trackingEvents)[eventName] == null) {
	              base[eventName] = [];
	            }
	            companionAd.trackingEvents[eventName].push(trackingURLTemplate);
	          }
	        }
	      }
	      companionAd.companionClickThroughURLTemplate = this.parseNodeText(this.childByName(companionResource, "CompanionClickThrough"));
	      creative.variations.push(companionAd);
	    }
	    return creative;
	  };

	  VASTParser.parseDuration = function(durationString) {
	    var durationComponents, hours, minutes, seconds, secondsAndMS;
	    if (!(durationString != null)) {
	      return -1;
	    }
	    durationComponents = durationString.split(":");
	    if (durationComponents.length !== 3) {
	      return -1;
	    }
	    secondsAndMS = durationComponents[2].split(".");
	    seconds = parseInt(secondsAndMS[0]);
	    if (secondsAndMS.length === 2) {
	      seconds += parseFloat("0." + secondsAndMS[1]);
	    }
	    minutes = parseInt(durationComponents[1] * 60);
	    hours = parseInt(durationComponents[0] * 60 * 60);
	    if (isNaN(hours || isNaN(minutes || isNaN(seconds || minutes > 60 * 60 || seconds > 60)))) {
	      return -1;
	    }
	    return hours + minutes + seconds;
	  };

	  VASTParser.parseNodeText = function(node) {
	    return node && (node.textContent || node.text || '').trim();
	  };

	  return VASTParser;

	})();

	module.exports = VASTParser;



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var URLHandler, flash, xhr;

	xhr = __webpack_require__(8);

	flash = __webpack_require__(9);

	URLHandler = (function() {
	  function URLHandler() {}

	  URLHandler.get = function(url, options, cb) {
	    if (!cb) {
	      if (typeof options === 'function') {
	        cb = options;
	      }
	      options = {};
	    }
	    if (options.urlhandler && options.urlhandler.supported()) {
	      return options.urlhandler.get(url, options, cb);
	    } else if (xhr.supported()) {
	      return xhr.get(url, options, cb);
	    } else if (flash.supported()) {
	      return flash.get(url, options, cb);
	    } else {
	      return cb();
	    }
	  };

	  return URLHandler;

	})();

	module.exports = URLHandler;



/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var XHRURLHandler;

	XHRURLHandler = (function() {
	  function XHRURLHandler() {}

	  XHRURLHandler.xhr = function() {
	    var xhr;
	    xhr = new window.XMLHttpRequest();
	    if ('withCredentials' in xhr) {
	      return xhr;
	    }
	  };

	  XHRURLHandler.supported = function() {
	    return !!this.xhr();
	  };

	  XHRURLHandler.get = function(url, options, cb) {
	    var xhr;
	    try {
	      xhr = this.xhr();
	      xhr.open('GET', url);
	      xhr.timeout = options.timeout || 0;
	      xhr.withCredentials = options.withCredentials || false;
	      xhr.send();
	      return xhr.onreadystatechange = function() {
	        if (xhr.readyState === 4) {
	          return cb(null, xhr.responseXML);
	        }
	      };
	    } catch (error) {
	      return cb();
	    }
	  };

	  return XHRURLHandler;

	})();

	module.exports = XHRURLHandler;



/***/ }),
/* 9 */
/***/ (function(module, exports) {

	var FlashURLHandler;

	FlashURLHandler = (function() {
	  function FlashURLHandler() {}

	  FlashURLHandler.xdr = function() {
	    var xdr;
	    if (window.XDomainRequest) {
	      xdr = new XDomainRequest();
	    }
	    return xdr;
	  };

	  FlashURLHandler.supported = function() {
	    return !!this.xdr();
	  };

	  FlashURLHandler.get = function(url, options, cb) {
	    var xdr, xmlDocument;
	    if (xmlDocument = typeof window.ActiveXObject === "function" ? new window.ActiveXObject("Microsoft.XMLDOM") : void 0) {
	      xmlDocument.async = false;
	    } else {
	      return cb();
	    }
	    xdr = this.xdr();
	    xdr.open('GET', url);
	    xdr.timeout = options.timeout || 0;
	    xdr.withCredentials = options.withCredentials || false;
	    xdr.send();
	    xdr.onprogress = function() {};
	    return xdr.onload = function() {
	      xmlDocument.loadXML(xdr.responseText);
	      return cb(null, xmlDocument);
	    };
	  };

	  return FlashURLHandler;

	})();

	module.exports = FlashURLHandler;



/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var VASTResponse;

	VASTResponse = (function() {
	  function VASTResponse() {
	    this.ads = [];
	    this.errorURLTemplates = [];
	  }

	  return VASTResponse;

	})();

	module.exports = VASTResponse;



/***/ }),
/* 11 */
/***/ (function(module, exports) {

	var VASTAd;

	VASTAd = (function() {
	  function VASTAd() {
	    this.id = null;
	    this.errorURLTemplates = [];
	    this.impressionURLTemplates = [];
	    this.creatives = [];
	    this.extensions = [];
	  }

	  return VASTAd;

	})();

	module.exports = VASTAd;



/***/ }),
/* 12 */
/***/ (function(module, exports) {

	var VASTAdExtension;

	VASTAdExtension = (function() {
	  function VASTAdExtension() {
	    this.attributes = {};
	    this.children = [];
	  }

	  return VASTAdExtension;

	})();

	module.exports = VASTAdExtension;



/***/ }),
/* 13 */
/***/ (function(module, exports) {

	var VASTAdExtensionChild;

	VASTAdExtensionChild = (function() {
	  function VASTAdExtensionChild() {
	    this.name = null;
	    this.value = null;
	    this.attributes = {};
	  }

	  return VASTAdExtensionChild;

	})();

	module.exports = VASTAdExtensionChild;



/***/ }),
/* 14 */
/***/ (function(module, exports) {

	var VASTUtil;

	VASTUtil = (function() {
	  function VASTUtil() {}

	  VASTUtil.track = function(URLTemplates, variables) {
	    var URL, URLs, i, j, len, results;
	    URLs = this.resolveURLTemplates(URLTemplates, variables);
	    results = [];
	    for (j = 0, len = URLs.length; j < len; j++) {
	      URL = URLs[j];
	      if (typeof window !== "undefined" && window !== null) {
	        i = new Image();
	        results.push(i.src = URL);
	      } else {

	      }
	    }
	    return results;
	  };

	  VASTUtil.resolveURLTemplates = function(URLTemplates, variables) {
	    var URLTemplate, URLs, j, key, len, macro1, macro2, resolveURL, value;
	    URLs = [];
	    if (variables == null) {
	      variables = {};
	    }
	    if (!("CACHEBUSTING" in variables)) {
	      variables["CACHEBUSTING"] = Math.round(Math.random() * 1.0e+10);
	    }
	    variables["random"] = variables["CACHEBUSTING"];
	    for (j = 0, len = URLTemplates.length; j < len; j++) {
	      URLTemplate = URLTemplates[j];
	      resolveURL = URLTemplate;
	      if (!resolveURL) {
	        continue;
	      }
	      for (key in variables) {
	        value = variables[key];
	        macro1 = "[" + key + "]";
	        macro2 = "%%" + key + "%%";
	        resolveURL = resolveURL.replace(macro1, value);
	        resolveURL = resolveURL.replace(macro2, value);
	      }
	      URLs.push(resolveURL);
	    }
	    return URLs;
	  };

	  VASTUtil.storage = (function() {
	    var data, isDisabled, storage, storageError;
	    try {
	      storage = typeof window !== "undefined" && window !== null ? window.localStorage || window.sessionStorage : null;
	    } catch (error) {
	      storageError = error;
	      storage = null;
	    }
	    isDisabled = function(store) {
	      var e, testValue;
	      try {
	        testValue = '__VASTUtil__';
	        store.setItem(testValue, testValue);
	        if (store.getItem(testValue) !== testValue) {
	          return true;
	        }
	      } catch (error) {
	        e = error;
	        return true;
	      }
	      return false;
	    };
	    if ((storage == null) || isDisabled(storage)) {
	      data = {};
	      storage = {
	        length: 0,
	        getItem: function(key) {
	          return data[key];
	        },
	        setItem: function(key, value) {
	          data[key] = value;
	          this.length = Object.keys(data).length;
	        },
	        removeItem: function(key) {
	          delete data[key];
	          this.length = Object.keys(data).length;
	        },
	        clear: function() {
	          data = {};
	          this.length = 0;
	        }
	      };
	    }
	    return storage;
	  })();

	  return VASTUtil;

	})();

	module.exports = VASTUtil;



/***/ }),
/* 15 */
/***/ (function(module, exports) {

	var VASTCreative, VASTCreativeCompanion, VASTCreativeLinear, VASTCreativeNonLinear,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	VASTCreative = (function() {
	  function VASTCreative() {
	    this.trackingEvents = {};
	  }

	  return VASTCreative;

	})();

	VASTCreativeLinear = (function(superClass) {
	  extend(VASTCreativeLinear, superClass);

	  function VASTCreativeLinear() {
	    VASTCreativeLinear.__super__.constructor.apply(this, arguments);
	    this.type = "linear";
	    this.duration = 0;
	    this.skipDelay = null;
	    this.mediaFiles = [];
	    this.videoClickThroughURLTemplate = null;
	    this.videoClickTrackingURLTemplates = [];
	    this.videoCustomClickURLTemplates = [];
	    this.adParameters = null;
	  }

	  return VASTCreativeLinear;

	})(VASTCreative);

	VASTCreativeNonLinear = (function(superClass) {
	  extend(VASTCreativeNonLinear, superClass);

	  function VASTCreativeNonLinear() {
	    return VASTCreativeNonLinear.__super__.constructor.apply(this, arguments);
	  }

	  return VASTCreativeNonLinear;

	})(VASTCreative);

	VASTCreativeCompanion = (function(superClass) {
	  extend(VASTCreativeCompanion, superClass);

	  function VASTCreativeCompanion() {
	    this.type = "companion";
	    this.variations = [];
	    this.videoClickTrackingURLTemplates = [];
	  }

	  return VASTCreativeCompanion;

	})(VASTCreative);

	module.exports = {
	  VASTCreativeLinear: VASTCreativeLinear,
	  VASTCreativeNonLinear: VASTCreativeNonLinear,
	  VASTCreativeCompanion: VASTCreativeCompanion
	};



/***/ }),
/* 16 */
/***/ (function(module, exports) {

	var VASTMediaFile;

	VASTMediaFile = (function() {
	  function VASTMediaFile() {
	    this.id = null;
	    this.fileURL = null;
	    this.deliveryType = "progressive";
	    this.mimeType = null;
	    this.codec = null;
	    this.bitrate = 0;
	    this.minBitrate = 0;
	    this.maxBitrate = 0;
	    this.width = 0;
	    this.height = 0;
	    this.apiFramework = null;
	    this.scalable = null;
	    this.maintainAspectRatio = null;
	  }

	  return VASTMediaFile;

	})();

	module.exports = VASTMediaFile;



/***/ }),
/* 17 */
/***/ (function(module, exports) {

	var VASTCompanionAd;

	VASTCompanionAd = (function() {
	  function VASTCompanionAd() {
	    this.id = null;
	    this.width = 0;
	    this.height = 0;
	    this.type = null;
	    this.staticResource = null;
	    this.htmlResource = null;
	    this.iframeResource = null;
	    this.companionClickThroughURLTemplate = null;
	    this.trackingEvents = {};
	  }

	  return VASTCompanionAd;

	})();

	module.exports = VASTCompanionAd;



/***/ }),
/* 18 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var EventEmitter, VASTClient, VASTCreativeLinear, VASTTracker, VASTUtil,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	VASTClient = __webpack_require__(5);

	VASTUtil = __webpack_require__(14);

	VASTCreativeLinear = __webpack_require__(15).VASTCreativeLinear;

	EventEmitter = __webpack_require__(18).EventEmitter;

	VASTTracker = (function(superClass) {
	  extend(VASTTracker, superClass);

	  function VASTTracker(ad, creative) {
	    var eventName, events, ref;
	    this.ad = ad;
	    this.creative = creative;
	    this.muted = false;
	    this.impressed = false;
	    this.skipable = false;
	    this.skipDelayDefault = -1;
	    this.trackingEvents = {};
	    this.emitAlwaysEvents = ['creativeView', 'start', 'firstQuartile', 'midpoint', 'thirdQuartile', 'complete', 'resume', 'pause', 'rewind', 'skip', 'closeLinear', 'close'];
	    ref = this.creative.trackingEvents;
	    for (eventName in ref) {
	      events = ref[eventName];
	      this.trackingEvents[eventName] = events.slice(0);
	    }
	    if (this.creative instanceof VASTCreativeLinear) {
	      this.setDuration(this.creative.duration);
	      this.skipDelay = this.creative.skipDelay;
	      this.linear = true;
	      this.clickThroughURLTemplate = this.creative.videoClickThroughURLTemplate;
	      this.clickTrackingURLTemplates = this.creative.videoClickTrackingURLTemplates;
	    } else {
	      this.skipDelay = -1;
	      this.linear = false;
	    }
	    this.on('start', function() {
	      VASTClient.lastSuccessfullAd = +new Date();
	    });
	  }

	  VASTTracker.prototype.setDuration = function(duration) {
	    this.assetDuration = duration;
	    return this.quartiles = {
	      'firstQuartile': Math.round(25 * this.assetDuration) / 100,
	      'midpoint': Math.round(50 * this.assetDuration) / 100,
	      'thirdQuartile': Math.round(75 * this.assetDuration) / 100
	    };
	  };

	  VASTTracker.prototype.setProgress = function(progress) {
	    var eventName, events, i, len, percent, quartile, ref, skipDelay, time;
	    skipDelay = this.skipDelay === null ? this.skipDelayDefault : this.skipDelay;
	    if (skipDelay !== -1 && !this.skipable) {
	      if (skipDelay > progress) {
	        this.emit('skip-countdown', skipDelay - progress);
	      } else {
	        this.skipable = true;
	        this.emit('skip-countdown', 0);
	      }
	    }
	    if (this.linear && this.assetDuration > 0) {
	      events = [];
	      if (progress > 0) {
	        events.push("start");
	        percent = Math.round(progress / this.assetDuration * 100);
	        events.push("progress-" + percent + "%");
	        events.push("progress-" + (Math.round(progress)));
	        ref = this.quartiles;
	        for (quartile in ref) {
	          time = ref[quartile];
	          if ((time <= progress && progress <= (time + 1))) {
	            events.push(quartile);
	          }
	        }
	      }
	      for (i = 0, len = events.length; i < len; i++) {
	        eventName = events[i];
	        this.track(eventName, true);
	      }
	      if (progress < this.progress) {
	        this.track("rewind");
	      }
	    }
	    return this.progress = progress;
	  };

	  VASTTracker.prototype.setMuted = function(muted) {
	    if (this.muted !== muted) {
	      this.track(muted ? "mute" : "unmute");
	    }
	    return this.muted = muted;
	  };

	  VASTTracker.prototype.setPaused = function(paused) {
	    if (this.paused !== paused) {
	      this.track(paused ? "pause" : "resume");
	    }
	    return this.paused = paused;
	  };

	  VASTTracker.prototype.setFullscreen = function(fullscreen) {
	    if (this.fullscreen !== fullscreen) {
	      this.track(fullscreen ? "fullscreen" : "exitFullscreen");
	    }
	    return this.fullscreen = fullscreen;
	  };

	  VASTTracker.prototype.setSkipDelay = function(duration) {
	    if (typeof duration === 'number') {
	      return this.skipDelay = duration;
	    }
	  };

	  VASTTracker.prototype.load = function() {
	    if (!this.impressed) {
	      this.impressed = true;
	      this.trackURLs(this.ad.impressionURLTemplates);
	      return this.track("creativeView");
	    }
	  };

	  VASTTracker.prototype.errorWithCode = function(errorCode) {
	    return this.trackURLs(this.ad.errorURLTemplates, {
	      ERRORCODE: errorCode
	    });
	  };

	  VASTTracker.prototype.complete = function() {
	    return this.track("complete");
	  };

	  VASTTracker.prototype.close = function() {
	    return this.track(this.linear ? "closeLinear" : "close");
	  };

	  VASTTracker.prototype.stop = function() {};

	  VASTTracker.prototype.skip = function() {
	    this.track("skip");
	    return this.trackingEvents = [];
	  };

	  VASTTracker.prototype.click = function() {
	    var clickThroughURL, ref, variables;
	    if ((ref = this.clickTrackingURLTemplates) != null ? ref.length : void 0) {
	      this.trackURLs(this.clickTrackingURLTemplates);
	    }
	    if (this.clickThroughURLTemplate != null) {
	      if (this.linear) {
	        variables = {
	          CONTENTPLAYHEAD: this.progressFormated()
	        };
	      }
	      clickThroughURL = VASTUtil.resolveURLTemplates([this.clickThroughURLTemplate], variables)[0];
	      return this.emit("clickthrough", clickThroughURL);
	    }
	  };

	  VASTTracker.prototype.track = function(eventName, once) {
	    var idx, trackingURLTemplates;
	    if (once == null) {
	      once = false;
	    }
	    if (eventName === 'closeLinear' && ((this.trackingEvents[eventName] == null) && (this.trackingEvents['close'] != null))) {
	      eventName = 'close';
	    }
	    trackingURLTemplates = this.trackingEvents[eventName];
	    idx = this.emitAlwaysEvents.indexOf(eventName);
	    if (trackingURLTemplates != null) {
	      this.emit(eventName, '');
	      this.trackURLs(trackingURLTemplates);
	    } else if (idx !== -1) {
	      this.emit(eventName, '');
	    }
	    if (once === true) {
	      delete this.trackingEvents[eventName];
	      if (idx > -1) {
	        this.emitAlwaysEvents.splice(idx, 1);
	      }
	    }
	  };

	  VASTTracker.prototype.trackURLs = function(URLTemplates, variables) {
	    if (variables == null) {
	      variables = {};
	    }
	    if (this.linear) {
	      variables["CONTENTPLAYHEAD"] = this.progressFormated();
	    }
	    return VASTUtil.track(URLTemplates, variables);
	  };

	  VASTTracker.prototype.progressFormated = function() {
	    var h, m, ms, s, seconds;
	    seconds = parseInt(this.progress);
	    h = seconds / (60 * 60);
	    if (h.length < 2) {
	      h = "0" + h;
	    }
	    m = seconds / 60 % 60;
	    if (m.length < 2) {
	      m = "0" + m;
	    }
	    s = seconds % 60;
	    if (s.length < 2) {
	      s = "0" + m;
	    }
	    ms = parseInt((this.progress - seconds) * 100);
	    return h + ":" + m + ":" + s + "." + ms;
	  };

	  return VASTTracker;

	})(EventEmitter);

	module.exports = VASTTracker;



/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {// Copyright 2013-2014 Kevin Cox

	/*******************************************************************************
	*                                                                              *
	*  This software is provided 'as-is', without any express or implied           *
	*  warranty. In no event will the authors be held liable for any damages       *
	*  arising from the use of this software.                                      *
	*                                                                              *
	*  Permission is granted to anyone to use this software for any purpose,       *
	*  including commercial applications, and to alter it and redistribute it      *
	*  freely, subject to the following restrictions:                              *
	*                                                                              *
	*  1. The origin of this software must not be misrepresented; you must not     *
	*     claim that you wrote the original software. If you use this software in  *
	*     a product, an acknowledgment in the product documentation would be       *
	*     appreciated but is not required.                                         *
	*                                                                              *
	*  2. Altered source versions must be plainly marked as such, and must not be  *
	*     misrepresented as being the original software.                           *
	*                                                                              *
	*  3. This notice may not be removed or altered from any source distribution.  *
	*                                                                              *
	*******************************************************************************/

	+function(){
	"use strict";

	var array = /\[([^\[]*)\]$/;

	/// URL Regex.
	/**
	 * This regex splits the URL into parts.  The capture groups catch the important
	 * bits.
	 * 
	 * Each section is optional, so to work on any part find the correct top level
	 * `(...)?` and mess around with it.
	 */
	var regex = /^(?:([a-z]*):)?(?:\/\/)?(?:([^:@]*)(?::([^@]*))?@)?([0-9a-z-._]+)?(?::([0-9]*))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/i;
	//               1 - scheme              2 - user    3 = pass    4 - host           5 - port  6 - path        7 - query    8 - hash

	var noslash = ["mailto","bitcoin"];

	var self = {
		/** Parse a query string.
		 *
		 * This function parses a query string (sometimes called the search
		 * string).  It takes a query string and returns a map of the results.
		 *
		 * Keys are considered to be everything up to the first '=' and values are
		 * everything afterwords.  Since URL-decoding is done after parsing, keys
		 * and values can have any values, however, '=' have to be encoded in keys
		 * while '?' and '&' have to be encoded anywhere (as they delimit the
		 * kv-pairs).
		 *
		 * Keys and values will always be strings, except if there is a key with no
		 * '=' in which case it will be considered a flag and will be set to true.
		 * Later values will override earlier values.
		 *
		 * Array keys are also supported.  By default keys in the form of `name[i]`
		 * will be returned like that as strings.  However, if you set the `array`
		 * flag in the options object they will be parsed into arrays.  Note that
		 * although the object returned is an `Array` object all keys will be
		 * written to it.  This means that if you have a key such as `k[forEach]`
		 * it will overwrite the `forEach` function on that array.  Also note that
		 * string properties always take precedence over array properties,
		 * irrespective of where they are in the query string.
		 *
		 *   url.get("array[1]=test&array[foo]=bar",{array:true}).array[1]  === "test"
		 *   url.get("array[1]=test&array[foo]=bar",{array:true}).array.foo === "bar"
		 *   url.get("array=notanarray&array[0]=1",{array:true}).array      === "notanarray"
		 *
		 * If array parsing is enabled keys in the form of `name[]` will
		 * automatically be given the next available index.  Note that this can be
		 * overwritten with later values in the query string.  For this reason is
		 * is best not to mix the two formats, although it is safe (and often
		 * useful) to add an automatic index argument to the end of a query string.
		 *
		 *   url.get("a[]=0&a[]=1&a[0]=2", {array:true})  -> {a:["2","1"]};
		 *   url.get("a[0]=0&a[1]=1&a[]=2", {array:true}) -> {a:["0","1","2"]};
		 *
		 * @param{string} q The query string (the part after the '?').
		 * @param{{full:boolean,array:boolean}=} opt Options.
		 *
		 * - full: If set `q` will be treated as a full url and `q` will be built.
		 *   by calling #parse to retrieve the query portion.
		 * - array: If set keys in the form of `key[i]` will be treated
		 *   as arrays/maps.
		 *
		 * @return{!Object.<string, string|Array>} The parsed result.
		 */
		"get": function(q, opt){
			q = q || "";
			if ( typeof opt          == "undefined" ) opt = {};
			if ( typeof opt["full"]  == "undefined" ) opt["full"] = false;
			if ( typeof opt["array"] == "undefined" ) opt["array"] = false;
			
			if ( opt["full"] === true )
			{
				q = self["parse"](q, {"get":false})["query"] || "";
			}
			
			var o = {};
			
			var c = q.split("&");
			for (var i = 0; i < c.length; i++)
			{
				if (!c[i].length) continue;
				
				var d = c[i].indexOf("=");
				var k = c[i], v = true;
				if ( d >= 0 )
				{
					k = c[i].substr(0, d);
					v = c[i].substr(d+1);
					
					v = decodeURIComponent(v);
				}
				
				if (opt["array"])
				{
					var inds = [];
					var ind;
					var curo = o;
					var curk = k;
					while (ind = curk.match(array)) // Array!
					{
						curk = curk.substr(0, ind.index);
						inds.unshift(decodeURIComponent(ind[1]));
					}
					curk = decodeURIComponent(curk);
					if (inds.some(function(i)
					{
						if ( typeof curo[curk] == "undefined" ) curo[curk] = [];
						if (!Array.isArray(curo[curk]))
						{
							//console.log("url.get: Array property "+curk+" already exists as string!");
							return true;
						}
						
						curo = curo[curk];
						
						if ( i === "" ) i = curo.length;
						
						curk = i;
					})) continue;
					curo[curk] = v;
					continue;
				}
				
				k = decodeURIComponent(k);
				
				//typeof o[k] == "undefined" || console.log("Property "+k+" already exists!");
				o[k] = v;
			}
			
			return o;
		},
		
		/** Build a get query from an object.
		 *
		 * This constructs a query string from the kv pairs in `data`.  Calling
		 * #get on the string returned should return an object identical to the one
		 * passed in except all non-boolean scalar types become strings and all
		 * object types become arrays (non-integer keys are still present, see
		 * #get's documentation for more details).
		 *
		 * This always uses array syntax for describing arrays.  If you want to
		 * serialize them differently (like having the value be a JSON array and
		 * have a plain key) you will need to do that before passing it in.
		 *
		 * All keys and values are supported (binary data anyone?) as they are
		 * properly URL-encoded and #get properly decodes.
		 *
		 * @param{Object} data The kv pairs.
		 * @param{string} prefix The properly encoded array key to put the
		 *   properties.  Mainly intended for internal use.
		 * @return{string} A URL-safe string.
		 */
		"buildget": function(data, prefix){
			var itms = [];
			for ( var k in data )
			{
				var ek = encodeURIComponent(k);
				if ( typeof prefix != "undefined" )
					ek = prefix+"["+ek+"]";
				
				var v = data[k];
				
				switch (typeof v)
				{
					case 'boolean':
						if(v) itms.push(ek);
						break;
					case 'number':
						v = v.toString();
					case 'string':
						itms.push(ek+"="+encodeURIComponent(v));
						break;
					case 'object':
						itms.push(self["buildget"](v, ek));
						break;
				}
			}
			return itms.join("&");
		},
		
		/** Parse a URL
		 * 
		 * This breaks up a URL into components.  It attempts to be very liberal
		 * and returns the best result in most cases.  This means that you can
		 * often pass in part of a URL and get correct categories back.  Notably,
		 * this works for emails and Jabber IDs, as well as adding a '?' to the
		 * beginning of a string will parse the whole thing as a query string.  If
		 * an item is not found the property will be undefined.  In some cases an
		 * empty string will be returned if the surrounding syntax but the actual
		 * value is empty (example: "://example.com" will give a empty string for
		 * scheme.)  Notably the host name will always be set to something.
		 * 
		 * Returned properties.
		 * 
		 * - **scheme:** The url scheme. (ex: "mailto" or "https")
		 * - **user:** The username.
		 * - **pass:** The password.
		 * - **host:** The hostname. (ex: "localhost", "123.456.7.8" or "example.com")
		 * - **port:** The port, as a number. (ex: 1337)
		 * - **path:** The path. (ex: "/" or "/about.html")
		 * - **query:** "The query string. (ex: "foo=bar&v=17&format=json")
		 * - **get:** The query string parsed with get.  If `opt.get` is `false` this
		 *   will be absent
		 * - **hash:** The value after the hash. (ex: "myanchor")
		 *   be undefined even if `query` is set.
		 *
		 * @param{string} url The URL to parse.
		 * @param{{get:Object}=} opt Options:
		 *
		 * - get: An options argument to be passed to #get or false to not call #get.
		 *    **DO NOT** set `full`.
		 *
		 * @return{!Object} An object with the parsed values.
		 */
		"parse": function(url, opt) {
			
			if ( typeof opt == "undefined" ) opt = {};
			
			var md = url.match(regex) || [];
			
			var r = {
				"url":    url,
				
				"scheme": md[1],
				"user":   md[2],
				"pass":   md[3],
				"host":   md[4],
				"port":   md[5] && +md[5],
				"path":   md[6],
				"query":  md[7],
				"hash":   md[8],
			};
			
			if ( opt.get !== false )
				r["get"] = r["query"] && self["get"](r["query"], opt.get);
			
			return r;
		},
		
		/** Build a URL from components.
		 * 
		 * This pieces together a url from the properties of the passed in object.
		 * In general passing the result of `parse()` should return the URL.  There
		 * may differences in the get string as the keys and values might be more
		 * encoded then they were originally were.  However, calling `get()` on the
		 * two values should yield the same result.
		 * 
		 * Here is how the parameters are used.
		 * 
		 *  - url: Used only if no other values are provided.  If that is the case
		 *     `url` will be returned verbatim.
		 *  - scheme: Used if defined.
		 *  - user: Used if defined.
		 *  - pass: Used if defined.
		 *  - host: Used if defined.
		 *  - path: Used if defined.
		 *  - query: Used only if `get` is not provided and non-empty.
		 *  - get: Used if non-empty.  Passed to #buildget and the result is used
		 *    as the query string.
		 *  - hash: Used if defined.
		 * 
		 * These are the options that are valid on the options object.
		 * 
		 *  - useemptyget: If truthy, a question mark will be appended for empty get
		 *    strings.  This notably makes `build()` and `parse()` fully symmetric.
		 *
		 * @param{Object} data The pieces of the URL.
		 * @param{Object} opt Options for building the url.
		 * @return{string} The URL.
		 */
		"build": function(data, opt){
			opt = opt || {};
			
			var r = "";
			
			if ( typeof data["scheme"] != "undefined" )
			{
				r += data["scheme"];
				r += (noslash.indexOf(data["scheme"])>=0)?":":"://";
			}
			if ( typeof data["user"] != "undefined" )
			{
				r += data["user"];
				if ( typeof data["pass"] == "undefined" )
				{
					r += "@";
				}
			}
			if ( typeof data["pass"] != "undefined" ) r += ":" + data["pass"] + "@";
			if ( typeof data["host"] != "undefined" ) r += data["host"];
			if ( typeof data["port"] != "undefined" ) r += ":" + data["port"];
			if ( typeof data["path"] != "undefined" ) r += data["path"];
			
			if (opt["useemptyget"])
			{
				if      ( typeof data["get"]   != "undefined" ) r += "?" + self["buildget"](data["get"]);
				else if ( typeof data["query"] != "undefined" ) r += "?" + data["query"];
			}
			else
			{
				// If .get use it.  If .get leads to empty, use .query.
				var q = data["get"] && self["buildget"](data["get"]) || data["query"];
				if (q) r += "?" + q;
			}
			
			if ( typeof data["hash"] != "undefined" ) r += "#" + data["hash"];
			
			return r || data["url"] || "";
		},
	};

	if ( false ) define(self);
	else if ( true ) module['exports'] = self;
	else window["url"] = self;

	}();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)(module)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OS_VERSIONS = exports.OS = exports.DEVICES = exports.BROWSERS = undefined;
	exports.isMobile = isMobile;
	exports.isAndroid = isAndroid;
	exports.isIOS = isIOS;

	var _reTree = __webpack_require__(23);

	var reTree = _interopRequireWildcard(_reTree);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var BROWSERS = {
	    CHROME: "chrome",
	    FIREFOX: "firefox",
	    SAFARI: "safari",
	    OPERA: "opera",
	    IE: "ie",
	    MS_EDGE: "ms-edge",
	    FB_MESSANGER: "fb-messanger",
	    UNKNOWN: "unknown"
	};
	var DEVICES = {
	    ANDROID: "android",
	    I_PAD: "ipad",
	    IPHONE: "iphone",
	    I_POD: "ipod",
	    BLACKBERRY: "blackberry",
	    FIREFOX_OS: "firefox-os",
	    CHROME_BOOK: "chrome-book",
	    WINDOWS_PHONE: "windows-phone",
	    PS4: "ps4",
	    VITA: "vita",
	    CHROMECAST: "chromecast",
	    APPLE_TV: "apple-tv",
	    GOOGLE_TV: "google-tv",
	    OTHER_TV: "other-tv",
	    UNKNOWN: "unknown"
	};
	var OS = {
	    WINDOWS: "windows",
	    MAC: "mac",
	    IOS: "ios",
	    ANDROID: "android",
	    LINUX: "linux",
	    UNIX: "unix",
	    FIREFOX_OS: "firefox-os",
	    CHROME_OS: "chrome-os",
	    WINDOWS_PHONE: "windows-phone",
	    UNKNOWN: "unknown"
	};
	var OS_VERSIONS = {
	    WINDOWS_3_11: "windows-3-11",
	    WINDOWS_95: "windows-95",
	    WINDOWS_ME: "windows-me",
	    WINDOWS_98: "windows-98",
	    WINDOWS_CE: "windows-ce",
	    WINDOWS_2000: "windows-2000",
	    WINDOWS_XP: "windows-xp",
	    WINDOWS_SERVER_2003: "windows-server-2003",
	    WINDOWS_VISTA: "windows-vista",
	    WINDOWS_7: "windows-7",
	    WINDOWS_8_1: "windows-8-1",
	    WINDOWS_8: "windows-8",
	    WINDOWS_10: "windows-10",
	    WINDOWS_PHONE_7_5: "windows-phone-7-5",
	    WINDOWS_PHONE_8_1: "windows-phone-8-1",
	    WINDOWS_PHONE_10: "windows-phone-10",
	    WINDOWS_NT_4_0: "windows-nt-4-0",
	    MACOSX_15: "mac-os-x-15",
	    MACOSX_14: "mac-os-x-14",
	    MACOSX_13: "mac-os-x-13",
	    MACOSX_12: "mac-os-x-12",
	    MACOSX_11: "mac-os-x-11",
	    MACOSX_10: "mac-os-x-10",
	    MACOSX_9: "mac-os-x-9",
	    MACOSX_8: "mac-os-x-8",
	    MACOSX_7: "mac-os-x-7",
	    MACOSX_6: "mac-os-x-6",
	    MACOSX_5: "mac-os-x-5",
	    MACOSX_4: "mac-os-x-4",
	    MACOSX_3: "mac-os-x-3",
	    MACOSX_2: "mac-os-x-2",
	    MACOSX: "mac-os-x",
	    UNKNOWN: "unknown"
	};
	function deviceDetector() {
	    var OS_RE = {
	        WINDOWS: { and: [{ or: [/\bWindows|(Win\d\d)\b/, /\bWin 9x\b/] }, { not: /\bWindows Phone\b/ }] },
	        MAC: { and: [/\bMac OS\b/, { not: /Windows Phone/ }] },
	        IOS: { and: [{ or: [/\biPad\b/, /\biPhone\b/, /\biPod\b/] }, { not: /Windows Phone/ }] },
	        ANDROID: { and: [/\bAndroid\b/, { not: /Windows Phone/ }] },
	        LINUX: /\bLinux\b/,
	        UNIX: /\bUNIX\b/,
	        FIREFOX_OS: { and: [/\bFirefox\b/, /Mobile\b/] },
	        CHROME_OS: /\bCrOS\b/,
	        WINDOWS_PHONE: { or: [/\bIEMobile\b/, /\bWindows Phone\b/] },
	        PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
	        VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
	    };

	    var BROWSERS_RE = {
	        CHROME: { and: [{ or: [/\bChrome\b/, /\bCriOS\b/] }, { not: { or: [/\bOPR\b/, /\bEdge\b/] } }] },
	        FIREFOX: /\bFirefox\b/,
	        SAFARI: { and: [/^((?!CriOS).)*\Safari\b.*$/, { not: { or: [/\bOPR\b/, /\bEdge\b/, /Windows Phone/] } }] },
	        OPERA: { or: [/Opera\b/, /\bOPR\b/] },
	        IE: { or: [/\bMSIE\b/, /\bTrident\b/, /^Mozilla\/5\.0 \(Windows NT 10\.0; Win64; x64\)$/] },
	        MS_EDGE: { or: [/\bEdge\b/] },
	        PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
	        VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/,
	        FB_MESSANGER: /\bFBAN\/MessengerForiOS\b/
	    };

	    var DEVICES_RE = {
	        ANDROID: { and: [/\bAndroid\b/, { not: /Windows Phone/ }] },
	        I_PAD: /\biPad\b/,
	        IPHONE: { and: [/\biPhone\b/, { not: /Windows Phone/ }] },
	        I_POD: /\biPod\b/,
	        BLACKBERRY: /\bblackberry\b/,
	        FIREFOX_OS: { and: [/\bFirefox\b/, /\bMobile\b/] },
	        CHROME_BOOK: /\bCrOS\b/,
	        WINDOWS_PHONE: { or: [/\bIEMobile\b/, /\bWindows Phone\b/] },
	        PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
	        CHROMECAST: /\bCrKey\b/,
	        APPLE_TV: { or: [/^iTunes-AppleTV\/4.1$/, /\bApple TV\b/] },
	        GOOGLE_TV: /\bGoogleTV\b/,
	        OTHER_TV: { or: [/\bHbbTV\b/, /\bSMART\-TV\b/, /\bWebTV\b/] },
	        VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
	    };

	    var OS_VERSIONS_RE = {
	        WINDOWS_3_11: /Win16/,
	        WINDOWS_95: /(Windows 95|Win95|Windows_95)/,
	        WINDOWS_ME: /(Win 9x 4.90|Windows ME)/,
	        WINDOWS_98: /(Windows 98|Win98)/,
	        WINDOWS_CE: /Windows CE/,
	        WINDOWS_2000: /(Windows NT 5.0|Windows 2000)/,
	        WINDOWS_XP: /(Windows NT 5.1|Windows XP)/,
	        WINDOWS_SERVER_2003: /Windows NT 5.2/,
	        WINDOWS_VISTA: /Windows NT 6.0/,
	        WINDOWS_7: /(Windows 7|Windows NT 6.1)/,
	        WINDOWS_8_1: /(Windows 8.1|Windows NT 6.3)/,
	        WINDOWS_8: /(Windows 8|Windows NT 6.2)/,
	        WINDOWS_10: /(Windows NT 10.0)/,
	        WINDOWS_PHONE_7_5: /(Windows Phone OS 7.5)/,
	        WINDOWS_PHONE_8_1: /(Windows Phone 8.1)/,
	        WINDOWS_PHONE_10: /(Windows Phone 10)/,
	        WINDOWS_NT_4_0: { and: [/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/, { not: /Windows NT 10.0/ }] },
	        MACOSX: /(MAC OS X\s*[^ 0-9])/,
	        MACOSX_3: /(Darwin 10.3|Mac OS X 10.3)/,
	        MACOSX_4: /(Darwin 10.4|Mac OS X 10.4)/,
	        MACOSX_5: /(Mac OS X 10.5)/,
	        MACOSX_6: /(Mac OS X 10.6)/,
	        MACOSX_7: /(Mac OS X 10.7)/,
	        MACOSX_8: /(Mac OS X 10.8)/,
	        MACOSX_9: /(Mac OS X 10.9)/,
	        MACOSX_10: /(Mac OS X 10.10)/,
	        MACOSX_11: /(Mac OS X 10.11)/,
	        MACOSX_12: /(Mac OS X 10.12)/,
	        MACOSX_13: /(Mac OS X 10.13)/,
	        MACOSX_14: /(Mac OS X 10.14)/,
	        MACOSX_15: /(Mac OS X 10.15)/
	    };

	    var BROWSER_VERSIONS_RE_MAP = {
	        CHROME: [/\bChrome\/([\d\.]+)\b/, /\bCriOS\/([\d\.]+)\b/],
	        FIREFOX: /\bFirefox\/([\d\.]+)\b/,
	        SAFARI: /\bVersion\/([\d\.]+)\b/,
	        OPERA: [/\bVersion\/([\d\.]+)\b/, /\bOPR\/([\d\.]+)\b/],
	        IE: [/\bMSIE ([\d\.]+\w?)\b/, /\brv:([\d\.]+\w?)\b/],
	        MS_EDGE: /\bEdge\/([\d\.]+)\b/
	    };

	    var BROWSER_VERSIONS_RE = Object.keys(BROWSER_VERSIONS_RE_MAP).reduce(function (obj, key) {
	        obj[BROWSERS[key]] = BROWSER_VERSIONS_RE_MAP[key];
	        return obj;
	    }, {});

	    var ua = navigator.userAgent;

	    var deviceInfo = {
	        raw: {
	            userAgent: ua,
	            os: {},
	            browser: {},
	            device: {}
	        }
	    };

	    deviceInfo.raw.os = Object.keys(OS).reduce(function (obj, item) {
	        obj[OS[item]] = reTree.test(ua, OS_RE[item]);
	        return obj;
	    }, {});

	    deviceInfo.raw.browser = Object.keys(BROWSERS).reduce(function (obj, item) {
	        obj[BROWSERS[item]] = reTree.test(ua, BROWSERS_RE[item]);
	        return obj;
	    }, {});

	    deviceInfo.raw.device = Object.keys(DEVICES).reduce(function (obj, item) {
	        obj[DEVICES[item]] = reTree.test(ua, DEVICES_RE[item]);
	        return obj;
	    }, {});

	    deviceInfo.raw.os_version = Object.keys(OS_VERSIONS).reduce(function (obj, item) {
	        obj[OS_VERSIONS[item]] = reTree.test(ua, OS_VERSIONS_RE[item]);
	        return obj;
	    }, {});

	    deviceInfo.os = [OS.WINDOWS, OS.IOS, OS.MAC, OS.ANDROID, OS.LINUX, OS.UNIX, OS.FIREFOX_OS, OS.CHROME_OS, OS.WINDOWS_PHONE].reduce(function (previousValue, currentValue) {
	        return previousValue === OS.UNKNOWN && deviceInfo.raw.os[currentValue] ? currentValue : previousValue;
	    }, OS.UNKNOWN);

	    deviceInfo.browser = [BROWSERS.CHROME, BROWSERS.FIREFOX, BROWSERS.SAFARI, BROWSERS.OPERA, BROWSERS.IE, BROWSERS.MS_EDGE, BROWSERS.FB_MESSANGER].reduce(function (previousValue, currentValue) {
	        return previousValue === BROWSERS.UNKNOWN && deviceInfo.raw.browser[currentValue] ? currentValue : previousValue;
	    }, BROWSERS.UNKNOWN);

	    deviceInfo.device = [DEVICES.ANDROID, DEVICES.I_PAD, DEVICES.IPHONE, DEVICES.I_POD, DEVICES.BLACKBERRY, DEVICES.FIREFOX_OS, DEVICES.CHROME_BOOK, DEVICES.WINDOWS_PHONE, DEVICES.PS4, DEVICES.CHROMECAST, DEVICES.APPLE_TV, DEVICES.GOOGLE_TV, DEVICES.OTHER_TV, DEVICES.VITA].reduce(function (previousValue, currentValue) {
	        return previousValue === DEVICES.UNKNOWN && deviceInfo.raw.device[currentValue] ? currentValue : previousValue;
	    }, DEVICES.UNKNOWN);

	    deviceInfo.os_version = [OS_VERSIONS.WINDOWS_3_11, OS_VERSIONS.WINDOWS_95, OS_VERSIONS.WINDOWS_ME, OS_VERSIONS.WINDOWS_98, OS_VERSIONS.WINDOWS_CE, OS_VERSIONS.WINDOWS_2000, OS_VERSIONS.WINDOWS_XP, OS_VERSIONS.WINDOWS_SERVER_2003, OS_VERSIONS.WINDOWS_VISTA, OS_VERSIONS.WINDOWS_7, OS_VERSIONS.WINDOWS_8_1, OS_VERSIONS.WINDOWS_8, OS_VERSIONS.WINDOWS_10, OS_VERSIONS.WINDOWS_PHONE_7_5, OS_VERSIONS.WINDOWS_PHONE_8_1, OS_VERSIONS.WINDOWS_PHONE_10, OS_VERSIONS.WINDOWS_NT_4_0, OS_VERSIONS.MACOSX, OS_VERSIONS.MACOSX_3, OS_VERSIONS.MACOSX_4, OS_VERSIONS.MACOSX_5, OS_VERSIONS.MACOSX_6, OS_VERSIONS.MACOSX_7, OS_VERSIONS.MACOSX_8, OS_VERSIONS.MACOSX_9, OS_VERSIONS.MACOSX_10, OS_VERSIONS.MACOSX_11, OS_VERSIONS.MACOSX_12, OS_VERSIONS.MACOSX_13, OS_VERSIONS.MACOSX_14, OS_VERSIONS.MACOSX_15].reduce(function (previousValue, currentValue) {
	        return previousValue === OS_VERSIONS.UNKNOWN && deviceInfo.raw.os_version[currentValue] ? currentValue : previousValue;
	    }, OS_VERSIONS.UNKNOWN);

	    deviceInfo.browser_version = "0";
	    if (deviceInfo.browser !== BROWSERS.UNKNOWN) {
	        var re = BROWSER_VERSIONS_RE[deviceInfo.browser];
	        var res = reTree.exec(ua, re);
	        if (!!res) {
	            deviceInfo.browser_version = res[1];
	        }
	    }

	    deviceInfo.isMobile = function () {
	        return [DEVICES.ANDROID, DEVICES.I_PAD, DEVICES.IPHONE, DEVICES.I_POD, DEVICES.BLACKBERRY, DEVICES.FIREFOX_OS, DEVICES.WINDOWS_PHONE, DEVICES.VITA].some(function (item) {
	            return deviceInfo.device == item;
	        });
	    };

	    deviceInfo.isTablet = function () {
	        return [DEVICES.I_PAD, DEVICES.FIREFOX_OS].some(function (item) {
	            return deviceInfo.device == item;
	        });
	    };

	    deviceInfo.isDesktop = function () {
	        return [DEVICES.PS4, DEVICES.CHROME_BOOK, DEVICES.UNKNOWN].some(function (item) {
	            return deviceInfo.device == item;
	        });
	    };

	    return deviceInfo;
	}

	var deviceInfo = deviceDetector();

	exports.default = deviceInfo;
	exports.BROWSERS = BROWSERS;
	exports.DEVICES = DEVICES;
	exports.OS = OS;
	exports.OS_VERSIONS = OS_VERSIONS;
	function isMobile() {
	    return deviceInfo.device !== 'unknown';
	};
	function isAndroid() {
	    return deviceInfo.device === DEVICES.ANDROID || deviceInfo.OS === OS.ANDROID;
	};
	function isIOS() {
	    return deviceInfo.os === OS.IOS || deviceInfo.device === DEVICES.I_POD || deviceInfo.device === DEVICES.IPHONE;
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* global window */
	/* global angular */
	/* global module */

	(function (module, window, angular) {
	    "use strict";

	    function test(string, regex) {
	        if (typeof regex === 'string' || regex instanceof String) {
	            regex=new RegExp(regex);
	        }

	        if (regex instanceof RegExp) {
	            return regex.test(string);
	        }
	        else if (regex && Array.isArray(regex.and)) {
	            return regex.and.every(function (item) {
	                return test(string, item);
	            });
	        }
	        else if (regex && Array.isArray(regex.or)) {
	            return regex.or.some(function (item) {
	                return test(string, item);
	            });
	        }
	        else if (regex && regex.not) {
	            return !test(string, regex.not);
	        }
	        else {
	            return false;
	        }
	    }

	    function exec(string, regex) {
	        if (typeof regex === 'string' || regex instanceof String) {
	            regex=new RegExp(regex);
	        }

	        if (regex instanceof RegExp) {
	            return regex.exec(string);
	        }
	        else if (regex && Array.isArray(regex)) {
	            return regex.reduce(function (res, item) {
	                return (!!res) ? res : exec(string, item);
	            }, null);
	        }
	        else {
	            return null;
	        }
	    }

	    if (!!angular) {
	        angular.module("reTree", []).factory("reTree", [function () {
	            return {
	                test: test,
	                exec: exec
	            };
	        }]);
	    }

	    if (!!window) {
	        window.reTree = {
	            test: test,
	            exec: exec
	        };
	    }

	    if (!!module) {
	        module.exports = {
	            test: test,
	            exec: exec
	        };
	    }
	})( false ? null : module, typeof window === 'undefined' ? null : window, typeof angular === 'undefined' ? null : angular);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)(module)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	//var places = require("./places-src");

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.hostsData = hostsData;
	var adNetworckNameSrc = __webpack_require__(25);
	__webpack_require__(26);

	function hostsData(hostName, adNetworckName) {
	    //    let res = Object.keys(places).find(
	    //        hostNameKey => hostNameKey.length < hostName.length
	    //        ? hostName.slice(-1 - hostNameKey.length) === ('.' + hostNameKey)
	    //        : hostName === hostNameKey
	    //    );
	    //    return res && oHosts[res]
	    adNetworckName = adNetworckNameSrc;
	    // SSI includes
	    return '<!--#echo var="boxdigital_place_before"--><!--# include virtual="/boxdigital-place?dbid=$boxdigital_referer" --><!--#echo var="boxdigital_place_after"-->';
	}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = '<!--#echo var="digitalbox_ad_network" encoding="none" default="adfox"-->';

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	"use strict";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  "use strict";
	  var builder, defaults, parser, processors,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  defaults = __webpack_require__(28);

	  builder = __webpack_require__(29);

	  parser = __webpack_require__(52);

	  processors = __webpack_require__(88);

	  exports.defaults = defaults.defaults;

	  exports.processors = processors;

	  exports.ValidationError = (function(superClass) {
	    extend(ValidationError, superClass);

	    function ValidationError(message) {
	      this.message = message;
	    }

	    return ValidationError;

	  })(Error);

	  exports.Builder = builder.Builder;

	  exports.Parser = parser.Parser;

	  exports.parseString = parser.parseString;

	}).call(this);


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  exports.defaults = {
	    "0.1": {
	      explicitCharkey: false,
	      trim: true,
	      normalize: true,
	      normalizeTags: false,
	      attrkey: "@",
	      charkey: "#",
	      explicitArray: false,
	      ignoreAttrs: false,
	      mergeAttrs: false,
	      explicitRoot: false,
	      validator: null,
	      xmlns: false,
	      explicitChildren: false,
	      childkey: '@@',
	      charsAsChildren: false,
	      includeWhiteChars: false,
	      async: false,
	      strict: true,
	      attrNameProcessors: null,
	      attrValueProcessors: null,
	      tagNameProcessors: null,
	      valueProcessors: null,
	      emptyTag: ''
	    },
	    "0.2": {
	      explicitCharkey: false,
	      trim: false,
	      normalize: false,
	      normalizeTags: false,
	      attrkey: "$",
	      charkey: "_",
	      explicitArray: true,
	      ignoreAttrs: false,
	      mergeAttrs: false,
	      explicitRoot: true,
	      validator: null,
	      xmlns: false,
	      explicitChildren: false,
	      preserveChildrenOrder: false,
	      childkey: '$$',
	      charsAsChildren: false,
	      includeWhiteChars: false,
	      async: false,
	      strict: true,
	      attrNameProcessors: null,
	      attrValueProcessors: null,
	      tagNameProcessors: null,
	      valueProcessors: null,
	      rootName: 'root',
	      xmldec: {
	        'version': '1.0',
	        'encoding': 'UTF-8',
	        'standalone': true
	      },
	      doctype: null,
	      renderOpts: {
	        'pretty': true,
	        'indent': '  ',
	        'newline': '\n'
	      },
	      headless: false,
	      chunkSize: 10000,
	      emptyTag: '',
	      cdata: false
	    }
	  };

	}).call(this);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  "use strict";
	  var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA,
	    hasProp = {}.hasOwnProperty;

	  builder = __webpack_require__(30);

	  defaults = __webpack_require__(28).defaults;

	  requiresCDATA = function(entry) {
	    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
	  };

	  wrapCDATA = function(entry) {
	    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
	  };

	  escapeCDATA = function(entry) {
	    return entry.replace(']]>', ']]]]><![CDATA[>');
	  };

	  exports.Builder = (function() {
	    function Builder(opts) {
	      var key, ref, value;
	      this.options = {};
	      ref = defaults["0.2"];
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this.options[key] = value;
	      }
	      for (key in opts) {
	        if (!hasProp.call(opts, key)) continue;
	        value = opts[key];
	        this.options[key] = value;
	      }
	    }

	    Builder.prototype.buildObject = function(rootObj) {
	      var attrkey, charkey, render, rootElement, rootName;
	      attrkey = this.options.attrkey;
	      charkey = this.options.charkey;
	      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === defaults['0.2'].rootName)) {
	        rootName = Object.keys(rootObj)[0];
	        rootObj = rootObj[rootName];
	      } else {
	        rootName = this.options.rootName;
	      }
	      render = (function(_this) {
	        return function(element, obj) {
	          var attr, child, entry, index, key, value;
	          if (typeof obj !== 'object') {
	            if (_this.options.cdata && requiresCDATA(obj)) {
	              element.raw(wrapCDATA(obj));
	            } else {
	              element.txt(obj);
	            }
	          } else if (Array.isArray(obj)) {
	            for (index in obj) {
	              if (!hasProp.call(obj, index)) continue;
	              child = obj[index];
	              for (key in child) {
	                entry = child[key];
	                element = render(element.ele(key), entry).up();
	              }
	            }
	          } else {
	            for (key in obj) {
	              if (!hasProp.call(obj, key)) continue;
	              child = obj[key];
	              if (key === attrkey) {
	                if (typeof child === "object") {
	                  for (attr in child) {
	                    value = child[attr];
	                    element = element.att(attr, value);
	                  }
	                }
	              } else if (key === charkey) {
	                if (_this.options.cdata && requiresCDATA(child)) {
	                  element = element.raw(wrapCDATA(child));
	                } else {
	                  element = element.txt(child);
	                }
	              } else if (Array.isArray(child)) {
	                for (index in child) {
	                  if (!hasProp.call(child, index)) continue;
	                  entry = child[index];
	                  if (typeof entry === 'string') {
	                    if (_this.options.cdata && requiresCDATA(entry)) {
	                      element = element.ele(key).raw(wrapCDATA(entry)).up();
	                    } else {
	                      element = element.ele(key, entry).up();
	                    }
	                  } else {
	                    element = render(element.ele(key), entry).up();
	                  }
	                }
	              } else if (typeof child === "object") {
	                element = render(element.ele(key), child).up();
	              } else {
	                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
	                  element = element.ele(key).raw(wrapCDATA(child)).up();
	                } else {
	                  if (child == null) {
	                    child = '';
	                  }
	                  element = element.ele(key, child.toString()).up();
	                }
	              }
	            }
	          }
	          return element;
	        };
	      })(this);
	      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
	        headless: this.options.headless,
	        allowSurrogateChars: this.options.allowSurrogateChars
	      });
	      return render(rootElement, rootObj).end(this.options.renderOpts);
	    };

	    return Builder;

	  })();

	}).call(this);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

	  ref = __webpack_require__(31), assign = ref.assign, isFunction = ref.isFunction;

	  XMLDocument = __webpack_require__(32);

	  XMLDocumentCB = __webpack_require__(50);

	  XMLStringWriter = __webpack_require__(48);

	  XMLStreamWriter = __webpack_require__(51);

	  module.exports.create = function(name, xmldec, doctype, options) {
	    var doc, root;
	    if (name == null) {
	      throw new Error("Root element needs a name");
	    }
	    options = assign({}, xmldec, doctype, options);
	    doc = new XMLDocument(options);
	    root = doc.element(name);
	    if (!options.headless) {
	      doc.declaration(options);
	      if ((options.pubID != null) || (options.sysID != null)) {
	        doc.doctype(options);
	      }
	    }
	    return root;
	  };

	  module.exports.begin = function(options, onData, onEnd) {
	    var ref1;
	    if (isFunction(options)) {
	      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
	      options = {};
	    }
	    if (onData) {
	      return new XMLDocumentCB(options, onData, onEnd);
	    } else {
	      return new XMLDocument(options);
	    }
	  };

	  module.exports.stringWriter = function(options) {
	    return new XMLStringWriter(options);
	  };

	  module.exports.streamWriter = function(stream, options) {
	    return new XMLStreamWriter(stream, options);
	  };

	}).call(this);


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var assign, isArray, isEmpty, isFunction, isObject, isPlainObject,
	    slice = [].slice,
	    hasProp = {}.hasOwnProperty;

	  assign = function() {
	    var i, key, len, source, sources, target;
	    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (isFunction(Object.assign)) {
	      Object.assign.apply(null, arguments);
	    } else {
	      for (i = 0, len = sources.length; i < len; i++) {
	        source = sources[i];
	        if (source != null) {
	          for (key in source) {
	            if (!hasProp.call(source, key)) continue;
	            target[key] = source[key];
	          }
	        }
	      }
	    }
	    return target;
	  };

	  isFunction = function(val) {
	    return !!val && Object.prototype.toString.call(val) === '[object Function]';
	  };

	  isObject = function(val) {
	    var ref;
	    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
	  };

	  isArray = function(val) {
	    if (isFunction(Array.isArray)) {
	      return Array.isArray(val);
	    } else {
	      return Object.prototype.toString.call(val) === '[object Array]';
	    }
	  };

	  isEmpty = function(val) {
	    var key;
	    if (isArray(val)) {
	      return !val.length;
	    } else {
	      for (key in val) {
	        if (!hasProp.call(val, key)) continue;
	        return false;
	      }
	      return true;
	    }
	  };

	  isPlainObject = function(val) {
	    var ctor, proto;
	    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
	  };

	  module.exports.assign = assign;

	  module.exports.isFunction = isFunction;

	  module.exports.isObject = isObject;

	  module.exports.isArray = isArray;

	  module.exports.isEmpty = isEmpty;

	  module.exports.isPlainObject = isPlainObject;

	}).call(this);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isPlainObject = __webpack_require__(31).isPlainObject;

	  XMLNode = __webpack_require__(33);

	  XMLStringifier = __webpack_require__(47);

	  XMLStringWriter = __webpack_require__(48);

	  module.exports = XMLDocument = (function(superClass) {
	    extend(XMLDocument, superClass);

	    function XMLDocument(options) {
	      XMLDocument.__super__.constructor.call(this, null);
	      options || (options = {});
	      if (!options.writer) {
	        options.writer = new XMLStringWriter();
	      }
	      this.options = options;
	      this.stringify = new XMLStringifier(options);
	      this.isDocument = true;
	    }

	    XMLDocument.prototype.end = function(writer) {
	      var writerOptions;
	      if (!writer) {
	        writer = this.options.writer;
	      } else if (isPlainObject(writer)) {
	        writerOptions = writer;
	        writer = this.options.writer.set(writerOptions);
	      }
	      return writer.document(this);
	    };

	    XMLDocument.prototype.toString = function(options) {
	      return this.options.writer.set(options).document(this);
	    };

	    return XMLDocument;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLElement, XMLNode, XMLProcessingInstruction, XMLRaw, XMLText, isEmpty, isFunction, isObject, ref,
	    hasProp = {}.hasOwnProperty;

	  ref = __webpack_require__(31), isObject = ref.isObject, isFunction = ref.isFunction, isEmpty = ref.isEmpty;

	  XMLElement = null;

	  XMLCData = null;

	  XMLComment = null;

	  XMLDeclaration = null;

	  XMLDocType = null;

	  XMLRaw = null;

	  XMLText = null;

	  XMLProcessingInstruction = null;

	  module.exports = XMLNode = (function() {
	    function XMLNode(parent) {
	      this.parent = parent;
	      if (this.parent) {
	        this.options = this.parent.options;
	        this.stringify = this.parent.stringify;
	      }
	      this.children = [];
	      if (!XMLElement) {
	        XMLElement = __webpack_require__(34);
	        XMLCData = __webpack_require__(36);
	        XMLComment = __webpack_require__(37);
	        XMLDeclaration = __webpack_require__(38);
	        XMLDocType = __webpack_require__(39);
	        XMLRaw = __webpack_require__(44);
	        XMLText = __webpack_require__(45);
	        XMLProcessingInstruction = __webpack_require__(46);
	      }
	    }

	    XMLNode.prototype.element = function(name, attributes, text) {
	      var childNode, item, j, k, key, lastChild, len, len1, ref1, val;
	      lastChild = null;
	      if (attributes == null) {
	        attributes = {};
	      }
	      attributes = attributes.valueOf();
	      if (!isObject(attributes)) {
	        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
	      }
	      if (name != null) {
	        name = name.valueOf();
	      }
	      if (Array.isArray(name)) {
	        for (j = 0, len = name.length; j < len; j++) {
	          item = name[j];
	          lastChild = this.element(item);
	        }
	      } else if (isFunction(name)) {
	        lastChild = this.element(name.apply());
	      } else if (isObject(name)) {
	        for (key in name) {
	          if (!hasProp.call(name, key)) continue;
	          val = name[key];
	          if (isFunction(val)) {
	            val = val.apply();
	          }
	          if ((isObject(val)) && (isEmpty(val))) {
	            val = null;
	          }
	          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
	            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
	          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
	            for (k = 0, len1 = val.length; k < len1; k++) {
	              item = val[k];
	              childNode = {};
	              childNode[key] = item;
	              lastChild = this.element(childNode);
	            }
	          } else if (isObject(val)) {
	            lastChild = this.element(key);
	            lastChild.element(val);
	          } else {
	            lastChild = this.element(key, val);
	          }
	        }
	      } else {
	        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
	          lastChild = this.text(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
	          lastChild = this.cdata(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
	          lastChild = this.comment(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
	          lastChild = this.raw(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
	          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
	        } else {
	          lastChild = this.node(name, attributes, text);
	        }
	      }
	      if (lastChild == null) {
	        throw new Error("Could not create any elements with: " + name);
	      }
	      return lastChild;
	    };

	    XMLNode.prototype.insertBefore = function(name, attributes, text) {
	      var child, i, removed;
	      if (this.isRoot) {
	        throw new Error("Cannot insert elements at root level");
	      }
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i);
	      child = this.parent.element(name, attributes, text);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return child;
	    };

	    XMLNode.prototype.insertAfter = function(name, attributes, text) {
	      var child, i, removed;
	      if (this.isRoot) {
	        throw new Error("Cannot insert elements at root level");
	      }
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i + 1);
	      child = this.parent.element(name, attributes, text);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return child;
	    };

	    XMLNode.prototype.remove = function() {
	      var i, ref1;
	      if (this.isRoot) {
	        throw new Error("Cannot remove the root element");
	      }
	      i = this.parent.children.indexOf(this);
	      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref1 = [])), ref1;
	      return this.parent;
	    };

	    XMLNode.prototype.node = function(name, attributes, text) {
	      var child, ref1;
	      if (name != null) {
	        name = name.valueOf();
	      }
	      attributes || (attributes = {});
	      attributes = attributes.valueOf();
	      if (!isObject(attributes)) {
	        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
	      }
	      child = new XMLElement(this, name, attributes);
	      if (text != null) {
	        child.text(text);
	      }
	      this.children.push(child);
	      return child;
	    };

	    XMLNode.prototype.text = function(value) {
	      var child;
	      child = new XMLText(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.cdata = function(value) {
	      var child;
	      child = new XMLCData(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.comment = function(value) {
	      var child;
	      child = new XMLComment(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.commentBefore = function(value) {
	      var child, i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i);
	      child = this.parent.comment(value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.commentAfter = function(value) {
	      var child, i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i + 1);
	      child = this.parent.comment(value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.raw = function(value) {
	      var child;
	      child = new XMLRaw(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.instruction = function(target, value) {
	      var insTarget, insValue, instruction, j, len;
	      if (target != null) {
	        target = target.valueOf();
	      }
	      if (value != null) {
	        value = value.valueOf();
	      }
	      if (Array.isArray(target)) {
	        for (j = 0, len = target.length; j < len; j++) {
	          insTarget = target[j];
	          this.instruction(insTarget);
	        }
	      } else if (isObject(target)) {
	        for (insTarget in target) {
	          if (!hasProp.call(target, insTarget)) continue;
	          insValue = target[insTarget];
	          this.instruction(insTarget, insValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        instruction = new XMLProcessingInstruction(this, target, value);
	        this.children.push(instruction);
	      }
	      return this;
	    };

	    XMLNode.prototype.instructionBefore = function(target, value) {
	      var child, i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i);
	      child = this.parent.instruction(target, value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.instructionAfter = function(target, value) {
	      var child, i, removed;
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i + 1);
	      child = this.parent.instruction(target, value);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return this;
	    };

	    XMLNode.prototype.declaration = function(version, encoding, standalone) {
	      var doc, xmldec;
	      doc = this.document();
	      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
	      if (doc.children[0] instanceof XMLDeclaration) {
	        doc.children[0] = xmldec;
	      } else {
	        doc.children.unshift(xmldec);
	      }
	      return doc.root() || doc;
	    };

	    XMLNode.prototype.doctype = function(pubID, sysID) {
	      var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
	      doc = this.document();
	      doctype = new XMLDocType(doc, pubID, sysID);
	      ref1 = doc.children;
	      for (i = j = 0, len = ref1.length; j < len; i = ++j) {
	        child = ref1[i];
	        if (child instanceof XMLDocType) {
	          doc.children[i] = doctype;
	          return doctype;
	        }
	      }
	      ref2 = doc.children;
	      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
	        child = ref2[i];
	        if (child.isRoot) {
	          doc.children.splice(i, 0, doctype);
	          return doctype;
	        }
	      }
	      doc.children.push(doctype);
	      return doctype;
	    };

	    XMLNode.prototype.up = function() {
	      if (this.isRoot) {
	        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
	      }
	      return this.parent;
	    };

	    XMLNode.prototype.root = function() {
	      var node;
	      node = this;
	      while (node) {
	        if (node.isDocument) {
	          return node.rootObject;
	        } else if (node.isRoot) {
	          return node;
	        } else {
	          node = node.parent;
	        }
	      }
	    };

	    XMLNode.prototype.document = function() {
	      var node;
	      node = this;
	      while (node) {
	        if (node.isDocument) {
	          return node;
	        } else {
	          node = node.parent;
	        }
	      }
	    };

	    XMLNode.prototype.end = function(options) {
	      return this.document().end(options);
	    };

	    XMLNode.prototype.prev = function() {
	      var i;
	      i = this.parent.children.indexOf(this);
	      if (i < 1) {
	        throw new Error("Already at the first node");
	      }
	      return this.parent.children[i - 1];
	    };

	    XMLNode.prototype.next = function() {
	      var i;
	      i = this.parent.children.indexOf(this);
	      if (i === -1 || i === this.parent.children.length - 1) {
	        throw new Error("Already at the last node");
	      }
	      return this.parent.children[i + 1];
	    };

	    XMLNode.prototype.importDocument = function(doc) {
	      var clonedRoot;
	      clonedRoot = doc.root().clone();
	      clonedRoot.parent = this;
	      clonedRoot.isRoot = false;
	      this.children.push(clonedRoot);
	      return this;
	    };

	    XMLNode.prototype.ele = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLNode.prototype.nod = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLNode.prototype.txt = function(value) {
	      return this.text(value);
	    };

	    XMLNode.prototype.dat = function(value) {
	      return this.cdata(value);
	    };

	    XMLNode.prototype.com = function(value) {
	      return this.comment(value);
	    };

	    XMLNode.prototype.ins = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLNode.prototype.doc = function() {
	      return this.document();
	    };

	    XMLNode.prototype.dec = function(version, encoding, standalone) {
	      return this.declaration(version, encoding, standalone);
	    };

	    XMLNode.prototype.dtd = function(pubID, sysID) {
	      return this.doctype(pubID, sysID);
	    };

	    XMLNode.prototype.e = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLNode.prototype.n = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLNode.prototype.t = function(value) {
	      return this.text(value);
	    };

	    XMLNode.prototype.d = function(value) {
	      return this.cdata(value);
	    };

	    XMLNode.prototype.c = function(value) {
	      return this.comment(value);
	    };

	    XMLNode.prototype.r = function(value) {
	      return this.raw(value);
	    };

	    XMLNode.prototype.i = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLNode.prototype.u = function() {
	      return this.up();
	    };

	    XMLNode.prototype.importXMLBuilder = function(doc) {
	      return this.importDocument(doc);
	    };

	    return XMLNode;

	  })();

	}).call(this);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLAttribute, XMLElement, XMLNode, isFunction, isObject, ref,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  ref = __webpack_require__(31), isObject = ref.isObject, isFunction = ref.isFunction;

	  XMLNode = __webpack_require__(33);

	  XMLAttribute = __webpack_require__(35);

	  module.exports = XMLElement = (function(superClass) {
	    extend(XMLElement, superClass);

	    function XMLElement(parent, name, attributes) {
	      XMLElement.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing element name");
	      }
	      this.name = this.stringify.eleName(name);
	      this.attributes = {};
	      if (attributes != null) {
	        this.attribute(attributes);
	      }
	      if (parent.isDocument) {
	        this.isRoot = true;
	        this.documentObject = parent;
	        parent.rootObject = this;
	      }
	    }

	    XMLElement.prototype.clone = function() {
	      var att, attName, clonedSelf, ref1;
	      clonedSelf = Object.create(this);
	      if (clonedSelf.isRoot) {
	        clonedSelf.documentObject = null;
	      }
	      clonedSelf.attributes = {};
	      ref1 = this.attributes;
	      for (attName in ref1) {
	        if (!hasProp.call(ref1, attName)) continue;
	        att = ref1[attName];
	        clonedSelf.attributes[attName] = att.clone();
	      }
	      clonedSelf.children = [];
	      this.children.forEach(function(child) {
	        var clonedChild;
	        clonedChild = child.clone();
	        clonedChild.parent = clonedSelf;
	        return clonedSelf.children.push(clonedChild);
	      });
	      return clonedSelf;
	    };

	    XMLElement.prototype.attribute = function(name, value) {
	      var attName, attValue;
	      if (name != null) {
	        name = name.valueOf();
	      }
	      if (isObject(name)) {
	        for (attName in name) {
	          if (!hasProp.call(name, attName)) continue;
	          attValue = name[attName];
	          this.attribute(attName, attValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        if (!this.options.skipNullAttributes || (value != null)) {
	          this.attributes[name] = new XMLAttribute(this, name, value);
	        }
	      }
	      return this;
	    };

	    XMLElement.prototype.removeAttribute = function(name) {
	      var attName, i, len;
	      if (name == null) {
	        throw new Error("Missing attribute name");
	      }
	      name = name.valueOf();
	      if (Array.isArray(name)) {
	        for (i = 0, len = name.length; i < len; i++) {
	          attName = name[i];
	          delete this.attributes[attName];
	        }
	      } else {
	        delete this.attributes[name];
	      }
	      return this;
	    };

	    XMLElement.prototype.toString = function(options) {
	      return this.options.writer.set(options).element(this);
	    };

	    XMLElement.prototype.att = function(name, value) {
	      return this.attribute(name, value);
	    };

	    XMLElement.prototype.a = function(name, value) {
	      return this.attribute(name, value);
	    };

	    return XMLElement;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLAttribute;

	  module.exports = XMLAttribute = (function() {
	    function XMLAttribute(parent, name, value) {
	      this.options = parent.options;
	      this.stringify = parent.stringify;
	      if (name == null) {
	        throw new Error("Missing attribute name of element " + parent.name);
	      }
	      if (value == null) {
	        throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
	      }
	      this.name = this.stringify.attName(name);
	      this.value = this.stringify.attValue(value);
	    }

	    XMLAttribute.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLAttribute.prototype.toString = function(options) {
	      return this.options.writer.set(options).attribute(this);
	    };

	    return XMLAttribute;

	  })();

	}).call(this);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLCData, XMLNode,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLCData = (function(superClass) {
	    extend(XMLCData, superClass);

	    function XMLCData(parent, text) {
	      XMLCData.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing CDATA text");
	      }
	      this.text = this.stringify.cdata(text);
	    }

	    XMLCData.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLCData.prototype.toString = function(options) {
	      return this.options.writer.set(options).cdata(this);
	    };

	    return XMLCData;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLComment, XMLNode,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLComment = (function(superClass) {
	    extend(XMLComment, superClass);

	    function XMLComment(parent, text) {
	      XMLComment.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing comment text");
	      }
	      this.text = this.stringify.comment(text);
	    }

	    XMLComment.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLComment.prototype.toString = function(options) {
	      return this.options.writer.set(options).comment(this);
	    };

	    return XMLComment;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDeclaration, XMLNode, isObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isObject = __webpack_require__(31).isObject;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLDeclaration = (function(superClass) {
	    extend(XMLDeclaration, superClass);

	    function XMLDeclaration(parent, version, encoding, standalone) {
	      var ref;
	      XMLDeclaration.__super__.constructor.call(this, parent);
	      if (isObject(version)) {
	        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
	      }
	      if (!version) {
	        version = '1.0';
	      }
	      this.version = this.stringify.xmlVersion(version);
	      if (encoding != null) {
	        this.encoding = this.stringify.xmlEncoding(encoding);
	      }
	      if (standalone != null) {
	        this.standalone = this.stringify.xmlStandalone(standalone);
	      }
	    }

	    XMLDeclaration.prototype.toString = function(options) {
	      return this.options.writer.set(options).declaration(this);
	    };

	    return XMLDeclaration;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNode, isObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isObject = __webpack_require__(31).isObject;

	  XMLNode = __webpack_require__(33);

	  XMLDTDAttList = __webpack_require__(40);

	  XMLDTDEntity = __webpack_require__(41);

	  XMLDTDElement = __webpack_require__(42);

	  XMLDTDNotation = __webpack_require__(43);

	  module.exports = XMLDocType = (function(superClass) {
	    extend(XMLDocType, superClass);

	    function XMLDocType(parent, pubID, sysID) {
	      var ref, ref1;
	      XMLDocType.__super__.constructor.call(this, parent);
	      this.documentObject = parent;
	      if (isObject(pubID)) {
	        ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
	      }
	      if (sysID == null) {
	        ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
	      }
	      if (pubID != null) {
	        this.pubID = this.stringify.dtdPubID(pubID);
	      }
	      if (sysID != null) {
	        this.sysID = this.stringify.dtdSysID(sysID);
	      }
	    }

	    XMLDocType.prototype.element = function(name, value) {
	      var child;
	      child = new XMLDTDElement(this, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      var child;
	      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.entity = function(name, value) {
	      var child;
	      child = new XMLDTDEntity(this, false, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.pEntity = function(name, value) {
	      var child;
	      child = new XMLDTDEntity(this, true, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.notation = function(name, value) {
	      var child;
	      child = new XMLDTDNotation(this, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.toString = function(options) {
	      return this.options.writer.set(options).docType(this);
	    };

	    XMLDocType.prototype.ele = function(name, value) {
	      return this.element(name, value);
	    };

	    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
	    };

	    XMLDocType.prototype.ent = function(name, value) {
	      return this.entity(name, value);
	    };

	    XMLDocType.prototype.pent = function(name, value) {
	      return this.pEntity(name, value);
	    };

	    XMLDocType.prototype.not = function(name, value) {
	      return this.notation(name, value);
	    };

	    XMLDocType.prototype.up = function() {
	      return this.root() || this.documentObject;
	    };

	    return XMLDocType;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDTDAttList, XMLNode,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLDTDAttList = (function(superClass) {
	    extend(XMLDTDAttList, superClass);

	    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      XMLDTDAttList.__super__.constructor.call(this, parent);
	      if (elementName == null) {
	        throw new Error("Missing DTD element name");
	      }
	      if (attributeName == null) {
	        throw new Error("Missing DTD attribute name");
	      }
	      if (!attributeType) {
	        throw new Error("Missing DTD attribute type");
	      }
	      if (!defaultValueType) {
	        throw new Error("Missing DTD attribute default");
	      }
	      if (defaultValueType.indexOf('#') !== 0) {
	        defaultValueType = '#' + defaultValueType;
	      }
	      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
	        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
	      }
	      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
	        throw new Error("Default value only applies to #FIXED or #DEFAULT");
	      }
	      this.elementName = this.stringify.eleName(elementName);
	      this.attributeName = this.stringify.attName(attributeName);
	      this.attributeType = this.stringify.dtdAttType(attributeType);
	      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
	      this.defaultValueType = defaultValueType;
	    }

	    XMLDTDAttList.prototype.toString = function(options) {
	      return this.options.writer.set(options).dtdAttList(this);
	    };

	    return XMLDTDAttList;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDTDEntity, XMLNode, isObject,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  isObject = __webpack_require__(31).isObject;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLDTDEntity = (function(superClass) {
	    extend(XMLDTDEntity, superClass);

	    function XMLDTDEntity(parent, pe, name, value) {
	      XMLDTDEntity.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing entity name");
	      }
	      if (value == null) {
	        throw new Error("Missing entity value");
	      }
	      this.pe = !!pe;
	      this.name = this.stringify.eleName(name);
	      if (!isObject(value)) {
	        this.value = this.stringify.dtdEntityValue(value);
	      } else {
	        if (!value.pubID && !value.sysID) {
	          throw new Error("Public and/or system identifiers are required for an external entity");
	        }
	        if (value.pubID && !value.sysID) {
	          throw new Error("System identifier is required for a public external entity");
	        }
	        if (value.pubID != null) {
	          this.pubID = this.stringify.dtdPubID(value.pubID);
	        }
	        if (value.sysID != null) {
	          this.sysID = this.stringify.dtdSysID(value.sysID);
	        }
	        if (value.nData != null) {
	          this.nData = this.stringify.dtdNData(value.nData);
	        }
	        if (this.pe && this.nData) {
	          throw new Error("Notation declaration is not allowed in a parameter entity");
	        }
	      }
	    }

	    XMLDTDEntity.prototype.toString = function(options) {
	      return this.options.writer.set(options).dtdEntity(this);
	    };

	    return XMLDTDEntity;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDTDElement, XMLNode,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLDTDElement = (function(superClass) {
	    extend(XMLDTDElement, superClass);

	    function XMLDTDElement(parent, name, value) {
	      XMLDTDElement.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing DTD element name");
	      }
	      if (!value) {
	        value = '(#PCDATA)';
	      }
	      if (Array.isArray(value)) {
	        value = '(' + value.join(',') + ')';
	      }
	      this.name = this.stringify.eleName(name);
	      this.value = this.stringify.dtdElementValue(value);
	    }

	    XMLDTDElement.prototype.toString = function(options) {
	      return this.options.writer.set(options).dtdElement(this);
	    };

	    return XMLDTDElement;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLDTDNotation, XMLNode,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLDTDNotation = (function(superClass) {
	    extend(XMLDTDNotation, superClass);

	    function XMLDTDNotation(parent, name, value) {
	      XMLDTDNotation.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing notation name");
	      }
	      if (!value.pubID && !value.sysID) {
	        throw new Error("Public or system identifiers are required for an external entity");
	      }
	      this.name = this.stringify.eleName(name);
	      if (value.pubID != null) {
	        this.pubID = this.stringify.dtdPubID(value.pubID);
	      }
	      if (value.sysID != null) {
	        this.sysID = this.stringify.dtdSysID(value.sysID);
	      }
	    }

	    XMLDTDNotation.prototype.toString = function(options) {
	      return this.options.writer.set(options).dtdNotation(this);
	    };

	    return XMLDTDNotation;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLNode, XMLRaw,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLRaw = (function(superClass) {
	    extend(XMLRaw, superClass);

	    function XMLRaw(parent, text) {
	      XMLRaw.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing raw text");
	      }
	      this.value = this.stringify.raw(text);
	    }

	    XMLRaw.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLRaw.prototype.toString = function(options) {
	      return this.options.writer.set(options).raw(this);
	    };

	    return XMLRaw;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLNode, XMLText,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLText = (function(superClass) {
	    extend(XMLText, superClass);

	    function XMLText(parent, text) {
	      XMLText.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing element text");
	      }
	      this.value = this.stringify.eleText(text);
	    }

	    XMLText.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLText.prototype.toString = function(options) {
	      return this.options.writer.set(options).text(this);
	    };

	    return XMLText;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLNode, XMLProcessingInstruction,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLNode = __webpack_require__(33);

	  module.exports = XMLProcessingInstruction = (function(superClass) {
	    extend(XMLProcessingInstruction, superClass);

	    function XMLProcessingInstruction(parent, target, value) {
	      XMLProcessingInstruction.__super__.constructor.call(this, parent);
	      if (target == null) {
	        throw new Error("Missing instruction target");
	      }
	      this.target = this.stringify.insTarget(target);
	      if (value) {
	        this.value = this.stringify.insValue(value);
	      }
	    }

	    XMLProcessingInstruction.prototype.clone = function() {
	      return Object.create(this);
	    };

	    XMLProcessingInstruction.prototype.toString = function(options) {
	      return this.options.writer.set(options).processingInstruction(this);
	    };

	    return XMLProcessingInstruction;

	  })(XMLNode);

	}).call(this);


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLStringifier,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    hasProp = {}.hasOwnProperty;

	  module.exports = XMLStringifier = (function() {
	    function XMLStringifier(options) {
	      this.assertLegalChar = bind(this.assertLegalChar, this);
	      var key, ref, value;
	      options || (options = {});
	      this.noDoubleEncoding = options.noDoubleEncoding;
	      ref = options.stringify || {};
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this[key] = value;
	      }
	    }

	    XMLStringifier.prototype.eleName = function(val) {
	      val = '' + val || '';
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.eleText = function(val) {
	      val = '' + val || '';
	      return this.assertLegalChar(this.elEscape(val));
	    };

	    XMLStringifier.prototype.cdata = function(val) {
	      val = '' + val || '';
	      val = val.replace(']]>', ']]]]><![CDATA[>');
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.comment = function(val) {
	      val = '' + val || '';
	      if (val.match(/--/)) {
	        throw new Error("Comment text cannot contain double-hypen: " + val);
	      }
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.raw = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.attName = function(val) {
	      return val = '' + val || '';
	    };

	    XMLStringifier.prototype.attValue = function(val) {
	      val = '' + val || '';
	      return this.attEscape(val);
	    };

	    XMLStringifier.prototype.insTarget = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.insValue = function(val) {
	      val = '' + val || '';
	      if (val.match(/\?>/)) {
	        throw new Error("Invalid processing instruction value: " + val);
	      }
	      return val;
	    };

	    XMLStringifier.prototype.xmlVersion = function(val) {
	      val = '' + val || '';
	      if (!val.match(/1\.[0-9]+/)) {
	        throw new Error("Invalid version number: " + val);
	      }
	      return val;
	    };

	    XMLStringifier.prototype.xmlEncoding = function(val) {
	      val = '' + val || '';
	      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
	        throw new Error("Invalid encoding: " + val);
	      }
	      return val;
	    };

	    XMLStringifier.prototype.xmlStandalone = function(val) {
	      if (val) {
	        return "yes";
	      } else {
	        return "no";
	      }
	    };

	    XMLStringifier.prototype.dtdPubID = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdSysID = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdElementValue = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdAttType = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdAttDefault = function(val) {
	      if (val != null) {
	        return '' + val || '';
	      } else {
	        return val;
	      }
	    };

	    XMLStringifier.prototype.dtdEntityValue = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdNData = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.convertAttKey = '@';

	    XMLStringifier.prototype.convertPIKey = '?';

	    XMLStringifier.prototype.convertTextKey = '#text';

	    XMLStringifier.prototype.convertCDataKey = '#cdata';

	    XMLStringifier.prototype.convertCommentKey = '#comment';

	    XMLStringifier.prototype.convertRawKey = '#raw';

	    XMLStringifier.prototype.assertLegalChar = function(str) {
	      var res;
	      res = str.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
	      if (res) {
	        throw new Error("Invalid character in string: " + str + " at index " + res.index);
	      }
	      return str;
	    };

	    XMLStringifier.prototype.elEscape = function(str) {
	      var ampregex;
	      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
	      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
	    };

	    XMLStringifier.prototype.attEscape = function(str) {
	      var ampregex;
	      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
	      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
	    };

	    return XMLStringifier;

	  })();

	}).call(this);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLText, XMLWriterBase,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLDeclaration = __webpack_require__(38);

	  XMLDocType = __webpack_require__(39);

	  XMLCData = __webpack_require__(36);

	  XMLComment = __webpack_require__(37);

	  XMLElement = __webpack_require__(34);

	  XMLRaw = __webpack_require__(44);

	  XMLText = __webpack_require__(45);

	  XMLProcessingInstruction = __webpack_require__(46);

	  XMLDTDAttList = __webpack_require__(40);

	  XMLDTDElement = __webpack_require__(42);

	  XMLDTDEntity = __webpack_require__(41);

	  XMLDTDNotation = __webpack_require__(43);

	  XMLWriterBase = __webpack_require__(49);

	  module.exports = XMLStringWriter = (function(superClass) {
	    extend(XMLStringWriter, superClass);

	    function XMLStringWriter(options) {
	      XMLStringWriter.__super__.constructor.call(this, options);
	    }

	    XMLStringWriter.prototype.document = function(doc) {
	      var child, i, len, r, ref;
	      this.textispresent = false;
	      r = '';
	      ref = doc.children;
	      for (i = 0, len = ref.length; i < len; i++) {
	        child = ref[i];
	        r += (function() {
	          switch (false) {
	            case !(child instanceof XMLDeclaration):
	              return this.declaration(child);
	            case !(child instanceof XMLDocType):
	              return this.docType(child);
	            case !(child instanceof XMLComment):
	              return this.comment(child);
	            case !(child instanceof XMLProcessingInstruction):
	              return this.processingInstruction(child);
	            default:
	              return this.element(child, 0);
	          }
	        }).call(this);
	      }
	      if (this.pretty && r.slice(-this.newline.length) === this.newline) {
	        r = r.slice(0, -this.newline.length);
	      }
	      return r;
	    };

	    XMLStringWriter.prototype.attribute = function(att) {
	      return ' ' + att.name + '="' + att.value + '"';
	    };

	    XMLStringWriter.prototype.cdata = function(node, level) {
	      return this.space(level) + '<![CDATA[' + node.text + ']]>' + this.newline;
	    };

	    XMLStringWriter.prototype.comment = function(node, level) {
	      return this.space(level) + '<!-- ' + node.text + ' -->' + this.newline;
	    };

	    XMLStringWriter.prototype.declaration = function(node, level) {
	      var r;
	      r = this.space(level);
	      r += '<?xml version="' + node.version + '"';
	      if (node.encoding != null) {
	        r += ' encoding="' + node.encoding + '"';
	      }
	      if (node.standalone != null) {
	        r += ' standalone="' + node.standalone + '"';
	      }
	      r += this.spacebeforeslash + '?>';
	      r += this.newline;
	      return r;
	    };

	    XMLStringWriter.prototype.docType = function(node, level) {
	      var child, i, len, r, ref;
	      level || (level = 0);
	      r = this.space(level);
	      r += '<!DOCTYPE ' + node.root().name;
	      if (node.pubID && node.sysID) {
	        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	      } else if (node.sysID) {
	        r += ' SYSTEM "' + node.sysID + '"';
	      }
	      if (node.children.length > 0) {
	        r += ' [';
	        r += this.newline;
	        ref = node.children;
	        for (i = 0, len = ref.length; i < len; i++) {
	          child = ref[i];
	          r += (function() {
	            switch (false) {
	              case !(child instanceof XMLDTDAttList):
	                return this.dtdAttList(child, level + 1);
	              case !(child instanceof XMLDTDElement):
	                return this.dtdElement(child, level + 1);
	              case !(child instanceof XMLDTDEntity):
	                return this.dtdEntity(child, level + 1);
	              case !(child instanceof XMLDTDNotation):
	                return this.dtdNotation(child, level + 1);
	              case !(child instanceof XMLCData):
	                return this.cdata(child, level + 1);
	              case !(child instanceof XMLComment):
	                return this.comment(child, level + 1);
	              case !(child instanceof XMLProcessingInstruction):
	                return this.processingInstruction(child, level + 1);
	              default:
	                throw new Error("Unknown DTD node type: " + child.constructor.name);
	            }
	          }).call(this);
	        }
	        r += ']';
	      }
	      r += this.spacebeforeslash + '>';
	      r += this.newline;
	      return r;
	    };

	    XMLStringWriter.prototype.element = function(node, level) {
	      var att, child, i, j, len, len1, name, r, ref, ref1, ref2, space, textispresentwasset;
	      level || (level = 0);
	      textispresentwasset = false;
	      if (this.textispresent) {
	        this.newline = '';
	        this.pretty = false;
	      } else {
	        this.newline = this.newlinedefault;
	        this.pretty = this.prettydefault;
	      }
	      space = this.space(level);
	      r = '';
	      r += space + '<' + node.name;
	      ref = node.attributes;
	      for (name in ref) {
	        if (!hasProp.call(ref, name)) continue;
	        att = ref[name];
	        r += this.attribute(att);
	      }
	      if (node.children.length === 0 || node.children.every(function(e) {
	        return e.value === '';
	      })) {
	        if (this.allowEmpty) {
	          r += '></' + node.name + '>' + this.newline;
	        } else {
	          r += this.spacebeforeslash + '/>' + this.newline;
	        }
	      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
	        r += '>';
	        r += node.children[0].value;
	        r += '</' + node.name + '>' + this.newline;
	      } else {
	        if (this.dontprettytextnodes) {
	          ref1 = node.children;
	          for (i = 0, len = ref1.length; i < len; i++) {
	            child = ref1[i];
	            if (child.value != null) {
	              this.textispresent++;
	              textispresentwasset = true;
	              break;
	            }
	          }
	        }
	        if (this.textispresent) {
	          this.newline = '';
	          this.pretty = false;
	          space = this.space(level);
	        }
	        r += '>' + this.newline;
	        ref2 = node.children;
	        for (j = 0, len1 = ref2.length; j < len1; j++) {
	          child = ref2[j];
	          r += (function() {
	            switch (false) {
	              case !(child instanceof XMLCData):
	                return this.cdata(child, level + 1);
	              case !(child instanceof XMLComment):
	                return this.comment(child, level + 1);
	              case !(child instanceof XMLElement):
	                return this.element(child, level + 1);
	              case !(child instanceof XMLRaw):
	                return this.raw(child, level + 1);
	              case !(child instanceof XMLText):
	                return this.text(child, level + 1);
	              case !(child instanceof XMLProcessingInstruction):
	                return this.processingInstruction(child, level + 1);
	              default:
	                throw new Error("Unknown XML node type: " + child.constructor.name);
	            }
	          }).call(this);
	        }
	        if (textispresentwasset) {
	          this.textispresent--;
	        }
	        if (!this.textispresent) {
	          this.newline = this.newlinedefault;
	          this.pretty = this.prettydefault;
	        }
	        r += space + '</' + node.name + '>' + this.newline;
	      }
	      return r;
	    };

	    XMLStringWriter.prototype.processingInstruction = function(node, level) {
	      var r;
	      r = this.space(level) + '<?' + node.target;
	      if (node.value) {
	        r += ' ' + node.value;
	      }
	      r += this.spacebeforeslash + '?>' + this.newline;
	      return r;
	    };

	    XMLStringWriter.prototype.raw = function(node, level) {
	      return this.space(level) + node.value + this.newline;
	    };

	    XMLStringWriter.prototype.text = function(node, level) {
	      return this.space(level) + node.value + this.newline;
	    };

	    XMLStringWriter.prototype.dtdAttList = function(node, level) {
	      var r;
	      r = this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
	      if (node.defaultValueType !== '#DEFAULT') {
	        r += ' ' + node.defaultValueType;
	      }
	      if (node.defaultValue) {
	        r += ' "' + node.defaultValue + '"';
	      }
	      r += this.spacebeforeslash + '>' + this.newline;
	      return r;
	    };

	    XMLStringWriter.prototype.dtdElement = function(node, level) {
	      return this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value + this.spacebeforeslash + '>' + this.newline;
	    };

	    XMLStringWriter.prototype.dtdEntity = function(node, level) {
	      var r;
	      r = this.space(level) + '<!ENTITY';
	      if (node.pe) {
	        r += ' %';
	      }
	      r += ' ' + node.name;
	      if (node.value) {
	        r += ' "' + node.value + '"';
	      } else {
	        if (node.pubID && node.sysID) {
	          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	        } else if (node.sysID) {
	          r += ' SYSTEM "' + node.sysID + '"';
	        }
	        if (node.nData) {
	          r += ' NDATA ' + node.nData;
	        }
	      }
	      r += this.spacebeforeslash + '>' + this.newline;
	      return r;
	    };

	    XMLStringWriter.prototype.dtdNotation = function(node, level) {
	      var r;
	      r = this.space(level) + '<!NOTATION ' + node.name;
	      if (node.pubID && node.sysID) {
	        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	      } else if (node.pubID) {
	        r += ' PUBLIC "' + node.pubID + '"';
	      } else if (node.sysID) {
	        r += ' SYSTEM "' + node.sysID + '"';
	      }
	      r += this.spacebeforeslash + '>' + this.newline;
	      return r;
	    };

	    XMLStringWriter.prototype.openNode = function(node, level) {
	      var att, name, r, ref;
	      level || (level = 0);
	      if (node instanceof XMLElement) {
	        r = this.space(level) + '<' + node.name;
	        ref = node.attributes;
	        for (name in ref) {
	          if (!hasProp.call(ref, name)) continue;
	          att = ref[name];
	          r += this.attribute(att);
	        }
	        r += (node.children ? '>' : '/>') + this.newline;
	        return r;
	      } else {
	        r = this.space(level) + '<!DOCTYPE ' + node.rootNodeName;
	        if (node.pubID && node.sysID) {
	          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
	        } else if (node.sysID) {
	          r += ' SYSTEM "' + node.sysID + '"';
	        }
	        r += (node.children ? ' [' : '>') + this.newline;
	        return r;
	      }
	    };

	    XMLStringWriter.prototype.closeNode = function(node, level) {
	      level || (level = 0);
	      switch (false) {
	        case !(node instanceof XMLElement):
	          return this.space(level) + '</' + node.name + '>' + this.newline;
	        case !(node instanceof XMLDocType):
	          return this.space(level) + ']>' + this.newline;
	      }
	    };

	    return XMLStringWriter;

	  })(XMLWriterBase);

	}).call(this);


/***/ }),
/* 49 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLWriterBase,
	    hasProp = {}.hasOwnProperty;

	  module.exports = XMLWriterBase = (function() {
	    function XMLWriterBase(options) {
	      var key, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
	      options || (options = {});
	      this.pretty = options.pretty || false;
	      this.allowEmpty = (ref = options.allowEmpty) != null ? ref : false;
	      if (this.pretty) {
	        this.indent = (ref1 = options.indent) != null ? ref1 : '  ';
	        this.newline = (ref2 = options.newline) != null ? ref2 : '\n';
	        this.offset = (ref3 = options.offset) != null ? ref3 : 0;
	        this.dontprettytextnodes = (ref4 = options.dontprettytextnodes) != null ? ref4 : 0;
	      } else {
	        this.indent = '';
	        this.newline = '';
	        this.offset = 0;
	        this.dontprettytextnodes = 0;
	      }
	      this.spacebeforeslash = (ref5 = options.spacebeforeslash) != null ? ref5 : '';
	      if (this.spacebeforeslash === true) {
	        this.spacebeforeslash = ' ';
	      }
	      this.newlinedefault = this.newline;
	      this.prettydefault = this.pretty;
	      ref6 = options.writer || {};
	      for (key in ref6) {
	        if (!hasProp.call(ref6, key)) continue;
	        value = ref6[key];
	        this[key] = value;
	      }
	    }

	    XMLWriterBase.prototype.set = function(options) {
	      var key, ref, value;
	      options || (options = {});
	      if ("pretty" in options) {
	        this.pretty = options.pretty;
	      }
	      if ("allowEmpty" in options) {
	        this.allowEmpty = options.allowEmpty;
	      }
	      if (this.pretty) {
	        this.indent = "indent" in options ? options.indent : '  ';
	        this.newline = "newline" in options ? options.newline : '\n';
	        this.offset = "offset" in options ? options.offset : 0;
	        this.dontprettytextnodes = "dontprettytextnodes" in options ? options.dontprettytextnodes : 0;
	      } else {
	        this.indent = '';
	        this.newline = '';
	        this.offset = 0;
	        this.dontprettytextnodes = 0;
	      }
	      this.spacebeforeslash = "spacebeforeslash" in options ? options.spacebeforeslash : '';
	      if (this.spacebeforeslash === true) {
	        this.spacebeforeslash = ' ';
	      }
	      this.newlinedefault = this.newline;
	      this.prettydefault = this.pretty;
	      ref = options.writer || {};
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this[key] = value;
	      }
	      return this;
	    };

	    XMLWriterBase.prototype.space = function(level) {
	      var indent;
	      if (this.pretty) {
	        indent = (level || 0) + this.offset + 1;
	        if (indent > 0) {
	          return new Array(indent).join(this.indent);
	        } else {
	          return '';
	        }
	      } else {
	        return '';
	      }
	    };

	    return XMLWriterBase;

	  })();

	}).call(this);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, isFunction, isObject, isPlainObject, ref,
	    hasProp = {}.hasOwnProperty;

	  ref = __webpack_require__(31), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject;

	  XMLElement = __webpack_require__(34);

	  XMLCData = __webpack_require__(36);

	  XMLComment = __webpack_require__(37);

	  XMLRaw = __webpack_require__(44);

	  XMLText = __webpack_require__(45);

	  XMLProcessingInstruction = __webpack_require__(46);

	  XMLDeclaration = __webpack_require__(38);

	  XMLDocType = __webpack_require__(39);

	  XMLDTDAttList = __webpack_require__(40);

	  XMLDTDEntity = __webpack_require__(41);

	  XMLDTDElement = __webpack_require__(42);

	  XMLDTDNotation = __webpack_require__(43);

	  XMLAttribute = __webpack_require__(35);

	  XMLStringifier = __webpack_require__(47);

	  XMLStringWriter = __webpack_require__(48);

	  module.exports = XMLDocumentCB = (function() {
	    function XMLDocumentCB(options, onData, onEnd) {
	      var writerOptions;
	      options || (options = {});
	      if (!options.writer) {
	        options.writer = new XMLStringWriter(options);
	      } else if (isPlainObject(options.writer)) {
	        writerOptions = options.writer;
	        options.writer = new XMLStringWriter(writerOptions);
	      }
	      this.options = options;
	      this.writer = options.writer;
	      this.stringify = new XMLStringifier(options);
	      this.onDataCallback = onData || function() {};
	      this.onEndCallback = onEnd || function() {};
	      this.currentNode = null;
	      this.currentLevel = -1;
	      this.openTags = {};
	      this.documentStarted = false;
	      this.documentCompleted = false;
	      this.root = null;
	    }

	    XMLDocumentCB.prototype.node = function(name, attributes, text) {
	      var ref1;
	      if (name == null) {
	        throw new Error("Missing node name");
	      }
	      if (this.root && this.currentLevel === -1) {
	        throw new Error("Document can only have one root node");
	      }
	      this.openCurrent();
	      name = name.valueOf();
	      if (attributes == null) {
	        attributes = {};
	      }
	      attributes = attributes.valueOf();
	      if (!isObject(attributes)) {
	        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
	      }
	      this.currentNode = new XMLElement(this, name, attributes);
	      this.currentNode.children = false;
	      this.currentLevel++;
	      this.openTags[this.currentLevel] = this.currentNode;
	      if (text != null) {
	        this.text(text);
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.element = function(name, attributes, text) {
	      if (this.currentNode && this.currentNode instanceof XMLDocType) {
	        return this.dtdElement.apply(this, arguments);
	      } else {
	        return this.node(name, attributes, text);
	      }
	    };

	    XMLDocumentCB.prototype.attribute = function(name, value) {
	      var attName, attValue;
	      if (!this.currentNode || this.currentNode.children) {
	        throw new Error("att() can only be used immediately after an ele() call in callback mode");
	      }
	      if (name != null) {
	        name = name.valueOf();
	      }
	      if (isObject(name)) {
	        for (attName in name) {
	          if (!hasProp.call(name, attName)) continue;
	          attValue = name[attName];
	          this.attribute(attName, attValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        if (!this.options.skipNullAttributes || (value != null)) {
	          this.currentNode.attributes[name] = new XMLAttribute(this, name, value);
	        }
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.text = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLText(this, value);
	      this.onData(this.writer.text(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.cdata = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLCData(this, value);
	      this.onData(this.writer.cdata(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.comment = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLComment(this, value);
	      this.onData(this.writer.comment(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.raw = function(value) {
	      var node;
	      this.openCurrent();
	      node = new XMLRaw(this, value);
	      this.onData(this.writer.raw(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.instruction = function(target, value) {
	      var i, insTarget, insValue, len, node;
	      this.openCurrent();
	      if (target != null) {
	        target = target.valueOf();
	      }
	      if (value != null) {
	        value = value.valueOf();
	      }
	      if (Array.isArray(target)) {
	        for (i = 0, len = target.length; i < len; i++) {
	          insTarget = target[i];
	          this.instruction(insTarget);
	        }
	      } else if (isObject(target)) {
	        for (insTarget in target) {
	          if (!hasProp.call(target, insTarget)) continue;
	          insValue = target[insTarget];
	          this.instruction(insTarget, insValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        node = new XMLProcessingInstruction(this, target, value);
	        this.onData(this.writer.processingInstruction(node, this.currentLevel + 1));
	      }
	      return this;
	    };

	    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
	      var node;
	      this.openCurrent();
	      if (this.documentStarted) {
	        throw new Error("declaration() must be the first node");
	      }
	      node = new XMLDeclaration(this, version, encoding, standalone);
	      this.onData(this.writer.declaration(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
	      this.openCurrent();
	      if (root == null) {
	        throw new Error("Missing root node name");
	      }
	      if (this.root) {
	        throw new Error("dtd() must come before the root node");
	      }
	      this.currentNode = new XMLDocType(this, pubID, sysID);
	      this.currentNode.rootNodeName = root;
	      this.currentNode.children = false;
	      this.currentLevel++;
	      this.openTags[this.currentLevel] = this.currentNode;
	      return this;
	    };

	    XMLDocumentCB.prototype.dtdElement = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDElement(this, name, value);
	      this.onData(this.writer.dtdElement(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
	      this.onData(this.writer.dtdAttList(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.entity = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDEntity(this, false, name, value);
	      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.pEntity = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDEntity(this, true, name, value);
	      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.notation = function(name, value) {
	      var node;
	      this.openCurrent();
	      node = new XMLDTDNotation(this, name, value);
	      this.onData(this.writer.dtdNotation(node, this.currentLevel + 1));
	      return this;
	    };

	    XMLDocumentCB.prototype.up = function() {
	      if (this.currentLevel < 0) {
	        throw new Error("The document node has no parent");
	      }
	      if (this.currentNode) {
	        if (this.currentNode.children) {
	          this.closeNode(this.currentNode);
	        } else {
	          this.openNode(this.currentNode);
	        }
	        this.currentNode = null;
	      } else {
	        this.closeNode(this.openTags[this.currentLevel]);
	      }
	      delete this.openTags[this.currentLevel];
	      this.currentLevel--;
	      return this;
	    };

	    XMLDocumentCB.prototype.end = function() {
	      while (this.currentLevel >= 0) {
	        this.up();
	      }
	      return this.onEnd();
	    };

	    XMLDocumentCB.prototype.openCurrent = function() {
	      if (this.currentNode) {
	        this.currentNode.children = true;
	        return this.openNode(this.currentNode);
	      }
	    };

	    XMLDocumentCB.prototype.openNode = function(node) {
	      if (!node.isOpen) {
	        if (!this.root && this.currentLevel === 0 && node instanceof XMLElement) {
	          this.root = node;
	        }
	        this.onData(this.writer.openNode(node, this.currentLevel));
	        return node.isOpen = true;
	      }
	    };

	    XMLDocumentCB.prototype.closeNode = function(node) {
	      if (!node.isClosed) {
	        this.onData(this.writer.closeNode(node, this.currentLevel));
	        return node.isClosed = true;
	      }
	    };

	    XMLDocumentCB.prototype.onData = function(chunk) {
	      this.documentStarted = true;
	      return this.onDataCallback(chunk);
	    };

	    XMLDocumentCB.prototype.onEnd = function() {
	      this.documentCompleted = true;
	      return this.onEndCallback();
	    };

	    XMLDocumentCB.prototype.ele = function() {
	      return this.element.apply(this, arguments);
	    };

	    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLDocumentCB.prototype.txt = function(value) {
	      return this.text(value);
	    };

	    XMLDocumentCB.prototype.dat = function(value) {
	      return this.cdata(value);
	    };

	    XMLDocumentCB.prototype.com = function(value) {
	      return this.comment(value);
	    };

	    XMLDocumentCB.prototype.ins = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
	      return this.declaration(version, encoding, standalone);
	    };

	    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
	      return this.doctype(root, pubID, sysID);
	    };

	    XMLDocumentCB.prototype.e = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLDocumentCB.prototype.n = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLDocumentCB.prototype.t = function(value) {
	      return this.text(value);
	    };

	    XMLDocumentCB.prototype.d = function(value) {
	      return this.cdata(value);
	    };

	    XMLDocumentCB.prototype.c = function(value) {
	      return this.comment(value);
	    };

	    XMLDocumentCB.prototype.r = function(value) {
	      return this.raw(value);
	    };

	    XMLDocumentCB.prototype.i = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLDocumentCB.prototype.att = function() {
	      if (this.currentNode && this.currentNode instanceof XMLDocType) {
	        return this.attList.apply(this, arguments);
	      } else {
	        return this.attribute.apply(this, arguments);
	      }
	    };

	    XMLDocumentCB.prototype.a = function() {
	      if (this.currentNode && this.currentNode instanceof XMLDocType) {
	        return this.attList.apply(this, arguments);
	      } else {
	        return this.attribute.apply(this, arguments);
	      }
	    };

	    XMLDocumentCB.prototype.ent = function(name, value) {
	      return this.entity(name, value);
	    };

	    XMLDocumentCB.prototype.pent = function(name, value) {
	      return this.pEntity(name, value);
	    };

	    XMLDocumentCB.prototype.not = function(name, value) {
	      return this.notation(name, value);
	    };

	    return XMLDocumentCB;

	  })();

	}).call(this);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStreamWriter, XMLText, XMLWriterBase,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  XMLDeclaration = __webpack_require__(38);

	  XMLDocType = __webpack_require__(39);

	  XMLCData = __webpack_require__(36);

	  XMLComment = __webpack_require__(37);

	  XMLElement = __webpack_require__(34);

	  XMLRaw = __webpack_require__(44);

	  XMLText = __webpack_require__(45);

	  XMLProcessingInstruction = __webpack_require__(46);

	  XMLDTDAttList = __webpack_require__(40);

	  XMLDTDElement = __webpack_require__(42);

	  XMLDTDEntity = __webpack_require__(41);

	  XMLDTDNotation = __webpack_require__(43);

	  XMLWriterBase = __webpack_require__(49);

	  module.exports = XMLStreamWriter = (function(superClass) {
	    extend(XMLStreamWriter, superClass);

	    function XMLStreamWriter(stream, options) {
	      XMLStreamWriter.__super__.constructor.call(this, options);
	      this.stream = stream;
	    }

	    XMLStreamWriter.prototype.document = function(doc) {
	      var child, i, j, len, len1, ref, ref1, results;
	      ref = doc.children;
	      for (i = 0, len = ref.length; i < len; i++) {
	        child = ref[i];
	        child.isLastRootNode = false;
	      }
	      doc.children[doc.children.length - 1].isLastRootNode = true;
	      ref1 = doc.children;
	      results = [];
	      for (j = 0, len1 = ref1.length; j < len1; j++) {
	        child = ref1[j];
	        switch (false) {
	          case !(child instanceof XMLDeclaration):
	            results.push(this.declaration(child));
	            break;
	          case !(child instanceof XMLDocType):
	            results.push(this.docType(child));
	            break;
	          case !(child instanceof XMLComment):
	            results.push(this.comment(child));
	            break;
	          case !(child instanceof XMLProcessingInstruction):
	            results.push(this.processingInstruction(child));
	            break;
	          default:
	            results.push(this.element(child));
	        }
	      }
	      return results;
	    };

	    XMLStreamWriter.prototype.attribute = function(att) {
	      return this.stream.write(' ' + att.name + '="' + att.value + '"');
	    };

	    XMLStreamWriter.prototype.cdata = function(node, level) {
	      return this.stream.write(this.space(level) + '<![CDATA[' + node.text + ']]>' + this.endline(node));
	    };

	    XMLStreamWriter.prototype.comment = function(node, level) {
	      return this.stream.write(this.space(level) + '<!-- ' + node.text + ' -->' + this.endline(node));
	    };

	    XMLStreamWriter.prototype.declaration = function(node, level) {
	      this.stream.write(this.space(level));
	      this.stream.write('<?xml version="' + node.version + '"');
	      if (node.encoding != null) {
	        this.stream.write(' encoding="' + node.encoding + '"');
	      }
	      if (node.standalone != null) {
	        this.stream.write(' standalone="' + node.standalone + '"');
	      }
	      this.stream.write(this.spacebeforeslash + '?>');
	      return this.stream.write(this.endline(node));
	    };

	    XMLStreamWriter.prototype.docType = function(node, level) {
	      var child, i, len, ref;
	      level || (level = 0);
	      this.stream.write(this.space(level));
	      this.stream.write('<!DOCTYPE ' + node.root().name);
	      if (node.pubID && node.sysID) {
	        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
	      } else if (node.sysID) {
	        this.stream.write(' SYSTEM "' + node.sysID + '"');
	      }
	      if (node.children.length > 0) {
	        this.stream.write(' [');
	        this.stream.write(this.endline(node));
	        ref = node.children;
	        for (i = 0, len = ref.length; i < len; i++) {
	          child = ref[i];
	          switch (false) {
	            case !(child instanceof XMLDTDAttList):
	              this.dtdAttList(child, level + 1);
	              break;
	            case !(child instanceof XMLDTDElement):
	              this.dtdElement(child, level + 1);
	              break;
	            case !(child instanceof XMLDTDEntity):
	              this.dtdEntity(child, level + 1);
	              break;
	            case !(child instanceof XMLDTDNotation):
	              this.dtdNotation(child, level + 1);
	              break;
	            case !(child instanceof XMLCData):
	              this.cdata(child, level + 1);
	              break;
	            case !(child instanceof XMLComment):
	              this.comment(child, level + 1);
	              break;
	            case !(child instanceof XMLProcessingInstruction):
	              this.processingInstruction(child, level + 1);
	              break;
	            default:
	              throw new Error("Unknown DTD node type: " + child.constructor.name);
	          }
	        }
	        this.stream.write(']');
	      }
	      this.stream.write(this.spacebeforeslash + '>');
	      return this.stream.write(this.endline(node));
	    };

	    XMLStreamWriter.prototype.element = function(node, level) {
	      var att, child, i, len, name, ref, ref1, space;
	      level || (level = 0);
	      space = this.space(level);
	      this.stream.write(space + '<' + node.name);
	      ref = node.attributes;
	      for (name in ref) {
	        if (!hasProp.call(ref, name)) continue;
	        att = ref[name];
	        this.attribute(att);
	      }
	      if (node.children.length === 0 || node.children.every(function(e) {
	        return e.value === '';
	      })) {
	        if (this.allowEmpty) {
	          this.stream.write('></' + node.name + '>');
	        } else {
	          this.stream.write(this.spacebeforeslash + '/>');
	        }
	      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
	        this.stream.write('>');
	        this.stream.write(node.children[0].value);
	        this.stream.write('</' + node.name + '>');
	      } else {
	        this.stream.write('>' + this.newline);
	        ref1 = node.children;
	        for (i = 0, len = ref1.length; i < len; i++) {
	          child = ref1[i];
	          switch (false) {
	            case !(child instanceof XMLCData):
	              this.cdata(child, level + 1);
	              break;
	            case !(child instanceof XMLComment):
	              this.comment(child, level + 1);
	              break;
	            case !(child instanceof XMLElement):
	              this.element(child, level + 1);
	              break;
	            case !(child instanceof XMLRaw):
	              this.raw(child, level + 1);
	              break;
	            case !(child instanceof XMLText):
	              this.text(child, level + 1);
	              break;
	            case !(child instanceof XMLProcessingInstruction):
	              this.processingInstruction(child, level + 1);
	              break;
	            default:
	              throw new Error("Unknown XML node type: " + child.constructor.name);
	          }
	        }
	        this.stream.write(space + '</' + node.name + '>');
	      }
	      return this.stream.write(this.endline(node));
	    };

	    XMLStreamWriter.prototype.processingInstruction = function(node, level) {
	      this.stream.write(this.space(level) + '<?' + node.target);
	      if (node.value) {
	        this.stream.write(' ' + node.value);
	      }
	      return this.stream.write(this.spacebeforeslash + '?>' + this.endline(node));
	    };

	    XMLStreamWriter.prototype.raw = function(node, level) {
	      return this.stream.write(this.space(level) + node.value + this.endline(node));
	    };

	    XMLStreamWriter.prototype.text = function(node, level) {
	      return this.stream.write(this.space(level) + node.value + this.endline(node));
	    };

	    XMLStreamWriter.prototype.dtdAttList = function(node, level) {
	      this.stream.write(this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType);
	      if (node.defaultValueType !== '#DEFAULT') {
	        this.stream.write(' ' + node.defaultValueType);
	      }
	      if (node.defaultValue) {
	        this.stream.write(' "' + node.defaultValue + '"');
	      }
	      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
	    };

	    XMLStreamWriter.prototype.dtdElement = function(node, level) {
	      this.stream.write(this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value);
	      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
	    };

	    XMLStreamWriter.prototype.dtdEntity = function(node, level) {
	      this.stream.write(this.space(level) + '<!ENTITY');
	      if (node.pe) {
	        this.stream.write(' %');
	      }
	      this.stream.write(' ' + node.name);
	      if (node.value) {
	        this.stream.write(' "' + node.value + '"');
	      } else {
	        if (node.pubID && node.sysID) {
	          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
	        } else if (node.sysID) {
	          this.stream.write(' SYSTEM "' + node.sysID + '"');
	        }
	        if (node.nData) {
	          this.stream.write(' NDATA ' + node.nData);
	        }
	      }
	      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
	    };

	    XMLStreamWriter.prototype.dtdNotation = function(node, level) {
	      this.stream.write(this.space(level) + '<!NOTATION ' + node.name);
	      if (node.pubID && node.sysID) {
	        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
	      } else if (node.pubID) {
	        this.stream.write(' PUBLIC "' + node.pubID + '"');
	      } else if (node.sysID) {
	        this.stream.write(' SYSTEM "' + node.sysID + '"');
	      }
	      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
	    };

	    XMLStreamWriter.prototype.endline = function(node) {
	      if (!node.isLastRootNode) {
	        return this.newline;
	      } else {
	        return '';
	      }
	    };

	    return XMLStreamWriter;

	  })(XMLWriterBase);

	}).call(this);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  "use strict";
	  var bom, defaults, events, isEmpty, processItem, processors, sax, setImmediate,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  sax = __webpack_require__(53);

	  events = __webpack_require__(18);

	  bom = __webpack_require__(87);

	  processors = __webpack_require__(88);

	  setImmediate = __webpack_require__(76).setImmediate;

	  defaults = __webpack_require__(28).defaults;

	  isEmpty = function(thing) {
	    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
	  };

	  processItem = function(processors, item, key) {
	    var i, len, process;
	    for (i = 0, len = processors.length; i < len; i++) {
	      process = processors[i];
	      item = process(item, key);
	    }
	    return item;
	  };

	  exports.Parser = (function(superClass) {
	    extend(Parser, superClass);

	    function Parser(opts) {
	      this.parseString = bind(this.parseString, this);
	      this.reset = bind(this.reset, this);
	      this.assignOrPush = bind(this.assignOrPush, this);
	      this.processAsync = bind(this.processAsync, this);
	      var key, ref, value;
	      if (!(this instanceof exports.Parser)) {
	        return new exports.Parser(opts);
	      }
	      this.options = {};
	      ref = defaults["0.2"];
	      for (key in ref) {
	        if (!hasProp.call(ref, key)) continue;
	        value = ref[key];
	        this.options[key] = value;
	      }
	      for (key in opts) {
	        if (!hasProp.call(opts, key)) continue;
	        value = opts[key];
	        this.options[key] = value;
	      }
	      if (this.options.xmlns) {
	        this.options.xmlnskey = this.options.attrkey + "ns";
	      }
	      if (this.options.normalizeTags) {
	        if (!this.options.tagNameProcessors) {
	          this.options.tagNameProcessors = [];
	        }
	        this.options.tagNameProcessors.unshift(processors.normalize);
	      }
	      this.reset();
	    }

	    Parser.prototype.processAsync = function() {
	      var chunk, err;
	      try {
	        if (this.remaining.length <= this.options.chunkSize) {
	          chunk = this.remaining;
	          this.remaining = '';
	          this.saxParser = this.saxParser.write(chunk);
	          return this.saxParser.close();
	        } else {
	          chunk = this.remaining.substr(0, this.options.chunkSize);
	          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
	          this.saxParser = this.saxParser.write(chunk);
	          return setImmediate(this.processAsync);
	        }
	      } catch (error1) {
	        err = error1;
	        if (!this.saxParser.errThrown) {
	          this.saxParser.errThrown = true;
	          return this.emit(err);
	        }
	      }
	    };

	    Parser.prototype.assignOrPush = function(obj, key, newValue) {
	      if (!(key in obj)) {
	        if (!this.options.explicitArray) {
	          return obj[key] = newValue;
	        } else {
	          return obj[key] = [newValue];
	        }
	      } else {
	        if (!(obj[key] instanceof Array)) {
	          obj[key] = [obj[key]];
	        }
	        return obj[key].push(newValue);
	      }
	    };

	    Parser.prototype.reset = function() {
	      var attrkey, charkey, ontext, stack;
	      this.removeAllListeners();
	      this.saxParser = sax.parser(this.options.strict, {
	        trim: false,
	        normalize: false,
	        xmlns: this.options.xmlns
	      });
	      this.saxParser.errThrown = false;
	      this.saxParser.onerror = (function(_this) {
	        return function(error) {
	          _this.saxParser.resume();
	          if (!_this.saxParser.errThrown) {
	            _this.saxParser.errThrown = true;
	            return _this.emit("error", error);
	          }
	        };
	      })(this);
	      this.saxParser.onend = (function(_this) {
	        return function() {
	          if (!_this.saxParser.ended) {
	            _this.saxParser.ended = true;
	            return _this.emit("end", _this.resultObject);
	          }
	        };
	      })(this);
	      this.saxParser.ended = false;
	      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
	      this.resultObject = null;
	      stack = [];
	      attrkey = this.options.attrkey;
	      charkey = this.options.charkey;
	      this.saxParser.onopentag = (function(_this) {
	        return function(node) {
	          var key, newValue, obj, processedKey, ref;
	          obj = {};
	          obj[charkey] = "";
	          if (!_this.options.ignoreAttrs) {
	            ref = node.attributes;
	            for (key in ref) {
	              if (!hasProp.call(ref, key)) continue;
	              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
	                obj[attrkey] = {};
	              }
	              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
	              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
	              if (_this.options.mergeAttrs) {
	                _this.assignOrPush(obj, processedKey, newValue);
	              } else {
	                obj[attrkey][processedKey] = newValue;
	              }
	            }
	          }
	          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
	          if (_this.options.xmlns) {
	            obj[_this.options.xmlnskey] = {
	              uri: node.uri,
	              local: node.local
	            };
	          }
	          return stack.push(obj);
	        };
	      })(this);
	      this.saxParser.onclosetag = (function(_this) {
	        return function() {
	          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
	          obj = stack.pop();
	          nodeName = obj["#name"];
	          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
	            delete obj["#name"];
	          }
	          if (obj.cdata === true) {
	            cdata = obj.cdata;
	            delete obj.cdata;
	          }
	          s = stack[stack.length - 1];
	          if (obj[charkey].match(/^\s*$/) && !cdata) {
	            emptyStr = obj[charkey];
	            delete obj[charkey];
	          } else {
	            if (_this.options.trim) {
	              obj[charkey] = obj[charkey].trim();
	            }
	            if (_this.options.normalize) {
	              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
	            }
	            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
	            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
	              obj = obj[charkey];
	            }
	          }
	          if (isEmpty(obj)) {
	            obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
	          }
	          if (_this.options.validator != null) {
	            xpath = "/" + ((function() {
	              var i, len, results;
	              results = [];
	              for (i = 0, len = stack.length; i < len; i++) {
	                node = stack[i];
	                results.push(node["#name"]);
	              }
	              return results;
	            })()).concat(nodeName).join("/");
	            (function() {
	              var err;
	              try {
	                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
	              } catch (error1) {
	                err = error1;
	                return _this.emit("error", err);
	              }
	            })();
	          }
	          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
	            if (!_this.options.preserveChildrenOrder) {
	              node = {};
	              if (_this.options.attrkey in obj) {
	                node[_this.options.attrkey] = obj[_this.options.attrkey];
	                delete obj[_this.options.attrkey];
	              }
	              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
	                node[_this.options.charkey] = obj[_this.options.charkey];
	                delete obj[_this.options.charkey];
	              }
	              if (Object.getOwnPropertyNames(obj).length > 0) {
	                node[_this.options.childkey] = obj;
	              }
	              obj = node;
	            } else if (s) {
	              s[_this.options.childkey] = s[_this.options.childkey] || [];
	              objClone = {};
	              for (key in obj) {
	                if (!hasProp.call(obj, key)) continue;
	                objClone[key] = obj[key];
	              }
	              s[_this.options.childkey].push(objClone);
	              delete obj["#name"];
	              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
	                obj = obj[charkey];
	              }
	            }
	          }
	          if (stack.length > 0) {
	            return _this.assignOrPush(s, nodeName, obj);
	          } else {
	            if (_this.options.explicitRoot) {
	              old = obj;
	              obj = {};
	              obj[nodeName] = old;
	            }
	            _this.resultObject = obj;
	            _this.saxParser.ended = true;
	            return _this.emit("end", _this.resultObject);
	          }
	        };
	      })(this);
	      ontext = (function(_this) {
	        return function(text) {
	          var charChild, s;
	          s = stack[stack.length - 1];
	          if (s) {
	            s[charkey] += text;
	            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
	              s[_this.options.childkey] = s[_this.options.childkey] || [];
	              charChild = {
	                '#name': '__text__'
	              };
	              charChild[charkey] = text;
	              if (_this.options.normalize) {
	                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
	              }
	              s[_this.options.childkey].push(charChild);
	            }
	            return s;
	          }
	        };
	      })(this);
	      this.saxParser.ontext = ontext;
	      return this.saxParser.oncdata = (function(_this) {
	        return function(text) {
	          var s;
	          s = ontext(text);
	          if (s) {
	            return s.cdata = true;
	          }
	        };
	      })(this);
	    };

	    Parser.prototype.parseString = function(str, cb) {
	      var err;
	      if ((cb != null) && typeof cb === "function") {
	        this.on("end", function(result) {
	          this.reset();
	          return cb(null, result);
	        });
	        this.on("error", function(err) {
	          this.reset();
	          return cb(err);
	        });
	      }
	      try {
	        str = str.toString();
	        if (str.trim() === '') {
	          this.emit("end", null);
	          return true;
	        }
	        str = bom.stripBOM(str);
	        if (this.options.async) {
	          this.remaining = str;
	          setImmediate(this.processAsync);
	          return this.saxParser;
	        }
	        return this.saxParser.write(str).close();
	      } catch (error1) {
	        err = error1;
	        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
	          this.emit('error', err);
	          return this.saxParser.errThrown = true;
	        } else if (this.saxParser.ended) {
	          throw err;
	        }
	      }
	    };

	    return Parser;

	  })(events.EventEmitter);

	  exports.parseString = function(str, a, b) {
	    var cb, options, parser;
	    if (b != null) {
	      if (typeof b === 'function') {
	        cb = b;
	      }
	      if (typeof a === 'object') {
	        options = a;
	      }
	    } else {
	      if (typeof a === 'function') {
	        cb = a;
	      }
	      options = {};
	    }
	    parser = new exports.Parser(options);
	    return parser.parseString(str, cb);
	  };

	}).call(this);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {;(function (sax) { // wrapper for non-node envs
	  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
	  sax.SAXParser = SAXParser
	  sax.SAXStream = SAXStream
	  sax.createStream = createStream

	  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
	  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
	  // since that's the earliest that a buffer overrun could occur.  This way, checks are
	  // as rare as required, but as often as necessary to ensure never crossing this bound.
	  // Furthermore, buffers are only tested at most once per write(), so passing a very
	  // large string into write() might have undesirable effects, but this is manageable by
	  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
	  // edge case, result in creating at most one complete copy of the string passed in.
	  // Set to Infinity to have unlimited buffers.
	  sax.MAX_BUFFER_LENGTH = 64 * 1024

	  var buffers = [
	    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
	    'procInstName', 'procInstBody', 'entity', 'attribName',
	    'attribValue', 'cdata', 'script'
	  ]

	  sax.EVENTS = [
	    'text',
	    'processinginstruction',
	    'sgmldeclaration',
	    'doctype',
	    'comment',
	    'opentagstart',
	    'attribute',
	    'opentag',
	    'closetag',
	    'opencdata',
	    'cdata',
	    'closecdata',
	    'error',
	    'end',
	    'ready',
	    'script',
	    'opennamespace',
	    'closenamespace'
	  ]

	  function SAXParser (strict, opt) {
	    if (!(this instanceof SAXParser)) {
	      return new SAXParser(strict, opt)
	    }

	    var parser = this
	    clearBuffers(parser)
	    parser.q = parser.c = ''
	    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
	    parser.opt = opt || {}
	    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
	    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase'
	    parser.tags = []
	    parser.closed = parser.closedRoot = parser.sawRoot = false
	    parser.tag = parser.error = null
	    parser.strict = !!strict
	    parser.noscript = !!(strict || parser.opt.noscript)
	    parser.state = S.BEGIN
	    parser.strictEntities = parser.opt.strictEntities
	    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES)
	    parser.attribList = []

	    // namespaces form a prototype chain.
	    // it always points at the current tag,
	    // which protos to its parent tag.
	    if (parser.opt.xmlns) {
	      parser.ns = Object.create(rootNS)
	    }

	    // mostly just for error reporting
	    parser.trackPosition = parser.opt.position !== false
	    if (parser.trackPosition) {
	      parser.position = parser.line = parser.column = 0
	    }
	    emit(parser, 'onready')
	  }

	  if (!Object.create) {
	    Object.create = function (o) {
	      function F () {}
	      F.prototype = o
	      var newf = new F()
	      return newf
	    }
	  }

	  if (!Object.keys) {
	    Object.keys = function (o) {
	      var a = []
	      for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
	      return a
	    }
	  }

	  function checkBufferLength (parser) {
	    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
	    var maxActual = 0
	    for (var i = 0, l = buffers.length; i < l; i++) {
	      var len = parser[buffers[i]].length
	      if (len > maxAllowed) {
	        // Text/cdata nodes can get big, and since they're buffered,
	        // we can get here under normal conditions.
	        // Avoid issues by emitting the text node now,
	        // so at least it won't get any bigger.
	        switch (buffers[i]) {
	          case 'textNode':
	            closeText(parser)
	            break

	          case 'cdata':
	            emitNode(parser, 'oncdata', parser.cdata)
	            parser.cdata = ''
	            break

	          case 'script':
	            emitNode(parser, 'onscript', parser.script)
	            parser.script = ''
	            break

	          default:
	            error(parser, 'Max buffer length exceeded: ' + buffers[i])
	        }
	      }
	      maxActual = Math.max(maxActual, len)
	    }
	    // schedule the next check for the earliest possible buffer overrun.
	    var m = sax.MAX_BUFFER_LENGTH - maxActual
	    parser.bufferCheckPosition = m + parser.position
	  }

	  function clearBuffers (parser) {
	    for (var i = 0, l = buffers.length; i < l; i++) {
	      parser[buffers[i]] = ''
	    }
	  }

	  function flushBuffers (parser) {
	    closeText(parser)
	    if (parser.cdata !== '') {
	      emitNode(parser, 'oncdata', parser.cdata)
	      parser.cdata = ''
	    }
	    if (parser.script !== '') {
	      emitNode(parser, 'onscript', parser.script)
	      parser.script = ''
	    }
	  }

	  SAXParser.prototype = {
	    end: function () { end(this) },
	    write: write,
	    resume: function () { this.error = null; return this },
	    close: function () { return this.write(null) },
	    flush: function () { flushBuffers(this) }
	  }

	  var Stream
	  try {
	    Stream = __webpack_require__(58).Stream
	  } catch (ex) {
	    Stream = function () {}
	  }

	  var streamWraps = sax.EVENTS.filter(function (ev) {
	    return ev !== 'error' && ev !== 'end'
	  })

	  function createStream (strict, opt) {
	    return new SAXStream(strict, opt)
	  }

	  function SAXStream (strict, opt) {
	    if (!(this instanceof SAXStream)) {
	      return new SAXStream(strict, opt)
	    }

	    Stream.apply(this)

	    this._parser = new SAXParser(strict, opt)
	    this.writable = true
	    this.readable = true

	    var me = this

	    this._parser.onend = function () {
	      me.emit('end')
	    }

	    this._parser.onerror = function (er) {
	      me.emit('error', er)

	      // if didn't throw, then means error was handled.
	      // go ahead and clear error, so we can write again.
	      me._parser.error = null
	    }

	    this._decoder = null

	    streamWraps.forEach(function (ev) {
	      Object.defineProperty(me, 'on' + ev, {
	        get: function () {
	          return me._parser['on' + ev]
	        },
	        set: function (h) {
	          if (!h) {
	            me.removeAllListeners(ev)
	            me._parser['on' + ev] = h
	            return h
	          }
	          me.on(ev, h)
	        },
	        enumerable: true,
	        configurable: false
	      })
	    })
	  }

	  SAXStream.prototype = Object.create(Stream.prototype, {
	    constructor: {
	      value: SAXStream
	    }
	  })

	  SAXStream.prototype.write = function (data) {
	    if (typeof Buffer === 'function' &&
	      typeof Buffer.isBuffer === 'function' &&
	      Buffer.isBuffer(data)) {
	      if (!this._decoder) {
	        var SD = __webpack_require__(86).StringDecoder
	        this._decoder = new SD('utf8')
	      }
	      data = this._decoder.write(data)
	    }

	    this._parser.write(data.toString())
	    this.emit('data', data)
	    return true
	  }

	  SAXStream.prototype.end = function (chunk) {
	    if (chunk && chunk.length) {
	      this.write(chunk)
	    }
	    this._parser.end()
	    return true
	  }

	  SAXStream.prototype.on = function (ev, handler) {
	    var me = this
	    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
	      me._parser['on' + ev] = function () {
	        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
	        args.splice(0, 0, ev)
	        me.emit.apply(me, args)
	      }
	    }

	    return Stream.prototype.on.call(me, ev, handler)
	  }

	  // this really needs to be replaced with character classes.
	  // XML allows all manner of ridiculous numbers and digits.
	  var CDATA = '[CDATA['
	  var DOCTYPE = 'DOCTYPE'
	  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
	  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'
	  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

	  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
	  // This implementation works on strings, a single character at a time
	  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
	  // without a significant breaking change to either this  parser, or the
	  // JavaScript language.  Implementation of an emoji-capable xml parser
	  // is left as an exercise for the reader.
	  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

	  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

	  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
	  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

	  function isWhitespace (c) {
	    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
	  }

	  function isQuote (c) {
	    return c === '"' || c === '\''
	  }

	  function isAttribEnd (c) {
	    return c === '>' || isWhitespace(c)
	  }

	  function isMatch (regex, c) {
	    return regex.test(c)
	  }

	  function notMatch (regex, c) {
	    return !isMatch(regex, c)
	  }

	  var S = 0
	  sax.STATE = {
	    BEGIN: S++, // leading byte order mark or whitespace
	    BEGIN_WHITESPACE: S++, // leading whitespace
	    TEXT: S++, // general stuff
	    TEXT_ENTITY: S++, // &amp and such.
	    OPEN_WAKA: S++, // <
	    SGML_DECL: S++, // <!BLARG
	    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
	    DOCTYPE: S++, // <!DOCTYPE
	    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
	    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
	    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
	    COMMENT_STARTING: S++, // <!-
	    COMMENT: S++, // <!--
	    COMMENT_ENDING: S++, // <!-- blah -
	    COMMENT_ENDED: S++, // <!-- blah --
	    CDATA: S++, // <![CDATA[ something
	    CDATA_ENDING: S++, // ]
	    CDATA_ENDING_2: S++, // ]]
	    PROC_INST: S++, // <?hi
	    PROC_INST_BODY: S++, // <?hi there
	    PROC_INST_ENDING: S++, // <?hi "there" ?
	    OPEN_TAG: S++, // <strong
	    OPEN_TAG_SLASH: S++, // <strong /
	    ATTRIB: S++, // <a
	    ATTRIB_NAME: S++, // <a foo
	    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
	    ATTRIB_VALUE: S++, // <a foo=
	    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
	    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
	    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
	    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
	    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
	    CLOSE_TAG: S++, // </a
	    CLOSE_TAG_SAW_WHITE: S++, // </a   >
	    SCRIPT: S++, // <script> ...
	    SCRIPT_ENDING: S++ // <script> ... <
	  }

	  sax.XML_ENTITIES = {
	    'amp': '&',
	    'gt': '>',
	    'lt': '<',
	    'quot': '"',
	    'apos': "'"
	  }

	  sax.ENTITIES = {
	    'amp': '&',
	    'gt': '>',
	    'lt': '<',
	    'quot': '"',
	    'apos': "'",
	    'AElig': 198,
	    'Aacute': 193,
	    'Acirc': 194,
	    'Agrave': 192,
	    'Aring': 197,
	    'Atilde': 195,
	    'Auml': 196,
	    'Ccedil': 199,
	    'ETH': 208,
	    'Eacute': 201,
	    'Ecirc': 202,
	    'Egrave': 200,
	    'Euml': 203,
	    'Iacute': 205,
	    'Icirc': 206,
	    'Igrave': 204,
	    'Iuml': 207,
	    'Ntilde': 209,
	    'Oacute': 211,
	    'Ocirc': 212,
	    'Ograve': 210,
	    'Oslash': 216,
	    'Otilde': 213,
	    'Ouml': 214,
	    'THORN': 222,
	    'Uacute': 218,
	    'Ucirc': 219,
	    'Ugrave': 217,
	    'Uuml': 220,
	    'Yacute': 221,
	    'aacute': 225,
	    'acirc': 226,
	    'aelig': 230,
	    'agrave': 224,
	    'aring': 229,
	    'atilde': 227,
	    'auml': 228,
	    'ccedil': 231,
	    'eacute': 233,
	    'ecirc': 234,
	    'egrave': 232,
	    'eth': 240,
	    'euml': 235,
	    'iacute': 237,
	    'icirc': 238,
	    'igrave': 236,
	    'iuml': 239,
	    'ntilde': 241,
	    'oacute': 243,
	    'ocirc': 244,
	    'ograve': 242,
	    'oslash': 248,
	    'otilde': 245,
	    'ouml': 246,
	    'szlig': 223,
	    'thorn': 254,
	    'uacute': 250,
	    'ucirc': 251,
	    'ugrave': 249,
	    'uuml': 252,
	    'yacute': 253,
	    'yuml': 255,
	    'copy': 169,
	    'reg': 174,
	    'nbsp': 160,
	    'iexcl': 161,
	    'cent': 162,
	    'pound': 163,
	    'curren': 164,
	    'yen': 165,
	    'brvbar': 166,
	    'sect': 167,
	    'uml': 168,
	    'ordf': 170,
	    'laquo': 171,
	    'not': 172,
	    'shy': 173,
	    'macr': 175,
	    'deg': 176,
	    'plusmn': 177,
	    'sup1': 185,
	    'sup2': 178,
	    'sup3': 179,
	    'acute': 180,
	    'micro': 181,
	    'para': 182,
	    'middot': 183,
	    'cedil': 184,
	    'ordm': 186,
	    'raquo': 187,
	    'frac14': 188,
	    'frac12': 189,
	    'frac34': 190,
	    'iquest': 191,
	    'times': 215,
	    'divide': 247,
	    'OElig': 338,
	    'oelig': 339,
	    'Scaron': 352,
	    'scaron': 353,
	    'Yuml': 376,
	    'fnof': 402,
	    'circ': 710,
	    'tilde': 732,
	    'Alpha': 913,
	    'Beta': 914,
	    'Gamma': 915,
	    'Delta': 916,
	    'Epsilon': 917,
	    'Zeta': 918,
	    'Eta': 919,
	    'Theta': 920,
	    'Iota': 921,
	    'Kappa': 922,
	    'Lambda': 923,
	    'Mu': 924,
	    'Nu': 925,
	    'Xi': 926,
	    'Omicron': 927,
	    'Pi': 928,
	    'Rho': 929,
	    'Sigma': 931,
	    'Tau': 932,
	    'Upsilon': 933,
	    'Phi': 934,
	    'Chi': 935,
	    'Psi': 936,
	    'Omega': 937,
	    'alpha': 945,
	    'beta': 946,
	    'gamma': 947,
	    'delta': 948,
	    'epsilon': 949,
	    'zeta': 950,
	    'eta': 951,
	    'theta': 952,
	    'iota': 953,
	    'kappa': 954,
	    'lambda': 955,
	    'mu': 956,
	    'nu': 957,
	    'xi': 958,
	    'omicron': 959,
	    'pi': 960,
	    'rho': 961,
	    'sigmaf': 962,
	    'sigma': 963,
	    'tau': 964,
	    'upsilon': 965,
	    'phi': 966,
	    'chi': 967,
	    'psi': 968,
	    'omega': 969,
	    'thetasym': 977,
	    'upsih': 978,
	    'piv': 982,
	    'ensp': 8194,
	    'emsp': 8195,
	    'thinsp': 8201,
	    'zwnj': 8204,
	    'zwj': 8205,
	    'lrm': 8206,
	    'rlm': 8207,
	    'ndash': 8211,
	    'mdash': 8212,
	    'lsquo': 8216,
	    'rsquo': 8217,
	    'sbquo': 8218,
	    'ldquo': 8220,
	    'rdquo': 8221,
	    'bdquo': 8222,
	    'dagger': 8224,
	    'Dagger': 8225,
	    'bull': 8226,
	    'hellip': 8230,
	    'permil': 8240,
	    'prime': 8242,
	    'Prime': 8243,
	    'lsaquo': 8249,
	    'rsaquo': 8250,
	    'oline': 8254,
	    'frasl': 8260,
	    'euro': 8364,
	    'image': 8465,
	    'weierp': 8472,
	    'real': 8476,
	    'trade': 8482,
	    'alefsym': 8501,
	    'larr': 8592,
	    'uarr': 8593,
	    'rarr': 8594,
	    'darr': 8595,
	    'harr': 8596,
	    'crarr': 8629,
	    'lArr': 8656,
	    'uArr': 8657,
	    'rArr': 8658,
	    'dArr': 8659,
	    'hArr': 8660,
	    'forall': 8704,
	    'part': 8706,
	    'exist': 8707,
	    'empty': 8709,
	    'nabla': 8711,
	    'isin': 8712,
	    'notin': 8713,
	    'ni': 8715,
	    'prod': 8719,
	    'sum': 8721,
	    'minus': 8722,
	    'lowast': 8727,
	    'radic': 8730,
	    'prop': 8733,
	    'infin': 8734,
	    'ang': 8736,
	    'and': 8743,
	    'or': 8744,
	    'cap': 8745,
	    'cup': 8746,
	    'int': 8747,
	    'there4': 8756,
	    'sim': 8764,
	    'cong': 8773,
	    'asymp': 8776,
	    'ne': 8800,
	    'equiv': 8801,
	    'le': 8804,
	    'ge': 8805,
	    'sub': 8834,
	    'sup': 8835,
	    'nsub': 8836,
	    'sube': 8838,
	    'supe': 8839,
	    'oplus': 8853,
	    'otimes': 8855,
	    'perp': 8869,
	    'sdot': 8901,
	    'lceil': 8968,
	    'rceil': 8969,
	    'lfloor': 8970,
	    'rfloor': 8971,
	    'lang': 9001,
	    'rang': 9002,
	    'loz': 9674,
	    'spades': 9824,
	    'clubs': 9827,
	    'hearts': 9829,
	    'diams': 9830
	  }

	  Object.keys(sax.ENTITIES).forEach(function (key) {
	    var e = sax.ENTITIES[key]
	    var s = typeof e === 'number' ? String.fromCharCode(e) : e
	    sax.ENTITIES[key] = s
	  })

	  for (var s in sax.STATE) {
	    sax.STATE[sax.STATE[s]] = s
	  }

	  // shorthand
	  S = sax.STATE

	  function emit (parser, event, data) {
	    parser[event] && parser[event](data)
	  }

	  function emitNode (parser, nodeType, data) {
	    if (parser.textNode) closeText(parser)
	    emit(parser, nodeType, data)
	  }

	  function closeText (parser) {
	    parser.textNode = textopts(parser.opt, parser.textNode)
	    if (parser.textNode) emit(parser, 'ontext', parser.textNode)
	    parser.textNode = ''
	  }

	  function textopts (opt, text) {
	    if (opt.trim) text = text.trim()
	    if (opt.normalize) text = text.replace(/\s+/g, ' ')
	    return text
	  }

	  function error (parser, er) {
	    closeText(parser)
	    if (parser.trackPosition) {
	      er += '\nLine: ' + parser.line +
	        '\nColumn: ' + parser.column +
	        '\nChar: ' + parser.c
	    }
	    er = new Error(er)
	    parser.error = er
	    emit(parser, 'onerror', er)
	    return parser
	  }

	  function end (parser) {
	    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag')
	    if ((parser.state !== S.BEGIN) &&
	      (parser.state !== S.BEGIN_WHITESPACE) &&
	      (parser.state !== S.TEXT)) {
	      error(parser, 'Unexpected end')
	    }
	    closeText(parser)
	    parser.c = ''
	    parser.closed = true
	    emit(parser, 'onend')
	    SAXParser.call(parser, parser.strict, parser.opt)
	    return parser
	  }

	  function strictFail (parser, message) {
	    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
	      throw new Error('bad call to strictFail')
	    }
	    if (parser.strict) {
	      error(parser, message)
	    }
	  }

	  function newTag (parser) {
	    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
	    var parent = parser.tags[parser.tags.length - 1] || parser
	    var tag = parser.tag = { name: parser.tagName, attributes: {} }

	    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
	    if (parser.opt.xmlns) {
	      tag.ns = parent.ns
	    }
	    parser.attribList.length = 0
	    emitNode(parser, 'onopentagstart', tag)
	  }

	  function qname (name, attribute) {
	    var i = name.indexOf(':')
	    var qualName = i < 0 ? [ '', name ] : name.split(':')
	    var prefix = qualName[0]
	    var local = qualName[1]

	    // <x "xmlns"="http://foo">
	    if (attribute && name === 'xmlns') {
	      prefix = 'xmlns'
	      local = ''
	    }

	    return { prefix: prefix, local: local }
	  }

	  function attrib (parser) {
	    if (!parser.strict) {
	      parser.attribName = parser.attribName[parser.looseCase]()
	    }

	    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
	      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
	      parser.attribName = parser.attribValue = ''
	      return
	    }

	    if (parser.opt.xmlns) {
	      var qn = qname(parser.attribName, true)
	      var prefix = qn.prefix
	      var local = qn.local

	      if (prefix === 'xmlns') {
	        // namespace binding attribute. push the binding into scope
	        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
	          strictFail(parser,
	            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
	            'Actual: ' + parser.attribValue)
	        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
	          strictFail(parser,
	            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
	            'Actual: ' + parser.attribValue)
	        } else {
	          var tag = parser.tag
	          var parent = parser.tags[parser.tags.length - 1] || parser
	          if (tag.ns === parent.ns) {
	            tag.ns = Object.create(parent.ns)
	          }
	          tag.ns[local] = parser.attribValue
	        }
	      }

	      // defer onattribute events until all attributes have been seen
	      // so any new bindings can take effect. preserve attribute order
	      // so deferred events can be emitted in document order
	      parser.attribList.push([parser.attribName, parser.attribValue])
	    } else {
	      // in non-xmlns mode, we can emit the event right away
	      parser.tag.attributes[parser.attribName] = parser.attribValue
	      emitNode(parser, 'onattribute', {
	        name: parser.attribName,
	        value: parser.attribValue
	      })
	    }

	    parser.attribName = parser.attribValue = ''
	  }

	  function openTag (parser, selfClosing) {
	    if (parser.opt.xmlns) {
	      // emit namespace binding events
	      var tag = parser.tag

	      // add namespace info to tag
	      var qn = qname(parser.tagName)
	      tag.prefix = qn.prefix
	      tag.local = qn.local
	      tag.uri = tag.ns[qn.prefix] || ''

	      if (tag.prefix && !tag.uri) {
	        strictFail(parser, 'Unbound namespace prefix: ' +
	          JSON.stringify(parser.tagName))
	        tag.uri = qn.prefix
	      }

	      var parent = parser.tags[parser.tags.length - 1] || parser
	      if (tag.ns && parent.ns !== tag.ns) {
	        Object.keys(tag.ns).forEach(function (p) {
	          emitNode(parser, 'onopennamespace', {
	            prefix: p,
	            uri: tag.ns[p]
	          })
	        })
	      }

	      // handle deferred onattribute events
	      // Note: do not apply default ns to attributes:
	      //   http://www.w3.org/TR/REC-xml-names/#defaulting
	      for (var i = 0, l = parser.attribList.length; i < l; i++) {
	        var nv = parser.attribList[i]
	        var name = nv[0]
	        var value = nv[1]
	        var qualName = qname(name, true)
	        var prefix = qualName.prefix
	        var local = qualName.local
	        var uri = prefix === '' ? '' : (tag.ns[prefix] || '')
	        var a = {
	          name: name,
	          value: value,
	          prefix: prefix,
	          local: local,
	          uri: uri
	        }

	        // if there's any attributes with an undefined namespace,
	        // then fail on them now.
	        if (prefix && prefix !== 'xmlns' && !uri) {
	          strictFail(parser, 'Unbound namespace prefix: ' +
	            JSON.stringify(prefix))
	          a.uri = prefix
	        }
	        parser.tag.attributes[name] = a
	        emitNode(parser, 'onattribute', a)
	      }
	      parser.attribList.length = 0
	    }

	    parser.tag.isSelfClosing = !!selfClosing

	    // process the tag
	    parser.sawRoot = true
	    parser.tags.push(parser.tag)
	    emitNode(parser, 'onopentag', parser.tag)
	    if (!selfClosing) {
	      // special case for <script> in non-strict mode.
	      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
	        parser.state = S.SCRIPT
	      } else {
	        parser.state = S.TEXT
	      }
	      parser.tag = null
	      parser.tagName = ''
	    }
	    parser.attribName = parser.attribValue = ''
	    parser.attribList.length = 0
	  }

	  function closeTag (parser) {
	    if (!parser.tagName) {
	      strictFail(parser, 'Weird empty close tag.')
	      parser.textNode += '</>'
	      parser.state = S.TEXT
	      return
	    }

	    if (parser.script) {
	      if (parser.tagName !== 'script') {
	        parser.script += '</' + parser.tagName + '>'
	        parser.tagName = ''
	        parser.state = S.SCRIPT
	        return
	      }
	      emitNode(parser, 'onscript', parser.script)
	      parser.script = ''
	    }

	    // first make sure that the closing tag actually exists.
	    // <a><b></c></b></a> will close everything, otherwise.
	    var t = parser.tags.length
	    var tagName = parser.tagName
	    if (!parser.strict) {
	      tagName = tagName[parser.looseCase]()
	    }
	    var closeTo = tagName
	    while (t--) {
	      var close = parser.tags[t]
	      if (close.name !== closeTo) {
	        // fail the first time in strict mode
	        strictFail(parser, 'Unexpected close tag')
	      } else {
	        break
	      }
	    }

	    // didn't find it.  we already failed for strict, so just abort.
	    if (t < 0) {
	      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName)
	      parser.textNode += '</' + parser.tagName + '>'
	      parser.state = S.TEXT
	      return
	    }
	    parser.tagName = tagName
	    var s = parser.tags.length
	    while (s-- > t) {
	      var tag = parser.tag = parser.tags.pop()
	      parser.tagName = parser.tag.name
	      emitNode(parser, 'onclosetag', parser.tagName)

	      var x = {}
	      for (var i in tag.ns) {
	        x[i] = tag.ns[i]
	      }

	      var parent = parser.tags[parser.tags.length - 1] || parser
	      if (parser.opt.xmlns && tag.ns !== parent.ns) {
	        // remove namespace bindings introduced by tag
	        Object.keys(tag.ns).forEach(function (p) {
	          var n = tag.ns[p]
	          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n })
	        })
	      }
	    }
	    if (t === 0) parser.closedRoot = true
	    parser.tagName = parser.attribValue = parser.attribName = ''
	    parser.attribList.length = 0
	    parser.state = S.TEXT
	  }

	  function parseEntity (parser) {
	    var entity = parser.entity
	    var entityLC = entity.toLowerCase()
	    var num
	    var numStr = ''

	    if (parser.ENTITIES[entity]) {
	      return parser.ENTITIES[entity]
	    }
	    if (parser.ENTITIES[entityLC]) {
	      return parser.ENTITIES[entityLC]
	    }
	    entity = entityLC
	    if (entity.charAt(0) === '#') {
	      if (entity.charAt(1) === 'x') {
	        entity = entity.slice(2)
	        num = parseInt(entity, 16)
	        numStr = num.toString(16)
	      } else {
	        entity = entity.slice(1)
	        num = parseInt(entity, 10)
	        numStr = num.toString(10)
	      }
	    }
	    entity = entity.replace(/^0+/, '')
	    if (isNaN(num) || numStr.toLowerCase() !== entity) {
	      strictFail(parser, 'Invalid character entity')
	      return '&' + parser.entity + ';'
	    }

	    return String.fromCodePoint(num)
	  }

	  function beginWhiteSpace (parser, c) {
	    if (c === '<') {
	      parser.state = S.OPEN_WAKA
	      parser.startTagPosition = parser.position
	    } else if (!isWhitespace(c)) {
	      // have to process this as a text node.
	      // weird, but happens.
	      strictFail(parser, 'Non-whitespace before first tag.')
	      parser.textNode = c
	      parser.state = S.TEXT
	    }
	  }

	  function charAt (chunk, i) {
	    var result = ''
	    if (i < chunk.length) {
	      result = chunk.charAt(i)
	    }
	    return result
	  }

	  function write (chunk) {
	    var parser = this
	    if (this.error) {
	      throw this.error
	    }
	    if (parser.closed) {
	      return error(parser,
	        'Cannot write after close. Assign an onready handler.')
	    }
	    if (chunk === null) {
	      return end(parser)
	    }
	    if (typeof chunk === 'object') {
	      chunk = chunk.toString()
	    }
	    var i = 0
	    var c = ''
	    while (true) {
	      c = charAt(chunk, i++)
	      parser.c = c

	      if (!c) {
	        break
	      }

	      if (parser.trackPosition) {
	        parser.position++
	        if (c === '\n') {
	          parser.line++
	          parser.column = 0
	        } else {
	          parser.column++
	        }
	      }

	      switch (parser.state) {
	        case S.BEGIN:
	          parser.state = S.BEGIN_WHITESPACE
	          if (c === '\uFEFF') {
	            continue
	          }
	          beginWhiteSpace(parser, c)
	          continue

	        case S.BEGIN_WHITESPACE:
	          beginWhiteSpace(parser, c)
	          continue

	        case S.TEXT:
	          if (parser.sawRoot && !parser.closedRoot) {
	            var starti = i - 1
	            while (c && c !== '<' && c !== '&') {
	              c = charAt(chunk, i++)
	              if (c && parser.trackPosition) {
	                parser.position++
	                if (c === '\n') {
	                  parser.line++
	                  parser.column = 0
	                } else {
	                  parser.column++
	                }
	              }
	            }
	            parser.textNode += chunk.substring(starti, i - 1)
	          }
	          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
	            parser.state = S.OPEN_WAKA
	            parser.startTagPosition = parser.position
	          } else {
	            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
	              strictFail(parser, 'Text data outside of root node.')
	            }
	            if (c === '&') {
	              parser.state = S.TEXT_ENTITY
	            } else {
	              parser.textNode += c
	            }
	          }
	          continue

	        case S.SCRIPT:
	          // only non-strict
	          if (c === '<') {
	            parser.state = S.SCRIPT_ENDING
	          } else {
	            parser.script += c
	          }
	          continue

	        case S.SCRIPT_ENDING:
	          if (c === '/') {
	            parser.state = S.CLOSE_TAG
	          } else {
	            parser.script += '<' + c
	            parser.state = S.SCRIPT
	          }
	          continue

	        case S.OPEN_WAKA:
	          // either a /, ?, !, or text is coming next.
	          if (c === '!') {
	            parser.state = S.SGML_DECL
	            parser.sgmlDecl = ''
	          } else if (isWhitespace(c)) {
	            // wait for it...
	          } else if (isMatch(nameStart, c)) {
	            parser.state = S.OPEN_TAG
	            parser.tagName = c
	          } else if (c === '/') {
	            parser.state = S.CLOSE_TAG
	            parser.tagName = ''
	          } else if (c === '?') {
	            parser.state = S.PROC_INST
	            parser.procInstName = parser.procInstBody = ''
	          } else {
	            strictFail(parser, 'Unencoded <')
	            // if there was some whitespace, then add that in.
	            if (parser.startTagPosition + 1 < parser.position) {
	              var pad = parser.position - parser.startTagPosition
	              c = new Array(pad).join(' ') + c
	            }
	            parser.textNode += '<' + c
	            parser.state = S.TEXT
	          }
	          continue

	        case S.SGML_DECL:
	          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
	            emitNode(parser, 'onopencdata')
	            parser.state = S.CDATA
	            parser.sgmlDecl = ''
	            parser.cdata = ''
	          } else if (parser.sgmlDecl + c === '--') {
	            parser.state = S.COMMENT
	            parser.comment = ''
	            parser.sgmlDecl = ''
	          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
	            parser.state = S.DOCTYPE
	            if (parser.doctype || parser.sawRoot) {
	              strictFail(parser,
	                'Inappropriately located doctype declaration')
	            }
	            parser.doctype = ''
	            parser.sgmlDecl = ''
	          } else if (c === '>') {
	            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl)
	            parser.sgmlDecl = ''
	            parser.state = S.TEXT
	          } else if (isQuote(c)) {
	            parser.state = S.SGML_DECL_QUOTED
	            parser.sgmlDecl += c
	          } else {
	            parser.sgmlDecl += c
	          }
	          continue

	        case S.SGML_DECL_QUOTED:
	          if (c === parser.q) {
	            parser.state = S.SGML_DECL
	            parser.q = ''
	          }
	          parser.sgmlDecl += c
	          continue

	        case S.DOCTYPE:
	          if (c === '>') {
	            parser.state = S.TEXT
	            emitNode(parser, 'ondoctype', parser.doctype)
	            parser.doctype = true // just remember that we saw it.
	          } else {
	            parser.doctype += c
	            if (c === '[') {
	              parser.state = S.DOCTYPE_DTD
	            } else if (isQuote(c)) {
	              parser.state = S.DOCTYPE_QUOTED
	              parser.q = c
	            }
	          }
	          continue

	        case S.DOCTYPE_QUOTED:
	          parser.doctype += c
	          if (c === parser.q) {
	            parser.q = ''
	            parser.state = S.DOCTYPE
	          }
	          continue

	        case S.DOCTYPE_DTD:
	          parser.doctype += c
	          if (c === ']') {
	            parser.state = S.DOCTYPE
	          } else if (isQuote(c)) {
	            parser.state = S.DOCTYPE_DTD_QUOTED
	            parser.q = c
	          }
	          continue

	        case S.DOCTYPE_DTD_QUOTED:
	          parser.doctype += c
	          if (c === parser.q) {
	            parser.state = S.DOCTYPE_DTD
	            parser.q = ''
	          }
	          continue

	        case S.COMMENT:
	          if (c === '-') {
	            parser.state = S.COMMENT_ENDING
	          } else {
	            parser.comment += c
	          }
	          continue

	        case S.COMMENT_ENDING:
	          if (c === '-') {
	            parser.state = S.COMMENT_ENDED
	            parser.comment = textopts(parser.opt, parser.comment)
	            if (parser.comment) {
	              emitNode(parser, 'oncomment', parser.comment)
	            }
	            parser.comment = ''
	          } else {
	            parser.comment += '-' + c
	            parser.state = S.COMMENT
	          }
	          continue

	        case S.COMMENT_ENDED:
	          if (c !== '>') {
	            strictFail(parser, 'Malformed comment')
	            // allow <!-- blah -- bloo --> in non-strict mode,
	            // which is a comment of " blah -- bloo "
	            parser.comment += '--' + c
	            parser.state = S.COMMENT
	          } else {
	            parser.state = S.TEXT
	          }
	          continue

	        case S.CDATA:
	          if (c === ']') {
	            parser.state = S.CDATA_ENDING
	          } else {
	            parser.cdata += c
	          }
	          continue

	        case S.CDATA_ENDING:
	          if (c === ']') {
	            parser.state = S.CDATA_ENDING_2
	          } else {
	            parser.cdata += ']' + c
	            parser.state = S.CDATA
	          }
	          continue

	        case S.CDATA_ENDING_2:
	          if (c === '>') {
	            if (parser.cdata) {
	              emitNode(parser, 'oncdata', parser.cdata)
	            }
	            emitNode(parser, 'onclosecdata')
	            parser.cdata = ''
	            parser.state = S.TEXT
	          } else if (c === ']') {
	            parser.cdata += ']'
	          } else {
	            parser.cdata += ']]' + c
	            parser.state = S.CDATA
	          }
	          continue

	        case S.PROC_INST:
	          if (c === '?') {
	            parser.state = S.PROC_INST_ENDING
	          } else if (isWhitespace(c)) {
	            parser.state = S.PROC_INST_BODY
	          } else {
	            parser.procInstName += c
	          }
	          continue

	        case S.PROC_INST_BODY:
	          if (!parser.procInstBody && isWhitespace(c)) {
	            continue
	          } else if (c === '?') {
	            parser.state = S.PROC_INST_ENDING
	          } else {
	            parser.procInstBody += c
	          }
	          continue

	        case S.PROC_INST_ENDING:
	          if (c === '>') {
	            emitNode(parser, 'onprocessinginstruction', {
	              name: parser.procInstName,
	              body: parser.procInstBody
	            })
	            parser.procInstName = parser.procInstBody = ''
	            parser.state = S.TEXT
	          } else {
	            parser.procInstBody += '?' + c
	            parser.state = S.PROC_INST_BODY
	          }
	          continue

	        case S.OPEN_TAG:
	          if (isMatch(nameBody, c)) {
	            parser.tagName += c
	          } else {
	            newTag(parser)
	            if (c === '>') {
	              openTag(parser)
	            } else if (c === '/') {
	              parser.state = S.OPEN_TAG_SLASH
	            } else {
	              if (!isWhitespace(c)) {
	                strictFail(parser, 'Invalid character in tag name')
	              }
	              parser.state = S.ATTRIB
	            }
	          }
	          continue

	        case S.OPEN_TAG_SLASH:
	          if (c === '>') {
	            openTag(parser, true)
	            closeTag(parser)
	          } else {
	            strictFail(parser, 'Forward-slash in opening tag not followed by >')
	            parser.state = S.ATTRIB
	          }
	          continue

	        case S.ATTRIB:
	          // haven't read the attribute name yet.
	          if (isWhitespace(c)) {
	            continue
	          } else if (c === '>') {
	            openTag(parser)
	          } else if (c === '/') {
	            parser.state = S.OPEN_TAG_SLASH
	          } else if (isMatch(nameStart, c)) {
	            parser.attribName = c
	            parser.attribValue = ''
	            parser.state = S.ATTRIB_NAME
	          } else {
	            strictFail(parser, 'Invalid attribute name')
	          }
	          continue

	        case S.ATTRIB_NAME:
	          if (c === '=') {
	            parser.state = S.ATTRIB_VALUE
	          } else if (c === '>') {
	            strictFail(parser, 'Attribute without value')
	            parser.attribValue = parser.attribName
	            attrib(parser)
	            openTag(parser)
	          } else if (isWhitespace(c)) {
	            parser.state = S.ATTRIB_NAME_SAW_WHITE
	          } else if (isMatch(nameBody, c)) {
	            parser.attribName += c
	          } else {
	            strictFail(parser, 'Invalid attribute name')
	          }
	          continue

	        case S.ATTRIB_NAME_SAW_WHITE:
	          if (c === '=') {
	            parser.state = S.ATTRIB_VALUE
	          } else if (isWhitespace(c)) {
	            continue
	          } else {
	            strictFail(parser, 'Attribute without value')
	            parser.tag.attributes[parser.attribName] = ''
	            parser.attribValue = ''
	            emitNode(parser, 'onattribute', {
	              name: parser.attribName,
	              value: ''
	            })
	            parser.attribName = ''
	            if (c === '>') {
	              openTag(parser)
	            } else if (isMatch(nameStart, c)) {
	              parser.attribName = c
	              parser.state = S.ATTRIB_NAME
	            } else {
	              strictFail(parser, 'Invalid attribute name')
	              parser.state = S.ATTRIB
	            }
	          }
	          continue

	        case S.ATTRIB_VALUE:
	          if (isWhitespace(c)) {
	            continue
	          } else if (isQuote(c)) {
	            parser.q = c
	            parser.state = S.ATTRIB_VALUE_QUOTED
	          } else {
	            strictFail(parser, 'Unquoted attribute value')
	            parser.state = S.ATTRIB_VALUE_UNQUOTED
	            parser.attribValue = c
	          }
	          continue

	        case S.ATTRIB_VALUE_QUOTED:
	          if (c !== parser.q) {
	            if (c === '&') {
	              parser.state = S.ATTRIB_VALUE_ENTITY_Q
	            } else {
	              parser.attribValue += c
	            }
	            continue
	          }
	          attrib(parser)
	          parser.q = ''
	          parser.state = S.ATTRIB_VALUE_CLOSED
	          continue

	        case S.ATTRIB_VALUE_CLOSED:
	          if (isWhitespace(c)) {
	            parser.state = S.ATTRIB
	          } else if (c === '>') {
	            openTag(parser)
	          } else if (c === '/') {
	            parser.state = S.OPEN_TAG_SLASH
	          } else if (isMatch(nameStart, c)) {
	            strictFail(parser, 'No whitespace between attributes')
	            parser.attribName = c
	            parser.attribValue = ''
	            parser.state = S.ATTRIB_NAME
	          } else {
	            strictFail(parser, 'Invalid attribute name')
	          }
	          continue

	        case S.ATTRIB_VALUE_UNQUOTED:
	          if (!isAttribEnd(c)) {
	            if (c === '&') {
	              parser.state = S.ATTRIB_VALUE_ENTITY_U
	            } else {
	              parser.attribValue += c
	            }
	            continue
	          }
	          attrib(parser)
	          if (c === '>') {
	            openTag(parser)
	          } else {
	            parser.state = S.ATTRIB
	          }
	          continue

	        case S.CLOSE_TAG:
	          if (!parser.tagName) {
	            if (isWhitespace(c)) {
	              continue
	            } else if (notMatch(nameStart, c)) {
	              if (parser.script) {
	                parser.script += '</' + c
	                parser.state = S.SCRIPT
	              } else {
	                strictFail(parser, 'Invalid tagname in closing tag.')
	              }
	            } else {
	              parser.tagName = c
	            }
	          } else if (c === '>') {
	            closeTag(parser)
	          } else if (isMatch(nameBody, c)) {
	            parser.tagName += c
	          } else if (parser.script) {
	            parser.script += '</' + parser.tagName
	            parser.tagName = ''
	            parser.state = S.SCRIPT
	          } else {
	            if (!isWhitespace(c)) {
	              strictFail(parser, 'Invalid tagname in closing tag')
	            }
	            parser.state = S.CLOSE_TAG_SAW_WHITE
	          }
	          continue

	        case S.CLOSE_TAG_SAW_WHITE:
	          if (isWhitespace(c)) {
	            continue
	          }
	          if (c === '>') {
	            closeTag(parser)
	          } else {
	            strictFail(parser, 'Invalid characters in closing tag')
	          }
	          continue

	        case S.TEXT_ENTITY:
	        case S.ATTRIB_VALUE_ENTITY_Q:
	        case S.ATTRIB_VALUE_ENTITY_U:
	          var returnState
	          var buffer
	          switch (parser.state) {
	            case S.TEXT_ENTITY:
	              returnState = S.TEXT
	              buffer = 'textNode'
	              break

	            case S.ATTRIB_VALUE_ENTITY_Q:
	              returnState = S.ATTRIB_VALUE_QUOTED
	              buffer = 'attribValue'
	              break

	            case S.ATTRIB_VALUE_ENTITY_U:
	              returnState = S.ATTRIB_VALUE_UNQUOTED
	              buffer = 'attribValue'
	              break
	          }

	          if (c === ';') {
	            parser[buffer] += parseEntity(parser)
	            parser.entity = ''
	            parser.state = returnState
	          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
	            parser.entity += c
	          } else {
	            strictFail(parser, 'Invalid character in entity name')
	            parser[buffer] += '&' + parser.entity + c
	            parser.entity = ''
	            parser.state = returnState
	          }

	          continue

	        default:
	          throw new Error(parser, 'Unknown state: ' + parser.state)
	      }
	    } // while

	    if (parser.position >= parser.bufferCheckPosition) {
	      checkBufferLength(parser)
	    }
	    return parser
	  }

	  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
	  /* istanbul ignore next */
	  if (!String.fromCodePoint) {
	    (function () {
	      var stringFromCharCode = String.fromCharCode
	      var floor = Math.floor
	      var fromCodePoint = function () {
	        var MAX_SIZE = 0x4000
	        var codeUnits = []
	        var highSurrogate
	        var lowSurrogate
	        var index = -1
	        var length = arguments.length
	        if (!length) {
	          return ''
	        }
	        var result = ''
	        while (++index < length) {
	          var codePoint = Number(arguments[index])
	          if (
	            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
	            codePoint < 0 || // not a valid Unicode code point
	            codePoint > 0x10FFFF || // not a valid Unicode code point
	            floor(codePoint) !== codePoint // not an integer
	          ) {
	            throw RangeError('Invalid code point: ' + codePoint)
	          }
	          if (codePoint <= 0xFFFF) { // BMP code point
	            codeUnits.push(codePoint)
	          } else { // Astral code point; split in surrogate halves
	            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	            codePoint -= 0x10000
	            highSurrogate = (codePoint >> 10) + 0xD800
	            lowSurrogate = (codePoint % 0x400) + 0xDC00
	            codeUnits.push(highSurrogate, lowSurrogate)
	          }
	          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
	            result += stringFromCharCode.apply(null, codeUnits)
	            codeUnits.length = 0
	          }
	        }
	        return result
	      }
	      /* istanbul ignore next */
	      if (Object.defineProperty) {
	        Object.defineProperty(String, 'fromCodePoint', {
	          value: fromCodePoint,
	          configurable: true,
	          writable: true
	        })
	      } else {
	        String.fromCodePoint = fromCodePoint
	      }
	    }())
	  }
	})( false ? this.sax = {} : exports)

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54).Buffer))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(55)
	var ieee754 = __webpack_require__(56)
	var isArray = __webpack_require__(57)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function getLens (b64) {
	  var len = b64.length

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=')
	  if (validLen === -1) validLen = len

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4)

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

	  var curByte = 0

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen

	  for (var i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)]
	    arr[curByte++] = (tmp >> 16) & 0xFF
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(
	      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
	    ))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    )
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    )
	  }

	  return parts.join('')
	}


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(18).EventEmitter;
	var inherits = __webpack_require__(59);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(60);
	Stream.Writable = __webpack_require__(82);
	Stream.Duplex = __webpack_require__(83);
	Stream.Transform = __webpack_require__(84);
	Stream.PassThrough = __webpack_require__(85);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(61);
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(75);
	exports.Duplex = __webpack_require__(74);
	exports.Transform = __webpack_require__(80);
	exports.PassThrough = __webpack_require__(81);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	/*<replacement>*/

	var pna = __webpack_require__(63);
	/*</replacement>*/

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(57);
	/*</replacement>*/

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	/*<replacement>*/
	var EE = __webpack_require__(18).EventEmitter;

	var EElistenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream = __webpack_require__(64);
	/*</replacement>*/

	/*<replacement>*/

	var Buffer = __webpack_require__(65).Buffer;
	var OurUint8Array = global.Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}

	/*</replacement>*/

	/*<replacement>*/
	var util = __webpack_require__(69);
	util.inherits = __webpack_require__(59);
	/*</replacement>*/

	/*<replacement>*/
	var debugUtil = __webpack_require__(70);
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/

	var BufferList = __webpack_require__(71);
	var destroyImpl = __webpack_require__(73);
	var StringDecoder;

	util.inherits(Readable, Stream);

	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

	  // This is a hack to make sure that our error handler is attached before any
	  // userland ones.  NEVER DO THIS. This is here only because this code needs
	  // to continue to work with older versions of Node.js that do not include
	  // the prependListener() method. The goal is to eventually remove this hack.
	  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}

	function ReadableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(74);

	  options = options || {};

	  // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.
	  var isDuplex = stream instanceof Duplex;

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var readableHwm = options.readableHighWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

	  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

	  // cast to ints.
	  this.highWaterMark = Math.floor(this.highWaterMark);

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;

	  // has it been destroyed
	  this.destroyed = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(79).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(74);

	  if (!(this instanceof Readable)) return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;

	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }

	  Stream.call(this);
	}

	Object.defineProperty(Readable.prototype, 'destroyed', {
	  get: function () {
	    if (this._readableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	  }
	});

	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function (err, cb) {
	  this.push(null);
	  cb(err);
	};

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;

	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;
	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }
	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }

	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};

	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  var state = stream._readableState;
	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
	    if (er) {
	      stream.emit('error', er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }

	      if (addToFront) {
	        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        stream.emit('error', new Error('stream.push() after EOF'));
	      } else {
	        state.reading = false;
	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	    }
	  }

	  return needMoreData(state);
	}

	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    stream.emit('data', chunk);
	    stream.read(0);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

	    if (state.needReadable) emitReadable(stream);
	  }
	  maybeReadMore(stream, state);
	}

	function chunkInvalid(state, chunk) {
	  var er;
	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(79).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;

	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);

	  return ret;
	};

	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    pna.nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('_read() is not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');
	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);

	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = { hasUnpiped: false };

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this, unpipeInfo);
	    }return this;
	  }

	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;

	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this, unpipeInfo);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        pna.nextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    pna.nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var _this = this;

	  var state = this._readableState;
	  var paused = false;

	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) _this.push(chunk);
	    }

	    _this.push(null);
	  });

	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = _this.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
	  }

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  this._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return this;
	};

	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function () {
	    return this._readableState.highWaterMark;
	  }
	});

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;

	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }

	  return ret;
	}

	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}

	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = Buffer.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    pna.nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(62)))

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	if (!process.version ||
	    process.version.indexOf('v0.') === 0 ||
	    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
	  module.exports = { nextTick: nextTick };
	} else {
	  module.exports = process
	}

	function nextTick(fn, arg1, arg2, arg3) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('"callback" argument must be a function');
	  }
	  var len = arguments.length;
	  var args, i;
	  switch (len) {
	  case 0:
	  case 1:
	    return process.nextTick(fn);
	  case 2:
	    return process.nextTick(function afterTickOne() {
	      fn.call(null, arg1);
	    });
	  case 3:
	    return process.nextTick(function afterTickTwo() {
	      fn.call(null, arg1, arg2);
	    });
	  case 4:
	    return process.nextTick(function afterTickThree() {
	      fn.call(null, arg1, arg2, arg3);
	    });
	  default:
	    args = new Array(len - 1);
	    i = 0;
	    while (i < args.length) {
	      args[i++] = arguments[i];
	    }
	    return process.nextTick(function afterTick() {
	      fn.apply(null, args);
	    });
	  }
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18).EventEmitter;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/* eslint-disable node/no-deprecated-api */
	var buffer = __webpack_require__(66)
	var Buffer = buffer.Buffer

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key]
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports)
	  exports.Buffer = SafeBuffer
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer)

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size)
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding)
	    } else {
	      buf.fill(fill)
	    }
	  } else {
	    buf.fill(0)
	  }
	  return buf
	}

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	}

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(67)
	var ieee754 = __webpack_require__(56)
	var isArray = __webpack_require__(68)

	exports.Buffer = Buffer
	exports.SlowBuffer = Buffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return 42 === arr.foo() && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (subject, encoding, noZero) {
	  if (!(this instanceof Buffer))
	    return new Buffer(subject, encoding, noZero)

	  var type = typeof subject

	  // Find the length
	  var length
	  if (type === 'number')
	    length = subject > 0 ? subject >>> 0 : 0
	  else if (type === 'string') {
	    if (encoding === 'base64')
	      subject = base64clean(subject)
	    length = Buffer.byteLength(subject, encoding)
	  } else if (type === 'object' && subject !== null) { // assume object is array-like
	    if (subject.type === 'Buffer' && isArray(subject.data))
	      subject = subject.data
	    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
	  } else
	    throw new TypeError('must start with number, buffer, array or string')

	  if (this.length > kMaxLength)
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	      'size: 0x' + kMaxLength.toString(16) + ' bytes')

	  var buf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Preferred: Return an augmented `Uint8Array` instance for best performance
	    buf = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return THIS instance of Buffer (created by `new`)
	    buf = this
	    buf.length = length
	    buf._isBuffer = true
	  }

	  var i
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    // Speed optimization -- use set if we're copying from a typed array
	    buf._set(subject)
	  } else if (isArrayish(subject)) {
	    // Treat array-ish objects as a byte array
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++)
	        buf[i] = subject.readUInt8(i)
	    } else {
	      for (i = 0; i < length; i++)
	        buf[i] = ((subject[i] % 256) + 256) % 256
	    }
	  } else if (type === 'string') {
	    buf.write(subject, 0, encoding)
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
	    for (i = 0; i < length; i++) {
	      buf[i] = 0
	    }
	  }

	  return buf
	}

	Buffer.isBuffer = function (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
	    throw new TypeError('Arguments must be Buffers')

	  var x = a.length
	  var y = b.length
	  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function (list, totalLength) {
	  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (totalLength === undefined) {
	    totalLength = 0
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length
	    }
	  }

	  var buf = new Buffer(totalLength)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	Buffer.byteLength = function (str, encoding) {
	  var ret
	  str = str + ''
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2
	      break
	    case 'hex':
	      ret = str.length >>> 1
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length
	      break
	    case 'base64':
	      ret = base64ToBytes(str).length
	      break
	    default:
	      ret = str.length
	  }
	  return ret
	}

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function (encoding, start, end) {
	  var loweredCase = false

	  start = start >>> 0
	  end = end === undefined || end === Infinity ? this.length : end >>> 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase)
	          throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function (b) {
	  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max)
	      str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b)
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var byte = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(byte)) throw new Error('Invalid hex string')
	    buf[offset + i] = byte
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function asciiWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function utf16leWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
	  return charsWritten
	}

	Buffer.prototype.write = function (string, offset, length, encoding) {
	  // Support both (string, offset, length, encoding)
	  // and the legacy (string, encoding, offset, length)
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length
	      length = undefined
	    }
	  } else {  // legacy
	    var swap = encoding
	    encoding = offset
	    offset = length
	    length = swap
	  }

	  offset = Number(offset) || 0
	  var remaining = this.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase()

	  var ret
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length)
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length)
	      break
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length)
	      break
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length)
	      break
	    case 'base64':
	      ret = base64Write(this, string, offset, length)
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length)
	      break
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding)
	  }
	  return ret
	}

	Buffer.prototype.toJSON = function () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  return asciiSlice(buf, start, end)
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len;
	    if (start < 0)
	      start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0)
	      end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start)
	    end = start

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    return Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    var newBuf = new Buffer(sliceLen, undefined, true)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	    return newBuf
	  }
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0)
	    throw new RangeError('offset is not uint')
	  if (offset + ext > length)
	    throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	      ((this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      this[offset + 3])
	}

	Buffer.prototype.readInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80))
	    return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16) |
	      (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	      (this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}

	Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}

	Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function (target, target_start, start, end) {
	  var source = this

	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (!target_start) target_start = 0

	  // Copy 0 bytes; we're done
	  if (end === start) return
	  if (target.length === 0 || source.length === 0) return

	  // Fatal error conditions
	  if (end < start) throw new TypeError('sourceEnd < sourceStart')
	  if (target_start < 0 || target_start >= target.length)
	    throw new TypeError('targetStart out of bounds')
	  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
	  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length)
	    end = this.length
	  if (target.length - target_start < end - start)
	    end = target.length - target_start + start

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start)
	  }
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new TypeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array get/set methods before overwriting
	  arr._get = arr.get
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function isArrayish (subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) ||
	      subject && typeof subject === 'object' &&
	      typeof subject.length === 'number'
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    var b = str.charCodeAt(i)
	    if (b <= 0x7F) {
	      byteArray.push(b)
	    } else {
	      var start = i
	      if (b >= 0xD800 && b <= 0xDFFF) i++
	      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
	      for (var j = 0; j < h.length; j++) {
	        byteArray.push(parseInt(h[j], 16))
	      }
	    }
	  }
	  return byteArray
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(str)
	}

	function blitBuffer (src, dst, offset, length, unitSize) {
	  if (unitSize) length -= length % unitSize;
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length))
	      break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54).Buffer))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS)
				return 62 // '+'
			if (code === SLASH)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ }),
/* 68 */
/***/ (function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54).Buffer))

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Buffer = __webpack_require__(65).Buffer;
	var util = __webpack_require__(72);

	function copyBuffer(src, target, offset) {
	  src.copy(target, offset);
	}

	module.exports = function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }

	  BufferList.prototype.push = function push(v) {
	    var entry = { data: v, next: null };
	    if (this.length > 0) this.tail.next = entry;else this.head = entry;
	    this.tail = entry;
	    ++this.length;
	  };

	  BufferList.prototype.unshift = function unshift(v) {
	    var entry = { data: v, next: this.head };
	    if (this.length === 0) this.tail = entry;
	    this.head = entry;
	    ++this.length;
	  };

	  BufferList.prototype.shift = function shift() {
	    if (this.length === 0) return;
	    var ret = this.head.data;
	    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	    --this.length;
	    return ret;
	  };

	  BufferList.prototype.clear = function clear() {
	    this.head = this.tail = null;
	    this.length = 0;
	  };

	  BufferList.prototype.join = function join(s) {
	    if (this.length === 0) return '';
	    var p = this.head;
	    var ret = '' + p.data;
	    while (p = p.next) {
	      ret += s + p.data;
	    }return ret;
	  };

	  BufferList.prototype.concat = function concat(n) {
	    if (this.length === 0) return Buffer.alloc(0);
	    if (this.length === 1) return this.head.data;
	    var ret = Buffer.allocUnsafe(n >>> 0);
	    var p = this.head;
	    var i = 0;
	    while (p) {
	      copyBuffer(p.data, ret, i);
	      i += p.data.length;
	      p = p.next;
	    }
	    return ret;
	  };

	  return BufferList;
	}();

	if (util && util.inspect && util.inspect.custom) {
	  module.exports.prototype[util.inspect.custom] = function () {
	    var obj = util.inspect({ length: this.length });
	    return this.constructor.name + ' ' + obj;
	  };
	}

/***/ }),
/* 72 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*<replacement>*/

	var pna = __webpack_require__(63);
	/*</replacement>*/

	// undocumented cb() API, needed for core, not for public API
	function destroy(err, cb) {
	  var _this = this;

	  var readableDestroyed = this._readableState && this._readableState.destroyed;
	  var writableDestroyed = this._writableState && this._writableState.destroyed;

	  if (readableDestroyed || writableDestroyed) {
	    if (cb) {
	      cb(err);
	    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
	      pna.nextTick(emitErrorNT, this, err);
	    }
	    return this;
	  }

	  // we set destroyed to true before firing error callbacks in order
	  // to make it re-entrance safe in case destroy() is called within callbacks

	  if (this._readableState) {
	    this._readableState.destroyed = true;
	  }

	  // if this is a duplex stream mark the writable part as destroyed as well
	  if (this._writableState) {
	    this._writableState.destroyed = true;
	  }

	  this._destroy(err || null, function (err) {
	    if (!cb && err) {
	      pna.nextTick(emitErrorNT, _this, err);
	      if (_this._writableState) {
	        _this._writableState.errorEmitted = true;
	      }
	    } else if (cb) {
	      cb(err);
	    }
	  });

	  return this;
	}

	function undestroy() {
	  if (this._readableState) {
	    this._readableState.destroyed = false;
	    this._readableState.reading = false;
	    this._readableState.ended = false;
	    this._readableState.endEmitted = false;
	  }

	  if (this._writableState) {
	    this._writableState.destroyed = false;
	    this._writableState.ended = false;
	    this._writableState.ending = false;
	    this._writableState.finished = false;
	    this._writableState.errorEmitted = false;
	  }
	}

	function emitErrorNT(self, err) {
	  self.emit('error', err);
	}

	module.exports = {
	  destroy: destroy,
	  undestroy: undestroy
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	'use strict';

	/*<replacement>*/

	var pna = __webpack_require__(63);
	/*</replacement>*/

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	};
	/*</replacement>*/

	module.exports = Duplex;

	/*<replacement>*/
	var util = __webpack_require__(69);
	util.inherits = __webpack_require__(59);
	/*</replacement>*/

	var Readable = __webpack_require__(61);
	var Writable = __webpack_require__(75);

	util.inherits(Duplex, Readable);

	{
	  // avoid scope creep, the keys array can then be collected
	  var keys = objectKeys(Writable.prototype);
	  for (var v = 0; v < keys.length; v++) {
	    var method = keys[v];
	    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	  }
	}

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false) this.readable = false;

	  if (options && options.writable === false) this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function () {
	    return this._writableState.highWaterMark;
	  }
	});

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  pna.nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  get: function () {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});

	Duplex.prototype._destroy = function (err, cb) {
	  this.push(null);
	  this.end();

	  pna.nextTick(cb, err);
	};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.

	'use strict';

	/*<replacement>*/

	var pna = __webpack_require__(63);
	/*</replacement>*/

	module.exports = Writable;

	/* <replacement> */
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;
	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */

	/*<replacement>*/
	var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
	/*</replacement>*/

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Writable.WritableState = WritableState;

	/*<replacement>*/
	var util = __webpack_require__(69);
	util.inherits = __webpack_require__(59);
	/*</replacement>*/

	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(78)
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream = __webpack_require__(64);
	/*</replacement>*/

	/*<replacement>*/

	var Buffer = __webpack_require__(65).Buffer;
	var OurUint8Array = global.Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}

	/*</replacement>*/

	var destroyImpl = __webpack_require__(73);

	util.inherits(Writable, Stream);

	function nop() {}

	function WritableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(74);

	  options = options || {};

	  // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.
	  var isDuplex = stream instanceof Duplex;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var writableHwm = options.writableHighWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

	  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

	  // cast to ints.
	  this.highWaterMark = Math.floor(this.highWaterMark);

	  // if _final has been called
	  this.finalCalled = false;

	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // has it been destroyed
	  this.destroyed = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};

	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function () {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})();

	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function (object) {
	      if (realHasInstance.call(this, object)) return true;
	      if (this !== Writable) return false;

	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function (object) {
	    return object instanceof this;
	  };
	}

	function Writable(options) {
	  Duplex = Duplex || __webpack_require__(74);

	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.

	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
	    return new Writable(options);
	  }

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;

	    if (typeof options.writev === 'function') this._writev = options.writev;

	    if (typeof options.destroy === 'function') this._destroy = options.destroy;

	    if (typeof options.final === 'function') this._final = options.final;
	  }

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};

	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  pna.nextTick(cb, er);
	}

	// Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;

	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    pna.nextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	  var isBuf = !state.objectMode && _isUint8Array(chunk);

	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

	  if (typeof cb !== 'function') cb = nop;

	  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }
	  return chunk;
	}

	Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function () {
	    return this._writableState.highWaterMark;
	  }
	});

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);
	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;

	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    pna.nextTick(cb, er);
	    // this can emit finish, and it will always happen
	    // after error
	    pna.nextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    stream.emit('error', er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    stream.emit('error', er);
	    // this can emit finish, but finish must
	    // always follow error
	    finishMaybe(stream, state);
	  }
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      /*<replacement>*/
	      asyncWrite(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;

	    var count = 0;
	    var allBuffers = true;
	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }
	    buffer.allBuffers = allBuffers;

	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	    state.bufferedRequestCount = 0;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      state.bufferedRequestCount--;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('_write() is not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;
	    if (err) {
	      stream.emit('error', err);
	    }
	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}
	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function') {
	      state.pendingcb++;
	      state.finalCalled = true;
	      pna.nextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    prefinish(stream, state);
	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');
	    }
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}

	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;
	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  }
	  if (state.corkedRequestsFree) {
	    state.corkedRequestsFree.next = corkReq;
	  } else {
	    state.corkedRequestsFree = corkReq;
	  }
	}

	Object.defineProperty(Writable.prototype, 'destroyed', {
	  get: function () {
	    if (this._writableState === undefined) {
	      return false;
	    }
	    return this._writableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._writableState.destroyed = value;
	  }
	});

	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function (err, cb) {
	  this.end();
	  cb(err);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62), __webpack_require__(76).setImmediate, (function() { return this; }())))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
	            (typeof self !== "undefined" && self) ||
	            window;
	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(scope, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(77);
	// On some exotic environments, it's not clear which object `setimmediate` was
	// able to install onto.  Search each possibility in the same order as the
	// `setimmediate` library.
	exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
	                       (typeof global !== "undefined" && global.setImmediate) ||
	                       (this && this.setImmediate);
	exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
	                         (typeof global !== "undefined" && global.clearImmediate) ||
	                         (this && this.clearImmediate);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(62)))

/***/ }),
/* 78 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module exports.
	 */

	module.exports = deprecate;

	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */

	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}

	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */

	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	/*<replacement>*/

	var Buffer = __webpack_require__(65).Buffer;
	/*</replacement>*/

	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	};

	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	exports.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer.allocUnsafe(nb);
	}

	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return byte >> 6 === 0x02 ? -1 : -2;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd';
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd';
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd';
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf, p);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd';
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	'use strict';

	module.exports = Transform;

	var Duplex = __webpack_require__(74);

	/*<replacement>*/
	var util = __webpack_require__(69);
	util.inherits = __webpack_require__(59);
	/*</replacement>*/

	util.inherits(Transform, Duplex);

	function afterTransform(er, data) {
	  var ts = this._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb) {
	    return this.emit('error', new Error('write callback called multiple times'));
	  }

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data != null) // single equals check for both `null` and `undefined`
	    this.push(data);

	  cb(er);

	  var rs = this._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    this._read(rs.highWaterMark);
	  }
	}

	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = {
	    afterTransform: afterTransform.bind(this),
	    needTransform: false,
	    transforming: false,
	    writecb: null,
	    writechunk: null,
	    writeencoding: null
	  };

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;

	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }

	  // When the writable side finishes, then flush out anything remaining.
	  this.on('prefinish', prefinish);
	}

	function prefinish() {
	  var _this = this;

	  if (typeof this._flush === 'function') {
	    this._flush(function (er, data) {
	      done(_this, er, data);
	    });
	  } else {
	    done(this, null, null);
	  }
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('_transform() is not implemented');
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	Transform.prototype._destroy = function (err, cb) {
	  var _this2 = this;

	  Duplex.prototype._destroy.call(this, err, function (err2) {
	    cb(err2);
	    _this2.emit('close');
	  });
	};

	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);

	  if (data != null) // single equals check for both `null` and `undefined`
	    stream.push(data);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

	  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

	  return stream.push(null);
	}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	'use strict';

	module.exports = PassThrough;

	var Transform = __webpack_require__(80);

	/*<replacement>*/
	var util = __webpack_require__(69);
	util.inherits = __webpack_require__(59);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(75);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(74);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(60).Transform


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(60).PassThrough


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(66).Buffer;

	function assertEncoding(encoding) {
	  if (encoding && !Buffer.isEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  this.charBuffer = new Buffer(6);
	  this.charReceived = 0;
	  this.charLength = 0;
	};


	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  var offset = 0;

	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var i = (buffer.length >= this.charLength - this.charReceived) ?
	                this.charLength - this.charReceived :
	                buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, offset, i);
	    this.charReceived += (i - offset);
	    offset = i;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (i == buffer.length) return charStr;

	    // otherwise cut off the characters end from the beginning of this buffer
	    buffer = buffer.slice(i, buffer.length);
	    break;
	  }

	  var lenIncomplete = this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
	    this.charReceived = lenIncomplete;
	    end -= lenIncomplete;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }

	  return i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  var incomplete = this.charReceived = buffer.length % 2;
	  this.charLength = incomplete ? 2 : 0;
	  return incomplete;
	}

	function base64DetectIncompleteChar(buffer) {
	  var incomplete = this.charReceived = buffer.length % 3;
	  this.charLength = incomplete ? 3 : 0;
	  return incomplete;
	}


/***/ }),
/* 87 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  "use strict";
	  exports.stripBOM = function(str) {
	    if (str[0] === '\uFEFF') {
	      return str.substring(1);
	    } else {
	      return str;
	    }
	  };

	}).call(this);


/***/ }),
/* 88 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.12.7
	(function() {
	  "use strict";
	  var prefixMatch;

	  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

	  exports.normalize = function(str) {
	    return str.toLowerCase();
	  };

	  exports.firstCharLowerCase = function(str) {
	    return str.charAt(0).toLowerCase() + str.slice(1);
	  };

	  exports.stripPrefix = function(str) {
	    return str.replace(prefixMatch, '');
	  };

	  exports.parseNumbers = function(str) {
	    if (!isNaN(str)) {
	      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
	    }
	    return str;
	  };

	  exports.parseBooleans = function(str) {
	    if (/^(?:true|false)$/i.test(str)) {
	      str = str.toLowerCase() === 'true';
	    }
	    return str;
	  };

	}).call(this);


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AdPanel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _vastClient = __webpack_require__(4);

	var DMVAST = _interopRequireWildcard(_vastClient);

	var _bannerStyles = __webpack_require__(90);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AdPanel = exports.AdPanel = function () {
	    function AdPanel(adPlayer, config) {
	        _classCallCheck(this, AdPanel);

	        // Перейти на сайт рекламодателя
	        // this.rb_linkTxt = "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u0441\u0430\u0439\u0442 \u0440\u0435\u043a\u043b\u0430\u043c\u043e\u0434\u0430\u0442\u0435\u043b\u044f";
	        this.rb_linkTxt = "";
	        // Реклама позволяет слушать музыку бесплатно
	        this.text_1 = '\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 ' + '\u0441\u043B\u0443\u0448\u0430\u0442\u044C \u043C\u0443\u0437\u044B\u043A\u0443 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E';
	        // Оставайтесь с нами, сайт продолжит работу через
	        this.text_2 = '\u041E\u0441\u0442\u0430\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438, ' + '\u0441\u0430\u0439\u0442 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442 \u0440\u0430\u0431\u043E\u0442\u0443 \u0447\u0435\u0440\u0435\u0437 ';
	        // Сайт продолжит работу через
	        this.text_3 = '\u0421\u0430\u0439\u0442 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442 \u0440\u0430\u0431\u043E\u0442\u0443 \u0447\u0435\u0440\u0435\u0437 ';
	        // Рекламная пауза
	        this.text_4 = '\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u0430\u044F \u043F\u0430\u0443\u0437\u0430';
	        // Пропустить рекламу через
	        this.text_5 = '\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0447\u0435\u0440\u0435\u0437 ';

	        this.text_6 = '\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C';

	        this.adPlayer = adPlayer;
	        this.dontDecode = true;
	        this.checkControls = false;
	        this.config = config;
	        //TODO
	        this.staticUrl = "//static.prototypes.ru/boxdigital";
	        // Соль для айдишников
	        this._salt = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
	        this._container = document.createElement('DIV');
	        this.img = document.createElement('IMG');

	        this._overlay = document.createElement('DIV');
	        this._overlay.style.cssText += 'position: fixed; top: 0; right: 0; bottom: 0; left: 0px; background: #0f0f11; opacity: 0.8; z-index: 9999;';
	    }

	    _createClass(AdPanel, [{
	        key: 'getById',
	        value: function getById(id) {
	            return document.getElementById(String(this._salt) + id);
	        }
	    }, {
	        key: 'createId',
	        value: function createId(id) {
	            return String(this._salt) + id;
	        }
	    }, {
	        key: 'setStyles',
	        value: function setStyles(css, element) {
	            if (element && css) for (var i in css) {
	                element.style.cssText += i + ": " + css[i] + "; ";
	            }
	        }
	    }, {
	        key: 'getBannerUrl',
	        value: function getBannerUrl(bannerParams, position, isMobile) {

	            var url = '',
	                bannerDiv = '';
	            if (bannerParams.banners) {
	                for (var i in bannerParams.banners) {

	                    var icon = bannerParams.banners[i];
	                    if (isMobile) {
	                        if (icon.width == '300' && icon.height == '250') {
	                            url = icon.url;
	                            break;
	                        }
	                    } else {
	                        if (position != 'top-center' && position != 'bottom-center' && position != 'big-center' || position == 'center') {
	                            if (icon.width == '336' && icon.height == '280') {
	                                url = bannerParams.banners[i].url;
	                                break;
	                            }
	                        } else if (position == 'top-center' || position == 'bottom-center') {
	                            if (icon.width == '728' && icon.height == '90') {
	                                url = bannerParams.banners[i].url;
	                                break;
	                            }
	                        } else if (position == 'big-center') {
	                            if (icon.width == '500' && icon.height == '500') {
	                                //TODO:: Будет другой размер
	                                url = bannerParams.banners[i].url;
	                                break;
	                            }
	                        }
	                    }
	                }
	            }

	            return url.trim();
	        }
	    }, {
	        key: 'getBannerHtml',
	        value: function getBannerHtml(isMobile, bannerParams, rb_src) {
	            var burl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	            var banner = '',
	                banner_image = '';

	            // let burl;
	            // if(this.config.banner)
	            //     burl = this.getBannerUrl(bannerParams, this.config.placement, isMobile);

	            if (burl.length > 0) banner_image = '<a style="color: ' + this.config.lColor + ';' + _bannerStyles.bannerStyles.link + '" href="' + rb_src + '" target="_blank"><img id="' + this.createId('dgimg') + '" src="' + burl + '"></a>';

	            var link = '<a href="' + rb_src + '" target="_blank" style="color: ' + this.config.lColor + ' ;' + _bannerStyles.bannerStyles.link + '">' + this.rb_linkTxt + '</a>';

	            if (isMobile) {

	                if (banner_image.length > 0) link = banner_image;

	                if (banner_image.length > 0) {
	                    banner = '<div style="text-align:center; color: #545454; margin-top: 5px; margin-bottom: 5px">' + 'Сайт продолжит работу через <span id="' + this.createId('left-counter') + '"></span> сек' + '</div>' + '<div style="text-align: center; clear: both;">' + banner_image + '</div>';
	                } else {
	                    banner = '<div style="text-align:center; margin-top: 2px;">' + this.text_2 + '</div>' + '<div id="gray" class="county timer" style="' + _bannerStyles.bannerStyles.timeContainer + '">' + '<span class="timer__min-wrap separator-left separator-left" style="' + _bannerStyles.bannerStyles.timerWraps + _bannerStyles.bannerStyles.countySpan + '">' + '<span class="county-minutes" style="' + _bannerStyles.bannerStyles.countyNumber + '">00</span>' + '</span>' + '<span style="' + _bannerStyles.bannerStyles.doubleDot + '">:</span>' + '<span class="timer__sec-wrap separator-left" id="' + this.createId('skiptxt-block') + '" style="' + _bannerStyles.bannerStyles.timerWraps + _bannerStyles.bannerStyles.countySpan + '">' + '<span id="' + this.createId('left-counter') + '"  class="county-seconds" style="' + _bannerStyles.bannerStyles.countyNumber + '">23</span>' + //position: absolute; width: 80px; height: 72px;
	                    '</span>' + '</div>';
	                }
	            } else {
	                if (this.config.placement == 'center') {
	                    if (banner_image.length > 0) {
	                        banner = '<div style="text-align:center; margin-top: 11px; margin-bottom: 8px;">' + this.text_2 + '<span id="' + this.createId('left-counter') + '"></span> сек' + '</div>' + '<div style="text-align: center; clear: both;">' + banner_image + '</div>';
	                    } else {
	                        banner = '<div style="text-align:center; margin-top: 11px; margin-bottom: 8px;">' + this.text_2 + '</div>' + '<div id="gray" class="county timer" style="' + _bannerStyles.bannerStyles.timeContainer + '">' + '<span class="timer__min-wrap separator-left separator-left" style="' + _bannerStyles.bannerStyles.timerWraps + _bannerStyles.bannerStyles.countySpan + '">' + '<span class="county-minutes" style="' + _bannerStyles.bannerStyles.countyNumber + '">00</span>' + '</span>' + '<span style="' + _bannerStyles.bannerStyles.doubleDot + '">:</span>' + '<span class="timer__sec-wrap separator-left" id="' + this.createId('skiptxt-block') + '" style="' + _bannerStyles.bannerStyles.timerWraps + _bannerStyles.bannerStyles.countySpan + '">' + '<span id="' + this.createId('left-counter') + '"  class="county-seconds" style="' + _bannerStyles.bannerStyles.countyNumber + '">23</span>' + '</span>' + '</div>';
	                    }
	                } else if (this.config.placement == 'big-center') {

	                    if (banner_image.length > 0) {
	                        banner = '<div style="text-align: center; clear: both;">' + banner_image + '</div>' + '<div style="text-align:center; margin-top: 2px; border-radius: 7px; color: white;">' + this.text_2 + '<span id="' + this.createId('left-counter') + '"></span> сек' + '</div>';
	                    } else {
	                        banner = '<div style="text-align:center; margin-top: 11px; margin-bottom: 8px;">' + this.text_2 + '</div>' + '<div id="gray" class="county timer" style="' + _bannerStyles.bannerStyles.timeContainer + '">' + '<span class="timer__min-wrap separator-left separator-left" style="' + _bannerStyles.bannerStyles.timerWraps + _bannerStyles.bannerStyles.countySpan + '">' + '<span class="county-minutes" style="' + _bannerStyles.bannerStyles.countyNumber + '">00</span>' + '</span>' + '<span style="' + _bannerStyles.bannerStyles.doubleDot + '">:</span>' + '<span class="timer__sec-wrap separator-left" id="' + this.createId('skiptxt-block') + '" style="' + _bannerStyles.bannerStyles.timerWraps + _bannerStyles.bannerStyles.countySpan + '">' + '<span id="' + this.createId('left-counter') + '"  class="county-seconds" style="' + _bannerStyles.bannerStyles.countyNumber + '">23</span>' + '</span>' + '</div>';
	                    }
	                } else if (this.config.placement == 'top-center' || this.config.placement == 'bottom-center') {
	                    banner =  true ? banner_image : '<a href="' + rb_src + '" target="_blank" style="' + _bannerStyles.bannerStyles.link + 'color: ' + this.config.lColor + ';">' + this.rb_linkTxt + '</a>' + '</div>';
	                } else if (this.config.placement == 'inside') {
	                    if (banner_image.length > 0) {
	                        banner = '<div style="text-align:center; color: #545454; margin-top: 5px; margin-bottom: 5px">' + this.text_3 + '<span id="' + this.createId('left-counter') + '"></span> сек' + '</div>' + '<div style="text-align: center; clear: both;">' + banner_image + '</div>';
	                    } else {
	                        banner = '<div style="text-align:center; color: #545454; margin-top: 5px; margin-bottom: 5px; font-size: 17px; padding-top: 54px;">' + this.text_3 + '<span id="' + this.createId('left-counter') + '"></span> сек' + '</div>' + '<div style="text-align: center; clear: both;">' + link + '</div>';
	                    }
	                }
	            }

	            return banner;
	        }
	    }, {
	        key: 'show',
	        value: function show(vastTracker, targetNode, bannerParams) {
	            var _this = this;

	            this.vastTracker = vastTracker;
	            var creative = vastTracker.creative,
	                rb_src = '#';
	            var isMobile = bannerParams.deviceInfo.os == 'android' || bannerParams.deviceInfo.os == 'ios';
	            var banner = '',
	                linkCss = '',
	                _content = '',
	                burl = '';

	            this._container.style.cssText += 'display: block; ';

	            if (this._overlay) this._overlay.style.display = 'block';

	            if (creative.videoClickThroughURLTemplate) {
	                var vast_link_text = this.getTypeExtensionValue('linkTxt', true);
	                if (vast_link_text && vast_link_text.length > 3) this.rb_linkTxt = vast_link_text;

	                var isClickable = !this.checkControls || this.getTypeExtensionValue('isClickable') == 1;
	                rb_src = isClickable ? creative.videoClickThroughURLTemplate : '#';
	            }

	            // linkCss += (this.config.lColor) ? "color:"+ this.config.lColor : '';
	            // burl = 'http://s.pikabu.ru/post_img/2013/06/07/11/1370630827_751063216.gif';
	            if (this.config.banner) burl = this.getBannerUrl(bannerParams, this.config.placement, isMobile);

	            banner = this.getBannerHtml(isMobile, bannerParams, rb_src, burl);

	            if (!isMobile) {
	                // (this.config.placement != 'top-center' && this.config.placement != 'bottom-center' && this.config.placement != 'inside') || this.config.placement == 'center'

	                if (this.config.placement == 'center' || this.config.placement == 'big-center' && burl.length < 5) {
	                    _content = '<div style="text-align:center; font-size: 35px; padding-top: 25px;">' + this.text_4 + '</div>' + banner + '<div style="text-align: center; margin-top: 10px">' + '<a href="' + rb_src + '" target="_blank" style="' + _bannerStyles.bannerStyles.link + 'color: ' + this.config.lColor + '; ' + _bannerStyles.bannerStyles.link + '">' + this.rb_linkTxt + '</a>' + '</div>' + '<div style="text-align: center; margin-top: 26px; color: #808080">' + this.text_1 + '</div>';
	                    this._container.style.cssText += _bannerStyles.bannerStyles.containerDefault;
	                } else if (this.config.placement == 'big-center' && burl.length > 5) {
	                    _content = banner;
	                    this._container.style.cssText += _bannerStyles.bannerStyles.containerBig;
	                } else if (this.config.placement == 'top-center' || this.config.placement == 'bottom-center') {
	                    if (this._overlay) this._overlay = null;

	                    _content = '<span style="position: absolute; top: 5px; left: 5px">&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1072;</span>' + '<span style="position: absolute; top: 5px; right: 5px; font-size:11px;">' + '<a style="' + _bannerStyles.bannerStyles.copyright + '" href="http://digitalbox.ru/" target="_blank"><img src="' + this.staticUrl + '/img/dbox_logo3.png" style="float: left;" >DigitalBox</a>' + '</span>' + banner + '<div>' + '<span style="position: absolute; bottom: 6px; left: 8px; font-size:16px"><a href="' + rb_src + '" target="_blank" style="color: ' + this.config.lColor + ';' + _bannerStyles.bannerStyles.link + '">' + this.rb_linkTxt + '</a></span>' + '<span style="position: absolute; bottom: 6px; right: 14px; font-size: 12px;">' + this.text_6 + '&nbsp;<span id="' + this.createId('left-counter') + '"></span> сек' + '</span>' + '</div>';

	                    var container_styles = this.config.placement == 'top-center' ? _bannerStyles.bannerStyles.containerTopCenter : _bannerStyles.bannerStyles.containerBottomCenter;
	                    this._container.style.cssText += container_styles;
	                } else if (this.config.placement == 'inside_2') {
	                    if (this._overlay) this._overlay = null;

	                    _content = '<span style="position: absolute; top: 5px; left: 5px">&#1056;&#1077;&#1082;&#1083;&#1072;&#1084;&#1072;</span>' + '<span style="position: absolute; top: 5px; right: 5px; font-size:11px;">' + this.text_6 + '&nbsp;<span id="' + this.createId('left-counter') + '"></span> сек' + '</span>' + banner + '<div>' + '<span style="position: absolute; bottom: 6px; left: 8px; font-size:12px; font-weight: normal"><a href="' + rb_src + '" target="_blank" style="color: ' + this.config.lColor + ';' + _bannerStyles.bannerStyles.link + '">' + this.rb_linkTxt + '</a></span>' + '</div>';

	                    var _container_styles = this.config.placement == 'top-center' ? _bannerStyles.bannerStyles.containerTopCenter : _bannerStyles.bannerStyles.containerBottomCenter;
	                    this._container.style.cssText += _container_styles;
	                } else if (this.config.placement == 'inside') {
	                    if (this._overlay) this._overlay = null;
	                    _content = banner + '<div style="text-align: center; margin-top: 26px; color: #808080">';
	                    // + this.text_1 +
	                    '</div>';
	                }
	            } else {
	                _content = banner + '<div style="text-align: center;">' + '<a href="' + rb_src + '" target="_blank" style="' + _bannerStyles.bannerStyles.link + 'color: ' + this.config.lColor + '; ' + _bannerStyles.bannerStyles.link + '">' + this.rb_linkTxt + '</a>' + '</div>' + '<div style="text-align: center; margin-top: 7px; margin-bottom: 7px; color: #808080">' + this.text_1 + '</div>';

	                this._container.style.cssText += _bannerStyles.bannerStyles.containerMobile;
	            }

	            // Добавим стили из конфига площадки
	            this.setStyles(isMobile ? this.config.mobileCss : this.config.css, this._container);
	            this._container.innerHTML = _content;
	            targetNode = targetNode || document.body;

	            var th = this;
	            var Prom = new Promise(function (resolve) {
	                if (_this._overlay) targetNode.appendChild(th._overlay);
	                resolve();
	            }).then(function () {
	                th.afterShowCallback(vastTracker);
	            });

	            targetNode.appendChild(this._container);
	        }
	    }, {
	        key: 'setDisplay',
	        value: function setDisplay(id, display) {
	            var element = th.getById(id);
	            if (element) {
	                element.style.display = display;
	            }
	        }
	    }, {
	        key: 'afterShowCallback',
	        value: function afterShowCallback(vastTracker) {
	            var _this2 = this;

	            var th = this,
	                ad = vastTracker.ad,
	                creative = vastTracker.creative,
	                controls = !this.checkControls || this.getTypeExtensionValue('controls') == 1,
	                _skipTime = DMVAST.parser.parseDuration('00:' + this.getTypeExtensionValue('skipTime'));

	            _skipTime = isNaN(_skipTime) && controls ? -1 : _skipTime;
	            var _skipTime2 = DMVAST.parser.parseDuration('00:' + this.getTypeExtensionValue('skipTime2'));

	            _skipTime2 = isNaN(_skipTime2) && controls ? -1 : _skipTime2;
	            var _leftTime = creative.duration;
	            _leftTime = isNaN(_leftTime) ? -1 : _leftTime;

	            this.setStyles(this.config.bannerCss, this.getById('dgimg'));

	            //плавное отображение контейнера (предварительно указали transition-duration: 1s, opacity: 0)
	            this.setStyles({
	                opacity: 1
	            }, this._container);

	            //счетчик, через сколько можно пропустить
	            if (_skipTime > -1 && _skipTime < _leftTime) {
	                this.setDisplay('skiptxt-block', 'block');

	                if (_skipTime == 0) {
	                    _skipTime = -1;
	                    this.setDisplay('skip-label', 'block');
	                    this.setDisplay('skiptxt-block', 'none');
	                } else {
	                    var fnSkipTimer = function fnSkipTimer() {
	                        if (_skipTime > 0) {
	                            var count = _this2.getById('sk-counter');
	                            if (count) count.innerHTML = _skipTime;
	                            _skipTime--;
	                            setTimeout(fnSkipTimer, 1000);
	                        } else {
	                            _skipTime = -1;
	                            _this2.setDisplay('skip-label', 'block');
	                            _this2.setDisplay('skiptxt-block', 'none');
	                        }
	                    };
	                    fnSkipTimer();
	                }
	            }
	            // Счетсчик, сколько осталось до окончания ролика 
	            if (_leftTime > -1) {
	                var fnLeftCont = function fnLeftCont() {
	                    if (_leftTime > 0) {

	                        var lcount = _this2.getById('left-counter');
	                        if (lcount) lcount.innerHTML = _leftTime < 10 ? "0" + _leftTime.toString() : _leftTime;
	                        _leftTime--;
	                        setTimeout(fnLeftCont, 1000);
	                    } else {
	                        _leftTime = -1;
	                    }
	                };
	                fnLeftCont();
	            }

	            if (_skipTime2 > -1 && _skipTime2 < _leftTime) {
	                if (_skipTime2 == 0) {
	                    _skipTime2 = -1;
	                    var closeButton = document.getElementById('dgb-cl-button');
	                    this._closeButton.style.display = 'block';
	                } else {
	                    setTimeout(function () {
	                        _skipTime2 = -1;
	                        _this2._closeButton.style.display = 'block';
	                    }, _skipTime2 * 1000);
	                }
	            }

	            var skipLink = this.getById('skip-label');
	            if (skipLink) {
	                skipLink.onclick = function (e) {
	                    th.skip();
	                };
	            }
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {

	            this.vastTracker = null;
	            this._container.style.display = 'none';
	            if (this._overlay) this._overlay.style.display = 'none';

	            //FIXME:: Заккоментирую на время теста
	            // this._container.remove();
	            // this._overlay.remove();
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            this.hide();
	            this.adPlayer.stop();
	        }
	    }, {
	        key: 'skip',
	        value: function skip() {
	            new Image().src = this.getTypeExtensionValue('skipAd');
	            this.hide();
	            this.adPlayer.stop();
	        }
	    }, {
	        key: 'click',
	        value: function click(e) {
	            var t;
	            for (t = e.target; t && t.nodeName !== 'A';) {
	                t = t.parenNode;
	            }
	            if (t && t.href.slice(-1) == '#') {
	                e.preventDefault();
	            }if (this.vastTracker) {
	                new Image().src = this.getTypeExtensionValue('addClick');
	                this.vastTracker.click();
	            }
	        }
	    }, {
	        key: 'getTypeExtensionValue',
	        value: function getTypeExtensionValue(typeName, decodeCDATA) {
	            var extension = this.vastTracker.ad.extensions.find(function (extension) {
	                return extension.attributes.type === typeName;
	            });
	            var res = [];
	            if (!extension || !extension.children.length) return false;
	            for (var i = 0, l = extension.children.length; i < l; i++) {
	                res[res.length] = extension.children[i].name === '#cdata-section' && decodeCDATA ? decodeURIComponent(extension.children[i].value) : extension.children[i].value;
	            }
	            return res.join('').replace(/^\s+/, '').replace(/\s+$/, '');
	        }
	    }]);

	    return AdPanel;
	}();

/***/ }),
/* 90 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	var bannerStyles = exports.bannerStyles = {
					overlay: 'position: fixed; top: 0; right: 0; bottom: 0; left: 0px; background: #0f0f11; opacity: 0.8; z-index: 999;',

					containerDefault: 'position: fixed; top: 50%; left: 50%; margin: -235px 0 0 -240px; box-shadow": "0 0 10px rgba(0,0,0,0.4); font-family: Arial; color: #000; line-height: 1.3; font-size: 16px; -webkit-transition-duration: .5s; -o-transition-duration: .5s; -moz-transition-duration: .5s; transition-duration: .5s; opacity: 0;' + 'box-sizing: border-box; display: block; z-index: 99999;' + 'background: #fff; width: 450px; min-height: 310px; padding-bottom: 25px',

					containerBig: 'position: fixed; top: 50%; left: 50%; margin: -250px 0 0 -250px; font-family: Arial; line-height: 1.3; font-size: 17px; -webkit-transition-duration: .5s; -o-transition-duration: .5s; -moz-transition-duration: .5s; transition-duration: .5s; opacity: 0;' + 'box-sizing: border-box; display: block; z-index: 99999;' + 'background-color: transparent; width: 502px; min-height: 310px; padding-bottom: 10px; color: black',

					containerTopCenter: 'font-family: Arial; font-size: 14px; -webkit-transition-duration: .5s; -o-transition-duration: .5s; -moz-transition-duration: .5s; transition-duration: .5s; opacity: 0;' + 'text-align: center; position: fixed; top: 0; left: 0; display: block; z-index: 99999;' + 'box-sizing: border-box; background: #545454; width: 100%; height: 110px; padding-top: 10px',

					containerBottomCenter: 'font-family: Arial; -webkit-transition-duration: .5s; -o-transition-duration: .5s; -moz-transition-duration: .5s; transition-duration: .5s; opacity: 0;' + 'text-align: center; position: fixed; bottom: 0; left: 0; display: block; z-index: 99999;' + 'box-sizing: border-box; background: #545454; width: 100%; height: 110px; padding-top: 10px',

					containerMobile: 'position: fixed; top: 50%; left: 50%; margin: -175px 0 0 -175px; font-family: Arial; width: 350px; min-height: 190px; background: #fff; z-index: 99999; display: block;',

					link: 'border: 0px; font-weight:bold',

					// content 	: 'box-sizing: border-box; background: #fff; width: 480px; height: 310px;',

					// adHeader_1	: 'text-align:center; color: #545454; font-size: 35px; padding-top: 23px;',
					// adHeader_2	: 'text-align:center; color: #545454; margin-top: 2px;',      padding-left: 24px;

					//timer styles
					timeContainer: 'width: 231px; margin: 0px auto; margin-top: 10px; padding-left: 24px;',

					timerWraps: '-webkit-box-sizing: content-box; box-sizing:content-box; width: 73px; background: #080808;background: -moz-linear-gradient(top, #080808 0%, #080808 40%, #000000 100%); ' + 'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#080808), color-stop(40%,#080808), color-stop(100%,#000000)); ' + 'background: -webkit-linear-gradient(top, #080808 0%,#080808 40%,#000000 100%); background: -o-linear-gradient(top, #080808 0%,#080808 40%,#000000 100%); ' + 'background: -ms-linear-gradient(top, #080808 0%,#080808 40%,#000000 100%); background: linear-gradient(to bottom, #868686 0%,#000000 40%,#868686 100%);' + 'color: White; border-top: solid 1px #494949;border-bottom: solid 1px #242424; border-radius: 9px; overflow: hidden !important;position: relative !important; ' + 'height: 85px !important;display: inline-block !important;',
					countySpan: 'display: inline-block; height: 48px; font-family: Arial; font-weight: bold; font-size: 67px; line-height: 72px; position: relative;  overflow: hidden; padding-right: 12px; ' + 'padding-top: 12px; border: 1px solid #ccc; margin: 2px;',
					doubleDot: 'font-size: 85px; color: Gray; overflow: hidden !important; position: relative !important; height: 85px !important;display: inline-block !important; display: inline-block; ' + ' height: 48px; font-family: Arial;font-weight: bold;font-size: 50px;line-height: 72px;position: relative;overflow: hidden; margin: 2px;',
					countyNumber: 'width: 80px; height: 72px; position: absolute; top: 11px; left: 5px;',
					copyright: 'color: #ccc',
					linK: 'color: red',
					banner: 'border: 2px solid green'

	};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AdPlayer = exports.AdPlayer = function () {
	    function AdPlayer() {
	        _classCallCheck(this, AdPlayer);

	        this.mediaElement = document.createElement('audio');
	        this.mediaElement.setAttribute('a', 'b');
	        this.mediaElement.preload = 'auto';
	        this.mediaElement.controls = true;
	        this.mediaElement.autoplay = true;
	        var cont = document.createElement('DIV');
	        cont.setAttribute('a', 'b');
	        cont.style.cssText = 'position:absolute;top:0;left:0;height:1px;width:1px;overflow:hidden';
	        cont.appendChild(this.mediaElement);
	        document.body.insertBefore(cont, document.body.firstChild);
	        this.isPlaying = false;

	        this.fixiosing = false;
	        this.needSendCanPlay = false;
	        this.attachHadlers();

	        this.attachEventPromise =  true ? this.fixios() : Promise.resolve(this.mediaElement);
	    }

	    _createClass(AdPlayer, [{
	        key: 'canplayHandler',
	        value: function canplayHandler(e) {}
	    }, {
	        key: 'errorHandler',
	        value: function errorHandler(e) {}
	    }, {
	        key: 'endedHandler',
	        value: function endedHandler(e) {}
	    }, {
	        key: 'stoppedHandler',
	        value: function stoppedHandler(e) {}
	    }, {
	        key: 'muteHandler',
	        value: function muteHandler(e) {}
	    }, {
	        key: 'unmuteHandler',
	        value: function unmuteHandler(e) {}
	    }, {
	        key: 'timeupdateHandler',
	        value: function timeupdateHandler(time) {}
	    }, {
	        key: 'attachHadlers',
	        value: function attachHadlers() {
	            var _this = this;

	            var myCanPlay = function myCanPlay(e) {
	                if (!_this.fixiosing && _this.needSendCanPlay) {
	                    _this.canplayHandler(e);
	                    _this.needSendCanPlay = false;
	                }
	            };
	            this.mediaElement.addEventListener("canplay", myCanPlay);
	            this.mediaElement.addEventListener("canplaythrough", myCanPlay);
	            this.mediaElement.addEventListener("play", myCanPlay);
	            this.mediaElement.addEventListener("playing", myCanPlay);
	            this.mediaElement.addEventListener("error", function (e) {
	                _this.isPlaying = false;
	                _this.fixiosing || _this.errorHandler(e);
	            });
	            this.mediaElement.addEventListener("ended", function (e) {
	                _this.isPlaying = false;
	                _this.fixiosing || _this.endedHandler(e);
	            });
	            this.mediaElement.addEventListener("pause", function (e) {
	                _this.isPlaying = false;
	                _this.fixiosing || _this.stoppedHandler(e);
	            });
	            this.mediaElement.addEventListener("mute", function (e) {
	                _this.fixiosing || _this.muteHandler(e);
	            });
	            this.mediaElement.addEventListener("unmute", function (e) {
	                _this.fixiosing || _this.unmuteHandler(e);
	            });
	            this.mediaElement.addEventListener("timeupdate", function (e) {
	                _this.fixiosing || _this.timeupdateHandler(e && e.currentTarget && e.currentTarget.currentTime || 0);
	            });
	        }
	    }, {
	        key: 'play',
	        value: function play(url) {
	            var _this2 = this;

	            if (!this.attachEventPromise2) {
	                this.attachEventPromise2 = new Promise(function (resolve, reject) {
	                    setTimeout(function () {
	                        //this.mediaElement.focus();
	                        resolve(_this2.mediaElement);
	                    }, 400);
	                });
	            }
	            this.attachEventPromise = Promise.race([this.attachEventPromise, this.attachEventPromise2]).then(function (mediaElement) {
	                _this2.needSendCanPlay = true;
	                _this2.isPlaying = true;
	                _this2.mediaElement.src = url;
	                _this2.mediaElement.currentTime = 0; //0.1;
	                var p = _this2.mediaElement.play();
	                if (p && typeof Promise !== 'undefined' && p instanceof Promise) {
	                    p.then(null, function (e) {
	                        //console.log(e);
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.mediaElement.pause();
	        }
	    }, {
	        key: 'fixios',
	        value: function fixios() {
	            var _this3 = this;

	            return new Promise(function (resolve, reject) {
	                var fixComplete = function fixComplete() {
	                    document.removeEventListener("click", fixios);
	                    document.removeEventListener("touchend", fixios);
	                    _this3.fixiosing = false;
	                    resolve(_this3.mediaElement);
	                };
	                var fixios = function fixios() {
	                    _this3.fixiosing = true;
	                    if (_this3.mediaElement.readyState === 4) {
	                        fixComplete();
	                        return;
	                    }
	                    try {
	                        if (_this3.isPlaying === false) {
	                            _this3.mediaElement.src = emptyHLSurl;
	                            _this3.isPlaying = true;
	                        }
	                        var p = _this3.mediaElement.play();
	                        if (p && typeof Promise !== 'undefined' && p instanceof Promise) {
	                            p.then(null, function (e) {
	                                //console.log(e);
	                            });
	                        }
	                    } catch (e) {}
	                    if (_this3.mediaElement.readyState !== 4) {
	                        setTimeout(function () {
	                            if (this.isPlaying === true && this.mediaElement.src.indexOf(emptyHLSurl) != -1) {
	                                this.mediaElement.pause();
	                            }
	                            fixComplete();
	                        }, 1);
	                    } else {
	                        fixComplete();
	                    }
	                };
	                document.addEventListener("touchend", fixios);
	                document.addEventListener("click", fixios, true);
	            });
	        }
	    }]);

	    return AdPlayer;
	}();

	;
	var emptyHLSurl = '//pgc.prototypes.ru/static/player/yellow/3sec.mp3';

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   v4.2.6+9869a4bc
	 */

	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  var type = typeof x;
	  return x !== null && (type === 'object' || type === 'function');
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}



	var _isArray = void 0;
	if (Array.isArray) {
	  _isArray = Array.isArray;
	} else {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = void 0;
	var customSchedulerFn = void 0;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var vertx = Function('return this')().require('vertx');
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = void 0;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;


	  if (_state) {
	    var callback = arguments[_state - 1];
	    asap(function () {
	      return invokeCallback(_state, child, callback, parent._result);
	    });
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(2);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var TRY_CATCH_ERROR = { error: null };

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    TRY_CATCH_ERROR.error = error;
	    return TRY_CATCH_ERROR;
	  }
	}

	function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then$$1.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then$$1) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then$$1, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return resolve(promise, value);
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$1) {
	  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$1 === TRY_CATCH_ERROR) {
	      reject(promise, TRY_CATCH_ERROR.error);
	      TRY_CATCH_ERROR.error = null;
	    } else if (then$$1 === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$1)) {
	      handleForeignThenable(promise, maybeThenable, then$$1);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function resolve(promise, value) {
	  if (promise === value) {
	    reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;


	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = void 0,
	      callback = void 0,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = void 0,
	      error = void 0,
	      succeeded = void 0,
	      failed = void 0;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	    resolve(promise, value);
	  } else if (failed) {
	    reject(promise, error);
	  } else if (settled === FULFILLED) {
	    fulfill(promise, value);
	  } else if (settled === REJECTED) {
	    reject(promise, value);
	  }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      resolve(promise, value);
	    }, function rejectPromise(reason) {
	      reject(promise, reason);
	    });
	  } catch (e) {
	    reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	}

	var Enumerator = function () {
	  function Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(noop);

	    if (!this.promise[PROMISE_ID]) {
	      makePromise(this.promise);
	    }

	    if (isArray(input)) {
	      this.length = input.length;
	      this._remaining = input.length;

	      this._result = new Array(this.length);

	      if (this.length === 0) {
	        fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate(input);
	        if (this._remaining === 0) {
	          fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      reject(this.promise, validationError());
	    }
	  }

	  Enumerator.prototype._enumerate = function _enumerate(input) {
	    for (var i = 0; this._state === PENDING && i < input.length; i++) {
	      this._eachEntry(input[i], i);
	    }
	  };

	  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
	    var c = this._instanceConstructor;
	    var resolve$$1 = c.resolve;


	    if (resolve$$1 === resolve$1) {
	      var _then = getThen(entry);

	      if (_then === then && entry._state !== PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof _then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === Promise$1) {
	        var promise = new c(noop);
	        handleMaybeThenable(promise, entry, _then);
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve$$1) {
	          return resolve$$1(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve$$1(entry), i);
	    }
	  };

	  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
	    var promise = this.promise;


	    if (promise._state === PENDING) {
	      this._remaining--;

	      if (state === REJECTED) {
	        reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }

	    if (this._remaining === 0) {
	      fulfill(promise, this._result);
	    }
	  };

	  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
	    var enumerator = this;

	    subscribe(promise, undefined, function (value) {
	      return enumerator._settledAt(FULFILLED, i, value);
	    }, function (reason) {
	      return enumerator._settledAt(REJECTED, i, reason);
	    });
	  };

	  return Enumerator;
	}();

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {Function} resolver
	  Useful for tooling.
	  @constructor
	*/

	var Promise$1 = function () {
	  function Promise(resolver) {
	    this[PROMISE_ID] = nextId();
	    this._result = this._state = undefined;
	    this._subscribers = [];

	    if (noop !== resolver) {
	      typeof resolver !== 'function' && needsResolver();
	      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	    }
	  }

	  /**
	  The primary way of interacting with a promise is through its `then` method,
	  which registers callbacks to receive either a promise's eventual value or the
	  reason why the promise cannot be fulfilled.
	   ```js
	  findUser().then(function(user){
	    // user is available
	  }, function(reason){
	    // user is unavailable, and you are given the reason why
	  });
	  ```
	   Chaining
	  --------
	   The return value of `then` is itself a promise.  This second, 'downstream'
	  promise is resolved with the return value of the first promise's fulfillment
	  or rejection handler, or rejected if the handler throws an exception.
	   ```js
	  findUser().then(function (user) {
	    return user.name;
	  }, function (reason) {
	    return 'default name';
	  }).then(function (userName) {
	    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	    // will be `'default name'`
	  });
	   findUser().then(function (user) {
	    throw new Error('Found user, but still unhappy');
	  }, function (reason) {
	    throw new Error('`findUser` rejected and we're unhappy');
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	  });
	  ```
	  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	   ```js
	  findUser().then(function (user) {
	    throw new PedagogicalException('Upstream error');
	  }).then(function (value) {
	    // never reached
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // The `PedgagocialException` is propagated all the way down to here
	  });
	  ```
	   Assimilation
	  ------------
	   Sometimes the value you want to propagate to a downstream promise can only be
	  retrieved asynchronously. This can be achieved by returning a promise in the
	  fulfillment or rejection handler. The downstream promise will then be pending
	  until the returned promise is settled. This is called *assimilation*.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // The user's comments are now available
	  });
	  ```
	   If the assimliated promise rejects, then the downstream promise will also reject.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // If `findCommentsByAuthor` fulfills, we'll have the value here
	  }, function (reason) {
	    // If `findCommentsByAuthor` rejects, we'll have the reason here
	  });
	  ```
	   Simple Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let result;
	   try {
	    result = findResult();
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	  findResult(function(result, err){
	    if (err) {
	      // failure
	    } else {
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findResult().then(function(result){
	    // success
	  }, function(reason){
	    // failure
	  });
	  ```
	   Advanced Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let author, books;
	   try {
	    author = findAuthor();
	    books  = findBooksByAuthor(author);
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	   function foundBooks(books) {
	   }
	   function failure(reason) {
	   }
	   findAuthor(function(author, err){
	    if (err) {
	      failure(err);
	      // failure
	    } else {
	      try {
	        findBoooksByAuthor(author, function(books, err) {
	          if (err) {
	            failure(err);
	          } else {
	            try {
	              foundBooks(books);
	            } catch(reason) {
	              failure(reason);
	            }
	          }
	        });
	      } catch(error) {
	        failure(err);
	      }
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findAuthor().
	    then(findBooksByAuthor).
	    then(function(books){
	      // found books
	  }).catch(function(reason){
	    // something went wrong
	  });
	  ```
	   @method then
	  @param {Function} onFulfilled
	  @param {Function} onRejected
	  Useful for tooling.
	  @return {Promise}
	  */

	  /**
	  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	  as the catch block of a try/catch statement.
	  ```js
	  function findAuthor(){
	  throw new Error('couldn't find that author');
	  }
	  // synchronous
	  try {
	  findAuthor();
	  } catch(reason) {
	  // something went wrong
	  }
	  // async with promises
	  findAuthor().catch(function(reason){
	  // something went wrong
	  });
	  ```
	  @method catch
	  @param {Function} onRejection
	  Useful for tooling.
	  @return {Promise}
	  */


	  Promise.prototype.catch = function _catch(onRejection) {
	    return this.then(null, onRejection);
	  };

	  /**
	    `finally` will be invoked regardless of the promise's fate just as native
	    try/catch/finally behaves
	  
	    Synchronous example:
	  
	    ```js
	    findAuthor() {
	      if (Math.random() > 0.5) {
	        throw new Error();
	      }
	      return new Author();
	    }
	  
	    try {
	      return findAuthor(); // succeed or fail
	    } catch(error) {
	      return findOtherAuther();
	    } finally {
	      // always runs
	      // doesn't affect the return value
	    }
	    ```
	  
	    Asynchronous example:
	  
	    ```js
	    findAuthor().catch(function(reason){
	      return findOtherAuther();
	    }).finally(function(){
	      // author was either found, or not
	    });
	    ```
	  
	    @method finally
	    @param {Function} callback
	    @return {Promise}
	  */


	  Promise.prototype.finally = function _finally(callback) {
	    var promise = this;
	    var constructor = promise.constructor;

	    if (isFunction(callback)) {
	      return promise.then(function (value) {
	        return constructor.resolve(callback()).then(function () {
	          return value;
	        });
	      }, function (reason) {
	        return constructor.resolve(callback()).then(function () {
	          throw reason;
	        });
	      });
	    }

	    return promise.then(callback, callback);
	  };

	  return Promise;
	}();

	Promise$1.prototype.then = then;
	Promise$1.all = all;
	Promise$1.race = race;
	Promise$1.resolve = resolve$1;
	Promise$1.reject = reject$1;
	Promise$1._setScheduler = setScheduler;
	Promise$1._setAsap = setAsap;
	Promise$1._asap = asap;

	/*global self*/
	function polyfill() {
	  var local = void 0;

	  if (typeof global !== 'undefined') {
	    local = global;
	  } else if (typeof self !== 'undefined') {
	    local = self;
	  } else {
	    try {
	      local = Function('return this')();
	    } catch (e) {
	      throw new Error('polyfill failed because global object is unavailable in this environment');
	    }
	  }

	  var P = local.Promise;

	  if (P) {
	    var promiseToString = null;
	    try {
	      promiseToString = Object.prototype.toString.call(P.resolve());
	    } catch (e) {
	      // silently ignored
	    }

	    if (promiseToString === '[object Promise]' && !P.cast) {
	      return;
	    }
	  }

	  local.Promise = Promise$1;
	}

	// Strange compat..
	Promise$1.polyfill = polyfill;
	Promise$1.Promise = Promise$1;

	return Promise$1;

	})));



	//# sourceMappingURL=es6-promise.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62), (function() { return this; }())))

/***/ })
/******/ ]);