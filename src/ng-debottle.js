'use strict';

var angular = require('angular');
var apply = require('apply-fn');
var debottle = require('debottle');

function Debottle($timeout, delay) {
	this.$delay = delay;

	this.$cancel = function () {
		return $timeout.cancel(this.$timeout);
	}

	this.$flush = function (delay) {
		return this.$timeout.flush(delay);
	}
}

var ngDebottle = angular.module('ngDebottle', [])
.constant('debounce', debottle.debounce)
.constant('throttle', debottle.throttle)
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
.factory('$throttle', ['$timeout', '$q', function ($timeout, $q) {
	return function (fn, delay, invokeApply) {
		var self = throttledFn;
		Debottle.call(self, $timeout, delay);

		function throttledFn() {
			var args = arguments;

			if (!self.$timeout || self.$timeout.$$state.status > 0) {
				var fnResultPromise = $q.when(apply(null, fn, args));
				
				self.$timeout = $timeout(function () {
					return fnResultPromise;
				}, self.$delay, invokeApply);
			}

			return fnResultPromise || self.$timeout;
		}

		return self;
	}
}]);

module.exports = ngDebottle.name;