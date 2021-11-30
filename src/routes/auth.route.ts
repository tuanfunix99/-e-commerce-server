import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  verifyNewAccount,
} from "../controllers/auth.controller";
import { registerMiddleware, loginMiddleware } from "../middleware/auth.middle";
import { verifyMiddleware } from "../middleware/token.middle";
import { userMiddleware } from "../middleware/user.middle";
import { registerSchema, loginSchema } from "../schema/auth.schema";

const router = Router();

router.post("/login", loginMiddleware(loginSchema), login);
router.post("/register", registerMiddleware(registerSchema), register);
router.get("/logout", verifyMiddleware, userMiddleware, logout);
router.get("/verify-email/:token", verifyNewAccount);
router.post("/forgot-password", forgotPassword);

export default router;
