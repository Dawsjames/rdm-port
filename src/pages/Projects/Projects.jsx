import React from "react";
import { motion } from "framer-motion";
import { projects } from "../../data";
import { ProjectItem } from "./ProjectItem";
import { useCarousel } from "../../hooks/useCarousel";
import { Button } from "../../components/Button";
import { AnimatedSectionTitle } from "../../components/AnimatedSectionTitle";

export const Projects = () => {
  const { currentIndex, goToNext, goToPrevious, goToIndex, totalItems } =
    useCarousel(projects.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="min-h-screen w-full py-16 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#151618" }}
    >
      {/* Animated Background Elements - Outline Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-2 h-2 rounded-full animate-twinkle border"
          style={{ borderColor: "#0A3C36" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 rounded-full animate-pulse-slow border"
          style={{ borderColor: "#DE8A3B" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-3 h-3 rounded-full animate-twinkle border"
          style={{ borderColor: "#C779AE", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse-slow border"
          style={{ borderColor: "#065F55", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-2 h-2 rounded-full animate-twinkle border flex"
          style={{ borderColor: "#DE8A3B", animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <AnimatedSectionTitle title="Projects" animationType="slideInUp" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Improved Carousel Container with Better Spacing */}
          <motion.div
            className="relative w-full h-[550px] flex items-center justify-center mb-12 overflow-hidden"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-full max-w-7xl relative perspective-1000">
              {projects.map((project, index) => {
                const position = index - currentIndex;
                const isActive = index === currentIndex;

                // Improved positioning algorithm for better card distribution
                const getCardTransform = () => {
                  if (position === 0) {
                    return "scale(1) translateX(0) translateZ(0)";
                  }

                  // Reduced spacing for better visual consistency
                  const baseSpacing = 280; // Reduced from 350/500/650
                  const scaleReduction = 0.15; // More gradual scale reduction
                  const depthSpacing = 20;

                  const absPosition = Math.abs(position);
                  const scale = Math.max(0.6, 1 - absPosition * scaleReduction);
                  const translateX =
                    position * (baseSpacing + (absPosition - 1) * 80);
                  const translateZ = -absPosition * depthSpacing;

                  return `scale(${scale}) translateX(${translateX}px) translateZ(${translateZ}px)`;
                };

                const getCardOpacity = () => {
                  const absPosition = Math.abs(position);
                  if (absPosition === 0) return 1;
                  if (absPosition === 1) return 0.85;
                  if (absPosition === 2) return 0.65;
                  return 0.4;
                };

                const getCardZIndex = () => 50 - Math.abs(position);

                return (
                  <div
                    key={index}
                    className="absolute w-80 h-96 transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform: getCardTransform(),
                      opacity: getCardOpacity(),
                      zIndex: getCardZIndex(),
                    }}
                    onClick={() => goToIndex(index)}
                  >
                    <ProjectItem
                      data={project}
                      position={position}
                      isActive={isActive}
                      index={index}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Navigation Controls */}
          <motion.div
            className="flex justify-center items-center gap-8 mt-8"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-white bg-transparent"
                style={{
                  borderColor: "rgba(10, 60, 54, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#0A3C36";
                  e.target.style.backgroundColor = "rgba(10, 60, 54, 0.1)";
                  e.target.style.boxShadow = "0 0 20px rgba(10, 60, 54, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(10, 60, 54, 0.4)";
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.boxShadow = "none";
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transform rotate-180"
                >
                  <path
                    d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </motion.div>

            {/* Enhanced Dots Indicator */}
            <div className="flex gap-4">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  className="w-4 h-4 rounded-full transition-all duration-300 border"
                  style={{
                    borderColor: index === currentIndex ? "#0A3C36" : "#666",
                    backgroundColor:
                      index === currentIndex ? "#0A3C36" : "transparent",
                    transform:
                      index === currentIndex ? "scale(1.25)" : "scale(1)",
                  }}
                  onClick={() => goToIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={(e) => {
                    if (index !== currentIndex) {
                      e.target.style.borderColor = "#DE8A3B";
                      e.target.style.backgroundColor =
                        "rgba(222, 138, 59, 0.2)";
                      e.target.style.transform = "scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentIndex) {
                      e.target.style.borderColor = "#666";
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.transform = "scale(1)";
                    }
                  }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-white bg-transparent"
                style={{
                  borderColor: "rgba(10, 60, 54, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#0A3C36";
                  e.target.style.backgroundColor = "rgba(10, 60, 54, 0.1)";
                  e.target.style.boxShadow = "0 0 20px rgba(10, 60, 54, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(10, 60, 54, 0.4)";
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.boxShadow = "none";
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced Project Counter */}
          <motion.div className="text-center mt-8" variants={itemVariants}>
            <div
              className="inline-flex items-center gap-3 backdrop-blur-sm border rounded-full px-6 py-3 bg-transparent"
              style={{
                borderColor: "rgba(10, 60, 54, 0.2)",
              }}
            >
              <span className="text-secondary text-lg">Project</span>
              <span className="font-bold text-xl" style={{ color: "#0A3C36" }}>
                {currentIndex + 1}
              </span>
              <span className="text-secondary text-lg">of</span>
              <span className="font-bold text-xl" style={{ color: "#DE8A3B" }}>
                {totalItems}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
