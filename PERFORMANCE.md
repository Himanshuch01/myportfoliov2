# ⚡ Performance Optimization Guide

## Current Performance Status

### Lighthouse Scores (Target: 90+)
- **Performance**: 🎯 Target 95+
- **Accessibility**: 🎯 Target 95+
- **Best Practices**: 🎯 Target 95+
- **SEO**: 🎯 Target 95+

### Core Web Vitals (Target)
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## Optimization Checklist

### ✅ Images

**Current Status:**
- Using Next.js Image component where applicable
- Lazy loading enabled for below-fold images

**Recommendations:**
1. **Convert to WebP format:**
   ```bash
   # Install sharp for image optimization
   npm install sharp
   
   # Convert images to WebP
   npx @squoosh/cli --webp auto public/images/*.{jpg,png}
   ```

2. **Add blur placeholders:**
   ```tsx
   <Image
     src="/images/profile.jpg"
     alt="Profile"
     width={400}
     height={400}
     placeholder="blur"
     blurDataURL="data:image/jpeg;base64,..."
   />
   ```

3. **Optimize image sizes:**
   - Profile images: 400x400px, < 100KB
   - Project screenshots: 800x600px, < 150KB
   - Icons: SVG format preferred

### ✅ Fonts

**Current Status:**
- Using Google Fonts (Inter, JetBrains Mono)
- Font display: swap

**Optimizations:**
- ✅ Variable fonts used
- ✅ Subset to Latin characters only
- ✅ Preload critical fonts
- ✅ Font display: swap

### ✅ JavaScript Bundle

**Check bundle size:**
```bash
npm run build

# Look for output like:
# Route (app)                              Size     First Load JS
# ┌ ○ /                                    5.02 kB        87.3 kB
```

**Optimization Strategies:**

1. **Dynamic Imports for heavy components:**
   ```tsx
   // Example: Lazy load 3D components
   const TechStackNetwork = dynamic(() => import('@/components/3d/TechStackNetwork'), {
     ssr: false,
     loading: () => <div>Loading...</div>
   })
   ```

2. **Code splitting:**
   - Already handled by Next.js automatically
   - Each page/route is a separate chunk

3. **Tree shaking:**
   - Import only what you need:
     ```tsx
     // ❌ Bad
     import * as Icons from 'lucide-react'
     
     // ✅ Good
     import { Mail, Phone, Github } from 'lucide-react'
     ```

### ✅ CSS Optimization

**Current Status:**
- Using Tailwind CSS (JIT mode)
- Purging unused styles in production

**Optimizations:**
- ✅ JIT mode enabled
- ✅ Unused styles purged
- ✅ Critical CSS inlined by Next.js

### ✅ Third-Party Scripts

**Optimization:**
1. **Use Next.js Script component:**
   ```tsx
   import Script from 'next/script'
   
   // In layout or page
   <Script
     src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
     strategy="afterInteractive"
   />
   ```

2. **Defer non-critical scripts:**
   - Analytics: `strategy="afterInteractive"`
   - Ads: `strategy="lazyOnload"`

### ✅ Animations

**Current Status:**
- Using Framer Motion for animations
- Spring physics for smooth interactions

**Optimizations:**
1. **Reduce motion for accessibility:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

2. **Use CSS transforms (GPU-accelerated):**
   ```tsx
   // ✅ Good - GPU accelerated
   transform: translate3d(0, 0, 0)
   
   // ❌ Avoid - CPU intensive
   top: 0; left: 0;
   ```

3. **Limit concurrent animations:**
   - Stagger animations instead of all at once
   - Use `useInView` to trigger only when visible

---

## Performance Testing

### 1. Lighthouse Audit

```bash
# Run in Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Analyze page load"
```

**Target Scores:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### 2. WebPageTest

1. Go to [webpagetest.org](https://www.webpagetest.org)
2. Enter URL: `https://codexhimanshu.xyz`
3. Location: Choose nearest
4. Browser: Chrome
5. Run test

**Target Metrics:**
- First Byte Time: < 200ms
- Start Render: < 1.5s
- Speed Index: < 2.5s
- Fully Loaded: < 4s

### 3. Core Web Vitals

**Check in Google Search Console:**
1. Go to Search Console
2. Navigate to "Core Web Vitals"
3. Monitor LCP, FID, CLS

**Or use Chrome DevTools:**
1. Open DevTools
2. Go to Performance tab
3. Record page load
4. Check Web Vitals in summary

---

## Production Build Optimization

### 1. Build Configuration

**next.config.ts:**
```typescript
const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compress output
  compress: true,
  
  // Production optimizations
  swcMinify: true,
  
  // Experimental features
  experimental: {
    optimizeCss: true,
  },
}
```

### 2. Build and Analyze

```bash
# Build for production
npm run build

# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### 3. Compression

Vercel automatically enables:
- Brotli compression
- Gzip compression
- HTTP/2 server push

---

## Monitoring Performance

### 1. Vercel Analytics

**Enable in Vercel Dashboard:**
1. Go to Project → Analytics
2. Enable Web Analytics
3. Monitor:
   - Real User Monitoring (RUM)
   - Core Web Vitals
   - Page load times

### 2. Google Analytics 4

**Track Performance:**
```tsx
// Track page load time
useEffect(() => {
  const loadTime = window.performance.timing.loadEventEnd - 
                   window.performance.timing.navigationStart;
  
  gtag('event', 'page_load', {
    value: loadTime,
    metric_id: 'page_load_time'
  });
}, []);
```

### 3. Real User Monitoring

**Use web-vitals library:**
```bash
npm install web-vitals
```

```tsx
// app/layout.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

useEffect(() => {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}, []);
```

---

## Common Performance Issues & Fixes

### Issue 1: Large JavaScript Bundle

**Solution:**
- Use dynamic imports for heavy components
- Lazy load below-fold content
- Remove unused dependencies

### Issue 2: Slow Image Loading

**Solution:**
- Use Next.js Image component
- Optimize image sizes
- Use WebP format
- Add blur placeholders

### Issue 3: Layout Shift (CLS)

**Solution:**
- Set explicit width/height on images
- Reserve space for dynamic content
- Use CSS aspect-ratio

### Issue 4: Slow First Paint

**Solution:**
- Reduce loading screen duration
- Inline critical CSS
- Preload important resources
- Optimize fonts

### Issue 5: Animation Jank

**Solution:**
- Use CSS transforms (translate, scale)
- Avoid animating layout properties
- Use `will-change` sparingly
- Reduce concurrent animations

---

## Performance Budget

### Target Metrics

| Metric | Budget | Current |
|--------|--------|---------|
| Initial JS | < 200KB | Check with build |
| Initial CSS | < 50KB | Check with build |
| Total Page Size | < 1MB | Check with DevTools |
| Requests | < 50 | Check with DevTools |
| Time to Interactive | < 3s | Check with Lighthouse |

### Monitor Budget

```bash
# Check bundle size after build
npm run build

# Look for warnings about large bundles
```

---

## Optimization Roadmap

### Phase 1: Critical (Pre-Launch)
- [x] Optimize images (WebP, compression)
- [x] Enable font optimization
- [x] Configure caching headers
- [x] Minify CSS/JS (automatic with Next.js)
- [x] Enable compression (automatic with Vercel)

### Phase 2: Important (Week 1)
- [ ] Add blur placeholders to images
- [ ] Implement lazy loading for heavy components
- [ ] Monitor Core Web Vitals
- [ ] Set up performance monitoring

### Phase 3: Nice to Have (Month 1)
- [ ] Implement service worker for offline support
- [ ] Add resource hints (preconnect, prefetch)
- [ ] Optimize third-party scripts
- [ ] Implement progressive image loading

---

## Resources

- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **Web Vitals**: https://web.dev/vitals
- **Next.js Performance**: https://nextjs.org/docs/advanced-features/measuring-performance
- **Vercel Analytics**: https://vercel.com/analytics
- **WebPageTest**: https://www.webpagetest.org

---

## Performance Checklist

- [ ] Run Lighthouse audit (all 90+)
- [ ] Check Core Web Vitals
- [ ] Optimize images (WebP, compression)
- [ ] Enable font optimization
- [ ] Configure caching headers
- [ ] Monitor bundle size
- [ ] Test on slow 3G network
- [ ] Test on low-end devices
- [ ] Enable Vercel Analytics
- [ ] Set up performance monitoring

---

**Target: All Lighthouse scores 95+ before launch! 🎯**
