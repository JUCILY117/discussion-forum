import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useLogoutMutation } from "../features/auth/authApi";
import { useGetProfileQuery } from "../features/profile/profileApi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  const { data } = useGetProfileQuery(undefined, { skip: !isLoggedIn });
  
  const user = data?.user;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("isLoggedIn");
      window.location.href="/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
        <span style={{ color: theme.accent }}>Thredd</span>
      </div>

      <nav className="flex items-center space-x-8 text-lg">
        {[{ name: "Threads", path: "/threads" }].map((link) => (
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
        {user ? (
          <>
            <div
              className="flex items-center cursor-pointer space-x-3"
              onClick={() => navigate("/profile")}
              title={`Logged in as ${user.username}`}
            >
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random&size=64`}
                alt={`${user.username} avatar`}
                className="w-8 h-8 rounded-full object-cover"
                draggable={false}
              />
              <span style={{ color: theme.textPrimary, fontWeight: "600" }}>
                {user.username}
              </span>
            </div>
            <motion.button
              className="bg-transparent shadow-none border-none outline-none focus:outline-none cursor-pointer"
              style={{ backgroundColor: "transparent", boxShadow: "none", border: "none" }}
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleLogout} disabled={isLoggingOut}
              title="Log Out"
            >
              <RiLogoutCircleLine  size={28} style={{ color: theme.accent }}/>
            </motion.button>
          </>
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
          className="rounded-full bg-transparent shadow-none border-none outline-none focus:outline-none cursor-pointer"
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
