import * as THREE from 'three';
import * as CANNON from 'cannon';

export default class Car extends THREE.Object3D {

  constructor(x, y, z) {
    super();

    this.makeModel();

    this.position.y = 1.5;

    this.body = new CANNON.Body({
      mass: 20, // kg
      position: new CANNON.Vec3(x, y, z), // m
      shape: new CANNON.Box(this.getBB()),
      material: Car.physicsMaterial,
      linearDamping: 0.5,
      angularDamping: 0.6
    });
  }

  makeModel() {

  }

  getBB() {
    return new CANNON.Vec3(1, 1, 1);
  }

  update(delta) {
    this.position.x = this.body.position.x;
    this.position.y = this.body.position.y - 1;
    this.position.z = this.body.position.z;
    this.quaternion.x = this.body.quaternion.x;
    this.quaternion.y = this.body.quaternion.y;
    this.quaternion.z = this.body.quaternion.z;
    this.quaternion.w = this.body.quaternion.w;
  }

  drive(dir = 1) {
    var rot = this.body.quaternion.toAxisAngle(new CANNON.Vec3(0, 0, 1));
    var vector = new CANNON.Vec3();
    this.body.quaternion.toEuler(vector);
    var rx = Math.sin(vector.y);
    var rz = Math.cos(vector.y);
    this.body.applyForce(new CANNON.Vec3(rx * 500 * dir, 0, rz * 500 * dir), this.body.position);
  }

  turn(dir) {
    let speed = Math.min(this.body.velocity.length() * 8, 20 - this.body.velocity.length());
    //if (this.body.velocity.length() < 1)
      //speed = 0;
    var quat = new CANNON.Quaternion();
    quat.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI/2 * dir * 0.001 * speed);
    this.body.quaternion = quat.mult(this.body.quaternion);
  }

  brake() {
    this.drive(-0.5);
  }
}

Car.physicsMaterial = new CANNON.Material("carMaterial");