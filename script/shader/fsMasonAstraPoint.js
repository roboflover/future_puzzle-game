const fsMasonAstraPoint = `
  // #include <common>
   uniform vec2 iResolution;
   uniform float iTime;
   uniform float iD;
   uniform float iLen;
   uniform float iAsc;
   varying vec4 vColor;
   varying vec2 vUv;
   varying vec2 pCoord;

void mainImage(out vec4 fragColor, in vec2 fragCoord, float alpha)
{
  float d = 1.9;
 
  vec2 vUv = gl_PointCoord / .5 -1.;
  vUv.x *= iResolution.x / iResolution.y;
  
  float f = 1. / length(vUv);
  f += atan(vUv.x, vUv.y) / asin(.7);
  f -= iTime;
  f = floor(fract(f) *d);
  f *= sin(length(vUv) - .0);
  
  float t = 1. / length(vUv);
  t += atan(vUv.y, vUv.x) / acos(.7);
  t -= iTime;
  t = floor(fract(t) * d);
  t *= sin(length(vUv) - .0);
  
  float w = t+f;  
  float aw = alpha-w;
  
  float s = sin(iTime*2.);
  
  fragColor = vec4(vColor.r, vColor.g, vColor.b, aw);
}
     
     void main() {
     
     float dist = length(gl_PointCoord - vec2(0.5));
     float alpha = 1. - smoothstep(0.45, 0.5, dist);
     
     mainImage(gl_FragColor, gl_FragCoord.xy, alpha);
      
}

`;
