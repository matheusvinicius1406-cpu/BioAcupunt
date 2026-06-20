import { Request, Response } from "express";
import { patientService } from "../services/patientService";

export const PatientController = {
  list: async (req: Request, res: Response) => {
    const patients = await patientService.getAll();
    res.json(patients);
  },
  create: async (req: Request, res: Response) => {
    const patient = await patientService.create(req.body);
    res.status(201).json(patient);
  },
  show: async (req: Request, res: Response) => {
    const patient = await patientService.getById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  },
};
