// Hardware technical illustrations — Northster Inc. product archive.
// Monochrome line-art depicting actual physical equipment.
// Amber (#c7a96b) reserved for active status indicators only.

const AMBER = "var(--color-accent)";
const DIM = "var(--glyph-dim)";
const SCREEN_BG = "var(--glyph-screen)";

// Reusable sub-elements
function VentSlots({ x, y, slotW = 14, slotH = 3, count = 6, gap = 6, vertical = false }) {
  return Array.from({ length: count }).map((_, i) =>
    vertical
      ? <rect key={i} x={x} y={y + i * gap} width={slotH} height={slotW} fill="none" stroke="currentColor" strokeWidth="0.35" opacity={0.55} />
      : <rect key={i} x={x} y={y + i * gap} width={slotW} height={slotH} fill="none" stroke="currentColor" strokeWidth="0.35" opacity={0.55} />
  );
}

function ScrewHole({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="3" stroke="currentColor" strokeWidth="0.4" fill="none" opacity={0.5} />
      <line x1={cx - 1.5} y1={cy} x2={cx + 1.5} y2={cy} stroke="currentColor" strokeWidth="0.35" opacity={0.5} />
    </g>
  );
}

function Port({ cx, cy, r = 5 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
      <circle cx={cx} cy={cy} r={r - 2} stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.5} />
    </g>
  );
}

function StatusLamp({ cx, cy, active = true }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="4" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      {active && <circle cx={cx} cy={cy} r={2.5} fill={AMBER} opacity={0.9} />}
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
      {/* Main chassis — rugged industrial block */}
      <rect x="60" y="30" width="280" height="190" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Lower chassis — keyboard bed (angled perspective suggestion) */}
      <path d="M 60 220 L 340 220 L 355 285 L 45 285 Z" fill={DIM} stroke="currentColor" strokeWidth="1.2" />
      
      {/* Panel seams */}
      <line x1="288" y1="30" x2="288" y2="220" stroke="currentColor" strokeWidth="0.5" />
      <line x1="105" y1="30" x2="105" y2="220" stroke="currentColor" strokeWidth="0.5" />

      {/* Left side — Badge section */}
      <Label x={68} y={45} text="NORTHSTER INC." size={5} opacity={0.5} />
      <Label x={68} y={58} text="AX–01" size={10} opacity={0.8} />
      <Label x={68} y={70} text="COMPUTATIONAL WORKSTATION" size={4} opacity={0.4} />
      <Label x={68} y={85} text="AXIS LABORATORY" size={3.5} opacity={0.4} />
      <Label x={68} y={92} text="MANUFACTURING DIV. 02" size={3.5} opacity={0.4} />
      <Label x={68} y={110} text="1981" size={5} opacity={0.4} />
      
      {/* Amber status lamp on left panel */}
      <StatusLamp cx={85} cy={180} active />

      {/* CRT bezel — central */}
      <rect x="115" y="42" width="162" height="155" fill={DIM} stroke="currentColor" strokeWidth="0.8" rx="1" />
      {/* CRT screen — recessed */}
      <rect x="122" y="49" width="148" height="141" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      <rect x="122" y="49" width="148" height="141" fill={AMBER} opacity={0.03} />
      
      {/* Vector analysis plot (matching image) */}
      <g stroke="currentColor" strokeWidth="0.3" opacity={0.4} fill="none">
         <path d="M 135 160 L 160 140 L 180 165 L 210 110 L 235 150 L 255 130" strokeWidth="0.6" opacity={0.6} />
         <path d="M 135 160 Q 195 60 255 160" strokeWidth="0.3" opacity={0.3} />
         <line x1="135" y1="160" x2="255" y2="160" strokeWidth="0.2" />
         <line x1="195" y1="49" x2="195" y2="190" strokeDasharray="2,2" />
      </g>
      <Label x={220} y={65} text="VECTOR ANALYSIS" size={4} opacity={0.5} />
      <Label x={220} y={72} text="MODE: AXIAL" size={3.5} opacity={0.4} />

      {/* Right side — Controls */}
      <Label x={314} y={45} text="SYSTEM CONTROL" size={4} anchor="middle" opacity={0.5} />
      <circle cx={314} cy={65} r={8} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
      <circle cx={314} cy={95} r={6} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
      <rect x="304" y="120" width="20" height="8" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <rect x="304" y="132" width="20" height="8" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      
      {/* Panel control cluster lower right */}
      <rect x="296" y="160" width="36" height="45" stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.3} />
      {[0,1,2].map(i => (
        <rect key={i} x={302} y={165 + i * 14} width={24} height={8} stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.5} />
      ))}

      {/* Keyboard area — matching physical layout */}
      <g transform="translate(65, 230)">
        {/* Main keys */}
        {[0,1,2,3].map(row => (
          <g key={row} transform={`translate(${row * 4}, ${row * 12})`}>
            {Array.from({ length: 14 }).map((_, i) => (
              <rect key={i} x={i * 18} y={0} width={15} height={10} stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.6} />
            ))}
          </g>
        ))}
        {/* Numpad */}
        <g transform="translate(210, 0)">
          {[0,1,2,3].map(row => (
            <g key={row} transform={`translate(0, ${row * 12})`}>
              {Array.from({ length: 3 }).map((_, i) => (
                <rect key={i} x={i * 18} y={0} width={15} height={10} stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.6} />
              ))}
            </g>
          ))}
        </g>
      </g>

      <Label x={62} y={305} text="NS-ARC-0023 / AXIS SERIES / 1981 / INTERNAL USE ONLY" opacity={0.35} />
    </g>
  );
}

// ── MONO/3 — Editorial Terminal, 1983 ───────────────────────────
function GlyphMono3() {
  return (
    <g>
      {/* Main body — wedge form */}
      <rect x="60" y="50" width="280" height="160" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Keyboard bed */}
      <path d="M 60 210 L 340 210 L 360 280 L 40 280 Z" fill={DIM} stroke="currentColor" strokeWidth="1.2" />
      
      {/* Side vents — left side (visible in perspective in photo) */}
      <VentSlots x={45} y={215} slotW={15} slotH={3} count={4} gap={8} vertical />

      {/* Left panel — Badge */}
      <Label x={68} y={65} text="NORTHSTER INC." size={5} opacity={0.5} />
      <Label x={68} y={78} text="MONO/3" size={10} opacity={0.8} />
      <Label x={68} y={90} text="EDITORIAL TERMINAL" size={4} opacity={0.4} />
      
      {/* Status lamp below badge */}
      <StatusLamp cx={75} cy={180} active />

      {/* Display panel — central/right */}
      <rect x="110" y="60" width="220" height="140" fill={DIM} stroke="currentColor" strokeWidth="0.8" />
      {/* Screen */}
      <rect x="118" y="68" width="204" height="124" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      <rect x="118" y="68" width="204" height="124" fill={AMBER} opacity={0.04} />

      {/* Screen content — editorial text (matching image) */}
      <g opacity={0.4} fill="currentColor">
        <Label x={126} y={85} text="DOCUMENT 01" size={5} />
        <Label x={260} y={85} text="MONO/3 EDITOR" size={5} />
        <Label x={126} y={95} text="CHAPTER IV" size={5} />
        <Label x={260} y={95} text="NORTHSTER INC." size={5} />
        
        <Label x={126} y={115} text="On the Structure of Mechanical Thought" size={6} />
        
        <Label x={126} y={135} text="The machine is not a replacement" size={5} />
        <Label x={126} y={145} text="for the mind, but an instrument" size={5} />
        <Label x={126} y={155} text="within its extension." size={5} />
        
        <line x1={126} y1={175} x2={314} y2={175} stroke="currentColor" strokeWidth={0.3} />
        <Label x={126} y={185} text="LINE 014" size={5} />
        <Label x={200} y={185} text="COLUMN 032" size={5} />
        <Label x={280} y={185} text="INSERT" size={5} />
      </g>

      {/* Keyboard area */}
      <g transform="translate(60, 220)">
        {[0,1,2,3].map(row => (
          <g key={row} transform={`translate(${row * 4}, ${row * 14})`}>
            {Array.from({ length: 15 }).map((_, i) => (
              <rect key={i} x={i * 19} y={0} width={16} height={11} stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.6} />
            ))}
          </g>
        ))}
      </g>

      <Label x={62} y={305} text="NS-ARC-0089 / MONO SERIES / 1983 / EDITORIAL DIV." opacity={0.35} />
    </g>
  );
}

// ── SIGNAL NODE — Network Relay Unit, 1985 ───────────────────────
function GlyphSignalNode() {
  return (
    <g>
      {/* Field enclosure — ruggedised industrial metal */}
      <rect x="50" y="80" width="300" height="150" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      {/* Heavy base plate */}
      <rect x="40" y="230" width="320" height="12" fill={DIM} stroke="currentColor" strokeWidth="1" />
      
      {/* Panel seams */}
      <line x1="140" y1="80" x2="140" y2="230" stroke="currentColor" strokeWidth="0.5" />
      <line x1="285" y1="80" x2="285" y2="230" stroke="currentColor" strokeWidth="0.5" />

      {/* Left section — Connectors & ID */}
      <Label x={58} y={105} text="NORTHSTER INC." size={4.5} opacity={0.5} />
      <Label x={58} y={118} text="SIGNAL NODE" size={8} opacity={0.8} />
      <Label x={58} y={128} text="NETWORK RELAY UNIT" size={3.5} opacity={0.4} />
      
      <Label x={58} y={150} text="INFRASTRUCTURE SYSTEMS" size={3} opacity={0.4} />
      <Label x={58} y={158} text="MANUFACTURING DIV. 01" size={3} opacity={0.4} />
      <Label x={58} y={166} text="1985" size={4} opacity={0.4} />
      
      <rect x="58" y="190" width="70" height="25" stroke="currentColor" strokeWidth="0.3" fill={DIM} />
      <Label x={63} y={198} text="MODEL: SN-1A" size={4} opacity={0.6} />
      <Label x={63} y={208} text="SERIAL: 01-85-2471" size={4} opacity={0.6} />

      {/* Center section — Analog Meters */}
      <rect x="150" y="95" width="125" height="120" fill={DIM} stroke="currentColor" strokeWidth="0.5" opacity={0.3} />
      <Label x={212.5} y={110} text="SIGNAL DIAGNOSTICS" size={4.5} anchor="middle" opacity={0.6} />
      
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${158 + i * 40}, 125)`}>
          <rect x="0" y="0" width="34" height="28" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
          {/* Dial scale */}
          <path d="M 5 22 Q 17 12 29 22" stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.4} />
          {/* Needle */}
          <line x1="17" y1="25" x2={17 + (i === 1 ? 5 : -4)} y2={15} stroke="currentColor" strokeWidth="0.5" opacity={0.8} />
          <Label x={17} y={35} text={["LEVEL", "LINK", "OUTPUT"][i]} size={3.5} anchor="middle" opacity={0.4} />
        </g>
      ))}
      
      {/* Status indicators below meters */}
      <StatusLamp cx={170} cy={205} active />
      <Label x={180} y={208} text="POWER" size={4} opacity={0.4} />
      <StatusLamp cx={210} cy={205} active={false} />
      <Label x={220} y={208} text="LINK" size={4} opacity={0.4} />

      {/* Right section — Maintenance Access */}
      <Label x={295} y={105} text="MAINTENANCE ACCESS" size={3.5} opacity={0.5} />
      <Label x={295} y={130} text="DISCONNECT POWER" size={3} opacity={0.3} />
      <Label x={295} y={138} text="BEFORE REMOVAL" size={3} opacity={0.3} />
      
      {/* Keyed lock */}
      <circle cx={318} cy={180} r={10} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
      <rect x="314" y="174" width="8" height="12" stroke="currentColor" strokeWidth="0.4" fill="none" opacity={0.6} />
      <line x1="318" y1="174" x2="318" y2="186" stroke="currentColor" strokeWidth="0.4" opacity={0.6} />

      {/* Corner screws */}
      {[55, 345].map(x => [85, 225].map(y => <ScrewHole key={`${x}-${y}`} cx={x} cy={y} />))}
      
      <Label x={50} y={255} text="NS-ARC-0142 / INFRASTRUCTURE / 1985 / FIELD ACTIVE" opacity={0.35} />
    </g>
  );
}

// ── VECTOR TERMINAL — Engineering Display, 1986 ─────────────────
function GlyphVectorTerminal() {
  return (
    <g>
      {/* Main display chassis */}
      <rect x="55" y="25" width="270" height="175" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      
      {/* Left panel — Badge */}
      <line x1="115" y1="25" x2="115" y2="200" stroke="currentColor" strokeWidth="0.5" />
      <Label x={62} y={45} text="NORTHSTER INC." size={4.5} opacity={0.5} />
      <Label x={62} y={58} text="VECTOR TERMINAL" size={8} opacity={0.8} />
      <Label x={62} y={68} text="ENGINEERING DISPLAY" size={3.5} opacity={0.4} />
      <Label x={62} y={85} text="ENGINEERING SYSTEMS" size={3} opacity={0.4} />
      <Label x={62} y={92} text="MANUFACTURING DIV. 04" size={3} opacity={0.4} />
      <Label x={62} y={102} text="1986" size={4} opacity={0.4} />
      <StatusLamp cx={85} cy={160} active />

      {/* CRT screen central */}
      <rect x="125" y="35" width="145" height="155" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.6" rx="1" />
      <rect x="125" y="35" width="145" height="155" fill={AMBER} opacity={0.03} />
      
      {/* Topographic 3D grid (matching image) */}
      <g stroke="currentColor" strokeWidth="0.25" opacity="0.35" fill="none">
        <path d="M 140 100 L 170 80 L 230 90 L 250 110 L 220 130 L 160 140 Z" />
        <path d="M 140 100 L 160 115 L 220 105 L 230 90" />
        <path d="M 170 80 L 185 95 L 250 110" />
        <Label x={145} y={55} text="DATA SET: SURVEY_86-04" size={3.5} />
      </g>
      {/* Radar/contour plot lower right */}
      <g transform="translate(195, 145)" opacity={0.3}>
        <circle cx="0" cy="0" r="25" stroke="currentColor" strokeWidth="0.2" fill="none" />
        <circle cx="0" cy="0" r="15" stroke="currentColor" strokeWidth="0.2" fill="none" />
        <line x1="-25" y1="0" x2="25" y2="0" stroke="currentColor" strokeWidth="0.2" />
        <line x1="0" y1="-25" x2="0" y2="25" stroke="currentColor" strokeWidth="0.2" />
      </g>

      {/* Right control stack */}
      <line x1="275" y1="25" x2="275" y2="200" stroke="currentColor" strokeWidth="0.5" />
      <Label x={300} y={40} text="DISPLAY CONTROL" size={4} anchor="middle" opacity={0.5} />
      <circle cx={290} cy={55} r={5} stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <circle cx={310} cy={55} r={5} stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <circle cx={290} cy={80} r={5} stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <circle cx={310} cy={80} r={5} stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      
      <Label x={300} y={105} text="VECTOR CONTROL" size={4} anchor="middle" opacity={0.5} />
      {[0,1].map(r => [0,1,2].map(c => (
        <rect key={`${r}-${c}`} x={286 + c * 9} y={115 + r * 10} width={7} height={7} stroke="currentColor" strokeWidth="0.3" fill={DIM} />
      )))}

      {/* Large base with Keyboard and Digitizer */}
      <path d="M 55 200 L 325 200 L 345 285 L 35 285 Z" fill={DIM} stroke="currentColor" strokeWidth="1.2" />
      <line x1="165" y1="200" x2="175" y2="285" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Keyboard (left half) */}
      <g transform="translate(50, 215)">
        {[0,1,2,3].map(r => Array.from({length: 10}).map((_, i) => (
          <rect key={`${r}-${i}`} x={i * 11 + r * 2} y={r * 12} width={9} height={8} stroke="currentColor" strokeWidth="0.35" fill={DIM} opacity={0.6} />
        )))}
      </g>
      
      {/* Digitizer Pad (right half) */}
      <rect x="190" y="212" width="110" height="60" stroke="currentColor" strokeWidth="0.6" fill={SCREEN_BG} opacity={0.4} />
      {/* Stylus port */}
      <rect x="310" y="235" width="12" height="20" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
      <line x1="316" y1="235" x2="316" y2="215" stroke="currentColor" strokeWidth="0.5" opacity={0.5} />

      <Label x={57} y={305} text="NS-ARC-0178 / VECTOR SERIES / 1986 / ENG. DIVISION" opacity={0.35} />
    </g>
  );
}

// ── HZN-90 — Horizon Compute Cluster, 1989 ──────────────────────
function GlyphHZN90() {
  return (
    <g>
      {/* Rack cabinet enclosure */}
      <rect x="40" y="40" width="320" height="250" fill={DIM} stroke="currentColor" strokeWidth="1.2" />
      <line x1="65" y1="40" x2="65" y2="290" stroke="currentColor" strokeWidth="0.5" />
      <line x1="335" y1="40" x2="335" y2="290" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Heavy handles on sides */}
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M 50 ${65 + i * 55} Q 40 ${77 + i * 55} 50 ${90 + i * 55}`} stroke="currentColor" strokeWidth="2.5" fill="none" opacity={0.8} />
      ))}

      {/* Four compute node units */}
      {[0, 1, 2, 3].map(i => {
        const y = 50 + i * 55;
        return (
          <g key={i}>
            <rect x="65" y={y} width="270" height="50" stroke="currentColor" strokeWidth="0.5" fill={DIM} opacity={0.3} />
            
            {/* Left: Vent area */}
            <VentSlots x={75} y={y + 10} slotW={30} slotH={2.5} count={4} gap={8} />
            
            {/* Centre: Node ID & Status */}
            <Label x={115} y={y + 15} text="HZN-90" size={5} opacity={0.8} />
            <Label x={115} y={y + 25} text={`NODE 0${i + 1}`} size={4} opacity={0.5} />
            
            <StatusLamp cx={115} cy={y + 38} active={i < 2} />
            <Label x={123} y={y + 41} text="ACT" size={3.5} opacity={0.4} />

            {/* Maintenance Display */}
            <rect x="155" y={y + 8} width="95" height="34" fill={SCREEN_BG} stroke="currentColor" strokeWidth={0.4} />
            <g opacity={0.5}>
              <Label x={160} y={y + 16} text={`NODE 0${i + 1} ${i < 2 ? 'ACTIVE' : 'IDLE'}`} size={3.5} />
              <Label x={160} y={y + 24} text={`LOAD: 0.${i === 1 ? '68' : '17'}`} size={3.5} />
              <Label x={160} y={y + 32} text={`TEMP: ${38 + i * 4}.2 C`} size={3.5} />
            </g>

            {/* Mode Control stack on right */}
            <rect x="260" y={y + 8} width="65" height="34" stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.4} />
            {[0, 1, 2].map(b => (
              <rect key={b} x={265 + b * 20} y={y + 12} width={16} height={8} stroke="currentColor" strokeWidth="0.3" fill={DIM} />
            ))}
            <circle cx={292.5} cy={y + 32} r={5} stroke="currentColor" strokeWidth="0.4" fill={DIM} />
          </g>
        );
      })}

      {/* Bottom section — Power & Analog Meters */}
      <g transform="translate(0, 270)">
        <rect x="65" y="0" width="270" height="35" stroke="currentColor" strokeWidth="0.6" fill={DIM} />
        {[0, 1, 2].map(m => (
          <g key={m} transform={`translate(${85 + m * 65}, 5)`}>
             <rect x="0" y="0" width="50" height="25" stroke="currentColor" strokeWidth="0.4" fill={SCREEN_BG} opacity={0.2} />
             <path d="M 5 20 Q 25 5 45 20" stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.4} />
             <line x1="25" y1="23" x2={25 + (m === 0 ? 5 : -3)} y2={10} stroke="currentColor" strokeWidth="0.5" />
          </g>
        ))}
      </g>

      <Label x={45} y={315} text="NS-ARC-0211 / HORIZON SERIES / 1989 / CLUSTER ACTIVE" opacity={0.35} />
    </g>
  );
}

// ── POLARIS UNIT — Research Station Console, 1990 ────────────────
function GlyphPolarisUnit() {
  return (
    <g>
      {/* Heavy portable chassis */}
      <rect x="50" y="30" width="300" height="190" fill={DIM} stroke="currentColor" strokeWidth="1.4" rx="2" />
      <rect x="45" y="220" width="310" height="70" fill={DIM} stroke="currentColor" strokeWidth="1.2" />
      
      {/* Massive side handles */}
      <path d="M 50 70 Q 30 110 50 150" stroke="currentColor" strokeWidth="4" fill="none" opacity={0.8} />
      <path d="M 350 70 Q 370 110 350 150" stroke="currentColor" strokeWidth="4" fill="none" opacity={0.8} />

      {/* Main Display Panel */}
      <rect x="110" y="45" width="160" height="160" fill={DIM} stroke="currentColor" strokeWidth="0.8" />
      <rect x="118" y="53" width="144" height="144" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      <rect x="118" y="53" width="144" height="144" fill={AMBER} opacity={0.06} />
      
      {/* Polaris environment interface (matching image) */}
      <g opacity={0.5}>
        <Label x={125} y={70} text="POLARIS ENVIRONMENTAL" size={4.5} />
        <Label x={125} y={78} text="STATION: DOME-01" size={4.5} />
        <circle cx={190} cy={115} r={28} stroke="currentColor" strokeWidth="0.35" fill="none" />
        <circle cx={190} cy={115} r={18} stroke="currentColor" strokeWidth="0.35" fill="none" />
        <line x1="162" y1="115" x2="218" y2="115" stroke="currentColor" strokeWidth="0.35" />
        <line x1="190" y1="87" x2="190" y2="143" stroke="currentColor" strokeWidth="0.35" />
        <Label x={125} y={160} text="SYSTEM STATUS: NOMINAL" size={4} />
        <Label x={125} y={170} text="HEATER SYS: NOMINAL" size={4} />
      </g>

      {/* Right control stack */}
      <rect x="275" y="45" width="65" height="160" stroke="currentColor" strokeWidth="0.5" fill={DIM} />
      <Label x={307.5} y={60} text="STATION CONTROL" size={4} anchor="middle" opacity={0.5} />
      {[0,1,2].map(i => <StatusLamp key={i} cx={285 + i * 22} cy={75} active={i < 2} />)}
      
      <Label x={307.5} y={115} text="DATA SYSTEM" size={4} anchor="middle" opacity={0.5} />
      {[0,1,2].map(i => (
        <rect key={i} x={282 + i * 20} y={125} width={15} height={10} stroke="currentColor" strokeWidth="0.3" fill={DIM} />
      ))}

      {/* Bottom keyboard & command panel */}
      <g transform="translate(55, 228)">
        {/* Keyboard section */}
        <rect x="0" y="0" width="130" height="55" stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.4} />
        {[0,1,2,3].map(r => Array.from({length: 10}).map((_, i) => (
          <rect key={`${r}-${i}`} x={i * 12 + r * 2} y={r * 11 + 5} width={10} height={8} stroke="currentColor" strokeWidth="0.3" fill={DIM} opacity={0.6} />
        )))}
        
        {/* Command section */}
        <rect x="135" y="0" width="100" height="55" stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.4} />
        <Label x={185} y={12} text="COMMAND PANEL" size={4} anchor="middle" opacity={0.5} />
        {[0,1].map(r => [0,1,2].map(c => (
           <rect key={`${r}-${c}`} x={145 + c * 32} y={20 + r * 15} width={25} height={10} stroke="currentColor" strokeWidth="0.4" fill={DIM} />
        )))}

        {/* Maintenance Access */}
        <rect x="240" y="0" width="50" height="55" stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.4} />
        <circle cx={265} cy={35} r={10} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
        <line x1="265" y1="30" x2="265" y2="40" stroke="currentColor" strokeWidth="0.6" />
      </g>

      <Label x={52} y={305} text="NS-ARC-0241 / POLARIS PROGRAM / 1990 / FIELD CONSOLE" opacity={0.35} />
    </g>
  );
}

// ── ORBITAL — Atmospheric Signal Receiver, 1992 ──────────────────
function GlyphOrbital() {
  return (
    <g>
      {/* Heavy industrial receiver cabinet */}
      <rect x="40" y="50" width="320" height="230" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      
      {/* Front panel seams */}
      <line x1="140" y1="50" x2="140" y2="280" stroke="currentColor" strokeWidth="0.5" />
      <line x1="285" y1="50" x2="285" y2="280" stroke="currentColor" strokeWidth="0.5" />

      {/* Left side — Badge & Status */}
      <Label x={48} y={75} text="NORTHSTER INC." size={4.5} opacity={0.5} />
      <Label x={48} y={88} text="ORBITAL" size={10} opacity={0.8} />
      <Label x={48} y={100} text="ATMOSPHERIC RECEIVER" size={3.5} opacity={0.4} />
      
      {/* Signal strength analog meter */}
      <rect x="48" y="215" width="80" height="40" stroke="currentColor" strokeWidth="0.5" fill={SCREEN_BG} opacity={0.3} />
      <path d="M 55 245 Q 88 220 121 245" stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.4} />
      <line x1="88" y1="250" x2="105" y2="225" stroke="currentColor" strokeWidth="0.6" />
      <Label x={88} y={265} text="RECORD LEVEL" size={4} anchor="middle" opacity={0.5} />

      {/* Main Signal Waterfall Display */}
      <rect x="150" y="65" width="125" height="130" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.6" />
      <rect x="150" y="65" width="125" height="130" fill={AMBER} opacity={0.02} />
      {/* Signal waterfall noise lines */}
      <g opacity={0.3}>
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <line key={i} x1={160 + i * 15} y1="65" x2={160 + i * 15} y2="195" 
                stroke="currentColor" strokeWidth={Math.sin(i) * 2 + 1} strokeDasharray="2,4" />
        ))}
      </g>
      <Label x={155} y={80} text="CHANNEL 01" size={4} opacity={0.6} />

      {/* Reel-to-Reel Tape Drive (matching image) */}
      <g transform="translate(150, 210)">
        <rect x="0" y="0" width="125" height="60" stroke="currentColor" strokeWidth="0.5" fill={DIM} opacity={0.4} />
        {/* Left Reel */}
        <circle cx={35} cy={30} r={22} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
        <circle cx={35} cy={30} r={4} stroke="currentColor" strokeWidth="0.4" fill="none" />
        <line x1="35" y1="8" x2="35" y2="15" stroke="currentColor" strokeWidth="0.4" />
        {/* Right Reel */}
        <circle cx={90} cy={30} r={22} stroke="currentColor" strokeWidth="0.6" fill={DIM} />
        <circle cx={90} cy={30} r={4} stroke="currentColor" strokeWidth="0.4" fill="none" />
        {/* Magnetic tape path */}
        <line x1="35" y1="52" x2="90" y2="52" stroke="currentColor" strokeWidth="0.8" opacity={0.6} />
        <Label x={62.5} y={58} text="DATA CASSETTE NR-90" size={3.5} anchor="middle" opacity={0.5} />
      </g>

      {/* Right side — Controls */}
      <Label x={322.5} y={75} text="SIGNAL MONITOR" size={4} anchor="middle" opacity={0.5} />
      <rect x="295" y="85" width="55" height="30" stroke="currentColor" strokeWidth="0.4" fill={SCREEN_BG} opacity={0.2} />
      <path d="M 300 110 Q 322 95 344 110" stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.4} />
      <line x1="322" y1="112" x2="330" y2="98" stroke="currentColor" strokeWidth="0.5" />
      
      <Label x={322.5} y={150} text="SYSTEM STATUS" size={4} anchor="middle" opacity={0.5} />
      <StatusLamp cx={305} cy={165} active />
      <StatusLamp cx={322} cy={165} active={false} />
      <StatusLamp cx={340} cy={165} active={false} />

      <Label x={322.5} y={225} text="TAPE CONTROL" size={4} anchor="middle" opacity={0.5} />
      {[0,1,2].map(i => (
        <rect key={i} x={295 + i * 20} y={235} width={15} height={8} stroke="currentColor" strokeWidth="0.3" fill={DIM} />
      ))}

      <Label x={45} y={315} text="NS-ARC-0298 / ORBITAL PROGRAM / 1992 / RECEIVING" opacity={0.35} />
    </g>
  );
}

// ── MERIDIAN/V — Continuity Workstation, Epoch V ─────────────────
function GlyphMeridianV() {
  return (
    <g>
      {/* Ultra-thin chassis — 340 × 240 × 12mm, titanium-ceramic */}
      <rect x="55" y="80" width="290" height="180" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      
      {/* Gradient glass surface */}
      <rect x="62" y="87" width="276" height="166" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.5" rx="1" />
      <rect x="62" y="87" width="276" height="166" fill={AMBER} opacity={0.04} />
      
      {/* Seamless enclosure — no visible fasteners */}
      <g opacity={0.3}>
        <Label x={70} y={105} text="MERIDIAN/V" size={12} />
        <Label x={70} y={118} text="CONTINUITY WORKSTATION" size={5} />
        <Label x={70} y={130} text="CONTINUUM DIVISION / EPOCH V" size={4} />
      </g>
      
      {/* Minimal presence indicator */}
      <circle cx={310} cy={100} r={3} stroke="currentColor" strokeWidth="0.4" fill={AMBER} opacity={0.6} />
      
      {/* Epoch-stable interface — presents nothing until approach */}
      <g opacity={0.2} fill="currentColor">
        <rect x="100" y="150" width="200" height="80" stroke="currentColor" strokeWidth="0.3" fill="none" />
        <Label x={200} y={195} text="SIGNAL/OS EPOCH V" size={5} anchor="middle" />
        <Label x={200} y={210} text="AWAITING PROXIMITY" size={4} anchor="middle" />
      </g>
      
      <Label x={57} y={280} text="NS-CONT-2225-001 / MERIDIAN SERIES / EPOCH V / CONTINUUM ERA" opacity={0.35} />
    </g>
  );
}

// ── CONTINUUM/III — Editorial Continuity System, Epoch III ─────────
function GlyphContinuum3() {
  return (
    <g>
      {/* Ultra-thin gradient glass — 320 × 230 × 4mm */}
      <rect x="60" y="70" width="280" height="170" fill={DIM} stroke="currentColor" strokeWidth="1" rx="1" />
      
      {/* Haptic weave surface — no mechanical mechanism */}
      <rect x="65" y="75" width="270" height="160" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" rx="1" />
      <rect x="65" y="75" width="270" height="160" fill={AMBER} opacity={0.03} />
      
      {/* Monochrome display — editorial focus */}
      <g opacity={0.25} fill="currentColor">
        <Label x={75} y={95} text="CONTINUUM/III" size={10} />
        <Label x={75} y={107} text="EDITORIAL CONTINUITY SYSTEM" size={4} />
        <line x1={75} y1={120} x2={325} y2={120} stroke="currentColor" strokeWidth={0.2} />
        <Label x={75} y={135} text="NORTHSTER SERIF / EPOCH III" size={4} />
        <Label x={75} y={155} text="One thought at a time." size={6} />
        <Label x={75} y={165} text="For two hundred years." size={5} />
      </g>
      
      {/* Ambient power indicator */}
      <circle cx={315} cy={90} r={2.5} stroke="currentColor" strokeWidth="0.3" fill={AMBER} opacity={0.5} />
      
      <Label x={62} y={260} text="NS-CONT-2225-003 / CONTINUUM SERIES / EDITORIAL EPOCH III" opacity={0.35} />
    </g>
  );
}

// ── RELAY MESH NODE — Distributed Presence Unit, Epoch IV ──────────
function GlyphRelayMeshNode() {
  return (
    <g>
      {/* Tiny titanium ceramic node — 40 × 40 × 8mm */}
      <rect x="130" y="90" width="140" height="140" fill={DIM} stroke="currentColor" strokeWidth="1" rx="2" />
      
      {/* No indicator — status via mesh consensus */}
      <g opacity={0.4}>
        <Label x={200} y={120} text="RELAY MESH NODE" size={7} anchor="middle" />
        <Label x={200} y={132} text="DISTRIBUTED PRESENCE UNIT" size={3.5} anchor="middle" />
        <Label x={200} y={150} text="NTi-3 TITANIUM CERAMIC" size={3} anchor="middle" />
        <Label x={200} y={160} text="40 × 40 × 8mm" size={3} anchor="middle" />
      </g>
      
      {/* Mesh network representation */}
      <g transform="translate(200, 185)" opacity={0.3}>
        <circle cx="0" cy="0" r="20" stroke="currentColor" strokeWidth="0.3" fill="none" />
        <circle cx="0" cy="0" r="35" stroke="currentColor" strokeWidth="0.2" fill="none" strokeDasharray="2,3" />
        <circle cx="0" cy="0" r="50" stroke="currentColor" strokeWidth="0.2" fill="none" strokeDasharray="2,4" />
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <circle key={angle} cx={50 * Math.cos(angle * Math.PI / 180)} cy={50 * Math.sin(angle * Math.PI / 180)} r="3" stroke="currentColor" strokeWidth="0.3" fill={DIM} />
        ))}
      </g>
      
      <Label x={130} y={260} text="NS-CONT-2225-008 / RELAY MESH / EPOCH IV / DISTRIBUTED" opacity={0.35} />
    </g>
  );
}

// ── STRATUM ARCHIVE — Dimensional Record Surface, Epoch II ─────────
function GlyphStratumArchive() {
  return (
    <g>
      {/* Layered glass cabinet — 620 × 440 × 18mm */}
      <rect x="40" y="40" width="320" height="240" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      
      {/* Stratified glass display — 240 layers */}
      <rect x="55" y="55" width="290" height="210" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.6" />
      <rect x="55" y="55" width="290" height="210" fill={AMBER} opacity={0.02} />
      
      {/* 240 layer depth visualization */}
      <g opacity={0.15}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={60 + i * 2} y={60 + i * 15} width={280 - i * 4} height={200 - i * 12} stroke="currentColor" strokeWidth="0.2" fill="none" />
        ))}
      </g>
      
      {/* Layer count indicator */}
      <g opacity={0.4} fill="currentColor">
        <Label x={65} y={75} text="STRATUM ARCHIVE" size={8} />
        <Label x={65} y={86} text="DIMENSIONAL RECORD SURFACE" size={4} />
        <Label x={65} y={100} text="NSA-1 STRATIFIED GLASS / 24&quot;" size={3.5} />
      </g>
      
      {/* Layer depth indicator */}
      <g transform="translate(320, 150)" opacity={0.3}>
        <rect x="0" y="0" width="15" height="100" stroke="currentColor" strokeWidth="0.3" fill={DIM} />
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={0} y1={i * 10} x2={15} y2={i * 10} stroke="currentColor" strokeWidth="0.2" />
        ))}
        <Label x={7.5} y={115} text="240" size={4} anchor="middle" />
        <Label x={7.5} y={122} text="LAYERS" size={3} anchor="middle" />
      </g>
      
      <Label x={45} y={300} text="NS-CONT-2225-011 / STRATUM SERIES / ARCHIVE EPOCH II / 247 YEARS" opacity={0.35} />
    </g>
  );
}

// ── DEEP FIELD CLUSTER — Epoch Compute Substrate, Epoch III ─────────
function GlyphDeepFieldCluster() {
  return (
    <g>
      {/* No physical chassis — distributed substrate presence */}
      <rect x="50" y="60" width="300" height="200" fill={DIM} stroke="currentColor" strokeWidth="0.8" rx="1" opacity={0.3} />
      
      <g opacity={0.4} fill="currentColor">
        <Label x={200} y={90} text="DEEP FIELD CLUSTER" size={10} anchor="middle" />
        <Label x={200} y={105} text="EPOCH COMPUTE SUBSTRATE" size={4} anchor="middle" />
        <Label x={200} y={120} text="DISTRIBUTED EPOCH III" size={3.5} anchor="middle" />
      </g>
      
      {/* Abstract distributed nodes — no physical boundary */}
      <g transform="translate(200, 170)" opacity={0.25}>
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <g key={i} transform={`rotate(${i * 51.4})`}>
            <line x1="0" y1="0" x2="80" y2="0" stroke="currentColor" strokeWidth="0.4" />
            <circle cx="80" cy="0" r="8" stroke="currentColor" strokeWidth="0.4" fill={DIM} />
          </g>
        ))}
        <circle cx="0" cy="0" r="15" stroke="currentColor" strokeWidth="0.6" fill={DIM} />
        <circle cx="0" cy="0" r="5" stroke="currentColor" strokeWidth="0.3" fill={AMBER} opacity={0.5} />
      </g>
      
      <g opacity={0.35} fill="currentColor">
        <Label x={200} y={235} text="SUBSTRATE / NO DISCRETE COUNT" size={3.5} anchor="middle" />
        <Label x={200} y={245} text="236 YEARS CONTINUOUS UPTIME" size={3.5} anchor="middle" />
      </g>
      
      <Label x={55} y={280} text="NS-CONT-2225-004 / DEEP FIELD / COMPUTE EPOCH III / DISTRIBUTED CONSENSUS" opacity={0.35} />
    </g>
  );
}

// ── POLARIS CONTINUUM — Extreme Station Console, Epoch IV ──────────
function GlyphPolarisContinuum() {
  return (
    <g>
      {/* Sealed extreme environment chassis */}
      <rect x="50" y="50" width="300" height="200" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="2" />
      
      {/* Side handles — massive, industrial */}
      <path d="M 50 80 Q 30 120 50 160" stroke="currentColor" strokeWidth="4" fill="none" opacity={0.8} />
      <path d="M 350 80 Q 370 120 350 160" stroke="currentColor" strokeWidth="4" fill="none" opacity={0.8} />
      
      {/* Epoch-sealed display */}
      <rect x="110" y="65" width="160" height="160" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.6" />
      <rect x="110" y="65" width="160" height="160" fill={AMBER} opacity={0.05} />
      
      {/* Extreme environment interface */}
      <g opacity={0.4} fill="currentColor">
        <Label x={120} y={85} text="POLARIS CONTINUUM" size={6} />
        <Label x={120} y={95} text="EXTREME STATION CONSOLE" size={4} />
        <Label x={120} y={110} text="EPOCH-SEALED / EPOCH IV" size={3.5} />
        
        {/* Environmental reading */}
        <circle cx={190} cy={150} r={25} stroke="currentColor" strokeWidth="0.3" fill="none" />
        <circle cx={190} cy={150} r={15} stroke="currentColor" strokeWidth="0.3" fill="none" />
        <line x1="190" y1={125} x2="190" y2={175} stroke="currentColor" strokeWidth="0.3" />
        <line x1="165" y1={150} x2="215" y2={150} stroke="currentColor" strokeWidth="0.3" />
        
        <Label x={120} y={190} text="ENVIRONMENT: EXTREME" size={3.5} />
        <Label x={120} y={200} text="SPECIFICATIONS: WITHHELD" size={3} />
      </g>
      
      {/* Status — restricted */}
      <rect x="280" y="65" width="60" height="160" stroke="currentColor" strokeWidth="0.4" fill={DIM} opacity={0.2} />
      <Label x={310} y={80} text="MERIDIAN" size={4} anchor="middle" opacity={0.5} />
      <circle cx={310} cy={100} r={5} stroke="currentColor" strokeWidth="0.4" fill={AMBER} opacity={0.6} />
      
      <Label x={52} y={270} text="NS-CONT-2225-RESTRICTED / POLARIS CONTINUUM / RESTRICTED" opacity={0.35} />
    </g>
  );
}

// ── TEMPORAL ARRAY — Deep Signal Receiver, Epoch III ───────────────
function GlyphTemporalArray() {
  return (
    <g>
      {/* Deep signal receiver cabinet */}
      <rect x="45" y="45" width="310" height="240" fill={DIM} stroke="currentColor" strokeWidth="1.2" rx="1" />
      
      {/* Panel seams */}
      <line x1="140" y1="45" x2="140" y2="285" stroke="currentColor" strokeWidth="0.5" />
      <line x1="280" y1="45" x2="280" y2="285" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Left — Badge & Status */}
      <g opacity={0.5} fill="currentColor">
        <Label x={52} y={70} text="NORTHSTER INC." size={4.5} />
        <Label x={52} y={83} text="TEMPORAL ARRAY" size={9} />
        <Label x={52} y={96} text="DEEP SIGNAL RECEIVER" size={3.5} />
        <Label x={52} y={115} text="ORBITAL CONTINUUM" size={3} />
        <Label x={52} y={125} text="EPOCH III" size={3} />
      </g>
      
      {/* 233 year dataset visualization */}
      <rect x="150" y="60" width="120" height="140" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.5" />
      <rect x="150" y="60" width="120" height="140" fill={AMBER} opacity={0.02} />
      
      <g opacity={0.3}>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={160 + i * 13} y1="60" x2={160 + i * 13} y2="200" stroke="currentColor" strokeDasharray="2,3" />
        ))}
        <Label x={210} y={75} text="233 YEAR DATASET" size={4} anchor="middle" />
        <Label x={210} y={85} text="EPOCH-ARCHIVE" size={3.5} anchor="middle" />
      </g>
      
      {/* Temporal waterfall display */}
      <rect x="52" y="215" width="80" height="45" stroke="currentColor" strokeWidth="0.4" fill={SCREEN_BG} opacity={0.2} />
      <path d="M 58 250 Q 92 230 126 250" stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.4} />
      <line x1="92" y1="255" x2="110" y2="235" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Right — Restricted controls */}
      <g opacity={0.4}>
        <Label x={322} y={70} text="SIGNAL CAPTURE" size={4} anchor="middle" />
        <Label x={322} y={120} text="EPOCH III" size={4} anchor="middle" />
        <Label x={322} y={140} text="RESTRICTED" size={3} anchor="middle" />
      </g>
      
      <StatusLamp cx={295} cy={80} active />
      <StatusLamp cx={310} cy={80} active />
      <StatusLamp cx={340} cy={80} active />
      
      <Label x={47} y={300} text="NS-CONT-2225-RESTRICTED-02 / TEMPORAL ARRAY / RESTRICTED / 233 YEARS" opacity={0.35} />
    </g>
  );
}

// ── VOID TERMINAL — Absent Interface System, Epoch I ──────────────
function GlyphVoidTerminal() {
  return (
    <g>
      {/* Optically null surface — NSA-1 void glass */}
      <rect x="60" y="60" width="280" height="180" fill={DIM} stroke="currentColor" strokeWidth="0.8" rx="2" opacity={0.15} />
      
      {/* No visible interface until required */}
      <g opacity={0.15}>
        <rect x="70" y="70" width="260" height="160" stroke="currentColor" strokeWidth="0.3" fill="none" />
      </g>
      
      <g opacity={0.3} fill="currentColor">
        <Label x={200} y={120} text="VOID TERMINAL" size={12} anchor="middle" />
        <Label x={200} y={138} text="ABSENT INTERFACE SYSTEM" size={5} anchor="middle" />
        <Label x={200} y={155} text="NSA-1 VOID GLASS / OPTICALLY NULL" size={4} anchor="middle" />
        <Label x={200} y={175} text="EPOCH I / NO ARCHIVE LINEAGE" size={3.5} anchor="middle" />
      </g>
      
      {/* Intent detection — proximity sensor representation */}
      <g transform="translate(200, 200)" opacity={0.2}>
        <circle cx="0" cy="0" r="30" stroke="currentColor" strokeWidth="0.2" fill="none" strokeDasharray="3,3" />
        <circle cx="0" cy="0" r="50" stroke="currentColor" strokeWidth="0.15" fill="none" strokeDasharray="3,5" />
        <circle cx="0" cy="0" r="70" stroke="currentColor" strokeWidth="0.1" fill="none" strokeDasharray="3,7" />
      </g>
      
      <Label x={62} y={260} text="NS-CONT-2225-019 / VOID SERIES / EPOCH I / MERIDIAN CLEARANCE" opacity={0.35} />
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
  "meridian-v": GlyphMeridianV,
  "continuum-iii": GlyphContinuum3,
  "relay-mesh-node": GlyphRelayMeshNode,
  "stratum-archive": GlyphStratumArchive,
  "deep-field-cluster": GlyphDeepFieldCluster,
  "polaris-continuum": GlyphPolarisContinuum,
  "temporal-array": GlyphTemporalArray,
  "void-terminal": GlyphVoidTerminal,
};

export default function ProductGlyph({ slug, image, className = "", thumbnail = false }) {
  if (image && !thumbnail) {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <img
          src={image}
          alt={slug}
          className="w-full h-full object-cover"
          style={{ filter: "var(--glyph-filter, none)" }}
        />
      </div>
    );
  }

  const GlyphComponent = GLYPHS[slug] || GlyphAX01;
  return (
    <svg
      viewBox="0 0 400 320"
      className={`${className} glyph-svg`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{ filter: "var(--glyph-filter)" }}
    >
      {/* Background with grid */}
      <rect x="0" y="0" width="400" height="320" fill="var(--background)" />
      <g stroke="currentColor" strokeWidth="0.15" opacity={0.10}>
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="320" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
        ))}
      </g>
      {/* Blueprint border */}
      <rect x="4" y="4" width="392" height="312" stroke="currentColor" strokeWidth="0.3" fill="none" opacity={0.2} />
      {/* Title block — top left */}
      <text x="8" y="12" fontFamily="monospace" fontSize="5.5" fill="currentColor" opacity={0.3} letterSpacing="0.1em">
        NORTHSTER INC. / TECHNICAL REFERENCE ILLUSTRATION
      </text>
      {/* Bottom right — classification */}
      <text x="392" y="314" fontFamily="monospace" fontSize="5" fill="currentColor" opacity={0.25}
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
