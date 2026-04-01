import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

export default function TiltCard({ children, className = '', maxRotate = 4 }) {
  const ref = useRef(null);
  const [interactive, setInteractive] = useState(false);
  
  const width = useRef(0);
  const height = useRef(0);
  const left = useRef(0);
  const top = useRef(0);

  const [isHovered, setIsHovered] = useState(false);

  const dx = useSpring(0, spring);
  const dy = useSpring(0, spring);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateInteractive = () => {
      setInteractive(pointerQuery.matches && !motionQuery.matches);
    };

    updateInteractive();
    pointerQuery.addEventListener('change', updateInteractive);
    motionQuery.addEventListener('change', updateInteractive);

    return () => {
      pointerQuery.removeEventListener('change', updateInteractive);
      motionQuery.removeEventListener('change', updateInteractive);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!interactive || !ref.current) return;
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const x = clientX - left.current - width.current / 2;
    const y = clientY - top.current - height.current / 2;

    const rotateX = (y / (height.current / 2)) * -maxRotate;
    const rotateY = (x / (width.current / 2)) * maxRotate;

    dx.set(rotateY);
    dy.set(rotateX);
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    width.current = rect.width;
    height.current = rect.height;
    left.current = rect.left;
    top.current = rect.top;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    dx.set(0);
    dy.set(0);
  };

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
        perspective: interactive ? 1000 : 'none',
      }}
    >
      <div style={{ transform: interactive && isHovered ? 'translateZ(20px)' : 'translateZ(0px)', transition: 'transform 0.3s ease', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
