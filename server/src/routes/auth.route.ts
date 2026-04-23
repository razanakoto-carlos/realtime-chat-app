import { Router } from "express";
import {
  authLogin,
  authRegister,
  authLogout,
} from "../controllers/auth.controller";
import validateRequest from "../middleware/validation.middleware";
import { registerSchema, loginSchema } from "../validations/user.validation";

const router = Router();

router.post("/register", validateRequest(registerSchema), authRegister);
router.post("/login", validateRequest(loginSchema), authLogin);
router.post("/logout", authLogout);

export default router;
