import * as THREE from 'three';
import * as CANNON from 'cannon';

export default class Car extends THREE.Object3D {

  constructor() {
    super();

    this.makeModel();

    this.position.y = 1.5;

    var radius = 0.7; // m
    this.body = new CANNON.Body({
      mass: 150, // kg
      position: new CANNON.Vec3(5, 0, 0), // m
      shape: new CANNON.Box(new CANNON.Vec3(radius, radius, radius)),
      material: new CANNON.Material("carMaterial"),
      linearDamping: 0.98
    });
  }

  makeModel() {

  }

  update(delta) {
    this.position.x = this.body.position.x;
    this.position.y = this.body.position.y;
    this.position.z = this.body.position.z;
    this.quaternion.x = this.body.quaternion.x;
    this.quaternion.y = this.body.quaternion.y;
    this.quaternion.z = this.body.quaternion.z;
    this.quaternion.w = this.body.quaternion.w;
  }
}