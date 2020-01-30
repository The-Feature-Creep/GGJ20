import * as THREE from 'three';

export default class Box {
	constructor(scene){
		var geometry = new THREE.BoxGeometry(3, 3, 3);
		var red = (Math.round(Math.random())*50).toString();
		var green = (Math.round(Math.random())*50).toString();
		var blue = (Math.round(Math.random())*50).toString();
		var material = new THREE.MeshPhongMaterial({ 
			color: "rgb("+red+"%,"+green+"%,"+blue+"%)", 
			flatShading: true });
		
		this.cube = new THREE.Mesh(geometry, material);
		scene.add(this.cube);
		this.cube.position.x = Math.round(Math.random() * 30);
		this.cube.position.y =Math.round(Math.random() * 30);
		console.log();
	}

	update(delta){
		this.cube.rotation.x += Math.round(Math.random()) * 3 * delta;
    	this.cube.rotation.z += Math.round(Math.random()) * 3 * delta;
	}
}