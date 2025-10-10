import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.4,
      ease: "linear",
    },
  },
};

export default function Spinner({ size = 32, color = "#3b82f6" }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      variants={spinnerVariants}
      animate="animate"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <circle cx="25" cy="25" r="20" strokeOpacity="0.25" />
      <path d="M45 25a20 20 0 00-40 0" />
    </motion.svg>
  );
}
