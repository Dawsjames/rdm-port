/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // New Color Palette
        primary: "#151618", // Night
        secondary: "#aaa6c3", // Nebula gray (keeping for compatibility)
        tertiary: "#0A3C36", // Brunswick green
        "black-100": "#151618", // Night
        "black-200": "#0A3C36", // Brunswick green
        "white-100": "#f3f3f3", // Starlight white
        
        // Custom Palette Colors - New Hex Values
        "brunswick-green": "#0A3C36",
        "butterscotch": "#DE8A3B", 
        "night": "#151618",
        "brunswick-green-2": "#065F55",
        "sky-magenta": "#C779AE",
        
        // Updated Space Theme Colors with new palette
        space: {
          50: "#f0f4ff",   
          100: "#e0e7ff",  
          200: "#c7d2fe",  
          300: "#a5b4fc",  
          400: "#0A3C36",  // Brunswick green
          500: "#0A3C36",  // Brunswick green
          600: "#065F55",  // Brunswick green 2
          700: "#065F55",  
          800: "#151618",  // Night
          900: "#151618",  // Night
        },
        
        nebula: {
          50: "#fdf4ff",   
          100: "#fae8ff",  
          200: "#f5d0fe",  
          300: "#f0abfc",  
          400: "#DE8A3B",  // Butterscotch
          500: "#DE8A3B",  // Butterscotch
          600: "#d97706",  
          700: "#b45309",  
          800: "#151618",  // Night
          900: "#151618",  // Night
        },
        
        cosmic: {
          50: "#f0fdfa",   
          100: "#ccfbf1",  
          200: "#99f6e4",  
          300: "#5eead4",  
          400: "#065F55",  // Brunswick green 2
          500: "#065F55",  // Brunswick green 2
          600: "#0A3C36",  // Brunswick green
          700: "#0A3C36",  
          800: "#151618",  // Night
          900: "#151618",  // Night
        },
        
        starlight: {
          50: "#fefce8",   
          100: "#fef9c3",  
          200: "#fef08a",  
          300: "#fde047",  
          400: "#C779AE",  // Sky magenta
          500: "#C779AE",  // Sky magenta
          600: "#d97706",  
          700: "#DE8A3B",  // Butterscotch
          800: "#151618",  // Night
          900: "#151618",  // Night
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        "hard-blue": "8px 8px 0 #1e40af",
        "hard-green": "8px 8px 0 #166534",
        "hard-yellow": "8px 8px 0 #854d0e",
        "hard-red": "8px 8px 0 #991b1b",
        "hard-gray": "8px 8px 0 #374151",
        // Updated shadows with exact palette colors
        "brunswick-green-glow": "0 0 20px rgba(10, 60, 54, 0.3), 0 0 40px rgba(10, 60, 54, 0.1)",
        "butterscotch-glow": "0 0 20px rgba(222, 138, 59, 0.3), 0 0 40px rgba(222, 138, 59, 0.1)",
        "brunswick-green-2-glow": "0 0 20px rgba(6, 95, 85, 0.3), 0 0 40px rgba(6, 95, 85, 0.1)",
        "sky-magenta-glow": "0 0 20px rgba(199, 121, 174, 0.3), 0 0 40px rgba(199, 121, 174, 0.1)",
        "night-glow": "0 0 20px rgba(21, 22, 24, 0.3), 0 0 40px rgba(21, 22, 24, 0.1)",
        // Legacy shadows for compatibility
        "space-glow": "0 0 20px rgba(10, 60, 54, 0.3), 0 0 40px rgba(10, 60, 54, 0.1)",
        "nebula-glow": "0 0 20px rgba(222, 138, 59, 0.3), 0 0 40px rgba(222, 138, 59, 0.1)",
        "cosmic-glow": "0 0 20px rgba(6, 95, 85, 0.3), 0 0 40px rgba(6, 95, 85, 0.1)",
        "starlight-glow": "0 0 20px rgba(199, 121, 174, 0.3), 0 0 40px rgba(199, 121, 174, 0.1)",
      },
      keyframes: {
        fadeIn: {
          '0%': { transform: 'translateY(200px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        textRotate1: {
          '0%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
          '40%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
          '60%': { transform: 'translate3d(0, -100%, 0) rotateX(-90deg)' },
          '100%': { transform: 'translate3d(0, -100%, 0) rotateX(-90deg)' },
        },
        textRotate2: {
          '0%': { transform: 'translate3d(0, 100%, 0) rotateX(-90deg)' },
          '40%': { transform: 'translate3d(0, 100%, 0) rotateX(-90deg)' },
          '60%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
          '100%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(10, 60, 54, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(10, 60, 54, 0.6)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 500ms ease forwards',
        slideInLeft: 'slideInLeft 600ms ease-out forwards',
        slideInRight: 'slideInRight 600ms ease-out forwards',
        slideInUp: 'slideInUp 600ms ease-out forwards',
        scaleIn: 'scaleIn 500ms ease-out forwards',
        textRotate1: 'textRotate1 2.4s infinite alternate',
        textRotate2: 'textRotate2 2.4s infinite alternate',
        float: 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "space-gradient": "linear-gradient(135deg, #151618 0%, #0A3C36 50%, #065F55 100%)",
        "nebula-gradient": "linear-gradient(135deg, #DE8A3B 0%, #C779AE 50%, #065F55 100%)",
        "cosmic-gradient": "linear-gradient(135deg, #151618 0%, #0A3C36 50%, #065F55 100%)",
        "palette-gradient": "linear-gradient(135deg, #151618 0%, #0A3C36 25%, #065F55 50%, #DE8A3B 75%, #C779AE 100%)",
      },
    },
    screens: {
      xs: "450px",
    },
    borderWidth: {
      3: "3px",
    },
  },
  plugins: [],
};