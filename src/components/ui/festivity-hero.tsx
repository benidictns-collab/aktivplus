'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Phone, ChevronRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface FestivityHeroProps {
  onNavigate?: (section: string) => void
}

export const Component = ({ onNavigate }: FestivityHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const spheresRef = useRef<THREE.Mesh[]>([])
  const forcesRef = useRef<Map<string, THREE.Vector3>>(new Map())
  const loadingCompleteRef = useRef(false)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const initThreeJS = () => {
      // Scene setup
      const scene = new THREE.Scene()
      sceneRef.current = scene

      const camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 24
      cameraRef.current = camera

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      rendererRef.current = renderer

      // Basic camera controls
      let isMouseDown = false
      let mouseX = 0
      let mouseY = 0
      let targetRotationX = 0
      let targetRotationY = 0
      let rotationX = 0
      let rotationY = 0

      const onMouseDown = (event: MouseEvent) => {
        isMouseDown = true
        mouseX = event.clientX
        mouseY = event.clientY
      }

      const onMouseUp = () => {
        isMouseDown = false
      }

      const onMouseMoveDrag = (event: MouseEvent) => {
        if (isMouseDown) {
          const deltaX = event.clientX - mouseX
          const deltaY = event.clientY - mouseY

          targetRotationY += deltaX * 0.01
          targetRotationX += deltaY * 0.01

          mouseX = event.clientX
          mouseY = event.clientY
        }
      }

      window.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('mousemove', onMouseMoveDrag)

      // Sphere data
      const radii = [1, 0.6, 0.8, 0.4, 0.9, 0.7, 0.9, 0.3, 0.2, 0.5, 0.6, 0.4, 0.5, 0.6, 0.7, 0.3, 0.4, 0.8, 0.7, 0.5, 0.4, 0.6, 0.35, 0.38, 0.9, 0.3, 0.6, 0.4, 0.2, 0.35, 0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8, 0.7, 0.8, 0.3, 0.5, 0.6, 0.55, 0.42, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35, 0.35, 0.35, 0.8, 0.6, 0.7, 0.8, 0.4, 0.89, 0.3, 0.3, 0.6, 0.4, 0.2, 0.52, 0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8, 0.7, 0.8, 0.3, 0.5, 0.6, 0.8, 0.7, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35, 0.35, 0.35, 0.8, 0.6, 0.7, 0.8, 0.4, 0.89, 0.3]

      const positions = [
        { x: 0, y: 0, z: 0 },
        { x: 1.2, y: 0.9, z: -0.5 },
        { x: 1.8, y: -0.3, z: 0 },
        { x: -1, y: -1, z: 0 },
        { x: -1, y: 1.62, z: 0 },
        { x: -1.65, y: 0, z: -0.4 },
        { x: -2.13, y: -1.54, z: -0.4 },
        { x: 0.8, y: 0.94, z: 0.3 },
        { x: 0.5, y: -1, z: 1.2 },
        { x: -0.16, y: -1.2, z: 0.9 },
        { x: 1.5, y: 1.2, z: 0.8 },
        { x: 0.5, y: -1.58, z: 1.4 },
        { x: -1.5, y: 1, z: 1.15 },
        { x: -1.5, y: -1.5, z: 0.99 },
        { x: -1.5, y: -1.5, z: -1.9 },
        { x: 1.85, y: 0.8, z: 0.05 },
        { x: 1.5, y: -1.2, z: -0.75 },
        { x: 0.9, y: -1.62, z: 0.22 },
        { x: 0.45, y: 2, z: 0.65 },
        { x: 2.5, y: 1.22, z: -0.2 },
        { x: 2.35, y: 0.7, z: 0.55 },
        { x: -1.8, y: -0.35, z: 0.85 },
        { x: -1.02, y: 0.2, z: 0.9 },
        { x: 0.2, y: 1, z: 1 },
        { x: -2.88, y: 0.7, z: 1 },
        { x: -2, y: -0.95, z: 1.5 },
        { x: -2.3, y: 2.4, z: -0.1 },
        { x: -2.5, y: 1.9, z: 1.2 },
        { x: -1.8, y: 0.37, z: 1.2 },
        { x: -2.4, y: 1.42, z: 0.05 },
        { x: -2.72, y: -0.9, z: 1.1 },
        { x: -1.8, y: -1.34, z: 1.67 },
        { x: -1.6, y: 1.66, z: 0.91 },
        { x: -2.8, y: 1.58, z: 1.69 },
        { x: -2.97, y: 2.3, z: 0.65 },
        { x: 1.1, y: -0.2, z: -1.45 },
        { x: -4, y: 1.78, z: 0.38 },
        { x: 0.12, y: 1.4, z: -1.29 },
        { x: -1.64, y: 1.4, z: -1.79 },
        { x: -3.5, y: -0.58, z: 0.1 },
        { x: -0.1, y: -1, z: -2 },
        { x: -4.5, y: 0.55, z: -0.5 },
        { x: -3.87, y: 0, z: 1 },
        { x: -4.6, y: -0.1, z: 0.65 },
        { x: -3, y: 1.5, z: -0.7 },
        { x: -0.5, y: 0.2, z: -1.5 },
        { x: -1.3, y: -0.45, z: -1.5 },
        { x: -3.35, y: 0.25, z: -1.5 },
        { x: -4.76, y: -1.26, z: 0.4 },
        { x: -4.32, y: 0.85, z: 1.4 },
        { x: -3.5, y: -1.82, z: 0.9 },
        { x: -3.6, y: -0.6, z: 1.46 },
        { x: -4.55, y: -1.5, z: 1.63 },
        { x: -3.8, y: -1.15, z: 2.1 },
        { x: -2.9, y: -0.25, z: 1.86 },
        { x: -2.2, y: -0.4, z: 1.86 },
        { x: -5.1, y: -0.24, z: 1.86 },
        { x: -5.27, y: 1.24, z: 0.76 },
        { x: -5.27, y: 2, z: -0.4 },
        { x: -6.4, y: 0.4, z: 1 },
        { x: -5.15, y: 0.95, z: 2 },
        { x: -6.2, y: 0.5, z: -0.8 },
        { x: -4, y: 0.08, z: 1.8 },
        { x: 2, y: -0.95, z: 1.5 },
        { x: 2.3, y: 2.4, z: -0.1 },
        { x: 2.5, y: 1.9, z: 1.2 },
        { x: 1.8, y: 0.37, z: 1.2 },
        { x: 3.24, y: 0.6, z: 1.05 },
        { x: 2.72, y: -0.9, z: 1.1 },
        { x: 1.8, y: -1.34, z: 1.67 },
        { x: 1.6, y: 1.99, z: 0.91 },
        { x: 2.8, y: 1.58, z: 1.69 },
        { x: 2.97, y: 2.3, z: 0.65 },
        { x: -1.3, y: -0.2, z: -2.5 },
        { x: 4, y: 1.78, z: 0.38 },
        { x: 1.72, y: 1.4, z: -1.29 },
        { x: 2.5, y: -1.2, z: -2 },
        { x: 3.5, y: -0.58, z: 0.1 },
        { x: 0.1, y: 0.4, z: -2.42 },
        { x: 4.5, y: 0.55, z: -0.5 },
        { x: 3.87, y: 0, z: 1 },
        { x: 4.6, y: -0.1, z: 0.65 },
        { x: 3, y: 1.5, z: -0.7 },
        { x: 2.3, y: 0.6, z: -2.6 },
        { x: 4, y: 1.5, z: -1.6 },
        { x: 3.35, y: 0.25, z: -1.5 },
        { x: 4.76, y: -1.26, z: 0.4 },
        { x: 4.32, y: 0.85, z: 1.4 },
        { x: 3.5, y: -1.82, z: 0.9 },
        { x: 3.6, y: -0.6, z: 1.46 },
        { x: 4.55, y: -1.5, z: 1.63 },
        { x: 3.8, y: -1.15, z: 2.1 },
        { x: 2.9, y: -0.25, z: 1.86 },
        { x: 2.2, y: -0.4, z: 1.86 },
        { x: 5.1, y: -0.24, z: 1.86 },
        { x: 5.27, y: 1.24, z: 0.76 },
        { x: 5.27, y: 2, z: -0.4 },
        { x: 6.4, y: 0.4, z: 1 },
        { x: 5.15, y: 0.95, z: 2 },
        { x: 6.2, y: 0.5, z: -0.8 },
        { x: 4, y: 0.08, z: 1.8 }
      ]

      // ── Gold / Black luxury material ──
      const material = new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 0.9,
        roughness: 0.15,
        emissive: '#3d2e0a',
        emissiveIntensity: 0.3,
      })

      const group = new THREE.Group()
      const spheres: THREE.Mesh[] = []

      positions.forEach((pos, index) => {
        const radius = radii[index]
        const geometry = new THREE.SphereGeometry(radius, 64, 64)
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(pos.x, pos.y, pos.z)
        sphere.userData = { originalPosition: { ...pos }, radius }
        sphere.castShadow = true
        sphere.receiveShadow = true
        spheres.push(sphere)
        group.add(sphere)
      })

      scene.add(group)
      spheresRef.current = spheres

      // ── Lighting: gold-tinted for luxury feel ──
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(ambientLight)

      const spotLight = new THREE.SpotLight(0xF1D28A, 1.2)
      spotLight.position.set(14, 24, 30)
      spotLight.castShadow = true
      scene.add(spotLight)

      const spotLight2 = new THREE.SpotLight(0xD4AF37, 0.6)
      spotLight2.position.set(-14, 10, 20)
      spotLight2.castShadow = true
      scene.add(spotLight2)

      const directionalLight1 = new THREE.DirectionalLight(0xF1D28A, 0.3)
      directionalLight1.position.set(0, -4, 0)
      scene.add(directionalLight1)

      // ── Animation helpers ──
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      const animateValue = (obj: any, prop: string, start: number, end: number, duration: number, delay = 0) => {
        setTimeout(() => {
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            obj[prop] = start + (end - start) * eased

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          animate()
        }, delay)
      }

      // ── Raycaster for mouse interaction ──
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      const tempVector = new THREE.Vector3()
      const forces = new Map()
      forcesRef.current = forces

      const initY = -25
      const revolutionRadius = 4
      const revolutionDuration = 2
      const breathingAmplitude = 0.1
      const breathingSpeed = 0.002

      // Initialize spheres below screen
      spheres.forEach((sphere) => {
        sphere.position.y = initY
      })

      // Loading animation
      const initLoadingAnimation = () => {
        spheres.forEach((sphere, i) => {
          const delay = i * 20

          // First phase - rise up
          animateValue(sphere.position, 'y', initY, revolutionRadius, revolutionDuration * 500, delay)

          // Second phase - settle down
          setTimeout(() => {
            animateValue(sphere.position, 'y', revolutionRadius, initY / 5, revolutionDuration * 500)
          }, delay + revolutionDuration * 500)

          // Final phase - move to original position
          setTimeout(() => {
            animateValue(sphere.position, 'x', sphere.position.x, sphere.userData.originalPosition.x, 600)
            animateValue(sphere.position, 'y', sphere.position.y, sphere.userData.originalPosition.y, 600)
            animateValue(sphere.position, 'z', sphere.position.z, sphere.userData.originalPosition.z, 600)
          }, delay + revolutionDuration * 1000)
        })
      }

      // ── Custom cursor ──
      const circle = document.querySelector('.circle') as HTMLElement
      const circleFollow = document.querySelector('.circle-follow') as HTMLElement

      if (circle && circleFollow) {
        circle.style.transform = 'translate(-50%, -50%)'
        circleFollow.style.transform = 'translate(-50%, -50%)'
      }

      const onMouseMoveInteraction = (event: MouseEvent) => {
        if (!loadingCompleteRef.current) return

        // Update cursor elements
        const circle = document.querySelector('.circle') as HTMLElement
        const circleFollow = document.querySelector('.circle-follow') as HTMLElement

        if (circle && circleFollow) {
          circle.style.left = event.clientX + 'px'
          circle.style.top = event.clientY + 'px'
          circleFollow.style.left = event.clientX + 'px'
          circleFollow.style.top = event.clientY + 'px'
        }

        const mouseEffect = document.querySelector('.mouse-effect') as HTMLElement
        if (mouseEffect) mouseEffect.style.opacity = '1'

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(spheres)

        if (intersects.length > 0) {
          const hoveredSphere = intersects[0].object as THREE.Mesh
          const force = new THREE.Vector3()
          force.subVectors(intersects[0].point, hoveredSphere.position).normalize().multiplyScalar(0.2)
          forces.set(hoveredSphere.uuid, force)
        }
      }

      // ── Collision detection ──
      const handleCollisions = () => {
        for (let i = 0; i < spheres.length; i++) {
          const sphereA = spheres[i]
          const radiusA = sphereA.userData.radius

          for (let j = i + 1; j < spheres.length; j++) {
            const sphereB = spheres[j]
            const radiusB = sphereB.userData.radius
            const distance = sphereA.position.distanceTo(sphereB.position)
            const minDistance = (radiusA + radiusB) * 1.2

            if (distance < minDistance) {
              tempVector.subVectors(sphereB.position, sphereA.position)
              tempVector.normalize()

              const pushStrength = (minDistance - distance) * 0.4
              sphereA.position.sub(tempVector.clone().multiplyScalar(pushStrength))
              sphereB.position.add(tempVector.clone().multiplyScalar(pushStrength))
            }
          }
        }
      }

      // ── Animation loop ──
      const animate = () => {
        requestAnimationFrame(animate)

        // Update camera rotation
        rotationX = lerp(rotationX, targetRotationX, 0.05)
        rotationY = lerp(rotationY, targetRotationY, 0.05)

        camera.position.x = Math.sin(rotationY) * 24
        camera.position.z = Math.cos(rotationY) * 24
        camera.position.y = Math.sin(rotationX) * 10
        camera.lookAt(0, 0, 0)

        if (loadingCompleteRef.current) {
          const time = Date.now() * breathingSpeed
          spheres.forEach((sphere, i) => {
            const offset = i * 0.2
            const breathingY = Math.sin(time + offset) * breathingAmplitude
            const breathingZ = Math.cos(time + offset) * breathingAmplitude * 0.5

            const force = forces.get(sphere.uuid)
            if (force) {
              sphere.position.add(force)
              force.multiplyScalar(0.95)
              if (force.length() < 0.01) {
                forces.delete(sphere.uuid)
              }
            }

            const originalPos = sphere.userData.originalPosition
            tempVector.set(
              originalPos.x,
              originalPos.y + breathingY,
              originalPos.z + breathingZ
            )
            sphere.position.lerp(tempVector, 0.018)
          })

          handleCollisions()
        }
        renderer.render(scene, camera)
      }

      // ── Event listeners ──
      window.addEventListener('mousemove', onMouseMoveInteraction)
      window.addEventListener('load', initLoadingAnimation)

      // ── Show elements after loading ──
      setTimeout(() => {
        loadingCompleteRef.current = true
        const hiddenElements = document.querySelectorAll('.hide-text')
        const mainTxt = document.querySelector('.main-txt') as HTMLElement

        hiddenElements.forEach((el) => {
          ;(el as HTMLElement).style.opacity = '1'
        })
        if (mainTxt) mainTxt.style.opacity = '0'
      }, (revolutionDuration + 1) * 1000)

      // ── Resize handler ──
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

      // Start animation
      initLoadingAnimation()
      animate()

      // ── Cleanup ──
      return () => {
        window.removeEventListener('mousemove', onMouseMoveInteraction)
        window.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mouseup', onMouseUp)
        window.removeEventListener('mousemove', onMouseMoveDrag)
        window.removeEventListener('resize', handleResize)
      }
    }

    const cleanup = initThreeJS()

    return () => {
      if (cleanup) cleanup()
      // Dispose Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (sceneRef.current) {
        sceneRef.current.clear()
      }
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0B0B0B]">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="webgl absolute inset-0 w-full h-full"
        id="webgl"
      />

      {/* Custom cursor elements */}
      <div className="circle fixed w-5 h-5 rounded-full border border-[#D4AF37]/60 pointer-events-none z-[100] mix-blend-difference transition-[width,height] duration-200" />
      <div className="circle-follow fixed w-10 h-10 rounded-full border border-[#D4AF37]/30 pointer-events-none z-[100] mix-blend-difference transition-all duration-300" />
      <div className="mouse-effect fixed inset-0 pointer-events-none z-[90] opacity-0 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />

      {/* Loading overlay */}
      <div className="main-txt absolute inset-0 flex flex-col items-center justify-center z-10 transition-opacity duration-1000 bg-[#0B0B0B]">
        <img src="/logo.png" alt="Актив Плюс" className="h-16 md:h-20 w-auto mb-6" />
        <div className="w-16 h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
          <div className="h-full bg-[#D4AF37] animate-loading rounded-full" />
        </div>
      </div>

      {/* ── Content overlay ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 lg:p-20 pointer-events-none">
        {/* Top bar */}
        <div className="flex items-center justify-between hide-text transition-opacity duration-1000" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="relative w-2.5 h-2.5 bg-[#D4AF37] rounded-full">
              <div className="absolute inset-0 bg-[#D4AF37] rounded-full animate-ping opacity-30" />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
              Актив Плюс
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 pointer-events-auto">
            <a href="tel:+78630000000" className="text-white/60 hover:text-[#D4AF37] text-sm flex items-center gap-2 transition-colors">
              <Phone className="w-4 h-4" />
              +7 (863) 000-00-00
            </a>
            <Button
              size="sm"
              className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-8"
              onClick={() => onNavigate?.('contacts')}
            >
              Консультация
            </Button>
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col justify-center max-w-5xl hide-text transition-opacity duration-1000" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
              Агентство премиальной недвижимости
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,9rem)] font-black leading-[0.88] tracking-tighter text-white uppercase mb-8">
            ПРЕМИАЛЬ
            <br />
            <span className="text-outline-gold">НАЯ</span>
            <br />
            НЕДВИЖИМОСТЬ
          </h1>

          <p className="font-mono text-[11px] text-white/40 uppercase tracking-[0.35em] max-w-lg leading-relaxed mb-10">
            Элитные квартиры, дома и коммерческие объекты в Ростове-на-Дону.
            Полное сопровождение сделок от подбора до передачи ключей.
          </p>

          <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
            <Button
              size="lg"
              className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold px-8 h-12 group"
              onClick={() => onNavigate?.('catalog')}
            >
              Подобрать объект
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold px-8 h-12"
              onClick={() => onNavigate?.('contacts')}
            >
              Получить консультацию
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between hide-text transition-opacity duration-1000" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-wider pointer-events-auto">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            Ростов-на-Дону, ул. Обороны д. 49/22
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white/20 text-[10px] font-mono uppercase tracking-widest hidden md:block">
              Перетаскивайте для вращения • Наведите на сферы
            </span>
            <div className="w-5 h-8 border border-[#D4AF37]/30 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Component
