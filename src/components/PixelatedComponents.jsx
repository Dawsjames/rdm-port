import React from "react"

// =============================================================================
// 🎯 PIXELATED DESIGN SYSTEM COMPONENTS
// =============================================================================

// Color palette constants
export const COLORS = {
  dark: "#2a3441",
  light: "#fee1c7",
  orange: "#ff6b47",
  teal: "#4a9b8e",
  brightOrange: "#ff8c42",
  pink: "#d4a5c7",
  darkVariant: "#1f2937",
  lightVariant: "#f5e6d3",
  darkerVariant: "#ead6c0",
}

// =============================================================================
// PIXELATED BUTTON COMPONENT
// =============================================================================
export const PixelButton = ({
  children,
  variant = "primary",
  size = "md",
  filled = false,
  onClick,
  className = "",
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: { bg: COLORS.dark, border: COLORS.orange, text: COLORS.light },
    secondary: { bg: COLORS.light, border: COLORS.teal, text: COLORS.dark },
    accent: {
      bg: COLORS.dark,
      border: COLORS.brightOrange,
      text: COLORS.light,
    },
    pink: { bg: COLORS.light, border: COLORS.pink, text: COLORS.dark },
  }

  const sizes = {
    sm: { padding: "6px 12px", fontSize: "12px" },
    md: { padding: "12px 24px", fontSize: "16px" },
    lg: { padding: "16px 32px", fontSize: "18px" },
  }

  const scheme = variants[variant]
  const sizeStyles = sizes[size]

  const baseStyles = {
    all: "unset",
    backgroundColor: filled
      ? scheme.bg === COLORS.dark
        ? COLORS.darkVariant
        : COLORS.lightVariant
      : "transparent",
    fontSize: sizeStyles.fontSize,
    fontWeight: "bold",
    padding: sizeStyles.padding,
    minWidth: "50px",
    minHeight: "40px",
    border: `3px solid ${scheme.border}`,
    borderRadius: "8px",
    color: scheme.text,
    boxShadow: `4px 4px 0 ${scheme.border}`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.1s ease-in",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    imageRendering: "pixelated",
  }

  const handleMouseDown = (e) => {
    if (disabled) return
    e.currentTarget.style.transform = "translate(2px, 2px)"
    e.currentTarget.style.boxShadow = `2px 2px 0 ${scheme.border}`
  }

  const handleMouseUp = (e) => {
    if (disabled) return
    e.currentTarget.style.transform = "none"
    e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.border}`
  }

  const handleMouseEnter = (e) => {
    if (disabled) return
    const hoverBg =
      scheme.bg === COLORS.dark ? COLORS.darkVariant : COLORS.darkerVariant
    e.currentTarget.style.backgroundColor = filled
      ? COLORS.darkerVariant
      : hoverBg
  }

  const handleMouseLeave = (e) => {
    if (disabled) return
    const originalBg = filled
      ? scheme.bg === COLORS.dark
        ? COLORS.darkVariant
        : COLORS.lightVariant
      : "transparent"
    e.currentTarget.style.backgroundColor = originalBg
  }

  return (
    <button
      style={baseStyles}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// =============================================================================
// PIXELATED CARD COMPONENT
// =============================================================================
export const PixelCard = ({
  children,
  variant = "dark",
  glowColor = "rgba(255, 107, 71, 0.3)",
  isActive = false,
  onClick,
  className = "",
  ...props
}) => {
  const variants = {
    dark: { bg: COLORS.dark, border: COLORS.orange, text: COLORS.light },
    light: { bg: COLORS.light, border: COLORS.teal, text: COLORS.dark },
    accent: {
      bg: COLORS.dark,
      border: COLORS.brightOrange,
      text: COLORS.light,
    },
  }

  const scheme = variants[variant]

  const baseStyles = {
    backgroundColor: scheme.bg,
    border: `3px solid ${scheme.border}`,
    borderRadius: "8px",
    boxShadow: isActive
      ? `6px 6px 0 ${scheme.border}, 0 0 40px ${glowColor}`
      : `4px 4px 0 ${scheme.border}, 0 0 25px ${glowColor}`,
    padding: "24px",
    transition: "all 0.1s ease-in",
    transform: isActive ? "translate(-1px, -1px)" : "none",
    cursor: onClick ? "pointer" : "default",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    color: scheme.text,
  }

  const handleMouseDown = (e) => {
    if (!onClick) return
    e.currentTarget.style.transform = "translate(2px, 2px)"
    e.currentTarget.style.boxShadow = `2px 2px 0 ${scheme.border}, 0 0 15px ${glowColor}`
  }

  const handleMouseUp = (e) => {
    if (!onClick) return
    e.currentTarget.style.transform = isActive
      ? "translate(-1px, -1px)"
      : "none"
    e.currentTarget.style.boxShadow = isActive
      ? `6px 6px 0 ${scheme.border}, 0 0 40px ${glowColor}`
      : `4px 4px 0 ${scheme.border}, 0 0 25px ${glowColor}`
  }

  return (
    <div
      style={baseStyles}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

// =============================================================================
// PIXELATED INPUT COMPONENT
// =============================================================================
export const PixelInput = ({
  variant = "dark",
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...props
}) => {
  const variants = {
    dark: { bg: COLORS.darkVariant, border: COLORS.orange, text: COLORS.light },
    light: { bg: COLORS.lightVariant, border: COLORS.teal, text: COLORS.dark },
  }

  const scheme = variants[variant]

  const baseStyles = {
    padding: "12px 16px",
    fontSize: "16px",
    backgroundColor: scheme.bg,
    width: "100%",
    outline: "none",
    border: `3px solid ${scheme.border}`,
    boxShadow: `4px 4px 0 ${scheme.border}`,
    borderRadius: "8px",
    transition: "all 0.1s ease",
    color: scheme.text,
    fontFamily: '"Roboto Mono", "Courier New", monospace',
  }

  const handleFocus = (e) => {
    e.currentTarget.style.boxShadow = `3px 3px 0 ${scheme.border}`
  }

  const handleBlur = (e) => {
    e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.border}`
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={baseStyles}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      {...props}
    />
  )
}

// =============================================================================
// PIXELATED TEXTAREA COMPONENT
// =============================================================================
export const PixelTextarea = ({
  variant = "dark",
  placeholder = "",
  value,
  onChange,
  rows = 4,
  className = "",
  ...props
}) => {
  const variants = {
    dark: { bg: COLORS.darkVariant, border: COLORS.orange, text: COLORS.light },
    light: { bg: COLORS.lightVariant, border: COLORS.teal, text: COLORS.dark },
  }

  const scheme = variants[variant]

  const baseStyles = {
    padding: "12px 16px",
    fontSize: "16px",
    backgroundColor: scheme.bg,
    width: "100%",
    outline: "none",
    border: `3px solid ${scheme.border}`,
    boxShadow: `4px 4px 0 ${scheme.border}`,
    borderRadius: "8px",
    transition: "all 0.1s ease",
    color: scheme.text,
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    resize: "none",
    minHeight: rows * 30 + "px",
  }

  const handleFocus = (e) => {
    e.currentTarget.style.boxShadow = `3px 3px 0 ${scheme.border}`
  }

  const handleBlur = (e) => {
    e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.border}`
  }

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={baseStyles}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      {...props}
    />
  )
}

// =============================================================================
// PIXELATED SECTION TITLE COMPONENT
// =============================================================================
export const PixelSectionTitle = ({
  title,
  subtitle = "",
  color = COLORS.brightOrange,
  glowColor = "rgba(255, 140, 66, 0.4)",
}) => {
  return (
    <div style={{ textAlign: "left", marginBottom: "60px" }}>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: color,
          letterSpacing: "4px",
          marginBottom: "20px",
          fontFamily: '"Roboto Mono", "Courier New", monospace',
          textShadow: `0 0 30px ${glowColor}`,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: COLORS.light,
            fontSize: "16px",
            opacity: 0.8,
            marginTop: "16px",
            fontFamily: '"Roboto Mono", "Courier New", monospace',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: "200px",
          height: "4px",
          margin: "0 auto",
          backgroundColor: "transparent",
          border: `2px solid ${color}`,
          borderRadius: "4px",
          boxShadow: `0 0 20px ${glowColor}`,
        }}
      />
    </div>
  )
}

// =============================================================================
// PIXELATED BADGE COMPONENT
// =============================================================================
export const PixelBadge = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: {
      bg: COLORS.darkVariant,
      border: COLORS.orange,
      text: COLORS.orange,
    },
    secondary: {
      bg: COLORS.lightVariant,
      border: COLORS.teal,
      text: COLORS.teal,
    },
    accent: { bg: COLORS.darkVariant, border: COLORS.pink, text: COLORS.pink },
  }

  const scheme = variants[variant]

  const baseStyles = {
    backgroundColor: scheme.bg,
    border: `3px solid ${scheme.border}`,
    borderRadius: "8px",
    color: scheme.text,
    boxShadow: `4px 4px 0 ${scheme.border}`,
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    fontWeight: "bold",
    padding: "8px 16px",
    fontSize: "14px",
    display: "inline-block",
    cursor: "pointer",
    transition: "all 0.1s ease-in",
  }

  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = "translate(2px, 2px)"
    e.currentTarget.style.boxShadow = `2px 2px 0 ${scheme.border}`
  }

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = "none"
    e.currentTarget.style.boxShadow = `4px 4px 0 ${scheme.border}`
  }

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor =
      scheme.bg === COLORS.darkVariant ? "#151b22" : COLORS.darkerVariant
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = scheme.bg
  }

  return (
    <span
      style={baseStyles}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </span>
  )
}

// =============================================================================
// PIXELATED CONTAINER COMPONENT
// =============================================================================
export const PixelContainer = ({
  children,
  variant = "dark",
  glowColor = "rgba(255, 107, 71, 0.3)",
  className = "",
  ...props
}) => {
  const variants = {
    dark: { bg: COLORS.dark, border: COLORS.orange },
    light: { bg: COLORS.light, border: COLORS.teal },
    accent: { bg: COLORS.dark, border: COLORS.brightOrange },
  }

  const scheme = variants[variant]

  const baseStyles = {
    backgroundColor: scheme.bg,
    border: `3px solid ${scheme.border}`,
    borderRadius: "8px",
    boxShadow: `4px 4px 0 ${scheme.border}, 0 0 30px ${glowColor}`,
    padding: "32px",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
  }

  return (
    <div style={baseStyles} className={className} {...props}>
      {children}
    </div>
  )
}
