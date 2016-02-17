define([
	'THREE',
	'CANNON',
	'global'
], function(
	THREE,
	CANNON,
	global
) {
	var geometry = new THREE.SphereGeometry(4);
	var visualMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0x555555, shininess: 30 } );//new THREE.MeshBasicMaterial({ wireframe: false });
	var shape = new CANNON.Sphere(4);
	var physicsMaterial = new CANNON.Material();

	function Ball(params) {
		this.mesh = new THREE.Mesh(geometry, visualMaterial);


		/*var geom = new THREE.Geometry(); 
		var v1 = new THREE.Vector3(0,0,0);
		var v2 = new THREE.Vector3(0,2,0);
		var v3 = new THREE.Vector3(0,2,2);

		geom.vertices.push(v1);
		geom.vertices.push(v2);
		geom.vertices.push(v3);

		geom.faces.push( new THREE.Face3( 0, 1, 2 ) );

		this.mesh = new THREE.Mesh(geom, visualMaterial);*/


		this.body = new CANNON.Body({
			mass: 0.1,
			shape: shape,
			material: physicsMaterial
		});
		this.body.position.set(params.x, params.y, params.z);
	}
	Ball.prototype.update = function() {
		this.mesh.position.copy(this.body.position);
		this.mesh.quaternion.copy(this.body.quaternion);
	};
	return Ball;
});