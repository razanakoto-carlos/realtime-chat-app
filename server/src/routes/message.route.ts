import { Router } from "express";
import { deleteMessage, getMessage } from "../controllers/message.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/:conversationId", getMessage);
router.post("/", deleteMessage);

export default router;
