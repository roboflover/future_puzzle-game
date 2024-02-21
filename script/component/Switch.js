class Switch {
  constructor() {
  this.mesh = new THREE.Object3D();
  let level;
  level = new Level();
  this.mesh.add(level.mesh);
  }
}


