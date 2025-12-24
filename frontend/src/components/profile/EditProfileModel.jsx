import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import {
  useLazyCheckEmailQuery,
  useLazyCheckUsernameQuery,
} from "../../features/auth/authApi";
import { useUpdateProfileMutation } from "../../features/profile/profileApi";
import { useAvailabilityCheck } from "../../hooks/useAvailabilityCheck";

export default function EditProfileModal({ isOpen, onClose, user }) {
  const { theme } = useTheme();
  const modalRef = useRef(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [form, setForm] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
    website: user.website || "",
    location: user.location || "",
    avatar: user.avatar || "",
    bannerImage: user.bannerImage || "",
  });

  const [checkUsername] = useLazyCheckUsernameQuery();
  const [checkEmail] = useLazyCheckEmailQuery();

  const usernameStatus = useAvailabilityCheck({
    value:
      form.username === user.username ? "" : form.username,
    checkFn: checkUsername,
    minLength: 3,
  });

  const emailStatus = useAvailabilityCheck({
    value:
      form.email === user.email ? "" : form.email,
    checkFn: checkEmail,
    minLength: 5,
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (usernameStatus === "taken") {
      toast.error("Username already taken");
      return;
    }

    if (emailStatus === "taken") {
      toast.error("Email already registered");
      return;
    }
    try {
      await updateProfile(form).unwrap();
      toast.success("Profile updated");
      onClose();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to update profile");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#000",
              zIndex: 998,
            }}
          />

          <motion.div
            ref={modalRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: theme.surface,
              color: theme.textPrimary,
              borderRadius: "18px",
              padding: "1.6rem 1.6rem",
              width: "95vw",
              maxWidth: "520px",
              zIndex: 999,
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "70vh",
              overflowY: "auto",
              position: "relative",
              transition: "background-color 0.5s, color 0.5s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  color: theme.accent,
                  margin: 0,
                }}
              >
                Edit Profile
              </h2>

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: theme.background,
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: theme.textSecondary,
                }}
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <div className="relative">
                <label style={{ color: theme.textSecondary, fontWeight: 600 }}>
                  Username
                </label>

                {usernameStatus !== "idle" && usernameStatus !== "checking" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-4 left-1 text-xs font-semibold"
                    style={{
                      color: usernameStatus === "available" ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {usernameStatus === "available"
                      ? "Username available"
                      : "Username already taken"}
                  </motion.div>
                )}

                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    marginTop: "0.4rem",
                    padding: "0.6rem 2.5rem 0.6rem 0.9rem",
                    borderRadius: "25px",
                    border:
                      usernameStatus === "available"
                        ? "1.5px solid #22c55e"
                        : usernameStatus === "taken"
                        ? "1.5px solid #ef4444"
                        : `1.5px solid ${theme.border}`,
                    background: "none",
                    color: theme.textPrimary,
                    outline: "none",
                  }}
                />

                <div className="absolute right-3 top-[55%] -translate-y-1/2">
                  {usernameStatus === "checking" && (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  )}
                  {usernameStatus === "available" && (
                    <CheckCircle size={18} className="text-green-500" />
                  )}
                  {usernameStatus === "taken" && (
                    <XCircle size={18} className="text-red-500" />
                  )}
                </div>
              </div>

              <div className="relative">
                <label style={{ color: theme.textSecondary, fontWeight: 600 }}>
                  Email
                </label>

                {emailStatus !== "idle" && emailStatus !== "checking" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-4 left-1 text-xs font-semibold"
                    style={{
                      color: emailStatus === "available" ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {emailStatus === "available"
                      ? "Email available"
                      : "Email already registered"}
                  </motion.div>
                )}

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    marginTop: "0.4rem",
                    padding: "0.6rem 2.5rem 0.6rem 0.9rem",
                    borderRadius: "25px",
                    border:
                      emailStatus === "available"
                        ? "1.5px solid #22c55e"
                        : emailStatus === "taken"
                        ? "1.5px solid #ef4444"
                        : `1.5px solid ${theme.border}`,
                    background: "none",
                    color: theme.textPrimary,
                    outline: "none",
                  }}
                />

                <div className="absolute right-3 top-[55%] -translate-y-1/2">
                  {emailStatus === "checking" && (
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  )}
                  {emailStatus === "available" && (
                    <CheckCircle size={18} className="text-green-500" />
                  )}
                  {emailStatus === "taken" && (
                    <XCircle size={18} className="text-red-500" />
                  )}
                </div>
              </div>
              {[
                ["Name", "name"],
                ["Location", "location"],
                ["Website", "website"],
                ["Avatar URL", "avatar"],
                ["Banner Image URL", "bannerImage"],
              ].map(([label, name]) => (
                <Field
                  key={name}
                  label={label}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                />
              ))}

              <div>
                <label style={{ color: theme.textSecondary, fontWeight: 600 }}>
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={form.bio}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    marginTop: "0.4rem",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "25px",
                    border: `1.5px solid ${theme.border}`,
                    background: "none",
                    color: theme.textPrimary,
                    resize: "none",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: theme.accent,
                  color: theme.surface,
                  border: "none",
                  borderRadius: "28px",
                  padding: "0.6rem 2rem",
                  fontWeight: 700,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  alignSelf: "flex-end",
                  marginTop: "1rem",
                }}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, ...props }) {
  const { theme } = useTheme();

  return (
    <div>
      <label style={{ color: theme.textSecondary, fontWeight: 600 }}>
        {label}
      </label>
      <input
        {...props}
        style={{
          width: "100%",
          marginTop: "0.4rem",
          padding: "0.6rem 0.9rem",
          borderRadius: "25px",
          border: `1.5px solid ${theme.border}`,
          background: "none",
          color: theme.textPrimary,
          outline: "none",
        }}
      />
    </div>
  );
}
