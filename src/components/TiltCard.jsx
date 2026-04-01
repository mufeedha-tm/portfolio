import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useEnhancedMotion from '../hooks/useEnhancedMotion.jsx';

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

export default function TiltCard({ children, className = '', maxRotate = 4 }) {
  const ref = useRef(null);
  const interactive = useEnhancedMotion();
  const frameRef = useRef(null);
  
  const width = useRef(0);
  const height = useRef(0);
  const left = useRef(0);
  const top = useRef(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const dx = useSpring(rawX, spring);
  const dy = useSpring(rawY, spring);

  const handleMouseMove = (e) => {
    if (!interactive || !ref.current) return;
    const { clientX, clientY } = e;
    const x = clientX - left.current - width.current / 2;
    const y = clientY - top.current - height.current / 2;

    const rotateX = (y / (height.current / 2)) * -maxRotate;
    const rotateY = (x / (width.current / 2)) * maxRotate;

    if (frameRef.current) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      rawX.set(rotateY);
      rawY.set(rotateX);
      frameRef.current = null;
    });
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    width.current = rect.width;
    height.current = rect.height;
    left.current = rect.left;
    top.current = rect.top;
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  useEffect(() => {
    if (interactive) {
      return undefined;
    }

    rawX.set(0);
    rawY.set(0);

    return undefined;
  }, [interactive, rawX, rawY]);

  useEffect(() => () => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        rotateX: interactive ? dy : 0,
        rotateY: interactive ? dx : 0,
        transformStyle: 'preserve-3d',
        perspective: interactive ? 1000 : undefined,
      }}
    >
      <div style={{ transform: interactive ? 'translateZ(16px)' : 'translateZ(0px)', transition: 'transform 0.3s ease', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
