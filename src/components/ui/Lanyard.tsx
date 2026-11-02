"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";

const BARS = [3, 1, 2, 1, 1, 3, 2, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1];

/** Hanging ID card: damped pendulum + idle sway, flips on hover / tap / Enter. */
export default function Lanyard() {
  const col = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const c = col.current;
    const g = group.current;
    if (!c || !g || prefersReducedMotion()) return;

    let angle = 0;
    let vel = 0;
    let last = performance.now();
    let raf = 0;
    let lastX: number | null = null;

    const tick = (t: number) => {
      const dt = Math.min(32, t - last) / 16.67;
      last = t;
      const idle = Math.sin(t / 1700) * 1.1 + Math.sin(t / 2900) * 0.6; // subtle sway target (deg)
      const k = 0.014;
      const damp = 0.04;
      vel += (-k * (angle - idle) - damp * vel) * dt;
      angle += vel * dt;
      angle = Math.max(-20, Math.min(20, angle));
      g.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const halt = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const move = (e: PointerEvent) => {
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        vel += Math.max(-1.2, Math.min(1.2, dx * 0.035));
      }
      lastX = e.clientX;
    };
    const leave = () => (lastX = null);

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? run() : halt()), { threshold: 0 });
    io.observe(c);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerleave", leave);
    return () => {
      halt();
      io.disconnect();
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={col} className="lan">
      <style>{css}</style>
      <div ref={group} className="lan-pend">
        <span className="lan-cord" aria-hidden="true" />
        <div className="lan-strap" aria-hidden="true">
          <div className="lan-strap-in">
            {[0, 1].map((k) => (
              <span key={k}>
                {PROFILE.name.toUpperCase()} · {PROFILE.role.toUpperCase()} ·&nbsp;
              </span>
            ))}
          </div>
        </div>
        <span className="lan-clip" aria-hidden="true">
          <i />
        </span>

        <div
          className={`lan-card ${flipped ? "is-flipped" : ""}`}
          onPointerUp={(e) => e.pointerType !== "mouse" && setFlipped((f) => !f)}
        >
          <button type="button" className="sr-only lan-flipbtn" aria-pressed={flipped} onClick={() => setFlipped((f) => !f)}>
            Flip ID card
          </button>
          <div className="lan-flip">
            {/* FRONT */}
            <div className="lan-face lan-front">
              <div className="lan-band">
                <span className="lan-slot" aria-hidden="true" />
                <span className="mono">DEVELOPER ID</span>
              </div>
              <div className="lan-photo-wrap">
                <div className="lan-ring">
                  <div className="lan-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name}`} width={480} height={600} />
                  </div>
                </div>
              </div>
              <div className="lan-id">
                <h3>{PROFILE.name}</h3>
                <p className="mono">{PROFILE.role}</p>
              </div>
              <dl className="lan-rows">
                <div>
                  <dt className="mono">Dept.</dt>
                  <dd>{PROFILE.dept}</dd>
                </div>
                <div>
                  <dt className="mono">Degree</dt>
                  <dd>{PROFILE.degree}</dd>
                </div>
                <div>
                  <dt className="mono">Valid till</dt>
                  <dd>{PROFILE.graduationYear}</dd>
                </div>
              </dl>
              <div className="lan-foot" aria-hidden="true">
                <div className="lan-bars">
                  {BARS.map((w, i) => (
                    <span key={i} style={{ width: w }} />
                  ))}
                </div>
                <span className="lan-holo" />
              </div>
            </div>

            {/* BACK */}
            <div className="lan-face lan-back">
              <p className="mono lan-back-tag">What I am</p>
              <ul>
                <li>Full Stack Developer — MERN stack focus</li>
                <li>B.Tech CSE · CGPA {PROFILE.cgpa} · Vimal Jyothi Engineering College</li>
                <li>Projects: Refugee Resettlement and Integration System, Voice Cloning System</li>
                <li>Internships: Quest Innovative Solutions, Crudops</li>
                <li>Honours: IIT Madras Shaastra Techathon 2024, First AI/ML Challenge</li>
              </ul>
              <div className="lan-sign">
                <span>{PROFILE.name}</span>
                <p className="mono">If found, say hello · {PROFILE.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const css = `
.lan{position:relative;display:flex;justify-content:center;height:100%;min-height:560px;touch-action:pan-y}
.lan-pend{position:relative;display:flex;flex-direction:column;align-items:center;transform-origin:50% 0;will-change:transform;width:300px}
.lan-cord{display:block;width:2px;height:clamp(60px,12vh,130px);background:var(--ink);margin-top:-2px}
.lan-strap{position:relative;width:30px;height:56px;background:var(--ink);overflow:hidden;border-radius:2px;box-shadow:0 8px 16px -10px rgba(13,13,13,.6)}
.lan-strap-in{position:absolute;left:0;right:0;top:0;display:flex;flex-direction:column;align-items:center;animation:strapScroll 7s linear infinite}
.lan-strap-in span{writing-mode:vertical-rl;font-family:var(--font-mono);font-size:7.5px;letter-spacing:.14em;color:#fff;white-space:nowrap;padding-block:2px}
@keyframes strapScroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}
.lan-clip{position:relative;z-index:2;display:block;width:24px;height:30px;margin-bottom:-14px;border-radius:5px 5px 9px 9px;background:linear-gradient(90deg,#8d8d8d,#e8e8e8 38%,#bdbdbd 62%,#7a7a7a);box-shadow:0 2px 6px rgba(13,13,13,.25),inset 0 0 0 1px rgba(13,13,13,.18)}
.lan-clip i{position:absolute;left:50%;bottom:5px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 1.5px rgba(13,13,13,.35)}
.lan-card{position:relative;width:300px;height:404px;perspective:1400px;border-radius:22px}
.lan-card:has(.lan-flipbtn:focus-visible){outline:2px solid var(--ink);outline-offset:6px}
.lan-flip{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .9s var(--ease)}
.lan-card.is-flipped .lan-flip{transform:rotateY(180deg)}
@media (hover:hover){.lan-card:hover .lan-flip{transform:rotateY(180deg)}}
.lan-face{position:absolute;inset:0;border-radius:22px;background:var(--card);overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:inset 0 0 0 1px var(--line),0 30px 60px -28px rgba(13,13,13,.45),0 8px 18px -10px rgba(13,13,13,.18);display:flex;flex-direction:column}
.lan-back{transform:rotateY(180deg);padding:30px 26px 24px;justify-content:space-between}
.lan-band{position:relative;height:42px;background:var(--ink);color:#fff;display:grid;place-items:center;flex:none}
.lan-band .mono{font-size:11px;letter-spacing:.28em;margin-top:8px}
.lan-slot{position:absolute;left:50%;top:8px;width:42px;height:7px;margin-left:-21px;border-radius:99px;background:var(--paper)}
.lan-photo-wrap{display:grid;place-items:center;padding-top:14px}
.lan-ring{padding:4px;border-radius:26px;background:linear-gradient(145deg,#d9d6d0,#8f8c86 55%,#e6e3dd);box-shadow:0 0 0 9px rgba(13,13,13,.04),0 18px 36px -16px rgba(13,13,13,.45)}
.lan-photo{width:128px;height:156px;border-radius:22px;overflow:hidden;background:var(--soft)}
.lan-photo img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .9s var(--ease)}
.lan-card:hover .lan-photo img{transform:scale(1.07)}
.lan-id{text-align:center;padding:10px 16px 0}
.lan-id h3{font-size:21px;font-weight:700;letter-spacing:-.035em;line-height:1.1}
.lan-id p{margin-top:4px;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
.lan-rows{padding:8px 24px 0;display:flex;flex-direction:column;gap:3px}
.lan-rows div{display:flex;justify-content:space-between;gap:10px;align-items:baseline;border-bottom:1px solid var(--line);padding-bottom:3px}
.lan-rows dt{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);flex:none}
.lan-rows dd{font-size:11.5px;font-weight:500;text-align:right}
.lan-foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding:6px 24px 14px}
.lan-bars{display:flex;gap:2px;height:28px;align-items:stretch}
.lan-bars span{display:block;background:var(--ink)}
.lan-holo{width:34px;height:34px;border-radius:50%;background:conic-gradient(from 20deg,#f2f2f2,#9a9a9a,#e9e9e9,#6f6f6f,#dcdcdc,#a8a8a8,#f2f2f2);box-shadow:inset 0 0 0 1px rgba(13,13,13,.2)}
.lan-back-tag{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}
.lan-back ul{display:flex;flex-direction:column;gap:9px;margin-top:14px}
.lan-back li{font-size:12.5px;line-height:1.35;color:var(--ink-2);padding-left:14px;position:relative}
.lan-back li::before{content:"";position:absolute;left:0;top:.55em;width:5px;height:1px;background:var(--ink)}
.lan-sign{margin-top:auto}
.lan-sign span{display:block;font-family:var(--font-serif);font-style:italic;font-size:34px;line-height:1;border-bottom:1px solid var(--ink);padding-bottom:6px}
.lan-sign p{margin-top:8px;font-size:9.5px;letter-spacing:.04em;color:var(--mute);overflow-wrap:anywhere}
@media (max-width:1000px){.lan{min-height:0}}
`;
