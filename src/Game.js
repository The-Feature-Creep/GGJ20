import * as THREE from 'three';

import { OrbitControls } from './libs/OrbitControls.js';

import Box from './Box';
import Car from './Car.js';

var scene, camera, boxes, controls;

export default class Game {

  constructor(renderer) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f3f3);
	
    var width = window.innerWidth / 24;
    var height = window.innerHeight / 24;
    camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, -20, 1000);
    camera.position.set(0, 30, 30); 
    camera.lookAt(0, 0, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minZoom = 0.5;
    controls.maxZoom = 5;

    let light = new THREE.DirectionalLight(0xffffff, 0.8);
    var ambient = new THREE.AmbientLight(0xcccccc); // soft white light
    scene.add(light);
	scene.add(ambient);

	let car = new Car();
	scene.add(car);

	
	
  }

  update(delta) {
	controls.update();
	    
  }

  render(renderer) {
    renderer.render(scene, camera);
  }

}