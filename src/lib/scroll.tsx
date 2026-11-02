"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "./hooks";

type Ctx = {
  scrollToTarget: (target: string | number, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const ScrollCtx = createContext<Ctx>({ scrollToTarget: () => {}, stop: () => {}, start: () => {} });
export const useScroll = () => useContext(ScrollCtx);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ autoRaf: true, lerp: 0.11, smoothWheel: true });
    lenis.current = l;
    return () => {
      l.destroy();
      lenis.current = null;
    };
  }, []);

  const scrollToTarget = useCallback((target: string | number, offset = 0) => {
    const l = lenis.current;
    if (l) {
      l.scrollTo(target as string, { offset, duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) });
      return;
    }
    if (typeof target === "number") return window.scrollTo({ top: target });
    const el = document.querySelector(target);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      scrollToTarget,
      stop: () => lenis.current?.stop(),
      start: () => lenis.current?.start(),
    }),
    [scrollToTarget],
  );

  return <ScrollCtx.Provider value={value}>{children}</ScrollCtx.Provider>;
}
