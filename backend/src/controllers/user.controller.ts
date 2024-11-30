import express from 'express';
import { createUser, getAllCourses, getAllEvents, getAllForums, getEventFollowerByUserId, getUserByEmail } from '../services/user.service';


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