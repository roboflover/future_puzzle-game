const fsBonusPoint  = `
  // #include <common>
   uniform vec2 iResolution;
   uniform float iTime;
   uniform float iOpacity;
   uniform float iD;
   uniform float iLen;
   uniform float iAsc;
   varying vec4 vColor;
   varying vec2 vUv;
   varying vec2 pCoord;


 // vColor = color;
void mainImage(out vec4 fragColor, in vec2 fragCoord, float alpha)
{
  float d = iD;
  float lll = iLen;
  float asc = iAsc;
 
  vec2 vUv = gl_PointCoord / .5 -1.;
  vUv.x *= iResolution.x / iResolution.y;
  
  float f = lll / length(vUv);
  f += atan(vUv.x, vUv.y) / acos(asc);
  f -= iTime;
  f = floor(fract(f) * d);
  f *= cos(length(vUv) - .0);
  
  float t = 1. / length(vUv);
  t += atan(vUv.y, vUv.x) / acos(.7);
  t -= iTime;
  t = floor(fract(t) * d);
  t *= sin(length(vUv) - .0);
  
  float w = t+f;  
  float aw = alpha-f;
  float newt = iTime*2.;
  float s = sin(newt*1.);
  
  float r = 0.5;
  float a = pow(r, 2.0);
  float b = sin(r * 0.8 - 1.6);
  float c = sin(r - 0.010);
  float ss = sin(a - iTime * 3.0 + b) * c;
  ss = s*ss;
  
  fragColor = vec4(vColor.r, vColor.g, vColor.b, aw*iOpacity);
}
     
     void main() {
     
     float dist = length(gl_PointCoord - vec2(0.5));
     float alpha = 1. - smoothstep(0.45, 0.5, dist);
     //gl_FragColor = vec4(vColor.r, vColor.g, vColor.b, alpha);
     
     mainImage(gl_FragColor, gl_FragCoord.xy, alpha);
      
}

`;
