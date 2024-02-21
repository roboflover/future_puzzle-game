class Level {

  constructor() {
// the number must be a multiple of 4
let maxPointsCount = configL01.maxPointsCount
let vertices = []
let colors = []
let width = []
let geometry = new THREE.BufferGeometry()
let pointCloud
let group = new THREE.Group()
let groupRU = new THREE.Group()
let tubesData = [  ]
const uniforms = {
  iTime: { value: 1.0 },
  resolution: { value: new THREE.Vector2() },
  iSize: { value: configL01.tubePoint },
}

addParticles()

function addParticles() {
  for (let i = 0; i < maxPointsCount; i++) {
    tubesData.push( {	velocity: 0 } );
  }

const sincos = 3.0
const vratio = 0.3
  for (let i = 0; i < maxPointsCount; i+=6) {
    //console.log(i)
    vertices[i + 0] = Math.random() * 20
    vertices[i + 1] = Math.random() * 20
    vertices[i + 2] = Math.random() * 40 - 20
    vertices[i + 3] = vertices[i + 0] * Math.sin(sincos)
    vertices[i + 4] = vertices[i + 1] * Math.sin(sincos)
    vertices[i + 5] = vertices[i + 2]

    tubesData[i + 0].velocity = (- 1 + Math.random() * 2)*0.1
    tubesData[i + 1].velocity = (- 1 + Math.random() * 2)*0.1
    tubesData[i + 2].velocity = 0
    tubesData[i + 3].velocity = tubesData[i + 0].velocity
    tubesData[i + 4].velocity = tubesData[i + 1].velocity
    tubesData[i + 5].velocity = 0
    
  }
  //console.log(tubesData)
  for (let i = 0; i < maxPointsCount; i++) {
  colors.push(
    1,
    0,
    0)
  } 
  //console.log(colors)
  geometry.setDrawRange( 0, maxPointsCount );
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));



  const matPoint = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vsBgPoint,
    fragmentShader: fsBgPoint,
    //blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
   vertexColors: true
  });
 const ptexture = new THREE.TextureLoader().load( './textures/alpha.jpg' )
  const pMaterial = new THREE.PointsMaterial( {
					color: 0xFFFFFF,
					size: configL01.tubePoint,
					blending: THREE.AdditiveBlending,
					depthTest: false,
					transparent: true,
					sizeAttenuation: false,
					vertexColors: true,
					alphaMap: ptexture,
				} );

  
  pointCloud = new THREE.Points(geometry, pMaterial)
  groupRU.add(pointCloud)

  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    linewidth: configL01.linewidth,
    depthTest: false,
    transparent: true,
    blending: THREE.AdditiveBlending,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round' //ignored by WebGLRenderer
  });
  const linesMesh = new THREE.LineSegments(geometry, lineMat);
  groupRU.add(linesMesh)
}

const groupLU = groupRU.clone()
const groupRD = groupRU.clone()
const groupLD = groupRU.clone()
groupLU.scale.x = -1
groupRD.scale.x = -1
groupRD.scale.x = -1
groupLD.scale.y = -1
groupRD.scale.y = -1
group.add(groupLU)
group.add(groupRU)
group.add(groupLD)
group.add(groupRD)

this.group=group
this.geometry = geometry.attributes
this.tubesData = tubesData
//console.log(this.geometry)
//создание алгоритма
this.group = group
this.uniforms = uniforms
  }
}
