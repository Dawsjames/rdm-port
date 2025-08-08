import React, { useState } from "react"
import { PixelSectionTitle } from "../../components/PixelatedComponents"

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      name: "E-Commerce Platform",
      description:
        "A comprehensive e-commerce solution with modern design and robust functionality.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://via.placeholder.com/400x300/ff6b47/ffffff?text=Project+1",
      source_code_link: "https://github.com/yourusername/project1",
      live_demo_link: "https://project1demo.com",
    },
    {
      name: "3D Portfolio Website",
      description:
        "Interactive portfolio website with Three.js animations and smooth user experience.",
      tags: ["React", "Three.js", "GSAP", "Tailwind"],
      image: "https://via.placeholder.com/400x300/4a9b8e/ffffff?text=Project+2",
      source_code_link: "https://github.com/yourusername/project2",
      live_demo_link: "https://project2demo.com",
    },
    {
      name: "Task Management App",
      description:
        "Collaborative task management application with real-time updates and team features.",
      tags: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
      image: "https://via.placeholder.com/400x300/ff8c42/ffffff?text=Project+3",
      source_code_link: "https://github.com/yourusername/project3",
      live_demo_link: "https://project3demo.com",
    },
    {
      name: "Weather Dashboard",
      description:
        "Real-time weather application with detailed forecasts and location-based features.",
      tags: ["React", "OpenWeather API", "Chart.js", "CSS"],
      image: "https://via.placeholder.com/400x300/d4a5c7/ffffff?text=Project+4",
      source_code_link: "https://github.com/yourusername/project4",
      live_demo_link: "https://project4demo.com",
    },
    {
      name: "Chat Application",
      description:
        "Real-time messaging platform with group chats and file sharing capabilities.",
      tags: ["React", "Socket.io", "Node.js", "MongoDB"],
      image: "https://via.placeholder.com/400x300/8b4513/ffffff?text=Project+5",
      source_code_link: "https://github.com/yourusername/project5",
      live_demo_link: "https://project5demo.com",
    },
  ]

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    )
  }

  const goToIndex = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "40px 20px",
        backgroundColor: "#2a3441",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Title (Top-Left) via shared component */}
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px", textAlign: "left" }}>
          <PixelSectionTitle title="PROJECTS" />
        </div>
      </div>

      {/* Animated Background Elements - Outline Only */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "40px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            border: "2px solid #ff6b47",
            backgroundColor: "transparent",
            animation: "twinkle 2s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "160px",
            right: "80px",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            border: "2px solid #4a9b8e",
            backgroundColor: "transparent",
            animation: "pulse 2s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "128px",
            left: "25%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            border: "2px solid #ff8c42",
            backgroundColor: "transparent",
            animation: "twinkle 2s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* ORIGINAL CAROUSEL LAYOUT - PRESERVED */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "550px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "48px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1400px",
              position: "relative",
              perspective: "1000px",
            }}
          >
            {projects.map((project, index) => {
              const position = index - currentIndex
              const isActive = index === currentIndex

              const getCardTransform = () => {
                if (position === 0)
                  return "scale(1) translateX(0) translateZ(0)"
                const baseSpacing = 300
                const scaleReduction = 0.15
                const depthSpacing = 20
                const absPosition = Math.abs(position)
                const scale = Math.max(0.6, 1 - absPosition * scaleReduction)
                const translateX = position * baseSpacing
                const translateZ = -absPosition * depthSpacing
                return `scale(${scale}) translateX(${translateX}px) translateZ(${translateZ}px)`
              }

              const getCardOpacity = () => {
                const absPosition = Math.abs(position)
                if (absPosition === 0) return 1
                if (absPosition === 1) return 0.85
                if (absPosition === 2) return 0.65
                return 0.4
              }

              const getCardZIndex = () => 50 - Math.abs(position)

              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    width: "320px",
                    height: "384px",
                    transition: "all 0.7s ease-out",
                    transform: getCardTransform(),
                    opacity: getCardOpacity(),
                    zIndex: getCardZIndex(),
                    cursor: "pointer",
                  }}
                  onClick={() => goToIndex(index)}
                >
                  <ProjectCard
                    data={project}
                    position={position}
                    isActive={isActive}
                    index={index}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced Navigation Controls - PRESERVED */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px",
            marginTop: "32px",
          }}
        >
          <button
            onClick={goToPrevious}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              border: "3px solid #4a9b8e",
              backgroundColor: "transparent",
              color: "#fee1c7",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "4px 4px 0 #4a9b8e",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)"
              e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(74, 155, 142, 0.1)"
              e.currentTarget.style.boxShadow = "6px 6px 0 #4a9b8e"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
                fill="currentColor"
                style={{ transform: "rotate(180deg)" }}
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div style={{ display: "flex", gap: "16px" }}>
            {projects.map((_, index) => (
              <button
                key={index}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: `3px solid ${
                    index === currentIndex ? "#ff8c42" : "#666"
                  }`,
                  backgroundColor:
                    index === currentIndex ? "#ff8c42" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform:
                    index === currentIndex ? "scale(1.25)" : "scale(1)",
                  boxShadow:
                    index === currentIndex
                      ? "0 0 20px rgba(255, 140, 66, 0.4)"
                      : "none",
                }}
                onClick={() => goToIndex(index)}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.borderColor = "#4a9b8e"
                    e.currentTarget.style.backgroundColor =
                      "rgba(74, 155, 142, 0.2)"
                    e.currentTarget.style.transform = "scale(1.1)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.borderColor = "#666"
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.transform = "scale(1)"
                  }
                }}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              border: "3px solid #4a9b8e",
              backgroundColor: "transparent",
              color: "#fee1c7",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "4px 4px 0 #4a9b8e",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)"
              e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(74, 155, 142, 0.1)"
              e.currentTarget.style.boxShadow = "6px 6px 0 #4a9b8e"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Project Counter - PRESERVED */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              backdropFilter: "blur(10px)",
              border: "3px solid rgba(74, 155, 142, 0.3)",
              borderRadius: "24px",
              padding: "12px 24px",
              backgroundColor: "transparent",
            }}
          >
            <span
              style={{
                color: "#fee1c7",
                fontSize: "18px",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              Project
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#ff8c42",
              }}
            >
              {currentIndex + 1}
            </span>
            <span
              style={{
                color: "#fee1c7",
                fontSize: "18px",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              of
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#4a9b8e",
              }}
            >
              {projects.length}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

// Project Card Component with Pixelated Design (unchanged)
const ProjectCard = ({ data, position, isActive, index }) => {
  const colors = [
    { bg: "#2a3441", border: "#ff6b47", text: "#fee1c7", accent: "#ff6b47" },
    { bg: "#fee1c7", border: "#4a9b8e", text: "#2a3441", accent: "#8b4513" },
    { bg: "#2a3441", border: "#ff8c42", text: "#fee1c7", accent: "#d4a5c7" },
  ]
  const colorScheme = colors[index % colors.length]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colorScheme.bg,
        border: `3px solid ${colorScheme.border}`,
        borderRadius: "12px",
        boxShadow: isActive
          ? `6px 6px 0 ${colorScheme.border}`
          : `4px 4px 0 ${colorScheme.border}`,
        overflow: "hidden",
        transition: "all 0.5s ease",
        cursor: "pointer",
      }}
    >
      {/* Project Image */}
      <div
        style={{
          width: "100%",
          height: "192px",
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(42, 52, 65, 0.9), rgba(42, 52, 65, 0.3), transparent)",
          }}
        />

        {/* Active indicator */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#ff8c42",
                border: `2px solid ${colorScheme.border}`,
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                padding: "4px 8px",
                borderRadius: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "#ff8c42",
                border: `2px solid rgba(255, 140, 66, 0.3)`,
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              Active
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div
        style={{
          padding: "24px",
          height: "192px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              color: colorScheme.text,
              fontSize: isActive ? "20px" : "18px",
              fontWeight: "bold",
              marginBottom: "12px",
              transition: "all 0.3s ease",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
          >
            {data.name}
          </h3>
          <p
            style={{
              color: colorScheme.text,
              fontSize: "14px",
              lineHeight: "1.4",
              opacity: isActive ? 1 : 0.8,
              transition: "all 0.3s ease",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        {data.tags && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {data.tags.slice(0, isActive ? 4 : 3).map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    backgroundColor: "transparent",
                    color: colorScheme.accent,
                    border: `2px solid ${colorScheme.accent}`,
                    borderRadius: "6px",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    fontFamily: '"Roboto Mono", "Courier New", monospace',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - Only show on active item */}
        {isActive && (
          <div style={{ display: "flex", gap: "12px" }}>
            {data.source_code_link && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(data.source_code_link, "_blank")
                }}
                style={{
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: colorScheme.text,
                  backgroundColor: "transparent",
                  border: `3px solid ${colorScheme.border}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.1s ease-in",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: `4px 4px 0 ${colorScheme.border}`,
                  fontFamily: '"Roboto Mono", "Courier New", monospace',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(2px, 2px)"
                  e.currentTarget.style.boxShadow = `2px 2px 0 ${colorScheme.border}`
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = `4px 4px 0 ${colorScheme.border}`
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Code
              </button>
            )}
            {data.live_demo_link && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(data.live_demo_link, "_blank")
                }}
                style={{
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: colorScheme.text,
                  backgroundColor: "transparent",
                  border: `3px solid ${colorScheme.accent}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.1s ease-in",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: `4px 4px 0 ${colorScheme.accent}`,
                  fontFamily: '"Roboto Mono", "Courier New", monospace',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(2px, 2px)"
                  e.currentTarget.style.boxShadow = `2px 2px 0 ${colorScheme.accent}`
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = `4px 4px 0 ${colorScheme.accent}`
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Demo
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default Projects
