define([
	'THREE',
	'CANNON',
	'global'
], function(
	THREE,
	CANNON,
	global
) {
	var TILE_SIZE = 400 / 64;
	var physicsMaterial = new CANNON.Material();
	var visualMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0x555555, shininess: 30 } );//new THREE.MeshBasicMaterial({ wireframe: false });

	function Hill(params) {
		var rows = params.matrix.length;
		var cols = params.matrix[0].length;
		var width = TILE_SIZE * rows;
		var depth = TILE_SIZE * cols;

		//body
		this.body = new CANNON.Body({
			mass: 0,
			material: physicsMaterial
		});
		//heightfield shape
		var shape = new CANNON.Heightfield(params.matrix, {
			elementSize: TILE_SIZE
		});
		var quaternion = (new THREE.Quaternion()).setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI/2);
		this.body.addShape(shape, new CANNON.Vec3(-width / 2, 0, depth / 2), quaternion);

		//mesh
		var geom = new THREE.Geometry(); 
		for(var r = 0; r < params.matrix.length; r++) {
			for(var c = 0; c < params.matrix[r].length; c++) {
				var vector = new THREE.Vector3(r * TILE_SIZE - width / 2, params.matrix[r][c], depth / 2 - c * TILE_SIZE);
				geom.vertices.push(vector);
			}
		}
		for(var r = 0; r < params.matrix.length - 1; r++) {
			for(var c = 0; c < params.matrix[r].length - 1; c++) {
				geom.faces.push(new THREE.Face3((r + 1) * cols + c, r * cols + (c + 1), r * cols + c));
				geom.faces.push(new THREE.Face3((r + 1) * cols + c, (r + 1) * cols + (c + 1), r * cols + (c + 1)));
			}
		}
		geom.computeFaceNormals();
		this.mesh = new THREE.Mesh(geom, visualMaterial);
	}
	Hill.prototype.update = function() {
		// this.mesh.position.copy(this.body.position);
		// this.mesh.quaternion.copy(this.body.quaternion);
	};
	return Hill;
});