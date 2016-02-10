//configure requirejs
requirejs.config({
	baseUrl: 'javascripts',
	paths: {
		'CANNON': '/lib/cannon',
		'THREE': '/lib/three'
	},
	shim: {
		'THREE': {
			exports: 'THREE'
		},
		'CANNON': {
			exports: 'CANNON',
			deps: [ 'THREE' ]
		}
	}
});

//execute the main class
requirejs([ 'main' ], function(main) {
	main();
});