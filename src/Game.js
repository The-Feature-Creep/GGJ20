import * as THREE from 'three';

var scene, camera, cube;

export default class Game {

  constructor(renderer) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f3f3);

    var width = window.innerWidth / 24;
    var height = window.innerHeight / 24;
    camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, -20, 500);
    camera.position.set(0, 10, 10); 
    camera.lookAt(0, 0, 0);

    let light = new THREE.DirectionalLight(0xffffff, 0.8);
    var ambient = new THREE.AmbientLight(0xcccccc); // soft white light
    scene.add(light);
    scene.add(ambient);

    var geometry = new THREE.BoxGeometry(3, 3, 3);
    var material = new THREE.MeshLambertMaterial({ color: 0xff896b, flatShading: true });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }

  update(delta) {
    cube.rotation.x += 0.03;
    cube.rotation.z += 0.03;
  }

  render(renderer) {
    renderer.render(scene, camera);
  }

}