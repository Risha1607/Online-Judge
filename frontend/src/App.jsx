import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import ProblemPage from './components/ProblemPage';
import TopicProblemsPage from './components/TopicProblemsPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProblemDetailsPage from './components/ProblemDetails';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/problems" element={
            <ProtectedRoute>
              <ProblemPage />
            </ProtectedRoute>
          } />
          <Route path="/problems/topic/:topicKey" element={
            <ProtectedRoute>
              <TopicProblemsPage />
            </ProtectedRoute>
          } />
           <Route path="/problems/topic/:topicKey" element={
            <ProtectedRoute>
              <TopicProblemsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


