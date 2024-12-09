import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

/**
 * Crea un nuevo usuario en la base de datos.
 * @param username - Nombre de usuario.
 * @param email - Correo electrónico del usuario.
 * @param password - Contraseña del usuario.
 * @returns El usuario creado.
 */
export const createUser = async (username: string, email: string, password: string) => {
  // Hashear la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

/**
 * Obtiene un usuario por su correo electrónico.
 * @param email - Correo electrónico del usuario.
 * @returns El usuario encontrado o `null` si no existe.
 */



export const createCourse = async (
  course_id: string,
  title: string,
  description: string,
  image_url: string | null,
  price: number,
  course_code: string,
  created_at: Date,
) => {
  const newCourse = await prisma.course.create({
    data: {
    course_id,
  title,
  description,
  image_url,
  price,
  course_code,
  created_at
},
  });

  return newCourse;
};


export const createForum = async (
  forum_id: string,
  title: string,
  description: string,
  created_by: string,
  created_at: Date,
) => {
  const newForum = await prisma.forum.create({
    data:{
    forum_id,
    title,
    description,
    created_by,
    created_at
  },
  });

  return newForum;
};

export const createEvent = async ( event_id: string, title: string, description: string,
  event_date: Date,
  event_image_url: string,
  location: string,
  latitude: number,
  longitude: number,
  created_by: string,
  created_at: Date,
) => {
  const newEvent = await prisma.event.create({
    data: {
      event_id,
      title,
      description,
      event_date,
      event_image_url,
      location,
      latitude,
      longitude,
      created_by,
      created_at
    },
  });

  return newEvent;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
export const getAllForums = async () => {
    const forums = await prisma.forum.findMany();
  return forums;
  };
  export const getAllEvents = async () => {
    const events = await prisma.event.findMany();
  return events;
  };

  export const getEventFollowerByUserId = async  (user_id: string) => {
    const eventsFollowed = await prisma.eventFollower.findMany({
        where: {
            user_id,
        },
      });
    
      return eventsFollowed;
  };

  export const getAllCourses = async () => {
    const courses = await prisma.course.findMany();
  return courses;
  };
export const updateUser = async (userId: string, data: Partial<{ username: string; email: string; password: string }>) => {
  if (data.password) {
    // Hashear la nueva contraseña si se incluye
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: {
      user_id: userId,
    },
    data,
  });

  return updatedUser;
};

/**
 * Elimina un usuario por su ID.
 * @param userId - ID del usuario.
 * @returns El usuario eliminado.
 */
export const deleteUser = async (userId: string) => {
  const deletedUser = await prisma.user.delete({
    where: {
      user_id: userId,
    },
  });

  return deletedUser;
};
