
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import log from '../logger';
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

export const verifyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenCookie = req.cookies.token;
        if(!tokenCookie){
            throw new Error('Cookie expired');
        }
        const userDecode = await verify(tokenCookie, PRIVATE_KEY);
        res.locals.userDecode = userDecode;
        next();
    } catch (error: any) {
        log.error({error: error.message}, "Error token");
        res.status(401).send(error.message);
    }
}