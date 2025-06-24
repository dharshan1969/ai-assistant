# AI Assistant - Prompt Engineering Project

A modern web application demonstrating advanced prompt engineering techniques with OpenAI's GPT-4o-mini model. Built for academic demonstration of AI integration and multi-task categorization using bracket notation.

## 🚀 Features

- **Multi-Task AI Processing**: Four distinct task categories with bracket notation
  - `[question]` - Factual question answering
  - `[summary]` - Text summarization
  - `[creative]` - Creative content generation
  - `[advice]` - Practical advice and suggestions

- **Ultimate Prompt System**: Single prompt handles all task types intelligently
- **Real-time Feedback**: User feedback collection for response quality
- **Session Analytics**: Track queries, helpful responses, and success rates
- **Modern UI**: Clean, responsive interface with quick examples
- **Type-safe**: Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and optimized builds
- TanStack Query for server state management
- Tailwind CSS for styling
- Shadcn/ui component library
- Wouter for lightweight routing

### Backend
- Node.js with Express.js
- TypeScript with ES modules
- OpenAI GPT-4o-mini integration
- Drizzle ORM with PostgreSQL support
- In-memory storage fallback for development

## 📦 Installation

### Prerequisites
- Node.js 20+ 
- OpenAI API key with available credits

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-assistant-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variable: `OPENAI_API_KEY`
   - Deploy automatically on push

### Environment Variables
- `OPENAI_API_KEY` - Your OpenAI API key (required)

## 📋 Usage

### Basic Usage
1. Select a task type (Question, Summary, Creative, Advice)
2. Enter your input with the appropriate bracket notation:
   - `[question] What is machine learning?`
   - `[summary] Summarize this: [your text here]`
   - `[creative] Write a poem about autumn`
   - `[advice] How to improve study habits?`
3. Submit and receive AI-generated responses
4. Provide feedback to help improve the system

### API Endpoints
- `POST /api/ai/chat` - Process AI requests
- `POST /api/ai/feedback` - Submit response feedback
- `GET /api/stats/:sessionId` - Get session statistics

## 🏗️ Project Structure

```
ai-assistant-project/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utilities and configurations
├── server/                # Backend Express application
│   ├── services/          # Business logic and AI integration
│   ├── routes.ts          # API route definitions
│   └── storage.ts         # Data storage implementation
├── shared/                # Shared types and schemas
└── package.json          # Dependencies and scripts
```

## 🎯 Prompt Engineering Features

### Ultimate Prompt Design
The application uses a single, comprehensive prompt that intelligently handles all task types:

- **Context-aware responses** based on bracket notation
- **Dynamic tone adjustment** for different task categories
- **Consistent formatting** across all response types
- **Error handling** with meaningful user feedback

### Task Classification
- Bracket notation system for clear task identification
- Frontend validation ensures proper format
- Backend processing adapts response style accordingly

## 📊 Performance & Monitoring

- Session-based analytics tracking
- Response quality feedback collection
- Error handling with specific OpenAI API status codes
- Optimized for cost efficiency with GPT-4o-mini model

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- TypeScript for type safety
- Zod for runtime validation
- ESLint configuration included
- Modular component architecture

## 📄 License

This project is created for academic demonstration purposes.

## 🤝 Contributing

This is an academic project demonstrating prompt engineering concepts. For educational use and evaluation.

---

**Note**: Ensure you have a valid OpenAI API key with sufficient credits for full functionality.