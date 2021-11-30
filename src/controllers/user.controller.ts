import { RequestHandler } from "express";``
import User from "../models/user.model";
import log from "../logger";
import { omit } from "lodash";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error: any) {
    log.error({ error: error.message }, "Error User");
    res.status(401).send(error.message);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    log.error({ error: error.message }, "Error User");
    res.status(401).send(error.message);
  }
};

export const loadUser: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user;
    res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    log.error({ error: error.message }, "Error User");
    res.status(401).send(error.message);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = req.body;
  try {
    await User.findByIdAndUpdate(id, { $set: user }, { new: true });
    res.status(200).send(true);
  } catch (error: any) {
    log.error({ error: error.message }, "Error User");
    res.status(401).send(error.message);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send(true);
  } catch (error: any) {
    log.error({ error: error.message }, "Error User");
    res.status(401).send(error.message);
  }
};
