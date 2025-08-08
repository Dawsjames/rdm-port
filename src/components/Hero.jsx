import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section id="hero" className="relative w-full h-screen mx-auto">
      {/* Hero Content */}
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 flex flex-row items-start gap-5 z-10">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#ff8c42]" />
          <div
            className="w-1 sm:h-80 h-40"
            style={{
              background:
                "linear-gradient(180deg, #ff8c42 0%, transparent 100%)",
            }}
          />
        </div>

        <div>
          <motion.h1
            className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              textShadow: "0 0 30px rgba(255, 140, 66, 0.4)",
            }}
          >
            Hi, I'm <span style={{ color: "#ff8c42" }}>Dawson James</span>
          </motion.h1>

          <motion.p
            className="text-[#fee1c7] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              opacity: 0.9,
            }}
          >
            I develop 3D visuals, user <br className="sm:block hidden" />
            interfaces and web applications
          </motion.p>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8"
          >
            <button
              onClick={scrollToAbout}
              style={{
                backgroundColor: "transparent",
                border: "3px solid #ff8c42",
                borderRadius: "12px",
                color: "#4a9b8e",
                padding: "16px 32px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "6px 6px 0 #ff8c42",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translate(3px, 3px)"
                e.currentTarget.style.boxShadow = "3px 3px 0 #ff8c42"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "none"
                e.currentTarget.style.boxShadow = "6px 6px 0 #ff8c42"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ff8c42"
                e.currentTarget.style.boxShadow = "8px 8px 0 #ff8c42"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#4a9b8e"
                e.currentTarget.style.boxShadow = "6px 6px 0 #ff8c42"
              }}
            >
              <span>Get Started</span>
              <span style={{ fontSize: "20px" }}>🚀</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <button
          onClick={scrollToAbout}
          style={{
            backgroundColor: "transparent",
            border: "4px solid #4a9b8e",
            borderRadius: "24px",
            width: "40px",
            height: "70px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "8px",
            transition: "all 0.3s ease",
            boxShadow: "0 0 20px rgba(74, 155, 142, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ff8c42"
            e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 140, 66, 0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#4a9b8e"
            e.currentTarget.style.boxShadow = "0 0 20px rgba(74, 155, 142, 0.3)"
          }}
        >
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#4a9b8e",
              marginBottom: "4px",
            }}
          />
        </button>
      </div>
    </section>
  )
}

export default Hero
