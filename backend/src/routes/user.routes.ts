import express from 'express';
import { createCourseHandler, createEventHandler, createFollowedEventHandler, createForumHandler, createUserHandler, getAllCoursesHandler, getAllEventsHandler, getAllForumsHandler, getEventsByUserIdHandler, getFollowedEventsByUserIdHandler, getUserHandler } from '../controllers/user.controller'; // Importa los controladores

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/users', createUserHandler);

// Ruta para obtener un usuario por su email
router.get('/users/:email', getUserHandler); 
router.get('/forums', getAllForumsHandler);
router.get('/events', getAllEventsHandler); 
router.get('/courses', getAllCoursesHandler); 
router.get('/events/:user_id', getEventsByUserIdHandler); 
router.get('/events/followed/:user_id', getFollowedEventsByUserIdHandler); 
router.post('/events/follow', createFollowedEventHandler); 
router.post('/events', createEventHandler);
router.post('/forums', createForumHandler);
router.post('/courses', createCourseHandler);
export default router;