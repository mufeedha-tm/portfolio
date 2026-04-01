import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor({ isDesktop }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Spring config for buttery smooth lag
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);
  const cursorX2 = useSpring(-100, { ...springConfig, damping: 30, stiffness: 100 });
  const cursorY2 = useSpring(-100, { ...springConfig, damping: 30, stiffness: 100 });

  useEffect(() => {
    if (!isDesktop) return; // Don't run cursor logic on mobile
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      cursorX2.set(e.clientX - 150);
      cursorY2.set(e.clientY - 150);
    };
    
    const handleMouseOver = (e) => {
      // Check if hovering over clickable element
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, cursorX2, cursorY2, isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0 : isPressed ? 0.72 : 1,
          opacity: isHovered ? 0 : 1
        }}
      />
      {/* Large glowing blob follower */}
      <motion.div
        className="cursor-glow"
        style={{
          x: cursorX2,
          y: cursorY2,
        }}
        animate={{
          scale: isHovered ? 1.5 : isPressed ? 0.86 : 1,
          opacity: isHovered ? 0.9 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
