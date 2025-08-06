import React from "react";

export const AboutItem = ({ color, active, data, onClick }) => {
  // Dynamic color styles based on the color prop
  const colorStyles = {
    backgroundColor: color ? color["60"] : "#2f80ed",
    color: color ? color["00"] : "#56ccf2",
    borderColor: color ? color["00"] : "#56ccf2",
    boxShadow: `6px 6px 0 ${color ? color["00"] : "#56ccf2"}`,
  };

  return (
    <div
      onClick={onClick}
      className={`
        about-item overflow-hidden rounded-2xl border-4 cursor-pointer
        flex items-center relative transition-all duration-500 ease-out
        ${
          active
            ? "w-[400px] justify-start sm:w-[300px]"
            : "w-[90px] h-[90px] justify-center hover:w-[400px] hover:justify-start sm:hover:w-[300px]"
        }
        aspect-square sm:w-[70px] sm:h-[70px]
      `}
      style={colorStyles}
    >
      {/* Logo Container */}
      <div className="min-w-[50px] w-[50px] h-[50px] rounded-full overflow-hidden m-3 flex-shrink-0 sm:min-w-[45px] sm:w-[45px] sm:h-[45px]">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content - Shown when active or on hover */}
      <div
        className={`
        text-content overflow-hidden transition-all duration-500 flex-1 pr-3
        ${
          active
            ? "opacity-100 max-w-full"
            : "opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-full"
        }
      `}
      >
        <h3 className="text-base font-semibold leading-tight mb-1 sm:text-sm">
          {data.title}
        </h3>
        <p className="text-sm leading-tight sm:text-xs opacity-80">{data.p}</p>
      </div>
    </div>
  );
};
