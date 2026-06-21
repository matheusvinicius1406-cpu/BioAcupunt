import { Request, Response } from "express";
import { patientService } from "../services/patientService";
import { prisma } from "../prismaClient";

export const PatientController = {
  list: async (req: Request, res: Response) => {
    const patients = await patientService.getAll();
    res.json(patients);
  },
  create: async (req: Request, res: Response) => {
    const data = { ...req.body };
    if (data.birthDate) data.birthDate = new Date(data.birthDate);
    const patient = await patientService.create(data);
    res.status(201).json(patient);
  },
  show: async (req: Request, res: Response) => {
    const patient = await patientService.getById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  },
  updateAnamnese: async (req: Request, res: Response) => {
    const patient = await prisma.patient.update({ where: { id: req.params.id }, data: { anamnese: req.body } });
    res.json(patient);
  },
  getAnamnese: async (req: Request, res: Response) => {
    const patient = await patientService.getById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient.anamnese);
  }
};
