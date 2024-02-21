const vsBgLine = `  
    float size = 2.;
    varying vec3 vColor;
    uniform vec3 width;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
    `;
