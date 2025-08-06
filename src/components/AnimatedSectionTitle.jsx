import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const AnimatedSectionTitle = ({ 
  title, 
  subtitle = null, 
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  animationType = "slideInUp" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: animationType === "slideInUp" ? 50 : 0,
      x: animationType === "slideInLeft" ? -50 : animationType === "slideInRight" ? 50 : 0,
      scale: animationType === "scaleIn" ? 0.8 : 1
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const splitTitle = title.split('');

  return (
    <div ref={ref} className={`text-center mb-16 ${className}`}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-wider mb-4 ${titleClassName}`} style={{ background: 'linear-gradient(to right, #0A3C36, #DE8A3B, #C779AE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {splitTitle.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>
        
        <motion.div 
          className="w-24 h-1 mx-auto rounded-full"
          style={{ background: 'linear-gradient(to right, #0A3C36, #DE8A3B)' }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: 96 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {subtitle && (
          <motion.p 
            className={`text-secondary mt-6 max-w-2xl mx-auto ${subtitleClassName}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};