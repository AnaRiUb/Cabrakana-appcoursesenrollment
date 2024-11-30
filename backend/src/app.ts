import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import cors from 'cors'; // Para habilitar CORS si es necesario
import bodyParser from 'body-parser';

const app: Application = express(); // Asegúrate de usar el tipo Application de Express
// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para parsear JSON

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
