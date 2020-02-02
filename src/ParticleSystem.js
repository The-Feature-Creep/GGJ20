import * as THREE from 'three';

export default class ParticleSystem extends THREE.Object3D {
  
  constructor(options) {
    super();

    options.lifetime = options.lifetime || 200;
    options.startSize = options.startSize || 1;
    options.endSize = options.endSize || 0;
    options.spread = options.life || 0.2;

    this.options = options;

    this.init();
  }

  init() {
    this.particlePool = [];
    for (var i = 0; i < 200; i++)
    {
      let p = new Particle(this.options);
      p.life = 0;
      this.particlePool.push(p);
    }
  }

  emit(position) {

    let count = 1;

    this.particlePool.forEach(p => {
      if (p.isDormant() && count > 0)
      {
        p.position.copy(position);
        p.init();
        this.add(p);
        count--;
      }
    });
  }

  update(camera, delta) {
    this.children.forEach(particle => {
      particle.update(delta * 80);
      particle.lookAt(camera.position);

      if (particle.isDormant())
      {
        this.remove(particle)
      }
    });
  }
}

let ease = function (t, b, c, d) {
  return -c * ((t=t/d-1)*t*t*t - 1) + b;
}

class Particle extends THREE.Object3D {

  constructor(options) {
    super();

    this.options = options;

    var geometry = new THREE.CircleBufferGeometry(1, 12);
    var material = new THREE.MeshBasicMaterial({ color: options.particleColor });
    var circle = new THREE.Mesh(geometry, material);

    this.add(circle);
  }

  init() {
    this.lifetime = this.options.lifetime * (1 + Math.random() * 0.2);
    this.life = this.lifetime;
    this.startSize = this.options.startSize * (0.6 + Math.random());
    this.endSize = this.options.endSize;
    this.spread = this.options.spread;

    this.scale.x = this.startSize;
    this.scale.y = this.startSize;
    this.scale.z = this.startSize;

    var randomAngle = function() {
      return -1 + Math.random() * 2;
    }

    this.dir = new THREE.Vector3(Math.random() * 0.1, 0.5, Math.random() * 0.1);
  }

  isDormant() {
    return this.life <= 0;
  }

  update(delta) {
    if (this.life > 0) this.life -= delta;
    else return;

    this.scale.setScalar(Math.max(0.0001, ease(this.lifetime - this.life, this.startSize, this.endSize - this.startSize, this.lifetime)));
    this.translateOnAxis(this.dir, ease(this.lifetime - this.life, this.spread, -this.spread, this.lifetime) * delta);
  }
}