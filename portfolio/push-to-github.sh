#!/bin/bash

echo "🚀 DIRECT GITHUB DEPLOYMENT SCRIPT"
echo "===================================="
echo ""
echo "This script will push your portfolio directly to GitHub from this environment."
echo ""

# Check if git is configured
echo "Step 1: Configure Git"
echo "--------------------"
read -p "Enter your GitHub username: " github_username
read -p "Enter your email: " github_email

cd /app/portfolio

git config user.name "$github_username"
git config user.email "$github_email"

echo "✅ Git configured!"
echo ""

echo "Step 2: Create GitHub Repository"
echo "---------------------------------"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: shakyadeep-portfolio"
echo "3. Make it Public"
echo "4. DO NOT initialize with README"
echo "5. Click 'Create repository'"
echo ""
read -p "Press ENTER when you've created the repository..."

echo ""
echo "Step 3: Get GitHub Personal Access Token"
echo "----------------------------------------"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token (classic)'"
echo "3. Give it a name: 'Portfolio Deployment'"
echo "4. Check 'repo' scope"
echo "5. Click 'Generate token'"
echo "6. COPY the token (you won't see it again!)"
echo ""
read -p "Paste your GitHub token here: " github_token

echo ""
echo "Step 4: Push to GitHub"
echo "----------------------"

# Add remote with token
git remote remove origin 2>/dev/null || true
git remote add origin https://${github_token}@github.com/${github_username}/shakyadeep-portfolio.git

# Push to GitHub
if git push -u origin main; then
    echo ""
    echo "✅ SUCCESS! Your code is now on GitHub!"
    echo ""
    echo "Repository URL: https://github.com/${github_username}/shakyadeep-portfolio"
    echo ""
    echo "Next Steps:"
    echo "1. Go to: https://vercel.com/new"
    echo "2. Import your repository"
    echo "3. Add environment variable: NEXT_PUBLIC_FORMS_ENDPOINT"
    echo "4. Deploy!"
else
    echo ""
    echo "❌ Push failed. Please check your token and username."
fi
