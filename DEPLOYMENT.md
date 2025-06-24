# Deployment Guide

## Vercel Deployment

### Quick Deploy
1. **Fork/Clone the repository**
2. **Push to GitHub**
3. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

### Environment Variables (Required)
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Build Configuration
- **Framework**: Other
- **Build Command**: `./build.sh`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### File Structure After Build
```
dist/
├── index.js          # Server bundle
└── public/           # Client static files
    ├── index.html
    ├── assets/
    └── ...
```

## Local Development vs Production

### Development Mode
- Vite dev server with HMR
- Client served at localhost:5000
- API routes at /api/*
- Live reload and debugging

### Production Mode
- Static files served from dist/public
- Server bundle at dist/index.js
- Environment variables from Vercel
- Optimized builds with minification

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure all dependencies are in package.json
   - Check TypeScript compilation errors
   - Verify environment variables are set

2. **API Errors**
   - Confirm OPENAI_API_KEY is configured
   - Check API key has sufficient credits
   - Verify network connectivity

3. **Static File Issues**
   - Ensure build outputs to correct directory
   - Check vercel.json routing configuration
   - Verify asset paths are relative

### Build Commands Explained

```bash
# Build client (React/Vite)
npm run build:client

# Build server (Node.js/esbuild)
npm run build:server

# Full build (both client and server)
npm run build

# Start production server locally
npm run start

# Build and preview locally
npm run preview
```

## Custom Domain Setup

1. **Add domain in Vercel dashboard**
2. **Configure DNS records**
3. **SSL automatically provided**

## Environment Configuration

### Required Variables
- `OPENAI_API_KEY` - OpenAI API key with credits

### Optional Variables
- `NODE_ENV` - Automatically set by Vercel
- `PORT` - Automatically set by Vercel
- `DATABASE_URL` - PostgreSQL connection (optional)

## Performance Optimization

- Client bundle optimized by Vite
- Server bundle optimized by esbuild
- Static asset caching via Vercel CDN
- API function timeout: 30 seconds
- Cost-efficient GPT-4o-mini model usage

## Monitoring

- Vercel provides automatic monitoring
- Function logs available in dashboard
- Error tracking included
- Performance metrics displayed