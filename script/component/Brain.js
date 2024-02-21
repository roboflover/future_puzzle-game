class Brain {
  constructor(){

  }
  
  createModule(){
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color("rgb(5, 5, 5)"),
      side: THREE.DoubleSide,
      transparent: false,
      opacity: 1.0,
      depthTest: true,
    })

    const group = new THREE.Object3D()
    
    const geometry = new THREE.CylinderGeometry( 2.87, .5, 0.1, 32, 32, true );
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color("rgb(50, 50, 50)"),
      specular: 0x000000,
      shininess: 0,
      side: THREE.DoubleSide,
    })
    const circle = new THREE.Mesh(geometry, floorMaterial)
    circle.castShadow = true
    circle.receiveShadow = true
    circle.rotation.x =  -Math.PI / 2
    circle.position.z = -1
    circle.position.x = -0
    circle.name = "module"
    
    const geoLight = new THREE.CircleGeometry(3.0, 32)
    const matLight = new THREE.MeshBasicMaterial()
    matLight.color.r = cnfgColor.brain.r
    matLight.color.g = cnfgColor.brain.g
    matLight.color.b = cnfgColor.brain.b
    const modLight = new THREE.Mesh(geoLight, matLight);
    modLight.position.z = -1.5
    modLight.name = "light"
    
    const geoCore = new THREE.CircleGeometry(1.0, 32)
    const matCore = new THREE.MeshBasicMaterial()
    matCore.color.r = cnfgColor.health.r
    matCore.color.g = cnfgColor.health.g
    matCore.color.b = cnfgColor.health.b
    const modCore = new THREE.Mesh(geoCore, matCore);
    modCore.position.z = -1.4
    modCore.name = "core"
    
    const geoCap = new THREE.CircleGeometry(.2, 32)
    const matCap = new THREE.MeshLambertMaterial({
      color: new THREE.Color("rgb(5, 5, 5)"),
      side: THREE.DoubleSide,
      transparent: false,
      opacity: 1.0,
      depthTest: true,
    })
    const modCap = new THREE.Mesh(geoCap, matCap);
    modCap.position.z = -1.3
    group.add(modCap)
    group.add(modCore)
    group.add(modLight)
    group.add(circle)
    return group
  }
  
createIndicator({segment, radiusA, radiusB, lineRatio, lineWidth, style}){

  let posA = []
  let posB = []
  let posAB = []
  let color = []
  var angle = 2 * Math.PI / segment;
  const geometry = new THREE.BufferGeometry()

  for (let i = 0; i < segment; i++) {
    var x = radiusA * Math.cos(angle * i);
    var y = radiusA * Math.sin(angle * i);
    posA.push(x, y, 0);
  }

  for (let i = 0; i < segment; i++) {
    var x = radiusB * Math.cos(angle * i);
    var y = radiusB * Math.sin(angle * i);
    posB.push(x, y, 0);
  }

  for (var i = 0; i < posA.length; i += 6) {
    posAB[i + 0] = posA[i + 0]
    posAB[i + 1] = posA[i + 1]
    posAB[i + 2] = posA[i + 2]
    posAB[i + 3] = posB[i + 0]
    posAB[i + 4] = posB[i + 1]
    posAB[i + 5] = posB[i + 2]
  }

  const rgb = cnfgColor.health
  const rgbPercent = 0.0
  for (var i = 0; i < posAB.length; i += 6) {
    color[i + 0] = rgb.r * rgbPercent
    color[i + 1] = rgb.g * rgbPercent
    color[i + 2] = rgb.b * rgbPercent
    color[i + 3] = rgb.r * rgbPercent
    color[i + 4] = rgb.g * rgbPercent
    color[i + 5] = rgb.b * rgbPercent
  }

  geometry.attributes.position = new THREE.Float32BufferAttribute(posAB, 3)
  geometry.attributes.color = new THREE.Float32BufferAttribute(color, 3)
  geometry.computeBoundingSphere()

  //const linewidth = configL01.brainHealthWidth
  const materialL = new THREE.LineBasicMaterial({
    //color: 0xffffff,
    vertexColors: true,
    depthTest: false,
    linewidth: 1 /*lineWidth*/,
  });

  const lines = new THREE.LineSegments(geometry, materialL)
  lines.position.z = -1.0
  lines.rotation.z = -Math.PI/2
  lines.scale.x =-1
  
  const ptexture = new THREE.TextureLoader().load('./textures/alpha2.jpg')
  const pMaterial = new THREE.PointsMaterial({
    //color: 0xFFFFFF,
    size: configL01.tubePoint/2.,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.SrcAlphaFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    depthTest: false,
    transparent: false,
    sizeAttenuation: false,
    vertexColors: true,
    alphaMap: ptexture,
  });
  
  const points = new THREE.Points(geometry, pMaterial)
  points.position.z = -1.0
  points.rotation.z = -Math.PI / 2
  points.scale.x = -1
  
  if(style === "point"){
    return points
  }else if (style === "line"){
    return lines
  }
  

  }
}
