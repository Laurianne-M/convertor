# Build stage: compile the site using a Node-based image
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies from the source package manifest
COPY src/package*.json ./
RUN npm install

# Copy source files and build the static site
COPY src/ .
RUN npm exec vite build

# Production stage: serve the compiled files with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
