import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { db_connection } from './config/database.js';

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// app.use(`${API_URL}/auth`, authRoutes);
// app.use(`${API_URL}/usuarios`, userRoutes);
// app.use(`${API_URL}/estados`, statusRoutes);
// app.use(`${API_URL}/proyectos`, projectRoutes);
// app.use(`${API_URL}/tareas`, taskRoutes);
// app.use(`${API_URL}/recursos`, resourcesRoutes);
// app.use(`${API_URL}/reportes`, reportesRoutes);

// import('./hooks/eventTracker.js');

// app.use(errorHandler);

app.listen(port, () => {
  db_connection();
  console.log(`Servidor corriendo en http://localhost:${port}`);
});