# Splitwise API Deployment Guide

This document provides a comprehensive guide to deploying the Splitwise API on Clever Cloud, including database setup, environment configuration, and troubleshooting steps.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Clever Cloud Configuration](#clever-cloud-configuration)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Deployment Process](#deployment-process)
- [Database Migrations](#database-migrations)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

## Prerequisites
- Node.js (v18 or later) and npm installed
- Git installed and configured
- Clever Cloud account (sign up at clever-cloud.com)
- Clever Tools CLI installed (npm install -g clever-tools)
- MySQL client (for database management)

## Project Setup
### 1. Clone the Repository
```bash
git clone <repository-url>
cd splitwise
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Project Structure
```
splitwise/
├── config/
│   └── config.json       # Database configuration
├── models/               # Sequelize models
├── migrations/           # Database migrations
├── seeders/              # Database seeders
├── routes/               # API routes
├── .env.production       # Production environment variables
├── package.json          # Project dependencies and scripts
└── server.js             # Application entry point
```

## Clever Cloud Configuration
### 1. Login to Clever Cloud
```bash
clever login
```

### 2. Create a New Application
```bash
clever create "splitwise-api" --type node
```

### 3. Configure Application Settings
```bash
clever env set CC_NODE_MODULES_CACHE true
clever env set NODE_ENV production
clever env set NODE_VERSION 18
clever scale --flavor M
```

## Database Setup
### 1. Create MySQL Add-on
```bash
clever addon create mysql-addon --plan dev --region par splitwise-mysql
clever service link-addon splitwise-mysql
```

### 2. Verify MySQL Database Connection
```bash
clever env | findstr MYSQL
```

### 3. Create Redis Add-on (Optional, for Caching/Sessions)
```bash
clever addon create redis-addon --plan dev --region par splitwise-redis
clever service link-addon splitwise-redis
```

### 4. Verify Redis Connection
```bash
clever env | findstr REDIS
```

## Environment Variables
Create or update your `.env.production` file with the following variables:

```env
NODE_ENV=production
PORT=8080
JWT_SECRET=your_secure_jwt_secret_here
MYSQL_ADDON_HOST=your_mysql_host
MYSQL_ADDON_DB=your_database_name
MYSQL_ADDON_USER=your_database_user
MYSQL_ADDON_PASSWORD=your_database_password
MYSQL_ADDON_PORT=3306
REDIS_URL=your_redis_url_from_clevercloud
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
```

## Deployment Process
### 1. Configure `config/config.json`
```json
{
  "development": {
    "username": "root",
    "password": "",
    "database": "property_listing_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "${MYSQL_ADDON_USER}",
    "password": "${MYSQL_ADDON_PASSWORD}",
    "database": "${MYSQL_ADDON_DB}",
    "host": "${MYSQL_ADDON_HOST}",
    "port": "${MYSQL_ADDON_PORT}",
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}
```

### 2. Update `package.json` Scripts
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "migrate": "npx sequelize-cli db:migrate",
  "seed": "npx sequelize-cli db:seed:all",
  "postinstall": "npm run migrate && npm run seed"
}
```

### 3. Deploy the Application
```bash
git add .
git commit -m "Prepare for deployment"
clever deploy
```

## Database Migrations
### 1. Run Migrations
```bash
clever run --command "npm run migrate"
```

### 2. Seed the Database
```bash
clever run --command "npm run seed"
```

### 3. Verify Data
```bash
clever run --command "node -e \"const { Sequelize } = require('sequelize'); const sequelize = new Sequelize(process.env.MYSQL_ADDON_URI); sequelize.query('SHOW TABLES').then(console.log).catch(console.error);\""
```

## Troubleshooting
### 1. Check Logs
```bash
clever logs
```

### 2. Common Issues
- **Database Connection Issues**: Verify environment variables and database credentials
- **Migration Failures**: Check for syntax errors in migration files
- **Port Conflicts**: Ensure the application is using the correct port (default: 8080)

### 3. SSH into Application
```bash
clever ssh
```

## Maintenance
### 1. Backups
Enable automatic backups in the Clever Cloud dashboard.

### 2. Monitoring
Monitor application performance and logs in the Clever Cloud console.

### 3. Updates
Regularly update dependencies and apply security patches.

## Conclusion
This guide provides a comprehensive overview of deploying the Splitwise API on Clever Cloud. For additional assistance, refer to the Clever Cloud documentation.

Last Updated: November 25, 2025
Version: 1.0.0
