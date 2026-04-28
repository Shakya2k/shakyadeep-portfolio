# QUICK START: Deploy Your Portfolio in 5 Minutes

## 🎯 What You Need
1. GitHub account (free)
2. Vercel account (free) - sign up at https://vercel.com
3. Formspree account (free) - sign up at https://formspree.io

---

## 🚀 Deployment Steps

### Step 1: Get Formspree Endpoint (2 minutes)
1. Go to https://formspree.io and sign up
2. Create a new form called "Portfolio Contact"
3. Copy your endpoint: `https://formspree.io/f/abc123xyz`
4. Save it - you'll need it in Step 3

### Step 2: Push to GitHub (2 minutes)
```bash
cd /app/portfolio

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Deploy to Vercel (1 minute)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your portfolio repo
4. Add environment variable:
   - Name: `NEXT_PUBLIC_FORMS_ENDPOINT`
   - Value: Your Formspree endpoint from Step 1
5. Click "Deploy"

**That's it! Your site will be live in 2-3 minutes at `https://your-project.vercel.app`**

---

## ✅ Post-Deployment

### Test Your Site
- Visit your Vercel URL
- Test contact form
- Check all pages load

### Replace Placeholders
```bash
# Replace these files:
/app/portfolio/public/images/EDIT_ME/profile.jpg
/app/portfolio/public/images/EDIT_ME/logo-*.png
/app/portfolio/public/images/EDIT_ME/project-*.png
/app/portfolio/public/Shakyadeep_Bhattacharyya_Resume.pdf
```

### Update Content (Optional)
Edit these files and push to GitHub:
- `/app/portfolio/content/projects.json`
- `/app/portfolio/content/experience.json`

Vercel will auto-deploy your changes!

---

## 📞 Need Help?

See detailed instructions in `DEPLOYMENT.md` or run:
```bash
cd /app/portfolio
./deploy.sh
```

---

**Your portfolio is ready to launch! 🎉**
