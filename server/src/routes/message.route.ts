import { Router } from "express";
import { deleteMessage, getMessage } from "../controllers/message.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware)

router.get("/:conversationId", getMessage);
router.delete("/", deleteMessage);

export default router;
