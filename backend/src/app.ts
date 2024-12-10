import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createUserHandler } from './controllers/auth.Controller';


const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

app.use(express.json());
app.use('', userRoutes);
app.post('/api/auth/google', createUserHandler);

app.post('/events/follow', (req, res) => {

  const { user_id, event_id } = req.body;
  res.json({ message: 'Has seguido el evento con éxito.' });
});

app.delete('/events/follow', (req, res) => {
  const { user_id, event_id } = req.body;
  res.json({ message: 'Has dejado de seguir el evento.' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
