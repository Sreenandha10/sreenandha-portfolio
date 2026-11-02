import type { ReactNode } from "react";

/** Mono tag + bold heading that ends with one serif-italic word. */
export default function SectionHead({
  tag,
  lead,
  accent,
  id,
  children,
}: {
  tag: string;
  lead: string;
  accent: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="tag rv">{tag}</p>
      <h2 className="h2" id={id} style={{ marginTop: 22 }}>
        <span className="rv-mask">
          <span>
            {lead} <em>{accent}</em>
          </span>
        </span>
      </h2>
      {children}
    </div>
  );
}
