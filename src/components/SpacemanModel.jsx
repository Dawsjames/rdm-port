import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import CanvasLoader from "./Loader";
import highlightScene from "../assets/Highlight.glb";

// ============================================================
// 🎯 SPACEMAN CONFIGURATION VARIABLES - EASILY EDITABLE!
// ============================================================

// POSITIONING & MOVEMENT VARIABLES
const SPACEMAN_BASE_POSITION = [3, -2, -2]; // [x, y, z] - Starting position relative to screen center
const SCROLL_MOVEMENT_SPEED = 0.0009; // How fast spaceman moves with scroll (lower = slower)
const VERTICAL_FALL_SPEED = 0.0004; // How fast spaceman "falls" downward through sections
const HORIZONTAL_DRIFT_SPEED = 0.001; // Side-to-side floating movement
const ORBITAL_RADIUS = 3; // Distance from center for orbital movement
const ORBITAL_SPEED = 0.2; // Speed of orbital rotation (connected to scroll)

// SCALE & SIZE VARIABLES
const DESKTOP_SCALE = [2.2, 2.2, 2.2]; // Spaceman size on desktop
const MOBILE_SCALE = [1.8, 1.8, 1.8]; // Spaceman size on mobile

// ANIMATION & ROTATION VARIABLES
const IDLE_SPIN_SPEED = 0.02; // Constant rotation speed for spaceman
const SCROLL_ROTATION_FACTOR = 0.004; // Additional rotation based on scroll
const FLOAT_ANIMATION_SPEED = 0.9; // Speed of floating up/down animation
const FLOAT_AMPLITUDE = 0.3; // How much spaceman bobs up/down while floating

// CAMERA & VIEW VARIABLES
const CAMERA_DISTANCE = 8; // How far camera is from spaceman
const CAMERA_HEIGHT_OFFSET = 0; // Camera height adjustment
const CAMERA_FOV = 70; // Field of view (lower = more zoomed in)

// ============================================================

// Standalone Spaceman Component
const Spaceman = ({ scrollY, scale, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(highlightScene);
  const { actions } = useAnimations(animations, group);

  // SCROLL-BASED MOVEMENT CALCULATIONS
  // These variables work together to create the "falling through sections" effect
  useFrame((state) => {
    if (group.current) {
      // ORBITAL MOVEMENT: Spaceman orbits around center based on scroll
      // Connected variables: ORBITAL_RADIUS, ORBITAL_SPEED, scrollY, SCROLL_MOVEMENT_SPEED
      const orbitalAngle = scrollY * SCROLL_MOVEMENT_SPEED;
      const orbitalX = Math.cos(orbitalAngle) * ORBITAL_RADIUS;
      const orbitalZ = Math.sin(orbitalAngle) * ORBITAL_RADIUS;

      // VERTICAL FALL: Spaceman gradually moves down as user scrolls
      // Connected variables: VERTICAL_FALL_SPEED, scrollY
      const verticalOffset = -(scrollY * VERTICAL_FALL_SPEED);

      // FLOATING ANIMATION: Gentle bobbing motion independent of scroll
      // Connected variables: FLOAT_ANIMATION_SPEED, FLOAT_AMPLITUDE, state.clock.elapsedTime
      const floatOffset =
        Math.sin(state.clock.elapsedTime * FLOAT_ANIMATION_SPEED) *
        FLOAT_AMPLITUDE;

      // HORIZONTAL DRIFT: Side-to-side floating movement
      // Connected variables: HORIZONTAL_DRIFT_SPEED, state.clock.elapsedTime
      const horizontalDrift =
        Math.sin(state.clock.elapsedTime * HORIZONTAL_DRIFT_SPEED) * 0.5;

      // APPLY FINAL POSITION (all movement variables combine here)
      group.current.position.set(
        SPACEMAN_BASE_POSITION[0] + orbitalX + horizontalDrift,
        SPACEMAN_BASE_POSITION[1] + verticalOffset + floatOffset,
        SPACEMAN_BASE_POSITION[2] + orbitalZ
      );

      // ROTATION EFFECTS: Combine idle spin with scroll-based rotation
      // Connected variables: IDLE_SPIN_SPEED, SCROLL_ROTATION_FACTOR, scrollY
      group.current.rotation.y =
        state.clock.elapsedTime * IDLE_SPIN_SPEED +
        scrollY * SCROLL_ROTATION_FACTOR;
    }
  });

  // Start idle animation
  useEffect(() => {
    if (actions && actions["Idle"]) actions["Idle"].play();
  }, [actions, animations]);

  return (
    <group ref={group} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

// Main Spaceman Model Component
const SpacemanModel = ({ scrollY = 0 }) => {
  // RESPONSIVE SCALE: Adjust spaceman size based on screen size
  // Connected variables: DESKTOP_SCALE, MOBILE_SCALE
  const [scale, setScale] = useState(DESKTOP_SCALE);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(MOBILE_SCALE);
      } else {
        setScale(DESKTOP_SCALE);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50"
      style={{
        background: "transparent",
        pointerEvents: "none", // Allows clicks to pass through to content below
      }}
    >
      <Canvas
        className="w-full h-full bg-transparent"
        camera={{
          position: [0, CAMERA_HEIGHT_OFFSET, CAMERA_DISTANCE],
          fov: CAMERA_FOV,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* LIGHTING SETUP: Illuminates the spaceman */}
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

          {/* SPACEMAN COMPONENT: All movement variables are processed here */}
          <Spaceman scrollY={scrollY} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the 3D model for better performance
useGLTF.preload(highlightScene);

export default SpacemanModel;
