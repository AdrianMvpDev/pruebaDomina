const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes');
const authMiddleware = require('./middlewares/authMiddleware');
const connectDB = require('./db');
const cors = require('cors');

const app = express();

// Conecta con la base de datos
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// Ruta protegida que utiliza el middleware de autenticación
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'This is a protected route' });
});

app.use('/api', routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));