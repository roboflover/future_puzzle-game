const vsBgColor = `  
    float size = 2.;
    varying vec3 vColor;
    varying vec2 vUv;

    
    
    void main() {
    
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
     // gl_PointSize = size * (300.0 / -mvPosition.z);
      //gl_PointSize = 10. * (1.5 / - mvPosition.z) + 10.;    
      gl_Position = projectionMatrix * mvPosition;
    }
    `;
