const fsModule = `

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMixcolB;
uniform vec3 iMixcolA;

float dist(vec2 p0, vec2 pf){

float sq = sqrt((pf.x-p0.x)*(pf.x-p0.x)+(pf.y-p0.y)*(pf.y-p0.y));
return sq;
  
}
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  float uniS = .5;
  float d = dist(iResolution.xy * .5, fragCoord.xy) * (sin(iTime*uniS) + 1.5) * 0.007;
  vec4 ramp = mix(vec4(iMixcolB.r, iMixcolB.g, iMixcolB.b, 0.35), vec4(iMixcolA.r, iMixcolA.g, iMixcolA.b, 0.31), d);
  
  fragColor = ramp;
  

}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;
