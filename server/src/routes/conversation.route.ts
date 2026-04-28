import { Router } from "express";
import {
  createConversation,
  createPrivate,
  getMyConversation,
} from "../controllers/conversation.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import validateRequest from "../middleware/validation.middleware";
import { conversationSchema } from "../validations/validation";

const router = Router();

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

router.use(authMiddleware);

router.get("/", getMyConversation);
router.post("/private", createPrivate);
router.post("/", validateRequest(conversationSchema), createConversation);

export default router;
