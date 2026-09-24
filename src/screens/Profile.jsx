import { QrCode, Calendar, TrendingUp, History, User, Accessibility, Bell, MessageCircle, Sun, Moon, LogOut, ChevronRight } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { Crown, Ripple, Scroll, TopBar } from "../components/ui";

export default function Profile() {
  const { t, dark, setDark, a, elev, card, anim, setScreen, fire } = useApp();
  const menu = [
    { l: "Előzmények", i: History, a: () => setScreen("history") }, { l: "Személyes adatok", i: User, a: () => fire("Adatok szerkesztése…", t.active) },
    { l: "Akadálymentesség", i: Accessibility, a: () => setScreen("a11y") }, { l: "Értesítések", i: Bell, a: () => fire("Értesítések…", t.active) },
    { l: "Segítő & V-Buddy", i: MessageCircle, a: () => setScreen("support") }, { l: dark ? "Világos mód" : "Sötét mód", i: dark ? Sun : Moon, a: () => setDark((d) => !d) },
    { l: "Kijelentkezés", i: LogOut, a: () => setScreen("login"), red: true },
  ];
  return (
    <Scroll>
      <TopBar title="Profil" />
      <div style={{ padding: "0 18px" }}>
        <div className={anim("holo")} style={{ position: "relative", borderRadius: 22, overflow: "hidden", padding: 18, color: "#fff", minHeight: 150, background: `linear-gradient(115deg, ${C.blue}, ${C.cyan}, ${C.goldHi}, ${C.coral})`, backgroundSize: "300% 300%", boxShadow: a.contrast ? "none" : elev[2] }}>
          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between" }}><div><Crown size={30} /><div style={{ fontWeight: 900, fontSize: 13, letterSpacing: 2, marginTop: 6 }}>DIGITÁLIS IFJÚSÁGI KÁRTYA</div></div><div style={{ width: 52, height: 52, borderRadius: 14, background: "#fff", display: "grid", placeItems: "center" }}><QrCode size={36} color={C.blue} /></div></div>
          <div style={{ position: "relative", zIndex: 1, marginTop: 26 }}><div style={{ fontSize: 12, opacity: 0.9 }}>Kártyatulajdonos</div><div style={{ fontWeight: 900, fontSize: 20 }}>NAGY ANNA</div><div style={{ fontFamily: "monospace", letterSpacing: 3, fontSize: 13, marginTop: 4, opacity: 0.9 }}>VESZ · 0042 · 2026</div></div>
        </div>
      </div>
      <div style={{ padding: "16px 18px 0", display: "flex", gap: 12 }}>
        {[{ l: "Meglátogatott események", v: "12", i: Calendar, c: t.active }, { l: "Megspórolt pénz", v: "8 500 Ft", i: TrendingUp, c: C.green }].map((s) => (
          <div key={s.l} style={{ ...card, flex: 1, padding: 14 }}><s.i size={18} color={s.c} /><div style={{ fontWeight: 900, fontSize: 18, color: t.text, marginTop: 6 }}>{s.v}</div><div style={{ color: t.soft, fontSize: 11.5, marginTop: 2 }}>{s.l}</div></div>
        ))}
      </div>
      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ ...card, overflow: "hidden", padding: 0 }}>
          {menu.map((m, i, arr) => (
            <Ripple key={m.l} onClick={m.a} aria={m.l} color="rgba(120,120,120,0.15)" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${t.line}` : "none", cursor: "pointer", color: m.red ? C.red : t.text }}>
              <m.i size={18} color={m.red ? C.red : t.soft} /><span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{m.l}</span><ChevronRight size={16} color={t.soft} />
            </Ripple>
          ))}
        </div>
      </div>
    </Scroll>
  );
}
