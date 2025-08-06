import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import CanvasLoader from "./Loader";
import backgroundScene from "../assets/3D/Background.glb";

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

// GENTLE LIGHTING VARIABLES (toned down for comfort)
const DIRECTIONAL_LIGHT_INTENSITY = 1.5; // Reduced from 3 for gentler lighting
const AMBIENT_LIGHT_INTENSITY = 0.4; // Reduced from 0.8 for softer ambient
const POINT_LIGHT_INTENSITY = 1.8; // Reduced from 4 for less harsh highlights
const SPOT_LIGHT_INTENSITY = 1.2; // Reduced from 3 for gentler spotlight
const HEMISPHERE_LIGHT_INTENSITY = 0.8; // Reduced from 1.5 for softer sky lighting

// GENTLE POSTPROCESSING VARIABLES (much more subtle effects)
const BLOOM_INTENSITY = 0.6; // Reduced from 2.0 for gentle glow instead of harsh bloom
const BLOOM_LUMINANCE_THRESHOLD = 0.3; // Increased from 0.1 so only brightest areas glow
const BLOOM_LUMINANCE_SMOOTHING = 0.7; // Reduced from 0.9 for smoother transitions
const BLOOM_RADIUS = 0.4; // Reduced from 0.8 for tighter, more controlled glow
const CHROMATIC_ABERRATION_INTENSITY = 0.0001; // Reduced from 0.0005 for barely noticeable effect
const VIGNETTE_OPACITY = 0.15; // Reduced from 0.3 for very subtle dark edges

// ============================================================

// Galaxy Background Component - Enhanced with gentle effects
const Background = () => {
  const ref = useRef();
  const { scene } = useGLTF(backgroundScene);

  useFrame((state) => {
    if (ref.current) {
      // GALAXY ROTATION: Subtle spinning animation
      // Connected variables: GALAXY_SPIN_SPEED, GALAXY_IDLE_ROTATION
      ref.current.rotation.y += GALAXY_SPIN_SPEED;
      ref.current.rotation.x += GALAXY_IDLE_ROTATION * 0.3; // Even more subtle on x-axis

      // GENTLE TWINKLING EFFECT: Very slight scale pulsing for subtle shimmer
      const time = state.clock.elapsedTime;
      const twinkle = 1 + Math.sin(time * 0.3) * 0.01; // Even more subtle scale change
      ref.current.scale.setScalar(GALAXY_SCALE * twinkle);
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

// Main Galaxy Background Component (Now with Gentle Glow Effects!)
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
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* GENTLE LIGHTING SETUP: Balanced lighting for comfortable viewing */}
        {/* Connected variables: All *_INTENSITY variables control these lights */}
        <directionalLight
          position={[1, 1, 1]}
          intensity={DIRECTIONAL_LIGHT_INTENSITY}
          color="#ffffff"
        />
        <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} color="#e6f3ff" />

        {/* Softer point lights for gentle galaxy illumination */}
        <pointLight
          position={[10, 5, 10]}
          intensity={POINT_LIGHT_INTENSITY}
          color="#87ceeb"
        />
        <pointLight
          position={[-10, -5, -10]}
          intensity={POINT_LIGHT_INTENSITY * 0.6}
          color="#dda0dd"
        />
        <pointLight
          position={[0, 10, 0]}
          intensity={POINT_LIGHT_INTENSITY * 0.4}
          color="#f0e68c"
        />

        <spotLight
          position={[0, 50, 10]}
          angle={0.2}
          penumbra={1}
          intensity={SPOT_LIGHT_INTENSITY}
          color="#f8f8ff"
        />
        <hemisphereLight
          skyColor="#e6f3ff"
          groundColor="#151030"
          intensity={HEMISPHERE_LIGHT_INTENSITY}
        />

        {/* CAMERA ORBIT: Scroll-based camera movement around galaxy */}
        <ScrollOrbitCamera scrollY={scrollY} />

        {/* GALAXY BACKGROUND: Only shows when showBackground is true */}
        {/* Connected variables: All GALAXY_* variables control this component */}
        {showBackground && <Background />}

        {/* GENTLE POST-PROCESSING EFFECTS: Subtle, eye-friendly glow */}
        <EffectComposer>
          {/* SOFT BLOOM EFFECT: Creates gentle glow around bright areas */}
          <Bloom
            intensity={BLOOM_INTENSITY}
            luminanceThreshold={BLOOM_LUMINANCE_THRESHOLD}
            luminanceSmoothing={BLOOM_LUMINANCE_SMOOTHING}
            radius={BLOOM_RADIUS}
            blendFunction={BlendFunction.SCREEN}
          />

          {/* MINIMAL CHROMATIC ABERRATION: Barely perceptible color shift */}
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[
              CHROMATIC_ABERRATION_INTENSITY,
              CHROMATIC_ABERRATION_INTENSITY,
            ]}
          />

          {/* SUBTLE VIGNETTE: Very gentle darkening of edges */}
          <Vignette
            offset={0.4}
            darkness={VIGNETTE_OPACITY}
            blendFunction={BlendFunction.MULTIPLY}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

// Preload the galaxy model for better performance
useGLTF.preload(backgroundScene);

export default GalaxyModel;
