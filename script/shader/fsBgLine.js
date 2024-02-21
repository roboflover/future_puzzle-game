const fsBgLine  = `
   uniform float iTime;
    
    varying vec3 vColor;
     
     void main() {
     
     vec2 uv = gl_FragColor.xy / .5 - 1.;
     
     float one;
     one = cos(iTime * 1.000 + distance(uv, vec2(0.0, 0.0)) * 8.0) * 0.5 + 0.5;
     one += cos(iTime * 0.666 + distance(uv, vec2(1.0, 0.0)) * 8.0) * 0.5 + 0.5;
     one += cos(iTime * 0.777 + distance(uv, vec2(0.5, 1.3)) * 8.0) * 0.5 + 0.5;
     one = one / 3.0;
     
     float radius = .001;
     float dist = length(gl_PointCoord - vec2(0.5));
     float alpha = 1. - smoothstep(0.45, 0.5, dist);

     gl_FragColor = vec4(0.,0.,0., 0.0);
     
     
      
}`;
