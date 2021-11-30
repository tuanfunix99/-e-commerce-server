import mongoose, { ConnectOptions } from 'mongoose';
import log from '../logger';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL as string;
    
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
} as ConnectOptions)
.then(() => {
    log.info("Connected to Mongodb");
})
.catch(err => {
    log.error({error: err.message}, "Failed to connect to Mongodb");
})