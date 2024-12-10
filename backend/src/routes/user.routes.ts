import express from 'express';

import { createUserHandlercreateCourseHandler, createEventHandler, createFollowedEventHandler, createForumHandler, createUserHandler, getAllCoursesHandler, getAllEventsHandler, getAllForumsHandler, getEventsByUserIdHandler, getFollowedEventsByUserIdHandler, getForumsByUserIdHandler, getUserHandler } from '../controllers/user.controller';
const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/users', createUserHandler);
router.post('/register', registerUser);
router.get('/users/:email', getUserHandler); 
router.get('/forums/:user_id', getForumsByUserIdHandler);
router.get('/forums', getAllForumsHandler);
router.get('/events', getAllEventsHandler); 
router.get('/courses', getAllCoursesHandler); 
router.get('/events/:user_id', getEventsByUserIdHandler); 
router.get('/events/followed/:user_id', getFollowedEventsByUserIdHandler); 
router.post('/events/follow', createFollowedEventHandler); 
router.post('/events', createEventHandler);
router.post('/forums', createForumHandler);
router.post('/courses', createCourseHandler);
//router.post('/api/auth/google', get)

export default router;