import * as THREE from 'three';

import RoadSegment from './RoadSegment';

export default class Coin extends THREE.Object3D {

  constructor() {
    super();

    var geometry = new THREE.BoxGeometry(0.6, 3, 3);
    var material = new THREE.MeshPhongMaterial({ color: 0xffff00, flatShading: true });
    this.body = new THREE.Mesh(geometry, material);
    this.add(this.body);

    this.position.y = 1.5;

    let genWidth = RoadSegment.WIDTH * 0.9;
    this.position.x = Math.random() * genWidth - genWidth/2;
    this.body.rotation.y = Math.random() * Math.PI;
  }

  update(delta) {

    this.body.rotation.y += 1.5 * delta;

  }


}