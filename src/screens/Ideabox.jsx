import { useState } from "react";
import { Sparkles } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { Scroll, TopBar, Button } from "../components/ui";

export default function Ideabox() {
  const { t, card, fire } = useApp();
  const [ideaText, setIdeaText] = useState("");
  const submit = () => {
    if (!ideaText.trim()) { fire("Írj előbb egy ötletet 🙂", C.gold); return; }
    setIdeaText("");
    fire("Köszönjük az ötleted! 💡", C.green);
  };
  return (
    <Scroll>
      <TopBar title="Ötletláda" back="support" />
      <div style={{ padding: "10px 18px 0", color: t.soft, fontSize: 13.5 }}>Küldj be névtelenül ötletet a városnak, a közösségnek vagy az apphoz.</div>
      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ ...card, padding: 14 }}>
          <textarea value={ideaText} onChange={(e) => setIdeaText(e.target.value)} maxLength={1000} placeholder="Mi járna jót Veszprémben? Írd le bátran…" style={{ width: "100%", boxSizing: "border-box", minHeight: 140, resize: "none", border: "none", outline: "none", background: "transparent", color: t.text, fontSize: 14.5, lineHeight: 1.5, fontFamily: "inherit" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}><span style={{ color: t.soft, fontSize: 12 }}>{ideaText.length}/1000</span><Button label="Beküldöm" onClick={submit} /></div>
        </div>
        <div style={{ ...card, padding: 14, marginTop: 12, display: "flex", gap: 11, alignItems: "flex-start" }}><Sparkles size={18} color={C.gold} style={{ marginTop: 2 }} /><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.5 }}>A beküldés névtelen. Az admin válaszát itt látnád viszont az ötleted alatt.</div></div>
      </div>
    </Scroll>
  );
}
