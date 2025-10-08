// src/styles/theme.js
const lightTheme = {
  background: "#FFFFFF",
  surface: "#F9FAFB",
  border: "hsl(220, 16%, 90%)",
  textPrimary: "#111827",
  textSecondary: "#4B5563",
  accent: "#3B82F6",
  accentHover: "#2563EB",
  shadow: "rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  spacing: "1rem",
  gradient: "linear-gradient(120deg, #ffdce0 0%, #ffeada 100%)",
};

const darkTheme = {
  background: "#000000",
  surface: "#121212",
  border: "hsl(220, 15%, 25%)",
  textPrimary: "#E4E4E7",
  textSecondary: "#9CA3AF",
  accent: "#60A5FA",
  accentHover: "#3B82F6",
  shadow: "rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  spacing: "1rem",
  gradient: "linear-gradient(120deg, #23232c 0%, #16161a 100%)",
};

export { lightTheme, darkTheme };
