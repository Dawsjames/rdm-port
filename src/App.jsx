import { BrowserRouter } from "react-router-dom";
import { Hero, GalaxyModel } from "./components";
import SpacemanModel from "./components/SpacemanModel";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";
import { useState, useEffect } from "react";
import { Contact } from "./pages/Contact";
import { Projects } from "./pages/Projects";

const App = () => {
  const [scrollY, setScrollY] = useState(0);

  // ============================================================
  // 🎯 SCROLL TRACKING CONFIGURATION
  // ============================================================

  // SCROLL VARIABLES - These affect both galaxy camera and spaceman movement
  // Connected to: SpacemanModel scrollY prop, GalaxyModel scrollY prop
  const SCROLL_THROTTLE_DELAY = 16; // Milliseconds between scroll updates (60fps = 16ms)

  // Global scroll handler for both spaceman animation and galaxy camera
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================================
  // 🎯 GALAXY BACKGROUND CONFIGURATION
  // ============================================================

  // GALAXY VISIBILITY: Now shows across ALL sections (not just hero)
  // CHANGED: Removed hero-only restriction - galaxy is always visible
  const showGalaxyBackground = true; // Always show galaxy background

  // GALAXY OPACITY: Adjust based on section for better text readability
  const heroSectionHeight = window.innerHeight;
  const galaxyOpacity = scrollY < heroSectionHeight ? 1.0 : 0.4;

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* ============================================================ */}
        {/* 🚀 SPACEMAN OVERLAY - Always visible, no conditional hiding */}
        {/* ============================================================ */}
        {/* 
          This spaceman floats over the entire page and moves through all sections
          Connected variables: scrollY (from scroll handler above)
          Z-index: 50 (highest - always on top)
          Background: transparent (shows page content below)
          Pointer events: none (allows interaction with page content)
        */}
        <SpacemanModel scrollY={scrollY} />

        {/* ============================================================ */}
        {/* 🌌 GALAXY BACKGROUND - Now visible across ALL sections! */}
        {/* ============================================================ */}
        {/* 
          Galaxy background positioned behind ALL content sections
          CHANGED: Now spans entire application, not just hero
          Connected variables: scrollY, showGalaxyBackground (always true)
          Z-index: 10 (background layer)
          Opacity: Dynamic based on scroll position for readability
        */}
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

        {/* ============================================================ */}
        {/* 📱 PAGE CONTENT SECTIONS */}
        {/* ============================================================ */}

        {/* HERO SECTION */}
        {/* 
          Contains text content over galaxy background
          Z-index: 20 (above galaxy, below spaceman)
          Background: hero-pattern with galaxy background (full opacity)
        */}
        <div className="relative bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen z-20">
          <Hero scrollY={scrollY} />
        </div>

        {/* ABOUT SECTION - Enhanced for button interactions */}
        {/* 
          Content section with galaxy visible in background (dimmed)
          Z-index: 30 (content layer)
          Background: semi-transparent to show galaxy behind
          Added pointer-events: auto to ensure clickable elements work
        */}
        <div
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{
            isolation: "isolate",
            pointerEvents: "auto", // Ensure buttons are clickable
          }}
        >
          <About />
        </div>

        {/* EXPERIENCE SECTION */}
        <div
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
        >
          <Experience />
        </div>

        {/* PORTFOLIO SECTION - Placeholder */}
        {/* 
          Future portfolio content with galaxy background visible
          Z-index: 30 (same as other content sections)
          Background: semi-transparent for galaxy visibility
        */}
        <div
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
        >
          <Projects />
        </div>

        {/* CONTACT SECTION - Placeholder */}
        {/* 
          Future contact content with galaxy background visible
          Z-index: 30 (same as other content sections)
          Background: semi-transparent for galaxy visibility
        */}
        <div
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
        >
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
