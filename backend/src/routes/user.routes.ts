import express from 'express';
import { createUserHandler, getAllCoursesHandler, getAllEventsHandler, getAllForumsHandler, getEventsByUserIdHandler, getUserHandler, registerUser } from '../controllers/user.controller'; // Importa los controladores

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/users', createUserHandler);
router.post('/register', registerUser);

// Ruta para obtener un usuario por su email
router.get('/users/:email', getUserHandler); // Utiliza el parámetro email en la URL
router.get('/forums', getAllForumsHandler); // Utiliza el parámetro email en la URL
router.get('/events', getAllEventsHandler); // Utiliza el parámetro email en la URL
router.get('/courses', getAllCoursesHandler); // Utiliza el parámetro email en la URL
router.get('/eventsFollowed/:user_id', getEventsByUserIdHandler); // Utiliza el parámetro email en la URL
//router.post('/api/auth/google', get)
export default router;