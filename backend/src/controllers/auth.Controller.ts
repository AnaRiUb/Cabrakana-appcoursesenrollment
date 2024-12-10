import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../services/user.service';

const client = new OAuth2Client('462617646895-lj8nfm7e4vs8s18setd6oj8g5oj8qr4v.apps.googleusercontent.com');

// Handler para crear un usuario si no existe, o iniciar sesión si ya existe
export const createUserHandler = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    // Verificar el token de Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '462617646895-lj8nfm7e4vs8s18setd6oj8g5oj8qr4v.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
      return res.status(400).json({ message: 'Invalid Google token' });
    }

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await getUserByEmail(payload.email!);
    if (existingUser) {
      // Si el usuario ya existe, generar un JWT y devolverlo
      const jwtToken = jwt.sign({ email: payload.email, googleId: payload.sub }, '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', { expiresIn: '1h' });
      return res.json({ token: jwtToken });
   
    }

    // Si no existe, crear un nuevo usuario
    const newUser = await createUser(payload.name!, payload.email!, payload.sub);  // Aquí creamos el usuario sin necesidad de un password
    const jwtToken = jwt.sign({ email: newUser.email, googleId: newUser.google_id }, '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', { expiresIn: '1h' });

    return res.status(201).json({ token: jwtToken });

  } catch (error) {
    console.error('Error al procesar el token de Google o crear el usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener usuario por email
export const getUserHandler = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};
