
"use client";

import { useState } from "react";
import { CERTIFICATIONS } from "@/lib/data";

export default function Certifications() {
  const ongoing = CERTIFICATIONS.filter((c) => c.note).length;

  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const openCertificate = (certificate: string, title: string) => {
    setSelectedCertificate(certificate);
    setSelectedTitle(title);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    setSelectedTitle("");
  };

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
            <li
              key={c.title}
              className="certs-row rv"
              tabIndex={0}
              style={{ ["--i" as string]: i }}
              onClick={() => {
                if (c.certificate) {
                  openCertificate(c.certificate, c.title);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (c.certificate) {
                    openCertificate(c.certificate, c.title);
                  }
                }
              }}
              role="button"
              aria-label={`View certificate: ${c.title}`}
            >
              <span className="certs-n mono">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="certs-main">
                <span className="certs-title">
                  {c.title}
                  {c.note && <small className="mono">{c.note}</small>}
                </span>

                <span className="certs-issuer">{c.issuer}</span>
              </span>

              <span className="certs-arrow" aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Certificate PDF Modal */}
      {selectedCertificate && (
        <div
          className="certificate-modal"
          onClick={closeCertificate}
          role="presentation"
        >
          <div
            className="certificate-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="certificate-header">
              <h3 id="certificate-title">{selectedTitle}</h3>

              <div className="certificate-actions">
                <a
                  href={selectedCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-open"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open in new tab ↗
                </a>

                <button
                  type="button"
                  className="certificate-close"
                  onClick={closeCertificate}
                  aria-label="Close certificate"
                >
                  ✕
                </button>
              </div>
            </div>

            <iframe
              src={`${selectedCertificate}#toolbar=1&navpanes=0`}
              title={selectedTitle}
              className="certificate-frame"
            />
          </div>
        </div>
      )}
    </section>
  );
}

const css = `
.certs{background:var(--card);border-block:1px solid var(--line);padding-block:clamp(96px,14vh,160px)}
.certs-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,6vw,96px);align-items:start}
.certs-left{position:sticky;top:calc(var(--nav-h) + 40px)}
.certs-count{margin-top:28px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.certs-list{border-bottom:1px solid var(--line)}
.certs-row{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr) 28px;align-items:center;gap:12px;padding:30px 22px;border-top:1px solid var(--line);overflow:hidden;isolation:isolate;transition:color .5s var(--ease),opacity .9s var(--ease),transform .9s var(--ease);outline-offset:-2px;cursor:pointer}
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

/* Certificate Modal */
.certificate-modal{
  position:fixed;
  inset:0;
  z-index:9999;
  background:rgba(0,0,0,.82);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:24px;
  backdrop-filter:blur(8px);
}

.certificate-content{
  width:min(100%,1000px);
  height:min(90vh,850px);
  background:var(--card);
  border:1px solid var(--line);
  border-radius:12px;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  box-shadow:0 20px 80px rgba(0,0,0,.4);
}

.certificate-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:16px 20px;
  border-bottom:1px solid var(--line);
}

.certificate-header h3{
  font-size:16px;
  font-weight:600;
  min-width:0;
}

.certificate-actions{
  display:flex;
  align-items:center;
  gap:16px;
  flex-shrink:0;
}

.certificate-open{
  font-size:12px;
  text-decoration:underline;
  color:var(--mute);
}

.certificate-close{
  width:34px;
  height:34px;
  border:1px solid var(--line);
  border-radius:50%;
  cursor:pointer;
  font-size:16px;
  transition:background .3s,color .3s;
}

.certificate-close:hover{
  background:var(--ink);
  color:white;
}

.certificate-frame{
  width:100%;
  flex:1;
  border:0;
  background:#fff;
}

@media (max-width:900px){
  .certs-grid{grid-template-columns:minmax(0,1fr)}
  .certs-left{position:static}
  .certs-row{padding:24px 14px;grid-template-columns:34px minmax(0,1fr) 24px}
}

@media (max-width:600px){
  .certificate-modal{
    padding:10px;
  }

  .certificate-content{
    height:90vh;
  }

  .certificate-header{
    padding:12px;
  }

  .certificate-header h3{
    font-size:13px;
  }

  .certificate-actions{
    gap:10px;
  }

  .certificate-open{
    font-size:10px;
  }
}
`;
