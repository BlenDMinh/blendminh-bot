import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import GeminiResponse from "src/model/gemini-response.model";

@Injectable()
export default class GeminiService {
  private apiKey: string
  private genAI: GoogleGenerativeAI
  private model: GenerativeModel

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel(
      {
        model: process.env.MODEL,
        systemInstruction: "You are BlenDMinh. You always response below 2000 characters.",
      }
    );
  }

  async generateText(prompt: string): Promise<GeminiResponse> {
    const countResponse = await this.model.countTokens(prompt);
    const result = await this.model.generateContent(prompt);
    return {
      tokens: countResponse.totalTokens,
      text: result.response.text(),
    };
  }
}