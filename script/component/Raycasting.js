class Raycasting {
  constructor({psize, mspoints, bpoints, index}) {
    this.psize = psize
    //this.mspoints = mspoints
    //this.bpoints = bpoints,
    this.index = index
    this.raycaster = new THREE.Raycaster()
    this.raycaster.params.Points.threshold = 0.5
    this.pointer = new THREE.Vector2()
  }
  
  setEventListener(){
    window.addEventListener('pointerdown', (event) => {
     this.pointerDown()
    })
    window.addEventListener('pointerout', () => this.pointer.set(99999, 99999))
  }
  
  pointerDown(){
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  
  renderraycast(objects) {
    this.raycaster.setFromCamera(this.pointer, camera)
    let intersects = this.raycaster.intersectObject(objects)

    if (intersects.length > 0) {
      if (this.index != intersects[0].index) {
        this.index = intersects[0].index
      
      }
    } else if (this.index !== null) {
      this.index = null
      
    } 
    
    if(this.index != undefined)
    return this.index
    
  }
  
}
