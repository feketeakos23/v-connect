import { useApp } from "../context";
import { ages, DEFAULT_FILTER } from "../data";
import { Ripple, Switch, Button } from "./ui";

const groups = [{ k: "age", t: "Korosztály", opt: ages }, { k: "price", t: "Ár", opt: ["Mind", "Ingyenes", "Fizetős"] }, { k: "place", t: "Helyszín", opt: ["Mind", "Kültéri", "Beltéri"] }];

export default function FilterSheet() {
  const { flt, setFlt, setFilterOpen, t, card } = useApp();
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={() => setFilterOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      <div style={{ position: "relative", background: t.app, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, boxShadow: "0 -10px 30px rgba(0,0,0,0.3)" }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, background: t.line, margin: "0 auto 14px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontWeight: 800, fontSize: 18, color: t.text }}>Szűrők</span><Button label="Törlés" onClick={() => setFlt(DEFAULT_FILTER)} bg={t.chip} fg={t.text} ripple="rgba(120,120,120,0.18)" /></div>
        {groups.map((g) => (
          <div key={g.k} style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700, color: t.soft, fontSize: 12.5, marginBottom: 8 }}>{g.t}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{g.opt.map((o) => { const on = flt[g.k] === o; return <Ripple key={o} onClick={() => setFlt((s) => ({ ...s, [g.k]: o }))} aria={o} color="rgba(120,120,120,0.18)" style={{ padding: "8px 14px", borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: "pointer", background: on ? t.active : t.chip, color: on ? "#fff" : t.text }}>{o}</Ripple>; })}</div>
          </div>
        ))}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", ...card, padding: "12px 14px" }}><span style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>Csak ahol pont jár</span><Switch on={flt.pts} onChange={() => setFlt((s) => ({ ...s, pts: !s.pts }))} /></div>
        <div style={{ marginTop: 16 }}><Button label="Alkalmaz" onClick={() => setFilterOpen(false)} full /></div>
      </div>
    </div>
  );
}
