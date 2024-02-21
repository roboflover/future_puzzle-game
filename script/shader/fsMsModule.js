const fsMsModule  = `
  // #include <common>
   uniform vec2 iResolution;
   uniform float iTime;
   varying vec4 vColor;
   varying vec2 vUv;
   varying vec2 pCoord;


 // vColor = color;
void mainImage(out vec4 fragColor, in vec2 fragCoord, float alpha)
{
  vec2 vUv = gl_PointCoord / .5 - 1.;
  vUv.x *= iResolution.x / iResolution.y;
  vec4 newcolor = vec4(vColor * 0.5);
  
  vec2 c = fragCoord - 0.5*iResolution.xy;
  c = vUv * vec2(25.0001);
  float pi = 3.141592;
  float ang = atan(c.y,c.x); 
  float dist = sqrt(c.x*c.x + c.y*c.y);
  float spiral = dist*0.1 - 5.*(1.8);
  float sp = ceil(-0.5+sin(spiral))*0.5;
  vec3 spRGB = vec3(newcolor.r + sp, newcolor.g + sp, newcolor.b + sp);
  
  float dist2 = length(gl_PointCoord - vec2(0.5));
  float alpha2 = 1. - smoothstep(0.3, 0.5, dist2);
  
  spRGB = vec3(spRGB.r-alpha2, spRGB.g-alpha2, spRGB.b-alpha2);
  
  fragColor = vec4(spRGB.r, spRGB.g, spRGB.b, alpha);
}
     
     void main() {
     
     float dist = length(gl_PointCoord - vec2(0.5));
     float alpha = 1. - smoothstep(0.45, 0.5, dist);
     //gl_FragColor = vec4(vColor.r, vColor.g, vColor.b, alpha);
     
     mainImage(gl_FragColor, gl_FragCoord.xy, alpha);
      
}

`;
