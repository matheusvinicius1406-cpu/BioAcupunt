import { GoogleGenAI } from '@google/genai';

class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI | null = null;
  private hasKey: boolean = false;

  private constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      this.hasKey = true;
      console.log("Gemini API initialized successfully.");
    } else {
      console.warn("GEMINI_API_KEY is not defined. Using mock AI chatbot fallback.");
    }
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async generateChatResponse(prompt: string, systemInstruction: string, history?: any[]) {
    if (!this.hasKey || !this.ai) {
      return this.generateMockTCMResponse(prompt);
    }

    try {
      // Map history if provided
      const response = await this.ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "Você é um especialista em Medicina Tradicional Chinesa (MTC) e acupuntura.",
          temperature: 0.7,
        },
      });
      return response.text || "Sem resposta obtida do modelo.";
    } catch (err: any) {
      console.error("Erro na API do Gemini:", err.message);
      return `[Fallback - Erro na API] ${this.generateMockTCMResponse(prompt)}`;
    }
  }

  private generateMockTCMResponse(prompt: string): string {
    const lowercasePrompt = prompt.toLowerCase();
    let response = "Olá! Sou o assistente de MTC da BioAcupunt. Como posso ajudar com sua acupuntura ou diagnóstico?";

    if (lowercasePrompt.includes("dor") || lowercasePrompt.includes("cabeça") || lowercasePrompt.includes("enxaqueca")) {
      response = "Para dores de cabeça e enxaquecas, a Medicina Tradicional Chinesa frequentemente diagnóstica como Ascensão do Yang do Fígado ou Estagnação de Qi. Recomendo investigar e estimular os seguintes pontos principais:\n\n" +
                 "- **IG4 (Hegu)**: Ponto de comando para a face e cabeça, excelente analgésico geral.\n" +
                 "- **F3 (Taichong)**: Harmoniza e acalma o Fígado, dispersando o excesso de Yang.\n" +
                 "- **VB20 (Fengchi)**: Elimina o vento interno e ventila o calor da cabeça.\n\n" +
                 "Aplique pressão moderada ou acupuntura agulhando de 15 a 20 minutos com dispersão regulada.";
    } else if (lowercasePrompt.includes("ansiedade") || lowercasePrompt.includes("estresse") || lowercasePrompt.includes("sono") || lowercasePrompt.includes("insônia")) {
      response = "O estresse e a ansiedade desequilibram os meridianos do Coração e do Fígado, perturbando o Shen (mente). Pontos altamente eficazes para restabelecer a calma de Dra. Camila e seus pacientes:\n\n" +
                 "- **C7 (Shenmen)**: Acalma a mente, regula o sangue do Coração e promove o sono.\n" +
                 "- **CS6 (Neiguan)**: Harmoniza o aquecedor médio e acalma o espírito.\n" +
                 "- **Yintang**: Ponto extra entre as sobrancelhas extremamente calmante.\n" +
                 "- **R3 (Taixi)**: Nutre o Yin do Rim para ancorar o fogo flutuante.\n\n" +
                 "Estimule com tonificação leve ou agulha neutra para alcançar a homeostase.";
    } else if (lowercasePrompt.includes("imunidade") || lowercasePrompt.includes("cansaço") || lowercasePrompt.includes("energia") || lowercasePrompt.includes("fadiga")) {
      response = "Fadiga crônica e imunidade baixa geralmente indicam Deficiência de Qi do Baço e do Pulmão. O fortalecimento energético é crucial através de:\n\n" +
                 "- **E36 (Zusanli)**: Fortalece o Qi e o Sangue, revigora o Baço e o Estômago.\n" +
                 "- **BP6 (Sanyinjiao)**: Ponto de cruzamento dos três meridianos Yin do pé, nutre o sangue e o Yin.\n" +
                 "- **VC4 (Guanyuan)**: Fortalece o Yuan Qi (energia primordial).\n\n" +
                 "Excelente indicação para uso combinado de moxa nestes pontos para maximizar a tonificação.";
    } else if (lowercasePrompt.includes("estômago") || lowercasePrompt.includes("digest") || lowercasePrompt.includes("azia")) {
      response = "Problemas digestivos derivam de Desarmonia entre Fígado e Baço/Estômago ou Deficiência de Qi do Baço. Pontos recomendados:\n\n" +
                 "- **VC12 (Zhongwan)**: Ponto Mu do Estômago, regula todas as patologias de digestão.\n" +
                 "- **E36 (Zusanli)**: Regula o Qi do Estômago.\n" +
                 "- **CS6 (Neiguan)**: Alivia náuseas e refluxo gastroesofágico.";
    }

    return `[Mock AI - Modo Offline] ${response}`;
  }
}

export default GeminiService.getInstance();

