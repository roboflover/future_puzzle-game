class Bgcolor {
  constructor(){
    this.uniforms
    this.group = new THREE.Group()
  }
  
  createShaderBgColor() {

    const uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector2(100., 100.) },
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
    
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.ShaderMaterial({
       uniforms: uniforms,
       vertexShader: vsBgColor,
       fragmentShader: fsBgColor,
       blending: THREE.AdditiveBlending,
       depthTest: true,
       transparent: true,
       vertexColors: true
     });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.z = 20
    
    this.group.add(plane);
    this.uniforms = uniforms
  }
  
  createBackground() {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshLambertMaterial({
          color: new THREE.Color("rgb(50,50, 50)"),
          side: THREE.DoubleSide,
          transparent: false,
          opacity: 1.0,
          depthTest: true,
        })
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color("rgb(70, 70, 70)"),
      specular: 0x000000,
      shininess: 0
    });
    const plane = new THREE.Mesh(geometry, floorMaterial)
    plane.receiveShadow = true;
    plane.position.z = -20
    
    var floorGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color("rgb(70, 70, 70)"),
      specular: 0x000000,
      shininess: 0
    })
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI;
    floor.position.y = -10
    floor.receiveShadow = true;
    this.group.add(floor);
    
    this.group.add(plane)
  }
}
