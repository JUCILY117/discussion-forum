import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar"; // Navbar contains the dark/light toggle

export default function SignupPage() {
  const { theme, isDark } = useTheme(); // No toggleTheme here
  const navigate = useNavigate();

  const leftGradient = isDark
    ? "linear-gradient(140deg,#0b0420 0%, #3a0d56 35%, #121a4a 75%, #03040a 100%)"
    : "linear-gradient(140deg,#2b6bff 0%, #7a2bff 35%, #ff2fb2 75%, #0b0410 100%)";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        color: theme.textPrimary,
        fontFamily:
          '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ===================== NAVBAR ===================== */}
      <Navbar />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 28,
        }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Poppins:wght@300;400;600;700&display=swap"
        />

        <div style={{ width: "100%", maxWidth: 1200 }}>
          <div
            className="split"
            style={{
              display: "flex",
              gap: 24,
              minHeight: 720,
              alignItems: "stretch",
            }}
          >
            {/* LEFT GRADIENT PANEL */}
            <div
              className="left-panel"
              style={{
                flex: 1,
                position: "relative",
                borderRadius: 32,
                overflow: "hidden",
                padding: 28,
                minWidth: 360,
                background: leftGradient,
                boxShadow: `0 30px 60px ${theme.shadow}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 12,
                  borderRadius: 28,
                  border: "6px solid rgba(255,255,255,0.95)",
                  pointerEvents: "none",
                  boxSizing: "border-box",
                  mixBlendMode: "overlay",
                }}
              />

              <div style={{ zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />
                  <div style={{ color: "rgba(255,255,255,0.92)", fontSize: 12, letterSpacing: 2 }}>W E L C O M E</div>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)", marginLeft: 10 }} />
                </div>
              </div>

              <div aria-hidden style={{ zIndex: 1, flex: 1, marginTop: 12, marginBottom: 12 }} />

              <div style={{ zIndex: 2 }}>
                <h2
                  style={{
                    fontFamily: `"Playfair Display", serif`,
                    fontSize: 56,
                    margin: 0,
                    lineHeight: 0.95,
                    color: "rgba(255,255,255,0.98)",
                  }}
                >
                  Start
                  <br />
                  Your Journey
                </h2>
                <p style={{ marginTop: 14, color: "rgba(255,255,255,0.85)", maxWidth: 380, fontSize: 14 }}>
                  Join us and explore unlimited possibilities. Hard work and passion always pay off.
                </p>
              </div>
            </div>

            {/* RIGHT - FORM CARD */}
            <motion.div
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                flex: 1,
                minWidth: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 520,
                  background: theme.surface,
                  borderRadius: 28,
                  padding: "56px 64px",
                  boxShadow: `0 30px 60px ${theme.shadow}`,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: "linear-gradient(135deg,#111 0%, #444 100%)",
                        boxShadow: `0 6px 18px ${theme.shadow}`,
                      }}
                    />
                    <div style={{ fontWeight: 600, color: theme.textPrimary }}>Cogie</div>
                  </div>
                </div>

                <h1
                  style={{
                    fontFamily: `"Playfair Display", serif`,
                    fontSize: 42,
                    margin: "8px 0 8px 0",
                    textAlign: "center",
                    color: theme.textPrimary,
                  }}
                >
                  Create Account
                </h1>

                <p style={{ textAlign: "center", color: theme.textSecondary, marginBottom: 28 }}>
                  Enter your details to sign up
                </p>

                <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, color: theme.textPrimary, fontWeight: 600 }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: `1px solid ${theme.border}`,
                        background: theme.background,
                        color: theme.textPrimary,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: 8, color: theme.textPrimary, fontWeight: 600 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: `1px solid ${theme.border}`,
                        background: theme.background,
                        color: theme.textPrimary,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: 8, color: theme.textPrimary, fontWeight: 600 }}>
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: `1px solid ${theme.border}`,
                        background: theme.background,
                        color: theme.textPrimary,
                        outline: "none",
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      padding: "12px 18px",
                      borderRadius: 12,
                      background: "#000",
                      color: "#fff",
                      fontWeight: 700,
                      border: "none",
                      width: "100%",
                      fontSize: 16,
                      boxShadow: `0 8px 20px rgba(0,0,0,0.12)`,
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </motion.button>

                  <p style={{ textAlign: "center", color: theme.textSecondary, marginTop: 6 }}>
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      style={{ color: theme.accent, background: "none", border: "none", fontWeight: 700 }}
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .split { flex-direction: column; gap: 18px; align-items: center; }
          .left-panel { width: 100%; min-height: 360px; border-radius: 22px; }
        }
      `}</style>
    </div>
  );
}
