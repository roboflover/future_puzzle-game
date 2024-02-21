const masonShaders = [
  fsMasonPoint,
  fsMasonPoint,
  fsMasonPoint,
  fsMasonPoint,
  fsMasonPoint,
  fsMasonAstraPoint,
  ]
const rndmMasonShaders = Math.ceil(Math.random()*masonShaders.length-1)
const fsMasonSRndm = masonShaders[rndmMasonShaders]

const soundTon = Math.ceil(Math.random()*200+350)

const cnfgSpeedIndicator = [
{
  segment: 140,
  radiusA: 2.3,
  radiusB: 1.5,
  lineRatio: .52,
  lineWidth: 3.0,
  style: 'line',
},
{
  segment: 80,
  radiusA: 2.2,
  radiusB: 2.2,
  lineRatio: .52,
  lineWidth: 3.0,
  style: 'point',
}
]

const cnfgHealthIndicator = [
{
  segment: 140,
  radiusA: 1.3,
  radiusB: .7,
  lineRatio: .1,
  lineWidth: 3.0,
  style: 'line',
},
{
  segment: 80,
  radiusA: 1.6,
  radiusB: 1.6,
  lineRatio: .1,
  lineWidth: 3.0,
  style: 'point',
}
]

const rndmBIndicator = Math.ceil(Math.random()*cnfgHealthIndicator.length-1)
const rndmHealthIndicator = cnfgHealthIndicator[rndmBIndicator]
const rndmSpeedIndicator = cnfgSpeedIndicator[rndmBIndicator]

const iDMason = Math.random() * 1.+1.2
const iLength = Math.random() * 0.3
const iAsc = Math.random() * 0.5+0.2

const sararr = [100,100,100,100,100,100,100,100,100,1]
const satnum = Math.ceil(Math.random()*sararr.length-1)
const saturation = sararr[satnum]
const colorRand = Math.ceil(Math.random() * 360)
const colRatio = 40
const cnfgColor = {
  spiralA: new THREE.Color(`hsl(${colorRand + (colRatio*0)}, ${saturation}%, 50%)`),
  spiralB: new THREE.Color(`hsl(${colorRand + (colRatio*2)}, ${saturation}%, 50%)`),
  tube: new THREE.Color(`hsl(${colorRand + (colRatio*1)}, ${saturation}%, 50%)`),
  mason: new THREE.Color(`hsl(${colorRand + (colRatio*4)}, ${saturation}%, 50%)`),
  bonus: new THREE.Color(`hsl(${colorRand + (colRatio*5)}, ${saturation}%, 50%)`),
  enemy: new THREE.Color(`hsl(${colorRand + (colRatio*2.5)}, ${saturation}%, 50%)`),
  brain: new THREE.Color(`hsl(${colorRand + (colRatio*6)}, ${saturation}%, 50%)`),
  health: new THREE.Color(`hsl(${colorRand + (colRatio*5)}, ${saturation}%, 70%)`),
  speed: new THREE.Color(`hsl(${colorRand + (colRatio*6)}, ${saturation}%, 70%)`),
}

const cnfgSpRandom = [
  {
  radialSegments: 150,
  tubularSegments: 120,
  tubeRadius: .3,
  pin: 3,
  angleCount: 4,
  terrain: 40,
  angleD: 1.2,
  scale: .39,
  posX: -13,
},
{
  radialSegments: 150,
  tubularSegments: 120,
  tubeRadius: .3,
  pin: 3,
  angleCount: 5,
  terrain: 1,
  angleD: .72,
  scale: .53,
  posX: 6,
},
{
  radialSegments: 100,
  tubularSegments: 100,
  tubeRadius: .2,
  pin: 1,
  angleCount: 6,
  terrain: 20,
  angleD: .72,
  scale: .53,
  posX: 6,
},
{
  radialSegments: 100,
  tubularSegments: 100,
  tubeRadius: .12,
  pin: .5,
  angleCount: 7,
  terrain: 200,
  angleD: .92,
  scale: .56,
  posX: 6,
},
{
  radialSegments: 100,
  tubularSegments: 100,
  tubeRadius: .12,
  pin: .15,
  angleCount: 7,
  terrain: 200,
  angleD: .92,
  scale: .56,
  posX: 6,
},
{
  radialSegments: 100,
  tubularSegments: 100,
  tubeRadius: .12,
  pin: .30,
  angleCount: 7,
  terrain: 90,
  angleD: .92,
  scale: .56,
  posX: 6,
},
{
  radialSegments: 100,
  tubularSegments: 100,
  tubeRadius: .12,
  pin: 6.30,
  angleCount: 3,
  terrain: 50,
  angleD: .92,
  scale: .56,
  posX: 6,
},
{
  radialSegments: 50,
  tubularSegments: 50,
  tubeRadius: .12,
  pin: .30,
  angleCount: 3,
  terrain: 5,
  angleD: 1.92,
  scale: .56,
  posX: 6,
}
]
//
const sprndm = Math.ceil(Math.random()*cnfgSpRandom.length-1)

const cnfgSpiral = {
  radialSegments: cnfgSpRandom[sprndm].radialSegments,
  tubularSegments: cnfgSpRandom[sprndm].tubularSegments,
  tubeRadius: cnfgSpRandom[sprndm].tubeRadius,
  pin: cnfgSpRandom[sprndm].pin,
  angleCount: cnfgSpRandom[sprndm].angleCount,
  terrain: cnfgSpRandom[sprndm].terrain,
  angleD: cnfgSpRandom[sprndm].angleD,
  scale: cnfgSpRandom[sprndm].scale,
  posX: cnfgSpRandom[sprndm].posX,
}

const msArr = [
{
  masonSize: window.innerHeight / 190,
  limit: 50,
  count: 3,
  offset: 1.2,
  masonPosY: -6.4,
},
{
  masonSize: window.innerHeight / 200,
  limit: 20,
  count: 3,
  offset: 1.2,
  masonPosY: -6.4,
},
{
  masonSize: window.innerHeight / 160,
  limit: 30,
  count: 3,
  offset: 1.2,
  masonPosY: -6.4,
},
{
  masonSize: window.innerHeight / 160,
  limit: 100,
  count: 3,
  offset: 1.2,
  masonPosY: -6.4,
}
]
const arrNum = Math.ceil(Math.random()*msArr.length-1)
const min = 24
const max = 172
const num = 12
const configL01 = {
  camX: 0,
  camY: 0,
  camZ: 25,
  linewidth: 1/*window.innerHeight / 160*/,
  brainHealthWidth: window.innerHeight / 220,
  tubePoint: window.innerHeight / 40,
  maxPointsCount: Math.floor(Math.floor(Math.random()*(max-min+1)+min) / num) * num,
  masonSize: window.innerHeight / 170,
  masonModuleSize: window.innerHeight / 11.1,
  limit: msArr[arrNum].limit,
  count: msArr[arrNum].count,
  offset: msArr[arrNum].offset,
  masonPosY: msArr[arrNum].masonPosY,
}
