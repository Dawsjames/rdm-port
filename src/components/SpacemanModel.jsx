import { useAnimations, useGLTF } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import CanvasLoader from "./Loader"
import highlightScene from "../assets/Highlight.glb"

// ============================================================
// 🎯 SPACEMAN CONFIGURATION VARIABLES - EASILY EDITABLE!
// ============================================================

// POSITIONING & MOVEMENT VARIABLES
const SPACEMAN_BASE_POSITION = [7, -2, -2] // [x, y, z] - Starting position relative to screen center
const SCROLL_MOVEMENT_SPEED = 0.0009 // How fast spaceman moves with scroll (lower = slower)
const VERTICAL_FALL_SPEED = 0.0004 // How fast spaceman "falls" downward through sections
const HORIZONTAL_DRIFT_SPEED = 0.001 // Side-to-side floating movement
const ORBITAL_RADIUS = -1 // Distance from center for orbital movement
const ORBITAL_SPEED = 0.2 // Speed of orbital rotation (connected to scroll)

// SCALE & SIZE VARIABLES
const DESKTOP_SCALE = [2.2, 2.2, 2.2] // Spaceman size on desktop
const MOBILE_SCALE = [1.8, 1.8, 1.8] // Spaceman size on mobile

// ANIMATION & ROTATION VARIABLES
const IDLE_SPIN_SPEED = 0.02 // Constant rotation speed for spaceman
const SCROLL_ROTATION_FACTOR = 0.0004 // Additional rotation based on scroll
const FLOAT_ANIMATION_SPEED = 0.9 // Speed of floating up/down animation
const FLOAT_AMPLITUDE = 0.3 // How much spaceman bobs up/down while floating

// CAMERA & VIEW VARIABLES
const CAMERA_DISTANCE = 8 // How far camera is from spaceman
const CAMERA_HEIGHT_OFFSET = 0 // Camera height adjustment
const CAMERA_FOV = 70 // Field of view (lower = more zoomed in)

// ============================================================

// Standalone Spaceman Component
const Spaceman = ({
  scrollY,
  scale,
  isInAboutSection,
  currentSection,
  ...props
}) => {
  const group = useRef()
  const { scene, animations } = useGLTF(highlightScene)
  const { actions } = useAnimations(animations, group)

  useFrame((state) => {
    if (group.current && !isInAboutSection) {
      // Only animate when NOT in About section
      // Your existing animation logic here...
      const orbitalAngle = scrollY * SCROLL_MOVEMENT_SPEED
      const orbitalX = Math.cos(orbitalAngle) * ORBITAL_RADIUS
      const orbitalZ = Math.sin(orbitalAngle) * ORBITAL_RADIUS

      const verticalOffset = -(scrollY * VERTICAL_FALL_SPEED)
      const floatOffset =
        Math.sin(state.clock.elapsedTime * FLOAT_ANIMATION_SPEED) *
        FLOAT_AMPLITUDE
      const horizontalDrift =
        Math.sin(state.clock.elapsedTime * HORIZONTAL_DRIFT_SPEED) * 0.5

      group.current.position.set(
        SPACEMAN_BASE_POSITION[0] + orbitalX + horizontalDrift,
        SPACEMAN_BASE_POSITION[1] + verticalOffset + floatOffset,
        SPACEMAN_BASE_POSITION[2] + orbitalZ
      )

      group.current.rotation.y =
        state.clock.elapsedTime * IDLE_SPIN_SPEED +
        scrollY * SCROLL_ROTATION_FACTOR
    }

    // When in About section, keep spaceman static/minimal
    if (isInAboutSection && group.current) {
      // Minimal gentle floating only
      const gentleFloat = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      group.current.position.y = SPACEMAN_BASE_POSITION[1] + gentleFloat
    }
  })

  useEffect(() => {
    if (actions && actions["Idle"]) actions["Idle"].play()
  }, [actions, animations])

  return (
    <group ref={group} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

// Main Spaceman Model Component
const SpacemanModel = ({
  scrollY = 0,
  currentSection = "hero",
  isInAboutSection = false,
}) => {
  // Existing scale logic...
  const [scale, setScale] = useState(DESKTOP_SCALE)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(MOBILE_SCALE)
      } else {
        setScale(DESKTOP_SCALE)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen"
      style={{
        background: "transparent",
        pointerEvents: "none",
        userSelect: "none",
        touchAction: "none",
        zIndex: 50,
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        opacity: isInAboutSection ? 0.5 : 1, // Slightly more visible in About section
        transition: "opacity 0.3s ease-in-out",
        // CSS isolation to prevent event capture
        isolation: "isolate",
        // Ensure it doesn't interfere with underlying content
        mixBlendMode: isInAboutSection ? "multiply" : "normal",
      }}
    >
      <Canvas
        className="w-full h-full bg-transparent"
        style={{ pointerEvents: "none" }}
        camera={{
          position: [0, CAMERA_HEIGHT_OFFSET, CAMERA_DISTANCE],
          fov: CAMERA_FOV,
          near: 0.1,
          far: 1000,
        }}
        onCreated={({ gl, scene, camera }) => {
          // ENHANCED: Complete event blocking
          const canvas = gl.domElement

          // Remove all event listeners
          canvas.style.pointerEvents = "none"
          canvas.style.userSelect = "none"
          canvas.style.touchAction = "none"
          canvas.style.webkitUserSelect = "none"
          canvas.style.webkitTouchCallout = "none"
          canvas.style.webkitTapHighlightColor = "transparent"

          // Keep canvas visible but non-interactive in all sections
          canvas.style.visibility = "visible"
          canvas.style.zIndex = "40"
          canvas.style.position = "static"
          canvas.style.top = "auto"
          canvas.style.left = "auto"

          // Prevent any context menu
          canvas.addEventListener("contextmenu", (e) => e.preventDefault())

          // Completely disable all event capturing on the canvas
          canvas.style.pointerEvents = "none"
          canvas.style.touchAction = "none"

          // Only prevent context menu
          canvas.addEventListener("contextmenu", (e) => {
            e.preventDefault()
          })
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Lighting... */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          {/* Pass section info to Spaceman component */}
          <Spaceman
            scrollY={scrollY}
            scale={scale}
            isInAboutSection={isInAboutSection}
            currentSection={currentSection}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload the 3D model for better performance
useGLTF.preload(highlightScene)

export default SpacemanModel
