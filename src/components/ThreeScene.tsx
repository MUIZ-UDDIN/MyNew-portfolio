"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { useTheme } from "@/lib/ThemeContext"

function useScrollProgressRef() {
  const raw = useRef(0)
  const smooth = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      raw.current = Math.min(window.scrollY / h, 1)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return { raw, smooth }
}

function useMousePositionRef() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * -2 }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])
  return ref
}

function CentralShape({ progressRef, mouseRef, isLight }: { progressRef: { raw: React.RefObject<number>; smooth: React.RefObject<number> }; mouseRef: React.RefObject<{ x: number; y: number }>; isLight: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const matRef = useRef<any>(null)
  const timeRef = useRef(0)
  const palette = useMemo(() => [
    new THREE.Color("#7c3aed"),
    new THREE.Color("#22d3ee"),
    new THREE.Color("#a78bfa"),
  ], [])

  useFrame((_, delta) => {
    if (!mesh.current) return
    timeRef.current += delta
    const progress = progressRef.smooth.current
    const mouse = mouseRef.current
    const eased = Math.min(progress / 0.2, 1)
    const targetY = 0.5 - progress * 2
    mesh.current.position.x += (mouse.x * 0.6 - mesh.current.position.x) * 0.03
    mesh.current.position.y += (targetY + mouse.y * 0.3 - mesh.current.position.y) * 0.03
    mesh.current.rotation.x = timeRef.current * 0.15 + mouse.y * 0.1
    mesh.current.rotation.y = timeRef.current * 0.2 + mouse.x * 0.1
    mesh.current.scale.setScalar(0.5 + eased * 0.3)

    if (matRef.current) {
      const idx = progress < 0.3 ? 0 : progress < 0.6 ? 1 : 2
      matRef.current.color.copy(palette[idx])
      matRef.current.emissive.copy(palette[idx])
      matRef.current.emissiveIntensity = (0.2 + progress * 0.4) * (isLight ? 0.3 : 1)
      matRef.current.opacity = isLight ? 0.6 : 1
      matRef.current.distort = 0.15 + 0.1 * Math.sin(timeRef.current * 0.5)
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0.5, 0]} scale={0.5}>
      <torusKnotGeometry args={[1.2, 0.35, 180, 24]} />
      <MeshDistortMaterial
        ref={matRef}
        roughness={0.15}
        metalness={0.9}
        speed={2}
        transparent
        opacity={isLight ? 0.6 : 1}
      />
    </mesh>
  )
}

function OrbitingShapes({ progressRef, isLight }: { progressRef: { raw: React.RefObject<number>; smooth: React.RefObject<number> }; isLight: boolean }) {
  const group = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  const opacity = isLight ? 0.5 : 0.8

  const configs = useMemo(() => [
    { radius: 2.8, speed: 0.4, size: 0.2, color: "#22d3ee", offset: 0, type: "ico" as const },
    { radius: 3.4, speed: -0.3, size: 0.15, color: "#a78bfa", offset: Math.PI / 3, type: "dode" as const },
    { radius: 2.2, speed: 0.5, size: 0.18, color: "#c084fc", offset: Math.PI / 1.5, type: "ico" as const },
    { radius: 4.0, speed: -0.2, size: 0.12, color: "#22d3ee", offset: Math.PI / 0.8, type: "dode" as const },
    { radius: 3.0, speed: 0.35, size: 0.25, color: "#6d28d9", offset: Math.PI / 2.2, type: "ico" as const },
  ], [])

  useFrame((_, delta) => {
    if (!group.current) return
    timeRef.current += delta
    const t = timeRef.current
    const progress = progressRef.smooth.current
    const enabled = Math.min(Math.max((progress - 0.05) / 0.15, 0), 1)
    group.current.children.forEach((child, i) => {
      const c = configs[i]
      const angle = t * c.speed + c.offset
      child.position.x = Math.cos(angle) * c.radius * enabled
      child.position.z = Math.sin(angle) * c.radius * enabled
      child.position.y = Math.sin(angle * 1.3) * 0.5 * enabled
      child.rotation.x = t * 0.5
      child.rotation.y = t * 0.8
      const s = c.size * (0.6 + 0.4 * Math.abs(Math.sin(t * 0.7 + i)))
      child.scale.setScalar(enabled * s)
    })
  })

  return (
    <group ref={group}>
      {configs.map((c, i) =>
        c.type === "dode" ? (
          <mesh key={i}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={c.color} metalness={0.6} roughness={0.2} transparent opacity={opacity} />
          </mesh>
        ) : (
          <mesh key={i}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial color={c.color} metalness={0.7} roughness={0.2} distort={0.1} transparent opacity={opacity} />
          </mesh>
        )
      )}
    </group>
  )
}

function ParticlesField({ progressRef, isLight }: { progressRef: { raw: React.RefObject<number>; smooth: React.RefObject<number> }; isLight: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const timeRef = useRef(0)
  const count = 2000

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [new THREE.Color("#7c3aed"), new THREE.Color("#22d3ee"), new THREE.Color("#a78bfa"), new THREE.Color("#c084fc")]
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 12
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    timeRef.current += delta
    const t = timeRef.current
    const progress = progressRef.smooth.current
    ref.current.rotation.y = t * 0.02
    ref.current.rotation.x = Math.sin(t * 0.005) * 0.03
    const mat = ref.current.material as THREE.PointsMaterial
    mat.size = 0.03 + progress * 0.05
    mat.opacity = (0.3 + progress * 0.4) * (isLight ? 0.6 : 1)
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Grid({ progressRef, isLight }: { progressRef: { raw: React.RefObject<number>; smooth: React.RefObject<number> }; isLight: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    if (!ref.current) return
    const progress = progressRef.smooth.current
    const s = Math.max(0, 1 - progress * 3)
    ref.current.scale.setScalar(s)
    ref.current.position.y = -3 - progress * 2
  })
  const gridColor = isLight ? "#b99aef" : "#7c3aed"
  const centerColor = isLight ? "#7be4f5" : "#22d3ee"
  return (
    <group ref={ref} position={[0, -3, -6]} scale={0}>
      <gridHelper args={[20, 30, gridColor, centerColor]} />
    </group>
  )
}

function ProgressSmoother({ raw, smooth }: { raw: React.RefObject<number>; smooth: React.RefObject<number> }) {
  useFrame((_, delta) => {
    const diff = raw.current - smooth.current
    if (Math.abs(diff) < 0.001) {
      smooth.current = raw.current
    } else {
      smooth.current += diff * Math.min(1, delta * 4)
    }
  })
  return null
}

function Scene({ progressRef, mouseRef, fogColor, isLight }: { progressRef: { raw: React.RefObject<number>; smooth: React.RefObject<number> }; mouseRef: React.RefObject<{ x: number; y: number }>; fogColor: string; isLight: boolean }) {
  return (
    <>
      <ProgressSmoother raw={progressRef.raw} smooth={progressRef.smooth} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={isLight ? 1.5 : 2} color="#7c3aed" />
      <pointLight position={[-10, -5, -10]} intensity={isLight ? 1.0 : 1.5} color="#22d3ee" />
      <pointLight position={[0, -10, 5]} intensity={isLight ? 0.8 : 0.8} color="#a78bfa" />
      <fog attach="fog" args={[fogColor, isLight ? 6 : 8, isLight ? 14 : 18]} />
      <CentralShape progressRef={progressRef} mouseRef={mouseRef} isLight={isLight} />
      <OrbitingShapes progressRef={progressRef} isLight={isLight} />
      <ParticlesField progressRef={progressRef} isLight={isLight} />
      <Grid progressRef={progressRef} isLight={isLight} />
    </>
  )
}

export function ThreeScene({ noPost }: { noPost?: boolean }) {
  const progressRef = useScrollProgressRef()
  const mouseRef = useMousePositionRef()
  const { theme } = useTheme()
  const isLight = theme === "light"
  const [fogColor, setFogColor] = useState(isLight ? "#eceef2" : "#0a0a0f")

  useEffect(() => {
    const computed = getComputedStyle(document.documentElement)
    const bg = computed.getPropertyValue("--color-bg").trim()
    setFogColor(bg || (isLight ? "#eceef2" : "#0a0a0f"))
  }, [theme, isLight])

  useEffect(() => {
    const orig = console.warn
    const msg = "THREE.Clock: .getElapsedTime() is deprecated"
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0] === msg) return
      return orig.apply(console, args)
    }
    return () => { console.warn = orig }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isLight ? 1.0 : 1.2,
        }}
      >
        <Scene progressRef={progressRef} mouseRef={mouseRef} fogColor={fogColor} isLight={isLight} />
        {!noPost && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.6} intensity={isLight ? 0.5 : 0.8} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
