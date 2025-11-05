import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

export default function SignupLeftPanel() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  const carouselItems = useMemo(
    () => [
      {
        title: (
          <>
            Join the <span style={{ color: theme.accent }}>Thredd</span> community
          </>
        ),
        subtitle: "Create your profile and start meaningful conversations.",
      },
      {
        title: (
          <>
            Connect with <span style={{ color: theme.accent }}>curious minds</span>
          </>
        ),
        subtitle: "Discover people who love sharing and learning together.",
      },
      {
        title: (
          <>
            Start your <span style={{ color: theme.accent }}>journey</span> today
          </>
        ),
        subtitle: "Ask, reply, and grow with a thriving network of thinkers.",
      },
    ],
    [theme.accent]
  );

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % carouselItems.length),
      5000
    );
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <motion.div
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(145deg, ${theme.accent}33 0%, ${theme.surface} 90%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "3rem 2rem",
        color: theme.textPrimary,
        minHeight: "100%",
      }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-20%",
          width: "180%",
          height: "180%",
          background: `radial-gradient(circle at 30% 40%, ${theme.accent}1f 0%, transparent 60%)`,
          filter: "blur(60px)",
          zIndex: 1,
          opacity: 0.9,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            zIndex: 2,
            maxWidth: "80%",
            userSelect: "none",
          }}
        >
          <h1
            style={{
              fontSize: "2.4rem",
              fontWeight: "900",
              lineHeight: 1.15,
              marginBottom: "1rem",
              color: theme.textPrimary,
            }}
          >
            {carouselItems[index].title}
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 500,
              opacity: 0.85,
              lineHeight: 1.6,
              margin: 0,
              color: theme.textPrimary,
            }}
          >
            {carouselItems[index].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "2rem",
          zIndex: 2,
        }}
      >
        {carouselItems.map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: "24px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: i === index ? theme.accent : `${theme.accent}66`,
            }}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-15%",
          width: "60%",
          height: "60%",
          background: `radial-gradient(circle at 30% 30%, ${theme.accent}55 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 0,
          opacity: 0.7,
        }}
      />
    </motion.div>
  );
}
