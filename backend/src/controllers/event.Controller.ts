import { Request, Response } from "express";
import { prisma } from "../prisma/prismaClient"; // Ajusta según tu configuración

export const followEvent = async (req: Request, res: Response) => {
  const { user_id, event_id } = req.body;

  try {
    // Verificar si ya sigue el evento
    const existingFollow = await prisma.eventFollower.findFirst({
      where: { user_id, event_id },
    });

    if (existingFollow) {
      return res.status(400).json({ message: "Ya sigues este evento." });
    }

    // Crear el seguimiento
    const newFollow = await prisma.eventFollower.create({
      data: { user_id, event_id },
    });

    return res.status(201).json({ message: "Evento seguido con éxito.", newFollow });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al seguir el evento." });
  }
};
