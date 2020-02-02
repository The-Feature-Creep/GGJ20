import * as THREE from 'three';
import noise from './utils/perlin';

export default class RoadSegment extends THREE.Object3D {

  constructor() {
    super();

    noise.seed(Math.random());

    this.geometry = new THREE.PlaneGeometry(RoadSegment.WIDTH, RoadSegment.LENGTH, RoadSegment.WIDTH_SEGMENTS, RoadSegment.LENGTH_SEGMENTS);

    for (var i = 0; i <= RoadSegment.LENGTH_SEGMENTS; i++)
    {
      for (var j = 0; j <= RoadSegment.WIDTH_SEGMENTS; j++)
      {
        var value = this.getValue(i, j);

        // lines
        if ((i > 4 && i < 16 || j == 32) && j % 16 == 0 && j > 0 && j < RoadSegment.WIDTH_SEGMENTS && value == 0) value = 0.01;

        this.geometry.vertices[i * (RoadSegment.WIDTH_SEGMENTS + 1) + j].z += value;
      }
    }

    this.geometry.faces.forEach(f => {
      const a = this.geometry.vertices[f.a];
      const b = this.geometry.vertices[f.b];
      const c = this.geometry.vertices[f.c];

      const avgz = (a.z+b.z+c.z)/3;

      if (avgz < 0) f.color.set(RoadSegment.POTHOLE_COLOR);
      else if (avgz > 0) f.color.set(RoadSegment.LINE_COLOR);
      else f.color.set(RoadSegment.ROAD_COLOR);
    });

    this.geometry.verticesNeedUpdate = true;
    this.geometry.colorsNeedUpdate = true;

    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();

    var material = new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors, flatShading: true });
    var plane = new THREE.Mesh(this.geometry, material);

    plane.rotation.x = -Math.PI / 2;

    this.add(plane);
  }

  testPothole(car) {

    // test each wheel for collision with pothole
    if (this.testPosition(car.getWheelFL()) || this.testPosition(car.getWheelFR()) 
      || this.testPosition(car.getWheelBL()) || this.testPosition(car.getWheelBR()))
      car.takeDamage(0.2);

  }

  testPosition(position) {
    var xx = (position.x - this.position.x) + RoadSegment.WIDTH / 2;
    var zz = (position.z - this.position.z) + RoadSegment.LENGTH / 2;

    var xxx = (xx / RoadSegment.WIDTH) * RoadSegment.WIDTH_SEGMENTS;
    var zzz = (zz / RoadSegment.LENGTH) * RoadSegment.LENGTH_SEGMENTS;

    var index = Math.floor(zzz) * (RoadSegment.WIDTH_SEGMENTS + 1) + Math.floor(xxx);
    var v = false;

    if (index >= 0 && index < this.geometry.vertices.length)
      v = this.geometry.vertices[index].z;

    return v < 0;
  }

  getValue(x, y) {
    var value = noise.simplex2(x / 24, y / 24) + 0.8;

    if (x < 4 || x > 28)
    {
      value = 0;
    }

    value = Math.min(0, value * 3);

    return value;
  }
}

RoadSegment.WIDTH = 32;
RoadSegment.LENGTH = 20;
RoadSegment.WIDTH_SEGMENTS = 64;
RoadSegment.LENGTH_SEGMENTS = 32;
RoadSegment.ROAD_COLOR = 0x6c5b7b;
RoadSegment.POTHOLE_COLOR = 0xc06c84;
RoadSegment.LINE_COLOR = 0xf6c3e5;