import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type Props = { active: boolean; reduced: boolean; compact: boolean }

/* Shared pointer state, read inside the render loop (no React re-renders). */
const pointer = { x: 0, y: 0 }

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.22 + aPhase) * 0.18;
    p.x += cos(uTime * 0.18 + aPhase * 1.7) * 0.12;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio / -mv.z;
    vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 0.7 + aPhase * 3.0));
    vColor = aColor;
  }
`
const particleFragment = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha * 0.85);
  }
`

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const { gl } = useThree()

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const scale = new Float32Array(count)
    const phase = new Float32Array(count)
    const a = new THREE.Color('#a9c1ff')
    const b = new THREE.Color('#86e3cc')
    const w = new THREE.Color('#ffffff')
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      // Wide, shallow volume, slightly denser towards the centre.
      const r = Math.pow(Math.random(), 0.7)
      const t = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(t) * r * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = -Math.random() * 18 + 3
      const m = Math.random()
      c.copy(m < 0.55 ? w : m < 0.85 ? a : b)
      col.set([c.r, c.g, c.b], i * 3)
      scale[i] = 0.4 + Math.random() * 1.4
      phase[i] = Math.random() * Math.PI * 2
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 34 }, uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.75) } }),
    [gl],
  )

  useFrame((_, dt) => {
    if (!reduced && material.current) material.current.uniforms.uTime.value += dt
  })

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Thin wireframe solids that drift slowly — the "geometric objects" layer. */
function Shape({
  geometry,
  position,
  speed,
  opacity,
  reduced,
}: {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  speed: number
  opacity: number
  reduced: boolean
}) {
  const ref = useRef<THREE.LineSegments>(null)
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 1), [geometry])
  useEffect(() => () => edges.dispose(), [edges])
  useFrame((state) => {
    if (!ref.current || reduced) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.6
    ref.current.rotation.y = t
    ref.current.position.y = position[1] + Math.sin(t * 1.3) * 0.25
  })
  return (
    <lineSegments ref={ref} geometry={edges} position={position} rotation={[0.4, 0.3, 0]}>
      <lineBasicMaterial color="#b8cbff" transparent opacity={opacity} depthWrite={false} />
    </lineSegments>
  )
}

function Grid() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(80, 64, '#a9c1ff', '#ffffff')
    const m = g.material as THREE.LineBasicMaterial
    m.transparent = true
    m.opacity = 0.07
    m.depthWrite = false
    return g
  }, [])
  return <primitive object={grid} position={[0, -3.4, -6]} />
}

/** Camera rig: pointer parallax + scroll-driven dolly through the hero. */
function Rig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree()
  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.0015, dt) // frame-rate independent smoothing
    const p = Math.min(window.scrollY / window.innerHeight, 1.2)
    const tx = reduced ? 0 : pointer.x * 0.9
    const ty = reduced ? 0 : pointer.y * 0.55 - p * 1.4
    camera.position.x += (tx - camera.position.x) * k
    camera.position.y += (ty - camera.position.y) * k
    camera.position.z += (8 - p * 3 - camera.position.z) * k
    camera.lookAt(0, -p * 0.6, -4)
  })
  return null
}

function Scene({ reduced, compact }: { reduced: boolean; compact: boolean }) {
  const ico = useMemo(() => new THREE.IcosahedronGeometry(1.15, 0), [])
  const oct = useMemo(() => new THREE.OctahedronGeometry(0.8, 0), [])
  const torus = useMemo(() => new THREE.TorusGeometry(0.75, 0.22, 6, 18), [])
  const dodec = useMemo(() => new THREE.DodecahedronGeometry(0.6, 0), [])
  return (
    <>
      <fog attach="fog" args={['#060709', 7, 24]} />
      <Rig reduced={reduced} />
      <Particles count={compact ? 420 : 1300} reduced={reduced} />
      <Shape geometry={ico} position={compact ? [2.2, 2.6, -4] : [5.6, 2.1, -3.5]} speed={0.16} opacity={0.32} reduced={reduced} />
      <Shape geometry={oct} position={[-6.2, -1.6, -5]} speed={0.2} opacity={0.22} reduced={reduced} />
      {!compact && <Shape geometry={torus} position={[2.4, -2.4, -2.2]} speed={0.13} opacity={0.2} reduced={reduced} />}
      {!compact && <Shape geometry={dodec} position={[-3.2, 3.1, -7]} speed={0.18} opacity={0.18} reduced={reduced} />}
      <Grid />
    </>
  )
}

export default function HeroScene({ active, reduced, compact }: Props) {
  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  return (
    <Canvas
      aria-hidden
      dpr={[1, compact ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 60 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance' }}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Scene reduced={reduced} compact={compact} />
    </Canvas>
  )
}
