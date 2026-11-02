import { CERTIFICATIONS } from "@/lib/data";

export default function Certifications() {
  const ongoing = CERTIFICATIONS.filter((c) => c.note).length;
  return (
    <section id="certifications" className="certs" aria-labelledby="certs-h">
      <style>{css}</style>
      <div className="wrap certs-grid">
        <div className="certs-left">
          <p className="tag rv">04 — Certifications</p>
          <h2 className="h2" id="certs-h" style={{ marginTop: 22 }}>
            <span className="rv-mask">
              <span>
                Always <em>learning.</em>
              </span>
            </span>
          </h2>
          <p className="certs-count mono rv" style={{ ["--i" as string]: 2 }}>
            {String(CERTIFICATIONS.length).padStart(2, "0")} certifications
            {ongoing ? ` · ${String(ongoing).padStart(2, "0")} ongoing` : ""}
          </p>
        </div>
        <ol className="certs-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="certs-row rv" tabIndex={0} style={{ ["--i" as string]: i }}>
              <span className="certs-n mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="certs-main">
                <span className="certs-title">
                  {c.title}
                  {c.note && <small className="mono">{c.note}</small>}
                </span>
                <span className="certs-issuer">{c.issuer}</span>
              </span>
              <span className="certs-arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const css = `
.certs{background:var(--card);border-block:1px solid var(--line);padding-block:clamp(96px,14vh,160px)}
.certs-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,6vw,96px);align-items:start}
.certs-left{position:sticky;top:calc(var(--nav-h) + 40px)}
.certs-count{margin-top:28px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.certs-list{border-bottom:1px solid var(--line)}
.certs-row{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr) 28px;align-items:center;gap:12px;padding:30px 22px;border-top:1px solid var(--line);overflow:hidden;isolation:isolate;transition:color .5s var(--ease),opacity .9s var(--ease),transform .9s var(--ease);outline-offset:-2px}
.certs-row::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease);z-index:-1}
.certs-row:hover,.certs-row:focus-visible{color:#fff}
.certs-row:hover::before,.certs-row:focus-visible::before{transform:scaleX(1)}
.certs-n{font-size:12px;color:var(--mute);transition:color .5s var(--ease)}
.certs-row:hover .certs-n,.certs-row:focus-visible .certs-n{color:var(--faint)}
.certs-main{display:flex;flex-direction:column;gap:6px;min-width:0}
.certs-title{font-size:clamp(20px,2.2vw,30px);font-weight:600;letter-spacing:-.035em;line-height:1.15;display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px}
.certs-title small{font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:4px 9px;border-radius:99px;box-shadow:inset 0 0 0 1px currentColor;opacity:.7}
.certs-issuer{font-size:14px;color:var(--mute);transition:color .5s var(--ease)}
.certs-row:hover .certs-issuer,.certs-row:focus-visible .certs-issuer{color:#cfcdc8}
.certs-arrow{font-size:20px;opacity:0;transform:translate(-10px,6px);transition:opacity .5s var(--ease),transform .6s var(--ease)}
.certs-row:hover .certs-arrow,.certs-row:focus-visible .certs-arrow{opacity:1;transform:none}
@media (max-width:900px){
  .certs-grid{grid-template-columns:minmax(0,1fr)}
  .certs-left{position:static}
  .certs-row{padding:24px 14px;grid-template-columns:34px minmax(0,1fr) 24px}
}
`;
