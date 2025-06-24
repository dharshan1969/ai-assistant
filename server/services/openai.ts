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

// Demo responses for when OpenAI API is unavailable
const demoResponses = {
  question: {
    "What is the largest planet in our solar system?": "Jupiter is the largest planet in our solar system. It's a gas giant with a mass more than twice that of all other planets combined. Jupiter has a diameter of about 142,984 kilometers (88,846 miles), which is about 11 times wider than Earth.",
    "What is the capital of France?": "The capital of France is Paris. Paris is located in the north-central part of France and is the country's largest city, known for iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
    "What is machine learning?": "Machine learning is a subset of artificial intelligence (AI) that enables computers to learn and make decisions from data without being explicitly programmed for every task. It uses algorithms to identify patterns in data and make predictions or decisions based on those patterns."
  },
  summary: {
    default: "**Summary:** The provided text discusses artificial intelligence as a transformative technology that's reshaping industries worldwide. Key points include:\n\n• AI automates complex processes and improves decision-making\n• It creates new opportunities for innovation across sectors\n• The technology requires understanding of data patterns and algorithms\n• Implementation involves both technical and strategic considerations\n\nThe text emphasizes AI's broad impact on modern business and society."
  },
  creative: {
    "Write a short story about a brave squirrel who saves its forest from a fire": "**The Forest Guardian**\n\nNutkin was just an ordinary squirrel until the day smoke filled the morning air. While other woodland creatures fled in panic, Nutkin noticed something crucial - the fire was spreading toward the old oak where hundreds of animals had taken shelter.\n\nRacing through the treetops faster than ever before, Nutkin remembered the hidden stream that ran beneath the forest floor. With quick thinking and quicker paws, Nutkin gnawed through strategic branches to create a natural dam, redirecting the water to create a protective barrier.\n\nBy sunset, the fire had been contained, and the forest was safe. Nutkin learned that courage isn't about size - it's about heart.",
    "Write a short poem about autumn": "**Autumn's Embrace**\n\nGolden leaves dance on crisp morning air,\nWhispering secrets of summer's farewell.\nCrimson and amber paint landscapes fair,\nAs nature prepares for winter's spell.\n\nHarvest moon rises, full and bright,\nGuiding geese southward on their flight.\nAutumn's gentle, fleeting grace—\nA season's warm, embracing face."
  },
  advice: {
    "How can I stay focused while preparing for exams?": "**Effective Exam Preparation Strategies:**\n\n**Environment Setup:**\n• Create a dedicated, clutter-free study space\n• Minimize distractions (phone, social media, noise)\n• Ensure good lighting and comfortable temperature\n\n**Time Management:**\n• Use the Pomodoro Technique (25 minutes focused study, 5-minute breaks)\n• Create a realistic study schedule with specific goals\n• Prioritize difficult subjects during your peak energy hours\n\n**Study Techniques:**\n• Practice active recall instead of just re-reading\n• Create summary notes and mind maps\n• Form study groups for discussion and accountability\n\n**Self-Care:**\n• Maintain regular sleep schedule (7-8 hours)\n• Take regular breaks and exercise\n• Stay hydrated and eat nutritious meals",
    "How can I improve study habits?": "**Building Better Study Habits:**\n\n**Consistency is Key:**\n• Set regular study times and stick to them\n• Start with small, manageable sessions (30-45 minutes)\n• Gradually increase duration as habits form\n\n**Active Learning:**\n• Summarize information in your own words\n• Teach concepts to someone else\n• Use flashcards for memorization\n• Practice problem-solving regularly\n\n**Organization:**\n• Keep all materials in designated places\n• Use planners or digital apps to track assignments\n• Break large projects into smaller tasks\n• Review and adjust methods regularly\n\n**Health & Wellness:**\n• Maintain consistent sleep schedule\n• Take breaks every hour\n• Stay physically active\n• Reward yourself for meeting goals"
  }
};

export async function processAIRequest(request: AIAssistantRequest): Promise<AIAssistantResponse> {
  try {
    // Try OpenAI API first
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
    
    // If it's a quota error, use demo mode
    if (error instanceof Error && error.message.includes('quota')) {
      console.log("Using demo mode due to API quota exceeded");
      return getDemoResponse(request);
    }
    
    if (error instanceof Error) {
      throw new Error(`AI Service Error: ${error.message}`);
    }
    
    throw new Error("Failed to process AI request. Please check your API configuration.");
  }
}

function getDemoResponse(request: AIAssistantRequest): AIAssistantResponse {
  const userInput = request.input.replace(/^\[\w+\]\s*/, '').trim();
  
  // Check for exact matches first
  if (demoResponses[request.taskType] && demoResponses[request.taskType][userInput]) {
    return {
      response: `**[DEMO MODE - OpenAI API quota exceeded]**\n\n${demoResponses[request.taskType][userInput]}`,
      taskType: request.taskType
    };
  }
  
  // Check for partial matches in questions
  if (request.taskType === 'question') {
    for (const [question, answer] of Object.entries(demoResponses.question)) {
      if (userInput.toLowerCase().includes(question.toLowerCase().split(' ')[2]) || 
          question.toLowerCase().includes(userInput.toLowerCase().split(' ')[0])) {
        return {
          response: `**[DEMO MODE - OpenAI API quota exceeded]**\n\n${answer}`,
          taskType: request.taskType
        };
      }
    }
  }
  
  // Default responses by task type
  const defaultResponses = {
    question: "I understand you're asking a factual question. In demo mode, I can provide responses to common questions like 'What is the capital of France?' or 'What is machine learning?'. Please add credits to your OpenAI account to access the full AI capabilities.",
    summary: demoResponses.summary.default,
    creative: "I'd love to create something imaginative for you! In demo mode, I can generate creative content for prompts like 'Write a short story about a brave squirrel' or 'Write a poem about autumn'. Please add credits to your OpenAI account for unlimited creative responses.",
    advice: "I'm ready to provide helpful advice! In demo mode, I can offer guidance on topics like study habits and exam preparation. Please add credits to your OpenAI account to get personalized advice on any topic."
  };
  
  return {
    response: `**[DEMO MODE - OpenAI API quota exceeded]**\n\n${defaultResponses[request.taskType]}`,
    taskType: request.taskType
  };
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
