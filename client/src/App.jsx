import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import { login, register } from './services/api';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import TaskList from './components/tasks/TaskList';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

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
      setDialogMessage('¡Registro exitoso! Ahora podrá crear sus tareas.');
      setIsSuccessDialogOpen(true);
      onRegisterSuccess();
    } catch (error) {
      console.error(error.message);
      setDialogMessage('No se pudo registrar el usuario. Por favor intente nuevamente.');
      setIsErrorDialogOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleCloseSuccessDialog = () => {
    setIsSuccessDialogOpen(false);
  };

  const handleCloseErrorDialog = () => {
    setIsErrorDialogOpen(false);
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
            element={<LoginForm handleLoginSubmit={handleLogin} />}
          />
          <Route path="/tasks" element={<TaskList onLogout={handleLogout} />} />
        </Routes>
        <Dialog open={isSuccessDialogOpen} onClose={handleCloseSuccessDialog}>
          <DialogTitle>Éxito</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccessDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isErrorDialogOpen} onClose={handleCloseErrorDialog}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseErrorDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Router>
  );
}

export default App
