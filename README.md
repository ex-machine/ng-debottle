# ng-debottle

Angular debounce/throttle portmanteau, now with $timeout flavour.

Wraps [`debottle`](https://github.com/ex-machine/debottle) package to provide generic JS `debounce` and `throttle` as Angular services.

## Install

### NPM

    npm install --save ng-debottle

### Bower

    bower install --save ng-debottle

## Usage

```javascript
angular.module('app', ['ngDebottle'])
.run(function ($rootScope, $throttle, $debounce) {
	function fn() { ... }
	var throttledFn = $throttle(fn, 100);
	var debouncedFn = $debounce(fn, 100);

	// based on $timeout, synced to digest cycles 
	$rootScope.$on('...', throttledFn);
	$rootScope.$on('...', debouncedFn );
	// instead of
	$rootScope.$on('...', fn);
})
.run(function ($rootElement, throttle, debounce) {
	function fn() { ... }
	var throttledFn = throttle(fn, 20);
	var debouncedFn = debounce(fn, 20);

	// based on setTimeout, not synced to digest cycles
	$rootElement.on('...', throttledFn);
	$rootElement.on('...', debouncedFn);
	// instead of
	$rootElement.on('...', fn);
});
```
