import * as THREE from 'three';

export default class RoadSegment extends THREE.Object3D {

  constructor() {
    super();

    var geometry = new THREE.PlaneGeometry(20, 20, 32, 32);

    for (var i = 0; i < geometry.vertices.length; i++)
    {
      geometry.vertices[i].z += Math.random() * 1;
    }
    geometry.verticesNeedUpdate = true;
    geometry.colorsNeedUpdate = true;

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var material = new THREE.MeshPhongMaterial({ color: 0xdefec8, side: THREE.DoubleSide, vertexColors: THREE.VertexColors, flatShading: true });
    var plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = -Math.PI / 2;

    this.add(plane);
  }
}