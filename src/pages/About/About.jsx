import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { blue, green, orange } from "../../utils";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";

// ============================================================
// 🎯 ABOUT PAGE CONFIGURATION VARIABLES - EASILY EDITABLE!
// ============================================================

// LAYOUT & SPACING VARIABLES
const SECTION_PADDING_Y = "py-20"; // Top/bottom padding for entire section
const SECTION_PADDING_X = "px-10"; // Left/right padding for entire section
const CONTENT_MAX_WIDTH = "max-w-full"; // Maximum content width constraint
const GRID_GAP = "gap-16"; // Gap between left and right columns
const COLUMN_SPACING = "space-y-8"; // Vertical spacing within left column
const EDUCATION_CARD_SPACING = "space-y-4"; // Spacing between education cards
const TEXT_SPACING = "space-y-6"; // Spacing between paragraphs

// HEADER CONFIGURATION
const PAGE_TITLE = "About";
const PAGE_TITLE_SIZE = "text-4xl md:text-6xl"; // Responsive title size
const PAGE_TITLE_STYLE = "font-black uppercase tracking-wider";
const PAGE_TITLE_COLOR = "text-white";
const PAGE_TITLE_MARGIN = "mb-4";
const HEADER_MARGIN_BOTTOM = "mb-16";
const HEADER_OPACITY = "opacity-0.3";

// ABOUT ME SECTION CONFIGURATION
const ABOUT_ME_TITLE = "About Me";
const ABOUT_ME_TITLE_SIZE = "text-2xl";
const ABOUT_ME_TITLE_STYLE = "font-bold";
const ABOUT_ME_TITLE_COLOR = "text-white";
const ABOUT_ME_TITLE_MARGIN = "mb-6";
const ABOUT_ME_SECTION_MARGIN = "mb-12";

const ABOUT_ME_TEXT_1 =
  "I'm a passionate programmer, who is always looking for new challenges to improve myself, also a team player, who is always ready to learn new things and help others.";
const ABOUT_ME_TEXT_2 =
  "I was born and raised in Nagpur, India. I love to play guitar and ukulele and in my free time I like to read books, watch movies and play video games.";

const ABOUT_TEXT_COLOR = "text-[#aaa6c3]";
const ABOUT_TEXT_SIZE = "text-lg";
const ABOUT_TEXT_STYLE = "leading-relaxed";

// EDUCATION SECTION CONFIGURATION
const EDUCATION_TITLE = "Education";
const EDUCATION_TITLE_SIZE = "text-2xl";
const EDUCATION_TITLE_STYLE = "font-bold";
const EDUCATION_TITLE_COLOR = "text-white";
const EDUCATION_TITLE_MARGIN = "mb-6";

// EDUCATION CARDS DATA
const EDUCATION_CARDS = [
  {
    id: 0,
    color: blue,
    title: "D.Y. Patil college of engineering, Pune",
    subtitle: "Bachelors of Computer Engineering (2019-2023)",
    image: "https://via.placeholder.com/100x100/915EFF/ffffff?text=College",
  },
  {
    id: 1,
    color: green,
    title: "M.P. Deo D. Science College, Nagpur",
    subtitle: "High School (2017-2019)",
    image: "https://via.placeholder.com/100x100/56ccf2/ffffff?text=HS",
  },
  {
    id: 2,
    color: orange,
    title: "School of Scholars, Nagpur",
    subtitle: "Secondary Education (2007-2017)",
    image: "https://via.placeholder.com/100x100/f12711/ffffff?text=Elem",
  },
];

// ACADEMIC FOCUS SECTION CONFIGURATION
const ACADEMIC_FOCUS_MARGIN_TOP = "mt-8";
const ACADEMIC_FOCUS_PADDING = "p-6";
const ACADEMIC_FOCUS_BACKGROUND = "bg-white/5";
const ACADEMIC_FOCUS_BORDER_RADIUS = "rounded-xl";
const ACADEMIC_FOCUS_BACKDROP = "backdrop-blur-sm";
const ACADEMIC_FOCUS_BORDER = "border border-white/10";

const ACADEMIC_FOCUS_LABEL = "Academic Focus:";
const ACADEMIC_FOCUS_LABEL_COLOR = "text-white";
const ACADEMIC_FOCUS_TEXT =
  "Throughout my educational journey, I've maintained a strong focus on computer science and engineering principles, with particular interest in software development, web technologies, and problem-solving methodologies.";
const ACADEMIC_FOCUS_TEXT_COLOR = "text-[#aaa6c3]";
const ACADEMIC_FOCUS_TEXT_SIZE = "text-sm";
const ACADEMIC_FOCUS_TEXT_STYLE = "leading-relaxed";

// BOTTOM QUOTE SECTION CONFIGURATION
const QUOTE_SECTION_MARGIN_TOP = "mt-20";
const QUOTE_SECTION_ALIGNMENT = "text-center";
const QUOTE_CONTAINER_WIDTH = "max-w-lg mx-auto";

const MAIN_QUOTE = "Always learning, always growing";
const MAIN_QUOTE_SIZE = "text-xl";
const MAIN_QUOTE_STYLE = "font-semibold";
const MAIN_QUOTE_COLOR = "text-white";
const MAIN_QUOTE_MARGIN = "mb-6";

const QUOTE_DESCRIPTION =
  "My journey in technology is driven by curiosity and the desire to create meaningful digital experiences. Each project is an opportunity to learn something new and push the boundaries of what's possible.";
const QUOTE_TEXT_COLOR = "text-[#aaa6c3]";
const QUOTE_TEXT_SIZE = "text-base";
const QUOTE_TEXT_STYLE = "leading-relaxed";

// SKILLS SECTION CONFIGURATION (Right Column)
const SKILLS_SECTION_CLASSES =
  "flex flex-col items-center justify-center z-10 relative";
const SKILLS_HEADER_MARGIN = "mb-8";
const SKILLS_HEADER_ALIGNMENT = "text-center";

const SKILLS_TITLE = "Technologies & Skills";
const SKILLS_TITLE_SIZE = "text-2xl";
const SKILLS_TITLE_STYLE = "font-bold";
const SKILLS_TITLE_COLOR = "text-white";
const SKILLS_TITLE_MARGIN = "mb-4";

const SKILLS_DESCRIPTION =
  "Interactive 3D visualization of my technical skills and expertise. Hover over the floating icons to explore!";
const SKILLS_DESCRIPTION_COLOR = "text-[#aaa6c3]";
const SKILLS_DESCRIPTION_SIZE = "text-sm";
const SKILLS_DESCRIPTION_WIDTH = "max-w-md mx-auto";

// 3D CONTAINER CONFIGURATION
const CONTAINER_3D_WIDTH = "w-full";
const CONTAINER_3D_HEIGHT = "h-[500px]";
const CONTAINER_3D_POSITION = "relative";
const CONTAINER_3D_BACKGROUND =
  "bg-gradient-to-br from-purple-900/20 to-blue-900/20";
const CONTAINER_3D_BORDER_RADIUS = "rounded-2xl";
const CONTAINER_3D_BORDER = "border border-white/10";
const CONTAINER_3D_BACKDROP = "backdrop-blur-sm";
const CONTAINER_3D_OVERFLOW = "overflow-hidden";

// LOADING STATE CONFIGURATION
const LOADING_CONTAINER_CLASSES =
  "w-full h-full flex items-center justify-center";
const LOADING_TEXT_ALIGNMENT = "text-center";
const LOADING_SPINNER_MARGIN = "mb-4";
const LOADING_TEXT_COLOR = "text-[#aaa6c3]";
const LOADING_TEXT_SIZE = "text-sm";
const LOADING_MESSAGE = "Loading 3D skills...";

// DECORATIVE ELEMENTS CONFIGURATION
const DECORATION_1_POSITION = "absolute top-4 right-4";
const DECORATION_1_SIZE = "w-2 h-2";
const DECORATION_1_COLOR = "bg-purple-400";
const DECORATION_1_SHAPE = "rounded-full";
const DECORATION_1_ANIMATION = "animate-pulse";

const DECORATION_2_POSITION = "absolute bottom-6 left-6";
const DECORATION_2_SIZE = "w-1 h-1";
const DECORATION_2_COLOR = "bg-blue-400";
const DECORATION_2_SHAPE = "rounded-full";
const DECORATION_2_ANIMATION = "animate-ping";

const DECORATION_3_POSITION = "absolute top-1/3 left-4";
const DECORATION_3_SIZE = "w-1.5 h-1.5";
const DECORATION_3_COLOR = "bg-orange-400";
const DECORATION_3_SHAPE = "rounded-full";
const DECORATION_3_ANIMATION = "animate-pulse";

// SKILLS LEGEND CONFIGURATION
const LEGEND_MARGIN_TOP = "mt-6";
const LEGEND_GRID = "grid grid-cols-3 gap-4";
const LEGEND_WIDTH = "w-full max-w-md";
const LEGEND_ITEM_ALIGNMENT = "text-center";
const LEGEND_DOT_SIZE = "w-3 h-3";
const LEGEND_DOT_SHAPE = "rounded-full";
const LEGEND_DOT_MARGIN = "mx-auto mb-2";
const LEGEND_TEXT_COLOR = "text-[#aaa6c3]";
const LEGEND_TEXT_SIZE = "text-xs";

const LEGEND_CATEGORIES = [
  { color: "bg-blue-400", label: "Frontend" },
  { color: "bg-green-400", label: "Backend" },
  { color: "bg-purple-400", label: "Tools" },
];

// CAMERA CONFIGURATION
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

  return (
    <section
      id="about"
      ref={ref}
      className={`relative min-h-screen ${SECTION_PADDING_Y} ${SECTION_PADDING_X}`}
      style={{ isolation: "isolate" }}
    >
      <div className={`relative ${CONTENT_MAX_WIDTH}`}>
        <div className={`text-left ${HEADER_MARGIN_BOTTOM} ${HEADER_OPACITY}`}>
          <h1
            className={`${PAGE_TITLE_COLOR} ${PAGE_TITLE_SIZE} ${PAGE_TITLE_STYLE} ${PAGE_TITLE_MARGIN}`}
          >
            {PAGE_TITLE}
          </h1>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 ${GRID_GAP} items-start min-h-[100vh]`}
        >
          <div className={`${COLUMN_SPACING} z-10 relative`}>
            <div className={`${TEXT_SPACING} ${ABOUT_ME_SECTION_MARGIN}`}>
              <h2
                className={`${ABOUT_ME_TITLE_COLOR} ${ABOUT_ME_TITLE_SIZE} ${ABOUT_ME_TITLE_STYLE} ${ABOUT_ME_TITLE_MARGIN}`}
              >
                {ABOUT_ME_TITLE}
              </h2>
              <p
                className={`${ABOUT_TEXT_COLOR} ${ABOUT_TEXT_SIZE} ${ABOUT_TEXT_STYLE}`}
              >
                {ABOUT_ME_TEXT_1}
              </p>
              <p
                className={`${ABOUT_TEXT_COLOR} ${ABOUT_TEXT_SIZE} ${ABOUT_TEXT_STYLE}`}
              >
                {ABOUT_ME_TEXT_2}
              </p>
            </div>

            <div className={TEXT_SPACING}>
              <h2
                className={`${EDUCATION_TITLE_COLOR} ${EDUCATION_TITLE_SIZE} ${EDUCATION_TITLE_STYLE} ${EDUCATION_TITLE_MARGIN}`}
              >
                {EDUCATION_TITLE}
              </h2>

              <div className={EDUCATION_CARD_SPACING}>
                {EDUCATION_CARDS.map((card) => (
                  <AboutItem
                    key={card.id}
                    color={card.color}
                    active={activeCard === card.id}
                    onClick={() => handleCardClick(card.id)}
                    data={{
                      title: card.title,
                      p: card.subtitle,
                      image: card.image,
                    }}
                  />
                ))}
              </div>

              <div
                className={`${ACADEMIC_FOCUS_MARGIN_TOP} ${ACADEMIC_FOCUS_PADDING} ${ACADEMIC_FOCUS_BACKGROUND} ${ACADEMIC_FOCUS_BORDER_RADIUS} ${ACADEMIC_FOCUS_BACKDROP} ${ACADEMIC_FOCUS_BORDER}`}
              >
                <p
                  className={`${ACADEMIC_FOCUS_TEXT_COLOR} ${ACADEMIC_FOCUS_TEXT_SIZE} ${ACADEMIC_FOCUS_TEXT_STYLE}`}
                >
                  <strong className={ACADEMIC_FOCUS_LABEL_COLOR}>
                    {ACADEMIC_FOCUS_LABEL}
                  </strong>{" "}
                  {ACADEMIC_FOCUS_TEXT}
                </p>
              </div>
            </div>

            <div
              className={`${QUOTE_SECTION_MARGIN_TOP} ${QUOTE_SECTION_ALIGNMENT}`}
            >
              <div className={QUOTE_CONTAINER_WIDTH}>
                <h3
                  className={`${MAIN_QUOTE_COLOR} ${MAIN_QUOTE_SIZE} ${MAIN_QUOTE_STYLE} ${MAIN_QUOTE_MARGIN}`}
                >
                  "{MAIN_QUOTE}"
                </h3>
                <p
                  className={`${QUOTE_TEXT_COLOR} ${QUOTE_TEXT_SIZE} ${QUOTE_TEXT_STYLE}`}
                >
                  {QUOTE_DESCRIPTION}
                </p>
              </div>
            </div>
          </div>

          <div className={SKILLS_SECTION_CLASSES}>
            <div
              className={`${SKILLS_HEADER_ALIGNMENT} ${SKILLS_HEADER_MARGIN}`}
            >
              <h2
                className={`${SKILLS_TITLE_COLOR} ${SKILLS_TITLE_SIZE} ${SKILLS_TITLE_STYLE} ${SKILLS_TITLE_MARGIN}`}
              >
                {SKILLS_TITLE}
              </h2>
              <p
                className={`${SKILLS_DESCRIPTION_COLOR} ${SKILLS_DESCRIPTION_SIZE} ${SKILLS_DESCRIPTION_WIDTH}`}
              >
                {SKILLS_DESCRIPTION}
              </p>
            </div>

            <div
              className={`${CONTAINER_3D_WIDTH} ${CONTAINER_3D_HEIGHT} ${CONTAINER_3D_POSITION} ${CONTAINER_3D_BACKGROUND} ${CONTAINER_3D_BORDER_RADIUS} ${CONTAINER_3D_BORDER} ${CONTAINER_3D_BACKDROP} ${CONTAINER_3D_OVERFLOW}`}
            >
              {show ? (
                <Canvas
                  camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
                  className={`w-full h-full ${CONTAINER_3D_BORDER_RADIUS}`}
                >
                  <Skills />
                </Canvas>
              ) : (
                <div className={LOADING_CONTAINER_CLASSES}>
                  <div className={LOADING_TEXT_ALIGNMENT}>
                    <div
                      className={`canvas-loader ${LOADING_SPINNER_MARGIN}`}
                    ></div>
                    <p className={`${LOADING_TEXT_COLOR} ${LOADING_TEXT_SIZE}`}>
                      {LOADING_MESSAGE}
                    </p>
                  </div>
                </div>
              )}

              <div
                className={`${DECORATION_1_POSITION} ${DECORATION_1_SIZE} ${DECORATION_1_COLOR} ${DECORATION_1_SHAPE} ${DECORATION_1_ANIMATION}`}
              ></div>
              <div
                className={`${DECORATION_2_POSITION} ${DECORATION_2_SIZE} ${DECORATION_2_COLOR} ${DECORATION_2_SHAPE} ${DECORATION_2_ANIMATION}`}
              ></div>
              <div
                className={`${DECORATION_3_POSITION} ${DECORATION_3_SIZE} ${DECORATION_3_COLOR} ${DECORATION_3_SHAPE} ${DECORATION_3_ANIMATION}`}
              ></div>
            </div>

            <div
              className={`${LEGEND_MARGIN_TOP} ${LEGEND_GRID} ${LEGEND_WIDTH}`}
            >
              {LEGEND_CATEGORIES.map((category, index) => (
                <div key={index} className={LEGEND_ITEM_ALIGNMENT}>
                  <div
                    className={`${LEGEND_DOT_SIZE} ${category.color} ${LEGEND_DOT_SHAPE} ${LEGEND_DOT_MARGIN}`}
                  ></div>
                  <span className={`${LEGEND_TEXT_COLOR} ${LEGEND_TEXT_SIZE}`}>
                    {category.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
