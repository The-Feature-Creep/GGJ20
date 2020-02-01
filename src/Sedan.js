import * as THREE from 'three';
import * as CANNON from 'cannon';

import Car from './Car';

export default class Sedan extends Car {

	getBB() {
		return new CANNON.Vec3(2.5, 2, 4);
	}
	
	makeModel(){
		var body_width = 26;
		var wheel_material = new THREE.MeshPhongMaterial( {color: 0x000000, flatShading: true} );
		var body_material = new THREE.MeshPhongMaterial( {color: this.getColor(), flatShading: true} );
		var window_material = new THREE.MeshBasicMaterial( {color: 0xffffff, flatShading: true});

		//  Wheels
		var wheel_geometry = new THREE.CylinderBufferGeometry( 5, 5, 4, 32 );
	
		let lb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lb_wheel.position.x = -13;
		lb_wheel.position.y = -2
		lb_wheel.position.z = -13;
		lb_wheel.rotation.z += Math.PI/2;
		this.add(lb_wheel);

		let rb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rb_wheel.rotation.z += Math.PI/2;
		rb_wheel.position.x = 13;
		rb_wheel.position.y = -2
		rb_wheel.position.z = -13;
		this.add(rb_wheel);

		let lf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lf_wheel.rotation.z += Math.PI/2;
		lf_wheel.position.x = -13;
		lf_wheel.position.y = -2
		lf_wheel.position.z = 15;
		this.add(lf_wheel);

		let rf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rf_wheel.rotation.z += Math.PI/2;
		rf_wheel.position.x = 13;
		rf_wheel.position.y = -2
		rf_wheel.position.z = 12;
		this.add(rf_wheel);

		var bonnet_shape = new THREE.Shape();
		bonnet_shape.moveTo(0, 0);
		bonnet_shape.lineTo(12, 0);
		bonnet_shape.lineTo(12, 7.5);
		bonnet_shape.lineTo(0, 5);
		var bonnet_extrudeSettings = { depth: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var bonnet_geometry = new THREE.ExtrudeGeometry(bonnet_shape, bonnet_extrudeSettings);

		let bonnet = new THREE.Mesh(bonnet_geometry, body_material);
		bonnet.rotation.y += Math.PI/2;
		bonnet.position.x = -13;
		bonnet.position.y = -2
		bonnet.position.z = 25;
		this.add(bonnet);

		var boot_shape = new THREE.Shape();
		boot_shape.moveTo(0, 0);
		boot_shape.lineTo(12, 0);
		boot_shape.lineTo(12, 8);
		boot_shape.lineTo(0, 6);
		var boot_extrudeSettings = { depth: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var boot_geometry = new THREE.ExtrudeGeometry(boot_shape, boot_extrudeSettings);

		let boot = new THREE.Mesh(boot_geometry, body_material);
		boot.rotation.y -= Math.PI/2;
		boot.position.x = 13;
		boot.position.y = -2
		boot.position.z = -25;
		this.add(boot);

		// Front Body
		var mid1_shape = new THREE.Shape();
		mid1_shape.moveTo(0, 0);
		mid1_shape.lineTo(8, 0);
		mid1_shape.lineTo(8, 13);
		mid1_shape.lineTo(0, 7.5);
		var mid1_extrudeSettings = { depth: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var mid1_geometry = new THREE.ExtrudeGeometry(mid1_shape, mid1_extrudeSettings);

		let mid1 = new THREE.Mesh(mid1_geometry, body_material);
		mid1.rotation.y += Math.PI/2;
		mid1.position.x = -13;
		mid1.position.y = -2;
		mid1.position.z = 13;
		this.add(mid1);

		// Middle Body
		var mid3_geometry = new THREE.BoxGeometry(body_width,13,15);
		var mid3 = new THREE.Mesh(mid3_geometry, body_material);
		mid3.position.y = 6.5;
		mid3.position.y = 4.5;
		mid3.position.z = -2.5;
		this.add(mid3);

		//  Back Body
		var mid2_shape = new THREE.Shape();
		mid2_shape.moveTo(0, 0);
		mid2_shape.lineTo(3, 0);
		mid2_shape.lineTo(3, 10);
		mid2_shape.lineTo(0, 5);
		var mid2_extrudeSettings = { depth: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var mid2_geometry = new THREE.ExtrudeGeometry(mid2_shape, mid2_extrudeSettings);

		let mid2 = new THREE.Mesh(mid2_geometry, body_material);
		mid2.rotation.y -= Math.PI/2;
		mid2.position.x = 13;
		mid2.position.y = 1;
		mid2.position.z = -13;
		this.add(mid2);
		
		// Front Side window
		var window1_shape = new THREE.Shape();
		window1_shape.moveTo(0, 4);
		window1_shape.lineTo(8, 4);
		window1_shape.lineTo(8, 9);
		window1_shape.lineTo(0, 4);
		var window1_extrudeSettings = { depth: body_width+0.2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var window1_geometry = new THREE.ExtrudeGeometry(window1_shape, window1_extrudeSettings);

		let window1 = new THREE.Mesh(window1_geometry, window_material);
		window1.rotation.y += Math.PI/2;
		window1.position.x = -13.1;
		window1.position.y = 1;
		window1.position.z = 13;
		this.add(window1);


		// Middle Side window
		var window2_geometry = new THREE.BoxGeometry(body_width+0.2,5,14.6);
		var window2 = new THREE.Mesh(window2_geometry, window_material);
		window2.position.y = 7.5;
		window2.position.z = -2.5;
		this.add(window2);

		
		// Back Side window
		var window3_shape = new THREE.Shape();
		window3_shape.moveTo(0, 5);
		window3_shape.lineTo(3, 5);
		window3_shape.lineTo(3, 10);
		window3_shape.lineTo(0, 5);
		var window3_extrudeSettings = { depth: body_width+0.2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var window3_geometry = new THREE.ExtrudeGeometry(window3_shape, window3_extrudeSettings);

		let window3 = new THREE.Mesh(window3_geometry, window_material);
		window3.rotation.y -= Math.PI/2;
		window3.position.x = 13;
		window3.position.z = -13;
		this.add(window3);

		
		// Back Window
		var window4_shape = new THREE.Shape();
		window4_shape.moveTo(0, 5);
		window4_shape.lineTo(3, 5);
		window4_shape.lineTo(3, 10);
		window4_shape.lineTo(0, 5);
		var window4_extrudeSettings = { depth: body_width-2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var window4_geometry = new THREE.ExtrudeGeometry(window4_shape, window4_extrudeSettings);

		let window4 = new THREE.Mesh(window4_geometry, window_material);
		window4.rotation.y -= Math.PI/2;
		window4.position.x = 12;
		window4.position.z = -13.61;
		this.add(window4);

		// Front Window
		var window6_shape = new THREE.Shape();
		window6_shape.moveTo(0, 4);
		window6_shape.lineTo(8, 4);
		window6_shape.lineTo(8, 9);
		window6_shape.lineTo(0, 4);
		var window6_extrudeSettings = { depth: body_width-2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var window6_geometry = new THREE.ExtrudeGeometry(window6_shape, window6_extrudeSettings);

		let window6 = new THREE.Mesh(window6_geometry, window_material);
		window6.rotation.y += Math.PI/2;
		window6.position.x = -12;
		window6.position.y = 1.5;
		window6.position.z = 14;
		this.add(window6);

		
		var cylinder_geometry = new  THREE.CylinderBufferGeometry( 0.1, 0.1, 100, 32 );
		var cylinder = new THREE.Mesh(cylinder_geometry, body_material);
		this.add(cylinder);

		this.scale.set(Sedan.SCALE, Sedan.SCALE, Sedan.SCALE);
	}
}

Sedan.SCALE = 0.15;