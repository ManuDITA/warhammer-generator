# Use a base image with Node.js
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including react-scripts
RUN npm install

# Copy the rest of the app's code
COPY . .

# Expose the port your app will run on
EXPOSE 3030

# Define the command to start your app
CMD ["npm", "start"]
