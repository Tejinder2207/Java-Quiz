// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResultsPage from "./pages/ResultsPage";
import QuizSelectionPage from "./pages/QuizSelectionPage";  
import QuizPage from "./pages/QuizPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

import UserLogin from "./pages/UserLogin";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageQuestions from "./admin/ManageQuestions";
import ResultsTable from "./admin/components/ResultsTable.jsx";
import ExportPDFButton from "./admin/components/ExportPDFButton.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* ✅ Navbar spans full width */}
        <Navbar />

        {/* ✅ Removed "container" so pages can take full width */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz-selection" element={<QuizSelectionPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<UserDashboard />} />

          {/* ===== Admin Routes ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/manage-questions" element={<ManageQuestions />} />
          <Route
            path="/admin/view-results"
            element={
              <ProtectedRoute role="admin">
                <ResultsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/export-results"
            element={
              <ProtectedRoute role="admin">
                <ExportPDFButton />
              </ProtectedRoute>
            }
          />

          {/* ===== 404 Fallback ===== */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
