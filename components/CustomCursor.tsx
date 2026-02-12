"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState("#6366f1"); // Default indigo

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for cursor movement
    window.addEventListener("mousemove", moveCursor);

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Update cursor color based on section
    const updateCursorColor = () => {
      const scrollY = window.scrollY;
      const sections = [
        { id: "home", color: "#6366f1" }, // Indigo
        { id: "about", color: "#6366f1" }, // Indigo
        { id: "projects", color: "#10b981" }, // Green
        { id: "skills", color: "#f59e0b" }, // Amber
        { id: "experience", color: "#6366f1" }, // Indigo
        { id: "github", color: "#10b981" }, // Green
        { id: "contact", color: "#a855f7" }, // Purple
      ];

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setCursorColor(section.color);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", updateCursorColor, { passive: true });
    updateCursorColor();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", updateCursorColor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.6,
          }}
          transition={{ duration: 0.2 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Outer ring */}
          <div
            className="w-8 h-8 rounded-full border-2"
            style={{
              borderColor: cursorColor,
              boxShadow: `0 0 20px ${cursorColor}40`,
            }}
          />
          {/* Inner dot */}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: cursorColor,
              boxShadow: `0 0 10px ${cursorColor}`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Particle trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: [0, 1, 0],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: cursorColor,
            filter: `blur(4px)`,
          }}
        />
      </motion.div>
    </>
  );
}
