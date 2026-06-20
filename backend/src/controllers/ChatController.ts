import { Request, Response } from "express";
import geminiService from "../services/gemini";
import { generateDiagnosis } from "../services/diagnosisService";
import { patientService } from "../services/patientService";

export const ChatController = {
  chat: async (req: Request, res: Response) => {
    const { prompt, history } = req.body;
    const response = await geminiService.generateChatResponse(prompt, "Você é um especialista em MTC.", history);
    res.json({ response });
  },
  diagnose: async (req: Request, res: Response) => {
    const patientRecord = await patientService.getById(req.params.patientId);
    if (!patientRecord) return res.status(404).json({ error: "Patient not found" });
    const diagnosis = await generateDiagnosis(patientRecord, req.params.patientId);
    res.json(diagnosis);
  }
};
