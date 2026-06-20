import { Router } from "express";
import { ChatController } from "../controllers/ChatController";

const router = Router();
router.post("/", ChatController.chat);
router.post("/diagnose/:patientId", ChatController.diagnose);

export default router;
