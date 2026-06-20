import { Router } from "express";
import { PatientController } from "../controllers/PatientController";

const router = Router();
router.get("/", PatientController.list);
router.post("/", PatientController.create);
router.get("/:id", PatientController.show);

export default router;
