import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

export const registerMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      log.error({ error: error.message }, "Error register");
      res.status(500).send(error.message);
    }
  };

export const loginMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      log.error({ error: error.message }, "Error login");
      res.status(500).send(error.message);
    }
  };
