import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useRegisterMutation } from "../features/auth/authApi";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";
import SignupLeftPanel from "../components/Auth/SignupLeftPanel";

const containerVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function SignupPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form).unwrap();
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed. Try again.");
    }
  };

  const bgStyle = {
    backgroundColor: theme.background,
    color: theme.textPrimary,
    minHeight: "calc(100vh - 88px)",
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
    maxWidth: "1100px",
    width: "100%",
    borderRadius: theme.borderRadius,
    backgroundColor: theme.surface,
    boxShadow: `0 10px 40px ${theme.shadow}`,
    overflow: "hidden",
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
    outline: "none",
    boxShadow: "none",
  };

  return (
    <div style={bgStyle}>
      <motion.div
        style={formContainer}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <SignupLeftPanel />

        <motion.div
          style={rightPanel}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-6"
            style={{ color: theme.textPrimary }}
          >
            Create your account
          </h2>
          <p
            className="text-base mb-10"
            style={{ color: theme.textSecondary }}
          >
            Join the Thredd community — ask, share, and connect with people who
            love learning as much as you do.
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              style={inputStyle}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="username@domain"
              value={form.email}
              onChange={onChange}
              style={inputStyle}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="••••••••••••"
              value={form.password}
              onChange={onChange}
              style={inputStyle}
              required
            />

            <motion.button
              type="submit"
              className="w-full py-3 rounded-full font-extrabold mt-2 flex justify-center items-center gap-4"
              style={{
                backgroundColor: theme.accent,
                color: theme.surface,
              }}
              whileHover={{ scale: 1.03, backgroundColor: theme.accentHover }}
              whileTap={{ scale: 0.96 }}
              disabled={isLoading}
            >
              {isLoading && <Spinner size={20} color={theme.surface} />}
              Sign Up
            </motion.button>
          </form>

          <p
            className="mt-8 text-center text-sm font-medium"
            style={{ color: theme.textSecondary }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: theme.accent }}
              className="hover:underline"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
