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

let pothole1 = new Howl({
  src: ['sounds/pothole1.ogg']
});

let pothole2 = new Howl({
  src: ['sounds/pothole2.ogg']
});

let pothole3 = new Howl({
  src: ['sounds/pothole3.ogg']
});

let pothole4 = new Howl({
  src: ['sounds/pothole4.ogg']
});

let horn1 = new Howl({
  src: ['sounds/horn1.ogg']
});

let horn2 = new Howl({
  src: ['sounds/horn2.ogg']
});

let horn3 = new Howl({
  src: ['sounds/horn2.ogg']
});

let coin1 = new Howl({
  src: ['sounds/coin_000.ogg']
});

let coin2 = new Howl({
  src: ['sounds/coin_001.ogg']
});

let coin3 = new Howl({
  src: ['sounds/coin_002.ogg']
});

let coin4 = new Howl({
  src: ['sounds/coin_003.ogg']
});

let coin5 = new Howl({
  src: ['sounds/coin_004.ogg']
});

let drive = new Howl({
  src: ['sounds/drive.ogg'],
  loop: true
});

let backup = new Howl({
  src: ['sounds/backup.ogg'],
  loop: true
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

  playCoinSound() {
    let sounds = [coin1, coin2, coin3, coin4, coin5];
    sounds[Math.floor(Math.random() * sounds.length)].play();
  }

  playPotholeSound() {
    let sounds = [pothole1, pothole2, pothole3, pothole4];
    sounds[Math.floor(Math.random() * sounds.length)].play();
  }

  playDriveSound() {
    drive.play();
    backup.play();
  }

  setDriveSoundVol(vol) {
    drive.volume(vol);
  }

  setReverseSoundVol(vol) {
    backup.volume(vol);
  }

}

export default (new SoundManager);