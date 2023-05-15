import React, { useState } from "react";
import "../../assets/styles/auth/login.scss";
import { TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1722ff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: '#1722ff',
    },
  },
});

function LoginForm({ handleLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const regex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Ingrese un correo electrónico válido");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      handleLoginSubmit(email, password, () => {
        window.location.href = "/tasks";
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form className="form-user" onSubmit={handleSubmit} noValidate>
        <div className="form-container">
          <div className="form-background"></div>
          <div className="form-login">
            <div className="form-control">
              <h1>Iniciar sesión</h1>
              <TextField
                id="email"
                label="Correo electrónico:"
                variant="outlined"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                type="email"
                error={!!emailError}
                helperText={emailError}
              />
            </div>
            <div className="form-control">
              <TextField
                type="password"
                id="password"
                label="Contraseña:"
                variant="outlined"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
              />
            </div>
            <Button type="submit" variant="contained">
              Iniciar sesión
            </Button>
            <h5>
              ¿No tienes cuenta? <Link to="/register">Registrate</Link>
            </h5>
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;
