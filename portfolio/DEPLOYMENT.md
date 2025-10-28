# 🚀 DEPLOYMENT GUIDE

## Prerequisites

Before deploying, ensure you have:
- ✅ A GitHub account
- ✅ A Vercel account (free tier available at https://vercel.com)
- ✅ Git installed on your machine
- ✅ Formspree account and endpoint (for contact form)

---

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
cd /app/portfolio
git init
git add .
git commit -m "Initial commit: Shakyadeep Bhattacharyya Portfolio"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `shakyadeep-portfolio`)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up Formspree (Contact Form)

1. Go to https://formspree.io
2. Sign up for a free account
3. Click "New Form"
4. Name it "Portfolio Contact Form"
5. Copy your form endpoint (looks like: `https://formspree.io/f/abc123xyz`)
6. **Save this endpoint** - you'll need it in Step 3

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up or log in
   - Connect your GitHub account if not already connected

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your portfolio repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `yarn build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   Name: NEXT_PUBLIC_FORMS_ENDPOINT
   Value: https://formspree.io/f/YOUR_FORM_ID
   ```
   
   **Optional Analytics:**
   ```
   Name: NEXT_PUBLIC_CF_ANALYTICS_TOKEN
   Value: YOUR_CLOUDFLARE_TOKEN
   ```
   
   ```
   Name: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://YOUR_PROJECT.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd /app/portfolio
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? shakyadeep-portfolio
# - Directory? ./
# - Override settings? No

# After deployment, add environment variables:
vercel env add NEXT_PUBLIC_FORMS_ENDPOINT
# Paste your Formspree endpoint when prompted

# Deploy to production
vercel --prod
```

---

## Step 4: Configure Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `shakyadeep.com`)
3. Follow DNS configuration instructions
4. Update `sitemap.xml` and `robots.txt` with your actual domain

---

## Step 5: Post-Deployment Checklist

### ✅ Test All Pages
- [ ] Home page loads correctly
- [ ] Experience page displays properly
- [ ] Projects page shows all projects
- [ ] Individual project pages work
- [ ] About page loads
- [ ] Skills game is playable
- [ ] Contact form submits successfully

### ✅ Test Contact Form
1. Go to `/contact`
2. Fill in name, email, and message
3. Click "Send Message"
4. Check Formspree dashboard for submission
5. Verify you receive email notification

### ✅ Test Mobile Responsiveness
- [ ] Test on mobile device or Chrome DevTools
- [ ] Navigation menu works
- [ ] All sections are readable
- [ ] Images load correctly

### ✅ Replace Placeholder Content
- [ ] Upload real profile photo to `/public/images/EDIT_ME/profile.jpg`
- [ ] Upload company logos
- [ ] Upload project thumbnails
- [ ] Replace resume PDF at `/public/Shakyadeep_Bhattacharyya_Resume.pdf`
- [ ] Update JSON files in `/content/` if needed

---

## Step 6: Continuous Deployment

✅ **Automatic Deployments:**
Every time you push to the `main` branch, Vercel automatically:
1. Detects the push
2. Builds your project
3. Deploys to production
4. Provides a unique deployment URL

✅ **Preview Deployments:**
- Every pull request gets a unique preview URL
- Test changes before merging to main
- Share preview links with others

---

## Updating Content After Deployment

### Update Projects or Experience:

```bash
cd /app/portfolio

# Edit JSON files
nano content/projects.json
nano content/experience.json

# Commit and push
git add content/
git commit -m "Update project information"
git push origin main
```

Vercel will automatically rebuild and redeploy in ~2 minutes.

---

## Troubleshooting

### Build Fails on Vercel

**Check build logs:**
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the failed deployment
3. View build logs

**Common issues:**
- Missing environment variables → Add in Vercel Dashboard
- TypeScript errors → Fix in your local code and push again
- Dependency issues → Check `package.json` and `yarn.lock`

### Contact Form Not Working

1. Verify `NEXT_PUBLIC_FORMS_ENDPOINT` is set in Vercel
2. Check Formspree dashboard for submissions
3. Test form endpoint directly in browser
4. Ensure environment variable starts with `NEXT_PUBLIC_`

### Images Not Loading

1. Ensure images are in `/public/images/EDIT_ME/`
2. Check file paths in JSON files start with `/`
3. Verify image files are committed to Git
4. Check browser console for 404 errors

### 404 Errors on Project Pages

1. Ensure `[slug]` folder exists: `/app/projects/[slug]/page.tsx`
2. Check project IDs in `projects.json` match URL slugs
3. Rebuild and redeploy

---

## Analytics Setup

### Cloudflare Web Analytics (Recommended - Free & Privacy-Friendly)

1. Go to https://www.cloudflare.com/web-analytics/
2. Add your site
3. Copy the token
4. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_CF_ANALYTICS_TOKEN=your_token_here
   ```
5. Redeploy

### Google Analytics (Optional)

1. Get GA4 measurement ID from Google Analytics
2. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Uncomment GA code in `/app/layout.tsx` (lines 50-62)
4. Commit and push

---

## Your Deployment URLs

After successful deployment, you'll have:

- **Production:** `https://YOUR_PROJECT.vercel.app`
- **Custom Domain (if configured):** `https://yourdomain.com`
- **Git Repository:** `https://github.com/YOUR_USERNAME/YOUR_REPO`

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Formspree Docs:** https://help.formspree.io
- **GitHub:** Open an issue in your repository

---

## Quick Commands Reference

```bash
# Build locally
yarn build

# Start production server locally
yarn start

# Deploy to Vercel (after initial setup)
vercel --prod

# View deployment logs
vercel logs

# Check environment variables
vercel env ls
```

---

**🎉 Congratulations! Your portfolio is now live!**

Don't forget to:
1. ✅ Test all functionality
2. ✅ Replace placeholder images
3. ✅ Update content in JSON files
4. ✅ Share your portfolio URL on LinkedIn!

---

**Portfolio URL:** `https://YOUR_PROJECT.vercel.app`

**Last Updated:** $(date)
