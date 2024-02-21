let particles, raycaster, INTERSECTED, pointer
let bg, tData, bgcolor
let mason, attributeM, moduleM, moduleML, module, spiral, masonLength, copyArrPos, enemyIndex, enemyPosX
let oldEnemyIndex
let progressbar, attributesProg
let sound, soundArr, sineWave
let animated, globalClock, speedClock, healthClock, globalTime, speedTime, healthTime
let raycasting, rayClock, rayTime
let bonus, bonusClock, bonStopClock, bonStopTime, bonusTime, bonusEffOpacity, bonusEffClock, bonusCount, healthTimer, healthTPrev, healthTNext, healthMinus
let bonusVelFlag = 0
let bonusLifeFlag = false
let calculation
let arrangeArr
let brain, attributeBHealth, attributeBSpeed
let attributesBg, attributesMs
let soundpress, soundterrible
let playBeat = true
let bonusStart = true
let timeBeat = 0
let stopB = true
let timeStopP = 0
let masonSpeedR = 0.02
let countMsPos = -1
let start = true
let stopwatch = 0.0
let spiralgroup = new THREE.Group()
let arrangeArray = []
let allrenderobjects = []
let bonusArray = []
let bonusData = []

const bonusHalf = 4
const rHalf = 40 / 2
const minPgSpeed = 0.0
const maxPgSpeed = 0.05
const PARTICLE_SIZE = configL01.masonSize
const MODULE_SIZE = configL01.moduleSize
const brainIndicator = 100
const brainIndicatorCount = brainIndicator/2
const speedIndicator = 140
const speedIndicatorCount = brainIndicator / 2

const deleteObjectsScene = () => {
  if (allrenderobjects.length > 0) {
    allrenderobjects.forEach((item) => {
      scene.remove(item)
    })
  }
}

const renderObjectsScene = () => {
  if(allrenderobjects.length>0){
    allrenderobjects.forEach((item)=>{
     scene.add(item)
    })
  }
}

function playSoundBonus(){
  const audioContext = new AudioContext();
  var oscillator = audioContext.createOscillator();
  oscillator.frequency.value = soundTon;
  oscillator.connect(audioContext.destination);
  oscillator.start(0);
  oscillator.stop(0.1);
}
const addSoundClass = () => {
  
}

const addBonusClass = () => {
  bonus = new Bonus(bonusArray, bonusData)
  bonus.addEffect()
  bonus.uniformsEff.iOpacity.value = 0.0
}

const addBgcolorClass = () => {
  bgcolor = new Bgcolor()
  bgcolor.createShaderBgColor()
  bgcolor.createBackground()
  scene.add(bgcolor.group)
}

const addSpiralClass = () => {
  spiral = new Spiral()
  const scale = cnfgSpiral.scale
  spiral.group.scale.set(scale, scale, scale)
  spiral.group.position.z = -5
  spiralgroup.add(spiral.group)
}

const addMasonClass = () => {
  mason = new Mason()
  const scale = 1.8
  mason.group.scale.set(scale, scale, scale)
  allrenderobjects.push(mason.group)
  
  arrangeArr = new ArrangeArray()
  attributeM = mason.particles.geometry.attributes
  arrangeArr.arrange(attributeM)
  
  moduleM = mason.addModule(attributeM)
  moduleM.scale.set(scale, scale, scale)
  
  allrenderobjects.push(moduleM)
  
  enemyIndex = mason.generateEnemy(attributeM.position.array)
  enemyPosX = attributeM.position.array[enemyIndex*3]
  oldEnemyIndex = enemyIndex
  
  const masonColor = mason.particles.geometry.attributes.color.array
}

const addTubesClass = () => {
  bg = new Level();
  const scale = .5
  allrenderobjects.push(bg.group)
  bg.group.scale.set(scale, scale, scale)
  bg.group.position.z = -6
  attributesBg = bg.geometry
  tData = bg.tubesData
}

const addBrainClass = () => {
  brain = new Brain()
  module = brain.createModule()
  const health = brain.createIndicator(rndmHealthIndicator)
  const speed = brain.createIndicator(rndmSpeedIndicator)
  healthMinus = 0
  healthTPrev = 1
  bonusCount = -1
  health.renderOrder = 1
  attributeBHealth = health.geometry.attributes
  for(let i = 0; i <=5; i+=3){
    attributeBHealth.color.array[i+0] = cnfgColor.health.r
    attributeBHealth.color.array[i+1] = cnfgColor.health.g
    attributeBHealth.color.array[i+2] = cnfgColor.health.b
  }
  speed.renderOrder = 1
  attributeBSpeed = speed.geometry.attributes
  module.renderOrder = 1

  scene.add(module)
  scene.add(health)
  scene.add(speed)
  scene.add(spiralgroup)
}

const addRaycastingClass = () => {
  const config = {
    psize: PARTICLE_SIZE,
    mspoints: mason.particles,
    index: INTERSECTED,
  }
  raycasting = new Raycasting(config)
  raycasting.setEventListener()
}

const addAnimationClass = () => {
  animated = new Animated()
  globalClock = animated.addClock()
  healthClock = animated.addClock()
  speedClock = animated.addClock()
  rayClock = animated.addClock()
  bonusClock = animated.addClock()
  bonStopClock = animated.addClock()
  bonusEffClock = animated.addClock()
}

const addCalculationClass = () => {
  calculation = new Calculation()
}

const animation = () => {
  
  globalTime = animated.getElapsedTime(globalClock)
  healthTime = animated.getElapsedTime(healthClock)
  speedTime = animated.getElapsedTime(globalClock)
  bonStopTime = animated.getElapsedTime(bonStopClock)
  bonEffTime = animated.getElapsedTime(bonusEffClock)
  healthTimer = Math.ceil(healthTime*0.5) -2
  healthTNext = healthTimer - healthMinus
  ///// BONUS
  bonusTime = animated.getElapsedTime(bonusClock)
  if(bonusStart){
  if (bonusTime > 10) {
    bonusClock = animated.resetClock(bonusClock)
    bonusVelFlag += 1
  }
  if (bonusVelFlag > 2) {
    bonusVelFlag = 0
  }
  if (bonusTime == 0) {
    bonus.addBonus()
  }
  }
  if(bonusStart){
  for(let i = 0; i < bonusArray.length-1; i++){
    bonusArray[i].position.x += bonusData[i].velocity.x *0.1
    bonusArray[i].position.y += bonusData[i].velocity.y *0.1
    bonusArray[i].position.z = 1.
    //iOpacity bonusEffOpacity
    
    if (oldEnemyIndex == enemyIndex) {
    bonusArray[i].material.uniforms.iOpacity.value = 0.4
    bonusArray[i].material.visible = true
    } else {
    bonusArray[i].material.uniforms.iOpacity.value = 1.0
    bonusArray[i].material.visible = true
    }
    
    if (bonusArray[i].position.x < -bonusHalf || bonusArray[i].position.x > bonusHalf) {
      scene.remove(bonusArray[i])
      bonusArray.splice(i, 1)
      bonusData.splice(i, 1)
    }
    if (bonusArray[i].position.y < -bonusHalf || bonusArray[i].position.y > bonusHalf) {
      scene.remove(bonusArray[i])
      bonusArray.splice(i, 1)
      bonusData.splice(i, 1)
    }
    if (bonusArray[i].position.z < -bonusHalf || bonusArray[i].position.z > bonusHalf) {
      scene.remove(bonusArray[i])
      bonusArray.splice(i, 1)
      bonusData.splice(i, 1)
    }
    
    let rayIndex = raycasting.renderraycast(bonusArray[i])
    rayTime = animated.getElapsedTime(rayClock)
    if (rayIndex != undefined && rayTime > 1. && oldEnemyIndex != enemyIndex) {
      rayClock = animated.resetClock(rayClock)
      scene.remove(bonusArray[i])
      bonusArray.splice(i, 1)
      bonusData.splice(i, 1)
      bonusCount +=1
      healthTPrev = 0
      function timeoutBonus() {
        healthTPrev = healthTNext
        healthMinus +=3.5
      }
      function timeoutBonusEff() {
        bonusEffOpacity = 0.
      }
      setTimeout(timeoutBonus, 6000)
      oldEnemyIndex = enemyIndex
      bonusEffClock = animated.resetClock(bonusEffClock)
      bonusEffOpacity = 1.
      playSoundBonus()
      setTimeout(timeoutBonusEff, 500)
    }
  }
  }
  if(!bonusStart){
    bonusArray.forEach((item)=>{
      scene.remove(item)
    })
  }
  
////// BONUS SPEED
// attributeBSpeed
const speedTimer = bonusCount *2
animated.loopItems({
  arr: attributeBSpeed.color,
  count: 6,
  update(i) {
    const time = speedTimer * 8.
    const colorAttr = attributeBSpeed.color.array
    const colorsin = Math.sin(time + i) * 0.5 + 0.1
    if (i == (speedTimer * 6)) {
      colorAttr[i + 0] = cnfgColor.speed.r
      colorAttr[i + 1] = cnfgColor.speed.g
      colorAttr[i + 2] = cnfgColor.speed.b
      colorAttr[i + 3] = cnfgColor.speed.r
      colorAttr[i + 4] = cnfgColor.speed.g
      colorAttr[i + 5] = cnfgColor.speed.b
      colorAttr[i + 6] = cnfgColor.speed.r
      colorAttr[i + 7] = cnfgColor.speed.g
      colorAttr[i + 8] = cnfgColor.speed.b
      colorAttr[i + 9] = cnfgColor.speed.r
      colorAttr[i + 10] = cnfgColor.speed.g
      colorAttr[i + 11] = cnfgColor.speed.b
    }
  }
})
///// MASON
animated.loopItems({
  arr: mason.particles.geometry.attributes.color,
  count: 3,
  update(i) {
    const time = globalTime * 8.
    const masonColor = mason.particles.geometry.attributes.color.array
    const ratio = 0.5
    masonColor[i + 0] = (Math.sin(time + (i*0.1)) *0.5 + cnfgColor.mason.r)
    masonColor[i + 1] = (Math.sin(time + (i*0.1)) *0.5 + cnfgColor.mason.g)
    masonColor[i + 2] = (Math.sin(time + (i*0.1)) *0.5 + cnfgColor.mason.b)
    // if((enemy + 0) == i || (enemy + 1) == i|| (enemy + 2) == i) {
    if(i == (enemyIndex*3)) {
      /*
      masonColor[enemyIndex * 3 + 0] = 1.0
      masonColor[enemyIndex * 3 + 1] = 1.0
      masonColor[enemyIndex * 3 + 2] = 1.0
      */
    }
  }
})

animated.loopItems({
  arr: mason.particles.geometry.attributes.position,
  count: 3,
  update(i) {
    const time = globalTime * 9.
    const enemyPosition = mason.particles.geometry.attributes.position.array
    const sinpos = (Math.sin(time*0.1))
    const offsetX =enemyPosX
    if(i == (enemyIndex*3)) {
      enemyPosition[i + 0] = (Math.sin(time)*0.1)+ offsetX
    }
  }
})

animated.loopItems({
  arr: mason.particles.geometry.attributes.size,
  count: 1,
  update(i) {
    const time = globalTime * 2.
    const masonColor = mason.particles.geometry.attributes.size.array
    const ratio = 0.5
    masonColor[i + 0] = (Math.sin(time + (i * 0.1)) * 1.5 + PARTICLE_SIZE+3.-2)
  }
})

animated.loopItems({
  arr: moduleM.geometry.attributes.size,
  count: 1,
  update(i) {
    const time = globalTime * 2.
    const moduleSize = moduleM.geometry.attributes.size.array
    const ratio = 0.5
    moduleSize[i + 0] = (Math.sin(time + (i * 0.1)) * 1.5 + PARTICLE_SIZE + 3.6 - 2)
  }
})

///// MASON RAY 
let rayIndex = raycasting.renderraycast(mason.particles)
  rayTime = animated.getElapsedTime(rayClock)
  if (rayIndex != undefined && rayTime > 1.) {
    rayClock = animated.resetClock(rayClock)
    if (rayIndex == enemyIndex){
   // console.log(rayIndex)
   attributeM.position.array[enemyIndex * 3] = enemyPosX
    enemyIndex = mason.generateEnemy(attributeM.position.array)
    enemyPosX = attributeM.position.array[enemyIndex * 3]
    /*
    
    */
    }
  }
///// ENEMY
///// BRAIN
///// HEALTH
animated.loopItems({
  arr: attributeBHealth.color,
  count: 6,
  update(i) {
    const time = healthTime * 2.
    const colorAttr = attributeBHealth.color.array
    const colorsin = Math.sin(time + i) * 0.5 + 0.1
    if(healthTPrev == healthTNext){
      //console.log(healthTPrev)
      healthTPrev+=1 
      
    }
    if (i == (healthTPrev * 6) || i == (healthTNext * 6)) {
      colorAttr[i + 0] = cnfgColor.health.r
      colorAttr[i + 1] = cnfgColor.health.g
      colorAttr[i + 2] = cnfgColor.health.b
      colorAttr[i + 3] = cnfgColor.health.r
      colorAttr[i + 4] = cnfgColor.health.g
      colorAttr[i + 5] = cnfgColor.health.b
    }
  }
})
if(healthTNext == (brainIndicatorCount) || healthTPrev == (brainIndicatorCount)){
  deleteObjectsScene()
  bonusStart = false
  module.children[1].material.color.r = 0
  module.children[1].material.color.g = 0
  module.children[1].material.color.b = 0
  //globalClock = animated.resetClock(globalClock)
}
 ///// TUBES
 animated.loopItems({
   arr: attributesBg.position,
   count: 6,
   update(i) {
     const tubesPos = attributesBg.position.array
     tubesPos[i + 0] += tData[i + 0].velocity
     tubesPos[i + 1] += tData[i + 1].velocity
     tubesPos[i + 3] += tData[i + 3].velocity
     tubesPos[i + 4] += tData[i + 4].velocity
     if (tubesPos[i + 0] < -rHalf || tubesPos[i + 0] > rHalf) {
       tData[i + 0].velocity = -tData[i + 0].velocity
     }
     if (tubesPos[i + 1] < -rHalf || tubesPos[i + 1] > rHalf) {
       tData[i + 1].velocity = -tData[i + 1].velocity
     }
     if (tubesPos[i + 3] < -rHalf || tubesPos[i + 3] > rHalf) {
       tData[i + 3].velocity = -tData[i + 3].velocity
     }
     if (tubesPos[i + 4] < -rHalf || tubesPos[i + 4] > rHalf) {
       tData[i + 4].velocity = -tData[i + 4].velocity
     }
   }
 })

 animated.loopItems({
   arr: attributesBg.color,
   count: 3,
   update(i) {
     const time = globalTime * 8.
     const tubesColor = attributesBg.color.array
     const tubesPos = attributesBg.position.array
     const ratioTubeSin = 0.0
     const ratio = 0.7
     const perspAlpha = calculation.range(tubesPos[i + 2], 20.0, -20.0, 1.0, 0.0)
     tubesColor[i + 0] = cnfgColor.tube.r * perspAlpha * (Math.sin(time) * 0.5 + ratio)
     tubesColor[i + 1] = cnfgColor.tube.g * perspAlpha * (Math.cos(time) * 0.5 + ratio)
     tubesColor[i + 2] = cnfgColor.tube.b * perspAlpha * (Math.sin(time) * 0.5 + ratio)
   }
 })
///// BONUS EFFECT
  const bonusT = bonEffTime * 8.
///// UPDATES
  bonus.uniformsEff.iOpacity.value = Math.sin(bonusT)*bonusEffOpacity
  bonus.uniformsEff.iTime.value = globalTime * 1.
  bonus.uniformsEff.iResolution.value.x = renderer.domElement.width
  bonus.uniformsEff.iResolution.value.y = renderer.domElement.height
  bonus.uniforms.iTime.value = globalTime * 1.
  mason.uniforms.iTime.value = globalTime * 1.
  spiral.uniforms.iTime.value = globalTime * 8.
  spiral.uniforms.iResolution.value.x = renderer.domElement.width
  spiral.uniforms.iResolution.value.y = renderer.domElement.height
  spiral.group.children[0].rotation.z = globalTime * .98
  spiral.group.children[1].rotation.z = -globalTime * .98
  spiral.group.children[2].rotation.z = globalTime * .98
  spiral.group.children[3].rotation.z = -globalTime * .98
  bgcolor.uniforms.iTime.value = globalTime * 1.
  bgcolor.uniforms.iResolution.value.x = renderer.domElement.width
  bgcolor.uniforms.iResolution.value.y = renderer.domElement.height
  
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
 }
// geoTest()
addSoundClass()
addBrainClass()
addBonusClass()
addBgcolorClass()
addSpiralClass()
addTubesClass()
addMasonClass()
addRaycastingClass()
addAnimationClass()
addCalculationClass()
renderObjectsScene()

animation()

