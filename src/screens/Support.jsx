import { Phone, Bot, ChevronRight } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { toolsList } from "../data";
import { Ripple, Scroll, TopBar, ToolGrid } from "../components/ui";

export default function Support() {
  const { t, a, elev, dangerBg, setScreen } = useApp();
  return (
    <Scroll>
      <TopBar title="Segítő" />
      <div style={{ padding: "0 18px 2px", color: t.soft, fontSize: 13.5 }}>Minden eszköz, ami a tanuláshoz és a mindennapokhoz kell.</div>
      <div style={{ padding: "12px 18px 0" }}>
        <div style={{ borderRadius: 18, padding: 16, border: `1px solid ${C.red}66`, background: dangerBg }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: C.red, display: "grid", placeItems: "center" }}><Phone size={20} color="#fff" /></div><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>Sürgős segítségre van szükséged?</div></div>
          <div style={{ color: t.soft, fontSize: 12.5, margin: "10px 0 12px" }}>Ingyenes, névtelen, éjjel-nappal hívható segélyvonalak.</div>
          <a href="tel:116111" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", background: C.red, color: "#fff", borderRadius: 13, padding: "12px 16px", fontWeight: 800, fontSize: 14, marginBottom: 9 }}><span><Phone size={15} style={{ verticalAlign: -2 }} /> Kék Vonal · 116-111</span><span style={{ fontSize: 12, opacity: 0.85 }}>24 év alatt</span></a>
          <a href="tel:116123" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", border: `1px solid ${C.red}`, color: C.red, borderRadius: 13, padding: "11px 16px", fontWeight: 800, fontSize: 14 }}><span><Phone size={15} style={{ verticalAlign: -2 }} /> Lelki Elsősegély · 116-123</span><span style={{ fontSize: 12, opacity: 0.75 }}>0–24</span></a>
        </div>
      </div>
      <div style={{ padding: "14px 18px 0" }}>
        <Ripple onClick={() => setScreen("chat")} aria="AI Asszisztens" color="rgba(255,255,255,0.3)" style={{ borderRadius: 18, padding: 18, color: "#fff", cursor: "pointer", background: `linear-gradient(120deg, ${C.blue}, ${C.cyan})`, boxShadow: a.contrast ? "none" : elev[2] }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "grid", placeItems: "center" }}><Bot size={26} /></div><div style={{ flex: 1 }}><div style={{ fontWeight: 900, fontSize: 17 }}>AI Asszisztens</div><div style={{ fontSize: 12.5, opacity: 0.9 }}>Kérdezz bármit a várossal vagy tanulással kapcsolatban.</div></div><ChevronRight size={20} /></div>
        </Ripple>
      </div>
      <div style={{ padding: "14px 18px 0" }}><ToolGrid items={toolsList} /></div>
    </Scroll>
  );
}
