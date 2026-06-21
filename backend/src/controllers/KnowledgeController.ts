import { Request, Response } from "express";
import { knowledgeService } from "../services/knowledgeService";

export const KnowledgeController = {
  list: async (req: Request, res: Response) => res.json(await knowledgeService.getAll({})),
  show: async (req: Request, res: Response) => res.json(await knowledgeService.getById(req.params.id)),
  create: async (req: Request, res: Response) => res.status(201).json(await knowledgeService.create(req.body)),
  update: async (req: Request, res: Response) => res.json(await knowledgeService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => { await knowledgeService.delete(req.params.id); res.status(204).send(); },
  getCategories: async (req: Request, res: Response) => res.json(await knowledgeService.getCategories()),
  search: async (req: Request, res: Response) => res.json(await knowledgeService.search(req.query.q as string)),
  incrementView: async (req: Request, res: Response) => res.json(await knowledgeService.incrementView(req.params.id)),
};
