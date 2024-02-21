class Sound {
  constructor() {
    
let time = 0
let timeBeat = 0
let timeSEffect = 0

this.sineWave = sineWave
  }
  ///////////
  
  playSound(sound) {
    sound.play()
  }
  
  stopBeat() {
  sineWave.stop()
  }
  
  stopB(zvuk, time){
    setTimeout(()=>{
      zvuk.stop()
    }, time)
  }
  
  addTerribleSound() {
    const pressSound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'square',
        frequency: 120,
        attack: 0.1,
        release: 0.01,
        volume: 0.07,
      }
    })
  
    var flanger = new Pizzicato.Effects.Flanger({
      time: 1.0,
      speed: 0.5,
      depth: 0.5,
      feedback: 0.1,
      mix: 1.0
    });
  
    //pressSound.addEffect(flanger);
    return pressSound
  
  }
  
  addPressSound() {
    const pressSound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'square',
        frequency: 420,
        attack: 0.1,
        release: 0.01,
        volume: 0.07,
      }
    })
  
    var flanger = new Pizzicato.Effects.Flanger({
      time: 1.0,
      speed: 1.0,
      depth: 1.0,
      feedback: 1.0,
      mix: 1.0
    });
  
    pressSound.addEffect(flanger);
    return pressSound
    
  }
  
  addBeat() {
  
    const sineWave = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: 'sine',
        frequency: 470,
        attack: 0.2,
        release: 0.1,
        volume: 5.0,
      }
    })
  
    const dubDelay = new Pizzicato.Effects.DubDelay({
      feedback: 0.6,
      time: .4,
      mix: 0.9,
      cutoff: 700,
    })
  
    const delay = new Pizzicato.Effects.Delay({
      feedback: 0.6,
      time: .4,
      mix: 0.9,
  
    })
  
    sineWave.addEffect(dubDelay)
    sineWave.addEffect(delay)
    return sineWave
  }
  
  stop(zvuk) {
    zvuk.stop()
  }
}
