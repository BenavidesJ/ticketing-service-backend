import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { db_connection } from './config/database.js';
import { API_URL } from './common/strings.js';
import securityRoutes from "./routes/seguridad.route.js"
import ticketsRoutes from "./routes/tiquetes.route.js"
import estadoRoutes from "./routes/estado.route.js";

dotenv.config();

const app = express();
const port = process.env.APP_PORT;


app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_URL}/auth`, securityRoutes);
app.use(`${API_URL}/ticket`, ticketsRoutes);
app.use(`${API_URL}/estado`, estadoRoutes);

// import('./hooks/eventTracker.js');

// app.use(errorHandler);

app.listen(port, () => {
  db_connection();
  console.log(`Servidor corriendo en http://localhost:${port}`);
});