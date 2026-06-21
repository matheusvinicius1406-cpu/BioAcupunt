import { Router } from "express";
import { SynergyController } from "../controllers/SynergyController";

const router = Router();
router.get("/", SynergyController.list);
router.get("/procedure/:procedure", SynergyController.listByProcedure);
router.get("/:id", SynergyController.show);

export default router;
