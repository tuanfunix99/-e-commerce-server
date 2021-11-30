import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import log from "../logger";

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = res.locals.userDecode;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    res.locals.user = user;
    next();
  } catch (error: any) {
    log.error({ error: error.message }, "Error user middleware");
    res.status(500).send(error.message);
  }
};

export const activeAccountMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    if(!user.active){
      throw new Error("Account not active, please check your email");
    }
    next();
  } catch (error: any) {
  log.error({ error: error.message }, "Error active middleware");
    res.status(401).send(error.message);
  }
}

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user.isAdmin) {
      throw new Error("Access denied");
    }
    next();
  } catch (error: any) {
    log.error({ error: error.message }, "Error admin middleware");
    res.status(401).send(error.message);
  }
};
