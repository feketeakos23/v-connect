import { useState } from "react";
import { ChevronDown, Timer } from "lucide-react";
import { useApp } from "../context";
import { techniques } from "../data";
import { Pill, Ripple, Scroll, TopBar, Button } from "../components/ui";

export default function Techniques() {
  const { t, a, card, setScreen } = useApp();
  const [openTech, setOpenTech] = useState(null);
  return (
    <Scroll>
      <TopBar title="Tanulási technikák" back="support" />
      <div style={{ padding: "8px 18px 0", color: t.soft, fontSize: 13.5 }}>Bevált módszerek, kamuzás nélkül. Koppints egyre a részletekért. 👇</div>
      <div style={{ padding: "16px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {techniques.map((tech) => {
          const open = openTech === tech.n;
          return (
            <div key={tech.n} style={{ ...card, overflow: "hidden" }}>
              <Ripple onClick={() => setOpenTech(open ? null : tech.n)} aria={tech.n} color="rgba(120,120,120,0.15)" style={{ display: "flex", alignItems: "center", gap: 13, padding: 14, cursor: "pointer" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${tech.c}22`, display: "grid", placeItems: "center", fontSize: 24, flex: "0 0 auto" }}>{tech.e}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 800, color: t.text, fontSize: 15.5 }}>{tech.n}</span><Pill bg={`${tech.c}22`} fg={tech.c}>{tech.tag}</Pill></div><div style={{ color: t.soft, fontSize: 12.8, marginTop: 3, lineHeight: 1.35 }}>{tech.hook}</div></div>
                <ChevronDown size={18} color={t.soft} style={{ transform: open ? "rotate(180deg)" : "none", transition: a.reduce ? "none" : "transform .2s", flex: "0 0 auto" }} />
              </Ripple>
              {open && (
                <div style={{ padding: "0 16px 16px 73px" }}>
                  <div style={{ marginBottom: 10 }}><div style={{ fontWeight: 800, color: tech.c, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Hogyan</div><div style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5, marginTop: 2 }}>{tech.how}</div></div>
                  <div style={{ marginBottom: 10 }}><div style={{ fontWeight: 800, color: tech.c, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Mikor jó</div><div style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5, marginTop: 2 }}>{tech.when}</div></div>
                  <div style={{ display: "flex", gap: 9, alignItems: "flex-start", background: t.chip, borderRadius: 12, padding: "10px 12px" }}><span style={{ fontSize: 15 }}>💡</span><div style={{ color: t.text, fontSize: 13, lineHeight: 1.45 }}>{tech.tip}</div></div>
                  {tech.go && <div style={{ marginTop: 12 }}><Button label="Indítsd a Fókusz Órát" onClick={() => setScreen("focus")} icon={Timer} /></div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Scroll>
  );
}
