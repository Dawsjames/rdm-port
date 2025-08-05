import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import CanvasLoader from "./Loader";
import highlightScene from "../assets/Highlight.glb";
import backgroundScene from "../assets/Background.glb";

const Spaceman = ({ scale, position, rotationX, rotationY, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(highlightScene);
  const { actions } = useAnimations(animations, group);

  const SPACEMAN_BASE_ROTATION_X = 0; // Tilt up/down (try: 0.3 to tilt toward camera)
  const SPACEMAN_BASE_ROTATION_Y = 2; // Turn left/right (try: 0 for straight, 3.14 for backward)
  const SPACEMAN_BASE_ROTATION_Z = 0; // Roll left/right (try: 0 for upright)

  useEffect(() => {
    if (actions && actions["Idle"]) {
      actions["Idle"].play();
    } else {
      console.warn("No 'Idle' animation found in Highlight.glb", animations);
    }
  }, [actions, animations]);

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      rotation={[
        rotationX + SPACEMAN_BASE_ROTATION_X,
        rotationY + SPACEMAN_BASE_ROTATION_Y,
        SPACEMAN_BASE_ROTATION_Z,
      ]}
    >
      <primitive object={scene} />
    </group>
  );
};

// Background with vertical camera panning
const Background = ({ scrollY }) => {
  // 🎯 CHANGE THESE NUMBERS TO CONTROL BACKGROUND POSITION!
  const BACKGROUND_X = 0; // Left/Right position
  const BACKGROUND_Y = -2; // Up/Down position
  const BACKGROUND_Z = 10; // Forward/Back position (negative = far back)
  const BACKGROUND_SCALE = 2; // How big the background is

  const bgRef = useRef();
  const { scene } = useGLTF(backgroundScene);
  const { camera } = useThree(); // Get camera reference

  const basePos = [BACKGROUND_X, BACKGROUND_Y, BACKGROUND_Z]; // Using our variables!
  const targetScale = BACKGROUND_SCALE;

  useFrame((state) => {
    if (bgRef.current) {
      const t = state.clock.getElapsedTime();

      // Smooth zoom towards center
      const s = bgRef.current.scale.x;
      const lerp = (targetScale - s) * 0.01;
      const newScale = s + lerp;
      bgRef.current.scale.set(newScale, newScale, newScale);

      // Correct center offset dynamically
      const pivotCorrection = { x: -3, y: -0.5 };
      const offsetX = pivotCorrection.x * (newScale - 1);
      const offsetY = pivotCorrection.y * (newScale - 1);

      // Camera-like vertical movement
      const cameraFloat = Math.sin(t * 0.1) * 0.2;

      bgRef.current.position.set(
        basePos[0] + offsetX,
        basePos[1] + offsetY + cameraFloat,
        basePos[2]
      );

      // 🆕 VERTICAL CAMERA PANNING based on scroll
      // This makes the background appear to move vertically as you scroll
      const cameraPanAmount = scrollY * 0.002; // Adjust multiplier to control pan speed
      camera.position.y = cameraPanAmount;
      camera.lookAt(0, cameraPanAmount, 0); // Keep camera looking at center
    }
  });

  return <primitive ref={bgRef} object={scene} />;
};

const SpacemanCanvas = ({ scrollY }) => {
  // 🎯 CHANGE THESE NUMBERS TO CONTROL SPACEMAN SIZE FOR EACH SCREEN SIZE!
  const SPACEMAN_SIZE_768 = 0.8; // Small screens (phones)
  const SPACEMAN_SIZE_1024 = 0.6; // Medium screens (tablets)
  const SPACEMAN_SIZE_1280 = 0.5; // Large screens (small laptops)
  const SPACEMAN_SIZE_1536 = 0.6; // XL screens (laptops)
  const SPACEMAN_SIZE_DESKTOP = 1; // XXL screens (desktops)

  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([3, 3, 3]);
  const [position, setPosition] = useState([0, -1, 0]); // Back to normal Z position

  const SPACEMAN_Y_768 = 1; // Higher starting position on phones
  const SPACEMAN_Y_1024 = 1; // Higher starting position on tablets
  const SPACEMAN_Y_1280 = 1; // Higher starting position on small laptops
  const SPACEMAN_Y_1536 = 1; // Higher starting position on laptops
  const SPACEMAN_Y_DESKTOP = 1; // Higher starting position on desktops

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Keep original rotation
      setRotationX(scrollTop * -0.0006);
      setRotationY(scrollTop * -0.00075);

      // 🆕 FALLING EFFECT - As you scroll down, spaceman falls down
      const fallAmount = scrollTop * 0.01; // Adjust multiplier for fall speed

      // Update position with responsive values + falling effect
      if (window.innerWidth < 768) {
        setScale([
          1.5 * SPACEMAN_SIZE_768,
          1.5 * SPACEMAN_SIZE_768,
          1.5 * SPACEMAN_SIZE_768,
        ]);
        setPosition([0, SPACEMAN_Y_768 - fallAmount, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([
          2 * SPACEMAN_SIZE_1024,
          2 * SPACEMAN_SIZE_1024,
          2 * SPACEMAN_SIZE_1024,
        ]);
        setPosition([0, SPACEMAN_Y_1024 - fallAmount, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([
          2.5 * SPACEMAN_SIZE_1280,
          2.5 * SPACEMAN_SIZE_1280,
          2.5 * SPACEMAN_SIZE_1280,
        ]);
        setPosition([0, SPACEMAN_Y_1280 - fallAmount, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([
          2.5 * SPACEMAN_SIZE_1536,
          2.5 * SPACEMAN_SIZE_1536,
          2.5 * SPACEMAN_SIZE_1536,
        ]);
        setPosition([0, SPACEMAN_Y_1536 - fallAmount, 0]);
      } else {
        setScale([
          2.5 * SPACEMAN_SIZE_DESKTOP,
          2.5 * SPACEMAN_SIZE_DESKTOP,
          2.5 * SPACEMAN_SIZE_DESKTOP,
        ]);
        setPosition([0, SPACEMAN_Y_DESKTOP - fallAmount, -3]);
      }
    };

    const handleResize = () => {
      const scrollTop = window.scrollY;
      const fallAmount = scrollTop * 0.01;

      if (window.innerWidth < 768) {
        setScale([
          1.5 * SPACEMAN_SIZE_768,
          1.5 * SPACEMAN_SIZE_768,
          1.5 * SPACEMAN_SIZE_768,
        ]);
        setPosition([0, SPACEMAN_Y_768 - fallAmount, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([
          2 * SPACEMAN_SIZE_1024,
          2 * SPACEMAN_SIZE_1024,
          2 * SPACEMAN_SIZE_1024,
        ]);
        setPosition([0, SPACEMAN_Y_1024 - fallAmount, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([
          2.5 * SPACEMAN_SIZE_1280,
          2.5 * SPACEMAN_SIZE_1280,
          2.5 * SPACEMAN_SIZE_1280,
        ]);
        setPosition([0, SPACEMAN_Y_1280 - fallAmount, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([
          2.5 * SPACEMAN_SIZE_1536,
          2.5 * SPACEMAN_SIZE_1536,
          2.5 * SPACEMAN_SIZE_1536,
        ]);
        setPosition([0, SPACEMAN_Y_1536 - fallAmount, 0]);
      } else {
        setScale([
          2.5 * SPACEMAN_SIZE_DESKTOP,
          2.5 * SPACEMAN_SIZE_DESKTOP,
          2.5 * SPACEMAN_SIZE_DESKTOP,
        ]);
        setPosition([0, SPACEMAN_Y_DESKTOP - fallAmount, -3]);
      }
    };

    handleResize();
    handleScroll(); // Initialize scroll position
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Canvas
      className="w-full h-screen bg-transparent z-10"
      camera={{ near: 0.1, far: 1000 }} // Reverted back to reasonable range
    >
      <Suspense fallback={<CanvasLoader />}>
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

        {/* Background with vertical camera panning */}
        <Background scrollY={scrollY} />

        {/* Spaceman now at Z=999 and falls when scrolling */}
        <Spaceman
          rotationX={rotationX}
          rotationY={rotationY}
          scale={scale}
          position={position}
        />
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload(highlightScene);
useGLTF.preload(backgroundScene);

export default SpacemanCanvas;
