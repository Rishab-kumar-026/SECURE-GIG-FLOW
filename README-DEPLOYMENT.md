# Secure-Gig Production Deployment Guide

## Overview
This guide covers deploying the Secure-Gig application to Render.com with production-ready configurations.

## Architecture
- **Backend**: Node.js/Express API with TypeScript
- **Frontend**: React/Vite SPA with TypeScript
- **Database**: MongoDB Atlas (recommended for production)
- **Blockchain**: Avalanche Fuji Testnet
- **Deployment**: Render.com

## Pre-deployment Checklist

### Backend (avalanche-freelance-api)
- ✅ CORS configured for all origins (`*`)
- ✅ Environment variables properly configured
- ✅ Production build scripts added
- ✅ Dockerfile created for containerization
- ✅ render.yaml configuration file

### Frontend (secure-gig-flow)
- ✅ .env files added to .gitignore
- ✅ Environment variables configured with smart contract addresses
- ✅ Production build scripts added
- ✅ Dockerfile with nginx configuration
- ✅ render.yaml configuration file

## Deployment Steps

### 1. Backend Deployment on Render

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the `avalanche-freelance-api` folder as root directory
   - Use the following settings:
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

2. **Environment Variables** (Set in Render dashboard):
   ```
   NODE_ENV=production
   PORT=4000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   AVALANCHE_RPC_URL=https://rpc.ankr.com/avalanche_fuji
   AVALANCHE_CHAIN_ID=43113
   GIG_ESCROW_ADDRESS=0x7B7781187eff5d5D6c75154282DF57882f2fDfAB
   DAO_TOKEN_ADDRESS=0xB57FBeF85bD1A1643eF9EA3734DAe65494246247
   ESCROW_DAO_ADDRESS=0x49E4B659f5A4F9BFB34347c5e95f606425E8AD32
   ```

3. **Deploy**: Click "Create Web Service"

### 2. Frontend Deployment on Render

1. **Create a new Static Site on Render**
   - Connect your GitHub repository
   - Select the `secure-gig-flow` folder as root directory
   - Use the following settings:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

2. **Environment Variables** (Set in Render dashboard):
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_AVALANCHE_NETWORK=fuji
   VITE_SNOWTRACE_URL=https://testnet.snowtrace.io
   VITE_ESCROW_CONTRACT_ADDRESS=0x7B7781187eff5d5D6c75154282DF57882f2fDfAB
   VITE_ESCROW_DAO_ADDRESS=0x49E4B659f5A4F9BFB34347c5e95f606425E8AD32
   VITE_DAO_TOKEN_ADDRESS=0xB57FBeF85bD1A1643eF9EA3734DAe65494246247
   VITE_AVALANCHE_FUJI_RPC=https://rpc.ankr.com/avalanche_fuji
   VITE_ENVIRONMENT=production
   ```

3. **Deploy**: Click "Create Static Site"

## Important Notes

### Security Considerations
- CORS is set to `*` for development ease - consider restricting in production
- JWT secrets should be strong and unique
- Private keys should never be committed to version control
- Use environment variables for all sensitive data

### Smart Contract Integration
The application is pre-configured with deployed smart contracts on Avalanche Fuji testnet:
- **GigEscrow**: `0x7B7781187eff5d5D6c75154282DF57882f2fDfAB`
- **DAOToken**: `0xB57FBeF85bD1A1643eF9EA3734DAe65494246247`
- **EscrowDAO**: `0x49E4B659f5A4F9BFB34347c5e95f606425E8AD32`

### Database Setup
1. Create a MongoDB Atlas cluster
2. Add your Render IP addresses to the IP whitelist
3. Create a database user with appropriate permissions
4. Use the connection string in the `MONGODB_URI` environment variable

### Post-Deployment
1. Test all API endpoints using the health check: `/api/health`
2. Verify smart contract integration works
3. Test user registration and authentication
4. Verify escrow functionality with Core Wallet
5. Test WhatsApp integration

## Troubleshooting

### Common Issues
- **CORS errors**: Ensure frontend URL is properly configured
- **Database connection**: Check MongoDB Atlas IP whitelist and credentials
- **Environment variables**: Verify all required variables are set
- **Build failures**: Check Node.js version compatibility (requires Node 18+)

### Logs
- Backend logs available in Render dashboard under "Logs" tab
- Frontend build logs available during deployment process

## Support
For deployment issues, check:
1. Render service logs
2. MongoDB Atlas logs
3. Avalanche network status
4. Smart contract addresses and network configuration
