"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { useScroll } from "@/lib/scroll";

export default function Hero() {
  const { scrollToTarget } = useScroll();
  const sec = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const visible = useRef(true);
  const wantPlay = useRef(true);
  const userMuted = useRef(false);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = vid.current;
    const s = sec.current;
    if (!v || !s) return;

    const playMutedFallback = () => {
      v.muted = true;
      v.play().catch(() => {});
      setBlocked(true);
    };
    const tryPlay = () => {
      v.play().catch(() => {
        if (!v.muted) playMutedFallback();
      });
    };

    /* 1. autoplay: try with sound first, fall back to muted */
    if (prefersReducedMotion()) {
      wantPlay.current = false; // poster only until the visitor presses the button
    } else {
      v.muted = false;
      v.play().catch(playMutedFallback);
    }

    const onVol = () => setSoundOn(!v.muted);
    v.addEventListener("volumechange", onVol);
    onVol();

    /* 2. unlock sound on the first real gesture */
    const unlock = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-sound]")) return;
      if (userMuted.current || !wantPlay.current) return cleanup();
      v.muted = false;
      setBlocked(false);
      if (visible.current) v.play().catch(() => (v.muted = true));
      cleanup();
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchend"];
    const cleanup = () => events.forEach((n) => window.removeEventListener(n, unlock));
    if (wantPlay.current) events.forEach((n) => window.addEventListener(n, unlock, { passive: true }));

    /* 3. pause (and silence) the moment the hero is < 35% visible */
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) {
          if (wantPlay.current && !document.hidden) tryPlay();
        } else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(s);

    const onHide = () => {
      if (document.hidden) v.pause();
      else if (visible.current && wantPlay.current) tryPlay();
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      cleanup();
      io.disconnect();
      v.removeEventListener("volumechange", onVol);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  const toggleSound = () => {
    const v = vid.current;
    if (!v) return;
    if (!v.muted && !v.paused) {
      v.muted = true;
      userMuted.current = true;
    } else {
      userMuted.current = false;
      wantPlay.current = true;
      v.muted = false;
      setBlocked(false);
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  };

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToTarget(`#${id}`, 0);
  };

  return (
    <section id="top" ref={sec} className="hero" aria-label="Introduction">
      <style>{css}</style>
      <div className="hero-ghost" aria-hidden="true">
        {PROFILE.firstName.toUpperCase()}
      </div>

      <div className="hero-grid wrap">
        <div className="hero-video">
          <video
            ref={vid}
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero/poster.jpg"
            aria-label={`${PROFILE.name} giving a short spoken self-introduction`}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            data-sound
            className={`hero-sound ${blocked && !soundOn ? "is-ping" : ""}`}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            aria-pressed={soundOn}
            onClick={toggleSound}
          >
            {soundOn ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
                <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4.5 2.6v10.8a.6.6 0 0 0 .9.5l8.6-5.4a.6.6 0 0 0 0-1L5.4 2.1a.6.6 0 0 0-.9.5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        <div className="hero-left">
          <p className="tag hero-in">{PROFILE.city}</p>
          <h1 className="hero-h1">
            <span className="sr-only">{PROFILE.name} — </span>
            <span className="hero-mask">
              <span>Full Stack</span>
            </span>
            <span className="hero-mask" style={{ ["--i" as string]: 1 }}>
              <span>
                <em>Developer.</em>
              </span>
            </span>
          </h1>
          <p className="hero-sub hero-in" style={{ ["--i" as string]: 3 }}>
            B.Tech Computer Science and Engineering graduate focused on MERN stack and full-stack web development.
          </p>
          <div className="hero-cta hero-in" style={{ ["--i" as string]: 4 }}>
            <a href="#work" className="btn btn-primary" onClick={(e) => go(e, "work")}>
              Explore work
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => go(e, "contact")}>
              Let&apos;s talk
            </a>
            <a href={PROFILE.resume} download className="btn btn-ghost">
              Résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-right hero-in" style={{ ["--i" as string]: 5 }}>
          <p className="mono hero-meta-label">Languages known</p>
          <p className="hero-meta">{PROFILE.languages.join(" · ")}</p>
          <a href="#about" className="hero-scroll" onClick={(e) => go(e, "about")}>
            <span className="mono">Scroll</span>
            <span className="hero-scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

const css = `
.hero{position:relative;min-height:100svh;padding-bottom:4svh;overflow:hidden;overflow:clip}
.hero-in{animation:heroUp 1s var(--ease) both;animation-delay:calc(var(--i,0)*80ms)}
@keyframes heroUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.hero-mask{display:block;overflow:hidden;padding-bottom:.12em;margin-bottom:-.12em}
.hero-mask>span{display:block;animation:heroMask 1.1s var(--ease) both;animation-delay:calc(var(--i,0)*90ms)}
@keyframes heroMask{from{transform:translateY(112%)}to{transform:none}}
.hero-ghost{position:absolute;left:0;right:0;top:44%;transform:translateY(-50%);text-align:center;font-weight:800;font-size:clamp(56px,14vw,260px);letter-spacing:-.045em;line-height:.9;color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.16);white-space:nowrap;pointer-events:none;user-select:none}
.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);grid-template-areas:"left video right";align-items:end;column-gap:clamp(16px,2.2vw,40px);min-height:min(100svh,1100px)}
.hero-video{grid-area:video;position:relative;align-self:start;height:min(96svh,1040px);aspect-ratio:768/960}
.hero-video video{display:block;width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply;animation:heroIn 1.4s var(--ease) both}
@keyframes heroIn{from{opacity:0}to{opacity:1}}
.hero-sound{position:absolute;right:4%;bottom:7%;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;transition:transform .45s var(--ease),background .45s var(--ease);z-index:2}
.hero-sound:hover{transform:scale(1.08);background:var(--ink-2)}
.hero-sound.is-ping::after{content:"";position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 0 rgba(13,13,13,.4);animation:ping 2.2s var(--ease) infinite}
@keyframes ping{0%{box-shadow:0 0 0 0 rgba(13,13,13,.4)}80%,100%{box-shadow:0 0 0 22px rgba(13,13,13,0)}}
.hero-left{grid-area:left;align-self:end;padding-bottom:6svh;display:flex;flex-direction:column;gap:20px;align-items:flex-start;min-width:0}
.hero-h1{font-weight:700;letter-spacing:-.045em;line-height:1;font-size:clamp(40px,4.4vw,72px)}
.hero-h1 em{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--mute);letter-spacing:-.02em;font-size:1.08em}
.hero-sub{max-width:34ch;color:var(--ink-2);font-size:clamp(15px,1.15vw,17px);line-height:1.5}
.hero-cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.hero-right{grid-area:right;align-self:end;justify-self:end;padding-bottom:6svh;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px}
.hero-meta-label{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.hero-meta{font-size:15px;color:var(--ink-2)}
.hero-scroll{margin-top:28px;display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.hero-scroll-line{position:relative;width:1px;height:56px;background:var(--line);overflow:hidden}
.hero-scroll-line::after{content:"";position:absolute;left:0;top:-40%;width:1px;height:40%;background:var(--ink);animation:scrollLine 2.4s var(--ease) infinite}
@keyframes scrollLine{0%{top:-40%}100%{top:110%}}
@media (max-width:1100px){
  .hero-h1{font-size:clamp(34px,4.4vw,52px)}
}
@media (max-width:900px){
  .hero{padding-bottom:56px}
  .hero-ghost{top:calc(var(--nav-h) + 31svh);font-size:15.5vw}
  .hero-grid{grid-template-columns:minmax(0,1fr);grid-template-areas:"video" "left" "right";min-height:0;row-gap:8px;padding-top:calc(var(--nav-h) - 24px)}
  .hero-video{height:62svh;justify-self:center}
  .hero-left{padding-bottom:0;align-items:center;text-align:center}
  .hero-h1{font-size:clamp(44px,13vw,72px)}
  .hero-sub{max-width:40ch}
  .hero-cta{justify-content:center}
  .hero-right{justify-self:center;align-items:center;text-align:center;padding-bottom:0;margin-top:20px}
  .hero-scroll{display:none}
}
`;
