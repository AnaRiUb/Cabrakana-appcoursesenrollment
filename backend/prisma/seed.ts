import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un usuario
  const user = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'hashed_password', // Asegúrate de que la contraseña esté correctamente cifrada
      gender: 'Hombre',
      profile_image: 'profile_image.png',
      description: 'mi descripcion',
      age: 20,
      age_visible: true,
    },
  });

  // Crear un curso
  const course = await prisma.course.create({
    data: {
      title: 'Curso de Programación en TypeScript',
      description: 'Un curso completo sobre TypeScript.',
      price: 99.99,
      course_code: 'TS101',
    },
  });

  // Crear un foro
  const forum = await prisma.forum.create({
    data: {
      title: 'Foro de JavaScript',
      description: 'Un foro para discutir sobre JavaScript y frameworks.',
      created_by: user.user_id,  // El id del creador es el usuario creado previamente
    },
  });

  // Crear un comentario en el foro
  const forumComment = await prisma.forumComment.create({
    data: {
      forum_id: forum.forum_id,
      user_id: user.user_id,
      comment_text: '¡Este es un gran foro! Estoy aprendiendo mucho.',
      comment_date: new Date(),
      comment_time: new Date(),
    },
  });

  // Crear un evento
  const event = await prisma.event.create({
    data: {
      title: 'Evento de JavaScript',
      description: 'Un evento para aprender sobre las últimas novedades de JavaScript.',
      event_date: new Date(),
      location: 'Auditorio Central',
      created_by: user.user_id,
    },
  });

  // Seguir el foro y el evento
  await prisma.forumFollower.create({
    data: {
      forum_id: forum.forum_id,
      user_id: user.user_id,
    },
  });

  await prisma.eventFollower.create({
    data: {
      event_id: event.event_id,
      user_id: user.user_id,
    },
  });

  console.log('Base de datos poblada con éxito!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });