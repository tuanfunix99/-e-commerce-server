import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import log from "../logger";

export const createProductMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
      try {
          await schema.validate({
              body: req.body,
          })
          next();
      } catch (error: any) {
          log.error({error: error.message}, 'Error product');
          res.status(500).send(error.message);
      }
  };
