import * as THREE from 'three';
import noise from './utils/perlin';

export default class RoadSegment extends THREE.Object3D {

  constructor() {
    super();

    noise.seed(Math.random());

    var geometry = new THREE.PlaneGeometry(RoadSegment.WIDTH, RoadSegment.LENGTH, RoadSegment.WIDTH_SEGMENTS, RoadSegment.LENGTH_SEGMENTS);

    console.log(geometry.vertices.length);

    for (var i = 0; i <= RoadSegment.LENGTH_SEGMENTS; i++)
    {
      for (var j = 0; j <= RoadSegment.WIDTH_SEGMENTS; j++)
      {
        var value = noise.simplex2(i / 24, j / 24) + 0.8;

        if (i < 4 || i > 28)
        {
          value = 0;
        }

        value = Math.min(0, value * 3);

        // lines
        if ((i > 4 && i < 16 || j == 32) && j % 16 == 0 && j > 0 && j < RoadSegment.WIDTH_SEGMENTS && value == 0) value = 0.1;

        geometry.vertices[i * (RoadSegment.WIDTH_SEGMENTS + 1) + j].z += value;
      }
    }

    geometry.faces.forEach(f => {
      const a = geometry.vertices[f.a];
      const b = geometry.vertices[f.b];
      const c = geometry.vertices[f.c];

      const avgz = (a.z+b.z+c.z)/3;

      if (avgz < 0) f.color.set(RoadSegment.POTHOLE_COLOR);
      else if (avgz > 0) f.color.set(RoadSegment.LINE_COLOR);
      else f.color.set(RoadSegment.ROAD_COLOR);
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

RoadSegment.WIDTH = 32;
RoadSegment.LENGTH = 20;
RoadSegment.WIDTH_SEGMENTS = 64;
RoadSegment.LENGTH_SEGMENTS = 32;
RoadSegment.ROAD_COLOR = 0x6c5b7b;
RoadSegment.POTHOLE_COLOR = 0xc06c84;
RoadSegment.LINE_COLOR = 0xf6c3e5;