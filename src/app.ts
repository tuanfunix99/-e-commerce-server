import express from 'express';
import log from './logger';
import dotenv from 'dotenv';
import './data/mongodb';
import { userRoutes, authRoutes, productRoutes } from './routes/all.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    log.info("Listening on port " + PORT);
})