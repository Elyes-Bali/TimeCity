import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuthStore } from "./store/authStore";
import NotFound from "./pages/NotFound";
import AdminEquations from "./Admin/AdminEquations";
import Instructions from "./user/Instructions";
import EquationGame from "./user/EquationGame";
import PointsOverview from "./user/PointsOverview";
import ClockMode from "./clocks/ClockMode";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // 1. Check for Authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check for Email Verification
  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // 3. Check for Admin Role
  if (user && user.role !== "admin") {
    // Show an error and redirect unauthorized users to the home page
    toast.error("Access Denied: Admin privileges required.");
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the child component
  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
      <Routes>
        {/* FULL SCREEN PAGES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Instructions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-equations"
          element={
            <AdminRoute>
              <AdminEquations />
            </AdminRoute>
          }
        />

        <Route path="/equations-game" element={<ProtectedRoute><EquationGame /></ProtectedRoute>} />

        <Route path="/family-zone" element={<ProtectedRoute><PointsOverview /></ProtectedRoute>} />

        <Route path="/clock-mode" element={<ProtectedRoute><ClockMode /></ProtectedRoute>} />

        {/* END ADMIN ROUTES */}

        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <AuthLayout>
                <SignUpPage />
              </AuthLayout>
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <AuthLayout>
                <ForgotPasswordPage />
              </AuthLayout>
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <AuthLayout>
                <ResetPasswordPage />
              </AuthLayout>
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/verify-email"
          element={
            <AuthLayout>
              <EmailVerificationPage />
            </AuthLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </>
  );
}

/* ------------------ AUTH PAGE LAYOUT ------------------ */
function AuthLayout({ children }) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br 
      from-gray-900 via-green-900 to-emerald-900
      flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      {children}
    </div>
  );
}

export default App;
