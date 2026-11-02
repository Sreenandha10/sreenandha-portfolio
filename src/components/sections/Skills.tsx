"use client";

import { useEffect, useRef, useState } from "react";
import { FAMILIES, FILTER_LABELS, SKILLS, type Skill } from "@/lib/data";
import TechLogo from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export default function Skills() {
  const [active, setActive] = useState<Skill>(SKILLS[0]);
  const [filter, setFilter] = useState<string>("all");
  const [settled, setSettled] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const seen = useInView(grid, { threshold: 0.12, once: true });

  useEffect(() => {
    if (!seen) return;
    const t = setTimeout(() => setSettled(true), 1800);
    return () => clearTimeout(t);
  }, [seen]);

  const fam = FAMILIES.find((f) => f.id === active.family)!;

  return (
    <section id="skills" className="skills section" aria-labelledby="skills-h">
      <style>{css}</style>
      <div className="wrap">
        <p className="tag rv">02 — Skills</p>
        <h2 className="h2" id="skills-h" style={{ marginTop: 22 }}>
          <span className="rv-mask">
            <span>The periodic table</span>
          </span>
          <span className="rv-mask" style={{ ["--i" as string]: 1 }}>
            <span>
              of my <em>stack.</em>
            </span>
          </span>
        </h2>

        <div className="sk-chips rv" role="group" aria-label="Filter skills by family" style={{ ["--i" as string]: 2 }}>
          <button className={`sk-chip ${filter === "all" ? "on" : ""}`} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All <span className="mono">{SKILLS.length}</span>
          </button>
          {FAMILIES.map((f) => (
            <button key={f.id} className={`sk-chip ${filter === f.id ? "on" : ""}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {FILTER_LABELS[f.id]} <span className="mono">{SKILLS.filter((s) => s.family === f.id).length}</span>
            </button>
          ))}
        </div>

        <div className="sk-layout">
          <div ref={grid} className={`sk-grid ${seen ? "is-in" : ""} ${settled ? "settled" : ""}`}>
            {SKILLS.map((s, i) => {
              const f = FAMILIES.find((x) => x.id === s.family)!;
              const dim = filter !== "all" && s.family !== filter;
              return (
                <button
                  key={s.name}
                  type="button"
                  className={`sk-tile ${active.name === s.name ? "is-active" : ""} ${dim ? "dim" : ""}`}
                  style={{
                    ["--r8" as string]: Math.floor(i / 8),
                    ["--c8" as string]: i % 8,
                    ["--r4" as string]: Math.floor(i / 4),
                    ["--c4" as string]: i % 4,
                  }}
                  onMouseEnter={() => setActive(s)}
                  onFocus={() => setActive(s)}
                  onClick={() => setActive(s)}
                  aria-label={`${s.name}, ${f.label}`}
                >
                  <span className="sk-num mono">{s.number}</span>
                  <span className="sk-fam mono">{f.short}</span>
                  <span className="sk-sym">{s.symbol}</span>
                  <span className="sk-name">{s.name}</span>
                </button>
              );
            })}
          </div>

          <aside className="sk-insp card rv" aria-live="polite" aria-label="Skill details">
            <div className="sk-insp-logo">
              <div key={active.name} className="sk-pop">
                <TechLogo name={active.name} size={150} glow />
              </div>
            </div>
            <p className="mono sk-insp-num">
              {String(active.number).padStart(2, "0")} · {active.symbol}
            </p>
            <h3 className="sk-insp-name">{active.name}</h3>
            <p className="sk-insp-fam">{fam.label}</p>
            <div className="sk-insp-used">
              <p className="mono">{active.projects.length ? "Used in" : "Family"}</p>
              {active.projects.length ? (
                <ul>
                  {active.projects.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>Listed under {fam.label}</li>
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const css = `
.sk-chips{margin-top:44px;display:flex;flex-wrap:wrap;gap:8px}
.sk-chip{height:38px;padding:0 16px;border-radius:999px;font-size:14px;font-weight:500;display:inline-flex;align-items:center;gap:8px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.18);transition:background .4s var(--ease),color .4s var(--ease),transform .4s var(--ease)}
.sk-chip .mono{font-size:11px;color:var(--mute);transition:color .4s var(--ease)}
.sk-chip:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px var(--ink)}
.sk-chip.on{background:var(--ink);color:#fff;box-shadow:none}
.sk-chip.on .mono{color:var(--faint)}
.sk-layout{margin-top:28px;display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:32px;align-items:start}
.sk-grid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}
.sk-tile{position:relative;aspect-ratio:1/1.06;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:20px 6px 8px;border-radius:14px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);text-align:center;min-width:0;
  opacity:0;transform:translateY(16px) scale(.94);
  transition:opacity .8s var(--ease),transform .8s var(--ease),background .35s var(--ease),color .35s var(--ease),box-shadow .35s var(--ease),filter .4s var(--ease);
  transition-delay:calc((var(--r8) + var(--c8)) * 40ms)}
.sk-grid.is-in .sk-tile{opacity:1;transform:none}
.sk-grid.settled .sk-tile{transition-delay:0ms;transition-duration:.45s}
.sk-grid.is-in .sk-tile:hover{transform:translateY(-3px)}
.sk-tile.dim{opacity:.2!important;filter:grayscale(1)}
.sk-tile.is-active{background:var(--ink);color:#fff;box-shadow:0 18px 30px -18px rgba(13,13,13,.6)}
.sk-num{position:absolute;left:8px;top:6px;font-size:9.5px;color:var(--mute)}
.sk-fam{position:absolute;right:8px;top:6px;font-size:8.5px;letter-spacing:.06em;color:var(--mute)}
.sk-tile.is-active .sk-num,.sk-tile.is-active .sk-fam{color:#b9b6b0}
.sk-sym{font-size:clamp(22px,2.3vw,32px);font-weight:700;letter-spacing:-.04em;line-height:1}
.sk-name{font-size:10.5px;line-height:1.2;color:var(--mute);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;max-width:100%;overflow-wrap:anywhere;min-height:2.4em;margin-top:4px}
.sk-tile.is-active .sk-name{color:#d8d6d1}
.sk-insp{position:sticky;top:calc(var(--nav-h) + 24px);padding:26px 24px 24px;min-height:430px;display:flex;flex-direction:column}
.sk-insp-logo{height:190px;display:grid;place-items:center;margin-bottom:6px}
.sk-pop{animation:skPop .7s var(--ease) both}
@keyframes skPop{0%{opacity:0;transform:scale(.55) rotate(-8deg)}100%{opacity:1;transform:none}}
.sk-insp-num{font-size:11px;letter-spacing:.1em;color:var(--mute);text-transform:uppercase}
.sk-insp-name{margin-top:6px;font-size:26px;font-weight:700;letter-spacing:-.04em;line-height:1.1}
.sk-insp-fam{margin-top:4px;font-size:14px;color:var(--mute)}
.sk-insp-used{margin-top:auto;padding-top:20px}
.sk-insp-used p{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.sk-insp-used ul{margin-top:8px;display:flex;flex-direction:column;gap:6px}
.sk-insp-used li{font-size:13.5px;line-height:1.35;padding:8px 12px;border-radius:12px;background:var(--paper)}
@media (max-width:1000px){
  .sk-layout{grid-template-columns:minmax(0,1fr)}
  .sk-insp{position:static;min-height:0;order:2}
}
@media (max-width:760px){
  .sk-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
  .sk-tile{transition-delay:calc((var(--r4) + var(--c4)) * 40ms);padding-inline:4px}
  .sk-name{font-size:9.5px}
  .sk-sym{font-size:22px}
  .sk-fam{display:none}
}
`;
