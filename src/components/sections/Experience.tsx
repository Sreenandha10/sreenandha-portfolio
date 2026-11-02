"use client";

import { useEffect, useRef } from "react";
import { TIMELINE } from "@/lib/data";

export default function Experience() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const stops = Array.from(el.querySelectorAll<HTMLElement>("[data-stop]"));
    let raf = 0;
    const calc = () => {
      raf = 0;
      const vh = window.innerHeight;
      const line = vh * 0.62;
      const r = el.getBoundingClientRect();
      const fill = Math.max(0, Math.min(r.height, line - r.top));
      el.style.setProperty("--fill", `${fill}px`);
      for (const s of stops) {
        const dot = s.querySelector<HTMLElement>(".xp-dot");
        const top = (dot ?? s).getBoundingClientRect().top;
        s.classList.toggle("on", top < line);
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="xp section" aria-labelledby="xp-h">
      <style>{css}</style>
      <div className="wrap">
        <p className="tag rv">05 — Experience</p>
        <h2 className="h2" id="xp-h" style={{ marginTop: 22 }}>
          <span className="rv-mask">
            <span>
              The path so <em>far.</em>
            </span>
          </span>
        </h2>

        <ol ref={list} className="xp-list">
          <span className="xp-spine" aria-hidden="true">
            <span className="xp-spine-fill" />
          </span>
          {TIMELINE.map((t) => (
            <li key={t.title + t.when} data-stop className="xp-stop">
              <p className="xp-when mono">{t.when}</p>
              <span className="xp-dot" aria-hidden="true" />
              <div className="xp-body">
                <p className="xp-kind mono">{t.kind}</p>
                <h3>{t.title}</h3>
                <p className="xp-place">{t.place}</p>
                <p className="xp-detail">{t.detail}</p>
              </div>
            </li>
          ))}
          <li data-stop className="xp-stop xp-next">
            <p className="xp-when mono">Next</p>
            <span className="xp-dot" aria-hidden="true" />
            <div className="xp-body">
              <div className="xp-next-card">
                <p className="xp-kind mono">Next</p>
                <h3>
                  Your <em>team?</em>
                </h3>
                <a href="#contact" className="xp-next-link">
                  Let&apos;s talk <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

const css = `
.xp-list{--fill:0px;position:relative;margin-top:72px;display:flex;flex-direction:column;gap:clamp(36px,6vh,64px)}
.xp-spine{position:absolute;left:calc(clamp(110px,14vw,190px) + 28px + 14px);top:14px;bottom:14px;width:2px;background:var(--soft);transform:translateX(-50%)}
.xp-spine-fill{position:absolute;left:0;top:0;width:100%;height:calc(var(--fill) - 14px);max-height:100%;background:var(--ink);transition:height .15s linear}
.xp-stop{position:relative;display:grid;grid-template-columns:clamp(110px,14vw,190px) 28px minmax(0,1fr);column-gap:28px;align-items:start}
.xp-when{font-size:13px;letter-spacing:.06em;color:var(--mute);text-align:right;padding-top:6px;transition:color .6s var(--ease)}
.xp-dot{position:relative;z-index:1;width:28px;height:28px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--soft);transition:background .5s var(--ease),box-shadow .5s var(--ease),transform .7s var(--ease)}
.xp-dot::after{content:"";position:absolute;inset:9px;border-radius:50%;background:var(--soft);transition:background .5s var(--ease)}
.xp-body{max-width:640px;padding-bottom:6px}
.xp-body h3{color:var(--mute);transition:color .7s var(--ease)}
.xp-stop.on .xp-body h3{color:var(--ink)}
.xp-stop.on .xp-when{color:var(--ink)}
.xp-stop.on .xp-dot{background:var(--ink);box-shadow:inset 0 0 0 2px var(--ink),0 0 0 8px rgba(13,13,13,.07);transform:scale(1.05)}
.xp-stop.on .xp-dot::after{background:#fff}
.xp-kind{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.xp-body h3{margin-top:8px;font-size:clamp(24px,2.6vw,38px);font-weight:700;letter-spacing:-.04em;line-height:1.08;text-wrap:balance}
.xp-body h3 em{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--mute);letter-spacing:-.02em;font-size:1.08em}
.xp-place{margin-top:8px;font-size:16px;color:var(--mute);transition:color .7s var(--ease)}
.xp-stop.on .xp-place{color:var(--ink-2)}
.xp-detail{margin-top:10px;font-size:14.5px;line-height:1.6;color:var(--mute);max-width:56ch}
.xp-next-card{padding:26px 28px;border-radius:24px;border:1.5px dashed rgba(13,13,13,.28)}
.xp-next-link{display:inline-flex;gap:8px;margin-top:16px;font-weight:600;font-size:15px;background:linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat;padding-bottom:2px;transition:background-size .5s var(--ease)}
.xp-next-link:hover{background-size:0 1px;background-position:100% 100%}
@media (max-width:720px){
  .xp-spine{left:14px}
  .xp-stop{grid-template-columns:28px minmax(0,1fr);column-gap:18px}
  .xp-when{grid-column:2;grid-row:1;text-align:left;padding-top:0;margin-bottom:6px}
  .xp-dot{grid-column:1;grid-row:1 / span 2}
  .xp-body{grid-column:2;grid-row:2}
}
`;
