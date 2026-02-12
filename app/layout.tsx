import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://himanshuchauhan.dev"),
  title: {
    default: "Himanshu Chauhan | Full-Stack Engineer | MERN Stack Developer",
    template: "%s | Himanshu Chauhan",
  },
  description:
    "Full-Stack Engineer specializing in MERN stack, Next.js, TypeScript, and modern web technologies. Building scalable commercial applications and AI-powered platforms.",
  keywords: [
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js Developer",
    "TypeScript",
    "React Developer",
    "Node.js",
    "MongoDB",
    "AWS",
    "Docker",
    "Freelance Developer",
    "Web Development",
    "AI Development",
  ],
  authors: [{ name: "Himanshu Chauhan" }],
  creator: "Himanshu Chauhan",
  publisher: "Himanshu Chauhan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://himanshuchauhan.dev",
    title: "Himanshu Chauhan | Full-Stack Engineer",
    description:
      "Full-Stack Engineer specializing in MERN stack, Next.js, and modern web technologies.",
    siteName: "Himanshu Chauhan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Himanshu Chauhan - Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Chauhan | Full-Stack Engineer",
    description:
      "Full-Stack Engineer specializing in MERN stack, Next.js, and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@himanshuch01",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className="antialiased">
        <LoadingScreen />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
