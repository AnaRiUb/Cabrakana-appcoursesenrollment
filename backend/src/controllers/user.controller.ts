import express from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma/prismaClient'

import { createUser, getAllCourses, getAllEvents, getAllForums, getEventFollowerByUserId, getUserByEmail } from '../services/user.service';
;

export const registerUser = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;
  try {
    // Validación de datos básicos
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verifica si el email ya está registrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        
      },
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const createUserHandler = async(req: express.Request, res: express.Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

export const getUserHandler = async  (req: express.Request, res: express.Response)  => {
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

export const getAllForumsHandler = async  (req: express.Request, res: express.Response)  => {
    try {
        const forums = await getAllForums();
        
        if (!forums || forums.length === 0) {
          return res.status(404).json({ error: 'No forums found' });
        }
    
        res.json(forums);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching forums' });
      }
  };
  
export const getAllEventsHandler = async  (req: express.Request, res: express.Response)  => {
    try {
        const events = await getAllEvents();
        
       if (!events || events.length === 0) {
          return res.status(404).json({ error: 'No events found' });
        }
        res.json(events);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
      }
  };

  
export const getEventsByUserIdHandler = async  (req: express.Request, res: express.Response)  => {

    const { user_id } = req.params;
    try {
        const events = await getEventFollowerByUserId(user_id);
        
       if (!events || events.length === 0) {
          return res.status(404).json({ error: 'No events found' });
        }
        res.json(events);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
      }
  };

  export const getAllCoursesHandler = async  (req: express.Request, res: express.Response)  => {
    try {
        const courses = await getAllCourses();
        
        if (!courses || courses.length === 0) {
          return res.status(404).json({ error: 'No courses found' });
        }
    
        res.json(courses);
      } catch (error) {
        res.status(500).json({ error: 'Error courses events' });
      }
  };