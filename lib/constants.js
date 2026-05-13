export const SITE = {
  name: "NORTHSTER INC.",
  shortName: "NORTHSTER",
  tagline: "COMPUTATIONAL SYSTEMS FOR A NEW ERA",
  established: "EST. 1978",
  location: "ARCHIVE — DIVISION 04",
  legal: "© NORTHSTER INDUSTRIES. ALL SIGNALS RESERVED.",
};

export const NAV = [
  { label: "INDEX",      href: "/",           futureLabel: "ORIGIN" },
  { label: "PRODUCTS",   href: "/products",   futureLabel: "SYSTEMS" },
  { label: "ARCHIVE",    href: "/archive",    futureLabel: "RECORD" },
  { label: "LABS",       href: "/labs",       futureLabel: "CONTINUUM" },
  { label: "NETWORK",    href: "/network",    futureLabel: "RELAY MESH" },
  { label: "PHILOSOPHY", href: "/philosophy", futureLabel: "DOCTRINE" },
];

export const FOOTER_GROUPS = [
  {
    title: "SYSTEMS",
    links: [
      { label: "AX–01", href: "/products/ax-01" },
      { label: "MONO/3", href: "/products/mono-3" },
      { label: "SIGNAL NODE", href: "/products/signal-node" },
      { label: "VECTOR TERMINAL", href: "/products/vector-terminal" },
    ],
  },
  {
    title: "DIVISIONS",
    links: [
      { label: "LABS", href: "/labs" },
      { label: "ARCHIVE DIV. 04", href: "/archive" },
      { label: "SIGNAL DIVISION", href: "/network" },
      { label: "INSTITUTIONAL DIVISIONS", href: "/archive/divisions" },
    ],
  },
  {
    title: "ARCHIVE",
    links: [
      { label: "DOCUMENT INDEX", href: "/archive/documents" },
      { label: "TRANSMISSION LOGS", href: "/archive/transmissions" },
      { label: "FIELD RECORDS", href: "/archive" },
      { label: "SYSTEM CATALOGUE", href: "/products" },
    ],
  },
];
