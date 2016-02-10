define([
	'THREE',
	'CANNON'
], function(
	THREE,
	CANNON
) {
	return function() {
		"use strict";

		//graphics
		var renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(0x440000, 1);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.set(200, 1, 200);
		camera.lookAt(new THREE.Vector3(0, 60, 0));
		var geometry = new THREE.SphereGeometry(1);
		var material = new THREE.MeshBasicMaterial({ wireframe: true });

		//physics
		var world = new CANNON.World();
		world.broadphase = new CANNON.NaiveBroadphase();
		world.gravity.set(0, -15, 0);
		var planeShape = new CANNON.Plane();
		var planeMaterial = new CANNON.Material();
		var planeBody = new CANNON.Body({
			mass: 0,
			shape: planeShape,
			material: planeMaterial
		});
		planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
		world.add(planeBody);

		//create objects
		var balls = [];
		for(var i = 0; i < 1250; i++) {
			addBall(10 * Math.random(), 30 + 10 * Math.random(), 10 * Math.random());
		}
		function addBall(x, y, z) {
			//graphics
			var mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);

			//physics
			var sphereShape = new CANNON.Sphere(1);
			var sphereMaterial = new CANNON.Material();
			var sphereBody = new CANNON.Body({
				mass: 0.1,
				shape: sphereShape,
				material: sphereMaterial
			});
			sphereBody.position.set(x, y, z);
			world.add(sphereBody);

			balls.push({ mesh: mesh, body: sphereBody });
		}

		//game loop
		function animate() {
			requestAnimationFrame(animate);
			world.step(1 / 60);
			for(var i = 0; i < balls.length; i++) {
				balls[i].mesh.position.copy(balls[i].body.position);
				balls[i].mesh.quaternion.copy(balls[i].body.quaternion);
			}
			renderer.render(scene, camera);
		}
		animate();
	};
});