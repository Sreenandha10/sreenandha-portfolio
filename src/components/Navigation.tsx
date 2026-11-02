"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

const SECTION_IDS = ["about", "skills", "work", "certifications", "experience", "achievements", "contact"];

export default function Navigation() {
  const { scrollToTarget, stop, start } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pillRef = useRef<HTMLUListElement>(null);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  /* scrolled state + progress bar */
  useEffect(() => {
    let raf = 0;
    const on = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const h = () => {
      if (!raf) raf = requestAnimationFrame(on);
    };
    on();
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("scroll", h);
      window.removeEventListener("resize", h);
    };
  }, []);

  /* active section */
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("top");
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  /* sliding indicator */
  useLayoutEffect(() => {
    const measure = () => {
      const ul = pillRef.current;
      if (!ul) return;
      const a = active && ul.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (!a) return setInd(null);
      setInd({ x: a.offsetLeft, w: a.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, scrolled]);

  /* mobile menu: lock scroll, Esc closes, focus */
  useEffect(() => {
    if (!open) return;
    stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const opener = menuBtn.current;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
      start();
      opener?.focus({ preventScroll: true });
    };
  }, [open, stop, start]);

  const go = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      setOpen(false);
      // wait a frame so the scroll lock is released before scrolling
      requestAnimationFrame(() => scrollToTarget(`#${id}`, 0));
    },
    [scrollToTarget],
  );

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <style>{css}</style>
      <div className="nav-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      <div className="nav-row">
        <a
          href="#top"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
        >
          <span className="nav-mark" aria-hidden="true">
            <span>{PROFILE.initials}</span>
          </span>
          <span className="nav-name">{PROFILE.name}</span>
        </a>

        <nav aria-label="Primary" className="nav-desk">
          <ul ref={pillRef} className="nav-pill">
            <li
              aria-hidden="true"
              className="nav-ind"
              style={{ transform: `translateX(${ind?.x ?? 0}px)`, width: ind?.w ?? 0, opacity: ind ? 1 : 0 }}
            />
            {NAV.map((n) => (
              <li key={n.id} data-id={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => go(e, n.id)}
                  className={active === n.id ? "on" : ""}
                  aria-current={active === n.id ? "true" : undefined}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuBtn}
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      <div id="mobile-menu" className={`nav-overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="nav-overlay-top">
          <span className="mono tag">Menu</span>
          <button ref={closeRef} className="nav-menu-btn" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Close
          </button>
        </div>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ ["--i" as string]: i }}>
              <a href={`#${n.id}`} onClick={(e) => go(e, n.id)} tabIndex={open ? 0 : -1}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

const css = `
.skip-link{position:fixed;left:12px;top:-60px;z-index:100;background:var(--ink);color:#fff;padding:10px 16px;border-radius:999px;font-size:14px;transition:top .3s var(--ease)}
.skip-link:focus{top:12px}
.nav{position:fixed;inset:0 0 auto 0;z-index:50;pointer-events:none}
.nav > *{pointer-events:auto}
.nav-progress{position:absolute;left:0;top:0;height:2px;width:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0);z-index:3}
.nav-row{display:flex;align-items:center;justify-content:space-between;height:var(--nav-h);padding-inline:var(--gutter);max-width:1600px;margin:0 auto;pointer-events:none}
.nav-row > *{pointer-events:auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-weight:600;letter-spacing:-.02em;font-size:15px}
.nav-mark{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;box-shadow:inset 0 0 0 1.5px var(--ink);font-family:var(--font-mono);font-size:12px;font-weight:600;letter-spacing:.02em;transition:background .5s var(--ease),color .5s var(--ease),transform .9s var(--ease)}
.nav-mark span{display:block}
.nav-brand:hover .nav-mark{transform:rotate(360deg)}
.is-scrolled .nav-mark{background:var(--ink);color:#fff}
.nav-name{transition:opacity .5s var(--ease),transform .5s var(--ease)}
.is-scrolled .nav-name{opacity:0;transform:translateX(-8px);pointer-events:none}
.nav-pill{position:relative;display:flex;gap:2px;padding:5px;border-radius:999px;transition:background .5s var(--ease),box-shadow .5s var(--ease),backdrop-filter .5s var(--ease)}
.is-scrolled .nav-pill{background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -18px rgba(13,13,13,.35)}
.nav-pill li{position:relative;z-index:1}
.nav-pill a{display:block;padding:9px 18px;border-radius:999px;font-size:14px;font-weight:500;letter-spacing:-.01em;color:var(--ink-2);transition:color .4s var(--ease)}
.nav-pill a:hover{color:var(--ink)}
.nav-pill a.on{color:#fff}
.nav-ind{position:absolute!important;z-index:0!important;left:0;top:5px;bottom:5px;border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease),opacity .4s var(--ease)}
.nav-menu-btn{display:none;height:40px;padding:0 20px;border-radius:999px;font-size:14px;font-weight:600;background:rgba(255,255,255,.8);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line)}
.nav-overlay{position:fixed;inset:0;background:var(--paper);padding:0 var(--gutter);clip-path:circle(0% at calc(100% - 52px) 38px);visibility:hidden;transition:clip-path .9s var(--ease),visibility 0s linear .9s;display:flex;flex-direction:column}
.nav-overlay.is-open{clip-path:circle(150% at calc(100% - 52px) 38px);visibility:visible;transition:clip-path .9s var(--ease),visibility 0s}
.nav-overlay-top{display:flex;align-items:center;justify-content:space-between;height:var(--nav-h)}
.nav-overlay ul{display:flex;flex-direction:column;justify-content:center;flex:1;gap:4px;padding-bottom:12vh}
.nav-overlay li{opacity:0;transform:translateY(28px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.nav-overlay.is-open li{opacity:1;transform:none;transition-delay:calc(.25s + var(--i)*70ms)}
.nav-overlay li a{display:flex;align-items:baseline;gap:16px;font-size:clamp(40px,12vw,72px);font-weight:700;letter-spacing:-.045em;line-height:1.1}
.nav-overlay li .mono{font-size:12px;font-weight:500;letter-spacing:.06em;color:var(--mute)}
@media (max-width:860px){
  .nav-desk{display:none}
  .nav-menu-btn{display:inline-flex;align-items:center}
  .nav-name{font-size:14px}
}
`;
