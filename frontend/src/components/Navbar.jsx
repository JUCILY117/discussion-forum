import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useGetUserQuery } from "../features/auth/authApi";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random&size=64";

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserQuery();

  const user = data?.user;

  return (
    <header
      style={{
        backgroundColor: theme.surface,
        boxShadow: `0 2px 8px ${theme.shadow}`,
        color: theme.textPrimary,
      }}
      className="flex items-center justify-between px-8 py-6 sticky top-0 z-50 backdrop-blur-md select-none"
    >
      <div
        className="flex items-center space-x-3 font-extrabold text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-10 h-10 object-contain"
          draggable={false}
        />
        <span style={{ color: theme.textPrimary }}>Thredd</span>
      </div>

      <nav className="flex items-center space-x-8 text-lg">
        {[{ name: "Home", path: "/" }, { name: "Threads", path: "/threads" }].map((link) => (
          <button
            key={link.name}
            onClick={() => navigate(link.path)}
            className="relative font-semibold hover:underline"
            style={{
              color: theme.textPrimary,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {link.name}
          </button>
        ))}

        {/* Show user info or login */}
        {user ? (
          <div
            className="flex items-center cursor-pointer space-x-3"
            onClick={() => navigate("/profile")} // Pending profile page
            title={`Logged in as ${user.username}`}
          >
            <img
              src={user.avatar || defaultAvatar}
              alt={`${user.username} avatar`}
              className="w-8 h-8 rounded-full object-cover"
              draggable={false}
            />
            <span style={{ color: theme.textPrimary, fontWeight: "600" }}>
              {user.username}
            </span>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="relative font-semibold hover:underline"
            style={{
              color: theme.textPrimary,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Login
          </button>
        )}

        <motion.button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full bg-transparent shadow-none border-none outline-none focus:outline-none cursor-pointer"
          style={{ backgroundColor: "transparent", boxShadow: "none", border: "none" }}
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.92 }}
        >
          {isDark ? (
            <MdLightMode size={28} style={{ color: theme.accent }} />
          ) : (
            <MdDarkMode size={28} style={{ color: theme.accent }} />
          )}
        </motion.button>
      </nav>
    </header>
  );
}
