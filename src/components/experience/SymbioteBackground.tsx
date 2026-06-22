import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Full-viewport WebGL "symbiote" background.
 * - Custom GLSL fragment shader using FBM noise -> liquid black with red rim
 * - GPU particle field (smoke / sparks)
 * - Subtle parallax with mouse + scroll
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform vec2  uRes;

  // Hash & noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.,0.));
    float c = hash(i + vec2(0.,1.));
    float d = hash(i + vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i=0;i<6;i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.08;

    // Domain-warped liquid (black smoke)
    vec2 q = vec2(fbm(p + t), fbm(p - t + 5.2));
    vec2 r = vec2(fbm(p + q + vec2(1.7,9.2) + t*1.5), fbm(p + q + vec2(8.3,2.8) - t));
    float liquid = fbm(p + r * 1.6 + uMouse*0.25);

    // Deep ink base
    vec3 base = vec3(0.025, 0.022, 0.018);
    vec3 ink  = vec3(0.0);

    // Golden rim where liquid is thin
    float rim  = smoothstep(0.44, 0.60, liquid) - smoothstep(0.60, 0.82, liquid);
    vec3  gold = vec3(1.0, 0.78, 0.0) * rim * 0.55;

    // Hot neon-yellow core pools
    float pool = smoothstep(0.72, 1.0, liquid);
    vec3  neon = vec3(1.0, 0.92, 0.0) * pool * 0.38;

    // Scroll-driven golden wash on the right
    float wash = smoothstep(0.55, 1.0, uv.x) * uScroll * 0.28;
    gold += vec3(1.0, 0.84, 0.0) * wash;

    // Lightning-like vertical streaks
    float bolt = smoothstep(0.985, 1.0, fbm(vec2(uv.x * 18.0, uTime * 0.6)));
    gold += vec3(1.0, 0.95, 0.4) * bolt * 0.6;

    // Vignette
    float vig = smoothstep(1.25, 0.3, length(p));

    vec3 col = mix(ink, base, vig) + gold + neon;

    // Film grain
    col += (hash(uv * uRes + uTime) - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function LiquidPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame(({ size, clock, pointer }) => {
    mouse.current.lerp(pointer, 0.05);
    const sp =
      typeof window !== "undefined"
        ? Math.min(1, window.scrollY / (window.innerHeight * 3))
        : 0;
    scrollRef.current += (sp - scrollRef.current) * 0.05;
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uMouse.value.copy(mouse.current);
    uniforms.uScroll.value = scrollRef.current;
    uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={ref} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const a = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      a[ix + 1] += 0.004 + Math.sin(t + i) * 0.0008;
      if (a[ix + 1] > 6) a[ix + 1] = -6;
      a[ix + 0] += Math.sin(t * 0.3 + i) * 0.001;
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = pointer.x * 0.15;
    ref.current.rotation.x = pointer.y * -0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={0xff003c}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function SymbioteBackground() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 55 }}
    >
      <color attach="background" args={["#050505"]} />
      <LiquidPlane />
      <Particles />
    </Canvas>
  );
}
