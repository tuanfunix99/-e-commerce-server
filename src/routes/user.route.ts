import { Router } from "express";
import {
  getAllUsers,
  getUser,
  loadUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";
import { verifyMiddleware } from "../middleware/token.middle";
import {
  userMiddleware,
  adminMiddleware,
  activeAccountMiddleware,
} from "../middleware/user.middle";

const router = Router();

router.get(
  "/",
  verifyMiddleware,
  userMiddleware,
  activeAccountMiddleware,
  adminMiddleware,
  getAllUsers
);

router.get(
  "/load",
  verifyMiddleware,
  userMiddleware,
  activeAccountMiddleware,
  loadUser
);

router.get(
  "/:id",
  verifyMiddleware,
  userMiddleware,
  activeAccountMiddleware,
  adminMiddleware,
  getUser
);

router.delete(
  "/:id",
  verifyMiddleware,
  userMiddleware,
  activeAccountMiddleware,
  adminMiddleware,
  deleteUser
);

router.patch(
  "/:id",
  verifyMiddleware,
  userMiddleware,
  activeAccountMiddleware,
  updateUser
);

export default router;
