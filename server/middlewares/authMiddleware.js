const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token de la cabecera
  const token = req.header('Authorization');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secret');

    // Establecer la propiedad del usuario en la solicitud
    req.user = decoded.user;

    // Continuar con la siguiente función
    next();
  } catch (err) {
    // Si el token no es válido, enviar respuesta de error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;