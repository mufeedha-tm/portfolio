import { useEffect, useState } from 'react';

export default function useActiveSection(sectionIds, enabled = true) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || sectionIds.length === 0) {
      return undefined;
    }

    const visibleSections = new Map();
    const observedSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size === 0) {
          if (window.scrollY < 160) {
            setActiveSection(sectionIds[0]);
          }
          return;
        }

        const nextActive = [...visibleSections.entries()]
          .sort((a, b) => {
            if (b[1] !== a[1]) {
              return b[1] - a[1];
            }

            return sectionIds.indexOf(a[0]) - sectionIds.indexOf(b[0]);
          })[0]?.[0];

        if (nextActive) {
          setActiveSection(nextActive);
        }
      },
      {
        rootMargin: '-28% 0px -52% 0px',
        threshold: [0.15, 0.3, 0.45, 0.6, 0.8],
      },
    );

    const observeAvailableSections = () => {
      sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .forEach((section) => {
          if (observedSections.has(section)) {
            return;
          }

          observedSections.add(section);
          observer.observe(section);
        });
    };

    observeAvailableSections();

    const mutationObserver = new MutationObserver(() => {
      observeAvailableSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [enabled, sectionIds]);

  return activeSection;
}
