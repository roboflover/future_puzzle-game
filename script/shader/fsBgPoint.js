const fsBgPoint  = `
   // attribute vec3 color;
    varying vec2 vUv;
    varying vec3 vColor;
    uniform float iTime;
     
     void main() {
     
     vec2 uv = gl_FragColor.xy / .5 - 1.;
     
     float radius = .001;
     float dist = length(gl_PointCoord - vec2(0.5));
     float alpha = 1. - smoothstep(0.45, 0.5, dist);
     
     float one;
     one = cos(iTime * 1.000 + distance(uv, vec2(0.0, 0.0)) * 8.0) * 0.5 + 0.5;
     one += cos(iTime * 0.666 + distance(uv, vec2(1.0, 0.0)) * 8.0) * 0.5 + 0.5;
     one += cos(iTime * 0.777 + distance(uv, vec2(0.5, 1.3)) * 8.0) * 0.5 + 0.5;
     float oneA = one / 3.0 *vColor.x +0.5;
     float oneB = one / 3.0 *vColor.y +0.5;
     gl_FragColor = vec4(vec3(oneA, 0., oneB), alpha);
    // gl_FragColor = vec4(vColor, alpha);
     

      
}`;
