define([
	'THREE',
	'CANNON'
], function(
	THREE,
	CANNON
) {
	//renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x440000, 1);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//world
	var world = new CANNON.World();
	world.broadphase = new CANNON.NaiveBroadphase();
	world.gravity.set(0, -15, 0);

	return {
		THREE: {
			renderer: renderer
		},
		CANNON: {
			world: world
		}
	};
});