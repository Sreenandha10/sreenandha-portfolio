"use client";

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, type Achievement } from "@/lib/data";
import { prefersReducedMotion, useInView } from "@/lib/hooks";

const ICONS: Record<Achievement["icon"], React.ReactNode> = {
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3.2 2.7-5 5.5-5s5 1.8 5.5 5M16 5.3a3 3 0 0 1 0 5.4M17.5 14.3c1.8.6 3 2.3 3.3 4.7" />
    </>
  ),
  cap: (
    <>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14zM6.5 11.7V16c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.3M21.5 9.5V15" />
    </>
  ),
};

function Counter({ a, active }: { a: Achievement; active: boolean }) {
  const [v, setV] = useState(a.from);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    if (prefersReducedMotion()) return setV(a.value);
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      const e = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setV(a.from + (a.value - a.from) * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, a]);
  return (
    <span className="ach-num">
      {v.toFixed(a.decimals)}
      {a.suffix && <small>{a.suffix}</small>}
    </span>
  );
}

function Card({ a, i, total, center }: { a: Achievement; i: number; total: number; center: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { threshold: 0.35, once: true });
  return (
    <article ref={ref} className={`ach-card ${center ? "is-center" : ""}`} data-ach>
      <div className="ach-top">
        <div className="ach-logo">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONS[a.icon]}
          </svg>
        </div>
        <span className="mono ach-idx">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="ach-bottom">
        <div className="ach-text">
          <p className="mono ach-label">{a.label}</p>
          <p className="ach-cap">{a.caption}</p>
          <p className="mono ach-detail">{a.detail}</p>
        </div>
        <Counter a={a} active={seen} />
      </div>
    </article>
  );
}

export default function Achievements() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [travel, setTravel] = useState(0);
  const [center, setCenter] = useState(0);

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    let tv = 0;
    let raf = 0;
    const measure = () => {
      tv = Math.max(0, t.scrollWidth - window.innerWidth);
      setTravel(tv);
    };
    const update = () => {
      raf = 0;
      const r = o.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = Math.max(1, r.height - vh);
      const p = Math.max(0, Math.min(1, -r.top / span));
      t.style.transform = `translate3d(${(-p * tv).toFixed(1)}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const mid = window.innerWidth / 2;
      let best = 0;
      let bd = Infinity;
      t.querySelectorAll<HTMLElement>("[data-ach]").forEach((c, idx) => {
        const cr = c.getBoundingClientRect();
        const d = Math.abs(cr.left + cr.width / 2 - mid);
        if (d < bd) {
          bd = d;
          best = idx;
        }
      });
      setCenter((prev) => (prev === best ? prev : best));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(() => {
      measure();
      on();
    });
    ro.observe(t);
    measure();
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="achievements"
      ref={outer}
      className="ach"
      style={{ ["--travel" as string]: `${travel}px` }}
      aria-labelledby="ach-h"
    >
      <style>{css}</style>
      <div className="ach-pin">
        <div className="wrap ach-head">
          <div>
            <p className="tag">06 — Achievements</p>
            <h2 className="h2" id="ach-h" style={{ marginTop: 18 }}>
              Honours &amp; <em>highlights.</em>
            </h2>
          </div>
          <div className="ach-prog" aria-hidden="true">
            <span className="mono">Scroll</span>
            <span className="ach-prog-bar">
              <span ref={bar} />
            </span>
          </div>
        </div>
        <div ref={track} className="ach-track">
          {ACHIEVEMENTS.map((a, i) => (
            <Card key={a.id} a={a} i={i} total={ACHIEVEMENTS.length} center={center === i} />
          ))}
          <div className="ach-end" data-end>
            <span>
              and <em>counting</em> →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.ach{position:relative;height:calc(100svh + var(--travel,0px))}
.ach-pin{position:sticky;top:0;height:100svh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:clamp(24px,5vh,56px);padding-top:var(--nav-h)}
.ach-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
.ach .h2{font-size:clamp(34px,4.6vw,68px)}
.ach-prog{display:flex;align-items:center;gap:14px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);padding-bottom:10px}
.ach-prog-bar{display:block;width:min(220px,28vw);height:2px;background:var(--soft);overflow:hidden;border-radius:2px}
.ach-prog-bar span{display:block;height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0)}
.ach-track{display:flex;align-items:center;gap:20px;width:max-content;padding:20px calc(max(var(--gutter),(100vw - 1320px) / 2 + var(--gutter))) 28px;will-change:transform}
.ach-card{flex:none;width:clamp(340px,40vw,540px);height:clamp(260px,36vh,310px);padding:22px 24px 22px;border-radius:28px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line),0 18px 40px -34px rgba(13,13,13,.3);display:flex;flex-direction:column;justify-content:space-between;transform:translateY(0);transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
.ach-card.is-center{transform:translateY(-12px);box-shadow:inset 0 0 0 1px var(--line),0 44px 70px -36px rgba(13,13,13,.45)}
.ach-top{display:flex;align-items:flex-start;justify-content:space-between}
.ach-logo{position:relative;isolation:isolate;width:72px;height:72px;border-radius:22px;background:var(--paper);display:grid;place-items:center;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
.ach-logo::before{content:"";position:absolute;inset:-34%;border-radius:50%;background:radial-gradient(closest-side,rgba(13,13,13,.09),transparent 72%);transition:opacity .7s var(--ease),transform .7s var(--ease);opacity:.55;z-index:-1}
.ach-card.is-center .ach-logo::before{opacity:1;transform:scale(1.2)}
.ach-idx{font-size:11px;letter-spacing:.1em;color:var(--mute)}
.ach-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:14px}
.ach-text{min-width:0;flex:1}
.ach-label{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink)}
.ach-cap{margin-top:8px;font-size:13.5px;line-height:1.4;color:var(--ink-2);display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.ach-detail{margin-top:8px;font-size:10.5px;letter-spacing:.06em;color:var(--mute);text-transform:uppercase}
.ach-num{flex:none;font-size:clamp(44px,5.4vw,86px);font-weight:700;letter-spacing:-.06em;line-height:.85;font-variant-numeric:tabular-nums}
.ach-num small{font-size:.42em;letter-spacing:-.02em;margin-left:2px;color:var(--mute);font-weight:600}
.ach-end{flex:none;width:clamp(260px,26vw,380px);padding-left:20px}
.ach-end span{font-size:clamp(34px,4vw,60px);font-weight:700;letter-spacing:-.045em;line-height:1.05}
.ach-end em{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--mute);letter-spacing:-.02em}
@media (max-width:640px){
  .ach-card{padding:18px 18px 18px}
  .ach-logo{width:60px;height:60px;border-radius:18px}
  .ach-prog{display:none}
}
`;
