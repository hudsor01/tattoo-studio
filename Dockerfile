FROM node:22-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Copy Prisma schema before npm install
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Prisma generate is handled by postinstall script

EXPOSE 3000

CMD ["npm", "run", "dev"]
