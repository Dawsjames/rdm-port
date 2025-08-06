import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineDownload,
  AiOutlineMail,
} from "react-icons/ai";
import { Button } from "../../components/Button";
import { AnimatedSectionTitle } from "../../components/AnimatedSectionTitle";

export const Contact = () => {
  const [form, setFormState] = useState({ name: "", email: "", message: "" });

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
        <div className="absolute top-40 right-20 w-1 h-1 rounded-full animate-pulse-slow border" style={{ borderColor: '#DE8A3B' }}></div>
        <div
          className="absolute bottom-32 left-1/4 w-3 h-3 rounded-full animate-twinkle border"
          style={{ borderColor: '#C779AE', animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse-slow border"
          style={{ borderColor: '#065F55', animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-2 h-2 rounded-full animate-twinkle border"
          style={{ borderColor: '#DE8A3B', animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Centered Container */}
      <div className="min-h-screen flex flex-col justify-center items-center relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          {/* Animated Page Header */}
          <AnimatedSectionTitle 
            title="Contact"
            subtitle="Ready to launch your next project? Let's connect and explore the possibilities together."
            animationType="slideInUp"
          />

          {/* Main Content Container - Perfectly Centered */}
          <motion.div 
            className="flex flex-col items-center justify-center space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Form - Centered and Wider */}
            <motion.div 
              className="w-full max-w-4xl"
              variants={itemVariants}
            >
              <div className="backdrop-blur-sm border-2 rounded-2xl p-12 shadow-2xl" style={{ 
                backgroundColor: 'rgba(10, 60, 54, 0.1)', 
                borderColor: 'rgba(10, 60, 54, 0.3)',
                boxShadow: '0 0 40px rgba(10, 60, 54, 0.2)'
              }}>
                <motion.h2 
                  className="text-3xl font-bold mb-8 text-center"
                  style={{ background: 'linear-gradient(to right, #0A3C36, #DE8A3B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  variants={itemVariants}
                >
                  Get In Touch
                </motion.h2>

                <form
                  action="https://formspree.io/f/xovlkgol"
                  method="POST"
                  name="contact"
                  id="contactform"
                  className="space-y-8"
                >
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={itemVariants}
                  >
                    <div className="relative">
                      <input
                        placeholder="Your Name"
                        type="text"
                        name="name"
                        onChange={(e) => {
                          setFormState((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }}
                        value={form.name}
                        className="w-full p-5 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm text-lg bg-transparent"
                        style={{
                          borderColor: 'rgba(10, 60, 54, 0.4)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0A3C36';
                          e.target.style.boxShadow = '0 0 20px rgba(10, 60, 54, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(10, 60, 54, 0.4)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div className="relative">
                      <input
                        placeholder="Your Email"
                        type="email"
                        name="email"
                        onChange={(e) => {
                          setFormState((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                        }}
                        value={form.email}
                        className="w-full p-5 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm text-lg bg-transparent"
                        style={{
                          borderColor: 'rgba(10, 60, 54, 0.4)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0A3C36';
                          e.target.style.boxShadow = '0 0 20px rgba(10, 60, 54, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(10, 60, 54, 0.4)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="relative"
                    variants={itemVariants}
                  >
                    <textarea
                      rows={8}
                      placeholder="Hi! How are you? Let's discuss your project and bring your ideas to life..."
                      name="message"
                      onChange={(e) => {
                        setFormState((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }));
                      }}
                      value={form.message}
                      className="w-full p-5 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm resize-none text-lg bg-transparent"
                      style={{
                        borderColor: 'rgba(10, 60, 54, 0.4)',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0A3C36';
                        e.target.style.boxShadow = '0 0 20px rgba(10, 60, 54, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(10, 60, 54, 0.4)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </motion.div>

                  <motion.div 
                    className="text-center"
                    variants={itemVariants}
                  >
                    <button
                      type="submit"
                      disabled={
                        form.email.length <= 0 ||
                        form.name.length <= 0 ||
                        form.message.length <= 0
                      }
                      className="px-16 py-4 text-lg text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2"
                      style={{
                        borderColor: '#0A3C36',
                        backgroundColor: 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!e.target.disabled) {
                          e.target.style.backgroundColor = '#0A3C36';
                          e.target.style.boxShadow = '0 0 30px rgba(10, 60, 54, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.target.disabled) {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    >
                      Launch Message
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Social Links - Centered and Wider */}
            <motion.div 
              className="w-full max-w-3xl"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-2xl font-semibold mb-8 text-center"
                style={{ background: 'linear-gradient(to right, #DE8A3B, #C779AE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                variants={itemVariants}
              >
                Connect Across the Digital Universe
              </motion.h3>

              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center"
                variants={containerVariants}
              >
                <motion.a
                  href="https://www.linkedin.com/in/dawson-james-marcos-28261a289/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-24 h-24 border-2 rounded-2xl transition-all duration-300 flex items-center justify-center bg-transparent" style={{
                    borderColor: '#0A3C36',
                  }}>
                    <AiFillLinkedin
                      size={48}
                      className="text-white group-hover:scale-110 transition-transform"
                      style={{ color: '#0A3C36' }}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-sm font-medium" style={{ color: '#0A3C36' }}>
                      LinkedIn
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/Dawsjames"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-24 h-24 border-2 rounded-2xl transition-all duration-300 flex items-center justify-center bg-transparent" style={{
                    borderColor: '#DE8A3B',
                  }}>
                    <AiFillGithub
                      size={48}
                      className="text-white group-hover:scale-110 transition-transform"
                      style={{ color: '#DE8A3B' }}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-sm font-medium" style={{ color: '#DE8A3B' }}>
                      GitHub
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:dawsonjamesvmarcos@gmail.com"
                  className="block group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-24 h-24 border-2 rounded-2xl transition-all duration-300 flex items-center justify-center bg-transparent" style={{
                    borderColor: '#C779AE',
                  }}>
                    <AiOutlineMail
                      size={48}
                      className="text-white group-hover:scale-110 transition-transform"
                      style={{ color: '#C779AE' }}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-sm font-medium" style={{ color: '#C779AE' }}>
                      Email
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  href="./assets/Dawson_Marcos_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-24 h-24 border-2 rounded-2xl transition-all duration-300 flex items-center justify-center bg-transparent" style={{
                    borderColor: '#065F55',
                  }}>
                    <AiOutlineDownload
                      size={48}
                      className="text-white group-hover:scale-110 transition-transform"
                      style={{ color: '#065F55' }}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-sm font-medium" style={{ color: '#065F55' }}>
                      Resume
                    </span>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};