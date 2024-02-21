const fsMasonPoint = `

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
  float d = iD;
  float lll = iLen;
  float asc = iAsc;
  
  vec2 vUv = gl_PointCoord / .5 -1.;
  
  float f = lll / length(vUv);
  f += atan(vUv.x, vUv.y) / acos(asc);
  f -= iTime;
  f = floor(fract(f) *d);
  f *= cos(length(vUv) - .0);
  
  float t = lll / length(vUv);
  t += atan(vUv.y, vUv.x) / asin(asc);
  t -= iTime;
  t = floor(fract(t) * d);
  t *= sin(length(vUv) - .0);
  
  float w = f+t;  
  float aw = alpha-w;
  float newt = iTime*2.;
  float s = sin(newt*1.);
  
  fragColor = vec4(vColor.r, vColor.g, vColor.b, aw);
}
     
void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = 1. - smoothstep(0.45, 0.5, dist);
  mainImage(gl_FragColor, gl_FragCoord.xy, alpha);
}

`;
