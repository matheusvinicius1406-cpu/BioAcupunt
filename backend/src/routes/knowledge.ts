import { Router } from "express";
import { KnowledgeController } from "../controllers/KnowledgeController";

const router = Router();
router.get("/", KnowledgeController.list);
router.get("/categories", KnowledgeController.getCategories);
router.get("/search", KnowledgeController.search);
router.get("/:id", KnowledgeController.show);
router.post("/", KnowledgeController.create);
router.put("/:id", KnowledgeController.update);
router.delete("/:id", KnowledgeController.delete);
router.post("/:id/view", KnowledgeController.incrementView);

export default router;
