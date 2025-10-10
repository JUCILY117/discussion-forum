import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const containerVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function LoginPage() {
  const { theme } = useTheme();

  const bgStyle = {
    backgroundColor: theme.background,
    color: theme.textPrimary,
    minHeight: "calc(100vh - 92px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.4s, color 0.4s",
    overflow: "hidden",
  };

  const formContainer = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "stretch",
    maxWidth: "1000px",
    width: "100%",
    borderRadius: theme.borderRadius,
    backgroundColor: theme.surface,
    boxShadow: `0 10px 40px ${theme.shadow}`,
    overflow: "hidden",
  };

  const leftPanel = {
    background: theme.gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 2rem",
  };

  const rightPanel = {
    padding: "3rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const inputStyle = {
    backgroundColor: theme.background,
    color: theme.textPrimary,
    border: `1px solid ${theme.border}`,
    borderRadius: theme.borderRadius,
    padding: "0.8rem 1rem",
    width: "100%",
    transition: "border 0.25s",
  };

  return (
    <div style={bgStyle}>
      <motion.div
        style={formContainer}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          style={leftPanel}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
        >
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/secure-login-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--signup-password-protection-security-web-user-interface-pack-design-illustrations-5285487.png"
            alt="Abstract login visual"
            className="w-80 h-80 object-contain select-none pointer-events-none"
          />
        </motion.div>

        <motion.div
          style={rightPanel}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-6"
            style={{ color: theme.textPrimary }}
          >
            Sign in to Thredd
          </h2>
          <p
            className="text-base mb-10"
            style={{ color: theme.textSecondary }}
          >
            Welcome back! Log in to continue exploring discussions and sharing your ideas.
          </p>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Email or Username"
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
            />

            <motion.button
              type="submit"
              className="w-full py-3 rounded-full font-extrabold mt-2"
              style={{
                backgroundColor: theme.accent,
                color: theme.surface,
              }}
              whileHover={{
                scale: 1.03,
                backgroundColor: theme.accentHover,
              }}
              whileTap={{ scale: 0.96 }}
            >
              Login
            </motion.button>
          </form>

          <p
            className="mt-8 text-center text-sm font-medium"
            style={{ color: theme.textSecondary }}
          >
            New to Thredd?{" "}
            <Link to="/signup"
              style={{ color: theme.accent }}
              className="hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
