import { Router } from "express";
import { PackageController } from "../controllers/PackageController";

const router = Router();
router.get("/", PackageController.list);
router.post("/", PackageController.create);
router.get("/:id", PackageController.show);
router.put("/:id", PackageController.update);
router.delete("/:id", PackageController.delete);
router.post("/:id/sell", PackageController.sell);
router.get("/patient/:id", PackageController.listByPatient);
router.patch("/session/:sessionId/use", PackageController.useSession);

export default router;
