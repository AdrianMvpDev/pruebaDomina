import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../assets/styles/auth/login.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1722ff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1722ff",
    },
  },
});

function RegisterForm({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(name, email, password, () => {
      window.location.href = "/tasks";
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <form  className="form-user" onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-background"></div>
          <div className="form-login">
            <div className="form-control">
              <h1>Registrarse</h1>
              <TextField
                id="name"
                label="Nombre:"
                variant="outlined"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>{" "}
            <div className="form-control">
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
              />
            </div>{" "}
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
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" variant="contained">
              Registrarse
            </Button>
            <h5>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login">Iniciar sesión</Link>
            </h5>
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default RegisterForm;
