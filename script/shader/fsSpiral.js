const fsSpiral  = `

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMixcolB;
uniform vec3 iMixcolA;

float dist(vec2 p0, vec2 pf){return sqrt((pf.x-p0.x)*(pf.x-p0.x)+(pf.y-p0.y)*(pf.y-p0.y));}
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  float d = dist(iResolution.xy * 0.5, fragCoord.xy) * (sin(iTime*0.5) + 1.5) * 0.003;
  vec4 ramp = mix(vec4(iMixcolB.r, iMixcolB.g, iMixcolB.b, .25), vec4(iMixcolA.r, iMixcolA.g, iMixcolA.b, 0.8), d);
  fragColor = ramp;
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;
