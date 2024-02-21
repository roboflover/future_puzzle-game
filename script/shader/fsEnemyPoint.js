const fsEnemyPoint  = `
  // #include <common>
   uniform vec2 iResolution;
   uniform float iTime;
   varying vec3 vColor;
   varying vec2 vUv;
   varying vec2 pCoord;

void mainImage(out vec4 fragColor, in vec2 fragCoord, float alpha)
{
  float d = 1.9;

  vec2 vUv = gl_PointCoord / .5 - 1.;
  vUv.x *= iResolution.x / iResolution.y;

  float f = 1. / length(vUv);
  f += atan(vUv.x, vUv.y) / asin(.7);
  f -= iTime;
  f = floor(fract(f) * d);
  f *= sin(length(vUv) - .0);

  float t = 1. / length(vUv);
  t += atan(vUv.y, vUv.x) / acos(.7);
  t -= iTime;
  t = floor(fract(t) * d);
  t *= sin(length(vUv) - .0);

  float w = t + f;
  float aw = alpha - w;
  fragColor = vec4(1., 0., 0., aw);
}
     
     void main() {
     
     float dist = length(gl_PointCoord - vec2(0.5));
     float alpha = 1. - smoothstep(0.45, 0.5, dist);
     gl_FragColor = vec4(1., 1., 0., alpha);
     
     mainImage(gl_FragColor, gl_FragCoord.xy, alpha);
      
}

`;
