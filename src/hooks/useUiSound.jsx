import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-ui-sound';

export default function useUiSound(initial = false) {
  const audioContextRef = useRef(null);
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') {
      return initial;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored === null ? initial : JSON.parse(stored);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(enabled));
  }, [enabled]);

  const playClick = (variant = 'soft') => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const context = audioContextRef.current;
    if (context.state === 'suspended') {
      context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const now = context.currentTime;

    oscillator.type = variant === 'bright' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(variant === 'bright' ? 780 : 540, now);
    oscillator.frequency.exponentialRampToValueAtTime(variant === 'bright' ? 980 : 690, now + 0.08);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.024, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.13);
  };

  return {
    soundEnabled: enabled,
    setSoundEnabled: setEnabled,
    playClick,
  };
}
