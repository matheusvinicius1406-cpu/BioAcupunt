import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";

const router = Router();
router.get("/", AppointmentController.list);
router.post("/", AppointmentController.create);
router.get("/:id", AppointmentController.show);
router.put("/:id", AppointmentController.update);
router.delete("/:id", AppointmentController.delete);
router.get("/patient/:patientId", AppointmentController.listByPatient);
router.get("/inactive", AppointmentController.listInactivePatients);

export default router;
