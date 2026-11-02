"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import TechLogo from "@/components/ui/TechLogo";

function JobsUI() {
  return (
    <div className="ui ui-jobs" aria-hidden="true">
      <div className="ui-bar">
        <i /><i /><i />
        <span className="mono">Job recommendations</span>
      </div>
      <div className="ui-jobs-body">
        <div className="ui-side">
          <span className="mono">Profile</span>
          <div className="ui-avatar" />
          <b style={{ width: "70%" }} />
          <b style={{ width: "48%" }} />
          <span className="mono" style={{ marginTop: 10 }}>Skills</span>
          <div className="ui-pills"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="ui-list">
          <span className="mono">Recommended</span>
          {[86, 72, 61, 44].map((w, i) => (
            <div className="ui-row" key={i} style={{ ["--d" as string]: `${i * 120}ms` }}>
              <div className="ui-dot" />
              <div className="ui-lines">
                <b style={{ width: `${70 - i * 8}%` }} />
                <b style={{ width: `${46 - i * 4}%`, opacity: 0.6 }} />
              </div>
              <div className="ui-match"><u style={{ width: `${w}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceUI() {
  const bars = (n: number, seed: number) =>
    Array.from({ length: n }, (_, i) => 18 + Math.abs(Math.sin(i * 0.7 + seed) * 62) + ((i * 7 + seed * 3) % 11));
  return (
    <div className="ui ui-voice" aria-hidden="true">
      <div className="ui-bar">
        <i /><i /><i />
        <span className="mono">Speech generation</span>
      </div>
      <div className="ui-voice-body">
        <div className="ui-wave-card">
          <span className="mono">Reference voice</span>
          <div className="ui-wave">
            {bars(34, 1).map((h, i) => (
              <u key={i} style={{ height: `${h}%`, ["--d" as string]: `${(i % 9) * 90}ms` }} />
            ))}
          </div>
        </div>
        <div className="ui-arrow mono">XTTS-v2 ↓</div>
        <div className="ui-wave-card ink">
          <div className="ui-play"><svg width="12" height="12" viewBox="0 0 16 16"><path d="M4.5 2.6v10.8a.6.6 0 0 0 .9.5l8.6-5.4a.6.6 0 0 0 0-1L5.4 2.1a.6.6 0 0 0-.9.5z" fill="currentColor" /></svg></div>
          <div className="ui-wave">
            {bars(34, 4).map((h, i) => (
              <u key={i} style={{ height: `${h}%`, ["--d" as string]: `${(i % 7) * 110}ms` }} />
            ))}
          </div>
          <span className="mono">Generated speech</span>
        </div>
      </div>
    </div>
  );
}

function Panel({ p, open, onOpen, n }: { p: Project; open: boolean; onOpen: () => void; n: number }) {
  return (
    <article
      className={`wk-panel ${open ? "is-open" : ""}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && onOpen()}
      onFocus={onOpen}
      aria-label={`Project ${p.index}: ${p.title}`}
    >
      <button type="button" className="wk-spine" onClick={onOpen} aria-expanded={open} tabIndex={open ? -1 : 0}>
        <span className="mono wk-spine-n">{p.index}</span>
        <span className="wk-vtitle">{p.title}</span>
        <span className="wk-plus" aria-hidden="true">+</span>
        <span className="sr-only">Open project {p.index}</span>
      </button>

      <div className="wk-body" inert={!open} style={{ ["--n" as string]: n }}>
        <div className="wk-info">
          <p className="mono wk-kick">
            <span>{p.index}</span> · {p.kicker}
          </p>
          <h3 className="wk-title">{p.title}</h3>
          <p className="wk-desc">{p.description}</p>
          <ul className="wk-feats">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <ul className="wk-tech" aria-label="Tech stack">
            {p.tech.map((t) => (
              <li key={t}>
                <TechLogo name={t} size={16} />
                {t}
              </li>
            ))}
          </ul>
          {p.github && (
            <a className="btn btn-primary" href={p.github} target="_blank" rel="noopener noreferrer">
              View on GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <div className="wk-visual">
          <div className="wk-ui">{p.ui === "jobs" ? <JobsUI /> : <VoiceUI />}</div>
          <p className="mono wk-ui-label">Illustrative UI</p>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="work section" aria-labelledby="work-h">
      <style>{css}</style>
      <div className="wrap">
        <p className="tag rv">03 — Selected work</p>
        <h2 className="h2" id="work-h" style={{ marginTop: 22 }}>
          <span className="rv-mask">
            <span>
              Things I&apos;ve <em>built.</em>
            </span>
          </span>
        </h2>
        <div className="wk-track rv" style={{ ["--i" as string]: 2 }}>
          {PROJECTS.map((p, i) => (
            <Panel key={p.id} p={p} open={open === i} onOpen={() => setOpen(i)} n={PROJECTS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

const css = `
.wk-track{margin-top:56px;display:flex;gap:10px;height:min(78svh,600px);container-type:inline-size}
.wk-panel{position:relative;flex:1 1 0;min-width:0;border-radius:28px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;transition:flex .85s var(--ease),box-shadow .6s var(--ease)}
.wk-panel.is-open{flex:8 1 0;box-shadow:inset 0 0 0 1px var(--line),0 40px 80px -50px rgba(13,13,13,.4)}
.wk-spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:26px 0 24px;width:100%;opacity:1;transition:opacity .45s var(--ease),background .4s var(--ease)}
.wk-panel.is-open .wk-spine{opacity:0;pointer-events:none}
.wk-spine:hover{background:rgba(13,13,13,.025)}
.wk-spine-n{font-size:12px;color:var(--mute)}
.wk-vtitle{writing-mode:vertical-rl;transform:rotate(180deg);font-size:clamp(17px,1.6vw,22px);font-weight:600;letter-spacing:-.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-height:70%}
.wk-plus{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:20px;line-height:1;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);transition:transform .6s var(--ease),background .4s var(--ease),color .4s var(--ease)}
.wk-spine:hover .wk-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.wk-body{position:absolute;left:0;top:0;bottom:0;width:calc((100cqw - (var(--n) - 1) * 10px) * 8 / (7 + var(--n)));display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(20px,3vw,48px);padding:clamp(24px,3.2vw,48px);opacity:0;transition:opacity .35s var(--ease)}
.wk-panel.is-open .wk-body{opacity:1;transition:opacity .7s var(--ease) .3s}
.wk-info{display:flex;flex-direction:column;min-width:0}
.wk-kick{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.wk-kick span{color:var(--ink)}
.wk-title{margin-top:14px;font-size:clamp(26px,3vw,44px);font-weight:700;letter-spacing:-.045em;line-height:1.02;text-wrap:balance}
.wk-desc{margin-top:16px;font-size:15px;line-height:1.6;color:var(--ink-2);max-width:52ch}
.wk-feats{margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:8px 20px}
.wk-feats li{font-size:13.5px;color:var(--ink-2);padding-left:16px;position:relative;line-height:1.35}
.wk-feats li::before{content:"";position:absolute;left:0;top:.6em;width:7px;height:1px;background:var(--ink)}
.wk-tech{margin-top:auto;padding-top:22px;display:flex;flex-wrap:wrap;gap:6px}
.wk-tech li{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 12px 0 9px;border-radius:999px;background:var(--paper);font-size:12.5px;font-weight:500}
.wk-info .btn{margin-top:18px;align-self:flex-start}
.wk-visual{display:flex;flex-direction:column;min-width:0;min-height:0}
.wk-ui{flex:1;min-height:0;border-radius:20px;background:var(--paper);padding:clamp(14px,2vw,26px);display:grid;place-items:center;clip-path:inset(0 100% 0 0 round 20px);transition:clip-path .5s var(--ease)}
.wk-panel.is-open .wk-ui{clip-path:inset(0 0 0 0 round 20px);transition:clip-path 1.1s var(--ease) .35s}
.wk-ui-label{margin-top:10px;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);text-align:right}
/* mini UI */
.ui{width:100%;max-width:440px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px var(--line),0 24px 40px -28px rgba(13,13,13,.4);overflow:hidden}
.ui-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--line)}
.ui-bar i{width:8px;height:8px;border-radius:50%;background:var(--soft)}
.ui-bar span{margin-left:10px;font-size:10px;letter-spacing:.06em;color:var(--mute);text-transform:uppercase}
.ui b{display:block;height:7px;border-radius:99px;background:var(--soft)}
.ui .mono{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.ui-jobs-body{display:grid;grid-template-columns:34% 1fr;min-height:230px}
.ui-side{padding:14px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:7px}
.ui-avatar{width:34px;height:34px;border-radius:50%;background:var(--soft);margin:2px 0}
.ui-pills{display:flex;flex-wrap:wrap;gap:5px}
.ui-pills i{height:16px;width:34px;border-radius:99px;background:var(--soft)}
.ui-pills i:nth-child(2n){width:26px;background:var(--ink)}
.ui-pills i:nth-child(3n){width:42px}
.ui-list{padding:14px;display:flex;flex-direction:column;gap:9px}
.ui-row{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;box-shadow:inset 0 0 0 1px var(--line)}
.ui-dot{width:22px;height:22px;border-radius:7px;background:var(--soft);flex:none}
.ui-lines{flex:1;display:flex;flex-direction:column;gap:5px}
.ui-match{width:44px;height:5px;border-radius:99px;background:var(--soft);overflow:hidden;flex:none}
.ui-match u{display:block;height:100%;background:var(--ink);transform-origin:0 50%;animation:uiFill 1.4s var(--ease) var(--d,0ms) both paused}
.wk-panel.is-open .ui-match u{animation-play-state:running}
@keyframes uiFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.ui-voice-body{padding:16px;display:flex;flex-direction:column;gap:10px}
.ui-wave-card{padding:12px 14px;border-radius:12px;box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;gap:8px;position:relative}
.ui-wave-card.ink{background:var(--ink);box-shadow:none}
.ui-wave-card.ink .mono{color:#a9a6a0}
.ui-wave{height:52px;display:flex;align-items:center;gap:3px}
.ui-wave u{flex:1;border-radius:99px;background:var(--ink);opacity:.85;animation:wave 1.6s ease-in-out var(--d,0ms) infinite alternate;transform-origin:50% 50%;animation-play-state:paused}
.wk-panel.is-open .ui-wave u{animation-play-state:running}
.ui-wave-card.ink .ui-wave u{background:#fff}
@keyframes wave{from{transform:scaleY(.55)}to{transform:scaleY(1)}}
.ui-arrow{text-align:center;font-size:10px!important}
.ui-play{position:absolute;right:12px;top:12px;width:26px;height:26px;border-radius:50%;background:#fff;color:var(--ink);display:grid;place-items:center}
@media (max-width:1000px){
  .wk-body{grid-template-columns:minmax(0,1fr)}
  .wk-visual{display:none}
  .wk-feats{grid-template-columns:1fr}
}
@media (max-width:820px){
  .wk-track{flex-direction:column;height:auto;container-type:normal}
  .wk-panel{flex:none;max-height:84px;transition:max-height .85s var(--ease),box-shadow .6s var(--ease)}
  .wk-panel.is-open{flex:none;max-height:1200px}
  .wk-spine{flex-direction:row;padding:0 22px;height:84px;bottom:auto}
  .wk-vtitle{writing-mode:horizontal-tb;transform:none;font-size:17px;max-height:none;max-width:70%;order:2;margin-right:auto;margin-left:16px;white-space:normal;line-height:1.15;text-align:left}
  .wk-spine-n{order:1}
  .wk-plus{order:3}
  .wk-body{position:relative;width:auto;grid-template-columns:minmax(0,1fr);padding:26px 22px 28px}
  .wk-visual{display:flex}
  .wk-ui{min-height:260px}
  .wk-tech{padding-top:20px;margin-top:0}
}
`;
