'use strict';

var angular = require('angular');
var apply = require('apply-fn');

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

module.exports = ngDebottle.name;