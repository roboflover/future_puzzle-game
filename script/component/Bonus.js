class Bonus {
  constructor(bonusMeshes, bonusData) {
    this.bonusData = bonusData
    this.bonusMeshes = bonusMeshes
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iD: { value: iDMason },
      iLen: { value: iLength },
      iAsc: { value: iAsc },
    }
    this.uniformsEff = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iMixcolA:  { value: new THREE.Vector3(
          cnfgColor.spiralA.r,
          cnfgColor.spiralA.g,
          cnfgColor.spiralA.b,
    ) },
        iMixcolB:  { value: new THREE.Vector3(
          cnfgColor.spiralB.r,
          cnfgColor.spiralB.g,
          cnfgColor.spiralB.b,
    ) },
    }
  }
  // 
  setParam() {
    const data = {
      velocity: new THREE.Vector3(
        (-1 + Math.random() * 2) * 0.1,
        (-1 + Math.random() * 2) * 0.1,
        (-1 + Math.random() * 2) * 0.1
        ),
      time: 1}
    return data
  }

  createBonus(){
    //this.setVelocity(this.data)
    const PARTICLE_SIZE = configL01.masonSize * 0.7
    const position = [0, 0, 0]
    const geometry = new THREE.BufferGeometry()
    const sizes = [PARTICLE_SIZE]
    const colors = [cnfgColor.bonus.r, cnfgColor.bonus.g, cnfgColor.bonus.b]
    /*
    for (let i = 0; i < position / 3; i++) {
      sizes.push(PARTICLE_SIZE)
    }
    */
    geometry.attributes.color = new THREE.Float32BufferAttribute(colors, 3)
    geometry.attributes.position = new THREE.Float32BufferAttribute(position, 3)
    geometry.attributes.size = new THREE.Float32BufferAttribute(sizes, 1)
    //console.log(geometry.attributes)
    const mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vsBonusPoint,
    fragmentShader: fsBonusPoint,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    transparent: true,
    vertexColors: true
  })
    
    const pMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: configL01.tubePoint,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      sizeAttenuation: false,
      //vertexColors: true,
      //alphaMap: ptexture,
    })
    const point = new THREE.Points(geometry, mat)
    //console.log(point)
    return point
  }
  
  addBonus(){
    const bonus = this.createBonus()
    const data = this.setParam()
    scene.add(bonus)
    this.bonusMeshes.push(bonus)
    this.bonusData.push(data)
  }
  
  addEffect(){
    
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color("rgb(70, 70, 70)"),
      specular: 0x000000,
      shininess: 0
    })
    
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniformsEff,
      vertexShader: vsBonusEffect,
      fragmentShader: fsBonusEffect,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
      vertexColors: true
    })
    
    const geometry = new THREE.PlaneGeometry(100, 100);
    
    const plane = new THREE.Mesh(geometry, mat);
    plane.position.z = 20
    scene.add(plane)
  }
}
