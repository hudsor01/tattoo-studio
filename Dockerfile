FROM node:22-alpine

WORKDIR /app

# Copy package files and Prisma schema first
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies with cache optimization
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Copy the rest of the source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]