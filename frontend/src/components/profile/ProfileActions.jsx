import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import EditProfileModal from "./EditProfileModal";

export default function ProfileActions({ user }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full px-6 py-2 font-extrabold text-sm select-none cursor-pointer"
        style={{
          backgroundColor: theme.accent,
          color: theme.surface,
        }}
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </motion.button>

      {/* Modal */}
      <EditProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        user={user}
      />
    </>
  );
}
