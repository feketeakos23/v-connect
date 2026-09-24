import { useState } from "react";
import { MapPin, ChevronLeft, Sun, Moon } from "lucide-react";
import { C, BLOCKS } from "../theme";
import { useApp } from "../context";

export function Crown({ size = 30 }) {
  const cs = [C.red, C.cyan, C.goldHi, C.coral, C.cyan, C.goldHi, C.coral, C.cyan, C.red];
  const pos = [[8, 26], [8, 44], [32, 26], [32, 44], [57, 26], [57, 44], [82, 26], [82, 44], [106, 26]];
  return (
    <svg viewBox="0 0 130 92" width={size} height={(size * 92) / 130} aria-hidden>
      <rect x="57" y="2" width="16" height="16" rx="1.5" transform="rotate(45 65 10)" fill={C.goldHi} />
      {pos.map(([x, y], i) => <rect key={i} x={x} y={y} width="15" height="15" rx="1.5" fill={cs[i]} />)}
      <rect x="6" y="66" width="118" height="11" rx="2" fill={C.blue} />
    </svg>
  );
}

export function Coin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: "0 0 auto" }} aria-hidden>
      <circle cx="12" cy="12" r="10" fill={C.goldHi} stroke={C.gold} strokeWidth="2" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#6e4a10" fontFamily="system-ui">P</text>
    </svg>
  );
}

export function Skyline({ color, opacity = 0.5, h = 90 }) {
  return (
    <svg viewBox="0 0 400 90" width="100%" height={h} preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, opacity }} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="1.4">
        <path d="M0 88 L0 60 L26 60 L26 34 L34 34 L34 22 L42 22 L42 34 L50 34 L50 60 L70 60 L70 70 L70 88" />
        <path d="M70 70 L100 70 L100 46 L108 38 L116 46 L116 70 L150 70" />
        <path d="M150 88 L150 50 Q150 40 160 40 L182 40 Q192 40 192 50 L192 88" />
        <path d="M210 88 L210 56 M230 88 L230 56 M250 88 L250 56 M270 88 L270 56 M290 88 L290 56 M310 88 L310 56" />
        <path d="M205 56 Q255 30 315 56" />
        <path d="M340 88 L340 44 L348 44 L348 30 L356 30 L356 44 L380 44 L380 24 L388 24 L388 44 L400 44 L400 88" />
      </g>
    </svg>
  );
}

export const Pill = ({ children, bg, fg }) => <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{children}</span>;
export const ColorBlocks = () => <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 12 }}>{BLOCKS.map((b, i) => <div key={i} style={{ width: 22, height: 10, borderRadius: 3, background: b }} />)}</div>;
export const Scroll = ({ children }) => <div className="nobar" style={{ height: "100%", overflowY: "auto", paddingBottom: 100 }}>{children}</div>;

export function Ripple({ children, onClick, style, color = "rgba(255,255,255,0.4)", aria }) {
  const { a } = useApp();
  const [r, setR] = useState([]);
  const click = (e) => {
    if (!a.reduce) {
      const b = e.currentTarget.getBoundingClientRect();
      const size = Math.max(b.width, b.height) * 1.2;
      const id = Date.now() + Math.random();
      setR((p) => [...p, { id, x: e.clientX - b.left - size / 2, y: e.clientY - b.top - size / 2, size }]);
      setTimeout(() => setR((p) => p.filter((i) => i.id !== id)), 600);
    }
    onClick?.(e);
  };
  return (
    <div onClick={click} role={aria ? "button" : undefined} aria-label={aria} tabIndex={aria ? 0 : undefined} style={{ position: "relative", overflow: "hidden", userSelect: "none", ...style }}>
      {children}
      {r.map((i) => <span key={i.id} className="ripple" style={{ position: "absolute", left: i.x, top: i.y, width: i.size, height: i.size, borderRadius: "50%", background: color, transform: "scale(0)", opacity: 0.55, pointerEvents: "none" }} />)}
    </div>
  );
}

export function IconBtn({ icon: Ic, onClick, scrim, color, label }) {
  const { t } = useApp();
  return (
    <Ripple onClick={onClick} aria={label} color={scrim ? "rgba(255,255,255,0.35)" : "rgba(120,120,120,0.25)"} style={{ width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", cursor: "pointer", flex: "0 0 auto", background: scrim ? "rgba(0,0,0,0.42)" : t.chip, color: color || (scrim ? "#fff" : t.text), backdropFilter: scrim ? "blur(6px)" : "none" }}>
      <Ic size={20} />
    </Ripple>
  );
}

export function DarkToggle({ scrim }) {
  const { dark, setDark, t } = useApp();
  return <IconBtn icon={dark ? Sun : Moon} scrim={scrim} color={scrim ? undefined : t.goldText} label="Sötét mód" onClick={() => setDark((d) => !d)} />;
}

export function Switch({ on, onChange }) {
  const { t, a } = useApp();
  return (
    <Ripple onClick={onChange} aria="kapcsoló" color="rgba(120,120,120,0.2)" style={{ width: 52, height: 32, borderRadius: 999, background: on ? C.green : t.chip, padding: 3, cursor: "pointer", flex: "0 0 auto", boxSizing: "border-box" }}>
      <div style={{ width: 26, height: 26, borderRadius: 999, background: "#fff", transform: on ? "translateX(20px)" : "translateX(0)", transition: a.reduce ? "none" : "transform .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.35)" }} />
    </Ripple>
  );
}

export function TopBar({ title, back }) {
  const { t, setScreen } = useApp();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {back && <IconBtn icon={ChevronLeft} label="Vissza" onClick={() => setScreen(back)} />}
        {title ? <span style={{ fontWeight: 700, fontSize: 22, color: t.text, paddingLeft: back ? 2 : 8 }}>{title}</span> : <span style={{ paddingLeft: 6 }}><Crown size={30} /></span>}
      </div>
      <DarkToggle />
    </div>
  );
}

export function MapPreview({ onClick }) {
  return (
    <Ripple onClick={onClick} aria="Térkép, útvonaltervezés" color="rgba(0,0,0,0.08)" style={{ display: "block", borderRadius: 18, overflow: "hidden", cursor: "pointer", height: 150, marginTop: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
      <svg viewBox="0 0 400 150" width="100%" height="150" preserveAspectRatio="xMidYMid slice" style={{ display: "block", background: "#E6E9ED" }}>
        <rect x="40" y="0" width="60" height="150" fill="#CFE8D0" />
        <g stroke="#FFFFFF" strokeWidth="9" fill="none" strokeLinecap="round"><path d="M-10 110 L180 95 L420 130" /><path d="M120 -10 L150 80 L130 160" /><path d="M250 -10 L240 160" /><path d="M40 40 L380 30" /></g>
        <g stroke="#D7DCE2" strokeWidth="3" fill="none"><path d="M-10 110 L180 95 L420 130" /><path d="M120 -10 L150 80 L130 160" /></g>
      </svg>
      <MapPin size={36} color={C.coral} fill={C.coral} style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-90%)", filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.3))" }} />
      <span style={{ position: "absolute", bottom: 6, right: 10, fontSize: 9, color: "#7a828c" }}>Térkép · ©2026</span>
    </Ripple>
  );
}

export function Button({ label, onClick, bg = C.blue, fg = "#fff", icon: Ic, full, ripple = "rgba(255,255,255,0.45)", outlined }) {
  const { t, a, elev } = useApp();
  return (
    <Ripple onClick={onClick} aria={label} color={ripple} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 999, padding: outlined ? "10px 18px" : "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", width: full ? "100%" : "auto", background: outlined ? "transparent" : bg, color: fg, border: outlined ? `1px solid ${t.line}` : "none", boxShadow: outlined || a.contrast ? "none" : elev[1] }}>
      {Ic && <Ic size={17} />}{label}
    </Ripple>
  );
}

export function ToolGrid({ items }) {
  const { t, card, setScreen } = useApp();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {items.map((m) => (
        <Ripple key={m.n} onClick={() => setScreen(m.go)} aria={m.n} color="rgba(120,120,120,0.16)" style={{ ...card, padding: 15, display: "flex", flexDirection: "column", gap: 9, alignItems: "flex-start", cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: `${m.c}1f`, display: "grid", placeItems: "center" }}><m.icon size={21} color={m.c} /></div>
          <div><div style={{ fontWeight: 800, color: t.text, fontSize: 14.5 }}>{m.n}</div><div style={{ color: t.soft, fontSize: 11.5, marginTop: 2, lineHeight: 1.3 }}>{m.d}</div></div>
        </Ripple>
      ))}
    </div>
  );
}
