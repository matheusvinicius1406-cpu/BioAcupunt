import { Router } from "express";
import { FinanceController } from "../controllers/FinanceController";

const router = Router();
router.get("/", FinanceController.list);
router.post("/", FinanceController.create);
router.get("/:id", FinanceController.show);
router.put("/:id", FinanceController.update);
router.delete("/:id", FinanceController.delete);
router.get("/summary", FinanceController.summary);
router.get("/report/monthly", FinanceController.report);

export default router;
