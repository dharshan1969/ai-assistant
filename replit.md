# AI Assistant - Prompt Engineering Project

## Overview

This is an educational AI Assistant web application built to demonstrate prompt engineering skills. The application provides multiple task categories including question answering, text summarization, creative content generation, and advice provision. It features a modern React frontend with a Node.js/Express backend that integrates with OpenAI's GPT-4o model.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend, backend, and data layers:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Integration**: OpenAI GPT-4o for AI responses
- **Development Server**: Custom Vite integration for seamless full-stack development

### Data Layer
- **Primary Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Fallback Storage**: In-memory storage implementation for development
- **Schema Management**: Drizzle Kit for migrations and schema management

## Key Components

### AI Processing Engine
- **Model**: OpenAI GPT-4o (latest available model)
- **Prompt Design**: Ultimate prompt system that handles multiple task types through bracket notation
- **Task Types**: 
  - `[question]` - Factual question answering
  - `[summary]` - Text summarization
  - `[creative]` - Creative content generation
  - `[advice]` - Practical advice and suggestions

### User Interface Components
- **TaskSelector**: Interactive task type selection with visual feedback
- **AIAssistant**: Main chat interface with input validation
- **ResponseDisplay**: Formatted response presentation with feedback collection
- **Sidebar**: Quick examples and session statistics

### Database Schema
- **Users**: User authentication and management
- **AI Queries**: Query logging with task type, input, response, and feedback
- **Session Stats**: Analytics for query counts and helpfulness metrics

## Data Flow

1. **User Input**: User selects task type and enters query with required bracket format
2. **Validation**: Frontend validates bracket format matches selected task type
3. **API Request**: Query sent to backend with task type and formatted input
4. **AI Processing**: Backend constructs ultimate prompt and calls OpenAI API
5. **Response Storage**: Query and response stored in database with unique ID
6. **User Feedback**: Optional feedback collection for response helpfulness
7. **Analytics**: Session statistics updated for performance tracking

## External Dependencies

### Required Services
- **OpenAI API**: GPT-4o model access for AI responses
- **PostgreSQL Database**: Primary data storage (Neon serverless recommended)

### Key Libraries
- **Frontend**: React, TanStack Query, Wouter, Shadcn/ui, Tailwind CSS
- **Backend**: Express, Drizzle ORM, OpenAI SDK, Zod validation
- **Development**: Vite, TypeScript, ESBuild

### Environment Variables
- `OPENAI_API_KEY`: OpenAI API access token
- `DATABASE_URL`: PostgreSQL connection string

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Features**: Hot reload, error overlay, development logging
- **Database**: Can fallback to in-memory storage if database unavailable

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Requires PostgreSQL connection for full functionality

### Platform Configuration
- **Replit**: Configured for autoscale deployment
- **Ports**: Frontend on 5000, external port 80
- **Modules**: Node.js 20, PostgreSQL 16, web environment

## Recent Changes

- June 24, 2025: Initial AI Assistant setup with prompt engineering system
- June 24, 2025: Removed demo/fallback system for pure OpenAI integration
- June 24, 2025: Switched to gpt-4o-mini model for cost efficiency and quota management
- June 24, 2025: Enhanced error handling with specific OpenAI API status codes
- June 24, 2025: API key validation confirmed working, addressing quota limitations
- June 24, 2025: Added GitHub and Vercel deployment configuration
- June 24, 2025: Created comprehensive documentation and build scripts
- June 24, 2025: Configured production builds for client and server bundles

## User Preferences

Preferred communication style: Simple, everyday language.