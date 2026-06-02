# Deploy Weather App to Vercel - Quick Guide

## Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

## Step 2: Deploy using One of These Methods:

### Method 1: Using Git & Vercel Dashboard (Recommended)
1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Weather app ready for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/weather-app.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Click "Deploy" - Vercel will auto-detect React + Vite setup

### Method 2: Using Vercel CLI
1. Open terminal in your project folder
2. Run:
   ```bash
   vercel
   ```
3. Follow the prompts:
   - Link to existing project or create new
   - Accept default settings (Vercel detects Vite automatically)
   - Confirm deployment

### Method 3: Using GitHub Integration (Easiest)
1. Push project to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Select "Import Git Repository"
4. Authenticate with GitHub
5. Select your weather-app repository
6. Click "Import" → "Deploy"

## Environment Variables (If Needed)
The API key is hardcoded in your App.jsx. For production:
1. Create `.env` file:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

2. Update App.jsx to use:
   ```javascript
   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
   ```

3. Add to Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add `VITE_WEATHER_API_KEY` with your API key

## Verify Deployment
- Check build logs in Vercel dashboard
- Your app will be live at: `https://your-project-name.vercel.app`
- Custom domain setup available in project settings

## Post-Deployment Checklist
✓ App loads correctly
✓ Search functionality works
✓ Weather data displays
✓ Forecast shows 5-day data
✓ Responsive on mobile

## Troubleshooting
- **Build fails**: Check Node version (should be 16+)
- **API not working**: Verify API key is set in environment variables
- **Blank page**: Check browser console for errors
- **CORS issues**: API key should handle this automatically

## Need Help?
- Vercel Docs: https://vercel.com/docs
- React + Vite Guide: https://vitejs.dev/guide/ssr.html
