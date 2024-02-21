const fsBonusEffect  = `

uniform vec3 iResolution;
uniform float iTime;
uniform float iOpacity;
uniform vec3 iMixcolA;
uniform vec3 iMixcolB;

float dist(vec2 p0, vec2 pf) { return sqrt((pf.x - p0.x) * (pf.x - p0.x) + (pf.y - p0.y) * (pf.y - p0.y)); }

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{

  float newTime = iTime * 4.;
  float sinT = sin(newTime * 0.5 + 0.7);
  float d = dist(iResolution.xy * 0.5, fragCoord.xy) * 0.003;
  
  vec4 ramp = mix(vec4(iMixcolB.r, iMixcolB.g, iMixcolB.b, 1.), vec4(iMixcolA.r, iMixcolA.g, iMixcolA.b, 1.), d);

  vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  
  float sdf = length(uv) - 1.03125;
  
  vec4 col = vec4(0.152, 0.284, 0.768, 1.0) - step(0.0, sdf); 
  float count = 10.5;
  col *= vec4(
    0.5 * cos((col.x * -sdf * 6.283 * count) + iTime * 5.0) + 0.5,
    0.5 * cos((col.y * -sdf * 6.283 * count) + iTime * 5.0) + 0.5,
    0.5 * cos((col.z * -sdf * 6.283 * count) + iTime * 5.0) + 0.5,
    0.5 * cos((col.w * -sdf * 6.283 * count) + iTime * 5.0) + 0.5
  ); 
  
  col *= -clamp(sdf, -1.0, 0.0);
  col = col + vec4(0.1, 0.2, 0.4, 1.0);
  float alpha = col.r + col.g * col.b;
  fragColor = vec4(ramp.r, ramp.g, ramp.b, alpha*iOpacity); 
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
  //gl_FragColor = vec4(vec3(1.), .4);
}
`;
