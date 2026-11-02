import { PROFILE } from "@/lib/data";
import Lanyard from "@/components/ui/Lanyard";

export default function About() {
  const facts: [string, React.ReactNode][] = [
    ["Location", PROFILE.location],
    ["Education", `B.Tech CSE · ${PROFILE.college} · CGPA ${PROFILE.cgpa}`],
    ["Latest internship", "Python Flask Developer Intern · Crudops Pvt.Ltd · Dec 2025"],
    ["Email", <a key="e" href={`mailto:${PROFILE.email}`} className="about-link">{PROFILE.email}</a>],
    ["Languages", PROFILE.languages.join(", ")],
  ];
  return (
    <section id="about" className="about" aria-labelledby="about-h">
      <style>{css}</style>
      <div className="wrap about-grid">
        <div className="about-left">
          <p className="tag rv">01 — About</p>
          <h2 className="h2" id="about-h" style={{ marginTop: 22 }}>
            <span className="rv-mask">
              <span>
                Hi, I&apos;m <em>{PROFILE.firstName}.</em>
              </span>
            </span>
          </h2>
          <p className="about-p rv" style={{ ["--i" as string]: 1 }}>
            {PROFILE.resumeSummary}
          </p>
          <p className="about-p about-p2 rv" style={{ ["--i" as string]: 2 }}>
            {PROFILE.extraLine}
          </p>
          <div className="about-btns rv" style={{ ["--i" as string]: 3 }}>
            <a className="btn btn-primary" href={PROFILE.resume} download>
              Résumé <span aria-hidden="true">↓</span>
            </a>
            <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="about-mid">
          <Lanyard />
        </div>

        <div className="about-right">
          <div className="rv">
            <p className="tag">Quick facts</p>
            <dl className="about-facts">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="about-quote card rv" style={{ ["--i" as string]: 2 }}>
            <blockquote>
              “Currently building a real-world MERN project — authentication, API development, database management and image uploads.”
            </blockquote>
            <figcaption className="mono">From my résumé</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const css = `
.about{padding-bottom:clamp(96px,14vh,160px)}
.about-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,3.5vw,56px);align-items:stretch}
.about-left,.about-right{padding-top:clamp(96px,14vh,160px);display:flex;flex-direction:column}
.about-left .h2{font-size:clamp(40px,5vw,76px)}
.about-p{margin-top:28px;font-size:clamp(15px,1.1vw,17px);line-height:1.65;color:var(--ink-2);max-width:56ch}
.about-p2{margin-top:14px;color:var(--mute)}
.about-btns{margin-top:32px;display:flex;flex-wrap:wrap;gap:10px}
.about-mid{display:flex;justify-content:center}
.about-right{justify-content:space-between;gap:36px}
.about-facts{margin-top:22px}
.about-facts div{padding:14px 0;border-top:1px solid var(--line)}
.about-facts div:last-child{border-bottom:1px solid var(--line)}
.about-facts dt{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.about-facts dd{margin-top:4px;font-size:15px;color:var(--ink);overflow-wrap:anywhere}
.about-link{background:linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat;transition:background-size .5s var(--ease)}
.about-link:hover{background-size:0 1px;background-position:100% 100%}
.about-quote{padding:26px 26px 22px;margin:0}
.about-quote blockquote{margin:0;font-family:var(--font-serif);font-style:italic;font-size:clamp(20px,1.6vw,24px);line-height:1.3;letter-spacing:-.01em}
.about-quote figcaption{margin-top:14px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
@media (max-width:1000px){
  .about-grid{grid-template-columns:minmax(0,1fr);gap:0}
  .about-mid{order:-1}
  .about-left{padding-top:56px}
  .about-right{padding-top:56px}
}
`;
