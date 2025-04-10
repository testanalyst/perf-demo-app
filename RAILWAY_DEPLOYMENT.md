# Railway Deployment Guide

This guide explains how to deploy the Users REST API to Railway.

## Prerequisites

1. [Railway Account](https://railway.app/) - Sign up if you don't have one
2. [Railway CLI](https://docs.railway.app/develop/cli) - Optional but helpful

## Deployment Steps

### Option 1: Deploy via Railway Dashboard (Easiest)

1. **Login to Railway**
   - Go to [Railway](https://railway.app/) and login to your account

2. **Create a New Project**
   - Click "New Project" 
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account if not already connected
   - Select the repository containing your API

3. **Add PostgreSQL Database**
   - Click "New Service" → "Database" → "PostgreSQL"
   - Railway will provision a PostgreSQL database

4. **Link Database to Your App**
   - In your project dashboard, click on the PostgreSQL service
   - Go to "Connect" tab and copy the connection string 
   - Go to your API service → "Variables" tab
   - Add the following environment variables:
     ```
     NODE_ENV=production
     DATABASE_URL=<paste the PostgreSQL connection string>
     JWT_SECRET=<your secret key for JWT>
     PORT=3000
     LOG_LEVEL=info
     ```

5. **Trigger Deployment**
   - Your app should automatically deploy
   - If not, go to the "Deployments" tab and click "Deploy Now"

6. **Access Your API**
   - Once deployed, click on your service
   - Go to "Settings" → scroll to "Domains"
   - You'll see a URL like `https://users-api-production.up.railway.app`
   - Your API will be available at that URL

### Option 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```
   npm i -g @railway/cli
   ```

2. **Login to Railway**
   ```
   railway login
   ```

3. **Link Your Project**
   ```
   railway link
   ```

4. **Add PostgreSQL**
   ```
   railway add
   ```
   Select PostgreSQL from the list

5. **Deploy Your Project**
   ```
   railway up
   ```

6. **Set Environment Variables**
   ```
   railway variables set NODE_ENV=production
   railway variables set LOG_LEVEL=info
   railway variables set JWT_SECRET=your_secret_key_here
   ```

## Checking Deployment Status

1. **View Logs**
   - In the Railway dashboard, click on your service
   - Go to the "Logs" tab to view deployment and application logs

2. **Test Your API**
   - Go to `https://your-service-url/api-docs` to access the Swagger UI
   - Test your endpoints to ensure they're working properly

## Troubleshooting

1. **Connection Issues**
   - Check that DATABASE_URL is correctly set
   - Verify that the PostgreSQL service is running

2. **Deployment Failures**
   - Check the deployment logs for errors
   - Ensure your Dockerfile is correctly set up

3. **Application Errors**
   - Check application logs for runtime errors
   - Verify environment variables are correctly set 