import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className, href, onClick, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [interactive, setInteractive] = useState(false);

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

  const handleMouse = (e) => {
    if (!interactive || !ref.current) {
      return;
    }

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Magnetic pull distance
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const ButtonWrapper = href ? 'a' : 'button';

  return (
    <motion.div
      style={{ display: 'inline-block', position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: interactive ? x : 0, y: interactive ? y : 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <ButtonWrapper 
        className={className} 
        href={href} 
        onClick={onClick} 
        {...props}
        style={{ ...props.style, display: 'inline-flex', alignItems: 'center', pointerEvents: 'auto' }}
      >
        {children}
      </ButtonWrapper>
    </motion.div>
  );
}
