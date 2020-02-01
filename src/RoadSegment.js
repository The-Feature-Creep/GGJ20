import * as THREE from 'three';
import noise from './utils/perlin';

export default class RoadSegment extends THREE.Object3D {

  constructor() {
    super();

    noise.seed(Math.random());

    var geometry = new THREE.PlaneGeometry(RoadSegment.WIDTH, RoadSegment.LENGTH, 32, 32);

    console.log(geometry.vertices.length);

    for (var i = 0; i <= 32; i++)
    {
      for (var j = 0; j <= 32; j++)
      {
        var value = noise.simplex2(i / 12, j / 12) + 0.5;

        if (i < 4 || j < 4 || i > 28 || j > 28)
        {
          value = 0;
        }

        geometry.vertices[i * 33 + j].z += Math.min(0, value);
      }
    }

    geometry.faces.forEach(f => {
      const a = geometry.vertices[f.a];
      const b = geometry.vertices[f.b];
      const c = geometry.vertices[f.c];

      const avgz = (a.z+b.z+c.z)/3;

      if (avgz < 0) f.color.set(0xcd6684);
      else f.color.set(0x6f5a7e);
    });

    geometry.verticesNeedUpdate = true;
    geometry.colorsNeedUpdate = true;

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, vertexColors: THREE.VertexColors, flatShading: true });
    var plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = -Math.PI / 2;

    this.add(plane);
  }
}

RoadSegment.WIDTH = 20;
RoadSegment.LENGTH = 20;