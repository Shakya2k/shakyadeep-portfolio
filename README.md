# Shakyadeep Bhattacharyya - Portfolio Website

A production-ready personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a dark futuristic design with animated KPIs, skill bars, and interactive elements.

## 🚀 Live Demo

[Deploy to Vercel](#deployment)

## ✨ Features

- **Dashboard-Style Home**: Tableau-inspired hero section with animated KPI cards and skill bars
- **Experience Timeline**: Professional journey with company logos and highlights
- **Project Showcase**: STAR-format project details with category filtering
- **Interactive Skills Game**: Match-the-cards game to reveal skills
- **Contact Form**: Serverless form with Formspree integration
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Fully Responsive**: Mobile-first design
- **Analytics Ready**: Cloudflare Web Analytics + optional Google Analytics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)
- **Form Backend**: Formspree (serverless)

## 📝 Content Management

All content is managed via JSON files — no code changes needed!

### Edit Projects

File: `/content/projects.json`

```json
[
  {
    "id": "project-slug",
    "title": "Project Title",
    "category": "Academic/Professional/Consulting/Freelance/Personal",
    "organization": "Company/School Name",
    "thumbnail": "/images/EDIT_ME/project-image.png",
    "shortDescription": "Brief description",
    "situation": "STAR - Situation",
    "task": "STAR - Task",
    "actionNonTech": "STAR - Non-technical actions",
    "actionTech": "STAR - Technical implementation",
    "resultBusiness": "STAR - Business impact",
    "resultTech": "STAR - Technical achievement",
    "tags": ["Python", "Machine Learning"]
  }
]
```

### Edit Experience

File: `/content/experience.json`

```json
[
  {
    "id": "company-slug",
    "company": "Company Name",
    "role": "Job Title",
    "department": "Department/Division",
    "type": "Professional/Consulting/Academic",
    "startDate": "2021",
    "endDate": "2023",
    "logo": "/images/EDIT_ME/logo-company.png",
    "description": "Brief role description",
    "highlights": [
      "Achievement 1",
      "Achievement 2"
    ]
  }
]
```

## 🖼️ Replace Placeholder Images

All placeholder images are in `/public/images/EDIT_ME/`:

1. **Profile Photo**: `/public/images/EDIT_ME/profile.jpg`
2. **Company Logos**: `/public/images/EDIT_ME/logo-*.png`
3. **Project Thumbnails**: `/public/images/EDIT_ME/project-*.png`
4. **Resume PDF**: `/public/Shakyadeep_Bhattacharyya_Resume.pdf`

**Recommended Image Sizes**:
- Profile: 512x512px (square)
- Logos: 200x200px (square, transparent PNG)
- Project Thumbnails: 1200x630px (landscape)

## ⚙️ Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Copy `.env.local` and update the values:

```bash
cp .env.local .env.local.example
```

Edit `.env.local`:

```env
# REQUIRED: Formspree endpoint for contact form
NEXT_PUBLIC_FORMS_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# OPTIONAL: Cloudflare Web Analytics
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=YOUR_CF_TOKEN

# OPTIONAL: Google Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Get Formspree Endpoint:

1. Go to [formspree.io](https://formspree.io)
2. Sign up (free tier available)
3. Create a new form
4. Copy the endpoint URL (e.g., `https://formspree.io/f/abc123xyz`)
5. Paste into `.env.local` as `NEXT_PUBLIC_FORMS_ENDPOINT`

#### Get Cloudflare Analytics Token (Optional):

1. Go to [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)
2. Add your site
3. Copy the token
4. Paste into `.env.local` as `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`

### 4. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Add Environment Variables**:

   In Vercel dashboard → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_FORMS_ENDPOINT`
   - `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` (optional)
   - `NEXT_PUBLIC_GA_ID` (optional)

4. **Deploy**:

   Vercel automatically builds and deploys on every push to `main`.

### Deploy to Other Platforms

**Build for production**:

```bash
yarn build
```

**Start production server**:

```bash
yarn start
```

## 📝 Customization

### Change Colors

Edit `/tailwind.config.ts`:

```typescript
colors: {
  background: "#0b0f17",     // Dark navy base
  foreground: "#f8fafc",     // Light text
  primary: {
    DEFAULT: "#4ade80",      // Green accent
    dark: "#22c55e",
  },
  secondary: {
    DEFAULT: "#60a5fa",      // Blue accent
    dark: "#3b82f6",
  },
  accent: {
    DEFAULT: "#9b5de5",      // Purple accent
    dark: "#7c3aed",
  },
}
```

### Update Personal Info

1. **Meta Tags**: Edit `/app/layout.tsx` → `export const metadata`
2. **About Bio**: Edit `/app/about/page.tsx`
3. **Footer Links**: Edit `/components/Footer.tsx`
4. **Navigation Logo**: Edit `/components/Navigation.tsx`

### Add New Pages

Create a new folder in `/app/` with a `page.tsx`:

```bash
mkdir app/new-page
touch app/new-page/page.tsx
```

## 🐛 Troubleshooting

### Contact Form Not Working

- ✅ Check `NEXT_PUBLIC_FORMS_ENDPOINT` in `.env.local`
- ✅ Verify Formspree endpoint is correct
- ✅ Check browser console for errors
- ✅ Ensure environment variables are set in Vercel (if deployed)

### Images Not Loading

- ✅ Check file paths in `/content/*.json`
- ✅ Ensure images exist in `/public/images/EDIT_ME/`
- ✅ Use absolute paths starting with `/`

### Build Errors

- ✅ Run `yarn build` locally first
- ✅ Check for TypeScript errors
- ✅ Verify all JSON files have valid syntax

## 📚 Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── experience/         # Experience page
│   ├── projects/           # Projects listing + [slug] dynamic route
│   ├── about/              # About page
│   ├── skills-game/        # Skills game page
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout + SEO
│   └── globals.css         # Global styles
├── components/             # Reusable React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── KPICard.tsx
│   ├── CountUp.tsx
│   └── SkillBar.tsx
├── content/                # JSON content files
│   ├── projects.json
│   └── experience.json
├── public/                 # Static assets
│   ├── images/EDIT_ME/     # Placeholder images (REPLACE THESE!)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── Shakyadeep_Bhattacharyya_Resume.pdf
├── .env.local              # Environment variables (EDIT THIS!)
├── tailwind.config.ts      # Tailwind configuration
├── package.json
└── README.md               # This file
```

## 💬 Support

For issues or questions:

- 📞 Contact via the portfolio contact form
- 💼 LinkedIn: [linkedin.com/in/shakyadeep](https://linkedin.com/in/shakyadeep)
- 💻 GitHub: [github.com/Shakya2k](https://github.com/Shakya2k)

## 📜 License

MIT License - Feel free to use this as a template for your own portfolio!

---

**Built with ❤️ by Shakyadeep Bhattacharyya**
