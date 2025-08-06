import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { blue, green, orange } from "../../utils";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";

// Placeholder images - replace with your actual education logos
const placeholderLogos = {
  college: "https://via.placeholder.com/100x100/915EFF/ffffff?text=College",
  highSchool: "https://via.placeholder.com/100x100/56ccf2/ffffff?text=HS",
  elementary: "https://via.placeholder.com/100x100/f12711/ffffff?text=Elem",
};

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

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen bg-transparent py-20 px-6"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-wider mb-4">
            About
          </h1>
        </div>

        {/* Main Content Grid - Fixed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN - Text Content */}
          <div className="space-y-8 z-10 relative">
            {/* About Paragraph */}
            <div className="space-y-6">
              <p className="text-[#aaa6c3] text-lg leading-relaxed">
                I'm a passionate programmer, who is always looking for new
                challenges to improve myself, also a team player, who is always
                ready to learn new things and help others.
              </p>
              <p className="text-[#aaa6c3] text-lg leading-relaxed">
                I was born and raised in Nagpur, India. I love to play guitar
                and ukulele and in my free time I like to read books, watch
                movies and play video games.
              </p>
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <h2 className="text-white text-2xl font-bold">Education</h2>
              <div className="space-y-4">
                <AboutItem
                  color={blue}
                  active={activeCard === 0}
                  onClick={() => handleCardClick(0)}
                  data={{
                    title: "D.Y. Patil college of engineering, Pune",
                    p: "Bachelors of Computer Engineering (2019-2023)",
                    image: placeholderLogos.college,
                  }}
                />
                <AboutItem
                  color={green}
                  active={activeCard === 1}
                  onClick={() => handleCardClick(1)}
                  data={{
                    title: "M.P. Deo D. Science College, Nagpur",
                    p: "High School (2017-2019)",
                    image: placeholderLogos.highSchool,
                  }}
                />
                <AboutItem
                  color={orange}
                  active={activeCard === 2}
                  onClick={() => handleCardClick(2)}
                  data={{
                    title: "School of Scholars, Nagpur",
                    p: "Secondary Education (2007-2017)",
                    image: placeholderLogos.elementary,
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - 3D Skills */}
          <div className="flex flex-col items-center justify-center z-10 relative">
            <h2 className="text-white text-2xl font-bold mb-8 text-center">
              Technologies & Skills
            </h2>
            <div className="w-full h-[500px] relative">
              {show ? (
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 75 }}
                  className="w-full h-full"
                >
                  <Skills />
                </Canvas>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="canvas-loader mb-4"></div>
                    <p className="text-[#aaa6c3]">Loading skills...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
