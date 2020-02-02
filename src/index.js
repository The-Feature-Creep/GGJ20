import * as THREE from 'three';

import Stats from './libs/stats.module.js';

import Game from './Game';

import './../node_modules/materialize-css/dist/css/materialize.css';
import './../node_modules/materialize-css/dist/js/materialize';
import './../node_modules/jquery/dist/jquery';
import './ui/css/styles.css';

var $ = require('jquery');
var container, stats, renderer, game;
let lastTime = 0.0;


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
  //container.appendChild( stats.domElement );
  //
  game = new Game(renderer);

  window.addEventListener('keydown', handleKeyDown, false);
  window.addEventListener('keyup', handleKeyUp, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mousedown', onMouseDown, false);

  console.log("v1.0.1");
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

// Jquery
$(document).on('click', '#start-game', function(){
	$('body').addClass('loaded');
	init();
	update(lastTime);
	setTimeout(function () {
		$('#loader-wrapper').hide();
		$('#start-menu').hide();
	}, 1500);
});

$(document).on('click', '#end-game', function(){
	$('body').removeClass('loaded');
	$('#loader-wrapper').show();
	$('#start-menu').show();
	$('.shader').hide();
	$('#in-game-menu').hide();
	window.location.href = '/';
});

$(document).on('click', '#close-station-menu', function(){
	$('.shader').hide();
	$('#station-menu').hide();
});

$(document).on('click', '#show-in-game-menu', function(){
	$('.shader').show();
	$('#in-game-menu').show();
});

$(document).on('click', '#hide-in-game-menu', function(){
	$('.shader').hide();
	$('#in-game-menu').hide();
});

$(document).on('click', '#show-credits', function(){
	$('#menu-card').hide();
	$('#credits-card').show();
});

$(document).on('click', '#hide-credits', function(){
	$('#menu-card').show();
	$('#credits-card').hide();
});