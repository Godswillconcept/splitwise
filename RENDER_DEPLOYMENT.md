# Render Deployment Guide

## Prerequisites
- GitHub repository with the project code
- Render account (free tier available)

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Create Render Services

#### Web Service
1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configure:
   - **Name**: property-listing-api
   - **Environment**: Node
   - **Build Command**: `npm install && npx sequelize-cli db:migrate`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

#### MySQL Database
1. Go to Render Dashboard → New → Database
2. Configure:
   - **Name**: property-listing-db
   - **Database Type**: MySQL
   - **Instance Type**: Free

### 3. Environment Variables
Add these to your web service:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Generate a secure random string |
| `DATABASE_URL` | Auto-populated by Render from database |

### 4. Deploy
- Render will automatically deploy when you push changes
- Initial deployment may take 5-10 minutes

### 5. Post-Deployment
1. Test the API at your Render URL
2. Run seeders if needed (via Render console or temporary script)
3. Update any frontend URLs to point to the new API endpoint

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create property (auth required)
- `GET /api/properties/:id` - Get single property
- `PUT /api/properties/:id` - Update property (auth required)
- `DELETE /api/properties/:id` - Delete property (auth required)

## Troubleshooting
- Check Render logs for deployment errors
- Ensure database connection is working
- Verify environment variables are set correctly
