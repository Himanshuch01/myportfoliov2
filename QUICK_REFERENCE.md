# Quick Reference Guide

## 🚀 Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Git Commands
```bash
git add .
git commit -m "Your message"
git push origin main
```

## 📝 Quick Edits

### Update Hero Section
**File**: `components/sections/Hero.tsx`
- Line 32: Change name
- Line 42: Change title/role
- Line 50: Change description
- Line 72-78: Update tech stack

### Update Projects
**File**: `components/sections/Projects.tsx`
- Line 8-50: Edit projects array
- Add/remove projects
- Update tech stack
- Update links

### Update Skills
**File**: `components/sections/Skills.tsx`
- Line 6-38: Edit skill categories
- Update skill levels (0-100)
- Add/remove skills

### Update Experience
**File**: `components/sections/Experience.tsx`
- Line 6-59: Edit experiences array
- Update job titles
- Update achievements
- Update tech stack

### Update Contact Info
**File**: `components/Footer.tsx`
- Line 8-11: Update social links
- Line 74-76: Update contact info

### Update SEO
**File**: `app/layout.tsx`
- Line 20-25: Update title and description
- Line 26-40: Update keywords
- Line 51-65: Update Open Graph tags
- Line 67-73: Update Twitter cards

## 🎨 Styling Quick Reference

### Colors
```tsx
// Primary (Indigo)
className="text-primary-500 bg-primary-500"

// Secondary (Green)
className="text-secondary-500 bg-secondary-500"

// Accent (Amber)
className="text-accent-500 bg-accent-500"

// Gradients
className="gradient-text"              // Multi-color gradient
className="text-gradient-primary"      // Primary gradient
className="bg-gradient-primary"        // Primary background gradient
```

### Components
```tsx
// Buttons
className="btn-primary"       // Primary button
className="btn-secondary"     // Secondary button
className="btn-outline"       // Outline button

// Cards
className="card"              // Glass card with hover
className="card-dark"         // Dark glass card

// Glass Effect
className="glass"             // Light glass
className="glass-dark"        // Dark glass

// Headings
className="heading-1"         // Largest heading
className="heading-2"         // Second largest
className="heading-3"         // Third largest
className="heading-4"         // Fourth largest

// Container
className="container-custom"  // Max-width container

// Section
className="section-padding"   // Standard section padding
```

### Animations
```tsx
// Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Hover Effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// Scroll Animations
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
>
```

## 🔧 Configuration Files

### Tailwind Config
**File**: `tailwind.config.ts`
- Colors: Line 8-67
- Animations: Line 77-95
- Keyframes: Line 96-126

### Next.js Config
**File**: `next.config.ts`
- Image optimization: Line 7-11
- Experimental features: Line 14-16
- Security headers: Line 19-42

### Environment Variables
**File**: `.env.local`
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📦 Adding New Sections

1. Create component in `components/sections/YourSection.tsx`
2. Import in `app/page.tsx`
3. Add to page layout
4. Add to navbar links (`components/Navbar.tsx`)
5. Add to footer links (`components/Footer.tsx`)
6. Add to sitemap (`app/sitemap.ts`)

### Template:
```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function YourSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="your-section" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">
            Your <span className="gradient-text">Section</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Description
          </p>
        </motion.div>

        {/* Your content here */}
      </div>
    </section>
  );
}
```

## 🖼️ Adding Images

### Using Next.js Image
```tsx
import Image from "next/image";

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### Background Images
```tsx
<div className="relative h-64 bg-cover bg-center" 
     style={{ backgroundImage: "url('/your-image.jpg')" }}>
</div>
```

## 🎭 Adding 3D Elements

### Basic Three.js Component
```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Your3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
```

## 📱 Responsive Design

### Breakpoints
```tsx
// Mobile first approach
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="hidden md:block"  // Hide on mobile
className="md:hidden"        // Show only on mobile
```

### Tailwind Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔍 SEO Best Practices

### Meta Tags
```tsx
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your description",
  keywords: ["keyword1", "keyword2"],
  // ... more tags
};
```

### Structured Data
Add to `app/layout.tsx`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Your Name",
      // ... more data
    }),
  }}
/>
```

## 🐛 Common Issues & Fixes

### Issue: Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Types not found
```bash
npm install --save-dev @types/package-name
```

### Issue: Hydration errors
- Check for client/server mismatch
- Use "use client" directive
- Ensure consistent rendering

### Issue: 3D not rendering
- Check WebGL support
- Verify Three.js imports
- Check browser console

## 📊 Performance Optimization

### Image Optimization
```tsx
// Use Next.js Image
import Image from "next/image";

// Use WebP/AVIF
<Image src="/image.webp" ... />

// Lazy load
loading="lazy"
```

### Code Splitting
```tsx
// Dynamic imports
import dynamic from "next/dynamic";

const Component = dynamic(() => import("./Component"), {
  loading: () => <p>Loading...</p>,
});
```

### Font Optimization
```tsx
// Already configured in layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
```

## 🔐 Security

### Environment Variables
- Never commit `.env.local`
- Use `NEXT_PUBLIC_` prefix for client-side
- Keep sensitive data server-side

### Headers
Already configured in `next.config.ts`:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## 📈 Analytics

### Track Events
```tsx
// In your component
const trackEvent = (eventName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      // event parameters
    });
  }
};

// Usage
<button onClick={() => trackEvent("button_click")}>
  Click me
</button>
```

## 🚀 Deployment

### Vercel (One-click)
```bash
vercel
```

### Manual Build
```bash
npm run build
npm start
```

### Environment Variables
Add in deployment platform:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_SITE_URL`

---

**Need more help? Check:**
- README.md
- DEPLOYMENT.md
- SETUP_COMPLETE.md
- [Next.js Docs](https://nextjs.org/docs)
