import * as THREE from 'three';

import RoadSegment from './RoadSegment';

export default class Coin extends THREE.Object3D {

  constructor() {
    super();

    this.collected = false;
    this.finished = false;
    this.counter = 0;

    var geometry = new THREE.CylinderBufferGeometry( 8, 8, 2, 32 );
    geometry.rotateX(Math.PI/2);
    this.material = new THREE.MeshPhongMaterial({ color: 0xffd271, flatShading: true, transparent: true });
    this.body = new THREE.Mesh(geometry, this.material);
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
      var s = Coin.SCALE + this.counter / 50;
      this.scale.set(s, s, s);
      this.material.opacity = 1 - this.counter / 20;
    }
    else
    {
      this.position.y = 2 + Math.sin(this.counter / 8) / 2;
    }

    if (this.position.y > 20)
      this.finished = true;

    this.counter++;

  }

  collect() {
    this.collected = true;
    this.counter = 0;
  }
}

Coin.SCALE = 0.16;