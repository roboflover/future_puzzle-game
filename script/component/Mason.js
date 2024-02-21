class Mason {
  constructor(){
  let particles
  
  const uniforms =  {
  iTime: { value: 1.0 },
  iResolution: { value: new THREE.Vector3() },
  iD: { value: iDMason },
  iLen: { value: iLength },
  iAsc: { value: iAsc },
}
let scaleP = 1.0
uniforms.iResolution.value.set(scaleP, scaleP, 0.);
let group = new THREE.Group()
/////////
let limitL = configL01.limit
let countVH = configL01.count
let offset = configL01.offset
// GENERATOR
let gen1 = new Generator(countVH, limitL, offset)
let vert1 = gen1.v.pos
let enemyIndex = gen1.v.enemyIndex
//console.log(vert1)

const worldMap = new THREE.Object3D()
group.add(worldMap)
group.position.y = configL01.masonPosY
group.position.z = 0.2
const PARTICLE_SIZE = configL01.masonSize

const sizes = addSizeAttribute(vert1)

function addSizeAttribute(arr) {
  const sizeArr = []
  for (let i = 0; i < arr.length / 3; i++) {
    sizeArr.push(PARTICLE_SIZE)
  }
  return sizeArr
}

const colorMas = addColorAttribute(vert1)

function addColorAttribute(arr) {
  const lengthC = arr.length
  const color = []
  for (let i = 0; i < lengthC; i++) {
    color.push(
      cnfgColor.mason.r,
      cnfgColor.mason.g,
      cnfgColor.mason.b,
      )
  }
  return color
}

const matMason = createMaterial(vsMasonPoint, fsMasonSRndm)

function createMaterial(vs, fs) {
  //const ptexture = new THREE.TextureLoader().load( './textures/alpha2.jpg' )
  const mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    //blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true,
    //alphaMap: ptexture,
  })
  return mat
}

addBufferParticles(vert1, sizes, matMason, colorMas)


function addBufferParticles(vertices, sizes, material, color) {
  const geometry = new THREE.BufferGeometry()
  geometry.attributes.position = new THREE.Float32BufferAttribute(vertices, 3)
  geometry.attributes.size = new THREE.Float32BufferAttribute(sizes, 1)
  geometry.attributes.color = new THREE.Float32BufferAttribute(color, 3)
  particles = new THREE.Points(geometry, material)
  worldMap.add(particles)
}
this.particles = particles
this.attributes = worldMap.children[0].geometry.attributes
this.uniforms = uniforms
this.group = group
this.enemyIndex = enemyIndex
this.vert1 = vert1
    }

    addModule(attributes){
     // vsMsModule
      const uniforms = this.uniforms
      /*
      {
        iTime: { value: 1.0 },
         iResolution: { value: new THREE.Vector3() },
      }
      */
      const ptexture = new THREE.TextureLoader().load( './textures/alpha2.jpg' )
      const pMaterial = new THREE.PointsMaterial( {
					color: 0x303131,
					size: configL01.masonModuleSize,
					//blending: THREE.AdditiveBlending,
					depthTest: true,
					depthWrite: true,
					transparent: true,
					sizeAttenuation: false,
					vertexColors: true,
					alphaMap: ptexture,
				} );
      const mat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vsMsModule,
        fragmentShader: fsMsModule,
        //blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true,
        //alphaMap: ptexture,
      })
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color("rgb(50, 50, 50)"),
        transparent: false,
        opacity: 1.0,
        depthTest: true,
      })
      const geometry = new THREE.BufferGeometry()
      let size = []
      for(let i = 0; i < attributes.position.array.length; i++){
        size[i] = attributes.size.array[i]
      }
      geometry.attributes.position = attributes.position
      geometry.attributes.size = new THREE.Float32BufferAttribute(size, 1)
      geometry.attributes.color = attributes.color
      const particles = new THREE.Points(geometry, mat)
      particles.position.y = configL01.masonPosY
      particles.position.z = 0.1
      return particles
    }
    
    generateEnemy(arr) {
      //console.log(arr.length)
      const elem = Math.ceil(Math.random() * arr.length / 3 - 1)
      return elem
    }
  }
