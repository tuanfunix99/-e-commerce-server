

import Product from '../models/product.model';
import { Request, Response } from 'express';


export const getAllProducts = async (req: Request, res: Response) => {
    res.send('All Product');
}