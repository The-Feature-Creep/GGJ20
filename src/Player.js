import * as THREE from 'three';
import Car from './Car';

export default class Player extends Car{
	constructor(){
		super();
		var body_length = 40;
		var body_width = 25;
		var wheel_material = new THREE.MeshPhongMaterial( {color: 0x000000, flatShading: true} );
		var body_material = new THREE.MeshPhongMaterial( {color: 0x555555, flatShading: true} );
		var window_material = new THREE.MeshBasicMaterial( {color: 0xffffff, flatShading: true});

		//  Wheels
		var wheel_geometry = new THREE.CylinderBufferGeometry( 6, 6, 4, 32 );
	
		let lb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lb_wheel.rotation.z += Math.PI/2;
		this.add(lb_wheel);

		let rb_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rb_wheel.rotation.z += Math.PI/2;
		rb_wheel.position.x = body_width;
		this.add(rb_wheel);

		let lf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		lf_wheel.rotation.z += Math.PI/2;
		lf_wheel.position.z = body_length;
		this.add(lf_wheel);

		let rf_wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		rf_wheel.rotation.z += Math.PI/2;
		rf_wheel.position.z = body_length;
		rf_wheel.position.x = body_width;
		this.add(rf_wheel);

		// Body
		var bonnet_shape = new THREE.Shape();
		bonnet_shape.moveTo(0, 0);
		bonnet_shape.lineTo(25, 0);
		bonnet_shape.lineTo(25, 14);
		bonnet_shape.lineTo(-2, 6);
		var bonnet_extrudeSettings = { amount: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var bonnet_geometry = new THREE.ExtrudeGeometry(bonnet_shape, bonnet_extrudeSettings);

		let bonnet = new THREE.Mesh(bonnet_geometry, body_material);
		bonnet.rotation.y += Math.PI/2;
		bonnet.position.y = 2;
		bonnet.position.z = 50;
		this.add(bonnet);

		var boot_shape = new THREE.Shape();
		boot_shape.moveTo(0, 0);
		boot_shape.lineTo(35, 0);
		boot_shape.lineTo(35, 14);
		boot_shape.lineTo(-2, 8);
		var boot_extrudeSettings = { amount: body_width, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var boot_geometry = new THREE.ExtrudeGeometry(boot_shape, boot_extrudeSettings);

		let boot = new THREE.Mesh(boot_geometry, body_material);
		boot.rotation.y -= Math.PI/2;
		boot.position.y = 2;
		boot.position.z = -10;
		boot.position.x = 25;
		this.add(boot);
		
		// Front Window
		var fw_geometry = new THREE.PlaneBufferGeometry( body_width-2, 20, 32 );
		
		var fw_window = new THREE.Mesh( fw_geometry, window_material );
		fw_window.position.y = 13.1;
		fw_window.position.z = 35;
		fw_window.position.x = 12.5;
		fw_window.rotation.x -= Math.PI/2.45;
		this.add( fw_window );

		// Side Front windows
		var sfw_shape = new THREE.Shape();
		sfw_shape.moveTo(0, 0);
		sfw_shape.lineTo(15, 0);
		sfw_shape.lineTo(15, 8);
		sfw_shape.lineTo(-2, 3);
		var sfw_extrudeSettings = { amount: body_width+0.2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var sfw_geometry = new THREE.ExtrudeGeometry(sfw_shape, sfw_extrudeSettings);

		let sfw_window = new THREE.Mesh(sfw_geometry, window_material);
		sfw_window.rotation.y += Math.PI/2;
		sfw_window.position.y = 7;
		sfw_window.position.z = 40;
		sfw_window.position.x = -0.1
		this.add(sfw_window);

		// Side Back windows
		var sbw_shape = new THREE.Shape();
		sbw_shape.moveTo(0, 0);
		sbw_shape.lineTo(15, 0);
		sbw_shape.lineTo(15, 8);
		sbw_shape.lineTo(-2, 5.5);
		var sbw_extrudeSettings = { amount: body_width+0.2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
		var sbw_geometry = new THREE.ExtrudeGeometry(sbw_shape, sbw_extrudeSettings);

		let sbw_window = new THREE.Mesh(sbw_geometry, window_material);
		sbw_window.rotation.y -= Math.PI/2;
		sbw_window.position.y = 7;
		sbw_window.position.z = 9.9;
		sbw_window.position.x = 25.1;
		this.add(sbw_window);
	}
}