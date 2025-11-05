import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { FaHandsHelping } from "react-icons/fa";
import { RiDiscussFill } from "react-icons/ri";
import { BiSolidUpvote } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const features = [
  {
    title: "Ask Anything",
    desc: "Get help with bugs, concepts, or explore new topics across all fields.",
    icon: <FaHandsHelping />,
  },
  {
    title: "Start Discussions",
    desc: "Share ideas, career tips, or everyday curiosities with a friendly community.",
    icon: <RiDiscussFill />,
  },
  {
    title: "Vote on Replies",
    desc: "Highlight the best responses to help others find quick answers.",
    icon: <BiSolidUpvote />,
  },
];

const popularCategories = [
  "Programming",
  "Career",
  "Tech Trends",
  "Internships",
  "Science",
  "Art",
  "Sports",
  "Gaming",
  "Lifestyle",
];

const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const buttonHover = (accentHover) => ({
  scale: 1.06,
  backgroundColor: accentHover,
  boxShadow: `0 0 12px ${accentHover}`,
  transition: { duration: 0.35 },
});

const cardHover = (accentHover) => ({
  scale: 1.07,
  boxShadow: `0 20px 30px ${accentHover}`,
  transition: { duration: 0.3 },
});

const floating = {
  y: [0, -15, 0],
  transition: {
    repeat: Infinity,
    duration: 5,
    repeatType: "loop",
    ease: "easeInOut",
  },
};

export default function LandingPage() {
  const { theme } = useTheme();
  const navigate=useNavigate()

  const bgStyle = {
    backgroundColor: theme.background,
    color: theme.textPrimary,
    transition: "background-color 0.5s, color 0.5s",
    minHeight: "100vh",
    overflowX: "hidden",
  };
  const cardStyle = {
    backgroundColor: theme.surface,
    borderRadius: theme.borderRadius,
    boxShadow: `0 10px 25px ${theme.shadow}`,
    padding: theme.spacing,
    transition: "all 0.5s",
  };

  return (
    <div style={bgStyle}>

      <div className="pointer-events-none fixed top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 blur-3xl opacity-50 animate-blob" />
      <div className="pointer-events-none fixed bottom-[-120px] right-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-600 blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <motion.section
        className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-24"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex-1 space-y-8 max-w-xl">
          <h1
            className="text-6xl font-extrabold leading-tight cursor-default"
            style={{ color: theme.textPrimary }}
          >
            Join the Conversation, Explore the World
          </h1>
          <p
            className="text-xl leading-relaxed"
            style={{ color: theme.textPrimary }}
          >
            A forum for sharing questions, ideas, and knowledge — about anything and everything.
            Whether it's tech, lifestyle, science, or current events, be part of a welcoming community that learns and grows together.
          </p>
          <motion.button
             onClick={() => navigate("/login")}
             className="inline-block rounded-full px-6 py-2 font-extrabold shadow-lg cursor-pointer select-none"
             style={{ backgroundColor: theme.accent, color: theme.surface }}
             whileHover={buttonHover(theme.accentHover)}
             whileTap={{ scale: 0.95 }}
           >
             Get Started
           </motion.button>
        </div>
        <motion.div
          className="flex-1 flex justify-center mt-16 md:mt-0"
          animate={floating}
          aria-hidden="true"
        >
          <img
            src="https://media.istockphoto.com/id/1470146504/vector/geometric-illustration-of-a-crowd-of-human-figures.jpg?s=612x612&w=0&k=20&c=cucTsfEKLDLuHG3j8rlOya1WwYHtzxaZbw4XKNkcCtk="
            alt="Abstract community illustration"
            className="w-96 h-96 object-contain select-none pointer-events-none rounded-full drop-shadow-lg"
          />
        </motion.div>
      </motion.section>

      <motion.section
        className="max-w-6xl mx-auto px-6 md:px-12 py-16"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          className="text-4xl font-extrabold mb-12 text-center"
          style={{ color: theme.textPrimary }}
        >
          What You Can Do Here
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="rounded-3xl p-10 flex flex-col items-center text-center cursor-pointer transition-transform will-change-transform"
              style={cardStyle}
              whileHover={cardHover(theme.accentHover)}
              whileTap={{ scale: 0.97 }}
              tabIndex={0}
              role="group"
              aria-label={f.title}
            >
              <span className="text-7xl mb-6" aria-hidden="true">
                {f.icon}
              </span>
              <h3 className="text-2xl font-extrabold mb-3" style={{ color: theme.textPrimary }}>
                {f.title}
              </h3>
              <p className="text-lg max-w-xs" style={{ color: theme.textPrimary }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="max-w-5xl mx-auto px-6 md:px-12 py-16 text-center select-none"
          style={{
              background: theme.surface,
              borderRadius: theme.borderRadius,
              boxShadow: `0 8px 32px ${theme.shadow}`,
          }}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          >
        <h2
          className="text-3xl font-extrabold mb-10"
          style={{
          color: theme.textPrimary,
          textShadow: "0 2px 16px #fff2"
          }}
        >
            Popular Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-7 mt-2">
            {popularCategories.map((cat) => (
            <motion.span
                key={cat}
                className="rounded-full px-8 py-3 font-bold cursor-pointer shadow-lg text-lg"
                style={{
                backgroundColor: theme.accent,
                color: "#222",
                boxShadow: "0 8px 18px rgba(100, 166, 255, 0.20)",
                }}
                whileHover={{
                scale: 1.10,
                boxShadow: "0 1px 24px #65a6ff66",
                filter: "brightness(1.08)",
                }}
                whileTap={{ scale: 0.96 }}
            >
                {cat}
            </motion.span>
            ))}
        </div>
        </motion.section>

      <footer
        className="py-10 mt-16 text-center font-semibold select-none"
        style={{ color: theme.textPrimary }}
      >
        &copy; 2025 Thredd | A Place for Everyone to Share and Connect
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
