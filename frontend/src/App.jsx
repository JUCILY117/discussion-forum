import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ThreadsPage from "./pages/ThreadsPage";
import { Toaster } from "react-hot-toast";

function InnerApp() {
  const { theme } = useTheme();

  const toastStyle = {
    background: theme.surface,
    color: theme.textPrimary,
    boxShadow: `0 4px 12px ${theme.shadow}`,
    borderRadius: theme.borderRadius,
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="threads" element={<ThreadsPage />} />
      </Routes>
      <Toaster
        toastOptions={{
          style: toastStyle,
          success: {
            iconTheme: {
              primary: theme.accent,
              secondary: theme.surface,
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: theme.surface,
            },
          },
        }}
        position="bottom-right"
        reverseOrder={false}
      />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <InnerApp />
    </ThemeProvider>
  );
}

export default App;
