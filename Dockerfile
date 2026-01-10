# Stage 1: Build the Vite React app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies (cache-efficient)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the production assets (Vite outputs to /dist by default)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assetsAwards from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Copy a custom Nginx config for SPA routing (highly recommended)
# Create a file named nginx.conf in your project root with the content below
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
