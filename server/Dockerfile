# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN ls -la  # Temporary line to check contents

# Copy the environment file
COPY .env .env

# Copy the rest of the application code
COPY ./src ./src
RUN ls -la src  # Temporary line to check if src folder is copied

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["node", "src/app.js"]
