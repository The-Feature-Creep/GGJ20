import * as THREE from 'three';

import RoadSegment from './RoadSegment';

export default class Coin extends THREE.Object3D {

  constructor() {
    super();

    this.collected = false;
    this.finished = false;

    var geometry = new THREE.CylinderBufferGeometry( 8, 8, 2, 32 );
    geometry.rotateX(Math.PI/2);
    var material = new THREE.MeshPhongMaterial({ color: 0xffd271, flatShading: true });
    this.body = new THREE.Mesh(geometry, material);
    this.add(this.body);

    this.position.y = 1.5;

    let genWidth = RoadSegment.WIDTH * 0.9;
    this.position.x = Math.random() * genWidth - genWidth/2;
    this.body.rotation.y = Math.random() * Math.PI;

    this.scale.set(Coin.SCALE, Coin.SCALE, Coin.SCALE);
  }

  update(delta) {

    this.body.rotation.y += 2 * delta;

    if (this.collected)
    {
      this.position.y += 1;
    }

    if (this.position.y > 20)
      this.finished = true;

  }

  collect() {
    this.collected = true;
  }
}

Coin.SCALE = 0.16;