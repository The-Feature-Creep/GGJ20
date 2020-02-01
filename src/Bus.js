import * as THREE from 'three';
import * as CANNON from 'cannon';

import Car from './Car';

export default class Bus extends Car {

	getBB() {
		return new CANNON.Vec3(2.5, 1.8, 7.8);
	}

	makeModel(){
		var body_width = 26;
		var window_width = 10;
		var window_height = 10;
		var wheel_material = new THREE.MeshPhongMaterial( {color: 0x000000, flatShading: true} );
		var body_material = new THREE.MeshPhongMaterial( {color: this.getColor(), flatShading: true} );
		var window_material = new THREE.MeshBasicMaterial( {color: 0xffffff, flatShading: true});

		//  Wheels
		var wheel_geometry = new THREE.CylinderBufferGeometry( 7, 7, 4, 32 );
	
		let lb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lb_wheel.position.x = -13;
		lb_wheel.position.y = 2;
		lb_wheel.position.z = -30;
		lb_wheel.rotation.z += Math.PI/2;
		this.add(lb_wheel);

		let rb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rb_wheel.rotation.z += Math.PI/2;
		rb_wheel.position.z = -30;
		rb_wheel.position.y = 2;
		rb_wheel.position.x = 13;
		this.add(rb_wheel);

		let lf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lf_wheel.rotation.z += Math.PI/2;
		lf_wheel.position.z = 30;
		lf_wheel.position.y = 2;
		lf_wheel.position.x = -13;
		this.add(lf_wheel);

		let rf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rf_wheel.rotation.z += Math.PI/2;
		rf_wheel.position.z = 30;
		rf_wheel.position.y = 2;
		rf_wheel.position.x = 13;
		this.add(rf_wheel);
		
		var shape = new THREE.Shape();
		shape.moveTo( -13, 14 );
		shape.lineTo( 13, 14 );
		shape.lineTo( 13, -14 );
		shape.lineTo( -13, -14 );
		shape.lineTo( -13, 14 );

		var extrudeSettings = {
			steps: 2,
			depth: 100,
			bevelEnabled: true,
			bevelThickness: 2,
			bevelSize: 1,
			bevelOffset: 0,
			bevelSegments: 5
		};

		var body_geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
		var body = new THREE.Mesh(body_geometry, body_material);
		body.position.y = 15;
		body.position.z = -50;
		this.add(body);

		var cylinder_geometry = new  THREE.CylinderBufferGeometry( 0.1, 0.1, 100, 32 );
		var cylinder = new THREE.Mesh(cylinder_geometry, body_material);
		this.add(cylinder);

		var window_geometry = new THREE.BoxGeometry(body_width+2.1, window_height, window_width);

		var window1 = new THREE.Mesh(window_geometry, window_material);
		window1.position.y = 20;
		window1.position.z = -45;
		this.add(window1);

		var window2 = new THREE.Mesh(window_geometry, window_material);
		window2.position.y = 20;
		window2.position.z = -30;
		this.add(window2);

		var window3 = new THREE.Mesh(window_geometry, window_material);
		window3.position.y = 20;
		window3.position.z = -15;
		this.add(window3);

		var window4 = new THREE.Mesh(window_geometry, window_material);
		window4.position.y = 20;
		window4.position.z = 0;
		this.add(window4);

		var window5 = new THREE.Mesh(window_geometry, window_material);
		window5.position.y = 20;
		window5.position.z = 15;
		this.add(window5);

		var window6 = new THREE.Mesh(window_geometry, window_material);
		window6.position.y = 20;
		window6.position.z = 30;
		this.add(window6);

		var door_geometry = new THREE.BoxGeometry(body_width+2.1, 20 , window_width);
		var door = new THREE.Mesh(door_geometry, window_material);
		door.position.y = 15;
		door.position.z = 45;
		this.add(door);

		var main_window_geometry = new THREE.BoxGeometry(body_width, window_height, 104.1);
		var main_window = new THREE.Mesh(main_window_geometry, window_material);
		main_window.position.y = 20;
		this.add(main_window);

		this.scale.set(Bus.SCALE, Bus.SCALE, Bus.SCALE);
	}
}

Bus.SCALE = 0.15;