import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars, Sparkles, Text3D, Center, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { onScrollProgress } from "@/hooks/use-lenis";
import { PRODUCTS } from "@/lib/products";

/* ------------------- Scroll signal ------------------- */
const scrollRef = { value: 0, mouse: new THREE.Vector2() };
if (typeof window !== "undefined") {
  onScrollProgress((p) => (scrollRef.value = p));
  window.addEventListener("mousemove", (e) => {
    scrollRef.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    scrollRef.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
  });
}

/* ------------------- Fashion Character (stylized) ------------------- */
function FashionCharacter() {
  const group = useRef<THREE.Group>(null!);
  const head = useRef<THREE.Mesh>(null!);
  const torso = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollRef.value;
    if (group.current) {
      // breathe
      group.current.position.y = Math.sin(t * 1.2) * 0.08 - p * 2.5;
      // mouse react
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        scrollRef.mouse.x * 0.4 + p * Math.PI * 0.8,
        0.05
      );
      group.current.rotation.x = scrollRef.mouse.y * 0.08;
      // scale collapse on later scroll
      const s = 1 - Math.min(0.8, p * 1.2);
      group.current.scale.setScalar(Math.max(0.2, s));
    }
    if (head.current) head.current.rotation.y = scrollRef.mouse.x * 0.2;
    if (torso.current) {
      (torso.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
        0.4 + Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh ref={head} position={[0, 1.9, 0]} castShadow>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshPhysicalMaterial
          color="#1a1a1f"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#A855F7"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 1.92, 0.32]}>
        <boxGeometry args={[0.6, 0.12, 0.2]} />
        <meshPhysicalMaterial
          color="#EC4899"
          emissive="#EC4899"
          emissiveIntensity={2}
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Torso (oversized hoodie shape) */}
      <mesh ref={torso} position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.9, 1.2, 8, 24]} />
        <meshPhysicalMaterial
          color="#0a0a0f"
          metalness={0.4}
          roughness={0.6}
          clearcoat={0.5}
          emissive="#3B82F6"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Arms */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 1.1, 0.4, 0]} rotation={[0, 0, s * 0.15]} castShadow>
          <capsuleGeometry args={[0.22, 1.4, 6, 16]} />
          <meshPhysicalMaterial color="#0a0a0f" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
      {/* Legs (cargo) */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.35, -1.1, 0]} castShadow>
          <capsuleGeometry args={[0.28, 1.4, 6, 16]} />
          <meshPhysicalMaterial color="#1a1a22" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      {/* Sneakers */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.35, -2, 0.15]} castShadow>
          <boxGeometry args={[0.45, 0.25, 0.7]} />
          <meshPhysicalMaterial color="#E5E7EB" metalness={0.5} roughness={0.2} emissive="#EC4899" emissiveIntensity={0.2} />
        </mesh>
      ))}
      {/* Aura ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2.15, 0]}>
        <ringGeometry args={[1.6, 1.7, 64]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ------------------- Floating Product Pieces ------------------- */
function buildProductGeo(shape: string) {
  switch (shape) {
    case "sneaker": return <boxGeometry args={[0.9, 0.45, 1.4]} />;
    case "cargo":   return <cylinderGeometry args={[0.35, 0.45, 1.6, 16]} />;
    case "denim":   return <cylinderGeometry args={[0.4, 0.5, 1.6, 12]} />;
    case "jacket":  return <boxGeometry args={[1.4, 1.5, 0.4]} />;
    case "hoodie":  return <boxGeometry args={[1.3, 1.4, 0.5]} />;
    case "tee":     return <boxGeometry args={[1.2, 1.2, 0.25]} />;
    case "accessory": return <torusGeometry args={[0.5, 0.18, 16, 64]} />;
    default: return <boxGeometry args={[1, 1, 1]} />;
  }
}

function FloatingProducts() {
  const items = useMemo(
    () =>
      PRODUCTS.map((p, i) => {
        const angle = (i / PRODUCTS.length) * Math.PI * 2;
        const radius = 4.5;
        return {
          p,
          basePos: new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(i * 1.3) * 1.2,
            Math.sin(angle) * radius - 1
          ),
          angle,
        };
      }),
    []
  );

  return (
    <group>
      {items.map(({ p, basePos, angle }, i) => (
        <Float
          key={p.id}
          speed={1.5 + (i % 3) * 0.4}
          rotationIntensity={0.8}
          floatIntensity={1.2}
        >
          <ProductMesh basePos={basePos} angle={angle} index={i} color={p.color} accent={p.accent} shape={p.shape} />
        </Float>
      ))}
    </group>
  );
}

function ProductMesh({ basePos, angle, index, color, accent, shape }: {
  basePos: THREE.Vector3; angle: number; index: number; color: string; accent: string; shape: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollRef.value;
    if (!ref.current) return;
    // Explosion outward as scroll progresses
    const explode = Math.max(0, (p - 0.25) * 6);
    const dir = new THREE.Vector3(basePos.x, basePos.y, basePos.z).normalize();
    ref.current.position.x = basePos.x + dir.x * explode * 1.8 + Math.cos(t * 0.5 + index) * 0.3;
    ref.current.position.y = basePos.y + Math.sin(t * 0.7 + index) * 0.4 + (p > 0.5 ? Math.sin(t + index) * 2 : 0);
    ref.current.position.z = basePos.z + dir.z * explode * 1.8;
    ref.current.rotation.x += 0.005 + p * 0.02;
    ref.current.rotation.y += 0.007 + p * 0.03;
  });

  return (
    <mesh ref={ref} castShadow>
      {buildProductGeo(shape)}
      <meshPhysicalMaterial
        color={color}
        metalness={0.6}
        roughness={0.25}
        clearcoat={1}
        clearcoatRoughness={0.15}
        emissive={accent}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/* ------------------- Particles / Dust ------------------- */
function DustField() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.02;
      ref.current.rotation.x = scrollRef.value * 0.4;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#A855F7" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ------------------- Camera + Color Driver ------------------- */
function ScrollCameraRig() {
  const { camera, scene } = useThree();
  const target = useMemo(() => new THREE.Color("#050505"), []);
  useFrame(() => {
    const p = scrollRef.value;
    // Camera dolly forward, then up
    const camZ = 7 - p * 8;
    const camY = 0.5 + p * 2.5;
    const camX = Math.sin(p * Math.PI * 2) * 1.2 + scrollRef.mouse.x * 0.4;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(0, 0.5 - p * 1.5, -p * 4);

    // Background color blend: purple -> blue -> pink -> black
    const colors = ["#0a0316", "#1a0b3a", "#0b1a3a", "#3a0b27", "#050505"];
    const seg = p * (colors.length - 1);
    const idx = Math.floor(seg);
    const f = seg - idx;
    const a = new THREE.Color(colors[idx]);
    const b = new THREE.Color(colors[Math.min(idx + 1, colors.length - 1)]);
    target.copy(a).lerp(b, f);
    (scene.background as THREE.Color).copy(target);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(target);
  });
  return null;
}

/* ------------------- Runway ------------------- */
function Runway() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const p = scrollRef.value;
    if (ref.current) {
      ref.current.position.z = -p * 30 + 5;
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        p > 0.4 ? 1.2 + Math.sin(s.clock.elapsedTime * 2) * 0.4 : 0;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]} receiveShadow>
      <planeGeometry args={[6, 80, 1, 80]} />
      <meshStandardMaterial
        color="#0a0a14"
        metalness={0.8}
        roughness={0.2}
        emissive="#A855F7"
        emissiveIntensity={0}
      />
    </mesh>
  );
}

/* ------------------- Main Scene ------------------- */
export function ImmersiveScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 7], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color("#050505");
        scene.fog = new THREE.Fog("#050505", 8, 28);
      }}
    >
      <Suspense fallback={null}>
        <ScrollCameraRig />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#A855F7"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-6, 3, 4]} intensity={2} color="#3B82F6" distance={20} />
        <pointLight position={[6, -2, 3]} intensity={2} color="#EC4899" distance={20} />
        <spotLight position={[0, 10, 0]} angle={0.6} penumbra={0.8} intensity={1.5} color="#ffffff" castShadow />

        <FashionCharacter />
        <FloatingProducts />
        <Runway />
        <DustField />
        <Sparkles count={150} scale={[20, 12, 20]} size={3} speed={0.5} color="#EC4899" />
        <Stars radius={60} depth={50} count={2000} factor={3} fade speed={1} />

        <EffectComposer>
          <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
          <ChromaticAberration offset={[0.0008, 0.0012] as any} radialModulation={false} modulationOffset={0} />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
