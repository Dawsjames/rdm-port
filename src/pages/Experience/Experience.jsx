import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { experiences } from "../../data/experiences";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { ExperienceItem } from "./ExperienceItem";
import { AnimatedSectionTitle } from "../../components/AnimatedSectionTitle";

export const Experience = () => {
  const { width } = useScreenWidth();

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".experience-item");
    cards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener(width < 720 ? "click" : "mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, [width]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen py-16 px-6 relative overflow-hidden" style={{ backgroundColor: '#151618' }}>
      {/* Animated Background Elements - Outline Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full animate-twinkle border" style={{ borderColor: '#0A3C36' }}></div>
        <div className="absolute top-60 right-20 w-1 h-1 rounded-full animate-pulse-slow border" style={{ borderColor: '#DE8A3B' }}></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full animate-twinkle border" style={{ borderColor: '#C779AE', animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse-slow border" style={{ borderColor: '#065F55', animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full animate-twinkle border" style={{ borderColor: '#DE8A3B', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 rounded-full animate-pulse-slow border" style={{ borderColor: '#C779AE', animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Page Header */}
        <AnimatedSectionTitle 
          title="Experience"
          subtitle="Journey through my professional galaxy - explore the missions, technologies, and achievements that have shaped my career trajectory."
          animationType="slideInUp"
        />

        {/* Centered Experience Container */}
        <motion.div 
          className="flex justify-center items-center min-h-[700px] px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-6xl">
            {/* Experience Items Container - Fixed Layout to Prevent Movement */}
            <motion.div 
              className={`
                flex justify-center items-stretch gap-4 h-full
                ${width < 720 
                  ? 'flex-col max-w-md mx-auto space-y-4' 
                  : width < 1024 
                    ? 'flex-wrap justify-center gap-6' 
                    : 'flex-nowrap'
                }
              `}
              variants={itemVariants}
              style={{
                // Fix container to prevent movement during hover
                position: 'relative',
                overflow: 'visible'
              }}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`
                    ${width < 720 
                      ? 'w-full' 
                      : width < 1024 
                        ? 'w-80 flex-shrink-0' 
                        : 'flex-1 min-w-0'
                    }
                  `}
                  style={{
                    // Ensure each item maintains its position
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <ExperienceItem data={exp} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Instructions */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 backdrop-blur-sm border rounded-full px-6 py-3 bg-transparent" style={{
            borderColor: 'rgba(10, 60, 54, 0.2)'
          }}>
            <div className="w-2 h-2 rounded-full animate-pulse border" style={{ borderColor: '#0A3C36', backgroundColor: '#0A3C36' }}></div>
            <p className="text-secondary text-sm">
              {width < 720 ? "Tap" : "Hover"} on each experience card to explore details
            </p>
          </div>
        </motion.div>

        {/* Experience Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center p-6 backdrop-blur-sm border rounded-xl bg-transparent"
            style={{
              borderColor: 'rgba(10, 60, 54, 0.2)'
            }}
            variants={itemVariants}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#0A3C36' }}>{experiences.length}+</div>
            <div className="text-secondary text-sm">Professional Experiences</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 backdrop-blur-sm border rounded-xl bg-transparent"
            style={{
              borderColor: 'rgba(222, 138, 59, 0.2)'
            }}
            variants={itemVariants}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#DE8A3B' }}>5+</div>
            <div className="text-secondary text-sm">Years of Learning</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 backdrop-blur-sm border rounded-xl bg-transparent"
            style={{
              borderColor: 'rgba(199, 121, 174, 0.2)'
            }}
            variants={itemVariants}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#C779AE' }}>10+</div>
            <div className="text-secondary text-sm">Technologies Mastered</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};