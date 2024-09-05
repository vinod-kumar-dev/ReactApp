# Step 1: Use an official Node.js image as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app for production
RUN npm run build
# ls -l /app
RUN ls -l /app

# Step 2: Use an Nginx image to serve the build files
FROM nginx:alpine

# Copy the build folder to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
