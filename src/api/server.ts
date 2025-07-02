import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customerRoutes from './routes/customerRoutes';
import utilityRoutes from './routes/utilityRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', customerRoutes);
app.use('/api', utilityRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
