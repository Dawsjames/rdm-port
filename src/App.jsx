import { BrowserRouter } from "react-router-dom"
import { Hero, GalaxyModel } from "./components"
import SpacemanModel from "./components/SpacemanModel"
import { About } from "./pages/About"
import { Experience } from "./pages/Experience"
import { useState, useEffect } from "react"
import { Contact } from "./pages/Contact"
import { Projects } from "./pages/Projects"
import Navbar from "../src/components/Navbar"

const App = () => {
  const [scrollY, setScrollY] = useState(0)

  // ============================================================
  // 🎯 SCROLL TRACKING CONFIGURATION
  // ============================================================

  const SCROLL_THROTTLE_DELAY = 16 // (kept for clarity / future use)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ============================================================
  // 🎯 GALAXY BACKGROUND CONFIGURATION
  // ============================================================

  const showGalaxyBackground = true // Always show galaxy background

  const heroSectionHeight =
    typeof window !== "undefined" ? window.innerHeight : 800
  const galaxyOpacity = scrollY < heroSectionHeight ? 1.0 : 0.4

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Global Navbar — now rendered once, fixed on top of every section */}
        <Navbar />

        {/* Spaceman overlay */}
        <SpacemanModel scrollY={scrollY} />

        {/* Galaxy background */}
        <div
          className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10"
          style={{
            opacity: galaxyOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <GalaxyModel
            scrollY={scrollY}
            showBackground={showGalaxyBackground}
          />
        </div>

        {/* CONTENT SECTIONS */}
        <div className="relative bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen z-20">
          <Hero scrollY={scrollY} />
        </div>

        <div
          id="about"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{
            isolation: "isolate",
            pointerEvents: "auto",
          }}
        >
          <About />
        </div>

        <div
          id="experience"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
        >
          <Experience />
        </div>

        <div
          id="projects"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
        >
          <Projects />
        </div>

        <div
          id="contact"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
        >
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
