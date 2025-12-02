import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===== EXISTING IMPORTS =====
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import PersonalDashboard from "./pages/PersonalDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Timetable from "./pages/Timetable";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import InstitutionLogin from "./pages/InstitutionLogin";
import PersonalLogin from "./pages/PersonalLogin";
import PersonalSignup from "./pages/PersonalSignup";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";

// ===== NEW ADMIN IMPORTS =====
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLogin from "./pages/AdminLogin";
import DeveloperTrap from "./pages/DeveloperTrap";
import InstitutionAdminDashboard from "./pages/InstitutionAdminDashboard";
import DeveloperAdminDashboard from "./pages/DeveloperAdminDashboard";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import DeveloperProtectedRoute from "./routes/DeveloperProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  // Initialize dark mode on app load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("edulytics-dark-mode");
    const htmlElement = document.documentElement;

    if (savedDarkMode !== null) {
      const isDark = JSON.parse(savedDarkMode);
      if (isDark) {
        htmlElement.classList.remove("light");
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
        htmlElement.classList.add("light");
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        htmlElement.classList.remove("light");
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
        htmlElement.classList.add("light");
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Wrap both AuthProvider AND AdminAuthProvider */}
        <AuthProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <Routes>
                {/* ===== LANDING & PUBLIC ROUTES ===== */}
                <Route path="/" element={<Landing />} />

                {/* ===== EXISTING LOGIN ROUTES ===== */}
                <Route path="/institution/login" element={<InstitutionLogin />} />
                <Route path="/personal/login" element={<PersonalLogin />} />
                <Route path="/personal/signup" element={<PersonalSignup />} />

                {/* ===== NEW ADMIN LOGIN (UNIFIED) ===== */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/login" element={<AdminLogin />} />

                {/* ===== EXISTING DASHBOARD ROUTES ===== */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Explicit personal & institution dashboards */}
                <Route
                  path="/personal/dashboard"
                  element={
                    <ProtectedRoute>
                      <PersonalDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/institution/dashboard"
                  element={
                    <ProtectedRoute>
                      <InstitutionDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* ===== NEW ADMIN ROUTES ===== */}

                {/* Institution Admin Dashboard */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminProtectedRoute>
                      <InstitutionAdminDashboard />
                    </AdminProtectedRoute>
                  }
                />

                {/* Developer Entry Point (with trap) */}
                <Route path="/admin/developer/entry" element={<DeveloperTrap />} />
                <Route path="/admin/developer" element={<DeveloperTrap />} />

                {/* Developer Admin Dashboard */}
                <Route
                  path="/admin/developer/dashboard"
                  element={
                    <DeveloperProtectedRoute>
                      <DeveloperAdminDashboard />
                    </DeveloperProtectedRoute>
                  }
                />

                {/* ===== EXISTING APP ROUTES ===== */}
                <Route
                  path="/calendar"
                  element={
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/timetable"
                  element={
                    <ProtectedRoute>
                      <Timetable />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* ===== CATCH-ALL ROUTES ===== */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AdminAuthProvider>
        </AuthProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
