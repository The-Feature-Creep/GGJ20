import * as THREE from 'three';

export default class Car extends THREE.Object3D {

  constructor() {
    super();

    var geometry = new THREE.BoxGeometry(3, 3, 6);
    var material = new THREE.MeshPhongMaterial({ color: 0xff0000, flatShading: true });
    let cube = new THREE.Mesh(geometry, material);
    this.add(cube);

    this.position.y = 1.5;
  }


}