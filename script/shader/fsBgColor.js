const fsBgColor  = `

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMixcolA;
uniform vec3 iMixcolB;



float dist(vec2 p0, vec2 pf) { return sqrt((pf.x - p0.x) * (pf.x - p0.x) + (pf.y - p0.y) * (pf.y - p0.y)); }
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  float newTime = iTime*4.;
  float sinT = sin(newTime*0.5+0.7);
  float d = dist(iResolution.xy * 0.5, fragCoord.xy) * 0.003;
  vec4 ramp = mix(vec4(iMixcolB.r, iMixcolB.g, iMixcolB.b, 1.), vec4(iMixcolA.r, iMixcolA.g, iMixcolA.b, 1.), d);
  fragColor = ramp;
  fragColor = vec4(vec3(ramp.x, ramp.y, ramp.z), .12);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;
