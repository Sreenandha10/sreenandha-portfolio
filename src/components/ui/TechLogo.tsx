import type { ReactNode } from "react";

type Brand = { file: string; tint: string };

/** Official brand logos (devicon "original" SVGs, MIT) with a soft brand tint for the glow. */
const BRAND: Record<string, Brand> = {
  HTML5: { file: "html5", tint: "#e34f26" },
  CSS3: { file: "css3", tint: "#1572b6" },
  JavaScript: { file: "javascript", tint: "#f7df1e" },
  "React.js": { file: "react", tint: "#61dafb" },
  Redux: { file: "redux", tint: "#764abc" },
  Bootstrap: { file: "bootstrap", tint: "#7952b3" },
  "Tailwind CSS": { file: "tailwindcss", tint: "#38bdf8" },
  "Node.js": { file: "nodejs", tint: "#5fa04e" },
  "Express.js": { file: "express", tint: "#8a8a8a" },
  Python: { file: "python", tint: "#3776ab" },
  Flask: { file: "flask", tint: "#8a8a8a" },
  MySQL: { file: "mysql", tint: "#4479a1" },
  MongoDB: { file: "mongodb", tint: "#47a248" },
  C: { file: "c", tint: "#00599c" },
  Java: { file: "java", tint: "#e76f00" },
  Git: { file: "git", tint: "#f05032" },
  GitHub: { file: "github", tint: "#8a8a8a" },
  PyTorch: { file: "pytorch", tint: "#ee4c2c" },
  Axios: { file: "axios", tint: "#5a29e4" },
};

const P = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Thin line icons for concept skills. */
const CONCEPT: Record<string, ReactNode> = {
  "Responsive Web Design": (
    <>
      <rect x="2" y="4" width="14" height="10" rx="1.5" />
      <path d="M6 18h6M9 14v4" />
      <rect x="17.5" y="8" width="4.5" height="10" rx="1" />
    </>
  ),
  "DOM Manipulation": (
    <>
      <rect x="9" y="2.5" width="6" height="4" rx="1" />
      <rect x="2.5" y="16.5" width="6" height="4" rx="1" />
      <rect x="15.5" y="16.5" width="6" height="4" rx="1" />
      <path d="M12 6.5v4M5.5 16.5v-3h13v3" />
    </>
  ),
  "UI/UX": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 14l2.5 2.5L16 12" />
    </>
  ),
  "RESTful APIs": <path d="M4 8h14l-3-3M20 16H6l3 3" />,
  "API Integration": <path d="M8 3v4M16 3v4M6 7h12v4a6 6 0 0 1-12 0zM12 17v4" />,
  "Frontend–Backend Integration": (
    <>
      <rect x="2.5" y="5" width="7" height="7" rx="1.5" />
      <rect x="14.5" y="12" width="7" height="7" rx="1.5" />
      <path d="M9.5 8.5h3v7h2" />
    </>
  ),
  SQL: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  "Fetch API": <path d="M12 4v11m0 0-4-4m4 4 4-4M4 20h16" />,
  JSON: <path d="M9 4C6 4 7.5 8 5 12c2.5 4 1 8 4 8M15 4c3 0 1.5 4 4 8-2.5 4-1 8-4 8" />,
  Promises: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  "Async/Await": <path d="M4 12h6m0 0-3-3m3 3-3 3M10 12c4 0 4-6 10-6M10 12c4 0 4 6 10 6" />,
  "Object-Oriented Programming": <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12 4 7.5M12 12v9" />,
  "Data Structures & Algorithms": (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M11 7l-4 9M13 7l4 9" />
    </>
  ),
  DBMS: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 10v10" />
    </>
  ),
  SDLC: <path d="M20 12a8 8 0 1 1-2.5-5.8M20 4v5h-5" />,
  Debugging: (
    <>
      <rect x="8" y="8" width="8" height="11" rx="4" />
      <path d="M12 8V5M9 5l1.5 1.5M15 5l-1.5 1.5M4 12h4M16 12h4M5 18l3-2M19 18l-3-2M5 7l3 2M19 7l-3 2" />
    </>
  ),
  "Machine Learning": (
    <>
      <circle cx="5" cy="7" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="7" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M7 7l3.2 4M7 17l3.2-4M14 11l3.2-3M14 13l3.2 3" />
    </>
  ),
  "XTTS-v2": <path d="M3 12h1M7 8v8M11 4v16M15 7v10M19 10v4M21 12h0" />,
};

export function isBrand(name: string): boolean {
  return name in BRAND;
}

export function brandTint(name: string): string | undefined {
  return BRAND[name]?.tint;
}

export default function TechLogo({
  name,
  size = 40,
  glow = false,
  className = "",
}: {
  name: string;
  size?: number;
  glow?: boolean;
  className?: string;
}) {
  const b = BRAND[name];
  if (b) {
    return (
      <span
        className={`techlogo ${className}`}
        style={{ width: size, height: size, display: "inline-grid", placeItems: "center", position: "relative", flex: "none" }}
      >
        {glow && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-45%",
              borderRadius: "50%",
              background: `radial-gradient(closest-side, ${b.tint}30, transparent 72%)`,
            }}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/logos/${b.file}.svg`} alt="" width={size} height={size} loading="lazy" decoding="async" style={{ position: "relative", width: size, height: size }} />
      </span>
    );
  }
  const icon = CONCEPT[name] ?? <circle cx="12" cy="12" r="8" />;
  return (
    <span
      className={`techlogo ${className}`}
      style={{ width: size, height: size, display: "inline-grid", placeItems: "center", color: "var(--ink)", flex: "none" }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...P}>
        {icon}
      </svg>
    </span>
  );
}
