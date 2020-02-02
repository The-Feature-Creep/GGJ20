import * as THREE from 'three';
import * as CANNON from 'cannon';

export default class Station extends THREE.Object3D {

  constructor(){
    super();

    this.position.x = -45;

    var roof_material = new THREE.MeshPhongMaterial( {color: 0x333333, flatShading: true} );
    var pillar_material = new THREE.MeshPhongMaterial( {color: 0x999999, flatShading: true} );
    var window_material = new THREE.MeshPhongMaterial( {color: 0xffffff, flatShading: true} );
    var station_material = new THREE.MeshPhongMaterial( {color: 0xffffff, flatShading: true} );
    var station_top_material = new THREE.MeshPhongMaterial( {color: 0xff677d, flatShading: true} );
    var wall_material = new THREE.MeshPhongMaterial( {color: 0xf8c3af, flatShading: true} );
    var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff5d6c } );


    var shop_shape = new THREE.Shape();
    shop_shape.moveTo(0, 0);
    shop_shape.lineTo(20, 0);
    shop_shape.lineTo(20, 16);
    shop_shape.lineTo(0, 12);
    var extrudeSettings = { depth: 30, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 0, bevelThickness: 1 };
    var shop_geometry = new THREE.ExtrudeGeometry(shop_shape, extrudeSettings);

    let shop = new THREE.Mesh(shop_geometry, wall_material);
    shop.position.x = -20;
    shop.position.z = -15;
    this.add(shop);


    var roof_shape = new THREE.Shape();
    roof_shape.moveTo(0, 0);
    roof_shape.lineTo(20, 0);
    roof_shape.lineTo(20, 1);
    roof_shape.lineTo(0, 2);
    var roof_geometry = new THREE.ExtrudeGeometry(roof_shape, extrudeSettings);

    let shop_roof = new THREE.Mesh(roof_geometry, roof_material);
    shop_roof.position.y = 10
    shop_roof.position.z = -15;
    this.add(shop_roof);

    var pillar_geometry = new THREE.CylinderBufferGeometry(1, 1, 10, 32);
    
    let pillar1 = new THREE.Mesh(pillar_geometry, pillar_material);
    pillar1.position.y = 5;
    pillar1.position.x = 18;
    pillar1.position.z = 13
    this.add(pillar1);

    let pillar2 = new THREE.Mesh(pillar_geometry, pillar_material);
    pillar2.position.y = 5;
    pillar2.position.x = 18;
    pillar2.position.z = -13
    this.add(pillar2);

    var charge_geometry = new THREE.BoxGeometry(2,6,4);
    var charge_top_geometry = new THREE.CylinderGeometry(1.5,1.5,1.8,32);
    
    var charge1_top = new THREE.Mesh(charge_top_geometry, station_top_material);
    charge1_top.rotation.z += Math.PI/2;
    charge1_top.position.y = 6;
    charge1_top.position.x = 18;
    charge1_top.position.z = 6
    this.add(charge1_top);
    
    var charge2_top = new THREE.Mesh(charge_top_geometry, station_top_material);
    charge2_top.rotation.z += Math.PI/2;
    charge2_top.position.y = 6;
    charge2_top.position.x = 18;
    charge2_top.position.z = -6
    this.add(charge2_top);

    var charge1 = new THREE.Mesh(charge_geometry, station_material);
    charge1.position.y = 3;
    charge1.position.x = 18;
    charge1.position.z = -6
    this.add(charge1);

    var charge2 = new THREE.Mesh(charge_geometry, station_material);
    charge2.position.y = 3;
    charge2.position.x = 18;
    charge2.position.z = 6
    this.add(charge2);

    var loader = new THREE.FontLoader();
    loader.load( 'fonts/helvetiker_bold.typeface.json',  ( font ) => {
      var textGeo1 = new THREE.TextGeometry( "Charge 'n  Repair", {
        font: font,
        size: 2.3,
        height: 2,

      } );
      

      var text1 = new THREE.Mesh( textGeo1, textMaterial );
      text1.rotation.y += Math.PI/2;
      text1.position.x = -1.8;
      text1.position.y = 13;
      text1.position.z = 14;
      this.add(text1);

      var textGeo2 = new THREE.TextGeometry( "Charge", {
        font: font,
        size: 2.3,
        height: 2,
      } );

      var text2 = new THREE.Mesh( textGeo2, textMaterial );
      text2.rotation.y += Math.PI;
      text2.position.x = -3;
      text2.position.y = 9;
      text2.position.z = -13.1;
      this.add(text2);

      var textGeo3 = new THREE.TextGeometry( "'n ", {
        font: font,
        size: 2.3,
        height: 2,
      } );

      var text3 = new THREE.Mesh( textGeo3, textMaterial );
      text3.rotation.y += Math.PI;
      text3.position.x = -7;
      text3.position.y = 6;
      text3.position.z = -13.1;
      this.add(text3);

      var textGeo4 = new THREE.TextGeometry( "Repair!", {
        font: font,
        size: 2.3,
        height: 2,
      } );

      var text4 = new THREE.Mesh( textGeo4, textMaterial );
      text4.rotation.y += Math.PI;
      text4.position.x = -3.5;
      text4.position.y = 3;
      text4.position.z = -13.1;
      this.add(text4);
    } );

    var door_geometry = new THREE.BoxGeometry(1, 6, 4);
    var door = new THREE.Mesh(door_geometry, window_material);
    door.position.x = -0.49;
    door.position.y = 3;
    this.add(door);

    var window1_geometry = new THREE.BoxGeometry(1, 5, 8);
    var window1 = new THREE.Mesh(window1_geometry, window_material);
    window1.position.x = -0.49;
    window1.position.y = 4;
    window1.position.z = -8;
    this.add(window1);
    
    var cylinder_geometry = new  THREE.CylinderBufferGeometry( 0.1, 0.1, 100, 32 );
    var cylinder = new THREE.Mesh(cylinder_geometry, window_material);
    this.add(cylinder);

    this.body = new CANNON.Body({
      mass: 0, // kg
      position: new CANNON.Vec3(this.position.x - 10, 6, this.position.z), // m
      shape: new CANNON.Box(new CANNON.Vec3(10, 10, 16)),
      material: new CANNON.Material("stationMaterial")
    });

    let cylinderShape = new CANNON.Cylinder(1, 1, 10, 8);
    var quat = new CANNON.Quaternion();
    quat.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2);
    var translation = new CANNON.Vec3(0,0,0);
    cylinderShape.transformAllPoints(translation, quat);

    this.pillarBody1 = new CANNON.Body({
      mass: 0, // kg
      position: new CANNON.Vec3(this.position.x + 18, 4.5, this.position.z + 13), // m
      shape: cylinderShape,
      material: new CANNON.Material("stationMaterial")
    });

    this.pillarBody2 = new CANNON.Body({
      mass: 0, // kg
      position: new CANNON.Vec3(this.position.x + 18, 4.5, this.position.z - 13), // m
      shape: cylinderShape,
      material: new CANNON.Material("stationMaterial")
    });

    this.boxBody = new CANNON.Body({
      mass: 0, // kg
      position: new CANNON.Vec3(this.position.x + 18, 4, this.position.z), // m
      shape: new CANNON.Box(new CANNON.Vec3(1, 4, 10)),
      material: new CANNON.Material("stationMaterial")
    }); 
  }

  setPosition(z) {
    this.position.z = z;
    this.body.position.z = z;
    this.pillarBody1.position.z = z + 13;
    this.pillarBody2.position.z = z - 13;
    this.boxBody.position.z = z;
  }

  containsCar(car) {
    var dx = car.position.x - this.position.x;
    var dz = car.position.z - this.position.z;
    return Math.abs(dx) < 15 && Math.abs(dz) < 10;
  }
}