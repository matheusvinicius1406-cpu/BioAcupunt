import { Request, Response } from "express";
import { financeService } from "../services/financeService";

export const FinanceController = {
  list: async (req: Request, res: Response) => res.json(await financeService.getAll({})),
  create: async (req: Request, res: Response) => res.status(201).json(await financeService.create(req.body)),
  show: async (req: Request, res: Response) => res.json(await financeService.getById(req.params.id)),
  update: async (req: Request, res: Response) => res.json(await financeService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => { await financeService.delete(req.params.id); res.status(204).send(); },
  summary: async (req: Request, res: Response) => res.json(await financeService.getSummary()),
  report: async (req: Request, res: Response) => res.json(await financeService.getMonthlyReport(Number(req.query.year), Number(req.query.month))),
};
