class Spiral {
  constructor(){
    this.group = new THREE.Group()

let shroom_height, stipe_vSegments, stipe_rSegments, stipe_points, stipe_indices, stipe_shape, stipe_shape2
let circleValues
const mouse = new THREE.Vector2()
let INTERSECTED
let theta = 0
let meshOk = false
let group2 = new THREE.Object3D()
let cloneGroup
let countMemory

const radialSegments = cnfgSpiral.radialSegments
const tubularSegments = cnfgSpiral.tubularSegments
const tubeRadius = cnfgSpiral.tubeRadius
const pin = cnfgSpiral.pin
const angleCount = cnfgSpiral.angleCount
const terrain = cnfgSpiral.terrain
const angleD = cnfgSpiral.angleD

class CustomSinCurve extends THREE.Curve {

  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 2 - 1.1;
    const ty = Math.sin(angleD* Math.PI * t)
    const tz = 0;
    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
  }
}

const zPosScale = 0.0;
//const Noise = new THREE.ImprovedNoise()


const path = new CustomSinCurve(10.)
const geometry = new THREE.TubeBufferGeometry(path, tubularSegments, tubeRadius, radialSegments, false)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
let scaleTube = 0.0
let normal = new THREE.Vector3()
let vertex = new THREE.Vector3()
//let ns;
//let nScale = 10.25
let normals = []
let vertices = []
let mandalaGroups = []
var v = new THREE.Vector3(0, 1, 0)
var P = new THREE.Vector3()

mesh.scale.set(scaleTube, scaleTube, scaleTube)
//mesh.position.applyAxisAngle(v, Math.PI / 1)

for (let i = 0; i <= tubularSegments; i ++ ) {
  var pointAt = i / tubularSegments
  P = path.getPointAt(pointAt, P)
  var N = geometry.normals[ i ]
  var B = geometry.binormals[ i ]
  for (let j = 0; j <= geometry.parameters.radialSegments; j ++ ) {
    var v = j / geometry.parameters.radialSegments * Math.PI * pin
    var sin = Math.sin( v )
    var cos = - Math.cos( v )
    normal.x = ( cos * N.x + sin * B.x )
    normal.y = ( cos * N.y + sin * B.y )
    normal.z = ( cos * N.z + sin * B.z )
    normal.normalize();
    var radius = geometry.parameters.radius;
    radius = radius + ((Math.sin(pointAt * terrain - 1.5)*0.9 ) + Math.sin(pointAt * 1 + 1)) // wave along the path
   // ns = Noise.noise(vertex.x * nScale, vertex.y * nScale, j)
    vertex.x = P.x + radius * normal.x
	  vertex.y = P.y + radius * normal.y
	  vertex.z = P.z + radius * normal.z
		vertices.push( vertex.x, vertex.y, vertex.z )
  }
}

mesh.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3))
let lengthX = mesh.geometry.attributes.position.array.length
//cnfgColor
const spralpha = 1.92
const sprblpha = 0.99
const spRA = cnfgColor.spiralA.r * spralpha
const spGA = cnfgColor.spiralA.g * spralpha
const spBA = cnfgColor.spiralA.b * spralpha
const spRB = cnfgColor.spiralB.r * sprblpha
const spGB = cnfgColor.spiralB.g * sprblpha
const spBB = cnfgColor.spiralB.b * sprblpha
const uniforms = {
  iTime: { value: 1.0 },
  iResolution: { value: new THREE.Vector2(100., 100.) },
  iMixcolA:  { value: new THREE.Vector3(
    spRA,
    spGA,
    spBA,
    ) },
  iMixcolB:  { value: new THREE.Vector3(
    spRB,
    spGB,
    spBB,
    ) },
}
//console.log(uniforms)




function mergeShader(count, geo){
  let geoArr = []
  const posX = cnfgSpiral.posX
  geo.translate(posX,0.,0.)
  
 // var geometry1 = geo.clone()
  
  for(let i = 0; i < count; i++){
    let geoB = geo.clone()
    geoB.rotateZ(((Math.PI/count)*2) * i)
    geoArr.push(geoB)
  }

  var merged = THREE.BufferGeometryUtils.mergeBufferGeometries(geoArr);

  const matshader = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vsSpiral,
    fragmentShader: fsSpiral,
    //blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: true,
    transparent: true,
    vertexColors: true,
  });
  const cluster = new THREE.Mesh(merged, matshader)
  return cluster
}

let mandala = mergeShader(angleCount, geometry)
let mandala2 = mandala.clone()
mandala2.scale.x = -1

function mergePhong(count, geo){
  let geoArr = []
  geo.translate(-0.,0.,0.)
  
 // var geometry1 = geo.clone()
  
  for(let i = 0; i < count; i++){
    let geoB = geo.clone()
    geoB.rotateZ(((Math.PI/count)*2) * i)
    geoArr.push(geoB)
  }

  var merged = THREE.BufferGeometryUtils.mergeBufferGeometries(geoArr);

  var floorMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(50, 50, 50)"),
    specular: 0x000000,
    shininess: 0,
    side: THREE.DoubleSide,
  })
  
  const cluster = new THREE.Mesh(merged, floorMaterial)
  cluster.castShadow = true
  cluster.receiveShadow = true
  return cluster
}

let mandalaP = mergePhong(angleCount, geometry)
let mandala2P = mandalaP.clone()
mandala2P.scale.x = -1
mandalaP.position.z -= 1.5
mandala2P.position.z -= 1.5
this.group.add(mandala2P) 
this.group.add(mandalaP)    

//mandala.position.z = -5
this.group.add(mandala2) 
this.group.add(mandala)    
this.uniforms = uniforms

  }
}

