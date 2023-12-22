#!/bin/bash

# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install


# Copy the entire current directory into the working directory
COPY . .

# # Generate Prisma Client
# COPY --link prisma .
# RUN npx prisma generate

# # Copy application code
# COPY --link . .

# Migrate DB
RUN npx prisma migrate dev


# Expose the port your Express app will run on
EXPOSE 3000

# Start your Express app
CMD ["npm", "run","start"]
