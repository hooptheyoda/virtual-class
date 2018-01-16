/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {
  jQuery(document).on('turbolinks:load', function() {
    var messages, messages_to_bottom;
    messages = $('#messages');
    if ($('#messages').length > 0) {
      messages_to_bottom = function() {
        return messages.scrollTop(messages.prop("scrollHeight"));
      };
      messages_to_bottom();
      App.global_chat = App.cable.subscriptions.create({
        channel: "ChatRoomsChannel",
        chat_room_id: messages.data('chat-room-id')
      }, {
        connected: function() {},
        disconnected: function() {},
        received: function(data) {
          messages.append(data['message']);
          return messages_to_bottom();
        },
        send_message: function(message, chat_room_id) {
          return this.perform('send_message', {
            message: message,
            chat_room_id: chat_room_id
          });
        }
      });
      return $('#new_message').submit(function(e) {
        var $this, textarea;
        $this = $(this);
        textarea = $this.find('#message_body');
        if ($.trim(textarea.val()).length > 1) {
          App.global_chat.send_message(textarea.val(), messages.data('chat-room-id'));
          textarea.val('');
        }
        e.preventDefault();
        return false;
      });
    }
  });

}).call(this);
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */


(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (typeof options.beforeSend === "function") {
          options.beforeSend(xhr, options);
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        } else {
          return fire(document, 'ajaxStop');
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return xhr.abort();
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
;
var COMPILED=!0,goog=goog||{};goog.global=this;goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.provide=function(a){if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a];for(var b=a;(b=b.substring(0,b.lastIndexOf(".")))&&!goog.getObjectByName(b);)goog.implicitNamespaces_[b]=!0}goog.exportPath_(a)};
goog.setTestOnly=function(a){if(COMPILED&&!goog.DEBUG)throw a=a||"",Error("Importing test-only code into non-debug environment"+a?": "+a:".");};COMPILED||(goog.isProvided_=function(a){return!goog.implicitNamespaces_[a]&&!!goog.getObjectByName(a)},goog.implicitNamespaces_={});goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;!(a[0]in c)&&c.execScript&&c.execScript("var "+a[0]);for(var f;a.length&&(f=a.shift());)!a.length&&goog.isDef(b)?c[f]=b:c=c[f]?c[f]:c[f]={}};
goog.getObjectByName=function(a,b){for(var c=a.split("."),f=b||goog.global,g;g=c.shift();)if(goog.isDefAndNotNull(f[g]))f=f[g];else return null;return f};goog.globalize=function(a,b){var c=b||goog.global,f;for(f in a)c[f]=a[f]};
goog.addDependency=function(a,b,c){if(!COMPILED){var f;a=a.replace(/\\/g,"/");for(var g=goog.dependencies_,h=0;f=b[h];h++)g.nameToPath[f]=a,a in g.pathToNames||(g.pathToNames[a]={}),g.pathToNames[a][f]=!0;for(f=0;b=c[f];f++)a in g.requires||(g.requires[a]={}),g.requires[a][b]=!0}};goog.ENABLE_DEBUG_LOADER=!0;
goog.require=function(a){if(!COMPILED&&!goog.isProvided_(a)){if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b){goog.included_[b]=!0;goog.writeScripts_();return}}a="goog.require could not find: "+a;goog.global.console&&goog.global.console.error(a);throw Error(a);}};goog.basePath="";goog.nullFunction=function(){};goog.identityFunction=function(a,b){return a};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};
goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];
!COMPILED&&goog.ENABLE_DEBUG_LOADER&&(goog.included_={},goog.dependencies_={pathToNames:{},nameToPath:{},requires:{},visited:{},written:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return"undefined"!=typeof a&&"write"in a},goog.findBasePath_=function(){if(goog.global.CLOSURE_BASE_PATH)goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("script"),b=a.length-1;0<=b;--b){var c=a[b].src,f=c.lastIndexOf("?"),f=
-1==f?c.length:f;if("base.js"==c.substr(f-7,7)){goog.basePath=c.substr(0,f-7);break}}},goog.importScript_=function(a){var b=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_;!goog.dependencies_.written[a]&&b(a)&&(goog.dependencies_.written[a]=!0)},goog.writeScriptTag_=function(a){if(goog.inHtmlDocument_()){var b=goog.global.document;if("complete"==b.readyState){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}b.write('<script type="text/javascript" src="'+
a+'">\x3c/script>');return!0}return!1},goog.writeScripts_=function(){function a(g){if(!(g in f.written)){if(!(g in f.visited)&&(f.visited[g]=!0,g in f.requires))for(var k in f.requires[g])if(!goog.isProvided_(k))if(k in f.nameToPath)a(f.nameToPath[k]);else throw Error("Undefined nameToPath for "+k);g in c||(c[g]=!0,b.push(g))}}var b=[],c={},f=goog.dependencies_,g;for(g in goog.included_)f.written[g]||a(g);for(g=0;g<b.length;g++)if(b[g])goog.importScript_(goog.basePath+b[g]);else throw Error("Undefined script input");
},goog.getPathFromDeps_=function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isDef=function(a){return void 0!==a};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.removeUid=function(a){"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};
goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};
goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,f);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};
goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval)if(null==goog.evalWorksForGlobals_&&(goog.global.eval("var _et_ = 1;"),"undefined"!=typeof goog.global._et_?(delete goog.global._et_,goog.evalWorksForGlobals_=!0):goog.evalWorksForGlobals_=!1),goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("script");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));b.body.appendChild(c);
b.body.removeChild(c)}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},f=function(a){a=a.split("-");for(var b=[],f=0;f<a.length;f++)b.push(c(a[f]));return b.join("-")},f=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:f:function(a){return a};return b?a+"-"+f(b):f(a)};goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};
!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){var c=b||{},f;for(f in c){var g=(""+c[f]).replace(/\$/g,"$$$$");a=a.replace(RegExp("\\{\\$"+f+"\\}","gi"),g)}return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a};
goog.base=function(a,b,c){var f=arguments.callee.caller;if(f.superClass_)return f.superClass_.constructor.apply(a,Array.prototype.slice.call(arguments,1));for(var g=Array.prototype.slice.call(arguments,2),h=!1,k=a.constructor;k;k=k.superClass_&&k.superClass_.constructor)if(k.prototype[b]===f)h=!0;else if(h)return k.prototype[b].apply(a,g);if(a[b]===f)return a.constructor.prototype[b].apply(a,g);throw Error("goog.base called from a method of one name to a method of a different name");};
goog.scope=function(a){a.call(goog.global)};var bay={whiteboard:{}};bay.whiteboard.translation={};bay.whiteboard.Collection=function(){this.list=[]};bay.whiteboard.Collection.prototype.getElements=function(){return this.list};bay.whiteboard.Collection.prototype.getBoard=function(){return this.board};bay.whiteboard.Collection.prototype.joinBoard=function(a){this.board=a};
bay.whiteboard.Collection.prototype.clear=function(){for(var a=this.list.length-1;0<=a;a--)this.list[a]&&this.list[a].deleteElement&&this.list[a].deleteElement();this.list=[];if(this.onClear)this.onClear(e);return this};bay.whiteboard.Collection.prototype.add=function(a){a.collection=this;this.list.push(a);this.onChange(a);return this.list.length};
bay.whiteboard.Collection.prototype.getNeighbourList=function(a,b,c,f){for(var g=[],h=0;h<this.list.length;h++)if(this.list[h]&&this.list[h].distance&&(!c||!this.list[h].hidden)){var k=this.list[h].distance(a.x,a.y);k<=b&&g.push({element:this.list[h],distance:k})}f&&g.sort(function(a,b){return a.distance-b.distance});return g};bay.whiteboard.Collection.prototype.getJson=function(a,b){return a.toJson(this.list,this.list.indexOf(a),b)};
bay.whiteboard.Collection.prototype.acceptJsonStr=function(a){var b=function(a,b){var c=b.id;if(a.list[c])a.list[c].acceptData(b);else{var k=bay.whiteboard.Collection.getFromJsonFunc(b.type);k&&(a.list[c]=k(b,a.list),a.list[c].collection=a)}};a=eval("("+a+")");if(a instanceof Array)for(var c=0;c<a.length;c++)b(this,a[c]);else b(this,a);return this};
bay.whiteboard.Collection.prototype.acceptDeletion=function(a){var b=this.list[a];return b&&0==b.dependant.length?(b.deleteElement(),this.list.length==a+1?this.list.splice(a,1):this.list[a]=null,!0):!1};bay.whiteboard.Collection.prototype.jsonCode=function(){for(var a="[",b=this.getElements(),c=0;c<b.length;c++)b[c]&&b[c].toJson&&(0<c&&(a+=","),a+="\n"+b[c].toJson(b,c));return a+"\n]"};bay.whiteboard.Collection.prototype.parseJson=function(a){a=eval("("+a+")");this.rebuild(a);return this};
bay.whiteboard.Collection.prototype.rebuild=function(a){this.clear();for(var b=0;b<a.length;b++){var c=bay.whiteboard.Collection.getFromJsonFunc(a[b].type);c&&(this.list[b]=c(a[b],this.list),this.list[b].collection=this,this.onChange(this.list[b]))}return this};bay.whiteboard.Collection.fromJsonFunc={};bay.whiteboard.Collection.getFromJsonFunc=function(a){return bay.whiteboard.Collection.fromJsonFunc[a]};
bay.whiteboard.Collection.setFromJsonFunc=function(a,b){bay.whiteboard.Collection.fromJsonFunc[a]=b};bay.whiteboard.Collection.prototype.onChange=function(a){};bay.whiteboard.Element=function(){this.label="";this.exists=!1;this.dependant=[]};bay.whiteboard.Element.prototype.recalcDependant=function(){if(this.dependant)for(var a=0;a<this.dependant.length;a++)this.dependant[a].recalc&&this.dependant[a].recalc()};bay.whiteboard.Element.prototype.deleteElement=function(){};
bay.whiteboard.Element.prototype.onChange=function(){if(this.collection)this.collection.onChange(this)};bay.whiteboard.Element.prototype.deleteDependant=function(a){index=this.dependant.indexOf(a);this.dependant.splice(index,1)};bay.whiteboard.Element.prototype.isExists=function(){return this.exists};bay.whiteboard.Element.prototype.distanceTo=function(a){return!a||!a.exists||!this.exists?NaN:this.distance(a.x,a.y)};
bay.whiteboard.Element.prototype.jsonHeader=function(a){return'"id": '+a+(this.label?', "label": "'+this.label+'"':"")+(this.color?', "color": "'+this.color+'"':"")+(this.trace?', "trace": true':"")+(this.hidden?', "hidden": true':"")};bay.whiteboard.Element.prototype.restoreFromJson=function(a){this.label=a.label?a.label:"";a.hidden?this.hidden=!0:delete this.hidden;a.color?this.color=a.color:delete this.color;a.trace?this.trace=!0:delete this.trace};bay.whiteboard.Element.prototype.acceptData=function(a){this.restoreFromJson(a)};
bay.whiteboard.Element.prototype.hide=function(){this.hidden=!0;this.onChange()};bay.whiteboard.Element.prototype.show=function(){this.hidden=!1;this.onChange()};bay.whiteboard.Element.prototype.setLabel=function(a){this.label=a;this.onChange()};bay.whiteboard.Element.prototype.setTrace=function(a){this.trace=a;this.onChange()};bay.whiteboard.Element.prototype.setColor=function(a){this.color=a;this.onChange()};
bay.whiteboard.Vector=function(a,b){a instanceof bay.whiteboard.Vector||a instanceof bay.whiteboard.Point?(this.x=a.x,this.y=a.y):(this.x=a,this.y=b)};bay.whiteboard.Vector.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b);return Math.sqrt((c.x-this.x)*(c.x-this.x)+(c.y-this.y)*(c.y-this.y))};bay.whiteboard.Point=function(){bay.whiteboard.Element.call(this);this.y=this.x=null};goog.inherits(bay.whiteboard.Point,bay.whiteboard.Element);
bay.whiteboard.Point.prototype.toString=function(){return!this.exists?goog.getMsg("Point does not exist"):goog.getMsg("Point: [{$x},{$y}]",{x:this.x.toFixed(2),y:this.y.toFixed(2)})};bay.whiteboard.Point.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b);return Math.sqrt((c.x-this.x)*(c.x-this.x)+(c.y-this.y)*(c.y-this.y))};bay.whiteboard.Point.prototype.getTrace=function(){return new bay.whiteboard.PointFree(this)};
bay.whiteboard.Point.prototype.draw=function(a){if(this.exists&&this.x>=a.area.minX&&this.x<=a.area.maxX&&this.y>=a.area.minY&&this.y<=a.area.maxY){var b=a.transform([this.x,this.y]);if(this.current){var c=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color),f=new goog.graphics.SolidFill(a.properties.current.color);a.graphics.drawCircle(b[0],b[1],a.properties.point.size,c,f)}else if(this.hover&&(c=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),
f=new goog.graphics.SolidFill(a.properties.hover.color),a.graphics.drawCircle(b[0],b[1],a.properties.point.size,c,f)),color=a.properties.point.color,this.color&&(color=this.color),c=new goog.graphics.Stroke(a.properties.point.width,color),f=new goog.graphics.SolidFill(color),a.graphics.drawCircle(b[0],b[1],a.properties.point.size,c,f),this.label){var g=new goog.graphics.Font(a.properties.point.fontsize,a.properties.point.font);a.graphics.drawText(this.label,b[0],b[1],null,null,"left",null,g,c,f)}}};
bay.whiteboard.PointFree=function(a,b){bay.whiteboard.Point.call(this);this.moveTo(a,b)};goog.inherits(bay.whiteboard.PointFree,bay.whiteboard.Point);bay.whiteboard.PointFree.prototype.moveTo=function(a,b){bay.whiteboard.Vector.call(this,a,b);this.recalc();this.onChange()};bay.whiteboard.PointFree.prototype.acceptData=function(a){bay.whiteboard.PointFree.superClass_.acceptData.call(this,a);bay.whiteboard.Vector.call(this,a.x,a.y);this.recalc()};
bay.whiteboard.PointFree.prototype.recalc=function(){this.exists=null!=this.x&&null!=this.y?!0:!1;this.recalcDependant()};bay.whiteboard.PointFree.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PointFree", "x": '+this.x+', "y": '+this.y+"}"};bay.whiteboard.PointFree.fromJson=function(a,b){var c=new bay.whiteboard.PointFree(a.x,a.y);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PointFree",bay.whiteboard.PointFree.fromJson);
bay.whiteboard.getIntersection=function(a,b,c,f){if(a instanceof bay.whiteboard.geometry.Line&&b instanceof bay.whiteboard.geometry.Line)return new bay.whiteboard.geometry.Point_2l(a,b);if(a instanceof bay.whiteboard.geometry.Circle&&b instanceof bay.whiteboard.geometry.Circle){var g=new bay.whiteboard.geometry.Point_2c(a,b,0);a=new bay.whiteboard.geometry.Point_2c(a,b,1);return g.distance(c,f)<a.distance(c,f)?g:a}if(a instanceof bay.whiteboard.geometry.Circle&&b instanceof bay.whiteboard.geometry.Line)return g=
new bay.whiteboard.geometry.Point_lc(b,a,0),a=new bay.whiteboard.geometry.Point_lc(b,a,1),g.distance(c,f)<a.distance(c,f)?g:a;if(a instanceof bay.whiteboard.geometry.Line&&b instanceof bay.whiteboard.geometry.Circle)return g=new bay.whiteboard.geometry.Point_lc(a,b,0),a=new bay.whiteboard.geometry.Point_lc(a,b,1),g.distance(c,f)<a.distance(c,f)?g:a};
goog.getMsg=function(a,b){var c={};"undefined"!==typeof current_LOCALE&&(c=bay_whiteboard_translation[current_LOCALE]);a=c[a]||a;var c=b||{},f;for(f in c){var g=(""+c[f]).replace(/\$/g,"$$$$");a=a.replace(RegExp("\\{\\$"+f+"\\}","gi"),g)}return a};goog.string={};goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(0,b.length))};goog.string.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};
goog.string.subs=function(a,b){for(var c=1;c<arguments.length;c++){var f=String(arguments[c]).replace(/\$/g,"$$$$");a=a.replace(/\%s/,f)}return a};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};goog.string.isEmpty=function(a){return/^[\s\xa0]*$/.test(a)};goog.string.isEmptySafe=function(a){return goog.string.isEmpty(goog.string.makeSafe(a))};goog.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};
goog.string.isNumeric=function(a){return!/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return" "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};
goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};
goog.string.caseInsensitiveCompare=function(a,b){var c=String(a).toLowerCase(),f=String(b).toLowerCase();return c<f?-1:c==f?0:1};goog.string.numerateCompareRegExp_=/(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare=function(a,b){if(a==b)return 0;if(!a)return-1;if(!b)return 1;for(var c=a.toLowerCase().match(goog.string.numerateCompareRegExp_),f=b.toLowerCase().match(goog.string.numerateCompareRegExp_),g=Math.min(c.length,f.length),h=0;h<g;h++){var k=c[h],l=f[h];if(k!=l)return c=parseInt(k,10),!isNaN(c)&&(f=parseInt(l,10),!isNaN(f)&&c-f)?c-f:k<l?-1:1}return c.length!=f.length?c.length-f.length:a<b?-1:1};goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};
goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
goog.string.htmlEscape=function(a,b){if(b)return a.replace(goog.string.amperRe_,"&amp;").replace(goog.string.ltRe_,"&lt;").replace(goog.string.gtRe_,"&gt;").replace(goog.string.quotRe_,"&quot;");if(!goog.string.allRe_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.amperRe_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.ltRe_,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.gtRe_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.quotRe_,"&quot;"));return a};
goog.string.amperRe_=/&/g;goog.string.ltRe_=/</g;goog.string.gtRe_=/>/g;goog.string.quotRe_=/\"/g;goog.string.allRe_=/[&<>\"]/;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
goog.string.unescapeEntitiesUsingDom_=function(a){var b={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},c=document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,g){var h=b[a];if(h)return h;if("#"==g.charAt(0)){var k=Number("0"+g.substr(1));isNaN(k)||(h=String.fromCharCode(k))}h||(c.innerHTML=a+" ",h=c.firstChild.nodeValue.slice(0,-1));return b[a]=h})};
goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var f=Number("0"+c.substr(1));if(!isNaN(f))return String.fromCharCode(f)}return a}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
goog.string.stripQuotes=function(a,b){for(var c=b.length,f=0;f<c;f++){var g=1==c?b:b.charAt(f);if(a.charAt(0)==g&&a.charAt(a.length-1)==g)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
goog.string.truncateMiddle=function(a,b,c,f){c&&(a=goog.string.unescapeEntities(a));if(f&&a.length>b){f>b&&(f=b);var g=a.length-f;a=a.substring(0,b-f)+"..."+a.substring(g)}else a.length>b&&(f=Math.floor(b/2),g=a.length-f,a=a.substring(0,f+b%2)+"..."+a.substring(g));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"};goog.string.jsEscapeCache_={"'":"\\'"};
goog.string.quote=function(a){a=String(a);if(a.quote)return a.quote();for(var b=['"'],c=0;c<a.length;c++){var f=a.charAt(c),g=f.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[f]||(31<g&&127>g?f:goog.string.escapeChar(f))}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b=a,c=a.charCodeAt(0);if(31<c&&127>c)b=a;else{if(256>c){if(b="\\x",16>c||256<c)b+="0"}else b="\\u",4096>c&&(b+="0");b+=c.toString(16).toUpperCase()}return goog.string.jsEscapeCache_[a]=b};goog.string.toMap=function(a){for(var b={},c=0;c<a.length;c++)b[a.charAt(c)]=!0;return b};
goog.string.contains=function(a,b){return-1!=a.indexOf(b)};goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var f=a;0<=b&&(b<a.length&&0<c)&&(f=a.substr(0,b)+a.substr(b+c,a.length-b-c));return f};goog.string.remove=function(a,b){var c=RegExp(goog.string.regExpEscape(b),"");return a.replace(c,"")};goog.string.removeAll=function(a,b){var c=RegExp(goog.string.regExpEscape(b),"g");return a.replace(c,"")};
goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=function(a,b){return Array(b+1).join(a)};goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};goog.string.makeSafe=function(a){return null==a?"":String(a)};goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};
goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};
goog.string.compareVersions=function(a,b){for(var c=0,f=goog.string.trim(String(a)).split("."),g=goog.string.trim(String(b)).split("."),h=Math.max(f.length,g.length),k=0;0==c&&k<h;k++){var l=f[k]||"",m=g[k]||"",n=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var q=n.exec(l)||["","",""],r=p.exec(m)||["","",""];if(0==q[0].length&&0==r[0].length)break;var c=0==q[1].length?0:parseInt(q[1],10),s=0==r[1].length?0:parseInt(r[1],10),c=goog.string.compareElements_(c,s)||goog.string.compareElements_(0==
q[2].length,0==r[2].length)||goog.string.compareElements_(q[2],r[2])}while(0==c)}return c};goog.string.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.string.HASHCODE_MAX_=4294967296;goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c),b%=goog.string.HASHCODE_MAX_;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;goog.string.createUniqueString=function(){return"goog_"+goog.string.uniqueStringCounter_++};
goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmpty(a)?NaN:b};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};goog.string.toTitleCase=function(a,b){var c=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(a,b,c){return b+c.toUpperCase()})};
goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString=function(){return goog.global.navigator?goog.global.navigator.userAgent:null};goog.userAgent.getNavigator=function(){return goog.global.navigator};
goog.userAgent.init_=function(){goog.userAgent.detectedOpera_=!1;goog.userAgent.detectedIe_=!1;goog.userAgent.detectedWebkit_=!1;goog.userAgent.detectedMobile_=!1;goog.userAgent.detectedGecko_=!1;var a;if(!goog.userAgent.BROWSER_KNOWN_&&(a=goog.userAgent.getUserAgentString())){var b=goog.userAgent.getNavigator();goog.userAgent.detectedOpera_=0==a.indexOf("Opera");goog.userAgent.detectedIe_=!goog.userAgent.detectedOpera_&&-1!=a.indexOf("MSIE");goog.userAgent.detectedWebkit_=!goog.userAgent.detectedOpera_&&
-1!=a.indexOf("WebKit");goog.userAgent.detectedMobile_=goog.userAgent.detectedWebkit_&&-1!=a.indexOf("Mobile");goog.userAgent.detectedGecko_=!goog.userAgent.detectedOpera_&&!goog.userAgent.detectedWebkit_&&"Gecko"==b.product}};goog.userAgent.BROWSER_KNOWN_||goog.userAgent.init_();goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.userAgent.detectedOpera_;goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.userAgent.detectedIe_;
goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.userAgent.detectedGecko_;goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.userAgent.detectedWebkit_;goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.detectedMobile_;goog.userAgent.SAFARI=goog.userAgent.WEBKIT;goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigator();return a&&a.platform||""};
goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.ASSUME_ANDROID=!1;goog.userAgent.ASSUME_IPHONE=!1;goog.userAgent.ASSUME_IPAD=!1;goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11||goog.userAgent.ASSUME_ANDROID||goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD;
goog.userAgent.initPlatform_=function(){goog.userAgent.detectedMac_=goog.string.contains(goog.userAgent.PLATFORM,"Mac");goog.userAgent.detectedWindows_=goog.string.contains(goog.userAgent.PLATFORM,"Win");goog.userAgent.detectedLinux_=goog.string.contains(goog.userAgent.PLATFORM,"Linux");goog.userAgent.detectedX11_=!!goog.userAgent.getNavigator()&&goog.string.contains(goog.userAgent.getNavigator().appVersion||"","X11");var a=goog.userAgent.getUserAgentString();goog.userAgent.detectedAndroid_=!!a&&
0<=a.indexOf("Android");goog.userAgent.detectedIPhone_=!!a&&0<=a.indexOf("iPhone");goog.userAgent.detectedIPad_=!!a&&0<=a.indexOf("iPad")};goog.userAgent.PLATFORM_KNOWN_||goog.userAgent.initPlatform_();goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.userAgent.detectedMac_;goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.userAgent.detectedWindows_;
goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.detectedLinux_;goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.detectedX11_;goog.userAgent.ANDROID=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_ANDROID:goog.userAgent.detectedAndroid_;goog.userAgent.IPHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE:goog.userAgent.detectedIPhone_;
goog.userAgent.IPAD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPAD:goog.userAgent.detectedIPad_;
goog.userAgent.determineVersion_=function(){var a="",b;goog.userAgent.OPERA&&goog.global.opera?(a=goog.global.opera.version,a="function"==typeof a?a():a):(goog.userAgent.GECKO?b=/rv\:([^\);]+)(\)|;)/:goog.userAgent.IE?b=/MSIE\s+([^\);]+)(\)|;)/:goog.userAgent.WEBKIT&&(b=/WebKit\/(\S+)/),b&&(a=(a=b.exec(goog.userAgent.getUserAgentString()))?a[1]:""));return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),b>parseFloat(a))?String(b):a};
goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};goog.userAgent.VERSION=goog.userAgent.determineVersion_();goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionCache_={};goog.userAgent.isVersion=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.userAgent.isVersionCache_[a]||(goog.userAgent.isVersionCache_[a]=0<=goog.string.compareVersions(goog.userAgent.VERSION,a))};
goog.userAgent.isDocumentMode=function(a){return goog.userAgent.IE&&goog.userAgent.DOCUMENT_MODE>=a};goog.userAgent.DOCUMENT_MODE=function(){var a=goog.global.document;return!a||!goog.userAgent.IE?void 0:goog.userAgent.getDocumentMode_()||("CSS1Compat"==a.compatMode?parseInt(goog.userAgent.VERSION,10):5)}();goog.object={};goog.object.forEach=function(a,b,c){for(var f in a)b.call(c,a[f],f,a)};goog.object.filter=function(a,b,c){var f={},g;for(g in a)b.call(c,a[g],g,a)&&(f[g]=a[g]);return f};goog.object.map=function(a,b,c){var f={},g;for(g in a)f[g]=b.call(c,a[g],g,a);return f};goog.object.some=function(a,b,c){for(var f in a)if(b.call(c,a[f],f,a))return!0;return!1};goog.object.every=function(a,b,c){for(var f in a)if(!b.call(c,a[f],f,a))return!1;return!0};
goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,f;for(f in a)b[c++]=a[f];return b};goog.object.getKeys=function(a){var b=[],c=0,f;for(f in a)b[c++]=f;return b};
goog.object.getValueByKeys=function(a,b){for(var c=goog.isArrayLike(b),f=c?b:arguments,c=c?0:1;c<f.length&&!(a=a[f[c]],!goog.isDef(a));c++);return a};goog.object.containsKey=function(a,b){return b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};goog.object.findKey=function(a,b,c){for(var f in a)if(b.call(c,a[f],f,a))return f};goog.object.findValue=function(a,b,c){return(b=goog.object.findKey(a,b,c))&&a[b]};
goog.object.isEmpty=function(a){for(var b in a)return!1;return!0};goog.object.clear=function(a){for(var b in a)delete a[b]};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c)};goog.object.get=function(a,b,c){return b in a?a[b]:c};goog.object.set=function(a,b,c){a[b]=c};goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};
goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend=function(a,b){for(var c,f,g=1;g<arguments.length;g++){f=arguments[g];for(c in f)a[c]=f[c];for(var h=0;h<goog.object.PROTOTYPE_FIELDS_.length;h++)c=goog.object.PROTOTYPE_FIELDS_[h],Object.prototype.hasOwnProperty.call(f,c)&&(a[c]=f[c])}};
goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},f=0;f<b;f+=2)c[arguments[f]]=arguments[f+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},f=0;f<b;f++)c[arguments[f]]=!0;return c};
goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return!!Object.isFrozen&&Object.isFrozen(a)};goog.debug={};goog.debug.Error=function(a){Error.captureStackTrace?Error.captureStackTrace(this,goog.debug.Error):this.stack=Error().stack||"";a&&(this.message=String(a))};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){b.unshift(a);goog.debug.Error.call(this,goog.string.subs.apply(null,b));b.shift();this.messagePattern=a};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.doAssertFailure_=function(a,b,c,f){var g="Assertion failed";if(c)var g=g+(": "+c),h=f;else a&&(g+=": "+a,h=b);throw new goog.asserts.AssertionError(""+g,h||[]);};
goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.fail=function(a,b){if(goog.asserts.ENABLE_ASSERTS)throw new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};
goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertInstanceof=function(a,b,c,f){goog.asserts.ENABLE_ASSERTS&&!(a instanceof b)&&goog.asserts.doAssertFailure_("instanceof check failed.",null,c,Array.prototype.slice.call(arguments,3));return a};goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.peek=function(a){return a[a.length-1]};goog.array.ARRAY_PROTOTYPE_=Array.prototype;
goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.indexOf?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return!goog.isString(b)||1!=b.length?-1:a.indexOf(b,c);for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.lastIndexOf?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return!goog.isString(b)||1!=b.length?-1:a.lastIndexOf(b,c);for(;0<=c;c--)if(c in a&&a[c]===b)return c;return-1};
goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.forEach?function(a,b,c){goog.asserts.assert(null!=a.length);goog.array.ARRAY_PROTOTYPE_.forEach.call(a,b,c)}:function(a,b,c){for(var f=a.length,g=goog.isString(a)?a.split(""):a,h=0;h<f;h++)h in g&&b.call(c,g[h],h,a)};goog.array.forEachRight=function(a,b,c){for(var f=a.length,g=goog.isString(a)?a.split(""):a,f=f-1;0<=f;--f)f in g&&b.call(c,g[f],f,a)};
goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.filter?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.filter.call(a,b,c)}:function(a,b,c){for(var f=a.length,g=[],h=0,k=goog.isString(a)?a.split(""):a,l=0;l<f;l++)if(l in k){var m=k[l];b.call(c,m,l,a)&&(g[h++]=m)}return g};
goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.map?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.map.call(a,b,c)}:function(a,b,c){for(var f=a.length,g=Array(f),h=goog.isString(a)?a.split(""):a,k=0;k<f;k++)k in h&&(g[k]=b.call(c,h[k],k,a));return g};goog.array.reduce=function(a,b,c,f){if(a.reduce)return f?a.reduce(goog.bind(b,f),c):a.reduce(b,c);var g=c;goog.array.forEach(a,function(c,k){g=b.call(f,g,c,k,a)});return g};
goog.array.reduceRight=function(a,b,c,f){if(a.reduceRight)return f?a.reduceRight(goog.bind(b,f),c):a.reduceRight(b,c);var g=c;goog.array.forEachRight(a,function(c,k){g=b.call(f,g,c,k,a)});return g};
goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.some?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.some.call(a,b,c)}:function(a,b,c){for(var f=a.length,g=goog.isString(a)?a.split(""):a,h=0;h<f;h++)if(h in g&&b.call(c,g[h],h,a))return!0;return!1};
goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&goog.array.ARRAY_PROTOTYPE_.every?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.every.call(a,b,c)}:function(a,b,c){for(var f=a.length,g=goog.isString(a)?a.split(""):a,h=0;h<f;h++)if(h in g&&!b.call(c,g[h],h,a))return!1;return!0};goog.array.count=function(a,b,c){var f=0;goog.array.forEach(a,function(a,h,k){b.call(c,a,h,k)&&++f},c);return f};
goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var f=a.length,g=goog.isString(a)?a.split(""):a,h=0;h<f;h++)if(h in g&&b.call(c,g[h],h,a))return h;return-1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
goog.array.findIndexRight=function(a,b,c){for(var f=a.length,g=goog.isString(a)?a.split(""):a,f=f-1;0<=f;f--)if(f in g&&b.call(c,g[f],f,a))return f;return-1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b)};
goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b)};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b)};goog.array.insertBefore=function(a,b,c){var f;2==arguments.length||0>(f=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,f)};goog.array.remove=function(a,b){var c=goog.array.indexOf(a,b),f;(f=0<=c)&&goog.array.removeAt(a,c);return f};
goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==goog.array.ARRAY_PROTOTYPE_.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.concat=function(a){return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_,arguments)};goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),f=0;f<b;f++)c[f]=a[f];return c}return[]};goog.array.clone=goog.array.toArray;
goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var f=arguments[c],g;if(goog.isArray(f)||(g=goog.isArrayLike(f))&&Object.prototype.hasOwnProperty.call(f,"callee"))a.push.apply(a,f);else if(g)for(var h=a.length,k=f.length,l=0;l<k;l++)a[h+l]=f[l];else a.push(f)}};goog.array.splice=function(a,b,c,f){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.splice.apply(a,goog.array.slice(arguments,1))};
goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?goog.array.ARRAY_PROTOTYPE_.slice.call(a,b):goog.array.ARRAY_PROTOTYPE_.slice.call(a,b,c)};goog.array.removeDuplicates=function(a,b){for(var c=b||a,f={},g=0,h=0;h<a.length;){var k=a[h++],l=goog.isObject(k)?"o"+goog.getUid(k):(typeof k).charAt(0)+k;Object.prototype.hasOwnProperty.call(f,l)||(f[l]=!0,c[g++]=k)}c.length=g};
goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};goog.array.binarySearch_=function(a,b,c,f,g){for(var h=0,k=a.length,l;h<k;){var m=h+k>>1,n;n=c?b.call(g,a[m],m,a):b(f,a[m]);0<n?h=m+1:(k=m,l=!n)}return l?h:~h};goog.array.sort=function(a,b){goog.asserts.assert(null!=a.length);goog.array.ARRAY_PROTOTYPE_.sort.call(a,b||goog.array.defaultCompare)};
goog.array.stableSort=function(a,b){for(var c=0;c<a.length;c++)a[c]={index:c,value:a[c]};var f=b||goog.array.defaultCompare;goog.array.sort(a,function(a,b){return f(a.value,b.value)||a.index-b.index});for(c=0;c<a.length;c++)a[c]=a[c].value};goog.array.sortObjectsByKey=function(a,b,c){var f=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return f(a[b],c[b])})};
goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var f=1;f<a.length;f++){var g=b(a[f-1],a[f]);if(0<g||0==g&&c)return!1}return!0};goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return!1;var f=a.length;c=c||goog.array.defaultCompareEquality;for(var g=0;g<f;g++)if(!c(a[g],b[g]))return!1;return!0};goog.array.compare=function(a,b,c){return goog.array.equals(a,b,c)};
goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var f=Math.min(a.length,b.length),g=0;g<f;g++){var h=c(a[g],b[g]);if(0!=h)return h}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};
goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};goog.array.bucket=function(a,b){for(var c={},f=0;f<a.length;f++){var g=a[f],h=b(g,f,a);goog.isDef(h)&&(c[h]||(c[h]=[])).push(g)}return c};goog.array.toObject=function(a,b,c){var f={};goog.array.forEach(a,function(g,h){f[b.call(c,g,h,a)]=g});return f};
goog.array.range=function(a,b,c){var f=[],g=0,h=a;c=c||1;void 0!==b&&(g=a,h=b);if(0>c*(h-g))return[];if(0<c)for(a=g;a<h;a+=c)f.push(a);else for(a=g;a>h;a+=c)f.push(a);return f};goog.array.repeat=function(a,b){for(var c=[],f=0;f<b;f++)c[f]=a;return c};goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var f=arguments[c];goog.isArray(f)?b.push.apply(b,goog.array.flatten.apply(null,f)):b.push(f)}return b};
goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?goog.array.ARRAY_PROTOTYPE_.unshift.apply(a,a.splice(-b,b)):0>b&&goog.array.ARRAY_PROTOTYPE_.push.apply(a,a.splice(0,-b)));return a};goog.array.zip=function(a){if(!arguments.length)return[];for(var b=[],c=0;;c++){for(var f=[],g=0;g<arguments.length;g++){var h=arguments[g];if(c>=h.length)return b;f.push(h[c])}b.push(f)}};
goog.array.shuffle=function(a,b){for(var c=b||Math.random,f=a.length-1;0<f;f--){var g=Math.floor(c()*(f+1)),h=a[f];a[f]=a[g];a[g]=h}};goog.math={};goog.math.randomInt=function(a){return Math.floor(Math.random()*a)};goog.math.uniformRandom=function(a,b){return a+Math.random()*(b-a)};goog.math.clamp=function(a,b,c){return Math.min(Math.max(a,b),c)};goog.math.modulo=function(a,b){var c=a%b;return 0>c*b?c+b:c};goog.math.lerp=function(a,b,c){return a+c*(b-a)};goog.math.nearlyEquals=function(a,b,c){return Math.abs(a-b)<=(c||1E-6)};goog.math.standardAngle=function(a){return goog.math.modulo(a,360)};
goog.math.toRadians=function(a){return a*Math.PI/180};goog.math.toDegrees=function(a){return 180*a/Math.PI};goog.math.angleDx=function(a,b){return b*Math.cos(goog.math.toRadians(a))};goog.math.angleDy=function(a,b){return b*Math.sin(goog.math.toRadians(a))};goog.math.angle=function(a,b,c,f){return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(f-b,c-a)))};goog.math.angleDifference=function(a,b){var c=goog.math.standardAngle(b)-goog.math.standardAngle(a);180<c?c-=360:-180>=c&&(c=360+c);return c};
goog.math.sign=function(a){return 0==a?0:0>a?-1:1};goog.math.longestCommonSubsequence=function(a,b,c,f){c=c||function(a,b){return a==b};f=f||function(b,c){return a[b]};for(var g=a.length,h=b.length,k=[],l=0;l<g+1;l++)k[l]=[],k[l][0]=0;for(var m=0;m<h+1;m++)k[0][m]=0;for(l=1;l<=g;l++)for(m=1;m<=g;m++)c(a[l-1],b[m-1])?k[l][m]=k[l-1][m-1]+1:k[l][m]=Math.max(k[l-1][m],k[l][m-1]);for(var n=[],l=g,m=h;0<l&&0<m;)c(a[l-1],b[m-1])?(n.unshift(f(l-1,m-1)),l--,m--):k[l-1][m]>k[l][m-1]?l--:m--;return n};
goog.math.sum=function(a){return goog.array.reduce(arguments,function(a,c){return a+c},0)};goog.math.average=function(a){return goog.math.sum.apply(null,arguments)/arguments.length};goog.math.standardDeviation=function(a){var b=arguments.length;if(2>b)return 0;var c=goog.math.average.apply(null,arguments),b=goog.math.sum.apply(null,goog.array.map(arguments,function(a){return Math.pow(a-c,2)}))/(b-1);return Math.sqrt(b)};goog.math.isInt=function(a){return isFinite(a)&&0==a%1};
goog.math.isFiniteNumber=function(a){return isFinite(a)&&!isNaN(a)};goog.math.safeFloor=function(a,b){goog.asserts.assert(!goog.isDef(b)||0<b);return Math.floor(a+(b||2E-15))};goog.math.safeCeil=function(a,b){goog.asserts.assert(!goog.isDef(b)||0<b);return Math.ceil(a-(b||2E-15))};goog.math.Coordinate=function(a,b){this.x=goog.isDef(a)?a:0;this.y=goog.isDef(b)?b:0};goog.math.Coordinate.prototype.clone=function(){return new goog.math.Coordinate(this.x,this.y)};goog.DEBUG&&(goog.math.Coordinate.prototype.toString=function(){return"("+this.x+", "+this.y+")"});goog.math.Coordinate.equals=function(a,b){return a==b?!0:!a||!b?!1:a.x==b.x&&a.y==b.y};goog.math.Coordinate.distance=function(a,b){var c=a.x-b.x,f=a.y-b.y;return Math.sqrt(c*c+f*f)};
goog.math.Coordinate.magnitude=function(a){return Math.sqrt(a.x*a.x+a.y*a.y)};goog.math.Coordinate.azimuth=function(a){return goog.math.angle(0,0,a.x,a.y)};goog.math.Coordinate.squaredDistance=function(a,b){var c=a.x-b.x,f=a.y-b.y;return c*c+f*f};goog.math.Coordinate.difference=function(a,b){return new goog.math.Coordinate(a.x-b.x,a.y-b.y)};goog.math.Coordinate.sum=function(a,b){return new goog.math.Coordinate(a.x+b.x,a.y+b.y)};
goog.math.Coordinate.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};goog.math.Coordinate.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};goog.math.Coordinate.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};goog.math.Coordinate.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.x+=a.x,this.y+=a.y):(this.x+=a,goog.isNumber(b)&&(this.y+=b));return this};
goog.math.Coordinate.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.x*=a;this.y*=c;return this};goog.math.Box=function(a,b,c,f){this.top=a;this.right=b;this.bottom=c;this.left=f};goog.math.Box.boundingBox=function(a){for(var b=new goog.math.Box(arguments[0].y,arguments[0].x,arguments[0].y,arguments[0].x),c=1;c<arguments.length;c++){var f=arguments[c];b.top=Math.min(b.top,f.y);b.right=Math.max(b.right,f.x);b.bottom=Math.max(b.bottom,f.y);b.left=Math.min(b.left,f.x)}return b};goog.math.Box.prototype.clone=function(){return new goog.math.Box(this.top,this.right,this.bottom,this.left)};
goog.DEBUG&&(goog.math.Box.prototype.toString=function(){return"("+this.top+"t, "+this.right+"r, "+this.bottom+"b, "+this.left+"l)"});goog.math.Box.prototype.contains=function(a){return goog.math.Box.contains(this,a)};goog.math.Box.prototype.expand=function(a,b,c,f){goog.isObject(a)?(this.top-=a.top,this.right+=a.right,this.bottom+=a.bottom,this.left-=a.left):(this.top-=a,this.right+=b,this.bottom+=c,this.left-=f);return this};
goog.math.Box.prototype.expandToInclude=function(a){this.left=Math.min(this.left,a.left);this.top=Math.min(this.top,a.top);this.right=Math.max(this.right,a.right);this.bottom=Math.max(this.bottom,a.bottom)};goog.math.Box.equals=function(a,b){return a==b?!0:!a||!b?!1:a.top==b.top&&a.right==b.right&&a.bottom==b.bottom&&a.left==b.left};
goog.math.Box.contains=function(a,b){return!a||!b?!1:b instanceof goog.math.Box?b.left>=a.left&&b.right<=a.right&&b.top>=a.top&&b.bottom<=a.bottom:b.x>=a.left&&b.x<=a.right&&b.y>=a.top&&b.y<=a.bottom};goog.math.Box.relativePositionX=function(a,b){return b.x<a.left?b.x-a.left:b.x>a.right?b.x-a.right:0};goog.math.Box.relativePositionY=function(a,b){return b.y<a.top?b.y-a.top:b.y>a.bottom?b.y-a.bottom:0};
goog.math.Box.distance=function(a,b){var c=goog.math.Box.relativePositionX(a,b),f=goog.math.Box.relativePositionY(a,b);return Math.sqrt(c*c+f*f)};goog.math.Box.intersects=function(a,b){return a.left<=b.right&&b.left<=a.right&&a.top<=b.bottom&&b.top<=a.bottom};goog.math.Box.intersectsWithPadding=function(a,b,c){return a.left<=b.right+c&&b.left<=a.right+c&&a.top<=b.bottom+c&&b.top<=a.bottom+c};
goog.math.Box.prototype.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};goog.math.Box.prototype.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
goog.math.Box.prototype.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};goog.math.Box.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.left+=a.x,this.right+=a.x,this.top+=a.y,this.bottom+=a.y):(this.left+=a,this.right+=a,goog.isNumber(b)&&(this.top+=b,this.bottom+=b));return this};
goog.math.Box.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.left*=a;this.right*=a;this.top*=c;this.bottom*=c;return this};goog.math.Size=function(a,b){this.width=a;this.height=b};goog.math.Size.equals=function(a,b){return a==b?!0:!a||!b?!1:a.width==b.width&&a.height==b.height};goog.math.Size.prototype.clone=function(){return new goog.math.Size(this.width,this.height)};goog.DEBUG&&(goog.math.Size.prototype.toString=function(){return"("+this.width+" x "+this.height+")"});goog.math.Size.prototype.getLongest=function(){return Math.max(this.width,this.height)};
goog.math.Size.prototype.getShortest=function(){return Math.min(this.width,this.height)};goog.math.Size.prototype.area=function(){return this.width*this.height};goog.math.Size.prototype.perimeter=function(){return 2*(this.width+this.height)};goog.math.Size.prototype.aspectRatio=function(){return this.width/this.height};goog.math.Size.prototype.isEmpty=function(){return!this.area()};goog.math.Size.prototype.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
goog.math.Size.prototype.fitsInside=function(a){return this.width<=a.width&&this.height<=a.height};goog.math.Size.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};goog.math.Size.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};goog.math.Size.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.width*=a;this.height*=c;return this};
goog.math.Size.prototype.scaleToFit=function(a){a=this.aspectRatio()>a.aspectRatio()?a.width/this.width:a.height/this.height;return this.scale(a)};goog.math.Rect=function(a,b,c,f){this.left=a;this.top=b;this.width=c;this.height=f};goog.math.Rect.prototype.clone=function(){return new goog.math.Rect(this.left,this.top,this.width,this.height)};goog.math.Rect.prototype.toBox=function(){return new goog.math.Box(this.top,this.left+this.width,this.top+this.height,this.left)};goog.math.Rect.createFromBox=function(a){return new goog.math.Rect(a.left,a.top,a.right-a.left,a.bottom-a.top)};
goog.DEBUG&&(goog.math.Rect.prototype.toString=function(){return"("+this.left+", "+this.top+" - "+this.width+"w x "+this.height+"h)"});goog.math.Rect.equals=function(a,b){return a==b?!0:!a||!b?!1:a.left==b.left&&a.width==b.width&&a.top==b.top&&a.height==b.height};
goog.math.Rect.prototype.intersection=function(a){var b=Math.max(this.left,a.left),c=Math.min(this.left+this.width,a.left+a.width);if(b<=c){var f=Math.max(this.top,a.top);a=Math.min(this.top+this.height,a.top+a.height);if(f<=a)return this.left=b,this.top=f,this.width=c-b,this.height=a-f,!0}return!1};
goog.math.Rect.intersection=function(a,b){var c=Math.max(a.left,b.left),f=Math.min(a.left+a.width,b.left+b.width);if(c<=f){var g=Math.max(a.top,b.top),h=Math.min(a.top+a.height,b.top+b.height);if(g<=h)return new goog.math.Rect(c,g,f-c,h-g)}return null};goog.math.Rect.intersects=function(a,b){return a.left<=b.left+b.width&&b.left<=a.left+a.width&&a.top<=b.top+b.height&&b.top<=a.top+a.height};goog.math.Rect.prototype.intersects=function(a){return goog.math.Rect.intersects(this,a)};
goog.math.Rect.difference=function(a,b){var c=goog.math.Rect.intersection(a,b);if(!c||!c.height||!c.width)return[a.clone()];var c=[],f=a.top,g=a.height,h=a.left+a.width,k=a.top+a.height,l=b.left+b.width,m=b.top+b.height;b.top>a.top&&(c.push(new goog.math.Rect(a.left,a.top,a.width,b.top-a.top)),f=b.top,g-=b.top-a.top);m<k&&(c.push(new goog.math.Rect(a.left,m,a.width,k-m)),g=m-f);b.left>a.left&&c.push(new goog.math.Rect(a.left,f,b.left-a.left,g));l<h&&c.push(new goog.math.Rect(l,f,h-l,g));return c};
goog.math.Rect.prototype.difference=function(a){return goog.math.Rect.difference(this,a)};goog.math.Rect.prototype.boundingRect=function(a){var b=Math.max(this.left+this.width,a.left+a.width),c=Math.max(this.top+this.height,a.top+a.height);this.left=Math.min(this.left,a.left);this.top=Math.min(this.top,a.top);this.width=b-this.left;this.height=c-this.top};goog.math.Rect.boundingRect=function(a,b){if(!a||!b)return null;var c=a.clone();c.boundingRect(b);return c};
goog.math.Rect.prototype.contains=function(a){return a instanceof goog.math.Rect?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};goog.math.Rect.prototype.getSize=function(){return new goog.math.Size(this.width,this.height)};
goog.math.Rect.prototype.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};goog.math.Rect.prototype.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
goog.math.Rect.prototype.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};goog.math.Rect.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.left+=a.x,this.top+=a.y):(this.left+=a,goog.isNumber(b)&&(this.top+=b));return this};goog.math.Rect.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.left*=a;this.width*=a;this.top*=c;this.height*=c;return this};goog.dom={};goog.dom.vendor={};goog.dom.vendor.getVendorJsPrefix=function(){return goog.userAgent.WEBKIT?"Webkit":goog.userAgent.GECKO?"Moz":goog.userAgent.IE?"ms":goog.userAgent.OPERA?"O":null};goog.dom.vendor.getVendorPrefix=function(){return goog.userAgent.WEBKIT?"-webkit":goog.userAgent.GECKO?"-moz":goog.userAgent.IE?"-ms":goog.userAgent.OPERA?"-o":null};goog.dom.classes={};goog.dom.classes.set=function(a,b){a.className=b};goog.dom.classes.get=function(a){a=a.className;return goog.isString(a)&&a.match(/\S+/g)||[]};goog.dom.classes.add=function(a,b){var c=goog.dom.classes.get(a),f=goog.array.slice(arguments,1),g=c.length+f.length;goog.dom.classes.add_(c,f);goog.dom.classes.set(a,c.join(" "));return c.length==g};
goog.dom.classes.remove=function(a,b){var c=goog.dom.classes.get(a),f=goog.array.slice(arguments,1),g=goog.dom.classes.getDifference_(c,f);goog.dom.classes.set(a,g.join(" "));return g.length==c.length-f.length};goog.dom.classes.add_=function(a,b){for(var c=0;c<b.length;c++)goog.array.contains(a,b[c])||a.push(b[c])};goog.dom.classes.getDifference_=function(a,b){return goog.array.filter(a,function(a){return!goog.array.contains(b,a)})};
goog.dom.classes.swap=function(a,b,c){for(var f=goog.dom.classes.get(a),g=!1,h=0;h<f.length;h++)f[h]==b&&(goog.array.splice(f,h--,1),g=!0);g&&(f.push(c),goog.dom.classes.set(a,f.join(" ")));return g};goog.dom.classes.addRemove=function(a,b,c){var f=goog.dom.classes.get(a);goog.isString(b)?goog.array.remove(f,b):goog.isArray(b)&&(f=goog.dom.classes.getDifference_(f,b));goog.isString(c)&&!goog.array.contains(f,c)?f.push(c):goog.isArray(c)&&goog.dom.classes.add_(f,c);goog.dom.classes.set(a,f.join(" "))};
goog.dom.classes.has=function(a,b){return goog.array.contains(goog.dom.classes.get(a),b)};goog.dom.classes.enable=function(a,b,c){c?goog.dom.classes.add(a,b):goog.dom.classes.remove(a,b)};goog.dom.classes.toggle=function(a,b){var c=!goog.dom.classes.has(a,b);goog.dom.classes.enable(a,b,c);return c};goog.dom.TagName={A:"A",ABBR:"ABBR",ACRONYM:"ACRONYM",ADDRESS:"ADDRESS",APPLET:"APPLET",AREA:"AREA",ARTICLE:"ARTICLE",ASIDE:"ASIDE",AUDIO:"AUDIO",B:"B",BASE:"BASE",BASEFONT:"BASEFONT",BDI:"BDI",BDO:"BDO",BIG:"BIG",BLOCKQUOTE:"BLOCKQUOTE",BODY:"BODY",BR:"BR",BUTTON:"BUTTON",CANVAS:"CANVAS",CAPTION:"CAPTION",CENTER:"CENTER",CITE:"CITE",CODE:"CODE",COL:"COL",COLGROUP:"COLGROUP",COMMAND:"COMMAND",DATA:"DATA",DATALIST:"DATALIST",DD:"DD",DEL:"DEL",DETAILS:"DETAILS",DFN:"DFN",DIALOG:"DIALOG",DIR:"DIR",DIV:"DIV",
DL:"DL",DT:"DT",EM:"EM",EMBED:"EMBED",FIELDSET:"FIELDSET",FIGCAPTION:"FIGCAPTION",FIGURE:"FIGURE",FONT:"FONT",FOOTER:"FOOTER",FORM:"FORM",FRAME:"FRAME",FRAMESET:"FRAMESET",H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6",HEAD:"HEAD",HEADER:"HEADER",HGROUP:"HGROUP",HR:"HR",HTML:"HTML",I:"I",IFRAME:"IFRAME",IMG:"IMG",INPUT:"INPUT",INS:"INS",ISINDEX:"ISINDEX",KBD:"KBD",KEYGEN:"KEYGEN",LABEL:"LABEL",LEGEND:"LEGEND",LI:"LI",LINK:"LINK",MAP:"MAP",MARK:"MARK",MATH:"MATH",MENU:"MENU",META:"META",METER:"METER",
NAV:"NAV",NOFRAMES:"NOFRAMES",NOSCRIPT:"NOSCRIPT",OBJECT:"OBJECT",OL:"OL",OPTGROUP:"OPTGROUP",OPTION:"OPTION",OUTPUT:"OUTPUT",P:"P",PARAM:"PARAM",PRE:"PRE",PROGRESS:"PROGRESS",Q:"Q",RP:"RP",RT:"RT",RUBY:"RUBY",S:"S",SAMP:"SAMP",SCRIPT:"SCRIPT",SECTION:"SECTION",SELECT:"SELECT",SMALL:"SMALL",SOURCE:"SOURCE",SPAN:"SPAN",STRIKE:"STRIKE",STRONG:"STRONG",STYLE:"STYLE",SUB:"SUB",SUMMARY:"SUMMARY",SUP:"SUP",SVG:"SVG",TABLE:"TABLE",TBODY:"TBODY",TD:"TD",TEXTAREA:"TEXTAREA",TFOOT:"TFOOT",TH:"TH",THEAD:"THEAD",
TIME:"TIME",TITLE:"TITLE",TR:"TR",TRACK:"TRACK",TT:"TT",U:"U",UL:"UL",VAR:"VAR",VIDEO:"VIDEO",WBR:"WBR"};goog.dom.BrowserFeature={CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE||goog.userAgent.isDocumentMode(9),CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO&&!goog.userAgent.IE||goog.userAgent.IE&&goog.userAgent.isDocumentMode(9)||goog.userAgent.GECKO&&goog.userAgent.isVersion("1.9.1"),CAN_USE_INNER_TEXT:goog.userAgent.IE&&!goog.userAgent.isVersion("9"),CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE||goog.userAgent.OPERA||goog.userAgent.WEBKIT,INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};goog.dom.ASSUME_QUIRKS_MODE=!1;goog.dom.ASSUME_STANDARDS_MODE=!1;goog.dom.COMPAT_MODE_KNOWN_=goog.dom.ASSUME_QUIRKS_MODE||goog.dom.ASSUME_STANDARDS_MODE;goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.dom.getDomHelper=function(a){return a?new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)):goog.dom.defaultDomHelper_||(goog.dom.defaultDomHelper_=new goog.dom.DomHelper)};
goog.dom.getDocument=function(){return document};goog.dom.getElement=function(a){return goog.isString(a)?document.getElementById(a):a};goog.dom.$=goog.dom.getElement;goog.dom.getElementsByTagNameAndClass=function(a,b,c){return goog.dom.getElementsByTagNameAndClass_(document,a,b,c)};
goog.dom.getElementsByClass=function(a,b){var c=b||document;return goog.dom.canUseQuerySelector_(c)?c.querySelectorAll("."+a):c.getElementsByClassName?c.getElementsByClassName(a):goog.dom.getElementsByTagNameAndClass_(document,"*",a,b)};goog.dom.getElementByClass=function(a,b){var c=b||document,f=null;return(f=goog.dom.canUseQuerySelector_(c)?c.querySelector("."+a):goog.dom.getElementsByClass(a,b)[0])||null};goog.dom.canUseQuerySelector_=function(a){return!(!a.querySelectorAll||!a.querySelector)};
goog.dom.getElementsByTagNameAndClass_=function(a,b,c,f){a=f||a;b=b&&"*"!=b?b.toUpperCase():"";if(goog.dom.canUseQuerySelector_(a)&&(b||c))return a.querySelectorAll(b+(c?"."+c:""));if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){f={};for(var g=0,h=0,k;k=a[h];h++)b==k.nodeName&&(f[g++]=k);f.length=g;return f}return a}a=a.getElementsByTagName(b||"*");if(c){f={};for(h=g=0;k=a[h];h++)b=k.className,"function"==typeof b.split&&goog.array.contains(b.split(/\s+/),c)&&(f[g++]=k);f.length=
g;return f}return a};goog.dom.$$=goog.dom.getElementsByTagNameAndClass;goog.dom.setProperties=function(a,b){goog.object.forEach(b,function(b,f){"style"==f?a.style.cssText=b:"class"==f?a.className=b:"for"==f?a.htmlFor=b:f in goog.dom.DIRECT_ATTRIBUTE_MAP_?a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[f],b):goog.string.startsWith(f,"aria-")||goog.string.startsWith(f,"data-")?a.setAttribute(f,b):a[f]=b})};
goog.dom.DIRECT_ATTRIBUTE_MAP_={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};goog.dom.getViewportSize=function(a){return goog.dom.getViewportSize_(a||window)};goog.dom.getViewportSize_=function(a){a=a.document;a=goog.dom.isCss1CompatMode_(a)?a.documentElement:a.body;return new goog.math.Size(a.clientWidth,a.clientHeight)};
goog.dom.getDocumentHeight=function(){return goog.dom.getDocumentHeight_(window)};goog.dom.getDocumentHeight_=function(a){var b=a.document,c=0;if(b){a=goog.dom.getViewportSize_(a).height;var c=b.body,f=b.documentElement;if(goog.dom.isCss1CompatMode_(b)&&f.scrollHeight)c=f.scrollHeight!=a?f.scrollHeight:f.offsetHeight;else{var b=f.scrollHeight,g=f.offsetHeight;f.clientHeight!=g&&(b=c.scrollHeight,g=c.offsetHeight);c=b>a?b>g?b:g:b<g?b:g}}return c};
goog.dom.getPageScroll=function(a){return goog.dom.getDomHelper((a||goog.global||window).document).getDocumentScroll()};goog.dom.getDocumentScroll=function(){return goog.dom.getDocumentScroll_(document)};goog.dom.getDocumentScroll_=function(a){var b=goog.dom.getDocumentScrollElement_(a);a=goog.dom.getWindow_(a);return new goog.math.Coordinate(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop)};goog.dom.getDocumentScrollElement=function(){return goog.dom.getDocumentScrollElement_(document)};
goog.dom.getDocumentScrollElement_=function(a){return!goog.userAgent.WEBKIT&&goog.dom.isCss1CompatMode_(a)?a.documentElement:a.body};goog.dom.getWindow=function(a){return a?goog.dom.getWindow_(a):window};goog.dom.getWindow_=function(a){return a.parentWindow||a.defaultView};goog.dom.createDom=function(a,b,c){return goog.dom.createDom_(document,arguments)};
goog.dom.createDom_=function(a,b){var c=b[0],f=b[1];if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES&&f&&(f.name||f.type)){c=["<",c];f.name&&c.push(' name="',goog.string.htmlEscape(f.name),'"');if(f.type){c.push(' type="',goog.string.htmlEscape(f.type),'"');var g={};goog.object.extend(g,f);delete g.type;f=g}c.push(">");c=c.join("")}c=a.createElement(c);f&&(goog.isString(f)?c.className=f:goog.isArray(f)?goog.dom.classes.add.apply(null,[c].concat(f)):goog.dom.setProperties(c,f));2<b.length&&
goog.dom.append_(a,c,b,2);return c};goog.dom.append_=function(a,b,c,f){function g(c){c&&b.appendChild(goog.isString(c)?a.createTextNode(c):c)}for(;f<c.length;f++){var h=c[f];goog.isArrayLike(h)&&!goog.dom.isNodeLike(h)?goog.array.forEach(goog.dom.isNodeList(h)?goog.array.toArray(h):h,g):g(h)}};goog.dom.$dom=goog.dom.createDom;goog.dom.createElement=function(a){return document.createElement(a)};goog.dom.createTextNode=function(a){return document.createTextNode(String(a))};
goog.dom.createTable=function(a,b,c){return goog.dom.createTable_(document,a,b,!!c)};goog.dom.createTable_=function(a,b,c,f){for(var g=["<tr>"],h=0;h<c;h++)g.push(f?"<td>&nbsp;</td>":"<td></td>");g.push("</tr>");g=g.join("");c=["<table>"];for(h=0;h<b;h++)c.push(g);c.push("</table>");a=a.createElement(goog.dom.TagName.DIV);a.innerHTML=c.join("");return a.removeChild(a.firstChild)};goog.dom.htmlToDocumentFragment=function(a){return goog.dom.htmlToDocumentFragment_(document,a)};
goog.dom.htmlToDocumentFragment_=function(a,b){var c=a.createElement("div");goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT?(c.innerHTML="<br>"+b,c.removeChild(c.firstChild)):c.innerHTML=b;if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(var f=a.createDocumentFragment();c.firstChild;)f.appendChild(c.firstChild);return f};goog.dom.getCompatMode=function(){return goog.dom.isCss1CompatMode()?"CSS1Compat":"BackCompat"};goog.dom.isCss1CompatMode=function(){return goog.dom.isCss1CompatMode_(document)};
goog.dom.isCss1CompatMode_=function(a){return goog.dom.COMPAT_MODE_KNOWN_?goog.dom.ASSUME_STANDARDS_MODE:"CSS1Compat"==a.compatMode};goog.dom.canHaveChildren=function(a){if(a.nodeType!=goog.dom.NodeType.ELEMENT)return!1;switch(a.tagName){case goog.dom.TagName.APPLET:case goog.dom.TagName.AREA:case goog.dom.TagName.BASE:case goog.dom.TagName.BR:case goog.dom.TagName.COL:case goog.dom.TagName.COMMAND:case goog.dom.TagName.EMBED:case goog.dom.TagName.FRAME:case goog.dom.TagName.HR:case goog.dom.TagName.IMG:case goog.dom.TagName.INPUT:case goog.dom.TagName.IFRAME:case goog.dom.TagName.ISINDEX:case goog.dom.TagName.KEYGEN:case goog.dom.TagName.LINK:case goog.dom.TagName.NOFRAMES:case goog.dom.TagName.NOSCRIPT:case goog.dom.TagName.META:case goog.dom.TagName.OBJECT:case goog.dom.TagName.PARAM:case goog.dom.TagName.SCRIPT:case goog.dom.TagName.SOURCE:case goog.dom.TagName.STYLE:case goog.dom.TagName.TRACK:case goog.dom.TagName.WBR:return!1}return!0};
goog.dom.appendChild=function(a,b){a.appendChild(b)};goog.dom.append=function(a,b){goog.dom.append_(goog.dom.getOwnerDocument(a),a,arguments,1)};goog.dom.removeChildren=function(a){for(var b;b=a.firstChild;)a.removeChild(b)};goog.dom.insertSiblingBefore=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b)};goog.dom.insertSiblingAfter=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)};goog.dom.insertChildAt=function(a,b,c){a.insertBefore(b,a.childNodes[c]||null)};
goog.dom.removeNode=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};goog.dom.replaceNode=function(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)};goog.dom.flattenElement=function(a){var b,c=a.parentNode;if(c&&c.nodeType!=goog.dom.NodeType.DOCUMENT_FRAGMENT){if(a.removeNode)return a.removeNode(!1);for(;b=a.firstChild;)c.insertBefore(b,a);return goog.dom.removeNode(a)}};
goog.dom.getChildren=function(a){return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE&&void 0!=a.children?a.children:goog.array.filter(a.childNodes,function(a){return a.nodeType==goog.dom.NodeType.ELEMENT})};goog.dom.getFirstElementChild=function(a){return void 0!=a.firstElementChild?a.firstElementChild:goog.dom.getNextElementNode_(a.firstChild,!0)};goog.dom.getLastElementChild=function(a){return void 0!=a.lastElementChild?a.lastElementChild:goog.dom.getNextElementNode_(a.lastChild,!1)};
goog.dom.getNextElementSibling=function(a){return void 0!=a.nextElementSibling?a.nextElementSibling:goog.dom.getNextElementNode_(a.nextSibling,!0)};goog.dom.getPreviousElementSibling=function(a){return void 0!=a.previousElementSibling?a.previousElementSibling:goog.dom.getNextElementNode_(a.previousSibling,!1)};goog.dom.getNextElementNode_=function(a,b){for(;a&&a.nodeType!=goog.dom.NodeType.ELEMENT;)a=b?a.nextSibling:a.previousSibling;return a};
goog.dom.getNextNode=function(a){if(!a)return null;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null};goog.dom.getPreviousNode=function(a){if(!a)return null;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a};goog.dom.isNodeLike=function(a){return goog.isObject(a)&&0<a.nodeType};goog.dom.isElement=function(a){return goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT};
goog.dom.isWindow=function(a){return goog.isObject(a)&&a.window==a};goog.dom.getParentElement=function(a){if(goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY)return a.parentElement;a=a.parentNode;return goog.dom.isElement(a)?a:null};goog.dom.contains=function(a,b){if(a.contains&&b.nodeType==goog.dom.NodeType.ELEMENT)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};
goog.dom.compareNodeOrder=function(a,b){if(a==b)return 0;if(a.compareDocumentPosition)return a.compareDocumentPosition(b)&2?1:-1;if(goog.userAgent.IE&&!goog.userAgent.isDocumentMode(9)){if(a.nodeType==goog.dom.NodeType.DOCUMENT)return-1;if(b.nodeType==goog.dom.NodeType.DOCUMENT)return 1}if("sourceIndex"in a||a.parentNode&&"sourceIndex"in a.parentNode){var c=a.nodeType==goog.dom.NodeType.ELEMENT,f=b.nodeType==goog.dom.NodeType.ELEMENT;if(c&&f)return a.sourceIndex-b.sourceIndex;var g=a.parentNode,h=
b.parentNode;return g==h?goog.dom.compareSiblingOrder_(a,b):!c&&goog.dom.contains(g,b)?-1*goog.dom.compareParentsDescendantNodeIe_(a,b):!f&&goog.dom.contains(h,a)?goog.dom.compareParentsDescendantNodeIe_(b,a):(c?a.sourceIndex:g.sourceIndex)-(f?b.sourceIndex:h.sourceIndex)}f=goog.dom.getOwnerDocument(a);c=f.createRange();c.selectNode(a);c.collapse(!0);f=f.createRange();f.selectNode(b);f.collapse(!0);return c.compareBoundaryPoints(goog.global.Range.START_TO_END,f)};
goog.dom.compareParentsDescendantNodeIe_=function(a,b){var c=a.parentNode;if(c==b)return-1;for(var f=b;f.parentNode!=c;)f=f.parentNode;return goog.dom.compareSiblingOrder_(f,a)};goog.dom.compareSiblingOrder_=function(a,b){for(var c=b;c=c.previousSibling;)if(c==a)return-1;return 1};
goog.dom.findCommonAncestor=function(a){var b,c=arguments.length;if(c){if(1==c)return arguments[0]}else return null;var f=[],g=Infinity;for(b=0;b<c;b++){for(var h=[],k=arguments[b];k;)h.unshift(k),k=k.parentNode;f.push(h);g=Math.min(g,h.length)}h=null;for(b=0;b<g;b++){for(var k=f[0][b],l=1;l<c;l++)if(k!=f[l][b])return h;h=k}return h};goog.dom.getOwnerDocument=function(a){return a.nodeType==goog.dom.NodeType.DOCUMENT?a:a.ownerDocument||a.document};
goog.dom.getFrameContentDocument=function(a){return a.contentDocument||a.contentWindow.document};goog.dom.getFrameContentWindow=function(a){return a.contentWindow||goog.dom.getWindow_(goog.dom.getFrameContentDocument(a))};
goog.dom.setTextContent=function(a,b){if("textContent"in a)a.textContent=b;else if(a.firstChild&&a.firstChild.nodeType==goog.dom.NodeType.TEXT){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{goog.dom.removeChildren(a);var c=goog.dom.getOwnerDocument(a);a.appendChild(c.createTextNode(String(b)))}};goog.dom.getOuterHtml=function(a){if("outerHTML"in a)return a.outerHTML;var b=goog.dom.getOwnerDocument(a).createElement("div");b.appendChild(a.cloneNode(!0));return b.innerHTML};
goog.dom.findNode=function(a,b){var c=[];return goog.dom.findNodes_(a,b,c,!0)?c[0]:void 0};goog.dom.findNodes=function(a,b){var c=[];goog.dom.findNodes_(a,b,c,!1);return c};goog.dom.findNodes_=function(a,b,c,f){if(null!=a)for(a=a.firstChild;a;){if(b(a)&&(c.push(a),f)||goog.dom.findNodes_(a,b,c,f))return!0;a=a.nextSibling}return!1};goog.dom.TAGS_TO_IGNORE_={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1};goog.dom.PREDEFINED_TAG_VALUES_={IMG:" ",BR:"\n"};
goog.dom.isFocusableTabIndex=function(a){var b=a.getAttributeNode("tabindex");return b&&b.specified?(a=a.tabIndex,goog.isNumber(a)&&0<=a&&32768>a):!1};goog.dom.setFocusableTabIndex=function(a,b){b?a.tabIndex=0:(a.tabIndex=-1,a.removeAttribute("tabIndex"))};
goog.dom.getTextContent=function(a){if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT&&"innerText"in a)a=goog.string.canonicalizeNewlines(a.innerText);else{var b=[];goog.dom.getTextContent_(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");goog.dom.BrowserFeature.CAN_USE_INNER_TEXT||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a};goog.dom.getRawTextContent=function(a){var b=[];goog.dom.getTextContent_(a,b,!1);return b.join("")};
goog.dom.getTextContent_=function(a,b,c){if(!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))if(a.nodeType==goog.dom.NodeType.TEXT)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);else for(a=a.firstChild;a;)goog.dom.getTextContent_(a,b,c),a=a.nextSibling};goog.dom.getNodeTextLength=function(a){return goog.dom.getTextContent(a).length};
goog.dom.getNodeTextOffset=function(a,b){for(var c=b||goog.dom.getOwnerDocument(a).body,f=[];a&&a!=c;){for(var g=a;g=g.previousSibling;)f.unshift(goog.dom.getTextContent(g));a=a.parentNode}return goog.string.trimLeft(f.join("")).replace(/ +/g," ").length};
goog.dom.getNodeAtOffset=function(a,b,c){a=[a];for(var f=0,g=null;0<a.length&&f<b;)if(g=a.pop(),!(g.nodeName in goog.dom.TAGS_TO_IGNORE_))if(g.nodeType==goog.dom.NodeType.TEXT)var h=g.nodeValue.replace(/(\r\n|\r|\n)/g,"").replace(/ +/g," "),f=f+h.length;else if(g.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)f+=goog.dom.PREDEFINED_TAG_VALUES_[g.nodeName].length;else for(h=g.childNodes.length-1;0<=h;h--)a.push(g.childNodes[h]);goog.isObject(c)&&(c.remainder=g?g.nodeValue.length+b-f-1:0,c.node=g);return g};
goog.dom.isNodeList=function(a){if(a&&"number"==typeof a.length){if(goog.isObject(a))return"function"==typeof a.item||"string"==typeof a.item;if(goog.isFunction(a))return"function"==typeof a.item}return!1};goog.dom.getAncestorByTagNameAndClass=function(a,b,c){if(!b&&!c)return null;var f=b?b.toUpperCase():null;return goog.dom.getAncestor(a,function(a){return(!f||a.nodeName==f)&&(!c||goog.dom.classes.has(a,c))},!0)};
goog.dom.getAncestorByClass=function(a,b){return goog.dom.getAncestorByTagNameAndClass(a,null,b)};goog.dom.getAncestor=function(a,b,c,f){c||(a=a.parentNode);c=null==f;for(var g=0;a&&(c||g<=f);){if(b(a))return a;a=a.parentNode;g++}return null};goog.dom.getActiveElement=function(a){try{return a&&a.activeElement}catch(b){}return null};goog.dom.DomHelper=function(a){this.document_=a||goog.global.document||document};goog.dom.DomHelper.prototype.getDomHelper=goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument=function(a){this.document_=a};goog.dom.DomHelper.prototype.getDocument=function(){return this.document_};goog.dom.DomHelper.prototype.getElement=function(a){return goog.isString(a)?this.document_.getElementById(a):a};goog.dom.DomHelper.prototype.$=goog.dom.DomHelper.prototype.getElement;goog.dom.DomHelper.prototype.getElementsByTagNameAndClass=function(a,b,c){return goog.dom.getElementsByTagNameAndClass_(this.document_,a,b,c)};
goog.dom.DomHelper.prototype.getElementsByClass=function(a,b){return goog.dom.getElementsByClass(a,b||this.document_)};goog.dom.DomHelper.prototype.getElementByClass=function(a,b){return goog.dom.getElementByClass(a,b||this.document_)};goog.dom.DomHelper.prototype.$$=goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;goog.dom.DomHelper.prototype.setProperties=goog.dom.setProperties;goog.dom.DomHelper.prototype.getViewportSize=function(a){return goog.dom.getViewportSize(a||this.getWindow())};
goog.dom.DomHelper.prototype.getDocumentHeight=function(){return goog.dom.getDocumentHeight_(this.getWindow())};goog.dom.DomHelper.prototype.createDom=function(a,b,c){return goog.dom.createDom_(this.document_,arguments)};goog.dom.DomHelper.prototype.$dom=goog.dom.DomHelper.prototype.createDom;goog.dom.DomHelper.prototype.createElement=function(a){return this.document_.createElement(a)};goog.dom.DomHelper.prototype.createTextNode=function(a){return this.document_.createTextNode(String(a))};
goog.dom.DomHelper.prototype.createTable=function(a,b,c){return goog.dom.createTable_(this.document_,a,b,!!c)};goog.dom.DomHelper.prototype.htmlToDocumentFragment=function(a){return goog.dom.htmlToDocumentFragment_(this.document_,a)};goog.dom.DomHelper.prototype.getCompatMode=function(){return this.isCss1CompatMode()?"CSS1Compat":"BackCompat"};goog.dom.DomHelper.prototype.isCss1CompatMode=function(){return goog.dom.isCss1CompatMode_(this.document_)};goog.dom.DomHelper.prototype.getWindow=function(){return goog.dom.getWindow_(this.document_)};
goog.dom.DomHelper.prototype.getDocumentScrollElement=function(){return goog.dom.getDocumentScrollElement_(this.document_)};goog.dom.DomHelper.prototype.getDocumentScroll=function(){return goog.dom.getDocumentScroll_(this.document_)};goog.dom.DomHelper.prototype.getActiveElement=function(a){return goog.dom.getActiveElement(a||this.document_)};goog.dom.DomHelper.prototype.appendChild=goog.dom.appendChild;goog.dom.DomHelper.prototype.append=goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren=goog.dom.canHaveChildren;goog.dom.DomHelper.prototype.removeChildren=goog.dom.removeChildren;goog.dom.DomHelper.prototype.insertSiblingBefore=goog.dom.insertSiblingBefore;goog.dom.DomHelper.prototype.insertSiblingAfter=goog.dom.insertSiblingAfter;goog.dom.DomHelper.prototype.insertChildAt=goog.dom.insertChildAt;goog.dom.DomHelper.prototype.removeNode=goog.dom.removeNode;goog.dom.DomHelper.prototype.replaceNode=goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement=goog.dom.flattenElement;goog.dom.DomHelper.prototype.getChildren=goog.dom.getChildren;goog.dom.DomHelper.prototype.getFirstElementChild=goog.dom.getFirstElementChild;goog.dom.DomHelper.prototype.getLastElementChild=goog.dom.getLastElementChild;goog.dom.DomHelper.prototype.getNextElementSibling=goog.dom.getNextElementSibling;goog.dom.DomHelper.prototype.getPreviousElementSibling=goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode=goog.dom.getNextNode;goog.dom.DomHelper.prototype.getPreviousNode=goog.dom.getPreviousNode;goog.dom.DomHelper.prototype.isNodeLike=goog.dom.isNodeLike;goog.dom.DomHelper.prototype.isElement=goog.dom.isElement;goog.dom.DomHelper.prototype.isWindow=goog.dom.isWindow;goog.dom.DomHelper.prototype.getParentElement=goog.dom.getParentElement;goog.dom.DomHelper.prototype.contains=goog.dom.contains;goog.dom.DomHelper.prototype.compareNodeOrder=goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor=goog.dom.findCommonAncestor;goog.dom.DomHelper.prototype.getOwnerDocument=goog.dom.getOwnerDocument;goog.dom.DomHelper.prototype.getFrameContentDocument=goog.dom.getFrameContentDocument;goog.dom.DomHelper.prototype.getFrameContentWindow=goog.dom.getFrameContentWindow;goog.dom.DomHelper.prototype.setTextContent=goog.dom.setTextContent;goog.dom.DomHelper.prototype.getOuterHtml=goog.dom.getOuterHtml;goog.dom.DomHelper.prototype.findNode=goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes=goog.dom.findNodes;goog.dom.DomHelper.prototype.isFocusableTabIndex=goog.dom.isFocusableTabIndex;goog.dom.DomHelper.prototype.setFocusableTabIndex=goog.dom.setFocusableTabIndex;goog.dom.DomHelper.prototype.getTextContent=goog.dom.getTextContent;goog.dom.DomHelper.prototype.getNodeTextLength=goog.dom.getNodeTextLength;goog.dom.DomHelper.prototype.getNodeTextOffset=goog.dom.getNodeTextOffset;goog.dom.DomHelper.prototype.getNodeAtOffset=goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList=goog.dom.isNodeList;goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass=goog.dom.getAncestorByTagNameAndClass;goog.dom.DomHelper.prototype.getAncestorByClass=goog.dom.getAncestorByClass;goog.dom.DomHelper.prototype.getAncestor=goog.dom.getAncestor;goog.style={};goog.style.setStyle=function(a,b,c){goog.isString(b)?goog.style.setStyle_(a,c,b):goog.object.forEach(b,goog.partial(goog.style.setStyle_,a))};goog.style.setStyle_=function(a,b,c){(c=goog.style.getVendorJsStyleName_(a,c))&&(a.style[c]=b)};goog.style.getVendorJsStyleName_=function(a,b){var c=goog.string.toCamelCase(b);if(void 0===a.style[c]){var f=goog.dom.vendor.getVendorJsPrefix()+goog.string.toTitleCase(b);if(void 0!==a.style[f])return f}return c};
goog.style.getVendorStyleName_=function(a,b){var c=goog.string.toCamelCase(b);return void 0===a.style[c]&&(c=goog.dom.vendor.getVendorJsPrefix()+goog.string.toTitleCase(b),void 0!==a.style[c])?goog.dom.vendor.getVendorPrefix()+"-"+b:b};goog.style.getStyle=function(a,b){var c=a.style[goog.string.toCamelCase(b)];return"undefined"!==typeof c?c:a.style[goog.style.getVendorJsStyleName_(a,b)]||""};
goog.style.getComputedStyle=function(a,b){var c=goog.dom.getOwnerDocument(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""};goog.style.getCascadedStyle=function(a,b){return a.currentStyle?a.currentStyle[b]:null};goog.style.getStyle_=function(a,b){return goog.style.getComputedStyle(a,b)||goog.style.getCascadedStyle(a,b)||a.style&&a.style[b]};
goog.style.getComputedPosition=function(a){return goog.style.getStyle_(a,"position")};goog.style.getBackgroundColor=function(a){return goog.style.getStyle_(a,"backgroundColor")};goog.style.getComputedOverflowX=function(a){return goog.style.getStyle_(a,"overflowX")};goog.style.getComputedOverflowY=function(a){return goog.style.getStyle_(a,"overflowY")};goog.style.getComputedZIndex=function(a){return goog.style.getStyle_(a,"zIndex")};
goog.style.getComputedTextAlign=function(a){return goog.style.getStyle_(a,"textAlign")};goog.style.getComputedCursor=function(a){return goog.style.getStyle_(a,"cursor")};goog.style.setPosition=function(a,b,c){var f,g=goog.userAgent.GECKO&&(goog.userAgent.MAC||goog.userAgent.X11)&&goog.userAgent.isVersion("1.9");b instanceof goog.math.Coordinate?(f=b.x,b=b.y):(f=b,b=c);a.style.left=goog.style.getPixelStyleValue_(f,g);a.style.top=goog.style.getPixelStyleValue_(b,g)};
goog.style.getPosition=function(a){return new goog.math.Coordinate(a.offsetLeft,a.offsetTop)};goog.style.getClientViewportElement=function(a){a=a?goog.dom.getOwnerDocument(a):goog.dom.getDocument();return goog.userAgent.IE&&!goog.userAgent.isDocumentMode(9)&&!goog.dom.getDomHelper(a).isCss1CompatMode()?a.body:a.documentElement};goog.style.getViewportPageOffset=function(a){var b=a.body;a=a.documentElement;return new goog.math.Coordinate(b.scrollLeft||a.scrollLeft,b.scrollTop||a.scrollTop)};
goog.style.getBoundingClientRect_=function(a){var b=a.getBoundingClientRect();goog.userAgent.IE&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b};
goog.style.getOffsetParent=function(a){if(goog.userAgent.IE&&!goog.userAgent.isDocumentMode(8))return a.offsetParent;var b=goog.dom.getOwnerDocument(a),c=goog.style.getStyle_(a,"position"),f="fixed"==c||"absolute"==c;for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(c=goog.style.getStyle_(a,"position"),f=f&&"static"==c&&a!=b.documentElement&&a!=b.body,!f&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return null};
goog.style.getVisibleRectForElement=function(a){for(var b=new goog.math.Box(0,Infinity,Infinity,0),c=goog.dom.getDomHelper(a),f=c.getDocument().body,g=c.getDocument().documentElement,h=c.getDocumentScrollElement();a=goog.style.getOffsetParent(a);)if((!goog.userAgent.IE||0!=a.clientWidth)&&(!goog.userAgent.WEBKIT||0!=a.clientHeight||a!=f)&&a!=f&&a!=g&&"visible"!=goog.style.getStyle_(a,"overflow")){var k=goog.style.getPageOffset(a),l=goog.style.getClientLeftTop(a);k.x+=l.x;k.y+=l.y;b.top=Math.max(b.top,
k.y);b.right=Math.min(b.right,k.x+a.clientWidth);b.bottom=Math.min(b.bottom,k.y+a.clientHeight);b.left=Math.max(b.left,k.x)}f=h.scrollLeft;h=h.scrollTop;b.left=Math.max(b.left,f);b.top=Math.max(b.top,h);c=c.getViewportSize();b.right=Math.min(b.right,f+c.width);b.bottom=Math.min(b.bottom,h+c.height);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:null};
goog.style.getContainerOffsetToScrollInto=function(a,b,c){var f=goog.style.getPageOffset(a),g=goog.style.getPageOffset(b),h=goog.style.getBorderBox(b),k=f.x-g.x-h.left,f=f.y-g.y-h.top,g=b.clientWidth-a.offsetWidth;a=b.clientHeight-a.offsetHeight;h=b.scrollLeft;b=b.scrollTop;c?(h+=k-g/2,b+=f-a/2):(h+=Math.min(k,Math.max(k-g,0)),b+=Math.min(f,Math.max(f-a,0)));return new goog.math.Coordinate(h,b)};
goog.style.scrollIntoContainerView=function(a,b,c){a=goog.style.getContainerOffsetToScrollInto(a,b,c);b.scrollLeft=a.x;b.scrollTop=a.y};
goog.style.getClientLeftTop=function(a){if(goog.userAgent.GECKO&&!goog.userAgent.isVersion("1.9")){var b=parseFloat(goog.style.getComputedStyle(a,"borderLeftWidth"));if(goog.style.isRightToLeft(a))var c=a.offsetWidth-a.clientWidth-b-parseFloat(goog.style.getComputedStyle(a,"borderRightWidth")),b=b+c;return new goog.math.Coordinate(b,parseFloat(goog.style.getComputedStyle(a,"borderTopWidth")))}return new goog.math.Coordinate(a.clientLeft,a.clientTop)};
goog.style.getPageOffset=function(a){var b,c=goog.dom.getOwnerDocument(a),f=goog.style.getStyle_(a,"position");goog.asserts.assertObject(a,"Parameter is required");var g=goog.userAgent.GECKO&&c.getBoxObjectFor&&!a.getBoundingClientRect&&"absolute"==f&&(b=c.getBoxObjectFor(a))&&(0>b.screenX||0>b.screenY),h=new goog.math.Coordinate(0,0),k=goog.style.getClientViewportElement(c);if(a==k)return h;if(a.getBoundingClientRect)b=goog.style.getBoundingClientRect_(a),a=goog.dom.getDomHelper(c).getDocumentScroll(),
h.x=b.left+a.x,h.y=b.top+a.y;else if(c.getBoxObjectFor&&!g)b=c.getBoxObjectFor(a),a=c.getBoxObjectFor(k),h.x=b.screenX-a.screenX,h.y=b.screenY-a.screenY;else{b=a;do{h.x+=b.offsetLeft;h.y+=b.offsetTop;b!=a&&(h.x+=b.clientLeft||0,h.y+=b.clientTop||0);if(goog.userAgent.WEBKIT&&"fixed"==goog.style.getComputedPosition(b)){h.x+=c.body.scrollLeft;h.y+=c.body.scrollTop;break}b=b.offsetParent}while(b&&b!=a);if(goog.userAgent.OPERA||goog.userAgent.WEBKIT&&"absolute"==f)h.y-=c.body.offsetTop;for(b=a;(b=goog.style.getOffsetParent(b))&&
b!=c.body&&b!=k;)if(h.x-=b.scrollLeft,!goog.userAgent.OPERA||"TR"!=b.tagName)h.y-=b.scrollTop}return h};goog.style.getPageOffsetLeft=function(a){return goog.style.getPageOffset(a).x};goog.style.getPageOffsetTop=function(a){return goog.style.getPageOffset(a).y};
goog.style.getFramedPageOffset=function(a,b){var c=new goog.math.Coordinate(0,0),f=goog.dom.getWindow(goog.dom.getOwnerDocument(a)),g=a;do{var h=f==b?goog.style.getPageOffset(g):goog.style.getClientPosition(g);c.x+=h.x;c.y+=h.y}while(f&&f!=b&&(g=f.frameElement)&&(f=f.parent));return c};
goog.style.translateRectForAnotherFrame=function(a,b,c){if(b.getDocument()!=c.getDocument()){var f=b.getDocument().body;c=goog.style.getFramedPageOffset(f,c.getWindow());c=goog.math.Coordinate.difference(c,goog.style.getPageOffset(f));goog.userAgent.IE&&!b.isCss1CompatMode()&&(c=goog.math.Coordinate.difference(c,b.getDocumentScroll()));a.left+=c.x;a.top+=c.y}};
goog.style.getRelativePosition=function(a,b){var c=goog.style.getClientPosition(a),f=goog.style.getClientPosition(b);return new goog.math.Coordinate(c.x-f.x,c.y-f.y)};
goog.style.getClientPosition=function(a){var b=new goog.math.Coordinate;if(a.nodeType==goog.dom.NodeType.ELEMENT){if(a.getBoundingClientRect){var c=goog.style.getBoundingClientRect_(a);b.x=c.left;b.y=c.top}else{var c=goog.dom.getDomHelper(a).getDocumentScroll(),f=goog.style.getPageOffset(a);b.x=f.x-c.x;b.y=f.y-c.y}goog.userAgent.GECKO&&!goog.userAgent.isVersion(12)&&(b=goog.math.Coordinate.sum(b,goog.style.getCssTranslation(a)))}else c=goog.isFunction(a.getBrowserEvent),f=a,a.targetTouches?f=a.targetTouches[0]:
c&&a.getBrowserEvent().targetTouches&&(f=a.getBrowserEvent().targetTouches[0]),b.x=f.clientX,b.y=f.clientY;return b};goog.style.setPageOffset=function(a,b,c){var f=goog.style.getPageOffset(a);b instanceof goog.math.Coordinate&&(c=b.y,b=b.x);goog.style.setPosition(a,a.offsetLeft+(b-f.x),a.offsetTop+(c-f.y))};
goog.style.setSize=function(a,b,c){if(b instanceof goog.math.Size)c=b.height,b=b.width;else if(void 0==c)throw Error("missing height argument");goog.style.setWidth(a,b);goog.style.setHeight(a,c)};goog.style.getPixelStyleValue_=function(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a};goog.style.setHeight=function(a,b){a.style.height=goog.style.getPixelStyleValue_(b,!0)};goog.style.setWidth=function(a,b){a.style.width=goog.style.getPixelStyleValue_(b,!0)};
goog.style.getSize=function(a){if("none"!=goog.style.getStyle_(a,"display"))return goog.style.getSizeWithDisplay_(a);var b=a.style,c=b.display,f=b.visibility,g=b.position;b.visibility="hidden";b.position="absolute";b.display="inline";a=goog.style.getSizeWithDisplay_(a);b.display=c;b.position=g;b.visibility=f;return a};
goog.style.getSizeWithDisplay_=function(a){var b=a.offsetWidth,c=a.offsetHeight,f=goog.userAgent.WEBKIT&&!b&&!c;return(!goog.isDef(b)||f)&&a.getBoundingClientRect?(a=goog.style.getBoundingClientRect_(a),new goog.math.Size(a.right-a.left,a.bottom-a.top)):new goog.math.Size(b,c)};goog.style.getBounds=function(a){var b=goog.style.getPageOffset(a);a=goog.style.getSize(a);return new goog.math.Rect(b.x,b.y,a.width,a.height)};goog.style.toCamelCase=function(a){return goog.string.toCamelCase(String(a))};
goog.style.toSelectorCase=function(a){return goog.string.toSelectorCase(a)};goog.style.getOpacity=function(a){var b=a.style;a="";"opacity"in b?a=b.opacity:"MozOpacity"in b?a=b.MozOpacity:"filter"in b&&(b=b.filter.match(/alpha\(opacity=([\d.]+)\)/))&&(a=String(b[1]/100));return""==a?a:Number(a)};goog.style.setOpacity=function(a,b){var c=a.style;"opacity"in c?c.opacity=b:"MozOpacity"in c?c.MozOpacity=b:"filter"in c&&(c.filter=""===b?"":"alpha(opacity="+100*b+")")};
goog.style.setTransparentBackgroundImage=function(a,b){var c=a.style;goog.userAgent.IE&&!goog.userAgent.isVersion("8")?c.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+b+'", sizingMethod="crop")':(c.backgroundImage="url("+b+")",c.backgroundPosition="top left",c.backgroundRepeat="no-repeat")};goog.style.clearTransparentBackgroundImage=function(a){a=a.style;"filter"in a?a.filter="":a.backgroundImage="none"};goog.style.showElement=function(a,b){a.style.display=b?"":"none"};
goog.style.isElementShown=function(a){return"none"!=a.style.display};goog.style.installStyles=function(a,b){var c=goog.dom.getDomHelper(b),f=null;if(goog.userAgent.IE)f=c.getDocument().createStyleSheet(),goog.style.setStyles(f,a);else{var g=c.getElementsByTagNameAndClass("head")[0];g||(f=c.getElementsByTagNameAndClass("body")[0],g=c.createDom("head"),f.parentNode.insertBefore(g,f));f=c.createDom("style");goog.style.setStyles(f,a);c.appendChild(g,f)}return f};
goog.style.uninstallStyles=function(a){goog.dom.removeNode(a.ownerNode||a.owningElement||a)};goog.style.setStyles=function(a,b){goog.userAgent.IE?a.cssText=b:a.innerHTML=b};goog.style.setPreWrap=function(a){a=a.style;goog.userAgent.IE&&!goog.userAgent.isVersion("8")?(a.whiteSpace="pre",a.wordWrap="break-word"):a.whiteSpace=goog.userAgent.GECKO?"-moz-pre-wrap":"pre-wrap"};
goog.style.setInlineBlock=function(a){a=a.style;a.position="relative";goog.userAgent.IE&&!goog.userAgent.isVersion("8")?(a.zoom="1",a.display="inline"):a.display=goog.userAgent.GECKO?goog.userAgent.isVersion("1.9a")?"inline-block":"-moz-inline-box":"inline-block"};goog.style.isRightToLeft=function(a){return"rtl"==goog.style.getStyle_(a,"direction")};goog.style.unselectableStyle_=goog.userAgent.GECKO?"MozUserSelect":goog.userAgent.WEBKIT?"WebkitUserSelect":null;
goog.style.isUnselectable=function(a){return goog.style.unselectableStyle_?"none"==a.style[goog.style.unselectableStyle_].toLowerCase():goog.userAgent.IE||goog.userAgent.OPERA?"on"==a.getAttribute("unselectable"):!1};
goog.style.setUnselectable=function(a,b,c){c=!c?a.getElementsByTagName("*"):null;var f=goog.style.unselectableStyle_;if(f){if(b=b?"none":"",a.style[f]=b,c){a=0;for(var g;g=c[a];a++)g.style[f]=b}}else if(goog.userAgent.IE||goog.userAgent.OPERA)if(b=b?"on":"",a.setAttribute("unselectable",b),c)for(a=0;g=c[a];a++)g.setAttribute("unselectable",b)};goog.style.getBorderBoxSize=function(a){return new goog.math.Size(a.offsetWidth,a.offsetHeight)};
goog.style.setBorderBoxSize=function(a,b){var c=goog.dom.getOwnerDocument(a),f=goog.dom.getDomHelper(c).isCss1CompatMode();if(goog.userAgent.IE&&(!f||!goog.userAgent.isVersion("8")))if(c=a.style,f){var f=goog.style.getPaddingBox(a),g=goog.style.getBorderBox(a);c.pixelWidth=b.width-g.left-f.left-f.right-g.right;c.pixelHeight=b.height-g.top-f.top-f.bottom-g.bottom}else c.pixelWidth=b.width,c.pixelHeight=b.height;else goog.style.setBoxSizingSize_(a,b,"border-box")};
goog.style.getContentBoxSize=function(a){var b=goog.dom.getOwnerDocument(a),c=goog.userAgent.IE&&a.currentStyle;if(c&&goog.dom.getDomHelper(b).isCss1CompatMode()&&"auto"!=c.width&&"auto"!=c.height&&!c.boxSizing)return b=goog.style.getIePixelValue_(a,c.width,"width","pixelWidth"),a=goog.style.getIePixelValue_(a,c.height,"height","pixelHeight"),new goog.math.Size(b,a);c=goog.style.getBorderBoxSize(a);b=goog.style.getPaddingBox(a);a=goog.style.getBorderBox(a);return new goog.math.Size(c.width-a.left-
b.left-b.right-a.right,c.height-a.top-b.top-b.bottom-a.bottom)};
goog.style.setContentBoxSize=function(a,b){var c=goog.dom.getOwnerDocument(a),f=goog.dom.getDomHelper(c).isCss1CompatMode();if(goog.userAgent.IE&&(!f||!goog.userAgent.isVersion("8")))if(c=a.style,f)c.pixelWidth=b.width,c.pixelHeight=b.height;else{var f=goog.style.getPaddingBox(a),g=goog.style.getBorderBox(a);c.pixelWidth=b.width+g.left+f.left+f.right+g.right;c.pixelHeight=b.height+g.top+f.top+f.bottom+g.bottom}else goog.style.setBoxSizingSize_(a,b,"content-box")};
goog.style.setBoxSizingSize_=function(a,b,c){a=a.style;goog.userAgent.GECKO?a.MozBoxSizing=c:goog.userAgent.WEBKIT?a.WebkitBoxSizing=c:a.boxSizing=c;a.width=Math.max(b.width,0)+"px";a.height=Math.max(b.height,0)+"px"};goog.style.getIePixelValue_=function(a,b,c,f){if(/^\d+px?$/.test(b))return parseInt(b,10);var g=a.style[c],h=a.runtimeStyle[c];a.runtimeStyle[c]=a.currentStyle[c];a.style[c]=b;b=a.style[f];a.style[c]=g;a.runtimeStyle[c]=h;return b};
goog.style.getIePixelDistance_=function(a,b){var c=goog.style.getCascadedStyle(a,b);return c?goog.style.getIePixelValue_(a,c,"left","pixelLeft"):0};
goog.style.getBox_=function(a,b){if(goog.userAgent.IE){var c=goog.style.getIePixelDistance_(a,b+"Left"),f=goog.style.getIePixelDistance_(a,b+"Right"),g=goog.style.getIePixelDistance_(a,b+"Top"),h=goog.style.getIePixelDistance_(a,b+"Bottom");return new goog.math.Box(g,f,h,c)}c=goog.style.getComputedStyle(a,b+"Left");f=goog.style.getComputedStyle(a,b+"Right");g=goog.style.getComputedStyle(a,b+"Top");h=goog.style.getComputedStyle(a,b+"Bottom");return new goog.math.Box(parseFloat(g),parseFloat(f),parseFloat(h),
parseFloat(c))};goog.style.getPaddingBox=function(a){return goog.style.getBox_(a,"padding")};goog.style.getMarginBox=function(a){return goog.style.getBox_(a,"margin")};goog.style.ieBorderWidthKeywords_={thin:2,medium:4,thick:6};
goog.style.getIePixelBorder_=function(a,b){if("none"==goog.style.getCascadedStyle(a,b+"Style"))return 0;var c=goog.style.getCascadedStyle(a,b+"Width");return c in goog.style.ieBorderWidthKeywords_?goog.style.ieBorderWidthKeywords_[c]:goog.style.getIePixelValue_(a,c,"left","pixelLeft")};
goog.style.getBorderBox=function(a){if(goog.userAgent.IE){var b=goog.style.getIePixelBorder_(a,"borderLeft"),c=goog.style.getIePixelBorder_(a,"borderRight"),f=goog.style.getIePixelBorder_(a,"borderTop");a=goog.style.getIePixelBorder_(a,"borderBottom");return new goog.math.Box(f,c,a,b)}b=goog.style.getComputedStyle(a,"borderLeftWidth");c=goog.style.getComputedStyle(a,"borderRightWidth");f=goog.style.getComputedStyle(a,"borderTopWidth");a=goog.style.getComputedStyle(a,"borderBottomWidth");return new goog.math.Box(parseFloat(f),
parseFloat(c),parseFloat(a),parseFloat(b))};goog.style.getFontFamily=function(a){var b=goog.dom.getOwnerDocument(a),c="";if(b.body.createTextRange){b=b.body.createTextRange();b.moveToElementText(a);try{c=b.queryCommandValue("FontName")}catch(f){c=""}}c||(c=goog.style.getStyle_(a,"fontFamily"));a=c.split(",");1<a.length&&(c=a[0]);return goog.string.stripQuotes(c,"\"'")};goog.style.lengthUnitRegex_=/[^\d]+$/;
goog.style.getLengthUnits=function(a){return(a=a.match(goog.style.lengthUnitRegex_))&&a[0]||null};goog.style.ABSOLUTE_CSS_LENGTH_UNITS_={cm:1,"in":1,mm:1,pc:1,pt:1};goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_={em:1,ex:1};
goog.style.getFontSize=function(a){var b=goog.style.getStyle_(a,"fontSize"),c=goog.style.getLengthUnits(b);if(b&&"px"==c)return parseInt(b,10);if(goog.userAgent.IE){if(c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_)return goog.style.getIePixelValue_(a,b,"left","pixelLeft");if(a.parentNode&&a.parentNode.nodeType==goog.dom.NodeType.ELEMENT&&c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_)return a=a.parentNode,c=goog.style.getStyle_(a,"fontSize"),goog.style.getIePixelValue_(a,b==c?"1em":b,"left","pixelLeft")}c=
goog.dom.createDom("span",{style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});goog.dom.appendChild(a,c);b=c.offsetHeight;goog.dom.removeNode(c);return b};goog.style.parseStyleAttribute=function(a){var b={};goog.array.forEach(a.split(/\s*;\s*/),function(a){a=a.split(/\s*:\s*/);2==a.length&&(b[goog.string.toCamelCase(a[0].toLowerCase())]=a[1])});return b};
goog.style.toStyleAttribute=function(a){var b=[];goog.object.forEach(a,function(a,f){b.push(goog.string.toSelectorCase(f),":",a,";")});return b.join("")};goog.style.setFloat=function(a,b){a.style[goog.userAgent.IE?"styleFloat":"cssFloat"]=b};goog.style.getFloat=function(a){return a.style[goog.userAgent.IE?"styleFloat":"cssFloat"]||""};
goog.style.getScrollbarWidth=function(a){var b=goog.dom.createElement("div");a&&(b.className=a);b.style.cssText="overflow:auto;position:absolute;top:0;width:100px;height:100px";a=goog.dom.createElement("div");goog.style.setSize(a,"200px","200px");b.appendChild(a);goog.dom.appendChild(goog.dom.getDocument().body,b);a=b.offsetWidth-b.clientWidth;goog.dom.removeNode(b);return a};goog.style.MATRIX_TRANSLATION_REGEX_=/matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation=function(a){var b;goog.userAgent.IE?b="-ms-transform":goog.userAgent.WEBKIT?b="-webkit-transform":goog.userAgent.OPERA?b="-o-transform":goog.userAgent.GECKO&&(b="-moz-transform");var c;b&&(c=goog.style.getStyle_(a,b));c||(c=goog.style.getStyle_(a,"transform"));if(!c)return new goog.math.Coordinate(0,0);a=c.match(goog.style.MATRIX_TRANSLATION_REGEX_);return!a?new goog.math.Coordinate(0,0):new goog.math.Coordinate(parseFloat(a[1]),parseFloat(a[2]))};goog.debug.errorHandlerWeakDep={protectEntryPoint:function(a,b){return a}};goog.disposable={};goog.disposable.IDisposable=function(){};goog.Disposable=function(){goog.Disposable.MONITORING_MODE!=goog.Disposable.MonitoringMode.OFF&&(this.creationStack=Error().stack,goog.Disposable.instances_[goog.getUid(this)]=this)};goog.Disposable.MonitoringMode={OFF:0,PERMANENT:1,INTERACTIVE:2};goog.Disposable.MONITORING_MODE=0;goog.Disposable.instances_={};goog.Disposable.getUndisposedObjects=function(){var a=[],b;for(b in goog.Disposable.instances_)goog.Disposable.instances_.hasOwnProperty(b)&&a.push(goog.Disposable.instances_[Number(b)]);return a};
goog.Disposable.clearUndisposedObjects=function(){goog.Disposable.instances_={}};goog.Disposable.prototype.disposed_=!1;goog.Disposable.prototype.isDisposed=function(){return this.disposed_};goog.Disposable.prototype.getDisposed=goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose=function(){if(!this.disposed_&&(this.disposed_=!0,this.disposeInternal(),goog.Disposable.MONITORING_MODE!=goog.Disposable.MonitoringMode.OFF)){var a=goog.getUid(this);if(goog.Disposable.MONITORING_MODE==goog.Disposable.MonitoringMode.PERMANENT&&!goog.Disposable.instances_.hasOwnProperty(a))throw Error(this+" did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");delete goog.Disposable.instances_[a]}};
goog.Disposable.prototype.registerDisposable=function(a){this.addOnDisposeCallback(goog.partial(goog.dispose,a))};goog.Disposable.prototype.addOnDisposeCallback=function(a,b){this.onDisposeCallbacks_||(this.onDisposeCallbacks_=[]);this.onDisposeCallbacks_.push(goog.bind(a,b))};goog.Disposable.prototype.disposeInternal=function(){if(this.onDisposeCallbacks_)for(;this.onDisposeCallbacks_.length;)this.onDisposeCallbacks_.shift()()};
goog.Disposable.isDisposed=function(a){return a&&"function"==typeof a.isDisposed?a.isDisposed():!1};goog.dispose=function(a){a&&"function"==typeof a.dispose&&a.dispose()};goog.disposeAll=function(a){for(var b=0,c=arguments.length;b<c;++b){var f=arguments[b];goog.isArrayLike(f)?goog.disposeAll.apply(null,f):goog.dispose(f)}};goog.events={};goog.events.Event=function(a,b){this.type=a;this.currentTarget=this.target=b};goog.events.Event.prototype.disposeInternal=function(){};goog.events.Event.prototype.dispose=function(){};goog.events.Event.prototype.propagationStopped_=!1;goog.events.Event.prototype.defaultPrevented=!1;goog.events.Event.prototype.returnValue_=!0;goog.events.Event.prototype.stopPropagation=function(){this.propagationStopped_=!0};
goog.events.Event.prototype.preventDefault=function(){this.defaultPrevented=!0;this.returnValue_=!1};goog.events.Event.stopPropagation=function(a){a.stopPropagation()};goog.events.Event.preventDefault=function(a){a.preventDefault()};goog.events.Listenable=function(){};goog.events.Listenable.USE_LISTENABLE_INTERFACE=!1;goog.events.Listenable.IMPLEMENTED_BY_PROP_="__closure_listenable";goog.events.Listenable.addImplementation=function(a){a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP_]=!0};goog.events.Listenable.isImplementedBy=function(a){return!(!a||!a[goog.events.Listenable.IMPLEMENTED_BY_PROP_])};goog.events.ListenableKey=function(){};goog.events.ListenableKey.counter_=0;goog.events.ListenableKey.reserveKey=function(){return++goog.events.ListenableKey.counter_};goog.events.Listener=function(){goog.events.Listener.ENABLE_MONITORING&&(this.creationStack=Error().stack)};goog.events.Listener.ENABLE_MONITORING=!1;goog.events.Listener.prototype.key=0;goog.events.Listener.prototype.removed=!1;goog.events.Listener.prototype.callOnce=!1;
goog.events.Listener.prototype.init=function(a,b,c,f,g,h){if(goog.isFunction(a))this.isFunctionListener_=!0;else if(a&&a.handleEvent&&goog.isFunction(a.handleEvent))this.isFunctionListener_=!1;else throw Error("Invalid listener argument");this.listener=a;this.proxy=b;this.src=c;this.type=f;this.capture=!!g;this.handler=h;this.callOnce=!1;this.key=goog.events.ListenableKey.reserveKey();this.removed=!1};
goog.events.Listener.prototype.handleEvent=function(a){return this.isFunctionListener_?this.listener.call(this.handler||this.src,a):this.listener.handleEvent.call(this.listener,a)};goog.events.BrowserFeature={HAS_W3C_BUTTON:!goog.userAgent.IE||goog.userAgent.isDocumentMode(9),HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE||goog.userAgent.isDocumentMode(9),SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE&&!goog.userAgent.isVersion("9"),HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT||goog.userAgent.isVersion("528"),HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO&&goog.userAgent.isVersion("1.9b")||goog.userAgent.IE&&goog.userAgent.isVersion("8")||goog.userAgent.OPERA&&goog.userAgent.isVersion("9.5")||
goog.userAgent.WEBKIT&&goog.userAgent.isVersion("528"),HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO&&!goog.userAgent.isVersion("8")||goog.userAgent.IE&&!goog.userAgent.isVersion("9"),TOUCH_ENABLED:"ontouchstart"in goog.global||!(!goog.global.document||!(document.documentElement&&"ontouchstart"in document.documentElement))||!(!goog.global.navigator||!goog.global.navigator.msMaxTouchPoints)};goog.debug.entryPointRegistry={};goog.debug.EntryPointMonitor=function(){};goog.debug.entryPointRegistry.refList_=[];goog.debug.entryPointRegistry.monitors_=[];goog.debug.entryPointRegistry.monitorsMayExist_=!1;goog.debug.entryPointRegistry.register=function(a){goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length]=a;if(goog.debug.entryPointRegistry.monitorsMayExist_)for(var b=goog.debug.entryPointRegistry.monitors_,c=0;c<b.length;c++)a(goog.bind(b[c].wrap,b[c]))};
goog.debug.entryPointRegistry.monitorAll=function(a){goog.debug.entryPointRegistry.monitorsMayExist_=!0;for(var b=goog.bind(a.wrap,a),c=0;c<goog.debug.entryPointRegistry.refList_.length;c++)goog.debug.entryPointRegistry.refList_[c](b);goog.debug.entryPointRegistry.monitors_.push(a)};
goog.debug.entryPointRegistry.unmonitorAllIfPossible=function(a){var b=goog.debug.entryPointRegistry.monitors_;goog.asserts.assert(a==b[b.length-1],"Only the most recent monitor can be unwrapped.");a=goog.bind(a.unwrap,a);for(var c=0;c<goog.debug.entryPointRegistry.refList_.length;c++)goog.debug.entryPointRegistry.refList_[c](a);b.length--};goog.events.EventWrapper=function(){};goog.events.EventWrapper.prototype.listen=function(a,b,c,f,g){};goog.events.EventWrapper.prototype.unlisten=function(a,b,c,f,g){};goog.events.EventType={CLICK:"click",DBLCLICK:"dblclick",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",SELECTSTART:"selectstart",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",BLUR:"blur",FOCUS:"focus",DEACTIVATE:"deactivate",FOCUSIN:goog.userAgent.IE?"focusin":"DOMFocusIn",FOCUSOUT:goog.userAgent.IE?"focusout":"DOMFocusOut",CHANGE:"change",SELECT:"select",SUBMIT:"submit",INPUT:"input",PROPERTYCHANGE:"propertychange",DRAGSTART:"dragstart",
DRAG:"drag",DRAGENTER:"dragenter",DRAGOVER:"dragover",DRAGLEAVE:"dragleave",DROP:"drop",DRAGEND:"dragend",TOUCHSTART:"touchstart",TOUCHMOVE:"touchmove",TOUCHEND:"touchend",TOUCHCANCEL:"touchcancel",BEFOREUNLOAD:"beforeunload",CONTEXTMENU:"contextmenu",ERROR:"error",HELP:"help",LOAD:"load",LOSECAPTURE:"losecapture",READYSTATECHANGE:"readystatechange",RESIZE:"resize",SCROLL:"scroll",UNLOAD:"unload",HASHCHANGE:"hashchange",PAGEHIDE:"pagehide",PAGESHOW:"pageshow",POPSTATE:"popstate",COPY:"copy",PASTE:"paste",
CUT:"cut",BEFORECOPY:"beforecopy",BEFORECUT:"beforecut",BEFOREPASTE:"beforepaste",ONLINE:"online",OFFLINE:"offline",MESSAGE:"message",CONNECT:"connect",TRANSITIONEND:goog.userAgent.WEBKIT?"webkitTransitionEnd":goog.userAgent.OPERA?"oTransitionEnd":"transitionend",MSGESTURECHANGE:"MSGestureChange",MSGESTUREEND:"MSGestureEnd",MSGESTUREHOLD:"MSGestureHold",MSGESTURESTART:"MSGestureStart",MSGESTURETAP:"MSGestureTap",MSGOTPOINTERCAPTURE:"MSGotPointerCapture",MSINERTIASTART:"MSInertiaStart",MSLOSTPOINTERCAPTURE:"MSLostPointerCapture",
MSPOINTERCANCEL:"MSPointerCancel",MSPOINTERDOWN:"MSPointerDown",MSPOINTERMOVE:"MSPointerMove",MSPOINTEROVER:"MSPointerOver",MSPOINTEROUT:"MSPointerOut",MSPOINTERUP:"MSPointerUp",TEXTINPUT:"textinput",COMPOSITIONSTART:"compositionstart",COMPOSITIONUPDATE:"compositionupdate",COMPOSITIONEND:"compositionend"};goog.reflect={};goog.reflect.object=function(a,b){return b};goog.reflect.sinkValue=function(a){goog.reflect.sinkValue[" "](a);return a};goog.reflect.sinkValue[" "]=goog.nullFunction;goog.reflect.canAccessProperty=function(a,b){try{return goog.reflect.sinkValue(a[b]),!0}catch(c){}return!1};goog.events.BrowserEvent=function(a,b){a&&this.init(a,b)};goog.inherits(goog.events.BrowserEvent,goog.events.Event);goog.events.BrowserEvent.MouseButton={LEFT:0,MIDDLE:1,RIGHT:2};goog.events.BrowserEvent.IEButtonMap=[1,4,2];goog.events.BrowserEvent.prototype.target=null;goog.events.BrowserEvent.prototype.relatedTarget=null;goog.events.BrowserEvent.prototype.offsetX=0;goog.events.BrowserEvent.prototype.offsetY=0;goog.events.BrowserEvent.prototype.clientX=0;
goog.events.BrowserEvent.prototype.clientY=0;goog.events.BrowserEvent.prototype.screenX=0;goog.events.BrowserEvent.prototype.screenY=0;goog.events.BrowserEvent.prototype.button=0;goog.events.BrowserEvent.prototype.keyCode=0;goog.events.BrowserEvent.prototype.charCode=0;goog.events.BrowserEvent.prototype.ctrlKey=!1;goog.events.BrowserEvent.prototype.altKey=!1;goog.events.BrowserEvent.prototype.shiftKey=!1;goog.events.BrowserEvent.prototype.metaKey=!1;
goog.events.BrowserEvent.prototype.platformModifierKey=!1;goog.events.BrowserEvent.prototype.event_=null;
goog.events.BrowserEvent.prototype.init=function(a,b){var c=this.type=a.type;goog.events.Event.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var f=a.relatedTarget;f?goog.userAgent.GECKO&&(goog.reflect.canAccessProperty(f,"nodeName")||(f=null)):c==goog.events.EventType.MOUSEOVER?f=a.fromElement:c==goog.events.EventType.MOUSEOUT&&(f=a.toElement);this.relatedTarget=f;this.offsetX=goog.userAgent.WEBKIT||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=goog.userAgent.WEBKIT||void 0!==
a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.platformModifierKey=goog.userAgent.MAC?a.metaKey:a.ctrlKey;this.state=a.state;this.event_=a;a.defaultPrevented&&this.preventDefault();
delete this.propagationStopped_};goog.events.BrowserEvent.prototype.isButton=function(a){return goog.events.BrowserFeature.HAS_W3C_BUTTON?this.event_.button==a:"click"==this.type?a==goog.events.BrowserEvent.MouseButton.LEFT:!!(this.event_.button&goog.events.BrowserEvent.IEButtonMap[a])};goog.events.BrowserEvent.prototype.isMouseActionButton=function(){return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT)&&!(goog.userAgent.WEBKIT&&goog.userAgent.MAC&&this.ctrlKey)};
goog.events.BrowserEvent.prototype.stopPropagation=function(){goog.events.BrowserEvent.superClass_.stopPropagation.call(this);this.event_.stopPropagation?this.event_.stopPropagation():this.event_.cancelBubble=!0};
goog.events.BrowserEvent.prototype.preventDefault=function(){goog.events.BrowserEvent.superClass_.preventDefault.call(this);var a=this.event_;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};goog.events.BrowserEvent.prototype.getBrowserEvent=function(){return this.event_};goog.events.BrowserEvent.prototype.disposeInternal=function(){};goog.events.listeners_={};goog.events.listenerTree_={};goog.events.sources_={};goog.events.onString_="on";goog.events.onStringMap_={};goog.events.keySeparator_="_";
goog.events.listen=function(a,b,c,f,g){if(goog.isArray(b)){for(var h=0;h<b.length;h++)goog.events.listen(a,b[h],c,f,g);return null}a=goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(a)?a.listen(b,goog.events.wrapListener_(c),f,g):goog.events.listen_(a,b,c,!1,f,g);b=a.key;goog.events.listeners_[b]=a;return b};
goog.events.listen_=function(a,b,c,f,g,h){if(!b)throw Error("Invalid event type");g=!!g;var k=goog.events.listenerTree_;b in k||(k[b]={count_:0,remaining_:0});k=k[b];g in k||(k[g]={count_:0,remaining_:0},k.count_++);var k=k[g],l=goog.getUid(a),m;k.remaining_++;if(k[l]){m=k[l];for(var n=0;n<m.length;n++)if(k=m[n],k.listener==c&&k.handler==h){if(k.removed)break;f||(m[n].callOnce=!1);return m[n]}}else m=k[l]=[],k.count_++;n=goog.events.getProxy();k=new goog.events.Listener;k.init(c,n,a,b,g,h);k.callOnce=
f;n.src=a;n.listener=k;m.push(k);goog.events.sources_[l]||(goog.events.sources_[l]=[]);goog.events.sources_[l].push(k);a.addEventListener?(a==goog.global||!a.customEvent_)&&a.addEventListener(b,n,g):a.attachEvent(goog.events.getOnString_(b),n);return k};goog.events.getProxy=function(){var a=goog.events.handleBrowserEvent_,b=goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b};
goog.events.listenOnce=function(a,b,c,f,g){if(goog.isArray(b)){for(var h=0;h<b.length;h++)goog.events.listenOnce(a,b[h],c,f,g);return null}a=goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(a)?a.listenOnce(b,goog.events.wrapListener_(c),f,g):goog.events.listen_(a,b,c,!0,f,g);b=a.key;goog.events.listeners_[b]=a;return b};goog.events.listenWithWrapper=function(a,b,c,f,g){b.listen(a,c,f,g)};
goog.events.unlisten=function(a,b,c,f,g){if(goog.isArray(b)){for(var h=0;h<b.length;h++)goog.events.unlisten(a,b[h],c,f,g);return null}if(goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(a))return a.unlisten(b,goog.events.wrapListener_(c),f,g);f=!!f;a=goog.events.getListeners_(a,b,f);if(!a)return!1;for(h=0;h<a.length;h++)if(a[h].listener==c&&a[h].capture==f&&a[h].handler==g)return goog.events.unlistenByKey(a[h].key);return!1};
goog.events.unlistenByKey=function(a){var b=goog.events.listeners_[a];if(!b||b.removed)return!1;var c=b.src;if(goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(c))return c.unlistenByKey(b);var f=b.type,g=b.proxy,h=b.capture;c.removeEventListener?(c==goog.global||!c.customEvent_)&&c.removeEventListener(f,g,h):c.detachEvent&&c.detachEvent(goog.events.getOnString_(f),g);c=goog.getUid(c);goog.events.sources_[c]&&(g=goog.events.sources_[c],goog.array.remove(g,b),
0==g.length&&delete goog.events.sources_[c]);b.removed=!0;if(b=goog.events.listenerTree_[f][h][c])b.needsCleanup_=!0,goog.events.cleanUp_(f,h,c,b);delete goog.events.listeners_[a];return!0};goog.events.unlistenWithWrapper=function(a,b,c,f,g){b.unlisten(a,c,f,g)};goog.events.cleanUp=function(a){delete goog.events.listeners_[a.key]};
goog.events.cleanUp_=function(a,b,c,f){if(!f.locked_&&f.needsCleanup_){for(var g=0,h=0;g<f.length;g++)f[g].removed?f[g].proxy.src=null:(g!=h&&(f[h]=f[g]),h++);f.length=h;f.needsCleanup_=!1;0==h&&(delete goog.events.listenerTree_[a][b][c],goog.events.listenerTree_[a][b].count_--,0==goog.events.listenerTree_[a][b].count_&&(delete goog.events.listenerTree_[a][b],goog.events.listenerTree_[a].count_--),0==goog.events.listenerTree_[a].count_&&delete goog.events.listenerTree_[a])}};
goog.events.removeAll=function(a,b){var c=0,f=null==b;if(null!=a){if(goog.events.Listenable.USE_LISTENABLE_INTERFACE&&a&&goog.events.Listenable.isImplementedBy(a))return a.removeAllListeners(b);var g=goog.getUid(a);if(goog.events.sources_[g])for(var g=goog.events.sources_[g],h=g.length-1;0<=h;h--){var k=g[h];if(f||b==k.type)goog.events.unlistenByKey(k.key),c++}}else goog.object.forEach(goog.events.listeners_,function(a,b){goog.events.unlistenByKey(b);c++});return c};
goog.events.getListeners=function(a,b,c){return goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(a)?a.getListeners(b,c):goog.events.getListeners_(a,b,c)||[]};goog.events.getListeners_=function(a,b,c){var f=goog.events.listenerTree_;return b in f&&(f=f[b],c in f&&(f=f[c],a=goog.getUid(a),f[a]))?f[a]:null};
goog.events.getListener=function(a,b,c,f,g){f=!!f;if(goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(a))return a.getListener(b,goog.events.wrapListener_(c),f,g);if(a=goog.events.getListeners_(a,b,f))for(b=0;b<a.length;b++)if(!a[b].removed&&a[b].listener==c&&a[b].capture==f&&a[b].handler==g)return a[b];return null};
goog.events.hasListener=function(a,b,c){if(goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(a))return a.hasListener(b,c);a=goog.getUid(a);var f=goog.events.sources_[a];if(f){var g=goog.isDef(b),h=goog.isDef(c);return g&&h?(f=goog.events.listenerTree_[b],!!f&&!!f[c]&&a in f[c]):!g&&!h?!0:goog.array.some(f,function(a){return g&&a.type==b||h&&a.capture==c})}return!1};
goog.events.expose=function(a){var b=[],c;for(c in a)a[c]&&a[c].id?b.push(c+" = "+a[c]+" ("+a[c].id+")"):b.push(c+" = "+a[c]);return b.join("\n")};goog.events.getOnString_=function(a){return a in goog.events.onStringMap_?goog.events.onStringMap_[a]:goog.events.onStringMap_[a]=goog.events.onString_+a};
goog.events.fireListeners=function(a,b,c,f){if(goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.isImplementedBy(a))return a.fireListeners(b,c,f);var g=goog.events.listenerTree_;return b in g&&(g=g[b],c in g)?goog.events.fireListeners_(g[c],a,b,c,f):!0};
goog.events.fireListeners_=function(a,b,c,f,g){var h=1;b=goog.getUid(b);if(a[b]){var k=--a.remaining_,l=a[b];l.locked_?l.locked_++:l.locked_=1;try{for(var m=l.length,n=0;n<m;n++){var p=l[n];p&&!p.removed&&(h&=!1!==goog.events.fireListener(p,g))}}finally{a.remaining_=Math.max(k,a.remaining_),l.locked_--,goog.events.cleanUp_(c,f,b,l)}}return Boolean(h)};goog.events.fireListener=function(a,b){a.callOnce&&goog.events.unlistenByKey(a.key);return a.handleEvent(b)};goog.events.getTotalListenerCount=function(){return goog.object.getCount(goog.events.listeners_)};
goog.events.dispatchEvent=function(a,b){if(goog.events.Listenable.USE_LISTENABLE_INTERFACE)return a.dispatchEvent(b);var c=b.type||b,f=goog.events.listenerTree_;if(!(c in f))return!0;if(goog.isString(b))b=new goog.events.Event(b,a);else if(b instanceof goog.events.Event)b.target=b.target||a;else{var g=b;b=new goog.events.Event(c,a);goog.object.extend(b,g)}var g=1,h,f=f[c],c=!0 in f,k;if(c){h=[];for(k=a;k;k=k.getParentEventTarget())h.push(k);k=f[!0];k.remaining_=k.count_;for(var l=h.length-1;!b.propagationStopped_&&
0<=l&&k.remaining_;l--)b.currentTarget=h[l],g&=goog.events.fireListeners_(k,h[l],b.type,!0,b)&&!1!=b.returnValue_}if(!1 in f)if(k=f[!1],k.remaining_=k.count_,c)for(l=0;!b.propagationStopped_&&l<h.length&&k.remaining_;l++)b.currentTarget=h[l],g&=goog.events.fireListeners_(k,h[l],b.type,!1,b)&&!1!=b.returnValue_;else for(f=a;!b.propagationStopped_&&f&&k.remaining_;f=f.getParentEventTarget())b.currentTarget=f,g&=goog.events.fireListeners_(k,f,b.type,!1,b)&&!1!=b.returnValue_;return Boolean(g)};
goog.events.protectBrowserEventEntryPoint=function(a){goog.events.handleBrowserEvent_=a.protectEntryPoint(goog.events.handleBrowserEvent_)};
goog.events.handleBrowserEvent_=function(a,b){if(a.removed)return!0;var c=a.type,f=goog.events.listenerTree_;if(!(c in f))return!0;var f=f[c],g,h;if(!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT){g=b||goog.getObjectByName("window.event");var k=!0 in f,l=!1 in f;if(k){if(goog.events.isMarkedIeEvent_(g))return!0;goog.events.markIeEvent_(g)}var m=new goog.events.BrowserEvent;m.init(g,this);g=!0;try{if(k){for(var n=[],p=m.currentTarget;p;p=p.parentNode)n.push(p);h=f[!0];h.remaining_=h.count_;for(var q=
n.length-1;!m.propagationStopped_&&0<=q&&h.remaining_;q--)m.currentTarget=n[q],g&=goog.events.fireListeners_(h,n[q],c,!0,m);if(l){h=f[!1];h.remaining_=h.count_;for(q=0;!m.propagationStopped_&&q<n.length&&h.remaining_;q++)m.currentTarget=n[q],g&=goog.events.fireListeners_(h,n[q],c,!1,m)}}else g=goog.events.fireListener(a,m)}finally{n&&(n.length=0)}return g}c=new goog.events.BrowserEvent(b,this);return g=goog.events.fireListener(a,c)};
goog.events.markIeEvent_=function(a){var b=!1;if(0==a.keyCode)try{a.keyCode=-1;return}catch(c){b=!0}if(b||void 0==a.returnValue)a.returnValue=!0};goog.events.isMarkedIeEvent_=function(a){return 0>a.keyCode||void 0!=a.returnValue};goog.events.uniqueIdCounter_=0;goog.events.getUniqueId=function(a){return a+"_"+goog.events.uniqueIdCounter_++};goog.events.LISTENER_WRAPPER_PROP_="__closure_events_fn_"+(1E9*Math.random()>>>0);
goog.events.wrapListener_=function(a){return goog.isFunction(a)?a:a[goog.events.LISTENER_WRAPPER_PROP_]||(a[goog.events.LISTENER_WRAPPER_PROP_]=function(b){return a.handleEvent(b)})};goog.debug.entryPointRegistry.register(function(a){goog.events.handleBrowserEvent_=a(goog.events.handleBrowserEvent_)});goog.events.EventHandler=function(a){goog.Disposable.call(this);this.handler_=a;this.keys_=[]};goog.inherits(goog.events.EventHandler,goog.Disposable);goog.events.EventHandler.typeArray_=[];goog.events.EventHandler.prototype.listen=function(a,b,c,f,g){goog.isArray(b)||(goog.events.EventHandler.typeArray_[0]=b,b=goog.events.EventHandler.typeArray_);for(var h=0;h<b.length;h++){var k=goog.events.listen(a,b[h],c||this,f||!1,g||this.handler_||this);this.keys_.push(k)}return this};
goog.events.EventHandler.prototype.listenOnce=function(a,b,c,f,g){if(goog.isArray(b))for(var h=0;h<b.length;h++)this.listenOnce(a,b[h],c,f,g);else a=goog.events.listenOnce(a,b,c||this,f,g||this.handler_||this),this.keys_.push(a);return this};goog.events.EventHandler.prototype.listenWithWrapper=function(a,b,c,f,g){b.listen(a,c,f,g||this.handler_||this,this);return this};goog.events.EventHandler.prototype.getListenerCount=function(){return this.keys_.length};
goog.events.EventHandler.prototype.unlisten=function(a,b,c,f,g){if(goog.isArray(b))for(var h=0;h<b.length;h++)this.unlisten(a,b[h],c,f,g);else if(a=goog.events.getListener(a,b,c||this,f,g||this.handler_||this))a=a.key,goog.events.unlistenByKey(a),goog.array.remove(this.keys_,a);return this};goog.events.EventHandler.prototype.unlistenWithWrapper=function(a,b,c,f,g){b.unlisten(a,c,f,g||this.handler_||this,this);return this};
goog.events.EventHandler.prototype.removeAll=function(){goog.array.forEach(this.keys_,goog.events.unlistenByKey);this.keys_.length=0};goog.events.EventHandler.prototype.disposeInternal=function(){goog.events.EventHandler.superClass_.disposeInternal.call(this);this.removeAll()};goog.events.EventHandler.prototype.handleEvent=function(a){throw Error("EventHandler.handleEvent not implemented");};goog.style.bidi={};goog.style.bidi.getScrollLeft=function(a){var b=goog.style.isRightToLeft(a);return b&&goog.userAgent.GECKO?-a.scrollLeft:b&&(!goog.userAgent.IE||!goog.userAgent.isVersion("8"))&&"visible"!=goog.style.getComputedOverflowX(a)?a.scrollWidth-a.clientWidth-a.scrollLeft:a.scrollLeft};
goog.style.bidi.getOffsetStart=function(a){var b=a.offsetLeft,c=a.offsetParent;!c&&"fixed"==goog.style.getComputedPosition(a)&&(c=goog.dom.getOwnerDocument(a).documentElement);if(!c)return b;if(goog.userAgent.GECKO)var f=goog.style.getBorderBox(c),b=b+f.left;else goog.userAgent.isDocumentMode(8)&&(f=goog.style.getBorderBox(c),b-=f.left);return goog.style.isRightToLeft(c)?c.clientWidth-(b+a.offsetWidth):b};
goog.style.bidi.setScrollOffset=function(a,b){b=Math.max(b,0);goog.style.isRightToLeft(a)?goog.userAgent.GECKO?a.scrollLeft=-b:!goog.userAgent.IE||!goog.userAgent.isVersion("8")?a.scrollLeft=a.scrollWidth-b-a.clientWidth:a.scrollLeft=b:a.scrollLeft=b};goog.style.bidi.setPosition=function(a,b,c,f){goog.isNull(c)||(a.style.top=c+"px");f?(a.style.right=b+"px",a.style.left=""):(a.style.left=b+"px",a.style.right="")};goog.events.EventTarget=function(){goog.Disposable.call(this);goog.events.Listenable.USE_LISTENABLE_INTERFACE&&(this.eventTargetListeners_={},this.reallyDisposed_=!1,this.actualEventTarget_=this)};goog.inherits(goog.events.EventTarget,goog.Disposable);goog.events.Listenable.USE_LISTENABLE_INTERFACE&&goog.events.Listenable.addImplementation(goog.events.EventTarget);goog.events.EventTarget.MAX_ANCESTORS_=1E3;goog.events.EventTarget.prototype.customEvent_=!0;
goog.events.EventTarget.prototype.parentEventTarget_=null;goog.events.EventTarget.prototype.getParentEventTarget=function(){return this.parentEventTarget_};goog.events.EventTarget.prototype.setParentEventTarget=function(a){this.parentEventTarget_=a};goog.events.EventTarget.prototype.addEventListener=function(a,b,c,f){goog.events.listen(this,a,b,c,f)};goog.events.EventTarget.prototype.removeEventListener=function(a,b,c,f){goog.events.unlisten(this,a,b,c,f)};
goog.events.EventTarget.prototype.dispatchEvent=function(a){if(goog.events.Listenable.USE_LISTENABLE_INTERFACE){if(this.reallyDisposed_)return!0;var b,c=this.getParentEventTarget();if(c){b=[];for(var f=1;c;c=c.getParentEventTarget())b.push(c),goog.asserts.assert(++f<goog.events.EventTarget.MAX_ANCESTORS_,"infinite loop")}return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_,a,b)}return goog.events.dispatchEvent(this,a)};
goog.events.EventTarget.prototype.disposeInternal=function(){goog.events.EventTarget.superClass_.disposeInternal.call(this);goog.events.Listenable.USE_LISTENABLE_INTERFACE?(this.removeAllListeners(),this.reallyDisposed_=!0):goog.events.removeAll(this);this.parentEventTarget_=null};
goog.events.Listenable.USE_LISTENABLE_INTERFACE&&(goog.events.EventTarget.prototype.listen=function(a,b,c,f){return this.listenInternal_(a,b,!1,c,f)},goog.events.EventTarget.prototype.listenOnce=function(a,b,c,f){return this.listenInternal_(a,b,!0,c,f)},goog.events.EventTarget.prototype.listenInternal_=function(a,b,c,f,g){goog.asserts.assert(!this.reallyDisposed_,"Can not listen on disposed object.");var h=this.eventTargetListeners_[a]||(this.eventTargetListeners_[a]=[]),k;k=goog.events.EventTarget.findListenerIndex_(h,
b,f,g);if(-1<k)return k=h[k],c||(k.callOnce=!1),k;k=new goog.events.Listener;k.init(b,null,this,a,!!f,g);k.callOnce=c;h.push(k);return k},goog.events.EventTarget.prototype.unlisten=function(a,b,c,f){if(!(a in this.eventTargetListeners_))return!1;a=this.eventTargetListeners_[a];b=goog.events.EventTarget.findListenerIndex_(a,b,c,f);return-1<b?(c=a[b],goog.events.cleanUp(c),c.removed=!0,goog.array.removeAt(a,b)):!1},goog.events.EventTarget.prototype.unlistenByKey=function(a){var b=a.type;if(!(b in this.eventTargetListeners_))return!1;
if(b=goog.array.remove(this.eventTargetListeners_[b],a))goog.events.cleanUp(a),a.removed=!0;return b},goog.events.EventTarget.prototype.removeAllListeners=function(a,b){var c=0,f;for(f in this.eventTargetListeners_)if(!a||f==a){for(var g=this.eventTargetListeners_[f],h=0;h<g.length;h++)++c,goog.events.cleanUp(g[h]),g[h].removed=!0;g.length=0}return c},goog.events.EventTarget.prototype.fireListeners=function(a,b,c){goog.asserts.assert(!this.reallyDisposed_,"Can not fire listeners after dispose() completed.");
if(!(a in this.eventTargetListeners_))return!0;var f=!0;a=goog.array.clone(this.eventTargetListeners_[a]);for(var g=0;g<a.length;++g){var h=a[g];h&&(!h.removed&&h.capture==b)&&(h.callOnce&&this.unlistenByKey(h),f=!1!==h.handleEvent(c)&&f)}return f&&!1!=c.returnValue_},goog.events.EventTarget.prototype.getListeners=function(a,b){var c=this.eventTargetListeners_[a],f=[];if(c)for(var g=0;g<c.length;++g){var h=c[g];h.capture==b&&f.push(h)}return f},goog.events.EventTarget.prototype.getListener=function(a,
b,c,f){a=this.eventTargetListeners_[a];var g=-1;a&&(g=goog.events.EventTarget.findListenerIndex_(a,b,c,f));return-1<g?a[g]:null},goog.events.EventTarget.prototype.hasListener=function(a,b){var c=goog.isDef(a),f=goog.isDef(b);return goog.object.some(this.eventTargetListeners_,function(g,h){for(var k=0;k<g.length;++k)if((!c||g[k].type==a)&&(!f||g[k].capture==b))return!0;return!1})},goog.events.EventTarget.prototype.setTargetForTesting=function(a){this.actualEventTarget_=a},goog.events.EventTarget.dispatchEventInternal_=
function(a,b,c){var f=b.type||b;if(goog.isString(b))b=new goog.events.Event(b,a);else if(b instanceof goog.events.Event)b.target=b.target||a;else{var g=b;b=new goog.events.Event(f,a);goog.object.extend(b,g)}var g=!0,h;if(c)for(var k=c.length-1;!b.propagationStopped_&&0<=k;k--)h=b.currentTarget=c[k],g=h.fireListeners(f,!0,b)&&g;b.propagationStopped_||(h=b.currentTarget=a,g=h.fireListeners(f,!0,b)&&g,b.propagationStopped_||(g=h.fireListeners(f,!1,b)&&g));if(c)for(k=0;!b.propagationStopped_&&k<c.length;k++)h=
b.currentTarget=c[k],g=h.fireListeners(f,!1,b)&&g;return g},goog.events.EventTarget.findListenerIndex_=function(a,b,c,f){for(var g=0;g<a.length;++g){var h=a[g];if(h.listener==b&&h.capture==!!c&&h.handler==f)return g}return-1});goog.fx={};goog.fx.Dragger=function(a,b,c){goog.events.EventTarget.call(this);this.target=a;this.handle=b||a;this.limits=c||new goog.math.Rect(NaN,NaN,NaN,NaN);this.document_=goog.dom.getOwnerDocument(a);this.eventHandler_=new goog.events.EventHandler(this);goog.events.listen(this.handle,[goog.events.EventType.TOUCHSTART,goog.events.EventType.MOUSEDOWN],this.startDrag,!1,this)};goog.inherits(goog.fx.Dragger,goog.events.EventTarget);
goog.fx.Dragger.HAS_SET_CAPTURE_=goog.userAgent.IE||goog.userAgent.GECKO&&goog.userAgent.isVersion("1.9.3");goog.fx.Dragger.EventType={EARLY_CANCEL:"earlycancel",START:"start",BEFOREDRAG:"beforedrag",DRAG:"drag",END:"end"};goog.fx.Dragger.prototype.clientX=0;goog.fx.Dragger.prototype.clientY=0;goog.fx.Dragger.prototype.screenX=0;goog.fx.Dragger.prototype.screenY=0;goog.fx.Dragger.prototype.startX=0;goog.fx.Dragger.prototype.startY=0;goog.fx.Dragger.prototype.deltaX=0;
goog.fx.Dragger.prototype.deltaY=0;goog.fx.Dragger.prototype.enabled_=!0;goog.fx.Dragger.prototype.dragging_=!1;goog.fx.Dragger.prototype.hysteresisDistanceSquared_=0;goog.fx.Dragger.prototype.mouseDownTime_=0;goog.fx.Dragger.prototype.ieDragStartCancellingOn_=!1;goog.fx.Dragger.prototype.useRightPositioningForRtl_=!1;goog.fx.Dragger.prototype.enableRightPositioningForRtl=function(a){this.useRightPositioningForRtl_=a};goog.fx.Dragger.prototype.getHandler=function(){return this.eventHandler_};
goog.fx.Dragger.prototype.setLimits=function(a){this.limits=a||new goog.math.Rect(NaN,NaN,NaN,NaN)};goog.fx.Dragger.prototype.setHysteresis=function(a){this.hysteresisDistanceSquared_=Math.pow(a,2)};goog.fx.Dragger.prototype.getHysteresis=function(){return Math.sqrt(this.hysteresisDistanceSquared_)};goog.fx.Dragger.prototype.setScrollTarget=function(a){this.scrollTarget_=a};goog.fx.Dragger.prototype.setCancelIeDragStart=function(a){this.ieDragStartCancellingOn_=a};
goog.fx.Dragger.prototype.getEnabled=function(){return this.enabled_};goog.fx.Dragger.prototype.setEnabled=function(a){this.enabled_=a};goog.fx.Dragger.prototype.disposeInternal=function(){goog.fx.Dragger.superClass_.disposeInternal.call(this);goog.events.unlisten(this.handle,[goog.events.EventType.TOUCHSTART,goog.events.EventType.MOUSEDOWN],this.startDrag,!1,this);this.cleanUpAfterDragging_();this.eventHandler_=this.handle=this.target=null};
goog.fx.Dragger.prototype.isRightToLeft_=function(){goog.isDef(this.rightToLeft_)||(this.rightToLeft_=goog.style.isRightToLeft(this.target));return this.rightToLeft_};
goog.fx.Dragger.prototype.startDrag=function(a){var b=a.type==goog.events.EventType.MOUSEDOWN;if(this.enabled_&&!this.dragging_&&(!b||a.isMouseActionButton())){this.maybeReinitTouchEvent_(a);if(0==this.hysteresisDistanceSquared_)if(this.fireDragStart_(a))this.dragging_=!0,a.preventDefault();else return;else a.preventDefault();this.setupDragHandlers();this.clientX=this.startX=a.clientX;this.clientY=this.startY=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;this.deltaX=this.useRightPositioningForRtl_?
goog.style.bidi.getOffsetStart(this.target):this.target.offsetLeft;this.deltaY=this.target.offsetTop;this.pageScroll=goog.dom.getDomHelper(this.document_).getDocumentScroll();this.mouseDownTime_=goog.now()}else this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL)};
goog.fx.Dragger.prototype.setupDragHandlers=function(){var a=this.document_,b=a.documentElement,c=!goog.fx.Dragger.HAS_SET_CAPTURE_;this.eventHandler_.listen(a,[goog.events.EventType.TOUCHMOVE,goog.events.EventType.MOUSEMOVE],this.handleMove_,c);this.eventHandler_.listen(a,[goog.events.EventType.TOUCHEND,goog.events.EventType.MOUSEUP],this.endDrag,c);goog.fx.Dragger.HAS_SET_CAPTURE_?(b.setCapture(!1),this.eventHandler_.listen(b,goog.events.EventType.LOSECAPTURE,this.endDrag)):this.eventHandler_.listen(goog.dom.getWindow(a),
goog.events.EventType.BLUR,this.endDrag);goog.userAgent.IE&&this.ieDragStartCancellingOn_&&this.eventHandler_.listen(a,goog.events.EventType.DRAGSTART,goog.events.Event.preventDefault);this.scrollTarget_&&this.eventHandler_.listen(this.scrollTarget_,goog.events.EventType.SCROLL,this.onScroll_,c)};goog.fx.Dragger.prototype.fireDragStart_=function(a){return this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.START,this,a.clientX,a.clientY,a))};
goog.fx.Dragger.prototype.cleanUpAfterDragging_=function(){this.eventHandler_.removeAll();goog.fx.Dragger.HAS_SET_CAPTURE_&&this.document_.releaseCapture()};
goog.fx.Dragger.prototype.endDrag=function(a,b){this.cleanUpAfterDragging_();if(this.dragging_){this.maybeReinitTouchEvent_(a);this.dragging_=!1;var c=this.limitX(this.deltaX),f=this.limitY(this.deltaY);this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.END,this,a.clientX,a.clientY,a,c,f,b||a.type==goog.events.EventType.TOUCHCANCEL))}else this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL);(a.type==goog.events.EventType.TOUCHEND||a.type==goog.events.EventType.TOUCHCANCEL)&&
a.preventDefault()};goog.fx.Dragger.prototype.endDragCancel=function(a){this.endDrag(a,!0)};goog.fx.Dragger.prototype.maybeReinitTouchEvent_=function(a){var b=a.type;b==goog.events.EventType.TOUCHSTART||b==goog.events.EventType.TOUCHMOVE?a.init(a.getBrowserEvent().targetTouches[0],a.currentTarget):(b==goog.events.EventType.TOUCHEND||b==goog.events.EventType.TOUCHCANCEL)&&a.init(a.getBrowserEvent().changedTouches[0],a.currentTarget)};
goog.fx.Dragger.prototype.handleMove_=function(a){if(this.enabled_){this.maybeReinitTouchEvent_(a);var b=(this.useRightPositioningForRtl_&&this.isRightToLeft_()?-1:1)*(a.clientX-this.clientX),c=a.clientY-this.clientY;this.clientX=a.clientX;this.clientY=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;if(!this.dragging_){var f=this.startX-this.clientX,g=this.startY-this.clientY;if(f*f+g*g>this.hysteresisDistanceSquared_)if(this.fireDragStart_(a))this.dragging_=!0;else{this.isDisposed()||this.endDrag(a);
return}}c=this.calculatePosition_(b,c);b=c.x;c=c.y;this.dragging_&&this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.BEFOREDRAG,this,a.clientX,a.clientY,a,b,c))&&(this.doDrag(a,b,c,!1),a.preventDefault())}};
goog.fx.Dragger.prototype.calculatePosition_=function(a,b){var c=goog.dom.getDomHelper(this.document_).getDocumentScroll();a+=c.x-this.pageScroll.x;b+=c.y-this.pageScroll.y;this.pageScroll=c;this.deltaX+=a;this.deltaY+=b;var c=this.limitX(this.deltaX),f=this.limitY(this.deltaY);return new goog.math.Coordinate(c,f)};goog.fx.Dragger.prototype.onScroll_=function(a){var b=this.calculatePosition_(0,0);a.clientX=this.clientX;a.clientY=this.clientY;this.doDrag(a,b.x,b.y,!0)};
goog.fx.Dragger.prototype.doDrag=function(a,b,c,f){this.defaultAction(b,c);this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.DRAG,this,a.clientX,a.clientY,a,b,c))};goog.fx.Dragger.prototype.limitX=function(a){var b=this.limits,c=!isNaN(b.left)?b.left:null,b=!isNaN(b.width)?b.width:0;return Math.min(null!=c?c+b:Infinity,Math.max(null!=c?c:-Infinity,a))};
goog.fx.Dragger.prototype.limitY=function(a){var b=this.limits,c=!isNaN(b.top)?b.top:null,b=!isNaN(b.height)?b.height:0;return Math.min(null!=c?c+b:Infinity,Math.max(null!=c?c:-Infinity,a))};goog.fx.Dragger.prototype.defaultAction=function(a,b){this.useRightPositioningForRtl_&&this.isRightToLeft_()?this.target.style.right=a+"px":this.target.style.left=a+"px";this.target.style.top=b+"px"};goog.fx.Dragger.prototype.isDragging=function(){return this.dragging_};
goog.fx.DragEvent=function(a,b,c,f,g,h,k,l){goog.events.Event.call(this,a);this.clientX=c;this.clientY=f;this.browserEvent=g;this.left=goog.isDef(h)?h:b.deltaX;this.top=goog.isDef(k)?k:b.deltaY;this.dragger=b;this.dragCanceled=!!l};goog.inherits(goog.fx.DragEvent,goog.events.Event);goog.ui={};goog.ui.IdGenerator=function(){};goog.addSingletonGetter(goog.ui.IdGenerator);goog.ui.IdGenerator.prototype.nextId_=0;goog.ui.IdGenerator.prototype.getNextUniqueId=function(){return":"+(this.nextId_++).toString(36)};goog.ui.IdGenerator.instance=goog.ui.IdGenerator.getInstance();goog.ui.Component=function(a){goog.events.EventTarget.call(this);this.dom_=a||goog.dom.getDomHelper();this.rightToLeft_=goog.ui.Component.defaultRightToLeft_};goog.inherits(goog.ui.Component,goog.events.EventTarget);goog.ui.Component.prototype.idGenerator_=goog.ui.IdGenerator.getInstance();goog.ui.Component.defaultRightToLeft_=null;
goog.ui.Component.EventType={BEFORE_SHOW:"beforeshow",SHOW:"show",HIDE:"hide",DISABLE:"disable",ENABLE:"enable",HIGHLIGHT:"highlight",UNHIGHLIGHT:"unhighlight",ACTIVATE:"activate",DEACTIVATE:"deactivate",SELECT:"select",UNSELECT:"unselect",CHECK:"check",UNCHECK:"uncheck",FOCUS:"focus",BLUR:"blur",OPEN:"open",CLOSE:"close",ENTER:"enter",LEAVE:"leave",ACTION:"action",CHANGE:"change"};
goog.ui.Component.Error={NOT_SUPPORTED:"Method not supported",DECORATE_INVALID:"Invalid element to decorate",ALREADY_RENDERED:"Component already rendered",PARENT_UNABLE_TO_BE_SET:"Unable to set parent component",CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds",NOT_OUR_CHILD:"Child is not in parent component",NOT_IN_DOCUMENT:"Operation not supported while component is not in document",STATE_INVALID:"Invalid component state"};
goog.ui.Component.State={ALL:255,DISABLED:1,HOVER:2,ACTIVE:4,SELECTED:8,CHECKED:16,FOCUSED:32,OPENED:64};
goog.ui.Component.getStateTransitionEvent=function(a,b){switch(a){case goog.ui.Component.State.DISABLED:return b?goog.ui.Component.EventType.DISABLE:goog.ui.Component.EventType.ENABLE;case goog.ui.Component.State.HOVER:return b?goog.ui.Component.EventType.HIGHLIGHT:goog.ui.Component.EventType.UNHIGHLIGHT;case goog.ui.Component.State.ACTIVE:return b?goog.ui.Component.EventType.ACTIVATE:goog.ui.Component.EventType.DEACTIVATE;case goog.ui.Component.State.SELECTED:return b?goog.ui.Component.EventType.SELECT:
goog.ui.Component.EventType.UNSELECT;case goog.ui.Component.State.CHECKED:return b?goog.ui.Component.EventType.CHECK:goog.ui.Component.EventType.UNCHECK;case goog.ui.Component.State.FOCUSED:return b?goog.ui.Component.EventType.FOCUS:goog.ui.Component.EventType.BLUR;case goog.ui.Component.State.OPENED:return b?goog.ui.Component.EventType.OPEN:goog.ui.Component.EventType.CLOSE}throw Error(goog.ui.Component.Error.STATE_INVALID);};
goog.ui.Component.setDefaultRightToLeft=function(a){goog.ui.Component.defaultRightToLeft_=a};goog.ui.Component.prototype.id_=null;goog.ui.Component.prototype.inDocument_=!1;goog.ui.Component.prototype.element_=null;goog.ui.Component.prototype.rightToLeft_=null;goog.ui.Component.prototype.model_=null;goog.ui.Component.prototype.parent_=null;goog.ui.Component.prototype.children_=null;goog.ui.Component.prototype.childIndex_=null;goog.ui.Component.prototype.wasDecorated_=!1;
goog.ui.Component.prototype.getId=function(){return this.id_||(this.id_=this.idGenerator_.getNextUniqueId())};goog.ui.Component.prototype.setId=function(a){this.parent_&&this.parent_.childIndex_&&(goog.object.remove(this.parent_.childIndex_,this.id_),goog.object.add(this.parent_.childIndex_,a,this));this.id_=a};goog.ui.Component.prototype.getElement=function(){return this.element_};
goog.ui.Component.prototype.getElementStrict=function(){var a=this.element_;goog.asserts.assert(a,"Can not call getElementStrict before rendering/decorating.");return a};goog.ui.Component.prototype.setElementInternal=function(a){this.element_=a};goog.ui.Component.prototype.getElementsByClass=function(a){return this.element_?this.dom_.getElementsByClass(a,this.element_):[]};goog.ui.Component.prototype.getElementByClass=function(a){return this.element_?this.dom_.getElementByClass(a,this.element_):null};
goog.ui.Component.prototype.getHandler=function(){return this.googUiComponentHandler_||(this.googUiComponentHandler_=new goog.events.EventHandler(this))};goog.ui.Component.prototype.setParent=function(a){if(this==a)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);if(a&&this.parent_&&this.id_&&this.parent_.getChild(this.id_)&&this.parent_!=a)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);this.parent_=a;goog.ui.Component.superClass_.setParentEventTarget.call(this,a)};
goog.ui.Component.prototype.getParent=function(){return this.parent_};goog.ui.Component.prototype.setParentEventTarget=function(a){if(this.parent_&&this.parent_!=a)throw Error(goog.ui.Component.Error.NOT_SUPPORTED);goog.ui.Component.superClass_.setParentEventTarget.call(this,a)};goog.ui.Component.prototype.getDomHelper=function(){return this.dom_};goog.ui.Component.prototype.isInDocument=function(){return this.inDocument_};goog.ui.Component.prototype.createDom=function(){this.element_=this.dom_.createElement("div")};
goog.ui.Component.prototype.render=function(a){this.render_(a)};goog.ui.Component.prototype.renderBefore=function(a){this.render_(a.parentNode,a)};goog.ui.Component.prototype.render_=function(a,b){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.element_||this.createDom();a?a.insertBefore(this.element_,b||null):this.dom_.getDocument().body.appendChild(this.element_);(!this.parent_||this.parent_.isInDocument())&&this.enterDocument()};
goog.ui.Component.prototype.decorate=function(a){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);if(a&&this.canDecorate(a)){this.wasDecorated_=!0;if(!this.dom_||this.dom_.getDocument()!=goog.dom.getOwnerDocument(a))this.dom_=goog.dom.getDomHelper(a);this.decorateInternal(a);this.enterDocument()}else throw Error(goog.ui.Component.Error.DECORATE_INVALID);};goog.ui.Component.prototype.canDecorate=function(a){return!0};goog.ui.Component.prototype.wasDecorated=function(){return this.wasDecorated_};
goog.ui.Component.prototype.decorateInternal=function(a){this.element_=a};goog.ui.Component.prototype.enterDocument=function(){this.inDocument_=!0;this.forEachChild(function(a){!a.isInDocument()&&a.getElement()&&a.enterDocument()})};goog.ui.Component.prototype.exitDocument=function(){this.forEachChild(function(a){a.isInDocument()&&a.exitDocument()});this.googUiComponentHandler_&&this.googUiComponentHandler_.removeAll();this.inDocument_=!1};
goog.ui.Component.prototype.disposeInternal=function(){this.inDocument_&&this.exitDocument();this.googUiComponentHandler_&&(this.googUiComponentHandler_.dispose(),delete this.googUiComponentHandler_);this.forEachChild(function(a){a.dispose()});!this.wasDecorated_&&this.element_&&goog.dom.removeNode(this.element_);this.parent_=this.model_=this.element_=this.childIndex_=this.children_=null;goog.ui.Component.superClass_.disposeInternal.call(this)};
goog.ui.Component.prototype.makeId=function(a){return this.getId()+"."+a};goog.ui.Component.prototype.makeIds=function(a){var b={},c;for(c in a)b[c]=this.makeId(a[c]);return b};goog.ui.Component.prototype.getModel=function(){return this.model_};goog.ui.Component.prototype.setModel=function(a){this.model_=a};goog.ui.Component.prototype.getFragmentFromId=function(a){return a.substring(this.getId().length+1)};
goog.ui.Component.prototype.getElementByFragment=function(a){if(!this.inDocument_)throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);return this.dom_.getElement(this.makeId(a))};goog.ui.Component.prototype.addChild=function(a,b){this.addChildAt(a,this.getChildCount(),b)};
goog.ui.Component.prototype.addChildAt=function(a,b,c){if(a.inDocument_&&(c||!this.inDocument_))throw Error(goog.ui.Component.Error.ALREADY_RENDERED);if(0>b||b>this.getChildCount())throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);if(!this.childIndex_||!this.children_)this.childIndex_={},this.children_=[];a.getParent()==this?(goog.object.set(this.childIndex_,a.getId(),a),goog.array.remove(this.children_,a)):goog.object.add(this.childIndex_,a.getId(),a);a.setParent(this);goog.array.insertAt(this.children_,
a,b);a.inDocument_&&this.inDocument_&&a.getParent()==this?(c=this.getContentElement(),c.insertBefore(a.getElement(),c.childNodes[b]||null)):c?(this.element_||this.createDom(),b=this.getChildAt(b+1),a.render_(this.getContentElement(),b?b.element_:null)):this.inDocument_&&(!a.inDocument_&&a.element_&&a.element_.parentNode&&a.element_.parentNode.nodeType==goog.dom.NodeType.ELEMENT)&&a.enterDocument()};goog.ui.Component.prototype.getContentElement=function(){return this.element_};
goog.ui.Component.prototype.isRightToLeft=function(){null==this.rightToLeft_&&(this.rightToLeft_=goog.style.isRightToLeft(this.inDocument_?this.element_:this.dom_.getDocument().body));return this.rightToLeft_};goog.ui.Component.prototype.setRightToLeft=function(a){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.rightToLeft_=a};goog.ui.Component.prototype.hasChildren=function(){return!!this.children_&&0!=this.children_.length};
goog.ui.Component.prototype.getChildCount=function(){return this.children_?this.children_.length:0};goog.ui.Component.prototype.getChildIds=function(){var a=[];this.forEachChild(function(b){a.push(b.getId())});return a};goog.ui.Component.prototype.getChild=function(a){return this.childIndex_&&a?goog.object.get(this.childIndex_,a)||null:null};goog.ui.Component.prototype.getChildAt=function(a){return this.children_?this.children_[a]||null:null};
goog.ui.Component.prototype.forEachChild=function(a,b){this.children_&&goog.array.forEach(this.children_,a,b)};goog.ui.Component.prototype.indexOfChild=function(a){return this.children_&&a?goog.array.indexOf(this.children_,a):-1};
goog.ui.Component.prototype.removeChild=function(a,b){if(a){var c=goog.isString(a)?a:a.getId();a=this.getChild(c);c&&a&&(goog.object.remove(this.childIndex_,c),goog.array.remove(this.children_,a),b&&(a.exitDocument(),a.element_&&goog.dom.removeNode(a.element_)),a.setParent(null))}if(!a)throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);return a};goog.ui.Component.prototype.removeChildAt=function(a,b){return this.removeChild(this.getChildAt(a),b)};
goog.ui.Component.prototype.removeChildren=function(a){for(var b=[];this.hasChildren();)b.push(this.removeChildAt(0,a));return b};goog.Timer=function(a,b){goog.events.EventTarget.call(this);this.interval_=a||1;this.timerObject_=b||goog.Timer.defaultTimerObject;this.boundTick_=goog.bind(this.tick_,this);this.last_=goog.now()};goog.inherits(goog.Timer,goog.events.EventTarget);goog.Timer.MAX_TIMEOUT_=2147483647;goog.Timer.prototype.enabled=!1;goog.Timer.defaultTimerObject=goog.global;goog.Timer.intervalScale=0.8;goog.Timer.prototype.timer_=null;goog.Timer.prototype.getInterval=function(){return this.interval_};
goog.Timer.prototype.setInterval=function(a){this.interval_=a;this.timer_&&this.enabled?(this.stop(),this.start()):this.timer_&&this.stop()};goog.Timer.prototype.tick_=function(){if(this.enabled){var a=goog.now()-this.last_;0<a&&a<this.interval_*goog.Timer.intervalScale?this.timer_=this.timerObject_.setTimeout(this.boundTick_,this.interval_-a):(this.dispatchTick(),this.enabled&&(this.timer_=this.timerObject_.setTimeout(this.boundTick_,this.interval_),this.last_=goog.now()))}};
goog.Timer.prototype.dispatchTick=function(){this.dispatchEvent(goog.Timer.TICK)};goog.Timer.prototype.start=function(){this.enabled=!0;this.timer_||(this.timer_=this.timerObject_.setTimeout(this.boundTick_,this.interval_),this.last_=goog.now())};goog.Timer.prototype.stop=function(){this.enabled=!1;this.timer_&&(this.timerObject_.clearTimeout(this.timer_),this.timer_=null)};goog.Timer.prototype.disposeInternal=function(){goog.Timer.superClass_.disposeInternal.call(this);this.stop();delete this.timerObject_};
goog.Timer.TICK="tick";goog.Timer.callOnce=function(a,b,c){if(goog.isFunction(a))c&&(a=goog.bind(a,c));else if(a&&"function"==typeof a.handleEvent)a=goog.bind(a.handleEvent,a);else throw Error("Invalid listener argument");return b>goog.Timer.MAX_TIMEOUT_?-1:goog.Timer.defaultTimerObject.setTimeout(a,b||0)};goog.Timer.clear=function(a){goog.Timer.defaultTimerObject.clearTimeout(a)};goog.events.KeyCodes={WIN_KEY_FF_LINUX:0,MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,FF_SEMICOLON:59,FF_EQUALS:61,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,
X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SCROLL_LOCK:145,FIRST_MEDIA_KEY:166,LAST_MEDIA_KEY:183,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,TILDE:192,
SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent=function(a){if(a.altKey&&!a.ctrlKey||a.metaKey||a.keyCode>=goog.events.KeyCodes.F1&&a.keyCode<=goog.events.KeyCodes.F12)return!1;switch(a.keyCode){case goog.events.KeyCodes.ALT:case goog.events.KeyCodes.CAPS_LOCK:case goog.events.KeyCodes.CONTEXT_MENU:case goog.events.KeyCodes.CTRL:case goog.events.KeyCodes.DOWN:case goog.events.KeyCodes.END:case goog.events.KeyCodes.ESC:case goog.events.KeyCodes.HOME:case goog.events.KeyCodes.INSERT:case goog.events.KeyCodes.LEFT:case goog.events.KeyCodes.MAC_FF_META:case goog.events.KeyCodes.META:case goog.events.KeyCodes.NUMLOCK:case goog.events.KeyCodes.NUM_CENTER:case goog.events.KeyCodes.PAGE_DOWN:case goog.events.KeyCodes.PAGE_UP:case goog.events.KeyCodes.PAUSE:case goog.events.KeyCodes.PHANTOM:case goog.events.KeyCodes.PRINT_SCREEN:case goog.events.KeyCodes.RIGHT:case goog.events.KeyCodes.SCROLL_LOCK:case goog.events.KeyCodes.SHIFT:case goog.events.KeyCodes.UP:case goog.events.KeyCodes.WIN_KEY:case goog.events.KeyCodes.WIN_KEY_RIGHT:return!1;case goog.events.KeyCodes.WIN_KEY_FF_LINUX:return!goog.userAgent.GECKO;
default:return a.keyCode<goog.events.KeyCodes.FIRST_MEDIA_KEY||a.keyCode>goog.events.KeyCodes.LAST_MEDIA_KEY}};
goog.events.KeyCodes.firesKeyPressEvent=function(a,b,c,f,g){if(!goog.userAgent.IE&&(!goog.userAgent.WEBKIT||!goog.userAgent.isVersion("525")))return!0;if(goog.userAgent.MAC&&g)return goog.events.KeyCodes.isCharacterKey(a);if(g&&!f||!c&&(b==goog.events.KeyCodes.CTRL||b==goog.events.KeyCodes.ALT||goog.userAgent.MAC&&b==goog.events.KeyCodes.META))return!1;if(goog.userAgent.WEBKIT&&f&&c)switch(a){case goog.events.KeyCodes.BACKSLASH:case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:case goog.events.KeyCodes.TILDE:case goog.events.KeyCodes.SEMICOLON:case goog.events.KeyCodes.DASH:case goog.events.KeyCodes.EQUALS:case goog.events.KeyCodes.COMMA:case goog.events.KeyCodes.PERIOD:case goog.events.KeyCodes.SLASH:case goog.events.KeyCodes.APOSTROPHE:case goog.events.KeyCodes.SINGLE_QUOTE:return!1}if(goog.userAgent.IE&&f&&
b==a)return!1;switch(a){case goog.events.KeyCodes.ENTER:return!(goog.userAgent.IE&&goog.userAgent.isDocumentMode(9));case goog.events.KeyCodes.ESC:return!goog.userAgent.WEBKIT}return goog.events.KeyCodes.isCharacterKey(a)};
goog.events.KeyCodes.isCharacterKey=function(a){if(a>=goog.events.KeyCodes.ZERO&&a<=goog.events.KeyCodes.NINE||a>=goog.events.KeyCodes.NUM_ZERO&&a<=goog.events.KeyCodes.NUM_MULTIPLY||a>=goog.events.KeyCodes.A&&a<=goog.events.KeyCodes.Z||goog.userAgent.WEBKIT&&0==a)return!0;switch(a){case goog.events.KeyCodes.SPACE:case goog.events.KeyCodes.QUESTION_MARK:case goog.events.KeyCodes.NUM_PLUS:case goog.events.KeyCodes.NUM_MINUS:case goog.events.KeyCodes.NUM_PERIOD:case goog.events.KeyCodes.NUM_DIVISION:case goog.events.KeyCodes.SEMICOLON:case goog.events.KeyCodes.FF_SEMICOLON:case goog.events.KeyCodes.DASH:case goog.events.KeyCodes.EQUALS:case goog.events.KeyCodes.FF_EQUALS:case goog.events.KeyCodes.COMMA:case goog.events.KeyCodes.PERIOD:case goog.events.KeyCodes.SLASH:case goog.events.KeyCodes.APOSTROPHE:case goog.events.KeyCodes.SINGLE_QUOTE:case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:case goog.events.KeyCodes.BACKSLASH:case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:return!0;default:return!1}};
goog.events.KeyCodes.normalizeGeckoKeyCode=function(a){switch(a){case goog.events.KeyCodes.FF_EQUALS:return goog.events.KeyCodes.EQUALS;case goog.events.KeyCodes.FF_SEMICOLON:return goog.events.KeyCodes.SEMICOLON;case goog.events.KeyCodes.MAC_FF_META:return goog.events.KeyCodes.META;case goog.events.KeyCodes.WIN_KEY_FF_LINUX:return goog.events.KeyCodes.WIN_KEY;default:return a}};goog.fx.Transition=function(){};goog.fx.Transition.EventType={PLAY:"play",BEGIN:"begin",RESUME:"resume",END:"end",STOP:"stop",FINISH:"finish",PAUSE:"pause"};goog.ui.PopupBase=function(a,b){goog.events.EventTarget.call(this);this.handler_=new goog.events.EventHandler(this);this.setElement(a||null);b&&this.setType(b)};goog.inherits(goog.ui.PopupBase,goog.events.EventTarget);goog.ui.PopupBase.Type={TOGGLE_DISPLAY:"toggle_display",MOVE_OFFSCREEN:"move_offscreen"};goog.ui.PopupBase.prototype.element_=null;goog.ui.PopupBase.prototype.autoHide_=!0;goog.ui.PopupBase.prototype.autoHideRegion_=null;goog.ui.PopupBase.prototype.isVisible_=!1;
goog.ui.PopupBase.prototype.shouldHideAsync_=!1;goog.ui.PopupBase.prototype.lastShowTime_=-1;goog.ui.PopupBase.prototype.lastHideTime_=-1;goog.ui.PopupBase.prototype.hideOnEscape_=!1;goog.ui.PopupBase.prototype.enableCrossIframeDismissal_=!0;goog.ui.PopupBase.prototype.type_=goog.ui.PopupBase.Type.TOGGLE_DISPLAY;goog.ui.PopupBase.EventType={BEFORE_SHOW:"beforeshow",SHOW:"show",BEFORE_HIDE:"beforehide",HIDE:"hide"};goog.ui.PopupBase.DEBOUNCE_DELAY_MS=150;goog.ui.PopupBase.prototype.getType=function(){return this.type_};
goog.ui.PopupBase.prototype.setType=function(a){this.type_=a};goog.ui.PopupBase.prototype.shouldHideAsync=function(){return this.shouldHideAsync_};goog.ui.PopupBase.prototype.setShouldHideAsync=function(a){this.shouldHideAsync_=a};goog.ui.PopupBase.prototype.getElement=function(){return this.element_};goog.ui.PopupBase.prototype.setElement=function(a){this.ensureNotVisible_();this.element_=a};goog.ui.PopupBase.prototype.getAutoHide=function(){return this.autoHide_};
goog.ui.PopupBase.prototype.setAutoHide=function(a){this.ensureNotVisible_();this.autoHide_=a};goog.ui.PopupBase.prototype.getHideOnEscape=function(){return this.hideOnEscape_};goog.ui.PopupBase.prototype.setHideOnEscape=function(a){this.ensureNotVisible_();this.hideOnEscape_=a};goog.ui.PopupBase.prototype.getEnableCrossIframeDismissal=function(){return this.enableCrossIframeDismissal_};goog.ui.PopupBase.prototype.setEnableCrossIframeDismissal=function(a){this.enableCrossIframeDismissal_=a};
goog.ui.PopupBase.prototype.getAutoHideRegion=function(){return this.autoHideRegion_};goog.ui.PopupBase.prototype.setAutoHideRegion=function(a){this.autoHideRegion_=a};goog.ui.PopupBase.prototype.setTransition=function(a,b){this.showTransition_=a;this.hideTransition_=b};goog.ui.PopupBase.prototype.getLastShowTime=function(){return this.lastShowTime_};goog.ui.PopupBase.prototype.getLastHideTime=function(){return this.lastHideTime_};
goog.ui.PopupBase.prototype.ensureNotVisible_=function(){if(this.isVisible_)throw Error("Can not change this state of the popup while showing.");};goog.ui.PopupBase.prototype.isVisible=function(){return this.isVisible_};goog.ui.PopupBase.prototype.isOrWasRecentlyVisible=function(){return this.isVisible_||goog.now()-this.lastHideTime_<goog.ui.PopupBase.DEBOUNCE_DELAY_MS};
goog.ui.PopupBase.prototype.setVisible=function(a){this.showTransition_&&this.showTransition_.stop();this.hideTransition_&&this.hideTransition_.stop();a?this.show_():this.hide_()};goog.ui.PopupBase.prototype.reposition=goog.nullFunction;
goog.ui.PopupBase.prototype.show_=function(){if(!this.isVisible_&&this.onBeforeShow()){if(!this.element_)throw Error("Caller must call setElement before trying to show the popup");this.reposition();var a=goog.dom.getOwnerDocument(this.element_);this.hideOnEscape_&&this.handler_.listen(a,goog.events.EventType.KEYDOWN,this.onDocumentKeyDown_,!0);if(this.autoHide_)if(this.handler_.listen(a,goog.events.EventType.MOUSEDOWN,this.onDocumentMouseDown_,!0),goog.userAgent.IE){var b;try{b=a.activeElement}catch(c){}for(;b&&
"IFRAME"==b.nodeName;){try{var f=goog.dom.getFrameContentDocument(b)}catch(g){break}a=f;b=a.activeElement}this.handler_.listen(a,goog.events.EventType.MOUSEDOWN,this.onDocumentMouseDown_,!0);this.handler_.listen(a,goog.events.EventType.DEACTIVATE,this.onDocumentBlur_)}else this.handler_.listen(a,goog.events.EventType.BLUR,this.onDocumentBlur_);this.type_==goog.ui.PopupBase.Type.TOGGLE_DISPLAY?this.showPopupElement():this.type_==goog.ui.PopupBase.Type.MOVE_OFFSCREEN&&this.reposition();this.isVisible_=
!0;if(this.showTransition_)goog.events.listenOnce(this.showTransition_,goog.fx.Transition.EventType.END,this.onShow_,!1,this),this.showTransition_.play();else this.onShow_()}};
goog.ui.PopupBase.prototype.hide_=function(a){if(!this.isVisible_||!this.onBeforeHide_(a))return!1;this.handler_&&this.handler_.removeAll();this.isVisible_=!1;this.lastHideTime_=goog.now();this.hideTransition_?(goog.events.listenOnce(this.hideTransition_,goog.fx.Transition.EventType.END,goog.partial(this.continueHidingPopup_,a),!1,this),this.hideTransition_.play()):this.continueHidingPopup_(a);return!0};
goog.ui.PopupBase.prototype.continueHidingPopup_=function(a){this.type_==goog.ui.PopupBase.Type.TOGGLE_DISPLAY?this.shouldHideAsync_?goog.Timer.callOnce(this.hidePopupElement_,0,this):this.hidePopupElement_():this.type_==goog.ui.PopupBase.Type.MOVE_OFFSCREEN&&this.moveOffscreen_();this.onHide_(a)};goog.ui.PopupBase.prototype.showPopupElement=function(){this.element_.style.visibility="visible";goog.style.showElement(this.element_,!0)};
goog.ui.PopupBase.prototype.hidePopupElement_=function(){this.element_.style.visibility="hidden";goog.style.showElement(this.element_,!1)};goog.ui.PopupBase.prototype.moveOffscreen_=function(){this.element_.style.top="-10000px"};goog.ui.PopupBase.prototype.onBeforeShow=function(){return this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_SHOW)};goog.ui.PopupBase.prototype.onShow_=function(){this.lastShowTime_=goog.now();this.lastHideTime_=-1;this.dispatchEvent(goog.ui.PopupBase.EventType.SHOW)};
goog.ui.PopupBase.prototype.onBeforeHide_=function(a){return this.dispatchEvent({type:goog.ui.PopupBase.EventType.BEFORE_HIDE,target:a})};goog.ui.PopupBase.prototype.onHide_=function(a){this.dispatchEvent({type:goog.ui.PopupBase.EventType.HIDE,target:a})};goog.ui.PopupBase.prototype.onDocumentMouseDown_=function(a){a=a.target;!goog.dom.contains(this.element_,a)&&((!this.autoHideRegion_||goog.dom.contains(this.autoHideRegion_,a))&&!this.shouldDebounce_())&&this.hide_(a)};
goog.ui.PopupBase.prototype.onDocumentKeyDown_=function(a){a.keyCode==goog.events.KeyCodes.ESC&&this.hide_(a.target)&&(a.preventDefault(),a.stopPropagation())};goog.ui.PopupBase.prototype.onDocumentBlur_=function(a){if(this.enableCrossIframeDismissal_){var b=goog.dom.getOwnerDocument(this.element_);if(goog.userAgent.IE||goog.userAgent.OPERA){if(a=b.activeElement,!a||goog.dom.contains(this.element_,a)||"BODY"==a.tagName)return}else if(a.target!=b)return;this.shouldDebounce_()||this.hide_()}};
goog.ui.PopupBase.prototype.shouldDebounce_=function(){return goog.now()-this.lastShowTime_<goog.ui.PopupBase.DEBOUNCE_DELAY_MS};goog.ui.PopupBase.prototype.disposeInternal=function(){goog.ui.PopupBase.superClass_.disposeInternal.call(this);this.handler_.dispose();goog.dispose(this.showTransition_);goog.dispose(this.hideTransition_);delete this.element_;delete this.handler_};goog.events.FocusHandler=function(a){goog.events.EventTarget.call(this);this.element_=a;a=goog.userAgent.IE?"focusout":"blur";this.listenKeyIn_=goog.events.listen(this.element_,goog.userAgent.IE?"focusin":"focus",this,!goog.userAgent.IE);this.listenKeyOut_=goog.events.listen(this.element_,a,this,!goog.userAgent.IE)};goog.inherits(goog.events.FocusHandler,goog.events.EventTarget);goog.events.FocusHandler.EventType={FOCUSIN:"focusin",FOCUSOUT:"focusout"};
goog.events.FocusHandler.prototype.handleEvent=function(a){var b=a.getBrowserEvent(),b=new goog.events.BrowserEvent(b);b.type="focusin"==a.type||"focus"==a.type?goog.events.FocusHandler.EventType.FOCUSIN:goog.events.FocusHandler.EventType.FOCUSOUT;this.dispatchEvent(b)};goog.events.FocusHandler.prototype.disposeInternal=function(){goog.events.FocusHandler.superClass_.disposeInternal.call(this);goog.events.unlistenByKey(this.listenKeyIn_);goog.events.unlistenByKey(this.listenKeyOut_);delete this.element_};goog.dom.iframe={};goog.dom.iframe.BLANK_SOURCE='javascript:""';goog.dom.iframe.STYLES_="border:0;vertical-align:bottom;";goog.dom.iframe.createBlank=function(a,b){return a.createDom("iframe",{frameborder:0,style:goog.dom.iframe.STYLES_+(b||""),src:goog.dom.iframe.BLANK_SOURCE})};goog.dom.iframe.writeContent=function(a,b){var c=goog.dom.getFrameContentDocument(a);c.open();c.write(b);c.close()};
goog.dom.iframe.createWithContent=function(a,b,c,f,g){var h=goog.dom.getDomHelper(a),k=[];g||k.push("<!DOCTYPE html>");k.push("<html><head>",b,"</head><body>",c,"</body></html>");b=goog.dom.iframe.createBlank(h,f);a.appendChild(b);goog.dom.iframe.writeContent(b,k.join(""));return b};goog.ui.ModalPopup=function(a,b){goog.ui.Component.call(this,b);this.useIframeMask_=!!a};goog.inherits(goog.ui.ModalPopup,goog.ui.Component);goog.ui.ModalPopup.prototype.focusHandler_=null;goog.ui.ModalPopup.prototype.visible_=!1;goog.ui.ModalPopup.prototype.bgEl_=null;goog.ui.ModalPopup.prototype.bgIframeEl_=null;goog.ui.ModalPopup.prototype.tabCatcherElement_=null;goog.ui.ModalPopup.prototype.backwardTabWrapInProgress_=!1;goog.ui.ModalPopup.prototype.getCssClass=function(){return"goog-modalpopup"};
goog.ui.ModalPopup.prototype.getBackgroundIframe=function(){return this.bgIframeEl_};goog.ui.ModalPopup.prototype.getBackgroundElement=function(){return this.bgEl_};goog.ui.ModalPopup.prototype.createDom=function(){goog.ui.ModalPopup.superClass_.createDom.call(this);var a=this.getElement();goog.dom.classes.add(a,this.getCssClass());goog.dom.setFocusableTabIndex(a,!0);goog.style.showElement(a,!1);this.manageBackgroundDom_();this.createTabCatcher_()};
goog.ui.ModalPopup.prototype.manageBackgroundDom_=function(){this.useIframeMask_&&!this.bgIframeEl_&&(this.bgIframeEl_=goog.dom.iframe.createBlank(this.getDomHelper()),this.bgIframeEl_.className=this.getCssClass()+"-bg",goog.style.showElement(this.bgIframeEl_,!1),goog.style.setOpacity(this.bgIframeEl_,0));this.bgEl_||(this.bgEl_=this.getDomHelper().createDom("div",this.getCssClass()+"-bg"),goog.style.showElement(this.bgEl_,!1))};
goog.ui.ModalPopup.prototype.createTabCatcher_=function(){this.tabCatcherElement_||(this.tabCatcherElement_=this.getDomHelper().createElement("span"),goog.style.showElement(this.tabCatcherElement_,!1),goog.dom.setFocusableTabIndex(this.tabCatcherElement_,!0),this.tabCatcherElement_.style.position="absolute")};
goog.ui.ModalPopup.prototype.setupBackwardTabWrap=function(){this.backwardTabWrapInProgress_=!0;try{this.tabCatcherElement_.focus()}catch(a){}goog.Timer.callOnce(this.resetBackwardTabWrap_,0,this)};goog.ui.ModalPopup.prototype.resetBackwardTabWrap_=function(){this.backwardTabWrapInProgress_=!1};
goog.ui.ModalPopup.prototype.renderBackground_=function(){goog.asserts.assert(!!this.bgEl_,"Background element must not be null.");this.bgIframeEl_&&goog.dom.insertSiblingBefore(this.bgIframeEl_,this.getElement());goog.dom.insertSiblingBefore(this.bgEl_,this.getElement())};goog.ui.ModalPopup.prototype.canDecorate=function(a){return!!a&&a.tagName==goog.dom.TagName.DIV};
goog.ui.ModalPopup.prototype.decorateInternal=function(a){goog.ui.ModalPopup.superClass_.decorateInternal.call(this,a);goog.dom.classes.add(this.getElement(),this.getCssClass());this.manageBackgroundDom_();this.createTabCatcher_();goog.style.showElement(this.getElement(),!1)};
goog.ui.ModalPopup.prototype.enterDocument=function(){this.renderBackground_();goog.ui.ModalPopup.superClass_.enterDocument.call(this);goog.dom.insertSiblingAfter(this.tabCatcherElement_,this.getElement());this.focusHandler_=new goog.events.FocusHandler(this.getDomHelper().getDocument());this.getHandler().listen(this.focusHandler_,goog.events.FocusHandler.EventType.FOCUSIN,this.onFocus_)};
goog.ui.ModalPopup.prototype.exitDocument=function(){this.isVisible()&&this.setVisible(!1);goog.dispose(this.focusHandler_);goog.ui.ModalPopup.superClass_.exitDocument.call(this);goog.dom.removeNode(this.bgIframeEl_);goog.dom.removeNode(this.bgEl_);goog.dom.removeNode(this.tabCatcherElement_)};
goog.ui.ModalPopup.prototype.setVisible=function(a){goog.asserts.assert(this.isInDocument(),"ModalPopup must be rendered first.");a!=this.visible_&&(this.popupShowTransition_&&this.popupShowTransition_.stop(),this.bgShowTransition_&&this.bgShowTransition_.stop(),this.popupHideTransition_&&this.popupHideTransition_.stop(),this.bgHideTransition_&&this.bgHideTransition_.stop(),a?this.show_():this.hide_())};
goog.ui.ModalPopup.prototype.setTransition=function(a,b,c,f){this.popupShowTransition_=a;this.popupHideTransition_=b;this.bgShowTransition_=c;this.bgHideTransition_=f};
goog.ui.ModalPopup.prototype.show_=function(){if(this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_SHOW))if(this.resizeBackground_(),this.reposition(),this.getHandler().listen(this.getDomHelper().getWindow(),goog.events.EventType.RESIZE,this.resizeBackground_),this.showPopupElement_(!0),this.focus(),this.visible_=!0,this.popupShowTransition_&&this.bgShowTransition_)goog.events.listenOnce(this.popupShowTransition_,goog.fx.Transition.EventType.END,this.onShow,!1,this),this.bgShowTransition_.play(),
this.popupShowTransition_.play();else this.onShow()};
goog.ui.ModalPopup.prototype.hide_=function(){if(this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_HIDE))if(this.getHandler().unlisten(this.getDomHelper().getWindow(),goog.events.EventType.RESIZE,this.resizeBackground_),this.visible_=!1,this.popupHideTransition_&&this.bgHideTransition_)goog.events.listenOnce(this.popupHideTransition_,goog.fx.Transition.EventType.END,this.onHide,!1,this),this.bgHideTransition_.play(),this.popupHideTransition_.play();else this.onHide()};
goog.ui.ModalPopup.prototype.showPopupElement_=function(a){this.bgIframeEl_&&goog.style.showElement(this.bgIframeEl_,a);this.bgEl_&&goog.style.showElement(this.bgEl_,a);goog.style.showElement(this.getElement(),a);goog.style.showElement(this.tabCatcherElement_,a)};goog.ui.ModalPopup.prototype.onShow=function(){this.dispatchEvent(goog.ui.PopupBase.EventType.SHOW)};goog.ui.ModalPopup.prototype.onHide=function(){this.showPopupElement_(!1);this.dispatchEvent(goog.ui.PopupBase.EventType.HIDE)};
goog.ui.ModalPopup.prototype.isVisible=function(){return this.visible_};goog.ui.ModalPopup.prototype.focus=function(){this.focusElement_()};
goog.ui.ModalPopup.prototype.resizeBackground_=function(){this.bgIframeEl_&&goog.style.showElement(this.bgIframeEl_,!1);this.bgEl_&&goog.style.showElement(this.bgEl_,!1);var a=this.getDomHelper().getDocument(),b=goog.dom.getWindow(a)||window,c=goog.dom.getViewportSize(b),b=Math.max(c.width,Math.max(a.body.scrollWidth,a.documentElement.scrollWidth)),a=Math.max(c.height,Math.max(a.body.scrollHeight,a.documentElement.scrollHeight));this.bgIframeEl_&&(goog.style.showElement(this.bgIframeEl_,!0),goog.style.setSize(this.bgIframeEl_,
b,a));this.bgEl_&&(goog.style.showElement(this.bgEl_,!0),goog.style.setSize(this.bgEl_,b,a))};
goog.ui.ModalPopup.prototype.reposition=function(){var a=this.getDomHelper().getDocument(),b=goog.dom.getWindow(a)||window;if("fixed"==goog.style.getComputedPosition(this.getElement()))var c=a=0;else c=this.getDomHelper().getDocumentScroll(),a=c.x,c=c.y;var f=goog.style.getSize(this.getElement()),b=goog.dom.getViewportSize(b),a=Math.max(a+b.width/2-f.width/2,0),c=Math.max(c+b.height/2-f.height/2,0);goog.style.setPosition(this.getElement(),a,c);goog.style.setPosition(this.tabCatcherElement_,a,c)};
goog.ui.ModalPopup.prototype.onFocus_=function(a){this.backwardTabWrapInProgress_?this.resetBackwardTabWrap_():a.target==this.tabCatcherElement_&&goog.Timer.callOnce(this.focusElement_,0,this)};goog.ui.ModalPopup.prototype.focusElement_=function(){try{goog.userAgent.IE&&this.getDomHelper().getDocument().body.focus(),this.getElement().focus()}catch(a){}};
goog.ui.ModalPopup.prototype.disposeInternal=function(){goog.dispose(this.popupShowTransition_);this.popupShowTransition_=null;goog.dispose(this.popupHideTransition_);this.popupHideTransition_=null;goog.dispose(this.bgShowTransition_);this.bgShowTransition_=null;goog.dispose(this.bgHideTransition_);this.bgHideTransition_=null;goog.ui.ModalPopup.superClass_.disposeInternal.call(this)};goog.iter={};goog.iter.StopIteration="StopIteration"in goog.global?goog.global.StopIteration:Error("StopIteration");goog.iter.Iterator=function(){};goog.iter.Iterator.prototype.next=function(){throw goog.iter.StopIteration;};goog.iter.Iterator.prototype.__iterator__=function(a){return this};
goog.iter.toIterator=function(a){if(a instanceof goog.iter.Iterator)return a;if("function"==typeof a.__iterator__)return a.__iterator__(!1);if(goog.isArrayLike(a)){var b=0,c=new goog.iter.Iterator;c.next=function(){for(;;){if(b>=a.length)throw goog.iter.StopIteration;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");};
goog.iter.forEach=function(a,b,c){if(goog.isArrayLike(a))try{goog.array.forEach(a,b,c)}catch(f){if(f!==goog.iter.StopIteration)throw f;}else{a=goog.iter.toIterator(a);try{for(;;)b.call(c,a.next(),void 0,a)}catch(g){if(g!==goog.iter.StopIteration)throw g;}}};goog.iter.filter=function(a,b,c){var f=goog.iter.toIterator(a);a=new goog.iter.Iterator;a.next=function(){for(;;){var a=f.next();if(b.call(c,a,void 0,f))return a}};return a};
goog.iter.range=function(a,b,c){var f=0,g=a,h=c||1;1<arguments.length&&(f=a,g=b);if(0==h)throw Error("Range step argument must not be zero");var k=new goog.iter.Iterator;k.next=function(){if(0<h&&f>=g||0>h&&f<=g)throw goog.iter.StopIteration;var a=f;f+=h;return a};return k};goog.iter.join=function(a,b){return goog.iter.toArray(a).join(b)};goog.iter.map=function(a,b,c){var f=goog.iter.toIterator(a);a=new goog.iter.Iterator;a.next=function(){for(;;){var a=f.next();return b.call(c,a,void 0,f)}};return a};
goog.iter.reduce=function(a,b,c,f){var g=c;goog.iter.forEach(a,function(a){g=b.call(f,g,a)});return g};goog.iter.some=function(a,b,c){a=goog.iter.toIterator(a);try{for(;;)if(b.call(c,a.next(),void 0,a))return!0}catch(f){if(f!==goog.iter.StopIteration)throw f;}return!1};goog.iter.every=function(a,b,c){a=goog.iter.toIterator(a);try{for(;;)if(!b.call(c,a.next(),void 0,a))return!1}catch(f){if(f!==goog.iter.StopIteration)throw f;}return!0};
goog.iter.chain=function(a){var b=arguments,c=b.length,f=0,g=new goog.iter.Iterator;g.next=function(){try{if(f>=c)throw goog.iter.StopIteration;return goog.iter.toIterator(b[f]).next()}catch(a){if(a!==goog.iter.StopIteration||f>=c)throw a;f++;return this.next()}};return g};goog.iter.dropWhile=function(a,b,c){var f=goog.iter.toIterator(a);a=new goog.iter.Iterator;var g=!0;a.next=function(){for(;;){var a=f.next();if(!g||!b.call(c,a,void 0,f))return g=!1,a}};return a};
goog.iter.takeWhile=function(a,b,c){var f=goog.iter.toIterator(a);a=new goog.iter.Iterator;var g=!0;a.next=function(){for(;;)if(g){var a=f.next();if(b.call(c,a,void 0,f))return a;g=!1}else throw goog.iter.StopIteration;};return a};goog.iter.toArray=function(a){if(goog.isArrayLike(a))return goog.array.toArray(a);a=goog.iter.toIterator(a);var b=[];goog.iter.forEach(a,function(a){b.push(a)});return b};
goog.iter.equals=function(a,b){a=goog.iter.toIterator(a);b=goog.iter.toIterator(b);var c,f;try{for(;;){c=f=!1;var g=a.next();c=!0;var h=b.next();f=!0;if(g!=h)break}}catch(k){if(k!==goog.iter.StopIteration)throw k;if(c&&!f)return!1;if(!f)try{b.next()}catch(l){if(l!==goog.iter.StopIteration)throw l;return!0}}return!1};goog.iter.nextOrValue=function(a,b){try{return goog.iter.toIterator(a).next()}catch(c){if(c!=goog.iter.StopIteration)throw c;return b}};
goog.iter.product=function(a){if(goog.array.some(arguments,function(a){return!a.length})||!arguments.length)return new goog.iter.Iterator;var b=new goog.iter.Iterator,c=arguments,f=goog.array.repeat(0,c.length);b.next=function(){if(f){for(var a=goog.array.map(f,function(a,b){return c[b][a]}),b=f.length-1;0<=b;b--){goog.asserts.assert(f);if(f[b]<c[b].length-1){f[b]++;break}if(0==b){f=null;break}f[b]=0}return a}throw goog.iter.StopIteration;};return b};
goog.iter.cycle=function(a){var b=goog.iter.toIterator(a),c=[],f=0;a=new goog.iter.Iterator;var g=!1;a.next=function(){var a=null;if(!g)try{return a=b.next(),c.push(a),a}catch(k){if(k!=goog.iter.StopIteration||goog.array.isEmpty(c))throw k;g=!0}a=c[f];f=(f+1)%c.length;return a};return a};goog.structs={};goog.structs.getCount=function(a){return"function"==typeof a.getCount?a.getCount():goog.isArrayLike(a)||goog.isString(a)?a.length:goog.object.getCount(a)};goog.structs.getValues=function(a){if("function"==typeof a.getValues)return a.getValues();if(goog.isString(a))return a.split("");if(goog.isArrayLike(a)){for(var b=[],c=a.length,f=0;f<c;f++)b.push(a[f]);return b}return goog.object.getValues(a)};
goog.structs.getKeys=function(a){if("function"==typeof a.getKeys)return a.getKeys();if("function"!=typeof a.getValues){if(goog.isArrayLike(a)||goog.isString(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return goog.object.getKeys(a)}};goog.structs.contains=function(a,b){return"function"==typeof a.contains?a.contains(b):"function"==typeof a.containsValue?a.containsValue(b):goog.isArrayLike(a)||goog.isString(a)?goog.array.contains(a,b):goog.object.containsValue(a,b)};
goog.structs.isEmpty=function(a){return"function"==typeof a.isEmpty?a.isEmpty():goog.isArrayLike(a)||goog.isString(a)?goog.array.isEmpty(a):goog.object.isEmpty(a)};goog.structs.clear=function(a){"function"==typeof a.clear?a.clear():goog.isArrayLike(a)?goog.array.clear(a):goog.object.clear(a)};
goog.structs.forEach=function(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(goog.isArrayLike(a)||goog.isString(a))goog.array.forEach(a,b,c);else for(var f=goog.structs.getKeys(a),g=goog.structs.getValues(a),h=g.length,k=0;k<h;k++)b.call(c,g[k],f&&f[k],a)};
goog.structs.filter=function(a,b,c){if("function"==typeof a.filter)return a.filter(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.filter(a,b,c);var f,g=goog.structs.getKeys(a),h=goog.structs.getValues(a),k=h.length;if(g){f={};for(var l=0;l<k;l++)b.call(c,h[l],g[l],a)&&(f[g[l]]=h[l])}else{f=[];for(l=0;l<k;l++)b.call(c,h[l],void 0,a)&&f.push(h[l])}return f};
goog.structs.map=function(a,b,c){if("function"==typeof a.map)return a.map(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.map(a,b,c);var f,g=goog.structs.getKeys(a),h=goog.structs.getValues(a),k=h.length;if(g){f={};for(var l=0;l<k;l++)f[g[l]]=b.call(c,h[l],g[l],a)}else{f=[];for(l=0;l<k;l++)f[l]=b.call(c,h[l],void 0,a)}return f};
goog.structs.some=function(a,b,c){if("function"==typeof a.some)return a.some(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.some(a,b,c);for(var f=goog.structs.getKeys(a),g=goog.structs.getValues(a),h=g.length,k=0;k<h;k++)if(b.call(c,g[k],f&&f[k],a))return!0;return!1};
goog.structs.every=function(a,b,c){if("function"==typeof a.every)return a.every(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.every(a,b,c);for(var f=goog.structs.getKeys(a),g=goog.structs.getValues(a),h=g.length,k=0;k<h;k++)if(!b.call(c,g[k],f&&f[k],a))return!1;return!0};goog.structs.Map=function(a,b){this.map_={};this.keys_=[];var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var f=0;f<c;f+=2)this.set(arguments[f],arguments[f+1])}else a&&this.addAll(a)};goog.structs.Map.prototype.count_=0;goog.structs.Map.prototype.version_=0;goog.structs.Map.prototype.getCount=function(){return this.count_};
goog.structs.Map.prototype.getValues=function(){this.cleanupKeysArray_();for(var a=[],b=0;b<this.keys_.length;b++)a.push(this.map_[this.keys_[b]]);return a};goog.structs.Map.prototype.getKeys=function(){this.cleanupKeysArray_();return this.keys_.concat()};goog.structs.Map.prototype.containsKey=function(a){return goog.structs.Map.hasKey_(this.map_,a)};
goog.structs.Map.prototype.containsValue=function(a){for(var b=0;b<this.keys_.length;b++){var c=this.keys_[b];if(goog.structs.Map.hasKey_(this.map_,c)&&this.map_[c]==a)return!0}return!1};goog.structs.Map.prototype.equals=function(a,b){if(this===a)return!0;if(this.count_!=a.getCount())return!1;var c=b||goog.structs.Map.defaultEquals;this.cleanupKeysArray_();for(var f,g=0;f=this.keys_[g];g++)if(!c(this.get(f),a.get(f)))return!1;return!0};goog.structs.Map.defaultEquals=function(a,b){return a===b};
goog.structs.Map.prototype.isEmpty=function(){return 0==this.count_};goog.structs.Map.prototype.clear=function(){this.map_={};this.version_=this.count_=this.keys_.length=0};goog.structs.Map.prototype.remove=function(a){return goog.structs.Map.hasKey_(this.map_,a)?(delete this.map_[a],this.count_--,this.version_++,this.keys_.length>2*this.count_&&this.cleanupKeysArray_(),!0):!1};
goog.structs.Map.prototype.cleanupKeysArray_=function(){if(this.count_!=this.keys_.length){for(var a=0,b=0;a<this.keys_.length;){var c=this.keys_[a];goog.structs.Map.hasKey_(this.map_,c)&&(this.keys_[b++]=c);a++}this.keys_.length=b}if(this.count_!=this.keys_.length){for(var f={},b=a=0;a<this.keys_.length;)c=this.keys_[a],goog.structs.Map.hasKey_(f,c)||(this.keys_[b++]=c,f[c]=1),a++;this.keys_.length=b}};
goog.structs.Map.prototype.get=function(a,b){return goog.structs.Map.hasKey_(this.map_,a)?this.map_[a]:b};goog.structs.Map.prototype.set=function(a,b){goog.structs.Map.hasKey_(this.map_,a)||(this.count_++,this.keys_.push(a),this.version_++);this.map_[a]=b};goog.structs.Map.prototype.addAll=function(a){var b;a instanceof goog.structs.Map?(b=a.getKeys(),a=a.getValues()):(b=goog.object.getKeys(a),a=goog.object.getValues(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};
goog.structs.Map.prototype.clone=function(){return new goog.structs.Map(this)};goog.structs.Map.prototype.transpose=function(){for(var a=new goog.structs.Map,b=0;b<this.keys_.length;b++){var c=this.keys_[b];a.set(this.map_[c],c)}return a};goog.structs.Map.prototype.toObject=function(){this.cleanupKeysArray_();for(var a={},b=0;b<this.keys_.length;b++){var c=this.keys_[b];a[c]=this.map_[c]}return a};goog.structs.Map.prototype.getKeyIterator=function(){return this.__iterator__(!0)};
goog.structs.Map.prototype.getValueIterator=function(){return this.__iterator__(!1)};goog.structs.Map.prototype.__iterator__=function(a){this.cleanupKeysArray_();var b=0,c=this.keys_,f=this.map_,g=this.version_,h=this,k=new goog.iter.Iterator;k.next=function(){for(;;){if(g!=h.version_)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw goog.iter.StopIteration;var k=c[b++];return a?k:f[k]}};return k};
goog.structs.Map.hasKey_=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};goog.a11y={};goog.a11y.aria={};
goog.a11y.aria.Role={ALERT:"alert",ALERTDIALOG:"alertdialog",APPLICATION:"application",ARTICLE:"article",BANNER:"banner",BUTTON:"button",CHECKBOX:"checkbox",COLUMNHEADER:"columnheader",COMBOBOX:"combobox",COMPLEMENTARY:"complementary",CONTENTINFO:"contentinfo",DEFINITION:"definition",DIALOG:"dialog",DIRECTORY:"directory",DOCUMENT:"document",FORM:"form",GRID:"grid",GRIDCELL:"gridcell",GROUP:"group",HEADING:"heading",IMG:"img",LINK:"link",LIST:"list",LISTBOX:"listbox",LISTITEM:"listitem",LOG:"log",
MAIN:"main",MARQUEE:"marquee",MATH:"math",MENU:"menu",MENUBAR:"menubar",MENU_ITEM:"menuitem",MENU_ITEM_CHECKBOX:"menuitemcheckbox",MENU_ITEM_RADIO:"menuitemradio",NAVIGATION:"navigation",NOTE:"note",OPTION:"option",PRESENTATION:"presentation",PROGRESSBAR:"progressbar",RADIO:"radio",RADIOGROUP:"radiogroup",REGION:"region",ROW:"row",ROWGROUP:"rowgroup",ROWHEADER:"rowheader",SCROLLBAR:"scrollbar",SEARCH:"search",SEPARATOR:"separator",SLIDER:"slider",SPINBUTTON:"spinbutton",STATUS:"status",TAB:"tab",
TAB_LIST:"tablist",TAB_PANEL:"tabpanel",TEXTBOX:"textbox",TIMER:"timer",TOOLBAR:"toolbar",TOOLTIP:"tooltip",TREE:"tree",TREEGRID:"treegrid",TREEITEM:"treeitem"};goog.a11y.aria.State={ACTIVEDESCENDANT:"activedescendant",ATOMIC:"atomic",AUTOCOMPLETE:"autocomplete",BUSY:"busy",CHECKED:"checked",CONTROLS:"controls",DESCRIBEDBY:"describedby",DISABLED:"disabled",DROPEFFECT:"dropeffect",EXPANDED:"expanded",FLOWTO:"flowto",GRABBED:"grabbed",HASPOPUP:"haspopup",HIDDEN:"hidden",INVALID:"invalid",LABEL:"label",LABELLEDBY:"labelledby",LEVEL:"level",LIVE:"live",MULTILINE:"multiline",MULTISELECTABLE:"multiselectable",ORIENTATION:"orientation",OWNS:"owns",POSINSET:"posinset",
PRESSED:"pressed",READONLY:"readonly",RELEVANT:"relevant",REQUIRED:"required",SELECTED:"selected",SETSIZE:"setsize",SORT:"sort",VALUEMAX:"valuemax",VALUEMIN:"valuemin",VALUENOW:"valuenow",VALUETEXT:"valuetext"};goog.a11y.aria.LivePriority={OFF:"off",POLITE:"polite",ASSERTIVE:"assertive"};goog.a11y.aria.setRole=function(a,b){a.setAttribute("role",b)};goog.a11y.aria.getRole=function(a){return a.getAttribute("role")||""};goog.a11y.aria.setState=function(a,b,c){a.setAttribute("aria-"+b,c)};goog.a11y.aria.getState=function(a,b){var c=a.getAttribute("aria-"+b);return!0===c||!1===c?c?"true":"false":c?String(c):""};goog.a11y.aria.getActiveDescendant=function(a){var b=goog.a11y.aria.getState(a,goog.a11y.aria.State.ACTIVEDESCENDANT);return goog.dom.getOwnerDocument(a).getElementById(b)};
goog.a11y.aria.setActiveDescendant=function(a,b){goog.a11y.aria.setState(a,goog.a11y.aria.State.ACTIVEDESCENDANT,b?b.id:"")};goog.a11y.aria.getLabel=function(a){return goog.a11y.aria.getState(a,goog.a11y.aria.State.LABEL)};goog.a11y.aria.setLabel=function(a,b){goog.a11y.aria.setState(a,goog.a11y.aria.State.LABEL,b)};goog.ui.Dialog=function(a,b,c){goog.ui.ModalPopup.call(this,b,c);this.class_=a||"modal-dialog";this.buttons_=goog.ui.Dialog.ButtonSet.createOkCancel()};goog.inherits(goog.ui.Dialog,goog.ui.ModalPopup);goog.ui.Dialog.prototype.escapeToCancel_=!0;goog.ui.Dialog.prototype.hasTitleCloseButton_=!0;goog.ui.Dialog.prototype.modal_=!0;goog.ui.Dialog.prototype.draggable_=!0;goog.ui.Dialog.prototype.backgroundElementOpacity_=0.5;goog.ui.Dialog.prototype.title_="";goog.ui.Dialog.prototype.content_="";
goog.ui.Dialog.prototype.dragger_=null;goog.ui.Dialog.prototype.disposeOnHide_=!1;goog.ui.Dialog.prototype.titleEl_=null;goog.ui.Dialog.prototype.titleTextEl_=null;goog.ui.Dialog.prototype.titleId_=null;goog.ui.Dialog.prototype.titleCloseEl_=null;goog.ui.Dialog.prototype.contentEl_=null;goog.ui.Dialog.prototype.buttonEl_=null;goog.ui.Dialog.prototype.preferredAriaRole_=goog.a11y.aria.Role.DIALOG;goog.ui.Dialog.prototype.getCssClass=function(){return this.class_};
goog.ui.Dialog.prototype.setTitle=function(a){this.title_=a;this.titleTextEl_&&goog.dom.setTextContent(this.titleTextEl_,a)};goog.ui.Dialog.prototype.getTitle=function(){return this.title_};goog.ui.Dialog.prototype.setContent=function(a){this.content_=a;this.contentEl_&&(this.contentEl_.innerHTML=a)};goog.ui.Dialog.prototype.getContent=function(){return this.content_};goog.ui.Dialog.prototype.getPreferredAriaRole=function(){return this.preferredAriaRole_};
goog.ui.Dialog.prototype.setPreferredAriaRole=function(a){this.preferredAriaRole_=a};goog.ui.Dialog.prototype.renderIfNoDom_=function(){this.getElement()||this.render()};goog.ui.Dialog.prototype.getContentElement=function(){this.renderIfNoDom_();return this.contentEl_};goog.ui.Dialog.prototype.getTitleElement=function(){this.renderIfNoDom_();return this.titleEl_};goog.ui.Dialog.prototype.getTitleTextElement=function(){this.renderIfNoDom_();return this.titleTextEl_};
goog.ui.Dialog.prototype.getTitleCloseElement=function(){this.renderIfNoDom_();return this.titleCloseEl_};goog.ui.Dialog.prototype.getButtonElement=function(){this.renderIfNoDom_();return this.buttonEl_};goog.ui.Dialog.prototype.getDialogElement=function(){this.renderIfNoDom_();return this.getElement()};goog.ui.Dialog.prototype.getBackgroundElement=function(){this.renderIfNoDom_();return goog.ui.Dialog.superClass_.getBackgroundElement.call(this)};
goog.ui.Dialog.prototype.getBackgroundElementOpacity=function(){return this.backgroundElementOpacity_};goog.ui.Dialog.prototype.setBackgroundElementOpacity=function(a){this.backgroundElementOpacity_=a;this.getElement()&&(a=this.getBackgroundElement())&&goog.style.setOpacity(a,this.backgroundElementOpacity_)};goog.ui.Dialog.prototype.setModal=function(a){a!=this.modal_&&this.setModalInternal_(a)};
goog.ui.Dialog.prototype.setModalInternal_=function(a){this.modal_=a;if(this.isInDocument()){var b=this.getDomHelper(),c=this.getBackgroundElement(),f=this.getBackgroundIframe();a?(f&&b.insertSiblingBefore(f,this.getElement()),b.insertSiblingBefore(c,this.getElement())):(b.removeNode(f),b.removeNode(c))}};goog.ui.Dialog.prototype.getModal=function(){return this.modal_};goog.ui.Dialog.prototype.getClass=function(){return this.getCssClass()};
goog.ui.Dialog.prototype.setDraggable=function(a){this.draggable_=a;this.setDraggingEnabled_(a&&this.isInDocument())};goog.ui.Dialog.prototype.createDragger=function(){return new goog.fx.Dragger(this.getElement(),this.titleEl_)};goog.ui.Dialog.prototype.getDraggable=function(){return this.draggable_};
goog.ui.Dialog.prototype.setDraggingEnabled_=function(a){this.getElement()&&goog.dom.classes.enable(this.titleEl_,this.class_+"-title-draggable",a);a&&!this.dragger_?(this.dragger_=this.createDragger(),goog.dom.classes.add(this.titleEl_,this.class_+"-title-draggable"),goog.events.listen(this.dragger_,goog.fx.Dragger.EventType.START,this.setDraggerLimits_,!1,this)):!a&&this.dragger_&&(this.dragger_.dispose(),this.dragger_=null)};
goog.ui.Dialog.prototype.createDom=function(){goog.ui.Dialog.superClass_.createDom.call(this);var a=this.getElement();goog.asserts.assert(a,"getElement() returns null");var b=this.getDomHelper();this.titleEl_=b.createDom("div",{className:this.class_+"-title",id:this.getId()},this.titleTextEl_=b.createDom("span",this.class_+"-title-text",this.title_),this.titleCloseEl_=b.createDom("span",this.class_+"-title-close"));goog.dom.append(a,this.titleEl_,this.contentEl_=b.createDom("div",this.class_+"-content"),
this.buttonEl_=b.createDom("div",this.class_+"-buttons"));this.titleId_=this.titleEl_.id;goog.a11y.aria.setRole(a,this.getPreferredAriaRole());goog.a11y.aria.setState(a,goog.a11y.aria.State.LABELLEDBY,this.titleId_||"");this.content_&&(this.contentEl_.innerHTML=this.content_);goog.style.showElement(this.titleCloseEl_,this.hasTitleCloseButton_);this.buttons_&&this.buttons_.attachToElement(this.buttonEl_);goog.style.showElement(this.buttonEl_,!!this.buttons_);this.setBackgroundElementOpacity(this.backgroundElementOpacity_)};
goog.ui.Dialog.prototype.decorateInternal=function(a){goog.ui.Dialog.superClass_.decorateInternal.call(this,a);a=this.getElement();goog.asserts.assert(a,"The DOM element for dialog cannot be null.");var b=this.class_+"-content";(this.contentEl_=goog.dom.getElementsByTagNameAndClass(null,b,a)[0])?this.content_=this.contentEl_.innerHTML:(this.contentEl_=this.getDomHelper().createDom("div",b),this.content_&&(this.contentEl_.innerHTML=this.content_),a.appendChild(this.contentEl_));var b=this.class_+"-title",
c=this.class_+"-title-text",f=this.class_+"-title-close";(this.titleEl_=goog.dom.getElementsByTagNameAndClass(null,b,a)[0])?(this.titleTextEl_=goog.dom.getElementsByTagNameAndClass(null,c,this.titleEl_)[0],this.titleCloseEl_=goog.dom.getElementsByTagNameAndClass(null,f,this.titleEl_)[0],this.titleEl_.id||(this.titleEl_.id=this.getId())):(this.titleEl_=this.getDomHelper().createDom("div",{className:b,id:this.getId()}),a.insertBefore(this.titleEl_,this.contentEl_));this.titleId_=this.titleEl_.id;this.titleTextEl_?
this.title_=goog.dom.getTextContent(this.titleTextEl_):(this.titleTextEl_=this.getDomHelper().createDom("span",c,this.title_),this.titleEl_.appendChild(this.titleTextEl_));goog.a11y.aria.setState(a,goog.a11y.aria.State.LABELLEDBY,this.titleId_||"");this.titleCloseEl_||(this.titleCloseEl_=this.getDomHelper().createDom("span",f),this.titleEl_.appendChild(this.titleCloseEl_));goog.style.showElement(this.titleCloseEl_,this.hasTitleCloseButton_);b=this.class_+"-buttons";(this.buttonEl_=goog.dom.getElementsByTagNameAndClass(null,
b,a)[0])?(this.buttons_=new goog.ui.Dialog.ButtonSet(this.getDomHelper()),this.buttons_.decorate(this.buttonEl_)):(this.buttonEl_=this.getDomHelper().createDom("div",b),a.appendChild(this.buttonEl_),this.buttons_&&this.buttons_.attachToElement(this.buttonEl_),goog.style.showElement(this.buttonEl_,!!this.buttons_));this.setBackgroundElementOpacity(this.backgroundElementOpacity_)};
goog.ui.Dialog.prototype.enterDocument=function(){goog.ui.Dialog.superClass_.enterDocument.call(this);this.getHandler().listen(this.getElement(),goog.events.EventType.KEYDOWN,this.onKey_).listen(this.getElement(),goog.events.EventType.KEYPRESS,this.onKey_);this.getHandler().listen(this.buttonEl_,goog.events.EventType.CLICK,this.onButtonClick_);this.setDraggingEnabled_(this.draggable_);this.getHandler().listen(this.titleCloseEl_,goog.events.EventType.CLICK,this.onTitleCloseClick_);var a=this.getElement();
goog.asserts.assert(a,"The DOM element for dialog cannot be null");goog.a11y.aria.setRole(a,this.getPreferredAriaRole());""!==this.titleTextEl_.id&&goog.a11y.aria.setState(a,goog.a11y.aria.State.LABELLEDBY,this.titleTextEl_.id);this.modal_||this.setModalInternal_(!1)};goog.ui.Dialog.prototype.exitDocument=function(){this.isVisible()&&this.setVisible(!1);this.setDraggingEnabled_(!1);goog.ui.Dialog.superClass_.exitDocument.call(this)};
goog.ui.Dialog.prototype.setVisible=function(a){a!=this.isVisible()&&(this.isInDocument()||this.render(),goog.ui.Dialog.superClass_.setVisible.call(this,a))};goog.ui.Dialog.prototype.onShow=function(){goog.ui.Dialog.superClass_.onShow.call(this);this.dispatchEvent(goog.ui.Dialog.EventType.AFTER_SHOW)};goog.ui.Dialog.prototype.onHide=function(){goog.ui.Dialog.superClass_.onHide.call(this);this.dispatchEvent(goog.ui.Dialog.EventType.AFTER_HIDE);this.disposeOnHide_&&this.dispose()};
goog.ui.Dialog.prototype.focus=function(){goog.ui.Dialog.superClass_.focus.call(this);if(this.getButtonSet()){var a=this.getButtonSet().getDefault();if(a)for(var b=this.getDomHelper().getDocument(),c=this.buttonEl_.getElementsByTagName("button"),f=0,g;g=c[f];f++)if(g.name==a&&!g.disabled){try{if(goog.userAgent.WEBKIT||goog.userAgent.OPERA){var h=b.createElement("input");h.style.cssText="position:fixed;width:0;height:0;left:0;top:0;";this.getElement().appendChild(h);h.focus();this.getElement().removeChild(h)}g.focus()}catch(k){}break}}};
goog.ui.Dialog.prototype.setDraggerLimits_=function(a){var b=this.getDomHelper().getDocument();a=goog.dom.getWindow(b)||window;a=goog.dom.getViewportSize(a);var c=Math.max(b.body.scrollWidth,a.width),b=Math.max(b.body.scrollHeight,a.height),f=goog.style.getSize(this.getElement());"fixed"==goog.style.getComputedPosition(this.getElement())?this.dragger_.setLimits(new goog.math.Rect(0,0,Math.max(0,a.width-f.width),Math.max(0,a.height-f.height))):this.dragger_.setLimits(new goog.math.Rect(0,0,c-f.width,
b-f.height))};goog.ui.Dialog.prototype.onTitleCloseClick_=function(a){if(this.hasTitleCloseButton_){var b=this.getButtonSet();(a=b&&b.getCancel())?(b=b.get(a),this.dispatchEvent(new goog.ui.Dialog.Event(a,b))&&this.setVisible(!1)):this.setVisible(!1)}};goog.ui.Dialog.prototype.getHasTitleCloseButton=function(){return this.hasTitleCloseButton_};goog.ui.Dialog.prototype.setHasTitleCloseButton=function(a){this.hasTitleCloseButton_=a;this.titleCloseEl_&&goog.style.showElement(this.titleCloseEl_,this.hasTitleCloseButton_)};
goog.ui.Dialog.prototype.isEscapeToCancel=function(){return this.escapeToCancel_};goog.ui.Dialog.prototype.setEscapeToCancel=function(a){this.escapeToCancel_=a};goog.ui.Dialog.prototype.setDisposeOnHide=function(a){this.disposeOnHide_=a};goog.ui.Dialog.prototype.getDisposeOnHide=function(){return this.disposeOnHide_};goog.ui.Dialog.prototype.disposeInternal=function(){this.buttonEl_=this.titleCloseEl_=null;goog.ui.Dialog.superClass_.disposeInternal.call(this)};
goog.ui.Dialog.prototype.setButtonSet=function(a){this.buttons_=a;this.buttonEl_&&(this.buttons_?this.buttons_.attachToElement(this.buttonEl_):this.buttonEl_.innerHTML="",goog.style.showElement(this.buttonEl_,!!this.buttons_))};goog.ui.Dialog.prototype.getButtonSet=function(){return this.buttons_};goog.ui.Dialog.prototype.onButtonClick_=function(a){if((a=this.findParentButton_(a.target))&&!a.disabled){a=a.name;var b=this.getButtonSet().get(a);this.dispatchEvent(new goog.ui.Dialog.Event(a,b))&&this.setVisible(!1)}};
goog.ui.Dialog.prototype.findParentButton_=function(a){for(;null!=a&&a!=this.buttonEl_;){if("BUTTON"==a.tagName)return a;a=a.parentNode}return null};
goog.ui.Dialog.prototype.onKey_=function(a){var b=!1,c=!1,f=this.getButtonSet(),g=a.target;if(a.type==goog.events.EventType.KEYDOWN)if(this.escapeToCancel_&&a.keyCode==goog.events.KeyCodes.ESC){var h=f&&f.getCancel(),g="SELECT"==g.tagName&&!g.disabled;h&&!g?(c=!0,b=f.get(h),b=this.dispatchEvent(new goog.ui.Dialog.Event(h,b))):g||(b=!0)}else a.keyCode==goog.events.KeyCodes.TAB&&(a.shiftKey&&g==this.getElement())&&this.setupBackwardTabWrap();else if(a.keyCode==goog.events.KeyCodes.ENTER){if("BUTTON"==
g.tagName)h=g.name;else if(f){var k=f.getDefault(),l=k&&f.getButton(k),g=("TEXTAREA"==g.tagName||"SELECT"==g.tagName||"A"==g.tagName)&&!g.disabled;l&&(!l.disabled&&!g)&&(h=k)}h&&f&&(c=!0,b=this.dispatchEvent(new goog.ui.Dialog.Event(h,String(f.get(h)))))}if(b||c)a.stopPropagation(),a.preventDefault();b&&this.setVisible(!1)};goog.ui.Dialog.Event=function(a,b){this.type=goog.ui.Dialog.EventType.SELECT;this.key=a;this.caption=b};goog.inherits(goog.ui.Dialog.Event,goog.events.Event);
goog.ui.Dialog.SELECT_EVENT="dialogselect";goog.ui.Dialog.EventType={SELECT:"dialogselect",AFTER_HIDE:"afterhide",AFTER_SHOW:"aftershow"};goog.ui.Dialog.ButtonSet=function(a){this.dom_=a||goog.dom.getDomHelper();goog.structs.Map.call(this)};goog.inherits(goog.ui.Dialog.ButtonSet,goog.structs.Map);goog.ui.Dialog.ButtonSet.prototype.class_="goog-buttonset";goog.ui.Dialog.ButtonSet.prototype.defaultButton_=null;goog.ui.Dialog.ButtonSet.prototype.element_=null;
goog.ui.Dialog.ButtonSet.prototype.cancelButton_=null;goog.ui.Dialog.ButtonSet.prototype.set=function(a,b,c,f){goog.structs.Map.prototype.set.call(this,a,b);c&&(this.defaultButton_=a);f&&(this.cancelButton_=a);return this};goog.ui.Dialog.ButtonSet.prototype.addButton=function(a,b,c){return this.set(a.key,a.caption,b,c)};goog.ui.Dialog.ButtonSet.prototype.attachToElement=function(a){this.element_=a;this.render()};
goog.ui.Dialog.ButtonSet.prototype.render=function(){if(this.element_){this.element_.innerHTML="";var a=goog.dom.getDomHelper(this.element_);goog.structs.forEach(this,function(b,c){var f=a.createDom("button",{name:c},b);c==this.defaultButton_&&(f.className=this.class_+"-default");this.element_.appendChild(f)},this)}};
goog.ui.Dialog.ButtonSet.prototype.decorate=function(a){if(a&&a.nodeType==goog.dom.NodeType.ELEMENT){this.element_=a;a=this.element_.getElementsByTagName("button");for(var b=0,c,f,g;c=a[b];b++)if(f=c.name||c.id,g=goog.dom.getTextContent(c)||c.value,f){var h=0==b;this.set(f,g,h,c.name==goog.ui.Dialog.DefaultButtonKeys.CANCEL);h&&goog.dom.classes.add(c,this.class_+"-default")}}};goog.ui.Dialog.ButtonSet.prototype.getElement=function(){return this.element_};
goog.ui.Dialog.ButtonSet.prototype.getDomHelper=function(){return this.dom_};goog.ui.Dialog.ButtonSet.prototype.setDefault=function(a){this.defaultButton_=a};goog.ui.Dialog.ButtonSet.prototype.getDefault=function(){return this.defaultButton_};goog.ui.Dialog.ButtonSet.prototype.setCancel=function(a){this.cancelButton_=a};goog.ui.Dialog.ButtonSet.prototype.getCancel=function(){return this.cancelButton_};
goog.ui.Dialog.ButtonSet.prototype.getButton=function(a){for(var b=this.getAllButtons(),c=0,f;f=b[c];c++)if(f.name==a||f.id==a)return f;return null};goog.ui.Dialog.ButtonSet.prototype.getAllButtons=function(){return this.element_.getElementsByTagName(goog.dom.TagName.BUTTON)};goog.ui.Dialog.ButtonSet.prototype.setButtonEnabled=function(a,b){var c=this.getButton(a);c&&(c.disabled=!b)};
goog.ui.Dialog.ButtonSet.prototype.setAllButtonsEnabled=function(a){for(var b=this.getAllButtons(),c=0,f;f=b[c];c++)f.disabled=!a};goog.ui.Dialog.DefaultButtonKeys={OK:"ok",CANCEL:"cancel",YES:"yes",NO:"no",SAVE:"save",CONTINUE:"continue"};goog.ui.Dialog.MSG_DIALOG_OK_=goog.getMsg("OK");goog.ui.Dialog.MSG_DIALOG_CANCEL_=goog.getMsg("Cancel");goog.ui.Dialog.MSG_DIALOG_YES_=goog.getMsg("Yes");goog.ui.Dialog.MSG_DIALOG_NO_=goog.getMsg("No");goog.ui.Dialog.MSG_DIALOG_SAVE_=goog.getMsg("Save");
goog.ui.Dialog.MSG_DIALOG_CONTINUE_=goog.getMsg("Continue");goog.ui.Dialog.DefaultButtonCaptions={OK:goog.ui.Dialog.MSG_DIALOG_OK_,CANCEL:goog.ui.Dialog.MSG_DIALOG_CANCEL_,YES:goog.ui.Dialog.MSG_DIALOG_YES_,NO:goog.ui.Dialog.MSG_DIALOG_NO_,SAVE:goog.ui.Dialog.MSG_DIALOG_SAVE_,CONTINUE:goog.ui.Dialog.MSG_DIALOG_CONTINUE_};
goog.ui.Dialog.ButtonSet.DefaultButtons={OK:{key:goog.ui.Dialog.DefaultButtonKeys.OK,caption:goog.ui.Dialog.DefaultButtonCaptions.OK},CANCEL:{key:goog.ui.Dialog.DefaultButtonKeys.CANCEL,caption:goog.ui.Dialog.DefaultButtonCaptions.CANCEL},YES:{key:goog.ui.Dialog.DefaultButtonKeys.YES,caption:goog.ui.Dialog.DefaultButtonCaptions.YES},NO:{key:goog.ui.Dialog.DefaultButtonKeys.NO,caption:goog.ui.Dialog.DefaultButtonCaptions.NO},SAVE:{key:goog.ui.Dialog.DefaultButtonKeys.SAVE,caption:goog.ui.Dialog.DefaultButtonCaptions.SAVE},
CONTINUE:{key:goog.ui.Dialog.DefaultButtonKeys.CONTINUE,caption:goog.ui.Dialog.DefaultButtonCaptions.CONTINUE}};goog.ui.Dialog.ButtonSet.createOk=function(){return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK,!0,!0)};goog.ui.Dialog.ButtonSet.createOkCancel=function(){return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK,!0).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL,!1,!0)};
goog.ui.Dialog.ButtonSet.createYesNo=function(){return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES,!0).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO,!1,!0)};goog.ui.Dialog.ButtonSet.createYesNoCancel=function(){return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO,!0).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL,!1,!0)};
goog.ui.Dialog.ButtonSet.createContinueSaveCancel=function(){return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CONTINUE).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.SAVE).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL,!0,!0)};
(function(){"undefined"!=typeof document&&(goog.ui.Dialog.ButtonSet.OK=goog.ui.Dialog.ButtonSet.createOk(),goog.ui.Dialog.ButtonSet.OK_CANCEL=goog.ui.Dialog.ButtonSet.createOkCancel(),goog.ui.Dialog.ButtonSet.YES_NO=goog.ui.Dialog.ButtonSet.createYesNo(),goog.ui.Dialog.ButtonSet.YES_NO_CANCEL=goog.ui.Dialog.ButtonSet.createYesNoCancel(),goog.ui.Dialog.ButtonSet.CONTINUE_SAVE_CANCEL=goog.ui.Dialog.ButtonSet.createContinueSaveCancel())})();goog.graphics={};goog.graphics.Font=function(a,b){this.size=a;this.family=b};goog.graphics.Font.prototype.bold=!1;goog.graphics.Font.prototype.italic=!1;goog.events.InputHandler=function(a){goog.events.EventTarget.call(this);this.element_=a;a=goog.userAgent.IE||goog.userAgent.WEBKIT&&!goog.userAgent.isVersion("531")&&"TEXTAREA"==a.tagName;this.eventHandler_=new goog.events.EventHandler(this);this.eventHandler_.listen(this.element_,a?["keydown","paste","cut","drop","input"]:"input",this)};goog.inherits(goog.events.InputHandler,goog.events.EventTarget);goog.events.InputHandler.EventType={INPUT:"input"};goog.events.InputHandler.prototype.timer_=null;
goog.events.InputHandler.prototype.handleEvent=function(a){if("input"==a.type)this.cancelTimerIfSet_(),(!goog.userAgent.OPERA||this.element_==goog.dom.getOwnerDocument(this.element_).activeElement)&&this.dispatchEvent(this.createInputEvent_(a));else if("keydown"!=a.type||goog.events.KeyCodes.isTextModifyingKeyEvent(a)){var b="keydown"==a.type?this.element_.value:null;goog.userAgent.IE&&a.keyCode==goog.events.KeyCodes.WIN_IME&&(b=null);var c=this.createInputEvent_(a);this.cancelTimerIfSet_();this.timer_=
goog.Timer.callOnce(function(){this.timer_=null;this.element_.value!=b&&this.dispatchEvent(c)},0,this)}};goog.events.InputHandler.prototype.cancelTimerIfSet_=function(){null!=this.timer_&&(goog.Timer.clear(this.timer_),this.timer_=null)};goog.events.InputHandler.prototype.createInputEvent_=function(a){a=new goog.events.BrowserEvent(a.getBrowserEvent());a.type=goog.events.InputHandler.EventType.INPUT;return a};
goog.events.InputHandler.prototype.disposeInternal=function(){goog.events.InputHandler.superClass_.disposeInternal.call(this);this.eventHandler_.dispose();this.cancelTimerIfSet_();delete this.element_};goog.i18n={};goog.i18n.bidi={};goog.i18n.bidi.FORCE_RTL=!1;goog.i18n.bidi.IS_RTL=goog.i18n.bidi.FORCE_RTL||("ar"==goog.LOCALE.substring(0,2).toLowerCase()||"fa"==goog.LOCALE.substring(0,2).toLowerCase()||"he"==goog.LOCALE.substring(0,2).toLowerCase()||"iw"==goog.LOCALE.substring(0,2).toLowerCase()||"ur"==goog.LOCALE.substring(0,2).toLowerCase()||"yi"==goog.LOCALE.substring(0,2).toLowerCase())&&(2==goog.LOCALE.length||"-"==goog.LOCALE.substring(2,3)||"_"==goog.LOCALE.substring(2,3));
goog.i18n.bidi.Format={LRE:"\u202a",RLE:"\u202b",PDF:"\u202c",LRM:"\u200e",RLM:"\u200f"};goog.i18n.bidi.Dir={RTL:-1,UNKNOWN:0,LTR:1};goog.i18n.bidi.RIGHT="right";goog.i18n.bidi.LEFT="left";goog.i18n.bidi.I18N_RIGHT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.LEFT:goog.i18n.bidi.RIGHT;goog.i18n.bidi.I18N_LEFT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir=function(a){return"number"==typeof a?0<a?goog.i18n.bidi.Dir.LTR:0>a?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.UNKNOWN:a?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};goog.i18n.bidi.ltrChars_="A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";goog.i18n.bidi.rtlChars_="\u0591-\u07ff\ufb1d-\ufdff\ufe70-\ufefc";goog.i18n.bidi.htmlSkipReg_=/<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_=function(a,b){return b?a.replace(goog.i18n.bidi.htmlSkipReg_," "):a};goog.i18n.bidi.rtlCharReg_=RegExp("["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.ltrCharReg_=RegExp("["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.hasAnyRtl=function(a,b){return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.hasRtlChar=goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr=function(a,b){return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.ltrRe_=RegExp("^["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlRe_=RegExp("^["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.isRtlChar=function(a){return goog.i18n.bidi.rtlRe_.test(a)};goog.i18n.bidi.isLtrChar=function(a){return goog.i18n.bidi.ltrRe_.test(a)};goog.i18n.bidi.isNeutralChar=function(a){return!goog.i18n.bidi.isLtrChar(a)&&!goog.i18n.bidi.isRtlChar(a)};
goog.i18n.bidi.ltrDirCheckRe_=RegExp("^[^"+goog.i18n.bidi.rtlChars_+"]*["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlDirCheckRe_=RegExp("^[^"+goog.i18n.bidi.ltrChars_+"]*["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.startsWithRtl=function(a,b){return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlText=goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr=function(a,b){return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrText=goog.i18n.bidi.startsWithLtr;goog.i18n.bidi.isRequiredLtrRe_=/^http:\/\/.*/;goog.i18n.bidi.isNeutralText=function(a,b){a=goog.i18n.bidi.stripHtmlIfNeeded_(a,b);return goog.i18n.bidi.isRequiredLtrRe_.test(a)||!goog.i18n.bidi.hasAnyLtr(a)&&!goog.i18n.bidi.hasAnyRtl(a)};
goog.i18n.bidi.ltrExitDirCheckRe_=RegExp("["+goog.i18n.bidi.ltrChars_+"][^"+goog.i18n.bidi.rtlChars_+"]*$");goog.i18n.bidi.rtlExitDirCheckRe_=RegExp("["+goog.i18n.bidi.rtlChars_+"][^"+goog.i18n.bidi.ltrChars_+"]*$");goog.i18n.bidi.endsWithLtr=function(a,b){return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrExitText=goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl=function(a,b){return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlExitText=goog.i18n.bidi.endsWithRtl;goog.i18n.bidi.rtlLocalesRe_=RegExp("^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)","i");goog.i18n.bidi.isRtlLanguage=function(a){return goog.i18n.bidi.rtlLocalesRe_.test(a)};goog.i18n.bidi.bracketGuardHtmlRe_=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)/g;
goog.i18n.bidi.bracketGuardTextRe_=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;goog.i18n.bidi.guardBracketInHtml=function(a,b){return(void 0===b?goog.i18n.bidi.hasAnyRtl(a):b)?a.replace(goog.i18n.bidi.bracketGuardHtmlRe_,"<span dir=rtl>$&</span>"):a.replace(goog.i18n.bidi.bracketGuardHtmlRe_,"<span dir=ltr>$&</span>")};
goog.i18n.bidi.guardBracketInText=function(a,b){var c=(void 0===b?goog.i18n.bidi.hasAnyRtl(a):b)?goog.i18n.bidi.Format.RLM:goog.i18n.bidi.Format.LRM;return a.replace(goog.i18n.bidi.bracketGuardTextRe_,c+"$&"+c)};goog.i18n.bidi.enforceRtlInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+a+"</span>"};goog.i18n.bidi.enforceRtlInText=function(a){return goog.i18n.bidi.Format.RLE+a+goog.i18n.bidi.Format.PDF};
goog.i18n.bidi.enforceLtrInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=ltr"):"\n<span dir=ltr>"+a+"</span>"};goog.i18n.bidi.enforceLtrInText=function(a){return goog.i18n.bidi.Format.LRE+a+goog.i18n.bidi.Format.PDF};goog.i18n.bidi.dimensionsRe_=/:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;goog.i18n.bidi.leftRe_=/left/gi;goog.i18n.bidi.rightRe_=/right/gi;goog.i18n.bidi.tempRe_=/%%%%/g;
goog.i18n.bidi.mirrorCSS=function(a){return a.replace(goog.i18n.bidi.dimensionsRe_,":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_,"%%%%").replace(goog.i18n.bidi.rightRe_,goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_,goog.i18n.bidi.RIGHT)};goog.i18n.bidi.doubleQuoteSubstituteRe_=/([\u0591-\u05f2])"/g;goog.i18n.bidi.singleQuoteSubstituteRe_=/([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote=function(a){return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_,"$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_,"$1\u05f3")};goog.i18n.bidi.wordSeparatorRe_=/\s+/;goog.i18n.bidi.hasNumeralsRe_=/\d/;goog.i18n.bidi.rtlDetectionThreshold_=0.4;
goog.i18n.bidi.estimateDirection=function(a,b){for(var c=0,f=0,g=!1,h=goog.i18n.bidi.stripHtmlIfNeeded_(a,b).split(goog.i18n.bidi.wordSeparatorRe_),k=0;k<h.length;k++){var l=h[k];goog.i18n.bidi.startsWithRtl(l)?(c++,f++):goog.i18n.bidi.isRequiredLtrRe_.test(l)?g=!0:goog.i18n.bidi.hasAnyLtr(l)?f++:goog.i18n.bidi.hasNumeralsRe_.test(l)&&(g=!0)}return 0==f?g?goog.i18n.bidi.Dir.LTR:goog.i18n.bidi.Dir.UNKNOWN:c/f>goog.i18n.bidi.rtlDetectionThreshold_?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};
goog.i18n.bidi.detectRtlDirectionality=function(a,b){return goog.i18n.bidi.estimateDirection(a,b)==goog.i18n.bidi.Dir.RTL};goog.i18n.bidi.setElementDirAndAlign=function(a,b){if(a&&(b=goog.i18n.bidi.toDir(b))!=goog.i18n.bidi.Dir.UNKNOWN)a.style.textAlign=b==goog.i18n.bidi.Dir.RTL?"right":"left",a.dir=b==goog.i18n.bidi.Dir.RTL?"rtl":"ltr"};goog.ui.BidiInput=function(a){goog.ui.Component.call(this,a)};goog.inherits(goog.ui.BidiInput,goog.ui.Component);goog.ui.BidiInput.prototype.inputHandler_=null;goog.ui.BidiInput.prototype.decorateInternal=function(a){goog.ui.BidiInput.superClass_.decorateInternal.call(this,a);this.init_()};goog.ui.BidiInput.prototype.createDom=function(){this.setElementInternal(this.getDomHelper().createDom("input",{type:"text"}));this.init_()};
goog.ui.BidiInput.prototype.init_=function(){this.setDirection_();this.inputHandler_=new goog.events.InputHandler(this.getElement());goog.events.listen(this.inputHandler_,goog.events.InputHandler.EventType.INPUT,this.setDirection_,!1,this)};goog.ui.BidiInput.prototype.setDirection_=function(){var a=this.getElement();switch(goog.i18n.bidi.estimateDirection(a.value)){case goog.i18n.bidi.Dir.LTR:a.dir="ltr";break;case goog.i18n.bidi.Dir.RTL:a.dir="rtl";break;default:a.removeAttribute("dir")}};
goog.ui.BidiInput.prototype.getDirection=function(){var a=this.getElement().dir;""==a&&(a=null);return a};goog.ui.BidiInput.prototype.setValue=function(a){this.getElement().value=a;this.setDirection_()};goog.ui.BidiInput.prototype.getValue=function(){return this.getElement().value};goog.ui.BidiInput.prototype.disposeInternal=function(){this.inputHandler_&&(goog.events.removeAll(this.inputHandler_),this.inputHandler_.dispose(),this.inputHandler_=null,goog.ui.BidiInput.superClass_.disposeInternal.call(this))};goog.ui.ControlRenderer=function(){};goog.addSingletonGetter(goog.ui.ControlRenderer);goog.ui.ControlRenderer.getCustomRenderer=function(a,b){var c=new a;c.getCssClass=function(){return b};return c};goog.ui.ControlRenderer.CSS_CLASS="goog-control";goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS=[];goog.ui.ControlRenderer.prototype.getAriaRole=function(){};
goog.ui.ControlRenderer.prototype.createDom=function(a){var b=a.getDomHelper().createDom("div",this.getClassNames(a).join(" "),a.getContent());this.setAriaStates(a,b);return b};goog.ui.ControlRenderer.prototype.getContentElement=function(a){return a};
goog.ui.ControlRenderer.prototype.enableClassName=function(a,b,c){if(a=a.getElement?a.getElement():a)if(goog.userAgent.IE&&!goog.userAgent.isVersion("7")){var f=this.getAppliedCombinedClassNames_(goog.dom.classes.get(a),b);f.push(b);goog.partial(c?goog.dom.classes.add:goog.dom.classes.remove,a).apply(null,f)}else goog.dom.classes.enable(a,b,c)};goog.ui.ControlRenderer.prototype.enableExtraClassName=function(a,b,c){this.enableClassName(a,b,c)};goog.ui.ControlRenderer.prototype.canDecorate=function(a){return!0};
goog.ui.ControlRenderer.prototype.decorate=function(a,b){b.id&&a.setId(b.id);var c=this.getContentElement(b);c&&c.firstChild?a.setContentInternal(c.firstChild.nextSibling?goog.array.clone(c.childNodes):c.firstChild):a.setContentInternal(null);var f=0,g=this.getCssClass(),h=this.getStructuralCssClass(),k=!1,l=!1,c=!1,m=goog.dom.classes.get(b);goog.array.forEach(m,function(a){!k&&a==g?(k=!0,h==g&&(l=!0)):!l&&a==h?l=!0:f|=this.getStateFromClass(a)},this);a.setStateInternal(f);k||(m.push(g),h==g&&(l=
!0));l||m.push(h);var n=a.getExtraClassNames();n&&m.push.apply(m,n);if(goog.userAgent.IE&&!goog.userAgent.isVersion("7")){var p=this.getAppliedCombinedClassNames_(m);0<p.length&&(m.push.apply(m,p),c=!0)}(!k||!l||n||c)&&goog.dom.classes.set(b,m.join(" "));this.setAriaStates(a,b);return b};goog.ui.ControlRenderer.prototype.initializeDom=function(a){a.isRightToLeft()&&this.setRightToLeft(a.getElement(),!0);a.isEnabled()&&this.setFocusable(a,a.isVisible())};
goog.ui.ControlRenderer.prototype.setAriaRole=function(a,b){var c=b||this.getAriaRole();c&&(goog.asserts.assert(a,"The element passed as a first parameter cannot be null."),goog.a11y.aria.setRole(a,c))};
goog.ui.ControlRenderer.prototype.setAriaStates=function(a,b){goog.asserts.assert(a);goog.asserts.assert(b);a.isVisible()||goog.a11y.aria.setState(b,goog.a11y.aria.State.HIDDEN,!a.isVisible());a.isEnabled()||this.updateAriaState(b,goog.ui.Component.State.DISABLED,!a.isEnabled());a.isSupportedState(goog.ui.Component.State.SELECTED)&&this.updateAriaState(b,goog.ui.Component.State.SELECTED,a.isSelected());a.isSupportedState(goog.ui.Component.State.CHECKED)&&this.updateAriaState(b,goog.ui.Component.State.CHECKED,
a.isChecked());a.isSupportedState(goog.ui.Component.State.OPENED)&&this.updateAriaState(b,goog.ui.Component.State.OPENED,a.isOpen())};goog.ui.ControlRenderer.prototype.setAllowTextSelection=function(a,b){goog.style.setUnselectable(a,!b,!goog.userAgent.IE&&!goog.userAgent.OPERA)};goog.ui.ControlRenderer.prototype.setRightToLeft=function(a,b){this.enableClassName(a,this.getStructuralCssClass()+"-rtl",b)};
goog.ui.ControlRenderer.prototype.isFocusable=function(a){var b;return a.isSupportedState(goog.ui.Component.State.FOCUSED)&&(b=a.getKeyEventTarget())?goog.dom.isFocusableTabIndex(b):!1};goog.ui.ControlRenderer.prototype.setFocusable=function(a,b){var c;if(a.isSupportedState(goog.ui.Component.State.FOCUSED)&&(c=a.getKeyEventTarget())){if(!b&&a.isFocused()){try{c.blur()}catch(f){}a.isFocused()&&a.handleBlur(null)}goog.dom.isFocusableTabIndex(c)!=b&&goog.dom.setFocusableTabIndex(c,b)}};
goog.ui.ControlRenderer.prototype.setVisible=function(a,b){goog.style.showElement(a,b);a&&goog.a11y.aria.setState(a,goog.a11y.aria.State.HIDDEN,!b)};goog.ui.ControlRenderer.prototype.setState=function(a,b,c){var f=a.getElement();if(f){var g=this.getClassForState(b);g&&this.enableClassName(a,g,c);this.updateAriaState(f,b,c)}};
goog.ui.ControlRenderer.prototype.updateAriaState=function(a,b,c){goog.ui.ControlRenderer.ARIA_STATE_MAP_||(goog.ui.ControlRenderer.ARIA_STATE_MAP_=goog.object.create(goog.ui.Component.State.DISABLED,goog.a11y.aria.State.DISABLED,goog.ui.Component.State.SELECTED,goog.a11y.aria.State.SELECTED,goog.ui.Component.State.CHECKED,goog.a11y.aria.State.CHECKED,goog.ui.Component.State.OPENED,goog.a11y.aria.State.EXPANDED));if(b=goog.ui.ControlRenderer.ARIA_STATE_MAP_[b])goog.asserts.assert(a,"The element passed as a first parameter cannot be null."),
goog.a11y.aria.setState(a,b,c)};goog.ui.ControlRenderer.prototype.setContent=function(a,b){var c=this.getContentElement(a);if(c&&(goog.dom.removeChildren(c),b))if(goog.isString(b))goog.dom.setTextContent(c,b);else{var f=function(a){if(a){var b=goog.dom.getOwnerDocument(c);c.appendChild(goog.isString(a)?b.createTextNode(a):a)}};goog.isArray(b)?goog.array.forEach(b,f):goog.isArrayLike(b)&&!("nodeType"in b)?goog.array.forEach(goog.array.clone(b),f):f(b)}};
goog.ui.ControlRenderer.prototype.getKeyEventTarget=function(a){return a.getElement()};goog.ui.ControlRenderer.prototype.getCssClass=function(){return goog.ui.ControlRenderer.CSS_CLASS};goog.ui.ControlRenderer.prototype.getIe6ClassCombinations=function(){return[]};goog.ui.ControlRenderer.prototype.getStructuralCssClass=function(){return this.getCssClass()};
goog.ui.ControlRenderer.prototype.getClassNames=function(a){var b=this.getCssClass(),c=[b],f=this.getStructuralCssClass();f!=b&&c.push(f);b=this.getClassNamesForState(a.getState());c.push.apply(c,b);(a=a.getExtraClassNames())&&c.push.apply(c,a);goog.userAgent.IE&&!goog.userAgent.isVersion("7")&&c.push.apply(c,this.getAppliedCombinedClassNames_(c));return c};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_=function(a,b){var c=[];b&&(a=a.concat([b]));goog.array.forEach(this.getIe6ClassCombinations(),function(f){goog.array.every(f,goog.partial(goog.array.contains,a))&&(!b||goog.array.contains(f,b))&&c.push(f.join("_"))});return c};goog.ui.ControlRenderer.prototype.getClassNamesForState=function(a){for(var b=[];a;){var c=a&-a;b.push(this.getClassForState(c));a&=~c}return b};
goog.ui.ControlRenderer.prototype.getClassForState=function(a){this.classByState_||this.createClassByStateMap_();return this.classByState_[a]};goog.ui.ControlRenderer.prototype.getStateFromClass=function(a){this.stateByClass_||this.createStateByClassMap_();a=parseInt(this.stateByClass_[a],10);return isNaN(a)?0:a};
goog.ui.ControlRenderer.prototype.createClassByStateMap_=function(){var a=this.getStructuralCssClass();this.classByState_=goog.object.create(goog.ui.Component.State.DISABLED,a+"-disabled",goog.ui.Component.State.HOVER,a+"-hover",goog.ui.Component.State.ACTIVE,a+"-active",goog.ui.Component.State.SELECTED,a+"-selected",goog.ui.Component.State.CHECKED,a+"-checked",goog.ui.Component.State.FOCUSED,a+"-focused",goog.ui.Component.State.OPENED,a+"-open")};
goog.ui.ControlRenderer.prototype.createStateByClassMap_=function(){this.classByState_||this.createClassByStateMap_();this.stateByClass_=goog.object.transpose(this.classByState_)};goog.ui.CheckboxRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.CheckboxRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.CheckboxRenderer);goog.ui.CheckboxRenderer.CSS_CLASS="goog-checkbox";goog.ui.CheckboxRenderer.prototype.createDom=function(a){var b=a.getDomHelper().createDom("span",this.getClassNames(a).join(" "));a=a.getChecked();this.setCheckboxState(b,a);return b};
goog.ui.CheckboxRenderer.prototype.decorate=function(a,b){b=goog.ui.CheckboxRenderer.superClass_.decorate.call(this,a,b);var c=goog.dom.classes.get(b),f=goog.ui.Checkbox.State.UNCHECKED;goog.array.contains(c,this.getClassForCheckboxState(goog.ui.Checkbox.State.UNDETERMINED))?f=goog.ui.Checkbox.State.UNDETERMINED:goog.array.contains(c,this.getClassForCheckboxState(goog.ui.Checkbox.State.CHECKED))?f=goog.ui.Checkbox.State.CHECKED:goog.array.contains(c,this.getClassForCheckboxState(goog.ui.Checkbox.State.UNCHECKED))&&
(f=goog.ui.Checkbox.State.UNCHECKED);a.setCheckedInternal(f);goog.asserts.assert(b,"The element cannot be null.");goog.a11y.aria.setState(b,goog.a11y.aria.State.CHECKED,this.ariaStateFromCheckState_(f));return b};goog.ui.CheckboxRenderer.prototype.getAriaRole=function(){return goog.a11y.aria.Role.CHECKBOX};
goog.ui.CheckboxRenderer.prototype.setCheckboxState=function(a,b){if(a){var c=this.getClassForCheckboxState(b);goog.asserts.assert(c);goog.dom.classes.has(a,c)||(goog.object.forEach(goog.ui.Checkbox.State,function(b){b=this.getClassForCheckboxState(b);goog.dom.classes.enable(a,b,b==c)},this),goog.a11y.aria.setState(a,goog.a11y.aria.State.CHECKED,this.ariaStateFromCheckState_(b)))}};
goog.ui.CheckboxRenderer.prototype.ariaStateFromCheckState_=function(a){return a==goog.ui.Checkbox.State.UNDETERMINED?"mixed":a==goog.ui.Checkbox.State.CHECKED?"true":"false"};goog.ui.CheckboxRenderer.prototype.getCssClass=function(){return goog.ui.CheckboxRenderer.CSS_CLASS};
goog.ui.CheckboxRenderer.prototype.getClassForCheckboxState=function(a){var b=this.getStructuralCssClass();if(a==goog.ui.Checkbox.State.CHECKED)return b+"-checked";if(a==goog.ui.Checkbox.State.UNCHECKED)return b+"-unchecked";if(a==goog.ui.Checkbox.State.UNDETERMINED)return b+"-undetermined";throw Error("Invalid checkbox state: "+a);};goog.ui.registry={};goog.ui.registry.getDefaultRenderer=function(a){for(var b;a;){b=goog.getUid(a);if(b=goog.ui.registry.defaultRenderers_[b])break;a=a.superClass_?a.superClass_.constructor:null}return b?goog.isFunction(b.getInstance)?b.getInstance():new b:null};
goog.ui.registry.setDefaultRenderer=function(a,b){if(!goog.isFunction(a))throw Error("Invalid component class "+a);if(!goog.isFunction(b))throw Error("Invalid renderer class "+b);var c=goog.getUid(a);goog.ui.registry.defaultRenderers_[c]=b};goog.ui.registry.getDecoratorByClassName=function(a){return a in goog.ui.registry.decoratorFunctions_?goog.ui.registry.decoratorFunctions_[a]():null};
goog.ui.registry.setDecoratorByClassName=function(a,b){if(!a)throw Error("Invalid class name "+a);if(!goog.isFunction(b))throw Error("Invalid decorator function "+b);goog.ui.registry.decoratorFunctions_[a]=b};goog.ui.registry.getDecorator=function(a){for(var b=goog.dom.classes.get(a),c=0,f=b.length;c<f;c++)if(a=goog.ui.registry.getDecoratorByClassName(b[c]))return a;return null};goog.ui.registry.reset=function(){goog.ui.registry.defaultRenderers_={};goog.ui.registry.decoratorFunctions_={}};
goog.ui.registry.defaultRenderers_={};goog.ui.registry.decoratorFunctions_={};goog.ui.decorate=function(a){var b=goog.ui.registry.getDecorator(a);b&&b.decorate(a);return b};goog.events.KeyHandler=function(a,b){goog.events.EventTarget.call(this);a&&this.attach(a,b)};goog.inherits(goog.events.KeyHandler,goog.events.EventTarget);goog.events.KeyHandler.prototype.element_=null;goog.events.KeyHandler.prototype.keyPressKey_=null;goog.events.KeyHandler.prototype.keyDownKey_=null;goog.events.KeyHandler.prototype.keyUpKey_=null;goog.events.KeyHandler.prototype.lastKey_=-1;goog.events.KeyHandler.prototype.keyCode_=-1;goog.events.KeyHandler.prototype.altKey_=!1;
goog.events.KeyHandler.EventType={KEY:"key"};
goog.events.KeyHandler.safariKey_={3:goog.events.KeyCodes.ENTER,12:goog.events.KeyCodes.NUMLOCK,63232:goog.events.KeyCodes.UP,63233:goog.events.KeyCodes.DOWN,63234:goog.events.KeyCodes.LEFT,63235:goog.events.KeyCodes.RIGHT,63236:goog.events.KeyCodes.F1,63237:goog.events.KeyCodes.F2,63238:goog.events.KeyCodes.F3,63239:goog.events.KeyCodes.F4,63240:goog.events.KeyCodes.F5,63241:goog.events.KeyCodes.F6,63242:goog.events.KeyCodes.F7,63243:goog.events.KeyCodes.F8,63244:goog.events.KeyCodes.F9,63245:goog.events.KeyCodes.F10,
63246:goog.events.KeyCodes.F11,63247:goog.events.KeyCodes.F12,63248:goog.events.KeyCodes.PRINT_SCREEN,63272:goog.events.KeyCodes.DELETE,63273:goog.events.KeyCodes.HOME,63275:goog.events.KeyCodes.END,63276:goog.events.KeyCodes.PAGE_UP,63277:goog.events.KeyCodes.PAGE_DOWN,63289:goog.events.KeyCodes.NUMLOCK,63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_={Up:goog.events.KeyCodes.UP,Down:goog.events.KeyCodes.DOWN,Left:goog.events.KeyCodes.LEFT,Right:goog.events.KeyCodes.RIGHT,Enter:goog.events.KeyCodes.ENTER,F1:goog.events.KeyCodes.F1,F2:goog.events.KeyCodes.F2,F3:goog.events.KeyCodes.F3,F4:goog.events.KeyCodes.F4,F5:goog.events.KeyCodes.F5,F6:goog.events.KeyCodes.F6,F7:goog.events.KeyCodes.F7,F8:goog.events.KeyCodes.F8,F9:goog.events.KeyCodes.F9,F10:goog.events.KeyCodes.F10,F11:goog.events.KeyCodes.F11,F12:goog.events.KeyCodes.F12,
"U+007F":goog.events.KeyCodes.DELETE,Home:goog.events.KeyCodes.HOME,End:goog.events.KeyCodes.END,PageUp:goog.events.KeyCodes.PAGE_UP,PageDown:goog.events.KeyCodes.PAGE_DOWN,Insert:goog.events.KeyCodes.INSERT};goog.events.KeyHandler.USES_KEYDOWN_=goog.userAgent.IE||goog.userAgent.WEBKIT&&goog.userAgent.isVersion("525");goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_=goog.userAgent.MAC&&goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_=function(a){if(goog.userAgent.WEBKIT&&(this.lastKey_==goog.events.KeyCodes.CTRL&&!a.ctrlKey||this.lastKey_==goog.events.KeyCodes.ALT&&!a.altKey||goog.userAgent.MAC&&this.lastKey_==goog.events.KeyCodes.META&&!a.metaKey))this.keyCode_=this.lastKey_=-1;-1==this.lastKey_&&(a.ctrlKey&&a.keyCode!=goog.events.KeyCodes.CTRL?this.lastKey_=goog.events.KeyCodes.CTRL:a.altKey&&a.keyCode!=goog.events.KeyCodes.ALT?this.lastKey_=goog.events.KeyCodes.ALT:a.metaKey&&
a.keyCode!=goog.events.KeyCodes.META&&(this.lastKey_=goog.events.KeyCodes.META));goog.events.KeyHandler.USES_KEYDOWN_&&!goog.events.KeyCodes.firesKeyPressEvent(a.keyCode,this.lastKey_,a.shiftKey,a.ctrlKey,a.altKey)?this.handleEvent(a):(this.keyCode_=goog.userAgent.GECKO?goog.events.KeyCodes.normalizeGeckoKeyCode(a.keyCode):a.keyCode,goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_&&(this.altKey_=a.altKey))};goog.events.KeyHandler.prototype.resetState=function(){this.keyCode_=this.lastKey_=-1};
goog.events.KeyHandler.prototype.handleKeyup_=function(a){this.resetState();this.altKey_=a.altKey};
goog.events.KeyHandler.prototype.handleEvent=function(a){var b=a.getBrowserEvent(),c,f,g=b.altKey;goog.userAgent.IE&&a.type==goog.events.EventType.KEYPRESS?(c=this.keyCode_,f=c!=goog.events.KeyCodes.ENTER&&c!=goog.events.KeyCodes.ESC?b.keyCode:0):goog.userAgent.WEBKIT&&a.type==goog.events.EventType.KEYPRESS?(c=this.keyCode_,f=0<=b.charCode&&63232>b.charCode&&goog.events.KeyCodes.isCharacterKey(c)?b.charCode:0):goog.userAgent.OPERA?(c=this.keyCode_,f=goog.events.KeyCodes.isCharacterKey(c)?b.keyCode:
0):(c=b.keyCode||this.keyCode_,f=b.charCode||0,goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_&&(g=this.altKey_),goog.userAgent.MAC&&(f==goog.events.KeyCodes.QUESTION_MARK&&c==goog.events.KeyCodes.WIN_KEY)&&(c=goog.events.KeyCodes.SLASH));var h=c,k=b.keyIdentifier;c?63232<=c&&c in goog.events.KeyHandler.safariKey_?h=goog.events.KeyHandler.safariKey_[c]:25==c&&a.shiftKey&&(h=9):k&&k in goog.events.KeyHandler.keyIdentifier_&&(h=goog.events.KeyHandler.keyIdentifier_[k]);a=h==this.lastKey_;this.lastKey_=
h;b=new goog.events.KeyEvent(h,f,a,b);b.altKey=g;this.dispatchEvent(b)};goog.events.KeyHandler.prototype.getElement=function(){return this.element_};
goog.events.KeyHandler.prototype.attach=function(a,b){this.keyUpKey_&&this.detach();this.element_=a;this.keyPressKey_=goog.events.listen(this.element_,goog.events.EventType.KEYPRESS,this,b);this.keyDownKey_=goog.events.listen(this.element_,goog.events.EventType.KEYDOWN,this.handleKeyDown_,b,this);this.keyUpKey_=goog.events.listen(this.element_,goog.events.EventType.KEYUP,this.handleKeyup_,b,this)};
goog.events.KeyHandler.prototype.detach=function(){this.keyPressKey_&&(goog.events.unlistenByKey(this.keyPressKey_),goog.events.unlistenByKey(this.keyDownKey_),goog.events.unlistenByKey(this.keyUpKey_),this.keyUpKey_=this.keyDownKey_=this.keyPressKey_=null);this.element_=null;this.keyCode_=this.lastKey_=-1};goog.events.KeyHandler.prototype.disposeInternal=function(){goog.events.KeyHandler.superClass_.disposeInternal.call(this);this.detach()};
goog.events.KeyEvent=function(a,b,c,f){goog.events.BrowserEvent.call(this,f);this.type=goog.events.KeyHandler.EventType.KEY;this.keyCode=a;this.charCode=b;this.repeat=c};goog.inherits(goog.events.KeyEvent,goog.events.BrowserEvent);goog.ui.Control=function(a,b,c){goog.ui.Component.call(this,c);this.renderer_=b||goog.ui.registry.getDefaultRenderer(this.constructor);this.setContentInternal(a)};goog.inherits(goog.ui.Control,goog.ui.Component);goog.ui.Control.registerDecorator=goog.ui.registry.setDecoratorByClassName;goog.ui.Control.getDecorator=goog.ui.registry.getDecorator;goog.ui.Control.decorate=goog.ui.decorate;goog.ui.Control.prototype.content_=null;goog.ui.Control.prototype.state_=0;
goog.ui.Control.prototype.supportedStates_=goog.ui.Component.State.DISABLED|goog.ui.Component.State.HOVER|goog.ui.Component.State.ACTIVE|goog.ui.Component.State.FOCUSED;goog.ui.Control.prototype.autoStates_=goog.ui.Component.State.ALL;goog.ui.Control.prototype.statesWithTransitionEvents_=0;goog.ui.Control.prototype.visible_=!0;goog.ui.Control.prototype.extraClassNames_=null;goog.ui.Control.prototype.handleMouseEvents_=!0;goog.ui.Control.prototype.allowTextSelection_=!1;
goog.ui.Control.prototype.preferredAriaRole_=null;goog.ui.Control.prototype.isHandleMouseEvents=function(){return this.handleMouseEvents_};goog.ui.Control.prototype.setHandleMouseEvents=function(a){this.isInDocument()&&a!=this.handleMouseEvents_&&this.enableMouseEventHandling_(a);this.handleMouseEvents_=a};goog.ui.Control.prototype.getKeyEventTarget=function(){return this.renderer_.getKeyEventTarget(this)};
goog.ui.Control.prototype.getKeyHandler=function(){return this.keyHandler_||(this.keyHandler_=new goog.events.KeyHandler)};goog.ui.Control.prototype.getRenderer=function(){return this.renderer_};goog.ui.Control.prototype.setRenderer=function(a){if(this.isInDocument())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.getElement()&&this.setElementInternal(null);this.renderer_=a};goog.ui.Control.prototype.getExtraClassNames=function(){return this.extraClassNames_};
goog.ui.Control.prototype.addClassName=function(a){a&&(this.extraClassNames_?goog.array.contains(this.extraClassNames_,a)||this.extraClassNames_.push(a):this.extraClassNames_=[a],this.renderer_.enableExtraClassName(this,a,!0))};goog.ui.Control.prototype.removeClassName=function(a){a&&this.extraClassNames_&&(goog.array.remove(this.extraClassNames_,a),0==this.extraClassNames_.length&&(this.extraClassNames_=null),this.renderer_.enableExtraClassName(this,a,!1))};
goog.ui.Control.prototype.enableClassName=function(a,b){b?this.addClassName(a):this.removeClassName(a)};goog.ui.Control.prototype.createDom=function(){var a=this.renderer_.createDom(this);this.setElementInternal(a);this.renderer_.setAriaRole(a,this.getPreferredAriaRole());this.isAllowTextSelection()||this.renderer_.setAllowTextSelection(a,!1);this.isVisible()||this.renderer_.setVisible(a,!1)};goog.ui.Control.prototype.getPreferredAriaRole=function(){return this.preferredAriaRole_};
goog.ui.Control.prototype.setPreferredAriaRole=function(a){this.preferredAriaRole_=a};goog.ui.Control.prototype.getContentElement=function(){return this.renderer_.getContentElement(this.getElement())};goog.ui.Control.prototype.canDecorate=function(a){return this.renderer_.canDecorate(a)};
goog.ui.Control.prototype.decorateInternal=function(a){a=this.renderer_.decorate(this,a);this.setElementInternal(a);this.renderer_.setAriaRole(a,this.getPreferredAriaRole());this.isAllowTextSelection()||this.renderer_.setAllowTextSelection(a,!1);this.visible_="none"!=a.style.display};
goog.ui.Control.prototype.enterDocument=function(){goog.ui.Control.superClass_.enterDocument.call(this);this.renderer_.initializeDom(this);if(this.supportedStates_&~goog.ui.Component.State.DISABLED&&(this.isHandleMouseEvents()&&this.enableMouseEventHandling_(!0),this.isSupportedState(goog.ui.Component.State.FOCUSED))){var a=this.getKeyEventTarget();if(a){var b=this.getKeyHandler();b.attach(a);this.getHandler().listen(b,goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent).listen(a,goog.events.EventType.FOCUS,
this.handleFocus).listen(a,goog.events.EventType.BLUR,this.handleBlur)}}};
goog.ui.Control.prototype.enableMouseEventHandling_=function(a){var b=this.getHandler(),c=this.getElement();a?(b.listen(c,goog.events.EventType.MOUSEOVER,this.handleMouseOver).listen(c,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).listen(c,goog.events.EventType.MOUSEUP,this.handleMouseUp).listen(c,goog.events.EventType.MOUSEOUT,this.handleMouseOut),this.handleContextMenu!=goog.nullFunction&&b.listen(c,goog.events.EventType.CONTEXTMENU,this.handleContextMenu),goog.userAgent.IE&&b.listen(c,
goog.events.EventType.DBLCLICK,this.handleDblClick)):(b.unlisten(c,goog.events.EventType.MOUSEOVER,this.handleMouseOver).unlisten(c,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).unlisten(c,goog.events.EventType.MOUSEUP,this.handleMouseUp).unlisten(c,goog.events.EventType.MOUSEOUT,this.handleMouseOut),this.handleContextMenu!=goog.nullFunction&&b.unlisten(c,goog.events.EventType.CONTEXTMENU,this.handleContextMenu),goog.userAgent.IE&&b.unlisten(c,goog.events.EventType.DBLCLICK,this.handleDblClick))};
goog.ui.Control.prototype.exitDocument=function(){goog.ui.Control.superClass_.exitDocument.call(this);this.keyHandler_&&this.keyHandler_.detach();this.isVisible()&&this.isEnabled()&&this.renderer_.setFocusable(this,!1)};goog.ui.Control.prototype.disposeInternal=function(){goog.ui.Control.superClass_.disposeInternal.call(this);this.keyHandler_&&(this.keyHandler_.dispose(),delete this.keyHandler_);delete this.renderer_;this.extraClassNames_=this.content_=null};goog.ui.Control.prototype.getContent=function(){return this.content_};
goog.ui.Control.prototype.setContent=function(a){this.renderer_.setContent(this.getElement(),a);this.setContentInternal(a)};goog.ui.Control.prototype.setContentInternal=function(a){this.content_=a};goog.ui.Control.prototype.getCaption=function(){var a=this.getContent();if(!a)return"";a=goog.isString(a)?a:goog.isArray(a)?goog.array.map(a,goog.dom.getRawTextContent).join(""):goog.dom.getTextContent(a);return goog.string.collapseBreakingSpaces(a)};goog.ui.Control.prototype.setCaption=function(a){this.setContent(a)};
goog.ui.Control.prototype.setRightToLeft=function(a){goog.ui.Control.superClass_.setRightToLeft.call(this,a);var b=this.getElement();b&&this.renderer_.setRightToLeft(b,a)};goog.ui.Control.prototype.isAllowTextSelection=function(){return this.allowTextSelection_};goog.ui.Control.prototype.setAllowTextSelection=function(a){this.allowTextSelection_=a;var b=this.getElement();b&&this.renderer_.setAllowTextSelection(b,a)};goog.ui.Control.prototype.isVisible=function(){return this.visible_};
goog.ui.Control.prototype.setVisible=function(a,b){if(b||this.visible_!=a&&this.dispatchEvent(a?goog.ui.Component.EventType.SHOW:goog.ui.Component.EventType.HIDE)){var c=this.getElement();c&&this.renderer_.setVisible(c,a);this.isEnabled()&&this.renderer_.setFocusable(this,a);this.visible_=a;return!0}return!1};goog.ui.Control.prototype.isEnabled=function(){return!this.hasState(goog.ui.Component.State.DISABLED)};
goog.ui.Control.prototype.isParentDisabled_=function(){var a=this.getParent();return!!a&&"function"==typeof a.isEnabled&&!a.isEnabled()};goog.ui.Control.prototype.setEnabled=function(a){!this.isParentDisabled_()&&this.isTransitionAllowed(goog.ui.Component.State.DISABLED,!a)&&(a||(this.setActive(!1),this.setHighlighted(!1)),this.isVisible()&&this.renderer_.setFocusable(this,a),this.setState(goog.ui.Component.State.DISABLED,!a))};goog.ui.Control.prototype.isHighlighted=function(){return this.hasState(goog.ui.Component.State.HOVER)};
goog.ui.Control.prototype.setHighlighted=function(a){this.isTransitionAllowed(goog.ui.Component.State.HOVER,a)&&this.setState(goog.ui.Component.State.HOVER,a)};goog.ui.Control.prototype.isActive=function(){return this.hasState(goog.ui.Component.State.ACTIVE)};goog.ui.Control.prototype.setActive=function(a){this.isTransitionAllowed(goog.ui.Component.State.ACTIVE,a)&&this.setState(goog.ui.Component.State.ACTIVE,a)};goog.ui.Control.prototype.isSelected=function(){return this.hasState(goog.ui.Component.State.SELECTED)};
goog.ui.Control.prototype.setSelected=function(a){this.isTransitionAllowed(goog.ui.Component.State.SELECTED,a)&&this.setState(goog.ui.Component.State.SELECTED,a)};goog.ui.Control.prototype.isChecked=function(){return this.hasState(goog.ui.Component.State.CHECKED)};goog.ui.Control.prototype.setChecked=function(a){this.isTransitionAllowed(goog.ui.Component.State.CHECKED,a)&&this.setState(goog.ui.Component.State.CHECKED,a)};goog.ui.Control.prototype.isFocused=function(){return this.hasState(goog.ui.Component.State.FOCUSED)};
goog.ui.Control.prototype.setFocused=function(a){this.isTransitionAllowed(goog.ui.Component.State.FOCUSED,a)&&this.setState(goog.ui.Component.State.FOCUSED,a)};goog.ui.Control.prototype.isOpen=function(){return this.hasState(goog.ui.Component.State.OPENED)};goog.ui.Control.prototype.setOpen=function(a){this.isTransitionAllowed(goog.ui.Component.State.OPENED,a)&&this.setState(goog.ui.Component.State.OPENED,a)};goog.ui.Control.prototype.getState=function(){return this.state_};
goog.ui.Control.prototype.hasState=function(a){return!!(this.state_&a)};goog.ui.Control.prototype.setState=function(a,b){this.isSupportedState(a)&&b!=this.hasState(a)&&(this.renderer_.setState(this,a,b),this.state_=b?this.state_|a:this.state_&~a)};goog.ui.Control.prototype.setStateInternal=function(a){this.state_=a};goog.ui.Control.prototype.isSupportedState=function(a){return!!(this.supportedStates_&a)};
goog.ui.Control.prototype.setSupportedState=function(a,b){if(this.isInDocument()&&this.hasState(a)&&!b)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);!b&&this.hasState(a)&&this.setState(a,!1);this.supportedStates_=b?this.supportedStates_|a:this.supportedStates_&~a};goog.ui.Control.prototype.isAutoState=function(a){return!!(this.autoStates_&a)&&this.isSupportedState(a)};goog.ui.Control.prototype.setAutoStates=function(a,b){this.autoStates_=b?this.autoStates_|a:this.autoStates_&~a};
goog.ui.Control.prototype.isDispatchTransitionEvents=function(a){return!!(this.statesWithTransitionEvents_&a)&&this.isSupportedState(a)};goog.ui.Control.prototype.setDispatchTransitionEvents=function(a,b){this.statesWithTransitionEvents_=b?this.statesWithTransitionEvents_|a:this.statesWithTransitionEvents_&~a};
goog.ui.Control.prototype.isTransitionAllowed=function(a,b){return this.isSupportedState(a)&&this.hasState(a)!=b&&(!(this.statesWithTransitionEvents_&a)||this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a,b)))&&!this.isDisposed()};goog.ui.Control.prototype.handleMouseOver=function(a){!goog.ui.Control.isMouseEventWithinElement_(a,this.getElement())&&(this.dispatchEvent(goog.ui.Component.EventType.ENTER)&&this.isEnabled()&&this.isAutoState(goog.ui.Component.State.HOVER))&&this.setHighlighted(!0)};
goog.ui.Control.prototype.handleMouseOut=function(a){!goog.ui.Control.isMouseEventWithinElement_(a,this.getElement())&&this.dispatchEvent(goog.ui.Component.EventType.LEAVE)&&(this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!1),this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!1))};goog.ui.Control.prototype.handleContextMenu=goog.nullFunction;goog.ui.Control.isMouseEventWithinElement_=function(a,b){return!!a.relatedTarget&&goog.dom.contains(b,a.relatedTarget)};
goog.ui.Control.prototype.handleMouseDown=function(a){this.isEnabled()&&(this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!0),a.isMouseActionButton()&&(this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!0),this.renderer_.isFocusable(this)&&this.getKeyEventTarget().focus()));!this.isAllowTextSelection()&&a.isMouseActionButton()&&a.preventDefault()};
goog.ui.Control.prototype.handleMouseUp=function(a){this.isEnabled()&&(this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!0),this.isActive()&&(this.performActionInternal(a)&&this.isAutoState(goog.ui.Component.State.ACTIVE))&&this.setActive(!1))};goog.ui.Control.prototype.handleDblClick=function(a){this.isEnabled()&&this.performActionInternal(a)};
goog.ui.Control.prototype.performActionInternal=function(a){this.isAutoState(goog.ui.Component.State.CHECKED)&&this.setChecked(!this.isChecked());this.isAutoState(goog.ui.Component.State.SELECTED)&&this.setSelected(!0);this.isAutoState(goog.ui.Component.State.OPENED)&&this.setOpen(!this.isOpen());var b=new goog.events.Event(goog.ui.Component.EventType.ACTION,this);a&&(b.altKey=a.altKey,b.ctrlKey=a.ctrlKey,b.metaKey=a.metaKey,b.shiftKey=a.shiftKey,b.platformModifierKey=a.platformModifierKey);return this.dispatchEvent(b)};
goog.ui.Control.prototype.handleFocus=function(a){this.isAutoState(goog.ui.Component.State.FOCUSED)&&this.setFocused(!0)};goog.ui.Control.prototype.handleBlur=function(a){this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!1);this.isAutoState(goog.ui.Component.State.FOCUSED)&&this.setFocused(!1)};goog.ui.Control.prototype.handleKeyEvent=function(a){return this.isVisible()&&this.isEnabled()&&this.handleKeyEventInternal(a)?(a.preventDefault(),a.stopPropagation(),!0):!1};
goog.ui.Control.prototype.handleKeyEventInternal=function(a){return a.keyCode==goog.events.KeyCodes.ENTER&&this.performActionInternal(a)};goog.ui.registry.setDefaultRenderer(goog.ui.Control,goog.ui.ControlRenderer);goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS,function(){return new goog.ui.Control(null)});goog.ui.Checkbox=function(a,b,c){c=c||goog.ui.CheckboxRenderer.getInstance();goog.ui.Control.call(this,null,c,b);this.checked_=goog.isDef(a)?a:goog.ui.Checkbox.State.UNCHECKED};goog.inherits(goog.ui.Checkbox,goog.ui.Control);goog.ui.Checkbox.State={CHECKED:!0,UNCHECKED:!1,UNDETERMINED:null};goog.ui.Checkbox.prototype.label_=null;goog.ui.Checkbox.prototype.getChecked=function(){return this.checked_};goog.ui.Checkbox.prototype.isChecked=function(){return this.checked_==goog.ui.Checkbox.State.CHECKED};
goog.ui.Checkbox.prototype.isUnchecked=function(){return this.checked_==goog.ui.Checkbox.State.UNCHECKED};goog.ui.Checkbox.prototype.isUndetermined=function(){return this.checked_==goog.ui.Checkbox.State.UNDETERMINED};goog.ui.Checkbox.prototype.setChecked=function(a){a!=this.checked_&&(this.checked_=a,this.getRenderer().setCheckboxState(this.getElement(),this.checked_))};goog.ui.Checkbox.prototype.setCheckedInternal=function(a){this.checked_=a};
goog.ui.Checkbox.prototype.setLabel=function(a){this.isInDocument()?(this.exitDocument(),this.label_=a,this.enterDocument()):this.label_=a};goog.ui.Checkbox.prototype.toggle=function(){this.setChecked(this.checked_?goog.ui.Checkbox.State.UNCHECKED:goog.ui.Checkbox.State.CHECKED)};
goog.ui.Checkbox.prototype.enterDocument=function(){goog.ui.Checkbox.superClass_.enterDocument.call(this);if(this.isHandleMouseEvents()){var a=this.getHandler();this.label_&&a.listen(this.label_,goog.events.EventType.CLICK,this.handleClickOrSpace_).listen(this.label_,goog.events.EventType.MOUSEOVER,this.handleMouseOver).listen(this.label_,goog.events.EventType.MOUSEOUT,this.handleMouseOut).listen(this.label_,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).listen(this.label_,goog.events.EventType.MOUSEUP,
this.handleMouseUp);a.listen(this.getElement(),goog.events.EventType.CLICK,this.handleClickOrSpace_)}this.label_&&(this.label_.id||(this.label_.id=this.makeId("lbl")),a=this.getElement(),goog.asserts.assert(a,"The checkbox DOM element cannot be null."),goog.a11y.aria.setState(a,goog.a11y.aria.State.LABELLEDBY,this.label_.id))};goog.ui.Checkbox.prototype.setEnabled=function(a){goog.ui.Checkbox.superClass_.setEnabled.call(this,a);if(a=this.getElement())a.tabIndex=this.isEnabled()?0:-1};
goog.ui.Checkbox.prototype.handleClickOrSpace_=function(a){a.stopPropagation();var b=this.checked_?goog.ui.Component.EventType.UNCHECK:goog.ui.Component.EventType.CHECK;this.isEnabled()&&this.dispatchEvent(b)&&(a.preventDefault(),this.toggle(),this.dispatchEvent(goog.ui.Component.EventType.CHANGE))};goog.ui.Checkbox.prototype.handleKeyEventInternal=function(a){a.keyCode==goog.events.KeyCodes.SPACE&&this.handleClickOrSpace_(a);return!1};
goog.ui.registry.setDecoratorByClassName(goog.ui.CheckboxRenderer.CSS_CLASS,function(){return new goog.ui.Checkbox});goog.ui.ButtonSide={NONE:0,START:1,END:2,BOTH:3};goog.ui.ButtonRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.ButtonRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.ButtonRenderer);goog.ui.ButtonRenderer.CSS_CLASS="goog-button";goog.ui.ButtonRenderer.prototype.getAriaRole=function(){return goog.a11y.aria.Role.BUTTON};
goog.ui.ButtonRenderer.prototype.updateAriaState=function(a,b,c){b==goog.ui.Component.State.CHECKED?(goog.asserts.assert(a,"The button DOM element cannot be null."),goog.a11y.aria.setState(a,goog.a11y.aria.State.PRESSED,c)):goog.ui.ButtonRenderer.superClass_.updateAriaState.call(this,a,b,c)};
goog.ui.ButtonRenderer.prototype.createDom=function(a){var b=goog.ui.ButtonRenderer.superClass_.createDom.call(this,a),c=a.getTooltip();c&&this.setTooltip(b,c);(c=a.getValue())&&this.setValue(b,c);a.isSupportedState(goog.ui.Component.State.CHECKED)&&this.updateAriaState(b,goog.ui.Component.State.CHECKED,a.isChecked());return b};
goog.ui.ButtonRenderer.prototype.decorate=function(a,b){b=goog.ui.ButtonRenderer.superClass_.decorate.call(this,a,b);a.setValueInternal(this.getValue(b));a.setTooltipInternal(this.getTooltip(b));a.isSupportedState(goog.ui.Component.State.CHECKED)&&this.updateAriaState(b,goog.ui.Component.State.CHECKED,a.isChecked());return b};goog.ui.ButtonRenderer.prototype.getValue=goog.nullFunction;goog.ui.ButtonRenderer.prototype.setValue=goog.nullFunction;goog.ui.ButtonRenderer.prototype.getTooltip=function(a){return a.title};
goog.ui.ButtonRenderer.prototype.setTooltip=function(a,b){a&&(a.title=b||"")};goog.ui.ButtonRenderer.prototype.setCollapsed=function(a,b){var c=a.isRightToLeft(),f=this.getStructuralCssClass()+"-collapse-left",g=this.getStructuralCssClass()+"-collapse-right";a.enableClassName(c?g:f,!!(b&goog.ui.ButtonSide.START));a.enableClassName(c?f:g,!!(b&goog.ui.ButtonSide.END))};goog.ui.ButtonRenderer.prototype.getCssClass=function(){return goog.ui.ButtonRenderer.CSS_CLASS};goog.ui.NativeButtonRenderer=function(){goog.ui.ButtonRenderer.call(this)};goog.inherits(goog.ui.NativeButtonRenderer,goog.ui.ButtonRenderer);goog.addSingletonGetter(goog.ui.NativeButtonRenderer);goog.ui.NativeButtonRenderer.prototype.getAriaRole=function(){};
goog.ui.NativeButtonRenderer.prototype.createDom=function(a){this.setUpNativeButton_(a);return a.getDomHelper().createDom("button",{"class":this.getClassNames(a).join(" "),disabled:!a.isEnabled(),title:a.getTooltip()||"",value:a.getValue()||""},a.getCaption()||"")};goog.ui.NativeButtonRenderer.prototype.canDecorate=function(a){return"BUTTON"==a.tagName||"INPUT"==a.tagName&&("button"==a.type||"submit"==a.type||"reset"==a.type)};
goog.ui.NativeButtonRenderer.prototype.decorate=function(a,b){this.setUpNativeButton_(a);b.disabled&&goog.dom.classes.add(b,this.getClassForState(goog.ui.Component.State.DISABLED));return goog.ui.NativeButtonRenderer.superClass_.decorate.call(this,a,b)};goog.ui.NativeButtonRenderer.prototype.initializeDom=function(a){a.getHandler().listen(a.getElement(),goog.events.EventType.CLICK,a.performActionInternal)};goog.ui.NativeButtonRenderer.prototype.setAllowTextSelection=goog.nullFunction;
goog.ui.NativeButtonRenderer.prototype.setRightToLeft=goog.nullFunction;goog.ui.NativeButtonRenderer.prototype.isFocusable=function(a){return a.isEnabled()};goog.ui.NativeButtonRenderer.prototype.setFocusable=goog.nullFunction;goog.ui.NativeButtonRenderer.prototype.setState=function(a,b,c){goog.ui.NativeButtonRenderer.superClass_.setState.call(this,a,b,c);if((a=a.getElement())&&b==goog.ui.Component.State.DISABLED)a.disabled=c};goog.ui.NativeButtonRenderer.prototype.getValue=function(a){return a.value};
goog.ui.NativeButtonRenderer.prototype.setValue=function(a,b){a&&(a.value=b)};goog.ui.NativeButtonRenderer.prototype.updateAriaState=goog.nullFunction;goog.ui.NativeButtonRenderer.prototype.setUpNativeButton_=function(a){a.setHandleMouseEvents(!1);a.setAutoStates(goog.ui.Component.State.ALL,!1);a.setSupportedState(goog.ui.Component.State.FOCUSED,!1)};goog.ui.Button=function(a,b,c){goog.ui.Control.call(this,a,b||goog.ui.NativeButtonRenderer.getInstance(),c)};goog.inherits(goog.ui.Button,goog.ui.Control);goog.ui.Button.Side=goog.ui.ButtonSide;goog.ui.Button.prototype.getValue=function(){return this.value_};goog.ui.Button.prototype.setValue=function(a){this.value_=a;this.getRenderer().setValue(this.getElement(),a)};goog.ui.Button.prototype.setValueInternal=function(a){this.value_=a};goog.ui.Button.prototype.getTooltip=function(){return this.tooltip_};
goog.ui.Button.prototype.setTooltip=function(a){this.tooltip_=a;this.getRenderer().setTooltip(this.getElement(),a)};goog.ui.Button.prototype.setTooltipInternal=function(a){this.tooltip_=a};goog.ui.Button.prototype.setCollapsed=function(a){this.getRenderer().setCollapsed(this,a)};goog.ui.Button.prototype.disposeInternal=function(){goog.ui.Button.superClass_.disposeInternal.call(this);delete this.value_;delete this.tooltip_};
goog.ui.Button.prototype.enterDocument=function(){goog.ui.Button.superClass_.enterDocument.call(this);if(this.isSupportedState(goog.ui.Component.State.FOCUSED)){var a=this.getKeyEventTarget();a&&this.getHandler().listen(a,goog.events.EventType.KEYUP,this.handleKeyEventInternal)}};
goog.ui.Button.prototype.handleKeyEventInternal=function(a){return a.keyCode==goog.events.KeyCodes.ENTER&&a.type==goog.events.KeyHandler.EventType.KEY||a.keyCode==goog.events.KeyCodes.SPACE&&a.type==goog.events.EventType.KEYUP?this.performActionInternal(a):a.keyCode==goog.events.KeyCodes.SPACE};goog.ui.registry.setDecoratorByClassName(goog.ui.ButtonRenderer.CSS_CLASS,function(){return new goog.ui.Button(null)});goog.structs.Collection=function(){};goog.structs.Set=function(a){this.map_=new goog.structs.Map;a&&this.addAll(a)};goog.structs.Set.getKey_=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+goog.getUid(a):b.substr(0,1)+a};goog.structs.Set.prototype.getCount=function(){return this.map_.getCount()};goog.structs.Set.prototype.add=function(a){this.map_.set(goog.structs.Set.getKey_(a),a)};goog.structs.Set.prototype.addAll=function(a){a=goog.structs.getValues(a);for(var b=a.length,c=0;c<b;c++)this.add(a[c])};
goog.structs.Set.prototype.removeAll=function(a){a=goog.structs.getValues(a);for(var b=a.length,c=0;c<b;c++)this.remove(a[c])};goog.structs.Set.prototype.remove=function(a){return this.map_.remove(goog.structs.Set.getKey_(a))};goog.structs.Set.prototype.clear=function(){this.map_.clear()};goog.structs.Set.prototype.isEmpty=function(){return this.map_.isEmpty()};goog.structs.Set.prototype.contains=function(a){return this.map_.containsKey(goog.structs.Set.getKey_(a))};
goog.structs.Set.prototype.containsAll=function(a){return goog.structs.every(a,this.contains,this)};goog.structs.Set.prototype.intersection=function(a){var b=new goog.structs.Set;a=goog.structs.getValues(a);for(var c=0;c<a.length;c++){var f=a[c];this.contains(f)&&b.add(f)}return b};goog.structs.Set.prototype.difference=function(a){var b=this.clone();b.removeAll(a);return b};goog.structs.Set.prototype.getValues=function(){return this.map_.getValues()};goog.structs.Set.prototype.clone=function(){return new goog.structs.Set(this)};
goog.structs.Set.prototype.equals=function(a){return this.getCount()==goog.structs.getCount(a)&&this.isSubsetOf(a)};goog.structs.Set.prototype.isSubsetOf=function(a){var b=goog.structs.getCount(a);if(this.getCount()>b)return!1;!(a instanceof goog.structs.Set)&&5<b&&(a=new goog.structs.Set(a));return goog.structs.every(this,function(b){return goog.structs.contains(a,b)})};goog.structs.Set.prototype.__iterator__=function(a){return this.map_.__iterator__(!1)};goog.debug.catchErrors=function(a,b,c){c=c||goog.global;var f=c.onerror,g=!!b;goog.userAgent.WEBKIT&&!goog.userAgent.isVersion("535.3")&&(g=!g);c.onerror=function(b,c,l){f&&f(b,c,l);a({message:b,fileName:c,line:l});return g}};goog.debug.expose=function(a,b){if("undefined"==typeof a)return"undefined";if(null==a)return"NULL";var c=[],f;for(f in a)if(b||!goog.isFunction(a[f])){var g=f+" = ";try{g+=a[f]}catch(h){g+="*** "+h+" ***"}c.push(g)}return c.join("\n")};
goog.debug.deepExpose=function(a,b){var c=new goog.structs.Set,f=[],g=function(a,k){var l=k+"  ";try{if(goog.isDef(a))if(goog.isNull(a))f.push("NULL");else if(goog.isString(a))f.push('"'+a.replace(/\n/g,"\n"+k)+'"');else if(goog.isFunction(a))f.push(String(a).replace(/\n/g,"\n"+k));else if(goog.isObject(a))if(c.contains(a))f.push("*** reference loop detected ***");else{c.add(a);f.push("{");for(var m in a)if(b||!goog.isFunction(a[m]))f.push("\n"),f.push(l),f.push(m+" = "),g(a[m],l);f.push("\n"+k+"}")}else f.push(a);
else f.push("undefined")}catch(n){f.push("*** "+n+" ***")}};g(a,"");return f.join("")};goog.debug.exposeArray=function(a){for(var b=[],c=0;c<a.length;c++)goog.isArray(a[c])?b.push(goog.debug.exposeArray(a[c])):b.push(a[c]);return"[ "+b.join(", ")+" ]"};
goog.debug.exposeException=function(a,b){try{var c=goog.debug.normalizeErrorObject(a);return"Message: "+goog.string.htmlEscape(c.message)+'\nUrl: <a href="view-source:'+c.fileName+'" target="_new">'+c.fileName+"</a>\nLine: "+c.lineNumber+"\n\nBrowser stack:\n"+goog.string.htmlEscape(c.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+goog.string.htmlEscape(goog.debug.getStacktrace(b)+"-> ")}catch(f){return"Exception trying to expose exception! You win, we lose. "+f}};
goog.debug.normalizeErrorObject=function(a){var b=goog.getObjectByName("window.location.href");if(goog.isString(a))return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c,f,g=!1;try{c=a.lineNumber||a.line||"Not available"}catch(h){c="Not available",g=!0}try{f=a.fileName||a.filename||a.sourceURL||goog.global.$googDebugFname||b}catch(k){f="Not available",g=!0}return g||!a.lineNumber||!a.fileName||!a.stack?{message:a.message,name:a.name,lineNumber:c,fileName:f,
stack:a.stack||"Not available"}:a};goog.debug.enhanceError=function(a,b){var c="string"==typeof a?Error(a):a;c.stack||(c.stack=goog.debug.getStacktrace(arguments.callee.caller));if(b){for(var f=0;c["message"+f];)++f;c["message"+f]=String(b)}return c};
goog.debug.getStacktraceSimple=function(a){for(var b=[],c=arguments.callee.caller,f=0;c&&(!a||f<a);){b.push(goog.debug.getFunctionName(c));b.push("()\n");try{c=c.caller}catch(g){b.push("[exception trying to get caller]\n");break}f++;if(f>=goog.debug.MAX_STACK_DEPTH){b.push("[...long stack...]");break}}a&&f>=a?b.push("[...reached max depth limit...]"):b.push("[end]");return b.join("")};goog.debug.MAX_STACK_DEPTH=50;
goog.debug.getStacktrace=function(a){return goog.debug.getStacktraceHelper_(a||arguments.callee.caller,[])};
goog.debug.getStacktraceHelper_=function(a,b){var c=[];if(goog.array.contains(b,a))c.push("[...circular reference...]");else if(a&&b.length<goog.debug.MAX_STACK_DEPTH){c.push(goog.debug.getFunctionName(a)+"(");for(var f=a.arguments,g=0;g<f.length;g++){0<g&&c.push(", ");var h;h=f[g];switch(typeof h){case "object":h=h?"object":"null";break;case "string":break;case "number":h=String(h);break;case "boolean":h=h?"true":"false";break;case "function":h=(h=goog.debug.getFunctionName(h))?h:"[fn]";break;default:h=
typeof h}40<h.length&&(h=h.substr(0,40)+"...");c.push(h)}b.push(a);c.push(")\n");try{c.push(goog.debug.getStacktraceHelper_(a.caller,b))}catch(k){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")};goog.debug.setFunctionResolver=function(a){goog.debug.fnNameResolver_=a};
goog.debug.getFunctionName=function(a){if(goog.debug.fnNameCache_[a])return goog.debug.fnNameCache_[a];if(goog.debug.fnNameResolver_){var b=goog.debug.fnNameResolver_(a);if(b)return goog.debug.fnNameCache_[a]=b}a=String(a);goog.debug.fnNameCache_[a]||(b=/function ([^\(]+)/.exec(a),goog.debug.fnNameCache_[a]=b?b[1]:"[Anonymous]");return goog.debug.fnNameCache_[a]};
goog.debug.makeWhitespaceVisible=function(a){return a.replace(/ /g,"[_]").replace(/\f/g,"[f]").replace(/\n/g,"[n]\n").replace(/\r/g,"[r]").replace(/\t/g,"[t]")};goog.debug.fnNameCache_={};goog.debug.LogRecord=function(a,b,c,f,g){this.reset(a,b,c,f,g)};goog.debug.LogRecord.prototype.sequenceNumber_=0;goog.debug.LogRecord.prototype.exception_=null;goog.debug.LogRecord.prototype.exceptionText_=null;goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS=!0;goog.debug.LogRecord.nextSequenceNumber_=0;
goog.debug.LogRecord.prototype.reset=function(a,b,c,f,g){goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS&&(this.sequenceNumber_="number"==typeof g?g:goog.debug.LogRecord.nextSequenceNumber_++);this.time_=f||goog.now();this.level_=a;this.msg_=b;this.loggerName_=c;delete this.exception_;delete this.exceptionText_};goog.debug.LogRecord.prototype.getLoggerName=function(){return this.loggerName_};goog.debug.LogRecord.prototype.getException=function(){return this.exception_};
goog.debug.LogRecord.prototype.setException=function(a){this.exception_=a};goog.debug.LogRecord.prototype.getExceptionText=function(){return this.exceptionText_};goog.debug.LogRecord.prototype.setExceptionText=function(a){this.exceptionText_=a};goog.debug.LogRecord.prototype.setLoggerName=function(a){this.loggerName_=a};goog.debug.LogRecord.prototype.getLevel=function(){return this.level_};goog.debug.LogRecord.prototype.setLevel=function(a){this.level_=a};
goog.debug.LogRecord.prototype.getMessage=function(){return this.msg_};goog.debug.LogRecord.prototype.setMessage=function(a){this.msg_=a};goog.debug.LogRecord.prototype.getMillis=function(){return this.time_};goog.debug.LogRecord.prototype.setMillis=function(a){this.time_=a};goog.debug.LogRecord.prototype.getSequenceNumber=function(){return this.sequenceNumber_};goog.debug.LogBuffer=function(){goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(),"Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");this.clear()};goog.debug.LogBuffer.getInstance=function(){goog.debug.LogBuffer.instance_||(goog.debug.LogBuffer.instance_=new goog.debug.LogBuffer);return goog.debug.LogBuffer.instance_};goog.debug.LogBuffer.CAPACITY=0;
goog.debug.LogBuffer.prototype.addRecord=function(a,b,c){var f=(this.curIndex_+1)%goog.debug.LogBuffer.CAPACITY;this.curIndex_=f;if(this.isFull_)return f=this.buffer_[f],f.reset(a,b,c),f;this.isFull_=f==goog.debug.LogBuffer.CAPACITY-1;return this.buffer_[f]=new goog.debug.LogRecord(a,b,c)};goog.debug.LogBuffer.isBufferingEnabled=function(){return 0<goog.debug.LogBuffer.CAPACITY};
goog.debug.LogBuffer.prototype.clear=function(){this.buffer_=Array(goog.debug.LogBuffer.CAPACITY);this.curIndex_=-1;this.isFull_=!1};goog.debug.LogBuffer.prototype.forEachRecord=function(a){var b=this.buffer_;if(b[0]){var c=this.curIndex_,f=this.isFull_?c:-1;do f=(f+1)%goog.debug.LogBuffer.CAPACITY,a(b[f]);while(f!=c)}};goog.debug.Logger=function(a){this.name_=a};goog.debug.Logger.prototype.parent_=null;goog.debug.Logger.prototype.level_=null;goog.debug.Logger.prototype.children_=null;goog.debug.Logger.prototype.handlers_=null;goog.debug.Logger.ENABLE_HIERARCHY=!0;goog.debug.Logger.ENABLE_HIERARCHY||(goog.debug.Logger.rootHandlers_=[]);goog.debug.Logger.Level=function(a,b){this.name=a;this.value=b};goog.debug.Logger.Level.prototype.toString=function(){return this.name};
goog.debug.Logger.Level.OFF=new goog.debug.Logger.Level("OFF",Infinity);goog.debug.Logger.Level.SHOUT=new goog.debug.Logger.Level("SHOUT",1200);goog.debug.Logger.Level.SEVERE=new goog.debug.Logger.Level("SEVERE",1E3);goog.debug.Logger.Level.WARNING=new goog.debug.Logger.Level("WARNING",900);goog.debug.Logger.Level.INFO=new goog.debug.Logger.Level("INFO",800);goog.debug.Logger.Level.CONFIG=new goog.debug.Logger.Level("CONFIG",700);goog.debug.Logger.Level.FINE=new goog.debug.Logger.Level("FINE",500);
goog.debug.Logger.Level.FINER=new goog.debug.Logger.Level("FINER",400);goog.debug.Logger.Level.FINEST=new goog.debug.Logger.Level("FINEST",300);goog.debug.Logger.Level.ALL=new goog.debug.Logger.Level("ALL",0);
goog.debug.Logger.Level.PREDEFINED_LEVELS=[goog.debug.Logger.Level.OFF,goog.debug.Logger.Level.SHOUT,goog.debug.Logger.Level.SEVERE,goog.debug.Logger.Level.WARNING,goog.debug.Logger.Level.INFO,goog.debug.Logger.Level.CONFIG,goog.debug.Logger.Level.FINE,goog.debug.Logger.Level.FINER,goog.debug.Logger.Level.FINEST,goog.debug.Logger.Level.ALL];goog.debug.Logger.Level.predefinedLevelsCache_=null;
goog.debug.Logger.Level.createPredefinedLevelsCache_=function(){goog.debug.Logger.Level.predefinedLevelsCache_={};for(var a=0,b;b=goog.debug.Logger.Level.PREDEFINED_LEVELS[a];a++)goog.debug.Logger.Level.predefinedLevelsCache_[b.value]=b,goog.debug.Logger.Level.predefinedLevelsCache_[b.name]=b};
goog.debug.Logger.Level.getPredefinedLevel=function(a){goog.debug.Logger.Level.predefinedLevelsCache_||goog.debug.Logger.Level.createPredefinedLevelsCache_();return goog.debug.Logger.Level.predefinedLevelsCache_[a]||null};
goog.debug.Logger.Level.getPredefinedLevelByValue=function(a){goog.debug.Logger.Level.predefinedLevelsCache_||goog.debug.Logger.Level.createPredefinedLevelsCache_();if(a in goog.debug.Logger.Level.predefinedLevelsCache_)return goog.debug.Logger.Level.predefinedLevelsCache_[a];for(var b=0;b<goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++b){var c=goog.debug.Logger.Level.PREDEFINED_LEVELS[b];if(c.value<=a)return c}return null};goog.debug.Logger.getLogger=function(a){return goog.debug.LogManager.getLogger(a)};
goog.debug.Logger.logToProfilers=function(a){goog.global.console&&(goog.global.console.timeStamp?goog.global.console.timeStamp(a):goog.global.console.markTimeline&&goog.global.console.markTimeline(a));goog.global.msWriteProfilerMark&&goog.global.msWriteProfilerMark(a)};goog.debug.Logger.prototype.getName=function(){return this.name_};
goog.debug.Logger.prototype.addHandler=function(a){goog.debug.Logger.ENABLE_HIERARCHY?(this.handlers_||(this.handlers_=[]),this.handlers_.push(a)):(goog.asserts.assert(!this.name_,"Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."),goog.debug.Logger.rootHandlers_.push(a))};goog.debug.Logger.prototype.removeHandler=function(a){var b=goog.debug.Logger.ENABLE_HIERARCHY?this.handlers_:goog.debug.Logger.rootHandlers_;return!!b&&goog.array.remove(b,a)};
goog.debug.Logger.prototype.getParent=function(){return this.parent_};goog.debug.Logger.prototype.getChildren=function(){this.children_||(this.children_={});return this.children_};goog.debug.Logger.prototype.setLevel=function(a){goog.debug.Logger.ENABLE_HIERARCHY?this.level_=a:(goog.asserts.assert(!this.name_,"Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."),goog.debug.Logger.rootLevel_=a)};goog.debug.Logger.prototype.getLevel=function(){return this.level_};
goog.debug.Logger.prototype.getEffectiveLevel=function(){if(!goog.debug.Logger.ENABLE_HIERARCHY)return goog.debug.Logger.rootLevel_;if(this.level_)return this.level_;if(this.parent_)return this.parent_.getEffectiveLevel();goog.asserts.fail("Root logger has no level set.");return null};goog.debug.Logger.prototype.isLoggable=function(a){return a.value>=this.getEffectiveLevel().value};goog.debug.Logger.prototype.log=function(a,b,c){this.isLoggable(a)&&this.doLogRecord_(this.getLogRecord(a,b,c))};
goog.debug.Logger.prototype.getLogRecord=function(a,b,c){var f=goog.debug.LogBuffer.isBufferingEnabled()?goog.debug.LogBuffer.getInstance().addRecord(a,b,this.name_):new goog.debug.LogRecord(a,String(b),this.name_);c&&(f.setException(c),f.setExceptionText(goog.debug.exposeException(c,arguments.callee.caller)));return f};goog.debug.Logger.prototype.shout=function(a,b){this.log(goog.debug.Logger.Level.SHOUT,a,b)};
goog.debug.Logger.prototype.severe=function(a,b){this.log(goog.debug.Logger.Level.SEVERE,a,b)};goog.debug.Logger.prototype.warning=function(a,b){this.log(goog.debug.Logger.Level.WARNING,a,b)};goog.debug.Logger.prototype.info=function(a,b){this.log(goog.debug.Logger.Level.INFO,a,b)};goog.debug.Logger.prototype.config=function(a,b){this.log(goog.debug.Logger.Level.CONFIG,a,b)};goog.debug.Logger.prototype.fine=function(a,b){this.log(goog.debug.Logger.Level.FINE,a,b)};
goog.debug.Logger.prototype.finer=function(a,b){this.log(goog.debug.Logger.Level.FINER,a,b)};goog.debug.Logger.prototype.finest=function(a,b){this.log(goog.debug.Logger.Level.FINEST,a,b)};goog.debug.Logger.prototype.logRecord=function(a){this.isLoggable(a.getLevel())&&this.doLogRecord_(a)};
goog.debug.Logger.prototype.doLogRecord_=function(a){goog.debug.Logger.logToProfilers("log:"+a.getMessage());if(goog.debug.Logger.ENABLE_HIERARCHY)for(var b=this;b;)b.callPublish_(a),b=b.getParent();else for(var b=0,c;c=goog.debug.Logger.rootHandlers_[b++];)c(a)};goog.debug.Logger.prototype.callPublish_=function(a){if(this.handlers_)for(var b=0,c;c=this.handlers_[b];b++)c(a)};goog.debug.Logger.prototype.setParent_=function(a){this.parent_=a};
goog.debug.Logger.prototype.addChild_=function(a,b){this.getChildren()[a]=b};goog.debug.LogManager={};goog.debug.LogManager.loggers_={};goog.debug.LogManager.rootLogger_=null;goog.debug.LogManager.initialize=function(){goog.debug.LogManager.rootLogger_||(goog.debug.LogManager.rootLogger_=new goog.debug.Logger(""),goog.debug.LogManager.loggers_[""]=goog.debug.LogManager.rootLogger_,goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))};goog.debug.LogManager.getLoggers=function(){return goog.debug.LogManager.loggers_};
goog.debug.LogManager.getRoot=function(){goog.debug.LogManager.initialize();return goog.debug.LogManager.rootLogger_};goog.debug.LogManager.getLogger=function(a){goog.debug.LogManager.initialize();return goog.debug.LogManager.loggers_[a]||goog.debug.LogManager.createLogger_(a)};goog.debug.LogManager.createFunctionForCatchErrors=function(a){return function(b){(a||goog.debug.LogManager.getRoot()).severe("Error: "+b.message+" ("+b.fileName+" @ Line: "+b.line+")")}};
goog.debug.LogManager.createLogger_=function(a){var b=new goog.debug.Logger(a);if(goog.debug.Logger.ENABLE_HIERARCHY){var c=a.lastIndexOf("."),f=a.substr(0,c),c=a.substr(c+1),f=goog.debug.LogManager.getLogger(f);f.addChild_(c,b);b.setParent_(f)}return goog.debug.LogManager.loggers_[a]=b};goog.net={};goog.net.WebSocket=function(a,b){goog.events.EventTarget.call(this);this.autoReconnect_=goog.isDef(a)?a:!0;this.getNextReconnect_=b||goog.net.WebSocket.EXPONENTIAL_BACKOFF_;this.nextReconnect_=this.getNextReconnect_(this.reconnectAttempt_)};goog.inherits(goog.net.WebSocket,goog.events.EventTarget);goog.net.WebSocket.prototype.webSocket_=null;goog.net.WebSocket.prototype.url_=null;goog.net.WebSocket.prototype.protocol_=void 0;goog.net.WebSocket.prototype.closeExpected_=!1;
goog.net.WebSocket.prototype.reconnectAttempt_=0;goog.net.WebSocket.prototype.logger_=goog.debug.Logger.getLogger("goog.net.WebSocket");goog.net.WebSocket.EventType={CLOSED:goog.events.getUniqueId("closed"),ERROR:goog.events.getUniqueId("error"),MESSAGE:goog.events.getUniqueId("message"),OPENED:goog.events.getUniqueId("opened")};goog.net.WebSocket.ReadyState_={CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3};goog.net.WebSocket.EXPONENTIAL_BACKOFF_CEILING_=6E4;
goog.net.WebSocket.EXPONENTIAL_BACKOFF_=function(a){a=1E3*Math.pow(2,a);return Math.min(a,goog.net.WebSocket.EXPONENTIAL_BACKOFF_CEILING_)};
goog.net.WebSocket.protectEntryPoints=function(a){goog.net.WebSocket.prototype.onOpen_=a.protectEntryPoint(goog.net.WebSocket.prototype.onOpen_);goog.net.WebSocket.prototype.onClose_=a.protectEntryPoint(goog.net.WebSocket.prototype.onClose_);goog.net.WebSocket.prototype.onMessage_=a.protectEntryPoint(goog.net.WebSocket.prototype.onMessage_);goog.net.WebSocket.prototype.onError_=a.protectEntryPoint(goog.net.WebSocket.prototype.onError_)};
goog.net.WebSocket.prototype.open=function(a,b){goog.asserts.assert(goog.global.WebSocket,"This browser does not support WebSocket");goog.asserts.assert(!this.isOpen(),"The WebSocket is already open");this.clearReconnectTimer_();this.url_=a;(this.protocol_=b)?(this.logger_.info("Opening the WebSocket on "+this.url_+" with protocol "+this.protocol_),this.webSocket_=new WebSocket(this.url_,this.protocol_)):(this.logger_.info("Opening the WebSocket on "+this.url_),this.webSocket_=new WebSocket(this.url_));
this.webSocket_.onopen=goog.bind(this.onOpen_,this);this.webSocket_.onclose=goog.bind(this.onClose_,this);this.webSocket_.onmessage=goog.bind(this.onMessage_,this);this.webSocket_.onerror=goog.bind(this.onError_,this)};goog.net.WebSocket.prototype.close=function(){this.clearReconnectTimer_();this.webSocket_&&(this.logger_.info("Closing the WebSocket."),this.closeExpected_=!0,this.webSocket_.close(),this.webSocket_=null)};
goog.net.WebSocket.prototype.send=function(a){goog.asserts.assert(this.isOpen(),"Cannot send without an open socket");this.webSocket_.send(a)};goog.net.WebSocket.prototype.isOpen=function(){return!!this.webSocket_&&this.webSocket_.readyState==goog.net.WebSocket.ReadyState_.OPEN};goog.net.WebSocket.prototype.onOpen_=function(){this.logger_.info("WebSocket opened on "+this.url_);this.dispatchEvent(goog.net.WebSocket.EventType.OPENED);this.reconnectAttempt_=0;this.nextReconnect_=this.getNextReconnect_(this.reconnectAttempt_)};
goog.net.WebSocket.prototype.onClose_=function(a){this.logger_.info("The WebSocket on "+this.url_+" closed.");this.dispatchEvent(goog.net.WebSocket.EventType.CLOSED);this.webSocket_=null;this.closeExpected_?(this.logger_.info("The WebSocket closed normally."),this.url_=null,this.protocol_=void 0):(this.logger_.severe("The WebSocket disconnected unexpectedly: "+a.data),this.autoReconnect_&&(this.logger_.info("Seconds until next reconnect attempt: "+Math.floor(this.nextReconnect_/1E3)),this.reconnectTimer_=
goog.Timer.callOnce(goog.bind(this.open,this,this.url_,this.protocol_),this.nextReconnect_,this),this.reconnectAttempt_++,this.nextReconnect_=this.getNextReconnect_(this.reconnectAttempt_)));this.closeExpected_=!1};goog.net.WebSocket.prototype.onMessage_=function(a){this.dispatchEvent(new goog.net.WebSocket.MessageEvent(a.data))};goog.net.WebSocket.prototype.onError_=function(a){a=a.data;this.logger_.severe("An error occurred: "+a);this.dispatchEvent(new goog.net.WebSocket.ErrorEvent(a))};
goog.net.WebSocket.prototype.clearReconnectTimer_=function(){goog.isDefAndNotNull(this.reconnectTimer_)&&goog.Timer.clear(this.reconnectTimer_);this.reconnectTimer_=null};goog.net.WebSocket.prototype.disposeInternal=function(){goog.net.WebSocket.superClass_.disposeInternal.call(this);this.close()};goog.net.WebSocket.MessageEvent=function(a){goog.events.Event.call(this,goog.net.WebSocket.EventType.MESSAGE);this.message=a};goog.inherits(goog.net.WebSocket.MessageEvent,goog.events.Event);
goog.net.WebSocket.ErrorEvent=function(a){goog.events.Event.call(this,goog.net.WebSocket.EventType.ERROR);this.data=a};goog.inherits(goog.net.WebSocket.ErrorEvent,goog.events.Event);
goog.debug.entryPointRegistry.register(function(a){goog.net.WebSocket.prototype.onOpen_=a(goog.net.WebSocket.prototype.onOpen_);goog.net.WebSocket.prototype.onClose_=a(goog.net.WebSocket.prototype.onClose_);goog.net.WebSocket.prototype.onMessage_=a(goog.net.WebSocket.prototype.onMessage_);goog.net.WebSocket.prototype.onError_=a(goog.net.WebSocket.prototype.onError_)});goog.positioning={};goog.positioning.Corner={TOP_LEFT:0,TOP_RIGHT:2,BOTTOM_LEFT:1,BOTTOM_RIGHT:3,TOP_START:4,TOP_END:6,BOTTOM_START:5,BOTTOM_END:7};goog.positioning.CornerBit={BOTTOM:1,RIGHT:2,FLIP_RTL:4};goog.positioning.Overflow={IGNORE:0,ADJUST_X:1,FAIL_X:2,ADJUST_Y:4,FAIL_Y:8,RESIZE_WIDTH:16,RESIZE_HEIGHT:32,ADJUST_X_EXCEPT_OFFSCREEN:65,ADJUST_Y_EXCEPT_OFFSCREEN:132};
goog.positioning.OverflowStatus={NONE:0,ADJUSTED_X:1,ADJUSTED_Y:2,WIDTH_ADJUSTED:4,HEIGHT_ADJUSTED:8,FAILED_LEFT:16,FAILED_RIGHT:32,FAILED_TOP:64,FAILED_BOTTOM:128,FAILED_OUTSIDE_VIEWPORT:256};goog.positioning.OverflowStatus.FAILED=goog.positioning.OverflowStatus.FAILED_LEFT|goog.positioning.OverflowStatus.FAILED_RIGHT|goog.positioning.OverflowStatus.FAILED_TOP|goog.positioning.OverflowStatus.FAILED_BOTTOM|goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT;
goog.positioning.OverflowStatus.FAILED_HORIZONTAL=goog.positioning.OverflowStatus.FAILED_LEFT|goog.positioning.OverflowStatus.FAILED_RIGHT;goog.positioning.OverflowStatus.FAILED_VERTICAL=goog.positioning.OverflowStatus.FAILED_TOP|goog.positioning.OverflowStatus.FAILED_BOTTOM;
goog.positioning.positionAtAnchor=function(a,b,c,f,g,h,k,l,m){goog.asserts.assert(c);var n=goog.positioning.getOffsetParentPageOffset(c),p=goog.positioning.getVisiblePart_(a);goog.style.translateRectForAnotherFrame(p,goog.dom.getDomHelper(a),goog.dom.getDomHelper(c));a=goog.positioning.getEffectiveCorner(a,b);p=new goog.math.Coordinate(a&goog.positioning.CornerBit.RIGHT?p.left+p.width:p.left,a&goog.positioning.CornerBit.BOTTOM?p.top+p.height:p.top);p=goog.math.Coordinate.difference(p,n);g&&(p.x+=
(a&goog.positioning.CornerBit.RIGHT?-1:1)*g.x,p.y+=(a&goog.positioning.CornerBit.BOTTOM?-1:1)*g.y);var q;if(k)if(m)q=m;else if(q=goog.style.getVisibleRectForElement(c))q.top-=n.y,q.right-=n.x,q.bottom-=n.y,q.left-=n.x;return goog.positioning.positionAtCoordinate(p,c,f,h,q,k,l)};
goog.positioning.getOffsetParentPageOffset=function(a){var b;if(a=a.offsetParent){var c=a.tagName==goog.dom.TagName.HTML||a.tagName==goog.dom.TagName.BODY;if(!c||"static"!=goog.style.getComputedPosition(a))b=goog.style.getPageOffset(a),c||(b=goog.math.Coordinate.difference(b,new goog.math.Coordinate(goog.style.bidi.getScrollLeft(a),a.scrollTop)))}return b||new goog.math.Coordinate};
goog.positioning.getVisiblePart_=function(a){var b=goog.style.getBounds(a);(a=goog.style.getVisibleRectForElement(a))&&b.intersection(goog.math.Rect.createFromBox(a));return b};
goog.positioning.positionAtCoordinate=function(a,b,c,f,g,h,k){a=a.clone();var l=goog.positioning.OverflowStatus.NONE;c=goog.positioning.getEffectiveCorner(b,c);var m=goog.style.getSize(b);k=k?k.clone():m.clone();if(f||c!=goog.positioning.Corner.TOP_LEFT)c&goog.positioning.CornerBit.RIGHT?a.x-=k.width+(f?f.right:0):f&&(a.x+=f.left),c&goog.positioning.CornerBit.BOTTOM?a.y-=k.height+(f?f.bottom:0):f&&(a.y+=f.top);if(h&&(l=g?goog.positioning.adjustForViewport_(a,k,g,h):goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT,
l&goog.positioning.OverflowStatus.FAILED))return l;goog.style.setPosition(b,a);goog.math.Size.equals(m,k)||goog.style.setBorderBoxSize(b,k);return l};
goog.positioning.adjustForViewport_=function(a,b,c,f){var g=goog.positioning.OverflowStatus.NONE,h=goog.positioning.Overflow.ADJUST_X_EXCEPT_OFFSCREEN,k=goog.positioning.Overflow.ADJUST_Y_EXCEPT_OFFSCREEN;if((f&h)==h&&(a.x<c.left||a.x>=c.right))f&=~goog.positioning.Overflow.ADJUST_X;if((f&k)==k&&(a.y<c.top||a.y>=c.bottom))f&=~goog.positioning.Overflow.ADJUST_Y;a.x<c.left&&f&goog.positioning.Overflow.ADJUST_X&&(a.x=c.left,g|=goog.positioning.OverflowStatus.ADJUSTED_X);a.x<c.left&&(a.x+b.width>c.right&&
f&goog.positioning.Overflow.RESIZE_WIDTH)&&(b.width=Math.max(b.width-(a.x+b.width-c.right),0),g|=goog.positioning.OverflowStatus.WIDTH_ADJUSTED);a.x+b.width>c.right&&f&goog.positioning.Overflow.ADJUST_X&&(a.x=Math.max(c.right-b.width,c.left),g|=goog.positioning.OverflowStatus.ADJUSTED_X);f&goog.positioning.Overflow.FAIL_X&&(g|=(a.x<c.left?goog.positioning.OverflowStatus.FAILED_LEFT:0)|(a.x+b.width>c.right?goog.positioning.OverflowStatus.FAILED_RIGHT:0));a.y<c.top&&f&goog.positioning.Overflow.ADJUST_Y&&
(a.y=c.top,g|=goog.positioning.OverflowStatus.ADJUSTED_Y);a.y<=c.top&&(a.y+b.height<c.bottom&&f&goog.positioning.Overflow.RESIZE_HEIGHT)&&(b.height=Math.max(b.height-(c.top-a.y),0),a.y=0,g|=goog.positioning.OverflowStatus.HEIGHT_ADJUSTED);a.y>=c.top&&(a.y+b.height>c.bottom&&f&goog.positioning.Overflow.RESIZE_HEIGHT)&&(b.height=Math.max(b.height-(a.y+b.height-c.bottom),0),g|=goog.positioning.OverflowStatus.HEIGHT_ADJUSTED);a.y+b.height>c.bottom&&f&goog.positioning.Overflow.ADJUST_Y&&(a.y=Math.max(c.bottom-
b.height,c.top),g|=goog.positioning.OverflowStatus.ADJUSTED_Y);f&goog.positioning.Overflow.FAIL_Y&&(g|=(a.y<c.top?goog.positioning.OverflowStatus.FAILED_TOP:0)|(a.y+b.height>c.bottom?goog.positioning.OverflowStatus.FAILED_BOTTOM:0));return g};goog.positioning.getEffectiveCorner=function(a,b){return(b&goog.positioning.CornerBit.FLIP_RTL&&goog.style.isRightToLeft(a)?b^goog.positioning.CornerBit.RIGHT:b)&~goog.positioning.CornerBit.FLIP_RTL};
goog.positioning.flipCornerHorizontal=function(a){return a^goog.positioning.CornerBit.RIGHT};goog.positioning.flipCornerVertical=function(a){return a^goog.positioning.CornerBit.BOTTOM};goog.positioning.flipCorner=function(a){return a^goog.positioning.CornerBit.BOTTOM^goog.positioning.CornerBit.RIGHT};goog.positioning.AbstractPosition=function(){};goog.positioning.AbstractPosition.prototype.reposition=function(a,b,c,f){};goog.positioning.AnchoredPosition=function(a,b,c){this.element=a;this.corner=b;this.overflow_=c};goog.inherits(goog.positioning.AnchoredPosition,goog.positioning.AbstractPosition);goog.positioning.AnchoredPosition.prototype.reposition=function(a,b,c,f){goog.positioning.positionAtAnchor(this.element,this.corner,a,b,void 0,c,this.overflow_)};goog.positioning.ViewportPosition=function(a,b){this.coordinate=a instanceof goog.math.Coordinate?a:new goog.math.Coordinate(a,b)};goog.inherits(goog.positioning.ViewportPosition,goog.positioning.AbstractPosition);goog.positioning.ViewportPosition.prototype.reposition=function(a,b,c,f){goog.positioning.positionAtAnchor(goog.style.getClientViewportElement(a),goog.positioning.Corner.TOP_LEFT,a,b,this.coordinate,c,null,f)};goog.positioning.ClientPosition=function(a,b){this.coordinate=a instanceof goog.math.Coordinate?a:new goog.math.Coordinate(a,b)};goog.inherits(goog.positioning.ClientPosition,goog.positioning.AbstractPosition);
goog.positioning.ClientPosition.prototype.reposition=function(a,b,c,f){goog.asserts.assert(a);var g=goog.style.getViewportPageOffset(goog.dom.getOwnerDocument(a)),h=this.coordinate.x+g.x,g=this.coordinate.y+g.y,k=goog.positioning.getOffsetParentPageOffset(a),h=h-k.x,g=g-k.y;goog.positioning.positionAtCoordinate(new goog.math.Coordinate(h,g),a,b,c,null,null,f)};goog.positioning.ViewportClientPosition=function(a,b){goog.positioning.ClientPosition.call(this,a,b)};goog.inherits(goog.positioning.ViewportClientPosition,goog.positioning.ClientPosition);goog.positioning.ViewportClientPosition.prototype.lastResortOverflow_=0;goog.positioning.ViewportClientPosition.prototype.setLastResortOverflow=function(a){this.lastResortOverflow_=a};
goog.positioning.ViewportClientPosition.prototype.reposition=function(a,b,c,f){var g=goog.style.getClientViewportElement(a),g=goog.style.getVisibleRectForElement(g),h=goog.dom.getDomHelper(a).getDocumentScrollElement(),h=new goog.math.Coordinate(this.coordinate.x+h.scrollLeft,this.coordinate.y+h.scrollTop),k=goog.positioning.Overflow.FAIL_X|goog.positioning.Overflow.FAIL_Y,l=b,m=goog.positioning.positionAtCoordinate(h,a,l,c,g,k,f);if(0!=(m&goog.positioning.OverflowStatus.FAILED)){if(m&goog.positioning.OverflowStatus.FAILED_LEFT||
m&goog.positioning.OverflowStatus.FAILED_RIGHT)l=goog.positioning.flipCornerHorizontal(l);if(m&goog.positioning.OverflowStatus.FAILED_TOP||m&goog.positioning.OverflowStatus.FAILED_BOTTOM)l=goog.positioning.flipCornerVertical(l);m=goog.positioning.positionAtCoordinate(h,a,l,c,g,k,f);0!=(m&goog.positioning.OverflowStatus.FAILED)&&goog.positioning.positionAtCoordinate(h,a,b,c,g,this.lastResortOverflow_,f)}};goog.positioning.AbsolutePosition=function(a,b){this.coordinate=a instanceof goog.math.Coordinate?a:new goog.math.Coordinate(a,b)};goog.inherits(goog.positioning.AbsolutePosition,goog.positioning.AbstractPosition);goog.positioning.AbsolutePosition.prototype.reposition=function(a,b,c,f){goog.positioning.positionAtCoordinate(this.coordinate,a,b,c,null,null,f)};goog.positioning.AnchoredViewportPosition=function(a,b,c,f){goog.positioning.AnchoredPosition.call(this,a,b);this.lastResortOverflow_=c?goog.positioning.Overflow.ADJUST_X|goog.positioning.Overflow.ADJUST_Y:goog.positioning.Overflow.IGNORE;this.overflowConstraint_=f||void 0};goog.inherits(goog.positioning.AnchoredViewportPosition,goog.positioning.AnchoredPosition);goog.positioning.AnchoredViewportPosition.prototype.getLastResortOverflow=function(){return this.lastResortOverflow_};
goog.positioning.AnchoredViewportPosition.prototype.setLastResortOverflow=function(a){this.lastResortOverflow_=a};
goog.positioning.AnchoredViewportPosition.prototype.reposition=function(a,b,c,f){var g=goog.positioning.positionAtAnchor(this.element,this.corner,a,b,null,c,goog.positioning.Overflow.FAIL_X|goog.positioning.Overflow.FAIL_Y,f,this.overflowConstraint_);if(g&goog.positioning.OverflowStatus.FAILED){var h=this.adjustCorner(g,this.corner);b=this.adjustCorner(g,b);g=goog.positioning.positionAtAnchor(this.element,h,a,b,null,c,goog.positioning.Overflow.FAIL_X|goog.positioning.Overflow.FAIL_Y,f,this.overflowConstraint_);
g&goog.positioning.OverflowStatus.FAILED&&(h=this.adjustCorner(g,h),b=this.adjustCorner(g,b),goog.positioning.positionAtAnchor(this.element,h,a,b,null,c,this.getLastResortOverflow(),f,this.overflowConstraint_))}};goog.positioning.AnchoredViewportPosition.prototype.adjustCorner=function(a,b){a&goog.positioning.OverflowStatus.FAILED_HORIZONTAL&&(b=goog.positioning.flipCornerHorizontal(b));a&goog.positioning.OverflowStatus.FAILED_VERTICAL&&(b=goog.positioning.flipCornerVertical(b));return b};goog.ui.Popup=function(a,b){this.popupCorner_=goog.positioning.Corner.TOP_START;this.position_=b||void 0;goog.ui.PopupBase.call(this,a)};goog.inherits(goog.ui.Popup,goog.ui.PopupBase);goog.ui.Popup.Corner=goog.positioning.Corner;goog.ui.Popup.Overflow=goog.positioning.Overflow;goog.ui.Popup.prototype.getPinnedCorner=function(){return this.popupCorner_};goog.ui.Popup.prototype.setPinnedCorner=function(a){this.popupCorner_=a;this.isVisible()&&this.reposition()};
goog.ui.Popup.prototype.getPosition=function(){return this.position_||null};goog.ui.Popup.prototype.setPosition=function(a){this.position_=a||void 0;this.isVisible()&&this.reposition()};goog.ui.Popup.prototype.getMargin=function(){return this.margin_||null};goog.ui.Popup.prototype.setMargin=function(a,b,c,f){this.margin_=null==a||a instanceof goog.math.Box?a:new goog.math.Box(a,b,c,f);this.isVisible()&&this.reposition()};
goog.ui.Popup.prototype.reposition=function(){if(this.position_){var a=!this.isVisible()&&this.getType()!=goog.ui.PopupBase.Type.MOVE_OFFSCREEN,b=this.getElement();a&&(b.style.visibility="hidden",goog.style.showElement(b,!0));this.position_.reposition(b,this.popupCorner_,this.margin_);a&&goog.style.showElement(b,!1)}};goog.ui.Popup.AnchoredPosition=goog.positioning.AnchoredPosition;goog.ui.Popup.AnchoredViewPortPosition=goog.positioning.AnchoredViewportPosition;goog.ui.Popup.AbsolutePosition=goog.positioning.AbsolutePosition;
goog.ui.Popup.ViewPortPosition=goog.positioning.ViewportPosition;goog.ui.Popup.ClientPosition=goog.positioning.ClientPosition;goog.ui.Popup.ViewPortClientPosition=goog.positioning.ViewportClientPosition;goog.ui.Tooltip=function(a,b,c){this.dom_=c||(a?goog.dom.getDomHelper(goog.dom.getElement(a)):goog.dom.getDomHelper());goog.ui.Popup.call(this,this.dom_.createDom("div",{style:"position:absolute;display:none;"}));this.cursorPosition=new goog.math.Coordinate(1,1);this.elements_=new goog.structs.Set;a&&this.attach(a);null!=b&&this.setText(b)};goog.inherits(goog.ui.Tooltip,goog.ui.Popup);goog.ui.Tooltip.activeInstances_=[];goog.ui.Tooltip.prototype.activeEl_=null;
goog.ui.Tooltip.prototype.className="goog-tooltip";goog.ui.Tooltip.prototype.showDelayMs_=500;goog.ui.Tooltip.prototype.hideDelayMs_=0;goog.ui.Tooltip.State={INACTIVE:0,WAITING_TO_SHOW:1,SHOWING:2,WAITING_TO_HIDE:3,UPDATING:4};goog.ui.Tooltip.Activation={CURSOR:0,FOCUS:1};goog.ui.Tooltip.prototype.getDomHelper=function(){return this.dom_};goog.ui.Tooltip.prototype.getChildTooltip=function(){return this.childTooltip_};
goog.ui.Tooltip.prototype.attach=function(a){a=goog.dom.getElement(a);this.elements_.add(a);goog.events.listen(a,goog.events.EventType.MOUSEOVER,this.handleMouseOver,!1,this);goog.events.listen(a,goog.events.EventType.MOUSEOUT,this.handleMouseOutAndBlur,!1,this);goog.events.listen(a,goog.events.EventType.MOUSEMOVE,this.handleMouseMove,!1,this);goog.events.listen(a,goog.events.EventType.FOCUS,this.handleFocus,!1,this);goog.events.listen(a,goog.events.EventType.BLUR,this.handleMouseOutAndBlur,!1,this)};
goog.ui.Tooltip.prototype.detach=function(a){if(a)a=goog.dom.getElement(a),this.detachElement_(a),this.elements_.remove(a);else{for(var b=this.elements_.getValues(),c=0;a=b[c];c++)this.detachElement_(a);this.elements_.clear()}};
goog.ui.Tooltip.prototype.detachElement_=function(a){goog.events.unlisten(a,goog.events.EventType.MOUSEOVER,this.handleMouseOver,!1,this);goog.events.unlisten(a,goog.events.EventType.MOUSEOUT,this.handleMouseOutAndBlur,!1,this);goog.events.unlisten(a,goog.events.EventType.MOUSEMOVE,this.handleMouseMove,!1,this);goog.events.unlisten(a,goog.events.EventType.FOCUS,this.handleFocus,!1,this);goog.events.unlisten(a,goog.events.EventType.BLUR,this.handleMouseOutAndBlur,!1,this)};
goog.ui.Tooltip.prototype.setShowDelayMs=function(a){this.showDelayMs_=a};goog.ui.Tooltip.prototype.getShowDelayMs=function(){return this.showDelayMs_};goog.ui.Tooltip.prototype.setHideDelayMs=function(a){this.hideDelayMs_=a};goog.ui.Tooltip.prototype.getHideDelayMs=function(){return this.hideDelayMs_};goog.ui.Tooltip.prototype.setText=function(a){goog.dom.setTextContent(this.getElement(),a)};goog.ui.Tooltip.prototype.setHtml=function(a){this.getElement().innerHTML=a};
goog.ui.Tooltip.prototype.setElement=function(a){var b=this.getElement();b&&goog.dom.removeNode(b);goog.ui.Tooltip.superClass_.setElement.call(this,a);a&&(b=this.dom_.getDocument().body,b.insertBefore(a,b.lastChild))};goog.ui.Tooltip.prototype.getText=function(){return goog.dom.getTextContent(this.getElement())};goog.ui.Tooltip.prototype.getHtml=function(){return this.getElement().innerHTML};
goog.ui.Tooltip.prototype.getState=function(){return this.showTimer?this.isVisible()?goog.ui.Tooltip.State.UPDATING:goog.ui.Tooltip.State.WAITING_TO_SHOW:this.hideTimer?goog.ui.Tooltip.State.WAITING_TO_HIDE:this.isVisible()?goog.ui.Tooltip.State.SHOWING:goog.ui.Tooltip.State.INACTIVE};goog.ui.Tooltip.prototype.setRequireInteraction=function(a){this.requireInteraction_=a};
goog.ui.Tooltip.prototype.isCoordinateInTooltip=function(a){if(!this.isVisible())return!1;var b=goog.style.getPageOffset(this.getElement()),c=goog.style.getSize(this.getElement());return b.x<=a.x&&a.x<=b.x+c.width&&b.y<=a.y&&a.y<=b.y+c.height};
goog.ui.Tooltip.prototype.onBeforeShow=function(){if(!goog.ui.PopupBase.prototype.onBeforeShow.call(this))return!1;if(this.anchor)for(var a,b=0;a=goog.ui.Tooltip.activeInstances_[b];b++)goog.dom.contains(a.getElement(),this.anchor)||a.setVisible(!1);goog.array.insert(goog.ui.Tooltip.activeInstances_,this);a=this.getElement();a.className=this.className;this.clearHideTimer();goog.events.listen(a,goog.events.EventType.MOUSEOVER,this.handleTooltipMouseOver,!1,this);goog.events.listen(a,goog.events.EventType.MOUSEOUT,
this.handleTooltipMouseOut,!1,this);this.clearShowTimer();return!0};
goog.ui.Tooltip.prototype.onHide_=function(){goog.array.remove(goog.ui.Tooltip.activeInstances_,this);for(var a=this.getElement(),b,c=0;b=goog.ui.Tooltip.activeInstances_[c];c++)b.anchor&&goog.dom.contains(a,b.anchor)&&b.setVisible(!1);this.parentTooltip_&&this.parentTooltip_.startHideTimer();goog.events.unlisten(a,goog.events.EventType.MOUSEOVER,this.handleTooltipMouseOver,!1,this);goog.events.unlisten(a,goog.events.EventType.MOUSEOUT,this.handleTooltipMouseOut,!1,this);this.anchor=void 0;this.getState()==
goog.ui.Tooltip.State.INACTIVE&&(this.seenInteraction_=!1);goog.ui.PopupBase.prototype.onHide_.call(this)};goog.ui.Tooltip.prototype.maybeShow=function(a,b){this.anchor==a&&this.elements_.contains(this.anchor)&&(this.seenInteraction_||!this.requireInteraction_?(this.setVisible(!1),this.isVisible()||this.positionAndShow_(a,b)):this.anchor=void 0);this.showTimer=void 0};goog.ui.Tooltip.prototype.getElements=function(){return this.elements_};goog.ui.Tooltip.prototype.getActiveElement=function(){return this.activeEl_};
goog.ui.Tooltip.prototype.setActiveElement=function(a){this.activeEl_=a};goog.ui.Tooltip.prototype.showForElement=function(a,b){this.attach(a);this.activeEl_=a;this.positionAndShow_(a,b)};goog.ui.Tooltip.prototype.positionAndShow_=function(a,b){this.anchor=a;this.setPosition(b||this.getPositioningStrategy(goog.ui.Tooltip.Activation.CURSOR));this.setVisible(!0)};
goog.ui.Tooltip.prototype.maybeHide=function(a){this.hideTimer=void 0;a==this.anchor&&(null==this.activeEl_||this.activeEl_!=this.getElement()&&!this.elements_.contains(this.activeEl_))&&!this.hasActiveChild()&&this.setVisible(!1)};goog.ui.Tooltip.prototype.hasActiveChild=function(){return!(!this.childTooltip_||!this.childTooltip_.activeEl_)};
goog.ui.Tooltip.prototype.saveCursorPosition_=function(a){var b=this.dom_.getDocumentScroll();this.cursorPosition.x=a.clientX+b.x;this.cursorPosition.y=a.clientY+b.y};goog.ui.Tooltip.prototype.handleMouseOver=function(a){var b=this.getAnchorFromElement(a.target);this.activeEl_=b;this.clearHideTimer();b!=this.anchor&&(this.anchor=b,this.startShowTimer(b),this.checkForParentTooltip_(),this.saveCursorPosition_(a))};
goog.ui.Tooltip.prototype.getAnchorFromElement=function(a){try{for(;a&&!this.elements_.contains(a);)a=a.parentNode;return a}catch(b){return null}};goog.ui.Tooltip.prototype.handleMouseMove=function(a){this.saveCursorPosition_(a);this.seenInteraction_=!0};
goog.ui.Tooltip.prototype.handleFocus=function(a){this.activeEl_=a=this.getAnchorFromElement(a.target);this.seenInteraction_=!0;if(this.anchor!=a){this.anchor=a;var b=this.getPositioningStrategy(goog.ui.Tooltip.Activation.FOCUS);this.clearHideTimer();this.startShowTimer(a,b);this.checkForParentTooltip_()}};goog.ui.Tooltip.prototype.getPositioningStrategy=function(a){return a==goog.ui.Tooltip.Activation.CURSOR?(a=this.cursorPosition.clone(),new goog.ui.Tooltip.CursorTooltipPosition(a)):new goog.ui.Tooltip.ElementTooltipPosition(this.activeEl_)};
goog.ui.Tooltip.prototype.checkForParentTooltip_=function(){if(this.anchor)for(var a,b=0;a=goog.ui.Tooltip.activeInstances_[b];b++)goog.dom.contains(a.getElement(),this.anchor)&&(a.childTooltip_=this,this.parentTooltip_=a)};
goog.ui.Tooltip.prototype.handleMouseOutAndBlur=function(a){var b=this.getAnchorFromElement(a.target),c=this.getAnchorFromElement(a.relatedTarget);b!=c&&(b==this.activeEl_&&(this.activeEl_=null),this.clearShowTimer(),this.seenInteraction_=!1,this.isVisible()&&(!a.relatedTarget||!goog.dom.contains(this.getElement(),a.relatedTarget))?this.startHideTimer():this.anchor=void 0)};
goog.ui.Tooltip.prototype.handleTooltipMouseOver=function(a){a=this.getElement();this.activeEl_!=a&&(this.clearHideTimer(),this.activeEl_=a)};goog.ui.Tooltip.prototype.handleTooltipMouseOut=function(a){var b=this.getElement();if(this.activeEl_==b&&(!a.relatedTarget||!goog.dom.contains(b,a.relatedTarget)))this.activeEl_=null,this.startHideTimer()};goog.ui.Tooltip.prototype.startShowTimer=function(a,b){this.showTimer||(this.showTimer=goog.Timer.callOnce(goog.bind(this.maybeShow,this,a,b),this.showDelayMs_))};
goog.ui.Tooltip.prototype.clearShowTimer=function(){this.showTimer&&(goog.Timer.clear(this.showTimer),this.showTimer=void 0)};goog.ui.Tooltip.prototype.startHideTimer=function(){this.getState()==goog.ui.Tooltip.State.SHOWING&&(this.hideTimer=goog.Timer.callOnce(goog.bind(this.maybeHide,this,this.anchor),this.getHideDelayMs()))};goog.ui.Tooltip.prototype.clearHideTimer=function(){this.hideTimer&&(goog.Timer.clear(this.hideTimer),this.hideTimer=void 0)};
goog.ui.Tooltip.prototype.disposeInternal=function(){this.setVisible(!1);this.clearShowTimer();this.detach();this.getElement()&&goog.dom.removeNode(this.getElement());this.activeEl_=null;delete this.dom_;goog.ui.Tooltip.superClass_.disposeInternal.call(this)};goog.ui.Tooltip.CursorTooltipPosition=function(a,b){goog.positioning.ViewportPosition.call(this,a,b)};goog.inherits(goog.ui.Tooltip.CursorTooltipPosition,goog.positioning.ViewportPosition);
goog.ui.Tooltip.CursorTooltipPosition.prototype.reposition=function(a,b,c){b=goog.style.getClientViewportElement(a);b=goog.style.getVisibleRectForElement(b);c=c?new goog.math.Box(c.top+10,c.right,c.bottom,c.left+10):new goog.math.Box(10,0,0,10);goog.positioning.positionAtCoordinate(this.coordinate,a,goog.positioning.Corner.TOP_START,c,b,goog.positioning.Overflow.ADJUST_X|goog.positioning.Overflow.FAIL_Y)&goog.positioning.OverflowStatus.FAILED&&goog.positioning.positionAtCoordinate(this.coordinate,
a,goog.positioning.Corner.TOP_START,c,b,goog.positioning.Overflow.ADJUST_X|goog.positioning.Overflow.ADJUST_Y)};goog.ui.Tooltip.ElementTooltipPosition=function(a){goog.positioning.AnchoredPosition.call(this,a,goog.positioning.Corner.BOTTOM_RIGHT)};goog.inherits(goog.ui.Tooltip.ElementTooltipPosition,goog.positioning.AnchoredPosition);
goog.ui.Tooltip.ElementTooltipPosition.prototype.reposition=function(a,b,c){var f=new goog.math.Coordinate(10,0);goog.positioning.positionAtAnchor(this.element,this.corner,a,b,f,c,goog.positioning.Overflow.ADJUST_X|goog.positioning.Overflow.FAIL_Y)&goog.positioning.OverflowStatus.FAILED&&goog.positioning.positionAtAnchor(this.element,goog.positioning.Corner.TOP_RIGHT,a,goog.positioning.Corner.BOTTOM_LEFT,f,c,goog.positioning.Overflow.ADJUST_X|goog.positioning.Overflow.ADJUST_Y)};goog.events.KeyNames={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps-lock",27:"esc",32:"space",33:"pg-up",34:"pg-down",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:"semicolon",61:"equals",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",
89:"y",90:"z",93:"context",96:"num-0",97:"num-1",98:"num-2",99:"num-3",100:"num-4",101:"num-5",102:"num-6",103:"num-7",104:"num-8",105:"num-9",106:"num-multiply",107:"num-plus",109:"num-minus",110:"num-period",111:"num-division",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",186:"semicolon",187:"equals",189:"dash",188:",",190:".",191:"/",192:"~",219:"open-square-bracket",220:"\\",221:"close-square-bracket",222:"single-quote",224:"win"};goog.ui.KeyboardShortcutHandler=function(a){goog.events.EventTarget.call(this);this.shortcuts_={};this.lastKeys_={strokes:[],time:0};this.globalKeys_=goog.object.createSet(goog.ui.KeyboardShortcutHandler.DEFAULT_GLOBAL_KEYS_);this.textInputs_=goog.object.createSet(goog.ui.KeyboardShortcutHandler.DEFAULT_TEXT_INPUTS_);this.alwaysPreventDefault_=!0;this.allShortcutsAreGlobal_=this.alwaysStopPropagation_=!1;this.modifierShortcutsAreGlobal_=!0;this.initializeKeyListener(a)};
goog.inherits(goog.ui.KeyboardShortcutHandler,goog.events.EventTarget);goog.ui.KeyboardShortcutHandler.MAX_KEY_SEQUENCE_DELAY=1500;goog.ui.KeyboardShortcutHandler.Modifiers={NONE:0,SHIFT:1,CTRL:2,ALT:4,META:8};
goog.ui.KeyboardShortcutHandler.DEFAULT_GLOBAL_KEYS_=[goog.events.KeyCodes.ESC,goog.events.KeyCodes.F1,goog.events.KeyCodes.F2,goog.events.KeyCodes.F3,goog.events.KeyCodes.F4,goog.events.KeyCodes.F5,goog.events.KeyCodes.F6,goog.events.KeyCodes.F7,goog.events.KeyCodes.F8,goog.events.KeyCodes.F9,goog.events.KeyCodes.F10,goog.events.KeyCodes.F11,goog.events.KeyCodes.F12,goog.events.KeyCodes.PAUSE];goog.ui.KeyboardShortcutHandler.DEFAULT_TEXT_INPUTS_="color date datetime datetime-local email month number password search tel text time url week".split(" ");
goog.ui.KeyboardShortcutHandler.EventType={SHORTCUT_TRIGGERED:"shortcut",SHORTCUT_PREFIX:"shortcut_"};goog.ui.KeyboardShortcutHandler.getKeyCode=function(a){if(!goog.ui.KeyboardShortcutHandler.nameToKeyCodeCache_){var b={},c;for(c in goog.events.KeyNames)b[goog.events.KeyNames[c]]=c;goog.ui.KeyboardShortcutHandler.nameToKeyCodeCache_=b}return goog.ui.KeyboardShortcutHandler.nameToKeyCodeCache_[a]};
goog.ui.KeyboardShortcutHandler.prototype.setAlwaysPreventDefault=function(a){this.alwaysPreventDefault_=a};goog.ui.KeyboardShortcutHandler.prototype.getAlwaysPreventDefault=function(){return this.alwaysPreventDefault_};goog.ui.KeyboardShortcutHandler.prototype.setAlwaysStopPropagation=function(a){this.alwaysStopPropagation_=a};goog.ui.KeyboardShortcutHandler.prototype.getAlwaysStopPropagation=function(){return this.alwaysStopPropagation_};
goog.ui.KeyboardShortcutHandler.prototype.setAllShortcutsAreGlobal=function(a){this.allShortcutsAreGlobal_=a};goog.ui.KeyboardShortcutHandler.prototype.getAllShortcutsAreGlobal=function(){return this.allShortcutsAreGlobal_};goog.ui.KeyboardShortcutHandler.prototype.setModifierShortcutsAreGlobal=function(a){this.modifierShortcutsAreGlobal_=a};goog.ui.KeyboardShortcutHandler.prototype.getModifierShortcutsAreGlobal=function(){return this.modifierShortcutsAreGlobal_};
goog.ui.KeyboardShortcutHandler.prototype.registerShortcut=function(a,b){goog.ui.KeyboardShortcutHandler.setShortcut_(this.shortcuts_,this.interpretStrokes_(1,arguments),a)};goog.ui.KeyboardShortcutHandler.prototype.unregisterShortcut=function(a){goog.ui.KeyboardShortcutHandler.setShortcut_(this.shortcuts_,this.interpretStrokes_(0,arguments),null)};goog.ui.KeyboardShortcutHandler.prototype.isShortcutRegistered=function(a){return this.checkShortcut_(this.interpretStrokes_(0,arguments))};
goog.ui.KeyboardShortcutHandler.prototype.interpretStrokes_=function(a,b){var c;if(goog.isString(b[a]))c=goog.ui.KeyboardShortcutHandler.parseStringShortcut(b[a]);else{var f=b,g=a;goog.isArray(b[a])&&(f=b[a],g=0);for(c=[];g<f.length;g+=2)c.push({keyCode:f[g],modifiers:f[g+1]})}return c};goog.ui.KeyboardShortcutHandler.prototype.unregisterAll=function(){this.shortcuts_={}};goog.ui.KeyboardShortcutHandler.prototype.setGlobalKeys=function(a){this.globalKeys_=goog.object.createSet(a)};
goog.ui.KeyboardShortcutHandler.prototype.getGlobalKeys=function(){return goog.object.getKeys(this.globalKeys_)};goog.ui.KeyboardShortcutHandler.prototype.disposeInternal=function(){goog.ui.KeyboardShortcutHandler.superClass_.disposeInternal.call(this);this.unregisterAll();this.clearKeyListener()};goog.ui.KeyboardShortcutHandler.prototype.getEventType=function(a){return goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_PREFIX+a};
goog.ui.KeyboardShortcutHandler.parseStringShortcut=function(a){a=a.replace(/[ +]*\+[ +]*/g,"+").replace(/[ ]+/g," ").toLowerCase();a=a.split(" ");for(var b=[],c,f=0;c=a[f];f++){c=c.split("+");for(var g,h=goog.ui.KeyboardShortcutHandler.Modifiers.NONE,k,l=0;k=c[l];l++){switch(k){case "shift":h|=goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT;continue;case "ctrl":h|=goog.ui.KeyboardShortcutHandler.Modifiers.CTRL;continue;case "alt":h|=goog.ui.KeyboardShortcutHandler.Modifiers.ALT;continue;case "meta":h|=
goog.ui.KeyboardShortcutHandler.Modifiers.META;continue}g=goog.ui.KeyboardShortcutHandler.getKeyCode(k);break}b.push({keyCode:g,modifiers:h})}return b};
goog.ui.KeyboardShortcutHandler.prototype.initializeKeyListener=function(a){this.keyTarget_=a;goog.events.listen(this.keyTarget_,goog.events.EventType.KEYDOWN,this.handleKeyDown_,!1,this);goog.userAgent.MAC&&(goog.userAgent.GECKO&&goog.userAgent.isVersion("1.8"))&&goog.events.listen(this.keyTarget_,goog.events.EventType.KEYUP,this.handleMacGeckoKeyUp_,!1,this);goog.userAgent.WINDOWS&&!goog.userAgent.GECKO&&(goog.events.listen(this.keyTarget_,goog.events.EventType.KEYPRESS,this.handleWindowsKeyPress_,
!1,this),goog.events.listen(this.keyTarget_,goog.events.EventType.KEYUP,this.handleWindowsKeyUp_,!1,this))};
goog.ui.KeyboardShortcutHandler.prototype.handleMacGeckoKeyUp_=function(a){if(a.keyCode==goog.events.KeyCodes.MAC_FF_META)this.metaKeyRecentlyReleased_=!0,goog.Timer.callOnce(function(){this.metaKeyRecentlyReleased_=!1},400,this);else{var b=a.metaKey||this.metaKeyRecentlyReleased_;if((a.keyCode==goog.events.KeyCodes.C||a.keyCode==goog.events.KeyCodes.X||a.keyCode==goog.events.KeyCodes.V)&&b)a.metaKey=b,this.handleKeyDown_(a)}};
goog.ui.KeyboardShortcutHandler.prototype.isPossiblePrintableKey_=function(a){return goog.userAgent.WINDOWS&&!goog.userAgent.GECKO&&a.ctrlKey&&a.altKey&&!a.shiftKey};goog.ui.KeyboardShortcutHandler.prototype.handleWindowsKeyPress_=function(a){32<a.keyCode&&this.isPossiblePrintableKey_(a)&&(this.isPrintableKey_=!0)};goog.ui.KeyboardShortcutHandler.prototype.handleWindowsKeyUp_=function(a){!this.isPrintableKey_&&this.isPossiblePrintableKey_(a)&&this.handleKeyDown_(a)};
goog.ui.KeyboardShortcutHandler.prototype.clearKeyListener=function(){goog.events.unlisten(this.keyTarget_,goog.events.EventType.KEYDOWN,this.handleKeyDown_,!1,this);goog.userAgent.MAC&&(goog.userAgent.GECKO&&goog.userAgent.isVersion("1.8"))&&goog.events.unlisten(this.keyTarget_,goog.events.EventType.KEYUP,this.handleMacGeckoKeyUp_,!1,this);goog.userAgent.WINDOWS&&!goog.userAgent.GECKO&&(goog.events.unlisten(this.keyTarget_,goog.events.EventType.KEYPRESS,this.handleWindowsKeyPress_,!1,this),goog.events.unlisten(this.keyTarget_,
goog.events.EventType.KEYUP,this.handleWindowsKeyUp_,!1,this));this.keyTarget_=null};goog.ui.KeyboardShortcutHandler.setShortcut_=function(a,b,c){var f=b.shift(),f=goog.ui.KeyboardShortcutHandler.makeKey_(f.keyCode,f.modifiers),g=a[f];if(g&&c&&(0==b.length||goog.isString(g)))throw Error("Keyboard shortcut conflicts with existing shortcut");b.length?(g||(g=a[f]={}),goog.ui.KeyboardShortcutHandler.setShortcut_(g,b,c)):a[f]=c};
goog.ui.KeyboardShortcutHandler.prototype.getShortcut_=function(a,b,c){b=b||0;return(c=(c||this.shortcuts_)[a[b]])&&!goog.isString(c)&&1<a.length-b?this.getShortcut_(a,b+1,c):c};goog.ui.KeyboardShortcutHandler.prototype.checkShortcut_=function(a){for(var b=this.shortcuts_;0<a.length&&b;){var c=a.shift(),c=goog.ui.KeyboardShortcutHandler.makeKey_(c.keyCode,c.modifiers),b=b[c];if(goog.isString(b))return!0}return!1};goog.ui.KeyboardShortcutHandler.makeKey_=function(a,b){return a&255|b<<8};
goog.ui.KeyboardShortcutHandler.prototype.handleKeyDown_=function(a){if(this.isValidShortcut_(a))if("keydown"==a.type&&this.isPossiblePrintableKey_(a))this.isPrintableKey_=!1;else{var b=goog.userAgent.GECKO?goog.events.KeyCodes.normalizeGeckoKeyCode(a.keyCode):a.keyCode,b=goog.ui.KeyboardShortcutHandler.makeKey_(b,(a.shiftKey?goog.ui.KeyboardShortcutHandler.Modifiers.SHIFT:0)|(a.ctrlKey?goog.ui.KeyboardShortcutHandler.Modifiers.CTRL:0)|(a.altKey?goog.ui.KeyboardShortcutHandler.Modifiers.ALT:0)|(a.metaKey?
goog.ui.KeyboardShortcutHandler.Modifiers.META:0)),c,f,g=goog.now();this.lastKeys_.strokes.length&&g-this.lastKeys_.time<=goog.ui.KeyboardShortcutHandler.MAX_KEY_SEQUENCE_DELAY?c=this.getShortcut_(this.lastKeys_.strokes):this.lastKeys_.strokes.length=0;c=c?c[b]:this.shortcuts_[b];c||(c=this.shortcuts_[b],this.lastKeys_.strokes=[]);c&&goog.isString(c)?f=c:c?(this.lastKeys_.strokes.push(b),this.lastKeys_.time=g,goog.userAgent.GECKO&&a.preventDefault()):this.lastKeys_.strokes.length=0;f&&(this.alwaysPreventDefault_&&
a.preventDefault(),this.alwaysStopPropagation_&&a.stopPropagation(),c=goog.ui.KeyboardShortcutHandler.EventType,b=a.target,g=new goog.ui.KeyboardShortcutEvent(c.SHORTCUT_TRIGGERED,f,b),g=this.dispatchEvent(g),f=new goog.ui.KeyboardShortcutEvent(c.SHORTCUT_PREFIX+f,f,b),(g&=this.dispatchEvent(f))||a.preventDefault(),this.lastKeys_.strokes.length=0)}};
goog.ui.KeyboardShortcutHandler.prototype.isValidShortcut_=function(a){var b=a.keyCode;if(b==goog.events.KeyCodes.SHIFT||b==goog.events.KeyCodes.CTRL||b==goog.events.KeyCodes.ALT)return!1;var c=a.target,f="TEXTAREA"==c.tagName||"INPUT"==c.tagName||"BUTTON"==c.tagName||"SELECT"==c.tagName,g=!f&&(c.isContentEditable||c.ownerDocument&&"on"==c.ownerDocument.designMode);return!f&&!g||this.globalKeys_[b]||this.allShortcutsAreGlobal_?!0:g?!1:this.modifierShortcutsAreGlobal_&&(a.altKey||a.ctrlKey||a.metaKey)?
!0:"INPUT"==c.tagName&&this.textInputs_[c.type]?b==goog.events.KeyCodes.ENTER:"INPUT"==c.tagName||"BUTTON"==c.tagName?b!=goog.events.KeyCodes.SPACE:!1};goog.ui.KeyboardShortcutEvent=function(a,b,c){goog.events.Event.call(this,a,c);this.identifier=b};goog.inherits(goog.ui.KeyboardShortcutEvent,goog.events.Event);goog.userAgent.product={};goog.userAgent.product.ASSUME_FIREFOX=!1;goog.userAgent.product.ASSUME_CAMINO=!1;goog.userAgent.product.ASSUME_IPHONE=!1;goog.userAgent.product.ASSUME_IPAD=!1;goog.userAgent.product.ASSUME_ANDROID=!1;goog.userAgent.product.ASSUME_CHROME=!1;goog.userAgent.product.ASSUME_SAFARI=!1;
goog.userAgent.product.PRODUCT_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_OPERA||goog.userAgent.product.ASSUME_FIREFOX||goog.userAgent.product.ASSUME_CAMINO||goog.userAgent.product.ASSUME_IPHONE||goog.userAgent.product.ASSUME_IPAD||goog.userAgent.product.ASSUME_ANDROID||goog.userAgent.product.ASSUME_CHROME||goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.init_=function(){goog.userAgent.product.detectedFirefox_=!1;goog.userAgent.product.detectedCamino_=!1;goog.userAgent.product.detectedIphone_=!1;goog.userAgent.product.detectedIpad_=!1;goog.userAgent.product.detectedAndroid_=!1;goog.userAgent.product.detectedChrome_=!1;goog.userAgent.product.detectedSafari_=!1;var a=goog.userAgent.getUserAgentString();a&&(-1!=a.indexOf("Firefox")?goog.userAgent.product.detectedFirefox_=!0:-1!=a.indexOf("Camino")?goog.userAgent.product.detectedCamino_=
!0:-1!=a.indexOf("iPhone")||-1!=a.indexOf("iPod")?goog.userAgent.product.detectedIphone_=!0:-1!=a.indexOf("iPad")?goog.userAgent.product.detectedIpad_=!0:-1!=a.indexOf("Android")?goog.userAgent.product.detectedAndroid_=!0:-1!=a.indexOf("Chrome")?goog.userAgent.product.detectedChrome_=!0:-1!=a.indexOf("Safari")&&(goog.userAgent.product.detectedSafari_=!0))};goog.userAgent.product.PRODUCT_KNOWN_||goog.userAgent.product.init_();goog.userAgent.product.OPERA=goog.userAgent.OPERA;
goog.userAgent.product.IE=goog.userAgent.IE;goog.userAgent.product.FIREFOX=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_FIREFOX:goog.userAgent.product.detectedFirefox_;goog.userAgent.product.CAMINO=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_CAMINO:goog.userAgent.product.detectedCamino_;goog.userAgent.product.IPHONE=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPHONE:goog.userAgent.product.detectedIphone_;
goog.userAgent.product.IPAD=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPAD:goog.userAgent.product.detectedIpad_;goog.userAgent.product.ANDROID=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_ANDROID:goog.userAgent.product.detectedAndroid_;goog.userAgent.product.CHROME=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_CHROME:goog.userAgent.product.detectedChrome_;
goog.userAgent.product.SAFARI=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_SAFARI:goog.userAgent.product.detectedSafari_;goog.ui.MenuSeparatorRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.MenuSeparatorRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);goog.ui.MenuSeparatorRenderer.CSS_CLASS="goog-menuseparator";goog.ui.MenuSeparatorRenderer.prototype.createDom=function(a){return a.getDomHelper().createDom("div",this.getCssClass())};
goog.ui.MenuSeparatorRenderer.prototype.decorate=function(a,b){b.id&&a.setId(b.id);if("HR"==b.tagName){var c=b;b=this.createDom(a);goog.dom.insertSiblingBefore(b,c);goog.dom.removeNode(c)}else goog.dom.classes.add(b,this.getCssClass());return b};goog.ui.MenuSeparatorRenderer.prototype.setContent=function(a,b){};goog.ui.MenuSeparatorRenderer.prototype.getCssClass=function(){return goog.ui.MenuSeparatorRenderer.CSS_CLASS};goog.ui.Separator=function(a,b){goog.ui.Control.call(this,null,a||goog.ui.MenuSeparatorRenderer.getInstance(),b);this.setSupportedState(goog.ui.Component.State.DISABLED,!1);this.setSupportedState(goog.ui.Component.State.HOVER,!1);this.setSupportedState(goog.ui.Component.State.ACTIVE,!1);this.setSupportedState(goog.ui.Component.State.FOCUSED,!1);this.setStateInternal(goog.ui.Component.State.DISABLED)};goog.inherits(goog.ui.Separator,goog.ui.Control);
goog.ui.Separator.prototype.enterDocument=function(){goog.ui.Separator.superClass_.enterDocument.call(this);var a=this.getElement();goog.asserts.assert(a,"The DOM element for the separator cannot be null.");goog.a11y.aria.setRole(a,"separator")};goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS,function(){return new goog.ui.Separator});goog.ui.ContainerRenderer=function(){};goog.addSingletonGetter(goog.ui.ContainerRenderer);goog.ui.ContainerRenderer.getCustomRenderer=function(a,b){var c=new a;c.getCssClass=function(){return b};return c};goog.ui.ContainerRenderer.CSS_CLASS="goog-container";goog.ui.ContainerRenderer.prototype.getAriaRole=function(){};goog.ui.ContainerRenderer.prototype.enableTabIndex=function(a,b){a&&(a.tabIndex=b?0:-1)};
goog.ui.ContainerRenderer.prototype.createDom=function(a){return a.getDomHelper().createDom("div",this.getClassNames(a).join(" "))};goog.ui.ContainerRenderer.prototype.getContentElement=function(a){return a};goog.ui.ContainerRenderer.prototype.canDecorate=function(a){return"DIV"==a.tagName};
goog.ui.ContainerRenderer.prototype.decorate=function(a,b){b.id&&a.setId(b.id);var c=this.getCssClass(),f=!1,g=goog.dom.classes.get(b);g&&goog.array.forEach(g,function(b){b==c?f=!0:b&&this.setStateFromClassName(a,b,c)},this);f||goog.dom.classes.add(b,c);this.decorateChildren(a,this.getContentElement(b));return b};
goog.ui.ContainerRenderer.prototype.setStateFromClassName=function(a,b,c){b==c+"-disabled"?a.setEnabled(!1):b==c+"-horizontal"?a.setOrientation(goog.ui.Container.Orientation.HORIZONTAL):b==c+"-vertical"&&a.setOrientation(goog.ui.Container.Orientation.VERTICAL)};
goog.ui.ContainerRenderer.prototype.decorateChildren=function(a,b,c){if(b){c=c||b.firstChild;for(var f;c&&c.parentNode==b;){f=c.nextSibling;if(c.nodeType==goog.dom.NodeType.ELEMENT){var g=this.getDecoratorForChild(c);g&&(g.setElementInternal(c),a.isEnabled()||g.setEnabled(!1),a.addChild(g),g.decorate(c))}else(!c.nodeValue||""==goog.string.trim(c.nodeValue))&&b.removeChild(c);c=f}}};goog.ui.ContainerRenderer.prototype.getDecoratorForChild=function(a){return goog.ui.registry.getDecorator(a)};
goog.ui.ContainerRenderer.prototype.initializeDom=function(a){a=a.getElement();goog.asserts.assert(a,"The container DOM element cannot be null.");goog.style.setUnselectable(a,!0,goog.userAgent.GECKO);goog.userAgent.IE&&(a.hideFocus=!0);var b=this.getAriaRole();b&&goog.a11y.aria.setRole(a,b)};goog.ui.ContainerRenderer.prototype.getKeyEventTarget=function(a){return a.getElement()};goog.ui.ContainerRenderer.prototype.getCssClass=function(){return goog.ui.ContainerRenderer.CSS_CLASS};
goog.ui.ContainerRenderer.prototype.getClassNames=function(a){var b=this.getCssClass(),c=a.getOrientation()==goog.ui.Container.Orientation.HORIZONTAL,c=[b,c?b+"-horizontal":b+"-vertical"];a.isEnabled()||c.push(b+"-disabled");return c};goog.ui.ContainerRenderer.prototype.getDefaultOrientation=function(){return goog.ui.Container.Orientation.VERTICAL};goog.ui.MenuRenderer=function(){goog.ui.ContainerRenderer.call(this)};goog.inherits(goog.ui.MenuRenderer,goog.ui.ContainerRenderer);goog.addSingletonGetter(goog.ui.MenuRenderer);goog.ui.MenuRenderer.CSS_CLASS="goog-menu";goog.ui.MenuRenderer.prototype.getAriaRole=function(){return goog.a11y.aria.Role.MENU};goog.ui.MenuRenderer.prototype.canDecorate=function(a){return"UL"==a.tagName||goog.ui.MenuRenderer.superClass_.canDecorate.call(this,a)};
goog.ui.MenuRenderer.prototype.getDecoratorForChild=function(a){return"HR"==a.tagName?new goog.ui.Separator:goog.ui.MenuRenderer.superClass_.getDecoratorForChild.call(this,a)};goog.ui.MenuRenderer.prototype.containsElement=function(a,b){return goog.dom.contains(a.getElement(),b)};goog.ui.MenuRenderer.prototype.getCssClass=function(){return goog.ui.MenuRenderer.CSS_CLASS};
goog.ui.MenuRenderer.prototype.initializeDom=function(a){goog.ui.MenuRenderer.superClass_.initializeDom.call(this,a);a=a.getElement();goog.asserts.assert(a,"The menu DOM element cannot be null.");goog.a11y.aria.setState(a,goog.a11y.aria.State.HASPOPUP,"true")};goog.ui.MenuSeparator=function(a){goog.ui.Separator.call(this,goog.ui.MenuSeparatorRenderer.getInstance(),a)};goog.inherits(goog.ui.MenuSeparator,goog.ui.Separator);goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS,function(){return new goog.ui.Separator});goog.dom.classlist={};goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST=!1;goog.dom.classlist.NATIVE_DOM_TOKEN_LIST_=goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST||"undefined"!=typeof DOMTokenList;goog.dom.classlist.get=goog.dom.classlist.NATIVE_DOM_TOKEN_LIST_?function(a){return a.classList}:function(a){a=a.className;return goog.isString(a)&&a.match(/\S+/g)||[]};goog.dom.classlist.set=function(a,b){a.className=b};
goog.dom.classlist.contains=goog.dom.classlist.NATIVE_DOM_TOKEN_LIST_?function(a,b){goog.asserts.assert(!!a.classList);return a.classList.contains(b)}:function(a,b){return goog.array.contains(goog.dom.classlist.get(a),b)};goog.dom.classlist.add=goog.dom.classlist.NATIVE_DOM_TOKEN_LIST_?function(a,b){a.classList.add(b)}:function(a,b){goog.dom.classlist.contains(a,b)||(a.className+=0<a.className.length?" "+b:b)};
goog.dom.classlist.addAll=goog.dom.classlist.NATIVE_DOM_TOKEN_LIST_?function(a,b){goog.array.forEach(b,function(b){goog.dom.classlist.add(a,b)})}:function(a,b){var c={};goog.array.forEach(goog.dom.classlist.get(a),function(a){c[a]=!0});goog.array.forEach(b,function(a){c[a]=!0});a.className="";for(var f in c)a.className+=0<a.className.length?" "+f:f};
goog.dom.classlist.remove=goog.dom.classlist.NATIVE_DOM_TOKEN_LIST_?function(a,b){a.classList.remove(b)}:function(a,b){goog.dom.classlist.contains(a,b)&&(a.className=goog.array.filter(goog.dom.classlist.get(a),function(a){return a!=b}).join(" "))};
goog.dom.classlist.removeAll=goog.dom.classlist.NATIVE_DOM_TOKEN_LIST_?function(a,b){goog.array.forEach(b,function(b){goog.dom.classlist.remove(a,b)})}:function(a,b){a.className=goog.array.filter(goog.dom.classlist.get(a),function(a){return!goog.array.contains(b,a)}).join(" ")};goog.dom.classlist.enable=function(a,b,c){c?goog.dom.classlist.add(a,b):goog.dom.classlist.remove(a,b)};
goog.dom.classlist.swap=function(a,b,c){return goog.dom.classlist.contains(a,b)?(goog.dom.classlist.remove(a,b),goog.dom.classlist.add(a,c),!0):!1};goog.dom.classlist.toggle=function(a,b){var c=!goog.dom.classlist.contains(a,b);goog.dom.classlist.enable(a,b,c);return c};goog.dom.classlist.addRemove=function(a,b,c){goog.dom.classlist.remove(a,b);goog.dom.classlist.add(a,c)};goog.ui.MenuItemRenderer=function(){goog.ui.ControlRenderer.call(this);this.classNameCache_=[]};goog.inherits(goog.ui.MenuItemRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.MenuItemRenderer);goog.ui.MenuItemRenderer.CSS_CLASS="goog-menuitem";goog.ui.MenuItemRenderer.CompositeCssClassIndex_={HOVER:0,CHECKBOX:1,CONTENT:2};
goog.ui.MenuItemRenderer.prototype.getCompositeCssClass_=function(a){var b=this.classNameCache_[a];if(!b){switch(a){case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER:b=this.getStructuralCssClass()+"-highlight";break;case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX:b=this.getStructuralCssClass()+"-checkbox";break;case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT:b=this.getStructuralCssClass()+"-content"}this.classNameCache_[a]=b}return b};
goog.ui.MenuItemRenderer.prototype.getAriaRole=function(){return goog.a11y.aria.Role.MENU_ITEM};goog.ui.MenuItemRenderer.prototype.createDom=function(a){var b=a.getDomHelper().createDom("div",this.getClassNames(a).join(" "),this.createContent(a.getContent(),a.getDomHelper()));this.setEnableCheckBoxStructure(a,b,a.isSupportedState(goog.ui.Component.State.SELECTED)||a.isSupportedState(goog.ui.Component.State.CHECKED));this.setAriaStates(a,b);return b};
goog.ui.MenuItemRenderer.prototype.getContentElement=function(a){return a&&a.firstChild};goog.ui.MenuItemRenderer.prototype.decorate=function(a,b){this.hasContentStructure(b)||b.appendChild(this.createContent(b.childNodes,a.getDomHelper()));goog.dom.classlist.contains(b,"goog-option")&&(a.setCheckable(!0),this.setCheckable(a,b,!0));return goog.ui.MenuItemRenderer.superClass_.decorate.call(this,a,b)};
goog.ui.MenuItemRenderer.prototype.setContent=function(a,b){var c=this.getContentElement(a),f=this.hasCheckBoxStructure(a)?c.firstChild:null;goog.ui.MenuItemRenderer.superClass_.setContent.call(this,a,b);f&&!this.hasCheckBoxStructure(a)&&c.insertBefore(f,c.firstChild||null)};
goog.ui.MenuItemRenderer.prototype.hasContentStructure=function(a){a=goog.dom.getFirstElementChild(a);var b=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);return!!a&&goog.dom.classlist.contains(a,b)};goog.ui.MenuItemRenderer.prototype.createContent=function(a,b){var c=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);return b.createDom("div",c,a)};
goog.ui.MenuItemRenderer.prototype.setSelectable=function(a,b,c){b&&(goog.a11y.aria.setRole(b,c?goog.a11y.aria.Role.MENU_ITEM_RADIO:this.getAriaRole()),this.setEnableCheckBoxStructure(a,b,c))};goog.ui.MenuItemRenderer.prototype.setCheckable=function(a,b,c){b&&(goog.a11y.aria.setRole(b,c?goog.a11y.aria.Role.MENU_ITEM_CHECKBOX:this.getAriaRole()),this.setEnableCheckBoxStructure(a,b,c))};
goog.ui.MenuItemRenderer.prototype.hasCheckBoxStructure=function(a){if(a=this.getContentElement(a)){a=goog.dom.getFirstElementChild(a);var b=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);return!!a&&goog.dom.classlist.contains(a,b)}return!1};
goog.ui.MenuItemRenderer.prototype.setEnableCheckBoxStructure=function(a,b,c){c!=this.hasCheckBoxStructure(b)&&(goog.dom.classlist.enable(b,"goog-option",c),b=this.getContentElement(b),c?(c=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX),b.insertBefore(a.getDomHelper().createDom("div",c),b.firstChild||null)):b.removeChild(b.firstChild))};
goog.ui.MenuItemRenderer.prototype.getClassForState=function(a){switch(a){case goog.ui.Component.State.HOVER:return this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);case goog.ui.Component.State.CHECKED:case goog.ui.Component.State.SELECTED:return"goog-option-selected";default:return goog.ui.MenuItemRenderer.superClass_.getClassForState.call(this,a)}};
goog.ui.MenuItemRenderer.prototype.getStateFromClass=function(a){var b=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);switch(a){case "goog-option-selected":return goog.ui.Component.State.CHECKED;case b:return goog.ui.Component.State.HOVER;default:return goog.ui.MenuItemRenderer.superClass_.getStateFromClass.call(this,a)}};goog.ui.MenuItemRenderer.prototype.getCssClass=function(){return goog.ui.MenuItemRenderer.CSS_CLASS};goog.ui.MenuItem=function(a,b,c,f){goog.ui.Control.call(this,a,f||goog.ui.MenuItemRenderer.getInstance(),c);this.setValue(b)};goog.inherits(goog.ui.MenuItem,goog.ui.Control);goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_="goog-menuitem-mnemonic-separator";goog.ui.MenuItem.ACCELERATOR_CLASS_="goog-menuitem-accel";goog.ui.MenuItem.prototype.getValue=function(){var a=this.getModel();return null!=a?a:this.getCaption()};goog.ui.MenuItem.prototype.setValue=function(a){this.setModel(a)};
goog.ui.MenuItem.prototype.setSelectable=function(a){this.setSupportedState(goog.ui.Component.State.SELECTED,a);this.isChecked()&&!a&&this.setChecked(!1);var b=this.getElement();b&&this.getRenderer().setSelectable(this,b,a)};goog.ui.MenuItem.prototype.setCheckable=function(a){this.setSupportedState(goog.ui.Component.State.CHECKED,a);var b=this.getElement();b&&this.getRenderer().setCheckable(this,b,a)};
goog.ui.MenuItem.prototype.getCaption=function(){var a=this.getContent();if(goog.isArray(a)){var b=goog.ui.MenuItem.ACCELERATOR_CLASS_,c=goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_,a=goog.array.map(a,function(a){var g=goog.dom.classes.get(a);return goog.array.contains(g,b)||goog.array.contains(g,c)?"":goog.dom.getRawTextContent(a)}).join("");return goog.string.collapseBreakingSpaces(a)}return goog.ui.MenuItem.superClass_.getCaption.call(this)};
goog.ui.MenuItem.prototype.handleMouseUp=function(a){var b=this.getParent();if(b){var c=b.openingCoords;b.openingCoords=null;if(c&&goog.isNumber(a.clientX)&&(b=new goog.math.Coordinate(a.clientX,a.clientY),goog.math.Coordinate.equals(c,b)))return}goog.ui.MenuItem.superClass_.handleMouseUp.call(this,a)};goog.ui.MenuItem.prototype.handleKeyEventInternal=function(a){return a.keyCode==this.getMnemonic()&&this.performActionInternal(a)?!0:goog.ui.MenuItem.superClass_.handleKeyEventInternal.call(this,a)};
goog.ui.MenuItem.prototype.setMnemonic=function(a){this.mnemonicKey_=a};goog.ui.MenuItem.prototype.getMnemonic=function(){return this.mnemonicKey_};goog.ui.registry.setDecoratorByClassName(goog.ui.MenuItemRenderer.CSS_CLASS,function(){return new goog.ui.MenuItem(null)});goog.ui.Container=function(a,b,c){goog.ui.Component.call(this,c);this.renderer_=b||goog.ui.ContainerRenderer.getInstance();this.orientation_=a||this.renderer_.getDefaultOrientation()};goog.inherits(goog.ui.Container,goog.ui.Component);goog.ui.Container.EventType={AFTER_SHOW:"aftershow",AFTER_HIDE:"afterhide"};goog.ui.Container.Orientation={HORIZONTAL:"horizontal",VERTICAL:"vertical"};goog.ui.Container.prototype.keyEventTarget_=null;goog.ui.Container.prototype.keyHandler_=null;
goog.ui.Container.prototype.renderer_=null;goog.ui.Container.prototype.orientation_=null;goog.ui.Container.prototype.visible_=!0;goog.ui.Container.prototype.enabled_=!0;goog.ui.Container.prototype.focusable_=!0;goog.ui.Container.prototype.highlightedIndex_=-1;goog.ui.Container.prototype.openItem_=null;goog.ui.Container.prototype.mouseButtonPressed_=!1;goog.ui.Container.prototype.allowFocusableChildren_=!1;goog.ui.Container.prototype.openFollowsHighlight_=!0;
goog.ui.Container.prototype.childElementIdMap_=null;goog.ui.Container.prototype.getKeyEventTarget=function(){return this.keyEventTarget_||this.renderer_.getKeyEventTarget(this)};
goog.ui.Container.prototype.setKeyEventTarget=function(a){if(this.focusable_){var b=this.getKeyEventTarget(),c=this.isInDocument();this.keyEventTarget_=a;var f=this.getKeyEventTarget();c&&(this.keyEventTarget_=b,this.enableFocusHandling_(!1),this.keyEventTarget_=a,this.getKeyHandler().attach(f),this.enableFocusHandling_(!0))}else throw Error("Can't set key event target for container that doesn't support keyboard focus!");};
goog.ui.Container.prototype.getKeyHandler=function(){return this.keyHandler_||(this.keyHandler_=new goog.events.KeyHandler(this.getKeyEventTarget()))};goog.ui.Container.prototype.getRenderer=function(){return this.renderer_};goog.ui.Container.prototype.setRenderer=function(a){if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.renderer_=a};goog.ui.Container.prototype.createDom=function(){this.setElementInternal(this.renderer_.createDom(this))};
goog.ui.Container.prototype.getContentElement=function(){return this.renderer_.getContentElement(this.getElement())};goog.ui.Container.prototype.canDecorate=function(a){return this.renderer_.canDecorate(a)};goog.ui.Container.prototype.decorateInternal=function(a){this.setElementInternal(this.renderer_.decorate(this,a));"none"==a.style.display&&(this.visible_=!1)};
goog.ui.Container.prototype.enterDocument=function(){goog.ui.Container.superClass_.enterDocument.call(this);this.forEachChild(function(a){a.isInDocument()&&this.registerChildId_(a)},this);var a=this.getElement();this.renderer_.initializeDom(this);this.setVisible(this.visible_,!0);this.getHandler().listen(this,goog.ui.Component.EventType.ENTER,this.handleEnterItem).listen(this,goog.ui.Component.EventType.HIGHLIGHT,this.handleHighlightItem).listen(this,goog.ui.Component.EventType.UNHIGHLIGHT,this.handleUnHighlightItem).listen(this,
goog.ui.Component.EventType.OPEN,this.handleOpenItem).listen(this,goog.ui.Component.EventType.CLOSE,this.handleCloseItem).listen(a,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).listen(goog.dom.getOwnerDocument(a),goog.events.EventType.MOUSEUP,this.handleDocumentMouseUp).listen(a,[goog.events.EventType.MOUSEDOWN,goog.events.EventType.MOUSEUP,goog.events.EventType.MOUSEOVER,goog.events.EventType.MOUSEOUT,goog.events.EventType.CONTEXTMENU],this.handleChildMouseEvents);this.isFocusable()&&this.enableFocusHandling_(!0)};
goog.ui.Container.prototype.enableFocusHandling_=function(a){var b=this.getHandler(),c=this.getKeyEventTarget();a?b.listen(c,goog.events.EventType.FOCUS,this.handleFocus).listen(c,goog.events.EventType.BLUR,this.handleBlur).listen(this.getKeyHandler(),goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent):b.unlisten(c,goog.events.EventType.FOCUS,this.handleFocus).unlisten(c,goog.events.EventType.BLUR,this.handleBlur).unlisten(this.getKeyHandler(),goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent)};
goog.ui.Container.prototype.exitDocument=function(){this.setHighlightedIndex(-1);this.openItem_&&this.openItem_.setOpen(!1);this.mouseButtonPressed_=!1;goog.ui.Container.superClass_.exitDocument.call(this)};goog.ui.Container.prototype.disposeInternal=function(){goog.ui.Container.superClass_.disposeInternal.call(this);this.keyHandler_&&(this.keyHandler_.dispose(),this.keyHandler_=null);this.renderer_=this.openItem_=this.childElementIdMap_=this.keyEventTarget_=null};
goog.ui.Container.prototype.handleEnterItem=function(a){return!0};
goog.ui.Container.prototype.handleHighlightItem=function(a){var b=this.indexOfChild(a.target);if(-1<b&&b!=this.highlightedIndex_){var c=this.getHighlighted();c&&c.setHighlighted(!1);this.highlightedIndex_=b;c=this.getHighlighted();this.isMouseButtonPressed()&&c.setActive(!0);this.openFollowsHighlight_&&(this.openItem_&&c!=this.openItem_)&&(c.isSupportedState(goog.ui.Component.State.OPENED)?c.setOpen(!0):this.openItem_.setOpen(!1))}b=this.getElement();goog.asserts.assert(b,"The DOM element for the container cannot be null.");
null!=a.target.getElement()&&goog.a11y.aria.setState(b,goog.a11y.aria.State.ACTIVEDESCENDANT,a.target.getElement().id)};goog.ui.Container.prototype.handleUnHighlightItem=function(a){a.target==this.getHighlighted()&&(this.highlightedIndex_=-1);a=this.getElement();goog.asserts.assert(a,"The DOM element for the container cannot be null.");goog.a11y.aria.setState(a,goog.a11y.aria.State.ACTIVEDESCENDANT,"")};
goog.ui.Container.prototype.handleOpenItem=function(a){if((a=a.target)&&a!=this.openItem_&&a.getParent()==this)this.openItem_&&this.openItem_.setOpen(!1),this.openItem_=a};goog.ui.Container.prototype.handleCloseItem=function(a){a.target==this.openItem_&&(this.openItem_=null)};goog.ui.Container.prototype.handleMouseDown=function(a){this.enabled_&&this.setMouseButtonPressed(!0);var b=this.getKeyEventTarget();b&&goog.dom.isFocusableTabIndex(b)?b.focus():a.preventDefault()};
goog.ui.Container.prototype.handleDocumentMouseUp=function(a){this.setMouseButtonPressed(!1)};goog.ui.Container.prototype.handleChildMouseEvents=function(a){var b=this.getOwnerControl(a.target);if(b)switch(a.type){case goog.events.EventType.MOUSEDOWN:b.handleMouseDown(a);break;case goog.events.EventType.MOUSEUP:b.handleMouseUp(a);break;case goog.events.EventType.MOUSEOVER:b.handleMouseOver(a);break;case goog.events.EventType.MOUSEOUT:b.handleMouseOut(a);break;case goog.events.EventType.CONTEXTMENU:b.handleContextMenu(a)}};
goog.ui.Container.prototype.getOwnerControl=function(a){if(this.childElementIdMap_)for(var b=this.getElement();a&&a!==b;){var c=a.id;if(c in this.childElementIdMap_)return this.childElementIdMap_[c];a=a.parentNode}return null};goog.ui.Container.prototype.handleFocus=function(a){};goog.ui.Container.prototype.handleBlur=function(a){this.setHighlightedIndex(-1);this.setMouseButtonPressed(!1);this.openItem_&&this.openItem_.setOpen(!1)};
goog.ui.Container.prototype.handleKeyEvent=function(a){return this.isEnabled()&&this.isVisible()&&(0!=this.getChildCount()||this.keyEventTarget_)&&this.handleKeyEventInternal(a)?(a.preventDefault(),a.stopPropagation(),!0):!1};
goog.ui.Container.prototype.handleKeyEventInternal=function(a){var b=this.getHighlighted();if(b&&"function"==typeof b.handleKeyEvent&&b.handleKeyEvent(a)||this.openItem_&&this.openItem_!=b&&"function"==typeof this.openItem_.handleKeyEvent&&this.openItem_.handleKeyEvent(a))return!0;if(a.shiftKey||a.ctrlKey||a.metaKey||a.altKey)return!1;switch(a.keyCode){case goog.events.KeyCodes.ESC:if(this.isFocusable())this.getKeyEventTarget().blur();else return!1;break;case goog.events.KeyCodes.HOME:this.highlightFirst();
break;case goog.events.KeyCodes.END:this.highlightLast();break;case goog.events.KeyCodes.UP:if(this.orientation_==goog.ui.Container.Orientation.VERTICAL)this.highlightPrevious();else return!1;break;case goog.events.KeyCodes.LEFT:if(this.orientation_==goog.ui.Container.Orientation.HORIZONTAL)this.isRightToLeft()?this.highlightNext():this.highlightPrevious();else return!1;break;case goog.events.KeyCodes.DOWN:if(this.orientation_==goog.ui.Container.Orientation.VERTICAL)this.highlightNext();else return!1;
break;case goog.events.KeyCodes.RIGHT:if(this.orientation_==goog.ui.Container.Orientation.HORIZONTAL)this.isRightToLeft()?this.highlightPrevious():this.highlightNext();else return!1;break;default:return!1}return!0};goog.ui.Container.prototype.registerChildId_=function(a){var b=a.getElement(),b=b.id||(b.id=a.getId());this.childElementIdMap_||(this.childElementIdMap_={});this.childElementIdMap_[b]=a};
goog.ui.Container.prototype.addChild=function(a,b){goog.asserts.assertInstanceof(a,goog.ui.Control,"The child of a container must be a control");goog.ui.Container.superClass_.addChild.call(this,a,b)};
goog.ui.Container.prototype.addChildAt=function(a,b,c){a.setDispatchTransitionEvents(goog.ui.Component.State.HOVER,!0);a.setDispatchTransitionEvents(goog.ui.Component.State.OPENED,!0);(this.isFocusable()||!this.isFocusableChildrenAllowed())&&a.setSupportedState(goog.ui.Component.State.FOCUSED,!1);a.setHandleMouseEvents(!1);goog.ui.Container.superClass_.addChildAt.call(this,a,b,c);a.isInDocument()&&this.isInDocument()&&this.registerChildId_(a);b<=this.highlightedIndex_&&this.highlightedIndex_++};
goog.ui.Container.prototype.removeChild=function(a,b){if(a=goog.isString(a)?this.getChild(a):a){var c=this.indexOfChild(a);-1!=c&&(c==this.highlightedIndex_?a.setHighlighted(!1):c<this.highlightedIndex_&&this.highlightedIndex_--);(c=a.getElement())&&(c.id&&this.childElementIdMap_)&&goog.object.remove(this.childElementIdMap_,c.id)}a=goog.ui.Container.superClass_.removeChild.call(this,a,b);a.setHandleMouseEvents(!0);return a};goog.ui.Container.prototype.getOrientation=function(){return this.orientation_};
goog.ui.Container.prototype.setOrientation=function(a){if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.orientation_=a};goog.ui.Container.prototype.isVisible=function(){return this.visible_};
goog.ui.Container.prototype.setVisible=function(a,b){if(b||this.visible_!=a&&this.dispatchEvent(a?goog.ui.Component.EventType.SHOW:goog.ui.Component.EventType.HIDE)){this.visible_=a;var c=this.getElement();c&&(goog.style.showElement(c,a),this.isFocusable()&&this.renderer_.enableTabIndex(this.getKeyEventTarget(),this.enabled_&&this.visible_),b||this.dispatchEvent(this.visible_?goog.ui.Container.EventType.AFTER_SHOW:goog.ui.Container.EventType.AFTER_HIDE));return!0}return!1};
goog.ui.Container.prototype.isEnabled=function(){return this.enabled_};
goog.ui.Container.prototype.setEnabled=function(a){if(this.enabled_!=a&&this.dispatchEvent(a?goog.ui.Component.EventType.ENABLE:goog.ui.Component.EventType.DISABLE))a?(this.enabled_=!0,this.forEachChild(function(a){a.wasDisabled?delete a.wasDisabled:a.setEnabled(!0)})):(this.forEachChild(function(a){a.isEnabled()?a.setEnabled(!1):a.wasDisabled=!0}),this.enabled_=!1,this.setMouseButtonPressed(!1)),this.isFocusable()&&this.renderer_.enableTabIndex(this.getKeyEventTarget(),a&&this.visible_)};
goog.ui.Container.prototype.isFocusable=function(){return this.focusable_};goog.ui.Container.prototype.setFocusable=function(a){a!=this.focusable_&&this.isInDocument()&&this.enableFocusHandling_(a);this.focusable_=a;this.enabled_&&this.visible_&&this.renderer_.enableTabIndex(this.getKeyEventTarget(),a)};goog.ui.Container.prototype.isFocusableChildrenAllowed=function(){return this.allowFocusableChildren_};
goog.ui.Container.prototype.setFocusableChildrenAllowed=function(a){this.allowFocusableChildren_=a};goog.ui.Container.prototype.isOpenFollowsHighlight=function(){return this.openFollowsHighlight_};goog.ui.Container.prototype.setOpenFollowsHighlight=function(a){this.openFollowsHighlight_=a};goog.ui.Container.prototype.getHighlightedIndex=function(){return this.highlightedIndex_};
goog.ui.Container.prototype.setHighlightedIndex=function(a){(a=this.getChildAt(a))?a.setHighlighted(!0):-1<this.highlightedIndex_&&this.getHighlighted().setHighlighted(!1)};goog.ui.Container.prototype.setHighlighted=function(a){this.setHighlightedIndex(this.indexOfChild(a))};goog.ui.Container.prototype.getHighlighted=function(){return this.getChildAt(this.highlightedIndex_)};
goog.ui.Container.prototype.highlightFirst=function(){this.highlightHelper(function(a,b){return(a+1)%b},this.getChildCount()-1)};goog.ui.Container.prototype.highlightLast=function(){this.highlightHelper(function(a,b){a--;return 0>a?b-1:a},0)};goog.ui.Container.prototype.highlightNext=function(){this.highlightHelper(function(a,b){return(a+1)%b},this.highlightedIndex_)};goog.ui.Container.prototype.highlightPrevious=function(){this.highlightHelper(function(a,b){a--;return 0>a?b-1:a},this.highlightedIndex_)};
goog.ui.Container.prototype.highlightHelper=function(a,b){for(var c=0>b?this.indexOfChild(this.openItem_):b,f=this.getChildCount(),c=a.call(this,c,f),g=0;g<=f;){var h=this.getChildAt(c);if(h&&this.canHighlightItem(h))return this.setHighlightedIndexFromKeyEvent(c),!0;g++;c=a.call(this,c,f)}return!1};goog.ui.Container.prototype.canHighlightItem=function(a){return a.isVisible()&&a.isEnabled()&&a.isSupportedState(goog.ui.Component.State.HOVER)};
goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent=function(a){this.setHighlightedIndex(a)};goog.ui.Container.prototype.getOpenItem=function(){return this.openItem_};goog.ui.Container.prototype.isMouseButtonPressed=function(){return this.mouseButtonPressed_};goog.ui.Container.prototype.setMouseButtonPressed=function(a){this.mouseButtonPressed_=a};goog.ui.MenuHeaderRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.MenuHeaderRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.MenuHeaderRenderer);goog.ui.MenuHeaderRenderer.CSS_CLASS="goog-menuheader";goog.ui.MenuHeaderRenderer.prototype.getCssClass=function(){return goog.ui.MenuHeaderRenderer.CSS_CLASS};goog.ui.MenuHeader=function(a,b,c){goog.ui.Control.call(this,a,c||goog.ui.MenuHeaderRenderer.getInstance(),b);this.setSupportedState(goog.ui.Component.State.DISABLED,!1);this.setSupportedState(goog.ui.Component.State.HOVER,!1);this.setSupportedState(goog.ui.Component.State.ACTIVE,!1);this.setSupportedState(goog.ui.Component.State.FOCUSED,!1);this.setStateInternal(goog.ui.Component.State.DISABLED)};goog.inherits(goog.ui.MenuHeader,goog.ui.Control);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuHeaderRenderer.CSS_CLASS,function(){return new goog.ui.MenuHeader(null)});goog.ui.Menu=function(a,b){goog.ui.Container.call(this,goog.ui.Container.Orientation.VERTICAL,b||goog.ui.MenuRenderer.getInstance(),a);this.setFocusable(!1)};goog.inherits(goog.ui.Menu,goog.ui.Container);goog.ui.Menu.EventType={BEFORE_SHOW:goog.ui.Component.EventType.BEFORE_SHOW,SHOW:goog.ui.Component.EventType.SHOW,BEFORE_HIDE:goog.ui.Component.EventType.HIDE,HIDE:goog.ui.Component.EventType.HIDE};goog.ui.Menu.CSS_CLASS=goog.ui.MenuRenderer.CSS_CLASS;goog.ui.Menu.prototype.allowAutoFocus_=!0;
goog.ui.Menu.prototype.allowHighlightDisabled_=!1;goog.ui.Menu.prototype.getCssClass=function(){return this.getRenderer().getCssClass()};goog.ui.Menu.prototype.containsElement=function(a){if(this.getRenderer().containsElement(this,a))return!0;for(var b=0,c=this.getChildCount();b<c;b++){var f=this.getChildAt(b);if("function"==typeof f.containsElement&&f.containsElement(a))return!0}return!1};goog.ui.Menu.prototype.addItem=function(a){this.addChild(a,!0)};
goog.ui.Menu.prototype.addItemAt=function(a,b){this.addChildAt(a,b,!0)};goog.ui.Menu.prototype.removeItem=function(a){(a=this.removeChild(a,!0))&&a.dispose()};goog.ui.Menu.prototype.removeItemAt=function(a){(a=this.removeChildAt(a,!0))&&a.dispose()};goog.ui.Menu.prototype.getItemAt=function(a){return this.getChildAt(a)};goog.ui.Menu.prototype.getItemCount=function(){return this.getChildCount()};goog.ui.Menu.prototype.getItems=function(){var a=[];this.forEachChild(function(b){a.push(b)});return a};
goog.ui.Menu.prototype.setPosition=function(a,b){var c=this.isVisible();c||goog.style.showElement(this.getElement(),!0);goog.style.setPageOffset(this.getElement(),a,b);c||goog.style.showElement(this.getElement(),!1)};goog.ui.Menu.prototype.getPosition=function(){return this.isVisible()?goog.style.getPageOffset(this.getElement()):null};goog.ui.Menu.prototype.setAllowAutoFocus=function(a){(this.allowAutoFocus_=a)&&this.setFocusable(!0)};goog.ui.Menu.prototype.getAllowAutoFocus=function(){return this.allowAutoFocus_};
goog.ui.Menu.prototype.setAllowHighlightDisabled=function(a){this.allowHighlightDisabled_=a};goog.ui.Menu.prototype.getAllowHighlightDisabled=function(){return this.allowHighlightDisabled_};goog.ui.Menu.prototype.setVisible=function(a,b,c){(b=goog.ui.Menu.superClass_.setVisible.call(this,a,b))&&(a&&this.isInDocument()&&this.allowAutoFocus_)&&this.getKeyEventTarget().focus();a&&c&&goog.isNumber(c.clientX)?this.openingCoords=new goog.math.Coordinate(c.clientX,c.clientY):this.openingCoords=null;return b};
goog.ui.Menu.prototype.handleEnterItem=function(a){this.allowAutoFocus_&&this.getKeyEventTarget().focus();return goog.ui.Menu.superClass_.handleEnterItem.call(this,a)};goog.ui.Menu.prototype.highlightNextPrefix=function(a){var b=RegExp("^"+goog.string.regExpEscape(a),"i");return this.highlightHelper(function(a,f){var g=0>a?0:a,h=!1;do{++a;a==f&&(a=0,h=!0);var k=this.getChildAt(a).getCaption();if(k&&k.match(b))return a}while(!h||a!=g);return this.getHighlightedIndex()},this.getHighlightedIndex())};
goog.ui.Menu.prototype.canHighlightItem=function(a){return(this.allowHighlightDisabled_||a.isEnabled())&&a.isVisible()&&a.isSupportedState(goog.ui.Component.State.HOVER)};goog.ui.Menu.prototype.decorateInternal=function(a){this.decorateContent(a);goog.ui.Menu.superClass_.decorateInternal.call(this,a)};
goog.ui.Menu.prototype.handleKeyEventInternal=function(a){var b=goog.ui.Menu.superClass_.handleKeyEventInternal.call(this,a);b||this.forEachChild(function(c){!b&&(c.getMnemonic&&c.getMnemonic()==a.keyCode)&&(this.isEnabled()&&this.setHighlighted(c),b=c.handleKeyEvent(a))},this);return b};goog.ui.Menu.prototype.setHighlightedIndex=function(a){goog.ui.Menu.superClass_.setHighlightedIndex.call(this,a);(a=this.getChildAt(a))&&goog.style.scrollIntoContainerView(a.getElement(),this.getElement())};
goog.ui.Menu.prototype.decorateContent=function(a){var b=this.getRenderer();a=this.getDomHelper().getElementsByTagNameAndClass("div",b.getCssClass()+"-content",a);for(var c=a.length,f=0;f<c;f++)b.decorateChildren(this,a[f])};goog.positioning.MenuAnchoredPosition=function(a,b,c,f){goog.positioning.AnchoredViewportPosition.call(this,a,b,c||f);if(c||f)this.setLastResortOverflow(goog.positioning.Overflow.ADJUST_X_EXCEPT_OFFSCREEN|(f?goog.positioning.Overflow.RESIZE_HEIGHT:goog.positioning.Overflow.ADJUST_Y_EXCEPT_OFFSCREEN))};goog.inherits(goog.positioning.MenuAnchoredPosition,goog.positioning.AnchoredViewportPosition);goog.ui.INLINE_BLOCK_CLASSNAME="goog-inline-block";goog.ui.CustomButtonRenderer=function(){goog.ui.ButtonRenderer.call(this)};goog.inherits(goog.ui.CustomButtonRenderer,goog.ui.ButtonRenderer);goog.addSingletonGetter(goog.ui.CustomButtonRenderer);goog.ui.CustomButtonRenderer.CSS_CLASS="goog-custom-button";
goog.ui.CustomButtonRenderer.prototype.createDom=function(a){var b=this.getClassNames(a),b={"class":goog.ui.INLINE_BLOCK_CLASSNAME+" "+b.join(" "),title:a.getTooltip()||""},b=a.getDomHelper().createDom("div",b,this.createButton(a.getContent(),a.getDomHelper()));this.setAriaStates(a,b);return b};goog.ui.CustomButtonRenderer.prototype.getAriaRole=function(){return goog.a11y.aria.Role.BUTTON};goog.ui.CustomButtonRenderer.prototype.getContentElement=function(a){return a&&a.firstChild.firstChild};
goog.ui.CustomButtonRenderer.prototype.createButton=function(a,b){return b.createDom("div",goog.ui.INLINE_BLOCK_CLASSNAME+" "+(this.getCssClass()+"-outer-box"),b.createDom("div",goog.ui.INLINE_BLOCK_CLASSNAME+" "+(this.getCssClass()+"-inner-box"),a))};goog.ui.CustomButtonRenderer.prototype.canDecorate=function(a){return"DIV"==a.tagName};
goog.ui.CustomButtonRenderer.prototype.hasBoxStructure=function(a,b){var c=a.getDomHelper().getFirstElementChild(b),f=this.getCssClass()+"-outer-box";return c&&goog.dom.classes.has(c,f)&&(c=a.getDomHelper().getFirstElementChild(c),f=this.getCssClass()+"-inner-box",c&&goog.dom.classes.has(c,f))?!0:!1};
goog.ui.CustomButtonRenderer.prototype.decorate=function(a,b){goog.ui.CustomButtonRenderer.trimTextNodes_(b,!0);goog.ui.CustomButtonRenderer.trimTextNodes_(b,!1);this.hasBoxStructure(a,b)||b.appendChild(this.createButton(b.childNodes,a.getDomHelper()));goog.dom.classes.add(b,goog.ui.INLINE_BLOCK_CLASSNAME,this.getCssClass());return goog.ui.CustomButtonRenderer.superClass_.decorate.call(this,a,b)};goog.ui.CustomButtonRenderer.prototype.getCssClass=function(){return goog.ui.CustomButtonRenderer.CSS_CLASS};
goog.ui.CustomButtonRenderer.trimTextNodes_=function(a,b){if(a)for(var c=b?a.firstChild:a.lastChild,f;c&&c.parentNode==a;){f=b?c.nextSibling:c.previousSibling;if(c.nodeType==goog.dom.NodeType.TEXT){var g=c.nodeValue;if(""==goog.string.trim(g))a.removeChild(c);else{c.nodeValue=b?goog.string.trimLeft(g):goog.string.trimRight(g);break}}else break;c=f}};goog.ui.MenuButtonRenderer=function(){goog.ui.CustomButtonRenderer.call(this)};goog.inherits(goog.ui.MenuButtonRenderer,goog.ui.CustomButtonRenderer);goog.addSingletonGetter(goog.ui.MenuButtonRenderer);goog.ui.MenuButtonRenderer.CSS_CLASS="goog-menu-button";goog.ui.MenuButtonRenderer.WRAPPER_PROP_="__goog_wrapper_div";
goog.userAgent.GECKO&&(goog.ui.MenuButtonRenderer.prototype.setContent=function(a,b){var c=goog.ui.MenuButtonRenderer.superClass_.getContentElement.call(this,a&&a.firstChild);c&&goog.dom.replaceNode(this.createCaption(b,goog.dom.getDomHelper(a)),c)});goog.ui.MenuButtonRenderer.prototype.getContentElement=function(a){a=goog.ui.MenuButtonRenderer.superClass_.getContentElement.call(this,a&&a.firstChild);goog.userAgent.GECKO&&(a&&a[goog.ui.MenuButtonRenderer.WRAPPER_PROP_])&&(a=a.firstChild);return a};
goog.ui.MenuButtonRenderer.prototype.decorate=function(a,b){var c=goog.dom.getElementsByTagNameAndClass("*",goog.ui.MenuRenderer.CSS_CLASS,b)[0];if(c){goog.style.showElement(c,!1);goog.dom.appendChild(goog.dom.getOwnerDocument(c).body,c);var f=new goog.ui.Menu;f.decorate(c);a.setMenu(f)}return goog.ui.MenuButtonRenderer.superClass_.decorate.call(this,a,b)};
goog.ui.MenuButtonRenderer.prototype.createButton=function(a,b){return goog.ui.MenuButtonRenderer.superClass_.createButton.call(this,[this.createCaption(a,b),this.createDropdown(b)],b)};goog.ui.MenuButtonRenderer.prototype.createCaption=function(a,b){return goog.ui.MenuButtonRenderer.wrapCaption(a,this.getCssClass(),b)};goog.ui.MenuButtonRenderer.wrapCaption=function(a,b,c){return c.createDom("div",goog.ui.INLINE_BLOCK_CLASSNAME+" "+(b+"-caption"),a)};
goog.ui.MenuButtonRenderer.prototype.createDropdown=function(a){return a.createDom("div",goog.ui.INLINE_BLOCK_CLASSNAME+" "+(this.getCssClass()+"-dropdown"),"\u00a0")};goog.ui.MenuButtonRenderer.prototype.getCssClass=function(){return goog.ui.MenuButtonRenderer.CSS_CLASS};goog.ui.MenuButton=function(a,b,c,f){goog.ui.Button.call(this,a,c||goog.ui.MenuButtonRenderer.getInstance(),f);this.setSupportedState(goog.ui.Component.State.OPENED,!0);this.menuPosition_=new goog.positioning.MenuAnchoredPosition(null,goog.positioning.Corner.BOTTOM_START);b&&this.setMenu(b);this.menuMargin_=null;this.timer_=new goog.Timer(500);(goog.userAgent.product.IPHONE||goog.userAgent.product.IPAD)&&!goog.userAgent.isVersion("533.17.9")&&this.setFocusablePopupMenu(!0)};
goog.inherits(goog.ui.MenuButton,goog.ui.Button);goog.ui.MenuButton.prototype.isFocusablePopupMenu_=!1;goog.ui.MenuButton.prototype.renderMenuAsSibling_=!1;goog.ui.MenuButton.prototype.enterDocument=function(){goog.ui.MenuButton.superClass_.enterDocument.call(this);this.menu_&&this.attachMenuEventListeners_(this.menu_,!0);var a=this.getElement();goog.asserts.assert(a,"The menu button DOM element cannot be null.");goog.a11y.aria.setState(a,goog.a11y.aria.State.HASPOPUP,"true")};
goog.ui.MenuButton.prototype.exitDocument=function(){goog.ui.MenuButton.superClass_.exitDocument.call(this);if(this.menu_){this.setOpen(!1);this.menu_.exitDocument();this.attachMenuEventListeners_(this.menu_,!1);var a=this.menu_.getElement();a&&goog.dom.removeNode(a)}};goog.ui.MenuButton.prototype.disposeInternal=function(){goog.ui.MenuButton.superClass_.disposeInternal.call(this);this.menu_&&(this.menu_.dispose(),delete this.menu_);delete this.positionElement_;this.timer_.dispose()};
goog.ui.MenuButton.prototype.handleMouseDown=function(a){goog.ui.MenuButton.superClass_.handleMouseDown.call(this,a);this.isActive()&&(this.setOpen(!this.isOpen(),a),this.menu_&&this.menu_.setMouseButtonPressed(this.isOpen()))};goog.ui.MenuButton.prototype.handleMouseUp=function(a){goog.ui.MenuButton.superClass_.handleMouseUp.call(this,a);this.menu_&&!this.isActive()&&this.menu_.setMouseButtonPressed(!1)};goog.ui.MenuButton.prototype.performActionInternal=function(a){this.setActive(!1);return!0};
goog.ui.MenuButton.prototype.handleDocumentMouseDown=function(a){this.menu_&&(this.menu_.isVisible()&&!this.containsElement(a.target))&&this.setOpen(!1)};goog.ui.MenuButton.prototype.containsElement=function(a){return a&&goog.dom.contains(this.getElement(),a)||this.menu_&&this.menu_.containsElement(a)||!1};
goog.ui.MenuButton.prototype.handleKeyEventInternal=function(a){if(a.keyCode==goog.events.KeyCodes.SPACE){if(a.preventDefault(),a.type!=goog.events.EventType.KEYUP)return!0}else if(a.type!=goog.events.KeyHandler.EventType.KEY)return!1;if(this.menu_&&this.menu_.isVisible()){var b=this.menu_.handleKeyEvent(a);return a.keyCode==goog.events.KeyCodes.ESC?(this.setOpen(!1),!0):b}return a.keyCode==goog.events.KeyCodes.DOWN||a.keyCode==goog.events.KeyCodes.UP||a.keyCode==goog.events.KeyCodes.SPACE||a.keyCode==
goog.events.KeyCodes.ENTER?(this.setOpen(!0),!0):!1};goog.ui.MenuButton.prototype.handleMenuAction=function(a){this.setOpen(!1)};goog.ui.MenuButton.prototype.handleMenuBlur=function(a){this.isActive()||this.setOpen(!1)};goog.ui.MenuButton.prototype.handleBlur=function(a){this.isFocusablePopupMenu()||this.setOpen(!1);goog.ui.MenuButton.superClass_.handleBlur.call(this,a)};
goog.ui.MenuButton.prototype.getMenu=function(){this.menu_||this.setMenu(new goog.ui.Menu(this.getDomHelper()));return this.menu_||null};goog.ui.MenuButton.prototype.setMenu=function(a){var b=this.menu_;a!=b&&(b&&(this.setOpen(!1),this.isInDocument()&&this.attachMenuEventListeners_(b,!1),delete this.menu_),a&&(this.menu_=a,a.setParent(this),a.setVisible(!1),a.setAllowAutoFocus(this.isFocusablePopupMenu()),this.isInDocument()&&this.attachMenuEventListeners_(a,!0)));return b};
goog.ui.MenuButton.prototype.setMenuPosition=function(a){a&&(this.menuPosition_=a,this.positionElement_=a.element)};goog.ui.MenuButton.prototype.setPositionElement=function(a){this.positionElement_=a;this.positionMenu()};goog.ui.MenuButton.prototype.setMenuMargin=function(a){this.menuMargin_=a};goog.ui.MenuButton.prototype.addItem=function(a){this.getMenu().addChild(a,!0)};goog.ui.MenuButton.prototype.addItemAt=function(a,b){this.getMenu().addChildAt(a,b,!0)};
goog.ui.MenuButton.prototype.removeItem=function(a){(a=this.getMenu().removeChild(a,!0))&&a.dispose()};goog.ui.MenuButton.prototype.removeItemAt=function(a){(a=this.getMenu().removeChildAt(a,!0))&&a.dispose()};goog.ui.MenuButton.prototype.getItemAt=function(a){return this.menu_?this.menu_.getChildAt(a):null};goog.ui.MenuButton.prototype.getItemCount=function(){return this.menu_?this.menu_.getChildCount():0};
goog.ui.MenuButton.prototype.setVisible=function(a,b){var c=goog.ui.MenuButton.superClass_.setVisible.call(this,a,b);c&&!this.isVisible()&&this.setOpen(!1);return c};goog.ui.MenuButton.prototype.setEnabled=function(a){goog.ui.MenuButton.superClass_.setEnabled.call(this,a);this.isEnabled()||this.setOpen(!1)};goog.ui.MenuButton.prototype.isAlignMenuToStart=function(){var a=this.menuPosition_.corner;return a==goog.positioning.Corner.BOTTOM_START||a==goog.positioning.Corner.TOP_START};
goog.ui.MenuButton.prototype.setAlignMenuToStart=function(a){this.menuPosition_.corner=a?goog.positioning.Corner.BOTTOM_START:goog.positioning.Corner.BOTTOM_END};goog.ui.MenuButton.prototype.setScrollOnOverflow=function(a){this.menuPosition_.setLastResortOverflow&&this.menuPosition_.setLastResortOverflow(goog.positioning.Overflow.ADJUST_X|(a?goog.positioning.Overflow.RESIZE_HEIGHT:goog.positioning.Overflow.ADJUST_Y))};
goog.ui.MenuButton.prototype.isScrollOnOverflow=function(){return this.menuPosition_.getLastResortOverflow&&!!(this.menuPosition_.getLastResortOverflow()&goog.positioning.Overflow.RESIZE_HEIGHT)};goog.ui.MenuButton.prototype.isFocusablePopupMenu=function(){return this.isFocusablePopupMenu_};goog.ui.MenuButton.prototype.setFocusablePopupMenu=function(a){this.isFocusablePopupMenu_=a};goog.ui.MenuButton.prototype.setRenderMenuAsSibling=function(a){this.renderMenuAsSibling_=a};
goog.ui.MenuButton.prototype.showMenu=function(){this.setOpen(!0)};goog.ui.MenuButton.prototype.hideMenu=function(){this.setOpen(!1)};
goog.ui.MenuButton.prototype.setOpen=function(a,b){goog.ui.MenuButton.superClass_.setOpen.call(this,a);if(this.menu_&&this.hasState(goog.ui.Component.State.OPENED)==a){if(a)this.menu_.isInDocument()||(this.renderMenuAsSibling_?this.menu_.render(this.getElement().parentNode):this.menu_.render()),this.viewportBox_=goog.style.getVisibleRectForElement(this.getElement()),this.buttonRect_=goog.style.getBounds(this.getElement()),this.positionMenu(),this.menu_.setHighlightedIndex(-1);else{this.setActive(!1);
this.menu_.setMouseButtonPressed(!1);var c=this.getElement();c&&goog.a11y.aria.setState(c,goog.a11y.aria.State.ACTIVEDESCENDANT,"");goog.isDefAndNotNull(this.originalSize_)&&(this.originalSize_=void 0,(c=this.menu_.getElement())&&goog.style.setSize(c,"",""))}this.menu_.setVisible(a,!1,b);this.isDisposed()||this.attachPopupListeners_(a)}};goog.ui.MenuButton.prototype.invalidateMenuSize=function(){this.originalSize_=void 0};
goog.ui.MenuButton.prototype.positionMenu=function(){if(this.menu_.isInDocument()){var a=this.positionElement_||this.getElement(),b=this.menuPosition_;this.menuPosition_.element=a;a=this.menu_.getElement();this.menu_.isVisible()||(a.style.visibility="hidden",goog.style.showElement(a,!0));!this.originalSize_&&this.isScrollOnOverflow()&&(this.originalSize_=goog.style.getSize(a));var c=goog.positioning.flipCornerVertical(b.corner);b.reposition(a,c,this.menuMargin_,this.originalSize_);this.menu_.isVisible()||
(goog.style.showElement(a,!1),a.style.visibility="visible")}};goog.ui.MenuButton.prototype.onTick_=function(a){a=goog.style.getBounds(this.getElement());var b=goog.style.getVisibleRectForElement(this.getElement());if(!goog.math.Rect.equals(this.buttonRect_,a)||!goog.math.Box.equals(this.viewportBox_,b))this.buttonRect_=a,this.viewportBox_=b,this.positionMenu()};
goog.ui.MenuButton.prototype.attachMenuEventListeners_=function(a,b){var c=this.getHandler(),f=b?c.listen:c.unlisten;f.call(c,a,goog.ui.Component.EventType.ACTION,this.handleMenuAction);f.call(c,a,goog.ui.Component.EventType.HIGHLIGHT,this.handleHighlightItem);f.call(c,a,goog.ui.Component.EventType.UNHIGHLIGHT,this.handleUnHighlightItem)};
goog.ui.MenuButton.prototype.handleHighlightItem=function(a){var b=this.getElement();goog.asserts.assert(b,"The menu button DOM element cannot be null.");null!=a.target.getElement()&&goog.a11y.aria.setState(b,goog.a11y.aria.State.ACTIVEDESCENDANT,a.target.getElement().id)};
goog.ui.MenuButton.prototype.handleUnHighlightItem=function(a){this.menu_.getHighlighted()||(a=this.getElement(),goog.asserts.assert(a,"The menu button DOM element cannot be null."),goog.a11y.aria.setState(a,goog.a11y.aria.State.ACTIVEDESCENDANT,""))};
goog.ui.MenuButton.prototype.attachPopupListeners_=function(a){var b=this.getHandler(),c=a?b.listen:b.unlisten;c.call(b,this.getDomHelper().getDocument(),goog.events.EventType.MOUSEDOWN,this.handleDocumentMouseDown,!0);this.isFocusablePopupMenu()&&c.call(b,this.menu_,goog.ui.Component.EventType.BLUR,this.handleMenuBlur);c.call(b,this.timer_,goog.Timer.TICK,this.onTick_);a?this.timer_.start():this.timer_.stop()};goog.ui.registry.setDecoratorByClassName(goog.ui.MenuButtonRenderer.CSS_CLASS,function(){return new goog.ui.MenuButton(null)});goog.color={};
goog.color.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",
darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",
seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};goog.color.parse=function(a){var b={};a=String(a);var c=goog.color.prependHashIfNecessaryHelper(a);if(goog.color.isValidHexColor_(c))return b.hex=goog.color.normalizeHex(c),b.type="hex",b;c=goog.color.isValidRgbColor_(a);if(c.length)return b.hex=goog.color.rgbArrayToHex(c),b.type="rgb",b;if(goog.color.names&&(c=goog.color.names[a.toLowerCase()]))return b.hex=c,b.type="named",b;throw Error(a+" is not a valid color string");};
goog.color.isValidColor=function(a){var b=goog.color.prependHashIfNecessaryHelper(a);return!(!goog.color.isValidHexColor_(b)&&!(goog.color.isValidRgbColor_(a).length||goog.color.names&&goog.color.names[a.toLowerCase()]))};goog.color.parseRgb=function(a){var b=goog.color.isValidRgbColor_(a);if(!b.length)throw Error(a+" is not a valid RGB color");return b};goog.color.hexToRgbStyle=function(a){return goog.color.rgbStyle_(goog.color.hexToRgb(a))};goog.color.hexTripletRe_=/#(.)(.)(.)/;
goog.color.normalizeHex=function(a){if(!goog.color.isValidHexColor_(a))throw Error("'"+a+"' is not a valid hex color");4==a.length&&(a=a.replace(goog.color.hexTripletRe_,"#$1$1$2$2$3$3"));return a.toLowerCase()};goog.color.hexToRgb=function(a){a=goog.color.normalizeHex(a);var b=parseInt(a.substr(1,2),16),c=parseInt(a.substr(3,2),16);a=parseInt(a.substr(5,2),16);return[b,c,a]};
goog.color.rgbToHex=function(a,b,c){a=Number(a);b=Number(b);c=Number(c);if(isNaN(a)||0>a||255<a||isNaN(b)||0>b||255<b||isNaN(c)||0>c||255<c)throw Error('"('+a+","+b+","+c+'") is not a valid RGB color');a=goog.color.prependZeroIfNecessaryHelper(a.toString(16));b=goog.color.prependZeroIfNecessaryHelper(b.toString(16));c=goog.color.prependZeroIfNecessaryHelper(c.toString(16));return"#"+a+b+c};goog.color.rgbArrayToHex=function(a){return goog.color.rgbToHex(a[0],a[1],a[2])};
goog.color.rgbToHsl=function(a,b,c){a/=255;b/=255;c/=255;var f=Math.max(a,b,c),g=Math.min(a,b,c),h=0,k=0,l=0.5*(f+g);f!=g&&(f==a?h=60*(b-c)/(f-g):f==b?h=60*(c-a)/(f-g)+120:f==c&&(h=60*(a-b)/(f-g)+240),k=0<l&&0.5>=l?(f-g)/(2*l):(f-g)/(2-2*l));return[Math.round(h+360)%360,k,l]};goog.color.rgbArrayToHsl=function(a){return goog.color.rgbToHsl(a[0],a[1],a[2])};goog.color.hueToRgb_=function(a,b,c){0>c?c+=1:1<c&&(c-=1);return 1>6*c?a+6*(b-a)*c:1>2*c?b:2>3*c?a+6*(b-a)*(2/3-c):a};
goog.color.hslToRgb=function(a,b,c){var f=0,g=0,h=0;a/=360;if(0==b)f=g=h=255*c;else var k=h=0,k=0.5>c?c*(1+b):c+b-b*c,h=2*c-k,f=255*goog.color.hueToRgb_(h,k,a+1/3),g=255*goog.color.hueToRgb_(h,k,a),h=255*goog.color.hueToRgb_(h,k,a-1/3);return[Math.round(f),Math.round(g),Math.round(h)]};goog.color.hslArrayToRgb=function(a){return goog.color.hslToRgb(a[0],a[1],a[2])};goog.color.validHexColorRe_=/^#(?:[0-9a-f]{3}){1,2}$/i;goog.color.isValidHexColor_=function(a){return goog.color.validHexColorRe_.test(a)};
goog.color.normalizedHexColorRe_=/^#[0-9a-f]{6}$/;goog.color.isNormalizedHexColor_=function(a){return goog.color.normalizedHexColorRe_.test(a)};goog.color.rgbColorRe_=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;goog.color.isValidRgbColor_=function(a){var b=a.match(goog.color.rgbColorRe_);if(b){a=Number(b[1]);var c=Number(b[2]),b=Number(b[3]);if(0<=a&&255>=a&&0<=c&&255>=c&&0<=b&&255>=b)return[a,c,b]}return[]};
goog.color.prependZeroIfNecessaryHelper=function(a){return 1==a.length?"0"+a:a};goog.color.prependHashIfNecessaryHelper=function(a){return"#"==a.charAt(0)?a:"#"+a};goog.color.rgbStyle_=function(a){return"rgb("+a.join(",")+")"};
goog.color.hsvToRgb=function(a,b,c){var f=0,g=0,h=0;if(0==b)h=g=f=c;else{var k=Math.floor(a/60),l=a/60-k;a=c*(1-b);var m=c*(1-b*l);b=c*(1-b*(1-l));switch(k){case 1:f=m;g=c;h=a;break;case 2:f=a;g=c;h=b;break;case 3:f=a;g=m;h=c;break;case 4:f=b;g=a;h=c;break;case 5:f=c;g=a;h=m;break;case 6:case 0:f=c,g=b,h=a}}return[Math.floor(f),Math.floor(g),Math.floor(h)]};
goog.color.rgbToHsv=function(a,b,c){var f=Math.max(Math.max(a,b),c),g=Math.min(Math.min(a,b),c);if(g==f)g=a=0;else{var h=f-g,g=h/f;a=60*(a==f?(b-c)/h:b==f?2+(c-a)/h:4+(a-b)/h);0>a&&(a+=360);360<a&&(a-=360)}return[a,g,f]};goog.color.rgbArrayToHsv=function(a){return goog.color.rgbToHsv(a[0],a[1],a[2])};goog.color.hsvArrayToRgb=function(a){return goog.color.hsvToRgb(a[0],a[1],a[2])};goog.color.hexToHsl=function(a){a=goog.color.hexToRgb(a);return goog.color.rgbToHsl(a[0],a[1],a[2])};
goog.color.hslToHex=function(a,b,c){return goog.color.rgbArrayToHex(goog.color.hslToRgb(a,b,c))};goog.color.hslArrayToHex=function(a){return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0],a[1],a[2]))};goog.color.hexToHsv=function(a){return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))};goog.color.hsvToHex=function(a,b,c){return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a,b,c))};goog.color.hsvArrayToHex=function(a){return goog.color.hsvToHex(a[0],a[1],a[2])};
goog.color.hslDistance=function(a,b){var c,f;c=0.5>=a[2]?a[1]*a[2]:a[1]*(1-a[2]);f=0.5>=b[2]?b[1]*b[2]:b[1]*(1-b[2]);return(a[2]-b[2])*(a[2]-b[2])+c*c+f*f-2*c*f*Math.cos(2*(a[0]/360-b[0]/360)*Math.PI)};goog.color.blend=function(a,b,c){c=goog.math.clamp(c,0,1);return[Math.round(c*a[0]+(1-c)*b[0]),Math.round(c*a[1]+(1-c)*b[1]),Math.round(c*a[2]+(1-c)*b[2])]};goog.color.darken=function(a,b){return goog.color.blend([0,0,0],a,b)};
goog.color.lighten=function(a,b){return goog.color.blend([255,255,255],a,b)};goog.color.highContrast=function(a,b){for(var c=[],f=0;f<b.length;f++)c.push({color:b[f],diff:goog.color.yiqBrightnessDiff_(b[f],a)+goog.color.colorDiff_(b[f],a)});c.sort(function(a,b){return b.diff-a.diff});return c[0].color};goog.color.yiqBrightness_=function(a){return Math.round((299*a[0]+587*a[1]+114*a[2])/1E3)};goog.color.yiqBrightnessDiff_=function(a,b){return Math.abs(goog.color.yiqBrightness_(a)-goog.color.yiqBrightness_(b))};
goog.color.colorDiff_=function(a,b){return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2])};goog.ui.ColorMenuButtonRenderer=function(){goog.ui.MenuButtonRenderer.call(this)};goog.inherits(goog.ui.ColorMenuButtonRenderer,goog.ui.MenuButtonRenderer);goog.addSingletonGetter(goog.ui.ColorMenuButtonRenderer);goog.ui.ColorMenuButtonRenderer.CSS_CLASS="goog-color-menu-button";goog.ui.ColorMenuButtonRenderer.prototype.createCaption=function(a,b){return goog.ui.ColorMenuButtonRenderer.superClass_.createCaption.call(this,goog.ui.ColorMenuButtonRenderer.wrapCaption(a,b),b)};
goog.ui.ColorMenuButtonRenderer.wrapCaption=function(a,b){return b.createDom("div",goog.ui.ColorMenuButtonRenderer.CSS_CLASS+"-indicator",a)};goog.ui.ColorMenuButtonRenderer.prototype.setValue=function(a,b){a&&goog.ui.ColorMenuButtonRenderer.setCaptionValue(this.getContentElement(a),b)};goog.ui.ColorMenuButtonRenderer.setCaptionValue=function(a,b){if(a&&a.firstChild){var c;c=b&&goog.color.isValidColor(b)?goog.color.parse(b).hex:null;a.firstChild.style.borderBottomColor=c||(goog.userAgent.IE?"":"transparent")}};
goog.ui.ColorMenuButtonRenderer.prototype.initializeDom=function(a){this.setValue(a.getElement(),a.getValue());goog.dom.classes.add(a.getElement(),goog.ui.ColorMenuButtonRenderer.CSS_CLASS);goog.ui.ColorMenuButtonRenderer.superClass_.initializeDom.call(this,a)};goog.ui.SelectionModel=function(a){goog.events.EventTarget.call(this);this.items_=[];this.addItems(a)};goog.inherits(goog.ui.SelectionModel,goog.events.EventTarget);goog.ui.SelectionModel.prototype.selectedItem_=null;goog.ui.SelectionModel.prototype.selectionHandler_=null;goog.ui.SelectionModel.prototype.getSelectionHandler=function(){return this.selectionHandler_};goog.ui.SelectionModel.prototype.setSelectionHandler=function(a){this.selectionHandler_=a};
goog.ui.SelectionModel.prototype.getItemCount=function(){return this.items_.length};goog.ui.SelectionModel.prototype.indexOfItem=function(a){return a?goog.array.indexOf(this.items_,a):-1};goog.ui.SelectionModel.prototype.getFirst=function(){return this.items_[0]};goog.ui.SelectionModel.prototype.getLast=function(){return this.items_[this.items_.length-1]};goog.ui.SelectionModel.prototype.getItemAt=function(a){return this.items_[a]||null};
goog.ui.SelectionModel.prototype.addItems=function(a){a&&(goog.array.forEach(a,function(a){this.selectItem_(a,!1)},this),goog.array.extend(this.items_,a))};goog.ui.SelectionModel.prototype.addItem=function(a){this.addItemAt(a,this.getItemCount())};goog.ui.SelectionModel.prototype.addItemAt=function(a,b){a&&(this.selectItem_(a,!1),goog.array.insertAt(this.items_,a,b))};
goog.ui.SelectionModel.prototype.removeItem=function(a){a&&goog.array.remove(this.items_,a)&&a==this.selectedItem_&&(this.selectedItem_=null,this.dispatchEvent(goog.events.EventType.SELECT))};goog.ui.SelectionModel.prototype.removeItemAt=function(a){this.removeItem(this.getItemAt(a))};goog.ui.SelectionModel.prototype.getSelectedItem=function(){return this.selectedItem_};goog.ui.SelectionModel.prototype.getItems=function(){return goog.array.clone(this.items_)};
goog.ui.SelectionModel.prototype.setSelectedItem=function(a){a!=this.selectedItem_&&(this.selectItem_(this.selectedItem_,!1),this.selectedItem_=a,this.selectItem_(a,!0));this.dispatchEvent(goog.events.EventType.SELECT)};goog.ui.SelectionModel.prototype.getSelectedIndex=function(){return this.indexOfItem(this.selectedItem_)};goog.ui.SelectionModel.prototype.setSelectedIndex=function(a){this.setSelectedItem(this.getItemAt(a))};
goog.ui.SelectionModel.prototype.clear=function(){goog.array.clear(this.items_);this.selectedItem_=null};goog.ui.SelectionModel.prototype.disposeInternal=function(){goog.ui.SelectionModel.superClass_.disposeInternal.call(this);delete this.items_;this.selectedItem_=null};goog.ui.SelectionModel.prototype.selectItem_=function(a,b){a&&("function"==typeof this.selectionHandler_?this.selectionHandler_(a,b):"function"==typeof a.setSelected&&a.setSelected(b))};goog.dom.TagWalkType={START_TAG:1,OTHER:0,END_TAG:-1};goog.dom.TagIterator=function(a,b,c,f,g){this.reversed=!!b;a&&this.setPosition(a,f);this.depth=void 0!=g?g:this.tagType||0;this.reversed&&(this.depth*=-1);this.constrained=!c};goog.inherits(goog.dom.TagIterator,goog.iter.Iterator);goog.dom.TagIterator.prototype.node=null;goog.dom.TagIterator.prototype.tagType=goog.dom.TagWalkType.OTHER;goog.dom.TagIterator.prototype.started_=!1;
goog.dom.TagIterator.prototype.setPosition=function(a,b,c){if(this.node=a)goog.isNumber(b)?this.tagType=b:this.tagType=this.node.nodeType!=goog.dom.NodeType.ELEMENT?goog.dom.TagWalkType.OTHER:this.reversed?goog.dom.TagWalkType.END_TAG:goog.dom.TagWalkType.START_TAG;goog.isNumber(c)&&(this.depth=c)};goog.dom.TagIterator.prototype.copyFrom=function(a){this.node=a.node;this.tagType=a.tagType;this.depth=a.depth;this.reversed=a.reversed;this.constrained=a.constrained};
goog.dom.TagIterator.prototype.clone=function(){return new goog.dom.TagIterator(this.node,this.reversed,!this.constrained,this.tagType,this.depth)};goog.dom.TagIterator.prototype.skipTag=function(){var a=this.reversed?goog.dom.TagWalkType.END_TAG:goog.dom.TagWalkType.START_TAG;this.tagType==a&&(this.tagType=-1*a,this.depth+=this.tagType*(this.reversed?-1:1))};
goog.dom.TagIterator.prototype.restartTag=function(){var a=this.reversed?goog.dom.TagWalkType.START_TAG:goog.dom.TagWalkType.END_TAG;this.tagType==a&&(this.tagType=-1*a,this.depth+=this.tagType*(this.reversed?-1:1))};
goog.dom.TagIterator.prototype.next=function(){var a;if(this.started_){if(!this.node||this.constrained&&0==this.depth)throw goog.iter.StopIteration;a=this.node;var b=this.reversed?goog.dom.TagWalkType.END_TAG:goog.dom.TagWalkType.START_TAG;if(this.tagType==b){var c=this.reversed?a.lastChild:a.firstChild;c?this.setPosition(c):this.setPosition(a,-1*b)}else(c=this.reversed?a.previousSibling:a.nextSibling)?this.setPosition(c):this.setPosition(a.parentNode,-1*b);this.depth+=this.tagType*(this.reversed?
-1:1)}else this.started_=!0;a=this.node;if(!this.node)throw goog.iter.StopIteration;return a};goog.dom.TagIterator.prototype.isStarted=function(){return this.started_};goog.dom.TagIterator.prototype.isStartTag=function(){return this.tagType==goog.dom.TagWalkType.START_TAG};goog.dom.TagIterator.prototype.isEndTag=function(){return this.tagType==goog.dom.TagWalkType.END_TAG};goog.dom.TagIterator.prototype.isNonElement=function(){return this.tagType==goog.dom.TagWalkType.OTHER};
goog.dom.TagIterator.prototype.equals=function(a){return a.node==this.node&&(!this.node||a.tagType==this.tagType)};goog.dom.TagIterator.prototype.splice=function(a){var b=this.node;this.restartTag();this.reversed=!this.reversed;goog.dom.TagIterator.prototype.next.call(this);this.reversed=!this.reversed;for(var c=goog.isArrayLike(arguments[0])?arguments[0]:arguments,f=c.length-1;0<=f;f--)goog.dom.insertSiblingAfter(c[f],b);goog.dom.removeNode(b)};goog.dom.NodeIterator=function(a,b,c,f){goog.dom.TagIterator.call(this,a,b,c,null,f)};goog.inherits(goog.dom.NodeIterator,goog.dom.TagIterator);goog.dom.NodeIterator.prototype.next=function(){do goog.dom.NodeIterator.superClass_.next.call(this);while(this.isEndTag());return this.node};goog.ui.PaletteRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.PaletteRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.PaletteRenderer);goog.ui.PaletteRenderer.cellId_=0;goog.ui.PaletteRenderer.CSS_CLASS="goog-palette";goog.ui.PaletteRenderer.prototype.createDom=function(a){var b=this.getClassNames(a);return a.getDomHelper().createDom("div",b?b.join(" "):null,this.createGrid(a.getContent(),a.getSize(),a.getDomHelper()))};
goog.ui.PaletteRenderer.prototype.createGrid=function(a,b,c){for(var f=[],g=0,h=0;g<b.height;g++){for(var k=[],l=0;l<b.width;l++){var m=a&&a[h++];k.push(this.createCell(m,c))}f.push(this.createRow(k,c))}return this.createTable(f,c)};goog.ui.PaletteRenderer.prototype.createTable=function(a,b){var c=b.createDom("table",this.getCssClass()+"-table",b.createDom("tbody",this.getCssClass()+"-body",a));c.cellSpacing=0;c.cellPadding=0;goog.a11y.aria.setRole(c,"grid");return c};
goog.ui.PaletteRenderer.prototype.createRow=function(a,b){var c=b.createDom("tr",this.getCssClass()+"-row",a);goog.a11y.aria.setRole(c,"row");return c};goog.ui.PaletteRenderer.prototype.createCell=function(a,b){var c=b.createDom("td",{"class":this.getCssClass()+"-cell",id:this.getCssClass()+"-cell-"+goog.ui.PaletteRenderer.cellId_++},a);goog.a11y.aria.setRole(c,"gridcell");!goog.dom.getTextContent(c)&&!goog.a11y.aria.getLabel(c)&&goog.a11y.aria.setLabel(c,this.findAriaLabelForCell_(c));return c};
goog.ui.PaletteRenderer.prototype.findAriaLabelForCell_=function(a){a=new goog.dom.NodeIterator(a);for(var b="",c;!b&&(c=goog.iter.nextOrValue(a,null));)c.nodeType==goog.dom.NodeType.ELEMENT&&(b=goog.a11y.aria.getLabel(c)||c.title);return b};goog.ui.PaletteRenderer.prototype.canDecorate=function(a){return!1};goog.ui.PaletteRenderer.prototype.decorate=function(a,b){return null};
goog.ui.PaletteRenderer.prototype.setContent=function(a,b){if(a){var c=goog.dom.getElementsByTagNameAndClass("tbody",this.getCssClass()+"-body",a)[0];if(c){var f=0;goog.array.forEach(c.rows,function(a){goog.array.forEach(a.cells,function(a){goog.dom.removeChildren(a);if(b){var c=b[f++];c&&goog.dom.appendChild(a,c)}})});if(f<b.length){for(var g=[],h=goog.dom.getDomHelper(a),k=c.rows[0].cells.length;f<b.length;){var l=b[f++];g.push(this.createCell(l,h));g.length==k&&(l=this.createRow(g,h),goog.dom.appendChild(c,
l),g.length=0)}if(0<g.length){for(;g.length<k;)g.push(this.createCell("",h));l=this.createRow(g,h);goog.dom.appendChild(c,l)}}}goog.style.setUnselectable(a,!0,goog.userAgent.GECKO)}};goog.ui.PaletteRenderer.prototype.getContainingItem=function(a,b){for(var c=a.getElement();b&&b.nodeType==goog.dom.NodeType.ELEMENT&&b!=c;){if("TD"==b.tagName&&goog.dom.classes.has(b,this.getCssClass()+"-cell"))return b.firstChild;b=b.parentNode}return null};
goog.ui.PaletteRenderer.prototype.highlightCell=function(a,b,c){b&&(b=this.getCellForItem(b),goog.dom.classes.enable(b,this.getCssClass()+"-cell-hover",c),a=a.getElement().firstChild,goog.a11y.aria.setState(a,"activedescendent",b.id))};goog.ui.PaletteRenderer.prototype.getCellForItem=function(a){return a?a.parentNode:null};goog.ui.PaletteRenderer.prototype.selectCell=function(a,b,c){b&&goog.dom.classes.enable(b.parentNode,this.getCssClass()+"-cell-selected",c)};
goog.ui.PaletteRenderer.prototype.getCssClass=function(){return goog.ui.PaletteRenderer.CSS_CLASS};goog.ui.Palette=function(a,b,c){goog.ui.Control.call(this,a,b||goog.ui.PaletteRenderer.getInstance(),c);this.setAutoStates(goog.ui.Component.State.CHECKED|goog.ui.Component.State.SELECTED|goog.ui.Component.State.OPENED,!1);this.currentCellControl_=new goog.ui.Palette.CurrentCell_;this.currentCellControl_.setParentEventTarget(this)};goog.inherits(goog.ui.Palette,goog.ui.Control);goog.ui.Palette.EventType={AFTER_HIGHLIGHT:goog.events.getUniqueId("afterhighlight")};goog.ui.Palette.prototype.size_=null;
goog.ui.Palette.prototype.highlightedIndex_=-1;goog.ui.Palette.prototype.selectionModel_=null;goog.ui.Palette.prototype.disposeInternal=function(){goog.ui.Palette.superClass_.disposeInternal.call(this);this.selectionModel_&&(this.selectionModel_.dispose(),this.selectionModel_=null);this.size_=null;this.currentCellControl_.dispose()};
goog.ui.Palette.prototype.setContentInternal=function(a){goog.ui.Palette.superClass_.setContentInternal.call(this,a);this.adjustSize_();this.selectionModel_?(this.selectionModel_.clear(),this.selectionModel_.addItems(a)):(this.selectionModel_=new goog.ui.SelectionModel(a),this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_,this)),this.getHandler().listen(this.selectionModel_,goog.events.EventType.SELECT,this.handleSelectionChange));this.highlightedIndex_=-1};
goog.ui.Palette.prototype.getCaption=function(){return""};goog.ui.Palette.prototype.setCaption=function(a){};goog.ui.Palette.prototype.handleMouseOver=function(a){goog.ui.Palette.superClass_.handleMouseOver.call(this,a);var b=this.getRenderer().getContainingItem(this,a.target);(!b||!a.relatedTarget||!goog.dom.contains(b,a.relatedTarget))&&b!=this.getHighlightedItem()&&this.setHighlightedItem(b)};
goog.ui.Palette.prototype.handleMouseOut=function(a){goog.ui.Palette.superClass_.handleMouseOut.call(this,a);var b=this.getRenderer().getContainingItem(this,a.target);(!b||!a.relatedTarget||!goog.dom.contains(b,a.relatedTarget))&&b==this.getHighlightedItem()&&this.setHighlightedItem(null)};
goog.ui.Palette.prototype.handleMouseDown=function(a){goog.ui.Palette.superClass_.handleMouseDown.call(this,a);this.isActive()&&(a=this.getRenderer().getContainingItem(this,a.target),a!=this.getHighlightedItem()&&this.setHighlightedItem(a))};goog.ui.Palette.prototype.performActionInternal=function(a){var b=this.getHighlightedItem();return b?(this.setSelectedItem(b),goog.ui.Palette.superClass_.performActionInternal.call(this,a)):!1};
goog.ui.Palette.prototype.handleKeyEvent=function(a){var b=this.getContent(),b=b?b.length:0,c=this.size_.width;if(0==b||!this.isEnabled())return!1;if(a.keyCode==goog.events.KeyCodes.ENTER||a.keyCode==goog.events.KeyCodes.SPACE)return this.performActionInternal(a);if(a.keyCode==goog.events.KeyCodes.HOME)return this.setHighlightedIndex(0),!0;if(a.keyCode==goog.events.KeyCodes.END)return this.setHighlightedIndex(b-1),!0;var f=0>this.highlightedIndex_?this.getSelectedIndex():this.highlightedIndex_;switch(a.keyCode){case goog.events.KeyCodes.LEFT:-1==
f&&(f=b);if(0<f)return this.setHighlightedIndex(f-1),a.preventDefault(),!0;break;case goog.events.KeyCodes.RIGHT:if(f<b-1)return this.setHighlightedIndex(f+1),a.preventDefault(),!0;break;case goog.events.KeyCodes.UP:-1==f&&(f=b+c-1);if(f>=c)return this.setHighlightedIndex(f-c),a.preventDefault(),!0;break;case goog.events.KeyCodes.DOWN:if(-1==f&&(f=-c),f<b-c)return this.setHighlightedIndex(f+c),a.preventDefault(),!0}return!1};goog.ui.Palette.prototype.handleSelectionChange=function(a){};
goog.ui.Palette.prototype.getSize=function(){return this.size_};goog.ui.Palette.prototype.setSize=function(a,b){if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.size_=goog.isNumber(a)?new goog.math.Size(a,b):a;this.adjustSize_()};goog.ui.Palette.prototype.getHighlightedIndex=function(){return this.highlightedIndex_};goog.ui.Palette.prototype.getHighlightedItem=function(){var a=this.getContent();return a&&a[this.highlightedIndex_]};
goog.ui.Palette.prototype.getHighlightedCellElement_=function(){return this.getRenderer().getCellForItem(this.getHighlightedItem())};goog.ui.Palette.prototype.setHighlightedIndex=function(a){a!=this.highlightedIndex_&&(this.highlightIndex_(this.highlightedIndex_,!1),this.highlightedIndex_=a,this.highlightIndex_(a,!0),this.dispatchEvent(goog.ui.Palette.EventType.AFTER_HIGHLIGHT))};
goog.ui.Palette.prototype.setHighlightedItem=function(a){var b=this.getContent();this.setHighlightedIndex(b?goog.array.indexOf(b,a):-1)};goog.ui.Palette.prototype.getSelectedIndex=function(){return this.selectionModel_?this.selectionModel_.getSelectedIndex():-1};goog.ui.Palette.prototype.getSelectedItem=function(){return this.selectionModel_?this.selectionModel_.getSelectedItem():null};goog.ui.Palette.prototype.setSelectedIndex=function(a){this.selectionModel_&&this.selectionModel_.setSelectedIndex(a)};
goog.ui.Palette.prototype.setSelectedItem=function(a){this.selectionModel_&&this.selectionModel_.setSelectedItem(a)};goog.ui.Palette.prototype.highlightIndex_=function(a,b){if(this.getElement()){var c=this.getContent();if(c&&0<=a&&a<c.length){var f=this.getHighlightedCellElement_();this.currentCellControl_.getElement()!=f&&this.currentCellControl_.setElementInternal(f);this.currentCellControl_.tryHighlight(b)&&this.getRenderer().highlightCell(this,c[a],b)}}};
goog.ui.Palette.prototype.selectItem_=function(a,b){this.getElement()&&this.getRenderer().selectCell(this,a,b)};goog.ui.Palette.prototype.adjustSize_=function(){var a=this.getContent();if(a)if(this.size_&&this.size_.width){if(a=Math.ceil(a.length/this.size_.width),!goog.isNumber(this.size_.height)||this.size_.height<a)this.size_.height=a}else a=Math.ceil(Math.sqrt(a.length)),this.size_=new goog.math.Size(a,a);else this.size_=new goog.math.Size(0,0)};
goog.ui.Palette.CurrentCell_=function(){goog.ui.Control.call(this,null);this.setDispatchTransitionEvents(goog.ui.Component.State.HOVER,!0)};goog.inherits(goog.ui.Palette.CurrentCell_,goog.ui.Control);goog.ui.Palette.CurrentCell_.prototype.tryHighlight=function(a){this.setHighlighted(a);return this.isHighlighted()==a};goog.ui.ColorPalette=function(a,b,c){this.colors_=a||[];goog.ui.Palette.call(this,null,b||goog.ui.PaletteRenderer.getInstance(),c);this.setColors(this.colors_)};goog.inherits(goog.ui.ColorPalette,goog.ui.Palette);goog.ui.ColorPalette.prototype.normalizedColors_=null;goog.ui.ColorPalette.prototype.getColors=function(){return this.colors_};goog.ui.ColorPalette.prototype.setColors=function(a){this.colors_=a;this.normalizedColors_=null;this.setContent(this.createColorNodes())};
goog.ui.ColorPalette.prototype.getSelectedColor=function(){var a=this.getSelectedItem();return a?(a=goog.style.getStyle(a,"background-color"),goog.ui.ColorPalette.parseColor_(a)):null};goog.ui.ColorPalette.prototype.setSelectedColor=function(a){a=goog.ui.ColorPalette.parseColor_(a);this.normalizedColors_||(this.normalizedColors_=goog.array.map(this.colors_,function(a){return goog.ui.ColorPalette.parseColor_(a)}));this.setSelectedIndex(a?goog.array.indexOf(this.normalizedColors_,a):-1)};
goog.ui.ColorPalette.prototype.createColorNodes=function(){return goog.array.map(this.colors_,function(a){var b=this.getDomHelper().createDom("div",{"class":this.getRenderer().getCssClass()+"-colorswatch",style:"background-color:"+a});b.title="#"==a.charAt(0)?"RGB ("+goog.color.hexToRgb(a).join(", ")+")":a;return b},this)};goog.ui.ColorPalette.parseColor_=function(a){if(a)try{return goog.color.parse(a).hex}catch(b){}return null};goog.ui.ColorMenuButton=function(a,b,c,f){goog.ui.MenuButton.call(this,a,b,c||goog.ui.ColorMenuButtonRenderer.getInstance(),f)};goog.inherits(goog.ui.ColorMenuButton,goog.ui.MenuButton);goog.ui.ColorMenuButton.PALETTES={GRAYSCALE:"#000 #444 #666 #999 #ccc #eee #f3f3f3 #fff".split(" "),SOLID:"#f00 #f90 #ff0 #0f0 #0ff #00f #90f #f0f".split(" "),PASTEL:"#f4cccc #fce5cd #fff2cc #d9ead3 #d0e0e3 #cfe2f3 #d9d2e9 #ead1dc #ea9999 #f9cb9c #ffe599 #b6d7a8 #a2c4c9 #9fc5e8 #b4a7d6 #d5a6bd #e06666 #f6b26b #ffd966 #93c47d #76a5af #6fa8dc #8e7cc3 #c27ba0 #cc0000 #e69138 #f1c232 #6aa84f #45818e #3d85c6 #674ea7 #a64d79 #990000 #b45f06 #bf9000 #38761d #134f5c #0b5394 #351c75 #741b47 #660000 #783f04 #7f6000 #274e13 #0c343d #073763 #20124d #4c1130".split(" ")};
goog.ui.ColorMenuButton.NO_COLOR="none";goog.ui.ColorMenuButton.newColorMenu=function(a,b){var c=new goog.ui.Menu(b);a&&goog.array.forEach(a,function(a){c.addChild(a,!0)});goog.object.forEach(goog.ui.ColorMenuButton.PALETTES,function(a){a=new goog.ui.ColorPalette(a,null,b);a.setSize(8);c.addChild(a,!0)});return c};goog.ui.ColorMenuButton.prototype.getSelectedColor=function(){return this.getValue()};goog.ui.ColorMenuButton.prototype.setSelectedColor=function(a){this.setValue(a)};
goog.ui.ColorMenuButton.prototype.setValue=function(a){for(var b=0,c;c=this.getItemAt(b);b++)"function"==typeof c.setSelectedColor&&c.setSelectedColor(a);goog.ui.ColorMenuButton.superClass_.setValue.call(this,a)};
goog.ui.ColorMenuButton.prototype.handleMenuAction=function(a){"function"==typeof a.target.getSelectedColor?this.setValue(a.target.getSelectedColor()):a.target.getValue()==goog.ui.ColorMenuButton.NO_COLOR&&this.setValue(null);goog.ui.ColorMenuButton.superClass_.handleMenuAction.call(this,a);a.stopPropagation();this.dispatchEvent(goog.ui.Component.EventType.ACTION)};
goog.ui.ColorMenuButton.prototype.setOpen=function(a,b){a&&0==this.getItemCount()&&(this.setMenu(goog.ui.ColorMenuButton.newColorMenu(null,this.getDomHelper())),this.setValue(this.getValue()));goog.ui.ColorMenuButton.superClass_.setOpen.call(this,a,b)};goog.ui.registry.setDecoratorByClassName(goog.ui.ColorMenuButtonRenderer.CSS_CLASS,function(){return new goog.ui.ColorMenuButton(null)});goog.events.MouseWheelHandler=function(a,b){goog.events.EventTarget.call(this);this.element_=a;var c=goog.dom.isElement(this.element_)?this.element_:this.element_?this.element_.body:null;this.isRtl_=!!c&&goog.style.isRightToLeft(c);this.listenKey_=goog.events.listen(this.element_,goog.userAgent.GECKO?"DOMMouseScroll":"mousewheel",this,b)};goog.inherits(goog.events.MouseWheelHandler,goog.events.EventTarget);goog.events.MouseWheelHandler.EventType={MOUSEWHEEL:"mousewheel"};
goog.events.MouseWheelHandler.prototype.setMaxDeltaX=function(a){this.maxDeltaX_=a};goog.events.MouseWheelHandler.prototype.setMaxDeltaY=function(a){this.maxDeltaY_=a};
goog.events.MouseWheelHandler.prototype.handleEvent=function(a){var b=0,c=0,f=0;a=a.getBrowserEvent();if("mousewheel"==a.type){c=1;if(goog.userAgent.IE||goog.userAgent.WEBKIT&&(goog.userAgent.WINDOWS||goog.userAgent.isVersion("532.0")))c=40;f=goog.events.MouseWheelHandler.smartScale_(-a.wheelDelta,c);goog.isDef(a.wheelDeltaX)?(b=goog.events.MouseWheelHandler.smartScale_(-a.wheelDeltaX,c),c=goog.events.MouseWheelHandler.smartScale_(-a.wheelDeltaY,c)):c=f}else f=a.detail,100<f?f=3:-100>f&&(f=-3),goog.isDef(a.axis)&&
a.axis===a.HORIZONTAL_AXIS?b=f:c=f;goog.isNumber(this.maxDeltaX_)&&(b=goog.math.clamp(b,-this.maxDeltaX_,this.maxDeltaX_));goog.isNumber(this.maxDeltaY_)&&(c=goog.math.clamp(c,-this.maxDeltaY_,this.maxDeltaY_));this.isRtl_&&(b=-b);b=new goog.events.MouseWheelEvent(f,a,b,c);this.dispatchEvent(b)};goog.events.MouseWheelHandler.smartScale_=function(a,b){return goog.userAgent.WEBKIT&&(goog.userAgent.MAC||goog.userAgent.LINUX)&&0!=a%b?a:a/b};
goog.events.MouseWheelHandler.prototype.disposeInternal=function(){goog.events.MouseWheelHandler.superClass_.disposeInternal.call(this);goog.events.unlistenByKey(this.listenKey_);this.listenKey_=null};goog.events.MouseWheelEvent=function(a,b,c,f){goog.events.BrowserEvent.call(this,b);this.type=goog.events.MouseWheelHandler.EventType.MOUSEWHEEL;this.detail=a;this.deltaX=c;this.deltaY=f};goog.inherits(goog.events.MouseWheelEvent,goog.events.BrowserEvent);goog.dom.ViewportSizeMonitor=function(a){goog.events.EventTarget.call(this);this.window_=a||window;this.listenerKey_=goog.events.listen(this.window_,goog.events.EventType.RESIZE,this.handleResize_,!1,this);this.size_=goog.dom.getViewportSize(this.window_);this.isPollingRequired_()&&(this.windowSizePollInterval_=window.setInterval(goog.bind(this.checkForSizeChange_,this),goog.dom.ViewportSizeMonitor.WINDOW_SIZE_POLL_RATE))};goog.inherits(goog.dom.ViewportSizeMonitor,goog.events.EventTarget);
goog.dom.ViewportSizeMonitor.getInstanceForWindow=function(a){a=a||window;var b=goog.getUid(a);return goog.dom.ViewportSizeMonitor.windowInstanceMap_[b]=goog.dom.ViewportSizeMonitor.windowInstanceMap_[b]||new goog.dom.ViewportSizeMonitor(a)};goog.dom.ViewportSizeMonitor.removeInstanceForWindow=function(a){a=goog.getUid(a||window);goog.dispose(goog.dom.ViewportSizeMonitor.windowInstanceMap_[a]);delete goog.dom.ViewportSizeMonitor.windowInstanceMap_[a]};
goog.dom.ViewportSizeMonitor.windowInstanceMap_={};goog.dom.ViewportSizeMonitor.WINDOW_SIZE_POLL_RATE=500;goog.dom.ViewportSizeMonitor.prototype.listenerKey_=null;goog.dom.ViewportSizeMonitor.prototype.window_=null;goog.dom.ViewportSizeMonitor.prototype.size_=null;goog.dom.ViewportSizeMonitor.prototype.windowSizePollInterval_=null;goog.dom.ViewportSizeMonitor.prototype.isPollingRequired_=function(){return goog.userAgent.WEBKIT&&goog.userAgent.WINDOWS||goog.userAgent.OPERA&&this.window_.self!=this.window_.top};
goog.dom.ViewportSizeMonitor.prototype.getSize=function(){return this.size_?this.size_.clone():null};goog.dom.ViewportSizeMonitor.prototype.disposeInternal=function(){goog.dom.ViewportSizeMonitor.superClass_.disposeInternal.call(this);this.listenerKey_&&(goog.events.unlistenByKey(this.listenerKey_),this.listenerKey_=null);this.windowSizePollInterval_&&(window.clearInterval(this.windowSizePollInterval_),this.windowSizePollInterval_=null);this.size_=this.window_=null};
goog.dom.ViewportSizeMonitor.prototype.handleResize_=function(a){this.checkForSizeChange_()};goog.dom.ViewportSizeMonitor.prototype.checkForSizeChange_=function(){var a=goog.dom.getViewportSize(this.window_);goog.math.Size.equals(a,this.size_)||(this.size_=a,this.dispatchEvent(goog.events.EventType.RESIZE))};goog.ui.CustomColorPalette=function(a,b,c){goog.ui.ColorPalette.call(this,a,b,c);this.setSupportedState(goog.ui.Component.State.OPENED,!0)};goog.inherits(goog.ui.CustomColorPalette,goog.ui.ColorPalette);goog.ui.CustomColorPalette.prototype.createColorNodes=function(){var a=goog.getMsg("Add a color"),b=goog.ui.CustomColorPalette.superClass_.createColorNodes.call(this);b.push(goog.dom.createDom("div",{"class":"goog-palette-customcolor",title:a},"+"));return b};
goog.ui.CustomColorPalette.prototype.performActionInternal=function(a){if(a=this.getHighlightedItem())if(goog.dom.classes.has(a,"goog-palette-customcolor"))this.promptForCustomColor();else return this.setSelectedItem(a),this.dispatchEvent(goog.ui.Component.EventType.ACTION);return!1};
goog.ui.CustomColorPalette.prototype.promptForCustomColor=function(){var a=goog.getMsg("Input custom color, i.e. pink, #F00, #D015FF or rgb(100, 50, 25)"),b=null;this.setOpen(!0);this.isOpen()&&(b=window.prompt(a,"#FFFFFF"),this.setOpen(!1));if(b){var c;try{c=goog.color.parse(b).hex}catch(f){c=goog.getMsg('ERROR: "{$color}" is not a valid color.',{color:b});alert(c);return}a=this.getColors();a.push(c);this.setColors(a);this.setSelectedColor(c);this.dispatchEvent(goog.ui.Component.EventType.ACTION)}};goog.graphics.AffineTransform=function(a,b,c,f,g,h){if(6==arguments.length)this.setTransform(a,b,c,f,g,h);else{if(0!=arguments.length)throw Error("Insufficient matrix parameters");this.m00_=this.m11_=1;this.m10_=this.m01_=this.m02_=this.m12_=0}};goog.graphics.AffineTransform.prototype.isIdentity=function(){return 1==this.m00_&&0==this.m10_&&0==this.m01_&&1==this.m11_&&0==this.m02_&&0==this.m12_};
goog.graphics.AffineTransform.prototype.clone=function(){return new goog.graphics.AffineTransform(this.m00_,this.m10_,this.m01_,this.m11_,this.m02_,this.m12_)};goog.graphics.AffineTransform.prototype.setTransform=function(a,b,c,f,g,h){if(!goog.isNumber(a)||!goog.isNumber(b)||!goog.isNumber(c)||!goog.isNumber(f)||!goog.isNumber(g)||!goog.isNumber(h))throw Error("Invalid transform parameters");this.m00_=a;this.m10_=b;this.m01_=c;this.m11_=f;this.m02_=g;this.m12_=h;return this};
goog.graphics.AffineTransform.prototype.copyFrom=function(a){this.m00_=a.m00_;this.m10_=a.m10_;this.m01_=a.m01_;this.m11_=a.m11_;this.m02_=a.m02_;this.m12_=a.m12_;return this};goog.graphics.AffineTransform.prototype.scale=function(a,b){this.m00_*=a;this.m10_*=a;this.m01_*=b;this.m11_*=b;return this};goog.graphics.AffineTransform.prototype.preScale=function(a,b){this.m00_*=a;this.m01_*=a;this.m02_*=a;this.m10_*=b;this.m11_*=b;this.m12_*=b;return this};
goog.graphics.AffineTransform.prototype.translate=function(a,b){this.m02_+=a*this.m00_+b*this.m01_;this.m12_+=a*this.m10_+b*this.m11_;return this};goog.graphics.AffineTransform.prototype.preTranslate=function(a,b){this.m02_+=a;this.m12_+=b;return this};goog.graphics.AffineTransform.prototype.rotate=function(a,b,c){return this.concatenate(goog.graphics.AffineTransform.getRotateInstance(a,b,c))};
goog.graphics.AffineTransform.prototype.preRotate=function(a,b,c){return this.preConcatenate(goog.graphics.AffineTransform.getRotateInstance(a,b,c))};goog.graphics.AffineTransform.prototype.shear=function(a,b){var c=this.m00_,f=this.m10_;this.m00_+=b*this.m01_;this.m10_+=b*this.m11_;this.m01_+=a*c;this.m11_+=a*f;return this};
goog.graphics.AffineTransform.prototype.preShear=function(a,b){var c=this.m00_,f=this.m01_,g=this.m02_;this.m00_+=a*this.m10_;this.m01_+=a*this.m11_;this.m02_+=a*this.m12_;this.m10_+=b*c;this.m11_+=b*f;this.m12_+=b*g;return this};goog.graphics.AffineTransform.prototype.toString=function(){return"matrix("+[this.m00_,this.m10_,this.m01_,this.m11_,this.m02_,this.m12_].join()+")"};goog.graphics.AffineTransform.prototype.getScaleX=function(){return this.m00_};
goog.graphics.AffineTransform.prototype.getScaleY=function(){return this.m11_};goog.graphics.AffineTransform.prototype.getTranslateX=function(){return this.m02_};goog.graphics.AffineTransform.prototype.getTranslateY=function(){return this.m12_};goog.graphics.AffineTransform.prototype.getShearX=function(){return this.m01_};goog.graphics.AffineTransform.prototype.getShearY=function(){return this.m10_};
goog.graphics.AffineTransform.prototype.concatenate=function(a){var b=this.m00_,c=this.m01_;this.m00_=a.m00_*b+a.m10_*c;this.m01_=a.m01_*b+a.m11_*c;this.m02_+=a.m02_*b+a.m12_*c;b=this.m10_;c=this.m11_;this.m10_=a.m00_*b+a.m10_*c;this.m11_=a.m01_*b+a.m11_*c;this.m12_+=a.m02_*b+a.m12_*c;return this};
goog.graphics.AffineTransform.prototype.preConcatenate=function(a){var b=this.m00_,c=this.m10_;this.m00_=a.m00_*b+a.m01_*c;this.m10_=a.m10_*b+a.m11_*c;b=this.m01_;c=this.m11_;this.m01_=a.m00_*b+a.m01_*c;this.m11_=a.m10_*b+a.m11_*c;b=this.m02_;c=this.m12_;this.m02_=a.m00_*b+a.m01_*c+a.m02_;this.m12_=a.m10_*b+a.m11_*c+a.m12_;return this};
goog.graphics.AffineTransform.prototype.transform=function(a,b,c,f,g){var h=b;for(b+=2*g;h<b;){g=a[h++];var k=a[h++];c[f++]=g*this.m00_+k*this.m01_+this.m02_;c[f++]=g*this.m10_+k*this.m11_+this.m12_}};goog.graphics.AffineTransform.prototype.getDeterminant=function(){return this.m00_*this.m11_-this.m01_*this.m10_};
goog.graphics.AffineTransform.prototype.isInvertible=function(){var a=this.getDeterminant();return goog.math.isFiniteNumber(a)&&goog.math.isFiniteNumber(this.m02_)&&goog.math.isFiniteNumber(this.m12_)&&0!=a};goog.graphics.AffineTransform.prototype.createInverse=function(){var a=this.getDeterminant();return new goog.graphics.AffineTransform(this.m11_/a,-this.m10_/a,-this.m01_/a,this.m00_/a,(this.m01_*this.m12_-this.m11_*this.m02_)/a,(this.m10_*this.m02_-this.m00_*this.m12_)/a)};
goog.graphics.AffineTransform.getScaleInstance=function(a,b){return(new goog.graphics.AffineTransform).setToScale(a,b)};goog.graphics.AffineTransform.getTranslateInstance=function(a,b){return(new goog.graphics.AffineTransform).setToTranslation(a,b)};goog.graphics.AffineTransform.getShearInstance=function(a,b){return(new goog.graphics.AffineTransform).setToShear(a,b)};goog.graphics.AffineTransform.getRotateInstance=function(a,b,c){return(new goog.graphics.AffineTransform).setToRotation(a,b,c)};
goog.graphics.AffineTransform.prototype.setToScale=function(a,b){return this.setTransform(a,0,0,b,0,0)};goog.graphics.AffineTransform.prototype.setToTranslation=function(a,b){return this.setTransform(1,0,0,1,a,b)};goog.graphics.AffineTransform.prototype.setToShear=function(a,b){return this.setTransform(1,b,a,1,0,0)};goog.graphics.AffineTransform.prototype.setToRotation=function(a,b,c){var f=Math.cos(a);a=Math.sin(a);return this.setTransform(f,a,-a,f,b-b*f+c*a,c-b*a-c*f)};
goog.graphics.AffineTransform.prototype.equals=function(a){return this==a?!0:!a?!1:this.m00_==a.m00_&&this.m01_==a.m01_&&this.m02_==a.m02_&&this.m10_==a.m10_&&this.m11_==a.m11_&&this.m12_==a.m12_};goog.graphics.Element=function(a,b){goog.events.EventTarget.call(this);this.element_=a;this.graphics_=b;this.customEvent_=!1};goog.inherits(goog.graphics.Element,goog.events.EventTarget);goog.graphics.Element.prototype.graphics_=null;goog.graphics.Element.prototype.element_=null;goog.graphics.Element.prototype.transform_=null;goog.graphics.Element.prototype.getElement=function(){return this.element_};goog.graphics.Element.prototype.getGraphics=function(){return this.graphics_};
goog.graphics.Element.prototype.setTransformation=function(a,b,c,f,g){this.transform_=goog.graphics.AffineTransform.getRotateInstance(goog.math.toRadians(c),f,g).translate(a,b);this.getGraphics().setElementTransform(this,a,b,c,f,g)};goog.graphics.Element.prototype.getTransform=function(){return this.transform_?this.transform_.clone():new goog.graphics.AffineTransform};goog.graphics.Element.prototype.addEventListener=function(a,b,c,f){goog.events.listen(this.element_,a,b,c,f)};
goog.graphics.Element.prototype.removeEventListener=function(a,b,c,f){goog.events.unlisten(this.element_,a,b,c,f)};goog.graphics.Element.prototype.disposeInternal=function(){goog.graphics.Element.superClass_.disposeInternal.call(this);goog.events.removeAll(this.element_)};goog.graphics.StrokeAndFillElement=function(a,b,c,f){goog.graphics.Element.call(this,a,b);this.setStroke(c);this.setFill(f)};goog.inherits(goog.graphics.StrokeAndFillElement,goog.graphics.Element);goog.graphics.StrokeAndFillElement.prototype.fill=null;goog.graphics.StrokeAndFillElement.prototype.stroke_=null;goog.graphics.StrokeAndFillElement.prototype.setFill=function(a){this.fill=a;this.getGraphics().setElementFill(this,a)};goog.graphics.StrokeAndFillElement.prototype.getFill=function(){return this.fill};
goog.graphics.StrokeAndFillElement.prototype.setStroke=function(a){this.stroke_=a;this.getGraphics().setElementStroke(this,a)};goog.graphics.StrokeAndFillElement.prototype.getStroke=function(){return this.stroke_};goog.graphics.StrokeAndFillElement.prototype.reapplyStroke=function(){this.stroke_&&this.setStroke(this.stroke_)};goog.graphics.RectElement=function(a,b,c,f){goog.graphics.StrokeAndFillElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.RectElement,goog.graphics.StrokeAndFillElement);goog.graphics.PathElement=function(a,b,c,f){goog.graphics.StrokeAndFillElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.PathElement,goog.graphics.StrokeAndFillElement);goog.graphics.GroupElement=function(a,b){goog.graphics.Element.call(this,a,b)};goog.inherits(goog.graphics.GroupElement,goog.graphics.Element);goog.graphics.TextElement=function(a,b,c,f){goog.graphics.StrokeAndFillElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.TextElement,goog.graphics.StrokeAndFillElement);goog.graphics.EllipseElement=function(a,b,c,f){goog.graphics.StrokeAndFillElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.EllipseElement,goog.graphics.StrokeAndFillElement);goog.graphics.ImageElement=function(a,b){goog.graphics.Element.call(this,a,b)};goog.inherits(goog.graphics.ImageElement,goog.graphics.Element);goog.graphics.SvgGroupElement=function(a,b){goog.graphics.GroupElement.call(this,a,b)};goog.inherits(goog.graphics.SvgGroupElement,goog.graphics.GroupElement);goog.graphics.SvgGroupElement.prototype.clear=function(){goog.dom.removeChildren(this.getElement())};goog.graphics.SvgGroupElement.prototype.setSize=function(a,b){this.getGraphics().setElementAttributes(this.getElement(),{width:a,height:b})};goog.graphics.SvgEllipseElement=function(a,b,c,f){goog.graphics.EllipseElement.call(this,a,b,c,f)};
goog.inherits(goog.graphics.SvgEllipseElement,goog.graphics.EllipseElement);goog.graphics.SvgEllipseElement.prototype.setCenter=function(a,b){this.getGraphics().setElementAttributes(this.getElement(),{cx:a,cy:b})};goog.graphics.SvgEllipseElement.prototype.setRadius=function(a,b){this.getGraphics().setElementAttributes(this.getElement(),{rx:a,ry:b})};goog.graphics.SvgRectElement=function(a,b,c,f){goog.graphics.RectElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.SvgRectElement,goog.graphics.RectElement);
goog.graphics.SvgRectElement.prototype.setPosition=function(a,b){this.getGraphics().setElementAttributes(this.getElement(),{x:a,y:b})};goog.graphics.SvgRectElement.prototype.setSize=function(a,b){this.getGraphics().setElementAttributes(this.getElement(),{width:a,height:b})};goog.graphics.SvgPathElement=function(a,b,c,f){goog.graphics.PathElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.SvgPathElement,goog.graphics.PathElement);
goog.graphics.SvgPathElement.prototype.setPath=function(a){this.getGraphics().setElementAttributes(this.getElement(),{d:goog.graphics.SvgGraphics.getSvgPath(a)})};goog.graphics.SvgTextElement=function(a,b,c,f){goog.graphics.TextElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.SvgTextElement,goog.graphics.TextElement);goog.graphics.SvgTextElement.prototype.setText=function(a){this.getElement().firstChild.data=a};
goog.graphics.SvgImageElement=function(a,b){goog.graphics.ImageElement.call(this,a,b)};goog.inherits(goog.graphics.SvgImageElement,goog.graphics.ImageElement);goog.graphics.SvgImageElement.prototype.setPosition=function(a,b){this.getGraphics().setElementAttributes(this.getElement(),{x:a,y:b})};goog.graphics.SvgImageElement.prototype.setSize=function(a,b){this.getGraphics().setElementAttributes(this.getElement(),{width:a,height:b})};
goog.graphics.SvgImageElement.prototype.setSource=function(a){this.getGraphics().setElementAttributes(this.getElement(),{"xlink:href":a})};goog.graphics.Fill=function(){};goog.graphics.SolidFill=function(a,b){this.color_=a;this.opacity_=null==b?1:b};goog.inherits(goog.graphics.SolidFill,goog.graphics.Fill);goog.graphics.SolidFill.prototype.getColor=function(){return this.color_};goog.graphics.SolidFill.prototype.getOpacity=function(){return this.opacity_};goog.graphics.LinearGradient=function(a,b,c,f,g,h,k,l){this.x1_=a;this.y1_=b;this.x2_=c;this.y2_=f;this.color1_=g;this.color2_=h;goog.asserts.assert(goog.isNumber(k)==goog.isNumber(l),"Both or neither of opt_opacity1 and opt_opacity2 have to be set.");this.opacity1_=goog.isDef(k)?k:null;this.opacity2_=goog.isDef(l)?l:null};goog.inherits(goog.graphics.LinearGradient,goog.graphics.Fill);goog.graphics.LinearGradient.prototype.getX1=function(){return this.x1_};
goog.graphics.LinearGradient.prototype.getY1=function(){return this.y1_};goog.graphics.LinearGradient.prototype.getX2=function(){return this.x2_};goog.graphics.LinearGradient.prototype.getY2=function(){return this.y2_};goog.graphics.LinearGradient.prototype.getColor1=function(){return this.color1_};goog.graphics.LinearGradient.prototype.getColor2=function(){return this.color2_};goog.graphics.LinearGradient.prototype.getOpacity1=function(){return this.opacity1_};
goog.graphics.LinearGradient.prototype.getOpacity2=function(){return this.opacity2_};goog.graphics.Stroke=function(a,b){this.width_=a;this.color_=b};goog.graphics.Stroke.prototype.getWidth=function(){return this.width_};goog.graphics.Stroke.prototype.getColor=function(){return this.color_};goog.graphics.Path=function(){this.segments_=[];this.count_=[];this.arguments_=[]};goog.graphics.Path.prototype.closePoint_=null;goog.graphics.Path.prototype.currentPoint_=null;goog.graphics.Path.prototype.simple_=!0;goog.graphics.Path.Segment={MOVETO:0,LINETO:1,CURVETO:2,ARCTO:3,CLOSE:4};
goog.graphics.Path.segmentArgCounts_=function(){var a=[];a[goog.graphics.Path.Segment.MOVETO]=2;a[goog.graphics.Path.Segment.LINETO]=2;a[goog.graphics.Path.Segment.CURVETO]=6;a[goog.graphics.Path.Segment.ARCTO]=6;a[goog.graphics.Path.Segment.CLOSE]=0;return a}();goog.graphics.Path.getSegmentCount=function(a){return goog.graphics.Path.segmentArgCounts_[a]};
goog.graphics.Path.prototype.appendPath=function(a){a.currentPoint_&&(Array.prototype.push.apply(this.segments_,a.segments_),Array.prototype.push.apply(this.count_,a.count_),Array.prototype.push.apply(this.arguments_,a.arguments_),this.currentPoint_=a.currentPoint_.concat(),this.closePoint_=a.closePoint_.concat(),this.simple_=this.simple_&&a.simple_);return this};
goog.graphics.Path.prototype.clear=function(){this.segments_.length=0;this.count_.length=0;this.arguments_.length=0;delete this.closePoint_;delete this.currentPoint_;delete this.simple_;return this};goog.graphics.Path.prototype.moveTo=function(a,b){goog.array.peek(this.segments_)==goog.graphics.Path.Segment.MOVETO?this.arguments_.length-=2:(this.segments_.push(goog.graphics.Path.Segment.MOVETO),this.count_.push(1));this.arguments_.push(a,b);this.currentPoint_=this.closePoint_=[a,b];return this};
goog.graphics.Path.prototype.lineTo=function(a){var b=goog.array.peek(this.segments_);if(null==b)throw Error("Path cannot start with lineTo");b!=goog.graphics.Path.Segment.LINETO&&(this.segments_.push(goog.graphics.Path.Segment.LINETO),this.count_.push(0));for(b=0;b<arguments.length;b+=2){var c=arguments[b],f=arguments[b+1];this.arguments_.push(c,f)}this.count_[this.count_.length-1]+=b/2;this.currentPoint_=[c,f];return this};
goog.graphics.Path.prototype.curveTo=function(a){var b=goog.array.peek(this.segments_);if(null==b)throw Error("Path cannot start with curve");b!=goog.graphics.Path.Segment.CURVETO&&(this.segments_.push(goog.graphics.Path.Segment.CURVETO),this.count_.push(0));for(b=0;b<arguments.length;b+=6){var c=arguments[b+4],f=arguments[b+5];this.arguments_.push(arguments[b],arguments[b+1],arguments[b+2],arguments[b+3],c,f)}this.count_[this.count_.length-1]+=b/6;this.currentPoint_=[c,f];return this};
goog.graphics.Path.prototype.close=function(){var a=goog.array.peek(this.segments_);if(null==a)throw Error("Path cannot start with close");a!=goog.graphics.Path.Segment.CLOSE&&(this.segments_.push(goog.graphics.Path.Segment.CLOSE),this.count_.push(1),this.currentPoint_=this.closePoint_);return this};
goog.graphics.Path.prototype.arc=function(a,b,c,f,g,h,k){a+=goog.math.angleDx(g,c);b+=goog.math.angleDy(g,f);k?(!this.currentPoint_||a!=this.currentPoint_[0]||b!=this.currentPoint_[1])&&this.lineTo(a,b):this.moveTo(a,b);return this.arcTo(c,f,g,h)};
goog.graphics.Path.prototype.arcTo=function(a,b,c,f){var g=this.currentPoint_[0]-goog.math.angleDx(c,a),h=this.currentPoint_[1]-goog.math.angleDy(c,b),g=g+goog.math.angleDx(c+f,a),h=h+goog.math.angleDy(c+f,b);this.segments_.push(goog.graphics.Path.Segment.ARCTO);this.count_.push(1);this.arguments_.push(a,b,c,f,g,h);this.simple_=!1;this.currentPoint_=[g,h];return this};
goog.graphics.Path.prototype.arcToAsCurves=function(a,b,c,f){var g=this.currentPoint_[0]-goog.math.angleDx(c,a),h=this.currentPoint_[1]-goog.math.angleDy(c,b),k=goog.math.toRadians(f);f=Math.ceil(2*(Math.abs(k)/Math.PI));k/=f;c=goog.math.toRadians(c);for(var l=0;l<f;l++){var m=Math.cos(c),n=Math.sin(c),p=4/3*Math.sin(k/2)/(1+Math.cos(k/2)),q=g+(m-p*n)*a,r=h+(n+p*m)*b;c+=k;m=Math.cos(c);n=Math.sin(c);this.curveTo(q,r,g+(m+p*n)*a,h+(n-p*m)*b,g+m*a,h+n*b)}return this};
goog.graphics.Path.prototype.forEachSegment=function(a){for(var b=this.arguments_,c=0,f=0,g=this.segments_.length;f<g;f++){var h=this.segments_[f],k=goog.graphics.Path.segmentArgCounts_[h]*this.count_[f];a(h,b.slice(c,c+k));c+=k}};goog.graphics.Path.prototype.getCurrentPoint=function(){return this.currentPoint_&&this.currentPoint_.concat()};
goog.graphics.Path.prototype.clone=function(){var a=new this.constructor;a.segments_=this.segments_.concat();a.count_=this.count_.concat();a.arguments_=this.arguments_.concat();a.closePoint_=this.closePoint_&&this.closePoint_.concat();a.currentPoint_=this.currentPoint_&&this.currentPoint_.concat();a.simple_=this.simple_;return a};goog.graphics.Path.prototype.isSimple=function(){return this.simple_};
goog.graphics.Path.simplifySegmentMap_=function(){var a={};a[goog.graphics.Path.Segment.MOVETO]=goog.graphics.Path.prototype.moveTo;a[goog.graphics.Path.Segment.LINETO]=goog.graphics.Path.prototype.lineTo;a[goog.graphics.Path.Segment.CLOSE]=goog.graphics.Path.prototype.close;a[goog.graphics.Path.Segment.CURVETO]=goog.graphics.Path.prototype.curveTo;a[goog.graphics.Path.Segment.ARCTO]=goog.graphics.Path.prototype.arcToAsCurves;return a}();
goog.graphics.Path.createSimplifiedPath=function(a){if(a.isSimple())return a.clone();var b=new goog.graphics.Path;a.forEachSegment(function(a,f){goog.graphics.Path.simplifySegmentMap_[a].apply(b,f)});return b};goog.graphics.Path.prototype.createTransformedPath=function(a){var b=goog.graphics.Path.createSimplifiedPath(this);b.transform(a);return b};
goog.graphics.Path.prototype.transform=function(a){if(!this.isSimple())throw Error("Non-simple path");a.transform(this.arguments_,0,this.arguments_,0,this.arguments_.length/2);this.closePoint_&&a.transform(this.closePoint_,0,this.closePoint_,0,1);this.currentPoint_&&this.closePoint_!=this.currentPoint_&&a.transform(this.currentPoint_,0,this.currentPoint_,0,1);return this};goog.graphics.Path.prototype.isEmpty=function(){return 0==this.segments_.length};goog.graphics.AbstractGraphics=function(a,b,c,f,g){goog.ui.Component.call(this,g);this.width=a;this.height=b;this.coordWidth=c||null;this.coordHeight=f||null};goog.inherits(goog.graphics.AbstractGraphics,goog.ui.Component);goog.graphics.AbstractGraphics.prototype.canvasElement=null;goog.graphics.AbstractGraphics.prototype.coordLeft=0;goog.graphics.AbstractGraphics.prototype.coordTop=0;goog.graphics.AbstractGraphics.prototype.getCanvasElement=function(){return this.canvasElement};
goog.graphics.AbstractGraphics.prototype.setCoordSize=function(a,b){this.coordWidth=a;this.coordHeight=b};goog.graphics.AbstractGraphics.prototype.getCoordSize=function(){return this.coordWidth?new goog.math.Size(this.coordWidth,this.coordHeight):this.getPixelSize()};goog.graphics.AbstractGraphics.prototype.getCoordOrigin=function(){return new goog.math.Coordinate(this.coordLeft,this.coordTop)};goog.graphics.AbstractGraphics.prototype.getSize=function(){return this.getPixelSize()};
goog.graphics.AbstractGraphics.prototype.getPixelSize=function(){return this.isInDocument()?goog.style.getSize(this.getElement()):goog.isNumber(this.width)&&goog.isNumber(this.height)?new goog.math.Size(this.width,this.height):null};goog.graphics.AbstractGraphics.prototype.getPixelScaleX=function(){var a=this.getPixelSize();return a?a.width/this.getCoordSize().width:0};
goog.graphics.AbstractGraphics.prototype.getPixelScaleY=function(){var a=this.getPixelSize();return a?a.height/this.getCoordSize().height:0};goog.graphics.AbstractGraphics.prototype.removeElement=function(a){goog.dom.removeNode(a.getElement())};goog.graphics.AbstractGraphics.prototype.drawCircle=function(a,b,c,f,g,h){return this.drawEllipse(a,b,c,c,f,g,h)};
goog.graphics.AbstractGraphics.prototype.drawText=function(a,b,c,f,g,h,k,l,m,n,p){var q=l.size/2;c="bottom"==k?c+g-q:"center"==k?c+g/2:c+q;return this.drawTextOnLine(a,b,c,b+f,c,h,l,m,n,p)};goog.graphics.AbstractGraphics.prototype.createPath=function(){return new goog.graphics.Path};goog.graphics.AbstractGraphics.prototype.isDomClonable=function(){return!1};goog.graphics.AbstractGraphics.prototype.suspend=function(){};goog.graphics.AbstractGraphics.prototype.resume=function(){};goog.graphics.SvgGraphics=function(a,b,c,f,g){goog.graphics.AbstractGraphics.call(this,a,b,c,f,g);this.defs_={};this.useManualViewbox_=goog.userAgent.WEBKIT&&!goog.userAgent.isVersion(526);this.handler_=new goog.events.EventHandler(this)};goog.inherits(goog.graphics.SvgGraphics,goog.graphics.AbstractGraphics);goog.graphics.SvgGraphics.SVG_NS_="http://www.w3.org/2000/svg";goog.graphics.SvgGraphics.DEF_ID_PREFIX_="_svgdef_";goog.graphics.SvgGraphics.nextDefId_=0;
goog.graphics.SvgGraphics.prototype.createSvgElement_=function(a,b){var c=this.dom_.getDocument().createElementNS(goog.graphics.SvgGraphics.SVG_NS_,a);b&&this.setElementAttributes(c,b);return c};goog.graphics.SvgGraphics.prototype.setElementAttributes=function(a,b){for(var c in b)a.setAttribute(c,b[c])};goog.graphics.SvgGraphics.prototype.append_=function(a,b){(b||this.canvasElement).getElement().appendChild(a.getElement())};
goog.graphics.SvgGraphics.prototype.setElementFill=function(a,b){var c=a.getElement();if(b instanceof goog.graphics.SolidFill)c.setAttribute("fill",b.getColor()),c.setAttribute("fill-opacity",b.getOpacity());else if(b instanceof goog.graphics.LinearGradient){var f="lg-"+b.getX1()+"-"+b.getY1()+"-"+b.getX2()+"-"+b.getY2()+"-"+b.getColor1()+"-"+b.getColor2(),g=this.getDef(f);if(!g){var g=this.createSvgElement_("linearGradient",{x1:b.getX1(),y1:b.getY1(),x2:b.getX2(),y2:b.getY2(),gradientUnits:"userSpaceOnUse"}),
h="stop-color:"+b.getColor1();goog.isNumber(b.getOpacity1())&&(h+=";stop-opacity:"+b.getOpacity1());h=this.createSvgElement_("stop",{offset:"0%",style:h});g.appendChild(h);h="stop-color:"+b.getColor2();goog.isNumber(b.getOpacity2())&&(h+=";stop-opacity:"+b.getOpacity2());h=this.createSvgElement_("stop",{offset:"100%",style:h});g.appendChild(h);g=this.addDef(f,g)}c.setAttribute("fill","url(#"+g+")")}else c.setAttribute("fill","none")};
goog.graphics.SvgGraphics.prototype.setElementStroke=function(a,b){var c=a.getElement();if(b){c.setAttribute("stroke",b.getColor());var f=b.getWidth();goog.isString(f)&&-1!=f.indexOf("px")?c.setAttribute("stroke-width",parseFloat(f)/this.getPixelScaleX()):c.setAttribute("stroke-width",f)}else c.setAttribute("stroke","none")};goog.graphics.SvgGraphics.prototype.setElementTransform=function(a,b,c,f,g,h){a.getElement().setAttribute("transform","translate("+b+","+c+") rotate("+f+" "+g+" "+h+")")};
goog.graphics.SvgGraphics.prototype.createDom=function(){var a=this.createSvgElement_("svg",{width:this.width,height:this.height,overflow:"hidden"}),b=this.createSvgElement_("g");this.defsElement_=this.createSvgElement_("defs");this.canvasElement=new goog.graphics.SvgGroupElement(b,this);a.appendChild(this.defsElement_);a.appendChild(b);this.setElementInternal(a);this.setViewBox_()};goog.graphics.SvgGraphics.prototype.setCoordOrigin=function(a,b){this.coordLeft=a;this.coordTop=b;this.setViewBox_()};
goog.graphics.SvgGraphics.prototype.setCoordSize=function(a,b){goog.graphics.SvgGraphics.superClass_.setCoordSize.apply(this,arguments);this.setViewBox_()};goog.graphics.SvgGraphics.prototype.getViewBox_=function(){return this.coordLeft+" "+this.coordTop+" "+(this.coordWidth?this.coordWidth+" "+this.coordHeight:"")};
goog.graphics.SvgGraphics.prototype.setViewBox_=function(){if(this.coordWidth||this.coordLeft||this.coordTop)this.getElement().setAttribute("preserveAspectRatio","none"),this.useManualViewbox_?this.updateManualViewBox_():this.getElement().setAttribute("viewBox",this.getViewBox_())};
goog.graphics.SvgGraphics.prototype.updateManualViewBox_=function(){if(this.isInDocument()&&(this.coordWidth||this.coordLeft||!this.coordTop)){var a=this.getPixelSize();if(0==a.width)this.getElement().style.visibility="hidden";else{this.getElement().style.visibility="";var b=-this.coordLeft,c=-this.coordTop,f=a.width/this.coordWidth,a=a.height/this.coordHeight;this.canvasElement.getElement().setAttribute("transform","scale("+f+" "+a+") translate("+b+" "+c+")")}}};
goog.graphics.SvgGraphics.prototype.setSize=function(a,b){goog.style.setSize(this.getElement(),a,b)};
goog.graphics.SvgGraphics.prototype.getPixelSize=function(){if(!goog.userAgent.GECKO)return this.isInDocument()?goog.style.getSize(this.getElement()):goog.graphics.SvgGraphics.superClass_.getPixelSize.call(this);var a=this.width,b=this.height,c=goog.isString(a)&&-1!=a.indexOf("%"),f=goog.isString(b)&&-1!=b.indexOf("%");if(!this.isInDocument()&&(c||f))return null;var g,h;c&&(g=this.getElement().parentNode,h=goog.style.getSize(g),a=parseFloat(a)*h.width/100);f&&(g=g||this.getElement().parentNode,h=
h||goog.style.getSize(g),b=parseFloat(b)*h.height/100);return new goog.math.Size(a,b)};goog.graphics.SvgGraphics.prototype.clear=function(){this.canvasElement.clear();goog.dom.removeChildren(this.defsElement_);this.defs_={}};goog.graphics.SvgGraphics.prototype.drawEllipse=function(a,b,c,f,g,h,k){a=this.createSvgElement_("ellipse",{cx:a,cy:b,rx:c,ry:f});g=new goog.graphics.SvgEllipseElement(a,this,g,h);this.append_(g,k);return g};
goog.graphics.SvgGraphics.prototype.drawRect=function(a,b,c,f,g,h,k){a=this.createSvgElement_("rect",{x:a,y:b,width:c,height:f});g=new goog.graphics.SvgRectElement(a,this,g,h);this.append_(g,k);return g};
goog.graphics.SvgGraphics.prototype.drawImage=function(a,b,c,f,g,h){a=this.createSvgElement_("image",{x:a,y:b,width:c,height:f,"image-rendering":"optimizeQuality",preserveAspectRatio:"none"});a.setAttributeNS("http://www.w3.org/1999/xlink","href",g);g=new goog.graphics.SvgImageElement(a,this);this.append_(g,h);return g};
goog.graphics.SvgGraphics.prototype.drawTextOnLine=function(a,b,c,f,g,h,k,l,m,n){var p=Math.round(goog.math.angle(b,c,f,g));f-=b;g-=c;g=Math.round(Math.sqrt(f*f+g*g));var q=k.size;f={"font-family":k.family,"font-size":q};var r=Math.round(0.85*q),q=Math.round(c-q/2+r),r=b;"center"==h?(r+=Math.round(g/2),f["text-anchor"]="middle"):"right"==h&&(r+=g,f["text-anchor"]="end");f.x=r;f.y=q;k.bold&&(f["font-weight"]="bold");k.italic&&(f["font-style"]="italic");0!=p&&(f.transform="rotate("+p+" "+b+" "+c+")");
b=this.createSvgElement_("text",f);b.appendChild(this.dom_.getDocument().createTextNode(a));null==l&&(goog.userAgent.GECKO&&goog.userAgent.MAC)&&(a="black",m instanceof goog.graphics.SolidFill&&(a=m.getColor()),l=new goog.graphics.Stroke(1,a));m=new goog.graphics.SvgTextElement(b,this,l,m);this.append_(m,n);return m};
goog.graphics.SvgGraphics.prototype.drawPath=function(a,b,c,f){a=this.createSvgElement_("path",{d:goog.graphics.SvgGraphics.getSvgPath(a)});b=new goog.graphics.SvgPathElement(a,this,b,c);this.append_(b,f);return b};
goog.graphics.SvgGraphics.getSvgPath=function(a){var b=[];a.forEachSegment(function(a,f){switch(a){case goog.graphics.Path.Segment.MOVETO:b.push("M");Array.prototype.push.apply(b,f);break;case goog.graphics.Path.Segment.LINETO:b.push("L");Array.prototype.push.apply(b,f);break;case goog.graphics.Path.Segment.CURVETO:b.push("C");Array.prototype.push.apply(b,f);break;case goog.graphics.Path.Segment.ARCTO:var g=f[3];b.push("A",f[0],f[1],0,180<Math.abs(g)?1:0,0<g?1:0,f[4],f[5]);break;case goog.graphics.Path.Segment.CLOSE:b.push("Z")}});
return b.join(" ")};goog.graphics.SvgGraphics.prototype.createGroup=function(a){var b=this.createSvgElement_("g");(a||this.canvasElement).getElement().appendChild(b);return new goog.graphics.SvgGroupElement(b,this)};goog.graphics.SvgGraphics.prototype.getTextWidth=function(a,b){};
goog.graphics.SvgGraphics.prototype.addDef=function(a,b){if(a in this.defs_)return this.defs_[a];var c=goog.graphics.SvgGraphics.DEF_ID_PREFIX_+goog.graphics.SvgGraphics.nextDefId_++;b.setAttribute("id",c);this.defs_[a]=c;this.defsElement_.appendChild(b);return c};goog.graphics.SvgGraphics.prototype.getDef=function(a){return a in this.defs_?this.defs_[a]:null};
goog.graphics.SvgGraphics.prototype.removeDef=function(a){var b=this.getDef(a);b&&(b=this.dom_.getElement(b),this.defsElement_.removeChild(b),delete this.defs_[a])};
goog.graphics.SvgGraphics.prototype.enterDocument=function(){var a=this.getPixelSize();goog.graphics.SvgGraphics.superClass_.enterDocument.call(this);a||this.dispatchEvent(goog.events.EventType.RESIZE);if(this.useManualViewbox_){var a=this.width,b=this.height;"string"==typeof a&&(-1!=a.indexOf("%")&&"string"==typeof b&&-1!=b.indexOf("%"))&&this.handler_.listen(goog.graphics.SvgGraphics.getResizeCheckTimer_(),goog.Timer.TICK,this.updateManualViewBox_);this.updateManualViewBox_()}};
goog.graphics.SvgGraphics.prototype.exitDocument=function(){goog.graphics.SvgGraphics.superClass_.exitDocument.call(this);this.useManualViewbox_&&this.handler_.unlisten(goog.graphics.SvgGraphics.getResizeCheckTimer_(),goog.Timer.TICK,this.updateManualViewBox_)};goog.graphics.SvgGraphics.prototype.disposeInternal=function(){delete this.defs_;delete this.defsElement_;delete this.canvasElement;goog.graphics.SvgGraphics.superClass_.disposeInternal.call(this)};
goog.graphics.SvgGraphics.getResizeCheckTimer_=function(){goog.graphics.SvgGraphics.resizeCheckTimer_||(goog.graphics.SvgGraphics.resizeCheckTimer_=new goog.Timer(400),goog.graphics.SvgGraphics.resizeCheckTimer_.start());return goog.graphics.SvgGraphics.resizeCheckTimer_};goog.graphics.SvgGraphics.prototype.isDomClonable=function(){return!0};goog.graphics.vmlGetElement_=function(){return this.element_=this.getGraphics().getVmlElement(this.id_)||this.element_};goog.graphics.VmlGroupElement=function(a,b){this.id_=a.id;goog.graphics.GroupElement.call(this,a,b)};goog.inherits(goog.graphics.VmlGroupElement,goog.graphics.GroupElement);goog.graphics.VmlGroupElement.prototype.getElement=goog.graphics.vmlGetElement_;goog.graphics.VmlGroupElement.prototype.clear=function(){goog.dom.removeChildren(this.getElement())};
goog.graphics.VmlGroupElement.prototype.isRootElement_=function(){return this.getGraphics().getCanvasElement()==this};goog.graphics.VmlGroupElement.prototype.setSize=function(a,b){var c=this.getElement(),f=c.style;f.width=goog.graphics.VmlGraphics.toSizePx(a);f.height=goog.graphics.VmlGraphics.toSizePx(b);c.coordsize=goog.graphics.VmlGraphics.toSizeCoord(a)+" "+goog.graphics.VmlGraphics.toSizeCoord(b);this.isRootElement_()||(c.coordorigin="0 0")};
goog.graphics.VmlEllipseElement=function(a,b,c,f,g,h,k,l){this.id_=a.id;goog.graphics.EllipseElement.call(this,a,b,k,l);this.cx=c;this.cy=f;this.rx=g;this.ry=h};goog.inherits(goog.graphics.VmlEllipseElement,goog.graphics.EllipseElement);goog.graphics.VmlEllipseElement.prototype.getElement=goog.graphics.vmlGetElement_;goog.graphics.VmlEllipseElement.prototype.setCenter=function(a,b){this.cx=a;this.cy=b;goog.graphics.VmlGraphics.setPositionAndSize(this.getElement(),a-this.rx,b-this.ry,2*this.rx,2*this.ry)};
goog.graphics.VmlEllipseElement.prototype.setRadius=function(a,b){this.rx=a;this.ry=b;goog.graphics.VmlGraphics.setPositionAndSize(this.getElement(),this.cx-a,this.cy-b,2*a,2*b)};goog.graphics.VmlRectElement=function(a,b,c,f){this.id_=a.id;goog.graphics.RectElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.VmlRectElement,goog.graphics.RectElement);goog.graphics.VmlRectElement.prototype.getElement=goog.graphics.vmlGetElement_;
goog.graphics.VmlRectElement.prototype.setPosition=function(a,b){var c=this.getElement().style;c.left=goog.graphics.VmlGraphics.toPosPx(a);c.top=goog.graphics.VmlGraphics.toPosPx(b)};goog.graphics.VmlRectElement.prototype.setSize=function(a,b){var c=this.getElement().style;c.width=goog.graphics.VmlGraphics.toSizePx(a);c.height=goog.graphics.VmlGraphics.toSizePx(b)};goog.graphics.VmlPathElement=function(a,b,c,f){this.id_=a.id;goog.graphics.PathElement.call(this,a,b,c,f)};
goog.inherits(goog.graphics.VmlPathElement,goog.graphics.PathElement);goog.graphics.VmlPathElement.prototype.getElement=goog.graphics.vmlGetElement_;goog.graphics.VmlPathElement.prototype.setPath=function(a){goog.graphics.VmlGraphics.setAttribute(this.getElement(),"path",goog.graphics.VmlGraphics.getVmlPath(a))};goog.graphics.VmlTextElement=function(a,b,c,f){this.id_=a.id;goog.graphics.TextElement.call(this,a,b,c,f)};goog.inherits(goog.graphics.VmlTextElement,goog.graphics.TextElement);
goog.graphics.VmlTextElement.prototype.getElement=goog.graphics.vmlGetElement_;goog.graphics.VmlTextElement.prototype.setText=function(a){goog.graphics.VmlGraphics.setAttribute(this.getElement().childNodes[1],"string",a)};goog.graphics.VmlImageElement=function(a,b){this.id_=a.id;goog.graphics.ImageElement.call(this,a,b)};goog.inherits(goog.graphics.VmlImageElement,goog.graphics.ImageElement);goog.graphics.VmlImageElement.prototype.getElement=goog.graphics.vmlGetElement_;
goog.graphics.VmlImageElement.prototype.setPosition=function(a,b){var c=this.getElement().style;c.left=goog.graphics.VmlGraphics.toPosPx(a);c.top=goog.graphics.VmlGraphics.toPosPx(b)};goog.graphics.VmlImageElement.prototype.setSize=function(a,b){var c=this.getElement().style;c.width=goog.graphics.VmlGraphics.toPosPx(a);c.height=goog.graphics.VmlGraphics.toPosPx(b)};goog.graphics.VmlImageElement.prototype.setSource=function(a){goog.graphics.VmlGraphics.setAttribute(this.getElement(),"src",a)};goog.graphics.VmlGraphics=function(a,b,c,f,g){goog.graphics.AbstractGraphics.call(this,a,b,c,f,g);this.handler_=new goog.events.EventHandler(this)};goog.inherits(goog.graphics.VmlGraphics,goog.graphics.AbstractGraphics);goog.graphics.VmlGraphics.VML_PREFIX_="g_vml_";goog.graphics.VmlGraphics.VML_NS_="urn:schemas-microsoft-com:vml";goog.graphics.VmlGraphics.VML_IMPORT_="#default#VML";goog.graphics.VmlGraphics.IE8_MODE_=document.documentMode&&8<=document.documentMode;
goog.graphics.VmlGraphics.COORD_MULTIPLIER=100;goog.graphics.VmlGraphics.toCssSize=function(a){return goog.isString(a)&&goog.string.endsWith(a,"%")?a:parseFloat(a.toString())+"px"};goog.graphics.VmlGraphics.toPosCoord=function(a){return Math.round((parseFloat(a.toString())-0.5)*goog.graphics.VmlGraphics.COORD_MULTIPLIER)};goog.graphics.VmlGraphics.toPosPx=function(a){return goog.graphics.VmlGraphics.toPosCoord(a)+"px"};
goog.graphics.VmlGraphics.toSizeCoord=function(a){return Math.round(parseFloat(a.toString())*goog.graphics.VmlGraphics.COORD_MULTIPLIER)};goog.graphics.VmlGraphics.toSizePx=function(a){return goog.graphics.VmlGraphics.toSizeCoord(a)+"px"};goog.graphics.VmlGraphics.setAttribute=function(a,b,c){goog.graphics.VmlGraphics.IE8_MODE_?a[b]=c:a.setAttribute(b,c)};
goog.graphics.VmlGraphics.prototype.createVmlElement=function(a){a=this.dom_.createElement(goog.graphics.VmlGraphics.VML_PREFIX_+":"+a);a.id=goog.string.createUniqueString();return a};goog.graphics.VmlGraphics.prototype.getVmlElement=function(a){return this.dom_.getElement(a)};goog.graphics.VmlGraphics.prototype.updateGraphics_=function(){goog.graphics.VmlGraphics.IE8_MODE_&&this.isInDocument()&&(this.getElement().innerHTML=this.getElement().innerHTML)};
goog.graphics.VmlGraphics.prototype.append_=function(a,b){(b||this.canvasElement).getElement().appendChild(a.getElement());this.updateGraphics_()};
goog.graphics.VmlGraphics.prototype.setElementFill=function(a,b){var c=a.getElement();this.removeFill(c);if(b instanceof goog.graphics.SolidFill)if("transparent"==b.getColor())c.filled=!1;else if(1!=b.getOpacity()){c.filled=!0;var f=this.createVmlElement("fill");f.opacity=Math.round(100*b.getOpacity())+"%";f.color=b.getColor();c.appendChild(f)}else c.filled=!0,c.fillcolor=b.getColor();else if(b instanceof goog.graphics.LinearGradient){c.filled=!0;f=this.createVmlElement("fill");f.color=b.getColor1();
f.color2=b.getColor2();goog.isNumber(b.getOpacity1())&&(f.opacity=b.getOpacity1());goog.isNumber(b.getOpacity2())&&(f.opacity2=b.getOpacity2());var g=goog.math.angle(b.getX1(),b.getY1(),b.getX2(),b.getY2()),g=Math.round(goog.math.standardAngle(270-g));f.angle=g;f.type="gradient";c.appendChild(f)}else c.filled=!1;this.updateGraphics_()};
goog.graphics.VmlGraphics.prototype.setElementStroke=function(a,b){var c=a.getElement();if(b){c.stroked=!0;var f=b.getWidth(),f=goog.isString(f)&&-1==f.indexOf("px")?parseFloat(f):f*this.getPixelScaleX(),g=c.getElementsByTagName("stroke")[0];1>f?(g=g||this.createVmlElement("stroke"),g.opacity=f,g.weight="1px",g.color=b.getColor(),c.appendChild(g)):(g&&c.removeChild(g),c.strokecolor=b.getColor(),c.strokeweight=f+"px")}else c.stroked=!1;this.updateGraphics_()};
goog.graphics.VmlGraphics.prototype.setElementTransform=function(a,b,c,f,g,h){a=a.getElement();a.style.left=goog.graphics.VmlGraphics.toPosPx(b);a.style.top=goog.graphics.VmlGraphics.toPosPx(c);if(f||a.rotation)a.rotation=f,a.coordsize=goog.graphics.VmlGraphics.toSizeCoord(2*g)+" "+goog.graphics.VmlGraphics.toSizeCoord(2*h)};goog.graphics.VmlGraphics.prototype.removeFill=function(a){a.fillcolor="";for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];"fill"==c.tagName&&a.removeChild(c)}};
goog.graphics.VmlGraphics.setPositionAndSize=function(a,b,c,f,g){var h=a.style;h.position="absolute";h.left=goog.graphics.VmlGraphics.toPosPx(b);h.top=goog.graphics.VmlGraphics.toPosPx(c);h.width=goog.graphics.VmlGraphics.toSizePx(f);h.height=goog.graphics.VmlGraphics.toSizePx(g);"shape"==a.tagName&&(a.coordsize=goog.graphics.VmlGraphics.toSizeCoord(f)+" "+goog.graphics.VmlGraphics.toSizeCoord(g))};
goog.graphics.VmlGraphics.prototype.createFullSizeElement_=function(a){a=this.createVmlElement(a);var b=this.getCoordSize();goog.graphics.VmlGraphics.setPositionAndSize(a,0,0,b.width,b.height);return a};try{eval("document.namespaces")}catch(ex$$11){}
goog.graphics.VmlGraphics.prototype.createDom=function(){var a=this.dom_.getDocument();a.namespaces[goog.graphics.VmlGraphics.VML_PREFIX_]||(goog.graphics.VmlGraphics.IE8_MODE_?a.namespaces.add(goog.graphics.VmlGraphics.VML_PREFIX_,goog.graphics.VmlGraphics.VML_NS_,goog.graphics.VmlGraphics.VML_IMPORT_):a.namespaces.add(goog.graphics.VmlGraphics.VML_PREFIX_,goog.graphics.VmlGraphics.VML_NS_),a.createStyleSheet().cssText=goog.graphics.VmlGraphics.VML_PREFIX_+"\\:*{behavior:url(#default#VML)}");var a=
this.width,b=this.height,c=this.dom_.createDom("div",{style:"overflow:hidden;position:relative;width:"+goog.graphics.VmlGraphics.toCssSize(a)+";height:"+goog.graphics.VmlGraphics.toCssSize(b)});this.setElementInternal(c);var f=this.createVmlElement("group"),g=f.style;g.position="absolute";g.left=g.top=0;g.width=this.width;g.height=this.height;f.coordsize=this.coordWidth?goog.graphics.VmlGraphics.toSizeCoord(this.coordWidth)+" "+goog.graphics.VmlGraphics.toSizeCoord(this.coordHeight):goog.graphics.VmlGraphics.toSizeCoord(a)+
" "+goog.graphics.VmlGraphics.toSizeCoord(b);goog.isDef(this.coordLeft)?f.coordorigin=goog.graphics.VmlGraphics.toSizeCoord(this.coordLeft)+" "+goog.graphics.VmlGraphics.toSizeCoord(this.coordTop):f.coordorigin="0 0";c.appendChild(f);this.canvasElement=new goog.graphics.VmlGroupElement(f,this);goog.events.listen(c,goog.events.EventType.RESIZE,goog.bind(this.handleContainerResize_,this))};
goog.graphics.VmlGraphics.prototype.handleContainerResize_=function(){var a=goog.style.getSize(this.getElement()),b=this.canvasElement.getElement().style;if(a.width)b.width=a.width+"px",b.height=a.height+"px";else{for(a=this.getElement();a&&a.currentStyle&&"none"!=a.currentStyle.display;)a=a.parentNode;a&&a.currentStyle&&this.handler_.listen(a,"propertychange",this.handleContainerResize_)}this.dispatchEvent(goog.events.EventType.RESIZE)};
goog.graphics.VmlGraphics.prototype.handlePropertyChange_=function(a){var b=a.getBrowserEvent().propertyName;if("display"==b||"className"==b)this.handler_.unlisten(a.target,"propertychange",this.handlePropertyChange_),this.handleContainerResize_()};goog.graphics.VmlGraphics.prototype.setCoordOrigin=function(a,b){this.coordLeft=a;this.coordTop=b;this.canvasElement.getElement().coordorigin=goog.graphics.VmlGraphics.toSizeCoord(this.coordLeft)+" "+goog.graphics.VmlGraphics.toSizeCoord(this.coordTop)};
goog.graphics.VmlGraphics.prototype.setCoordSize=function(a,b){goog.graphics.VmlGraphics.superClass_.setCoordSize.apply(this,arguments);this.canvasElement.getElement().coordsize=goog.graphics.VmlGraphics.toSizeCoord(a)+" "+goog.graphics.VmlGraphics.toSizeCoord(b)};goog.graphics.VmlGraphics.prototype.setSize=function(a,b){goog.style.setSize(this.getElement(),a,b)};
goog.graphics.VmlGraphics.prototype.getPixelSize=function(){var a=this.getElement();return new goog.math.Size(a.style.pixelWidth||a.offsetWidth||1,a.style.pixelHeight||a.offsetHeight||1)};goog.graphics.VmlGraphics.prototype.clear=function(){this.canvasElement.clear()};
goog.graphics.VmlGraphics.prototype.drawEllipse=function(a,b,c,f,g,h,k){var l=this.createVmlElement("oval");goog.graphics.VmlGraphics.setPositionAndSize(l,a-c,b-f,2*c,2*f);a=new goog.graphics.VmlEllipseElement(l,this,a,b,c,f,g,h);this.append_(a,k);return a};goog.graphics.VmlGraphics.prototype.drawRect=function(a,b,c,f,g,h,k){var l=this.createVmlElement("rect");goog.graphics.VmlGraphics.setPositionAndSize(l,a,b,c,f);a=new goog.graphics.VmlRectElement(l,this,g,h);this.append_(a,k);return a};
goog.graphics.VmlGraphics.prototype.drawImage=function(a,b,c,f,g,h){var k=this.createVmlElement("image");goog.graphics.VmlGraphics.setPositionAndSize(k,a,b,c,f);goog.graphics.VmlGraphics.setAttribute(k,"src",g);a=new goog.graphics.VmlImageElement(k,this);this.append_(a,h);return a};
goog.graphics.VmlGraphics.prototype.drawTextOnLine=function(a,b,c,f,g,h,k,l,m,n){var p=this.createFullSizeElement_("shape"),q=this.createVmlElement("path");b="M"+goog.graphics.VmlGraphics.toPosCoord(b)+","+goog.graphics.VmlGraphics.toPosCoord(c)+"L"+goog.graphics.VmlGraphics.toPosCoord(f)+","+goog.graphics.VmlGraphics.toPosCoord(g)+"E";goog.graphics.VmlGraphics.setAttribute(q,"v",b);goog.graphics.VmlGraphics.setAttribute(q,"textpathok","true");b=this.createVmlElement("textpath");b.setAttribute("on",
"true");c=b.style;c.fontSize=k.size*this.getPixelScaleX();c.fontFamily=k.family;null!=h&&(c["v-text-align"]=h);k.bold&&(c.fontWeight="bold");k.italic&&(c.fontStyle="italic");goog.graphics.VmlGraphics.setAttribute(b,"string",a);p.appendChild(q);p.appendChild(b);a=new goog.graphics.VmlTextElement(p,this,l,m);this.append_(a,n);return a};
goog.graphics.VmlGraphics.prototype.drawPath=function(a,b,c,f){var g=this.createFullSizeElement_("shape");goog.graphics.VmlGraphics.setAttribute(g,"path",goog.graphics.VmlGraphics.getVmlPath(a));a=new goog.graphics.VmlPathElement(g,this,b,c);this.append_(a,f);return a};
goog.graphics.VmlGraphics.getVmlPath=function(a){var b=[];a.forEachSegment(function(a,f){switch(a){case goog.graphics.Path.Segment.MOVETO:b.push("m");Array.prototype.push.apply(b,goog.array.map(f,goog.graphics.VmlGraphics.toSizeCoord));break;case goog.graphics.Path.Segment.LINETO:b.push("l");Array.prototype.push.apply(b,goog.array.map(f,goog.graphics.VmlGraphics.toSizeCoord));break;case goog.graphics.Path.Segment.CURVETO:b.push("c");Array.prototype.push.apply(b,goog.array.map(f,goog.graphics.VmlGraphics.toSizeCoord));
break;case goog.graphics.Path.Segment.CLOSE:b.push("x");break;case goog.graphics.Path.Segment.ARCTO:var g=f[2]+f[3],h=goog.graphics.VmlGraphics.toSizeCoord(f[4]-goog.math.angleDx(g,f[0])),g=goog.graphics.VmlGraphics.toSizeCoord(f[5]-goog.math.angleDy(g,f[1])),k=goog.graphics.VmlGraphics.toSizeCoord(f[0]),l=goog.graphics.VmlGraphics.toSizeCoord(f[1]),m=Math.round(-65536*f[2]),n=Math.round(-65536*f[3]);b.push("ae",h,g,k,l,m,n)}});return b.join(" ")};
goog.graphics.VmlGraphics.prototype.createGroup=function(a){var b=this.createFullSizeElement_("group");(a||this.canvasElement).getElement().appendChild(b);return new goog.graphics.VmlGroupElement(b,this)};goog.graphics.VmlGraphics.prototype.getTextWidth=function(a,b){return 0};goog.graphics.VmlGraphics.prototype.enterDocument=function(){goog.graphics.VmlGraphics.superClass_.enterDocument.call(this);this.handleContainerResize_();this.updateGraphics_()};
goog.graphics.VmlGraphics.prototype.disposeInternal=function(){this.canvasElement=null;goog.graphics.VmlGraphics.superClass_.disposeInternal.call(this)};goog.graphics.CanvasGroupElement=function(a){goog.graphics.GroupElement.call(this,null,a);this.children_=[]};goog.inherits(goog.graphics.CanvasGroupElement,goog.graphics.GroupElement);goog.graphics.CanvasGroupElement.prototype.clear=function(){this.children_.length&&(this.children_.length=0,this.getGraphics().redraw())};goog.graphics.CanvasGroupElement.prototype.setSize=function(a,b){};goog.graphics.CanvasGroupElement.prototype.appendChild=function(a){this.children_.push(a)};
goog.graphics.CanvasGroupElement.prototype.draw=function(a){a=0;for(var b=this.children_.length;a<b;a++)this.getGraphics().drawElement(this.children_[a])};goog.graphics.CanvasEllipseElement=function(a,b,c,f,g,h,k,l){goog.graphics.EllipseElement.call(this,a,b,k,l);this.cx_=c;this.cy_=f;this.rx_=g;this.ry_=h;this.path_=new goog.graphics.Path;this.setUpPath_();this.pathElement_=new goog.graphics.CanvasPathElement(null,b,this.path_,k,l)};goog.inherits(goog.graphics.CanvasEllipseElement,goog.graphics.EllipseElement);
goog.graphics.CanvasEllipseElement.prototype.setUpPath_=function(){this.path_.clear();this.path_.moveTo(this.cx_+goog.math.angleDx(0,this.rx_),this.cy_+goog.math.angleDy(0,this.ry_));this.path_.arcTo(this.rx_,this.ry_,0,360);this.path_.close()};goog.graphics.CanvasEllipseElement.prototype.setCenter=function(a,b){this.cx_=a;this.cy_=b;this.setUpPath_();this.pathElement_.setPath(this.path_)};
goog.graphics.CanvasEllipseElement.prototype.setRadius=function(a,b){this.rx_=a;this.ry_=b;this.setUpPath_();this.pathElement_.setPath(this.path_)};goog.graphics.CanvasEllipseElement.prototype.draw=function(a){this.pathElement_.draw(a)};goog.graphics.CanvasRectElement=function(a,b,c,f,g,h,k,l){goog.graphics.RectElement.call(this,a,b,k,l);this.x_=c;this.y_=f;this.w_=g;this.h_=h};goog.inherits(goog.graphics.CanvasRectElement,goog.graphics.RectElement);
goog.graphics.CanvasRectElement.prototype.setPosition=function(a,b){this.x_=a;this.y_=b;this.drawn_&&this.getGraphics().redraw()};goog.graphics.CanvasRectElement.prototype.drawn_=!1;goog.graphics.CanvasRectElement.prototype.setSize=function(a,b){this.w_=a;this.h_=b;this.drawn_&&this.getGraphics().redraw()};
goog.graphics.CanvasRectElement.prototype.draw=function(a){this.drawn_=!0;a.beginPath();a.moveTo(this.x_,this.y_);a.lineTo(this.x_,this.y_+this.h_);a.lineTo(this.x_+this.w_,this.y_+this.h_);a.lineTo(this.x_+this.w_,this.y_);a.closePath()};goog.graphics.CanvasPathElement=function(a,b,c,f,g){goog.graphics.PathElement.call(this,a,b,f,g);this.setPath(c)};goog.inherits(goog.graphics.CanvasPathElement,goog.graphics.PathElement);goog.graphics.CanvasPathElement.prototype.drawn_=!1;
goog.graphics.CanvasPathElement.prototype.setPath=function(a){this.path_=a.isSimple()?a:goog.graphics.Path.createSimplifiedPath(a);this.drawn_&&this.getGraphics().redraw()};
goog.graphics.CanvasPathElement.prototype.draw=function(a){this.drawn_=!0;a.beginPath();this.path_.forEachSegment(function(b,c){switch(b){case goog.graphics.Path.Segment.MOVETO:a.moveTo(c[0],c[1]);break;case goog.graphics.Path.Segment.LINETO:for(var f=0;f<c.length;f+=2)a.lineTo(c[f],c[f+1]);break;case goog.graphics.Path.Segment.CURVETO:for(f=0;f<c.length;f+=6)a.bezierCurveTo(c[f],c[f+1],c[f+2],c[f+3],c[f+4],c[f+5]);break;case goog.graphics.Path.Segment.ARCTO:throw Error("Canvas paths cannot contain arcs");
case goog.graphics.Path.Segment.CLOSE:a.closePath()}})};
goog.graphics.CanvasTextElement=function(a,b,c,f,g,h,k,l,m,n){var p=goog.dom.createDom(goog.dom.TagName.DIV,{style:"display:table;position:absolute;padding:0;margin:0;border:0"});goog.graphics.TextElement.call(this,p,a,m,n);this.text_=b;this.x1_=c;this.y1_=f;this.x2_=g;this.y2_=h;this.align_=k||"left";this.font_=l;this.innerElement_=goog.dom.createDom("DIV",{style:"display:table-cell;padding: 0;margin: 0;border: 0"});this.updateStyle_();this.updateText_();a.getElement().appendChild(p);p.appendChild(this.innerElement_)};
goog.inherits(goog.graphics.CanvasTextElement,goog.graphics.TextElement);goog.graphics.CanvasTextElement.prototype.setText=function(a){this.text_=a;this.updateText_()};goog.graphics.CanvasTextElement.prototype.setFill=function(a){this.fill=a;var b=this.getElement();b&&(b.style.color=a.getColor()||a.getColor1())};goog.graphics.CanvasTextElement.prototype.setStroke=function(a){};goog.graphics.CanvasTextElement.prototype.draw=function(a){};
goog.graphics.CanvasTextElement.prototype.updateStyle_=function(){var a=this.x1_,b=this.x2_,c=this.y1_,f=this.y2_,g=this.align_,h=this.font_,k=this.getElement().style,l=this.getGraphics().getPixelScaleX(),m=this.getGraphics().getPixelScaleY();a==b?(k.lineHeight="90%",this.innerElement_.style.verticalAlign="center"==g?"middle":"left"==g?c<f?"top":"bottom":c<f?"bottom":"top",k.textAlign="center",b=h.size*l,k.top=Math.round(Math.min(c,f)*m)+"px",k.left=Math.round((a-b/2)*l)+"px",k.width=Math.round(b)+
"px",k.height=Math.abs(c-f)*m+"px",k.fontSize=0.6*h.size*m+"pt"):(k.lineHeight="100%",this.innerElement_.style.verticalAlign="top",k.textAlign=g,k.top=Math.round(((c+f)/2-2*h.size/3)*m)+"px",k.left=Math.round(a*l)+"px",k.width=Math.round(Math.abs(b-a)*l)+"px",k.height="auto",k.fontSize=h.size*m+"pt");k.fontWeight=h.bold?"bold":"normal";k.fontStyle=h.italic?"italic":"normal";k.fontFamily=h.family;a=this.getFill();k.color=a.getColor()||a.getColor1()};
goog.graphics.CanvasTextElement.prototype.updateText_=function(){this.innerElement_.innerHTML=this.x1_==this.x2_?goog.array.map(this.text_.split(""),function(a){return goog.string.htmlEscape(a)}).join("<br>"):goog.string.htmlEscape(this.text_)};goog.graphics.CanvasImageElement=function(a,b,c,f,g,h,k){goog.graphics.ImageElement.call(this,a,b);this.x_=c;this.y_=f;this.w_=g;this.h_=h;this.src_=k};goog.inherits(goog.graphics.CanvasImageElement,goog.graphics.ImageElement);
goog.graphics.CanvasImageElement.prototype.drawn_=!1;goog.graphics.CanvasImageElement.prototype.setPosition=function(a,b){this.x_=a;this.y_=b;this.drawn_&&this.getGraphics().redraw()};goog.graphics.CanvasImageElement.prototype.setSize=function(a,b){this.w_=a;this.h_=b;this.drawn_&&this.getGraphics().redraw()};goog.graphics.CanvasImageElement.prototype.setSource=function(a){this.src_=a;this.drawn_&&this.getGraphics().redraw()};
goog.graphics.CanvasImageElement.prototype.draw=function(a){this.img_?(this.w_&&this.h_&&a.drawImage(this.img_,this.x_,this.y_,this.w_,this.h_),this.drawn_=!0):(a=new Image,a.onload=goog.bind(this.handleImageLoad_,this,a),a.src=this.src_)};goog.graphics.CanvasImageElement.prototype.handleImageLoad_=function(a){this.img_=a;this.getGraphics().redraw()};goog.graphics.CanvasGraphics=function(a,b,c,f,g){goog.graphics.AbstractGraphics.call(this,a,b,c,f,g)};goog.inherits(goog.graphics.CanvasGraphics,goog.graphics.AbstractGraphics);goog.graphics.CanvasGraphics.prototype.setElementFill=function(a,b){this.redraw()};goog.graphics.CanvasGraphics.prototype.setElementStroke=function(a,b){this.redraw()};goog.graphics.CanvasGraphics.prototype.setElementTransform=function(a,b,c,f,g,h){this.redraw()};
goog.graphics.CanvasGraphics.prototype.pushElementTransform=function(a){var b=this.getContext();b.save();a=a.getTransform();var c=a.getTranslateX(),f=a.getTranslateY();(c||f)&&b.translate(c,f);(a=a.getShearY())&&b.rotate(Math.asin(a))};goog.graphics.CanvasGraphics.prototype.popElementTransform=function(){this.getContext().restore()};
goog.graphics.CanvasGraphics.prototype.createDom=function(){var a=this.dom_.createDom("div",{style:"position:relative;overflow:hidden"});this.setElementInternal(a);this.canvas_=this.dom_.createDom("canvas");a.appendChild(this.canvas_);this.lastGroup_=this.canvasElement=new goog.graphics.CanvasGroupElement(this);this.redrawTimeout_=0;this.updateSize()};goog.graphics.CanvasGraphics.prototype.clearContext_=function(){this.context_=null};
goog.graphics.CanvasGraphics.prototype.getContext=function(){this.getElement()||this.createDom();this.context_||(this.context_=this.canvas_.getContext("2d"),this.context_.save());return this.context_};goog.graphics.CanvasGraphics.prototype.setCoordOrigin=function(a,b){this.coordLeft=a;this.coordTop=b;this.redraw()};goog.graphics.CanvasGraphics.prototype.setCoordSize=function(a,b){goog.graphics.CanvasGraphics.superClass_.setCoordSize.apply(this,arguments);this.redraw()};
goog.graphics.CanvasGraphics.prototype.setSize=function(a,b){this.width=a;this.height=b;this.updateSize();this.redraw()};
goog.graphics.CanvasGraphics.prototype.getPixelSize=function(){var a=this.width,b=this.height,c=goog.isString(a)&&-1!=a.indexOf("%"),f=goog.isString(b)&&-1!=b.indexOf("%");if(!this.isInDocument()&&(c||f))return null;var g,h;c&&(g=this.getElement().parentNode,h=goog.style.getSize(g),a=parseFloat(a)*h.width/100);f&&(g=g||this.getElement().parentNode,h=h||goog.style.getSize(g),b=parseFloat(b)*h.height/100);return new goog.math.Size(a,b)};
goog.graphics.CanvasGraphics.prototype.updateSize=function(){goog.style.setSize(this.getElement(),this.width,this.height);var a=this.getPixelSize();a&&(goog.style.setSize(this.canvas_,a.width,a.height),this.canvas_.width=a.width,this.canvas_.height=a.height,this.clearContext_())};goog.graphics.CanvasGraphics.prototype.reset=function(){var a=this.getContext();a.restore();var b=this.getPixelSize();b.width&&b.height&&a.clearRect(0,0,b.width,b.height);a.save()};
goog.graphics.CanvasGraphics.prototype.clear=function(){this.reset();this.canvasElement.clear();for(var a=this.getElement();1<a.childNodes.length;)a.removeChild(a.lastChild)};
goog.graphics.CanvasGraphics.prototype.redraw=function(){if(this.preventRedraw_)this.needsRedraw_=!0;else if(this.isInDocument()){this.reset();if(this.coordWidth){var a=this.getPixelSize();this.getContext().scale(a.width/this.coordWidth,a.height/this.coordHeight)}(this.coordLeft||this.coordTop)&&this.getContext().translate(-this.coordLeft,-this.coordTop);this.pushElementTransform(this.canvasElement);this.canvasElement.draw(this.context_);this.popElementTransform()}};
goog.graphics.CanvasGraphics.prototype.drawElement=function(a){if(!(a instanceof goog.graphics.CanvasTextElement)){var b=this.getContext();this.pushElementTransform(a);if(!a.getFill||!a.getStroke)a.draw(b);else{var c=a.getFill();if(c)if(c instanceof goog.graphics.SolidFill)0!=c.getOpacity()&&(b.globalAlpha=c.getOpacity(),b.fillStyle=c.getColor(),a.draw(b),b.fill(),b.globalAlpha=1);else{var f=b.createLinearGradient(c.getX1(),c.getY1(),c.getX2(),c.getY2());f.addColorStop(0,c.getColor1());f.addColorStop(1,
c.getColor2());b.fillStyle=f;a.draw(b);b.fill()}if(c=a.getStroke())a.draw(b),b.strokeStyle=c.getColor(),a=c.getWidth(),goog.isString(a)&&-1!=a.indexOf("px")&&(a=parseFloat(a)/this.getPixelScaleX()),b.lineWidth=a,b.stroke()}this.popElementTransform()}};goog.graphics.CanvasGraphics.prototype.append_=function(a,b){this.append(a,b)};goog.graphics.CanvasGraphics.prototype.append=function(a,b){b=b||this.canvasElement;b.appendChild(a);this.isDrawable(b)&&this.drawElement(a)};
goog.graphics.CanvasGraphics.prototype.drawEllipse=function(a,b,c,f,g,h,k){a=new goog.graphics.CanvasEllipseElement(null,this,a,b,c,f,g,h);this.append(a,k);return a};goog.graphics.CanvasGraphics.prototype.drawRect=function(a,b,c,f,g,h,k){a=new goog.graphics.CanvasRectElement(null,this,a,b,c,f,g,h);this.append(a,k);return a};goog.graphics.CanvasGraphics.prototype.drawImage=function(a,b,c,f,g,h){a=new goog.graphics.CanvasImageElement(null,this,a,b,c,f,g);this.append(a,h);return a};
goog.graphics.CanvasGraphics.prototype.drawTextOnLine=function(a,b,c,f,g,h,k,l,m,n){a=new goog.graphics.CanvasTextElement(this,a,b,c,f,g,h,k,l,m);this.append(a,n);return a};goog.graphics.CanvasGraphics.prototype.drawPath=function(a,b,c,f){a=new goog.graphics.CanvasPathElement(null,this,a,b,c);this.append(a,f);return a};goog.graphics.CanvasGraphics.prototype.isDrawable=function(a){return this.isInDocument()&&!this.redrawTimeout_&&!this.isRedrawRequired(a)};
goog.graphics.CanvasGraphics.prototype.isRedrawRequired=function(a){return a!=this.canvasElement&&a!=this.lastGroup_};goog.graphics.CanvasGraphics.prototype.createGroup=function(a){var b=new goog.graphics.CanvasGroupElement(this);a=a||this.canvasElement;if(a==this.canvasElement||a==this.lastGroup_)this.lastGroup_=b;this.append(b,a);return b};goog.graphics.CanvasGraphics.prototype.disposeInternal=function(){this.context_=null;goog.graphics.CanvasGraphics.superClass_.disposeInternal.call(this)};
goog.graphics.CanvasGraphics.prototype.enterDocument=function(){var a=this.getPixelSize();goog.graphics.CanvasGraphics.superClass_.enterDocument.call(this);a||(this.updateSize(),this.dispatchEvent(goog.events.EventType.RESIZE));this.redraw()};goog.graphics.CanvasGraphics.prototype.suspend=function(){this.preventRedraw_=!0};goog.graphics.CanvasGraphics.prototype.resume=function(){this.preventRedraw_=!1;this.needsRedraw_&&(this.redraw(),this.needsRedraw_=!1)};goog.graphics.createGraphics=function(a,b,c,f,g){a=goog.userAgent.IE&&!goog.userAgent.isVersion("9")?new goog.graphics.VmlGraphics(a,b,c,f,g):goog.userAgent.WEBKIT&&(!goog.userAgent.isVersion("420")||goog.userAgent.MOBILE)?new goog.graphics.CanvasGraphics(a,b,c,f,g):new goog.graphics.SvgGraphics(a,b,c,f,g);a.createDom();return a};
goog.graphics.createSimpleGraphics=function(a,b,c,f,g){return goog.userAgent.MAC&&goog.userAgent.GECKO&&!goog.userAgent.isVersion("1.9a")?(a=new goog.graphics.CanvasGraphics(a,b,c,f,g),a.createDom(),a):goog.graphics.createGraphics(a,b,c,f,g)};
goog.graphics.isBrowserSupported=function(){return goog.userAgent.IE?goog.userAgent.isVersion("5.5"):goog.userAgent.GECKO?goog.userAgent.isVersion("1.8"):goog.userAgent.OPERA?goog.userAgent.isVersion("9.0"):goog.userAgent.WEBKIT?goog.userAgent.isVersion("412"):!1};goog.ui.TextareaRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.TextareaRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.TextareaRenderer);goog.ui.TextareaRenderer.CSS_CLASS="goog-textarea";goog.ui.TextareaRenderer.prototype.getAriaRole=function(){};goog.ui.TextareaRenderer.prototype.decorate=function(a,b){this.setUpTextarea_(a);goog.ui.TextareaRenderer.superClass_.decorate.call(this,a,b);a.setContent(b.value);return b};
goog.ui.TextareaRenderer.prototype.createDom=function(a){this.setUpTextarea_(a);return a.getDomHelper().createDom("textarea",{"class":this.getClassNames(a).join(" "),disabled:!a.isEnabled()},a.getContent()||"")};goog.ui.TextareaRenderer.prototype.canDecorate=function(a){return a.tagName==goog.dom.TagName.TEXTAREA};goog.ui.TextareaRenderer.prototype.setRightToLeft=goog.nullFunction;goog.ui.TextareaRenderer.prototype.isFocusable=function(a){return a.isEnabled()};
goog.ui.TextareaRenderer.prototype.setFocusable=goog.nullFunction;goog.ui.TextareaRenderer.prototype.setState=function(a,b,c){goog.ui.TextareaRenderer.superClass_.setState.call(this,a,b,c);if((a=a.getElement())&&b==goog.ui.Component.State.DISABLED)a.disabled=c};goog.ui.TextareaRenderer.prototype.updateAriaState=goog.nullFunction;
goog.ui.TextareaRenderer.prototype.setUpTextarea_=function(a){a.setHandleMouseEvents(!1);a.setAutoStates(goog.ui.Component.State.ALL,!1);a.setSupportedState(goog.ui.Component.State.FOCUSED,!1)};goog.ui.TextareaRenderer.prototype.setContent=function(a,b){a&&(a.value=b)};goog.ui.TextareaRenderer.prototype.getCssClass=function(){return goog.ui.TextareaRenderer.CSS_CLASS};goog.ui.Textarea=function(a,b,c){goog.ui.Control.call(this,a,b||goog.ui.TextareaRenderer.getInstance(),c);this.setHandleMouseEvents(!1);this.setAllowTextSelection(!0);a||this.setContentInternal("")};goog.inherits(goog.ui.Textarea,goog.ui.Control);goog.ui.Textarea.NEEDS_HELP_SHRINKING_=goog.userAgent.GECKO||goog.userAgent.WEBKIT;goog.ui.Textarea.prototype.isResizing_=!1;goog.ui.Textarea.prototype.height_=0;goog.ui.Textarea.prototype.maxHeight_=0;goog.ui.Textarea.prototype.minHeight_=0;
goog.ui.Textarea.prototype.hasDiscoveredTextareaCharacteristics_=!1;goog.ui.Textarea.prototype.needsPaddingBorderFix_=!1;goog.ui.Textarea.prototype.scrollHeightIncludesPadding_=!1;goog.ui.Textarea.prototype.scrollHeightIncludesBorder_=!1;goog.ui.Textarea.EventType={RESIZE:"resize"};goog.ui.Textarea.prototype.getPaddingBorderBoxHeight_=function(){return this.paddingBox_.top+this.paddingBox_.bottom+this.borderBox_.top+this.borderBox_.bottom};goog.ui.Textarea.prototype.getMinHeight=function(){return this.minHeight_};
goog.ui.Textarea.prototype.getMinHeight_=function(){var a=this.minHeight_,b=this.getElement();a&&(b&&this.needsPaddingBorderFix_)&&(a-=this.getPaddingBorderBoxHeight_());return a};goog.ui.Textarea.prototype.setMinHeight=function(a){this.minHeight_=a;this.resize()};goog.ui.Textarea.prototype.getMaxHeight=function(){return this.maxHeight_};
goog.ui.Textarea.prototype.getMaxHeight_=function(){var a=this.maxHeight_,b=this.getElement();a&&(b&&this.needsPaddingBorderFix_)&&(a-=this.getPaddingBorderBoxHeight_());return a};goog.ui.Textarea.prototype.setMaxHeight=function(a){this.maxHeight_=a;this.resize()};goog.ui.Textarea.prototype.setValue=function(a){this.setContent(String(a))};goog.ui.Textarea.prototype.getValue=function(){return this.getElement().value};
goog.ui.Textarea.prototype.setContent=function(a){goog.ui.Textarea.superClass_.setContent.call(this,a);this.resize()};goog.ui.Textarea.prototype.setEnabled=function(a){goog.ui.Textarea.superClass_.setEnabled.call(this,a);this.getElement().disabled=!a};goog.ui.Textarea.prototype.resize=function(){this.getElement()&&this.grow_()};
goog.ui.Textarea.prototype.enterDocument=function(){goog.ui.Textarea.superClass_.enterDocument.call(this);var a=this.getElement();goog.style.setStyle(a,{overflowY:"hidden",overflowX:"auto",boxSizing:"border-box",MsBoxSizing:"border-box",WebkitBoxSizing:"border-box",MozBoxSizing:"border-box"});this.paddingBox_=goog.style.getPaddingBox(a);this.borderBox_=goog.style.getBorderBox(a);this.getHandler().listen(a,goog.events.EventType.SCROLL,this.grow_).listen(a,goog.events.EventType.FOCUS,this.grow_).listen(a,
goog.events.EventType.KEYUP,this.grow_).listen(a,goog.events.EventType.MOUSEUP,this.mouseUpListener_);this.resize()};
goog.ui.Textarea.prototype.getHeight_=function(){this.discoverTextareaCharacteristics_();var a=this.getElement(),b=this.getElement().scrollHeight+this.getHorizontalScrollBarHeight_();if(this.needsPaddingBorderFix_)b-=this.getPaddingBorderBoxHeight_();else{if(!this.scrollHeightIncludesPadding_)var c=this.paddingBox_,b=b+(c.top+c.bottom);this.scrollHeightIncludesBorder_||(a=goog.style.getBorderBox(a),b+=a.top+a.bottom)}return b};
goog.ui.Textarea.prototype.setHeight_=function(a){this.height_!=a&&(this.height_=a,this.getElement().style.height=a+"px")};goog.ui.Textarea.prototype.setHeightToEstimate_=function(){var a=this.getElement();a.style.height="auto";var b=a.value.match(/\n/g)||[];a.rows=b.length+1};
goog.ui.Textarea.prototype.getHorizontalScrollBarHeight_=function(){var a=this.getElement(),b=a.offsetHeight-a.clientHeight;if(!this.scrollHeightIncludesPadding_)var c=this.paddingBox_,b=b-(c.top+c.bottom);this.scrollHeightIncludesBorder_||(a=goog.style.getBorderBox(a),b-=a.top+a.bottom);return 0<b?b:0};
goog.ui.Textarea.prototype.discoverTextareaCharacteristics_=function(){if(!this.hasDiscoveredTextareaCharacteristics_){var a=this.getElement().cloneNode(!1);goog.style.setStyle(a,{position:"absolute",height:"auto",top:"-9999px",margin:"0",padding:"1px",border:"1px solid #000",overflow:"hidden"});goog.dom.appendChild(this.getDomHelper().getDocument().body,a);var b=a.scrollHeight;a.style.padding="10px";var c=a.scrollHeight;this.scrollHeightIncludesPadding_=c>b;a.style.borderWidth="10px";this.scrollHeightIncludesBorder_=
a.scrollHeight>c;a.style.height="100px";100!=a.offsetHeight&&(this.needsPaddingBorderFix_=!0);goog.dom.removeNode(a);this.hasDiscoveredTextareaCharacteristics_=!0}};
goog.ui.Textarea.prototype.grow_=function(a){if(!this.isResizing_){a=!1;this.isResizing_=!0;var b=this.getElement(),c=this.height_;if(b.scrollHeight){var f=!1,g=!1,h=this.getHeight_(),k=b.offsetHeight,l=this.getMinHeight_(),m=this.getMaxHeight_();l&&h<l?(this.setHeight_(l),f=!0):m&&h>m?(this.setHeight_(m),b.style.overflowY="",g=!0):k!=h?this.setHeight_(h):this.height_||(this.height_=h);!f&&(!g&&goog.ui.Textarea.NEEDS_HELP_SHRINKING_)&&(a=!0)}else this.setHeightToEstimate_();this.isResizing_=!1;a&&
this.shrink_();c!=this.height_&&this.dispatchEvent(goog.ui.Textarea.EventType.RESIZE)}};
goog.ui.Textarea.prototype.shrink_=function(){var a=this.getElement();if(!this.isResizing_){this.isResizing_=!0;var b=a.scrollHeight;if(b){var c=this.getHeight_(),f=this.getMinHeight_(),g=this.getMaxHeight_();!(f&&c<=f)&&!(g&&c>=g)&&(g=this.paddingBox_,a.style.paddingBottom=g.bottom+1+"px",this.getHeight_()==c&&(a.style.paddingBottom=g.bottom+b+"px",a.scrollTop=0,b=this.getHeight_()-b,b>=f?this.setHeight_(b):this.setHeight_(f)),a.style.paddingBottom=g.bottom+"px")}else this.setHeightToEstimate_();
this.isResizing_=!1}};goog.ui.Textarea.prototype.mouseUpListener_=function(a){var b=this.getElement();a=b.offsetHeight;b.filters&&b.filters.length&&(b=b.filters.item("DXImageTransform.Microsoft.DropShadow"))&&(a-=b.offX);a!=this.height_&&(this.height_=this.minHeight_=a)};bay.whiteboard.Create=function(){return new bay.whiteboard.Whiteboard};
bay.whiteboard.Whiteboard=function(){this.properties=goog.object.clone(bay.whiteboard.Whiteboard.properties);goog.userAgent.MOBILE&&(this.properties.hover.dist*=5);this.initCollections();this.area={};this.elements={};this.tool={};this.tool.groups=[];for(var a=0;a<bay.whiteboard.Whiteboard.toolGroups.length;a++){var b={id:bay.whiteboard.Whiteboard.toolGroups[a].id,order:bay.whiteboard.Whiteboard.toolGroups[a].order,desc:bay.whiteboard.Whiteboard.toolGroups[a].desc,hidden:!1};b.toggleOn=function(a){return function(b){b.showToolBox(a)}}(b);
b.toggleOff=function(a){return function(b){b.hideToolBox(a)}}(b);this.tool.groups.push(b)}this.tool.tools=[];for(a=0;a<bay.whiteboard.Whiteboard.tools.length;a++)toolProto=bay.whiteboard.Whiteboard.tools[a],tool={id:toolProto.id,order:toolProto.order,desc:toolProto.desc,hidden:!1},tool.action=toolProto.action,tool.toggleOn=toolProto.toggleOn,tool.toggleOff=toolProto.toggleOff,tool.onClick=toolProto.onClick,tool.onMove=toolProto.onMove,tool.group=toolProto.group,this.tool.tools.push(tool)};
bay.whiteboard.Whiteboard.prototype.setToolProperties=function(a,b,c,f){for(var g=0;g<this.tool.groups.length;g++)this.tool.groups[g].id==a&&(this.tool.groups[g].hidden=!b,this.tool.groups[g].order=c);for(g=0;g<this.tool.tools.length;g++)this.tool.tools[g].id==a&&(this.tool.tools[g].hidden=!b,this.tool.tools[g].order=c,this.tool.tools[g].group=f)};bay.whiteboard.Whiteboard.prototype.getMainCollection=function(){return this.collections.main};bay.whiteboard.Whiteboard.prototype.getDrawArea=function(){return whiteboard.elements.drawElement};
bay.whiteboard.Whiteboard.toolGroups=[];bay.whiteboard.Whiteboard.tools=[];bay.whiteboard.Whiteboard.addGroup=function(a,b,c){for(var f=0;f<bay.whiteboard.Whiteboard.toolGroups.length;f++)if(bay.whiteboard.Whiteboard.toolGroups[f].id==a)return bay.whiteboard.Whiteboard.toolGroups[f];a={id:a,order:b,desc:c};bay.whiteboard.Whiteboard.toolGroups.push(a);return a};
bay.whiteboard.Whiteboard.addTool=function(a,b,c,f,g){b&&bay.whiteboard.Whiteboard.addGroup(b);for(var h=0;h<bay.whiteboard.Whiteboard.tools.length;h++)if(bay.whiteboard.Whiteboard.tools[h].id==a)return bay.whiteboard.Whiteboard.tools[h];a={id:a,order:f,desc:g,group:b,action:c.action,toggleOn:c.toggleOn,toggleOff:c.toggleOff,onClick:c.onClick,onMove:c.onMove};bay.whiteboard.Whiteboard.tools.push(a);return a};
bay.whiteboard.Whiteboard.removeTool=function(a){for(var b=0;b<bay.whiteboard.Whiteboard.tools.length;b++)bay.whiteboard.Whiteboard.tools[b].id==a&&bay.whiteboard.Whiteboard.tools.splice(b,1)};
bay.whiteboard.Whiteboard.properties={events:{onclick:!0,onwheel:!0,ondrag:!0,hover:!0,onrightclick:!0},point:{size:2,color:"black",width:1,font:"Times",fontsize:14},hover:{width:4,color:"blue",dist:10},current:{width:1,color:"red"},axes:{width:0.5,color:"skyblue",font:"Times",fontsize:11},ws:{bufferSize:1E4,bufferTimeout:100}};
bay.whiteboard.Whiteboard.prototype.render=function(a){this.container="string"===typeof a?goog.dom.getElement(a):a;this.elements.toolbarElement=goog.dom.createDom("td","bwb_toolbar"," ");this.elements.drawElement=goog.dom.createDom("td","bwb_drawarea"," ");layout=goog.dom.createDom("table","bwb_layout",goog.dom.createDom("tr","bwb_layout",this.elements.toolbarElement,this.elements.drawElement));goog.dom.appendChild(this.container,layout);this.addButtons();this.getGraphics();this.addMouseMoveListener();
this.addWheelListener();this.addClickListener();this.addDragListener();this.addRightClickListener();this.addKeyboardListener()};
bay.whiteboard.Whiteboard.prototype.redrawAll=function(){var a=this;drawCollection=function(b){b=b.getElements();for(var c=0;c<b.length;c++)b[c]&&(b[c].draw&&!b[c].hidden)&&b[c].draw(a)};this.graphics.clear();this.area.showCoordinates&&this.drawCoordinates();drawCollection(this.collections.tracer);drawCollection(this.collections.main);drawCollection(this.collections.current);if(this.dragger&&this.dragger.point&&(point=this.dragger.point,point.exists)){var b=new goog.graphics.Stroke(this.properties.axes.width,
this.properties.axes.color),c=new goog.graphics.Font(this.properties.axes.fontsize,this.properties.axes.font),f=new goog.graphics.SolidFill(this.properties.axes.color),g=this.transform([point.x,point.y]);this.graphics.drawText("["+Math.round(100*point.x)/100+", "+Math.round(100*point.y)/100+"]",g[0],g[1]-this.properties.axes.fontsize,null,null,"left",null,c,b,f)}};bay.whiteboard.Whiteboard.prototype.getViewport=function(){return{left:this.area.minX,right:this.area.maxX,top:this.area.maxY,bottom:this.area.minY}};
bay.whiteboard.Whiteboard.prototype.setBoundaries=function(a,b,c,f){this.area.left=a;null!=this.area.left&&this.area.left>this.area.minX&&(this.area.left=this.area.minX);this.area.right=b;null!=this.area.right&&this.area.right<this.area.maxX&&(this.area.right=this.area.maxX);this.area.top=c;null!=this.area.top&&this.area.top<this.area.maxY&&(this.area.top=this.area.maxY);this.area.bottom=f;null!=this.area.bottom&&this.area.bottom>this.area.minY&&(this.area.bottom=this.area.minY)};
bay.whiteboard.Whiteboard.prototype.scale=function(a,b){var c=this.reverseTransform(a),f=this.area.transformation.clone();this.area.transformation=this.area.transformation.translate(c.x,c.y).scale(b,b).translate(-c.x,-c.y);return this.onSetTransformation(f)};bay.whiteboard.Whiteboard.prototype.shift=function(a){var b=this.area.transformation.clone();this.area.transformation=this.area.transformation.preTranslate(this.graphics.getCoordSize().width*a.x,-this.graphics.getCoordSize().height*a.y);return this.onSetTransformation(b)};
bay.whiteboard.Whiteboard.prototype.markHoverElements=function(a){for(var b=this.collections.main.getElements(),c=0;c<b.length;c++)b[c]&&(b[c].hover=!1);a=this.reverseTransform(a);b=this.collections.main.getNeighbourList(a,this.getHoverDist());for(c=0;c<b.length;c++)b[c].element.hover=!0};bay.whiteboard.Whiteboard.prototype.zoomIn=function(){this.scale(new bay.whiteboard.Vector(this.graphics.getCoordSize().width/2,this.graphics.getCoordSize().height/2),2);this.drawBackground();this.redrawAll()};
bay.whiteboard.Whiteboard.prototype.zoomOut=function(){this.scale(new bay.whiteboard.Vector(this.graphics.getCoordSize().width/2,this.graphics.getCoordSize().height/2),0.5);this.drawBackground();this.redrawAll()};
bay.whiteboard.Whiteboard.prototype.linkWebSocket=function(a,b,c){b&&(this.properties.ws.bufferSize=b);c&&(this.properties.ws.bufferTimeout=c);this.ws_=new goog.net.WebSocket;this.wsBuffer="";this.wsTimeout=null;this.ws_.addEventListener(goog.net.WebSocket.EventType.OPENED,function(a){},!1,this);this.ws_.addEventListener(goog.net.WebSocket.EventType.MESSAGE,function(a){this.acceptBackground(a.message);this.collections.main.acceptJsonStr(a.message);this.redrawAll()},!1,this);this.ws_.addEventListener(goog.net.WebSocket.EventType.CLOSED,
function(a){this.ws_.dispose()},!1,this);this.ws_.addEventListener(goog.net.WebSocket.EventType.ERROR,function(a){this.ws_.close()},!1,this);this.ws_.open(a);var f=this,g=function(){f.ws_.isOpen()&&(f.ws_.send("["+f.wsBuffer+"]"),f.wsBuffer="");f.wsTimeout&&(clearTimeout(f.wsTimeout),f.wsTimeout=null)};this.collections.main.onChange=function(a){f.wsBuffer&&(f.wsBuffer+=",");f.wsBuffer+=this.getJson(a,!0);f.wsBuffer.length>f.properties.ws.bufferSize?g():f.wsTimeout||(f.wsTimeout=setTimeout(g,f.properties.ws.bufferTimeout))};
this.onBackground=function(a){f.ws_.isOpen()&&f.ws_.send(f.backgroundJson())}};
bay.whiteboard.Whiteboard.prototype.getGraphics=function(){if(!this.graphics){goog.graphics.isBrowserSupported()||alert(goog.getMsg("This browser doesn''t support graphics. Please use another web browser."));var a=goog.style.getSize(this.elements.drawElement),b=goog.graphics.createSimpleGraphics(a.width-12,a.height-12),c=this.elements.drawElement;goog.events.listen(new goog.dom.ViewportSizeMonitor,goog.events.EventType.RESIZE,function(a){a=goog.style.getSize(c);b.setSize(a.width-12,a.height-12)});
b.render(this.elements.drawElement);this.graphics=b;this.area.transformation=goog.graphics.AffineTransform.getTranslateInstance(b.getCoordSize().width/2,b.getCoordSize().height/2).scale(1,-1);this.onSetTransformation()}return this.graphics};bay.whiteboard.Whiteboard.prototype.getHoverDist=function(){return this.properties.hover.dist/this.area.transformation.getScaleX()};
bay.whiteboard.Whiteboard.prototype.initCollections=function(){this.collections={};this.collections.main=new bay.whiteboard.Collection;this.collections.main.joinBoard(this);this.collections.current=new bay.whiteboard.Collection;this.collections.current.joinBoard(this);this.collections.tracer=new bay.whiteboard.Collection;this.collections.tracer.joinBoard(this)};
bay.whiteboard.Whiteboard.prototype.transform=function(a){var b=[];if(a instanceof bay.whiteboard.Vector)return this.area.transformation.transform([a.x,a.y],0,b,0,1),new bay.whiteboard.Vector(b[0],b[1]);this.area.transformation.transform(a,0,b,0,a.length/2);return b};
bay.whiteboard.Whiteboard.prototype.reverseTransform=function(a){var b=[];if(a instanceof bay.whiteboard.Vector)return this.area.reverseTransformation.transform([a.x,a.y],0,b,0,1),new bay.whiteboard.Vector(b[0],b[1]);this.area.reverseTransformation.transform(a,0,b,0,a.length/2);return b};
bay.whiteboard.Whiteboard.prototype.onSetTransformation=function(a){this.area.reverseTransformation=this.area.transformation.createInverse();var b=this.reverseTransform([0,0,this.graphics.getCoordSize().width,this.graphics.getCoordSize().height]);if(null!=this.area.left&&b[0]<this.area.left||null!=this.area.right&&b[2]>this.area.right||null!=this.area.bottom&&b[3]<this.area.bottom||null!=this.area.top&&b[1]>this.area.top)return this.area.transformation=a,this.area.reverseTransformation=this.area.transformation.createInverse(),
!1;this.area.minX=b[0];this.area.minY=b[3];this.area.maxX=b[2];this.area.maxY=b[1];return!0};
bay.whiteboard.Whiteboard.prototype.showCodePanel=function(){var a=new goog.ui.Dialog;a.setTitle(goog.getMsg("JSON code for drawing"));a.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);var b=new goog.ui.Textarea(this.collections.main.jsonCode());b.setMinHeight(this.graphics.getCoordSize().height/2);b.setMaxHeight(this.graphics.getCoordSize().height);a.addChild(b,!0);goog.style.setSize(b.getElement(),this.graphics.getCoordSize().width/2,this.graphics.getCoordSize().height/2);goog.dom.classes.add(b.getElement(),
"codeArea");goog.events.listen(a,goog.ui.Dialog.EventType.SELECT,function(c){"ok"==c.key&&(this.collections.main.parseJson(b.getValue()),this.redrawAll());a.dispose()},null,this);a.setVisible(!0)};bay.whiteboard.Whiteboard.prototype.findPoint=function(a){for(var b=0;b<a.length;b++)if(a[b].element instanceof bay.whiteboard.Point)return a[b].element;return null};
bay.whiteboard.Whiteboard.prototype.pointAtEventPosition=function(a){a=this.getConvertEventPos(a);var b=this.getHoverDist(),c=this.collections.main.getNeighbourList(a,b,!0,!0),f=this.findPoint(c);if(!f){for(var g=0;g<c.length&&!(c[g].distance>=b);g++)for(var h=g+1;h<c.length;h++){var k=bay.whiteboard.getIntersection(c[g].element,c[h].element,a);if(k&&k.isExists()){var l=k.distance(a);l<=b&&(f=k,b=l)}}f&&this.collections.main.add(f)}f||(f=0<c.length&&c[0].element.closestPoint?c[0].element.closestPoint(a):
new bay.whiteboard.PointFree(a),this.collections.main.add(f));return f};bay.whiteboard.Whiteboard.prototype.getEventPos=function(a){var b=goog.style.getClientPosition(this.elements.drawElement);return new bay.whiteboard.Vector(a.clientX-b.x,a.clientY-b.y)};bay.whiteboard.Whiteboard.prototype.getConvertEventPos=function(a){return this.reverseTransform(this.getEventPos(a))};
bay.whiteboard.Whiteboard.prototype.addMouseMoveListener=function(){this.properties.events.hover&&goog.events.listen(this.elements.drawElement,goog.events.EventType.MOUSEMOVE,function(a){this.markHoverElements(this.getEventPos(a));if(this.tool.current&&this.tool.current.onMove)this.tool.current.onMove(this,a);this.redrawAll()},null,this)};
bay.whiteboard.Whiteboard.prototype.addWheelListener=function(){this.properties.events.onwheel&&goog.events.listen(new goog.events.MouseWheelHandler(this.elements.drawElement),goog.events.MouseWheelHandler.EventType.MOUSEWHEEL,function(a){a.altKey?this.scale(this.getEventPos(a),Math.pow(2,-a.detail/20)):a.shiftKey?this.shift(new bay.whiteboard.Vector(-a.detail/40,0)):!a.ctrlKey&&!a.metaKey&&this.shift(new bay.whiteboard.Vector(0,-a.detail/40));this.drawBackground();this.redrawAll();a.preventDefault()},
null,this)};bay.whiteboard.Whiteboard.prototype.addClickListener=function(){this.properties.events.onclick&&goog.events.listen(this.elements.drawElement,goog.events.EventType.CLICK,function(a){if(this.tool.current&&this.tool.current.onClick)this.tool.current.onClick(this,a);a.preventDefault()},null,this)};
bay.whiteboard.Whiteboard.prototype.addDragListener=function(){if(this.properties.events.ondrag){var a=function(a){this.dragger.point&&this.dragger.point.moveTo&&(this.dragger.point.moveTo(this.getConvertEventPos(a)),this.TraceAll())};goog.events.listen(this.elements.drawElement,goog.events.EventType.MOUSEDOWN,function(b){var c=this.getHoverDist(),c=this.collections.main.getNeighbourList(this.getConvertEventPos(b),c,!0,!0),c=this.findPoint(c);this.dragger=new goog.fx.Dragger(this.elements.drawElement);
c&&(this.dragger.point=c);goog.events.listen(this.dragger,goog.fx.Dragger.EventType.DRAG,a,null,this);goog.events.listen(this.dragger,goog.fx.Dragger.EventType.END,function(a){this.dragger&&(this.dragger.dispose(),this.dragger=null)},null,this);this.dragger.startDrag(b)},null,this)}};
bay.whiteboard.Whiteboard.prototype.addRightClickListener=function(){this.properties.events.onrightclick&&goog.events.listen(this.elements.drawElement,goog.events.EventType.CONTEXTMENU,function(a){this.tool.current&&this.tool.current.toggleOff&&this.tool.current.toggleOff(this);this.showInfoDialog(a)},null,this)};
bay.whiteboard.Whiteboard.prototype.addKeyboardListener=function(){var a=new goog.ui.KeyboardShortcutHandler(document);a.registerShortcut("CTRL_J",goog.events.KeyCodes.J,goog.ui.KeyboardShortcutHandler.Modifiers.CTRL);goog.events.listen(a,goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,function(a){"CTRL_J"==a.identifier&&this.showCodePanel()},null,this)};
bay.whiteboard.Whiteboard.prototype.TraceAll=function(){for(var a=this.collections.main.getElements(),b=0;b<a.length;b++)if(a[b]&&(a[b].trace&&a[b].exists)&&a[b].getTrace){var c=a[b].getTrace();c.exists=!0;this.collections.tracer.add(c)}};
bay.whiteboard.Whiteboard.prototype.addButtons=function(){var a=this,b=function(b,c,f){var g=goog.style.getSize(a.elements.toolbarElement),n=new goog.ui.Button;f?n.render(f):n.render(a.elements.toolbarElement);goog.style.setSize(n.getElement(),g.width-4,g.width-4);goog.dom.classes.add(n.getElement(),"bwb_toolbarButton "+b);c&&(goog.events.listen(n,goog.ui.Component.EventType.ACTION,function(a){this.buttonAction(c,a)},null,a),c.desc&&new goog.ui.Tooltip(n.getElement(),c.desc));return n},c=function(a,
b){var c=a.order;c||(c=0);var f=b.order;f||(f=0);return c-f};a.tool.groups.sort(c);for(var f=0;f<a.tool.groups.length;f++){var g=a.tool.groups[f];g.hidden||(g.button=b(g.id,g),g.toolBox=goog.dom.createDom("div","bwb_toolbox"," "),goog.dom.appendChild(this.container,g.toolBox),goog.style.showElement(g.toolBox,!1))}a.tool.tools.sort(c);for(f=0;f<a.tool.tools.length;f++)if(tool=a.tool.tools[f],!tool.hidden)if(null==tool.group)b(tool.id,tool);else for(c=0;c<a.tool.groups.length;c++)a.tool.groups[c].id==
tool.group&&!a.tool.groups[c].hidden&&b(tool.id,tool,a.tool.groups[c].toolBox)};bay.whiteboard.Whiteboard.prototype.buttonAction=function(a,b){if(a.action)this.tool.current&&this.tool.current.toggleOff&&(this.tool.current.toggleOff(this),this.tool.current=null),a.action(this,b);else{var c=this.tool.current!=a;this.tool.current&&this.tool.current.toggleOff&&this.tool.current.toggleOff(this);c?(this.tool.current=a,a.toggleOn&&a.toggleOn(this)):this.tool.current=null}};
bay.whiteboard.Whiteboard.prototype.clearCurrentTool=function(a,b){goog.dom.classes.remove(this.elements.drawElement,a);this.tool.current[b]={};this.tool.current=null;this.collections.current.clear();this.redrawAll()};bay.whiteboard.Whiteboard.prototype.hideToolBox=function(a){this.tool.current==a&&(this.tool.current=null);goog.style.showElement(a.toolBox,!1)};
bay.whiteboard.Whiteboard.prototype.showToolBox=function(a){var b=goog.style.getPageOffset(a.button.getElement()),c=goog.style.getSize(a.button.getElement());b.x+=c.width;goog.style.setPosition(a.toolBox,b);goog.style.showElement(a.toolBox,!0)};bay.whiteboard.Whiteboard.prototype.toggleCoordinate=function(a){this.area.showCoordinates="undefined"!=typeof a?a:!this.area.showCoordinates;this.redrawAll()};
bay.whiteboard.Whiteboard.prototype.showInfoDialog=function(a){var b=this.getHoverDist(),b=this.collections.main.getNeighbourList(this.getConvertEventPos(a),b,!0,!0);0<b.length?this.showInfo(a.clientX,a.clientY,b,0):this.elements.infoDialog&&(this.elements.infoDialog.dispose(),this.elements.infoDialog=null);a.preventDefault()};
bay.whiteboard.Whiteboard.prototype.showInfo=function(a,b,c,f){this.elements.infoDialog&&(this.elements.infoDialog.dispose(),this.elements.infoDialog=null);var g=new goog.ui.Component;g.render(document.body);goog.dom.classes.add(g.getElement(),"bwb_infoDialog");this.elements.infoDialog=g;goog.style.setPosition(g.getElement(),a,b);if(1<c.length){var h=new goog.ui.Button("<");g.addChild(h,!0);h.setTooltip(goog.getMsg("Click to select other element"));goog.events.listen(h,goog.ui.Component.EventType.ACTION,
function(){this.showInfo(a,b,c,f-1)},null,this);goog.dom.classes.add(h.getElement(),"bwb_navigate bwb_left");h=new goog.ui.Button(">");h.setTooltip(goog.getMsg("Click to select other element"));g.addChild(h,!0);goog.events.listen(h,goog.ui.Component.EventType.ACTION,function(){this.showInfo(a,b,c,f+1)},null,this);goog.dom.classes.add(h.getElement(),"bwb_navigate bwb_right")}0>f&&(f=c.length-1);f>=c.length&&(f=0);element=c[f].element;h=new goog.ui.Control(element.toString());g.addChild(h,!0);goog.dom.classes.add(h.getElement(),
"bwb_objDesc");if(!element.noLabel){var k=new goog.ui.BidiInput;g.addChild(k,!0);k.setValue(element.label);goog.events.listen(k.getElement(),goog.ui.Component.EventType.BLUR,function(){element.setLabel(k.getValue())},null,this);goog.dom.classes.add(k.getElement(),"bwb_labelInput")}h=new goog.ui.Button(goog.getMsg("Hide"));h.setTooltip(goog.getMsg("Click to hide element"));g.addChild(h,!0);goog.dom.classes.add(h.getElement(),"bwb_hideButton");goog.events.listen(h,goog.ui.Component.EventType.ACTION,
function(a){element.hide();this.redrawAll();this.elements.infoDialog.dispose();this.elements.infoDialog=null},null,this);var l=new goog.ui.Checkbox(element.trace);g.addChild(l,!0);h=new goog.ui.Control(goog.getMsg("Trace"));g.addChild(h,!0);goog.dom.classes.add(h.getElement(),"bwb_traceCheck");goog.dom.classes.add(l.getElement(),"bwb_traceCheck");goog.events.listen(l,goog.ui.Component.EventType.CHANGE,function(a){element.setTrace(l.isChecked());this.redrawAll()},null,this);var m=new goog.ui.ColorMenuButton(goog.getMsg("Color"));
m.setTooltip(goog.getMsg("Click to select color"));element.color?m.setSelectedColor(element.color):m.setSelectedColor("#000000");g.addChild(m,!0);goog.dom.classes.add(m.getElement(),"bwb_colorButton");goog.events.listen(m,goog.ui.Component.EventType.ACTION,function(a){element.setColor(m.getSelectedColor());this.redrawAll()},null,this);goog.style.showElement(g.getElement(),!0)};
bay.whiteboard.Whiteboard.prototype.drawCoordinates=function(){var a=new goog.graphics.Stroke(this.properties.axes.width,this.properties.axes.color),b=new goog.graphics.Font(this.properties.axes.fontsize,this.properties.axes.font),c=new goog.graphics.SolidFill(this.properties.axes.color),f=this.transform([this.area.minX,0,this.area.maxX,0,0,this.area.minY,0,this.area.maxY]),g=new goog.graphics.Path;g.moveTo(f[0],f[1]);g.lineTo(f[2],f[3]);this.graphics.drawPath(g,a,null);g=new goog.graphics.Path;g.moveTo(f[4],
f[5]);g.lineTo(f[6],f[7]);this.graphics.drawPath(g,a,null);g=100/this.area.transformation.getScaleX();f=1;if(1>g)for(;1>g*f;)f*=10;else for(;10<g*f;)f/=10;for(var g=Math.round(g*f)/f,h=this.area.minX,h=Math.floor(h/g)*g;h<this.area.maxX;){var f=this.transform([h,-g/10,h,g/10,h,0]),k=new goog.graphics.Path;k.moveTo(f[0],f[1]);k.lineTo(f[2],f[3]);this.graphics.drawPath(k,a,null);this.graphics.drawText(Math.round(1E4*h)/1E4,f[4],f[5],null,null,"left",null,b,a,c);h+=g}h=this.area.minY;for(h=Math.floor(h/
g)*g;h<this.area.maxY;)f=this.transform([-g/10,h,g/10,h,0,h]),k=new goog.graphics.Path,k.moveTo(f[0],f[1]),k.lineTo(f[2],f[3]),this.graphics.drawPath(k,a,null),this.graphics.drawText(Math.round(1E4*h)/1E4,f[4],f[5],null,null,"left",null,b,a,c),h+=g};
bay.whiteboard.Whiteboard.prototype.setBackground=function(a){var b=this;this.background||(this.background={});if(this.background.url=a){var c=new Image;c.onload=function(){var a=this.width,c=this.height,h=b.area.maxX-b.area.minX,k=b.area.maxY-b.area.minY,l=h/a,m=k/c;b.background.imageWidth=a*Math.min(l,m);b.background.imageHeight=c*Math.min(l,m);b.background.imageLeft=b.area.minX+(h-b.background.imageWidth)/2;b.background.imageTop=b.area.maxY-(k-b.background.imageHeight)/2;if(b.onBackground)b.onBackground();
b.drawBackground()};c.src=a}else{this.background={};if(b.onBackground)b.onBackground();b.drawBackground()}};
bay.whiteboard.Whiteboard.prototype.drawBackground=function(){if(this.background&&this.background.url){var a=Math.round(this.background.imageWidth*this.area.transformation.getScaleX()),b=Math.round(-this.background.imageHeight*this.area.transformation.getScaleY()),c=this.transform([this.background.imageLeft,this.background.imageTop]),f=Math.round(c[0]),c=Math.round(c[1]);goog.style.setStyle(this.elements.drawElement,{"background-image":"url("+this.background.url+")","background-repeat":"no-repeat",
"background-position":f+"px "+c+"px","background-size":a+"px "+b+"px"})}else goog.style.setStyle(this.elements.drawElement,{"background-image":""})};bay.whiteboard.Whiteboard.prototype.backgroundJson=function(){return this.background?'{"type": "Background", "url": "'+this.background.url+'", "width": '+this.background.imageWidth+', "height": '+this.background.imageHeight+', "left": '+this.background.imageLeft+', "top": '+this.background.imageTop+"}":""};
bay.whiteboard.Whiteboard.prototype.acceptBackground=function(a){a=eval("("+a+")");"Background"==a.type&&(this.background||(this.background={}),this.background.url=a.url,this.background.imageWidth=a.width,this.background.imageHeight=a.height,this.background.imageLeft=a.left,this.background.imageTop=a.top,this.drawBackground())};bay.whiteboard.Whiteboard.addGroup("tools",99,goog.getMsg("Common tools"));bay.whiteboard.Whiteboard.addTool("zoom-in","tools",{action:function(a,b){a.zoomIn()}},1,goog.getMsg("Zoom in"));
bay.whiteboard.Whiteboard.addTool("zoom-out","tools",{action:function(a,b){a.zoomOut()}},2,goog.getMsg("Zoom out"));bay.whiteboard.Whiteboard.addTool("coordinates","tools",{action:function(a,b){a.toggleCoordinate()}},3,goog.getMsg("Show coordinates"));bay.whiteboard.Whiteboard.addTool("eraseAll","tools",{action:function(a,b){a.collections.main.clear();a.collections.tracer.clear();a.redrawAll()}},4,goog.getMsg("Clear all"));
bay.whiteboard.Whiteboard.addTool("eraseTrace","tools",{action:function(a,b){a.collections.tracer.clear();a.redrawAll()}},5,goog.getMsg("Clear traces"));
bay.whiteboard.Whiteboard.addTool("info",null,{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_infoCursor")},toggleOff:function(a){goog.dom.classes.remove(a.elements.drawElement,"bwb_infoCursor");a.elements.infoDialog&&(a.elements.infoDialog.dispose(),a.elements.infoDialog=null)},onClick:function(a,b){a.showInfoDialog(b)}},10,goog.getMsg("Show information about selected element"));bay.whiteboard.geometry={};bay.whiteboard.Whiteboard.addGroup("geometry",10,goog.getMsg("Ruler-and-compass constructions"));bay.whiteboard.geometry.PointAtLine=function(a,b){bay.whiteboard.Point.call(this);this.obj=a;a.dependant.push(this);this.param=b;this.recalc()};goog.inherits(bay.whiteboard.geometry.PointAtLine,bay.whiteboard.Point);bay.whiteboard.geometry.PointAtLine.prototype.deleteElement=function(){this.obj.deleteDependant(this)};
bay.whiteboard.geometry.PointAtLine.prototype.moveTo=function(a,b){this.obj&&(this.param=this.obj.closestPoint(a,b).param);this.recalc();this.onChange()};bay.whiteboard.geometry.PointAtLine.prototype.acceptData=function(a){bay.whiteboard.geometry.PointAtLine.superClass_.acceptData.call(this,a);this.obj&&(this.param=a.t);this.recalc()};
bay.whiteboard.geometry.PointAtLine.prototype.recalc=function(){!this.obj||!this.obj.exists||null==this.param?this.exists=!1:(this.exists=!0,this.x=this.obj.startPoint.x+this.obj.direction.x*this.param,this.y=this.obj.startPoint.y+this.obj.direction.y*this.param);this.recalcDependant()};bay.whiteboard.geometry.PointAtLine.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PointAtLine", "obj": '+a.indexOf(this.obj)+', "t": '+this.param+"}"};
bay.whiteboard.geometry.PointAtLine.fromJson=function(a,b){var c=new bay.whiteboard.geometry.PointAtLine(b[a.obj],a.t);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PointAtLine",bay.whiteboard.geometry.PointAtLine.fromJson);bay.whiteboard.geometry.PointAtCircle=function(a,b){bay.whiteboard.Point.call(this);this.obj=a;a.dependant.push(this);this.direction=b;this.recalc()};goog.inherits(bay.whiteboard.geometry.PointAtCircle,bay.whiteboard.Point);
bay.whiteboard.geometry.PointAtLine.prototype.deleteElement=function(){this.obj.deleteDependant(this)};bay.whiteboard.geometry.PointAtCircle.prototype.moveTo=function(a,b){this.obj&&(this.direction=this.obj.closestPoint(a,b).direction);this.recalc();this.onChange()};bay.whiteboard.geometry.PointAtCircle.prototype.acceptData=function(a){bay.whiteboard.geometry.PointAtCircle.superClass_.acceptData.call(this,a);this.obj&&(this.direction=new bay.whiteboard.Vector(a.x,a.y));this.recalc()};
bay.whiteboard.geometry.PointAtCircle.prototype.recalc=function(){!this.obj||!this.obj.exists||!this.direction?this.exists=!1:(d=Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y),0!=d?(this.exists=!0,this.x=this.obj.centerPoint.x+this.obj.radius*this.direction.x/d,this.y=this.obj.centerPoint.y+this.obj.radius*this.direction.y/d):this.exists=!1);this.recalcDependant()};
bay.whiteboard.geometry.PointAtCircle.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PointAtCircle", "obj": '+a.indexOf(this.obj)+', "x": '+this.direction.x+', "y": '+this.direction.y+"}"};bay.whiteboard.geometry.PointAtCircle.fromJson=function(a,b){var c=new bay.whiteboard.geometry.PointAtCircle(b[a.obj],new bay.whiteboard.Vector(a.x,a.y));c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PointAtCircle",bay.whiteboard.geometry.PointAtCircle.fromJson);
bay.whiteboard.geometry.Point_2l=function(a,b){bay.whiteboard.Point.call(this);this.obj1=a;this.obj2=b;a.dependant.push(this);b.dependant.push(this);this.recalc()};goog.inherits(bay.whiteboard.geometry.Point_2l,bay.whiteboard.Point);bay.whiteboard.geometry.Point_2l.prototype.deleteElement=function(){this.obj1.deleteDependant(this);this.obj2.deleteDependant(this)};
bay.whiteboard.geometry.Point_2l.prototype.recalc=function(){if(!this.obj1||!this.obj2||!this.obj1.exists||!this.obj2.exists)this.exists=!1;else{var a=this.obj1.direction.x,b=this.obj1.direction.y,c=this.obj2.direction.x,f=this.obj2.direction.y,g=c*b-f*a;0==g?this.exists=!1:(this.exists=!0,a=(b*(this.obj1.startPoint.x-this.obj2.startPoint.x)-a*(this.obj1.startPoint.y-this.obj2.startPoint.y))/g,this.x=this.obj2.startPoint.x+c*a,this.y=this.obj2.startPoint.y+f*a)}this.recalcDependant()};
bay.whiteboard.geometry.Point_2l.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "Point_2l", "obj1": '+a.indexOf(this.obj1)+', "obj2": '+a.indexOf(this.obj2)+"}"};bay.whiteboard.geometry.Point_2l.fromJson=function(a,b){var c=new bay.whiteboard.geometry.Point_2l(b[a.obj1],b[a.obj2]);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("Point_2l",bay.whiteboard.geometry.Point_2l.fromJson);
bay.whiteboard.geometry.Point_2c=function(a,b,c){bay.whiteboard.Point.call(this);this.obj1=a;this.obj2=b;a.dependant.push(this);b.dependant.push(this);this.intersectNum=c;this.recalc()};goog.inherits(bay.whiteboard.geometry.Point_2c,bay.whiteboard.Point);bay.whiteboard.geometry.Point_2c.prototype.deleteElement=function(){this.obj1.deleteDependant(this);this.obj2.deleteDependant(this)};
bay.whiteboard.geometry.Point_2c.prototype.recalc=function(){if(!this.obj1||!this.obj2||!this.obj1.exists||!this.obj2.exists)this.exists=!1;else{var a=this.obj1.radius,b=this.obj2.radius,c=this.obj2.centerPoint.x-this.obj1.centerPoint.x,f=this.obj2.centerPoint.y-this.obj1.centerPoint.y,g=c*c+f*f,c=Math.sqrt(c*c+f*f);c>a+b||c<b-a||c<a-b||0==c?this.exists=!1:(b=(a*a-b*b+g)/(2*c),a=Math.sqrt(a*a-b*b),g=this.obj1.centerPoint.x+b*(this.obj2.centerPoint.x-this.obj1.centerPoint.x)/c,b=this.obj1.centerPoint.y+
b*(this.obj2.centerPoint.y-this.obj1.centerPoint.y)/c,this.exists=!0,1==this.intersectNum?(this.x=g+a*(this.obj2.centerPoint.y-this.obj1.centerPoint.y)/c,this.y=b-a*(this.obj2.centerPoint.x-this.obj1.centerPoint.x)/c):(this.x=g-a*(this.obj2.centerPoint.y-this.obj1.centerPoint.y)/c,this.y=b+a*(this.obj2.centerPoint.x-this.obj1.centerPoint.x)/c))}this.recalcDependant()};
bay.whiteboard.geometry.Point_2c.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "Point_2c", "obj1": '+a.indexOf(this.obj1)+', "obj2": '+a.indexOf(this.obj2)+', "num": '+this.intersectNum+"}"};bay.whiteboard.geometry.Point_2c.fromJson=function(a,b){var c=new bay.whiteboard.geometry.Point_2c(b[a.obj1],b[a.obj2],a.num);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("Point_2c",bay.whiteboard.geometry.Point_2c.fromJson);
bay.whiteboard.geometry.Point_lc=function(a,b,c){bay.whiteboard.Point.call(this);this.obj1=a;this.obj2=b;a.dependant.push(this);b.dependant.push(this);this.intersectNum=c;this.recalc()};goog.inherits(bay.whiteboard.geometry.Point_lc,bay.whiteboard.Point);bay.whiteboard.geometry.Point_lc.prototype.deleteElement=function(){this.obj1.deleteDependant(this);this.obj2.deleteDependant(this)};
bay.whiteboard.geometry.Point_lc.prototype.recalc=function(){if(!this.obj1||!this.obj2||!this.obj1.exists||!this.obj2.exists)this.exists=!1;else if(this.obj1.distanceTo(this.obj2.centerPoint)>this.obj2.radius)this.exists=!1;else{var a=this.obj1.direction.x*this.obj1.direction.x+this.obj1.direction.y*this.obj1.direction.y,b=2*this.obj1.direction.x*(this.obj1.startPoint.x-this.obj2.centerPoint.x)+2*this.obj1.direction.y*(this.obj1.startPoint.y-this.obj2.centerPoint.y),c=Math.sqrt(b*b-4*a*((this.obj1.startPoint.x-
this.obj2.centerPoint.x)*(this.obj1.startPoint.x-this.obj2.centerPoint.x)+(this.obj1.startPoint.y-this.obj2.centerPoint.y)*(this.obj1.startPoint.y-this.obj2.centerPoint.y)-this.obj2.radius*this.obj2.radius));this.exists=!0;a=1==this.intersectNum?(-b+c)/(2*a):(-b-c)/(2*a);this.x=this.obj1.startPoint.x+a*this.obj1.direction.x;this.y=this.obj1.startPoint.y+a*this.obj1.direction.y}this.recalcDependant()};
bay.whiteboard.geometry.Point_lc.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "Point_lc", "obj1": '+a.indexOf(this.obj1)+', "obj2": '+a.indexOf(this.obj2)+', "num": '+this.intersectNum+"}"};bay.whiteboard.geometry.Point_lc.fromJson=function(a,b){var c=new bay.whiteboard.geometry.Point_lc(b[a.obj1],b[a.obj2],a.num);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("Point_lc",bay.whiteboard.geometry.Point_lc.fromJson);
bay.whiteboard.Whiteboard.addTool("point","geometry",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_pointCursor");a.tool.current.point={}},toggleOff:function(a){a.clearCurrentTool("bwb_pointCursor","point")},onClick:function(a,b){a.pointAtEventPosition(b);a.tool.current.toggleOff(a);a.redrawAll()}},1,goog.getMsg("Single point"));bay.whiteboard.geometry.Line=function(){bay.whiteboard.Element.call(this);this.direction=this.startPoint=null;this.noLabel=!0};
goog.inherits(bay.whiteboard.geometry.Line,bay.whiteboard.Element);bay.whiteboard.geometry.Line.prototype.toString=function(){return!this.exists?goog.getMsg("Line does not exist"):goog.getMsg("Line [{$fromx},{$fromy}] - [{$tox},{$toy}]",{fromx:this.startPoint.x.toFixed(2),fromy:this.startPoint.y.toFixed(2),tox:(this.startPoint.x+this.direction.x).toFixed(2),toy:(this.startPoint.y+this.direction.y).toFixed(2)})};
bay.whiteboard.geometry.Line.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b);return Math.abs(this.direction.x*(c.y-this.startPoint.y)-this.direction.y*(c.x-this.startPoint.x))/Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y)};
bay.whiteboard.geometry.Line.prototype.closestPoint=function(a,b){var c=new bay.whiteboard.Vector(a,b);return new bay.whiteboard.geometry.PointAtLine(this,(this.direction.x*(c.x-this.startPoint.x)+this.direction.y*(c.y-this.startPoint.y))/(this.direction.x*this.direction.x+this.direction.y*this.direction.y))};
bay.whiteboard.geometry.Line.prototype.getMinAndMaxParamValue=function(a){var b=-Number.MAX_VALUE,c=Number.MAX_VALUE;if(0!=this.direction.x&&(b=(a.minX-this.startPoint.x)/this.direction.x,c=(a.maxX-this.startPoint.x)/this.direction.x,b>c))var f=c,c=b,b=f;var g=-Number.MAX_VALUE,h=Number.MAX_VALUE;0!=this.direction.y&&(g=(a.minY-this.startPoint.y)/this.direction.y,h=(a.maxY-this.startPoint.y)/this.direction.y,g>h&&(f=h,h=g,g=f));return b<h&&c>g?(a=g,b>g&&(a=b),b=h,c<h&&(b=c),{min:a,max:b}):null};
bay.whiteboard.geometry.Line.prototype.draw=function(a){if(this.exists){var b=this.getMinAndMaxParamValue(a.area);if(b){var c=a.transform([this.startPoint.x+b.min*this.direction.x,this.startPoint.y+b.min*this.direction.y,this.startPoint.x+b.max*this.direction.x,this.startPoint.y+b.max*this.direction.y]),b=new goog.graphics.Path;b.moveTo(c[0],c[1]);b.lineTo(c[2],c[3]);this.current?c=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color):(this.hover&&(c=new goog.graphics.Stroke(a.properties.hover.width,
a.properties.hover.color),a.graphics.drawPath(b,c,null)),c=a.properties.line.color,this.color&&(c=this.color),c=new goog.graphics.Stroke(a.properties.line.width,c));a.graphics.drawPath(b,c,null)}}};bay.whiteboard.geometry.Line.prototype.getTrace=function(){var a=new bay.whiteboard.geometry.Line;a.startPoint=new bay.whiteboard.PointFree(this.startPoint);a.direction=new bay.whiteboard.Vector(this.direction);return a};bay.whiteboard.Whiteboard.properties.line={width:1,color:"Black"};
bay.whiteboard.geometry.LineGeneral=function(a,b,c){bay.whiteboard.geometry.Line.call(this);this.a=a;this.b=b;this.c=c;this.recalc()};goog.inherits(bay.whiteboard.geometry.LineGeneral,bay.whiteboard.geometry.Line);
bay.whiteboard.geometry.LineGeneral.prototype.recalc=function(){null!=this.a&&null!=this.b&&null!=this.c?0==this.a&&0==this.b?this.exists=!1:(this.exists=!0,0==this.a?(this.startPoint=new bay.whiteboard.PointFree(0,this.c/this.b),this.direction=new bay.whiteboard.Vector(1,0)):0==this.b?(this.startPoint=new bay.whiteboard.PointFree(this.c/this.a,0),this.direction=new bay.whiteboard.Vector(0,1)):(this.startPoint=new bay.whiteboard.PointFree(0,this.c/this.b),this.direction=new bay.whiteboard.Vector(1/
this.a,-1/this.b))):this.exists=!1;this.recalcDependant()};bay.whiteboard.geometry.LineGeneral.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "LineGeneral", "a": '+this.a+', "b": '+this.b+', "c": '+this.c+"}"};bay.whiteboard.geometry.LineGeneral.fromJson=function(a,b){var c=new bay.whiteboard.geometry.LineGeneral(a.a,a.b,a.c);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("LineGeneral",bay.whiteboard.geometry.LineGeneral.fromJson);
bay.whiteboard.geometry.Line_2p=function(a,b){bay.whiteboard.geometry.Line.call(this);this.startPoint=a;this.endPoint=b;a.dependant.push(this);b.dependant.push(this);this.recalc()};goog.inherits(bay.whiteboard.geometry.Line_2p,bay.whiteboard.geometry.Line);bay.whiteboard.geometry.Line_2p.prototype.deleteElement=function(){this.startPoint.deleteDependant(this);this.endPoint.deleteDependant(this)};
bay.whiteboard.geometry.Line_2p.prototype.recalc=function(){!this.startPoint||!this.endPoint||!this.startPoint.exists||!this.endPoint.exists?this.exists=!1:(this.exists=!0,this.direction=new bay.whiteboard.Vector(this.endPoint.x-this.startPoint.x,this.endPoint.y-this.startPoint.y));this.recalcDependant()};
bay.whiteboard.Whiteboard.addTool("ruler","geometry",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_rulerCursor");a.tool.current.ruler={}},toggleOff:function(a){a.clearCurrentTool("bwb_rulerCursor","ruler")},onMove:function(a,b){a.tool.current.ruler.endTmp&&a.tool.current.ruler.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.ruler.start?(a.collections.main.add(new bay.whiteboard.geometry.Line_2p(a.tool.current.ruler.start,
c)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.ruler.start=c,a.collections.current.add(a.tool.current.ruler.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.ruler.endTmp.hide(),c=new bay.whiteboard.geometry.Line_2p(a.tool.current.ruler.start,a.tool.current.ruler.endTmp),c.current=!0,a.collections.current.add(c));a.redrawAll()}},2,goog.getMsg("Line through two points"));
bay.whiteboard.geometry.Line_2p.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "Line_2p", "p1": '+a.indexOf(this.startPoint)+', "p2": '+a.indexOf(this.endPoint)+"}"};bay.whiteboard.geometry.Line_2p.fromJson=function(a,b){var c=new bay.whiteboard.geometry.Line_2p(b[a.p1],b[a.p2]);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("Line_2p",bay.whiteboard.geometry.Line_2p.fromJson);
bay.whiteboard.geometry.Segment=function(a,b){bay.whiteboard.geometry.Line_2p.call(this,a,b)};goog.inherits(bay.whiteboard.geometry.Segment,bay.whiteboard.geometry.Line_2p);bay.whiteboard.geometry.Segment.prototype.length=function(){return Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y)};
bay.whiteboard.geometry.Segment.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b),f=this.startPoint.y-c.y,g=this.endPoint.y-c.y;0!=this.direction.x&&(f=this.startPoint.x-c.x+this.direction.y*(this.startPoint.y-c.y)/this.direction.x,g=this.endPoint.x-c.x+this.direction.y*(this.endPoint.y-c.y)/this.direction.x);if(0>=f*g)return Math.abs(this.direction.x*(c.y-this.startPoint.y)-this.direction.y*(c.x-this.startPoint.x))/Math.sqrt(this.direction.x*this.direction.x+this.direction.y*
this.direction.y);f=this.startPoint.distance(c.x,c.y);g=this.endPoint.distance(c.x,c.y);return f<g?f:g};
bay.whiteboard.geometry.Segment.prototype.draw=function(a){if(this.exists){var b=this.getMinAndMaxParamValue(a.area);if(b&&0<b.max&&1>b.min){0>b.min&&(b.min=0);1<b.max&&(b.max=1);var c=a.transform([this.startPoint.x+b.min*this.direction.x,this.startPoint.y+b.min*this.direction.y,this.startPoint.x+b.max*this.direction.x,this.startPoint.y+b.max*this.direction.y]),b=new goog.graphics.Path;b.moveTo(c[0],c[1]);b.lineTo(c[2],c[3]);this.current?c=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color):
(this.hover&&(c=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),a.graphics.drawPath(b,c,null)),c=a.properties.line.color,this.color&&(c=this.color),c=new goog.graphics.Stroke(a.properties.line.width,c));a.graphics.drawPath(b,c,null)}}};bay.whiteboard.geometry.Segment.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "Segment", "p1": '+a.indexOf(this.startPoint)+', "p2": '+a.indexOf(this.endPoint)+"}"};
bay.whiteboard.geometry.Segment.fromJson=function(a,b){var c=new bay.whiteboard.geometry.Segment(b[a.p1],b[a.p2]);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("Segment",bay.whiteboard.geometry.Segment.fromJson);bay.whiteboard.geometry.Segment.prototype.getTrace=function(){return new bay.whiteboard.geometry.Segment(new bay.whiteboard.PointFree(this.startPoint),new bay.whiteboard.PointFree(this.endPoint))};
bay.whiteboard.Whiteboard.addTool("segment","geometry",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_rulerCursor");a.tool.current.ruler={}},toggleOff:function(a){a.clearCurrentTool("bwb_rulerCursor","ruler")},onMove:function(a,b){a.tool.current.ruler.endTmp&&a.tool.current.ruler.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.ruler.start?(a.collections.main.add(new bay.whiteboard.geometry.Segment(a.tool.current.ruler.start,
c)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.ruler.start=c,a.collections.current.add(a.tool.current.ruler.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.ruler.endTmp.hide(),c=new bay.whiteboard.geometry.Segment(a.tool.current.ruler.start,a.tool.current.ruler.endTmp),c.current=!0,a.collections.current.add(c));a.redrawAll()}},3,goog.getMsg("Line segment connecting two points"));
bay.whiteboard.geometry.Circle=function(){bay.whiteboard.Element.call(this);this.radius=this.centerPoint=null;this.noLabel=!0};goog.inherits(bay.whiteboard.geometry.Circle,bay.whiteboard.Element);bay.whiteboard.geometry.Circle.prototype.toString=function(){return!this.exists?goog.getMsg("Circle does not exist"):goog.getMsg("Circle [{$x},{$y}] -> {$r}",{x:this.centerPoint.x.toFixed(2),y:this.centerPoint.y.toFixed(2),r:this.radius.toFixed(2)})};
bay.whiteboard.geometry.Circle.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b);return Math.abs(this.centerPoint.distance(c.x,c.y)-this.radius)};bay.whiteboard.geometry.Circle.prototype.closestPoint=function(a,b){var c=new bay.whiteboard.Vector(a,b),c=new bay.whiteboard.Vector(c.x-this.centerPoint.x,c.y-this.centerPoint.y);return new bay.whiteboard.geometry.PointAtCircle(this,c)};
bay.whiteboard.geometry.Circle.prototype.draw=function(a){if(this.exists&&this.centerPoint.x>=a.area.minX-this.radius&&this.centerPoint.x<=a.area.maxX+this.radius&&this.centerPoint.y>=a.area.minY-this.radius&&this.centerPoint.y<=a.area.maxY+this.radius){var b=a.transform([this.centerPoint.x,this.centerPoint.y]);if(this.current)var c=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color);else this.hover&&(c=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),
a.graphics.drawCircle(b[0],b[1],this.radius*a.area.transformation.getScaleX(),c,null)),c=a.properties.circle.color,this.color&&(c=this.color),c=new goog.graphics.Stroke(a.properties.circle.width,c);a.graphics.drawCircle(b[0],b[1],this.radius*a.area.transformation.getScaleX(),c,null)}};bay.whiteboard.geometry.Circle.prototype.getTrace=function(){var a=new bay.whiteboard.geometry.Circle;a.centerPoint=new bay.whiteboard.PointFree(this.centerPoint);a.radius=this.radius;return a};
bay.whiteboard.Whiteboard.properties.circle={width:1,color:"Black"};bay.whiteboard.geometry.CircleGeneral=function(a,b,c){bay.whiteboard.geometry.Circle.call(this);this.a=a;this.b=b;this.c=c;this.recalc()};goog.inherits(bay.whiteboard.geometry.CircleGeneral,bay.whiteboard.geometry.Circle);
bay.whiteboard.geometry.CircleGeneral.prototype.recalc=function(){null!=this.a&&null!=this.b&&null!=this.c?(this.exists=!0,this.centerPoint=new bay.whiteboard.PointFree(this.a,this.b),this.radius=Math.abs(this.c)):this.exists=!1;this.recalcDependant()};bay.whiteboard.geometry.CircleGeneral.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "CircleGeneral", "a": '+this.a+', "b": '+this.b+', "c": '+this.c+"}"};
bay.whiteboard.geometry.CircleGeneral.fromJson=function(a,b){var c=new bay.whiteboard.geometry.CircleGeneral(a.a,a.b,a.c);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("CircleGeneral",bay.whiteboard.geometry.CircleGeneral.fromJson);bay.whiteboard.geometry.Circle_3p=function(a,b,c){bay.whiteboard.geometry.Circle.call(this);this.centerPoint=a;this.startPoint=b;this.endPoint=c;a.dependant.push(this);b.dependant.push(this);c.dependant.push(this);this.recalc()};
goog.inherits(bay.whiteboard.geometry.Circle_3p,bay.whiteboard.geometry.Circle);bay.whiteboard.geometry.Circle_3p.prototype.deleteElement=function(){this.centerPoint.deleteDependant(this);this.startPoint.deleteDependant(this);this.endPoint.deleteDependant(this)};
bay.whiteboard.geometry.Circle_3p.prototype.recalc=function(){!this.centerPoint||!this.startPoint||!this.endPoint||!this.centerPoint.exists||!this.startPoint.exists||!this.endPoint.exists?this.exists=!1:(this.exists=!0,this.radius=this.startPoint.distanceTo(this.endPoint));this.recalcDependant()};
bay.whiteboard.geometry.Circle_3p.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "Circle_3p", "p1": '+a.indexOf(this.centerPoint)+', "p2": '+a.indexOf(this.startPoint)+', "p3": '+a.indexOf(this.endPoint)+"}"};bay.whiteboard.geometry.Circle_3p.fromJson=function(a,b){var c=new bay.whiteboard.geometry.Circle_3p(b[a.p1],b[a.p2],b[a.p3]);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("Circle_3p",bay.whiteboard.geometry.Circle_3p.fromJson);
bay.whiteboard.Whiteboard.addTool("compass","geometry",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_compassCursor");a.tool.current.compass={}},toggleOff:function(a){a.clearCurrentTool("bwb_compassCursor","compass")},onMove:function(a,b){a.tool.current.compass.centerTmp?a.tool.current.compass.centerTmp.moveTo(a.getConvertEventPos(b)):a.tool.current.compass.endTmp&&a.tool.current.compass.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);
a.tool.current.compass.end?(a.collections.main.add(new bay.whiteboard.geometry.Circle_3p(c,a.tool.current.compass.start,a.tool.current.compass.end)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.tool.current.compass.start?(a.collections.current.clear(),a.tool.current.compass.end=c,a.collections.current.add(a.tool.current.compass.centerTmp=new bay.whiteboard.PointFree(c)),a.tool.current.compass.centerTmp.hide(),c=new bay.whiteboard.geometry.Circle_3p(a.tool.current.compass.centerTmp,
a.tool.current.compass.start,a.tool.current.compass.end)):(a.collections.current.clear(),a.tool.current.compass.start=c,a.collections.current.add(a.tool.current.compass.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.compass.endTmp.hide(),c=new bay.whiteboard.geometry.Segment(a.tool.current.compass.start,a.tool.current.compass.endTmp)),c.current=!0,a.collections.current.add(c));a.redrawAll()}},4,goog.getMsg("Circle with radius equals to the given segment"));
bay.whiteboard.Whiteboard.addTool("circle","geometry",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_compassCursor");a.tool.current.compass={}},toggleOff:function(a){a.clearCurrentTool("bwb_compassCursor","compass")},onMove:function(a,b){a.tool.current.compass.endTmp&&a.tool.current.compass.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.compass.start?(a.collections.main.add(new bay.whiteboard.geometry.Circle_3p(a.tool.current.compass.start,
a.tool.current.compass.start,c)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.compass.start=c,a.collections.current.add(a.tool.current.compass.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.compass.endTmp.hide(),c=new bay.whiteboard.geometry.Circle_3p(a.tool.current.compass.start,a.tool.current.compass.start,a.tool.current.compass.endTmp),c.current=!0,a.collections.current.add(c));a.redrawAll()}},5,goog.getMsg("Circle with given center"));
bay.whiteboard.geometry.getIntersection=function(a,b,c,f){if(a instanceof bay.whiteboard.geometry.Line&&b instanceof bay.whiteboard.geometry.Line)return new bay.whiteboard.geometry.Point_2l(a,b);if(a instanceof bay.whiteboard.geometry.Circle&&b instanceof bay.whiteboard.geometry.Circle){var g=new bay.whiteboard.geometry.Point_2c(a,b,0);a=new bay.whiteboard.geometry.Point_2c(a,b,1);return g.distance(c,f)<a.distance(c,f)?g:a}if(a instanceof bay.whiteboard.geometry.Circle&&b instanceof bay.whiteboard.geometry.Line)return g=
new bay.whiteboard.geometry.Point_lc(b,a,0),a=new bay.whiteboard.geometry.Point_lc(b,a,1),g.distance(c,f)<a.distance(c,f)?g:a;if(a instanceof bay.whiteboard.geometry.Line&&b instanceof bay.whiteboard.geometry.Circle)return g=new bay.whiteboard.geometry.Point_lc(a,b,0),a=new bay.whiteboard.geometry.Point_lc(a,b,1),g.distance(c,f)<a.distance(c,f)?g:a};bay.whiteboard.pencil={};bay.whiteboard.Whiteboard.addGroup("pencil",5,goog.getMsg("Free hand drawing"));bay.whiteboard.pencil.Curve=function(a){bay.whiteboard.Element.call(this);this.startPoint=a;a.dependant.push(this);this.points=[];this.lastSavedPoint=0;this.pos={left:a.x,right:a.x,top:a.y,bottom:a.y};this.exists=!0};goog.inherits(bay.whiteboard.pencil.Curve,bay.whiteboard.Element);bay.whiteboard.pencil.Curve.prototype.deleteElement=function(){this.startPoint.deleteDependant(this)};
bay.whiteboard.pencil.Curve.prototype.addPoint=function(a){this.points.push(new bay.whiteboard.Vector(a.x-this.startPoint.x,a.y-this.startPoint.y));a.x<this.pos.left&&(this.pos.left=a.x);a.x>this.pos.right&&(this.pos.right=a.x);a.y>this.pos.top&&(this.pos.top=a.y);a.y<this.pos.bottom&&(this.pos.bottom=a.y);this.onChange()};bay.whiteboard.pencil.Curve.prototype.toString=function(){return!this.exists?goog.getMsg("Curve does not exists"):goog.getMsg("Curve")};
bay.whiteboard.pencil.Curve.prototype.distance=function(a,b){for(var c=new bay.whiteboard.Vector(a,b),f=this.startPoint.distance(c),c=new bay.whiteboard.Vector(c.x-this.startPoint.x,c.y-this.startPoint.y),g=0;g<this.points.length;g++){var h=this.points[g].distance(c);h<f&&(f=h)}return f};
bay.whiteboard.pencil.Curve.prototype.recalc=function(){if(null!=this.startPoint&&this.startPoint.exists){this.exists=!0;this.pos={left:this.startPoint.x,right:this.startPoint.x,top:this.startPoint.y,bottom:this.startPoint.y};for(var a=0;a<this.points.length;a++){var b=this.points[a];b.x<this.pos.left&&(this.pos.left=b.x);b.x>this.pos.right&&(this.pos.right=b.x);b.y>this.pos.top&&(this.pos.top=b.y);b.y<this.pos.bottom&&(this.pos.bottom=b.y)}}else this.exists=!1;this.recalcDependant()};
bay.whiteboard.pencil.Curve.prototype.draw=function(a){if(this.exists){var b=a.transform([this.startPoint.x,this.startPoint.y]),c=new goog.graphics.Path;c.moveTo(b[0],b[1]);for(var f=0;f<this.points.length;f++)b=a.transform([this.startPoint.x+this.points[f].x,this.startPoint.y+this.points[f].y]),c.lineTo(b[0],b[1]);this.current?b=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color):(this.hover&&(b=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),
a.graphics.drawPath(c,b,null)),b=a.properties.curve.color,this.color&&(b=this.color),b=new goog.graphics.Stroke(a.properties.curve.width,b));a.graphics.drawPath(c,b,null)}};bay.whiteboard.Whiteboard.properties.curve={width:3,color:"Gray"};
bay.whiteboard.pencil.Curve.prototype.toJson=function(a,b,c){str="{"+this.jsonHeader(b)+', "type": "PencilCurve", "p0": '+a.indexOf(this.startPoint)+', "i": '+this.lastSavedPoint;for(a=this.lastSavedPoint;a<this.points.length;a++)b=this.points[a],str+=', "x'+a+'": '+b.x+', "y'+a+'": '+b.y,this.lastSavedPoint=a;return str+"}"};
bay.whiteboard.pencil.Curve.fromJson=function(a,b){for(var c=new bay.whiteboard.pencil.Curve(b[a.p0]),f=0;"undefined"!=typeof a["x"+f];)c.points.push(new bay.whiteboard.Vector(a["x"+f],a["y"+f])),f++;c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PencilCurve",bay.whiteboard.pencil.Curve.fromJson);
bay.whiteboard.pencil.Curve.prototype.acceptData=function(a){bay.whiteboard.pencil.Curve.superClass_.acceptData.call(this,a);var b=0;a.i&&(b=a.i);for(;"undefined"!=typeof a["x"+b];)this.points[b]=new bay.whiteboard.Vector(a["x"+b],a["y"+b]),b++;this.recalc()};
bay.whiteboard.Whiteboard.addTool("curve","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_curveCursor");a.tool.current.curve={}},toggleOff:function(a){a.clearCurrentTool("bwb_curveCursor","curve")},onMove:function(a,b){if(a.tool.current.curve.start){var c=a.getConvertEventPos(b);a.tool.current.curve.start.addPoint(c)}},onClick:function(a,b){if(a.tool.current.curve.start)a.tool.current.toggleOff(a);else{var c=a.pointAtEventPosition(b),c=new bay.whiteboard.pencil.Curve(c);
a.collections.main.add(c);a.tool.current.curve.start=c}a.redrawAll()}},1,goog.getMsg("Curve"));bay.whiteboard.pencil.FreeLine=function(a,b){bay.whiteboard.geometry.Segment.call(this,a,b)};goog.inherits(bay.whiteboard.pencil.FreeLine,bay.whiteboard.geometry.Segment);
bay.whiteboard.pencil.FreeLine.prototype.draw=function(a){if(this.exists){var b=this.getMinAndMaxParamValue(a.area);if(b&&0<b.max&&1>b.min){0>b.min&&(b.min=0);1<b.max&&(b.max=1);var c=a.transform([this.startPoint.x+b.min*this.direction.x,this.startPoint.y+b.min*this.direction.y,this.startPoint.x+b.max*this.direction.x,this.startPoint.y+b.max*this.direction.y]),b=new goog.graphics.Path;b.moveTo(c[0],c[1]);b.lineTo(c[2],c[3]);this.current?c=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color):
(this.hover&&(c=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),a.graphics.drawPath(b,c,null)),c=a.properties.freeline.color,this.color&&(c=this.color),c=new goog.graphics.Stroke(a.properties.freeline.width,c));a.graphics.drawPath(b,c,null)}}};bay.whiteboard.Whiteboard.properties.freeline={width:3,color:"Gray"};
bay.whiteboard.pencil.FreeLine.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PencilFreeLine", "p1": '+a.indexOf(this.startPoint)+', "p2": '+a.indexOf(this.endPoint)+"}"};bay.whiteboard.pencil.FreeLine.fromJson=function(a,b){var c=new bay.whiteboard.pencil.FreeLine(b[a.p1],b[a.p2]);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PencilFreeLine",bay.whiteboard.pencil.FreeLine.fromJson);
bay.whiteboard.pencil.FreeLine.prototype.getTrace=function(){return new bay.whiteboard.pencil.FreeLine(new bay.whiteboard.PointFree(this.startPoint),new bay.whiteboard.PointFree(this.endPoint))};
bay.whiteboard.Whiteboard.addTool("freeline","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_pencilLineCursor");a.tool.current.ruler={}},toggleOff:function(a){a.clearCurrentTool("bwb_pencilLineCursor","ruler")},onMove:function(a,b){a.tool.current.ruler.endTmp&&a.tool.current.ruler.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.ruler.start&&a.collections.main.add(new bay.whiteboard.pencil.FreeLine(a.tool.current.ruler.start,
c));a.collections.current.clear();a.tool.current.ruler.start=c;a.collections.current.add(a.tool.current.ruler.endTmp=new bay.whiteboard.PointFree(c));a.tool.current.ruler.endTmp.hide();c=new bay.whiteboard.pencil.FreeLine(a.tool.current.ruler.start,a.tool.current.ruler.endTmp);c.current=!0;a.collections.current.add(c);a.redrawAll()}},2,goog.getMsg("Polyline"));
bay.whiteboard.pencil.Rectangle=function(a,b){bay.whiteboard.Element.call(this);this.pointOne=a;this.pointTwo=b;a.dependant.push(this);b.dependant.push(this);this.pos={left:null,right:null,top:null,bottom:null};this.noLabel=!0;this.recalc()};goog.inherits(bay.whiteboard.pencil.Rectangle,bay.whiteboard.Element);bay.whiteboard.pencil.Rectangle.prototype.deleteElement=function(){this.pointOne.deleteDependant(this);this.pointTwo.deleteDependant(this)};
bay.whiteboard.pencil.Rectangle.prototype.toString=function(){return!this.exists?goog.getMsg("Rectangle does not exist"):goog.getMsg("Rectangle")};
bay.whiteboard.pencil.Rectangle.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b),f=null;c.x<=this.pos.left?f=c.y<this.pos.bottom?Math.sqrt((c.x-this.pos.left)*(c.x-this.pos.left)+(c.y-this.pos.bottom)*(c.y-this.pos.bottom)):c.y>=this.pos.top?Math.sqrt((c.x-this.pos.left)*(c.x-this.pos.left)+(c.y-this.pos.top)*(c.y-this.pos.top)):this.pos.left-c.x:c.x>=this.pos.right?f=c.y<=this.pos.bottom?Math.sqrt((c.x-this.pos.right)*(c.x-this.pos.right)+(c.y-this.pos.bottom)*(c.y-this.pos.bottom)):
c.y>=this.pos.top?Math.sqrt((c.x-this.pos.right)*(c.x-this.pos.right)+(c.y-this.pos.top)*(c.y-this.pos.top)):c.x-this.pos.right:c.y<=this.pos.bottom?f=this.pos.bottom-c.y:c.y>=this.pos.top?f=c.y-this.pos.top:(f=this.pos.top-c.y,c.y-this.pos.bottom<f&&(f=c.y-this.pos.bottom),c.x-this.pos.left<f&&(f=c.x-this.pos.left),this.pos.right-c.x<f&&(f=this.pos.right-c.x));return f};
bay.whiteboard.pencil.Rectangle.prototype.closestPoint=function(a,b){var c=new bay.whiteboard.Vector(a,b),f=null,g=null;if(c.x<=this.pos.left)f="left",g=c.y<this.pos.bottom?0:c.y>=this.pos.top?1:(c.y-this.pos.bottom)/(this.pos.top-this.pos.bottom);else if(c.x>=this.pos.right)f="right",g=c.y<this.pos.bottom?0:c.y>=this.pos.top?1:(c.y-this.pos.bottom)/(this.pos.top-this.pos.bottom);else if(c.y<=this.pos.bottom)f="bottom",g=(c.x-this.pos.left)/(this.pos.right-this.pos.left);else if(c.y>=this.pos.top)f=
"top",g=(c.x-this.pos.left)/(this.pos.right-this.pos.left);else{var h=this.pos.top-c.y,f="top",g=(c.x-this.pos.left)/(this.pos.right-this.pos.left);c.y-this.pos.bottom<h&&(h=c.y-this.pos.bottom,f="bottom",g=(c.x-this.pos.left)/(this.pos.right-this.pos.left));c.x-this.pos.left<h&&(h=c.x-this.pos.left,f="left",g=(c.y-this.pos.bottom)/(this.pos.top-this.pos.bottom));this.pos.right-c.x<h&&(f="right",g=(c.y-this.pos.bottom)/(this.pos.top-this.pos.bottom))}return new bay.whiteboard.pencil.PointAtRect(this,
f,g)};bay.whiteboard.pencil.Rectangle.prototype.recalc=function(){null!=this.pointOne&&null!=this.pointTwo&&this.pointOne.exists&&this.pointTwo.exists?(this.exists=!0,this.pointOne.x<this.pointTwo.x?(this.pos.left=this.pointOne.x,this.pos.right=this.pointTwo.x):(this.pos.left=this.pointTwo.x,this.pos.right=this.pointOne.x),this.pointOne.y<this.pointTwo.y?(this.pos.top=this.pointTwo.y,this.pos.bottom=this.pointOne.y):(this.pos.top=this.pointOne.y,this.pos.bottom=this.pointTwo.y)):this.exists=!1;this.recalcDependant()};
bay.whiteboard.pencil.Rectangle.prototype.draw=function(a){if(this.exists){var b=a.transform([this.pos.left,this.pos.bottom,this.pos.right,this.pos.top]),c=new goog.graphics.Path;c.moveTo(b[0],b[1]);c.lineTo(b[0],b[3]);c.lineTo(b[2],b[3]);c.lineTo(b[2],b[1]);c.lineTo(b[0],b[1]);this.current?b=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color):(this.hover&&(b=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),a.graphics.drawPath(c,b,null)),b=a.properties.rectangle.color,
this.color&&(b=this.color),b=new goog.graphics.Stroke(a.properties.rectangle.width,b));a.graphics.drawPath(c,b,null)}};bay.whiteboard.Whiteboard.properties.rectangle={width:3,color:"Grey"};bay.whiteboard.pencil.Rectangle.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PencilRect", "p1": '+a.indexOf(this.pointOne)+', "p2": '+a.indexOf(this.pointTwo)+"}"};
bay.whiteboard.pencil.Rectangle.fromJson=function(a,b){var c=new bay.whiteboard.pencil.Rectangle(b[a.p1],b[a.p2]);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PencilRect",bay.whiteboard.pencil.Rectangle.fromJson);
bay.whiteboard.Whiteboard.addTool("rectangle","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_rectCursor");a.tool.current.text={}},toggleOff:function(a){a.clearCurrentTool("bwb_rectCursor","text")},onMove:function(a,b){a.tool.current.text.endTmp&&a.tool.current.text.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.text.start?(a.collections.main.add(new bay.whiteboard.pencil.Rectangle(a.tool.current.text.start,
c)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.text.start=c,a.collections.current.add(a.tool.current.text.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.text.endTmp.hide(),c=new bay.whiteboard.pencil.Rectangle(a.tool.current.text.start,a.tool.current.text.endTmp),c.current=!0,a.collections.current.add(c));a.redrawAll()}},3,goog.getMsg("Rectangle"));
bay.whiteboard.pencil.PointAtRect=function(a,b,c){bay.whiteboard.Point.call(this);this.obj=a;a.dependant.push(this);this.side=b;this.param=c;this.recalc()};goog.inherits(bay.whiteboard.pencil.PointAtRect,bay.whiteboard.Point);bay.whiteboard.pencil.PointAtRect.prototype.deleteElement=function(){this.obj.deleteDependant(this)};bay.whiteboard.pencil.PointAtRect.prototype.moveTo=function(a,b){if(this.obj){var c=this.obj.closestPoint(a,b);this.side=c.side;this.param=c.param}this.recalc();this.onChange()};
bay.whiteboard.pencil.PointAtRect.prototype.acceptData=function(a){bay.whiteboard.pencil.PointAtRect.superClass_.acceptData.call(this,a);this.obj&&(this.side=a.s,this.param=a.t);this.recalc()};
bay.whiteboard.pencil.PointAtRect.prototype.recalc=function(){!this.obj||!this.obj.exists||null==this.param||null==this.side?this.exists=!1:(this.exists=!0,"left"==this.side?(this.x=this.obj.pos.left,this.y=this.obj.pos.bottom+(this.obj.pos.top-this.obj.pos.bottom)*this.param):"right"==this.side?(this.x=this.obj.pos.right,this.y=this.obj.pos.bottom+(this.obj.pos.top-this.obj.pos.bottom)*this.param):"top"==this.side?(this.x=this.obj.pos.left+(this.obj.pos.right-this.obj.pos.left)*this.param,this.y=
this.obj.pos.top):"bottom"==this.side&&(this.x=this.obj.pos.left+(this.obj.pos.right-this.obj.pos.left)*this.param,this.y=this.obj.pos.bottom));this.recalcDependant()};bay.whiteboard.pencil.PointAtRect.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PencilPointAtRect", "obj": '+a.indexOf(this.obj)+', "s": "'+this.side+'", "t": "'+this.param+'"}'};
bay.whiteboard.pencil.PointAtRect.fromJson=function(a,b){var c=new bay.whiteboard.pencil.PointAtRect(b[a.obj],a.s,a.t);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PencilPointAtRect",bay.whiteboard.pencil.PointAtRect.fromJson);bay.whiteboard.pencil.Circle=function(a,b){bay.whiteboard.geometry.Circle.call(this);this.centerPoint=a;this.endPoint=b;a.dependant.push(this);b.dependant.push(this);this.recalc()};goog.inherits(bay.whiteboard.pencil.Circle,bay.whiteboard.geometry.Circle);
bay.whiteboard.pencil.Circle.prototype.deleteElement=function(){this.centerPoint.deleteDependant(this);this.endPoint.deleteDependant(this)};bay.whiteboard.pencil.Circle.prototype.recalc=function(){!this.centerPoint||!this.endPoint||!this.centerPoint.exists||!this.endPoint.exists?this.exists=!1:(this.exists=!0,this.radius=this.centerPoint.distanceTo(this.endPoint));this.recalcDependant()};
bay.whiteboard.pencil.Circle.prototype.draw=function(a){if(this.exists&&this.centerPoint.x>=a.area.minX-this.radius&&this.centerPoint.x<=a.area.maxX+this.radius&&this.centerPoint.y>=a.area.minY-this.radius&&this.centerPoint.y<=a.area.maxY+this.radius){var b=a.transform([this.centerPoint.x,this.centerPoint.y]);if(this.current)var c=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color);else this.hover&&(c=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),
a.graphics.drawCircle(b[0],b[1],this.radius*a.area.transformation.getScaleX(),c,null)),c=a.properties.pencilcircle.color,this.color&&(c=this.color),c=new goog.graphics.Stroke(a.properties.pencilcircle.width,c);a.graphics.drawCircle(b[0],b[1],this.radius*a.area.transformation.getScaleX(),c,null)}};bay.whiteboard.Whiteboard.properties.pencilcircle={width:3,color:"Grey"};
bay.whiteboard.pencil.Circle.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PencilCircle", "p1": '+a.indexOf(this.centerPoint)+', "p2": '+a.indexOf(this.endPoint)+"}"};bay.whiteboard.pencil.Circle.fromJson=function(a,b){var c=new bay.whiteboard.pencil.Circle(b[a.p1],b[a.p2]);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PencilCircle",bay.whiteboard.pencil.Circle.fromJson);
bay.whiteboard.Whiteboard.addTool("pencilcircle","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_circleCursor");a.tool.current.compass={}},toggleOff:function(a){a.clearCurrentTool("bwb_circleCursor","compass")},onMove:function(a,b){a.tool.current.compass.endTmp&&a.tool.current.compass.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.compass.start?(a.collections.main.add(new bay.whiteboard.pencil.Circle(a.tool.current.compass.start,
c)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.compass.start=c,a.collections.current.add(a.tool.current.compass.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.compass.endTmp.hide(),c=new bay.whiteboard.pencil.Circle(a.tool.current.compass.start,a.tool.current.compass.endTmp),c.current=!0,a.collections.current.add(c));a.redrawAll()}},4,goog.getMsg("Circle"));
bay.whiteboard.pencil.Text=function(a,b){bay.whiteboard.Element.call(this);this.rectangle=a;a.dependant.push(this);this.label=b;this.recalc()};goog.inherits(bay.whiteboard.pencil.Text,bay.whiteboard.Element);bay.whiteboard.pencil.Text.prototype.deleteElement=function(){this.rectangle.deleteDependant(this)};bay.whiteboard.pencil.Text.prototype.toString=function(){return!this.exists?goog.getMsg("Text does not exist"):goog.getMsg("Text [{$label}]",{label:this.label})};
bay.whiteboard.pencil.Text.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b),f=null;return f=this.rectangle.pos.left<=c.x&&c.x<=this.rectangle.pos.right&&this.rectangle.pos.top>=c.y&&c.y>=this.rectangle.pos.bottom?0:this.rectangle.distance(a,b)};bay.whiteboard.pencil.Text.prototype.recalc=function(){this.exists=this.rectangle.exists?!0:!1;this.recalcDependant()};
bay.whiteboard.pencil.Text.prototype.width=function(a,b){var c=goog.dom.createDom("div",{style:"position: absolute; float: left; white-space: nowrap; display: hidden; font: "+(b+"px "+a)+";"},this.label);goog.dom.appendChild(document.body,c);w=goog.style.getSize(c).width;goog.dom.removeNode(c);return w};
bay.whiteboard.pencil.Text.prototype.draw=function(a){if(this.exists){var b=a.transform([this.rectangle.pos.left,this.rectangle.pos.top]),c=(this.rectangle.pos.right-this.rectangle.pos.left)*a.area.transformation.getScaleX(),f=(this.rectangle.pos.bottom-this.rectangle.pos.top)*a.area.transformation.getScaleY(),g=new goog.graphics.Font(f,a.properties.text.font),g=this.width(a.properties.text.font,f),h=f;g>c&&(h=f*c/g);g=new goog.graphics.Font(h,a.properties.text.font);if(this.current)var h=new goog.graphics.Stroke(a.properties.current.width,
a.properties.current.color),k=new goog.graphics.SolidFill(a.properties.current.color);else this.hover&&(k=a.transform([this.rectangle.pos.left,this.rectangle.pos.bottom,this.rectangle.pos.right,this.rectangle.pos.top]),h=new goog.graphics.Path,h.moveTo(k[0],k[1]),h.lineTo(k[0],k[3]),h.lineTo(k[2],k[3]),h.lineTo(k[2],k[1]),h.lineTo(k[0],k[1]),k=new goog.graphics.SolidFill(a.properties.hover.color,0.2),a.graphics.drawPath(h,null,k)),k=a.properties.text.color,this.color&&(k=this.color),h=new goog.graphics.Stroke(a.properties.text.width,
k),k=new goog.graphics.SolidFill(k);a.graphics.drawText(this.label,b[0],b[1],c,f,"center","center",g,h,k)}};bay.whiteboard.Whiteboard.properties.text={width:1,color:"DarkBlue",font:"Times"};bay.whiteboard.pencil.Text.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "Text", "r": '+a.indexOf(this.rectangle)+"}"};bay.whiteboard.pencil.Text.fromJson=function(a,b){var c=new bay.whiteboard.pencil.Text(b[a.r],a.label);c.restoreFromJson(a);return c};
bay.whiteboard.Collection.setFromJsonFunc("Text",bay.whiteboard.pencil.Text.fromJson);
bay.whiteboard.Whiteboard.addTool("text","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_textCursor");a.tool.current.text={}},toggleOff:function(a){a.clearCurrentTool("bwb_textCursor","text")},onMove:function(a,b){a.tool.current.text.endTmp&&a.tool.current.text.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.text.start?(c=new bay.whiteboard.pencil.Rectangle(a.tool.current.text.start,c),a.collections.main.add(c),
a.collections.main.add(new bay.whiteboard.pencil.Text(c,"Some text")),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.text.start=c,a.collections.current.add(a.tool.current.text.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.text.endTmp.hide(),c=new bay.whiteboard.pencil.Rectangle(a.tool.current.text.start,a.tool.current.text.endTmp),c.current=!0,a.collections.current.add(c));a.redrawAll()}},5,goog.getMsg("Text box"));
bay.whiteboard.pencil.Underline=function(a,b,c){bay.whiteboard.Element.call(this);this.startPoint=a;this.endPoint=b;a.dependant.push(this);b.dependant.push(this);this.thickness=c?c:15;this.recalc()};goog.inherits(bay.whiteboard.pencil.Underline,bay.whiteboard.Element);bay.whiteboard.pencil.Underline.prototype.deleteElement=function(){this.startPoint.deleteDependant(this);this.endPoint.deleteDependant(this)};
bay.whiteboard.pencil.Underline.prototype.toString=function(){return!this.exists?goog.getMsg("Underline does not exists"):goog.getMsg("Underline")};
bay.whiteboard.pencil.Underline.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b),f=this.startPoint.y-c.y,g=this.endPoint.y-c.y;0!=this.direction.x&&(f=this.startPoint.x-c.x+this.direction.y*(this.startPoint.y-c.y)/this.direction.x,g=this.endPoint.x-c.x+this.direction.y*(this.endPoint.y-c.y)/this.direction.x);if(0>=f*g)return c=Math.abs(this.direction.x*(c.y-this.startPoint.y)-this.direction.y*(c.x-this.startPoint.x))/Math.sqrt(this.direction.x*this.direction.x+this.direction.y*
this.direction.y),c<this.thickness?0:c-this.thickness;f=this.startPoint.distance(c.x,c.y);g=this.endPoint.distance(c.x,c.y);return f<g?f:g};bay.whiteboard.pencil.Underline.prototype.recalc=function(){!this.startPoint||!this.endPoint||!this.startPoint.exists||!this.endPoint.exists?this.exists=!1:(this.exists=!0,this.direction=new bay.whiteboard.Vector(this.endPoint.x-this.startPoint.x,this.endPoint.y-this.startPoint.y));this.recalcDependant()};
bay.whiteboard.pencil.Underline.prototype.draw=function(a){if(this.exists){var b=bay.whiteboard.geometry.Line.prototype.getMinAndMaxParamValue.call(this,a.area);if(b&&(0<b.max&&1>b.min)&&(b=Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y),0!=b)){var c=[];c[0]=this.startPoint.x+this.thickness*this.direction.y/b;c[1]=this.startPoint.y-this.thickness*this.direction.x/b;c[2]=this.startPoint.x-this.thickness*this.direction.y/b;c[3]=this.startPoint.y+this.thickness*this.direction.x/
b;c[4]=this.endPoint.x+this.thickness*this.direction.y/b;c[5]=this.endPoint.y-this.thickness*this.direction.x/b;c[6]=this.endPoint.x-this.thickness*this.direction.y/b;c[7]=this.endPoint.y+this.thickness*this.direction.x/b;c=a.transform(c);b=new goog.graphics.Path;b.moveTo(c[0],c[1]);b.lineTo(c[2],c[3]);b.lineTo(c[6],c[7]);b.lineTo(c[4],c[5]);b.lineTo(c[0],c[1]);this.current?c=new goog.graphics.SolidFill(a.properties.current.color,a.properties.underline.opacity):(this.hover&&(c=new goog.graphics.SolidFill(a.properties.hover.color,
a.properties.underline.opacity),a.graphics.drawPath(b,null,c)),c=a.properties.underline.color,this.color&&(c=this.color),c=new goog.graphics.SolidFill(c,a.properties.underline.opacity));a.graphics.drawPath(b,null,c)}}};bay.whiteboard.Whiteboard.properties.underline={thickness:15,color:"Magenta",opacity:0.3};
bay.whiteboard.pencil.Underline.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PencilUnderline", "p1": '+a.indexOf(this.startPoint)+', "p2": '+a.indexOf(this.endPoint)+', "thick": '+this.thickness+"}"};bay.whiteboard.pencil.Underline.fromJson=function(a,b){var c=new bay.whiteboard.pencil.Underline(b[a.p1],b[a.p2]);c.thickness=a.thick;c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("PencilUnderline",bay.whiteboard.pencil.Underline.fromJson);
bay.whiteboard.Whiteboard.addTool("underline","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_underlineCursor");a.tool.current.underline={}},toggleOff:function(a){a.clearCurrentTool("bwb_underlineCursor","underline")},onMove:function(a,b){a.tool.current.underline.endTmp&&a.tool.current.underline.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.underline.start?(a.collections.main.add(new bay.whiteboard.pencil.Underline(a.tool.current.underline.start,
c,a.properties.underline.thickness)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.underline.start=c,a.collections.current.add(a.tool.current.underline.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.underline.endTmp.hide(),c=new bay.whiteboard.pencil.Underline(a.tool.current.underline.start,a.tool.current.underline.endTmp,a.properties.underline.thickness),c.current=!0,a.collections.current.add(c));a.redrawAll()}},7,goog.getMsg("Highlight board area"));
bay.whiteboard.pencil.Arrow=function(a,b,c){bay.whiteboard.Element.call(this);this.startPoint=a;this.endPoint=b;a.dependant.push(this);b.dependant.push(this);this.thickness=c?c:15;this.recalc()};goog.inherits(bay.whiteboard.pencil.Arrow,bay.whiteboard.Element);bay.whiteboard.pencil.Arrow.prototype.deleteElement=function(){this.startPoint.deleteDependant(this);this.endPoint.deleteDependant(this)};
bay.whiteboard.pencil.Arrow.prototype.toString=function(){return!this.exists?goog.getMsg("Arrow does not exists"):goog.getMsg("Arrow")};
bay.whiteboard.pencil.Arrow.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b),f=this.startPoint.y-c.y,g=this.endPoint.y-c.y;0!=this.direction.x&&(f=this.startPoint.x-c.x+this.direction.y*(this.startPoint.y-c.y)/this.direction.x,g=this.endPoint.x-c.x+this.direction.y*(this.endPoint.y-c.y)/this.direction.x);if(0>=f*g)return c=Math.abs(this.direction.x*(c.y-this.startPoint.y)-this.direction.y*(c.x-this.startPoint.x))/Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y),
c<this.thickness?0:c-this.thickness;f=this.startPoint.distance(c.x,c.y);g=this.endPoint.distance(c.x,c.y);return f<g?f:g};bay.whiteboard.pencil.Arrow.prototype.recalc=function(){!this.startPoint||!this.endPoint||!this.startPoint.exists||!this.endPoint.exists?this.exists=!1:(this.exists=!0,this.direction=new bay.whiteboard.Vector(this.endPoint.x-this.startPoint.x,this.endPoint.y-this.startPoint.y));this.recalcDependant()};
bay.whiteboard.pencil.Arrow.prototype.draw=function(a){if(this.exists){var b=bay.whiteboard.geometry.Line.prototype.getMinAndMaxParamValue.call(this,a.area);if(b&&(0<b.max&&1>b.min)&&(b=Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y),0!=b)){var c=[];c[0]=this.startPoint.x+this.thickness*this.direction.y/b;c[1]=this.startPoint.y-this.thickness*this.direction.x/b;c[2]=this.startPoint.x-this.thickness*this.direction.y/b;c[3]=this.startPoint.y+this.thickness*this.direction.x/
b;c[4]=this.endPoint.x-6*this.thickness*this.direction.x/b-this.thickness*this.direction.y/b;c[5]=this.endPoint.y-6*this.thickness*this.direction.y/b+this.thickness*this.direction.x/b;c[6]=this.endPoint.x-6*this.thickness*this.direction.x/b-3*this.thickness*this.direction.y/b;c[7]=this.endPoint.y-6*this.thickness*this.direction.y/b+3*this.thickness*this.direction.x/b;c[8]=this.endPoint.x;c[9]=this.endPoint.y;c[10]=this.endPoint.x-6*this.thickness*this.direction.x/b+3*this.thickness*this.direction.y/
b;c[11]=this.endPoint.y-6*this.thickness*this.direction.y/b-3*this.thickness*this.direction.x/b;c[12]=this.endPoint.x-6*this.thickness*this.direction.x/b+this.thickness*this.direction.y/b;c[13]=this.endPoint.y-6*this.thickness*this.direction.y/b-this.thickness*this.direction.x/b;c=a.transform(c);b=new goog.graphics.Path;b.moveTo(c[0],c[1]);b.lineTo(c[2],c[3]);b.lineTo(c[4],c[5]);b.lineTo(c[6],c[7]);b.lineTo(c[8],c[9]);b.lineTo(c[10],c[11]);b.lineTo(c[12],c[13]);b.lineTo(c[0],c[1]);if(this.current)c=
new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color),a.graphics.drawPath(b,c,null);else{if(this.hover){var f=new goog.graphics.SolidFill(a.properties.hover.color,a.properties.arrow.opacity);a.graphics.drawPath(b,null,f)}f=a.properties.arrow.color;this.color&&(f=this.color);c=new goog.graphics.Stroke(a.properties.arrow.width,f);f=new goog.graphics.SolidFill(f,a.properties.arrow.opacity);a.graphics.drawPath(b,c,f)}}}};
bay.whiteboard.Whiteboard.properties.arrow={width:1,thickness:3,color:"Gray",opacity:0.3};bay.whiteboard.pencil.Arrow.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PencilArrow", "p1": '+a.indexOf(this.startPoint)+', "p2": '+a.indexOf(this.endPoint)+', "thick": '+this.thickness+"}"};bay.whiteboard.pencil.Arrow.fromJson=function(a,b){var c=new bay.whiteboard.pencil.Arrow(b[a.p1],b[a.p2]);c.thickness=a.thick;c.restoreFromJson(a);return c};
bay.whiteboard.Collection.setFromJsonFunc("PencilArrow",bay.whiteboard.pencil.Arrow.fromJson);
bay.whiteboard.Whiteboard.addTool("arrow","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_arrowCursor");a.tool.current.arrow={}},toggleOff:function(a){a.clearCurrentTool("bwb_arrowCursor","arrow")},onMove:function(a,b){a.tool.current.arrow.endTmp&&a.tool.current.arrow.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.tool.current.arrow.start?(a.collections.main.add(new bay.whiteboard.pencil.Arrow(a.tool.current.arrow.start,
c,a.properties.arrow.thickness)),a.collections.current.clear(),a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.arrow.start=c,a.collections.current.add(a.tool.current.arrow.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.arrow.endTmp.hide(),c=new bay.whiteboard.pencil.Arrow(a.tool.current.arrow.start,a.tool.current.arrow.endTmp,a.properties.arrow.thickness),c.current=!0,a.collections.current.add(c));a.redrawAll()}},6,goog.getMsg("Draw an arrow"));
bay.whiteboard.pencil.Pointer=function(a){bay.whiteboard.Element.call(this);if(this.point=a){a.dependant.push(this);var b=this;this.interval=setInterval(function(){b.decreaseAge(100)},100)}this.recalc()};goog.inherits(bay.whiteboard.pencil.Pointer,bay.whiteboard.Element);bay.whiteboard.pencil.Pointer.prototype.deleteElement=function(){this.point&&this.point.deleteDependant(this)};
bay.whiteboard.pencil.Pointer.prototype.toString=function(){return!this.exists?goog.getMsg("Pointer does not exists"):goog.getMsg("Pointer [{$x},{$y}]",{x:this.point.x.toFixed(2),y:this.point.y.toFixed(2)})};
bay.whiteboard.pencil.Pointer.prototype.decreaseAge=function(a){this.collection&&this.collection.getBoard()&&(this.board=this.collection.getBoard());this.board&&(void 0==this.age&&(this.age=this.board.properties.pointer.age,this.recalc()),this.age-=a,0>=this.age&&(clearInterval(this.interval),this.point&&(this.point.deleteDependant(this),this.point=null),this.recalc()),this.board.redrawAll())};
bay.whiteboard.pencil.Pointer.prototype.distance=function(a,b){if(this.exists)return this.point.distance(a,b)};bay.whiteboard.pencil.Pointer.prototype.recalc=function(){this.exists=null!=this.point&&this.point.exists&&0<this.age?!0:!1;this.recalcDependant()};
bay.whiteboard.pencil.Pointer.prototype.draw=function(a){if(this.exists&&this.point.x>=a.area.minX&&this.point.x<=a.area.maxX&&this.point.y>=a.area.minY&&this.point.y<=a.area.maxY){var b=a.properties.pointer.radius*(this.age%500/500)*a.area.transformation.getScaleX(),c=[];c[0]=this.point.x;c[1]=this.point.y;c[2]=this.point.x-a.properties.pointer.radius;c[3]=this.point.y;c[4]=this.point.x+a.properties.pointer.radius;c[5]=this.point.y;c[6]=this.point.x;c[7]=this.point.y-a.properties.pointer.radius;
c[8]=this.point.x;c[9]=this.point.y+a.properties.pointer.radius;var c=a.transform(c),f=new goog.graphics.Path;f.moveTo(c[2],c[3]);f.lineTo(c[4],c[5]);var g=new goog.graphics.Path;g.moveTo(c[6],c[7]);g.lineTo(c[8],c[9]);if(this.current){var h=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color);a.graphics.drawCircle(c[0],c[1],b,h,null)}else this.hover&&(h=new goog.graphics.Stroke(a.properties.hover.width,a.properties.hover.color),a.graphics.drawPath(f,h,null),a.graphics.drawPath(g,
h,null)),h=a.properties.pointer.color,this.color&&(h=this.color),h=new goog.graphics.Stroke(a.properties.pointer.width,h),a.graphics.drawCircle(c[0],c[1],b,h,null),a.graphics.drawPath(f,h,null),a.graphics.drawPath(g,h,null)}};bay.whiteboard.Whiteboard.properties.pointer={width:1,radius:30,color:"Magenta",age:1E4};bay.whiteboard.pencil.Pointer.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "PencilPointer", "p": '+a.indexOf(this.point)+', "age" :'+this.age+"}"};
bay.whiteboard.pencil.Pointer.fromJson=function(a,b){var c=new bay.whiteboard.pencil.Pointer(b[a.p]);c.age=a.age;c.restoreFromJson(a);c.recalc();return c};bay.whiteboard.Collection.setFromJsonFunc("PencilPointer",bay.whiteboard.pencil.Pointer.fromJson);
bay.whiteboard.Whiteboard.addTool("pointer","pencil",{toggleOn:function(a){goog.dom.classes.add(a.elements.drawElement,"bwb_pointerCursor");a.tool.current.pointer={}},toggleOff:function(a){a.clearCurrentTool("bwb_pointerCursor","pointer")},onClick:function(a,b){var c=a.pointAtEventPosition(b);a.collections.main.add(new bay.whiteboard.pencil.Pointer(c));a.tool.current.toggleOff(a);a.redrawAll()}},8,goog.getMsg("Highlight a point at whiteboard"));bay.whiteboard.art={};bay.whiteboard.art.ClipArt=function(a,b){bay.whiteboard.Element.call(this);this.rectangle=a;a.dependant.push(this);this.label=b;this.recalc()};goog.inherits(bay.whiteboard.art.ClipArt,bay.whiteboard.Element);bay.whiteboard.art.ClipArt.prototype.deleteElement=function(){this.rectangle.deleteDependant(this)};bay.whiteboard.art.ClipArt.prototype.toString=function(){return!this.exists?goog.getMsg("ClipArt does not exist"):goog.getMsg("ClipArt from [{$label}]",{label:this.label})};
bay.whiteboard.art.ClipArt.prototype.distance=function(a,b){var c=new bay.whiteboard.Vector(a,b),f=null;return f=this.rectangle.pos.left<=c.x&&c.x<=this.rectangle.pos.right&&this.rectangle.pos.top>=c.y&&c.y>=this.rectangle.pos.bottom?0:this.rectangle.distance(a,b)};bay.whiteboard.art.ClipArt.prototype.recalc=function(){this.exists=this.rectangle.exists?!0:!1;this.recalcDependant()};
bay.whiteboard.art.ClipArt.prototype.draw=function(a){if(this.exists){this.color&&(color=this.color);var b=(this.rectangle.pos.right-this.rectangle.pos.left)*a.area.transformation.getScaleX(),c=(this.rectangle.pos.bottom-this.rectangle.pos.top)*a.area.transformation.getScaleY(),f=a.transform([this.rectangle.pos.left,this.rectangle.pos.top,this.rectangle.pos.right,this.rectangle.pos.bottom]),g=new goog.graphics.Path;g.moveTo(f[0],f[1]);g.lineTo(f[0],f[3]);g.lineTo(f[2],f[3]);g.lineTo(f[2],f[1]);g.lineTo(f[0],
f[1]);if(this.current)b=new goog.graphics.Stroke(a.properties.current.width,a.properties.current.color),a.graphics.drawPath(g,b,null);else{if(this.hover){var h=new goog.graphics.SolidFill(a.properties.hover.color,0.2);a.graphics.drawPath(g,null,h)}a.graphics.drawImage(f[0],f[1],b,c,this.label)}}};bay.whiteboard.art.ClipArt.prototype.toJson=function(a,b){return"{"+this.jsonHeader(b)+', "type": "ClipArt", "r": '+a.indexOf(this.rectangle)+"}"};
bay.whiteboard.art.ClipArt.fromJson=function(a,b){var c=new bay.whiteboard.art.ClipArt(b[a.r],a.label);c.restoreFromJson(a);return c};bay.whiteboard.Collection.setFromJsonFunc("ClipArt",bay.whiteboard.art.ClipArt.fromJson);
bay.whiteboard.Whiteboard.addTool("clipart","pencil",{toggleOn:function(a){a.tool.current.clipart={};a.tool.current.clipart.dialog=bay.whiteboard.art.chooseClipArt(a,function(b){a.tool.current.clipart.label=b;a.tool.current.clipart.dialog.dispose();goog.dom.classes.add(a.elements.drawElement,"bwb_clipartCursor")},function(){a.tool.current.clipart.dialog.dispose();a.tool.current.toggleOff(a)})},toggleOff:function(a){a.tool.current.clipart.dialog&&a.tool.current.clipart.dialog.dispose();a.clearCurrentTool("bwb_clipartCursor",
"clipart")},onMove:function(a,b){a.tool.current.clipart&&a.tool.current.clipart.endTmp&&a.tool.current.clipart.endTmp.moveTo(a.getConvertEventPos(b))},onClick:function(a,b){if(a.tool.current.clipart&&a.tool.current.clipart.label){var c=a.pointAtEventPosition(b);a.tool.current.clipart.start?(c=new bay.whiteboard.pencil.Rectangle(a.tool.current.clipart.start,c),a.collections.main.add(c),a.collections.main.add(new bay.whiteboard.art.ClipArt(c,a.tool.current.clipart.label)),a.collections.current.clear(),
a.tool.current.toggleOff(a)):(a.collections.current.clear(),a.tool.current.clipart.start=c,a.collections.current.add(a.tool.current.clipart.endTmp=new bay.whiteboard.PointFree(c)),a.tool.current.clipart.endTmp.hide(),c=new bay.whiteboard.pencil.Rectangle(a.tool.current.clipart.start,a.tool.current.clipart.endTmp),c.current=!0,a.collections.current.add(c));a.redrawAll()}}},20,goog.getMsg("Insert picture"));
bay.whiteboard.art.chooseClipArt=function(a,b,c){return bay.whiteboard.art.chooseUrlDialog(a,b,c,"http://icons.iconarchive.com/icons/femfoyou/angry-birds/128/angry-bird-icon.png")};bay.whiteboard.Whiteboard.addTool("background","tools",{action:function(a,b){var c=bay.whiteboard.art.chooseBackground(a,function(b){c.dispose();a.setBackground(b)},function(){c.dispose()})}},20,goog.getMsg("Change whiteboard background"));
bay.whiteboard.art.chooseBackground=function(a,b,c){return bay.whiteboard.art.chooseUrlDialog(a,b,c,"http://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/World_map_pol_2005_v02.svg/2000px-World_map_pol_2005_v02.svg.png")};
bay.whiteboard.art.chooseUrlDialog=function(a,b,c,f){var g=new goog.ui.Component;g.render(document.body);a=goog.style.getPosition(a.elements.drawElement);goog.dom.classes.add(g.getElement(),"bwb_pictureUrlDialog");goog.style.setPosition(g.getElement(),a.x+40,a.y+10);var h=new goog.ui.BidiInput;g.addChild(h,!0);h.setValue(f);goog.dom.classes.add(h.getElement(),"bwb_pictureUrlInput");f=new goog.ui.Button("Ok");g.addChild(f,!0);goog.events.listen(f,goog.ui.Component.EventType.ACTION,function(){b(h.getValue())});
goog.dom.classes.add(f.getElement(),"bwb_pictureUrlOkButton");f=new goog.ui.Button("Cancel");g.addChild(f,!0);goog.events.listen(f,goog.ui.Component.EventType.ACTION,function(){c()});goog.dom.classes.add(f.getElement(),"bwb_pictureUrlCancelButton");goog.style.showElement(g.getElement(),!0);return g};
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.






;
