import * as THREE from 'three';
import Car from './Car';

export default class Truck extends Car{
	makeModel(){
		var body_width = 26;
		var wheel_material = new THREE.MeshPhongMaterial( {color: 0x000000, flatShading: true} );
		var body_material = new THREE.MeshPhongMaterial( {color: 0x555555, flatShading: true} );
		var window_material = new THREE.MeshBasicMaterial( {color: 0xffffff, flatShading: true});

		//  Wheels
		var wheel_geometry = new THREE.CylinderBufferGeometry( 6, 6, 4, 32 );
	
		let lb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lb_wheel.position.x = -13;
		lb_wheel.position.z = -17.5;
		lb_wheel.rotation.z += Math.PI/2;
		this.add(lb_wheel);

		let rb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rb_wheel.rotation.z += Math.PI/2;
		rb_wheel.position.z = -17.5;
		rb_wheel.position.x = 13;
		this.add(rb_wheel);

		let lf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lf_wheel.rotation.z += Math.PI/2;
		lf_wheel.position.z = 22.5;
		lf_wheel.position.x = -13;
		this.add(lf_wheel);

		let rf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rf_wheel.rotation.z += Math.PI/2;
		rf_wheel.position.z = 22.5;
		rf_wheel.position.x = 13;
		this.add(rf_wheel);

		// Bonnet
		var bonnet_shape = new THREE.Shape();
		bonnet_shape.moveTo(0, 0);
		bonnet_shape.lineTo(15, 0);
		bonnet_shape.lineTo(15, 10);
		bonnet_shape.lineTo(0, 8);
		var bonnet_extrudeSettings = { amount: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var bonnet_geometry = new THREE.ExtrudeGeometry(bonnet_shape, bonnet_extrudeSettings);

		let bonnet = new THREE.Mesh(bonnet_geometry, body_material);
		bonnet.rotation.y += Math.PI/2;
		bonnet.position.x = -13;
		bonnet.position.y = 2;
		bonnet.position.z = 32.5;
		this.add(bonnet);

		// Main Body Top
		var main_body_shape = new THREE.Shape();
		main_body_shape.moveTo(0, 0);
		main_body_shape.lineTo(20, 0);
		main_body_shape.lineTo(18, 10);
		main_body_shape.lineTo(3, 10);
		var main_body_extrudeSettings = { amount: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var main_body_geometry = new THREE.ExtrudeGeometry(main_body_shape, main_body_extrudeSettings);

		var main_body = new THREE.Mesh(main_body_geometry, body_material);
		main_body.rotation.y += Math.PI/2;
		main_body.position.x = -13;
		main_body.position.y = 12;
		main_body.position.z = 17.5;
		this.add(main_body);

		// Main Body Bottom
		var main_body_bottom_geometry = new THREE.BoxGeometry(body_width, 10, 20);
		var main_body_bottom = new THREE.Mesh(main_body_bottom_geometry, body_material);
		main_body_bottom.position.y = 7;
		main_body_bottom.position.z = 7.5;
		this.add(main_body_bottom);

		// Boot section
		var boot_bed_geometry = new THREE.BoxGeometry(body_width, 2, 30);
		let boot_bed = new THREE.Mesh(boot_bed_geometry, body_material);
		boot_bed.position.y = 3;
		boot_bed.position.z = -17.5;
		this.add(boot_bed);

		var boot_back_geometry = new THREE.BoxGeometry(body_width, 10, 2);
		let boot_back = new THREE.Mesh(boot_back_geometry, body_material);
		boot_back.position.y = 7;
		boot_back.position.z = -32.5;
		this.add(boot_back);

		var boot_right_geometry = new THREE.BoxGeometry(2, 10, 30);
		let boot_right = new THREE.Mesh(boot_right_geometry, body_material);
		boot_right.position.x = 12;
		boot_right.position.y = 7;
		boot_right.position.z = -17.5;
		this.add(boot_right);

		var boot_left_geometry = new THREE.BoxGeometry(2, 10, 30);
		let boot_left = new THREE.Mesh(boot_left_geometry, body_material);
		boot_left.position.y = 7;
		boot_left.position.x = -12;
		boot_left.position.z = -17.5;
		this.add(boot_left);

		// Windows Front and Back
		var window1_shape = new THREE.Shape();
		window1_shape.moveTo(1, 0);
		window1_shape.lineTo(19, 0);
		window1_shape.lineTo(17, 9);
		window1_shape.lineTo(4, 9);
		var window1_extrudeSettings = { amount: body_width+0.2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var window1_geometry = new THREE.ExtrudeGeometry(window1_shape, window1_extrudeSettings);

		var window1_body = new THREE.Mesh(window1_geometry, window_material);
		window1_body.rotation.y += Math.PI/2;
		window1_body.position.x = -13.1
		window1_body.position.y = 12;
		window1_body.position.z = 17.5;
		this.add(window1_body);

		var window2_shape = new THREE.Shape();
		window2_shape.moveTo(-0.1, 0);
		window2_shape.lineTo(20.1, 0);
		window2_shape.lineTo(18.2, 9);
		window2_shape.lineTo(2.5, 9);
		var window2_extrudeSettings = { amount: body_width-2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var window2_geometry = new THREE.ExtrudeGeometry(window2_shape, window2_extrudeSettings);

		var window2_body = new THREE.Mesh(window2_geometry, window_material);
		window2_body.rotation.y += Math.PI/2;
		window2_body.position.x = -12;
		window2_body.position.y = 12;
		window2_body.position.z = 17.5;
		this.add(window2_body);

		var cylinder_geometry = new  THREE.CylinderBufferGeometry( 0.1, 0.1, 100, 32 );
		var cylinder = new THREE.Mesh(cylinder_geometry, body_material);
		this.add(cylinder);

		this.scale.set(Truck.SCALE, Truck.SCALE, Truck.SCALE);
		
	}
}

Truck.SCALE = 0.15;