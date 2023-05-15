import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import { login, register } from './services/api';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import TaskList from './components/tasks/TaskList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email, password, onLoginSuccess) => {
    try {
      await login(email, password);
      setIsAuthenticated(true);
      onLoginSuccess();
    } catch (error) {
      console.error(error.message);
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = async (name, email, password, onRegisterSuccess) => {
    try {
      await register(name, email, password);
      alert('¡Registro exitoso! Ahora podra crear sus tareas');
      onRegisterSuccess();
    } catch (error) {
      console.error(error.message);
      alert('No se pudo registrar el usuario. Por favor intente nuevamente.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <TaskList onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<SignupForm onRegister={handleRegister}/>} />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route path="/tasks" element={<TaskList onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
