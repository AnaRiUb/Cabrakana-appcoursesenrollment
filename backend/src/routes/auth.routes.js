const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Ruta para login con Google
router.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    // Verifica el token con la API de Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // ID del cliente de Google
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Si el usuario no existe, crearlo
      user = await User.create({ email, password: 'google-auth' }); // Crear un usuario sin contraseña
    }

    const authToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token: authToken });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión con Google', error });
  }
});
