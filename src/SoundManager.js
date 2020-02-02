import {Howl, Howler} from 'howler';

let impact1 = new Howl({
  src: ['sounds/impact1.ogg']
});

let impact2 = new Howl({
  src: ['sounds/impact2.ogg']
});

let impact3 = new Howl({
  src: ['sounds/impact3.ogg']
});

let impact4 = new Howl({
  src: ['sounds/impact4.ogg']
});

let horn1 = new Howl({
  src: ['sounds/horn1.ogg']
});

let horn2 = new Howl({
  src: ['sounds/horn2.ogg']
});

let horn3 = new Howl({
  src: ['sounds/horn3.ogg']
});

class SoundManager {

  playHitSound() {
    let sounds = [impact1, impact2, impact3, impact4];
    sounds[Math.floor(Math.random() * sounds.length)].play();
  }

  playHornSound() {
    let sounds = [horn1, horn2, horn3];
    sounds[Math.floor(Math.random() * sounds.length)].play();
  }

}

export default (new SoundManager);