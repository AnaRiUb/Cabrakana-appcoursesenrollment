import express from 'express';
import { createCourse, createEvent, createEventFollower, createForum, createUser, getAllCourses, getAllEvents, getAllForums, getEventByUserId, getEventFollowerByUserId, getUserByEmail } from '../services/user.service';


// Handler para guardar eventos seguidos 
export const createFollowedEventHandler = async (req: express.Request, res: express.Response) => {
  const { user_id, event_id } = req.body;

  try {
    // Validar los datos antes de continuar
    if (!user_id || !event_id ) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear un foro utilizando la función correspondiente
    const newEventFollower = await createEventFollower(
     generateUUID(), // Si no se genera automáticamente en la base de datos
     event_id,
     user_id,
     new Date(), // Agregar la fecha de creación
    );

    // Responder con el foro creado
    res.status(201).json(newEventFollower);
  } catch (error) {
    console.error('Error creando el evento a seguir:', error);
    res.status(500).json({ error: 'Error creando el evento a seguir'});
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

// Handler para crear cursos
export const createCourseHandler = async (req:  express.Request, res:  express.Response) => {
  const { title, description, image_url, price, course_code } = req.body;

  try {
    // Validar los datos antes de continuar
    if (!title || !description || !price || !course_code) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear un curso utilizando la función correspondiente
    const newCourse = await createCourse(
     generateUUID(), // Si no se genera automáticamente en la base de datos
      title,
      description,
      image_url,
      parseFloat(price), // Convertir el precio a número
      course_code,
     new Date(), // Agregar la fecha de creación
    );

    // Responder con el curso creado
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creando curso:', error);
    res.status(500).json({ error: 'Error creando el curso' });
  }
};


// Handler para crear foros
export const createForumHandler = async (req: express.Request, res: express.Response) => {
  const { title, description, created_by } = req.body;

  try {
    // Validar los datos antes de continuar
    if (!title || !description || !created_by) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear un foro utilizando la función correspondiente
    const newForum = await createForum(
     generateUUID(), // Si no se genera automáticamente en la base de datos
      title,
      description,
      created_by,
     new Date(), // Agregar la fecha de creación
    );

    // Responder con el foro creado
    res.status(201).json(newForum);
  } catch (error) {
    console.error('Error creando foro:', error);
    res.status(500).json({ error: 'Error creando el foro' });
  }
};



// Handler para crear eventos
export const createEventHandler = async (req: express.Request, res: express.Response) => {
  const { title,  description, event_date, event_image_url, location, latitude,  longitude,  created_by  } = req.body;

  try {
    // Validar los datos antes de continuar (opcional, pero recomendado)
    if (!title || !description || !event_date || !location || !created_by) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear un evento utilizando la función correspondiente
    const newEvent = await createEvent(
      generateUUID(), // Si no se genera automáticamente en la base de datos
      title,
      description,
      new Date(event_date), // Asegúrate de convertir la fecha a un formato válido
      event_image_url,
      location,
      parseFloat(latitude), // Convertir a número si es necesario
      parseFloat(longitude), // Convertir a número si es necesario
      created_by,
      new Date(), // Agregar la fecha de creación
    );

    // Responder con el evento creado
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creando evento:', error);
    res.status(500).json({ error: 'Error creando el evento' });
  }
};

// Función auxiliar para generar un UUID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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
      const events = await getEventByUserId(user_id);
      
     if (!events || events.length === 0) {
        return res.status(404).json({ error: 'No events found' });
      }
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching events' });
    }
};

export const getFollowedEventsByUserIdHandler = async  (req: express.Request, res: express.Response)  => {

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