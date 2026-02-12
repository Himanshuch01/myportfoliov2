# 🚀 Deployment Guide - Himanshu Chauhan Portfolio

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Vercel Deployment](#vercel-deployment)
3. [Domain Configuration](#domain-configuration)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)
6. [Monitoring & Analytics](#monitoring--analytics)

---

## Pre-Deployment Checklist

### ✅ Content Verification
- [ ] All sections complete (Hero, About, Projects, Skills, Experience, GitHub, Contact)
- [ ] Content proofread for typos and grammar
- [ ] All links tested and working
- [ ] Contact form tested
- [ ] Resume PDF uploaded to `/public/resume.pdf`
- [ ] Profile image optimized and added
- [ ] Project screenshots/images optimized

### ✅ Technical Verification
- [ ] No console errors in browser
- [ ] All animations working smoothly
- [ ] Mobile responsive (test on real devices)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Forms submit correctly
- [ ] Smooth scroll working
- [ ] Custom cursor working (desktop only)
- [ ] Loading screen displays correctly

### ✅ Performance
- [ ] Run `npm run build` successfully
- [ ] Lighthouse score 90+ (all categories)
- [ ] Images optimized (WebP format)
- [ ] No unused dependencies
- [ ] Bundle size acceptable (<500KB initial load)

### ✅ SEO
- [ ] Meta tags configured in `app/layout.tsx`
- [ ] Open Graph tags set
- [ ] Twitter card tags set
- [ ] Favicon and app icons in `/public`
- [ ] Sitemap generated
- [ ] Robots.txt configured

---

## Vercel Deployment

### Step 1: Prepare Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio deployment"

# Create GitHub repository and push
git remote add origin https://github.com/Himanshuch01/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? portfolio
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
5. Click "Deploy"

### Step 3: Configure Project Settings

In Vercel Dashboard:
1. Go to Project Settings
2. **General**:
   - Node.js Version: 18.x or higher
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next`

---

## Domain Configuration

### Step 1: Add Custom Domain

1. In Vercel Dashboard → Project → Settings → Domains
2. Add domain: `codexhimanshu.xyz`
3. Add www subdomain: `www.codexhimanshu.xyz`

### Step 2: Configure DNS

In your domain registrar (e.g., Namecheap, GoDaddy):

**For Apex Domain (codexhimanshu.xyz):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Automatic
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### Step 3: Verify Domain

1. Wait for DNS propagation (up to 48 hours, usually 10-30 minutes)
2. Vercel will automatically provision SSL certificate
3. Verify HTTPS is working: `https://codexhimanshu.xyz`

### Step 4: Configure Redirects

Create `vercel.json` in root:

```json
{
  "redirects": [
    {
      "source": "/resume",
      "destination": "/resume.pdf",
      "permanent": false
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Environment Variables

### Step 1: Create `.env.local`

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (if using external service)
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your-form-id

# Optional: Email service
EMAIL_SERVICE_API_KEY=your-api-key
```

### Step 2: Add to Vercel

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add each variable:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: Your Google Analytics ID
   - Environment: Production, Preview, Development

---

## Post-Deployment

### Step 1: Verify Deployment

- [ ] Visit `https://codexhimanshu.xyz`
- [ ] Test all sections scroll smoothly
- [ ] Click all navigation links
- [ ] Test contact form submission
- [ ] Verify GitHub stats loading
- [ ] Check mobile responsiveness
- [ ] Test on different browsers

### Step 2: Performance Audit

```bash
# Run Lighthouse audit
# Open Chrome DevTools → Lighthouse → Generate Report

# Target Scores:
# Performance: 95+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 95+
```

### Step 3: SEO Setup

#### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://codexhimanshu.xyz`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://codexhimanshu.xyz/sitemap.xml`

#### Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site: `https://codexhimanshu.xyz`
3. Verify ownership
4. Submit sitemap

---

## Monitoring & Analytics

### Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Verify tracking in GA4 Real-Time reports

### Vercel Analytics

1. Enable in Vercel Dashboard → Project → Analytics
2. Monitor:
   - Page views
   - Unique visitors
   - Top pages
   - Referrers
   - Devices

### Uptime Monitoring

**UptimeRobot** (Free):
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add new monitor:
   - Type: HTTPS
   - URL: `https://codexhimanshu.xyz`
   - Interval: 5 minutes
3. Set up email alerts

---

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys on:
- **Push to `main` branch** → Production
- **Push to other branches** → Preview
- **Pull requests** → Preview

### Manual Deployment

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Rollback

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

---

## Maintenance Schedule

### Weekly
- [ ] Check analytics for traffic
- [ ] Monitor uptime status
- [ ] Review contact form submissions

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Review and update content
- [ ] Check Lighthouse scores

### Quarterly
- [ ] Update projects section with new work
- [ ] Refresh GitHub stats
- [ ] Update resume
- [ ] Review and optimize performance

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Domain Not Working

1. Check DNS propagation: [dnschecker.org](https://dnschecker.org)
2. Verify DNS records in domain registrar
3. Check Vercel domain settings
4. Wait up to 48 hours for propagation

### Performance Issues

1. Run Lighthouse audit
2. Check bundle size: `npm run build`
3. Optimize images (use WebP, compress)
4. Enable caching headers
5. Use CDN for static assets

---

## Support & Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [vercel.com/community](https://vercel.com/community)

---

## 🎉 Congratulations!

Your portfolio is now live at **https://codexhimanshu.xyz**!

### Next Steps:
1. Share on LinkedIn
2. Add to resume/CV
3. Include in email signature
4. Submit to portfolio directories
5. Monitor analytics and iterate

**Good luck with your job search and freelance opportunities!** 🚀
