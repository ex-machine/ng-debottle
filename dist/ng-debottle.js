(function(__root, __factory) { if (typeof define === "function" && define.amd) { define("ng-debottle", ["angular"], __factory);} else if (typeof exports === "object") {module.exports = __factory(require("angular"));} else {__root["ng-debottle"] = __factory(angular);}})(this, (function(__small$_mod_0) {
var exports = {};
'use strict';

var angular = __small$_mod_0;
var apply = ((function() {
var exports = {};
exports = ((function() {
var exports = {};
function apply(self, fn, args) {
	var selfless = (self === undefined) || (self === null);
	var length = args ? args.length : 0;
	
	switch (length) {
		case 0:
			return selfless ? fn() : fn.call(self);
		case 1:
			return selfless ? fn(args[0]) : fn.call(self, args[0]);
		case 2:
			return selfless ? fn(args[0], args[1]) : fn.call(self, args[0], args[1]);
		case 3:
			return selfless ? fn(args[0], args[1], args[2]) : fn.call(self, args[0], args[1], args[2]);
		case 4:
			return selfless ? fn(args[0], args[1], args[2], args[3]) : fn.call(self, args[0], args[1], args[2], args[3]);
		case 5:
			return selfless ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(self, args[0], args[1], args[2], args[3], args[4]);
		case 6:
			return selfless ? fn(args[0], args[1], args[2], args[3], args[4], args[5]) : fn.call(self, args[0], args[1], args[2], args[3], args[4], args[5]);
		// the crucial point
		case 7:
			return selfless ? fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]) : fn.call(self, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
		default:
			return selfless ? fn.apply(null, args) : fn.apply(self, args);
	}
};

exports = apply;
return exports;
})());
return exports;
})());

function Debottle($timeout, delay) {
	this.$delay = delay;

	this.$cancel = function () {
		return $timeout.cancel(this.$timeout);
	}
}

var ngDebottle = angular.module('ngDebottle', [])
.factory('$debounce', ['$timeout', function ($timeout) {
	return function (fn, delay, invokeApply) {
		var self = debouncedFn;
		Debottle.call(self, $timeout, delay);

		function debouncedFn() {
			var args = arguments;

			self.$cancel();

			return self.$timeout = $timeout(function () {
				return apply(null, fn, args);
			}, self.$delay, invokeApply);
		}

		return self;
	}
}])
.factory('$throttle', ['$timeout', function ($timeout) {
	return function (fn, delay, invokeApply) {
		var self = throttledFn;
		Debottle.call(self, $timeout, delay);

		function throttledFn() {
			var args = arguments;

			if (!self.$timeout || self.$timeout.$$state.status > 0) {
				self.$timeout = $timeout(function () {
					return apply(null, fn, args);
				}, self.$delay, invokeApply);
			}

			return self.$timeout;
		}

		return self;
	}
}]);

exports = ngDebottle.name;
return exports;
}))