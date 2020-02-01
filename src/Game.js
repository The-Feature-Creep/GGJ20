import * as THREE from 'three';

import { OrbitControls } from './libs/OrbitControls.js';

import Car from './Car.js';
import Coin from './Coin.js';
import Player from './Player.js';
import Truck from './Truck.js';
import Bus from './Bus.js';

var scene, camera, controls, coin;

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

	var car = new Car();
	scene.add(car);

	// var player = new Player();
	// scene.add(player);

	var truck = new Truck();
	scene.add(truck);

	// var bus = new Bus();
	// scene.add(bus);

	// coin = new Coin();
	// scene.add(coin);
  }

  update(delta) {
	controls.update();
	// coin.update(delta);
	    
  }

  render(renderer) {
    renderer.render(scene, camera);
  }

}