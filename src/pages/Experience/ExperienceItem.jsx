import React from "react";

export const ExperienceItem = ({ data, index }) => {
  // New color palette mapping with outline-only colors
  const getColors = (color) => {
    const colorMap = {
      blue: {
        border: '#0A3C36',
        shadow: '0 0 30px rgba(10, 60, 54, 0.3)',
        text: '#FFFFFF',
        accent: '#0A3C36'
      },
      green: {
        border: '#DE8A3B',
        shadow: '0 0 30px rgba(222, 138, 59, 0.3)',
        text: '#FFFFFF',
        accent: '#DE8A3B'
      },
      purple: {
        border: '#C779AE',
        shadow: '0 0 30px rgba(199, 121, 174, 0.3)',
        text: '#FFFFFF',
        accent: '#C779AE'
      },
      yellow: {
        border: '#065F55',
        shadow: '0 0 20px rgba(6, 95, 85, 0.2)', 
        text: '#FFFFFF',
        accent: '#065F55'
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const colors = getColors(data.color);

  return (
    <div
      className="experience-item overflow-hidden backdrop-blur-sm rounded-2xl h-[400px] w-[200px] flex flex-col gap-4 p-5 cursor-pointer transition-all duration-500 ease-out relative group md:h-auto md:w-full md:col-span-1 md:row-start-2 [&.active]:w-[600px] md:[&.active]:w-full md:[&.active]:col-span-3 md:[&.active]:row-start-1 bg-transparent border-2"
      style={{ 
        borderColor: colors.border,
        boxShadow: colors.shadow,
        animationDelay: `${index * 0.1}s`,
        // Fix positioning to prevent movement
        transformOrigin: 'center center',
      }}
    >
      {/* Background overlay - very subtle */}
      <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(135deg, rgba(21, 22, 24, 0.1), transparent, rgba(21, 22, 24, 0.1))` }}></div>
      
      {/* Animated background elements - outline only */}
      <div className="absolute top-4 right-4 w-1 h-1 rounded-full animate-twinkle opacity-60 border" style={{ borderColor: colors.accent }}></div>
      <div className="absolute bottom-6 left-4 w-0.5 h-0.5 rounded-full animate-pulse-slow opacity-40 border" style={{ borderColor: colors.accent }}></div>
      <div className="absolute top-1/2 left-6 w-0.5 h-0.5 rounded-full animate-twinkle opacity-30 border" style={{ borderColor: colors.accent, animationDelay: '1s' }}></div>
      
      <div
        className="header flex justify-start items-center gap-5 rotate-90 translate-x-10 transition-all duration-500 ease-out relative z-10
        [.active_&]:rotate-0 [.active_&]:translate-x-0
        md:translate-x-0 md:rotate-0"
      >
        <div className="image flex justify-center items-center flex-col gap-2">
          <div
            className="wrapper shadow-lg border-2 w-[5.6rem] h-[5.6rem] rounded-full overflow-hidden -rotate-90 [.active_&]:rotate-0 transition-all duration-500 md:w-16 md:h-16 md:rotate-0 relative hover:rotate-180 bg-transparent"
            style={{
              borderColor: colors.border,
              boxShadow: colors.shadow
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            <img src={data.logo} alt="logo" className="w-full h-full object-cover relative z-10" />
          </div>
        </div>
        <div className="text md:hidden [.active_&]:block">
          <h2 className="text-2xl leading-9 md:text-xl md:leading-7 text-white font-bold">
            {data.name}
          </h2>
          <h3 className="position hidden [.active_&]:block text-base leading-6 text-white/90 font-medium">
            {data.title}
          </h3>
        </div>
      </div>

      {/* Date badge */}
      <div className="date hidden [.active_&]:block text-sm font-bold text-white/90 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm border bg-transparent" style={{
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}>
          <div className="w-2 h-2 rounded-full animate-pulse border" style={{ borderColor: colors.accent, backgroundColor: colors.accent }}></div>
          {data.joined} - {data.end}
        </div>
      </div>

      {/* Description */}
      <div className="hidden [.active_&]:block text-sm md:text-sm text-white/90 leading-relaxed relative z-10 flex-1">
        <div className="backdrop-blur-sm rounded-lg p-4 border shadow-inner bg-transparent" style={{
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}>
          {data.bio}
        </div>
      </div>

      {/* Skills/Technologies */}
      {data.technologies && (
        <div className="hidden [.active_&]:block relative z-10">
          <div className="flex flex-wrap gap-2">
            {data.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full backdrop-blur-sm border hover:bg-white/10 transition-colors duration-200 bg-transparent"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Subtle hover glow effect - no scale transform */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl" style={{ boxShadow: colors.shadow }}></div>
      
      {/* Active state glow */}
      <div 
        className="absolute inset-0 rounded-2xl border-2 opacity-0 [.active_&]:opacity-100 transition-opacity duration-500"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)"
        }}
      />
    </div>
  );
};