// Hardware technical illustrations — Northster Inc. product archive.
// Monochrome line-art depicting actual physical equipment.
// Amber (#c7a96b) reserved for active status indicators only.

const AMBER = "#c7a96b";
const DIM = "rgba(243,243,243,0.06)";
const SCREEN_BG = "#0c0f12";

// Reusable sub-elements
function VentSlots({ x, y, w, slotW = 14, slotH = 3, count = 6, gap = 6, vertical = false }) {
  return Array.from({ length: count }).map((_, i) =>
    vertical
      ? <rect key={i} x={x} y={y + i * gap} width={slotH} height={slotW} fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.55" />
      : <rect key={i} x={x} y={y + i * gap} width={slotW} height={slotH} fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.55" />
  );
}

function ScrewHole({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="3" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.5" />
      <line x1={cx - 1.5} y1={cy} x2={cx + 1.5} y2={cy} stroke="currentColor" strokeWidth="0.35" opacity="0.5" />
    </g>
  );
}

function Port({ cx, cy, r = 5 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
      <circle cx={cx} cy={cy} r={r - 2} stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" />
    </g>
  );
}

function StatusLamp({ cx, cy, active = true }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="4" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      {active && <circle cx={cx} cy={cy} r="2.5" fill={AMBER} opacity="0.9" />}
    </g>
  );
}

function Label({ x, y, text, opacity = 0.55, size = 6, anchor = "start" }) {
  return (
    <text
      x={x} y={y}
      fontFamily="monospace"
      fontSize={size}
      fill="currentColor"
      opacity={opacity}
      textAnchor={anchor}
      letterSpacing="0.08em"
    >
      {text}
    </text>
  );
}

// ── AX-01 — Computational Workstation, 1981 ──────────────────────
function GlyphAX01() {
  return (
    <g>
      {/* Main chassis — outer */}
      <rect x="60" y="30" width="280" height="260" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Panel seam — horizontal, separating display from base */}
      <line x1="60" y1="210" x2="340" y2="210" stroke="currentColor" strokeWidth="0.5" />
      {/* Panel seam — right vertical, separating vents from main body */}
      <line x1="288" y1="30" x2="288" y2="210" stroke="currentColor" strokeWidth="0.5" />

      {/* CRT bezel */}
      <rect x="72" y="42" width="204" height="155" fill={DIM} stroke="currentColor" strokeWidth="0.8" rx="1" />
      {/* CRT screen — recessed */}
      <rect x="79" y="49" width="190" height="141" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      {/* Phosphor wash — faint amber warmth in screen */}
      <rect x="79" y="49" width="190" height="141" fill={AMBER} opacity="0.03" />
      {/* Screen glare — single highlight line top */}
      <line x1="82" y1="52" x2="265" y2="52" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      {/* Screen content lines — suggest text/interface */}
      <line x1="90" y1="80" x2="200" y2="80" stroke="currentColor" strokeWidth="0.4" opacity="0.35" />
      <line x1="90" y1="90" x2="225" y2="90" stroke="currentColor" strokeWidth="0.3" opacity="0.28" />
      <line x1="90" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.28" />
      <line x1="90" y1="125" x2="240" y2="125" stroke="currentColor" strokeWidth="0.35" opacity="0.3" />
      <line x1="90" y1="135" x2="215" y2="135" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      <line x1="90" y1="145" x2="230" y2="145" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      {/* Cursor block */}
      <rect x="90" y="157" width="7" height="10" fill="currentColor" opacity="0.45" />

      {/* Right panel — vents */}
      <VentSlots x={296} y={48} slotW={30} slotH={3} count={9} gap={12} />

      {/* Lower chassis */}
      {/* Drive bays */}
      <rect x="72" y="218" width="80" height="14" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <rect x="72" y="218" width="80" height="14" stroke="currentColor" strokeWidth="0.25" fill="none" opacity="0.4" />
      <line x1="72" y1="225" x2="152" y2="225" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
      <Label x={77} y={226.5} text="FD / 01" />

      <rect x="160" y="218" width="80" height="14" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <line x1="160" y1="225" x2="240" y2="225" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
      <Label x={165} y={226.5} text="FD / 02" />

      {/* Status indicator row */}
      <StatusLamp cx={80} cy={245} active />
      <StatusLamp cx={96} cy={245} active={false} />
      <StatusLamp cx={112} cy={245} active={false} />
      <Label x={122} y={248} text="PWR    RDY    SIG" opacity={0.4} />

      {/* Speaker / lower vent */}
      <VentSlots x={200} y={222} slotW={120} slotH={2.5} count={6} gap={7} />

      {/* Model badge */}
      <rect x="266" y={252} width="60" height="18" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <Label x={296} y={263.5} text="AX–01" size={7} anchor="middle" opacity={0.7} />

      {/* Base / feet impression */}
      <line x1="75" y1="288" x2="325" y2="288" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <rect x="80" y="288" width="30" height="4" stroke="currentColor" strokeWidth="0.3" fill={DIM} opacity="0.5" />
      <rect x="290" y="288" width="30" height="4" stroke="currentColor" strokeWidth="0.3" fill={DIM} opacity="0.5" />

      {/* Screw holes — corners */}
      <ScrewHole cx={67} cy={37} />
      <ScrewHole cx={333} cy={37} />
      <ScrewHole cx={67} cy={283} />
      <ScrewHole cx={333} cy={283} />

      {/* Archive label — bottom left */}
      <Label x={62} y={303} text="NS-ARC-0023 / AXIS SERIES / 1981 / INTERNAL USE ONLY" opacity={0.35} />
    </g>
  );
}

// ── MONO/3 — Editorial Terminal, 1983 ───────────────────────────
function GlyphMono3() {
  return (
    <g>
      {/* Main body — wedge form, keyboard-integrated */}
      <rect x="60" y="80" width="280" height="180" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Angled top surface (visual suggestion via second rect offset) */}
      <line x1="60" y1="90" x2="340" y2="80" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />

      {/* Display panel — upper portion */}
      <rect x="68" y="88" width="200" height="115" fill={DIM} stroke="currentColor" strokeWidth="0.8" />
      {/* Screen */}
      <rect x="74" y="94" width="188" height="103" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      <rect x="74" y="94" width="188" height="103" fill={AMBER} opacity="0.04" />

      {/* Screen content — editorial text lines */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={i}
          x1={82} y1={108 + i*11}
          x2={82 + [100,140,90,130,120,85,110,95][i]} y2={108 + i*11}
          stroke="currentColor" strokeWidth="0.35" opacity="0.32"
        />
      ))}
      {/* Cursor */}
      <rect x="82" y="186" width="6" height="9" fill="currentColor" opacity="0.45" />

      {/* Display brand strip */}
      <Label x={168} y={208} text="MONO/3" size={7} anchor="middle" opacity={0.55} />
      <line x1="74" y1="211" x2="262" y2="211" stroke="currentColor" strokeWidth="0.3" opacity="0.35" />

      {/* Right side of unit — side panel */}
      <rect x="276" y="88" width="52" height="172" stroke="currentColor" strokeWidth="0.5" fill={DIM} opacity="0.6" />
      {/* Right side vents — top */}
      <VentSlots x={284} y={96} slotW={36} slotH={2.5} count={5} gap={7} />
      {/* Contrast knob */}
      <circle cx={296} cy={165} r={7} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
      <line x1={296} y1={159} x2={296} y2={163} stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <Label x={296} y={180} text="CONT" size={5} anchor="middle" opacity={0.4} />
      {/* Power connector */}
      <rect x="284" y="218" width="36" height="10" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <Label x={302} y={225.5} text="PWR" size={5} anchor="middle" opacity={0.4} />

      {/* Keyboard area — lower portion */}
      <rect x="60" y="216" width="212" height="44" stroke="currentColor" strokeWidth="0.5" fill={DIM} opacity="0.5" />
      {/* Key rows — abstract */}
      {[0,1,2].map(row => (
        <VentSlots key={row} x={68} y={220 + row*13} slotW={8} slotH={8} count={22} gap={9} />
      ))}

      {/* Status lamp */}
      <StatusLamp cx={248} cy={230} active />
      <Label x={246} y={242} text="RDY" size={5} anchor="middle" opacity={0.45} />

      {/* Model badge — front lower right */}
      <rect x="248" y="245" width="62" height="14" stroke="currentColor" strokeWidth="0.35" fill={DIM} />
      <Label x={279} y={254.5} text="NS–MN-0300" size={5.5} anchor="middle" opacity={0.6} />

      {/* Screw holes */}
      <ScrewHole cx={66} cy={86} />
      <ScrewHole cx={334} cy={86} />
      <ScrewHole cx={66} cy={254} />
      <ScrewHole cx={334} cy={254} />

      <Label x={62} y={275} text="NS-ARC-0089 / MONO SERIES / 1983 / EDITORIAL DIV." opacity={0.35} />
    </g>
  );
}

// ── SIGNAL NODE — Network Relay Unit, 1985 ───────────────────────
function GlyphSignalNode() {
  return (
    <g>
      {/* Field enclosure — compact, ruggedised */}
      <rect x="80" y="90" width="240" height="140" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />

      {/* Top carry-handle impression */}
      <path d="M 155 90 L 155 78 Q 200 68 245 78 L 245 90"
        stroke="currentColor" strokeWidth="0.7" fill="none" />

      {/* Face panel — inner */}
      <rect x="90" y="100" width="220" height="120" fill={DIM} stroke="currentColor" strokeWidth="0.5" />

      {/* Left section — connectors */}
      <rect x="90" y="100" width="70" height="120" stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity="0.4" />
      <Label x={125} y={113} text="INPUT" size={5.5} anchor="middle" opacity={0.5} />
      <Port cx={110} cy={130} r={8} />
      <Label x={110} y={147} text="A" size={5} anchor="middle" opacity={0.45} />
      <Port cx={150} cy={130} r={8} />
      <Label x={150} y={147} text="B" size={5} anchor="middle" opacity={0.45} />
      {/* Connector locking ring marks */}
      <circle cx={110} cy={130} r={12} stroke="currentColor" strokeWidth="0.25" fill="none" opacity="0.3" />
      <circle cx={150} cy={130} r={12} stroke="currentColor" strokeWidth="0.25" fill="none" opacity="0.3" />
      {/* Ground lug */}
      <rect x={100} y={178} width={60} height={8} stroke="currentColor" strokeWidth="0.35" fill={DIM} />
      <Label x={130} y={184} text="EARTH" size={5} anchor="middle" opacity={0.4} />

      {/* Centre section — status + mesh */}
      <Label x={245} y={113} text="STATUS" size={5.5} anchor="middle" opacity={0.5} />
      <StatusLamp cx={200} cy={138} active />
      <Label x={200} y={152} text="MESH" size={5} anchor="middle" opacity={0.4} />
      <StatusLamp cx={230} cy={138} active={false} />
      <Label x={230} y={152} text="LINK" size={5} anchor="middle" opacity={0.4} />
      <StatusLamp cx={260} cy={138} active={false} />
      <Label x={260} y={152} text="ERR" size={5} anchor="middle" opacity={0.4} />

      {/* Channel selector — rotary */}
      <circle cx={235} cy={177} r={11} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
      <line x1={235} y1={167} x2={235} y2={172} stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      {/* Channel marks */}
      {[0,1,2,3,4,5].map(i => {
        const a = (i / 6) * Math.PI * 1.5 - Math.PI * 0.25;
        return <line key={i}
          x1={235 + Math.cos(a) * 9} y1={177 + Math.sin(a) * 9}
          x2={235 + Math.cos(a) * 11} y2={177 + Math.sin(a) * 11}
          stroke="currentColor" strokeWidth="0.4" opacity="0.45"
        />;
      })}
      <Label x={235} y={197} text="CH.04" size={5} anchor="middle" opacity={0.5} />

      {/* Right section — power + ID */}
      <rect x="290" y="100" width="20" height="120" stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity="0.3" />
      <VentSlots x={295} y={108} slotW={10} slotH={2.5} count={8} gap={8} />
      <Port cx={300} cy={195} r={5} />
      <Label x={300} y={210} text="9V" size={5} anchor="middle" opacity={0.4} />

      {/* Badge plate */}
      <rect x="90" y="204" width="115" height="12" stroke="currentColor" strokeWidth="0.35" fill={DIM} />
      <Label x={97} y={212} text="SIGNAL NODE / NS-SN-0850-B / LOT 1985-012" size={5} opacity={0.6} />

      {/* Weathering marks — horizontal scratches */}
      <line x1="92" y1="172" x2="106" y2="172" stroke="currentColor" strokeWidth="0.25" opacity="0.2" />
      <line x1="92" y1="175" x2="100" y2="175" stroke="currentColor" strokeWidth="0.25" opacity="0.15" />

      {/* Screw holes — panel corners */}
      <ScrewHole cx={87} cy={107} />
      <ScrewHole cx={303} cy={107} />
      <ScrewHole cx={87} cy={213} />
      <ScrewHole cx={303} cy={213} />

      <Label x={80} y={246} text="NS-ARC-0142 / INFRASTRUCTURE / 1985 / FIELD ACTIVE" opacity={0.35} />
    </g>
  );
}

// ── VECTOR TERMINAL — Engineering Display, 1986 ─────────────────
function GlyphVectorTerminal() {
  return (
    <g>
      {/* Main display chassis */}
      <rect x="55" y="25" width="270" height="215" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Panel seam — bottom separating stand area */}
      <line x1="55" y1="200" x2="325" y2="200" stroke="currentColor" strokeWidth="0.5" />
      {/* Right vent panel seam */}
      <line x1="278" y1="25" x2="278" y2="200" stroke="currentColor" strokeWidth="0.5" />

      {/* CRT bezel */}
      <rect x="64" y="34" width="202" height="155" fill={DIM} stroke="currentColor" strokeWidth="0.8" />
      {/* Screen */}
      <rect x="70" y="40" width="190" height="143" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      <rect x="70" y="40" width="190" height="143" fill={AMBER} opacity="0.025" />

      {/* Vector diagram content — engineering lines */}
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.5" fill="none">
        {/* Architectural drawing impression */}
        <rect x="82" y="52" width="80" height="60" />
        <rect x="86" y="56" width="72" height="52" opacity="0.5" />
        <line x1="170" y1="52" x2="250" y2="52" />
        <line x1="170" y1="80" x2="250" y2="80" />
        <line x1="170" y1="112" x2="250" y2="112" />
        {/* Dimension lines */}
        <line x1="82" y1="120" x2="82" y2="130" strokeWidth="0.3" opacity="0.5" />
        <line x1="162" y1="120" x2="162" y2="130" strokeWidth="0.3" opacity="0.5" />
        <line x1="82" y1="125" x2="162" y2="125" strokeWidth="0.3" />
        {/* Coordinate axes */}
        <line x1="82" y1="150" x2="240" y2="150" strokeWidth="0.35" />
        <line x1="82" y1="150" x2="82" y2="55" strokeWidth="0.35" />
        {/* Data plot */}
        <path d="M 92 140 L 120 125 L 155 135 L 185 108 L 215 118 L 240 95" strokeWidth="0.6" />
        <circle cx="185" cy="108" r="2" fill={AMBER} opacity="0.9" stroke="none" />
      </g>

      {/* Right panel — controls */}
      <Label x={288} y={42} text="CTRL" size={5.5} anchor="middle" opacity={0.45} />
      {/* Brightness */}
      <circle cx={294} cy={62} r={7} stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <line x1={294} y1={56} x2={294} y2={59} stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
      <Label x={294} y={75} text="BRITE" size={4.5} anchor="middle" opacity={0.4} />
      {/* Focus */}
      <circle cx={308} cy={62} r={7} stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <line x1={308} y1={56} x2={308} y2={59} stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
      <Label x={308} y={75} text="FOCUS" size={4.5} anchor="middle" opacity={0.4} />
      {/* Vents */}
      <VentSlots x={283} y={90} slotW={32} slotH={2.5} count={10} gap={8} />

      {/* Lower chassis — digitiser area */}
      <rect x="55" y="200" width="270" height="28" fill={DIM} stroke="currentColor" strokeWidth="0.4" />
      <StatusLamp cx={72} cy={214} active />
      <StatusLamp cx={88} cy={214} active={false} />
      <Label x={100} y={217} text="PWR      SIG" size={5} opacity={0.45} />
      {/* Port row */}
      <Port cx={220} cy={214} r={5} />
      <Port cx={238} cy={214} r={5} />
      <Label x={220} y={227} text="PLOT   AUX" size={4.5} anchor="middle" opacity={0.4} />

      {/* Stand / base */}
      <rect x="130" y="228" width="120" height="18" fill={DIM} stroke="currentColor" strokeWidth="0.6" />
      <rect x="140" y="228" width="100" height="8" fill={DIM} stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
      <line x1="130" y1="246" x2="250" y2="246" stroke="currentColor" strokeWidth="0.8" />

      {/* Badge */}
      <rect x="57" y="204" width="120" height="10" stroke="currentColor" strokeWidth="0.3" fill={DIM} />
      <Label x={62} y={211} text="VECTOR TERMINAL / NS-VT-0860-A / 1986" size={5} opacity={0.6} />

      <ScrewHole cx={62} cy={31} />
      <ScrewHole cx={318} cy={31} />

      <Label x={57} y={265} text="NS-ARC-0178 / VECTOR SERIES / 1986 / ENG. DIVISION" opacity={0.35} />
    </g>
  );
}

// ── HZN-90 — Horizon Compute Cluster, 1989 ──────────────────────
function GlyphHZN90() {
  return (
    <g>
      {/* Rack enclosure — 19" standard form */}
      <rect x="50" y="50" width="300" height="220" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Rack ears */}
      <rect x="38" y="50" width="14" height="220" stroke="currentColor" strokeWidth="0.7" fill={DIM} />
      <rect x="348" y="50" width="14" height="220" stroke="currentColor" strokeWidth="0.7" fill={DIM} />
      {/* Ear screw holes */}
      {[0,1,2,3,4].map(i => <ScrewHole key={`l${i}`} cx={45} cy={70 + i*42} />)}
      {[0,1,2,3,4].map(i => <ScrewHole key={`r${i}`} cx={355} cy={70 + i*42} />)}

      {/* Four compute node units */}
      {[0,1,2,3].map(i => {
        const y = 58 + i * 52;
        return (
          <g key={i}>
            {/* Node unit bezel */}
            <rect x="55" y={y} width="290" height="44" stroke="currentColor" strokeWidth="0.6" fill={DIM} opacity="0.5" />
            {/* Panel seam */}
            <line x1="55" y1={y + 44} x2="345" y2={y + 44} stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
            {/* Left: indicator cluster */}
            <StatusLamp cx={68} cy={y + 10} active={i < 2} />
            <Label x={68} y={y + 19} text="ACT" size={4.5} anchor="middle" opacity={0.4} />
            <StatusLamp cx={84} cy={y + 10} active={i === 0} />
            <Label x={84} y={y + 19} text="SIG" size={4.5} anchor="middle" opacity={0.4} />
            {/* Node label */}
            <rect x="100" y={y + 6} width="70" height="14" stroke="currentColor" strokeWidth="0.3} fill={DIM}" fill={DIM} />
            <Label x={135} y={y + 15.5} text={`NODE / 0${i + 1}`} size={6} anchor="middle" opacity={0.65} />
            {/* Centre: activity bar — abstract utilisation */}
            <rect x="180" y={y + 9} width="100" height="8" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.5" />
            {i < 2 && <rect x="180" y={y + 9} width={[78, 52][i] || 0} height="8" fill="currentColor" opacity="0.12" />}
            <Label x={183} y={y + 29} text="LOAD" size={4.5} opacity={0.35} />
            {/* Right: port + access */}
            <Port cx={316} cy={y + 13} r={4} />
            <Port cx={330} cy={y + 13} r={4} />
            <Label x={323} y={y + 26} text="IN  OUT" size={4} anchor="middle" opacity={0.35} />
          </g>
        );
      })}

      {/* Bottom — power section */}
      <rect x="55" y="266" width="290" height="20" stroke="currentColor" strokeWidth="0.5" fill={DIM} opacity="0.4" />
      <Port cx={72} cy={276} r={5} />
      <Port cx={90} cy={276} r={5} />
      <Label x={81} y={292} text="48V DC" size={5} anchor="middle" opacity={0.45} />
      <VentSlots x={180} y={268} slotW={130} slotH={2.5} count={3} gap={7} />
      <Label x={150} y={278} text="DUAL SUPPLY" size={5} opacity={0.4} />

      {/* Badge */}
      <rect x="57" y="268" width="110" height="10" stroke="currentColor" strokeWidth="0.3" fill={DIM} />
      <Label x={62} y={275} text="HZN-90 / NS-HZ-9000-C / HORIZON" size={5} opacity={0.6} />

      <Label x={52} y={305} text="NS-ARC-0211 / HORIZON SERIES / 1989 / FIELD DEPLOYED" opacity={0.35} />
    </g>
  );
}

// ── POLARIS UNIT — Research Station Console, 1990 ────────────────
function GlyphPolarisUnit() {
  return (
    <g>
      {/* Sealed field enclosure */}
      <rect x="70" y="40" width="260" height="240" fill={DIM} stroke="currentColor" strokeWidth="1.4" rx="2" />
      {/* Reinforcement ribs — horizontal */}
      <line x1="70" y1="70" x2="330" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.45" />
      <line x1="70" y1="248" x2="330" y2="248" stroke="currentColor" strokeWidth="0.5" opacity="0.45" />
      {/* Carry handle top */}
      <path d="M 155 40 L 155 26 Q 200 16 245 26 L 245 40"
        stroke="currentColor" strokeWidth="0.9" fill="none" />
      {/* Handle grip texture */}
      {[-10,-5,0,5,10].map(o => (
        <line key={o} x1={195 + o} y1={22} x2={205 + o} y2={28}
          stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      ))}

      {/* Display panel — upper */}
      <rect x="82" y="78" width="176" height="120" fill={DIM} stroke="currentColor" strokeWidth="0.8" />
      {/* Screen — amber tint, CRT feel */}
      <rect x="88" y="84" width="164" height="108" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      <rect x="88" y="84" width="164" height="108" fill={AMBER} opacity="0.07" />
      {/* Screen content — sparse interface lines */}
      <line x1="96" y1="100" x2="200" y2="100" stroke={AMBER} strokeWidth="0.4" opacity="0.3" />
      <line x1="96" y1="112" x2="180" y2="112" stroke={AMBER} strokeWidth="0.3" opacity="0.25" />
      <line x1="96" y1="130" x2="220" y2="130" stroke={AMBER} strokeWidth="0.35" opacity="0.28" />
      <line x1="96" y1="142" x2="170" y2="142" stroke={AMBER} strokeWidth="0.3" opacity="0.22" />
      <line x1="96" y1="160" x2="200" y2="160" stroke={AMBER} strokeWidth="0.3" opacity="0.22" />
      {/* Cursor — amber */}
      <rect x="96" y="172" width="8" height="11" fill={AMBER} opacity="0.5" />
      {/* Polaris amber CRT badge */}
      <Label x={170} y={196} text="POLARIS / AMBER-14" size={6} anchor="middle" opacity={0.5} />

      {/* Right side — sealed port panel */}
      <rect x="268" y="78" width="50" height="120" stroke="currentColor" strokeWidth="0.5" fill={DIM} opacity="0.4" />
      <Label x={293} y={90} text="PORTS" size={5} anchor="middle" opacity={0.4} />
      <Port cx={283} cy={106} r={5} />
      <Label x={283} y={118} text="MESH" size={4} anchor="middle" opacity={0.4} />
      <Port cx={308} cy={106} r={5} />
      <Label x={308} y={118} text="AUX" size={4} anchor="middle" opacity={0.4} />
      {/* Sealed cover impression */}
      <rect x="270" y="128" width="46" height="30" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <line x1="270" y1="143" x2="316" y2="143" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
      <Label x={293} y={140} text="SEALED" size={5} anchor="middle" opacity={0.5} />
      <Label x={293} y={153} text="IP-67" size={5} anchor="middle" opacity={0.45} />

      {/* Status lamp */}
      <StatusLamp cx={86} cy={215} active />
      <Label x={86} y={225} text="PWR" size={4.5} anchor="middle" opacity={0.45} />
      <StatusLamp cx={104} cy={215} active />
      <Label x={104} y={225} text="MESH" size={4.5} anchor="middle" opacity={0.45} />
      <StatusLamp cx={122} cy={215} active={false} />
      <Label x={122} y={225} text="ERR" size={4.5} anchor="middle" opacity={0.45} />

      {/* Solar input */}
      <rect x="140" y="206" width="80" height="24" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <Label x={180} y={216} text="SOLAR IN" size={5} anchor="middle" opacity={0.45} />
      <Label x={180} y={226} text="12V DC" size={5} anchor="middle" opacity={0.4} />

      {/* Badge / data plate */}
      <rect x="82" y="232" width="176" height="13" stroke="currentColor" strokeWidth="0.35" fill={DIM} />
      <Label x={170} y={240.5} text="NS-PL-9001-B / POLARIS PROGRAM / RESTRICTED" size={5.5} anchor="middle" opacity={0.65} />

      {/* Corner reinforcement marks */}
      {[[75,45],[322,45],[75,272],[322,272]].map(([x,y],i) => (
        <ScrewHole key={i} cx={x} cy={y} />
      ))}

      <Label x={72} y={295} text="NS-ARC-0241 / POLARIS PROGRAM / 1990 / RESTRICTED" opacity={0.35} />
    </g>
  );
}

// ── ORBITAL — Atmospheric Signal Receiver, 1992 ──────────────────
function GlyphOrbital() {
  return (
    <g>
      {/* Main receiver chassis — two paired units side by side */}
      {/* Unit A */}
      <rect x="55" y="60" width="130" height="200" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Unit A — front panel */}
      <rect x="63" y="70" width="114" height="180" fill={DIM} stroke="currentColor" strokeWidth="0.5" opacity="0.6" />

      {/* Frequency display — waterfall */}
      <rect x="68" y="76" width="104" height="70" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      {/* Waterfall lines — varying opacity suggesting signal */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
        <rect key={i} x={68} y={76 + i * 5}
          width={Math.abs(Math.sin(i * 0.8) * 104)}
          height={4}
          fill="currentColor"
          opacity={0.04 + Math.abs(Math.sin(i * 0.9)) * 0.12}
        />
      ))}
      {/* Amber peak line */}
      <line x1="68" y1="106" x2="172" y2="106" stroke={AMBER} strokeWidth="0.4" opacity="0.35" />
      <Label x={170} y={153} text="WATERFALL / CH.A" size={5} anchor="end" opacity={0.5} />

      {/* Dial row */}
      <Label x={120} y={165} text="BAND  GAIN  MODE" size={5} anchor="middle" opacity={0.4} />
      {[86, 120, 154].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={178} r={10} stroke="currentColor" strokeWidth="0.55" fill={DIM} />
          <line x1={cx} y1={169} x2={cx} y2={173} stroke="currentColor" strokeWidth="0.55" opacity={0.6} />
          {[0,1,2,3,4,5,6,7].map(j => {
            const a = (j/8)*Math.PI*2;
            return <line key={j}
              x1={cx + Math.cos(a)*8.5} y1={178 + Math.sin(a)*8.5}
              x2={cx + Math.cos(a)*10} y2={178 + Math.sin(a)*10}
              stroke="currentColor" strokeWidth="0.3" opacity="0.35"
            />;
          })}
        </g>
      ))}

      {/* Paper roll output slot */}
      <rect x="68" y="200" width="104" height="16" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <line x1="68" y1="208" x2="172" y2="208" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
      <Label x={120} y={214} text="PRINT OUTPUT" size={4.5} anchor="middle" opacity={0.45} />

      <StatusLamp cx={76} cy={228} active />
      <Label x={76} y={238} text="RX" size={4.5} anchor="middle" opacity={0.4} />
      <StatusLamp cx={93} cy={228} active={false} />
      <Label x={93} y={238} text="PAIR" size={4.5} anchor="middle" opacity={0.4} />

      {/* Antenna connector top */}
      <circle cx={120} cy={62} r={8} stroke="currentColor" strokeWidth="0.7" fill={DIM} />
      <circle cx={120} cy={62} r={4} stroke="currentColor" strokeWidth="0.4} fill={DIM}" fill={DIM} />
      <Label x={120} y={60} text="ANT" size={4.5} anchor="middle" opacity={0.4} />

      {/* Unit B — paired unit (right) */}
      <rect x="215" y="60" width="130" height="200" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      <rect x="223" y="70" width="114" height="180" fill={DIM} stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <rect x="228" y="76" width="104" height="70" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
        <rect key={i} x={228} y={76 + i * 5}
          width={Math.abs(Math.cos(i * 0.9) * 104)}
          height={4}
          fill="currentColor"
          opacity={0.03 + Math.abs(Math.cos(i * 0.7)) * 0.09}
        />
      ))}
      <line x1="228" y1="111" x2="332" y2="111" stroke={AMBER} strokeWidth="0.4" opacity="0.35" />
      <Label x={330} y={153} text="WATERFALL / CH.B" size={5} anchor="end" opacity={0.5} />
      {[246, 280, 314].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={178} r={10} stroke="currentColor" strokeWidth="0.55" fill={DIM} />
          <line x1={cx} y1={169} x2={cx} y2={173} stroke="currentColor" strokeWidth="0.55" opacity={0.6} />
        </g>
      ))}
      <rect x="228" y="200" width="104" height="16" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <line x1="228" y1="208" x2="332" y2="208" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
      <Label x={280} y={214} text="PRINT OUTPUT" size={4.5} anchor="middle" opacity={0.45} />
      <StatusLamp cx={236} cy={228} active />
      <StatusLamp cx={253} cy={228} active />
      <circle cx={280} cy={62} r={8} stroke="currentColor" strokeWidth="0.7" fill={DIM} />
      <circle cx={280} cy={62} r={4} stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <Label x={280} y={60} text="ANT" size={4.5} anchor="middle" opacity={0.4} />

      {/* Pairing cable between units */}
      <path d="M 185 168 Q 200 160 215 168"
        stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5" />
      <Label x={200} y={158} text="PAIR" size={4.5} anchor="middle" opacity={0.4} />

      {/* Badge — Unit A */}
      <rect x="63" y="244" width="114" height="11" stroke="currentColor" strokeWidth="0.3" fill={DIM} />
      <Label x={120} y={251} text="ORBITAL / NS-OR-9200-A / RESTRICTED" size={5} anchor="middle" opacity={0.65} />

      <Label x={57} y={279} text="NS-ARC-0298 / ORBITAL PROGRAM / 1992 / RESTRICTED" opacity={0.35} />
    </g>
  );
}

// ── Registry ─────────────────────────────────────────────────────
const GLYPHS = {
  "ax-01": GlyphAX01,
  "mono-3": GlyphMono3,
  "signal-node": GlyphSignalNode,
  "vector-terminal": GlyphVectorTerminal,
  "hzn-90": GlyphHZN90,
  "polaris-unit": GlyphPolarisUnit,
  "orbital": GlyphOrbital,
};

export default function ProductGlyph({ slug, className = "" }) {
  const GlyphComponent = GLYPHS[slug] || GlyphAX01;
  return (
    <svg
      viewBox="0 0 400 320"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Background with grid */}
      <rect x="0" y="0" width="400" height="320" fill="#131619" />
      <g stroke="currentColor" strokeWidth="0.15" opacity="0.10">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="320" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
        ))}
      </g>
      {/* Blueprint border */}
      <rect x="4" y="4" width="392" height="312" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.2" />
      {/* Title block — top left */}
      <text x="8" y="12" fontFamily="monospace" fontSize="5.5" fill="currentColor" opacity="0.3" letterSpacing="0.1em">
        NORTHSTER INC. / TECHNICAL REFERENCE ILLUSTRATION
      </text>
      {/* Bottom right — classification */}
      <text x="392" y="314" fontFamily="monospace" fontSize="5" fill="currentColor" opacity="0.25"
        textAnchor="end" letterSpacing="0.08em">
        INTERNAL USE ONLY / MONOCHROME REPRODUCTION
      </text>
      {/* Hardware illustration */}
      <g className="text-text" color="currentColor">
        <GlyphComponent />
      </g>
    </svg>
  );
}
