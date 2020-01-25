import * as THREE from 'three';

import Stats from './libs/stats.module.js';

var container, stats, renderer

init();

function init() {
  container = document.getElementById( 'container' );
  //
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  //
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );
  //
}