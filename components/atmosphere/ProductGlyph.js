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

// ── MERIDIAN/V — Continuity Workstation, 2225 ────────────────────
// Smooth titanium-ceramic wedge. Curved profile, seamless display,
// full-travel keyboard. No lamps, no vents, no visible fasteners.
function GlyphMeridianV() {
  return (
    <g>
      {/* Outer chassis — grown titanium-ceramic, deeply curved top */}
      <path
        d="M 50 200 L 50 120 Q 50 55 110 48 L 290 48 Q 350 48 350 115 L 350 200 Q 350 215 335 220 L 65 220 Q 50 218 50 200 Z"
        fill={DIM} stroke="currentColor" strokeWidth="1.0" />
      {/* Bottom base plate — flat, heavier */}
      <rect x="50" y="220" width="300" height="22" fill={DIM} stroke="currentColor" strokeWidth="0.8" rx="1" />
      {/* Side depth edge — right */}
      <path d="M 350 200 L 355 205 L 355 225 L 350 220" fill={DIM} stroke="currentColor" strokeWidth="0.5" />

      {/* NGL-2 display surface — spans top 60% of chassis face */}
      <path
        d="M 68 58 L 332 58 Q 342 58 342 68 L 342 165 Q 342 172 332 172 L 68 172 Q 58 172 58 165 L 58 68 Q 58 58 68 58 Z"
        fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.4" />
      {/* Glass depth — inner inset line, very faint */}
      <path
        d="M 72 62 L 328 62 Q 337 62 337 70 L 337 162 Q 337 168 328 168 L 72 168 Q 63 168 63 162 L 63 70 Q 63 62 72 62 Z"
        fill="none" stroke="currentColor" strokeWidth="0.2" opacity={0.25} />

      {/* Display content — floats 2mm beneath glass */}
      <g opacity={0.22}>
        <Label x={72} y={80}  text="NORTHSTER INC." size={4.5} opacity={0.7} />
        <Label x={72} y={91}  text="CONTINUUM DIVISION / EPOCH V" size={3.5} opacity={0.5} />
        <line x1={72} y1={97} x2={328} y2={97} stroke="currentColor" strokeWidth={0.25} opacity={0.6} />
        <Label x={72} y={110} text="MERIDIAN/V" size={18} opacity={0.9} />
        <Label x={72} y={124} text="Continuity Workstation" size={6} opacity={0.6} />
        <line x1={72} y1={133} x2={328} y2={133} stroke="currentColor" strokeWidth={0.2} opacity={0.4} />
        <Label x={72} y={143} text="NSM-7 TITANIUM-CERAMIC / NGL-2 GRADIENT GLASS" size={3.5} opacity={0.5} />
        <Label x={72} y={151} text="SIGNAL/OS EPOCH V — AWAITING OPERATOR" size={3.5} opacity={0.4} />
        <Label x={280} y={163} text="EPOCH V" size={3.5} opacity={0.4} />
      </g>

      {/* Keyboard zone — lower 35% of front face, barely-visible keys */}
      <rect x="58" y="176" width="284" height="40" fill={DIM} stroke="currentColor" strokeWidth="0.3" opacity={0.6} />
      {/* Key rows — 3 rows, minimal height */}
      {[0, 1, 2].map(row =>
        Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={`${row}-${i}`}
            x={62 + i * 19 + row * 1.5}
            y={179 + row * 12}
            width={17} height={9}
            rx="1"
            fill={DIM} stroke="currentColor" strokeWidth="0.25" opacity={0.5}
          />
        ))
      )}

      <Label x={52} y={310} text="NS-CONT-2225-001 / MERIDIAN/V / EPOCH V / SELF-MAINTAINING" opacity={0.3} />
    </g>
  );
}

// ── CONTINUUM/III — Editorial Continuity System, 2225 ────────────
// Ultra-thin flat slab on a surface. 8mm profile. Nearly invisible.
// Top 2/3 = gradient glass display. Bottom 1/3 = haptic key surface.
function GlyphContinuumIII() {
  return (
    <g>
      {/* Name header */}
      <g opacity={0.7}>
        <Label x={20} y={28} text="CONTINUUM / III" size={8} />
        <Label x={20} y={40} text="EDITORIAL CONTINUITY SYSTEM" size={4} opacity={0.55} />
        <line x1="20" y1="46" x2="380" y2="46" stroke="currentColor" strokeWidth="0.3" opacity={0.4} />
      </g>

      {/* Device body — flat rectangle, front-on */}
      <rect x="20" y="56" width="360" height="180" fill={DIM} stroke="currentColor" strokeWidth="0.9" />

      {/* Display area — top 60% */}
      <rect x="28" y="63" width="344" height="110" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.35" />
      {/* Display inner inset */}
      <rect x="32" y="67" width="336" height="102" fill="none" stroke="currentColor" strokeWidth="0.15" opacity={0.3} />

      {/* Display content */}
      <g opacity={0.30}>
        <Label x={42} y={84} text="NORTHSTER INC.  /  CONTINUUM/III" size={4.5} />
        <line x1={42} y1={90} x2={358} y2={90} stroke="currentColor" strokeWidth={0.2} opacity={0.5} />
        <Label x={42} y={102} text="One thought at a time." size={6} opacity={0.8} />
        <Label x={42} y={113} text="For two hundred years." size={6} opacity={0.5} />
        <line x1={200} y1={93} x2={200} y2={163} stroke="currentColor" strokeWidth={0.2} opacity={0.18} />
        <Label x={210} y={102} text="NGL-2 GRADIENT GLASS" size={3.5} opacity={0.5} />
        <Label x={210} y={111} text="EPOCH III / EDITORIAL" size={3.5} opacity={0.4} />
        <Label x={42} y={158} text="LINE 001  COL 001  INSERT" size={3.5} opacity={0.35} />
      </g>

      {/* Haptic keyboard zone — bottom 38% */}
      <rect x="28" y="178" width="344" height="52" fill={DIM} stroke="currentColor" strokeWidth="0.25" opacity={0.6} />
      {[0, 1, 2].map(row =>
        Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={`${row}-${i}`}
            x={33 + i * 24}
            y={182 + row * 16}
            width={22} height={12}
            rx="1"
            fill="none" stroke="currentColor" strokeWidth="0.2" opacity={0.28}
          />
        ))
      )}

      {/* Bottom spec bar */}
      <line x1="20" y1="246" x2="380" y2="246" stroke="currentColor" strokeWidth="0.3" opacity={0.3} />
      <Label x={20} y={256} text="NS-CONT-2225-003" size={3.5} opacity={0.4} />
      <Label x={200} y={256} text="NGL-2 / HAPTIC / EPOCH III" size={3.5} anchor="middle" opacity={0.35} />
      <Label x={380} y={256} text="UNCHANGED IN PURPOSE" size={3.5} anchor="end" opacity={0.35} />
    </g>
  );
}

// ── RELAY MESH NODE — Global Distribution Unit, 2225 ─────────────
// Wall-mounted portrait rectangle. Rounded corners. Wires at sides.
// Engraved text, zero visible technology. Glow at base edge.
function GlyphRelayMeshNode() {
  return (
    <g>
      {/* Concrete wall texture — background context */}
      <rect x="0" y="0" width="400" height="320" fill="none" />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={i} x1="0" y1={i * 36} x2="400" y2={i * 36 + 2}
          stroke="currentColor" strokeWidth="0.3" opacity={0.04} />
      ))}

      {/* Wall mount bracket — behind unit */}
      <rect x="162" y="22" width="76" height="14" fill={DIM} stroke="currentColor" strokeWidth="0.5" opacity={0.5} rx="1" />
      <rect x="172" y="14" width="12" height="10" fill={DIM} stroke="currentColor" strokeWidth="0.4" opacity={0.5} />
      <rect x="216" y="14" width="12" height="10" fill={DIM} stroke="currentColor" strokeWidth="0.4" opacity={0.5} />

      {/* Main node body — portrait, rounded corners */}
      <rect x="140" y="32" width="120" height="218" rx="8"
        fill={DIM} stroke="currentColor" strokeWidth="1.1" />
      {/* Inner inset — grown seam */}
      <rect x="146" y="38" width="108" height="206" rx="6"
        fill="none" stroke="currentColor" strokeWidth="0.3" opacity={0.35} />

      {/* Engraved face text — very faint, etched into surface */}
      <g opacity={0.28}>
        <Label x={200} y={72}  text="NORTHSTER INC." size={4.5} anchor="middle" opacity={0.7} />
        <Label x={200} y={82}  text="CONTINUUM DIVISION" size={3.5} anchor="middle" opacity={0.5} />
        <Label x={200} y={91}  text="INFRASTRUCTURE EPOCH V" size={3.5} anchor="middle" opacity={0.5} />
        <line x1={152} y1={97} x2={248} y2={97} stroke="currentColor" strokeWidth={0.3} opacity={0.5} />
        <Label x={200} y={115} text="RELAY MESH NODE" size={9} anchor="middle" opacity={0.9} />
        <Label x={200} y={127} text="GLOBAL DISTRIBUTION UNIT" size={4} anchor="middle" opacity={0.6} />
        <line x1={152} y1={134} x2={248} y2={134} stroke="currentColor" strokeWidth={0.2} opacity={0.4} />
        <Label x={200} y={148} text="1.2M+ UNITS" size={3.5} anchor="middle" opacity={0.5} />
        <Label x={200} y={157} text="DEPLOYED: 2025.01" size={3} anchor="middle" opacity={0.4} />
        <Label x={200} y={168} text="EPOCH V / SELF-SEALING" size={3} anchor="middle" opacity={0.4} />
      </g>

      {/* Base luminescence — very faint glow line at bottom */}
      <rect x="148" y="234" width="104" height="2" rx="1"
        fill="currentColor" opacity={0.18} />
      <rect x="155" y="237" width="90" height="1" rx="0.5"
        fill="currentColor" opacity={0.10} />
      {/* Diffuse glow spread */}
      <rect x="148" y="238" width="104" height="6" rx="2"
        fill="currentColor" opacity={0.04} />

      {/* Wire/cable — left side */}
      <path d="M 144 180 Q 120 200 115 230 Q 110 260 118 290"
        stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.2} />
      {/* Wire — right side */}
      <path d="M 256 160 Q 275 175 278 200 Q 281 230 270 280"
        stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.15} />

      <Label x={50} y={308} text="NS-CONT-2225-008 / RELAY MESH NODE / EPOCH V / 240 YEARS CONTINUOUS" opacity={0.3} />
    </g>
  );
}

// ── STRATUM ARCHIVE — Dimensional Record Surface, 2225 ───────────
// Thick dark slab. Left & bottom edges show 240 strata lines.
// Top surface nearly featureless — absorbs light, not reflects.
function GlyphStratumArchive() {
  return (
    <g>
      {/* Name header */}
      <g opacity={0.7}>
        <Label x={20} y={28} text="STRATUM ARCHIVE" size={8} />
        <Label x={20} y={40} text="DIMENSIONAL RECORD SURFACE" size={4} opacity={0.55} />
        <line x1="20" y1="46" x2="380" y2="46" stroke="currentColor" strokeWidth="0.3" opacity={0.4} />
      </g>

      {/* Slab body — flat, front-on, dark */}
      <rect x="20" y="56" width="360" height="190" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.9" />
      {/* Outer inset seam */}
      <rect x="25" y="61" width="350" height="180" fill="none" stroke="currentColor" strokeWidth="0.2" opacity={0.25} />

      {/* 240 strata lines — dense horizontal bands across entire face */}
      {Array.from({ length: 60 }).map((_, i) => {
        const y = 64 + i * 2.9;
        const isMajor = i % 6 === 0;
        return (
          <line key={i}
            x1={25} y1={y}
            x2={375} y2={y}
            stroke="currentColor" strokeWidth={isMajor ? 0.4 : 0.2}
            opacity={isMajor ? 0.22 : 0.09}
          />
        );
      })}

      {/* Internal refraction — faint diagonal catch across left third */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i}
          x1={25} y1={70 + i * 28}
          x2={150} y2={75 + i * 28}
          stroke="currentColor" strokeWidth="0.5"
          opacity={0.07 - i * 0.008}
        />
      ))}

      {/* Central label — engraved into surface */}
      <g opacity={0.35}>
        <Label x={200} y={148} text="STRATUM ARCHIVE" size={9} anchor="middle" />
        <line x1={60} y1={154} x2={340} y2={154} stroke="currentColor" strokeWidth={0.2} opacity={0.5} />
        <Label x={200} y={166} text="240 LAYERS / 0.4μm VOID GLASS BETWEEN EACH" size={3.5} anchor="middle" opacity={0.7} />
        <Label x={200} y={176} text="COMPLETE INSTITUTIONAL ARCHIVE PER LAYER" size={3.5} anchor="middle" opacity={0.55} />
      </g>

      {/* Bottom spec bar */}
      <line x1="20" y1="256" x2="380" y2="256" stroke="currentColor" strokeWidth="0.3" opacity={0.3} />
      <Label x={20} y={266} text="NS-CONT-2225-011" size={3.5} opacity={0.4} />
      <Label x={200} y={266} text="NSG-2 VOID GLASS / 1.8KG" size={3.5} anchor="middle" opacity={0.35} />
      <Label x={380} y={266} text="RECORD EPOCH II" size={3.5} anchor="end" opacity={0.35} />
    </g>
  );
}

// ── DEEP FIELD CLUSTER — Room-Scale Compute Installation, 2225 ───
// Floor-level grid of flat titanium-ceramic slabs. Thin gap-glow
// between each. Human figure at far end for scale.
function GlyphDeepFieldCluster() {
  return (
    <g>
      {/* Header label */}
      <g opacity={0.22}>
        <Label x={20} y={30} text="DEEP FIELD CLUSTER" size={7} />
        <Label x={20} y={42} text="CONTINUUM DIVISION / 236Y UPTIME" size={3.5} />
        <line x1="20" y1="48" x2="380" y2="48" stroke="currentColor" strokeWidth="0.3" opacity={0.5} />
      </g>

      {/* Compute slab grid — 5 columns × 5 rows, uniform flat layout */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => {
          const x = 20 + col * 73;
          const y = 62 + row * 48;
          const w = 64;
          const h = 38;
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width={w} height={h} fill={DIM} stroke="currentColor" strokeWidth="0.6" opacity={0.65} />
              {/* Status line — thin strip at top of each slab */}
              <rect x={x + 4} y={y + 4} width={w - 8} height="1.5" fill="currentColor" opacity={0.12} />
              {/* Unit ID */}
              <text x={x + w / 2} y={y + h / 2 + 2} fontFamily="monospace" fontSize="5" fill="currentColor" opacity={0.25} textAnchor="middle">
                {`${String(row * 5 + col + 1).padStart(2, "0")}`}
              </text>
              {/* Gap light between columns */}
              {col < 4 && (
                <line x1={x + w + 4.5} y1={y + 4} x2={x + w + 4.5} y2={y + h - 4} stroke="currentColor" strokeWidth="0.3" opacity={0.10} />
              )}
            </g>
          );
        })
      )}

      <Label x={20} y={310} text="NS-CONT-2225-004 / DEEP FIELD / EPOCH I / 236Y UPTIME / FANLESS / ZERO NOISE" opacity={0.25} />
    </g>
  );
}

// ── POLARIS CONTINUUM — Research Station Console, 2225 ───────────
// Built into wall. Recessed display center. Arctic window right.
// Horizontal console below. Cool, institutional, restricted.
function GlyphPolarisContinuum() {
  return (
    <g>
      {/* Wall surface — full bleed */}
      <rect x="0" y="0" width="400" height="320" fill={DIM} opacity={0.15} />
      {/* Vertical panel seam */}
      <line x1="270" y1="0" x2="270" y2="320" stroke="currentColor" strokeWidth="0.5" opacity={0.25} />

      {/* Left panel — text column, institutional labels */}
      <g opacity={0.30}>
        <Label x={18} y={38} text="POLARIS CONTINUUM" size={9} opacity={0.85} />
        <Label x={18} y={50} text="RESEARCH STATION SYSTEM" size={4.5} opacity={0.6} />
        <line x1={18} y1={56} x2={252} y2={56} stroke="currentColor" strokeWidth={0.3} opacity={0.5} />
        <Label x={18} y={68} text="RESTRICTED / EPOCH IV" size={3.5} opacity={0.5} />
        <Label x={18} y={78} text="NSM-7 TITANIUM-CERAMIC" size={3.5} opacity={0.4} />
        <Label x={18} y={88} text="INSTALLATION: POLAR STATION / STRATUM 1" size={3.5} opacity={0.4} />
        <line x1={18} y1={96} x2={252} y2={96} stroke="currentColor" strokeWidth={0.2} opacity={0.3} />
        <Label x={18} y={108} text="SYSTEM STATUS" size={3.5} opacity={0.5} />
        <Label x={18} y={118} text="● MERIDIAN" size={4} opacity={0.6} />
        <Label x={18} y={130} text="TEMPERATURE: RESTRICTED" size={3} opacity={0.3} />
        <Label x={18} y={139} text="ATMOSPHERIC: RESTRICTED" size={3} opacity={0.3} />
        <Label x={18} y={148} text="OPERATIONAL DEPTH: RESTRICTED" size={3} opacity={0.3} />
        <line x1={18} y1={156} x2={252} y2={156} stroke="currentColor" strokeWidth={0.2} opacity={0.3} />
        <Label x={18} y={168} text="PROGRAMME STATUS" size={3.5} opacity={0.4} />
        <Label x={18} y={178} text="ACTIVE / 34 YEARS CONTINUOUS" size={3.5} opacity={0.3} />
      </g>

      {/* Center recessed display — embedded in wall */}
      <rect x="18" y="188" width="236" height="80" rx="1"
        fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.8" />
      <rect x="22" y="192" width="228" height="72" rx="1"
        fill="none" stroke="currentColor" strokeWidth="0.3" opacity={0.3} />
      <g opacity={0.25}>
        <Label x={28} y={205} text="POLARIS CONTINUUM / LIVE FEED" size={4} />
        <line x1={28} y1={210} x2={240} y2={210} stroke="currentColor" strokeWidth={0.25} opacity={0.5} />
        <Label x={28} y={220} text="SIGNAL CAPTURE — EPOCH IV" size={3.5} />
        <Label x={28} y={229} text="DATASET: RESTRICTED / CLEARANCE REQUIRED" size={3} />
        <Label x={28} y={238} text="UPTIME: 34Y 06M / NO INTERRUPTION" size={3} />
        <Label x={28} y={250} text="██████████████████████████████" size={4} opacity={0.15} />
        <Label x={28} y={258} text="CONTENT WITHHELD — REVISION IV" size={3} opacity={0.3} />
      </g>

      {/* Arctic window — right panel */}
      <rect x="278" y="18" width="110" height="260" rx="1"
        fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.6" opacity={0.9} />
      <rect x="282" y="22" width="102" height="252" rx="1"
        fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.25" opacity={0.3} />
      {/* Arctic horizon — distant ice/mountain lines */}
      <g opacity={0.18}>
        {/* Sky gradient implied by horizontal bands */}
        {[0,1,2,3,4].map(i => (
          <line key={i}
            x1={283} y1={25 + i * 18}
            x2={381} y2={28 + i * 16}
            stroke="currentColor" strokeWidth={0.3} opacity={0.4 - i * 0.06}
          />
        ))}
        {/* Distant ridge line */}
        <path d="M 283 120 Q 310 105 330 115 Q 350 125 381 108"
          stroke="currentColor" strokeWidth="0.6" fill="none" opacity={0.5} />
        {/* Ice shelf below */}
        <rect x="283" y="128" width="98" height="144"
          fill="currentColor" opacity={0.04} />
        {/* Subtle distance haze lines */}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i}
            x1={283} y1={140 + i * 18}
            x2={381} y2={142 + i * 17}
            stroke="currentColor" strokeWidth={0.25} opacity={0.08}
          />
        ))}
        <Label x={290} y={272} text="ARCTIC SHELF / SECTOR 01" size={3} opacity={0.5} />
      </g>

      {/* Bottom control strip */}
      <rect x="0" y="285" width="400" height="28" fill={DIM} stroke="currentColor" strokeWidth="0.4" opacity={0.6} />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={12 + i * 30} y={290} width={24} height={16}
          rx="1" fill={DIM} stroke="currentColor" strokeWidth="0.3" opacity={0.5} />
      ))}
      <Label x={260} y={303} text="CLEARANCE: MERIDIAN" size={3.5} opacity={0.35} />

      <Label x={18} y={316} text="NS-CONT-2225-RESTRICTED / POLARIS CONTINUUM / RESTRICTED" opacity={0.25} />
    </g>
  );
}

// ── TEMPORAL ARRAY — Orbital Signal Capture, 2225 ────────────────
// Dark panel array on structural spine. Earth's limb at bottom.
// Deep space context. Cables/tethers visible.
function GlyphTemporalArray() {
  return (
    <g>
      {/* Deep space — near-black */}
      <rect x="0" y="0" width="400" height="320" fill="none" />
      {/* Stars — sparse */}
      {[
        [30,18],[80,42],[140,12],[200,35],[260,8],[320,28],[370,15],
        [50,90],[110,75],[180,88],[240,70],[300,82],[360,95],
        [20,150],[75,165],[130,140],[190,158],[250,145],[310,162]
      ].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={0.8} fill="currentColor" opacity={0.2} />
      ))}

      {/* Earth's limb — curved arc at bottom */}
      <path
        d="M -10 290 Q 200 240 410 290"
        fill="none" stroke="currentColor" strokeWidth="1.2" opacity={0.35}
      />
      {/* Atmospheric glow on limb */}
      <path
        d="M -10 295 Q 200 245 410 295"
        fill="none" stroke="currentColor" strokeWidth="3" opacity={0.06}
      />
      {/* Earth surface below limb — texture bands */}
      {[0,1,2].map(i => (
        <path key={i}
          d={`M -10 ${300 + i * 7} Q 200 ${252 + i * 7} 410 ${300 + i * 7}`}
          fill="none" stroke="currentColor" strokeWidth="0.5" opacity={0.08 - i * 0.02}
        />
      ))}

      {/* Primary structural spine — cylindrical beam, horizontal */}
      <rect x="15" y="148" width="370" height="22" rx="4"
        fill={DIM} stroke="currentColor" strokeWidth="0.9" opacity={0.9} />
      {/* Spine surface detail */}
      <line x1="15" y1="155" x2="385" y2="155"
        stroke="currentColor" strokeWidth="0.4" opacity={0.3} />
      <line x1="15" y1="164" x2="385" y2="164"
        stroke="currentColor" strokeWidth="0.25" opacity={0.2} />
      {/* Spine label */}
      <g opacity={0.25}>
        <Label x={22} y={161} text="NORTHSTER INC. / TEMPORAL ARRAY / ORBITAL EPOCH III / RESTRICTED" size={3.5} />
      </g>

      {/* Panel array — 4 columns × 3 rows, hanging below spine */}
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => {
          const x = 28 + col * 88;
          const y = 174 + row * 20;
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width={78} height={16}
                rx="0.5"
                fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.5" opacity={0.85}
              />
              {/* Panel cell grid lines */}
              {[1,2,3].map(n => (
                <line key={n}
                  x1={x + n * 19.5} y1={y}
                  x2={x + n * 19.5} y2={y + 16}
                  stroke="currentColor" strokeWidth="0.2" opacity={0.3}
                />
              ))}
              {/* Panel seam — horizontal */}
              <line x1={x} y1={y + 8} x2={x + 78} y2={y + 8}
                stroke="currentColor" strokeWidth="0.2" opacity={0.25}
              />
              {/* Panel label — one per panel */}
              <Label x={x + 4} y={y + 6} text={`P${row * 4 + col + 1 < 10 ? '0' : ''}${row * 4 + col + 1}`} size={3} opacity={0.2} />
            </g>
          );
        })
      )}

      {/* Tether cables — from spine to right frame */}
      <line x1="385" y1="150" x2="398" y2="110"
        stroke="currentColor" strokeWidth="0.8" opacity={0.3} />
      <line x1="385" y1="168" x2="398" y2="210"
        stroke="currentColor" strokeWidth="0.8" opacity={0.25} />
      {/* Cross-bracing */}
      <line x1="16" y1="150" x2="2" y2="130"
        stroke="currentColor" strokeWidth="0.6" opacity={0.25} />

      {/* Unit label on spine */}
      <g opacity={0.20}>
        <Label x={200} y={233} text="TEMPORAL ARRAY / ORBITAL SIGNAL CAPTURE / YEAR 2225" size={4} anchor="middle" />
        <Label x={200} y={242} text="233-YEAR CONTINUOUS DATASET / RESTRICTED" size={3.5} anchor="middle" />
      </g>

      <Label x={16} y={308} text="NS-CONT-2225-RESTRICTED-02 / TEMPORAL ARRAY / EPOCH III / 233Y CAPTURE" opacity={0.28} />
    </g>
  );
}

// ── VOID TERMINAL — Absent Interface System, 2225 ────────────────
// Near-invisible black slab. Single centered text. Absorbs light.
// The absence of interface is the interface.
function GlyphVoidTerminal() {
  return (
    <g>
      {/* Name header */}
      <g opacity={0.7}>
        <Label x={20} y={28} text="VOID TERMINAL" size={8} />
        <Label x={20} y={40} text="ABSENT INTERFACE SYSTEM" size={4} opacity={0.55} />
        <line x1="20" y1="46" x2="380" y2="46" stroke="currentColor" strokeWidth="0.3" opacity={0.4} />
      </g>

      {/* Slab body — flat, front-on, near-black void glass */}
      <rect x="20" y="56" width="360" height="190" fill={SCREEN_BG} stroke="currentColor" strokeWidth="0.7" opacity={0.85} />
      {/* Single top-edge highlight — only sign of surface */}
      <line x1="20" y1="56" x2="380" y2="56" stroke="currentColor" strokeWidth="0.6" opacity={0.28} />
      {/* Outer inset — barely visible */}
      <rect x="25" y="61" width="350" height="180" fill="none" stroke="currentColor" strokeWidth="0.15" opacity={0.15} />

      {/* Single ambient corner glow — bottom left */}
      <circle cx="35" cy="236" r="8" fill="currentColor" opacity={0.04} />
      <circle cx="35" cy="236" r="4" fill="currentColor" opacity={0.05} />

      {/* The only text — centered, near-invisible */}
      <g opacity={0.22}>
        <Label x={200} y={148} text="AWAITING CONTEXT" size={8} anchor="middle" />
        <line x1={80} y1={155} x2={320} y2={155} stroke="currentColor" strokeWidth={0.2} opacity={0.4} />
        <Label x={200} y={167} text="NSA-1 VOID GLASS  /  OPTICALLY NULL" size={4} anchor="middle" opacity={0.55} />
        <Label x={200} y={178} text="INTERACTION THROUGH RESISTANCE FIELDS ONLY" size={3.5} anchor="middle" opacity={0.4} />
      </g>

      {/* Bottom spec bar */}
      <line x1="20" y1="256" x2="380" y2="256" stroke="currentColor" strokeWidth="0.3" opacity={0.3} />
      <Label x={20} y={266} text="NS-CONT-2225-019" size={3.5} opacity={0.4} />
      <Label x={200} y={266} text="18 UNITS / MERIDIAN CLEARANCE" size={3.5} anchor="middle" opacity={0.35} />
      <Label x={380} y={266} text="EPOCH I / RESTRICTED" size={3.5} anchor="end" opacity={0.35} />
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
  "continuum-iii": GlyphContinuumIII,
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
