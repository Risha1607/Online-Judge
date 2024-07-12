import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage'; // Import HomePage component
import LoginPage from './components/LoginPage';
import RegisterPage from './components/Register';
import ProblemPage from './components/ProblemPage';
import TopicProblemsPage from './components/TopicProblemsPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProblemDetailsPage from './components/ProblemDetailsPage';
import Leaderboard from './components/Leaderboard';
import Navbarcomp from './components/navbar';
import ContestPage from './components/ContestPage';
import ContestProblems from './components/ContestProblems';
import ProblemSolving from './components/ProblemSolving';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './admin/AdminDashboard';
import CreateProblem from './admin/CreateProblem';
import DeleteProblem from './admin/DeleteProblem';
import UpdateProblem from './admin/UpdateProblem';
import CreateContest from './admin/CreateContest';
import DeleteContest from './admin/DeleteContest';
import UpdateContest from './admin/UpdateContest';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbarcomp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
          <Route path="/problem/:problemId" element={
            <ProtectedRoute>
              <ProblemDetailsPage />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />
          <Route path="/contests" element={
            <ProtectedRoute>
              <ContestPage />
            </ProtectedRoute>
          } />
          <Route path="/contests/:contestId" element={
            <ProtectedRoute>
              <ContestProblems />
            </ProtectedRoute>
          } />
          <Route path="/contests/:contestId/problems/:problemTitle" element={
            <ProtectedRoute>
              <ProblemSolving />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/create-problem" element={
            <ProtectedRoute requiredRole="admin">
              <CreateProblem />
            </ProtectedRoute>
          } />
          <Route path="/admin/delete-problem" element={
            <ProtectedRoute requiredRole="admin">
              <DeleteProblem />
            </ProtectedRoute>
          } />
          <Route path="/admin/update-problem" element={
            <ProtectedRoute requiredRole="admin">
              <UpdateProblem />
            </ProtectedRoute>
          } />
          <Route path="/admin/create-contest" element={
            <ProtectedRoute requiredRole="admin">
              <CreateContest />
            </ProtectedRoute>
          } />
          <Route path="/admin/delete-contest" element={
            <ProtectedRoute requiredRole="admin">
              <DeleteContest />
            </ProtectedRoute>
          } />
          <Route path="/admin/update-contest" element={
            <ProtectedRoute requiredRole="admin">
              <UpdateContest />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
