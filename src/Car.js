import * as THREE from 'three';
import * as CANNON from 'cannon';

import { BasicShader } from './libs/BasicShader.js';

const UP = new THREE.Vector3(0, 1, 0);

export default class Car extends THREE.Object3D {

  constructor(x, y, z) {
    super();

    this.shader = {
      uniforms: {
        "color": { value: new THREE.Color(this.getColor()) },
        "amount": { value: 0.0 }
      },
      vertexShader: BasicShader.vertexShader,
      fragmentShader: BasicShader.fragmentShader
    };

    this.position.y = 1.5;
    this.remove = false;
    this.maxSpeed = 300;
    this.collided = false;
    this.reversing = false;
    this.wheel1 = null;
    this.wheel2 = null;
    this.wheel3 = null;
    this.wheel4 = null;
    this.wheelRot = 0;
    this.maxDamage = 100;
    this.damage = 0;
    this.maxCharge = 100;
    this.charge = this.maxCharge;

    this.makeModel();

    this.body = new CANNON.Body({
      mass: this.getMass(), // kg
      position: new CANNON.Vec3(x, y, z), // m
      shape: new CANNON.Box(this.getBB()),
      material: Car.physicsMaterial,
      linearDamping: 0.4,
      angularDamping: 0.6
    });

    setTimeout(() => {
      this.body.addEventListener("collide", (e) => {
        var relativeVelocity = e.contact.getImpactVelocityAlongNormal();
        if (relativeVelocity >= 0.5)
          this.takeDamage(relativeVelocity);
      });
    }, 1000);
  }

  takeDamage(amount) {
    if (amount > 0)
      this.shader.uniforms["amount"].value = 1.0;

    this.collided = true;
    this.damage += amount;

    if (this.damage > this.maxDamage)
      this.damage = this.maxDamage;
  }

  getMass() {
    return 25;
  }

  makeModel() {

  }

  getColor() {
    let colors = [0xff677d, 0x61d4b3, 0x9399ff, 0x8cba51, 0xf6f4e6, 0xffcc00];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getBB() {
    return new CANNON.Vec3(1, 1, 1);
  }

  rotateX(v) {
    var quat = new CANNON.Quaternion();
    quat.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), v);
    this.body.quaternion = quat.mult(this.body.quaternion);
  }

  rotateY(v) {
    var quat = new CANNON.Quaternion();
    quat.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), v);
    this.body.quaternion = quat.mult(this.body.quaternion);
  }

  rotateZ(v) {
    var quat = new CANNON.Quaternion();
    quat.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), v);
    this.body.quaternion = quat.mult(this.body.quaternion);
  }

  getWheelFR() {
    return this.calcRotation(3.4, 1.8);
  }

  getWheelFL() {
    return this.calcRotation(3.4, -1.8);
  }

  getWheelBR() {
    return this.calcRotation(-2.6, 1.8);
  }

  getWheelBL() {
    return this.calcRotation(-2.6, -1.8);
  }

  calcRotation(px, pz) {
    var vector = new CANNON.Vec3();
    this.body.quaternion.toEuler(vector);
    var s = Math.cos(vector.y);
    var c = Math.sin(vector.y);
    var nx = px * c - pz * s;
    var nz = px * s + pz * c;
    return this.position.clone().add(new THREE.Vector3(nx, 0, nz));
  }

  update(delta) {
    this.shader.uniforms["amount"].value *= 0.7 - delta;

    this.position.x = this.body.position.x;
    this.position.y = this.body.position.y - 1;
    this.position.z = this.body.position.z;
    this.quaternion.x = this.body.quaternion.x;
    this.quaternion.y = this.body.quaternion.y;
    this.quaternion.z = this.body.quaternion.z;
    this.quaternion.w = this.body.quaternion.w;

    if (this.wheel1 != null)
      this.wheel1.rotation.y = this.wheelRot;
    if (this.wheel2 != null)
      this.wheel2.rotation.y = this.wheelRot;
  }

  drive(dir = 1) {
    var vector = new CANNON.Vec3();
    this.body.quaternion.toEuler(vector);
    var rx = Math.sin(vector.y);
    var rz = Math.cos(vector.y);
    this.reversing = dir < 0;
    this.body.applyForce(new CANNON.Vec3(rx * this.maxSpeed * dir, 0, rz * this.maxSpeed * dir), this.body.position);

    this.wheelRot *= 0.75;
    if (this.charge > 0)
      this.charge -= 0.04;
  }

  turn(dir) {
    var t = -Math.PI/4 * dir;
    this.wheelRot += (t - this.wheelRot)/8;

    let speed = Math.min(this.body.velocity.length() * 8, 20 - this.body.velocity.length());
    var quat = new CANNON.Quaternion();
    if (this.reversing)
      dir = -dir;
    quat.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -dir * speed * 0.0015);
    this.body.quaternion = quat.mult(this.body.quaternion);
  }

  getSpeed() {
    let speed = this.body.velocity.length();
    if (speed < 0.1) 
      return 0;
    return speed;
  }

  brake() {
    this.drive(-0.5);
  }

  recharge(amount) {
    this.charge += amount;
    if (this.charge > this.maxCharge)
      this.charge = this.maxCharge;
  }
}

Car.physicsMaterial = new CANNON.Material("carMaterial");