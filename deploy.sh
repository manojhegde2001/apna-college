#!/bin/bash

# Deployment Script
# This script builds and restarts the application

# Navigate to the project root
# cd /path/to/your/repo (Ensure you are in the correct directory)

echo "Pulling latest changes..."
git pull origin main

echo "Installing Backend Dependencies..."
cd backend
npm install
npx prisma generate

echo "Building Backend..."
npm run build

echo "Restarting Backend with PM2..."
pm2 delete backend || true
pm2 start dist/index.js --name "backend"

echo "Installing Frontend Dependencies..."
cd ../frontend
npm install

echo "Building Frontend..."
npm run build

echo "Moving Frontend to /var/www/frontend..."
sudo mkdir -p /var/www/frontend
sudo cp -r dist/* /var/www/frontend/

echo "Deployment Successful!"
