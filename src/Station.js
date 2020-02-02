import * as THREE from 'three';

export default class Station extends THREE.Object3D {
	constructor(){
		super();
		var body_material = new THREE.MeshPhongMaterial( {color: 0x000000, flatShading: true} );
		var wall_material = new THREE.MeshPhongMaterial( {color: 0xf7d695, flatShading: true} );


		var shop_shape = new THREE.Shape();
		shop_shape.moveTo(0, 0);
		shop_shape.lineTo(20, 0);
		shop_shape.lineTo(20, 16);
		shop_shape.lineTo(0, 12);
		var extrudeSettings = { depth: 30, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var shop_geometry = new THREE.ExtrudeGeometry(shop_shape, extrudeSettings);

		let shop = new THREE.Mesh(shop_geometry, wall_material);
		shop.position.x = -20;
		shop.position.z = -15;
		this.add(shop);


		var roof_shape = new THREE.Shape();
		roof_shape.moveTo(0, 0);
		roof_shape.lineTo(20, 0);
		roof_shape.lineTo(20, 1);
		roof_shape.lineTo(0, 2);
		var roof_geometry = new THREE.ExtrudeGeometry(roof_shape, extrudeSettings);

		let shop_roof = new THREE.Mesh(roof_geometry, wall_material);
		shop_roof.position.y = 10
		shop_roof.position.z = -15;
		this.add(shop_roof);

		var pillar_geometry = new THREE.CylinderBufferGeometry(1, 1, 10, 32);
		
		let pillar1 = new THREE.Mesh(pillar_geometry, wall_material);
		pillar1.position.y = 5;
		pillar1.position.x = 18;
		pillar1.position.z = 13
		this.add(pillar1);

		let pillar2 = new THREE.Mesh(pillar_geometry, wall_material);
		pillar2.position.y = 5;
		pillar2.position.x = 18;
		pillar2.position.z = -13
		this.add(pillar2);




		var cylinder_geometry = new  THREE.CylinderBufferGeometry( 0.1, 0.1, 100, 32 );
		var cylinder = new THREE.Mesh(cylinder_geometry, body_material);
		this.add(cylinder);
	}
}