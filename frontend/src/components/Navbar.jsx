import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header
      style={{
        backgroundColor: theme.surface,
        boxShadow: `0 2px 8px ${theme.shadow}`,
        borderRadius: theme.borderRadius,
        color: theme.textPrimary,
      }}
      className="flex items-center justify-between px-8 py-6 sticky top-0 z-50 backdrop-blur-md select-none"
    >
      <div className="font-extrabold text-3xl cursor-default">
        Thredd
      </div>
      <nav className="flex items-center space-x-8 text-lg">
        {["Home", "Threads", "Login"].map((link) => (
          <a
            key={link}
            href="#"
            className="relative font-semibold hover:underline"
            style={{ color: theme.textPrimary }}
          >
            {link}
          </a>
        ))}
        <motion.button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full bg-transparent shadow-none border-none outline-none focus:outline-none cursor-pointer"
          style={{ backgroundColor: "transparent", boxShadow: "none", border: "none" }}
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.92 }}
        >
          {isDark
            ? <MdLightMode size={28} style={{ color: theme.accent }} />
            : <MdDarkMode size={28} style={{ color: theme.accent }} />}
        </motion.button>
      </nav>
    </header>
  );
}
