import React, { useState } from "react"
import { PixelSectionTitle, COLORS } from "../../components/PixelatedComponents"

const Experience = () => {
  const [activeCard, setActiveCard] = useState(0)

  const experiences = [
    {
      id: 0,
      name: "Company 1",
      title: "Software Developer",
      joined: "2022",
      end: "Present",
      bio: "Working on full-stack development using React, Node.js, and cloud technologies.",
      logo: "https://via.placeholder.com/64x64/ff6b47/232c33?text=C1",
      technologies: ["React", "Node.js", "AWS", "MongoDB"],
      colorScheme: {
        background: "#2a3441",
        border: "#ff6b47",
        text: "#fee1c7",
        accent: "#ff6b47",
        glow: "rgba(255, 107, 71, 0.3)",
      },
    },
    {
      id: 1,
      name: "Company 2",
      title: "Frontend Developer",
      joined: "2021",
      end: "2022",
      bio: "Developed responsive web applications using React and TypeScript.",
      logo: "https://via.placeholder.com/64x64/4a9b8e/fee1c7?text=C2",
      technologies: ["React", "TypeScript", "SCSS", "Git"],
      colorScheme: {
        background: "#2a3441",
        border: "#4a9b8e",
        text: "#fee1c7",
        accent: "#4a9b8e",
        glow: "rgba(74, 155, 142, 0.3)",
      },
    },
    {
      id: 2,
      name: "Company 3",
      title: "Junior Developer",
      joined: "2020",
      end: "2021",
      bio: "Built interactive websites and learned modern development practices.",
      logo: "https://via.placeholder.com/64x64/ff8c42/2a3441?text=C3",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      colorScheme: {
        background: "#2a3441",
        border: "#ff8c42",
        text: "#fee1c7",
        accent: "#d4a5c7",
        glow: "rgba(255, 140, 66, 0.3)",
      },
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#2a3441",
        padding: "40px 20px",
        fontFamily: '"Roboto Mono", "Courier New", monospace',
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Title (Top-Left) via shared component */}
        <div style={{ marginBottom: "40px", textAlign: "left" }}>
          <PixelSectionTitle title="EXPERIENCE" />
        </div>

        {/* Experience Cards - ORIGINAL LAYOUT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {experiences.map((exp) => {
            const scheme = exp.colorScheme
            return (
              <div
                key={exp.id}
                onClick={() => setActiveCard(exp.id)}
                style={{
                  backgroundColor: scheme.background,
                  border: `3px solid ${scheme.border}`,
                  borderRadius: "8px",
                  boxShadow:
                    activeCard === exp.id
                      ? `6px 6px 0 ${scheme.border}, 0 0 40px ${scheme.glow}`
                      : `4px 4px 0 ${scheme.border}, 0 0 25px ${scheme.glow}`,
                  padding: "24px",
                  transition: "all 0.1s ease-in",
                  transform:
                    activeCard === exp.id ? "translate(-1px, -1px)" : "none",
                  cursor: "pointer",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(2px, 2px)"
                  e.currentTarget.style.boxShadow = `2px 2px 0 ${scheme.border}, 0 0 15px ${scheme.glow}`
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform =
                    activeCard === exp.id ? "translate(-1px, -1px)" : "none"
                  e.currentTarget.style.boxShadow =
                    activeCard === exp.id
                      ? `6px 6px 0 ${scheme.border}, 0 0 40px ${scheme.glow}`
                      : `4px 4px 0 ${scheme.border}, 0 0 25px ${scheme.glow}`
                }}
              >
                {/* Company Logo */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "0 auto 16px",
                    backgroundColor: "transparent",
                    border: `3px solid ${scheme.border}`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={exp.logo}
                    alt={exp.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      imageRendering: "pixelated",
                    }}
                  />
                </div>

                {/* Company Info */}
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <h3
                    style={{
                      color: scheme.text,
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {exp.name}
                  </h3>
                  <p
                    style={{
                      color: scheme.border,
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {exp.title}
                  </p>
                </div>

                {/* Date Badge */}
                <div
                  style={{
                    backgroundColor:
                      scheme.background === "#2a3441" ? "#1f2937" : "#f5e6d3",
                    border: `3px solid ${scheme.accent}`,
                    borderRadius: "8px",
                    color: scheme.accent,
                    boxShadow: `4px 4px 0 ${scheme.accent}`,
                    fontFamily: '"Roboto Mono", "Courier New", monospace',
                    fontWeight: "bold",
                    padding: "8px 16px",
                    fontSize: "14px",
                    margin: "0 auto 16px",
                    width: "fit-content",
                  }}
                >
                  {exp.joined} - {exp.end}
                </div>

                {/* Description */}
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    backgroundColor:
                      scheme.background === "#fee1c7" ? "#f5e6d3" : "#1f2937",
                    color: scheme.text,
                    border: `3px solid ${scheme.border}`,
                    boxShadow: `4px 4px 0 ${scheme.border}`,
                    borderRadius: "8px",
                    marginBottom: "16px",
                    minHeight: "80px",
                    lineHeight: "1.5",
                    fontFamily: '"Roboto Mono", "Courier New", monospace',
                  }}
                >
                  {exp.bio}
                </div>

                {/* Technologies */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  {exp.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: scheme.accent,
                        border: `3px solid ${scheme.accent}`,
                        borderRadius: "8px",
                        color: "#2a3441",
                        boxShadow: `4px 4px 0 ${scheme.accent}`,
                        fontFamily: '"Roboto Mono", "Courier New", monospace',
                        fontWeight: "bold",
                        padding: "6px 12px",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.1s ease-in",
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = "translate(2px, 2px)"
                        e.currentTarget.style.boxShadow = `2px 2px 0 ${scheme.accent}`
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = "none"
                        e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.accent}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.color = scheme.accent
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = scheme.accent
                        e.currentTarget.style.color = "#2a3441"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Experience
