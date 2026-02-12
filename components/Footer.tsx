"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Himanshuch01", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/himanshuch01", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/himanshuch01", icon: Twitter },
  { name: "Email", href: "mailto:contact@himanshuchauhan.dev", icon: Mail },
];

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-950 border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold gradient-text">
                Himanshu Chauhan
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Full-Stack Engineer specializing in MERN stack and modern web
              technologies. Building scalable solutions for businesses.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:contact@himanshuchauhan.dev"
                  className="hover:text-white transition-colors"
                >
                  contact@himanshuchauhan.dev
                </a>
              </li>
              <li>Available for freelance projects</li>
              <li>Remote & On-site opportunities</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Himanshu Chauhan. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              Built with <Heart size={16} className="text-red-500" /> using
              Next.js & Three.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
