import * as THREE from 'three';

export default class Coin extends THREE.Object3D{
	constructor(){
		super();
		var material = new THREE.MeshPhongMaterial( {color: 0xaa9900, flatShading: true} );
		var geometry = new THREE.CylinderBufferGeometry( 8, 8, 2, 32 );
		this.coin = new THREE.Mesh( geometry, material );
		this.coin.rotation.x = Math.PI/4;
		this.add(this.coin);
	}

	update(delta){
		this.coin.rotation.z +=  delta;
	}
}