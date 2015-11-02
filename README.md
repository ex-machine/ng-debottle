# ng-debottle

Angular debounce/throttle portmanteau, now with $timeout flavour.

## Install

### NPM

    npm install --save ng-debottle

### Bower

    bower install --save ng-debottle

## Usage

```javascript
angular.module('app', ['ngDebottle']).run(function ($rootScope, $throttle, $debounce) {
	function fn() { ... }
	var throttledFn = $throttle(fn, 100);
	var debouncedFn = $debounce(fn, 100);

	$rootScope.$on('...', throttledFn);
	$rootScope.$on('...', debouncedFn );
	// instead of
	$rootScope.$on('...', fn);
});
```
