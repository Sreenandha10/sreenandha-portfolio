"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollProvider } from "@/lib/scroll";
import Navigation from "./Navigation";

/** Global shell: smooth scroll, reveal-on-scroll observer, navigation. */
export default function App({ children }: { children: ReactNode }) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".rv, .rv-mask");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <ScrollProvider>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main style={{ overflowX: "clip" }}>{children}</main>
    </ScrollProvider>
  );
}
