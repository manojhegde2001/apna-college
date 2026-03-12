#!/bin/bash

# Setup Script for AWS EC2 (Ubuntu)
# This script installs Node.js, Nginx, and PM2

echo "Updating system..."
sudo apt update && sudo apt upgrade -y

echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Installing Nginx..."
sudo apt install -y nginx

echo "Installing PM2..."
sudo npm install -g pm2

echo "Configuring Nginx..."
# Create a basic Nginx configuration
sudo bash -c 'cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    server_name _;

    location / {
        root /var/www/frontend/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'

sudo systemctl restart nginx

echo "Setup Complete!"
echo "Next step: Run the deploy.sh script."
