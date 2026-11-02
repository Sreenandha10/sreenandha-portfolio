"use client";

import { Fragment, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

function Hop({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, wi) => (
        <Fragment key={wi}>
          {wi > 0 && " "}
          <span className="hop-w">
            {Array.from(w).map((ch, i) => (
              <span key={i} className="hop-l" aria-hidden="true">
                {ch}
              </span>
            ))}
            <span className="sr-only">{w}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

export default function Contact() {
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section id="contact" className="ct section" aria-labelledby="ct-h">
        <style>{css}</style>
        <div className="wrap">
          <p className="tag rv">07 — Contact</p>
          <h2 className="ct-h h2 rv" id="ct-h" style={{ marginTop: 22 }}>
            <span className="ct-line">
              <Hop text="Let's build" />
            </span>
            <span className="ct-line">
              <Hop text="something" /> <span className="accent"><Hop text="together." /></span>
            </span>
          </h2>

          <div className="ct-grid">
            <div className="ct-main rv" style={{ ["--i" as string]: 1 }}>
              <p className="mono ct-label">Email</p>
              <div className="ct-email-row">
                <a className="ct-email" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
                <button type="button" className="ct-copy mono" onClick={copy}>
                  Copy
                </button>
                <span className="ct-live mono" aria-live="polite">
                  {copied ? "Copied ✓" : ""}
                </span>
              </div>

              <dl className="ct-list">
                <div>
                  <dt className="mono">Phone</dt>
                  <dd>
                    <a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="mono">GitHub</dt>
                  <dd>
                    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                      {PROFILE.githubLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mono">LinkedIn</dt>
                  <dd>
                    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                      {PROFILE.linkedinLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <a className="ct-badge rv" href={`mailto:${PROFILE.email}`} aria-label="Say hello by email" style={{ ["--i" as string]: 2 }}>
              <svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
                <defs>
                  <path id="ct-circle" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
                </defs>
                <g className="ct-spin">
                  <text className="mono" fontSize="11.5" letterSpacing="3.2" fill="currentColor">
                    <textPath href="#ct-circle" textLength="384" lengthAdjust="spacing">SAY HELLO · SAY HELLO · SAY HELLO · </textPath>
                  </text>
                </g>
                <circle cx="80" cy="80" r="26" fill="var(--ink)" />
                <path d="M72 88l16-16M76 72h12v12" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="ft">
        <div className="wrap ft-row">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
          <button type="button" className="ft-top" onClick={() => scrollToTarget(0)}>
            Back to top <span aria-hidden="true">↑</span>
          </button>
         
        </div>
      </footer>
    </>
  );
}

const css = `
.ct{padding-bottom:clamp(64px,10vh,110px)}
.ct-h{font-size:clamp(44px,9.4vw,150px);line-height:.95;letter-spacing:-.05em}
.ct-line{display:block}
.hop-w{display:inline-block;white-space:nowrap}
.hop-l{display:inline-block;cursor:default}
.hop-l:hover{animation:hop .7s var(--ease)}
@keyframes hop{0%{transform:translateY(0)}35%{transform:translateY(-.16em)}70%{transform:translateY(.02em)}100%{transform:translateY(0)}}
.ct-grid{margin-top:clamp(48px,8vh,88px);display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end}
.ct-label{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.ct-email-row{margin-top:10px;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px}
.ct-email{font-size:clamp(22px,3.6vw,52px);font-weight:600;letter-spacing:-.04em;line-height:1.1;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.16em;text-decoration-color:rgba(13,13,13,.3);overflow-wrap:anywhere;transition:text-decoration-color .4s var(--ease)}
.ct-email:hover{text-decoration-color:var(--ink)}
.ct-copy{height:32px;padding:0 14px;border-radius:99px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;box-shadow:inset 0 0 0 1px rgba(13,13,13,.25);transition:background .4s var(--ease),color .4s var(--ease)}
.ct-copy:hover{background:var(--ink);color:#fff}
.ct-live{font-size:12px;color:var(--mute);min-width:70px}
.ct-list{margin-top:44px;display:grid;grid-template-columns:repeat(3,minmax(0,auto));justify-content:start;gap:12px 56px}
.ct-list dt{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.ct-list dd{margin-top:6px;font-size:17px;font-weight:500;overflow-wrap:anywhere}
.ct-list a{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;padding-bottom:2px;transition:background-size .5s var(--ease)}
.ct-list a:hover{background-size:100% 1px}
.ct-badge{display:block;width:160px;height:160px;color:var(--ink);border-radius:50%;transition:transform .6s var(--ease)}
.ct-badge:hover{transform:scale(1.06)}
.ct-spin{transform-origin:80px 80px;animation:ctSpin 18s linear infinite}
@keyframes ctSpin{to{transform:rotate(360deg)}}
.ft{border-top:1px solid var(--line);padding-block:26px}
.ft-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 24px;font-size:14px;color:var(--mute)}
.ft-top{color:var(--ink);font-weight:500;transition:transform .5s var(--ease)}
.ft-top:hover{transform:translateY(-2px)}
.ft .mono{font-size:12px}
@media (max-width:900px){
  .ct-grid{grid-template-columns:minmax(0,1fr)}
  .ct-badge{justify-self:start;width:130px;height:130px}
  .ct-badge svg{width:130px;height:130px}
  .ct-list{grid-template-columns:minmax(0,1fr);gap:20px}
}
`;
