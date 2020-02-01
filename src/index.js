import * as THREE from 'three';

import Stats from './libs/stats.module.js';

import Game from './Game';

var container, stats, renderer, game;
let lastTime = 0.0;

init();
update(lastTime);

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
  game = new Game(renderer);

  window.addEventListener('keydown', handleKeyDown, false);
  window.addEventListener('keyup', handleKeyUp, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mousedown', onMouseDown, false);
}

function update(time) {
  requestAnimationFrame(update);
  game.update(Math.min((time - lastTime) / 1000, 1 / 60));
  render();
  stats.update();
  lastTime = time;
}

function render() {
  game.render(renderer);
}

function handleKeyDown(event) {
  game.onKeyDown(event);
}

function handleKeyUp(event) {
  game.onKeyUp(event);
}

function onMouseMove(event) {
  game.onMouseMove(event);
}

function onMouseDown(event) {
  game.onMouseDown(event);
}