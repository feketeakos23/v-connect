import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Bot, Mic, Send } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { Ripple, IconBtn } from "../components/ui";

const prompts = ["Mit csináljak ma Veszprémben?", "Segíts a tanulásban", "Rosszul érzem magam"];

function botReply(msg) {
  const low = msg.toLowerCase();
  if (/(rossz|szomor|magány|magany|stressz|szorong|félek|felek|nem bírom|nem birom|baj)/.test(low)) return "Sajnálom, hogy most nehéz. 💙 Nem vagy egyedül — segíthet, ha beszélsz egy megbízható felnőttel, vagy felhívod a Kék Vonalat (116-111, ingyenes, 0–24, fiataloknak). A Segítő fülön az SOS-kártyán egy koppintással eléred a számokat.";
  if (/(tanul|matek|matematika|vizsga|érettségi|erettsegi|százalék|szazalek)/.test(low)) return "Vágjunk bele! Mondd el, melyik témánál akadtál el. Tipp: a Segítő → Tanulási technikák és a Fókusz Óra is sokat segíthet. ⏱️";
  return "Jó kérdés! 🙌 Nézz körül a Felfedezés fülön — ma több ingyenes esemény is van pontgyűjtéssel. Mit szeretsz: zene, sport, tech vagy kultúra?";
}

export default function Chat() {
  const { t, a, elev, cardBorder, chat, setChat, setScreen } = useApp();
  const [draft, setDraft] = useState("");
  const chatEnd = useRef(null);
  const reduce = a.reduce;
  useEffect(() => {
    const id = setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }), 40);
    return () => clearTimeout(id);
  }, [chat, reduce]);

  function sendMsg(text) {
    const msg = (text ?? draft).trim();
    if (!msg) return;
    setChat((c) => [...c, { from: "me", text: msg }]);
    setDraft("");
    setTimeout(() => setChat((c) => [...c, { from: "bot", text: botReply(msg) }]), 600);
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: t.app }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", boxShadow: a.contrast ? "none" : elev[1], borderBottom: a.contrast ? `1px solid ${t.line}` : "none", background: t.nav, zIndex: 2 }}>
        <IconBtn icon={ChevronLeft} label="Vissza" onClick={() => setScreen("support")} />
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(120deg, ${C.blue}, ${C.cyan})`, display: "grid", placeItems: "center", color: "#fff" }}><Bot size={20} /></div>
        <div><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>V-Buddy</div><div style={{ color: C.green, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: C.green, display: "inline-block" }} /> Online</div></div>
      </div>
      <div className="nobar" style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {chat.map((m, i) => <div key={i} style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", maxWidth: "82%", background: m.from === "me" ? t.active : t.card, color: m.from === "me" ? "#fff" : t.text, border: m.from === "me" ? "none" : cardBorder, borderRadius: 18, borderBottomRightRadius: m.from === "me" ? 5 : 18, borderBottomLeftRadius: m.from === "me" ? 18 : 5, padding: "11px 14px", fontSize: 14, lineHeight: 1.45 }}>{m.text}</div>)}
        <div ref={chatEnd} />
      </div>
      <div style={{ padding: "0 14px 8px", display: "flex", gap: 8, overflowX: "auto" }} className="nobar">
        {prompts.map((p) => <Ripple key={p} onClick={() => sendMsg(p)} aria={p} color="rgba(120,120,120,0.18)" style={{ flex: "0 0 auto", background: t.chip, border: `1px solid ${t.line}`, borderRadius: 999, padding: "7px 13px", color: t.text, fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{p}</Ripple>)}
      </div>
      <div style={{ padding: "8px 14px 14px", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${t.line}` }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: t.inputBg, borderRadius: 999, padding: "4px 6px 4px 14px" }}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} placeholder="Írj egy üzenetet…" style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: t.text, fontSize: 14, padding: "8px 0" }} />
          <Mic size={20} color={t.soft} style={{ cursor: "pointer" }} />
        </div>
        <IconBtn icon={Send} color="#fff" label="Küldés" onClick={() => sendMsg()} />
      </div>
    </div>
  );
}
