let scene, HEIGHT, WIDTH;
let renderer, container, composer;
let camera, aspectRatio, fieldOfView, nearPlane, farPlane;
let controls, stats

const createScene = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10500;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  const axesHelper = new THREE.AxesHelper( 10 )
  //scene.add( axesHelper )  
  camera.position.x = configL01.camX
  camera.position.y = configL01.camY
  camera.position.z = configL01.camZ
  
  scene.background = null;
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world')
  container.appendChild(renderer.domElement)
  //stats = new Stats()
  //document.body.appendChild(stats.dom)
  //controls = new THREE.OrbitControls( camera, renderer.domElement )
   //controls.enablePan = true
 // controls.enableRotate = true

const lightA = new THREE.AmbientLight(0x404040)
const lightARGB = 0.3
lightA.color.r = lightARGB
lightA.color.g = lightARGB
lightA.color.b = lightARGB

scene.add(lightA)
//lightA.castShadow = true
//lightA.shadowBias = 0.00001
//lightA.shadowDarkness = 0.2
//lightA.shadowMapWidth = 2048 // Shadow Quality
//lightA.shadowMapHeight = 2048 // Shadow Quality
//scene.add(new THREE.AmbientLight(0xffffff, 1))
 
let spotRight = new THREE.SpotLight(0x000000)
const sp = .21
spotRight.color.r = sp * cnfgColor.spiralA.r 
spotRight.color.g = sp * cnfgColor.spiralA.g
spotRight.color.b = sp * cnfgColor.spiralA.b
spotRight.position.set(-5, 0, 10)
spotRight.target.position.set(-5, 15, -30)
spotRight.castShadow = true
spotRight.shadow.bias = 0.00001
//spotRight.shadowDarkness = 0.2
//spotRight.shadowMapWidth = 2048 // Shadow Quality
//spotRight.shadowMapHeight = 2048 // Shadow Quality
scene.add(spotRight.target)
scene.add(spotRight);

let spotLeft = new THREE.SpotLight(0x000000)
spotLeft.color.r = sp * cnfgColor.spiralB.r 
spotLeft.color.g = sp * cnfgColor.spiralB.g
spotLeft.color.b = sp * cnfgColor.spiralB.b 
spotLeft.position.set(5, 0, 10)
spotLeft.target.position.set(5, 15, -30)
spotLeft.castShadow = true
spotLeft.shadow.bias = 0.00001
//spotLeft.shadowDarkness = 0.2
//spotLeft.shadowMapWidth = 2048 // Shadow Quality
//spotLeft.shadowMapHeight = 2048 // Shadow Quality
scene.add(spotLeft.target)
scene.add(spotLeft);

/*
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ // Required For Shadows
  color: 0xecebec,
  specular: 0x000000,
  shininess: 100
});

//Cube
var cube = new THREE.Mesh(geometry, material)
cube.position.x = -5.8
cube.position.y = 0.8
cube.castShadow = true
cube.receiveShadow = true
scene.add(cube)
//camera.position.z = 3;
//camera.position.y = 1.8;
//camera.position.x = 0;
*/
/*
const geoTest = new THREE.CylinderGeometry(2.87, .5, 0.1, 32, 32, true);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: new THREE.Color("rgb(50, 50, 50)"),
  specular: 0x000000,
  shininess: 0,
  side: THREE.DoubleSide,
})
const circle = new THREE.Mesh(geoTest, floorMaterial)
circle.castShadow = true
circle.receiveShadow = true
circle.rotation.x = Math.PI / 2
circle.position.z = -1
circle.position.x = -0
scene.add(circle)
*/
// Floor



// postprocessing

//composer = new THREE.EffectComposer( renderer );
//composer.addPass( new THREE.RenderPass( scene, camera ) );
//const effect1 = new THREE.ShaderPass(DotScreenShader);
//effect1.uniforms['scale'].value = 4;
//composer.addPass(effect1);
//scene.fog = new THREE.FogExp2( 0xffffff, 0.01 );
//document.addEventListener( 'mousemove', onMouseMove )

}
/*
function onMouseMove() {
  event.preventDefault()
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
}
*/
createScene()
// export {scene, container, renderer, controls, camera, THREE};
