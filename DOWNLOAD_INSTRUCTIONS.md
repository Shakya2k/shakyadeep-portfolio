# 📦 DOWNLOAD & DEPLOY YOUR PORTFOLIO

## Step 1: Download Your Portfolio Code

**The portfolio archive is ready at:** `/app/portfolio-shakyadeep.tar.gz` (634KB)

**To download it to your local machine:**

### Option A: If you have terminal access to this environment
```bash
# The file is at: /app/portfolio-shakyadeep.tar.gz
# Download this file to your local machine
```

### Option B: Request download from support
Contact your platform support to download the file: `/app/portfolio-shakyadeep.tar.gz`

---

## Step 2: Extract on Your Local Machine

Once downloaded to your computer:

```bash
# Extract the archive
tar -xzf portfolio-shakyadeep.tar.gz

# Navigate to portfolio folder
cd portfolio

# Install dependencies
yarn install
# OR
npm install

# Test locally (optional)
yarn dev
# Visit http://localhost:3000
```

---

## Step 3: Deploy to GitHub & Vercel

Now follow the original deployment steps:

### 3A. Get Formspree Endpoint
1. Go to https://formspree.io
2. Sign up → Create form
3. Copy endpoint URL (e.g., `https://formspree.io/f/abc123xyz`)

### 3B. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `shakyadeep-portfolio`
3. Make it Public
4. Click "Create repository"

### 3C. Push Code to GitHub
```bash
cd portfolio
git remote add origin https://github.com/YOUR_USERNAME/shakyadeep-portfolio.git
git branch -M main
git push -u origin main
```

### 3D. Deploy to Vercel
1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Import your repository
4. Add environment variable:
   - Name: `NEXT_PUBLIC_FORMS_ENDPOINT`
   - Value: Your Formspree endpoint
5. Click "Deploy"

**Your site will be live in 2-3 minutes!** 🎉

---

## 📂 What's Included

Your portfolio package contains:
- ✅ Next.js 14 application (TypeScript + Tailwind)
- ✅ Your professional headshot
- ✅ All pages (Home, Projects, Experience, About, Skills Game, Contact)
- ✅ Dark futuristic design with animated KPIs
- ✅ JSON-based content management
- ✅ SEO optimization (sitemap, robots.txt)
- ✅ Vercel deployment configuration
- ✅ Comprehensive documentation (README.md, DEPLOYMENT.md)

---

## 🔄 Alternative: Use Vercel CLI

If you prefer command line deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to portfolio
cd portfolio

# Login and deploy
vercel login
vercel

# Add environment variable
vercel env add NEXT_PUBLIC_FORMS_ENDPOINT
# Then paste your Formspree endpoint

# Deploy to production
vercel --prod
```

---

## 🆘 Need Help?

All documentation is included in the portfolio folder:
- `README.md` - Complete overview
- `DEPLOYMENT.md` - Detailed deployment guide
- `QUICKSTART.md` - 5-minute guide
- `DEPLOYMENT_STEPS.txt` - Step-by-step checklist

---

## 📝 Post-Deployment Updates

After deployment, to update content:

1. Edit files locally (e.g., `content/projects.json`)
2. Commit: `git add . && git commit -m "Update content"`
3. Push: `git push origin main`
4. Vercel auto-deploys in ~2 minutes! ✨

---

**Your Portfolio URL will be:** `https://shakyadeep-portfolio.vercel.app`

(You can add a custom domain later in Vercel dashboard)
