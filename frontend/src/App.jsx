import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
