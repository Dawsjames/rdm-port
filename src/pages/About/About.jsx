import React, { useState } from "react"

const About = () => {
  const [activeCard, setActiveCard] = useState(0)

  // Simplified education data
  const education = [
    {
      id: 0,
      title: "D.Y. Patil College of Engineering, Pune",
      subtitle: "Bachelors of Computer Engineering (2019-2023)",
      image: "https://via.placeholder.com/100x100/ff6b47/ffffff?text=College",
      colorScheme: {
        background: "#fee1c7",
        border: "#4a9b8e",
        text: "#2a3441",
        accent: "#8b4513",
      },
    },
    {
      id: 1,
      title: "M.P. Deo D. Science College, Nagpur",
      subtitle: "High School (2017-2019)",
      image: "https://via.placeholder.com/100x100/4a9b8e/ffffff?text=HS",
      colorScheme: {
        background: "#2a3441",
        border: "#ff8c42",
        text: "#fee1c7",
        accent: "#d4a5c7",
      },
    },
    {
      id: 2,
      title: "School of Scholars, Nagpur",
      subtitle: "Secondary Education (2007-2017)",
      image: "https://via.placeholder.com/100x100/ff8c42/ffffff?text=Elem",
      colorScheme: {
        background: "#2a3441",
        border: "#ff6b47",
        text: "#fee1c7",
        accent: "#ff6b47",
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
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
        {/* Title */}
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
            ABOUT
          </h1>
          <p
            style={{
              color: "#fee1c7",
              fontSize: "18px",
              opacity: 0.8,
              marginTop: "16px",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              maxWidth: "600px",
              margin: "16px auto 0",
            }}
          >
            Discover my journey, skills, and passion for creating digital
            experiences
          </p>
          <div
            style={{
              width: "200px",
              height: "4px",
              margin: "20px auto 0",
              backgroundColor: "transparent",
              border: "2px solid #ff8c42",
              borderRadius: "4px",
              boxShadow: "0 0 20px rgba(255, 140, 66, 0.4)",
            }}
          />
        </div>

        {/* NEW LAYOUT - Education Left, About Me Center, Floating Logos Right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "32px",
            marginBottom: "80px",
          }}
        >
          {/* Left Column - Education (Moved from bottom) */}
          <div
            style={{
              backgroundColor: "#fee1c7",
              border: "3px solid #ff8c42",
              borderRadius: "12px",
              boxShadow: "4px 4px 0 #ff8c42, 0 0 30px rgba(255, 140, 66, 0.3)",
              padding: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ff8c42",
                marginBottom: "24px",
                textAlign: "center",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              EDUCATION
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {education.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveCard(item.id)}
                  style={{
                    backgroundColor: item.colorScheme.background,
                    border: `3px solid ${item.colorScheme.border}`,
                    borderRadius: "8px",
                    boxShadow: `4px 4px 0 ${item.colorScheme.border}`,
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.1s ease-in",
                    transform:
                      activeCard === item.id ? "translate(-1px, -1px)" : "none",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translate(2px, 2px)"
                    e.currentTarget.style.boxShadow = `2px 2px 0 ${item.colorScheme.border}`
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform =
                      activeCard === item.id ? "translate(-1px, -1px)" : "none"
                    e.currentTarget.style.boxShadow = `4px 4px 0 ${item.colorScheme.border}`
                  }}
                >
                  <h3
                    style={{
                      color: item.colorScheme.text,
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: item.colorScheme.accent,
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column - About Me */}
          <div
            style={{
              backgroundColor: "#2a3441",
              border: "3px solid #ff6b47",
              borderRadius: "12px",
              boxShadow: "4px 4px 0 #ff6b47, 0 0 30px rgba(255, 107, 71, 0.3)",
              padding: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#ff6b47",
                marginBottom: "24px",
                textAlign: "center",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              ABOUT ME
            </h2>
            <p
              style={{
                color: "#fee1c7",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              I'm a passionate programmer, always looking for new challenges to
              improve myself. A team player who's always ready to learn new
              things and help others.
            </p>
            <p
              style={{
                color: "#fee1c7",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              Born and raised in Nagpur, India. I love to play guitar and
              ukulele. In my free time I like to read books, watch movies and
              play video games.
            </p>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#1f2937",
                border: "2px solid #ff6b47",
                borderRadius: "8px",
                marginTop: "24px",
              }}
            >
              <p
                style={{
                  color: "#ff8c42",
                  fontSize: "16px",
                  fontStyle: "italic",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                "Always learning, always growing"
              </p>
            </div>
          </div>

          {/* Right Column - Floating Tech Logos */}
          <div
            style={{
              position: "relative",
              backgroundColor: "#fee1c7",
              border: "3px solid #4a9b8e",
              borderRadius: "12px",
              boxShadow: "4px 4px 0 #4a9b8e, 0 0 30px rgba(74, 155, 142, 0.3)",
              padding: "32px",
              minHeight: "400px",
              overflow: "hidden",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#4a9b8e",
                marginBottom: "24px",
                textAlign: "center",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              TECH STACK
            </h2>

            {/* Floating Tech Logos */}
            <div style={{ position: "relative", height: "300px" }}>
              {[
                { name: "React", x: "10%", y: "20%", delay: "0s", color: "#61dafb" },
                { name: "Node.js", x: "70%", y: "15%", delay: "0.5s", color: "#339933" },
                { name: "Three.js", x: "20%", y: "60%", delay: "1s", color: "#000000" },
                { name: "MongoDB", x: "80%", y: "70%", delay: "1.5s", color: "#47a248" },
                { name: "TypeScript", x: "50%", y: "40%", delay: "2s", color: "#3178c6" },
                { name: "AWS", x: "30%", y: "80%", delay: "2.5s", color: "#ff9900" },
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  style={{
                    position: "absolute",
                    left: tech.x,
                    top: tech.y,
                    backgroundColor: "transparent",
                    border: "3px solid #4a9b8e",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    color: "#4a9b8e",
                    fontWeight: "bold",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.1s ease-in",
                    boxShadow: "4px 4px 0 #4a9b8e",
                    animation: `float 3s ease-in-out infinite`,
                    animationDelay: tech.delay,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translate(-50%, -50%) translate(2px, 2px)"
                    e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e"
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "translate(-50%, -50%)"
                    e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ead6c0"
                    e.currentTarget.style.borderColor = tech.color
                    e.currentTarget.style.color = tech.color
                    e.currentTarget.style.boxShadow = `4px 4px 0 ${tech.color}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.borderColor = "#4a9b8e"
                    e.currentTarget.style.color = "#4a9b8e"
                    e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
                  }}
                >
                  {tech.name}
                </div>
              ))}
            </div>
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
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

export default About
