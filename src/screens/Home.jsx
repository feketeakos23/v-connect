import { Trophy, QrCode, Wallet, Calendar, MapPin, Lightbulb } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { challenges } from "../data";
import { Coin, Skyline, Pill, Ripple, Scroll, DarkToggle, Button } from "../components/ui";

export default function Home() {
  const { t, a, elev, card, okBg, points, openQR, goPoints, openEvent } = useApp();
  return (
    <Scroll>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px 4px" }}>
        <div><div style={{ color: t.soft, fontSize: 13 }}>Szia,</div><div style={{ color: t.text, fontWeight: 900, fontSize: 22 }}>Anna! 👋</div></div>
        <DarkToggle />
      </div>
      <div style={{ padding: "6px 18px 0" }}>
        <div style={{ ...card, padding: 18, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.blue}, ${C.dark})`, border: "none", color: "#fff", boxShadow: a.contrast ? "none" : elev[2] }}>
          <Trophy size={26} color={C.goldHi} style={{ position: "absolute", top: 16, right: 18 }} />
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>AKTUÁLIS EGYENLEG</div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 6 }}><Coin size={30} /><span style={{ fontSize: 38, fontWeight: 900, lineHeight: 1 }}>{points}</span><span style={{ fontSize: 16, fontWeight: 700, opacity: 0.85, marginTop: 10 }}>Pont</span></div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Button label="QR Olvasás" onClick={openQR} bg="#fff" fg={C.blue} icon={QrCode} full ripple="rgba(0,0,0,0.08)" />
            <Button label="Beváltás" onClick={() => goPoints("redeem")} bg="rgba(255,255,255,0.18)" fg="#fff" icon={Wallet} full />
          </div>
        </div>
      </div>
      <div style={{ padding: "16px 18px 0" }}>
        <Ripple onClick={() => openEvent("utcazene")} aria="Utcazene Fesztivál" color="rgba(255,255,255,0.3)" style={{ borderRadius: 22, minHeight: 150, padding: 18, color: "#fff", cursor: "pointer", background: `linear-gradient(135deg, ${C.cyan} 0%, ${C.blue} 100%)`, boxShadow: a.contrast ? "none" : elev[2] }}>
          <Skyline color="rgba(255,255,255,0.2)" opacity={1} />
          <div style={{ position: "relative", zIndex: 1 }}><Pill bg="rgba(255,255,255,0.22)" fg="#fff">KIEMELT</Pill><div style={{ fontWeight: 900, fontSize: 21, marginTop: 10 }}>Utcazene Fesztivál</div><div style={{ fontSize: 13, opacity: 0.9, marginTop: 4, display: "flex", gap: 12 }}><span><Calendar size={12} style={{ verticalAlign: -1 }} /> Jún. 21.</span><span><MapPin size={12} style={{ verticalAlign: -1 }} /> Óváros tér</span></div></div>
        </Ripple>
      </div>
      <div style={{ padding: "18px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11 }}><Lightbulb size={19} color={C.goldHi} /><span style={{ fontWeight: 800, color: t.text, fontSize: 17 }}>Napi Kihívások</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {challenges.map((ch) => (
            <Ripple key={ch.name} onClick={openQR} aria={ch.name} color="rgba(120,120,120,0.18)" style={{ ...card, padding: 14, display: "flex", alignItems: "center", gap: 13, cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: t.chip, display: "grid", placeItems: "center", flex: "0 0 auto" }}><ch.icon size={21} color={t.active} /></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>{ch.name}</div><div style={{ color: t.soft, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.desc}</div></div>
              <Pill bg={okBg} fg={C.green}>+{ch.pts}p</Pill>
            </Ripple>
          ))}
        </div>
      </div>
    </Scroll>
  );
}
