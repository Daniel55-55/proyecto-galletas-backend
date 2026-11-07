import express from 'express';
import cors from 'cors';

import galletasChocolateRoutes from './routes/galletas-chocolate.routes';
import galletasVainillaRoutes from './routes/galletas-vainilla.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Autenticación: POST /api/v1/registro y POST /api/v1/login
app.use('/api/v1', authRoutes);

// Rutas separadas para cada tipo de galleta
app.use('/api/v1/galletas-chocolate', galletasChocolateRoutes);
app.use('/api/v1/galletas-vainilla', galletasVainillaRoutes);

app.use(errorHandler);

export default app;
