import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { FeatureSection } from "./components/FeatureSection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./pages/login";
import { AuthProvider } from "./context/AtuhContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeatureSection />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              {/* Protect the Dashboard route */}
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
            </Routes>
          </main>
          <footer className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500">© 2023 Moreyeahs. All rights reserved.</p>
            </div>
          </footer>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
