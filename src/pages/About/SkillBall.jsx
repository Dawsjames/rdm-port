import { useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef } from "react";
import { useIsMobile } from "../../hooks";

// Import SVG files as URLs (this is the correct way for Vite)
import reactSvg from "../../assets/logos/react.svg";
import javascriptSvg from "../../assets/logos/javascript.svg";
import html5Svg from "../../assets/logos/html5.svg";
import cssSvg from "../../assets/logos/css.svg";
import tailwindcssSvg from "../../assets/logos/tailwindcss.svg";
import githubSvg from "../../assets/logos/github.svg";
import firebaseSvg from "../../assets/logos/firebase.svg";
import vuejsSvg from "../../assets/logos/vuedotjs.svg";
import postgresqlSvg from "../../assets/logos/postgresql.svg";

const Skills = () => {
  const { isMobile } = useIsMobile();

  // 🎯 EASILY EDITABLE VARIABLES - CHANGE THESE TO CUSTOMIZE!
  // ============================================================

  // Icon Size Settings
  const ICON_WIDTH = 100; // px - Individual icon width
  const ICON_HEIGHT = 100; // px - Individual icon height
  const CONTAINER_SIZE = 200; // px - Container size around icon

  // Overall Scale & Positioning
  const OVERALL_SCALE = 1.2; // Overall size multiplier for entire skill ball
  const DISTANCE_FACTOR = 6; // Lower = bigger icons, Higher = smaller icons
  const POSITION_SPREAD = 7; // How spread out the icons are in 3D space

  // Glow Effects
  const NORMAL_GLOW_OUTER = 2; // px - Main glow radius (normal state)
  const NORMAL_GLOW_INNER = 2; // px - Inner glow radius (normal state)
  const HOVER_GLOW_OUTER = 2; // px - Main glow radius (hover state)
  const HOVER_GLOW_MEDIUM = 2; // px - Medium glow radius (hover state)
  const HOVER_GLOW_INNER = 2; // px - Inner glow radius (hover state)

  // Animation Settings - REMOVED SCROLL-BASED SPINNING
  const SPIN_SPEED_X = 0.002; // Rotation speed on X axis (constant)
  const SPIN_SPEED_Y = 0.0025; // Rotation speed on Y axis (constant)
  const SPIN_SPEED_Z = 0.001; // Rotation speed on Z axis (constant)
  const PULSE_SCALE_MIN = 0.75; // Minimum scale during pulse
  const PULSE_SCALE_MAX = 1.25; // Maximum scale during pulse
  const PULSE_SPEED_BASE = 1; // Base pulse speed
  const PULSE_SPEED_VARIATION = 0.2; // How much pulse speed varies between icons

  // Hover Effects
  const HOVER_SCALE = 1.4; // How big icons get on hover

  // ============================================================

  // Random position generator
  const getPos = (k) => {
    let a = Math.random();
    let b = Math.random();
    return b > 0.5 ? a * k : a * -1 * k;
  };

  // Function to convert hex color to CSS filter (to recolor SVGs)
  const hexToFilter = (hex) => {
    const colorMap = {
      "#61DAFB":
        "brightness(0) saturate(100%) invert(70%) sepia(98%) saturate(2618%) hue-rotate(180deg) brightness(103%) contrast(101%)",
      "#F7DF1E":
        "brightness(0) saturate(100%) invert(95%) sepia(100%) saturate(1174%) hue-rotate(35deg) brightness(102%) contrast(107%)",
      "#E34F26":
        "brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(1719%) hue-rotate(356deg) brightness(94%) contrast(91%)",
      "#1572B6":
        "brightness(0) saturate(100%) invert(25%) sepia(96%) saturate(1732%) hue-rotate(201deg) brightness(97%) contrast(98%)",
      "#06B6D4":
        "brightness(0) saturate(100%) invert(61%) sepia(97%) saturate(1174%) hue-rotate(166deg) brightness(93%) contrast(89%)",
      "#181717":
        "brightness(0) saturate(100%) invert(7%) sepia(5%) saturate(1094%) hue-rotate(314deg) brightness(98%) contrast(95%)",
      "#FFCA28":
        "brightness(0) saturate(100%) invert(88%) sepia(65%) saturate(2834%) hue-rotate(344deg) brightness(104%) contrast(101%)",
      "#4FC08D":
        "brightness(0) saturate(100%) invert(60%) sepia(36%) saturate(991%) hue-rotate(102deg) brightness(107%) contrast(86%)",
      "#336791":
        "brightness(0) saturate(100%) invert(35%) sepia(44%) saturate(1230%) hue-rotate(188deg) brightness(89%) contrast(87%)",
    };
    return colorMap[hex] || "none";
  };

  // Skills with actual SVG file paths and their brand colors
  const skills = [
    { name: "React", svg: reactSvg, color: "#61DAFB" },
    { name: "JavaScript", svg: javascriptSvg, color: "#F7DF1E" },
    { name: "HTML5", svg: html5Svg, color: "#E34F26" },
    { name: "CSS3", svg: cssSvg, color: "#1572B6" },
    { name: "Tailwind CSS", svg: tailwindcssSvg, color: "#06B6D4" },
    { name: "GitHub", svg: githubSvg, color: "#181717" },
    { name: "Firebase", svg: firebaseSvg, color: "#FFCA28" },
    { name: "Vue.js", svg: vuejsSvg, color: "#4FC08D" },
    { name: "PostgreSQL", svg: postgresqlSvg, color: "#336791" },
  ];

  const groupRef = useRef();
  const iconRefs = useRef([]);

  // FIXED: Only constant spinning animation, NO scroll-based effects
  useFrame((state) => {
    if (groupRef.current) {
      // Constant spinning only - no scroll dependency
      groupRef.current.rotation.x += SPIN_SPEED_X;
      groupRef.current.rotation.y += SPIN_SPEED_Y;
      groupRef.current.rotation.z += SPIN_SPEED_Z;
    }

    // Individual icon pulsing animations
    iconRefs.current.forEach((iconRef, i) => {
      if (iconRef) {
        const time = state.clock.elapsedTime;
        const offset = i * 0.5;
        const pulseSpeed = PULSE_SPEED_BASE + i * PULSE_SPEED_VARIATION;

        const scale =
          1 + Math.sin(time * pulseSpeed + offset) * (PULSE_SCALE_MAX - 1);
        iconRef.style.transform = `scale(${scale})`;
      }
    });
  });

  return (
    <>
      {/* Orbit controls only on desktop */}
      {!isMobile && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          domElement={document.querySelector("canvas")}
        />
      )}

      {/* Enhanced lighting for better visibility */}
      <pointLight position={[-3, 3, 3]} args={["#fff", 0.5]} />
      <pointLight position={[3, -3, -3]} args={["#fff", 0.3]} />
      <ambientLight intensity={0.6} />

      {/* Skills group - Using OVERALL_SCALE variable */}
      <group ref={groupRef} position={[0, 0, 0]} scale={OVERALL_SCALE}>
        {skills.map((skill, i) => {
          const position = [
            getPos(POSITION_SPREAD),
            getPos(POSITION_SPREAD),
            getPos(POSITION_SPREAD),
          ];

          return (
            <Html
              key={i}
              position={position}
              transform
              distanceFactor={DISTANCE_FACTOR}
              style={{
                width: `${CONTAINER_SIZE}px`,
                height: `${CONTAINER_SIZE}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                cursor: "pointer",
              }}
              onPointerEnter={(e) => {
                const img = e.target.querySelector("img");
                if (img) {
                  img.style.transform = `scale(${HOVER_SCALE})`;
                  img.style.filter = `
                    ${hexToFilter(skill.color)}
                    drop-shadow(0 0 ${HOVER_GLOW_OUTER}px ${skill.color})
                    drop-shadow(0 0 ${HOVER_GLOW_MEDIUM}px ${skill.color})
                    drop-shadow(0 0 ${HOVER_GLOW_INNER}px ${skill.color})
                  `;
                }
              }}
              onPointerLeave={(e) => {
                const img = e.target.querySelector("img");
                if (img) {
                  img.style.transform = "";
                  img.style.filter = `
                    ${hexToFilter(skill.color)}
                    drop-shadow(0 0 ${NORMAL_GLOW_OUTER}px ${skill.color})
                    drop-shadow(0 0 ${NORMAL_GLOW_INNER}px ${skill.color})
                  `;
                }
              }}
              ref={(el) => {
                if (el) iconRefs.current[i] = el;
              }}
            >
              <img
                src={skill.svg}
                alt={skill.name}
                title={skill.name}
                style={{
                  width: `${ICON_WIDTH}px`,
                  height: `${ICON_HEIGHT}px`,
                  filter: `
                    ${hexToFilter(skill.color)}
                    drop-shadow(0 0 ${NORMAL_GLOW_OUTER}px ${skill.color})
                    drop-shadow(0 0 ${NORMAL_GLOW_INNER}px ${skill.color})
                  `,
                  userSelect: "none",
                  pointerEvents: "none",
                  transition: "all 0.3s ease",
                }}
                onError={(e) => {
                  console.warn(`Failed to load ${skill.name} SVG:`, skill.svg);
                  e.target.style.display = "none";
                }}
              />
            </Html>
          );
        })}
      </group>
    </>
  );
};

export default Skills;
