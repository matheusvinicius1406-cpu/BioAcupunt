import geminiService from "./gemini";
import { prisma } from "../prismaClient";

export async function generateDiagnosis(patientData: any, patientId: string) {
  const prompt = `Analise os dados do paciente: ${JSON.stringify(patientData)}. Forneça um diagnóstico estruturado em JSON com: treatment, rationale, mainPoints, complementaryPoints, contraindications, additionalRecommendations.`;
  
  const systemInstruction = "Você é um especialista em Medicina Tradicional Chinesa (MTC), com vasto conhecimento em acupuntura, ventosaterapia, auriculoterapia e tui ná.";
  
  try {
    const response = await geminiService.generateChatResponse(prompt, systemInstruction);
    const diagnosis = JSON.parse(response);
    
    // Save to patient
    await prisma.patient.update({
      where: { id: patientId },
      data: {
        diagnosisHistory: {
          push: {
            date: new Date().toISOString(),
            diagnosis,
            treatmentApplied: diagnosis.treatment,
            satisfaction: 5
          }
        }
      }
    });
    return diagnosis;
  } catch (error) {
    console.error(error);
    return { error: "Diagnóstico indisponível no momento" };
  }
}
