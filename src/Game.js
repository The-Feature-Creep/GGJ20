import * as THREE from 'three';

import { OrbitControls } from './libs/OrbitControls.js';

import RoadSegment from './RoadSegment';

var scene, camera, cube, road, controls;

let count = 0;

export default class Game {

  constructor(renderer) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f3f3);
	
    var width = window.innerWidth / 24;
    var height = window.innerHeight / 24;
    camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, -20, 500);
    camera.position.set(0, 10, 10); 
    camera.lookAt(0, 0, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minZoom = 0.5;
    controls.maxZoom = 1;

    let light = new THREE.DirectionalLight(0xffffff, 0.8);
    var ambient = new THREE.AmbientLight(0x333333); // soft white light
    scene.add(light);
    scene.add(ambient);

    var geometry = new THREE.BoxGeometry(3, 3, 3);
    var material = new THREE.MeshPhongMaterial({ color: 0xff896b, flatShading: true });
    cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    for (var i = 0; i < 10; i++)
    {
        var road = new RoadSegment();
        road.position.z = i * RoadSegment.LENGTH;
        scene.add(road);
    }
  }

  update(delta) {
    controls.update();

    count++;

    cube.position.x = Math.sin(count / 8);

    cube.rotation.x += 0.5 * delta;
    cube.rotation.z += 0.5 * delta;
  }

  render(renderer) {
    renderer.render(scene, camera);
  }

}