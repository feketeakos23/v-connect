import { Search, SlidersHorizontal, Calendar, MapPin } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { cats, catColor, events } from "../data";
import { Pill, Ripple, IconBtn, Scroll, TopBar } from "../components/ui";

export default function Explore() {
  const { t, card, cat, setCat, flt, setFilterOpen, openEvent } = useApp();
  const fltActive = flt.age !== "Mind" || flt.price !== "Mind" || flt.place !== "Mind" || flt.pts;
  let shown = cat === "Mind" ? events : events.filter((e) => e.cat === cat);
  shown = shown.filter((e) => (flt.age === "Mind" || e.age === flt.age || e.age === "Mind") && (flt.price === "Mind" || (flt.price === "Ingyenes" ? e.free : !e.free)) && (flt.place === "Mind" || (flt.place === "Kültéri" ? e.outdoor : !e.outdoor)) && (!flt.pts || e.pts > 0));
  return (
    <Scroll>
      <TopBar title="Felfedezés" />
      <div style={{ padding: "0 18px", display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: t.chip, borderRadius: 999, padding: "11px 16px" }}><Search size={17} color={t.soft} /><input placeholder="Keresés…" style={{ border: "none", outline: "none", background: "transparent", color: t.text, fontSize: 14, width: "100%" }} /></div>
        <div style={{ position: "relative" }}><IconBtn icon={SlidersHorizontal} color="#fff" label="Szűrők" onClick={() => setFilterOpen(true)} />{fltActive && <span style={{ position: "absolute", top: 2, right: 2, width: 12, height: 12, borderRadius: 99, background: C.goldHi, border: `2px solid ${t.app}` }} />}</div>
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 18px 6px" }} className="nobar">
        {["Mind", ...cats.map((c) => c.n)].map((n) => { const on = cat === n; const cc = n === "Mind" ? t.active : catColor(n); return <Ripple key={n} onClick={() => setCat(n)} aria={n} color="rgba(255,255,255,0.3)" style={{ flex: "0 0 auto", background: on ? cc : t.chip, color: on ? "#fff" : t.text, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{n}</Ripple>; })}
      </div>
      {shown.length === 0 && <div style={{ padding: "30px 18px", textAlign: "center", color: t.soft, fontSize: 14 }}>Nincs a szűrőknek megfelelő esemény. 🔍</div>}
      <div style={{ padding: "6px 18px 0", display: "flex", flexDirection: "column", gap: 13 }}>
        {shown.map((p) => (
          <Ripple key={p.id} onClick={() => openEvent(p.id)} aria={p.name} color="rgba(120,120,120,0.16)" style={{ ...card, overflow: "hidden", cursor: "pointer" }}>
            <div style={{ height: 110, background: `linear-gradient(120deg, ${catColor(p.cat)}, ${C.blue})`, position: "relative", display: "grid", placeItems: "center" }}>
              <p.icon size={36} color="rgba(255,255,255,0.92)" />
              <div style={{ position: "absolute", top: 10, right: 10 }}><Pill bg="rgba(21,158,140,0.95)" fg="#fff">+{p.pts} Pont</Pill></div>
              <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}><Pill bg="rgba(0,0,0,0.32)" fg="#fff">{p.cat}</Pill>{p.free && <Pill bg="rgba(0,0,0,0.32)" fg="#fff">Ingyenes</Pill>}</div>
            </div>
            <div style={{ padding: 13 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15.5 }}>{p.name}</div><div style={{ color: t.soft, fontSize: 12.5, marginTop: 5, display: "flex", gap: 14 }}><span><Calendar size={12} style={{ verticalAlign: -1 }} /> {p.date.split(",")[0].replace("2026. ", "")}</span><span><MapPin size={12} style={{ verticalAlign: -1 }} /> {p.place}</span></div></div>
          </Ripple>
        ))}
      </div>
    </Scroll>
  );
}
