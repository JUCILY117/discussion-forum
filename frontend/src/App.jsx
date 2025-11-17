import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { SocketProvider } from "./contexts/SocketContext";
import { useGetUserQuery } from "./features/auth/authApi";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ThreadsPage from "./pages/ThreadsPage";
import ViewThread from "./components/Threads/ViewThread";
import { Toaster } from "react-hot-toast";

function InnerApp() {
  const { theme } = useTheme();
  
  useGetUserQuery();

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
        <Route path="/threads" element={<ThreadsPage />} />
        <Route path="/threads/:threadId" element={<ViewThread />} />
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
    <SocketProvider>
      <ThemeProvider>
        <InnerApp />
      </ThemeProvider>
    </SocketProvider>
  );
}

export default App;
