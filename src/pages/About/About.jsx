// About.jsx
import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  PixelSectionTitle,
  PixelCard,
  PixelBadge,
  COLORS,
} from "../../components/PixelatedComponents"

// ====== TUNABLE SIZING ======
const PANEL_HEIGHT = 620 // fixed height for each of the 3 columns
const EDU_ROW_H = 112 // each education row height
const AVATAR = 88 // avatar size in About panel

// ---------- Floating Tech Logos Portal (unchanged) ----------
function TechLogosPortal({ anchorRef, items, zIndex = 1200 }) {
  const [rect, setRect] = useState(null)

  useEffect(() => {
    const el = anchorRef?.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [anchorRef])

  if (!rect) return null

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        zIndex,
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {items.map((tech) => (
          <div
            key={tech.name}
            style={{
              position: "absolute",
              left: tech.x,
              top: tech.y,
              transform: "translate(-50%, -50%)",
              animation: `floatY 3.4s ease-in-out infinite`,
              animationDelay: tech.delay || "0s",
              pointerEvents: "auto",
              width: tech.size || 48,
              height: tech.size || 48,
              display: "grid",
              placeItems: "center",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)",
              border: `2px solid ${tech.ring || COLORS.teal}`,
              boxShadow: `0 0 0 3px rgba(0,0,0,0.08)`,
              transition:
                "transform .15s ease, box-shadow .15s ease, filter .15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translate(-50%, -50%) scale(1.15)"
              e.currentTarget.style.boxShadow = `0 0 20px 4px ${
                tech.glow || "rgba(74,155,142,0.6)"
              }`
              const img = e.currentTarget.querySelector("img")
              if (img) {
                img.style.filter = "drop-shadow(0 0 6px rgba(255,255,255,0.55))"
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(-50%, -50%)"
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,0,0,0.08)`
              const img = e.currentTarget.querySelector("img")
              if (img) img.style.filter = "none"
            }}
          >
            <img
              src={tech.src}
              alt={tech.name}
              width={(tech.size || 48) - 10}
              height={(tech.size || 48) - 10}
              draggable={false}
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
                userSelect: "none",
                pointerEvents: "none",
                transition: "filter .15s ease",
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}

const TECH_LOGOS = [
  {
    name: "React",
    src: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
    x: "10%",
    y: "20%",
    delay: "0s",
    ring: "#61dafb",
    glow: "rgba(97,218,251,0.6)",
    size: 56,
  },
  {
    name: "Node.js",
    src: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
    x: "70%",
    y: "15%",
    delay: "0.4s",
    ring: "#339933",
    glow: "rgba(51,153,51,0.55)",
    size: 54,
  },
  {
    name: "Three.js",
    src: "https://www.vectorlogo.zone/logos/threejs/threejs-icon.svg",
    x: "20%",
    y: "60%",
    delay: "0.8s",
    ring: "#000000",
    glow: "rgba(0,0,0,0.45)",
    size: 50,
  },
  {
    name: "MongoDB",
    src: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
    x: "80%",
    y: "70%",
    delay: "1.2s",
    ring: "#47A248",
    glow: "rgba(71,162,72,0.55)",
    size: 54,
  },
  {
    name: "TypeScript",
    src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    x: "50%",
    y: "40%",
    delay: "1.6s",
    ring: "#3178C6",
    glow: "rgba(49,120,198,0.55)",
    size: 52,
  },
  {
    name: "AWS",
    src: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
    x: "30%",
    y: "80%",
    delay: "2s",
    ring: "#FF9900",
    glow: "rgba(255,153,0,0.55)",
    size: 52,
  },
]

// ---------- DATA ----------
const education = [
  {
    id: 0,
    title: "D.Y. Patil College of Engineering, Pune",
    subtitle: "Bachelors of Computer Engineering (2019–2023)",
    image: "https://via.placeholder.com/100x100/ff6b47/ffffff?text=College",
    border: COLORS.teal,
    badges: ["CGPA —", "Clubs —", "Systems / Web"],
  },
  {
    id: 1,
    title: "M.P. Deo D. Science College, Nagpur",
    subtitle: "High School (2017–2019)",
    image: "https://via.placeholder.com/100x100/4a9b8e/ffffff?text=HS",
    border: COLORS.orange,
    badges: ["Science", "Maths", "Leadership"],
  },
  {
    id: 2,
    title: "School of Scholars, Nagpur",
    subtitle: "Secondary Education (2007–2017)",
    image: "https://via.placeholder.com/100x100/ff8c42/ffffff?text=Elem",
    border: COLORS.brightOrange,
    badges: ["Foundations", "STEM", "Arts"],
  },
]

// ---------- UI ----------
const About = () => {
  const [active, setActive] = useState(0)
  const techAreaRef = useRef(null)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.dark,
        padding: "40px 20px",
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <PixelSectionTitle
          title="ABOUT"
          subtitle="Discover my journey, skills, and passion for creating digital experiences"
          color={COLORS.brightOrange}
        />

        {/* 3 columns: About • Education • Tech Stack */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* ABOUT (left) */}
          <PixelCard
            variant="dark"
            glowColor="rgba(255, 140, 66, 0.30)"
            style={{
              height: PANEL_HEIGHT,
              display: "flex",
              flexDirection: "column",
              borderColor: COLORS.orange,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: AVATAR,
                  height: AVATAR,
                  borderRadius: 12,
                  border: `3px solid ${COLORS.orange}`,
                  background: COLORS.darkVariant,
                  display: "grid",
                  placeItems: "center",
                  boxShadow: `4px 4px 0 ${COLORS.orange}`,
                }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    color: COLORS.light,
                    fontSize: 22,
                    letterSpacing: 1,
                  }}
                >
                  DOS
                </span>
              </div>
              <div style={{ minWidth: 0 }}>
                <h2
                  style={{
                    color: COLORS.orange,
                    fontSize: 26,
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: 1,
                  }}
                >
                  Developer • Builder
                </h2>
                <p
                  style={{
                    color: COLORS.light,
                    opacity: 0.85,
                    fontSize: 14,
                    margin: "6px 0 0 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  JS/TS • React • Node • 3D • Cloud
                </p>
              </div>
            </div>

            {/* Bio body (scrollable) */}
            <div style={{ overflowY: "auto", paddingRight: 6, flex: 1 }}>
              <p
                style={{
                  color: COLORS.light,
                  fontSize: 16,
                  lineHeight: 1.6,
                  marginTop: 6,
                }}
              >
                Passionate programmer focused on fast iteration and thoughtful
                UX. I ship web apps, 3D visuals, and services that scale.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Frontend", "3D/Graphics", "Backend", "Cloud"].map((t) => (
                  <PixelBadge key={t} variant="primary">
                    {t}
                  </PixelBadge>
                ))}
              </div>

              <div
                style={{
                  marginTop: 18,
                  padding: 16,
                  background: COLORS.darkVariant,
                  border: `3px solid ${COLORS.orange}`,
                  borderRadius: 8,
                  boxShadow: `4px 4px 0 ${COLORS.orange}`,
                }}
              >
                <p
                  style={{
                    color: COLORS.brightOrange,
                    fontSize: 15,
                    margin: 0,
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  “Always learning, always growing.”
                </p>
              </div>

              {/* Quick stats */}
              <div
                style={{
                  marginTop: 18,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  { k: "Years coding", v: "5+" },
                  { k: "Specialty", v: "React/TS" },
                  { k: "Fav tool", v: "Three.js" },
                  { k: "Cloud", v: "AWS" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: COLORS.darkVariant,
                      border: `3px solid ${COLORS.orange}`,
                      borderRadius: 8,
                      padding: "10px 12px",
                      boxShadow: `3px 3px 0 ${COLORS.orange}`,
                    }}
                  >
                    <div
                      style={{
                        color: COLORS.light,
                        fontSize: 12,
                        opacity: 0.75,
                        marginBottom: 4,
                      }}
                    >
                      {s.k}
                    </div>
                    <div
                      style={{
                        color: COLORS.light,
                        fontWeight: 900,
                        fontSize: 16,
                        letterSpacing: 0.5,
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PixelCard>

          {/* EDUCATION (middle) — pixel timeline */}
          <PixelCard
            variant="dark"
            glowColor="rgba(74, 155, 142, 0.25)"
            style={{
              height: PANEL_HEIGHT,
              borderColor: COLORS.teal,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                color: COLORS.teal,
                fontSize: 22,
                margin: "0 0 10px 0",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              EDUCATION
            </h3>

            <div
              style={{
                position: "relative",
                flex: 1,
                overflowY: "auto",
                paddingRight: 8,
              }}
            >
              {/* Vertical rail */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 8,
                  bottom: 8,
                  left: 26,
                  width: 2,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                }}
              />
              <div style={{ display: "grid", gap: 12 }}>
                {education.map((e) => {
                  const isActive = active === e.id
                  return (
                    <div
                      key={e.id}
                      onClick={() => setActive(e.id)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: isActive ? "52px 1fr" : "52px 0fr",
                        gap: 12,
                        height: EDU_ROW_H,
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "grid-template-columns .14s ease",
                      }}
                    >
                      {/* Dot + logo column */}
                      <div style={{ position: "relative", height: "100%" }}>
                        {/* timeline dot */}
                        <span
                          style={{
                            position: "absolute",
                            left: 17,
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            border: `3px solid ${e.border}`,
                            background: isActive
                              ? e.border
                              : "rgba(255,255,255,0.05)",
                            boxShadow: `0 0 10px rgba(0,0,0,0.25)`,
                          }}
                        />
                        {/* logo box */}
                        <div
                          style={{
                            position: "absolute",
                            left: 6,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            display: "grid",
                            placeItems: "center",
                            background: COLORS.darkVariant,
                            border: `3px solid ${e.border}`,
                            boxShadow: `3px 3px 0 ${e.border}`,
                          }}
                          title={`${e.title} — ${e.subtitle}`}
                        >
                          <img
                            src={e.image}
                            alt={e.title}
                            width={22}
                            height={22}
                            style={{ display: "block" }}
                          />
                        </div>
                      </div>

                      {/* Card body — ONLY visible when active */}
                      {isActive ? (
                        <div
                          style={{
                            height: "100%",
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                            border: `3px solid ${e.border}`,
                            borderRadius: 10,
                            padding: "12px 14px",
                            boxShadow: `4px 4px 0 ${e.border}, 0 0 24px rgba(0,0,0,0.25)`,
                            transform: "translate(-1px,-1px)",
                            transition:
                              "opacity .12s ease, transform .12s ease",
                            display: "grid",
                            alignContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              color: COLORS.light,
                              fontSize: 15,
                              fontWeight: 900,
                              lineHeight: 1.15,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={e.title}
                          >
                            {e.title}
                          </div>
                          <div
                            style={{
                              color: e.border,
                              fontSize: 12.5,
                              fontWeight: 800,
                              marginTop: 6,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={e.subtitle}
                          >
                            {e.subtitle}
                          </div>

                          {/* badges */}
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              marginTop: 8,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {e.badges.map((b) => (
                              <span
                                key={b}
                                style={{
                                  fontSize: 10.5,
                                  fontWeight: 800,
                                  color: COLORS.light,
                                  background: "rgba(255,255,255,0.08)",
                                  border: `2px dashed ${e.border}`,
                                  padding: "4px 8px",
                                  borderRadius: 6,
                                }}
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </PixelCard>

          {/* TECH STACK (right) — fixed height + outline like other cards */}
          <PixelCard
            variant="light"
            glowColor="rgba(74, 155, 142, 0.30)"
            style={{
              background: COLORS.light,
              borderColor: COLORS.teal,
              border: `3px solid ${COLORS.teal}`, // outline
              boxShadow: `4px 4px 0 ${COLORS.teal}`, // pixel shadow like others
              borderRadius: 10,
              height: PANEL_HEIGHT,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                color: COLORS.teal,
                fontSize: 22,
                margin: "0 0 12px 0",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              TECH STACK
            </h3>
            <div style={{ position: "relative", flex: 1 }} ref={techAreaRef}>
              <TechLogosPortal
                anchorRef={techAreaRef}
                items={TECH_LOGOS}
                zIndex={1200}
              />
            </div>
          </PixelCard>
        </div>
      </div>

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

export default About
