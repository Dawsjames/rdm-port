import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import CanvasLoader from "./Loader";
import backgroundScene from "../assets/Background.glb";

// ============================================================
// 🎯 GALAXY BACKGROUND CONFIGURATION VARIABLES
// ============================================================

// GALAXY POSITIONING VARIABLES
const GALAXY_POSITION = [0, -140, 2]; // [x, y, z] - Galaxy center position
const GALAXY_SCALE = 100; // Overall size of the galaxy

// ROTATION & ANIMATION VARIABLES
const GALAXY_SPIN_SPEED = 0.0003; // How fast the galaxy rotates (subtle movement)
const GALAXY_IDLE_ROTATION = 0.0003; // Additional subtle rotation for life

// CAMERA ORBIT VARIABLES (for scroll-based movement)
const CAMERA_RADIUS = 30; // Distance from galaxy center
const CAMERA_HEIGHT = 3; // Base height above center (z=0)
const CAMERA_VERTICAL_ARC = -30; // Max vertical swing up/down
const CAMERA_ORBIT_MULTIPLIER = 20; // Controls how much scroll affects orbit (higher = less orbit)

// LIGHTING VARIABLES
const DIRECTIONAL_LIGHT_INTENSITY = 2; // Main directional light strength
const AMBIENT_LIGHT_INTENSITY = 0.5; // Overall ambient lighting
const POINT_LIGHT_INTENSITY = 2; // Point light for highlights
const SPOT_LIGHT_INTENSITY = 2; // Spotlight intensity
const HEMISPHERE_LIGHT_INTENSITY = 1; // Sky/ground lighting

// ============================================================

// Galaxy Background Component - Always centered, never moves!
const Background = () => {
  const ref = useRef();
  const { scene } = useGLTF(backgroundScene);

  useFrame(() => {
    if (ref.current) {
      // GALAXY ROTATION: Subtle spinning animation
      // Connected variables: GALAXY_SPIN_SPEED, GALAXY_IDLE_ROTATION
      ref.current.rotation.y += GALAXY_SPIN_SPEED;
      ref.current.rotation.x += GALAXY_IDLE_ROTATION * 0.3; // Even more subtle on x-axis
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={GALAXY_POSITION}
      scale={GALAXY_SCALE}
    />
  );
};

// Camera Orbit Controller - Moves camera based on scroll
const ScrollOrbitCamera = ({ scrollY }) => {
  const { camera } = useThree();

  useFrame(() => {
    // SCROLL-BASED CAMERA ORBIT: Camera moves up and back as you scroll
    // Connected variables: CAMERA_RADIUS, CAMERA_HEIGHT, CAMERA_VERTICAL_ARC, CAMERA_ORBIT_MULTIPLIER
    const maxScroll = window.innerHeight * 2; // Adjust for how much orbit you want
    const t = Math.min(scrollY / maxScroll, 1);
    const angle = (t * Math.PI) / CAMERA_ORBIT_MULTIPLIER; // Controls orbit range

    // CAMERA POSITIONING: Orbiting path calculation
    camera.position.x = 0;
    camera.position.y = CAMERA_HEIGHT + Math.sin(angle) * CAMERA_VERTICAL_ARC;
    camera.position.z = CAMERA_RADIUS * Math.cos(angle) + 3; // +3 puts cam closer at scroll=0

    // Always look at galaxy center
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
};

// Main Galaxy Background Component (Hero Section Only)
const GalaxyModel = ({ scrollY = 0, showBackground = true }) => {
  return (
    <Canvas
      className="w-full h-screen bg-transparent z-10"
      camera={{
        position: [0, CAMERA_HEIGHT, CAMERA_RADIUS + 3],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* LIGHTING SETUP: Illuminates the galaxy */}
        {/* Connected variables: All *_INTENSITY variables control these lights */}
        <directionalLight
          position={[1, 1, 1]}
          intensity={DIRECTIONAL_LIGHT_INTENSITY}
        />
        <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
        <pointLight position={[10, 5, 10]} intensity={POINT_LIGHT_INTENSITY} />
        <spotLight
          position={[0, 50, 10]}
          angle={0.15}
          penumbra={1}
          intensity={SPOT_LIGHT_INTENSITY}
        />
        <hemisphereLight
          skyColor="#b1e1ff"
          groundColor="#000000"
          intensity={HEMISPHERE_LIGHT_INTENSITY}
        />

        {/* CAMERA ORBIT: Scroll-based camera movement around galaxy */}
        <ScrollOrbitCamera scrollY={scrollY} />

        {/* GALAXY BACKGROUND: Only shows when showBackground is true */}
        {/* Connected variables: All GALAXY_* variables control this component */}
        {showBackground && <Background />}
      </Suspense>
    </Canvas>
  );
};

// Preload the galaxy model for better performance
useGLTF.preload(backgroundScene);

export default GalaxyModel;
