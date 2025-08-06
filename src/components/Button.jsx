import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  type = "button",
  icon,
  ...props
}) => {
  // Base styles with modern shadow system
  const baseStyles = `
    inline-flex items-center justify-center font-bold rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-105 active:scale-95 border-3
  `;

  // Variant styles with hard shadows
  const variants = {
    primary: `
      bg-blue-600 hover:bg-blue-700 active:bg-blue-800
      text-blue-900 border-blue-900 shadow-hard-blue
      focus:ring-blue-500
    `,
    secondary: `
      bg-gray-600 hover:bg-gray-700 active:bg-gray-800
      text-gray-900 border-gray-900 shadow-hard-gray
      focus:ring-gray-500
    `,
    success: `
      bg-green-600 hover:bg-green-700 active:bg-green-800
      text-green-900 border-green-900 shadow-hard-green
      focus:ring-green-500
    `,
    danger: `
      bg-red-600 hover:bg-red-700 active:bg-red-800
      text-red-900 border-red-900 shadow-hard-red
      focus:ring-red-500
    `,
    warning: `
      bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800
      text-yellow-900 border-yellow-900 shadow-hard-yellow
      focus:ring-yellow-500
    `,
    outline: `
      bg-transparent hover:bg-gray-800/50
      text-gray-300 hover:text-white
      border-gray-600 hover:border-gray-500 shadow-none
      focus:ring-gray-500
    `,
    ghost: `
      bg-transparent hover:bg-gray-800/30
      text-gray-400 hover:text-white border-transparent shadow-none
      focus:ring-gray-500
    `,
  };

  // Size styles
  const sizes = {
    xs: "px-2 py-1 text-xs min-h-[32px]",
    sm: "px-3 py-1.5 text-sm min-h-[36px]",
    md: "px-4 py-2 text-sm min-h-[40px]",
    lg: "px-6 py-3 text-base min-h-[48px]",
    xl: "px-8 py-4 text-lg min-h-[56px]",
    icon: "p-2 min-h-[40px] min-w-[40px]",
    "icon-lg": "p-3 min-h-[48px] min-w-[48px]",
    "icon-xl": "p-4 min-h-[60px] min-w-[60px]",
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.replace(/\s+/g, " ").trim();

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      {children}
    </button>
  );
};