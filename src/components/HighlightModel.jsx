import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import CanvasLoader from "./Loader";
import highlightScene from "../assets/Highlight.glb";
import backgroundScene from "../assets/Background.glb";

const Spaceman = ({ scale, position, rotationX, rotationY, ...props }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF(highlightScene);
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    if (actions && actions["Idle"]) {
      actions["Idle"].play();
    }
  }, [actions]);

  return (
    <mesh
      ref={spacemanRef}
      position={position}
      scale={scale}
      rotation={[rotationX, rotationY, 0]}
      {...props}
    >
      <primitive object={scene} />
    </mesh>
  );
};

const Background = () => {
  const { scene } = useGLTF(backgroundScene);
  return <primitive object={scene} />;
};

const SpacemanCanvas = ({ scrollY }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([3, 3, 3]); // Made bigger
  const [position, setPosition] = useState([0, -1, 0]); // Moved closer to center

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const rotationXValue = scrollTop * -0.0006;
      const rotationYValue = scrollTop * -0.00075;
      setRotationX(rotationXValue);
      setRotationY(rotationYValue);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale([1.5, 1.5, 1.5]);
        setPosition([0, -0.5, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([2, 2, 2]);
        setPosition([0, -0.7, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([2.5, 2.5, 2.5]);
        setPosition([0, -0.8, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([3, 3, 3]);
        setPosition([0, -0.9, 0]);
      } else {
        setScale([3.5, 3.5, 3.5]);
        setPosition([0, -1, 0]);
      }
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Removed scrollContainer dependency

  return (
    <Canvas
      className="w-full h-screen bg-transparent z-10"
      camera={{ near: 0.1, far: 1000 }}
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

        {/* Background Model */}
        <Background />

        {/* Highlight Model (Spaceman) */}
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

// Preload both models
useGLTF.preload(highlightScene);
useGLTF.preload(backgroundScene);

export default SpacemanCanvas;
