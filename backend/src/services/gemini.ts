import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;

  private constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async generateChatResponse(prompt: string, systemInstruction: string, history?: any[]) {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction
    });

    const chat = model.startChat({
      history: history || []
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }
}

export default GeminiService.getInstance();
