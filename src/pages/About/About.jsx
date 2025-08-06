import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { blue, green, orange } from "../../utils";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import { AnimatedSectionTitle } from "../../components/AnimatedSectionTitle";

// ============================================================
// 🎯 ABOUT PAGE CONFIGURATION - SIMPLIFIED!
// ============================================================

// TEXT CONTENT
const PAGE_TITLE = "About";
const ABOUT_ME_TITLE = "About Me";
const ABOUT_ME_TEXT_1 =
  "I'm a passionate programmer, who is always looking for new challenges to improve myself, also a team player, who is always ready to learn new things and help others.";
const ABOUT_ME_TEXT_2 =
  "I was born and raised in Nagpur, India. I love to play guitar and ukulele and in my free time I like to read books, watch movies and play video games.";

const EDUCATION_TITLE = "Education";
const ACADEMIC_FOCUS_LABEL = "Academic Focus:";
const ACADEMIC_FOCUS_TEXT =
  "Throughout my educational journey, I've maintained a strong focus on computer science and engineering principles, with particular interest in software development, web technologies, and problem-solving methodologies.";

const MAIN_QUOTE = "Always learning, always growing";
const QUOTE_DESCRIPTION =
  "My journey in technology is driven by curiosity and the desire to create meaningful digital experiences. Each project is an opportunity to learn something new and push the boundaries of what's possible.";

const SKILLS_TITLE = "Technologies & Skills";
const SKILLS_DESCRIPTION =
  "Interactive 3D visualization of my technical skills and expertise. Hover over the floating icons to explore!";
const LOADING_MESSAGE = "Loading 3D skills...";

// EDUCATION DATA
const EDUCATION_CARDS = [
  {
    id: 0,
    color: blue,
    title: "D.Y. Patil college of engineering, Pune",
    subtitle: "Bachelors of Computer Engineering (2019-2023)",
    image: "https://via.placeholder.com/100x100/0A3C36/ffffff?text=College",
  },
  {
    id: 1,
    color: green,
    title: "M.P. Deo D. Science College, Nagpur",
    subtitle: "High School (2017-2019)",
    image: "https://via.placeholder.com/100x100/DE8A3B/ffffff?text=HS",
  },
  {
    id: 2,
    color: orange,
    title: "School of Scholars, Nagpur",
    subtitle: "Secondary Education (2007-2017)",
    image: "https://via.placeholder.com/100x100/C779AE/ffffff?text=Elem",
  },
];

// LEGEND CATEGORIES
const LEGEND_CATEGORIES = [
  { color: "#0A3C36", label: "Frontend" },
  { color: "#DE8A3B", label: "Backend" },
  { color: "#C779AE", label: "Tools" },
];

// NUMERIC VALUES
const CAMERA_POSITION = [0, 0, 10];
const CAMERA_FOV = 75;

// ============================================================

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setShow(inView);
  }, [inView]);

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const textSectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const visualSectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-16 px-6 relative overflow-hidden"
      style={{ 
        backgroundColor: '#151618',
        isolation: "isolate" 
      }}
    >
      {/* Animated Background Elements - Outline Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full animate-twinkle border" style={{ borderColor: '#0A3C36' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 rounded-full animate-pulse-slow border" style={{ borderColor: '#DE8A3B' }}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 rounded-full animate-twinkle border" style={{ borderColor: '#C779AE', animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse-slow border" style={{ borderColor: '#065F55', animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full animate-twinkle border" style={{ borderColor: '#DE8A3B', animationDelay: '0.5s' }}></div>
      </div>

      {/* Full Width Container */}
      <div className="w-full max-w-none mx-auto relative z-10">
        {/* Animated Page Header */}
        <div className="max-w-7xl mx-auto">
          <AnimatedSectionTitle 
            title={PAGE_TITLE}
            subtitle="Discover my journey, skills, and passion for creating digital experiences"
            animationType="slideInUp"
          />
        </div>

        {/* Full Width 2-Column Layout */}
        <motion.div 
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[80vh]"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Left Column - Text Content (Full Half) */}
          <motion.div 
            className="p-8 lg:p-16 flex flex-col justify-start space-y-8 border-r"
            style={{ 
              backgroundColor: '#151618',
              borderColor: 'rgba(10, 60, 54, 0.2)'
            }}
            variants={textSectionVariants}
          >
            {/* About Me Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ 
                background: 'linear-gradient(to right, #0A3C36, #DE8A3B)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text' 
              }}>
                {ABOUT_ME_TITLE}
              </h2>
              <p className="text-secondary text-base lg:text-lg leading-relaxed">
                {ABOUT_ME_TEXT_1}
              </p>
              <p className="text-secondary text-base lg:text-lg leading-relaxed">
                {ABOUT_ME_TEXT_2}
              </p>
            </motion.div>

            {/* Education Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ 
                background: 'linear-gradient(to right, #DE8A3B, #C779AE)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text' 
              }}>
                {EDUCATION_TITLE}
              </h2>

              <div className="space-y-4">
                {EDUCATION_CARDS.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <AboutItem
                      color={card.color}
                      active={activeCard === card.id}
                      onClick={() => handleCardClick(card.id)}
                      data={{
                        title: card.title,
                        p: card.subtitle,
                        image: card.image,
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-8 p-6 backdrop-blur-sm border rounded-xl"
                style={{
                  backgroundColor: 'rgba(10, 60, 54, 0.1)',
                  borderColor: 'rgba(10, 60, 54, 0.2)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <p className="text-secondary text-sm leading-relaxed">
                  <strong style={{ color: '#0A3C36' }}>{ACADEMIC_FOCUS_LABEL}</strong>{" "}
                  {ACADEMIC_FOCUS_TEXT}
                </p>
              </motion.div>
            </motion.div>

            {/* Quote Section */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="max-w-lg">
                <h3 className="text-lg lg:text-xl font-semibold mb-6" style={{ 
                  background: 'linear-gradient(to right, #C779AE, #065F55)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent', 
                  backgroundClip: 'text' 
                }}>
                  "{MAIN_QUOTE}"
                </h3>
                <p className="text-secondary text-sm lg:text-base leading-relaxed">
                  {QUOTE_DESCRIPTION}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Container (Full Half) */}
          <motion.div 
            className="p-8 lg:p-16 flex flex-col items-center justify-center"
            style={{ 
              backgroundColor: '#151618'
            }}
            variants={visualSectionVariants}
          >
            <motion.div 
              className="text-center mb-8 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ 
                background: 'linear-gradient(to right, #0A3C36, #DE8A3B, #C779AE)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text' 
              }}>
                {SKILLS_TITLE}
              </h2>
              <p className="text-secondary text-sm max-w-md mx-auto">
                {SKILLS_DESCRIPTION}
              </p>
            </motion.div>

            <motion.div 
              className="w-full max-w-2xl h-[500px] lg:h-[600px] relative backdrop-blur-sm overflow-hidden border-2 rounded-2xl"
              style={{
                backgroundColor: 'rgba(10, 60, 54, 0.05)',
                borderColor: 'rgba(10, 60, 54, 0.2)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {show ? (
                <Canvas
                  camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
                  className="w-full h-full rounded-2xl"
                >
                  <Skills />
                </Canvas>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="canvas-loader mb-4"></div>
                    <p className="text-secondary text-sm">{LOADING_MESSAGE}</p>
                  </div>
                </div>
              )}

              {/* Floating Elements - Outline Only */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse border" style={{ borderColor: '#0A3C36' }}></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full animate-ping border" style={{ borderColor: '#DE8A3B' }}></div>
              <div className="absolute top-1/3 left-4 w-1.5 h-1.5 rounded-full animate-pulse border" style={{ borderColor: '#C779AE' }}></div>
              <div className="absolute bottom-1/3 right-6 w-1 h-1 rounded-full animate-twinkle border" style={{ borderColor: '#065F55' }}></div>
            </motion.div>

            <motion.div 
              className="mt-8 grid grid-cols-3 gap-6 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {LEGEND_CATEGORIES.map((category, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                >
                  <div className="w-4 h-4 rounded-full mx-auto mb-2 animate-pulse border" style={{ borderColor: category.color }}></div>
                  <span className="text-secondary text-xs font-medium">
                    {category.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};