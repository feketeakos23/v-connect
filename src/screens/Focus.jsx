import { Play, Pause, RotateCcw } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { Ripple, Scroll, TopBar } from "../components/ui";

export default function Focus() {
  const { t, a, focusMin, setFocusMin, focusLeft, setFocusLeft, focusRun, setFocusRun } = useApp();
  const mm = String(Math.floor(focusLeft / 60)).padStart(2, "0"), ss = String(focusLeft % 60).padStart(2, "0");
  const total = focusMin * 60, prog = total ? 1 - focusLeft / total : 0;
  return (
    <Scroll>
      <TopBar title="Fókusz Óra" back="support" />
      <div style={{ padding: "10px 18px 0", color: t.soft, fontSize: 13.5 }}>Pomodoro időzítő az önálló tanuláshoz.</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 9, padding: "18px 18px 0" }}>
        {[15, 25, 40].map((m) => <Ripple key={m} onClick={() => { if (focusRun) return; setFocusMin(m); setFocusLeft(m * 60); }} aria={`${m} perc`} color="rgba(120,120,120,0.18)" style={{ padding: "9px 18px", borderRadius: 999, border: `1px solid ${focusMin === m ? t.active : t.line}`, background: focusMin === m ? t.active : t.card, color: focusMin === m ? "#fff" : t.text, fontWeight: 800, fontSize: 14, cursor: focusRun ? "default" : "pointer", opacity: focusRun ? 0.5 : 1 }}>{m} perc</Ripple>)}
      </div>
      <div style={{ display: "grid", placeItems: "center", padding: "28px 0 18px" }}>
        <div style={{ position: "relative", width: 210, height: 210, display: "grid", placeItems: "center" }}>
          <svg width="210" height="210" style={{ position: "absolute", transform: "rotate(-90deg)" }}><circle cx="105" cy="105" r="92" fill="none" stroke={t.chip} strokeWidth="14" /><circle cx="105" cy="105" r="92" fill="none" stroke={t.active} strokeWidth="14" strokeLinecap="round" strokeDasharray={2 * Math.PI * 92} strokeDashoffset={2 * Math.PI * 92 * (1 - prog)} style={{ transition: a.reduce ? "none" : "stroke-dashoffset 1s linear" }} /></svg>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 46, fontWeight: 900, color: t.text, fontFamily: "monospace" }}>{mm}:{ss}</div><div style={{ color: t.soft, fontSize: 13, fontWeight: 700 }}>{focusRun ? "Fókuszálj! 🎯" : "Készen állsz?"}</div></div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, padding: "0 18px" }}>
        <Ripple onClick={() => setFocusRun((r) => !r)} aria={focusRun ? "Szünet" : "Indítás"} color="rgba(255,255,255,0.4)" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, borderRadius: 999, background: focusRun ? C.gold : C.green, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>{focusRun ? <><Pause size={18} /> Szünet</> : <><Play size={18} /> Indítás</>}</Ripple>
        <Ripple onClick={() => { setFocusRun(false); setFocusLeft(focusMin * 60); }} aria="Visszaállítás" color="rgba(120,120,120,0.18)" style={{ width: 56, display: "grid", placeItems: "center", borderRadius: 999, border: `1px solid ${t.line}`, background: t.card, color: t.text, cursor: "pointer" }}><RotateCcw size={20} /></Ripple>
      </div>
    </Scroll>
  );
}
