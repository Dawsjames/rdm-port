import React, { useState, useEffect } from "react"

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: "hero", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "contact", label: "Contact", icon: "📧" },
  ]

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      // Determine active section based on scroll position
      const sections = navItems.map(item => item.id)
      const sectionOffsets = sections.map(id => {
        const element = document.getElementById(id)
        return element ? element.offsetTop - 100 : 0
      })

      let currentSection = "hero"
      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionOffsets[i]) {
          currentSection = sections[i]
          break
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      })
    }
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        backgroundColor: isScrolled ? "rgba(42, 52, 65, 0.95)" : "rgba(42, 52, 65, 0.8)",
        backdropFilter: "blur(10px)",
        border: "3px solid #ff8c42",
        borderRadius: "16px",
        boxShadow: isScrolled 
          ? "6px 6px 0 #ff8c42, 0 0 40px rgba(255, 140, 66, 0.4)"
          : "4px 4px 0 #ff8c42, 0 0 25px rgba(255, 140, 66, 0.3)",
        padding: "12px 20px",
        transition: "all 0.3s ease",
        fontFamily: '"Roboto Mono", "Courier New", monospace',
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            style={{
              backgroundColor: activeSection === item.id ? "#ff8c42" : "transparent",
              border: `3px solid ${activeSection === item.id ? "#ff8c42" : "transparent"}`,
              borderRadius: "12px",
              color: activeSection === item.id ? "#2a3441" : "#fee1c7",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeSection === item.id 
                ? "4px 4px 0 #ff8c42" 
                : "none",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
            onMouseDown={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.transform = "translate(2px, 2px)"
                e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e"
              }
            }}
            onMouseUp={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.transform = "none"
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
              }
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.backgroundColor = "rgba(74, 155, 142, 0.2)"
                e.currentTarget.style.borderColor = "#4a9b8e"
                e.currentTarget.style.color = "#4a9b8e"
                e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.borderColor = "transparent"
                e.currentTarget.style.color = "#fee1c7"
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.transform = "none"
              }
            }}
          >
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar