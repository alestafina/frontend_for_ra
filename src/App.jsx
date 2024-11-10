import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ApprovalPage from "./pages/ApprovalPage/ApprovalPage";
import RejectedPage from "./pages/RejectedPage/RejectedPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import classes from "./App.module.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className={classes.app}>
        {isAuthenticated ? (
          <>
            <Header />
            <Nav onLogout={handleLogout} />
            <div className={classes.content}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/approval" element={<ApprovalPage />} />
                <Route path="/rejected" element={<RejectedPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
