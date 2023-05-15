import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { login } from "../../services/authService";

function LoginContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (email, password) => {
    setIsSubmitting(true);
    login(email, password)
      .then(() => {
        window.location.href = "/tasks";
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };

  return <LoginForm onSubmit={handleLogin} isSubmitting={isSubmitting} />;
}

export default LoginContainer;
