import { Router } from "express";
import { deleteMessage, getMessage } from "../controllers/message.controller";

const router = Router();

router.get("/", getMessage);
router.post("/", deleteMessage);

export default router;
