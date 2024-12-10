import express from 'express';
import { followEvent, getFollowedEvents } from '../controllers/event.Controller';

const router = express.Router();

// Ruta para seguir un evento
router.post('/:eventId/follow', followEvent);

// Ruta para obtener eventos seguidos por un usuario
router.get('/followed/:userId', getFollowedEvents);

router.get("/users/:user_id/followed-events", async (req: Request, res: Response) => {
    const { user_id } = req.params;
  
    try {
      const followedEvents = await prisma.eventFollowers.findMany({
        where: { user_id },
        include: { event: true },
      });
  
      res.status(200).json(followedEvents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los eventos seguidos." });
    }
  });



export default router;
