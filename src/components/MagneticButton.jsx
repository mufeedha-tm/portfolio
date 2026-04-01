import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import useEnhancedMotion from '../hooks/useEnhancedMotion.jsx';

export default function MagneticButton({ children, className, href, onClick, to, ...props }) {
  const ref = useRef(null);
  const interactive = useEnhancedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.35 });

  const handleMouse = (e) => {
    if (!interactive || !ref.current) {
      return;
    }

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.08);
    y.set(middleY * 0.08);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const ButtonWrapper = to ? Link : href ? 'a' : 'button';

  useEffect(() => {
    if (interactive) {
      return;
    }

    x.set(0);
    y.set(0);
  }, [interactive, x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ display: 'inline-block', position: 'relative', x: springX, y: springY }}
    >
      <ButtonWrapper 
        className={className} 
        to={to}
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
