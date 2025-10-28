# 📥 DEPLOYMENT OPTIONS - CHOOSE ONE

## ✨ OPTION 1: DIRECT PUSH TO GITHUB (RECOMMENDED - NO DOWNLOAD NEEDED!)

**Push your code directly from this environment to GitHub:**

### Step 1: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `shakyadeep-portfolio`
3. Make it **Public**
4. **DO NOT** initialize with README
5. Click "Create repository"

### Step 2: Get GitHub Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Portfolio Deployment"
4. Check: `repo` (full control of private repositories)
5. Click "Generate token"
6. **COPY the token** (save it somewhere - you won't see it again!)

### Step 3: Run These Commands

Replace the placeholders with your actual information:

```bash
cd /app/portfolio

# Configure git
git config user.name "YOUR_GITHUB_USERNAME"
git config user.email "YOUR_EMAIL"

# Add remote with your token
git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/shakyadeep-portfolio.git

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git config user.name "Shakya2k"
git config user.email "your.email@example.com"
git remote add origin https://ghp_abc123xyz@github.com/Shakya2k/shakyadeep-portfolio.git
git push -u origin main
```

✅ **Done!** Your code is now on GitHub.

### Step 4: Deploy to Vercel
1. Go to: https://vercel.com/new
2. Import your repository
3. Add environment variable:
   - Name: `NEXT_PUBLIC_FORMS_ENDPOINT`
   - Value: Your Formspree endpoint (get from https://formspree.io)
4. Click "Deploy"

🎉 **Live in 2 minutes!**

---

## 💻 OPTION 2: DOWNLOAD TO YOUR LOCAL MACHINE

### Method A: Using Terminal (if you have access)

If you can run commands on your local machine that connects to this environment:

```bash
# Download the archive
scp user@host:/app/portfolio-shakyadeep.tar.gz ~/Downloads/

# Or using curl/wget if HTTP access is available
curl -O http://[environment-url]:8080/portfolio-shakyadeep.tar.gz
```

### Method B: Request Platform Support

Contact the platform support and request to download:
- File path: `/app/portfolio-shakyadeep.tar.gz`
- File size: 634 KB

### After Download:
```bash
# Extract
tar -xzf portfolio-shakyadeep.tar.gz
cd portfolio

# Install dependencies
yarn install

# Test locally (optional)
yarn dev

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/shakyadeep-portfolio.git
git push -u origin main

# Deploy to Vercel
Go to: https://vercel.com/new
```

---

## 🎯 RECOMMENDED: OPTION 1 (Direct Push)

**Option 1 is faster and easier** - no download needed!

Just need:
1. GitHub repository (free)
2. GitHub Personal Access Token (free)
3. 5 minutes of your time

---

## 📋 Quick Checklist

Before deployment, make sure you have:
- [ ] GitHub account
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Formspree account (sign up at https://formspree.io)
- [ ] GitHub Personal Access Token (for Option 1)

---

## 🆘 Need Help?

The code is ready at: `/app/portfolio/`

Run the automated script:
```bash
cd /app/portfolio
./push-to-github.sh
```

This interactive script will guide you through the entire process!
