import { useState } from "react";
import { X, Check } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { IconBtn, Button } from "../components/ui";

export default function Scanner() {
  const { qrBack, setScreen, setPoints, fire, anim } = useApp();
  const [scanState, setScanState] = useState("idle");
  const edge = `4px solid ${scanState === "success" ? C.green : C.cyan}`;
  function simulateScan() {
    if (scanState === "success") return;
    setScanState("success");
    setTimeout(() => { setPoints((p) => p + 50); fire("+50 pont jóváírva! 🎉", C.green); }, 700);
    setTimeout(() => setScanState("idle"), 2400);
  }
  return (
    <div style={{ height: "100%", position: "relative", background: "#06222B", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 3 }}><IconBtn icon={X} scrim label="Bezárás" onClick={() => setScreen(qrBack)} /></div>
      <div style={{ flex: 1, display: "grid", placeItems: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 42%, ${C.cyan}33, transparent 60%)` }} />
        <div style={{ position: "relative", width: 230, height: 230, borderRadius: 26 }}>
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
            <div key={i} style={{ position: "absolute", width: 38, height: 38, [y ? "bottom" : "top"]: 0, [x ? "right" : "left"]: 0, borderTop: !y ? edge : "none", borderBottom: y ? edge : "none", borderLeft: !x ? edge : "none", borderRight: x ? edge : "none", borderRadius: 10 }} />
          ))}
          {scanState === "idle" && <div className={anim("laser")} style={{ position: "absolute", top: "48%", left: 12, right: 12, height: 3, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`, boxShadow: `0 0 14px ${C.cyan}` }} />}
          {scanState === "success" && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><div style={{ width: 80, height: 80, borderRadius: 999, background: C.green, display: "grid", placeItems: "center", boxShadow: `0 0 30px ${C.green}` }}><Check size={44} color="#fff" /></div></div>}
        </div>
      </div>
      <div style={{ padding: "0 28px 40px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Irányítsd a kamerát a QR-kódra a pontokért!</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, marginTop: 6, marginBottom: 16 }}>(Prototípus – koppints a gombra a beolvasás szimulálásához)</div>
        <div style={{ display: "inline-block" }}><Button label="Beolvasás szimulálása" onClick={simulateScan} bg={C.cyan} fg="#06222B" /></div>
      </div>
    </div>
  );
}
