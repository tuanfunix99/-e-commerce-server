import { Router } from "express";
import { adminMiddleware, userMiddleware } from "../middleware/user.middle";
import { verifyMiddleware } from "../middleware/token.middle";
import { createProductMiddleware } from "../middleware/product.middle";
import { createProductSchema } from "../schema/product.schema";
import { getAllProducts } from "../controllers/product.controlletr";

const router = Router();

router.get(
  "/",
  verifyMiddleware,
  userMiddleware,
  adminMiddleware,
  createProductMiddleware(createProductSchema),
  getAllProducts
);

export default router;
