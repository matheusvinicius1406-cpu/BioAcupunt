import { Request, Response } from "express";
import { appointmentService } from "../services/appointmentService";
import { patientService } from "../services/patientService";

export const AppointmentController = {
  list: async (req: Request, res: Response) => {
    const filters: any = {};
    if (req.query.date) {
      const date = new Date(req.query.date as string);
      filters.date = {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999))
      };
    }
    const appointments = await appointmentService.getAll(filters);
    res.json(appointments);
  },
  create: async (req: Request, res: Response) => {
    const data = { ...req.body };
    if (data.date) data.date = new Date(data.date);
    const appointment = await appointmentService.create(data);
    res.status(201).json(appointment);
  },
  show: async (req: Request, res: Response) => {
    const appointment = await appointmentService.getById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  },
  update: async (req: Request, res: Response) => {
    const data = { ...req.body };
    if (data.date) data.date = new Date(data.date);
    const appointment = await appointmentService.update(req.params.id, data);
    res.json(appointment);
  },
  delete: async (req: Request, res: Response) => {
    await appointmentService.delete(req.params.id);
    res.status(204).send();
  },
  listByPatient: async (req: Request, res: Response) => {
    const appointments = await appointmentService.getByPatient(req.params.patientId);
    res.json(appointments);
  },
  listInactivePatients: async (req: Request, res: Response) => {
    const patients = await appointmentService.getInactivePatients();
    res.json(patients);
  }
};
