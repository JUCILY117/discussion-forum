import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Navbar from "../components/Navbar"; // ✅ Added Navbar

export default function LoginPage() {
  const { theme, isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // two gradient variants: light and dark -> tuned to match screenshot
  const leftGradient = isDark
    ? "linear-gradient(130deg,#170021 0%,#3b0d57 30%, #1b2a6b 60%, #02040a 100%)"
    : "linear-gradient(130deg,#ff2fb2 0%, #7a2bff 28%, #2b6bff 60%, #020409 100%)";

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
        {/* Fonts */}
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
              {/* thick rounded white stroke (inner) */}
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

              {/* decorative subtle overlays to mimic the swirls */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: -120,
                  bottom: -80,
                  width: 520,
                  height: 520,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06), transparent 15%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.06), transparent 25%)",
                  transform: "rotate(8deg)",
                  filter: "blur(16px)",
                  opacity: 0.9,
                  pointerEvents: "none",
                }}
              />

              {/* small caption top-left */}
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
                  <div style={{ color: "rgba(255,255,255,0.92)", fontSize: 12, letterSpacing: 2 }}>
                    A W I S E &nbsp; Q U O T E
                  </div>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)", marginLeft: 10 }} />
                </div>
              </div>

              {/* center decorative area */}
              <div aria-hidden style={{ zIndex: 1, flex: 1, marginTop: 12, marginBottom: 12 }} />

              {/* quote bottom-left */}
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
                  Get
                  <br />
                  Everything
                  <br />
                  You Want
                </h2>
                <p style={{ marginTop: 14, color: "rgba(255,255,255,0.85)", maxWidth: 380, fontSize: 14 }}>
                  You can get everything you want if you work hard, trust the process, and stick to the plan.
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
                {/* logo */}
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
                    fontSize: 48,
                    margin: "8px 0 8px 0",
                    textAlign: "center",
                    color: theme.textPrimary,
                  }}
                >
                  Welcome Back
                </h1>

                <p style={{ textAlign: "center", color: theme.textSecondary, marginBottom: 32 }}>
                  Enter your email and password to access your account
                </p>

                <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 10, color: theme.textPrimary, fontWeight: 600 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `1px solid ${theme.border}`,
                        background: theme.background,
                        color: theme.textPrimary,
                        outline: "none",
                        fontSize: 14,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: 10, color: theme.textPrimary, fontWeight: 600 }}>
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        style={{
                          width: "100%",
                          padding: "14px 44px 14px 16px",
                          borderRadius: 12,
                          border: `1px solid ${theme.border}`,
                          background: theme.background,
                          color: theme.textPrimary,
                          outline: "none",
                          fontSize: 14,
                        }}
                      />
                      <button
                        type="button"
                        aria-hidden
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          color: theme.textSecondary,
                          fontSize: 16,
                        }}
                      >
                        👁
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 10, color: theme.textSecondary }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: 14 }}>Remember me</span>
                    </label>

                    <button
                      type="button"
                      style={{ background: "transparent", border: "none", color: theme.textSecondary, cursor: "pointer" }}
                    >
                      Forgot Password
                    </button>
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
                    Sign In
                  </motion.button>

                  <p style={{ textAlign: "center", color: theme.textSecondary, marginTop: 4 }}>
                    Don’t have an account?{" "}
                    <button
                      onClick={() => navigate("/signup")}
                      style={{ color: theme.accent, background: "none", border: "none", fontWeight: 700, cursor: "pointer" }}
                    >
                      Sign Up
                    </button>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* responsive */}
      <style>{`
        @media (max-width: 980px) {
          .split { flex-direction: column; gap: 18px; align-items: center; }
          .left-panel { width: 100%; min-height: 360px; border-radius: 22px; }
        }
      `}</style>
    </div>
  );
}
