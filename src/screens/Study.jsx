import { ExternalLink, Info, Bot, ChevronRight } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { studyLinks } from "../data";
import { Ripple, Scroll, TopBar } from "../components/ui";

export default function Study() {
  const { t, card, setScreen } = useApp();
  return (
    <Scroll>
      <TopBar title="Továbbtanulás" back="support" />
      <div style={{ padding: "8px 18px 0", color: t.soft, fontSize: 13.5 }}>Megbízható oldalak a középiskolai és felsőoktatási döntésekhez. A linkek külső oldalt nyitnak.</div>
      <div style={{ padding: "16px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {studyLinks.map((s) => (
          <a key={s.n} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: `${s.c}1f`, display: "grid", placeItems: "center", flex: "0 0 auto" }}><s.icon size={22} color={s.c} /></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{s.n}</div><div style={{ color: t.soft, fontSize: 12.5 }}>{s.d}</div></div>
              <ExternalLink size={18} color={t.soft} />
            </div>
          </a>
        ))}
        <div style={{ ...card, padding: 14, display: "flex", gap: 11, alignItems: "flex-start" }}><Info size={18} color={t.active} style={{ marginTop: 1, flex: "0 0 auto" }} /><div style={{ color: t.soft, fontSize: 12.5, lineHeight: 1.5 }}>Tipp: a felvi.hu keresőjébe írd be, hogy „Veszprém", és máris látod a helyi szakokat.</div></div>
        <Ripple onClick={() => setScreen("chat")} aria="V-Buddy" color="rgba(255,255,255,0.3)" style={{ borderRadius: 18, padding: 16, color: "#fff", cursor: "pointer", background: `linear-gradient(120deg, ${C.blue}, ${C.cyan})`, display: "flex", alignItems: "center", gap: 12 }}>
          <Bot size={24} /><div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15 }}>Nem tudod, mihez kezdj?</div><div style={{ fontSize: 12.5, opacity: 0.9 }}>Kérdezd meg V-Buddyt a lehetőségeidről!</div></div><ChevronRight size={20} />
        </Ripple>
      </div>
    </Scroll>
  );
}
