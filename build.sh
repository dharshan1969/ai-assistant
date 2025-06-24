#!/bin/bash
# AI Assistant Production Build Script

echo "🚀 Building AI Assistant for production..."

# Create dist directory
mkdir -p dist

# Build client (React/Vite)
echo "📦 Building client..."
npx vite build --outDir dist/public --emptyOutDir

# Build server (Node.js/esbuild) with ESM format
echo "🔧 Building server..."
npx esbuild server/index.ts --bundle --platform=node --target=node20 --outfile=dist/index.js --format=esm --external:@neondatabase/serverless --external:openai

echo "✅ Build completed successfully!"
echo "📁 Output:"
echo "  - Client: dist/public/"
echo "  - Server: dist/index.js"