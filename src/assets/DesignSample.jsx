import React, { useState } from "react";

const ExperienceWithGlow = () => {
  const [activeCard, setActiveCard] = useState(0);

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
        background: "#fee1c7",
        border: "#4a9b8e",
        text: "#2a3441",
        accent: "#8b4513",
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
  ];

  // Button style - no glow for internal elements
  const pixelButton = (scheme, filled = false) => ({
    all: "unset",
    backgroundColor: filled
      ? scheme.background === "#2a3441"
        ? "#1f2937"
        : "#f5e6d3"
      : "transparent",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    minWidth: "50px",
    minHeight: "40px",
    border: `3px solid ${scheme.border}`,
    borderRadius: "8px",
    color: scheme.text,
    boxShadow: `4px 4px 0 ${scheme.border}`,
    cursor: "pointer",
    transition: "all 0.1s ease-in",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    imageRendering: "pixelated",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#2a3441",
        padding: "40px 20px",
        fontFamily: '"Roboto Mono", "Courier New", monospace',
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Title with Orange Glow */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#ff8c42",
              letterSpacing: "4px",
              marginBottom: "20px",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              textShadow: "0 0 30px rgba(255, 140, 66, 0.4)",
            }}
          >
            EXPERIENCE
          </h1>
          <div
            style={{
              width: "200px",
              height: "4px",
              margin: "0 auto",
              backgroundColor: "transparent",
              border: "2px solid #ff8c42",
              borderRadius: "4px",
              boxShadow: "0 0 20px rgba(255, 140, 66, 0.4)",
            }}
          />
        </div>

        {/* Experience Cards - Each with Different Color Scheme and Glow */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {experiences.map((exp, index) => {
            const scheme = exp.colorScheme;
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
                  e.currentTarget.style.transform = "translate(2px, 2px)";
                  e.currentTarget.style.boxShadow = `2px 2px 0 ${scheme.border}, 0 0 15px ${scheme.glow}`;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform =
                    activeCard === exp.id ? "translate(-1px, -1px)" : "none";
                  e.currentTarget.style.boxShadow =
                    activeCard === exp.id
                      ? `6px 6px 0 ${scheme.border}, 0 0 40px ${scheme.glow}`
                      : `4px 4px 0 ${scheme.border}, 0 0 25px ${scheme.glow}`;
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
                        backgroundColor: "transparent",
                        border: `3px solid ${scheme.accent}`,
                        borderRadius: "8px",
                        color: scheme.accent,
                        boxShadow: `4px 4px 0 ${scheme.accent}`,
                        fontFamily: '"Roboto Mono", "Courier New", monospace',
                        fontWeight: "bold",
                        padding: "6px 12px",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.1s ease-in",
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = "translate(2px, 2px)";
                        e.currentTarget.style.boxShadow = `2px 2px 0 ${scheme.accent}`;
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.accent}`;
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          scheme.background === "#2a3441"
                            ? "#1f2937"
                            : "#f5e6d3";
                        e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.accent}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.accent}`;
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Section with Teal Glow */}
        <div
          style={{
            backgroundColor: "#fee1c7",
            border: "3px solid #4a9b8e",
            borderRadius: "8px",
            boxShadow: "4px 4px 0 #4a9b8e, 0 0 30px rgba(74, 155, 142, 0.3)",
            padding: "32px",
            marginBottom: "48px",
          }}
        >
          <h2
            style={{
              color: "#2a3441",
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            NAVIGATION
          </h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                ...pixelButton(
                  {
                    background: "#fee1c7",
                    border: "#4a9b8e",
                    text: "#2a3441",
                    glow: "rgba(74, 155, 142, 0.3)",
                  },
                  true
                ),
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e";
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ead6c0";
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f5e6d3";
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e";
              }}
            >
              VIEW PROJECTS
            </button>

            <button
              style={{
                ...pixelButton({
                  background: "#fee1c7",
                  border: "#4a9b8e",
                  text: "#2a3441",
                  glow: "rgba(74, 155, 142, 0.3)",
                }),
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e";
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f5e6d3";
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e";
              }}
            >
              CONTACT ME
            </button>
          </div>
        </div>

        {/* Form Section with Orange Glow */}
        <div
          style={{
            backgroundColor: "#2a3441",
            border: "3px solid #ff6b47",
            borderRadius: "8px",
            boxShadow: "4px 4px 0 #ff6b47, 0 0 30px rgba(255, 107, 71, 0.3)",
            padding: "32px",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              color: "#fee1c7",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            CONTACT FORM
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                backgroundColor: "#1f2937",
                width: "100%",
                outline: "none",
                border: "3px solid #ff6b47",
                boxShadow: "4px 4px 0 #ff6b47",
                borderRadius: "8px",
                transition: "all 0.1s ease",
                color: "#fee1c7",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
                marginBottom: "16px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "3px 3px 0 #ff6b47";
                e.currentTarget.style.borderColor = "#ff8c42";
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
                e.currentTarget.style.borderColor = "#ff6b47";
              }}
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                backgroundColor: "#1f2937",
                width: "100%",
                outline: "none",
                border: "3px solid #ff6b47",
                boxShadow: "4px 4px 0 #ff6b47",
                borderRadius: "8px",
                transition: "all 0.1s ease",
                color: "#fee1c7",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
                resize: "none",
                minHeight: "120px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "3px 3px 0 #ff6b47";
                e.currentTarget.style.borderColor = "#ff8c42";
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
                e.currentTarget.style.borderColor = "#ff6b47";
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                backgroundColor: "#fee1c7",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px 24px",
                minWidth: "50px",
                minHeight: "40px",
                border: "3px solid #ff6b47",
                borderRadius: "8px",
                color: "#2a3441",
                boxShadow: "4px 4px 0 #ff6b47",
                cursor: "pointer",
                transition: "all 0.1s ease-in",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 #ff6b47";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ead6c0";
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fee1c7";
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
              }}
            >
              SUBMIT
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px 24px",
                minWidth: "50px",
                minHeight: "40px",
                border: "3px solid #ff6b47",
                borderRadius: "8px",
                color: "#fee1c7",
                boxShadow: "4px 4px 0 #ff6b47",
                cursor: "pointer",
                transition: "all 0.1s ease-in",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 #ff6b47";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1f2937";
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "4px 4px 0 #ff6b47";
              }}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceWithGlow;
