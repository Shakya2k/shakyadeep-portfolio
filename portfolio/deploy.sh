#!/bin/bash

# Portfolio Deployment Helper Script
# This script helps you deploy the Shakyadeep Bhattacharyya Portfolio to Vercel

set -e

echo "🚀 Portfolio Deployment Helper"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the portfolio directory?"
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo ""

# Step 1: Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git repository not initialized."
    read -p "Initialize git repository? (y/n): " init_git
    if [ "$init_git" = "y" ]; then
        git init
        echo "✅ Git initialized"
    else
        echo "❌ Git is required for deployment. Exiting."
        exit 1
    fi
fi

# Step 2: Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes."
    git status --short
    read -p "Commit all changes? (y/n): " commit_changes
    if [ "$commit_changes" = "y" ]; then
        git add .
        read -p "Commit message: " commit_msg
        git commit -m "$commit_msg"
        echo "✅ Changes committed"
    fi
fi

# Step 3: Build test
echo ""
echo "🔨 Running build test..."
if yarn build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Step 4: Check for GitHub remote
echo ""
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  No GitHub remote found."
    echo ""
    echo "Please create a GitHub repository and add it as remote:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository"
    echo "3. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo ""
    read -p "Press Enter after adding remote, or 'q' to quit: " continue
    if [ "$continue" = "q" ]; then
        exit 0
    fi
fi

# Step 5: Push to GitHub
echo ""
read -p "Push to GitHub? (y/n): " push_github
if [ "$push_github" = "y" ]; then
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    if git push origin "$current_branch"; then
        echo "✅ Pushed to GitHub"
    else
        echo "⚠️  Push failed. You may need to set upstream:"
        echo "   git push -u origin $current_branch"
    fi
fi

# Step 6: Environment variables reminder
echo ""
echo "📝 IMPORTANT: Don't forget to set environment variables in Vercel:"
echo ""
echo "Required:"
echo "  - NEXT_PUBLIC_FORMS_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID"
echo ""
echo "Optional:"
echo "  - NEXT_PUBLIC_CF_ANALYTICS_TOKEN=YOUR_CF_TOKEN"
echo "  - NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX"
echo ""

# Step 7: Vercel deployment
echo "🌐 Ready to deploy to Vercel!"
echo ""
echo "Choose deployment method:"
echo "1. Deploy via Vercel Dashboard (Recommended)"
echo "2. Deploy via Vercel CLI"
echo "3. Skip (I'll deploy manually)"
echo ""
read -p "Select option (1-3): " deploy_option

case $deploy_option in
    1)
        echo ""
        echo "📱 Deploy via Vercel Dashboard:"
        echo "1. Go to https://vercel.com"
        echo "2. Click 'Add New...' → 'Project'"
        echo "3. Import your GitHub repository"
        echo "4. Add environment variables"
        echo "5. Click 'Deploy'"
        echo ""
        read -p "Press Enter to open Vercel Dashboard..." 
        if command -v xdg-open &> /dev/null; then
            xdg-open "https://vercel.com/new" &
        elif command -v open &> /dev/null; then
            open "https://vercel.com/new" &
        else
            echo "Visit: https://vercel.com/new"
        fi
        ;;
    2)
        echo ""
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm i -g vercel
        fi
        echo "Running Vercel deployment..."
        vercel
        echo ""
        read -p "Deploy to production? (y/n): " deploy_prod
        if [ "$deploy_prod" = "y" ]; then
            vercel --prod
            echo "✅ Deployed to production!"
        fi
        ;;
    3)
        echo "Skipping deployment. Deploy manually when ready."
        ;;
    *)
        echo "Invalid option. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment process complete!"
echo ""
echo "📚 Next steps:"
echo "1. Test your live site"
echo "2. Replace placeholder images in /public/images/EDIT_ME/"
echo "3. Update content in /content/*.json files"
echo "4. Add your resume PDF to /public/"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
