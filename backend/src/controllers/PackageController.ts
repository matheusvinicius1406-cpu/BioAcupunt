import { Request, Response } from "express";
import { packageService } from "../services/packageService";

export const PackageController = {
  list: async (req: Request, res: Response) => res.json(await packageService.getAll()),
  create: async (req: Request, res: Response) => res.status(201).json(await packageService.create(req.body)),
  show: async (req: Request, res: Response) => res.json(await packageService.getById(req.params.id)),
  update: async (req: Request, res: Response) => res.json(await packageService.update(req.params.id, req.body)),
  delete: async (req: Request, res: Response) => { await packageService.delete(req.params.id); res.status(204).send(); },
  sell: async (req: Request, res: Response) => res.status(201).json(await packageService.sell(req.body)),
  listByPatient: async (req: Request, res: Response) => res.json(await packageService.getSessionsByPatient(req.params.id)),
  useSession: async (req: Request, res: Response) => res.json(await packageService.useSession(req.params.sessionId)),
};
