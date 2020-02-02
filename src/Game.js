import * as THREE from 'three';
import * as CANNON from 'cannon';

import { OrbitControls } from './libs/OrbitControls.js';
import CannonDebugRenderer from './utils/CannonDebugRenderer.js';

import RoadSegment from './RoadSegment';
import Car from './Car';
import Coin from './Coin';
import Player from './Player';
import Truck from './Truck';
import Bus from './Bus';
import Sedan from './Sedan';
import Station from './Station';
import ParticleSystem from './ParticleSystem';
import SoundManager from './SoundManager';

const UP = new THREE.Vector3(0, 1, 0);
const EPSILON = 0.00001;
const PHYSICS_TIMESTEP = 1.0 / 60.0;
const PHYSICS_SUBSTEPS = 4;
const ROAD_SEGMENTS = 40;
const COIN_INTERVAL = 20;
const TRAFFIC_INTERVAL = 40;

let keys = { A: 65, W: 87, D: 68, S: 83, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
let input = {};

var $ = require('jquery');
var scene, world, debug, camera, cube, road, controls, player, station, ps;

let lost = false;
let frameCounter = 0;
let particleCounter = 0;
let distanceCounter = 0;
let coinsCollected = 0;
let damageTaken = 0;
let chargeRemaining = 100;
let inStation = false;
let stationInterval = 1000;

let cars = [];
let roads = [];
let coins = [];
let traffic = [];

export default class Game {

  constructor(renderer) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x94d3ac);
  
    var width = window.innerWidth / 24;
    var height = window.innerHeight / 24;
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    //camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, -20, 500);
    camera.position.set(0, 20, -60); 
    camera.lookAt(0, 0, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minZoom = 0.5;
    controls.maxZoom = 1;
    controls.target = new THREE.Vector3(0, 0, 40);

    let light = new THREE.DirectionalLight(0xffffff, 0.8);
    var ambient = new THREE.AmbientLight(0x666666); // soft white light
    scene.add(light);
    scene.add(ambient);

    ps = new ParticleSystem({ particleColor: 0xffffff });
    scene.add(ps);

    this.initPhysics();

    // generate roads
    for (var i = 0; i < ROAD_SEGMENTS; i++)
    {
      var road = new RoadSegment();
      road.position.z = i * RoadSegment.LENGTH;
      scene.add(road);
      roads.push(road);
    }

    // add player
    player = new Player(0, 2, 0);
    scene.add(player);
    cars.push(player);
    world.add(player.body);
    
    station = new Station();
    station.setPosition(500);
    scene.add(station);
    world.addBody(station.body);
    world.addBody(station.pillarBody1);
    world.addBody(station.pillarBody2);
    world.addBody(station.boxBody);

    SoundManager.playDriveSound();
  }

  initPhysics() {
    world = new CANNON.World();
    world.gravity.set(0, -10, 0); // m/s²
    debug = new CannonDebugRenderer(scene, world);

    var groundMaterial = new CANNON.Material("groundMaterial");
    var frictionless_cm = new CANNON.ContactMaterial(groundMaterial, Car.physicsMaterial, {
        friction: 0,
        restitution: 0
    });
    // Create a plane
    var groundBody = new CANNON.Body({
      mass: 0, // mass == 0 makes the body static
      material: groundMaterial
    });
    var plane = new CANNON.Plane();
    groundBody.addShape(plane);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2);
    world.addBody(groundBody);
    world.addContactMaterial(frictionless_cm);
  }

  update(delta) {
    camera.position.set(0, 25, player.position.z - 40);
    controls.target = player.position;
    controls.update();

    ps.update(camera, delta);
    if (particleCounter >= (player.maxDamage - player.damage) && player.damage > player.maxDamage * 0.8)
    {
      particleCounter = 0;
      ps.emit(player.getBonnet().setY(3));
    }

    damageTaken = player.damage;
    chargeRemaining = player.charge/player.maxCharge*100;

    world.step(PHYSICS_TIMESTEP, PHYSICS_SUBSTEPS);
    
    if (Math.floor(player.position.z) > distanceCounter)
    {
      distanceCounter = Math.floor(player.position.z);

      if (distanceCounter % COIN_INTERVAL == 0 && Math.random() > 0.2)
        this.addCoin();
      if (distanceCounter % TRAFFIC_INTERVAL == 0 && Math.random() > 0.4)
        this.addTraffic();

      if (player.position.z - station.position.z > stationInterval/2)
      {
        stationInterval += 100;
        station.setPosition(station.position.z + stationInterval);
      }
    }

    coins.forEach(coin => {
      coin.update(delta);

      if (coin.position.distanceTo(player.position) < 5 && !coin.collected)
      {
        coinsCollected++;
        coin.collect();
      }
      else if (coin.position.distanceTo(player.position) > 300)
        coin.finished = true;
    });

    cars.forEach(car => {
      car.update(delta);
    });

    traffic.forEach(car => {
      if (!car.collided)
        car.drive();

      if (car.position.distanceTo(player.position) > 300)
        car.remove = true;
    });

    roads.forEach(road => {
      var dz = player.position.z - road.position.z;
      if (Math.abs(dz) > ROAD_SEGMENTS * RoadSegment.LENGTH/2)
        road.position.z += RoadSegment.LENGTH * ROAD_SEGMENTS * (dz > 0 ? 1 : -1);
      if (Math.abs(dz) < RoadSegment.LENGTH/2 && road.testPothole(player))
      {
        if (player.getSpeed() > 0) SoundManager.playPotholeSound();
        player.takeDamage(0.1 * player.getSpeed());
      }
    });

    if (station.containsCar(player))
    {
      if (!inStation) {

        $('#recharge').removeClass('disabled');
        $('#repair').removeClass('disabled');
        $('#upgrade-battery').removeClass('disabled');

        if (coinsCollected == 0) {

          $('#recharge').addClass('disabled');
          $('#repair').addClass('disabled');
          $('#upgrade-battery').addClass('disabled');

        } else {

          if (damageTaken == 0) {
            $('#repair').addClass('disabled');
          } else {
            $('#repair').removeClass('disabled');
          }

          if (coinsCollected < 10) {
            $('#upgrade-battery').addClass('disabled');
          }

          if (chargeRemaining == 100) {
            $('#recharge').addClass('disabled');
          } else {
            $('#recharge').removeClass('disabled');
          }

        }

        $('#station-menu').show();
        inStation = true;
      }
    } else {
      inStation = false;
      $('#station-menu').hide();
    }

    if (input[keys.UP] || input[keys.W])
      player.drive();
    else if (input[keys.DOWN] || input[keys.S])
      player.brake();
    if (input[keys.LEFT] || input[keys.A])
      player.turn(-1);
    if (input[keys.RIGHT] || input[keys.D])
      player.turn(1);

    this.cleanup();

    if (frameCounter % 3 == 0)
      this.updateUI();
    frameCounter++;
    particleCounter++;

    SoundManager.setDriveSoundVol(Math.min(1, player.getSpeed() / 4));
    SoundManager.setReverseSoundVol(Math.min(player.reversing ? 1:0, player.getSpeed() / 4));

    if (!lost && (player.damage >= player.maxDamage || player.charge <= 0))
    {
      lost = true;
      this.onLose();
    }
  }

  addCoin() {
    var coin = new Coin();
    coin.position.z = player.position.z + 200;
    coins.push(coin);
    scene.add(coin);
  }

  addTraffic() {
    let lane = Math.floor(Math.random() * 4);
    let x = -12 + lane*8;
    let y = 3;
    let z = player.position.z + 200;
    var type = Math.floor(Math.random() * 3);

    var car = null;

    switch (type) {
      case 0: car = new Truck(x, y, z); break;
      case 1: car = new Bus(x, y, z); break;
      case 2: car = new Sedan(x, y, z); break;
    }

    scene.add(car);
    cars.push(car);
    traffic.push(car);
    world.add(car.body);

    if (lane > 1)
      car.rotateY(Math.PI);
  }

  cleanup() {

    // remove old objects from game

    for (var i = 0; i < cars.length; i++)
    {
      if (cars[i].remove)
      {
        world.remove(cars[i].body);
        scene.remove(cars[i]);
        cars.splice(i, 1);
      }
    }

    for (var i = 0; i < traffic.length; i++)
    {
      if (traffic[i].remove)
        traffic.splice(i, 1);
    }

    for (var i = 0; i < coins.length; i++)
    {
      if (coins[i].finished)
      {
        scene.remove(coins[i]);
        coins.splice(i, 1);
      }
    }
  }

  onLose() {
    SoundManager.playSadTrombone();
    $('.shader').show();
    $('#death-menu').show();
  }

  updateUI() {
    document.getElementById("power-bar").style.width = (player.charge / player.maxCharge * 100) + "%";
    document.getElementById("integrity-bar").style.width = (player.damage / player.maxDamage * 100) + "%";
    document.getElementById("distance").innerHTML = distanceCounter + "m";
    document.getElementById("coins").innerHTML = coinsCollected + " MC";

    if (player.charge / player.maxCharge < 0.2)
      document.getElementById("power-bar").style.backgroundColor = "#ff0000";
    else if (player.charge / player.maxCharge < 0.4)
      document.getElementById("power-bar").style.backgroundColor = "#ffcc00";
    else
      document.getElementById("power-bar").style.backgroundColor = "#26a69a";

    if (player.damage / player.maxDamage > 0.8)
      document.getElementById("integrity-bar").style.backgroundColor = "#ff0000";
    else if (player.damage / player.maxDamage > 0.6)
      document.getElementById("integrity-bar").style.backgroundColor = "#ffcc00";
    else
      document.getElementById("integrity-bar").style.backgroundColor = "#26a69a";
  }

  render(renderer) {
    //debug.update(); // turn off for physics debug rendering
    renderer.render(scene, camera);
  }

  onMouseMove(event) {
    
  }

  onKeyDown(event) {
    input[event.keyCode] = true;
  }

  onKeyUp(event) {
    input[event.keyCode] = false;
  }

  onMouseDown(event) {
    // event.button
  }

}

$(document).on('click', '#recharge', function(e){
	coinsCollected--;
	player.recharge(10);
	if (player.charge >= player.maxCharge) {
		$('#recharge').addClass('disabled');
	}
	if (coinsCollected == 0){
		$('#recharge').addClass('disabled');
		$('#repair').addClass('disabled');
	}
	if (coinsCollected < 10) {
		$('#upgrade-battery').addClass('disabled');
	}
});

$(document).on('click', '#repair', function(e){
	coinsCollected--;
	player.repair(10);
	if (player.damage <= 0 || coinsCollected == 0) {
		$('#repair').addClass('disabled');
	}
	if (coinsCollected == 0){
		$('#recharge').addClass('disabled');
		$('#repair').addClass('disabled');
	}
	if (coinsCollected < 10) {
		$('#upgrade-battery').addClass('disabled');
	}
});

$(document).on('click', '#upgrade-battery', function(e){
	coinsCollected -= 10;
	player.maxCharge+=50;
	if (coinsCollected < 10) {
		$('#upgrade-battery').addClass('disabled');
	}
	if (coinsCollected == 0){
		$('#recharge').addClass('disabled');
		$('#repair').addClass('disabled');
		$('#upgrade-battery').addClass('disabled');
	}
});