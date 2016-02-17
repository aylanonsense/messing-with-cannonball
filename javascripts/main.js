define([
	'THREE',
	'CANNON',
	'global',
	'Ball',
	'Hill'
], function(
	THREE,
	CANNON,
	global,
	Ball,
	Hill
) {
	return function() {
		"use strict";

		//graphics
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.set(100, 50, 100);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		var geometry = new THREE.SphereGeometry(1);
		var material = new THREE.MeshBasicMaterial({ wireframe: true });

		var dirLight = new THREE.DirectionalLight(0xcccccc, 1);
		dirLight.position.set(400, 400, 50);
		scene.add(dirLight);
		var ambLight = new THREE.AmbientLight(0x222222);
		scene.add(ambLight);

		//mesh
		var matrix = [];
		var sizeX = 64, sizeY = 32;

		for (var i = 0; i < sizeX; i++) {
			matrix.push([]);
			for (var j = 0; j < sizeY; j++) {
				var height = Math.sin(i / sizeX * Math.PI * 8) * Math.sin(j / sizeY * Math.PI * 8) * 8 + 8;
				if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
					height = 10;

				matrix[i].push(height);//i % 4 === 0 && j % 4 === 0 ? 20 : 5);//height);
			}
		}
		var hill = new Hill({ matrix: matrix });
		scene.add(hill.mesh);
		global.CANNON.world.add(hill.body);
		/*var hfShape = new CANNON.Heightfield(matrix, {
			elementSize: 400 / sizeX
		});

		var hfBody = new CANNON.Body({
			mass: 0,
			material: planeMaterial
		});
		hfBody.addShape(hfShape, new CANNON.Vec3(0, 0, 0), new CANNON.Quaternion());
		hfBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
		hfBody.position.copy(new CANNON.Vec3(-200, 0, 200));
		global.CANNON.world.add(hfBody);*/

		//create objects
		var balls = [];
		for(var i = 0; i < 200; i++) {
			addBall(400 * Math.random() - 200, 120, 400 * Math.random() - 200);
		}
		function addBall(x, y, z) {
			var ball = new Ball({ x: x, y: y, z: z });
			scene.add(ball.mesh);
			global.CANNON.world.add(ball.body);
			balls.push(ball);
			ball.body.velocity.x = 10 * Math.random();
			ball.body.velocity.z = 10 * Math.random();
		}

		//game loop
		function animate() {
			requestAnimationFrame(animate);
			global.CANNON.world.step(1 / 60);
			hill.update();
			for(var i = 0; i < balls.length; i++) {
				balls[i].update();
			}
			// camera.position.y += 0.5;
			camera.lookAt(new THREE.Vector3(0, 0, 0));
			global.THREE.renderer.render(scene, camera);
		}
		animate();
	};
});