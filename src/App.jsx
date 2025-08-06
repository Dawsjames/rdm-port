import { BrowserRouter } from "react-router-dom";
import { Hero, GalaxyModel } from "./components";
import SpacemanModel from "./components/SpacemanModel"; // NEW: Import separate spaceman
import { About } from "./pages/About";
import { useState, useEffect } from "react";

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
  // 🎯 HERO SECTION VISIBILITY CONTROL
  // ============================================================

  // GALAXY VISIBILITY: Only show galaxy background in hero section
  // Connected to: GalaxyModel showBackground prop
  const heroSectionHeight = window.innerHeight;
  const showGalaxyBackground = scrollY < heroSectionHeight;

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* ============================================================ */}
        {/* 🚀 SPACEMAN OVERLAY - Appears over ALL sections */}
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
        {/* 🌌 GALAXY BACKGROUND - Hero section only */}
        {/* ============================================================ */}
        {/* 
          Galaxy background positioned behind hero content
          Connected variables: scrollY, showGalaxyBackground
          Z-index: 10 (background layer)
          Visibility: Only in hero section (showBackground prop)
        */}
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
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
          Background: hero-pattern with galaxy background
        */}
        <div className="relative bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen z-20">
          <Hero scrollY={scrollY} />
        </div>

        {/* ABOUT SECTION */}
        {/* 
          Pure content section - spaceman floats over this
          Z-index: 30 (content layer)
          Background: solid primary color
        */}
        <div className="relative z-30 bg-primary">
          <About />
        </div>

        {/* PORTFOLIO SECTION - Placeholder */}
        {/* 
          Future portfolio content - spaceman continues floating over this
          Z-index: 30 (same as other content sections)
        */}
        <div className="relative z-30 h-screen bg-gray-800 flex items-center justify-center">
          <h2 className="text-white text-4xl">Portfolio Section</h2>
        </div>

        {/* CONTACT SECTION - Placeholder */}
        {/* 
          Future contact content - spaceman continues floating over this
          Z-index: 30 (same as other content sections)
        */}
        <div className="relative z-30 h-screen bg-gray-700 flex items-center justify-center">
          <h2 className="text-white text-4xl">Contact Section</h2>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
