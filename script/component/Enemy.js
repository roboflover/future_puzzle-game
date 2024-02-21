// import {scene, container, renderer, controls, THREE} from './../component/Init.js';
// //import * as THREE from './../lib/three.module.js';

class Enemy {
  constructor(scene){
    this.scene = scene;
    let arr = [];
    this.mesh;
    this.turboMesh;
    this.lepestok;
    let mesh;
    this.count = 35;
   // 'textures/test.jpg'
   // console.log(this.turboMesh)
    
      //loaderModule.load("./models/model.json", function ( geometry ) {  
     
  }
  createCube(){
    // this.geometry = new THREE.BoxGeometry( 100, 100, 100 );
    // this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // this.cube = new THREE.Mesh( this.geometry, this.material );
    // this.cube2 = new THREE.Mesh( this.geometry, this.material );
    // this.cube2.position.y = 100;
    // this.cube2.scale.set(0.5, .5,.5);

    // this.cube.position.x = 0;
    
    // this.pivot = new THREE.Object3D();
    // this.pivot.add(this.cube);
    // this.pivot.rotation.x = 90;
    
    // this.scene.add(this.pivot)
    // this.scene.add( this.cube );
    // this.scene.add( this.cube2 );
  }

  loadBufferGeometry = (url, scale, texture, rotate, group) => {
    const loader = new THREE.BufferGeometryLoader();
    loader.load( url,  (geometry) => {
        this.texture = new THREE.TextureLoader().load( texture );
        //console.log(geometry)
        this.geometry = geometry
        this.material = new THREE.MeshBasicMaterial( {map: this.texture} );
        //console.log(this.material);
        geometry.computeVertexNormals();
        geometry.scale(scale, scale, scale);
        
        this.mesh = new THREE.InstancedMesh(geometry, this.material, this.count);
        //console.log(this.mesh)
        //this.mesh.rotation.set(new THREE.Vector3( 0, 0, Math.PI / 2));
        //this.mesh.rotation.z = (Math.PI / 2) * rotate;
        this.mesh.rotateZ(THREE.Math.degToRad(rotate));
        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame       
        group.add(this.mesh);
        //this.lepestok = mesh;
        //console.log(this.mesh)
        //console.log('мэш 0', mesh)
        
      }
    );
  }
}


