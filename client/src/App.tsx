import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegistrationPage from './components/RegistrationPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import './App.css';
import HomePage from "./components/HomePage";
import LogoutButton from "./components/LogoutButton";
const App: React.FC = () => {
  return (
      <AuthProvider>
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
                {/*<Route path="/" element={<HomePage />} />*/}
                <Route path="/register" element={<RegistrationPage />} />

            </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;
