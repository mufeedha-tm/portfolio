import React, { useEffect, useRef, useState } from 'react';

export default function LazySection({
  id,
  children,
  minHeight = 720,
  rootMargin = '480px 0px',
  className = '',
}) {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(
    () => typeof window === 'undefined' || window.location.hash === `#${id}`,
  );

  useEffect(() => {
    if (isMounted || typeof window === 'undefined') {
      return undefined;
    }

    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [id, isMounted, rootMargin]);

  useEffect(() => {
    if (isMounted || typeof window === 'undefined') {
      return undefined;
    }

    const handleHashChange = () => {
      if (window.location.hash === `#${id}`) {
        setIsMounted(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [id, isMounted]);

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={{
        minHeight: isMounted ? undefined : minHeight,
        scrollMarginTop: '108px',
      }}
    >
      {isMounted ? children : null}
    </div>
  );
}
