import { useEffect, useState } from 'react';

const STORAGE_KEY = 'prefers-dark';

export default function usePrefersDark(initial = true) {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') {
      return initial;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw === null ? initial : JSON.parse(raw);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dark));
  }, [dark]);

  return [dark, setDark];
}
