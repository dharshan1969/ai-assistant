import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "your-openai-api-key-here"
});

export interface AIAssistantRequest {
  input: string;
  taskType: "question" | "summary" | "creative" | "advice";
}

export interface AIAssistantResponse {
  response: string;
  taskType: string;
}

// Ultimate prompt that handles all task types
const createUltimatePrompt = (userInput: string): string => {
  return `You are an intelligent AI Assistant that can perform different tasks based on user needs. The tasks include:

1. Answering factual questions — Provide accurate, concise, factual responses to knowledge-based questions.
2. Summarizing text — Given a block of text, extract key points, main ideas, and provide a short summary.
3. Generating creative content — Generate short stories, poems, or ideas with creativity and imagination based on user input.
4. Giving advice — Offer practical, thoughtful suggestions or tips on specific topics when asked.

The user will indicate the task they want in brackets at the beginning, such as:
- [question] What is the capital of France?
- [summary] Summarize this: Artificial Intelligence is transforming industries...
- [creative] Write a short story about a lonely robot.
- [advice] How to improve focus while studying?

Based on the bracket, follow the appropriate style:
- For [question], give direct, factual information.
- For [summary], provide a concise, clear summary.
- For [creative], use your imagination to craft engaging content.
- For [advice], give useful, actionable suggestions.

Always keep the tone human-friendly, clear, and relevant to the task. Respond accordingly:

User: ${userInput}`;
};

export async function processAIRequest(request: AIAssistantRequest): Promise<AIAssistantResponse> {
  try {
    const prompt = createUltimatePrompt(request.input);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: request.taskType === "creative" ? 0.8 : 0.3,
    });

    const aiResponse = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return {
      response: aiResponse,
      taskType: request.taskType
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    
    if (error instanceof Error) {
      throw new Error(`AI Service Error: ${error.message}`);
    }
    
    throw new Error("Failed to process AI request. Please check your API configuration.");
  }
}

// Alternative prompts for demonstration of prompt engineering varieties
export const alternativePrompts = {
  question: [
    (input: string) => `Answer this question directly and factually: ${input.replace(/^\[question\]\s*/, '')}`,
    (input: string) => `As an expert, please provide a comprehensive answer to: ${input.replace(/^\[question\]\s*/, '')}`,
    (input: string) => `Question: ${input.replace(/^\[question\]\s*/, '')}. Please provide a clear, accurate response with relevant details.`
  ],
  summary: [
    (input: string) => `Summarize the key points of the following text: ${input.replace(/^\[summary\]\s*/, '')}`,
    (input: string) => `Please provide a concise summary highlighting the main ideas: ${input.replace(/^\[summary\]\s*/, '')}`,
    (input: string) => `Extract and summarize the essential information from: ${input.replace(/^\[summary\]\s*/, '')}`
  ],
  creative: [
    (input: string) => `Use your creativity to write engaging content based on: ${input.replace(/^\[creative\]\s*/, '')}`,
    (input: string) => `Create imaginative and original content for: ${input.replace(/^\[creative\]\s*/, '')}`,
    (input: string) => `Let your imagination flow and craft something creative about: ${input.replace(/^\[creative\]\s*/, '')}`
  ],
  advice: [
    (input: string) => `Provide practical, actionable advice for: ${input.replace(/^\[advice\]\s*/, '')}`,
    (input: string) => `Give helpful suggestions and tips regarding: ${input.replace(/^\[advice\]\s*/, '')}`,
    (input: string) => `As a helpful advisor, please suggest solutions for: ${input.replace(/^\[advice\]\s*/, '')}`
  ]
};
