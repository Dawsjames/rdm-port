import React, { useState } from "react"
import {
  PixelContainer,
  PixelSectionTitle,
  PixelInput,
  PixelTextarea,
  PixelButton,
  COLORS,
} from "../../components/PixelatedComponents"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: "", email: "", message: "" })
      alert("Message sent successfully! 🚀")
    }, 2000)
  }

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dawsjames",
      icon: "💻",
      color: COLORS.orange,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/dawson-james",
      icon: "💼",
      color: COLORS.teal,
    },
    {
      name: "Email",
      url: "mailto:dawsonjamesvmarcos@gmail.com",
      icon: "📧",
      color: COLORS.brightOrange,
    },
    {
      name: "Resume",
      url: "./assets/resume.pdf",
      icon: "📄",
      color: COLORS.pink,
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.dark,
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <PixelSectionTitle
          title="CONTACT"
          subtitle="Let's build something amazing together"
        />

        {/* Contact Form - Now Full Width */}
        <div style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "60px" }}>
          <PixelContainer variant="dark" glowColor="rgba(255, 107, 71, 0.3)">
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: COLORS.orange,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Send Message 📨
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <PixelInput
                variant="dark"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <PixelInput
                variant="dark"
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <PixelTextarea
                variant="dark"
                name="message"
                placeholder="Hi! Let's discuss your project and bring your ideas to life..."
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                required
              />

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                }}
              >
                <PixelButton
                  variant="primary"
                  filled
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Launching... 🚀" : "Launch Message"}
                </PixelButton>

                <PixelButton
                  variant="accent"
                  type="button"
                  onClick={() =>
                    setFormData({ name: "", email: "", message: "" })
                  }
                  disabled={isSubmitting}
                >
                  Reset
                </PixelButton>
              </div>
            </form>
          </PixelContainer>
        </div>

        {/* Social Links - Moved to Bottom */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: COLORS.brightOrange,
              marginBottom: "32px",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
          >
            Connect With Me 🌐
          </h3>
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {socialLinks.map((link, index) => (
              <SocialButton key={index} {...link} />
            ))}
          </div>
        </div>

        {/* Response Time Info */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: COLORS.lightVariant,
            border: `2px solid ${COLORS.teal}`,
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              color: COLORS.dark,
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ⚡ Quick Response Time: Usually within 24 hours
          </p>
        </div>
      </div>
    </div>
  )
}

// Info Item Component
const InfoItem = ({ icon, text }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px",
      backgroundColor: COLORS.lightVariant,
      borderRadius: "6px",
      border: `2px solid ${COLORS.teal}`,
    }}
  >
    <span style={{ fontSize: "18px" }}>{icon}</span>
    <span
      style={{
        color: COLORS.dark,
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      {text}
    </span>
  </div>
)

// Social Button Component
const SocialButton = ({ name, url, icon, color }) => {
  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = "translate(2px, 2px)"
    e.currentTarget.style.boxShadow = `2px 2px 0 ${color}`
  }

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = "none"
    e.currentTarget.style.boxShadow = `4px 4px 0 ${color}`
  }

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = COLORS.darkVariant
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent"
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "12px",
        backgroundColor: "transparent",
        border: `3px solid ${color}`,
        borderRadius: "8px",
        boxShadow: `4px 4px 0 ${color}`,
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.1s ease-in",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ fontSize: "24px" }}>{icon}</div>
      <span
        style={{
          color: COLORS.light,
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {name}
      </span>
    </a>
  )
}

export default Contact
