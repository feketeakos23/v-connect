import { ArrowLeft, Share2, MapPin, Navigation, Calendar, Clock, QrCode, Info } from "lucide-react";
import { C } from "../theme";
import { useApp } from "../context";
import { events, catColor } from "../data";
import { Skyline, IconBtn, Scroll, MapPreview, Button } from "../components/ui";

export default function EventDetail() {
  const { t, card, okBg, evId, setScreen, fire, openQR } = useApp();
  const ev = events.find((e) => e.id === evId) || events[0];
  return (
    <Scroll>
      <div style={{ position: "relative", height: 300, overflow: "hidden", background: `linear-gradient(150deg, ${catColor(ev.cat)} 0%, ${C.blue} 65%, ${C.dark} 100%)` }}>
        {[18, 38, 58, 78].map((l, i) => <div key={i} style={{ position: "absolute", top: -40, left: `${l}%`, width: 26, height: 420, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)", transform: `rotate(${i % 2 ? 14 : -12}deg)`, filter: "blur(5px)", opacity: 0.5 }} />)}
        <ev.icon size={120} color="rgba(255,255,255,0.12)" style={{ position: "absolute", right: -10, top: 60 }} />
        <Skyline color="rgba(255,255,255,0.14)" opacity={1} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 28%, transparent 50%, rgba(14,42,51,0.92) 100%)" }} />
        <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", zIndex: 2 }}><IconBtn icon={ArrowLeft} scrim label="Vissza" onClick={() => setScreen("explore")} /><IconBtn icon={Share2} scrim label="Megosztás" onClick={() => fire("Megosztás…", C.cyan)} /></div>
        <div style={{ position: "absolute", bottom: 16, left: 18, right: 18, zIndex: 2 }}><span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "#fff", opacity: 0.9 }}>{ev.cat.toUpperCase()}</span><div style={{ fontSize: 29, fontWeight: 900, color: "#fff", lineHeight: 1.06, marginTop: 6 }}>{ev.name}</div></div>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: t.chip, display: "grid", placeItems: "center", flex: "0 0 auto" }}><MapPin size={20} color={t.soft} /></div>
          <div style={{ flex: 1, fontWeight: 700, color: t.text, fontSize: 15 }}>{ev.place}</div>
          <Button label="Útvonal" onClick={() => fire("Útvonaltervezés megnyitása…", C.blue)} icon={Navigation} outlined fg={t.text} ripple="rgba(120,120,120,0.18)" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: t.chip, display: "grid", placeItems: "center", flex: "0 0 auto" }}><Calendar size={19} color={t.soft} /></div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, color: t.text, fontSize: 15 }}>{ev.date}</div><div style={{ color: t.soft, fontSize: 12.5, display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /> {ev.time}</div></div>
        </div>
        <MapPreview onClick={() => fire("Útvonaltervezés megnyitása…", C.blue)} />
        <div style={{ marginTop: 16, borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 12, background: okBg, border: `1px solid ${C.green}40` }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: C.green, display: "grid", placeItems: "center", flex: "0 0 auto" }}><QrCode size={22} color="#fff" /></div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 14.5 }}>Itt pontot gyűjthetsz!</div><div style={{ color: C.green, fontWeight: 800, fontSize: 13 }}>+{ev.pts} pont a QR-beolvasásért</div></div>
          <Button label="Gyűjtés" onClick={openQR} bg={C.green} />
        </div>
        <div style={{ marginTop: 18 }}><div style={{ fontWeight: 800, color: t.text, fontSize: 16, marginBottom: 8 }}>Leírás</div><div style={{ color: t.soft, fontSize: 14, lineHeight: 1.55 }}>{ev.desc}</div></div>
        <div style={{ ...card, padding: 14, marginTop: 16, display: "flex", alignItems: "center", gap: 11 }}><Info size={18} color={t.active} /><div style={{ fontSize: 13.5, color: t.text }}>Szervező: <b>{ev.partner}</b></div></div>
        <div style={{ marginTop: 18 }}><Button label="Érdekel" onClick={() => fire("Felvettük az érdeklődéseid közé ⭐", C.cyan)} full /></div>
      </div>
    </Scroll>
  );
}
