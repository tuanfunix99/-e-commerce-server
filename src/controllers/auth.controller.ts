import { RequestHandler } from "express";
import User from "../models/user.model";
import log from "../logger";
import { omit } from "lodash";
import nodemailer from "nodemailer";
import { verify } from "jsonwebtoken";
import { emailVerifyTemplate } from "../template/email";
import generator from "generate-password";

const ROOT_DOMAIN = process.env.ROOT_DOMAIN;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "minggu220399@gmail.com",
    pass: "jgprkdwwgdplxvyi",
  },
});

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.authentication(email, password);
    if (!user.active) {
      throw new Error("Account not active, please check your email");
    }
    const token = user.setToken();
    res.clearCookie("token");
    res.cookie("token", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).send(token);
  } catch (error: any) {
    log.error({ error: error.message }, "Error login");
    res.status(401).send(error.message);
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.verifyToken = user.setToken();
    await user.save();
    await transporter.sendMail({
      from: "ADMIN",
      to: user.email,
      subject: "Token Verify",
      text: "Please click the link below to verify your email",
      html: emailVerifyTemplate(
        `<a href="${ROOT_DOMAIN}/api/auth/verify-email/${user.verifyToken}"class="button button--blue">Verify Email</a>`
      ),
    });
    res.status(201).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    log.error({ error: error.message }, "Error register");
    res.status(401).send(error.message);
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error: any) {
    log.error({ error: error.message }, "Error logout");
    res.status(401).send(error.message);
  }
};

export const verifyNewAccount: RequestHandler = async (req, res) => {
  const { token } = req.params;
  try {
    const userDecode = (await verify(token, PRIVATE_KEY)) as any;
    const user = await User.findById(userDecode._id);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.verifyToken !== token) {
      throw new Error("Token not match");
    }
    user.active = true;
    user.verifyToken = "";
    await user.save();
    res.redirect("/signin");
  } catch (error: any) {
    log.error({ error: error.message }, "Error verify new account");
    res.status(401).send(error.message);
  }
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email incorrect or not exist");
    }
    const newPassword = generator.generate({
      length: 12,
      numbers: true,
      symbols: true,
    });
    user.password = newPassword;
    await transporter.sendMail({
      from: "ADMIN",
      to: user.email,
      subject: "Forgot password",
      text: "Please dont't share password for another",
      html: `<p>New password: <b>${newPassword}</b></P>`,
    });
    await user.save();
    res.status(200).send(true);
  } catch (error: any) {
    log.error({ error: error.message }, "Error forgot password");
    res.status(401).send(error.message);
  }
};
