import { Router } from "express";
import {
  authLogin,
  authRegister,
  authLogout,
  me,
  getUsers,
  updateUser,
} from "../controllers/auth.controller";
import validateRequest from "../middleware/validation.middleware";
import { registerSchema, loginSchema } from "../validations/user.validation";
import { authMiddleware } from "../middleware/auth.middleware";
import upload from "../config/multer";

const router = Router();

router.get("/me", authMiddleware, me);
router.get("/users", authMiddleware, getUsers);
router.post("/register", validateRequest(registerSchema), authRegister);
router.post("/login", validateRequest(loginSchema), authLogin);
router.put(
  "/users/update",
  authMiddleware,
  upload.single("avatar"),
  updateUser,
);
router.post("/logout", authMiddleware, authLogout);

export default router;
