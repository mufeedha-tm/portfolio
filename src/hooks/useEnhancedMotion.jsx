import { useEffect, useState } from 'react';

function canUseEnhancedMotion() {
  if (typeof window === 'undefined') {
    return false;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const isWideEnough = window.innerWidth >= 1100;
  const hasEnoughMemory = typeof navigator.deviceMemory !== 'number' || navigator.deviceMemory >= 4;
  const hasEnoughCores =
    typeof navigator.hardwareConcurrency !== 'number' || navigator.hardwareConcurrency >= 4;

  return !prefersReducedMotion && hasFinePointer && isWideEnough && hasEnoughMemory && hasEnoughCores;
}

export default function useEnhancedMotion() {
  const [enabled, setEnabled] = useState(canUseEnhancedMotion);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnabled(canUseEnhancedMotion());
    };

    update();
    pointerQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);
    window.addEventListener('resize', update, { passive: true });

    return () => {
      pointerQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return enabled;
}
