import Link from "next/link";
import Container from "./Container";
import { SITE, FOOTER_GROUPS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-0">

      {/* Classification header */}
      <div className="border-b border-border bg-panel/40">
        <Container size="wide">
          <div className="py-2 flex flex-wrap justify-between items-center gap-3">
            <span className="doc-ref">NORTHSTER INC. / COMPUTATIONAL DIVISION — ARCHIVE DIV. 04</span>
            <span className="doc-ref">NS-SYS-INDEX / REV. IV — INTERNAL DISTRIBUTION</span>
          </div>
        </Container>
      </div>

      <Container size="wide">
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand block */}
          <div className="md:col-span-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl">★</span>
              <span className="font-display text-2xl">Northster</span>
            </div>
            <p className="mt-1 doc-ref">INSTITUTIONAL COMPUTING SYSTEMS</p>

            <div className="mt-6 border border-border bg-panel/40 px-4 py-4 space-y-1.5">
              <span className="doc-ref block">{SITE.established}</span>
              <span className="doc-ref block">{SITE.location}</span>
              <span className="doc-ref block">COMPUTATIONAL DIVISION</span>
              <span className="doc-ref block">MANUFACTURING LOG: SEALED 1998</span>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <span className="meta meta-accent signal-pulse">●</span>
              <span className="doc-ref">SIGNAL STABLE / CH.04</span>
            </div>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <h4 className="meta border-b border-border pb-2 mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="doc-ref link-amber block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Signal status */}
          <div className="md:col-span-2">
            <h4 className="meta border-b border-border pb-2 mb-4">SIGNAL LOG</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MetaAccent>●</MetaAccent>
                <span className="doc-ref">STABLE</span>
              </div>
              <span className="doc-ref block">UPTIME: 14Y 07M</span>
              <span className="doc-ref block">CH. 04 / MESH V3</span>
              <span className="doc-ref block">NODES: 6 VISIBLE</span>
            </div>
          </div>

        </div>

        {/* Legal strip */}
        <div className="border-t border-border py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span className="doc-ref">{SITE.legal}</span>
          <span className="doc-ref">{SITE.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}

function MetaAccent({ children }) {
  return <span className="meta meta-accent">{children}</span>;
}
