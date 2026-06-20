import { Router } from "express";
import { PatientController } from "../controllers/PatientController";

const router = Router();
router.get("/", PatientController.list);
router.post("/", PatientController.create);
router.get("/:id", PatientController.show);
router.get("/:id/anamnese", PatientController.getAnamnese);
router.patch("/:id/anamnese", PatientController.updateAnamnese);

export default router;
