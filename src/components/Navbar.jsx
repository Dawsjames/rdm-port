import React, { useState, useEffect, useMemo } from "react"

const EARLY_EXIT_PX = 400 // switch to top bar this many pixels before hero ends

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [inHeroMode, setInHeroMode] = useState(true)

  const navItems = useMemo(
    () => [
      {
        id: "hero",
        label: "Home",
        icon: (
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9931 3.43368C12.8564 2.42331 11.1436 2.42331 10.0069 3.43368L2.33565 10.2526C1.92286 10.6195 1.88568 11.2516 2.2526 11.6644C2.61952 12.0771 3.25159 12.1143 3.66437 11.7474L4.00001 11.4491L4.00001 17.0658C3.99996 17.9523 3.99992 18.7161 4.08215 19.3278C4.17028 19.9833 4.36903 20.6117 4.87869 21.1213C5.38835 21.631 6.0167 21.8297 6.67222 21.9179C7.28388 22.0001 8.04769 22 8.93418 22H15.0658C15.9523 22 16.7161 22.0001 17.3278 21.9179C17.9833 21.8297 18.6117 21.631 19.1213 21.1213C19.631 20.6117 19.8297 19.9833 19.9179 19.3278C20.0001 18.7161 20.0001 17.9523 20 17.0659L20 11.4491L20.3356 11.7474C20.7484 12.1143 21.3805 12.0771 21.7474 11.6644C22.1143 11.2516 22.0772 10.6195 21.6644 10.2526L13.9931 3.43368ZM12 16C11.4477 16 11 16.4477 11 17V19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19V17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V17C13 16.4477 12.5523 16 12 16Z"
              fill="#ff8c42"
            />
          </svg>
        ),
      },
      {
        id: "about",
        label: "About",
        icon: (
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 9C11.7015 9 11.4344 9.12956 11.2497 9.33882C10.8843 9.75289 10.2523 9.79229 9.83827 9.42683C9.4242 9.06136 9.3848 8.42942 9.75026 8.01535C10.2985 7.3942 11.1038 7 12 7C13.6569 7 15 8.34315 15 10C15 11.3072 14.1647 12.4171 13 12.829V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V12.5C11 11.6284 11.6873 11.112 12.2482 10.9692C12.681 10.859 13 10.4655 13 10C13 9.44772 12.5523 9 12 9ZM12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17H12.01C12.5623 17 13.01 16.5523 13.01 16C13.01 15.4477 12.5623 15 12.01 15H12Z"
              fill="#ff8c42"
            />
          </svg>
        ),
      },
      {
        id: "experience",
        label: "Experience",
        icon: (
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2C8.34315 2 7 3.34315 7 5V6L5.96802 6C5.52938 5.99999 5.15087 5.99998 4.83762 6.02135C4.50779 6.04385 4.17788 6.09336 3.85195 6.22836C3.11687 6.53284 2.53285 7.11687 2.22837 7.85195C2.09336 8.17788 2.04386 8.50779 2.02135 8.83762C1.99998 9.15087 1.99999 9.52936 2 9.968L2 17.0658C1.99995 17.9523 1.99991 18.7161 2.08215 19.3278C2.17028 19.9833 2.36902 20.6117 2.87868 21.1213C3.38835 21.631 4.0167 21.8297 4.67221 21.9179C5.28387 22.0001 6.04769 22.0001 6.93417 22H17.0658C17.9523 22.0001 18.7161 22.0001 19.3278 21.9179C19.9833 21.8297 20.6117 21.631 21.1213 21.1213C21.631 20.6117 21.8297 19.9833 21.9179 19.3278C22.0001 18.7161 22.0001 17.9523 22 17.0658L22 9.96801C22 9.52936 22 9.15087 21.9787 8.83762C21.9562 8.50779 21.9066 8.17788 21.7716 7.85195C21.4672 7.11687 20.8831 6.53284 20.1481 6.22836C19.8221 6.09336 19.4922 6.04385 19.1624 6.02135C18.8491 5.99998 18.4707 5.99999 18.032 6L17 6V5C17 3.34315 15.6569 2 14 2H10ZM15 6V5C15 4.44772 14.5523 4 14 4H10C9.44772 4 9 4.44772 9 5V6H15ZM10.5 13C10.5 12.4477 10.9477 12 11.5 12H12.5C13.0523 12 13.5 12.4477 13.5 13C13.5 13.5523 13.0523 14 12.5 14H11.5C10.9477 14 10.5 13.5523 10.5 13ZM4.31682 13.3572C4.72018 12.98 5.35299 13.0011 5.73025 13.4045C7.19742 14.9731 9.44753 16 12 16C14.5525 16 16.8026 14.9731 18.2698 13.4045C18.647 13.0011 19.2798 12.98 19.6832 13.3572C20.0865 13.7345 20.1077 14.3673 19.7304 14.7707C17.8704 16.7593 15.0843 18 12 18C8.91574 18 6.12959 16.7593 4.26958 14.7707C3.89232 14.3673 3.91347 13.7345 4.31682 13.3572Z"
              fill="#ff8c42"
            />
          </svg>
        ),
      },
      {
        id: "projects",
        label: "Projects",
        icon: (
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="24"
              height="24"
              transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 24 24)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.25008 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54877 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25008 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67898 18.06 2.38783 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54877 2.38783 7.25007C2.67898 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25008 2.38782ZM10.5066 6.65264C11.0199 5.26682 12.98 5.26683 13.4933 6.65264L14.1209 8.34727C14.2662 8.73956 14.6403 8.99995 15.0586 8.99995L16.5269 8.99995C17.9614 8.99995 18.6798 10.7343 17.6655 11.7487L16.1306 13.2835C15.8942 13.52 15.7915 13.8589 15.8571 14.1868L16.2262 16.0319C16.4943 17.3727 15.0333 18.3872 13.8707 17.6675L12.5263 16.8352C12.2038 16.6356 11.7961 16.6356 11.4736 16.8352L10.1292 17.6675C8.96662 18.3872 7.5056 17.3727 7.77375 16.0319L8.14279 14.1868C8.20836 13.8589 8.10574 13.52 7.86931 13.2835L6.29284 11.7071C5.29385 10.7081 6.00138 8.99995 7.41416 8.99995L8.94126 8.99995C9.35959 8.99995 9.73371 8.73956 9.87901 8.34727L10.5066 6.65264Z"
              fill="#ff8c42"
            />
          </svg>
        ),
      },
      {
        id: "contact",
        label: "Contact",
        icon: (
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H17C18.6569 22 20 20.6569 20 19V5C20 3.34315 18.6569 2 17 2H5ZM11 8C8.79086 8 7 9.79086 7 12C7 14.2091 8.79086 16 11 16C13.2091 16 15 14.2091 15 12C15 9.79086 13.2091 8 11 8ZM8.34635 19.6816C8.73257 19.2671 9.42408 19 11 19C12.6151 19 13.2999 19.2611 13.6792 19.6753C14.0522 20.0826 14.6847 20.1105 15.0921 19.7375C15.4994 19.3646 15.5273 18.732 15.1543 18.3247C14.161 17.2398 12.6921 17 11 17C9.3188 17 7.87197 17.2568 6.88299 18.3184C6.50652 18.7225 6.52893 19.3552 6.93302 19.7317C7.33712 20.1081 7.96989 20.0857 8.34635 19.6816Z"
              fill="#ff8c42"
            />
            <path
              d="M9 12C9 10.8954 9.89543 10 11 10C12.1046 10 13 10.8954 13 12C13 13.1046 12.1046 14 11 14C9.89543 14 9 13.1046 9 12Z"
              fill="#323232"
            />
            <path
              d="M19.6458 22H20C21.6568 22 23 20.6569 23 19V5C23 3.34315 21.6568 2 20 2H19.6458C20.4762 2.73294 21 3.80531 21 5V19C21 20.1947 20.4762 21.2671 19.6458 22Z"
              fill="#323232"
            />
          </svg>
        ),
      },
    ],
    []
  )

  // Track scroll + section + early exit from hero, and recompute on resize
  useEffect(() => {
    const computeModes = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Active section detection
      const sections = navItems.map((item) => item.id)
      const sectionOffsets = sections.map((id) => {
        const el = document.getElementById(id)
        return el ? el.offsetTop - 120 : 0
      })

      let current = "hero"
      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        if (scrollY >= sectionOffsets[i]) {
          current = sections[i]
          break
        }
      }
      setActiveSection(current)

      // Early transform logic
      const heroEl = document.getElementById("hero")
      if (heroEl) {
        const heroTop = heroEl.offsetTop || 0
        const heroHeight = heroEl.offsetHeight || window.innerHeight
        const heroBottom = heroTop + heroHeight
        const trigger = heroBottom - EARLY_EXIT_PX
        setInHeroMode(scrollY < trigger)
      } else {
        setInHeroMode(false)
      }
    }

    computeModes()
    window.addEventListener("scroll", computeModes, { passive: true })
    window.addEventListener("resize", computeModes)
    return () => {
      window.removeEventListener("scroll", computeModes)
      window.removeEventListener("resize", computeModes)
    }
  }, [navItems])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // ====== CONTAINER STYLES ======
  const heroContainer = {
    position: "fixed",
    zIndex: 31,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(640px, 92vw)",
    padding: "28px",
    background:
      // layered textures: noise + grid + gradient + vignette
      `radial-gradient(120% 160% at 50% 0%, rgba(255,140,66,0.12), rgba(0,0,0,0) 60%),
       repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px),
       repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px),
       linear-gradient(180deg, rgba(42,52,65,0.96), rgba(42,52,65,0.92))`,
    border: "4px solid #ff8c42",
    borderRadius: "18px",
    boxShadow:
      "0 0 40px rgba(255,140,66,0.35), 8px 8px 0 #ff8c42, inset 0 0 24px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
    transition: "all 250ms ease",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    // vignette edges
    WebkitMaskImage:
      "radial-gradient(130% 130% at 50% 50%, black 70%, rgba(0,0,0,0.85) 100%)",
    maskImage:
      "radial-gradient(130% 130% at 50% 50%, black 70%, rgba(0,0,0,0.85) 100%)",
  }

  const barContainer = {
    position: "fixed",
    zIndex: 9999,
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: isScrolled
      ? "rgba(42, 52, 65, 0.95)"
      : "rgba(42, 52, 65, 0.8)",
    backdropFilter: "blur(10px)",
    border: "3px solid #ff8c42",
    borderRadius: "16px",
    boxShadow: isScrolled
      ? "6px 6px 0 #ff8c42, 0 0 40px rgba(255, 140, 66, 0.4)"
      : "4px 4px 0 #ff8c42, 0 0 25px rgba(255, 140, 66, 0.3)",
    transition: "all 250ms ease",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    padding: "12px 20px",
  }

  // ====== LIST LAYOUT ======
  const heroList = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  }

  const barList = {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    gap: "10px",
  }

  const buttonBase = {
    background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px),
       linear-gradient(180deg, rgba(33,43,54,0.6), rgba(33,43,54,0.3))`,
    border: "3px solid #4a9b8e",
    borderRadius: "12px",
    color: "#fee1c7",
    cursor: "pointer",
    transition: "all 150ms ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
  }

  return (
    <nav style={inHeroMode ? heroContainer : barContainer}>
      <div style={inHeroMode ? heroList : barList}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id

          // HERO MODE: big, centered menu buttons
          const heroButtonStyle = inHeroMode
            ? {
                ...buttonBase,
                padding: "18px 20px",
                fontSize: "18px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: isActive ? "none" : "6px 6px 0 #4a9b8e",
                transform: isActive ? "translate(6px, 6px)" : "none",
                textShadow: isActive
                  ? "0 0 6px #ff8c42, 0 0 3px #ff8c42"
                  : "none",
              }
            : null

          // TOP BAR MODE: compact horizontal buttons
          const barButtonStyle = !inHeroMode
            ? {
                ...buttonBase,
                padding: "8px 16px",
                fontSize: "14px",
                boxShadow: isActive ? "none" : "4px 4px 0 #4a9b8e",
                transform: isActive ? "translate(4px, 4px)" : "none",
                textShadow: isActive
                  ? "0 0 4px #ff8c42, 0 0 2px #ff8c42"
                  : "none",
                justifyContent: "center",
              }
            : null

          const style = inHeroMode ? heroButtonStyle : barButtonStyle

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={style}
              onMouseDown={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = inHeroMode
                    ? "translate(3px, 3px)"
                    : "translate(2px, 2px)"
                  e.currentTarget.style.boxShadow = inHeroMode
                    ? "3px 3px 0 #4a9b8e"
                    : "2px 2px 0 #4a9b8e"
                }
              }}
              onMouseUp={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = inHeroMode
                    ? "6px 6px 0 #4a9b8e"
                    : "4px 4px 0 #4a9b8e"
                }
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px),
                     linear-gradient(180deg, rgba(33,43,54,0.7), rgba(33,43,54,0.35))`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px),
                     linear-gradient(180deg, rgba(33,43,54,0.6), rgba(33,43,54,0.3))`
                  e.currentTarget.style.transform = "none"
                }
              }}
            >
              <span style={{ fontSize: inHeroMode ? "18px" : "16px" }}>
                {item.icon}
              </span>
              <span style={{ lineHeight: 1 }}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
