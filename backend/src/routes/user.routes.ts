import express from 'express';
import { updateUserProfileHandler } from '../controllers/user.controller';
import {registerUser, createUserHandler,createCourseHandler, createEventHandler, createFollowedEventHandler, createForumHandler, getAllCoursesHandler, getAllEventsHandler, getEventsByUserIdHandler, getFollowedEventsByUserIdHandler, getForumsByUserIdHandler, getUserHandler, getAllForumsCommentsHandler, getAllForumsHandler, createForumsCommentsHandler } from '../controllers/user.controller';
const router = express.Router();



// Ruta para crear un nuevo usuario
router.put('/update-profile', updateUserProfileHandler);
router.post('/users', createUserHandler);
router.post('/register', registerUser);
router.get('/users/:email', getUserHandler); 
router.get('/forums/:user_id', getForumsByUserIdHandler);
router.get('/forums', getAllForumsHandler);
router.get('/forumComments/:forum_id', getAllForumsCommentsHandler);
router.post('/forumComments', createForumsCommentsHandler);
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