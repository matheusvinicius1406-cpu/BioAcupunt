import { Request, Response } from "express";
import { synergyService } from "../services/synergyService";

export const SynergyController = {
  list: async (req: Request, res: Response) => res.json(await synergyService.getAll()),
  listByProcedure: async (req: Request, res: Response) => res.json(await synergyService.getByProcedure(req.params.procedure)),
  show: async (req: Request, res: Response) => res.json(await synergyService.getById(req.params.id)),
};
