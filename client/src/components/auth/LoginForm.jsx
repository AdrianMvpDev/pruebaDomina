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
      main: '#1722ff', // cambia el color secundario
    },
  },
});

function LoginForm({ handleLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginSubmit(email, password, () => {
      window.location.href = "/tasks";
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <form className="form-user" onSubmit={handleSubmit}>
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
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" variant="contained">
              Iniciar sesión
            </Button>
            <h5>¿No tienes cuenta? <Link to="/register">Registrate</Link></h5>
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;
