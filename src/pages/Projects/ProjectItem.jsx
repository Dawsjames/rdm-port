import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Button } from "../../components/Button";

export const ProjectItem = ({ data, position, isActive, index }) => {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      className={`w-full h-full transition-all duration-700 ease-out cursor-pointer
        ${inView ? "animate-fadeIn" : ""}`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      whileHover={!isActive ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      {/* Main Card */}
      <div
        className="w-full h-full rounded-xl overflow-hidden border-2 transition-all duration-500 backdrop-blur-sm bg-transparent"
        style={{
          borderColor: isActive 
            ? 'rgba(10, 60, 54, 0.5)' 
            : 'rgba(107, 114, 128, 0.3)',
          boxShadow: isActive 
            ? '0 25px 50px -12px rgba(10, 60, 54, 0.3)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Project Image */}
        <div
          className="w-full h-48 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(21, 22, 24, 0.9), rgba(21, 22, 24, 0.3), transparent)' }} />
          
          {/* Active indicator */}
          {isActive && (
            <motion.div 
              className="absolute top-4 right-4 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-3 h-3 rounded-full animate-pulse border" style={{ 
                borderColor: '#0A3C36',
                backgroundColor: '#0A3C36'
              }} />
              <span className="text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm border bg-transparent" style={{
                color: '#0A3C36',
                borderColor: 'rgba(10, 60, 54, 0.3)'
              }}>
                Active
              </span>
            </motion.div>
          )}

          {/* Overlay effect for non-active cards */}
          {!isActive && (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(222, 138, 59, 0.05), rgba(199, 121, 174, 0.05))' }} />
          )}
        </div>

        {/* Project Content */}
        <div className="p-6 h-48 flex flex-col justify-between relative">
          {/* Background effect */}
          <div className="absolute inset-0 rounded-b-xl" style={{ background: 'linear-gradient(135deg, rgba(10, 60, 54, 0.05), rgba(222, 138, 59, 0.05))' }} />
          
          <div className="flex-1 relative z-10">
            <h3 className={`font-bold text-white mb-3 transition-all duration-300 ${
              isActive ? "text-xl" : "text-lg"
            }`} style={isActive ? { 
              background: 'linear-gradient(to right, #0A3C36, #DE8A3B)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text' 
            } : {}}>
              {data.name}
            </h3>
            <p className={`text-secondary text-sm leading-relaxed transition-all duration-300 ${
              isActive ? "opacity-100" : "opacity-80"
            }`}>
              {data.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          {data.tags && (
            <div className="mb-4 relative z-10">
              <div className="flex flex-wrap gap-2">
                {data.tags.slice(0, isActive ? 4 : 3).map((tag, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 text-xs rounded-full border transition-all duration-300 bg-transparent"
                    style={isActive ? {
                      color: '#0A3C36',
                      borderColor: 'rgba(10, 60, 54, 0.3)',
                    } : {
                      color: '#9CA3AF',
                      borderColor: 'rgba(107, 114, 128, 0.2)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Only show on active item */}
          {isActive && (
            <motion.div 
              className="flex gap-3 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {data.source_code_link && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(data.source_code_link, "_blank");
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 flex items-center gap-2 border-2 bg-transparent"
                  style={{
                    borderColor: '#0A3C36',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0A3C36';
                    e.target.style.boxShadow = '0 0 15px rgba(10, 60, 54, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Code
                </button>
              )}
              {data.live_demo_link && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(data.live_demo_link, "_blank");
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 flex items-center gap-2 border-2 bg-transparent"
                  style={{
                    borderColor: '#DE8A3B',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#DE8A3B';
                    e.target.style.boxShadow = '0 0 15px rgba(222, 138, 59, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Demo
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Glow effect for active card */}
        {isActive && (
          <motion.div 
            className="absolute inset-0 rounded-xl border pointer-events-none"
            style={{ borderColor: 'rgba(10, 60, 54, 0.3)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>
    </motion.div>
  );
};